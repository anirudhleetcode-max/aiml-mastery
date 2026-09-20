import type { DomainId, WidgetId } from '@/types/curriculum';

export interface Lab {
  id: WidgetId;
  title: string;
  blurb: string;
  /** What the learner should walk away understanding. */
  goal: string;
  domain: DomainId;
  /** Slug of a unit that teaches this, for the "read the lesson" link. */
  unitSlug: string;
  featured?: boolean;
  /**
   * The investigation, in order.
   *
   * Each step names a specific manipulation and the specific thing it should
   * produce, so ticking one is a claim about something observable rather than
   * a claim about having visited the page. A lab closes only when every step
   * is ticked — the server checks the set, so the button cannot skip the work.
   */
  steps: LabStep[];
}

export interface LabStep {
  /** What to do in the widget. */
  task: string;
  /** What you should see if you did it — the step's own check. */
  expect: string;
}

/**
 * The laboratories.
 *
 * Every entry is an interactive widget that also appears inside a lesson;
 * this page collects them so a learner can go and play with a mechanism
 * without hunting for the unit it lives in.
 */
export const LABS: Lab[] = [
  {
    id: 'gradient-surface-3d',
    title: 'Gradient descent in 3D',
    blurb: 'A ball on a loss surface, stepping downhill. Change the learning rate and watch it crawl, converge, or diverge.',
    goal: 'Why the learning rate is the single most consequential hyperparameter.',
    domain: 'ML',
    unitSlug: 'gradient-descent',
    featured: true,
    steps: [
      { task: 'Set the learning rate to its smallest value on the convex bowl and press Play.', expect: 'The ball creeps downhill and has not reached the minimum by the time the run ends — small steps are safe and slow.' },
      { task: 'Raise the learning rate to roughly 0.25 and run it again.', expect: 'The ball reaches the bottom in a handful of steps. This is the regime you want.' },
      { task: 'Push the learning rate past 1.0 and run it.', expect: 'The ball overshoots the minimum and the loss climbs instead of falling — the step size is larger than the valley is wide.' },
      { task: 'Switch to the narrow valley at a learning rate that worked on the bowl.', expect: 'The path zig-zags across the valley rather than running along it, because the gradient is steep across and shallow along. This is the problem momentum exists to fix.' },
    ],
  },
  {
    id: 'neural-network-lab',
    title: 'Neural network trainer',
    blurb: 'Configure a small network and train it live on a 2D dataset. Watch the decision boundary form.',
    goal: 'What depth and width actually buy you, and what they cost.',
    domain: 'DL',
    unitSlug: 'layers-and-forward-propagation',
    featured: true,
    steps: [
      { task: 'Train a network with one hidden neuron on the two-moons data.', expect: 'The boundary is a single straight line and a large fraction of points stay misclassified — one neuron cannot bend.' },
      { task: 'Increase to four hidden neurons and retrain.', expect: 'The boundary bends and the error falls sharply. Each neuron contributes one fold.' },
      { task: 'Switch the activation to linear and retrain with the same width.', expect: 'The boundary collapses back to a straight line, because a stack of linear layers is itself linear however deep.' },
      { task: 'Take the width well past what the problem needs and watch the boundary.', expect: 'It starts to contort around individual points — capacity spent on noise, which is overfitting made visible.' },
    ],
  },
  {
    id: 'attention-lab',
    title: 'Attention weights',
    blurb: 'Pick a query token and see which other tokens it attends to, with the scaled dot-product written out.',
    goal: 'That attention is a weighted lookup, not magic.',
    domain: 'DL',
    unitSlug: 'attention-and-transformers',
    featured: true,
    steps: [
      { task: 'Select a query token and read its attention row.', expect: 'The weights across all keys sum to 1 — attention is a distribution, not a score.' },
      { task: 'Find the key that receives the highest weight for your query.', expect: 'It is the token whose meaning most constrains the query, which is the lookup attention is performing.' },
      { task: 'Compare two different query tokens.', expect: 'The rows differ: each token looks somewhere else, which is why attention is computed per position rather than once.' },
      { task: 'Look at the scaling factor applied before the softmax.', expect: 'Dividing by the square root of the key dimension keeps the logits in a range where softmax has usable gradients.' },
    ],
  },
  {
    id: 'linear-regression-lab',
    title: 'Linear regression',
    blurb: 'Drag the line, watch the residuals and the error move. Then let least squares do it properly.',
    goal: 'What "fitting" means, and what the loss is measuring.',
    domain: 'ML',
    unitSlug: 'linear-regression',
    steps: [
      { task: 'Drag the line far from the points and watch the residual bars.', expect: 'Every residual grows and the error readout rises — the loss is the sum of those squared bars.' },
      { task: 'Drag the line by eye to what looks like the best fit.', expect: 'The error drops but is probably not the minimum; eyeballing gets close and rarely arrives.' },
      { task: 'Press the button that fits by least squares.', expect: 'The error falls to a value you could not beat by dragging — that is what solving the normal equations gives you.' },
      { task: 'Drag one point far away from the rest and refit.', expect: 'The fitted line swings noticeably toward it, because squaring makes a distant point dominate the sum.' },
    ],
  },
  {
    id: 'kmeans-lab',
    title: 'K-Means clustering',
    blurb: 'Step through assign-and-update. Change k, re-initialise, and see the answer change.',
    goal: 'Why initialisation and scale matter as much as the algorithm.',
    domain: 'ML',
    unitSlug: 'k-means-clustering',
    steps: [
      { task: 'Run k-means with k set to the number of visible clusters.', expect: 'The centroids settle into the middle of each blob and stop moving.' },
      { task: 'Reset with a different random initialisation and run again.', expect: 'The final clustering can differ — k-means converges to a local optimum, which is why it is run several times.' },
      { task: 'Set k to one more than the number of real clusters.', expect: 'A genuine cluster is split in two. The algorithm always finds exactly k clusters, whether or not they exist.' },
      { task: 'Set k to one and then to the number of points.', expect: 'At k=1 every point shares a centroid; at k=n the error is zero and nothing has been learned.' },
    ],
  },
  {
    id: 'decision-tree-lab',
    title: 'Decision tree splits',
    blurb: 'Grow the tree one split at a time and watch the plane get carved up.',
    goal: 'How a tree partitions space, and where overfitting begins.',
    domain: 'ML',
    unitSlug: 'decision-trees',
    steps: [
      { task: 'Grow the tree to depth 1.', expect: 'One axis-aligned split. This is the single most informative question the tree can ask.' },
      { task: 'Increase depth step by step and watch the boundary.', expect: 'Each level adds rectangles. The boundary is always made of axis-aligned pieces, never a diagonal.' },
      { task: 'Grow the tree without a depth limit.', expect: 'Every training point ends in its own region and training error reaches zero — the tree has memorised rather than generalised.' },
      { task: 'Set a minimum samples-per-leaf and regrow.', expect: 'The boundary simplifies and stops chasing individual points. That constraint is regularisation for a tree.' },
    ],
  },
  {
    id: 'knn-lab',
    title: 'K-Nearest Neighbours',
    blurb: 'Drag a query point, change k, and stretch an axis to break it.',
    goal: 'Why KNN is useless on unscaled features.',
    domain: 'ML',
    unitSlug: 'k-nearest-neighbours',
    steps: [
      { task: 'Set k to 1 and look at the decision boundary.', expect: 'It is jagged and wraps tightly around individual points — every point is its own authority.' },
      { task: 'Raise k to about 15.', expect: 'The boundary smooths considerably. Averaging over more neighbours trades variance for bias.' },
      { task: 'Raise k toward the size of the dataset.', expect: 'The boundary flattens to a single class — with enough neighbours every query sees the whole population.' },
      { task: 'Move a single point across the boundary at low and high k.', expect: 'At k=1 the boundary changes locally; at high k it barely moves. That is the stability large k buys.' },
    ],
  },
  {
    id: 'pca-lab',
    title: 'Principal components',
    blurb: 'Find the directions of greatest variance, and see what standardising first does.',
    goal: 'That PCA is a rotation, and that units matter.',
    domain: 'ML',
    unitSlug: 'principal-component-analysis',
    steps: [
      { task: 'Look at the first principal component on the elongated cloud.', expect: 'It points along the direction of greatest spread, not along either original axis.' },
      { task: 'Check the second component.', expect: 'It is perpendicular to the first, which is what makes the new coordinates uncorrelated.' },
      { task: 'Project onto the first component only and read the variance explained.', expect: 'Most of the variance survives one dimension, which is why the second can often be dropped.' },
      { task: 'Rescale one input axis and redo the projection.', expect: 'The components move, because PCA maximises variance in the features\' own units. This is why PCA needs scaled input.' },
    ],
  },
  {
    id: 'svm-margin-lab',
    title: 'SVM margins',
    blurb: 'The maximum-margin boundary, its support vectors, and what C trades away.',
    goal: 'Why only a few points determine the boundary.',
    domain: 'ML',
    unitSlug: 'support-vector-machines',
    steps: [
      { task: 'Look at which points the margin touches.', expect: 'Only a few — the support vectors. Everything else could be moved without changing the boundary.' },
      { task: 'Drag a point that is not a support vector.', expect: 'The boundary does not move at all. The fit depends on the margin, not the bulk.' },
      { task: 'Drag a support vector.', expect: 'The boundary moves immediately. Those are the points the solution rests on.' },
      { task: 'Lower C to make the margin softer.', expect: 'The margin widens and tolerates violations, trading training accuracy for a boundary less determined by individual points.' },
    ],
  },
  {
    id: 'bias-variance-lab',
    title: 'Bias and variance',
    blurb: 'Fit polynomials of rising degree to noisy samples and watch the U-curve appear.',
    goal: 'The trade-off, seen rather than recited.',
    domain: 'ML',
    unitSlug: 'bias-variance-tradeoff',
    steps: [
      { task: 'Fit a very low-capacity model and redraw the sample several times.', expect: 'The fitted curves lie almost on top of each other and all miss the target — low variance, high bias.' },
      { task: 'Fit a very high-capacity model and redraw several times.', expect: 'The curves pass through their own points and scatter wildly — low bias, high variance.' },
      { task: 'Find the capacity where the total error is smallest.', expect: 'It is neither extreme: the minimum of the sum, not of either term alone.' },
      { task: 'Increase the sample size at the high-capacity setting.', expect: 'The scatter narrows. More data attacks variance and leaves bias where it was.' },
    ],
  },
  {
    id: 'confusion-matrix-lab',
    title: 'Confusion matrix',
    blurb: 'Move the threshold and watch precision and recall move in opposite directions.',
    goal: 'Why accuracy lies when classes are imbalanced.',
    domain: 'ML',
    unitSlug: 'confusion-matrix',
    steps: [
      { task: 'Move the threshold to its strictest setting.', expect: 'Almost nothing is flagged: few false positives, many false negatives.' },
      { task: 'Move it to its loosest setting.', expect: 'Everything is flagged: recall is perfect and precision collapses.' },
      { task: 'Find the threshold where precision and recall are roughly equal.', expect: 'That point is a choice about cost, not a property of the model.' },
      { task: 'Change the class balance and hold the threshold.', expect: 'Precision moves while recall does not, because precision divides by what you flagged and recall by what was there.' },
    ],
  },
  {
    id: 'roc-lab',
    title: 'ROC and AUC',
    blurb: 'Sweep the threshold and trace the curve, with the precision-recall view alongside.',
    goal: 'What AUC means, and when PR is the honest chart instead.',
    domain: 'ML',
    unitSlug: 'roc-and-auc',
    steps: [
      { task: 'Drag the threshold and watch the point move along the curve.', expect: 'Each threshold is one point; the curve is every threshold at once.' },
      { task: 'Read the AUC and compare it with the fraction of correctly ranked pairs.', expect: 'They are the same number — AUC is a ranking statistic, not an accuracy.' },
      { task: 'Make the classes heavily imbalanced.', expect: 'The ROC curve barely moves while the precision-recall curve collapses. ROC divides by the negative pool, which absorbs false positives.' },
      { task: 'Apply a monotone transform to the scores if the lab allows it.', expect: 'AUC is unchanged, because only the ordering enters the calculation.' },
    ],
  },
  {
    id: 'regularization-lab',
    title: 'L1 versus L2',
    blurb: 'Turn alpha up and watch L1 drive coefficients to exactly zero while L2 only shrinks them.',
    goal: 'Why lasso selects features and ridge does not.',
    domain: 'ML',
    unitSlug: 'regularisation-and-tuning',
    steps: [
      { task: 'Set the penalty to zero and look at the coefficients.', expect: 'They are large and the fit passes close to every training point.' },
      { task: 'Raise the ridge penalty gradually.', expect: 'Every coefficient shrinks toward zero but none reaches it — the L2 pull weakens as the coefficient does.' },
      { task: 'Switch to the lasso penalty and raise it.', expect: 'Coefficients hit exactly zero one at a time. The L1 pull keeps full strength all the way down.' },
      { task: 'Find the penalty that minimises validation error.', expect: 'It is strictly greater than zero: some bias always beats none here.' },
    ],
  },
  {
    id: 'convolution-lab',
    title: 'Convolution',
    blurb: 'Slide a kernel you can edit over an image and build the feature map cell by cell.',
    goal: 'That a convolution is multiply-and-add, repeated.',
    domain: 'DL',
    unitSlug: 'convolution-and-filters',
    steps: [
      { task: 'Apply a vertical edge kernel to the image.', expect: 'Vertical edges light up and flat regions go to zero — the kernel responds to change, not to brightness.' },
      { task: 'Rotate the kernel to horizontal.', expect: 'The response switches to horizontal edges. A kernel detects the pattern it is shaped like.' },
      { task: 'Apply a blur kernel.', expect: 'Detail disappears and the image softens, because every output is an average of its neighbourhood.' },
      { task: 'Count the parameters in the kernel against the image size.', expect: 'A handful of numbers processes the whole image — weight sharing is why convolution is affordable.' },
    ],
  },
  {
    id: 'activation-explorer',
    title: 'Activation functions',
    blurb: 'Every activation and its derivative, on aligned axes.',
    goal: 'Where gradients vanish, and why ReLU took over.',
    domain: 'DL',
    unitSlug: 'activation-functions',
    steps: [
      { task: 'Look at the sigmoid far from zero.', expect: 'The curve is flat, so its gradient is near zero — this is where a deep sigmoid network stops learning.' },
      { task: 'Compare ReLU\'s gradient on each side of zero.', expect: 'Exactly 1 on the positive side and exactly 0 on the negative. Constant gradient is why ReLU trains deep networks.' },
      { task: 'Find where ReLU\'s gradient is zero and consider a neuron stuck there.', expect: 'It receives no gradient and never recovers — the dying ReLU problem.' },
      { task: 'Compare tanh with sigmoid around the origin.', expect: 'tanh is centred on zero, so its outputs do not push the next layer\'s inputs systematically positive.' },
    ],
  },
  {
    id: 'backprop-flow',
    title: 'Backpropagation, by hand',
    blurb: 'A tiny network, forward then backward, with every number visible.',
    goal: 'That backpropagation is the chain rule, applied systematically.',
    domain: 'DL',
    unitSlug: 'backpropagation',
    steps: [
      { task: 'Step forward through the network and watch the activations.', expect: 'Each layer\'s output becomes the next layer\'s input; nothing flows backwards yet.' },
      { task: 'Step backward from the loss.', expect: 'The gradient at each layer is the one above it multiplied by a local derivative — the chain rule made mechanical.' },
      { task: 'Follow a single weight\'s gradient back to the loss.', expect: 'It depends only on its own input and the gradient arriving from above, which is why backprop is linear in the network size.' },
      { task: 'Make a layer\'s local derivative small and step back again.', expect: 'The gradient reaching earlier layers shrinks. Multiply several such layers and it vanishes.' },
    ],
  },
  {
    id: 'tokenizer-lab',
    title: 'Tokenizer',
    blurb: 'Type text and see it split three ways, with ids and counts.',
    goal: 'Why token count is not word count, and what that breaks.',
    domain: 'GEN',
    unitSlug: 'llm-tokenisation',
    steps: [
      { task: 'Tokenise an ordinary English sentence.', expect: 'Most common words are a single token; the count is close to the word count.' },
      { task: 'Tokenise a rare or invented word.', expect: 'It splits into several sub-word pieces. Nothing is ever out of vocabulary because the pieces always exist.' },
      { task: 'Tokenise the same word with and without a leading space.', expect: 'They are different tokens. Whitespace is part of the token, which is why prompt formatting matters.' },
      { task: 'Tokenise a long number or a code snippet.', expect: 'The token count is far higher than the character intuition suggests — this is where context budgets go.' },
    ],
  },
  {
    id: 'embedding-space-3d',
    title: 'Embedding space',
    blurb: 'Words as points in 3D, with nearest neighbours by cosine similarity.',
    goal: 'What "similar direction means similar meaning" looks like.',
    domain: 'NLP',
    unitSlug: 'word-embeddings-and-word2vec',
    steps: [
      { task: 'Find two words from the same category in the projection.', expect: 'They sit near each other: distance encodes similarity of use, not spelling.' },
      { task: 'Find two words from different categories.', expect: 'They sit far apart, and the gap between categories is larger than the gap within one.' },
      { task: 'Rotate the view and check your conclusion still holds.', expect: 'Proximity in a 2D screenshot can be an artefact of the angle; in 3D it survives rotation.' },
      { task: 'Look for a pair whose relationship matches another pair\'s.', expect: 'The offset between them points in a similar direction — this is what the arithmetic analogies exploit.' },
    ],
  },
  {
    id: 'rag-flow',
    title: 'Retrieval-augmented generation',
    blurb: 'Ask a question, watch retrieval score every chunk, and see the prompt get assembled.',
    goal: 'That chunking strategy decides RAG quality, not the vector store.',
    domain: 'GEN',
    unitSlug: 'rag-and-agents',
    steps: [
      { task: 'Trace a question through retrieval to the answer.', expect: 'The model sees retrieved passages, not the whole corpus. Retrieval decides what it can possibly know.' },
      { task: 'Make retrieval return the wrong passages.', expect: 'The answer degrades even though the generator is unchanged — most RAG failures are retrieval failures.' },
      { task: 'Increase the number of retrieved passages.', expect: 'Recall rises and precision falls; beyond a point the useful passage is buried in noise.' },
      { task: 'Follow a claim in the answer back to its source passage.', expect: 'Every grounded claim traces to retrieved text. A claim that does not is the model inventing.' },
    ],
  },
  {
    id: 'bayes-explorer',
    title: "Bayes' theorem",
    blurb: 'A population grid showing why a 99%-accurate test for a rare disease is mostly false positives.',
    goal: 'Why the base rate dominates the answer.',
    domain: 'STAT',
    unitSlug: 'bayes-theorem',
    steps: [
      { task: 'Set the disease prevalence to 1% with a 99%-accurate test.', expect: 'Most positive results are false positives. The base rate dominates however good the test is.' },
      { task: 'Raise the prevalence to 30% and hold the test accuracy.', expect: 'The same test now produces mostly true positives. The test did not change; the population did.' },
      { task: 'Drop the false positive rate and hold prevalence low.', expect: 'The posterior improves sharply — on rare conditions, specificity matters more than sensitivity.' },
      { task: 'Read the posterior off the population grid rather than the formula.', expect: 'Counting squares gives the same answer as Bayes\' rule, which is what the rule is counting.' },
    ],
  },
  {
    id: 'clt-sim',
    title: 'Central limit theorem',
    blurb: 'Sample from a deliberately ugly distribution and watch the means go normal anyway.',
    goal: 'What exactly becomes normal — and what does not.',
    domain: 'STAT',
    unitSlug: 'central-limit-theorem',
    steps: [
      { task: 'Draw single samples from a strongly skewed distribution.', expect: 'The histogram of individual values looks nothing like a bell curve.' },
      { task: 'Average samples of size 5 and plot the means.', expect: 'The distribution of means is already more symmetric than the population.' },
      { task: 'Raise the sample size to 30 and beyond.', expect: 'The means become visibly normal regardless of the population\'s shape — this is the central limit theorem.' },
      { task: 'Watch the spread of the means as sample size grows.', expect: 'It narrows like one over the square root of n, which is where the standard error formula comes from.' },
    ],
  },
  {
    id: 'coin-flip-sim',
    title: 'Law of large numbers',
    blurb: 'Flip ten times, then ten thousand, and watch the proportion settle.',
    goal: 'Why small samples are wild and large ones are tame.',
    domain: 'STAT',
    unitSlug: 'probability-sample-spaces-events',
    steps: [
      { task: 'Flip ten times and read the proportion of heads.', expect: 'It is often far from 0.5 — ten flips is not many.' },
      { task: 'Flip a thousand times.', expect: 'The proportion settles close to 0.5. This is the law of large numbers, and it is about proportions.' },
      { task: 'Watch the running count of heads minus tails.', expect: 'The absolute gap tends to grow even as the proportion converges — the two facts are compatible.' },
      { task: 'Look for a run of five identical outcomes.', expect: 'They occur regularly. Runs are not evidence of unfairness, and expecting them to balance is the gambler\'s fallacy.' },
    ],
  },
  {
    id: 'distribution-explorer',
    title: 'Distributions',
    blurb: 'Every common distribution with its parameters, PDF, CDF and shaded probability.',
    goal: 'Which generative story produces which shape.',
    domain: 'STAT',
    unitSlug: 'the-normal-distribution',
    steps: [
      { task: 'Change the mean of a normal distribution.', expect: 'The curve slides without changing shape — the mean is a location parameter.' },
      { task: 'Change the standard deviation.', expect: 'The curve widens and flattens; the area stays at 1 because it is a probability density.' },
      { task: 'Read the area within one standard deviation of the mean.', expect: 'About 68%, and about 95% within two. These are properties of the shape, not of your data.' },
      { task: 'Switch to a skewed distribution and compare mean and median.', expect: 'They separate, and the mean is pulled toward the long tail.' },
    ],
  },
  {
    id: 'confidence-interval-sim',
    title: 'Confidence intervals',
    blurb: 'A hundred intervals from a hundred samples, coloured by whether they caught the truth.',
    goal: 'What "95% confident" actually means.',
    domain: 'STAT',
    unitSlug: 'confidence-intervals',
    steps: [
      { task: 'Draw a sample and read its 95% interval.', expect: 'It either contains the true value or does not; for one interval there is no probability left.' },
      { task: 'Draw many samples and watch the intervals accumulate.', expect: 'About 95 in 100 cover the true value. The 95% is a property of the procedure, not of any one interval.' },
      { task: 'Increase the sample size.', expect: 'Intervals narrow like one over the square root of n — four times the data for half the width.' },
      { task: 'Lower the confidence level to 80%.', expect: 'Intervals narrow and more of them miss. Confidence and precision trade directly.' },
    ],
  },
  {
    id: 'matrix-transform',
    title: 'Matrices as transformations',
    blurb: 'Edit a 2×2 matrix and watch the plane rotate, stretch, shear or collapse.',
    goal: 'That a matrix is a function, and that a zero determinant means collapse.',
    domain: 'MATH',
    unitSlug: 'matrices-as-data-and-functions',
    steps: [
      { task: 'Apply a matrix with a diagonal of 2 and 1.', expect: 'The unit square stretches along one axis only. Each column says where a basis vector lands.' },
      { task: 'Apply a rotation matrix.', expect: 'The square turns without changing area, because the determinant is 1.' },
      { task: 'Find a matrix whose determinant is zero.', expect: 'The square collapses onto a line: the transform destroyed a dimension and cannot be undone.' },
      { task: 'Compose two transforms and compare with the product matrix.', expect: 'Applying them in sequence equals applying the product — matrix multiplication is composition.' },
    ],
  },
  {
    id: 'derivative-explorer',
    title: 'Derivatives',
    blurb: 'Drag a point along a curve; watch the tangent and the derivative function agree.',
    goal: 'That the derivative is a slope, and its sign tells you the direction.',
    domain: 'MATH',
    unitSlug: 'derivatives-and-slope',
    steps: [
      { task: 'Place the point where the curve is steepest.', expect: 'The tangent is steepest and the derivative readout is largest in magnitude.' },
      { task: 'Move to a flat part of the curve.', expect: 'The tangent is horizontal and the derivative is near zero — this is what optimisers look for.' },
      { task: 'Find a point where the derivative changes sign.', expect: 'The curve turns from rising to falling; that is a maximum, and the sign change is the test.' },
      { task: 'Shrink the interval used for the secant line.', expect: 'The secant converges to the tangent, which is the limit that defines the derivative.' },
    ],
  },
  {
    id: 'vector-playground',
    title: 'Vectors',
    blurb: 'Drag two vectors and see addition, scaling and norms update.',
    goal: 'A vector as both an arrow and a list of features.',
    domain: 'MATH',
    unitSlug: 'vector-operations-and-norms',
    steps: [
      { task: 'Add two vectors head to tail.', expect: 'The sum is the diagonal, and the order does not matter — addition is commutative.' },
      { task: 'Scale a vector by a negative number.', expect: 'It reverses direction and changes length; a negative scalar is a flip plus a stretch.' },
      { task: 'Make two vectors perpendicular and read the dot product.', expect: 'It is zero. A zero dot product is the definition of orthogonal.' },
      { task: 'Point two vectors the same way and read the dot product.', expect: 'It is at its largest for those lengths — the dot product measures agreement in direction.' },
    ],
  },
  {
    id: 'dot-product',
    title: 'The dot product',
    blurb: 'Rotate two vectors and watch the dot product, angle and projection change together.',
    goal: 'Why the dot product measures alignment — the basis of cosine similarity.',
    domain: 'MATH',
    unitSlug: 'dot-product-and-similarity',
    steps: [
      { task: 'Set the angle between the vectors to zero.', expect: 'The dot product equals the product of the lengths — maximum agreement.' },
      { task: 'Set the angle to 90 degrees.', expect: 'The dot product is zero, whatever the lengths.' },
      { task: 'Open the angle past 90 degrees.', expect: 'The dot product goes negative: the vectors now disagree in direction.' },
      { task: 'Double one vector\'s length and hold the angle.', expect: 'The dot product doubles — it is linear in each argument, which is why it appears in every weighted sum.' },
    ],
  },
  {
    id: 'ndarray-explorer',
    title: 'The ndarray',
    blurb: 'Choose a shape and see what "three-dimensional" actually looks like.',
    goal: 'Reading shapes without guessing.',
    domain: 'NP',
    unitSlug: 'the-ndarray',
    steps: [
      { task: 'Create a 2D array and read its shape.', expect: 'Two numbers: rows then columns. Shape is the first thing to check when anything goes wrong.' },
      { task: 'Reshape it without changing the number of elements.', expect: 'The data is unchanged; only the interpretation moves. Reshape is free because it rewrites the shape, not the buffer.' },
      { task: 'Slice a row and read its shape.', expect: 'It drops to one dimension. Slicing with an index removes an axis; slicing with a range keeps it.' },
      { task: 'Sum along axis 0 and then axis 1.', expect: 'The axis you name is the axis that disappears — that rule never fails.' },
    ],
  },
  {
    id: 'broadcasting',
    title: 'Broadcasting',
    blurb: 'Set two shapes and see the alignment rules succeed or fail, with the real error message.',
    goal: 'The rule, rather than trial and error.',
    domain: 'NP',
    unitSlug: 'broadcasting-rules',
    steps: [
      { task: 'Add a scalar to an array.', expect: 'It applies to every element without a loop, because the scalar is stretched to the array\'s shape.' },
      { task: 'Add a row vector to a matrix.', expect: 'It applies to every row. Shapes align from the right, and a length-1 axis stretches.' },
      { task: 'Try two shapes that are incompatible.', expect: 'It raises rather than guessing. Broadcasting is strict, which is what makes it safe.' },
      { task: 'Use keepdims when reducing, then broadcast the result back.', expect: 'The length-1 axis lets the summary line up with the original — this is why keepdims exists.' },
    ],
  },
  {
    id: 'graph-traversal',
    title: 'BFS versus DFS',
    blurb: 'The same graph, two traversals, with the queue and the stack shown.',
    goal: 'Why BFS finds shortest paths and DFS does not.',
    domain: 'DSA',
    unitSlug: 'breadth-first-search',
    steps: [
      { task: 'Run breadth-first search from a start node.', expect: 'It visits everything at distance 1, then distance 2 — the frontier expands in rings.' },
      { task: 'Run depth-first search from the same node.', expect: 'It plunges down one path to the end before backtracking. Same graph, entirely different order.' },
      { task: 'Use BFS to find the shortest path in an unweighted graph.', expect: 'The first time it reaches the target is via a shortest path. DFS gives no such guarantee.' },
      { task: 'Watch the visited set on a graph with a cycle.', expect: 'Without it the traversal would loop forever; with it every node is processed once.' },
    ],
  },
  {
    id: 'sorting-race',
    title: 'Sorting algorithms',
    blurb: 'Four sorts on the same array, with comparison and swap counters.',
    goal: 'Where the n log n boundary actually bites.',
    domain: 'DSA',
    unitSlug: 'sorting-algorithms',
    steps: [
      { task: 'Race the algorithms on a small random array.', expect: 'The quadratic sorts are competitive — constants dominate when n is small.' },
      { task: 'Raise the array size substantially.', expect: 'The quadratic sorts fall far behind. This is the asymptotic difference becoming visible.' },
      { task: 'Run them on an already-sorted array.', expect: 'Insertion sort becomes nearly linear while others do not benefit — adaptivity is a real property.' },
      { task: 'Run them on a reverse-sorted array.', expect: 'Insertion sort hits its worst case. Best and worst case can differ by an order of growth.' },
    ],
  },
  {
    id: 'big-o-growth',
    title: 'Big-O growth',
    blurb: 'The curves, and — more usefully — the operation counts at real input sizes.',
    goal: 'That constant factors stop mattering.',
    domain: 'DSA',
    unitSlug: 'big-o-and-time-complexity',
    steps: [
      { task: 'Compare constant, logarithmic and linear growth at small n.', expect: 'They are hard to tell apart — complexity is a statement about large n.' },
      { task: 'Raise n by several orders of magnitude.', expect: 'The curves separate decisively, and the ranking never changes again.' },
      { task: 'Compare n log n with n squared.', expect: 'The gap becomes enormous. This is the difference between a usable sort and an unusable one.' },
      { task: 'Look at exponential growth against everything else.', expect: 'It leaves the chart almost immediately. Exponential algorithms are only ever viable on tiny inputs.' },
    ],
  },
  {
    id: 'sql-playground',
    title: 'SQL playground',
    blurb: 'Run real queries against a sample database of customers, orders and employees.',
    goal: 'SQL fluency comes from running queries, not reading them.',
    domain: 'SQL',
    unitSlug: 'select-and-projection',
    featured: true,
    steps: [
      { task: 'Run a SELECT with a WHERE clause.', expect: 'Only the matching rows come back; WHERE filters before anything is grouped.' },
      { task: 'Add GROUP BY with an aggregate.', expect: 'One row per group. Every selected column must be grouped or aggregated, which is why the other form errors.' },
      { task: 'Add HAVING and compare it with WHERE.', expect: 'HAVING filters groups after aggregation; WHERE filters rows before it. They are not interchangeable.' },
      { task: 'Write an INNER JOIN and then a LEFT JOIN on the same tables.', expect: 'The LEFT JOIN keeps unmatched rows with nulls. That difference is usually the bug.' },
    ],
  },
  {
    id: 'code-playground',
    title: 'Python playground',
    blurb: 'Write and run Python in your browser. Nothing is sent to a server.',
    goal: 'Prediction then verification — the fastest way to learn a language.',
    domain: 'PY',
    unitSlug: 'your-first-python-program',
    featured: true,
    steps: [
      { task: 'Run a short Python snippet and read the output.', expect: 'It executes in your browser, in a worker — nothing is sent to a server.' },
      { task: 'Introduce a syntax error and run it.', expect: 'Nothing executes at all, because the module is compiled before any statement runs.' },
      { task: 'Introduce a runtime error partway through.', expect: 'Earlier lines have already run. Syntax errors and runtime errors fail at different moments.' },
      { task: 'Print a variable\'s type alongside its value.', expect: 'Type is a property of the object, not of the name bound to it.' },
    ],
  },
  {
    id: 'edge-detection-lab',
    title: 'Edge detection',
    blurb: 'Apply Sobel, Laplacian and blur kernels and see the edges appear.',
    goal: 'That edge detection is just a particular convolution.',
    domain: 'CV',
    unitSlug: 'convolution-filters-edge-detection',
    steps: [
      { task: 'Apply a Sobel filter in the x direction.', expect: 'Vertical edges respond strongly; horizontal ones barely at all.' },
      { task: 'Apply it in the y direction.', expect: 'The response flips. Each filter sees one orientation.' },
      { task: 'Combine the two magnitudes.', expect: 'Edges in every orientation appear, which is what the gradient magnitude computes.' },
      { task: 'Blur the image first and re-run.', expect: 'Fewer spurious edges. Blurring suppresses noise that the derivative would otherwise amplify.' },
    ],
  },
  {
    id: 'image-pixels-lab',
    title: 'Pixels and channels',
    blurb: 'Hover an image and read the actual numbers behind each pixel.',
    goal: 'An image is a tensor of integers.',
    domain: 'CV',
    unitSlug: 'pixels-channels-and-colour',
    steps: [
      { task: 'Zoom until individual pixels are visible.', expect: 'An image is a grid of numbers; everything else is interpretation.' },
      { task: 'Read the three channel values for one pixel.', expect: 'Red, green and blue between 0 and 255 — the colour is the triple, not a name.' },
      { task: 'Set one channel to zero across the image.', expect: 'The whole image shifts hue, which shows the channels are independent.' },
      { task: 'Convert to greyscale and compare.', expect: 'Three numbers become one. That is a two-thirds reduction before any model has seen it.' },
    ],
  },
  {
    id: 'drift-monitor',
    title: 'Drift monitoring',
    blurb: 'Shift the production distribution and watch PSI and accuracy react — at different speeds.',
    goal: 'Why a broken model keeps returning HTTP 200.',
    domain: 'OPS',
    unitSlug: 'model-and-data-drift',
    steps: [
      { task: 'Watch a stable feature\'s distribution over time.', expect: 'The drift statistic stays low and the alert stays quiet.' },
      { task: 'Shift the feature\'s mean partway through.', expect: 'The statistic crosses the threshold and the alert fires — the data changed, not the model.' },
      { task: 'Change the variance without changing the mean.', expect: 'A mean-only check would miss it; a distributional check does not.' },
      { task: 'Compare the drift signal against the accuracy line.', expect: 'Drift is visible before accuracy degrades, which is the whole point of monitoring inputs.' },
    ],
  },
  {
    id: 'docker-layers',
    title: 'Docker layer caching',
    blurb: 'Reorder two lines in a Dockerfile and watch the rebuild cost collapse.',
    goal: 'Why requirements are copied before source.',
    domain: 'OPS',
    unitSlug: 'docker-and-containers',
    steps: [
      { task: 'Change a line near the end of the Dockerfile and rebuild.', expect: 'Only the layers after it rebuild; everything before is cached.' },
      { task: 'Change a line near the beginning and rebuild.', expect: 'Every subsequent layer rebuilds. Layer order is a build-time cost decision.' },
      { task: 'Move dependency installation above the application copy.', expect: 'Code changes stop invalidating the dependency layer — the single highest-value Dockerfile ordering rule.' },
      { task: 'Compare the image size before and after combining RUN steps.', expect: 'Each layer keeps its own contents, so deleting a file in a later layer does not shrink the image.' },
    ],
  },
];

export const LAB_BY_ID = new Map(LABS.map((l) => [l.id as string, l]));
