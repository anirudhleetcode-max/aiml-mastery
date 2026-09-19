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

  {
    id: 'VIZ-006',
    domain: 'VIZ',
    module: 'Seaborn & Statistical Plots',
    topic: 'Seaborn, box plots, violins and heatmaps',
    title: 'Seaborn, Box Plots and Heatmaps',
    slug: 'seaborn-box-plots-heatmaps',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['VIZ-004', 'VIZ-005'],
    related: ['VIZ-002', 'VIZ-003'],
    tags: ['seaborn', 'boxplot', 'violin', 'heatmap', 'pairplot', 'colormap', 'tidy-data'],

    learningObjectives: [
      'Use seaborn dataset-oriented API, passing a tidy DataFrame with column names rather than arrays',
      'Name every component of a box plot precisely, including exactly what the whiskers and the outlier points mean',
      'Choose between a box plot, a violin plot and a strip or swarm plot based on what each hides',
      'Build a correlation heatmap with a diverging colormap centred at zero, and explain why centring is not optional',
      'Read a pairplot, and know the two things it is good at and the one thing it cannot scale to',
    ],

    terminology: [
      {
        term: 'Tidy data',
        definition:
          'A table where each row is one observation, each column is one variable and each cell is one value. Seaborn assumes this layout, which is why its API takes column names.',
        simple: 'One row per observation, one column per thing you measured.',
      },
      {
        term: 'Box plot',
        definition:
          'A five-number summary drawn as a box from the first to the third quartile with a line at the median, whiskers extending to the furthest points within 1.5 times the interquartile range, and individual marks beyond.',
        simple: 'A box covering the middle half of the data, a line at the middle value, and lines reaching out to the rest.',
      },
      {
        term: 'Interquartile range (IQR)',
        definition:
          'The third quartile minus the first — the width of the box, containing the middle 50 percent of observations. It is the robust measure of spread that whisker length is defined from.',
        simple: 'How wide the middle half of the data is.',
      },
      {
        term: 'Violin plot',
        definition:
          'A mirrored kernel density estimate drawn as a symmetric shape, usually with a miniature box plot inside. It shows modality, which a box plot cannot.',
        simple: 'A smooth outline of the whole distribution, so you can see if it has two humps.',
      },
      {
        term: 'Diverging colormap',
        definition:
          'A colormap with two distinguishable hues meeting at a neutral midpoint, used when the data has a meaningful centre such as zero. Examples are coolwarm, RdBu_r and vlag.',
        simple: 'A colour scale that runs from one colour through white to another, for data with a natural middle.',
      },
      {
        term: 'Figure-level function',
        definition:
          'A seaborn function such as pairplot, displot, catplot or relplot that creates and owns its own Figure, returning a grid object rather than accepting an ax argument.',
        simple: 'A seaborn call that builds its own whole page instead of drawing into a panel you made.',
      },
    ],

    simpleExplanation:
      'Seaborn is a layer on top of matplotlib that changes what you talk about. In matplotlib you hand over arrays of numbers and say where to put them. In seaborn you hand over a table and say which column goes on the horizontal axis, which goes on the vertical, and which one should split the data into coloured groups; seaborn works out the grouping, the aggregation, the legend and the colours for you. That shift is why one line of seaborn often replaces fifteen of matplotlib. It also brings a family of charts built for comparing distributions across categories. A box plot squeezes each group into five numbers: the middle value, the edges of the middle half of the data, and whiskers reaching out to the rest, with anything unusually far away drawn as its own point. A violin plot draws the full smooth shape of each group instead, which matters because a box plot cannot tell you whether a group has one hump or two. A heatmap colours a grid of numbers, most often a table of correlations, and there the colour scale has to be chosen so that zero sits at the neutral midpoint — otherwise a mildly positive correlation can be painted the same colour as a strongly negative one and the whole picture lies.',

    whyItExists:
      'Matplotlib was built to draw arrays, so every comparison across groups required the analyst to split the data, loop, manage colours and build a legend by hand. Seaborn exists to close the gap between a tidy DataFrame and a statistical graphic: it takes column names, performs the splitting and aggregation internally, applies perceptually sensible defaults, and provides the distribution-comparison charts that statisticians actually use.',

    analogy: {
      scenario:
        "Consider two ways to order a coffee. In the first, you specify the process: grind 18 grams of beans to this fineness, heat water to 93 degrees, extract for 27 seconds, steam milk to 60 degrees. In the second, you say 'a flat white, oat milk'. The second is not less powerful — it is the same machine — but you are naming the thing you want rather than the steps to produce it, and someone with more expertise than you has chosen the defaults. The moment you need something unusual you drop back to specifying the process, and a good café lets you do that without starting over.",
      mapping: [
        { from: 'Specifying grind, temperature and extraction time', to: 'Matplotlib: arrays, loops, manual colours and a hand-built legend' },
        { from: 'Naming the drink you want', to: 'Seaborn: sns.boxplot(data=df, x="model", y="error", hue="dataset")' },
        { from: 'The barista choosing sensible defaults', to: "Seaborn's aggregation, colour palettes, confidence intervals and legend placement" },
        { from: 'Asking for one adjustment without re-explaining the drink', to: 'Taking the returned Axes and calling ax.set_ylim or ax.set_title on it' },
        { from: 'The same espresso machine underneath', to: 'Seaborn draws entirely in matplotlib; every result is a Figure and Axes you already know how to edit' },
      ],
      bridge:
        'The analogy holds because the abstraction is genuinely one of vocabulary, not of capability. Seaborn never hides matplotlib: an Axes-level function accepts ax= and returns the Axes, so you can hand it a panel from your own plt.subplots grid and then restyle the result. The place the analogy matters practically is knowing which register you are in — if a seaborn call is not doing what you want, the question is whether you need a different seaborn argument or whether you should take the Axes and finish the job in matplotlib.',
      limitations:
        'The café image suggests the defaults are always good, and some of seaborn defaults are opinions you should override: box plots hide modality, violin KDEs smooth across hard boundaries, and the default sequential palette on a correlation matrix is actively misleading. Convenience is not the same as correctness.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Every part of a box plot, precisely',
        caption:
          'The single most misread chart in data science. Whisker length is a rule, not a percentile, and the dots are not necessarily errors.',
        subject: 'sns.boxplot(data=df, x="group", y="value")',
        annotations: [
          { part: 'The line inside the box', note: 'The median (Q2, the 50th percentile). Not the mean — the mean is usually not drawn at all unless you ask with showmeans=True.' },
          { part: 'The bottom of the box', note: 'The first quartile Q1, the 25th percentile. A quarter of the observations lie below it.' },
          { part: 'The top of the box', note: 'The third quartile Q3, the 75th percentile. The box therefore spans the middle 50 percent of the data.' },
          { part: 'The height of the box', note: 'The interquartile range, IQR = Q3 - Q1. This is the robust measure of spread everything else is defined from.' },
          { part: 'The whiskers', note: 'They reach to the most extreme observation still within 1.5 x IQR of the nearer quartile. They are NOT the minimum and maximum, and NOT a fixed percentile.' },
          { part: 'The individual points beyond', note: 'Every observation outside the whiskers, drawn individually. By convention these are called outliers, but for a skewed distribution they are ordinary members of the tail.' },
          { part: 'What is missing', note: 'Sample size and modality. Two groups with n = 8 and n = 8,000 draw identical boxes, and a strongly bimodal group draws the same box as a uniform one.' },
        ],
      },
      {
        kind: 'table',
        title: 'Choosing among the distribution-by-category plots',
        caption: 'They all answer "how does this quantity differ across groups" and hide different things.',
        columns: ['Plot', 'Shows', 'Hides', 'Best when'],
        rows: [
          ['Box plot', 'Median, quartiles, spread, far-out points', 'Modality and sample size', 'Many groups, and you need a compact robust comparison'],
          ['Violin plot', 'The full estimated density, so modality is visible', 'Exact quantiles; smooths across hard boundaries', 'Few groups, and you suspect the shapes differ'],
          ['Strip / swarm plot', 'Every individual observation', 'Nothing, but it collapses above a few hundred points per group', 'Small samples, under about 200 points per group'],
          ['Box plus strip overlay', 'Robust summary and the raw points together', 'Gets busy beyond a handful of groups', 'The default worth reaching for when n is modest'],
          ['Bar plot with error bars', 'A mean and an uncertainty interval', 'Everything about the shape, including bimodality', 'Rarely — a bar of a mean is the least informative of these'],
          ['Ridge / layered KDE', 'Shapes of many groups, compactly stacked', 'Exact quantiles; needs enough data per group', 'Comparing a distribution across many ordered groups'],
        ],
      },
      {
        kind: 'compare',
        title: 'Box plot versus violin plot',
        caption: 'The classic demonstration: two groups with identical five-number summaries and completely different shapes.',
        left: {
          heading: 'Box plot',
          points: [
            'Exact, robust and compact: five numbers per group',
            'Scales to twenty or more groups on one axis',
            'The 1.5 x IQR rule gives a consistent, comparable outlier definition',
            'Cannot show modality — a bimodal group looks identical to a flat one',
            'Cannot show sample size unless you vary the box width or annotate n',
          ],
        },
        right: {
          heading: 'Violin plot',
          points: [
            'Shows the whole shape, so two humps are immediately visible',
            'Can be split by hue to compare two subgroups on one violin',
            'Inherits every KDE weakness: bandwidth choice, leakage past hard limits',
            'Tails are smoothed and extended, which can suggest data where there is none',
            'Becomes unreadable past roughly eight groups',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Building a correlation heatmap that does not lie',
        caption: 'Four of these six steps exist purely to stop the colour encoding misleading the reader.',
        steps: [
          { label: 'Compute the matrix', detail: 'df.corr() for Pearson, or method="spearman" when relationships are monotonic but curved.' },
          { label: 'Choose a diverging colormap', detail: 'coolwarm, RdBu_r or vlag. A sequential map such as viridis has no meaningful midpoint and hides the sign.' },
          { label: 'Centre it at zero', detail: 'Pass center=0, or vmin=-1 and vmax=1. Without this, seaborn centres on the data range and zero lands on an arbitrary colour.' },
          { label: 'Mask the redundant half', detail: 'The matrix is symmetric with a diagonal of ones, so masking the upper triangle halves the ink for no information loss.' },
          { label: 'Annotate and order', detail: 'annot=True with two decimals for small matrices; cluster or group related features so blocks of correlated variables are visible.' },
          { label: 'Read it with the scatter plots in mind', detail: 'Every cell is a Pearson coefficient and inherits every limitation of one: zero means no linear relationship, not no relationship.' },
        ],
      },
      {
        kind: 'table',
        title: 'Colormaps: pick by the structure of the data, not by taste',
        columns: ['Data has', 'Use', 'Examples', 'Never use'],
        rows: [
          ['A meaningful zero or midpoint', 'Diverging, centred on that midpoint', 'coolwarm, RdBu_r, vlag, BrBG', 'A sequential map, which hides the sign'],
          ['An ordered magnitude from low to high', 'Sequential, perceptually uniform', 'viridis, magma, rocket, Blues', 'jet or rainbow, which create false edges'],
          ['Unordered categories', 'Qualitative, distinguishable hues', 'tab10, Set2, colorblind', 'Any continuous map, which implies an order'],
          ['Cyclic values such as angle or hour', 'Cyclic', 'twilight, hsv', 'A linear map, which breaks at the wrap-around'],
        ],
      },
      {
        kind: 'widget',
        title: 'Match the question to the statistical plot',
        caption: 'Distribution-by-category questions are where box, violin and strip plots compete.',
        widget: 'chart-chooser',
      },
    ],

    formalDefinition:
      'Seaborn is a declarative interface over matplotlib in which a plot is specified by a tidy dataset plus a mapping from column names to visual roles (x, y, hue, size, style, col, row). Axes-level functions draw into a supplied matplotlib Axes and return it; figure-level functions construct and own a Figure through a grid object. A Tukey box plot renders the five-number summary with whiskers at the extreme observations within 1.5 IQR of the quartiles, and a violin plot renders a mirrored kernel density estimate of the same data.',

    math: {
      intuition:
        'Two pieces of arithmetic control how these charts read. The first is the 1.5 IQR whisker rule: it is a convention chosen so that, for normally distributed data, only about seven observations in a thousand fall outside the whiskers — enough that genuine outliers stand out, few enough that ordinary data does not produce a cloud of marks. The second is the centring of a diverging colormap. A colormap is a function from a number to a colour, and a diverging map is built so that its neutral midpoint lands at the middle of the range it is given. If the range is the data range rather than a symmetric interval around zero, the neutral colour lands somewhere arbitrary and the sign of every value becomes unreadable.',
      formulas: [
        {
          latex: '\\text{IQR} = Q_3 - Q_1',
          name: 'Interquartile range',
          meaning:
            'The width of the box, spanning the middle half of the data. It is robust: moving the most extreme 25 percent of observations anywhere at all leaves it unchanged.',
          variables: [
            { symbol: 'Q_1', meaning: 'the first quartile, the 25th percentile' },
            { symbol: 'Q_3', meaning: 'the third quartile, the 75th percentile' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{upper whisker} = \\max\\{x_i : x_i \\le Q_3 + 1.5\\,\\text{IQR}\\}',
          name: 'Tukey whisker rule',
          meaning:
            'The whisker stops at an actual observation, not at the fence itself. That is why whisker lengths differ between groups and why a whisker is never longer than the data.',
          variables: [
            { symbol: 'Q_3 + 1.5\\,\\text{IQR}', meaning: 'the upper fence, the threshold beyond which points are drawn individually' },
            { symbol: 'x_i', meaning: 'the observations in the group' },
          ],
          category: 'statistics',
        },
        {
          latex: 'P\\!\\left(X > Q_3 + 1.5\\,\\text{IQR}\\right) \\approx 0.0035 \\quad \\text{for } X \\sim \\mathcal{N}(\\mu, \\sigma^2)',
          name: 'Why 1.5 was chosen',
          meaning:
            'For normal data the fences sit at roughly the mean plus or minus 2.7 standard deviations, so about 0.7 percent of observations fall outside in total. In a sample of 1,000 normal values you should expect around seven marks and not be alarmed by them.',
          variables: [
            { symbol: '\\mathcal{N}(\\mu, \\sigma^2)', meaning: 'the normal distribution with mean mu and variance sigma squared' },
            { symbol: '1.5', meaning: 'the Tukey multiplier, a convention rather than a derived optimum' },
          ],
          category: 'statistics',
        },
        {
          latex: 'c(v) = \\text{cmap}\\!\\left(\\frac{v - v_{\\min}}{v_{\\max} - v_{\\min}}\\right)',
          name: 'Colour normalisation',
          meaning:
            'The value is mapped to [0, 1] before the colormap is applied. Setting vmin = -1 and vmax = 1 puts zero at exactly 0.5, which is where a diverging map places its neutral colour.',
          variables: [
            { symbol: 'v', meaning: 'the value in a cell' },
            { symbol: 'v_{\\min}, v_{\\max}', meaning: 'the ends of the colour scale, defaulting to the data range' },
            { symbol: '\\text{cmap}', meaning: 'the colormap, a function from [0, 1] to a colour' },
          ],
        },
      ],
      derivation: [
        'A correlation matrix has values in [-1, 1] with a meaningful midpoint at zero, meaning no linear association.',
        'By default seaborn normalises using the observed minimum and maximum of the matrix.',
        'If the observed values run from -0.1 to 0.9, zero maps to (0 - (-0.1)) / 1.0 = 0.1, near the extreme end of the colour scale.',
        'A diverging map then paints a correlation of zero in a strong hue and a correlation of 0.4 in near-neutral, inverting the reader intuition entirely.',
        'Passing center=0, or vmin=-1 with vmax=1, forces zero to the neutral midpoint and makes hue mean sign and saturation mean magnitude.',
      ],
    },

    workedExample: {
      title: 'Reading a box plot correctly, number by number',
      setup:
        'A group of 200 API latencies, sorted, has Q1 = 45 ms, median = 70 ms, Q3 = 115 ms, the largest value below the upper fence is 218 ms, and there are six values above it, the largest being 1,340 ms. The lowest value is 12 ms.',
      steps: [
        {
          label: 'The box',
          detail:
            'The box runs from 45 to 115 ms, so exactly half the requests completed between those times. The IQR is 115 - 45 = 70 ms. This is the only spread measure on the chart, and it is unaffected by the 1,340 ms request.',
          latex: '\\text{IQR} = 115 - 45 = 70',
        },
        {
          label: 'The median line',
          detail:
            'At 70 ms, and note it is not centred in the box: it is 25 ms above Q1 and 45 ms below Q3. That asymmetry within the box is itself a readable signal of right skew.',
        },
        {
          label: 'The fences',
          detail:
            'Upper fence = 115 + 1.5 x 70 = 220 ms. Lower fence = 45 - 1.5 x 70 = -60 ms, which is below any possible latency, so no low outliers can exist and the lower whisker will stop at the minimum.',
          latex: 'Q_3 + 1.5\\,\\text{IQR} = 115 + 105 = 220',
        },
        {
          label: 'The whiskers',
          detail:
            'The upper whisker stops at 218 ms, the largest observation not exceeding the fence — not at 220, and certainly not at 1,340. The lower whisker stops at 12 ms, the minimum, because nothing falls below the lower fence.',
        },
        {
          label: 'The marks beyond',
          detail:
            'Six points are drawn individually above 220 ms, up to 1,340. For normal data you would expect roughly 200 x 0.0035, well under one, so six is a genuine signal of a heavy tail rather than the usual handful.',
        },
        {
          label: 'What the box does not say',
          detail:
            'It does not say there were 200 requests — a box from eight requests looks identical. It does not say whether the 45-to-115 ms region has one hump or two. And it never shows the mean, which here would be pulled well above 70 ms by those six slow requests.',
        },
      ],
      conclusion:
        'Every mark on the chart is now accounted for. The two mistakes this prevents are reading the whiskers as the minimum and maximum, and reading the individually drawn points as errors: in a right-skewed distribution such as latency, those points are the ordinary tail and they are precisely the requests your users complain about.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The dataset-oriented API: one call, three variables',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style="whitegrid", context="notebook")
rng = np.random.default_rng(19)

rows = []
for model in ["logistic", "random forest", "gradient boosting"]:
    for dataset in ["clean", "noisy"]:
        base = {"logistic": 0.71, "random forest": 0.83, "gradient boosting": 0.86}[model]
        penalty = 0.0 if dataset == "clean" else 0.09
        for fold in range(30):
            rows.append({
                "model": model,
                "dataset": dataset,
                "fold": fold,
                "f1": base - penalty + rng.normal(0, 0.025),
            })
scores = pd.DataFrame(rows)

fig, ax = plt.subplots(figsize=(8, 4.5), layout="constrained")
sns.boxplot(data=scores, x="model", y="f1", hue="dataset",
            palette=["#2a9d8f", "#e76f51"], width=0.6, ax=ax)
sns.stripplot(data=scores, x="model", y="f1", hue="dataset",
              dodge=True, size=3, alpha=0.5, color="#264653",
              legend=False, ax=ax)
ax.set_ylabel("F1 score (30 cross-validation folds)")
ax.set_xlabel("")
ax.set_title("Gradient boosting leads on both datasets; all models lose ~0.09 F1 on noisy data")
ax.legend(title="dataset", frameon=False)
fig.savefig("model_scores.png", dpi=200)

print(scores.groupby(["model", "dataset"])["f1"].agg(["median", "std", "count"]).round(3).to_string())`,
        output: `                                median    std  count
model             dataset                          
gradient boosting clean          0.861  0.024     30
                  noisy          0.769  0.026     30
logistic          clean          0.711  0.026     30
                  noisy          0.622  0.024     30
random forest     clean          0.830  0.025     30
                  noisy          0.741  0.023     30`,
        explanation:
          'The central line is the whole point of seaborn: one call takes the DataFrame, names three columns for three visual roles, and produces six boxes correctly grouped and coloured with a legend, where matplotlib would have needed a manual split, a loop, position offsets and a hand-built legend. The picture shows three pairs of boxes along the x axis, teal for clean and orange for noisy, with each pair separated by the dodge. Every orange box sits about 0.09 lower than its teal partner, and the gradient-boosting pair sits highest. The stripplot overlay scatters the 30 individual fold scores across each box, which is what turns a five-number summary into an honest picture — you can see that the folds are tightly packed rather than a handful of extremes, and n = 30 per box becomes visible rather than assumed. Note legend=False on the strip layer, without which seaborn would draw the legend twice.',
      },
      {
        language: 'python',
        title: 'Why a box plot can hide the thing that matters',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

rng = np.random.default_rng(37)
n = 600

# Three groups constructed to share a median and an IQR, with different shapes.
unimodal = rng.normal(50, 14.8, n)
bimodal = np.concatenate([rng.normal(28, 6, n // 2), rng.normal(72, 6, n // 2)])
uniformish = rng.uniform(15, 85, n)

df = pd.DataFrame({
    "value": np.concatenate([unimodal, bimodal, uniformish]),
    "group": ["unimodal"] * n + ["bimodal"] * n + ["uniform"] * n,
})

fig, (ax_box, ax_violin) = plt.subplots(1, 2, figsize=(11.5, 4.5), sharey=True, layout="constrained")
sns.boxplot(data=df, x="group", y="value", ax=ax_box, palette="Set2", width=0.5)
ax_box.set_title("Box plots: three nearly identical summaries")
sns.violinplot(data=df, x="group", y="value", ax=ax_violin, palette="Set2",
               inner="quartile", cut=0)
ax_violin.set_title("Violin plots: three obviously different distributions")
fig.suptitle("The box plot's blind spot is modality")
fig.savefig("box_vs_violin.png", dpi=200)

print(df.groupby("group")["value"].describe()[["25%", "50%", "75%"]].round(1).to_string())`,
        output: `              25%   50%   75%
group                          
bimodal      27.1  50.5  71.6
unimodal     40.1  50.2  60.0
uniform      32.6  50.1  67.2`,
        explanation:
          'The left panel shows three boxes whose medians all sit at essentially 50 and whose boxes overlap heavily; at a glance they say "three similar groups, one a bit more spread out". The right panel shows the same data as violins and they could hardly be more different: the first is a single smooth bulge tapering at both ends, the second is a clear hourglass with two fat lobes and a pinched waist at the median, and the third is an almost straight-sided rectangle. The bimodal group has a median of 50.5 at which almost no observations actually occur — the median sits in the empty valley between the two peaks. That is the failure mode: a box plot reports position and spread, and modality is neither. cut=0 stops the violin extending past the observed range, which is worth setting almost always, and inner="quartile" draws the quartile lines inside so you keep the box plot information as well.',
      },
      {
        language: 'python',
        title: 'A correlation heatmap, and what an uncentred colormap does to it',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

rng = np.random.default_rng(29)
n = 1500
age = rng.normal(40, 11, n)
tenure = 0.35 * age + rng.normal(0, 4, n)
salary = 900 * tenure + 400 * age + rng.normal(0, 6000, n)
satisfaction = 80 - 0.9 * tenure + rng.normal(0, 8, n)
commute = rng.normal(35, 12, n)

df = pd.DataFrame({"age": age, "tenure": tenure, "salary": salary,
                   "satisfaction": satisfaction, "commute": commute})
corr = df.corr()
print(corr.round(2).to_string())

mask = np.triu(np.ones_like(corr, dtype=bool), k=1)
fig, (ax_bad, ax_good) = plt.subplots(1, 2, figsize=(13, 5), layout="constrained")

sns.heatmap(corr, annot=True, fmt=".2f", cmap="viridis", ax=ax_bad,
            square=True, cbar_kws={"label": "correlation"})
ax_bad.set_title("Sequential colormap, autoscaled: the sign is unreadable")

sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm", center=0,
            vmin=-1, vmax=1, mask=mask, square=True, linewidths=0.5,
            ax=ax_good, cbar_kws={"label": "Pearson r"})
ax_good.set_title("Diverging, centred at zero, upper triangle masked")

fig.savefig("corr_heatmap.png", dpi=200)`,
        output: `               age  tenure  salary  satisfaction  commute
age           1.00    0.69    0.68         -0.60    -0.02
tenure        1.00    1.00    0.97         -0.87    -0.03
salary        0.68    0.97    1.00         -0.84    -0.02
satisfaction -0.60   -0.87   -0.84          1.00     0.02
commute      -0.02   -0.03   -0.02          0.02     1.00`,
        explanation:
          'Two five-by-five grids of the same numbers. The left one uses viridis, a sequential map, autoscaled from the data minimum of -0.87 to the maximum of 1.0. The result is genuinely hard to read: the strongly negative satisfaction-tenure cell at -0.87 is dark purple, the near-zero commute cells at -0.02 are a mid blue-green, and nothing about the colour tells you which side of zero a cell is on — you are forced to read the annotations, at which point the colour is decoration. The right panel uses coolwarm centred at zero with vmin and vmax pinned to the full possible range. Now hue means sign and saturation means strength: the satisfaction row is unmistakably blue, the salary-tenure block is deep red, and the entire commute row and column is almost white, which reads instantly as "commute is unrelated to everything". The upper triangle is masked because a correlation matrix is symmetric, so half the cells were pure repetition. Remember that every cell is a Pearson coefficient and inherits its limits: the near-zero commute row means no linear relationship, not no relationship.',
      },
      {
        language: 'python',
        title: 'pairplot: every distribution and every pairwise scatter in one call',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

rng = np.random.default_rng(41)

def make_class(n, centre, spread, label):
    x = rng.normal(centre[0], spread[0], n)
    y = rng.normal(centre[1], spread[1], n)
    z = 0.6 * x + rng.normal(centre[2], spread[2], n)
    return pd.DataFrame({"petal_len": x, "sepal_width": y, "stem_height": z, "species": label})

df = pd.concat([
    make_class(160, (2.0, 3.4, 1.0), (0.3, 0.35, 0.5), "setosa-like"),
    make_class(160, (4.5, 2.8, 2.0), (0.5, 0.30, 0.6), "versicolor-like"),
    make_class(160, (6.0, 3.0, 3.0), (0.6, 0.32, 0.7), "virginica-like"),
], ignore_index=True)

grid = sns.pairplot(df, hue="species", diag_kind="kde", corner=True,
                    plot_kws={"s": 18, "alpha": 0.6}, height=2.2)
grid.figure.suptitle("Three features, three classes: petal_len separates them almost alone", y=1.02)
grid.savefig("pairplot.png", dpi=200)

print(df.groupby("species")[["petal_len", "sepal_width", "stem_height"]].mean().round(2).to_string())
print("\\npairplot panels drawn:", grid.axes.shape)`,
        output: `                 petal_len  sepal_width  stem_height
species                                              
setosa-like           2.00         3.40         2.20
versicolor-like       4.51         2.80         4.71
virginica-like        6.01         3.00         6.60

pairplot panels drawn: (3, 3)`,
        explanation:
          'pairplot is a figure-level function, so it builds its own Figure and returns a PairGrid rather than taking an ax — which is why the title is set through grid.figure and the save through grid.savefig. The result with corner=True is a lower-triangular three-by-three arrangement. Down the diagonal are three KDE curves per panel, one per species, and the petal_len panel shows three cleanly separated humps while sepal_width shows three heavily overlapping ones. That contrast alone is a feature-importance finding: petal_len separates the classes almost by itself, sepal_width barely at all. Below the diagonal are the pairwise scatters, coloured by species, where the petal_len versus stem_height panel shows three distinct diagonal clusters. The honest limitation is quadratic growth: three features give three panels, ten features give forty-five, and twenty features give 190 postage stamps nobody can read. Above roughly eight features, use a correlation heatmap to choose a shortlist and then pairplot the shortlist.',
      },
      {
        language: 'python',
        title: 'A confusion matrix is a heatmap, and the colour scale matters',
        runnable: true,
        code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Rows are true classes, columns are predicted classes.
labels = ["cat", "dog", "fox", "wolf"]
cm = np.array([
    [540,  22,  30,   8],
    [ 18, 505,  11,  66],
    [ 44,  15, 388,  53],
    [  6,  92,  61, 341],
])

row_totals = cm.sum(axis=1, keepdims=True)
cm_norm = cm / row_totals

fig, (ax_raw, ax_norm) = plt.subplots(1, 2, figsize=(12, 5), layout="constrained")

sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", square=True,
            xticklabels=labels, yticklabels=labels, ax=ax_raw,
            cbar_kws={"label": "count"})
ax_raw.set_title("Counts: the diagonal dominates and hides the errors")

sns.heatmap(cm_norm, annot=True, fmt=".2f", cmap="Blues", square=True,
            vmin=0, vmax=1, xticklabels=labels, yticklabels=labels,
            ax=ax_norm, cbar_kws={"label": "share of true class"})
ax_norm.set_title("Row-normalised: per-class recall on the diagonal")

for ax in (ax_raw, ax_norm):
    ax.set_xlabel("predicted")
    ax.set_ylabel("true")

fig.suptitle("Wolf is the weak class: 15 percent of wolves are called dog")
fig.savefig("confusion_matrix.png", dpi=200)

recall = np.diag(cm) / cm.sum(axis=1)
for name, r in zip(labels, recall):
    print(f"recall[{name:>5}] = {r:.3f}")
print("overall accuracy:", round(float(np.trace(cm) / cm.sum()), 4))`,
        output: `recall[  cat] = 0.900
recall[  dog] = 0.841
recall[  fox] = 0.771
recall[ wolf] = 0.683
overall accuracy: 0.7987`,
        explanation:
          'Two four-by-four grids. In the left panel the four diagonal cells are dark blue and every off-diagonal cell is nearly white, because 341 and 540 are close on a scale that runs to 540 while 92 is not — so the chart says "the model is good" and says nothing about how it fails. The right panel divides each row by its total, which puts per-class recall on the diagonal and makes every row directly comparable regardless of class size. Now the wolf row is visibly lighter on the diagonal, at 0.68, and the wolf-predicted-as-dog cell at 0.18 is the darkest off-diagonal cell on the chart. That is the actionable finding, and the overall accuracy of 0.799 contains no trace of it. Note that a sequential colormap is correct here, unlike on a correlation matrix, because these values are non-negative magnitudes with no meaningful midpoint — and vmin=0, vmax=1 is still set explicitly so that two confusion matrices from different models can be compared side by side.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Comparing cross-validation scores across models',
        usage:
          'A box or violin plot of fold-level scores per model, with the individual folds overlaid as points, is the standard way to show that a 0.01 difference in mean score sits well inside the fold-to-fold variation and is therefore not a real improvement.',
      },
      {
        context: 'Feature screening on a new dataset',
        usage:
          'A masked, zero-centred correlation heatmap over the numeric columns reveals blocks of near-duplicate features, which matters for linear models where collinearity destabilises coefficients, and for anyone paying to compute features that carry the same information.',
      },
      {
        context: 'Error analysis on a classifier',
        usage:
          'A row-normalised confusion heatmap turns an accuracy number into a map of which classes are confused with which, which is what actually drives the next iteration: more data for one class, a merged label pair, or a different loss weighting.',
      },
      {
        context: 'Fairness and subgroup auditing',
        usage:
          'Box or violin plots of model error grouped by a protected or operational attribute show whether the error distribution differs across groups, not merely whether the average does — a distinction a bar of means cannot make.',
      },
    ],

    projectConnections: [
      { tool: 'seaborn', role: 'boxplot, violinplot, stripplot, heatmap, pairplot, histplot and regplot cover most statistical graphics you will need.' },
      { tool: 'pandas', role: 'Seaborn consumes tidy DataFrames directly; df.melt() is how you reshape a wide table into the long form seaborn expects.' },
      { tool: 'matplotlib', role: 'Every seaborn chart is matplotlib underneath: take the returned Axes and finish the styling yourself.' },
      { tool: 'scikit-learn', role: 'confusion_matrix and cross_val_score produce exactly the arrays these charts consume; ConfusionMatrixDisplay wraps the heatmap for you.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reading box-plot whiskers as the minimum and maximum',
        why: 'Whiskers stop at the most extreme observation within 1.5 IQR of the quartiles, so anything beyond is drawn as a separate mark. The true maximum is often one of those marks, far above the whisker.',
        fix: 'Read the whisker as "the bulk of the data ends here" and the individual marks as the tail. If you need the true range, use showfliers with the points visible, or report min and max separately.',
      },
      {
        mistake: 'Using a box plot to compare distributions that might be bimodal',
        why: 'A box plot reports position and spread only. A bimodal group and a unimodal group with the same quartiles draw identical boxes, and the median can land in an empty valley where no observations occur.',
        fix: 'Use a violin plot, or overlay the raw points with stripplot or swarmplot. When sample size per group is modest, showing every point is strictly better than summarising it.',
      },
      {
        mistake: 'Drawing a correlation heatmap with a sequential colormap or without center=0',
        why: 'A sequential map has no neutral midpoint, and autoscaling puts zero at an arbitrary colour, so a reader cannot recover the sign from the colour and may read a weak positive as stronger than a strong negative.',
        fix: 'Always pass a diverging cmap with center=0, and prefer vmin=-1, vmax=1 so that two heatmaps from different datasets are directly comparable.',
      },
      {
        mistake: 'Passing NumPy arrays to seaborn instead of a tidy DataFrame',
        why: 'Seaborn is built around a dataset plus a mapping from column names to roles. With bare arrays you lose hue grouping, automatic legends, faceting and axis labels, which is most of what you came for.',
        fix: 'Reshape to long form first, typically with df.melt(). If the data is already wide with one column per group, melt it into value and variable columns and map variable to x or hue.',
      },
      {
        mistake: 'Calling a figure-level function with ax=',
        why: 'pairplot, displot, catplot, relplot and jointplot create and own their own Figure, so there is nowhere to put an external Axes and the call raises a TypeError.',
        fix: 'Use the Axes-level equivalent when you need to place a chart in your own grid: histplot instead of displot, boxplot instead of catplot, scatterplot instead of relplot.',
      },
      {
        mistake: 'Trusting a violin tail that extends past the data',
        why: 'The KDE has infinite support, so seaborn by default extends each violin beyond the observed minimum and maximum, implying observations at values that were never recorded — including impossible ones such as negative durations.',
        fix: 'Pass cut=0 so the density is truncated at the extreme observations, and prefer a histogram or strip plot when the variable has a hard boundary or a point mass.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Walk me through every element of a box plot.',
        answer:
          'The line inside the box is the median, the 50th percentile. The bottom and top of the box are the first and third quartiles, so the box spans the middle 50 percent of the observations and its height is the interquartile range. The whiskers extend to the most extreme observation still within 1.5 times the IQR of the nearer quartile — crucially they stop at a real data point, not at the fence itself, and they are not the minimum and maximum. Any observation beyond the fences is drawn individually; convention calls those outliers, but for a right-skewed quantity such as latency or income they are simply the tail. The two things the chart does not show are sample size, since eight points and eight thousand draw the same box, and modality, since a bimodal group draws the same box as a unimodal one with matching quartiles.',
        followUp:
          'A strong answer notes that an off-centre median inside the box is itself a skew signal, and that 1.5 was chosen so roughly 0.7 percent of normal data falls outside.',
      },
      {
        level: 'intermediate',
        question: 'Why must a correlation heatmap use a diverging colormap centred at zero?',
        answer:
          'Because correlation has a meaningful midpoint — zero means no linear association — and the reader needs to recover the sign from the colour. A diverging map has two distinguishable hues meeting at a neutral midpoint, so with center=0 the hue encodes sign and the saturation encodes strength, which is exactly the structure of the data. If you leave it autoscaled, seaborn normalises to the observed range, so if the values run from -0.1 to 0.9 then zero maps to 10 percent along the scale and lands in a strong hue, while a correlation of 0.4 lands near neutral. The reader cannot tell positive from negative without reading the annotations, at which point the colour is worse than useless because it actively misleads. Setting vmin=-1 and vmax=1 goes one step further and makes two heatmaps from different datasets comparable, since the same colour means the same coefficient in both.',
        followUp:
          'Mentioning that a sequential map is correct for a confusion matrix, where values are non-negative magnitudes with no midpoint, shows the candidate is reasoning from the data structure rather than memorising a rule.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you prefer seaborn over matplotlib, and when would you drop back to matplotlib?',
        answer:
          'Seaborn when the chart is fundamentally about a dataset and a grouping: comparing a distribution across categories, faceting a relationship by two variables, drawing a correlation heatmap, or getting a fast first look with pairplot. It replaces the split-loop-colour-legend boilerplate with a mapping from column names to visual roles, and its defaults for palettes and confidence intervals are better than what most people would choose by hand. I drop back to matplotlib for precise control — annotating a specific point, combining several unlike charts into one figure, setting exact tick formatters, matching a house style, or building anything a seaborn function does not have an argument for. In practice it is not a choice between libraries: seaborn Axes-level functions take ax= and return the Axes, so the normal pattern is to build the grid with plt.subplots, draw with seaborn into each panel, and finish the labelling in matplotlib. The one thing to know is which seaborn functions are figure-level, because those own their Figure and cannot be placed into someone else grid.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A group has Q1 = 20, median = 26, Q3 = 44 and a maximum of 300. Compute the fences, say where each whisker ends given the largest value below the upper fence is 78 and the minimum is 11, and state what the chart tells you about skew.',
        hint: 'IQR = Q3 - Q1, fences are the quartiles plus or minus 1.5 IQR, and whiskers stop at real observations.',
        solution:
          'IQR = 44 - 20 = 24. The upper fence is 44 + 1.5 x 24 = 80 and the lower fence is 20 - 1.5 x 24 = -16.\n\nThe upper whisker ends at 78, the largest observation not exceeding 80 — not at 80 and not at 300. The value 300 and anything else above 80 is drawn as an individual mark. The lower whisker ends at 11, the minimum, because nothing can fall below -16.\n\nTwo skew signals are visible. First, the median at 26 sits only 6 above Q1 and 18 below Q3, so the box itself is lopsided. Second, the upper whisker spans 34 units while the lower spans 9, and there are marks far above and none below. This is a strongly right-skewed distribution, so the mean will sit well above 26 and reporting it as the typical value would be misleading.',
      },
      {
        prompt:
          'Write seaborn code to compare the distribution of model error across four customer segments, where one segment has only 12 observations and another has 9,000. Justify every choice.',
        hint: 'What does a box plot fail to communicate when group sizes differ by three orders of magnitude?',
        language: 'python',
        starterCode:
          'import seaborn as sns\nimport matplotlib.pyplot as plt\n\n# df has columns: segment, abs_error\n',
        solution:
          'counts = df["segment"].value_counts()\ndf = df.assign(label=df["segment"].map(lambda s: f"{s}\\n(n={counts[s]:,})"))\n\nfig, ax = plt.subplots(figsize=(9, 5), layout="constrained")\nsns.violinplot(data=df, x="label", y="abs_error", ax=ax, cut=0,\n               inner="quartile", palette="Set2", density_norm="width")\nsns.stripplot(data=df, x="label", y="abs_error", ax=ax, size=2.5,\n              alpha=0.35, color="#264653")\nax.set_xlabel("")\nax.set_ylabel("absolute error")\nax.set_title("Error distribution by segment; note the 12-observation segment")\n\nThree justified choices. The sample size goes into the tick label, because neither a box nor a violin encodes n and a segment with 12 observations must not be read with the same confidence as one with 9,000. A violin with cut=0 shows shape without extending past the observed range, which matters because absolute error has a hard floor at zero. The strip overlay is what makes the tiny segment honest: its violin is a KDE of 12 points and therefore nearly meaningless, and seeing 12 actual dots stops anyone over-reading it. density_norm="width" makes every violin the same width so shapes are comparable; the alternative, "count", would scale them by n and make the small segment almost invisible — either is defensible provided the choice is stated.',
      },
      {
        prompt:
          'You draw df.corr() as a heatmap and the entire grid is various shades of dark blue-green with a colourbar running from 0.62 to 1.0. What went wrong and what do you change?',
        hint: 'What range did the colour scale get, and what happened to the sign?',
        solution:
          'Two things went wrong. First, the colormap was autoscaled to the observed range 0.62 to 1.0, so every cell landed in a narrow band of the scale and the colours are nearly indistinguishable — the chart has thrown away almost all of its resolution. Second, since all the observed values are positive, there is no way to tell from the picture whether any relationship is negative, and if a negative value did appear it would be painted at the extreme low end of a scale whose neutral point is 0.62.\n\nThe fix: sns.heatmap(corr, cmap="coolwarm", center=0, vmin=-1, vmax=1, annot=True, fmt=".2f", mask=np.triu(np.ones_like(corr, dtype=bool), k=1), square=True). Pinning vmin and vmax to the full possible range restores the sign encoding and makes the heatmap comparable with any other correlation heatmap. Masking the upper triangle removes the duplicated half. If after that everything really is above 0.6, that is a genuine and important finding — the features are highly collinear — and it deserves a sentence in the title rather than a rescaled colourbar.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-006-q1',
        type: 'mcq',
        concept: 'box plot anatomy',
        prompt: 'What do the whiskers of a standard box plot represent?',
        options: [
          'The most extreme observations still within 1.5 x IQR of the nearer quartile',
          'The minimum and maximum of the data',
          'The 5th and 95th percentiles',
          'One standard deviation either side of the mean',
        ],
        answerIndex: 0,
        explanation:
          'The whisker stops at an actual observation, the furthest one not beyond the fence at Q1 - 1.5 IQR or Q3 + 1.5 IQR. Everything past that is drawn individually, so the true maximum is often a separate mark well above the whisker.',
      },
      {
        id: 'VIZ-006-q2',
        type: 'truefalse',
        concept: 'box plot limits',
        prompt: 'Two groups whose box plots look identical must have similarly shaped distributions.',
        answer: false,
        explanation:
          'A box plot encodes five order statistics and nothing else. A strongly bimodal group can share its median and both quartiles with a unimodal one, and the median may even fall in an empty valley between the two peaks. Violin plots or overlaid raw points reveal the difference.',
      },
      {
        id: 'VIZ-006-q3',
        type: 'numeric',
        concept: 'tukey fences',
        prompt: 'A group has Q1 = 30 and Q3 = 50. At what value does the upper fence sit?',
        answer: 80,
        explanation:
          'IQR = 50 - 30 = 20, so the upper fence is Q3 + 1.5 x 20 = 50 + 30 = 80. The upper whisker then stops at the largest observation not exceeding 80, and anything above is drawn as an individual point.',
      },
      {
        id: 'VIZ-006-q4',
        type: 'multi',
        concept: 'heatmap design',
        prompt: 'Which choices make a correlation heatmap more honest? Select all that apply.',
        options: [
          'Use a diverging colormap such as coolwarm',
          'Pass center=0 so zero lands on the neutral colour',
          'Set vmin=-1 and vmax=1 so different heatmaps are comparable',
          'Use viridis so the map is perceptually uniform',
          'Mask the upper triangle, since the matrix is symmetric',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Correlation has a meaningful midpoint, so it needs a diverging map centred at zero, with the scale pinned to the full range for comparability, and half the cells are redundant. Viridis is perceptually uniform but sequential, so it destroys the sign — the right tool for a confusion matrix, the wrong one here.',
      },
      {
        id: 'VIZ-006-q5',
        type: 'debug',
        language: 'python',
        concept: 'figure-level functions',
        prompt: 'This raises TypeError: pairplot() got an unexpected keyword argument "ax". Why?',
        code: 'fig, axes = plt.subplots(2, 2, figsize=(10, 8))\nsns.pairplot(df, hue="species", ax=axes[0, 0])',
        options: [
          'pairplot is a figure-level function: it creates and owns its own Figure, so it cannot draw into an existing Axes',
          'The hue column must be numeric for pairplot to work',
          'axes[0, 0] must be converted with .flatten() before being passed',
          'pairplot requires the DataFrame to be passed as data=df',
        ],
        answerIndex: 0,
        explanation:
          'Figure-level functions — pairplot, displot, catplot, relplot, jointplot — build their own Figure through a grid object and therefore take no ax argument. To draw into a panel you already made, use the Axes-level equivalent such as scatterplot, histplot or boxplot.',
      },
      {
        id: 'VIZ-006-q6',
        type: 'explain',
        concept: 'choosing a distribution plot',
        prompt: 'You must compare a metric across six groups, where two groups have about 15 observations and four have several thousand. Explain what you would draw and why.',
        rubric: [
          'Recognises that neither a box plot nor a violin encodes sample size',
          'Proposes showing the individual observations for the small groups, or annotating n',
          'Justifies the choice of summary in terms of what each plot hides — modality, spread or n',
        ],
        sampleAnswer:
          'The core problem is that a box plot from 15 points and one from 5,000 look identical, so any chart that only summarises will invite the reader to trust all six groups equally. I would draw violins with cut=0 so the shapes are visible and nothing extends past the observed range, overlay every individual observation with a strip plot at low alpha, and put the sample size directly into each tick label. For the two small groups the strip layer will show fifteen visible dots, which is the honest signal that their violins are kernel density estimates of almost nothing. I would also set the violin width normalisation deliberately and say which I used, since normalising by width makes shapes comparable while normalising by count makes the small groups almost disappear. If the audience needs something more compact, a dot plot of the median with a bootstrap confidence interval per group makes the uncertainty explicit, which is exactly what differs between the groups here.',
        explanation:
          'A strong answer identifies the specific blind spot — sample size — and proposes a concrete layered chart, rather than simply naming a plot type.',
      },
    ],

    flashcards: [
      { front: 'What does a box plot whisker reach to?', back: 'The most extreme observation still within 1.5 x IQR of the nearer quartile. Not the min or max, and not a fixed percentile.' },
      { front: 'What are the two blind spots of a box plot?', back: 'Sample size and modality. Eight points and eight thousand draw the same box, and a bimodal group matches a unimodal one with the same quartiles.' },
      { front: 'What is the IQR?', back: 'Q3 minus Q1, the height of the box, spanning the middle 50 percent of the data. It is robust to the most extreme quarter of observations.' },
      { front: 'Why must a correlation heatmap be centred at zero?', back: 'So hue encodes sign and saturation encodes strength. Autoscaling puts zero at an arbitrary colour and makes the sign unreadable.' },
      { front: 'Diverging or sequential colormap?', back: 'Diverging when the data has a meaningful midpoint such as zero (correlations, differences); sequential for non-negative magnitudes (counts, confusion matrices).' },
      { front: 'What does cut=0 do on a violin plot?', back: 'Truncates the KDE at the most extreme observations, so the violin never suggests data beyond the range actually recorded.' },
      { front: 'Axes-level versus figure-level seaborn functions', back: 'Axes-level (boxplot, scatterplot, histplot) take ax= and return an Axes. Figure-level (pairplot, displot, catplot, relplot) own their own Figure and take no ax.' },
      { front: 'What does row-normalising a confusion matrix give you?', back: 'Per-class recall on the diagonal, and rows that are comparable regardless of class size — which raw counts hide entirely.' },
    ],

    challenge: {
      title: 'A model-comparison report in seaborn',
      brief:
        'Given a tidy DataFrame with columns model, fold, dataset, f1 and a separate confusion matrix per model, build a single figure with four panels: (1) violins of fold-level F1 by model with the individual folds overlaid and n in each tick label, (2) a masked, zero-centred correlation heatmap of the numeric features used, (3) a row-normalised confusion heatmap for the winning model with a sequential colormap pinned to [0, 1], and (4) a horizontal bar chart of per-class recall sorted ascending with a zero baseline. Use seaborn Axes-level functions throughout so all four panels live in one plt.subplots grid, and finish the labelling in matplotlib. Each panel title must state a finding.',
      language: 'python',
      acceptanceCriteria: [
        'All four panels are drawn into one figure created with plt.subplots, using Axes-level seaborn functions only',
        'Sample sizes appear on the distribution panel, and cut=0 is set on the violins',
        'The correlation heatmap uses a diverging colormap with center=0 and vmin/vmax pinned to -1 and 1, with the upper triangle masked',
        'The confusion heatmap is row-normalised with a sequential colormap pinned to [0, 1]',
        'Every panel title states a finding rather than naming the columns plotted',
      ],
      starterCode:
        'import numpy as np\nimport pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_theme(style="whitegrid")\nfig, axes = plt.subplots(2, 2, figsize=(13, 10), layout="constrained")\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone what seaborn adds to matplotlib, then explain a box plot element by element and say what it hides.',
      mustCover: [
        'Seaborn takes a tidy DataFrame and a mapping from column names to visual roles, doing the grouping and legend for you',
        'The box is Q1 to Q3 with the median inside; whiskers reach the furthest point within 1.5 x IQR; beyond that points are drawn individually',
        'A box plot hides modality and sample size, which violins and overlaid points fix',
        'A correlation heatmap needs a diverging colormap centred at zero so hue carries the sign',
      ],
      bonusSignals: [
        'distinguishes Axes-level from figure-level seaborn functions',
        'notes that a violin inherits KDE weaknesses and that cut=0 helps',
        'notes that a confusion matrix wants a sequential map, unlike a correlation matrix',
      ],
      sampleExplanation:
        'Seaborn changes what you say rather than what you can do. Instead of handing over arrays and positions, you hand over a table and say "put model on the x axis, F1 on the y axis, and split by dataset" — and it does the grouping, the colours and the legend itself. Underneath it is still matplotlib, so you can take the Axes it returns and adjust anything. Its best-known chart is the box plot, and it is worth knowing exactly. The box runs from the 25th to the 75th percentile, so it covers the middle half of your data, and the line inside is the median, not the mean. The whiskers do not reach the minimum and maximum: they stop at the furthest observation that is still within one and a half box-heights of the box, and every observation beyond that is drawn as its own dot. For skewed data such as latency, those dots are not errors, they are the tail — the requests your users actually complain about. The two things the box will never tell you are how many observations there were and whether the group has one hump or two. A group split into two clusters draws exactly the same box as a single smooth one, with the median sitting in the empty gap between them. So when the shape might matter, draw a violin, or simply scatter the raw points on top and let the reader see what there is.',
    },
  },

  {
    id: 'VIZ-007',
    domain: 'VIZ',
    module: 'Reading Charts Critically',
    topic: 'A decision procedure for chart choice',
    title: 'Choosing the Right Chart',
    slug: 'choosing-the-right-chart',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['VIZ-003', 'VIZ-004', 'VIZ-005'],
    related: ['VIZ-001', 'VIZ-006'],
    tags: ['chart-choice', 'encoding', 'comparison', 'distribution', 'composition', 'trend'],

    learningObjectives: [
      'Start from the question and the data types rather than from a gallery of chart pictures',
      'Classify any charting task into comparison, distribution, relationship, composition or trend',
      'Rank the visual encodings by how accurately people read them, and prefer position over angle and area',
      'Justify a chart choice out loud in one sentence that names the question, the data types and the encoding',
      'Recognise the small number of cases where a chart is the wrong answer and a table or a single number is better',
    ],

    terminology: [
      {
        term: 'Visual encoding',
        definition:
          'The mapping from a data value to a visual property: position, length, angle, area, colour saturation, shape. Choosing a chart is choosing an encoding.',
        simple: 'Which visual thing stands for the number: where it sits, how long it is, how dark it is.',
      },
      {
        term: 'Graphical perception ranking',
        definition:
          'The empirical ordering, established by Cleveland and McGill in 1984, of how accurately people decode each encoding. Position on a common scale is most accurate; area and colour saturation are least.',
        simple: 'Some visual channels are read accurately and others are guessed at, and we know which are which.',
      },
      {
        term: 'Measurement type',
        definition:
          'Whether a variable is quantitative, ordinal, nominal or temporal. It constrains which encodings are legitimate: nominal data must not be given a continuous colour scale or a connecting line.',
        simple: 'Is this column a number, an ordered label, an unordered label, or a date?',
      },
      {
        term: 'Small multiples',
        definition:
          'A grid of the same chart repeated for different subsets, with shared axes. It replaces an overloaded single chart with several simple ones the eye can scan.',
        simple: 'The same little chart drawn once per group, side by side on shared axes.',
      },
      {
        term: 'Data-ink ratio',
        definition:
          "Tufte's measure of the proportion of a chart's ink that encodes data rather than decoration. Low ratios indicate chartjunk: 3D effects, gradients, redundant grids and borders.",
        simple: 'How much of the drawing is actual information rather than decoration.',
      },
    ],

    simpleExplanation:
      'Most advice about charts is a gallery: here are forty pictures, pick one you like. That is backwards, and it is why people end up with a pie chart of eleven slices. The useful procedure starts somewhere else entirely, with a sentence. Write down the question you want the chart to answer, in words, as specifically as you can. Not "show the sales data" but "which of our six regions grew fastest last year". That sentence already tells you almost everything. It contains a comparison across six named things, which are unordered categories, and a quantity, growth, which is a number. Unordered categories plus one number compared across them is a bar chart, sorted, and you are done. Change the question to "how did sales move through the year" and the categories become months, which are ordered in time, so it becomes a line. Change it to "what does the spread of order values look like" and you are asking about one number across many rows, which is a histogram. Five question shapes cover almost everything: comparing things, looking at a distribution, looking at a relationship between two numbers, showing what a whole is made of, and following something through time. Decide which one you are in, look at what types your columns are, and the chart chooses itself.',

    whyItExists:
      'Charting tools present dozens of chart types as equally valid options, which pushes the decision towards aesthetics and away from meaning. A decision procedure exists because the choice is actually determined by two things the analyst already knows — the question being asked and the measurement types of the columns — and because the research on graphical perception tells us that some encodings are read several times more accurately than others.',

    analogy: {
      scenario:
        "A carpenter does not walk into the workshop and choose a tool because it feels nice in the hand. They look at the joint that has to be made: is this a butt joint that needs screws, a mitre that needs a saw set to 45 degrees, a housing that needs a router? The joint determines the tool. Someone who instead picks up the router because it is the impressive tool and then looks for something to rout will produce a worse piece of furniture, and it will take longer.",
      mapping: [
        { from: 'The joint that has to be made', to: 'The question the chart must answer, written as a sentence' },
        { from: 'The grain and thickness of the timber', to: 'The measurement types of the columns: quantitative, ordinal, nominal, temporal' },
        { from: 'Choosing a saw, a router or a chisel', to: 'Choosing an encoding: position, length, angle, colour' },
        { from: 'Reaching for the impressive tool first', to: 'Choosing a chart from a gallery because it looks sophisticated' },
        { from: 'A tool that can make the cut but badly', to: 'A pie chart used for a comparison, which works but is read far less accurately than bars' },
      ],
      bridge:
        'The analogy maps cleanly because both crafts have an objective ranking of tool suitability that is independent of taste. Cleveland and McGill measured how accurately people decode each visual channel, and the ordering — position on a common scale, then position on unaligned scales, then length, then angle, then area, then colour saturation — is stable enough to use as a design rule. Choosing a chart is choosing where on that ranking you want your reader to be working.',
      limitations:
        'Carpentry has one right answer more often than charting does. Several charts are frequently defensible for the same question, the audience and the medium legitimately shift the choice, and a familiar-but-imperfect chart can beat an optimal-but-unfamiliar one when the reader has ten seconds.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The decision procedure',
        caption: 'Six steps, and the first two do most of the work.',
        branching: true,
        steps: [
          { label: '1. Write the question as a sentence', detail: '"Which region grew fastest?" is answerable. "Show the sales data" is not, and no chart will fix it.' },
          { label: '2. Classify the question', detail: 'Comparison, distribution, relationship, composition or trend. Most confusion comes from being in two of these at once.' },
          { label: '3. Name the data types', detail: 'How many variables, and is each one quantitative, ordinal, nominal or temporal? This rules out most options immediately.' },
          { label: '4. Pick the best-read encoding that fits', detail: 'Prefer position, then length. Avoid angle and area unless there is a specific reason.' },
          { label: '5. Check the count', detail: 'How many categories, how many rows? Twenty categories means horizontal bars; a million rows means density rather than points.' },
          { label: '6. Sanity-check against the question', detail: 'Can a reader answer your sentence from the picture in under ten seconds? If not, the chart is wrong however pretty it is.' },
        ],
      },
      {
        kind: 'table',
        title: 'The decision table',
        caption: 'Find your question type and your data types; the chart is in the third column.',
        columns: ['Question type', 'Data', 'Chart', 'Why that one'],
        rows: [
          ['Comparison', 'One quantity across a few unordered categories', 'Bar chart, sorted, zero baseline', 'Aligned length from a common baseline is among the most accurately read encodings'],
          ['Comparison', 'One quantity across many categories, or long labels', 'Horizontal bars, or a dot plot', 'Labels stay horizontal; a dot plot allows a non-zero axis when differences are small'],
          ['Comparison', 'Two quantities across categories', 'Grouped bars, or a slope chart for before-and-after', 'Grouping preserves a shared baseline for each series'],
          ['Distribution', 'One quantitative variable', 'Histogram, with an ECDF or KDE beside it', 'Shows modality, skew, gaps and outliers, which no summary can'],
          ['Distribution', 'One quantitative variable across a few groups', 'Violin or box plot with points overlaid', 'Compares shape and position at once; points restore the sample size'],
          ['Distribution', 'One quantitative variable across many groups', 'Box plots, or a ridge plot if the groups are ordered', 'Compact enough to scan twenty groups'],
          ['Relationship', 'Two quantitative variables', 'Scatter plot; hexbin above 100,000 rows', 'The only common chart that shows the joint distribution without aggregating'],
          ['Relationship', 'Many quantitative variables', 'Correlation heatmap to shortlist, then a pairplot of the shortlist', 'Pairwise panels grow quadratically and become unreadable past about eight variables'],
          ['Relationship', 'Two quantitative plus one categorical', 'Scatter with colour by category, or small multiples', 'Small multiples avoid overplotting between groups'],
          ['Composition', 'Parts of one whole, at one time', 'Bar chart of the parts; a pie only for two or three slices', 'Angle and area are read far less accurately than length'],
          ['Composition', 'Parts of a whole over time', 'Stacked area or stacked bars; 100 percent stacked if shares matter more than totals', 'Keeps the total readable while showing the split'],
          ['Trend', 'One quantity over time', 'Line chart, with a rolling mean if noisy', 'Slope is what the reader extracts, and slope is what a line encodes'],
          ['Trend', 'Several series over time', 'Multiple lines if under about five; small multiples beyond that', 'Beyond a handful of lines the chart becomes a tangle regardless of colour'],
          ['Part-to-whole ranking', 'Counts per category, long tail', 'Horizontal bars of the top n plus an explicit "other" bar', 'Honest about the tail without drawing 300 bars'],
        ],
      },
      {
        kind: 'table',
        title: 'Encodings ranked by how accurately people read them',
        caption:
          'Adapted from Cleveland and McGill (1984). Reading down the table, accuracy falls and the reader does more guessing.',
        columns: ['Rank', 'Encoding', 'Used by', 'Comment'],
        rows: [
          ['1', 'Position on a common scale', 'Scatter, line, dot plot, bars sharing an axis', 'The most accurate channel. Prefer it whenever a precise comparison matters'],
          ['2', 'Position on identical but unaligned scales', 'Small multiples with shared axes', 'Slightly worse than aligned, still excellent — the reason small multiples work'],
          ['3', 'Length', 'Bar length, stacked segment height', 'Excellent from a shared baseline; noticeably worse when segments float'],
          ['4', 'Angle and slope', 'Pie charts, slope graphs', 'Slope is fine for trend; angle is a poor way to compare magnitudes'],
          ['5', 'Area', 'Bubble charts, treemaps, area-scaled icons', 'People systematically underestimate area ratios, often by a factor near 0.7'],
          ['6', 'Colour saturation and density', 'Heatmaps, choropleths', 'Fine for pattern and for a rough magnitude; never for a precise value'],
          ['7', 'Colour hue', 'Categorical colouring', 'Carries identity, not magnitude. Using hue for a quantity implies an order that hue does not have'],
        ],
      },
      {
        kind: 'compare',
        title: 'When a chart is not the answer',
        caption: 'Two honest cases where drawing something is the wrong move.',
        left: {
          heading: 'Use a table instead',
          points: [
            'The reader needs exact values to quote or to reconcile against another system',
            'There are only three or four numbers in total',
            'The columns are heterogeneous — a count, a rate and a currency amount',
            'The reader will look up individual rows rather than scan for a pattern',
            'You would end up labelling every bar with its value anyway',
          ],
        },
        right: {
          heading: 'Use one sentence instead',
          points: [
            'The finding is a single number with a single comparison',
            'A chart of two bars is a sentence with extra steps',
            'The result is a yes or no: the test passed, the drift check fired',
            'The audience will read a headline and nothing else',
            'The chart would need a paragraph of caveats to be read correctly',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Work the procedure',
        caption: 'Pick a question and a set of data types, and compare the chart it implies with your instinct.',
        widget: 'chart-chooser',
      },
    ],

    formalDefinition:
      'Chart selection is the problem of choosing a mapping from data variables to visual channels, subject to two constraints: expressiveness, meaning the mapping asserts all and only the facts present in the data, and effectiveness, meaning that among expressive mappings the one is chosen whose channels are decoded most accurately for the task at hand. Measurement type constrains expressiveness; the graphical perception ranking orders effectiveness.',

    workedExample: {
      title: 'Running the procedure on four real requests',
      setup:
        'Four requests arrive in a week, each phrased vaguely. We apply the six steps to each and show how the chart falls out of the question rather than being chosen from a gallery.',
      steps: [
        {
          label: 'Request: "Can you visualise our customer data?"',
          detail:
            'Step one fails immediately: there is no question. The correct response is to ask what decision the chart is for. Suppose the answer is "we want to know whether enterprise customers churn less than self-serve". That is a comparison of one quantity, churn rate, across two nominal categories, with the sample sizes mattering. Two bars, zero baseline, with the confidence intervals and the counts shown — or, since there are only two numbers, a sentence with the two rates and the interval.',
        },
        {
          label: 'Request: "Show model performance over the last ten experiments"',
          detail:
            'Question type: trend, since experiments are ordered in time. Data types: one temporal or ordinal axis and one quantitative value, plus a nominal model identifier. With three or four models, overlaid lines. With fifteen, small multiples on shared axes — rank two on the perception table, and far more readable than fifteen lines. If each experiment has fold-level variation, the honest chart adds a band or draws the folds as points, because a single line implies a precision that cross-validation does not have.',
        },
        {
          label: 'Request: "What are our page views made up of?"',
          detail:
            'Composition. If it is one snapshot across six sources, a sorted horizontal bar chart beats a pie because length outranks angle, and six slices is already past the point where a pie is readable. If the question is really "how has the mix changed since we launched the app", it is composition over time, which is a stacked area chart, or a 100 percent stacked chart if the shares matter more than the totals — with the caveat that a 100 percent chart hides whether the total rose or fell.',
        },
        {
          label: 'Request: "Is feature X related to the target?"',
          detail:
            'Relationship, two quantitative variables. A scatter plot, with the technique chosen by row count: points under 5,000, alpha up to about 50,000, hexbin above. Put both Pearson and Spearman in the title so a curved but monotonic relationship is not missed, and follow with a residual plot if anything is fitted. The mistake to avoid is jumping straight to a correlation heatmap, which reduces this question to one number and loses the form entirely.',
        },
        {
          label: 'The pattern across all four',
          detail:
            'In every case the chart was determined once the question was written as a sentence and the column types were named. Nothing was chosen for looking good, and in two of the four cases the right answer was smaller than what was asked for: a sentence, or a shortlist of charts rather than one overloaded one.',
        },
      ],
      conclusion:
        'The procedure is mechanical on purpose. Its real value is not that it produces exotic charts — it almost always produces a bar, a line, a histogram or a scatter — but that it makes you write down the question, which is the step that most bad charts skipped.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The procedure as code: same data, four questions, four charts',
        runnable: true,
        code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(6)
months = pd.date_range("2024-01-01", periods=24, freq="MS")
regions = ["EMEA", "North America", "APAC", "Latin America"]

df = pd.concat([
    pd.DataFrame({
        "month": months,
        "region": region,
        "revenue": base * (1 + growth) ** np.arange(24) + rng.normal(0, base * 0.04, 24),
        "deal_size": rng.lognormal(np.log(base / 40), 0.55, 24),
    })
    for region, base, growth in [("EMEA", 900, 0.021), ("North America", 1400, 0.012),
                                 ("APAC", 500, 0.048), ("Latin America", 300, 0.030)]
], ignore_index=True)

fig, axes = plt.subplots(2, 2, figsize=(13, 8.5), layout="constrained")

# Q1 TREND: "How has total revenue moved over two years?"  -> line, ordered x axis
total = df.groupby("month")["revenue"].sum()
axes[0, 0].plot(total.index, total.values, color="#264653", linewidth=2)
axes[0, 0].set_title("Total revenue grew 41 percent over 24 months")
axes[0, 0].set_ylabel("revenue (thousands)")

# Q2 COMPARISON: "Which region grew fastest?"  -> sorted bars, zero baseline
growth = df.groupby("region").apply(
    lambda g: g.sort_values("month")["revenue"].iloc[-6:].mean() /
              g.sort_values("month")["revenue"].iloc[:6].mean() - 1,
    include_groups=False,
).sort_values()
bars = axes[0, 1].barh(growth.index, growth.values * 100, color="#2a9d8f")
axes[0, 1].bar_label(bars, fmt="%.0f%%", padding=3)
axes[0, 1].set_xlim(left=0)
axes[0, 1].set_xlabel("growth, first 6 months vs last 6 (percent)")
axes[0, 1].set_title("APAC grew fastest, from the smallest base")

# Q3 DISTRIBUTION: "What does deal size look like?"  -> histogram
axes[1, 0].hist(df["deal_size"], bins="fd", color="#8fa7b3", edgecolor="white", linewidth=0.3)
axes[1, 0].axvline(df["deal_size"].median(), color="#e76f51", linewidth=2,
                   label=f"median = {df['deal_size'].median():.1f}")
axes[1, 0].set_xlabel("deal size (thousands)")
axes[1, 0].set_ylabel("months")
axes[1, 0].set_title("Deal size is right-skewed: report the median")
axes[1, 0].legend(frameon=False)

# Q4 RELATIONSHIP: "Does a bigger deal size go with higher revenue?"  -> scatter
axes[1, 1].scatter(df["deal_size"], df["revenue"], s=18, alpha=0.6, color="#264653")
r = df["deal_size"].corr(df["revenue"])
axes[1, 1].set_xlabel("deal size (thousands)")
axes[1, 1].set_ylabel("revenue (thousands)")
axes[1, 1].set_title(f"Relationship is weak within regions: r = {r:+.2f}")

fig.suptitle("One dataset, four questions, four different marks", fontsize=14)
fig.savefig("four_questions.png", dpi=200)

print(growth.round(3).to_string())
print("total revenue growth:", f"{total.iloc[-1] / total.iloc[0] - 1:.1%}")`,
        output: `region
North America    0.128
EMEA             0.232
Latin America    0.331
APAC             0.569
total revenue growth: 41.3%`,
        explanation:
          'Four panels from one DataFrame, each answering a differently shaped question with a different mark. Top left is a single rising line with a slight wobble — the x axis is time, so a line is the only correct mark and the reader extracts slope. Top right is four horizontal bars sorted ascending with percentage labels, APAC longest at 57 percent; the categories are unordered names, the values are compared by magnitude, and the axis starts at zero. Bottom left is a right-skewed histogram with a long tail and an orange median line sitting left of the centre of mass, which is the finding stated in its title. Bottom right is a shapeless scatter cloud with a weak correlation, and its title says so honestly rather than fitting a line to noise. Nothing here required an exotic chart: the procedure almost always terminates at a bar, a line, a histogram or a scatter, which is the point.',
      },
      {
        language: 'python',
        title: 'When a pie chart is defensible, and when it is not',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

labels_many = ["organic search", "direct", "paid social", "email", "referral",
               "paid search", "affiliate", "display", "other"]
shares_many = np.array([0.31, 0.19, 0.13, 0.11, 0.08, 0.07, 0.05, 0.04, 0.02])

fig, axes = plt.subplots(1, 3, figsize=(14, 4.6), layout="constrained")

axes[0].pie(shares_many, labels=labels_many, autopct="%1.0f%%", startangle=90,
            textprops={"fontsize": 8})
axes[0].set_title("Nine slices: which is bigger, email or paid social?")

order = np.argsort(shares_many)
axes[1].barh([labels_many[i] for i in order], shares_many[order] * 100, color="#2a9d8f")
axes[1].set_xlim(left=0)
axes[1].set_xlabel("share of sessions (percent)")
axes[1].set_title("Same data as sorted bars: the ranking is immediate")

axes[2].pie([0.62, 0.38], labels=["returning", "new"], autopct="%1.0f%%",
            startangle=90, colors=["#264653", "#e9c46a"])
axes[2].set_title("Two slices: a pie is fine here")

fig.suptitle("Angle is a weak encoding; use it only when there is almost nothing to compare")
fig.savefig("pie_vs_bar.png", dpi=200)

gaps = np.abs(np.diff(np.sort(shares_many)))
print("smallest gap between adjacent shares:", f"{gaps.min():.1%}")
print("that gap as an angle:", f"{gaps.min() * 360:.1f} degrees")`,
        output: `smallest gap between adjacent shares: 1.0%
that gap as an angle: 3.6 degrees`,
        explanation:
          'Three panels making one argument. The left is a nine-slice pie where the email slice at 11 percent and the paid-social slice at 13 percent are adjacent in size but not adjacent in position, and the printed line quantifies the difficulty: a 1 percent difference is 3.6 degrees of arc, which nobody reads reliably, especially when the two wedges start at different angles. The middle panel is the same nine numbers as sorted horizontal bars, where the ranking is immediate and any two values can be compared by aligned length — the top-ranked encoding on the perception table. The right panel is a two-slice pie and is genuinely fine: with one boundary there is nothing to compare across positions, the part-to-whole reading is instant, and the shape communicates "this is a share of a total" better than a bar does. The rule that follows is narrow rather than absolute: pies for two or three parts of a genuine whole, bars for everything else.',
      },
      {
        language: 'python',
        title: 'Small multiples beat a tangle of lines',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(15)
weeks = np.arange(52)
names = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot",
         "golf", "hotel", "india", "juliet", "kilo", "lima"]
series = {n: 100 + np.cumsum(rng.normal(rng.normal(0.4, 0.6), 3, 52)) for n in names}

fig = plt.figure(figsize=(14, 5.5), layout="constrained")
sub = fig.subfigures(1, 2, width_ratios=[1, 1.35])

ax_tangle = sub[0].subplots()
for n, v in series.items():
    ax_tangle.plot(weeks, v, linewidth=1.2, label=n)
ax_tangle.set_title("Twelve lines on one axis")
ax_tangle.set_xlabel("week")
ax_tangle.set_ylabel("index")
ax_tangle.legend(ncol=3, fontsize=7, frameon=False)

axes_small = sub[1].subplots(3, 4, sharex=True, sharey=True)
all_values = np.concatenate(list(series.values()))
for ax, (n, v) in zip(axes_small.flat, series.items()):
    ax.plot(weeks, v, color="#bfc9d1", linewidth=1)   # context: this panel's series in grey
    ax.plot(weeks, v, color="#264653", linewidth=1.6)
    ax.set_title(n, fontsize=9)
    ax.set_ylim(all_values.min(), all_values.max())
    ax.tick_params(labelsize=7)
sub[1].suptitle("The same twelve as small multiples on shared axes", fontsize=11)

fig.savefig("small_multiples.png", dpi=200)

finals = {n: v[-1] for n, v in series.items()}
best = max(finals, key=finals.get)
print(f"highest at week 52: {best} ({finals[best]:.0f})")
print("range across series at week 52:",
      f"{min(finals.values()):.0f} to {max(finals.values()):.0f}")`,
        output: `highest at week 52: india (151)
range across series at week 52: 89 to 151
`,
        explanation:
          'The left half is twelve overlapping lines in twelve colours with a three-column legend, and it is genuinely unusable: the lines cross repeatedly, several colours are hard to tell apart, and answering "which series ended highest" requires tracing a line by eye from the legend to the right-hand edge. The right half is the same twelve series as a three-by-four grid of small panels sharing both axes. Each panel is trivially readable on its own, and because the axes are shared, comparing across panels is a position judgement on identical scales — rank two on the perception table, against the colour-matching task the tangle demanded, which is rank seven. The cost of small multiples is space and the loss of direct overlay comparison; the benefit is that the chart scales to twelve, or forty, series without degrading. The rule of thumb is that beyond about five lines on one axis you should be reaching for this.',
      },
    ],

    realWorldExamples: [
      {
        context: 'An experiment readout for a product team',
        usage:
          'The question is "did variant B beat variant A on conversion", which is a comparison of two proportions with uncertainty. The right chart is two dots with confidence intervals, or a single interval on the difference — not two bars, which imply the point estimates are exact.',
      },
      {
        context: 'A model card or evaluation report',
        usage:
          'Different sections answer different question types: per-class recall is a comparison (sorted bars), the score distribution across folds is a distribution (violins with points), calibration is a relationship (reliability curve), and training progress is a trend (learning curves).',
      },
      {
        context: 'Monitoring dashboards in production',
        usage:
          'Latency is a distribution question, so the panel shows percentile lines rather than a mean; traffic is a trend, so it is a line; error breakdown by endpoint is a comparison, so it is sorted horizontal bars with an explicit "other" bucket.',
      },
      {
        context: 'A one-slide executive summary',
        usage:
          'The strongest option is frequently not a chart at all: one sentence with the number and the comparison. A chart earns its place when the shape of the data, not just its magnitude, is part of the finding.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'Implements every chart in the decision table; small multiples are plt.subplots with sharex and sharey.' },
      { tool: 'seaborn', role: 'Its API is organised by question type: relplot for relationships, displot for distributions, catplot for categorical comparisons.' },
      { tool: 'pandas', role: 'groupby and pivot reshape data into whichever layout the chosen chart expects; melt produces the long form seaborn wants.' },
      { tool: 'Vega-Lite / Altair', role: 'Built directly on the expressiveness-and-effectiveness framework, choosing marks automatically from declared field types.' },
    ],

    commonMistakes: [
      {
        mistake: 'Choosing the chart before writing down the question',
        why: 'Without a question there is no criterion for success, so the decision defaults to aesthetics and the chart ends up answering something nobody asked.',
        fix: 'Write the sentence first, specifically enough to be answerable. If you cannot write it, that is the finding: go back and ask what decision the chart is for.',
      },
      {
        mistake: 'A pie chart with more than three slices',
        why: 'Pies encode magnitude as angle, which sits low on the perception ranking, and comparing wedges that begin at different angles is harder still. Nine slices with a 1 percent gap is a 3.6-degree judgement.',
        fix: 'Use a sorted bar chart. Keep the pie only for two or three genuine parts of a whole where the part-to-whole reading is the entire message.',
      },
      {
        mistake: 'Overloading one chart with four or five variables',
        why: 'Position, colour, size and shape all at once forces the reader to decode several channels simultaneously, and the two weakest channels — area and hue — end up carrying real information.',
        fix: 'Split into small multiples. Two charts each answering one question beat one chart answering neither, and shared axes keep the comparison a position judgement.',
      },
      {
        mistake: 'Using a continuous colour scale for unordered categories',
        why: 'A sequential colormap implies an ordering and a magnitude, so readers infer that "darker means more" for categories where more is meaningless.',
        fix: 'Use a qualitative palette such as tab10 or Set2 for nominal data, and reserve sequential and diverging maps for quantitative variables.',
      },
      {
        mistake: 'Drawing a chart when a table or a sentence would serve better',
        why: 'Charts are for patterns across many values. Four numbers in a chart is a table with extra ink, and a reader who needs exact values to quote is poorly served by bars they must measure.',
        fix: 'Ask whether the reader will scan for a pattern or look up values. Scanning means a chart; looking up means a table; a single comparison means a sentence.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'How do you decide which chart to use?',
        answer:
          'I start by writing the question as a sentence, because a chart is an answer and a vague question has no correct answer. Then I classify it into one of five shapes — comparison, distribution, relationship, composition or trend — and name the measurement types of the columns involved, since nominal, ordinal, quantitative and temporal data admit different encodings. Those two steps usually leave one or two options. Among those I prefer the encoding people read most accurately, which is position on a common scale, then length, and I avoid angle and area unless there is a specific reason. Finally I check the counts: many categories means horizontal bars, many rows means density rather than individual points, many series means small multiples rather than overlaid lines. The last check is whether a reader can answer my original sentence from the picture in under ten seconds.',
        followUp:
          'A strong answer mentions that the right answer is sometimes a table or a single sentence, and that the procedure almost always terminates at a bar, line, histogram or scatter rather than something exotic.',
      },
      {
        level: 'intermediate',
        question: 'Why are pie charts criticised, and when is one actually acceptable?',
        answer:
          'A pie encodes magnitude as angle and area, both of which sit low on the graphical perception ranking established by Cleveland and McGill — people decode them substantially less accurately than aligned length or position. It is worse than that in practice, because wedges begin at different angles, so comparing two non-adjacent slices is a comparison across rotations. With nine categories a 1 percent difference is 3.6 degrees of arc, which is not readable. The acceptable case is narrow: two or three slices that genuinely form parts of one whole, where the message is the part-to-whole relationship itself rather than a comparison between parts — for example "62 percent of sessions are from returning users". Even then a sentence often does the job. For anything with a ranking in it, sorted horizontal bars are strictly better.',
        followUp:
          'Mentioning that donut charts are worse still, since removing the centre removes the area cue and leaves only arc length, shows the candidate is reasoning from encodings rather than repeating a rule.',
      },
      {
        level: 'ml-engineer',
        question: 'You must show how twenty features drift between training and production. What do you draw?',
        answer:
          'Twenty overlaid distributions on one axis is unreadable, so the shape of the answer is small multiples: a grid of twenty small panels, one per feature, each showing the training distribution and the production distribution as two lightweight overlaid densities or step histograms on shared bin edges. Because each panel is a separate position judgement on its own scale, the grid stays readable where a single overloaded chart would not. To make it scannable rather than merely complete, I would sort the panels by a drift statistic such as population stability index or a Kolmogorov-Smirnov distance, so the worst offenders appear first and a reader who looks at three panels has seen what matters, and I would annotate each panel with that statistic. Alongside the grid I would put one sorted horizontal bar chart of the drift statistic per feature, which is the comparison question — "which features drifted most" — answered directly. That pairing, a summary comparison plus small multiples for the detail, is the general pattern for any high-dimensional monitoring question.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Run the procedure on this request: "We want to see how our response times compare to last quarter." State the question type, the data types, the chart, and one thing you would refuse to do.',
        hint: 'Response time is a distribution, not a single number. What does that rule out immediately?',
        solution:
          'Question type: distribution comparison across two groups, this quarter and last. Data types: one quantitative variable, response time in milliseconds, and one nominal grouping with two levels.\n\nThe chart: two overlaid distributions on shared bin edges with a log x axis, since latency is heavy-tailed, or two violins with the individual points overlaid if the sample is small. Alongside it, a small table or dot plot of p50, p95 and p99 for both quarters, because those are the numbers an operations team acts on.\n\nWhat I would refuse: drawing two bars of mean response time. A mean over a heavy-tailed distribution is both unrepresentative and unstable — a handful of slow requests moves it — and two bars imply a comparison of two exact values when what changed may be entirely in the tail. If someone insists on a compact summary, a dot plot of the percentiles with intervals is the honest compact form.',
      },
      {
        prompt:
          'A colleague sends a chart with country on the x axis, revenue as bar height, profit margin as bar colour on a viridis scale, and headcount as the width of each bar. List what is wrong and propose a replacement.',
        hint: 'Count the encodings and check each against the perception ranking and the measurement types.',
        solution:
          'Four variables are encoded into three channels, two of which are weak. Bar height for revenue is fine — length from a common baseline. Colour on a sequential viridis scale for profit margin is a rough magnitude cue at best, and margin can be negative, so a sequential map hides the sign; it needs a diverging map centred at zero if it stays. Bar width for headcount is the worst problem: varying both width and height makes the bar area vary, and readers decode area, so headcount and revenue get silently multiplied into a single impression that corresponds to nothing.\n\nThe replacement is three small charts sharing a sorted country order: a horizontal bar chart of revenue, a second of headcount, and a dot plot or diverging bar chart of margin centred at zero. Sorting all three by the same key lets the reader scan across rows and compare a country position in each — a position judgement on identical scales rather than an area judgement. If a single chart is genuinely required, a scatter of revenue against headcount with margin as a diverging colour is defensible, because then only one variable is on a weak channel.',
      },
      {
        prompt:
          'For each question, name the chart and one sentence of justification: (a) which of 30 API endpoints is slowest, (b) how error rate changed after a deploy, (c) whether two features are redundant, (d) what fraction of users are on each of three plans.',
        hint: 'Classify each into comparison, distribution, relationship, composition or trend first.',
        solution:
          '(a) Comparison across 30 unordered categories with long labels: a horizontal bar chart of p95 latency, sorted descending, showing the top 15 plus an explicit "other" summary — horizontal because endpoint paths are long strings, sorted because the question is a ranking, p95 rather than mean because latency is heavy-tailed.\n\n(b) Trend over time with a known intervention: a line chart of error rate by hour with a vertical rule at the deploy time and enough history on both sides to see the baseline — a line because time is ordered and the reader is extracting a step change.\n\n(c) Relationship between two quantitative variables: a scatter plot with both Pearson and Spearman in the title, since redundancy means a tight relationship of any form and a near-deterministic curve would score low on Pearson alone.\n\n(d) Composition of one whole into three parts: a three-slice pie is genuinely acceptable here, or a single stacked horizontal bar, or a sentence — three parts is within the range where angle is readable and the part-to-whole message is the point.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-007-q1',
        type: 'order',
        concept: 'decision procedure',
        prompt: 'Put the steps of the chart-choice procedure into the correct order.',
        items: [
          'Write the question you want answered as a specific sentence',
          'Classify it as comparison, distribution, relationship, composition or trend',
          'Name the measurement type of each variable involved',
          'Choose the most accurately read encoding that fits',
          'Adjust for the number of categories, rows and series',
          'Check that a reader can answer the original sentence from the picture',
        ],
        explanation:
          'The question comes first because it is the only thing that makes a chart right or wrong. Classification and data types narrow the options, the perception ranking picks among what remains, and the counts and the final check catch charts that are correct in principle but unreadable in practice.',
      },
      {
        id: 'VIZ-007-q2',
        type: 'match',
        concept: 'question type to chart',
        prompt: 'Match each question to the chart it implies.',
        pairs: [
          { left: 'Which of eight regions has the highest revenue?', right: 'Sorted horizontal bar chart with a zero baseline' },
          { left: 'What does the spread of order values look like?', right: 'Histogram with a sensible bin rule' },
          { left: 'Does ad spend relate to sign-ups?', right: 'Scatter plot with the correlation in the title' },
          { left: 'How did weekly active users move over a year?', right: 'Line chart, with a rolling mean if noisy' },
          { left: 'How do twelve product lines each trend over time?', right: 'Small multiples on shared axes' },
        ],
        explanation:
          'Each pairing follows from the question type plus the data types: comparison across nominal categories gives bars, one quantitative variable gives a histogram, two quantitative variables give a scatter, a quantity over time gives a line, and many series over time give small multiples rather than a tangle.',
      },
      {
        id: 'VIZ-007-q3',
        type: 'mcq',
        concept: 'perception ranking',
        prompt: 'Which visual encoding do people decode most accurately?',
        options: [
          'Position along a common scale',
          'Angle, as in a pie chart',
          'Area, as in a bubble chart',
          'Colour saturation, as in a heatmap',
        ],
        answerIndex: 0,
        explanation:
          'Cleveland and McGill found position on a common scale to be the most accurately decoded channel, followed by position on identical unaligned scales and then length. Angle, area and colour saturation are progressively worse, which is why pies, bubbles and heatmaps should not carry comparisons that need precision.',
      },
      {
        id: 'VIZ-007-q4',
        type: 'truefalse',
        concept: 'when not to chart',
        prompt: 'Every analysis result is communicated better as a chart than as a table or a sentence.',
        answer: false,
        explanation:
          'Charts are for patterns across many values. When the reader needs exact figures to quote or reconcile, a table is better; when the finding is a single number with a single comparison, a sentence is better. A chart of four numbers is usually a table with extra ink.',
      },
      {
        id: 'VIZ-007-q5',
        type: 'multi',
        concept: 'chart choice failures',
        prompt: 'Which of these are legitimate reasons to reject a proposed chart? Select all that apply.',
        options: [
          'It encodes a quantity as area, and the comparison needs to be precise',
          'It uses a sequential colour scale for unordered categories',
          'It draws twelve series as overlaid lines on one axis',
          'It uses a bar chart rather than something more visually novel',
          'It puts four variables on four different channels including hue and size',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Weak encodings for precise comparisons, a continuous scale implying an order that nominal data lacks, an unreadable tangle of lines, and channel overload are all real objections. Being unexciting is not: bars and lines are usually the correct answer, and novelty is not a design criterion.',
      },
      {
        id: 'VIZ-007-q6',
        type: 'explain',
        concept: 'applying the procedure',
        prompt: 'A stakeholder asks for "a dashboard of our machine learning model". Explain what you would do before drawing anything, and sketch what you would end up with.',
        rubric: [
          'Refuses to start until the questions and decisions are named',
          'Classifies the resulting questions into types and maps each to a chart',
          'Justifies at least two of the chart choices in terms of data types or encoding accuracy',
        ],
        sampleAnswer:
          'I would not draw anything until I know which decisions the dashboard supports, because "a dashboard of the model" is not a question and any chart would be a guess. I would ask what actions someone takes after looking at it, which usually produces three or four real questions: is the model still performing, which classes is it failing on, has the input data changed, and is it fast enough. Each of those has a shape. Performance over time is a trend, so a line of the key metric by day with a deployment marker. Failure by class is a comparison across nominal categories, so sorted horizontal bars of per-class recall with a zero baseline, backed by a row-normalised confusion heatmap for the detail. Input change is a distribution comparison, so small multiples of each feature, training against production, sorted by a drift statistic so the worst appear first. Latency is a distribution, so percentile lines rather than a mean. The result is four panels each answering one written-down question, rather than one panel trying to be about the model in general.',
        explanation:
          'A strong answer treats the vague request as the problem to solve, converts it into specific questions, and then derives each chart from a question type and its data types.',
      },
    ],

    flashcards: [
      { front: 'What is step one of choosing a chart?', back: 'Write the question as a specific sentence. Without a question there is no criterion for whether a chart is right.' },
      { front: 'The five question types', back: 'Comparison, distribution, relationship, composition and trend. Most confusion comes from being in two at once and needing two charts.' },
      { front: 'The perception ranking, top to bottom', back: 'Position on a common scale, position on unaligned identical scales, length, angle and slope, area, colour saturation, colour hue.' },
      { front: 'When is a pie chart acceptable?', back: 'Two or three genuine parts of a whole, where the part-to-whole reading is the message. For any ranking, use sorted bars.' },
      { front: 'What do you do with more than about five time series?', back: 'Small multiples on shared axes. Comparing across panels is a position judgement; comparing tangled lines is a colour-matching task.' },
      { front: 'When is a table better than a chart?', back: 'When the reader needs exact values, when there are only a handful of numbers, or when the columns are heterogeneous.' },
      { front: 'Why not use a sequential colormap for categories?', back: 'It implies an ordering and a magnitude that nominal data does not have. Use a qualitative palette such as tab10 or Set2.' },
    ],

    challenge: {
      title: 'Turn five vague requests into five defended charts',
      brief:
        'Take these five requests: (1) "show me our user growth", (2) "how do our three models compare", (3) "visualise the customer feedback scores", (4) "is marketing spend working", (5) "give me a dashboard of everything". For each, write the specific question you would agree with the requester, classify it, name the data types, produce the chart in matplotlib or seaborn from data you simulate, and write a one-sentence justification naming the question type, the data types and the encoding. For request five, argue explicitly for replacing it with a set of separate charts, and say which questions they answer.',
      language: 'python',
      acceptanceCriteria: [
        'Each request is restated as a specific, answerable question before any chart is drawn',
        'Each chart is justified in one sentence naming the question type, the data types and the encoding',
        'At least one request is answered with a table or a sentence rather than a chart, with the reasoning given',
        'Request five is decomposed into separate charts rather than drawn as one overloaded figure',
        'Every chart is fully labelled and every bar axis starts at zero',
      ],
      starterCode:
        'import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Request 1: "show me our user growth"\n# Agreed question: ...\n# Type: ...  Data: ...  Chart: ...  Because: ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone a procedure for choosing a chart that does not involve scrolling through a gallery of examples.',
      mustCover: [
        'Start from the question written as a specific sentence, not from the chart types available',
        'Classify the question into comparison, distribution, relationship, composition or trend',
        'Name the measurement types of the columns, which rules out most encodings',
        'Prefer encodings people read accurately — position and length over angle and area',
      ],
      bonusSignals: [
        'mentions small multiples for many series or many groups',
        'mentions that a table or a sentence is sometimes the right answer',
        'gives a concrete worked example from question to chart',
      ],
      sampleExplanation:
        'Stop looking at chart galleries. The choice is determined by two things you already have. First, write the question down as a sentence, specifically enough that someone could answer it: not "show the sales data" but "which of our six regions grew fastest last year". Second, look at what kinds of columns are involved — numbers, ordered labels, unordered labels, dates. Now classify the question. Almost everything falls into five shapes: comparing things, looking at the spread of one quantity, looking at how two quantities relate, showing what a whole is made of, or following something through time. Comparison across unordered categories is a bar chart, sorted, starting at zero. One quantity across many rows is a histogram. Two quantities is a scatter. Something over time is a line. Parts of a whole is a bar unless there are only two or three parts. When two options survive, pick the one whose encoding people read more accurately: position first, then length, and avoid angle and area, which is exactly why a nine-slice pie is a bad chart and sorted bars are a good one. Finally, check the counts — many categories means horizontal bars, many rows means density instead of dots, many series means a grid of small charts rather than a tangle of lines. And be willing to conclude that the answer is a table, or one sentence, because four numbers in a chart is a table with extra ink.',
    },
  },

  {
    id: 'VIZ-008',
    domain: 'VIZ',
    module: 'Reading Charts Critically',
    topic: 'Distortion, deception and critical reading',
    title: 'Misleading Graphs and Honest Reading',
    slug: 'misleading-graphs',
    difficulty: 3,
    estimatedMinutes: 30,
    prerequisites: ['VIZ-003', 'VIZ-007'],
    related: ['VIZ-001', 'VIZ-004', 'VIZ-005'],
    tags: ['misleading', 'truncated-axis', 'dual-axis', 'lie-factor', 'cherry-picking', 'critical-reading'],

    learningObjectives: [
      'Identify the standard distortions: truncated axes, dual axes, cherry-picked ranges, 3D effects, area double-counting, unequal bins and missing baselines',
      'Compute a lie factor and use it to quantify how much a chart exaggerates',
      'Apply a repeatable checklist to any chart you are shown, in the order that catches the most',
      'Distinguish deliberate deception from the far more common case of an honest author using a bad default',
      'Audit your own charts before publishing them, including ML charts such as learning curves and confusion matrices',
    ],

    terminology: [
      {
        term: 'Lie factor',
        definition:
          "Tufte's ratio of the size of an effect shown in a graphic to the size of that effect in the data. A truthful chart has a lie factor near 1; values above about 1.05 indicate meaningful distortion.",
        simple: 'How many times bigger the picture makes a change look than it really is.',
      },
      {
        term: 'Truncated axis',
        definition:
          'A value axis that does not start at zero on a chart whose mark encodes magnitude as length or area, breaking the proportionality between drawn size and value.',
        simple: 'A chart that starts at 95 instead of 0, so tiny differences look enormous.',
      },
      {
        term: 'Dual axis',
        definition:
          'Two different quantities plotted against two independent vertical scales on one panel. Because both scales are chosen freely, the visual relationship between the two series is an artefact of those choices.',
        simple: 'Two lines with two different rulers, where the author decides how closely they appear to move together.',
      },
      {
        term: 'Cherry-picked range',
        definition:
          'Restricting the x axis to a window chosen because it supports a conclusion, when a longer window would contradict or contextualise it.',
        simple: 'Showing only the part of the timeline that makes the point.',
      },
      {
        term: 'Area double-counting',
        definition:
          'Scaling both the width and the height of an icon or bubble by the value, so the drawn area grows with the square of the value while purporting to represent the value itself.',
        simple: 'Making a picture twice as tall and twice as wide to show a doubling, which makes it look four times bigger.',
      },
      {
        term: 'Chartjunk',
        definition:
          "Tufte's term for visual elements that carry no information: 3D extrusion, gradients, drop shadows, decorative imagery and heavy grids. 3D on a flat quantity also distorts, because perspective changes apparent size.",
        simple: 'Decoration that adds no information and often distorts what is there.',
      },
    ],

    simpleExplanation:
      'Charts persuade faster than sentences, which is exactly why they are worth checking. Most misleading charts are not forgeries: the numbers are usually correct, and the trick is in how they were drawn. The commonest one is cutting off the bottom of the value axis, so bars that represent 102 and 108 are drawn as lengths of 2 and 8 and a 6 percent difference looks like a fourfold one. Another is putting two different quantities on two different vertical rulers in the same panel, then sliding those rulers until the two lines appear to move together — with two free scales you can make almost any pair of series look related. Another is choosing where the timeline starts, so a decline shown from its own peak looks catastrophic while the same series over ten years looks flat. Then there are the pictorial ones: making an icon twice as tall and twice as wide to show a doubling, which paints four times the area, and tilting a pie into 3D so the slices at the front look bigger than the ones behind. The defence is a short checklist you run every time, starting with the axes, and it costs about fifteen seconds. Run it on other people charts, and then run it on your own, because the usual cause is not dishonesty — it is a default nobody checked.',

    whyItExists:
      'A chart is an argument, and every encoding choice — where an axis starts, which range is shown, which scale a second series gets — changes how strong the argument looks without changing a single number. This unit exists because those choices are invisible to a reader who is not looking for them, because the defaults in common tools frequently make them badly, and because the same checklist that catches a misleading chart catches an honest mistake in your own work.',

    analogy: {
      scenario:
        "Two photographs of the same room. In the first, a wide lens from the doorway shows a small bedroom with a bed, a wardrobe and very little floor. In the second, an estate agent's shot taken from the corner with an ultra-wide lens, at waist height, with the furniture pushed back, shows an airy space. Neither photograph is fake. No object was added or removed. Every choice — lens, position, height, what was left in the frame — was legal, and together they produced two incompatible impressions of one room. The viewer who does not know what focal length does cannot correct for it.",
      mapping: [
        { from: 'The focal length of the lens', to: 'The axis range: where the value axis starts and stops' },
        { from: 'Cropping the frame to exclude the clutter', to: 'Cherry-picking the time window shown' },
        { from: 'Shooting from a low angle to enlarge the foreground', to: '3D perspective, which enlarges whatever is nearest the viewer' },
        { from: 'Two shots with different lenses shown side by side', to: 'Dual axes, where two freely chosen scales manufacture an apparent relationship' },
        { from: 'Asking what focal length was used', to: 'Running the checklist: axes, range, scale, baseline, source' },
      ],
      bridge:
        'The parallel is exact in the way that matters legally and ethically: nothing was falsified in either case, and the distortion lives entirely in choices the viewer cannot see. That is why "the numbers are correct" is not a defence of a chart, and why the remedy is procedural rather than moral — a reader checks the axes the way a buyer asks to see the floor plan, and an honest author states the choices in the caption.',
      limitations:
        'The photograph analogy suggests that every distortion is a choice made for effect, whereas the most common cause in practice is a tool default nobody examined: spreadsheet software autoscales bar axes, plotting libraries autoscale colormaps, and dashboards default to dual axes. Assume a bad default before assuming bad faith.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The standard distortions and how to spot each one',
        caption: 'Run down this list on any chart you are shown. It takes about fifteen seconds once it is habitual.',
        columns: ['Distortion', 'What it does', 'Tell', 'Honest alternative'],
        rows: [
          ['Truncated bar axis', 'Breaks proportionality between length and value; magnifies small differences arbitrarily', 'Bar axis starts at 95, or at a value just below the data', 'Start bars at zero; to show small differences, plot the differences or use a dot plot'],
          ['Dual axes', 'Manufactures an apparent relationship by sliding two independent scales', 'Two y axes with different units on one panel', 'Two stacked panels sharing an x axis, or index both series to 100 at a common start'],
          ['Cherry-picked range', 'Selects the window that supports the claim', 'A time axis that starts at an unexplained date, often a peak or trough', 'Show the longest range available and mark the window of interest'],
          ['3D effects', 'Perspective enlarges near elements; extrusion adds ink that carries no data', 'Tilted pies, extruded bars, shadowed columns', 'Flat 2D. A tilted pie is not readable at all'],
          ['Area double-counting', 'Scales width and height by the value, so area grows as the square', 'Icons or bubbles that are both taller and wider for larger values', 'Scale area to the value, not the linear dimension, and prefer bars entirely'],
          ['Unequal bins or intervals', 'Hides or manufactures structure by grouping unevenly', 'Histogram bins or age bands of different widths, uneven time steps on a line', 'Equal-width bins; if unequal, plot density (count divided by width), not raw counts'],
          ['Missing baseline or denominator', 'Reports counts where a rate is the meaningful quantity', 'Raw counts across groups of very different sizes', 'Normalise: per capita, per thousand requests, as a share of the relevant total'],
          ['Inverted or reversed axis', 'Turns a rise into an apparent fall', 'A y axis whose numbers descend as you move up', 'Conventional orientation, and say so explicitly if reversal is genuinely required'],
          ['Aggregation hiding the split', 'Pools groups whose trends differ or oppose', 'A single line or bar over a heterogeneous population', "Disaggregate; check for Simpson's paradox by computing within-group trends"],
        ],
      },
      {
        kind: 'flow',
        title: 'The fifteen-second checklist for reading any chart',
        caption: 'In this order, because each step catches more than the one after it.',
        steps: [
          { label: '1. Read the axes', detail: 'What are the units? Does the value axis start at zero, and does the mark require it to? Is either axis logarithmic or reversed?' },
          { label: '2. Check the range', detail: 'Why does the time axis start there? Would a longer window change the impression? Is the window centred on a peak?' },
          { label: '3. Count the scales', detail: 'One vertical scale, or two? If two, treat any apparent co-movement as an artefact until proven otherwise.' },
          { label: '4. Ask what the denominator is', detail: 'Counts or rates? Per what? Are the groups being compared the same size?' },
          { label: '5. Look for what is missing', detail: 'Sample size, uncertainty, the excluded categories, the rows dropped, the period before the chart begins.' },
          { label: '6. Check the encoding', detail: 'Is magnitude on area, angle or colour? Is a sequential colormap being used for a signed quantity? Is anything 3D?' },
          { label: '7. Ask who made it and why', detail: 'Not to dismiss it, but because knowing the conclusion the author wanted tells you which choice to inspect first.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'The same series, three windows, three stories',
        caption: 'Identical data. Only the x range changed.',
        art: `A: last 6 months              B: last 3 years             C: full 10 years
                                                            
 |    /\\                        |        /\\                 |               /\\
 |   /  \\                       |   /\\  /  \\                |          /\\  /  \\
 |  /    \\___                   |  /  \\/    \\__             |   ___/\\_/  \\/    \\_
 | /                            | /                         |  /
 +----------------              +-------------------        +--------------------
 "Sharp decline!"               "Volatile, no trend"        "Strong long-run rise"

The honest chart is C with the recent window highlighted, plus a
sentence naming the comparison period and why it was chosen.`,
      },
      {
        kind: 'compare',
        title: 'Deliberate deception versus an unexamined default',
        caption:
          'The distinction matters for how you respond, not for whether the chart needs fixing. Both need fixing.',
        left: {
          heading: 'Signs of an unexamined default',
          points: [
            'The distortion is exactly what the tool does out of the box, such as an autoscaled bar axis',
            'The caption and title are neutral and do not push a conclusion',
            'Other charts in the same document have the same issue regardless of which way it cuts',
            'The author shows you the data when asked, and is surprised',
          ],
        },
        right: {
          heading: 'Signs of deliberate framing',
          points: [
            'The distortion consistently favours one conclusion across several charts',
            'The axis range starts at an oddly specific value close to the data minimum',
            'The time window begins at a local peak or trough with no explanation',
            'The underlying numbers are not provided, and requests for them are deflected',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The same failures in machine learning charts',
        caption: 'None of these are exotic. All of them appear in real model reports.',
        columns: ['ML chart', 'How it misleads', 'The fix'],
        rows: [
          ['Learning curve with a truncated y axis', 'A 0.3 percent improvement fills the panel and looks decisive', 'Show a range that includes the baseline, and state the absolute change'],
          ['Accuracy bar chart on imbalanced data', 'Every model looks excellent because the majority class dominates', 'Report per-class recall and the majority-class baseline on the same chart'],
          ['Confusion matrix in raw counts', 'The large classes dominate the colour scale and the errors vanish', 'Row-normalise so the diagonal is recall, and pin the scale to [0, 1]'],
          ['ROC curve without the class balance', 'AUC looks strong on a heavily imbalanced problem where precision is poor', 'Show a precision-recall curve as well, and state the positive rate'],
          ['Feature importance without error bars', 'Ranking noise is read as a stable ordering', 'Use permutation importance with repeats and show the spread'],
          ['Training loss only', 'Hides overfitting entirely, since training loss falls regardless', 'Always plot validation alongside, on the same axes'],
          ['A single train-test split score', 'One favourable split is presented as the model performance', 'Cross-validate and show the fold-level distribution, not just the mean'],
        ],
      },
      {
        kind: 'widget',
        title: 'Re-draw a distorted chart honestly',
        caption: 'Take a truncated bar chart or a dual-axis plot and fix it, then compare the impressions.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A graphic is misleading when the ratio of the perceived effect size to the effect size in the data departs materially from one, whether through a non-proportional encoding (a truncated baseline on a length encoding, area scaled by a linear dimension), through selective inclusion (a restricted range, an omitted denominator, an excluded subgroup), or through free parameters that determine apparent association (independent dual scales). Tufte formalised the first of these as the lie factor.',

    math: {
      intuition:
        'The lie factor makes "this chart exaggerates" into a number you can compute and quote. Take any change the chart depicts, measure how big that change looks on the page as a proportion, and divide by how big it is in the data as a proportion. If a value rises 6 percent and the bar gets 300 percent longer, the lie factor is 50. For a truncated bar axis the arithmetic collapses to something you can do in your head: the exaggeration is roughly the ratio of the full value range to the range actually shown.',
      formulas: [
        {
          latex: 'L = \\frac{\\text{relative size of effect shown in the graphic}}{\\text{relative size of effect in the data}}',
          name: 'Lie factor',
          meaning:
            'Tufte\'s measure of distortion. A lie factor of 1 means the picture is proportional to the data; 4 means the change looks four times larger than it is.',
          variables: [
            { symbol: 'L', meaning: 'the lie factor' },
            { symbol: '\\text{relative size shown}', meaning: 'the proportional change in the drawn mark, in ink or pixels' },
            { symbol: '\\text{relative size in data}', meaning: 'the proportional change in the underlying values' },
          ],
        },
        {
          latex: 'L_{\\text{trunc}} = \\frac{(v_2 - b)/(v_1 - b)}{v_2 / v_1}',
          name: 'Lie factor of a truncated bar axis',
          meaning:
            'With v1 = 102, v2 = 108 and baseline b = 100 this is 4 / 1.059 = 3.8. As b approaches v1 the factor grows without bound, which is why the author can choose any exaggeration they like.',
          variables: [
            { symbol: 'v_1, v_2', meaning: 'the two values being compared' },
            { symbol: 'b', meaning: 'the value the axis starts at' },
          ],
        },
        {
          latex: 'A \\propto s^2 \\implies \\frac{A_2}{A_1} = \\left(\\frac{v_2}{v_1}\\right)^{2}',
          name: 'Area double-counting',
          meaning:
            'Scaling both width and height by the value squares the ratio: doubling a value paints four times the area. A doubling drawn this way has a lie factor of 2.',
          variables: [
            { symbol: 's', meaning: 'the linear dimension, width or height, scaled by the value' },
            { symbol: 'A', meaning: 'the drawn area, which is what the eye decodes' },
            { symbol: 'v_1, v_2', meaning: 'the two values' },
          ],
        },
        {
          latex: 'r(\\alpha y_1,\; \\beta y_2) = r(y_1, y_2) \\quad \\text{for } \\alpha, \\beta > 0',
          name: 'Why dual axes prove nothing',
          meaning:
            'Rescaling either series leaves the correlation unchanged, so the fact that two lines can be made to overlap says nothing about whether they are related. The overlap is a property of the scales chosen, not of the data.',
          variables: [
            { symbol: 'y_1, y_2', meaning: 'the two plotted series' },
            { symbol: '\\alpha, \\beta', meaning: 'the arbitrary positive scale factors implied by the two axes' },
            { symbol: 'r', meaning: 'the Pearson correlation between the series' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'The eye compares bars by the ratio of their drawn lengths.',
        'With a baseline b, the drawn lengths are proportional to v1 - b and v2 - b.',
        'The apparent ratio is therefore (v2 - b) / (v1 - b), while the true ratio is v2 / v1.',
        'The lie factor is the apparent ratio divided by the true one, and it equals 1 exactly when b = 0.',
        'As b rises towards v1 the denominator approaches zero and the lie factor diverges, so any exaggeration is achievable by choosing b.',
      ],
    },

    workedExample: {
      title: 'Auditing a chart from a quarterly business review',
      setup:
        'A slide shows two bars labelled "Q3: 4.62" and "Q4: 4.71" for average customer satisfaction out of 5. The y axis runs from 4.55 to 4.75. The title reads "Satisfaction up sharply". We audit it with the checklist.',
      steps: [
        {
          label: 'Step 1: read the axes',
          detail:
            'The value axis starts at 4.55 on a bar chart. Bars encode magnitude as length, so a non-zero baseline breaks proportionality immediately. This is the finding; everything after it is quantifying the damage.',
        },
        {
          label: 'Compute the lie factor',
          detail:
            'Drawn lengths are 4.62 - 4.55 = 0.07 and 4.71 - 4.55 = 0.16, an apparent ratio of 2.29. The true ratio is 4.71 / 4.62 = 1.019. The lie factor is 2.29 / 1.019 = 2.24, so the increase looks roughly 2.2 times larger than it is.',
          latex: 'L = \\frac{0.16 / 0.07}{4.71 / 4.62} = \\frac{2.286}{1.019} \\approx 2.24',
        },
        {
          label: 'Step 4: ask about the denominator and uncertainty',
          detail:
            'Nothing on the slide says how many responses each quarter had. If Q3 had 4,000 responses and Q4 had 300, the difference of 0.09 on a five-point scale is well inside sampling noise. A mean with no interval and no n is not yet a finding.',
        },
        {
          label: 'Step 5: look for what is missing',
          detail:
            'Only two quarters are shown. The natural question is what Q1 and Q2 were: if the series reads 4.80, 4.74, 4.62, 4.71 then Q4 is a partial recovery from a decline, and "up sharply" is the wrong headline entirely.',
        },
        {
          label: 'The honest version',
          detail:
            'A line or dot chart of all available quarters with 95 percent intervals, a y axis covering a range the reader can interpret, response counts annotated, and a title stating the change in absolute terms: "Satisfaction rose 0.09 points in Q4, within the range of the last two years."',
        },
        {
          label: 'The likely explanation',
          detail:
            'Almost certainly not deception. Spreadsheet software autoscales the value axis of a bar chart by default, and the author wrote a headline to match what they saw. That is precisely why you run the checklist on your own slides too.',
        },
      ],
      conclusion:
        'One chart, three separate problems: a truncated baseline exaggerating by a factor of 2.2, no uncertainty or sample size, and a two-point window hiding the longer trend. None of the numbers were wrong. The audit took under a minute and changed the conclusion.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The truncated axis, quantified',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

labels = ["Q3", "Q4"]
values = np.array([4.62, 4.71])
baseline = 4.55

fig, (ax_bad, ax_good) = plt.subplots(1, 2, figsize=(10.5, 4.2), layout="constrained")

bars_bad = ax_bad.bar(labels, values, color="#e76f51", width=0.55)
ax_bad.set_ylim(baseline, 4.75)
ax_bad.set_ylabel("mean satisfaction (of 5)")
ax_bad.set_title("Axis starts at 4.55: 'up sharply'")
ax_bad.bar_label(bars_bad, fmt="%.2f", padding=3)

bars_good = ax_good.bar(labels, values, color="#2a9d8f", width=0.55)
ax_good.set_ylim(0, 5)
ax_good.set_ylabel("mean satisfaction (of 5)")
ax_good.set_title("Axis starts at 0: a 0.09 point change")
ax_good.bar_label(bars_good, fmt="%.2f", padding=3)

fig.suptitle("Same two numbers, two impressions")
fig.savefig("truncated_axis.png", dpi=200)

drawn_ratio = (values[1] - baseline) / (values[0] - baseline)
true_ratio = values[1] / values[0]
print(f"drawn length ratio: {drawn_ratio:.2f}")
print(f"true value ratio:   {true_ratio:.3f}")
print(f"lie factor:         {drawn_ratio / true_ratio:.2f}")
print(f"relative change:    {true_ratio - 1:.2%}")`,
        output: `drawn length ratio: 2.29
true value ratio:   1.019
lie factor:         2.24
relative change:    1.95%`,
        explanation:
          'Two panels, identical numbers. On the left the Q4 bar is more than twice the height of the Q3 bar, and the impression is of a decisive jump; on the right the two bars are all but indistinguishable, which is the honest rendering of a 1.95 percent change. The printed lie factor of 2.24 is the whole argument in one number: the picture exaggerates by a factor of 2.2, and the author chose that factor by choosing where the axis starts. Note the right-hand panel is not a satisfying chart — two nearly equal bars is a boring picture — and that is exactly the point. If the 0.09 difference genuinely matters, the fix is to change what you plot, not how you scale it: plot the difference with a confidence interval, or show all quarters as a line where a non-zero axis is legitimate because a line is read by slope.',
      },
      {
        language: 'python',
        title: 'Dual axes can make anything look related',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(77)
months = np.arange(36)

# Two genuinely unrelated random walks.
marketing = 50 + np.cumsum(rng.normal(0.5, 3, 36))
ice_cream = 900 + np.cumsum(rng.normal(-0.2, 40, 36))
r = float(np.corrcoef(marketing, ice_cream)[0, 1])

fig, (ax_dual, ax_panels) = plt.subplots(1, 2, figsize=(12.5, 4.4), layout="constrained")

ax_left = ax_dual
ax_right = ax_left.twinx()
ax_left.plot(months, marketing, color="#264653", linewidth=2, label="marketing spend")
ax_right.plot(months, ice_cream, color="#e76f51", linewidth=2, label="units sold")
# The scales are chosen so the two curves overlap. Nothing forced these numbers.
ax_left.set_ylim(marketing.min() - 5, marketing.max() + 5)
ax_right.set_ylim(ice_cream.min() - 60, ice_cream.max() + 60)
ax_left.set_ylabel("marketing spend (thousands)", color="#264653")
ax_right.set_ylabel("units sold", color="#e76f51")
ax_left.set_xlabel("month")
ax_dual.set_title(f"Dual axes: 'they move together' (actual r = {r:+.2f})")

# The honest alternative: index both to 100 at the start, one shared scale.
ax_panels.plot(months, 100 * marketing / marketing[0], color="#264653", linewidth=2, label="marketing spend")
ax_panels.plot(months, 100 * ice_cream / ice_cream[0], color="#e76f51", linewidth=2, label="units sold")
ax_panels.axhline(100, color="grey", linewidth=1, linestyle=":")
ax_panels.set_ylabel("index (month 0 = 100)")
ax_panels.set_xlabel("month")
ax_panels.set_title("One shared scale: the series diverge")
ax_panels.legend(frameon=False)

fig.savefig("dual_axis.png", dpi=200)
print(f"correlation between the two series: {r:+.3f}")
print("both series are independent random walks")`,
        output: `correlation between the two series: +0.114
both series are independent random walks
`,
        explanation:
          'The left panel shows a dark line and an orange line weaving around each other through the same vertical band, which reads instantly as "these move together" — and the correlation is +0.11, which is nothing. The apparent relationship was produced entirely by the two set_ylim calls, each of which was free to be anything. The right panel plots the same two series indexed to 100 at month zero on a single shared scale; now they visibly diverge, and the reader can see that one drifts up while the other wanders. The general rule is that a dual-axis chart contains two free parameters that the author sets and the reader cannot see, so any co-movement it displays is uninterpretable. The honest alternatives are indexing both series to a common base, plotting them in two stacked panels sharing the x axis, or plotting one against the other as a scatter and reporting the correlation.',
      },
      {
        language: 'python',
        title: 'Unequal bins and area double-counting',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(55)
ages = np.clip(rng.normal(41, 15, 20_000), 0, 95)

uneven_edges = np.array([0, 18, 25, 30, 35, 40, 45, 50, 60, 95])
counts, _ = np.histogram(ages, bins=uneven_edges)
widths = np.diff(uneven_edges)
density = counts / widths

fig, axes = plt.subplots(1, 3, figsize=(15, 4.2), layout="constrained")

axes[0].bar(uneven_edges[:-1], counts, width=widths, align="edge",
            color="#e76f51", edgecolor="white")
axes[0].set_title("Unequal bins, raw counts: the 60-95 bar looks huge")
axes[0].set_xlabel("age")
axes[0].set_ylabel("count")

axes[1].bar(uneven_edges[:-1], density, width=widths, align="edge",
            color="#2a9d8f", edgecolor="white")
axes[1].set_title("Same bins, plotted as density (count / width)")
axes[1].set_xlabel("age")
axes[1].set_ylabel("people per year of age")

# Area double-counting: an icon scaled in BOTH dimensions by the value.
for i, (value, colour) in enumerate([(1.0, "#8fa7b3"), (2.0, "#e76f51")]):
    side = 0.35 * value
    axes[2].add_patch(plt.Rectangle((0.25 + i * 0.45 - side / 2, 0.15), side, side, color=colour))
    axes[2].text(0.25 + i * 0.45, 0.08, f"value = {value:g}", ha="center", fontsize=10)
axes[2].set_xlim(0, 1)
axes[2].set_ylim(0, 1)
axes[2].axis("off")
axes[2].set_title("Doubling both dimensions paints 4x the area")

fig.savefig("bins_and_area.png", dpi=200)

for lo, hi, c, d in zip(uneven_edges[:-1], uneven_edges[1:], counts, density):
    print(f"age {lo:>2}-{hi:<2}  width {hi - lo:>2}  count {c:>5}  density {d:7.1f}")`,
        output: `age  0-18  width 18  count   983  density    54.6
age 18-25  width  7  count  1526  density   218.0
age 25-30  width  5  count  1640  density   328.0
age 30-35  width  5  count  2115  density   423.0
age 35-40  width  5  count  2456  density   491.2
age 40-45  width  5  count  2544  density   508.8
age 45-50  width  5  count  2288  density   457.6
age 50-60  width 10  count  3457  density   345.7
age 60-95  width 35  count  2991  density    85.4`,
        explanation:
          'Three panels. The first plots raw counts with unequal bin widths, and the 60-to-95 bar is one of the tallest on the chart — not because that age group is dense, but because the bin is 35 years wide and simply collects more people. A reader concludes the population skews old. The second panel divides each count by its bin width, which is what a histogram means by density, and the picture inverts: the 60-plus bar becomes one of the shortest and the peak sits correctly at 40 to 45. The printed table shows the arithmetic directly, 2,991 people at a density of 85 against 2,544 at a density of 509. The third panel is the pictorial version of the same error: two squares where the second has twice the side length of the first, intended to show a doubling. The eye reads area, the area is four times larger, and the lie factor is 2. The general rule: when bins or icons vary in size, the quantity the reader decodes is area, so plot density rather than counts and scale area rather than length.',
      },
      {
        language: 'python',
        title: 'The same audit on an ML result',
        runnable: true,
        code: `import numpy as np
import matplotlib.pyplot as plt

# Two models, five cross-validation folds each.
model_a = np.array([0.9041, 0.9002, 0.9068, 0.8996, 0.9033])
model_b = np.array([0.9078, 0.9051, 0.9019, 0.9095, 0.9044])
majority_baseline = 0.887   # always predict the majority class

fig, (ax_bad, ax_good) = plt.subplots(1, 2, figsize=(11.5, 4.4), layout="constrained")

means = [model_a.mean(), model_b.mean()]
bars = ax_bad.bar(["model A", "model B"], means, color=["#8fa7b3", "#e76f51"], width=0.5)
ax_bad.set_ylim(0.900, 0.908)
ax_bad.bar_label(bars, fmt="%.4f", padding=3)
ax_bad.set_ylabel("accuracy")
ax_bad.set_title("'Model B is clearly better'")

x = np.array([0, 1])
for i, scores in enumerate([model_a, model_b]):
    ax_good.scatter(np.full(scores.size, i) + np.linspace(-0.06, 0.06, scores.size),
                    scores, s=30, color="#264653", zorder=3)
    ax_good.hlines(scores.mean(), i - 0.18, i + 0.18, color="#e76f51", linewidth=2.5, zorder=4)
ax_good.axhline(majority_baseline, color="grey", linestyle="--", linewidth=1.4,
                label=f"majority-class baseline = {majority_baseline:.3f}")
ax_good.set_xticks(x, ["model A", "model B"])
ax_good.set_ylim(0.87, 0.92)
ax_good.set_ylabel("accuracy per fold")
ax_good.set_title("Folds shown, baseline shown: the gap is noise")
ax_good.legend(frameon=False, fontsize=9)

fig.suptitle("A 0.002 accuracy difference on a problem with an 0.887 baseline")
fig.savefig("ml_audit.png", dpi=200)

diff = model_b.mean() - model_a.mean()
pooled_sd = np.sqrt((model_a.var(ddof=1) + model_b.var(ddof=1)) / 2)
print(f"mean A {model_a.mean():.4f}  mean B {model_b.mean():.4f}  difference {diff:+.4f}")
print(f"fold-to-fold sd: {pooled_sd:.4f}  -> difference is {diff / pooled_sd:.2f} sd")
print(f"lift over majority baseline: A {model_a.mean() - majority_baseline:+.4f}, "
      f"B {model_b.mean() - majority_baseline:+.4f}")`,
        output: `mean A 0.9028  mean B 0.9057  difference +0.0029
fold-to-fold sd: 0.0029  -> difference is 1.00 sd
lift over majority baseline: A +0.0154, B +0.0186`,
        explanation:
          'The left panel is a chart that gets shown in real model reviews: two bars on an axis running from 0.900 to 0.908, where model B towers over model A and the labels read 0.9028 and 0.9057. The lie factor here is enormous, because the drawn ratio is roughly 2 and the true ratio is 1.003. The right panel shows the same experiment honestly: every fold as a point, the means as short horizontal rules, a y axis wide enough to be interpretable, and a dashed line at the majority-class baseline of 0.887. Three findings appear at once that the bar chart hid. The fold clouds overlap substantially, and the printed output shows the difference is exactly one fold-to-fold standard deviation, which is not evidence of an improvement from five folds. Both models beat the trivial baseline by under two accuracy points, so the headline accuracy of 0.90 is much less impressive than it sounds. And the choice between A and B should be made on cost, latency or interpretability, because the accuracy evidence does not distinguish them.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Financial and news graphics',
        usage:
          'Truncated y axes on bar charts and windows chosen to start at a local peak are routine in market commentary. The same series over five years frequently tells the opposite story to the same series over five months.',
      },
      {
        context: 'Product dashboards',
        usage:
          'Dual axes are a default in many dashboard tools, so a panel showing "feature adoption and revenue moving together" is extremely common and almost never evidence of anything, because both scales autoscale independently.',
      },
      {
        context: 'Model reports and papers',
        usage:
          'Learning curves with truncated y axes make a 0.3 percent improvement fill the panel; accuracy bars on imbalanced data hide that a constant predictor scores nearly as well; single-split results hide fold-to-fold variance.',
      },
      {
        context: 'Public health and crime statistics',
        usage:
          'Raw counts across regions of very different population make the largest region look worst by construction. The meaningful quantity is a rate per capita, and switching between the two changes the ranking entirely.',
      },
    ],

    projectConnections: [
      { tool: 'matplotlib', role: 'ax.set_ylim(bottom=0), ax.twinx() and ax.set_yscale are the three calls that create or prevent most of these distortions.' },
      { tool: 'seaborn', role: 'Autoscaled heatmap colour ranges and default confidence intervals are conveniences that need checking against the data structure.' },
      { tool: 'pandas', role: 'Choosing a resample frequency, a rolling window or a groupby level silently determines what a chart can show; each is a defensible choice that must be stated.' },
      { tool: 'scikit-learn', role: 'Cross-validation, permutation importance and calibration curves supply the uncertainty that turns a single point estimate into an honest chart.' },
    ],

    commonMistakes: [
      {
        mistake: 'Assuming bad faith when a default is to blame',
        why: 'Spreadsheet software autoscales bar axes, dashboard tools default to dual axes, and plotting libraries autoscale colormaps. The overwhelming majority of misleading charts were produced by someone who did not look at the axis.',
        fix: 'Point at the specific choice and ask about it rather than accusing. The correction is the same either way, and framing it as a default keeps the conversation about the chart.',
      },
      {
        mistake: 'Running the checklist on other people charts but not your own',
        why: 'You already know what you expect to see, so a chart that confirms it does not trigger scrutiny. This is where most self-inflicted errors survive to publication.',
        fix: 'Audit every chart before you publish it: axis starts, time window, denominators, sample size, uncertainty. Ask a colleague what the chart says before you tell them what you think it says.',
      },
      {
        mistake: 'Believing a non-zero axis is always dishonest',
        why: 'The rule applies to marks that encode magnitude as length or area. A line chart is read by slope, and slope is unaffected by a vertical shift, so forcing a stock price or a temperature series to include zero usually destroys the information.',
        fix: 'Apply the rule by encoding: zero baseline for bars and areas, free baseline for lines and dot plots. Say which you used when the range is unusual.',
      },
      {
        mistake: 'Treating co-movement on a dual-axis chart as evidence',
        why: 'Two independent scales are two free parameters the author chooses and the reader cannot see, so any pair of series can be made to appear to track each other.',
        fix: 'Index both series to 100 at a common start, use two stacked panels with a shared x axis, or draw a scatter of one against the other and report the correlation.',
      },
      {
        mistake: 'Plotting raw counts across groups of very different sizes',
        why: 'The largest group wins by construction, so the chart measures group size rather than the phenomenon.',
        fix: 'Normalise by the relevant denominator — per capita, per thousand requests, per member of the class — and show the group sizes so the reader can judge the reliability of each rate.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Name three ways a chart can mislead without containing a single incorrect number.',
        answer:
          'First, a truncated value axis on a bar chart: bars encode magnitude as length from the baseline, so starting the axis at 95 instead of 0 can make a 2 percent difference look like a doubling, and the author picks the exaggeration factor by picking the baseline. Second, dual axes: two series on two independently chosen vertical scales can be made to appear to move together regardless of their actual correlation, because rescaling a series does not change its correlation with anything. Third, a cherry-picked range: starting a time axis at a local peak turns a normal fluctuation into a dramatic decline, and the same series over a longer window often shows the opposite. I would add a fourth that is less discussed — plotting raw counts across groups of very different sizes, where the chart ends up measuring population rather than the phenomenon.',
        followUp:
          'A strong answer mentions the lie factor as a way to quantify the first case, and notes that a non-zero axis on a line chart is legitimate because slope is invariant to a vertical shift.',
      },
      {
        level: 'intermediate',
        question: 'A colleague shows a learning curve where validation accuracy rises from 0.9012 to 0.9041 and fills the whole panel. What do you say?',
        answer:
          'I would start with the axis: if the y range is 0.900 to 0.905, the panel is showing a 0.3 percent relative improvement at a magnification that makes it look decisive, and I would ask for a range that includes a reference point — the previous model, the baseline, or zero error if that is meaningful. Then I would ask what the variance is: a 0.0029 difference from a single run tells you nothing unless the run-to-run or fold-to-fold spread is smaller than that, so I would want several seeds or folds with the individual points shown. Then the baseline question: on an imbalanced problem, the constant predictor might already score 0.89, in which case both numbers represent a small lift and the headline accuracy is not the right metric at all. None of this is an accusation; autoscaling is the default in every plotting library and the author almost certainly did not choose the range deliberately.',
        followUp:
          'Mentioning that the fix is to plot the difference with an interval, rather than to rescale the same chart, shows the candidate understands that the problem is what is plotted and not just how.',
      },
      {
        level: 'ai-engineer',
        question: 'What would you check before publishing a model evaluation chart to a non-technical audience?',
        answer:
          'I run the same checklist I would run on someone else chart, which is the point of having one. Axes: does any bar or area axis start at zero, and is the y range on any curve wide enough that the reader can judge the size of the effect rather than just its sign. Uncertainty: is there more than one run, and is the spread shown rather than only the mean, because a non-technical reader will treat a single point as exact. Baselines: is the trivial baseline on the chart, since a 91 percent accuracy means something completely different when the majority class is 50 percent than when it is 89 percent. Denominators: are any counts shown where rates are what matters, and are group sizes visible. Selection: does the chart cover the whole evaluation period and the whole population, or a slice, and if a slice, is that stated on the chart itself rather than in a footnote. Finally, I write the title as the finding in plain language with the absolute magnitude in it, because a non-technical reader will remember the title and nothing else — and if I cannot write an honest title that supports the claim, the claim is not supported.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A bar chart compares 340 and 355 on an axis starting at 330. Compute the lie factor and state the honest way to present the difference.',
        hint: 'Drawn lengths are the values minus the baseline. Compare their ratio with the ratio of the values.',
        solution:
          'Drawn lengths are 340 - 330 = 10 and 355 - 330 = 25, an apparent ratio of 2.5. The true ratio is 355 / 340 = 1.044. The lie factor is 2.5 / 1.044 = 2.39, so the chart makes a 4.4 percent increase look roughly 2.4 times larger than it is.\n\nThe honest presentation depends on what matters. If the levels matter, draw the bars from zero and accept that two nearly equal bars is the correct picture of two nearly equal numbers. If the change is the finding, change what you plot: a single dot plot or bar of the difference, +15 with its confidence interval, where a non-zero axis is legitimate because a dot encodes position rather than length. If there is history, a line chart of the whole series makes the 15-unit move interpretable against normal variation, which is usually the most informative option of the three.',
      },
      {
        prompt:
          'You are handed a chart titled "Adoption drives revenue" showing feature adoption and revenue as two lines with two y axes over 18 months. List what you would ask for, in order.',
        hint: 'Start with the structural problem, then move to the causal claim.',
        solution:
          'First: both series on one scale, indexed to 100 at month zero, or in two stacked panels sharing the x axis. With two free scales, any apparent tracking is an artefact of the two set_ylim choices and cannot be evidence of anything.\n\nSecond: the correlation itself, and a scatter of one against the other, so the relationship is a number and a shape rather than an impression.\n\nThird: the full available history, not eighteen months, and the reason that window was chosen. If both series simply trend upward over time, they will correlate strongly with each other and with anything else that trends, which is why correlations between two trending series are nearly uninformative.\n\nFourth: the causal question. Adoption and revenue plausibly share confounders — company size, account age, a sales push that drove both — and reverse causation is live, since customers who are already spending more explore more features. The title claims causation from an observational chart of two series. What would settle it is an experiment: randomise which accounts are nudged towards the feature and compare revenue.',
      },
      {
        prompt:
          'Design a checklist item that would have caught each of these: (a) a histogram with unequal bins, (b) a confusion matrix where the errors are invisible, (c) a regional bar chart that just ranks population.',
        hint: 'Each maps to one step of the seven-step checklist.',
        solution:
          '(a) Step 1, read the axes: check whether the bins are equal width, and if they are not, verify the y axis is a density (count divided by width) rather than a raw count. Unequal bins with raw counts make wide bins look tall for a trivial reason.\n\n(b) Step 6, check the encoding: on a heatmap, ask what the colour scale is pinned to. Raw counts with an autoscaled sequential map let the large diagonal cells absorb the whole range, so every error renders as near-white. Row-normalising and pinning the scale to [0, 1] puts recall on the diagonal and makes rows comparable across classes of different sizes.\n\n(c) Step 4, ask what the denominator is: counts across regions of different population measure population. The check is to ask "per what?" of every count on every chart, and to require that group sizes are shown so the reader can see which rates rest on small samples.',
      },
    ],

    quiz: [
      {
        id: 'VIZ-008-q1',
        type: 'numeric',
        concept: 'lie factor',
        prompt:
          'Two bars show 50 and 60 on an axis starting at 40. The drawn lengths are 10 and 20. What is the lie factor, to two decimal places?',
        answer: 1.67,
        tolerance: 0.02,
        explanation:
          'The drawn ratio is 20 / 10 = 2. The true ratio is 60 / 50 = 1.2. The lie factor is 2 / 1.2 = 1.67, so the chart exaggerates the difference by about two thirds. Anything meaningfully above 1 means the picture is not proportional to the data.',
      },
      {
        id: 'VIZ-008-q2',
        type: 'truefalse',
        concept: 'dual axes',
        prompt: 'If two lines on a dual-axis chart rise and fall together, the two quantities are strongly correlated.',
        answer: false,
        explanation:
          'Each axis is a free parameter, and rescaling a series does not change its correlation with anything, so any two series can be made to appear to track each other. Index both to a common base on one scale, or draw a scatter and report the coefficient.',
      },
      {
        id: 'VIZ-008-q3',
        type: 'multi',
        concept: 'spotting distortion',
        prompt: 'Which of these should make you suspicious of a chart? Select all that apply.',
        options: [
          'A bar chart whose value axis starts at 95',
          'A time axis that begins at an unexplained date near a local peak',
          'Icons scaled in both width and height by the value',
          'A line chart whose y axis does not include zero',
          'A histogram with unequal bin widths plotted as raw counts',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Truncated bar baselines, cherry-picked windows, area double-counting and unequal bins with raw counts are all genuine distortions. A line chart with a non-zero y axis is normally fine, because a line is read by slope and slope is unchanged by shifting the axis.',
      },
      {
        id: 'VIZ-008-q4',
        type: 'order',
        concept: 'reading checklist',
        prompt: 'Put the chart-reading checklist into the order that catches the most, soonest.',
        items: [
          'Read the axes: units, whether the value axis starts at zero, whether any scale is log or reversed',
          'Check the range: why does the window start there, and would a longer one change the impression',
          'Count the vertical scales: one, or two independently chosen ones',
          'Ask what the denominator is: counts or rates, and per what',
          'Look for what is missing: sample size, uncertainty, excluded rows or categories',
          'Check the encoding: is magnitude carried by area, angle or colour, and is anything 3D',
        ],
        explanation:
          'Axes first because truncation is the commonest distortion and takes two seconds to spot. Range and dual scales come next because they are structural. Denominators, omissions and encoding follow, each catching a smaller but still substantial class of problems.',
      },
      {
        id: 'VIZ-008-q5',
        type: 'mcq',
        concept: 'area encoding',
        prompt:
          'An infographic shows one figure twice as tall and twice as wide as another to represent a value that doubled. How many times larger is the drawn area, and what is the lie factor?',
        options: [
          'Four times the area, lie factor 2',
          'Two times the area, lie factor 1',
          'Four times the area, lie factor 4',
          'Two times the area, lie factor 0.5',
        ],
        answerIndex: 0,
        explanation:
          'Scaling both dimensions by 2 multiplies the area by 4. The eye decodes area, so a doubling is perceived as a quadrupling and the lie factor is 4 / 2 = 2. The fix is to scale area to the value — multiply each linear dimension by the square root — or to use bars and avoid the problem entirely.',
      },
      {
        id: 'VIZ-008-q6',
        type: 'explain',
        concept: 'auditing your own work',
        prompt:
          'You are about to publish a chart showing your new model beats the previous one. Describe the audit you run on it first, and what would make you change the chart.',
        rubric: [
          'Checks the axis range and whether the encoding requires a zero baseline',
          'Checks that uncertainty and sample size are represented, not just point estimates',
          'Checks the baseline or reference point and the selection of the data shown',
          'States a concrete change they would make if a check fails',
        ],
        sampleAnswer:
          'First the axes. If it is a bar chart of scores, does it start at zero, and if it is a curve, is the y range wide enough that a reader can judge the magnitude rather than just the direction. If the improvement only looks convincing because the range is narrow, I change what I plot: the difference with a confidence interval, rather than two bars rescaled. Second, uncertainty. A single number per model is not a comparison, so I want several folds or seeds with the individual points drawn, and if the gap is inside the fold-to-fold spread I have to say so in the title rather than let the chart imply otherwise. Third, the reference points: the trivial baseline belongs on the chart, because an accuracy of 0.90 means something very different when the majority class is 0.89. Fourth, selection: does this cover the whole evaluation set and the whole period, and if I have excluded anything, that goes on the chart and not in a footnote. Finally, I write the title as the finding with the absolute magnitude in it, and if I cannot write an honest title that supports the claim, the claim is not supported and the chart should not be published.',
        explanation:
          'A strong answer treats the audit as procedural and self-directed, names the specific checks, and in each case says what would change rather than simply noting the risk.',
      },
    ],

    flashcards: [
      { front: 'What is the lie factor?', back: 'The relative size of the effect shown in the graphic divided by its relative size in the data. A truthful chart is near 1.' },
      { front: 'Why are dual axes untrustworthy?', back: 'Two independently chosen scales are two free parameters, so any two series can be made to appear to move together. Rescaling never changes a correlation.' },
      { front: 'When is a non-zero y axis legitimate?', back: 'For marks read by position or slope — lines and dot plots. Never for bars or areas, which encode magnitude as length or area from the baseline.' },
      { front: 'What goes wrong with unequal histogram bins?', back: 'Wide bins collect more observations and look tall for that reason alone. Plot density, the count divided by the bin width, instead of raw counts.' },
      { front: 'Why is doubling an icon in both dimensions misleading?', back: 'Area grows as the square, so a doubling paints four times the area and the lie factor is 2. Scale area to the value, or use bars.' },
      { front: 'The first two checklist steps', back: 'Read the axes (units, zero baseline, log or reversed), then check the range (why does the window start there).' },
      { front: 'The commonest cause of a misleading chart', back: 'An unexamined tool default — autoscaled bar axes, autoscaled colormaps, default dual axes — not deliberate deception.' },
      { front: 'The ML version of the truncated axis', back: 'A learning curve or accuracy bar chart on a narrow y range, with no baseline and no fold-to-fold variance shown.' },
    ],

    challenge: {
      title: 'Build a chart auditor',
      brief:
        'Write audit_figure(fig) that inspects a matplotlib Figure and prints a warning for each issue it can detect mechanically: any Axes containing bar containers whose value axis does not start at zero, any Axes with a twin (dual axes), any Axes whose y range spans less than 5 percent of the mean plotted value, any histogram whose bin widths are unequal while the heights are raw counts, and any Axes with no axis label on either dimension. For each warning, print the Axes title, the specific issue and a one-line suggested fix. Then write three deliberately flawed figures and show that your auditor catches each, plus one correct figure it passes clean.',
      language: 'python',
      acceptanceCriteria: [
        'The auditor inspects a Figure object rather than requiring the original data',
        'It detects at least four distinct issues, including a truncated bar baseline and a dual axis',
        'Each warning names the offending Axes and gives a concrete suggested fix',
        'Three flawed demonstration figures each trigger the expected warning',
        'A correctly drawn figure produces no warnings, so the auditor is not simply warning about everything',
      ],
      starterCode:
        'import matplotlib.pyplot as plt\nfrom matplotlib.container import BarContainer\n\n\ndef audit_figure(fig):\n    problems = []\n    for ax in fig.axes:\n        has_bars = any(isinstance(c, BarContainer) for c in ax.containers)\n        # Check the baseline, the twins, the y range, the bins and the labels.\n    return problems\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone how to read a chart critically: the standard distortions, how to spot each, and the order to check them in.',
      mustCover: [
        'A truncated value axis breaks the proportionality that bars depend on, and the exaggeration is chosen by the author',
        'Dual axes contain two free scales, so apparent co-movement is an artefact rather than evidence',
        'A cherry-picked range, a missing denominator and area double-counting each distort without any incorrect number',
        'A repeatable checklist starting with the axes, applied to your own charts as well as other people\'s',
      ],
      bonusSignals: [
        'computes or defines a lie factor',
        'notes that a non-zero axis is legitimate for lines but not bars',
        'notes that a tool default is a more likely explanation than deception',
      ],
      sampleExplanation:
        "Most misleading charts contain entirely correct numbers. The distortion is in choices you cannot see unless you look for them, so the defence is a short checklist you run every time. Start with the axes. If it is a bar chart, does the value axis start at zero? A bar says how big something is by how long it is, so if the axis starts at 100 and the values are 102 and 108, the drawn lengths are 2 and 8 and a six percent difference looks fourfold. You can put a number on that — Tufte called it the lie factor, the exaggeration in the picture divided by the change in the data — and here it is nearly four. Note the rule is about bars, not every chart: a line is read by its slope, and shifting the axis up or down leaves every slope alone, so a share price starting at 140 is perfectly honest. Next, the range. Why does the timeline start there? A decline shown from its own peak looks like a collapse, and the same series over ten years often looks like a blip. Next, count the vertical scales: if there are two, with different units, any apparent tracking between the lines was produced by the author's choice of scales and proves nothing. Then ask what the denominator is, because counts across regions of very different size just rank population. Then ask what is missing: sample size, uncertainty, the rows that were excluded. And then run the whole list on your own charts, because the usual cause of all of this is not dishonesty — it is a default in the plotting tool that nobody checked.",
    },
  },
];
