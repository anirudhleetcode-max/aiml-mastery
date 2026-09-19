import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'CV-001',
    domain: 'CV',
    module: 'Images as Data',
    topic: 'Pixels and colour',
    title: 'Pixels, Channels and Colour',
    slug: 'pixels-channels-and-colour',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: [],
    tags: ['pixel', 'rgb', 'grayscale', 'hsv', 'bgr', 'colour-space', 'uint8'],

    learningObjectives: [
      'Describe a pixel as a number, and a grayscale image as a two-dimensional grid of numbers',
      'Explain why a colour image is three stacked grids and what each channel measures',
      'Convert between grayscale, RGB and HSV, and say when HSV makes a task easier',
      'Recognise the BGR-versus-RGB channel-order trap that OpenCV sets for every beginner',
    ],

    terminology: [
      {
        term: 'Pixel',
        definition:
          'The smallest addressable element of an image. In an 8-bit grayscale image a pixel is a single integer from 0 (black) to 255 (white) describing how much light that point received.',
        simple: 'One tiny square of the picture, stored as a number saying how bright it is.',
      },
      {
        term: 'Channel',
        definition:
          'One full grid of pixel values measuring a single quantity across the whole image, such as the red component. Grayscale has one channel, RGB has three, RGBA has four.',
        simple: 'One complete layer of numbers — for example, the red layer of the picture.',
      },
      {
        term: 'Bit depth',
        definition:
          'How many bits store one channel value. 8-bit gives 256 levels (0–255), which is the overwhelming default; 16-bit is used in medical and scientific imaging where fine gradations matter.',
        simple: 'How many different brightness steps a pixel is allowed to have.',
      },
      {
        term: 'Colour space',
        definition:
          'A convention for interpreting channel numbers as colour. RGB stores additive light primaries; HSV stores hue, saturation and value; both describe the same colours with different coordinates.',
        simple: 'The rulebook that says what the three numbers in a pixel actually mean.',
      },
      {
        term: 'Channel order',
        definition:
          'The sequence in which channels are laid out in memory. PIL, matplotlib and torchvision use RGB; OpenCV reads and writes BGR, so the same bytes mean different colours in the two libraries.',
        simple: 'Which layer comes first — some libraries put red first, OpenCV puts blue first.',
      },
    ],

    simpleExplanation:
      "Hold your phone very close to a bright screen and you will see that the picture is made of tiny squares. Each square is a pixel, and the computer does not store it as a colour — it stores it as a number. In a black-and-white photograph that number runs from 0 to 255, where 0 means this spot received no light at all and 255 means it was as bright as the format can record. So a small grayscale photo is nothing more than a grid of numbers, like a spreadsheet where every cell holds a brightness. Colour works the same way, only three times over. The computer keeps one grid for how much red is at each spot, one for green, one for blue, stacked like three transparent sheets. Mix 255 red, 255 green and 0 blue and you get yellow. That is the whole secret of computer vision: there is no picture inside the machine, only arithmetic on a grid of numbers, and every technique in this domain is some particular sum over that grid.",

    whyItExists:
      'Cameras produce light measurements, and computers can only store and compute on numbers, so an image has to be discretised into a finite grid of integers before anything can be done with it. Pixels and channels are that agreed representation: once a photograph is a grid of numbers, the entire toolkit of arithmetic, linear algebra and gradient-based learning becomes available to it.',

    analogy: {
      scenario:
        'Imagine a mosaic made of thousands of small square tiles, and next to it a numbered instruction sheet: tile at row 12, column 40 gets shade 200; the tile beside it gets shade 198. Anyone with the sheet can rebuild the mosaic exactly, because the sheet is the mosaic. For a colour mosaic you are handed three sheets — how much red, how much green, how much blue each tile needs — and the tiler mixes them on the spot.',
      mapping: [
        { from: 'One square tile', to: 'One pixel' },
        { from: 'The shade number written for that tile', to: 'The 8-bit intensity value, 0–255' },
        { from: 'The row and column on the sheet', to: 'The (row, column) index into the image array' },
        { from: 'Three separate sheets for a colour mosaic', to: 'The R, G and B channels, three stacked grids' },
        { from: 'Mixing the three shades at the tile position', to: 'The display combining channel values into one visible colour' },
      ],
      bridge:
        'The instruction sheet is not a description of the mosaic; it is a complete specification of it, and the same is true of an image array. When you later blur, sharpen, detect edges or run a convolutional network, you are editing the numbers on the sheet — nothing else is happening. Keeping that literal picture in mind is what makes tensor shapes and filter arithmetic feel obvious rather than magical.',
      limitations:
        'The analogy suggests each tile is independent, and numerically it is, but perceptually it is not: human vision reacts to local contrast and context, which is why two identical pixel values can look like different shades depending on their neighbours. It also glosses over the fact that 8-bit values are usually gamma-encoded rather than linear in physical light.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Zoom into the numbers',
        caption: 'Hover a region to see the actual 0–255 values behind what looks like a smooth photograph.',
        widget: 'image-pixels-lab',
      },
      {
        kind: 'ascii',
        title: 'A 5x5 grayscale image is literally this',
        caption: 'Dark background, a bright diagonal stroke. Nothing else is stored.',
        art: `  col:    0    1    2    3    4
row 0 [  12   14   15  210   13 ]
row 1 [  11  200  205   14   12 ]
row 2 [  13  198  202   16   11 ]
row 3 [ 205  201   15   12   14 ]
row 4 [  14   13   12   11   13 ]`,
      },
      {
        kind: 'compare',
        title: 'RGB versus HSV',
        caption: 'Same colours, different coordinates — and the coordinates decide how hard your task is.',
        left: {
          heading: 'RGB (red, green, blue)',
          points: [
            'Three additive light primaries, each 0–255 in 8-bit',
            'Matches how screens and sensors physically work',
            'Brightness is smeared across all three channels',
            'A red shirt in shadow and in sun have very different RGB triples',
          ],
        },
        right: {
          heading: 'HSV (hue, saturation, value)',
          points: [
            'Hue is the colour angle 0–179 in OpenCV, 0–360 elsewhere',
            'Saturation is how vivid, value is how bright',
            'Separates what colour it is from how lit it is',
            'That red shirt keeps roughly the same hue in sun and shadow',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Channel order by library — the trap',
        columns: ['Library / function', 'Channel order', 'Typical symptom when confused'],
        rows: [
          ['cv2.imread', 'BGR', 'Sky and skin look swapped: blue faces, orange sky'],
          ['PIL Image.open', 'RGB', 'Correct in matplotlib, wrong if fed straight to cv2.imwrite'],
          ['matplotlib imshow', 'expects RGB', 'Displays a cv2 array with red and blue exchanged'],
          ['torchvision transforms', 'RGB, channels-first', 'Pretrained model accuracy quietly collapses on BGR input'],
        ],
      },
    ],

    formalDefinition:
      'A digital raster image is a discrete function I : {0,…,H-1} x {0,…,W-1} -> Z^C mapping each integer pixel coordinate to a C-dimensional vector of channel intensities, quantised to a fixed bit depth. For an 8-bit grayscale image C = 1 and the codomain is {0,…,255}; for 8-bit RGB, C = 3 and the triple is interpreted under a colour space that fixes the relationship between stored numbers and perceived colour.',

    math: {
      intuition:
        'Converting colour to grayscale is not an average of the three channels, because the eye is far more sensitive to green light than to blue. The standard conversion is a weighted sum whose weights approximate human luminance perception, which is why a pure green patch turns out much lighter than a pure blue patch of the same numeric intensity.',
      formulas: [
        {
          latex: 'Y = 0.299\\,R + 0.587\\,G + 0.114\\,B',
          name: 'Luma (ITU-R BT.601 grayscale conversion)',
          meaning:
            'The single brightness value that replaces an RGB triple when you convert to grayscale. Green dominates because human cone sensitivity peaks in the green band; blue contributes least.',
          variables: [
            { symbol: 'Y', meaning: 'Resulting grayscale intensity for that pixel, same 0–255 range' },
            { symbol: 'R', meaning: 'Red channel value at that pixel, 0–255' },
            { symbol: 'G', meaning: 'Green channel value at that pixel, 0–255' },
            { symbol: 'B', meaning: 'Blue channel value at that pixel, 0–255' },
          ],
        },
        {
          latex: 'V = \\max(R\', G\', B\'), \\quad S = \\begin{cases} \\dfrac{V - \\min(R\', G\', B\')}{V} & V > 0 \\\\ 0 & V = 0 \\end{cases}',
          name: 'HSV value and saturation',
          meaning:
            'Value is simply the largest of the three normalised channels, so it tracks overall brightness. Saturation is the spread between the largest and smallest channel relative to the largest, so grey pixels (all channels equal) have saturation zero.',
          variables: [
            { symbol: "R', G', B'", meaning: 'Channel values scaled to the range 0–1 by dividing by 255' },
            { symbol: 'V', meaning: 'Value: how bright the pixel is, 0–1' },
            { symbol: 'S', meaning: 'Saturation: how far from grey the pixel is, 0–1' },
          ],
        },
        {
          latex: 'N = H \\times W \\times C',
          name: 'Number of stored values in an image',
          meaning:
            'Every image is exactly this many numbers. A 1920x1080 RGB photograph is 6,220,800 separate 8-bit values, which is why image work is memory-hungry from the very first step.',
          variables: [
            { symbol: 'H', meaning: 'Height in pixels (number of rows)' },
            { symbol: 'W', meaning: 'Width in pixels (number of columns)' },
            { symbol: 'C', meaning: 'Number of channels: 1 for grayscale, 3 for RGB, 4 with alpha' },
          ],
        },
      ],
      derivation: [
        'Start from a single pixel of a bright orange shirt: (R, G, B) = (230, 120, 40).',
        'Naive averaging gives (230 + 120 + 40) / 3 = 130.0, which treats blue as though it were as visible as green.',
        'The luma weights instead give 0.299(230) + 0.587(120) + 0.114(40) = 68.77 + 70.44 + 4.56 = 143.77.',
        'The weighted result is about 14 levels brighter, which matches how the orange actually looks to a human eye next to a grey card.',
      ],
    },

    workedExample: {
      title: 'Turning one orange pixel into grayscale and into HSV',
      setup:
        'Take a single 8-bit RGB pixel from a photograph of an orange traffic cone: (R, G, B) = (230, 120, 40). We will compute its grayscale value and its OpenCV HSV coordinates entirely by hand, so that nothing about cvtColor remains mysterious.',
      steps: [
        {
          label: 'Apply the luma weights',
          detail:
            'Multiply each channel by its perceptual weight and add. 0.299 x 230 = 68.77, 0.587 x 120 = 70.44, 0.114 x 40 = 4.56.',
          latex: 'Y = 68.77 + 70.44 + 4.56 = 143.77 \\approx 144',
        },
        {
          label: 'Normalise for HSV',
          detail:
            'Divide every channel by 255: R\' = 0.902, G\' = 0.471, B\' = 0.157. HSV is defined on the 0–1 scale, not on raw bytes.',
        },
        {
          label: 'Value is the maximum channel',
          detail:
            'max(0.902, 0.471, 0.157) = 0.902. In OpenCV 8-bit HSV this is stored as 0.902 x 255 = 230, which is simply the red channel again.',
          latex: 'V = 0.902',
        },
        {
          label: 'Saturation is the relative spread',
          detail:
            'min is 0.157, so S = (0.902 - 0.157) / 0.902 = 0.745 / 0.902 = 0.826. Stored 8-bit, that is 0.826 x 255 = 211 — a strongly saturated colour, as an orange cone should be.',
          latex: 'S = \\frac{0.902 - 0.157}{0.902} = 0.826',
        },
        {
          label: 'Hue is the angle in the red sector',
          detail:
            'Because red is the maximum, H = 60 x ((G\' - B\') / (V - min)) = 60 x ((0.471 - 0.157) / 0.745) = 60 x 0.421 = 25.3 degrees. OpenCV halves this to fit 8 bits, storing 13.',
          latex: 'H = 60 \\times \\frac{0.471 - 0.157}{0.745} = 25.3^{\\circ}',
        },
      ],
      conclusion:
        'The pixel is (144) in grayscale and roughly (13, 211, 230) in OpenCV HSV. Notice what HSV bought us: if the cone moves into shadow, all three RGB numbers shrink together, but hue stays near 13 and only value drops. That stability is exactly why colour thresholding is usually written in HSV rather than RGB.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'An image is a grid of numbers — prove it',
        runnable: true,
        code: `import numpy as np
from PIL import Image

img = Image.open("cone.jpg").convert("RGB")
arr = np.array(img)

print("type:", type(arr))
print("shape:", arr.shape)       # (height, width, channels)
print("dtype:", arr.dtype)       # uint8 -> values 0..255
print("min, max:", arr.min(), arr.max())

# One pixel is a length-3 vector, not a colour
print("pixel at row 100, col 250:", arr[100, 250])

# One channel is a full 2-D grid
red = arr[:, :, 0]
print("red channel shape:", red.shape, "mean red:", round(float(red.mean()), 1))`,
        output: `type: <class 'numpy.ndarray'>
shape: (720, 1280, 3)
dtype: uint8
min, max: 0 255
pixel at row 100, col 250: [230 120  40]
red channel shape: (720, 1280) mean red: 118.4`,
        explanation:
          'PIL decodes the JPEG and numpy exposes the result for what it is: a uint8 array of shape (720, 1280, 3). Indexing with two coordinates returns a three-number vector, one per channel; slicing the last axis returns a single 2-D grid you could print as a spreadsheet. Nothing here is image-specific — every subsequent technique is ordinary array arithmetic on this object.',
      },
      {
        language: 'python',
        title: 'The BGR trap, and how to see it',
        runnable: true,
        code: `import cv2
import numpy as np

bgr = cv2.imread("cone.jpg")          # OpenCV gives you BGR, always
print("cv2 pixel (B, G, R):", bgr[100, 250])

rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
print("after conversion (R, G, B):", rgb[100, 250])

# The classic symptom: feeding BGR to something that expects RGB
# swaps the red and blue channels, so orange cones turn blue.
swapped = np.array_equal(bgr[..., ::-1], rgb)
print("reversing the last axis is the same conversion:", swapped)

# And the defensive check every beginner should write once:
if bgr is None:
    raise FileNotFoundError("cv2.imread returns None for a bad path, it does not raise")`,
        output: `cv2 pixel (B, G, R): [ 40 120 230]
after conversion (R, G, B): [230 120  40]
reversing the last axis is the same conversion: True`,
        explanation:
          'The same three bytes are stored in the opposite order by OpenCV, for historical reasons dating to early camera hardware. Note two practical facts: converting is exactly a reversal of the channel axis, and cv2.imread returns None rather than raising when the path is wrong, so a missing file shows up much later as a confusing NoneType error.',
      },
      {
        language: 'python',
        title: 'Thresholding a colour in HSV instead of RGB',
        runnable: true,
        code: `import cv2
import numpy as np

bgr = cv2.imread("cone.jpg")
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)   # H: 0-179, S: 0-255, V: 0-255

# Orange sits roughly at hue 5-25 in OpenCV's halved scale.
lower = np.array([5, 120, 80], dtype=np.uint8)
upper = np.array([25, 255, 255], dtype=np.uint8)
mask = cv2.inRange(hsv, lower, upper)        # 0 or 255, single channel

coverage = float((mask > 0).mean())
print("mask shape:", mask.shape, "dtype:", mask.dtype)
print("fraction of image matched:", round(coverage, 4))

only_cone = cv2.bitwise_and(bgr, bgr, mask=mask)
cv2.imwrite("cone_isolated.png", only_cone)`,
        output: `mask shape: (720, 1280) dtype: uint8
fraction of image matched: 0.0713`,
        explanation:
          'Written in RGB, this rule would need a tangled set of inequalities that break the moment the light changes, because brightness lives in all three channels at once. In HSV the rule reads almost like English: hue between 5 and 25, reasonably saturated, not nearly black. The mask that comes back is itself just another grid of numbers, with 255 meaning kept and 0 meaning discarded.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Industrial quality inspection on a production line',
        usage:
          'A camera above a conveyor thresholds in HSV to find parts by colour, because factory lighting flickers and shifts through the day. Hue stays stable while RGB values wander, so the same threshold survives a shift change.',
      },
      {
        context: 'Medical imaging pipelines',
        usage:
          'CT and MRI data arrive as 12- or 16-bit single-channel grids, not 8-bit RGB. Clipping them to 0–255 too early destroys exactly the subtle tissue contrast radiologists rely on, so windowing is applied deliberately rather than by accident.',
      },
      {
        context: 'The most common bug in a first vision project',
        usage:
          'A model trained on RGB from torchvision is deployed behind cv2.imread and loses several points of accuracy for no visible reason. The channels are reversed, the picture still looks like a picture to the network, and it takes hours to find.',
      },
    ],

    projectConnections: [
      { tool: 'Pillow (PIL)', role: 'The default loader in torchvision datasets; returns RGB, so it agrees with pretrained-model expectations.' },
      { tool: 'OpenCV', role: 'Fast C++ decoding, resizing and colour conversion — and the source of the BGR convention you must convert away from.' },
      { tool: 'NumPy', role: 'The common currency: whatever library loads the file, the result becomes an ndarray you can slice and inspect.' },
      { tool: 'matplotlib', role: 'imshow renders arrays for debugging, and expects RGB for colour or a 2-D array for grayscale.' },
    ],

    commonMistakes: [
      {
        mistake: 'Displaying an OpenCV image with matplotlib and not noticing the colours are wrong',
        why: 'cv2.imread produces BGR while plt.imshow assumes RGB, so red and blue are exchanged. Faces look bluish and skies look brown, but the picture is still recognisable enough to slip past a quick glance.',
        fix: 'Convert at the boundary: plt.imshow(cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)). Decide once that everything inside your code is RGB and convert only at load and save.',
      },
      {
        mistake: 'Averaging the three channels to get grayscale',
        why: 'A flat mean treats blue as equally visible as green, so it produces a perceptually wrong brightness — blues come out too light and greens too dark relative to how they look.',
        fix: 'Use cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) or PIL convert("L"), both of which apply the luma weights 0.299 / 0.587 / 0.114.',
      },
      {
        mistake: 'Assuming OpenCV hue runs from 0 to 360',
        why: 'To fit hue into one unsigned byte, OpenCV halves it, so the range is 0–179. A threshold copied from a web article that uses 0–360 will select the wrong colour entirely.',
        fix: 'Halve any hue you look up: 200 degrees in the literature is 100 in OpenCV. Print the HSV value of a pixel you know before trusting a range.',
      },
      {
        mistake: 'Doing arithmetic on uint8 arrays without thinking about overflow',
        why: 'uint8 wraps around, so 200 + 100 is 44, not 300. Brightening an image by adding a constant silently turns the brightest regions black.',
        fix: 'Cast to a wider type first — img.astype(np.float32) — then clip with np.clip(x, 0, 255) before casting back, or use cv2.add which saturates instead of wrapping.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What exactly is stored when a computer stores a colour photograph?',
        answer:
          'A three-dimensional array of integers. For an 8-bit RGB image of height H and width W, it is H x W x 3 values, each between 0 and 255, where the three numbers at a location give the red, green and blue intensities of that pixel. Equivalently, it is three stacked 2-D grids, one per channel. There is no notion of an object, edge or region in that storage — those are things we compute from the numbers. A 1920x1080 photograph is therefore about 6.2 million bytes of raw pixel data, which is why formats like JPEG apply lossy compression for storage and decode back to this grid before any processing.',
        followUp:
          'A strong answer distinguishes the compressed file on disk from the decoded array in memory, and mentions that JPEG artefacts are already baked into the numbers you receive.',
      },
      {
        level: 'intermediate',
        question: 'When would you convert an image to HSV rather than working in RGB, and why does it help?',
        answer:
          'Whenever the task is about which colour something is rather than how bright it is — colour-based segmentation, finding a coloured marker, skin or vegetation masks, chroma keying. In RGB, illumination changes move all three channels together, so a single object sweeps out a long diagonal region of RGB space that is awkward to bound with simple thresholds. HSV factors out that variation: hue encodes the colour angle, saturation the vividness, value the brightness, so a rule like hue in [5, 25] with saturation above 120 captures an orange object across a wide range of lighting. The caveat is that hue becomes unstable and meaningless as saturation or value approach zero, so near-grey and near-black pixels need explicit exclusion.',
        followUp:
          'Mentioning that OpenCV stores hue as 0–179 and that hue wraps around at the red end (so red needs two ranges, roughly 0–10 and 170–179) signals real hands-on experience.',
      },
      {
        level: 'ml-engineer',
        question: 'A model performs well in your notebook but loses four points of accuracy in the production service. Both use the same weights. What would you check first?',
        answer:
          'Preprocessing parity, and channel order specifically. A notebook that loads with PIL gets RGB, while a service built on cv2.imread gets BGR, and a convolutional network trained on RGB will still emit plausible-looking predictions on channel-swapped input — just worse ones, with no error raised anywhere. The check is cheap: take one image, run it through both paths, and assert that the resulting tensors are numerically equal before they reach the model. The same class of bug covers resize interpolation differences, forgetting to scale to [0,1], and applying the wrong normalisation statistics. Any of these degrades accuracy silently rather than failing loudly, which is why the assertion belongs in a regression test rather than in tribal memory.',
        followUp:
          'The best answers propose a golden-input regression test: a stored fixture image plus its expected preprocessed tensor, compared with a tight tolerance in CI.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A 640x480 RGB image is stored as uint8. How many bytes of raw pixel data is that, and how many would the same image take as 16-bit grayscale?',
        hint: 'Count the values with H x W x C, then multiply by the bytes per value.',
        solution:
          'RGB uint8: 640 x 480 x 3 = 921,600 values at one byte each = 921,600 bytes, about 0.88 MiB. 16-bit grayscale: 640 x 480 x 1 = 307,200 values at two bytes each = 614,400 bytes, about 0.59 MiB. The grayscale version is smaller despite its greater bit depth, because dropping from three channels to one saves more than doubling the depth costs.',
      },
      {
        prompt:
          'Compute the grayscale value of the pure green pixel (0, 255, 0) and of the pure blue pixel (0, 0, 255) using the luma weights. Explain the difference in one sentence.',
        hint: 'Y = 0.299R + 0.587G + 0.114B. Only one term survives in each case.',
        solution:
          'Green: 0.587 x 255 = 149.7, so about 150. Blue: 0.114 x 255 = 29.1, so about 29. Pure green converts to a mid-grey while pure blue converts to a near-black, because human vision is roughly five times more sensitive to green light than to blue, and the weights encode that sensitivity rather than treating the channels as interchangeable.',
      },
      {
        prompt:
          'Write code that loads an image with OpenCV, brightens it by 60 levels without overflow artefacts, and saves the result. Explain why the naive version fails.',
        hint: 'uint8 arithmetic wraps around at 255. Either widen the dtype or use a saturating operation.',
        language: 'python',
        starterCode: 'import cv2\nimport numpy as np\n\nbgr = cv2.imread("input.jpg")\n',
        solution:
          'bright = cv2.add(bgr, 60)  # cv2.add saturates at 255\ncv2.imwrite("bright.jpg", bright)\n\nThe naive bgr + 60 uses numpy uint8 semantics, which wrap: a pixel of 220 becomes 280 mod 256 = 24, so the brightest highlights turn black and the picture develops ugly dark blotches exactly where it should be lightest. cv2.add clamps instead of wrapping. The equivalent numpy version is np.clip(bgr.astype(np.int16) + 60, 0, 255).astype(np.uint8).',
      },
    ],

    quiz: [
      {
        id: 'CV-001-q1',
        type: 'mcq',
        concept: 'image representation',
        prompt: 'What is stored at one location of an 8-bit grayscale image?',
        options: [
          'A single integer between 0 and 255 giving brightness',
          'A colour name from a fixed palette',
          'Three floating-point numbers between 0 and 1',
          'A compressed JPEG block',
        ],
        answerIndex: 0,
        explanation:
          'Grayscale has one channel, and 8 bits gives 256 levels, so each pixel is one integer from 0 (black) to 255 (white). Compression exists only in the file on disk; once decoded, it is a plain grid of integers.',
      },
      {
        id: 'CV-001-q2',
        type: 'truefalse',
        concept: 'channel order',
        prompt: 'cv2.imread returns pixels in RGB order, the same as PIL.',
        answer: false,
        explanation:
          'OpenCV returns BGR. Passing that array to a library or model expecting RGB swaps red and blue, which degrades a network quietly rather than raising an error. Convert with cv2.cvtColor(img, cv2.COLOR_BGR2RGB) at the boundary.',
      },
      {
        id: 'CV-001-q3',
        type: 'numeric',
        concept: 'grayscale conversion',
        prompt: 'Using Y = 0.299R + 0.587G + 0.114B, what is the grayscale value of the pixel (100, 150, 200)? Give your answer to one decimal place.',
        answer: 140.75,
        tolerance: 0.5,
        explanation:
          '0.299 x 100 = 29.9, 0.587 x 150 = 88.05, 0.114 x 200 = 22.8. The sum is 140.75, which rounds to about 140.8 — close to but not equal to the flat mean of 150, because the weights reflect human sensitivity rather than treating the channels equally.',
      },
      {
        id: 'CV-001-q4',
        type: 'code-output',
        language: 'python',
        concept: 'uint8 overflow',
        prompt: 'What does this print?',
        code: 'import numpy as np\nx = np.array([200, 100, 50], dtype=np.uint8)\nprint(x + 100)',
        options: ['[ 44 200 150]', '[300 200 150]', '[255 200 150]', 'It raises an OverflowError'],
        answerIndex: 0,
        explanation:
          'uint8 arithmetic wraps modulo 256, so 200 + 100 = 300 becomes 44. numpy does not warn and does not clamp. Use cv2.add, or widen to int16 and np.clip before casting back.',
      },
      {
        id: 'CV-001-q5',
        type: 'match',
        concept: 'colour spaces',
        prompt: 'Match each quantity to what it measures.',
        pairs: [
          { left: 'Hue', right: 'Which colour it is, as an angle (0–179 in OpenCV)' },
          { left: 'Saturation', right: 'How vivid rather than grey the colour is' },
          { left: 'Value', right: 'How bright the pixel is overall' },
          { left: 'Alpha', right: 'How opaque the pixel is, in a fourth channel' },
        ],
        explanation:
          'HSV splits colour identity from illumination, which is what makes threshold rules robust to lighting change. Alpha is not part of HSV at all — it is an extra transparency channel found in RGBA images such as PNGs.',
      },
      {
        id: 'CV-001-q6',
        type: 'explain',
        concept: 'pixels as numbers',
        prompt:
          'Explain to someone who has never programmed why a photograph and a spreadsheet of numbers are, to a computer, the same kind of object.',
        rubric: [
          'States that each pixel is stored as a number measuring light',
          'States that the image is a grid indexed by row and column',
          'Mentions that colour means three stacked grids rather than one',
        ],
        sampleAnswer:
          'A photograph on a computer is split into a grid of tiny squares, and for each square the computer keeps a number saying how much light hit that spot, from 0 for black up to 255 for as bright as it can record. That is exactly a spreadsheet: rows, columns, and a number in every cell. For colour it keeps three such spreadsheets, one for red, one for green and one for blue, and the screen mixes the three numbers at each position back into a visible colour. So anything you do to a photograph — brightening it, blurring it, finding an edge — is arithmetic you could in principle do by hand on those numbers.',
        explanation:
          'The examinable idea is that no picture exists inside the machine, only an indexed array of measurements, and every vision algorithm is therefore arithmetic on that array.',
      },
    ],

    flashcards: [
      { front: 'What does a pixel value of 0 mean in an 8-bit grayscale image?', back: 'No recorded light at that point — black. 255 is the maximum the format can represent, and there are 256 levels in total.' },
      { front: 'What shape does a colour image have as a numpy array?', back: '(height, width, channels), for example (720, 1280, 3) — three stacked 2-D grids, one per colour channel.' },
      { front: 'Which channel order does cv2.imread return?', back: 'BGR. Convert with cv2.cvtColor(img, cv2.COLOR_BGR2RGB) before handing it to PIL, matplotlib or a torchvision model.' },
      { front: 'Why is grayscale not the mean of R, G and B?', back: 'The eye is most sensitive to green and least to blue, so the standard conversion is Y = 0.299R + 0.587G + 0.114B.' },
      { front: 'When is HSV easier than RGB?', back: 'Colour thresholding under changing light: hue stays roughly constant while brightness varies, so one simple range keeps working.' },
      { front: 'What is the OpenCV hue range?', back: '0–179, not 0–360, because hue is halved to fit into an unsigned byte. Red also wraps, needing two ranges.' },
    ],

    challenge: {
      title: 'Build a colour-picker diagnostic',
      brief:
        'Write a script that loads an image, prints a small table of statistics per channel (min, max, mean) in both BGR and HSV, and then reports the five most common hues among pixels whose saturation exceeds 100. Finish by saving two files: the isolated region for the dominant hue, and a grayscale version computed manually with the luma weights, verified to be within one level of cv2.cvtColor output everywhere.',
      language: 'python',
      acceptanceCriteria: [
        'Reports per-channel statistics for both BGR and HSV',
        'Excludes low-saturation pixels before counting hues, and explains in a comment why',
        'Manual luma grayscale agrees with cv2.cvtColor within one intensity level',
        'Saves the isolated dominant-hue region as a viewable image',
        'Handles a missing file explicitly rather than failing later on a None array',
      ],
      starterCode: 'import cv2\nimport numpy as np\n\npath = "input.jpg"\nbgr = cv2.imread(path)\nif bgr is None:\n    raise FileNotFoundError(path)\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine years old and I have just asked how a computer can see a photograph. Teach me what is actually inside the file, and why a colour picture needs three of something.',
      mustCover: [
        'A pixel is one tiny square stored as a number measuring brightness',
        'The image is a grid indexed by row and column, like a spreadsheet',
        'Colour means three stacked grids — red, green and blue — not one',
        'Everything a vision program does is arithmetic on those numbers',
      ],
      bonusSignals: ['mentions the 0–255 range', 'mentions that HSV separates colour from brightness', 'mentions the BGR channel-order trap'],
      sampleExplanation:
        "If you get very close to a screen you can see a picture is made of tiny squares. The computer does not store those squares as colours — it stores a number for each one, saying how much light was there, from 0 meaning completely dark up to 255 meaning as bright as it can write down. Lay those numbers out in rows and columns and you have the whole picture, exactly like a spreadsheet with a number in every cell. For a colour picture the computer keeps three of those spreadsheets, one for red, one for green and one for blue, stacked like transparent sheets, and the screen mixes the three numbers at each square back into the colour you see. That is why a computer can do things to pictures at all: it is just doing sums on a grid of numbers, so blurring a photo is averaging neighbours, and brightening it is adding to every cell.",
    },
  },

  {
    id: 'CV-002',
    domain: 'CV',
    module: 'Images as Data',
    topic: 'Image tensors and shapes',
    title: 'Images as Tensors',
    slug: 'images-as-tensors',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['CV-001'],
    related: ['CV-001'],
    tags: ['tensor', 'shape', 'nchw', 'nhwc', 'dtype', 'batch', 'memory', 'pytorch'],

    learningObjectives: [
      'State the shape of an image tensor in HWC, CHW and NCHW layouts and convert between them',
      'Explain why PyTorch prefers channels-first and TensorFlow channels-last, and what that means for your code',
      'Choose between uint8 and float32 deliberately, and know the memory cost of each',
      'Compute the memory footprint of a batch of images before a training run runs out of GPU memory',
    ],

    terminology: [
      {
        term: 'Tensor',
        definition:
          'An n-dimensional array of values of a single dtype, with a shape tuple giving the length of each axis. A grayscale image is a rank-2 tensor, a colour image rank-3, a batch of colour images rank-4.',
        simple: 'A grid of numbers that can have more than two directions.',
      },
      {
        term: 'HWC / CHW',
        definition:
          'Two ways to order the axes of one image. HWC is (height, width, channels), the layout numpy, PIL and OpenCV use. CHW is (channels, height, width), the layout PyTorch uses internally.',
        simple: 'Whether the colour layer number comes last or first in the shape.',
      },
      {
        term: 'NCHW batch',
        definition:
          'A rank-4 tensor (batch, channels, height, width) holding several images at once so they can be processed in one GPU call. N is the batch size.',
        simple: 'A stack of images processed together, with the stack size as the first number.',
      },
      {
        term: 'dtype',
        definition:
          'The numeric type of every element. uint8 holds 0–255 in one byte; float32 holds real numbers in four bytes and is what neural networks actually compute in.',
        simple: 'What kind of number each cell holds, and how much space it takes.',
      },
      {
        term: 'Contiguity',
        definition:
          'Whether a tensor elements are laid out in memory in the order its shape implies. permute produces a non-contiguous view; some operations require .contiguous() to reorder the underlying bytes.',
        simple: 'Whether the numbers are physically stored in the order the shape suggests, or just relabelled.',
      },
    ],

    simpleExplanation:
      "In the last unit an image became a grid of numbers. A tensor is just the word for such a grid when it can have any number of directions, and the shape is the list saying how long each direction is. A grayscale photo that is 28 pixels tall and 28 wide has shape (28, 28). Add colour and you get a third direction of length 3, so the shape is (28, 28, 3) — or (3, 28, 28) if you choose to put the colour direction first, which PyTorch does. Then, because training one photo at a time wastes an expensive graphics card, you stack 64 of them into one object of shape (64, 3, 28, 28). Nothing has changed about the pictures; you have only agreed on the order in which the numbers are written down. Almost every frustrating error in a first vision project is a disagreement about that order, so the habit worth building now is simple: after every line that touches an image, know its shape and be able to say what each number means.",

    whyItExists:
      'Graphics hardware is fast only when it multiplies large blocks of numbers with a uniform type and a predictable memory layout. Packing images into a single typed tensor with an agreed axis order is what lets a GPU process sixty-four photographs in roughly the time a loop would take for one, and it gives every library a shared contract for what an image argument looks like.',

    analogy: {
      scenario:
        'Think of a warehouse storing printed photographs. One photo sits in a folder. A folder of three transparencies — cyan, magenta, yellow separations — makes one colour photo. Sixty-four such folders go in a crate, and the crate goes on a lorry. To fetch anything you must agree on an address scheme: crate number, then folder within the crate, then row and column on the sheet. Everyone in the warehouse must use the same order, or the picker brings back the wrong sheet.',
      mapping: [
        { from: 'One printed sheet of brightness values', to: 'A 2-D grid, one channel, shape (H, W)' },
        { from: 'A folder of three colour separations', to: 'One image with a channel axis, shape (3, H, W)' },
        { from: 'A crate of sixty-four folders', to: 'A batch tensor of shape (64, 3, H, W)' },
        { from: 'The agreed address order used by every picker', to: 'The axis convention, NCHW or NHWC' },
        { from: 'Two departments using opposite address orders', to: 'PyTorch and TensorFlow, and the transposes needed between them' },
      ],
      bridge:
        'The address scheme is arbitrary but must be shared, which is exactly the status of NCHW versus NHWC: neither is more correct, and both describe the same pixels, but a function expecting one and given the other either crashes with a shape error or, far worse, silently treats the height axis as the channel axis and produces garbage that still has the right shape. Reading a shape tuple out loud — sixty-four images, three channels, two-twenty-four tall, two-twenty-four wide — is the cheapest debugging technique in the field.',
      limitations:
        'The warehouse suggests moving a folder is free. In memory it is not: permuting axes changes only the stride bookkeeping, and forcing the bytes into the new physical order with .contiguous() genuinely copies the whole tensor, which costs time and doubles peak memory for a moment.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Reading a shape tuple out loud',
        subject: 'torch.Size([64, 3, 224, 224])',
        annotations: [
          { part: '64', note: 'N — the batch: sixty-four separate photographs travelling together.' },
          { part: '3', note: 'C — channels: red, green, blue. Would be 1 for grayscale, 4 with alpha, 64 after the first conv layer.' },
          { part: '224', note: 'H — height in pixels, the number of rows.' },
          { part: '224', note: 'W — width in pixels, the number of columns. Last axis moves fastest in memory.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Channels-first versus channels-last',
        caption: 'Same data, two conventions. Know which one the function in front of you expects.',
        left: {
          heading: 'NCHW — PyTorch default',
          points: [
            'Shape (batch, channels, height, width)',
            'All of one channel is contiguous, which suits cuDNN convolution kernels',
            'torchvision transforms and nn.Conv2d assume it',
            'Display libraries need a permute back to HWC first',
          ],
        },
        right: {
          heading: 'NHWC — TensorFlow default',
          points: [
            'Shape (batch, height, width, channels)',
            'Matches what numpy, PIL and OpenCV hand you, so no transpose on load',
            'Faster on some CPU and mobile paths, and on tensor cores with mixed precision',
            'PyTorch can opt in with memory_format=torch.channels_last',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Shapes you will meet, and what they mean',
        columns: ['Shape', 'What it is', 'Where it comes from'],
        rows: [
          ['(224, 224)', 'One grayscale image', 'cv2.imread(path, cv2.IMREAD_GRAYSCALE)'],
          ['(224, 224, 3)', 'One colour image, channels last', 'np.array(PIL.Image.open(path))'],
          ['(3, 224, 224)', 'One colour image, channels first', 'torchvision.transforms.ToTensor()'],
          ['(64, 3, 224, 224)', 'A training batch', 'Stacking 64 samples in a DataLoader'],
          ['(64, 64, 112, 112)', 'Feature maps after a conv layer', '64 learned channels, spatial size halved by stride 2'],
          ['(64, 1000)', 'Class logits for the batch', 'The classifier head of an ImageNet model'],
        ],
      },
      {
        kind: 'flow',
        title: 'From JPEG file to model input',
        caption: 'Five shape changes, each of which can be printed and checked.',
        steps: [
          { label: 'Bytes on disk', detail: 'A compressed JPEG. No shape yet — just a file.' },
          { label: 'Decode', detail: 'PIL or cv2 produces uint8 HWC, for example (720, 1280, 3), values 0–255.' },
          { label: 'Resize', detail: 'Spatial axes change: (224, 224, 3). Channels untouched.' },
          { label: 'ToTensor', detail: 'Permute to CHW and divide by 255: float32 (3, 224, 224), values 0–1.' },
          { label: 'Normalise', detail: 'Subtract mean, divide by std per channel. Shape unchanged, range now roughly -2 to +2.' },
          { label: 'Collate into a batch', detail: 'DataLoader stacks samples: (64, 3, 224, 224) — the tensor the model sees.' },
        ],
      },
    ],

    formalDefinition:
      'An image tensor is a rank-3 or rank-4 array over a numeric dtype whose axes carry fixed semantics: spatial height and width, a channel axis of feature maps, and for batched data a leading sample axis. The axis permutation is a pure memory-layout convention — NCHW in PyTorch and cuDNN, NHWC in TensorFlow and most CPU decoders — so conversion between layouts is a transpose that changes strides, and optionally a copy that changes the physical byte order, but never the values themselves.',

    math: {
      intuition:
        'Two questions matter constantly: how many numbers am I holding, and how many bytes is that? Both are products of the shape entries, with the second multiplied by the size of one element. Doing this arithmetic before launching a run is how you predict an out-of-memory failure rather than discovering it forty minutes in.',
      formulas: [
        {
          latex: 'M = N \\times C \\times H \\times W \\times b',
          name: 'Memory footprint of a batch',
          meaning:
            'The bytes occupied by one batch tensor. Note that activations inside the network typically cost several times this, because every layer stores its output for the backward pass.',
          variables: [
            { symbol: 'M', meaning: 'Memory in bytes' },
            { symbol: 'N', meaning: 'Batch size (number of images travelling together)' },
            { symbol: 'C', meaning: 'Channels per image (3 for RGB input, more for feature maps)' },
            { symbol: 'H, W', meaning: 'Spatial height and width in pixels' },
            { symbol: 'b', meaning: 'Bytes per element: 1 for uint8, 2 for float16, 4 for float32' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\text{index}(n, c, h, w) = n\\,CHW + c\\,HW + h\\,W + w',
          name: 'Flat offset of an element in a contiguous NCHW tensor',
          meaning:
            'Where a given pixel actually sits in the one-dimensional block of memory. The rightmost axis advances by one, which is why iterating over width is cache-friendly and iterating over the batch axis is not.',
          variables: [
            { symbol: 'n, c, h, w', meaning: 'The four indices identifying one value' },
            { symbol: 'CHW, HW, W', meaning: 'The strides: how far to jump when each index increases by one' },
          ],
        },
        {
          latex: 'x_{\\text{float}} = \\frac{x_{\\text{uint8}}}{255}, \\qquad x \\in [0, 1]',
          name: 'uint8 to float conversion',
          meaning:
            'ToTensor performs exactly this: cast to float32 and divide by 255. The picture is unchanged; the numbers now live on a scale that gradient descent can work with, at four times the memory cost.',
          variables: [
            { symbol: 'x_{uint8}', meaning: 'Stored integer intensity, 0–255' },
            { symbol: 'x_{float}', meaning: 'Normalised float intensity, 0.0–1.0' },
          ],
        },
      ],
      derivation: [
        'Take a standard ImageNet training batch: N = 32, C = 3, H = W = 224, dtype float32 so b = 4.',
        'Count the elements: 224 x 224 = 50,176 pixels per channel; x 3 channels = 150,528 per image; x 32 images = 4,816,896 values.',
        'Multiply by 4 bytes: 19,267,584 bytes.',
        'Divide by 1,048,576 to read it in mebibytes: 18.375 MiB for the input tensor alone.',
        'The same batch as uint8 would be 4.59 MiB, which is why DataLoaders keep images as uint8 for as long as possible and convert to float on the fly.',
      ],
    },

    workedExample: {
      title: 'Will this batch fit, and where did the memory go?',
      setup:
        'A learner has a graphics card with 8 GiB of memory and wants to fine-tune a ResNet-50 at 224x224 with batch size 128. They reason that the input batch is small, so it should be fine. We will do the arithmetic properly.',
      steps: [
        {
          label: 'Size the input tensor',
          detail: '128 x 3 x 224 x 224 x 4 bytes = 77,070,336 bytes, which is 73.5 MiB. Genuinely small, as they guessed.',
          latex: 'M_{\\text{input}} = 128 \\times 3 \\times 224 \\times 224 \\times 4 = 77{,}070{,}336 \\text{ bytes}',
        },
        {
          label: 'Size one early activation',
          detail:
            'The first ResNet block outputs 64 channels at 112x112. That is 128 x 64 x 112 x 112 x 4 = 411,041,792 bytes, about 392 MiB — more than five times the input, from a single layer.',
          latex: 'M_{\\text{act}} = 128 \\times 64 \\times 112 \\times 112 \\times 4 \\approx 392 \\text{ MiB}',
        },
        {
          label: 'Remember that activations are kept',
          detail:
            'Backpropagation needs the output of every layer to compute gradients, so activations accumulate across roughly fifty layers rather than being freed. This is where the memory actually goes.',
        },
        {
          label: 'Add parameters and optimiser state',
          detail:
            'ResNet-50 has about 25.6 million parameters: 102 MiB as float32, plus the same again for gradients, plus two more copies for Adam moments — roughly 410 MiB before a single image is loaded.',
          latex: '4 \\times 25.6\\times 10^{6} \\times 4 \\text{ bytes} \\approx 410 \\text{ MiB}',
        },
        {
          label: 'Reduce the batch, not the model',
          detail:
            'Halving the batch to 64 halves every activation term exactly, because N multiplies all of them. Mixed precision (b = 2 for activations) roughly halves them again.',
        },
      ],
      conclusion:
        'The input tensor was never the problem — activations scale with N x C x H x W at every layer, so batch size is the lever that moves total memory most directly. Whenever CUDA reports out of memory, the first two experiments are batch size and mixed precision, and the arithmetic above tells you in advance roughly what each will buy.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Following the shape from file to batch',
        runnable: true,
        code: `import numpy as np
import torch
from PIL import Image
from torchvision import transforms

pil = Image.open("cone.jpg").convert("RGB")
arr = np.array(pil)
print("numpy HWC:", arr.shape, arr.dtype, arr.max())

to_tensor = transforms.ToTensor()          # permutes to CHW and divides by 255
t = to_tensor(pil)
print("torch CHW:", tuple(t.shape), t.dtype, round(float(t.max()), 3))

batch = torch.stack([t, t, t, t])          # four copies, as a DataLoader would
print("batch NCHW:", tuple(batch.shape))
print("bytes:", batch.numel() * batch.element_size())

# Back to something matplotlib can display
display = batch[0].permute(1, 2, 0).numpy()
print("back to HWC:", display.shape)`,
        output: `numpy HWC: (720, 1280, 3) uint8 255
torch CHW: (3, 720, 1280) torch.float32 1.0
batch NCHW: (4, 3, 720, 1280)
bytes: 44236800
back to HWC: (720, 1280, 3)`,
        explanation:
          'ToTensor does two things people often assume are separate steps: it permutes HWC to CHW and it scales uint8 0–255 to float32 0–1. The batch is built by stacking along a new leading axis, and numel() x element_size() gives the exact byte count — 44.2 MB for four uncropped photographs, which is why resizing happens before batching, not after.',
      },
      {
        language: 'python',
        title: 'permute, reshape and the contiguity trap',
        runnable: true,
        code: `import torch

x = torch.randn(2, 3, 4, 5)            # N, C, H, W
print("original:", tuple(x.shape), "contiguous:", x.is_contiguous())

y = x.permute(0, 2, 3, 1)              # to NHWC — a view, no data moved
print("permuted:", tuple(y.shape), "contiguous:", y.is_contiguous())

try:
    y.view(2, -1)                      # view needs contiguous memory
except RuntimeError as e:
    print("view failed:", str(e)[:48])

z = y.contiguous().view(2, -1)         # copy, then reshape
print("after contiguous:", tuple(z.shape))

# reshape does the copy for you when it must
print("reshape works directly:", tuple(y.reshape(2, -1).shape))`,
        output: `original: (2, 3, 4, 5) contiguous: True
permuted: (2, 4, 5, 3) contiguous: False
view failed: view size is not compatible with input tensor
after contiguous: (2, 60)
reshape works directly: (2, 60)`,
        explanation:
          'permute relabels the axes without touching a single byte, which is why it is nearly free and why the result is not contiguous. view refuses to work on such a tensor because it assumes the physical order matches the shape; reshape silently copies when needed. Knowing the difference matters when a permute inside a training loop quietly doubles your peak memory.',
      },
      {
        language: 'python',
        title: 'Two shape bugs that do not raise an error',
        runnable: true,
        code: `import torch
import torch.nn as nn

conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)

good = torch.randn(8, 3, 32, 32)               # NCHW, as Conv2d expects
print("good ->", tuple(conv(good).shape))

# Bug 1: a single image without a batch axis
single = torch.randn(3, 32, 32)
try:
    conv(single)
except RuntimeError as e:
    print("missing batch axis:", str(e)[:60])
print("fix ->", tuple(conv(single.unsqueeze(0)).shape))

# Bug 2: an axis of length 3 that is not the colour axis.
# Here axis 1 holds three grayscale video frames, not R, G and B.
frames = torch.randn(8, 3, 32, 32)
print("wrong meaning, no error ->", tuple(conv(frames).shape))

# And NHWC data fails only because 32 != 3 -- a coincidence, not a guarantee
nhwc = torch.randn(8, 32, 32, 3)
try:
    conv(nhwc)
except RuntimeError as e:
    print("NHWC:", str(e)[:52])`,
        output: `good -> (8, 16, 32, 32)
missing batch axis: Expected 4-dimensional input for 4-dimensional weight
fix -> (1, 16, 32, 32)
wrong meaning, no error -> (8, 16, 32, 32)
NHWC: Given groups=1, weight of size [16, 3, 3, 3], expect`,
        explanation:
          'The first bug fails loudly and is therefore harmless: unsqueeze(0) adds the batch axis. The second is the dangerous one — when an axis of length 3 sits in the channel position but means something else, the convolution runs happily and produces a correctly shaped tensor of meaningless numbers. Note that the NHWC case is caught only because 32 does not equal 3; had the images been 3 pixels wide, or had in_channels been set to match, nothing would have complained. Asserting both the rank and the meaning of axis 1 after every transform is the only reliable defence.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Porting a model between frameworks',
        usage:
          'Converting a TensorFlow checkpoint to PyTorch means transposing every convolution weight from HWIO to OIHW as well as transposing the data layout. Skip it and the model loads without complaint and predicts nonsense.',
      },
      {
        context: 'Exporting to ONNX for a production runtime',
        usage:
          'Mobile and edge runtimes usually prefer NHWC, so an export from PyTorch inserts transpose nodes at every layer boundary unless the model is converted to channels_last memory format first. Those transposes can cost a third of the inference time.',
      },
      {
        context: 'Diagnosing a CUDA out-of-memory error',
        usage:
          'The message names a request in bytes. Dividing by N x C x H x W x 4 tells you which layer asked for it, and whether halving the batch or switching to mixed precision is the cheaper fix.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: 'nn.Conv2d, BatchNorm2d and every vision layer assume NCHW float32 input; torch.channels_last opts into NHWC for speed.' },
      { tool: 'torchvision', role: 'ToTensor performs the HWC to CHW permutation and the 0–255 to 0–1 scaling in one step.' },
      { tool: 'NumPy', role: 'The interchange format between decoders and frameworks; np.transpose is the layout conversion outside torch.' },
      { tool: 'ONNX Runtime', role: 'Consumes exported graphs whose input shape and layout must be declared exactly, including whether the batch axis is dynamic.' },
    ],

    commonMistakes: [
      {
        mistake: 'Passing a single image to a model without a batch axis',
        why: 'Every vision layer is written for rank-4 input, so a rank-3 tensor raises a dimension error that reads confusingly because it mentions the weight rather than your data.',
        fix: 'Add the axis explicitly with x.unsqueeze(0) or x[None], and remember to remove it from the output with .squeeze(0) when reading a single prediction.',
      },
      {
        mistake: 'Feeding HWC data into a channels-first layer',
        why: 'Nothing checks the meaning of an axis, only its length. If the width happens to be 3, or if the code transposes by accident, the layer runs and outputs the right shape filled with meaningless values.',
        fix: 'Assert the contract at the boundary: assert x.shape[1] == 3, f"expected NCHW, got {tuple(x.shape)}". Two lines of assertion save a day of debugging.',
      },
      {
        mistake: 'Keeping an entire dataset in float32 in memory',
        why: 'float32 is four times the size of uint8, so a dataset that fits comfortably as bytes will not fit as floats. Fifty thousand 224x224 RGB images are 7.2 GiB as uint8 and 28.8 GiB as float32.',
        fix: 'Store uint8 and convert inside the Dataset __getitem__ or on the GPU, so only the current batch is ever in float.',
      },
      {
        mistake: 'Using view after permute and being surprised by the error',
        why: 'permute changes strides, not the physical layout, so the tensor is no longer contiguous and view refuses to reinterpret it.',
        fix: 'Use reshape, which copies when it must, or call .contiguous() first and accept the copy deliberately.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What does the shape (32, 3, 224, 224) tell you, and what would it be in TensorFlow?',
        answer:
          'It is a batch of 32 RGB images, each 224 pixels tall and 224 wide, in channels-first NCHW order, which is the PyTorch convention. The same data in TensorFlow would be (32, 224, 224, 3), channels-last NHWC. Neither is more correct — NCHW suits cuDNN convolution kernels because a whole channel is contiguous, while NHWC suits CPU and mobile paths and tensor-core matrix multiplications. Converting is a transpose, which in PyTorch is x.permute(0, 2, 3, 1) and changes strides rather than moving data until something forces contiguity. If the tensor is float32 it occupies 32 x 3 x 224 x 224 x 4 bytes, about 18.4 MiB.',
        followUp:
          'A strong candidate adds that PyTorch supports NHWC through memory_format=torch.channels_last, which can be significantly faster with automatic mixed precision on modern GPUs.',
      },
      {
        level: 'ml-engineer',
        question: 'Your training crashes with CUDA out of memory at batch size 64 but works at 32. Explain where the memory goes and list your options in order.',
        answer:
          'Activations dominate, not weights or the input batch. Every layer stores its output for the backward pass, and each such tensor is N x C x H x W x 4 bytes, so total activation memory is roughly linear in batch size — which is exactly why halving the batch fixed it. The input batch itself is usually trivial: 64 x 3 x 224 x 224 float32 is only 37 MiB, whereas one early feature map at 64 channels and 112x112 resolution is 196 MiB. Options in order of cheapness: enable automatic mixed precision so activations are float16, which roughly halves that term; use gradient accumulation to keep the effective batch size while halving the real one; switch the optimiser from Adam to SGD to free two parameter-sized buffers; enable gradient checkpointing to trade compute for memory; and only then reduce resolution or model size, since both change the accuracy you can reach.',
        followUp:
          'The best answers mention torch.cuda.max_memory_allocated() and the fact that fragmentation can cause an out-of-memory error even when the free total looks sufficient.',
      },
      {
        level: 'intermediate',
        question: 'Why is uint8 the right dtype on disk and in the DataLoader, but the wrong one for the model?',
        answer:
          'uint8 is four times more compact and exactly matches what a camera sensor and an image codec produce, so keeping data as bytes through decoding, storage and transfer cuts memory and bandwidth by 75 per cent. But gradient descent needs values it can take small steps in: integers cannot represent a 0.003 update, and integer arithmetic saturates or wraps rather than accumulating smoothly. Networks therefore compute in float32, or float16 with a float32 master copy under mixed precision. The practical rule is to convert as late as possible, ideally inside the training loop or on the GPU, so only the current batch is ever float. Quantised inference is the deliberate exception: an int8 model computes in integers with learned scale factors, trading a little accuracy for large speed and memory gains at deployment.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A batch has shape (16, 3, 384, 384) in float32. How many bytes is it, and what would it be in float16?',
        hint: 'Multiply the shape entries to count elements, then multiply by bytes per element.',
        solution:
          'Elements: 16 x 3 x 384 x 384 = 7,077,888. In float32 that is 7,077,888 x 4 = 28,311,552 bytes, or 27.0 MiB. In float16 it halves to 14,155,776 bytes, 13.5 MiB. The same arithmetic applied to intermediate feature maps, not the input, is what actually determines whether a training run fits on the card.',
      },
      {
        prompt:
          'You have a numpy array of shape (480, 640, 3), dtype uint8. Write the PyTorch code to turn it into a model-ready batch of shape (1, 3, 480, 640) in float32 scaled to [0, 1], without using torchvision.',
        hint: 'Three operations: change the axis order, change the dtype and scale, add a leading axis.',
        language: 'python',
        starterCode: 'import numpy as np\nimport torch\n\narr = np.zeros((480, 640, 3), dtype=np.uint8)\n',
        solution:
          't = torch.from_numpy(arr).permute(2, 0, 1).float().div(255).unsqueeze(0)\nassert t.shape == (1, 3, 480, 640) and t.dtype == torch.float32\n\nfrom_numpy shares memory with the array rather than copying, permute reorders HWC to CHW as a view, float() and div(255) produce the scaled copy, and unsqueeze(0) adds the batch axis. This is precisely what ToTensor does internally, and writing it once removes any mystery about the transform.',
      },
      {
        prompt:
          'A colleague reports that their model trains but accuracy never rises above chance, and prints input shapes of (64, 224, 224, 3). Diagnose it.',
        hint: 'What does nn.Conv2d believe axis 1 contains?',
        solution:
          'The data is NHWC but PyTorch layers expect NCHW, so Conv2d is reading 224 channels where there should be 3, and treating the true channel axis as the width. With in_channels set to 224 the layer even builds successfully, so nothing raises. The fix is x = x.permute(0, 3, 1, 2) at the point of entry, plus an assertion that x.shape[1] == 3. Chance-level accuracy with no error is the signature of a semantically wrong but dimensionally valid tensor.',
      },
    ],

    quiz: [
      {
        id: 'CV-002-q1',
        type: 'mcq',
        concept: 'shape semantics',
        prompt: 'A tensor has shape (8, 3, 64, 64). In PyTorch convention, what is it?',
        options: [
          'Eight RGB images of 64x64 pixels',
          'Three batches of eight 64x64 images',
          'One image with 8 channels at 3x64 resolution',
          'Sixty-four images with 8 colour channels',
        ],
        answerIndex: 0,
        explanation:
          'PyTorch uses NCHW: batch 8, channels 3, height 64, width 64. Reading the tuple out loud in that order is the fastest way to catch a layout mistake before it reaches a layer.',
      },
      {
        id: 'CV-002-q2',
        type: 'numeric',
        concept: 'memory arithmetic',
        prompt:
          'How many mebibytes does a float32 tensor of shape (32, 3, 224, 224) occupy? Answer to two decimal places.',
        answer: 18.375,
        tolerance: 0.05,
        unit: 'MiB',
        explanation:
          '32 x 3 x 224 x 224 = 4,816,896 elements, times 4 bytes = 19,267,584 bytes. Dividing by 1,048,576 gives 18.375 MiB. The same batch as uint8 would be a quarter of that, which is why conversion to float is delayed as long as possible.',
      },
      {
        id: 'CV-002-q3',
        type: 'truefalse',
        concept: 'permute and memory',
        prompt: 'x.permute(0, 2, 3, 1) physically rearranges the bytes of the tensor in memory.',
        answer: false,
        explanation:
          'permute returns a view with new strides and moves no data, which is why the result is non-contiguous. Only .contiguous() or a reshape that cannot be expressed as a view performs the actual copy.',
      },
      {
        id: 'CV-002-q4',
        type: 'order',
        concept: 'preprocessing pipeline',
        prompt: 'Put the steps of turning a JPEG into a model input in the order they happen.',
        items: [
          'Decode the file to a uint8 HWC array',
          'Resize the spatial axes to the model input size',
          'Permute to CHW and scale to [0, 1]',
          'Normalise per channel with mean and standard deviation',
          'Stack samples into a leading batch axis',
        ],
        explanation:
          'Decoding gives HWC bytes, resizing is cheapest while still uint8, ToTensor performs the permutation and scaling, normalisation assumes the [0,1] range, and the DataLoader collates the finished samples into a batch.',
      },
      {
        id: 'CV-002-q5',
        type: 'debug',
        language: 'python',
        concept: 'batch axis',
        prompt: 'This raises a RuntimeError about a 4-dimensional weight. What is the minimal fix?',
        code: 'img = torch.randn(3, 224, 224)\nlogits = model(img)',
        options: [
          'model(img.unsqueeze(0)) — add the missing batch axis',
          'model(img.permute(1, 2, 0)) — move channels last',
          'model(img.float()) — the dtype is wrong',
          'model(img.contiguous()) — the tensor is non-contiguous',
        ],
        answerIndex: 0,
        explanation:
          'The image is already channels-first and float; it simply lacks the leading batch dimension every vision layer expects. unsqueeze(0) makes it (1, 3, 224, 224), and .squeeze(0) undoes it on the output.',
      },
      {
        id: 'CV-002-q6',
        type: 'explain',
        concept: 'layout conventions',
        prompt:
          'Explain why feeding NHWC data to a PyTorch convolution is more dangerous than feeding it a tensor with no batch axis.',
        rubric: [
          'Notes that the missing batch axis raises an error immediately',
          'Notes that NHWC data can have a valid rank and therefore run',
          'Explains that the layer interprets the wrong axis as channels, producing meaningless output',
        ],
        sampleAnswer:
          'A missing batch axis makes the tensor rank 3, and every vision layer demands rank 4, so it fails at once with a clear message and costs you a minute. NHWC data is still rank 4, so nothing structurally invalid has happened: the convolution simply treats axis 1, the height, as though it were the channel axis. If the in_channels setting happens to match, the layer runs, returns a correctly shaped tensor and trains to chance-level accuracy while reporting no error at all. Silent semantic errors are far more expensive than loud structural ones, which is why asserting the expected shape at every boundary is worth the two lines.',
        explanation:
          'The core idea is that shape validity and shape meaning are different things, and only the first is checked by the framework.',
      },
    ],

    flashcards: [
      { front: 'What does NCHW stand for?', back: 'Batch, channels, height, width — the PyTorch layout. TensorFlow defaults to NHWC, channels last.' },
      { front: 'What two things does transforms.ToTensor do?', back: 'Permutes HWC to CHW and converts uint8 0–255 to float32 0–1. It does not normalise with mean and std.' },
      { front: 'How many bytes is a float32 tensor of shape (N, C, H, W)?', back: 'N x C x H x W x 4. For (32, 3, 224, 224) that is 19,267,584 bytes, about 18.4 MiB.' },
      { front: 'Why does view fail after permute?', back: 'permute produces a non-contiguous view; view needs the physical order to match the shape. Use reshape or .contiguous().' },
      { front: 'Why store a dataset as uint8 rather than float32?', back: 'One byte per value instead of four — a quarter of the memory — and conversion to float is cheap to do per batch.' },
      { front: 'Where does training memory mostly go?', back: 'Activations kept for the backward pass, which scale with batch size times channels times spatial area at every layer.' },
    ],

    challenge: {
      title: 'A shape-tracing preprocessing pipeline',
      brief:
        'Write a function preprocess(path, size) that loads an image with PIL, resizes it, converts it to a normalised NCHW float32 batch of one, and returns both the tensor and a list of (step_name, shape, dtype) records describing every intermediate state. Add a second function that takes the model-ready tensor back to a displayable uint8 HWC numpy array, and assert that a round trip through both recovers the resized image within one intensity level.',
      language: 'python',
      acceptanceCriteria: [
        'Records the shape and dtype after every step, including the initial decode',
        'Returns a tensor of shape (1, 3, size, size) with dtype float32',
        'The inverse function returns a uint8 HWC array suitable for imshow',
        'A round-trip assertion passes with a stated tolerance',
        'Includes an assertion that the channel axis really has length 3',
      ],
      starterCode: 'import numpy as np\nimport torch\nfrom PIL import Image\n\n\ndef preprocess(path: str, size: int = 224):\n    steps = []\n',
    },

    teachingPrompt: {
      prompt:
        'A classmate can load an image but is completely lost about shapes, and keeps getting errors about dimensions. Teach them how to read a shape tuple and why the order of the axes is a convention rather than a fact.',
      mustCover: [
        'A shape is a list of axis lengths, and each axis carries a fixed meaning',
        'HWC and CHW hold the same pixels in a different order',
        'The batch axis exists so a GPU can process many images in one call',
        'Reading the shape after every step is how you catch layout bugs early',
      ],
      bonusSignals: ['computes a memory footprint', 'mentions that a wrong layout can run without erroring', 'mentions permute versus reshape'],
      sampleExplanation:
        'A shape is just the sizes of each direction of the grid, read in a fixed order, and the whole skill is knowing what each position means. In PyTorch the order is batch, channels, height, width, so (64, 3, 224, 224) means sixty-four photographs, three colour layers each, two hundred and twenty-four rows and the same number of columns. Numpy and OpenCV write the channel size last instead, so the identical picture is (224, 224, 3) there. Neither order is more correct; they are conventions, like driving on the left or the right, and the accidents happen at the border between them. The batch axis exists because a graphics card is only fast when it works on many images at once, so we stack them into one object. Get into the habit of printing the shape after every line that touches an image, and say it out loud — sixty-four images, three channels, two-twenty-four by two-twenty-four — because a shape that sounds wrong when spoken is usually the bug.',
    },
  },

  {
    id: 'CV-003',
    domain: 'CV',
    module: 'Preprocessing & Augmentation',
    topic: 'Resizing and normalisation',
    title: 'Resizing and Normalisation',
    slug: 'image-resizing-and-normalisation',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['CV-001', 'CV-002'],
    related: ['CV-001', 'CV-002'],
    tags: ['resize', 'interpolation', 'letterbox', 'normalisation', 'imagenet-statistics', 'preprocessing'],

    learningObjectives: [
      'Choose an interpolation method for resizing and justify the choice for upsampling, downsampling and masks',
      'Explain the difference between a plain resize, a centre crop and letterboxing, and what each does to aspect ratio',
      'Apply scaling to [0,1] followed by per-channel mean and standard deviation normalisation',
      'Explain why a pretrained model demands byte-identical preprocessing and what goes wrong when it does not get it',
    ],

    terminology: [
      {
        term: 'Interpolation',
        definition:
          'The rule for inventing pixel values at coordinates that do not exist in the source grid. Nearest takes the closest pixel, bilinear blends the four neighbours, bicubic uses sixteen, Lanczos uses a windowed sinc.',
        simple: 'How the computer guesses the colour of a pixel that sits between the original ones.',
      },
      {
        term: 'Aspect ratio',
        definition:
          'Width divided by height. A resize that ignores it stretches the content; a crop or a letterbox preserves it at the cost of discarding or padding.',
        simple: 'The shape of the rectangle — whether it is squashed or kept as it was.',
      },
      {
        term: 'Letterboxing',
        definition:
          'Scaling by the single factor min(target_w / w, target_h / h) so the whole image fits, then padding the remaining strips with a constant colour. Standard in detection, where distorted boxes hurt.',
        simple: 'Shrink until it fits, then fill the leftover strips with grey bars.',
      },
      {
        term: 'Normalisation',
        definition:
          'Shifting and scaling each channel so the input distribution has roughly zero mean and unit variance: x = (x/255 - mean) / std, with mean and std fixed per channel by the training dataset.',
        simple: 'Re-centring the numbers so they are small and balanced around zero.',
      },
      {
        term: 'ImageNet statistics',
        definition:
          'mean = [0.485, 0.456, 0.406] and std = [0.229, 0.224, 0.225], computed across the ImageNet training set in RGB order on the [0,1] scale. Every torchvision pretrained classifier was trained with them.',
        simple: 'The specific six numbers that pretrained models expect you to subtract and divide by.',
      },
    ],

    simpleExplanation:
      "A neural network is built with a fixed number of input slots, so every picture you show it has to be the same size. Resizing is how you get there, and the interesting question is what to do about the pixels that do not line up: a 1000-pixel-wide photo squeezed to 224 means each new pixel has to be invented from about four and a half old ones. Different rules for that invention give sharper or smoother results. There is a second problem too. Raw pixel values run from 0 to 255, which is a big, lopsided range for the delicate arithmetic of learning, so we squash them to 0-to-1 and then shift them so the average pixel sits near zero. The shifting numbers are not arbitrary: they are the average brightness of each colour channel across a million photographs. If you borrow a model that somebody trained with those numbers, you must use exactly the same ones, because the model learned what the world looks like on that scale and nothing warns you when you feed it a different one.",

    whyItExists:
      'Fully connected classifier heads and batch-shaped GPU kernels both require a fixed input size, so arbitrary camera resolutions must be mapped onto one grid. Normalisation exists because optimisation is badly conditioned when inputs are large and asymmetric: centred, unit-scaled features give gradients of comparable magnitude across channels, which makes training faster and far more stable.',

    analogy: {
      scenario:
        'Think of framing photographs for an exhibition where every frame is exactly 30 centimetres square. A wide landscape can be squashed to fit, which makes the people in it look short and fat; it can be cropped, which keeps proportions but loses the edges of the scene; or it can be shrunk until it fits and mounted on a grey card, which keeps everything but wastes some frame. Separately, the gallery lights are calibrated to a particular average brightness, and a print prepared for different lighting looks subtly wrong on the wall.',
      mapping: [
        { from: 'The fixed 30 cm frame', to: 'The fixed model input size, such as 224x224' },
        { from: 'Squashing a landscape to fit', to: 'A plain resize that distorts the aspect ratio' },
        { from: 'Cropping to the centre of the frame', to: 'Resize-shorter-side then centre crop, the torchvision evaluation recipe' },
        { from: 'Mounting on a grey card', to: 'Letterboxing with constant padding, as YOLO detectors do' },
        { from: 'The gallery lighting calibration', to: 'The mean and standard deviation the model was trained with' },
      ],
      bridge:
        'The framing choice is a genuine trade-off rather than a detail: distortion teaches the model that objects can be the wrong shape, cropping can remove the very object you are trying to classify, and padding wastes resolution and introduces artificial edges. The lighting calibration maps onto normalisation exactly — a print is not damaged by the wrong lighting, it simply looks wrong, which is precisely what happens to a pretrained network fed inputs on the wrong scale. It still produces confident answers; they are just worse.',
      limitations:
        'The analogy implies the frame size is arbitrary. It is not entirely: convolutional backbones accept many sizes thanks to adaptive pooling, and larger inputs genuinely improve accuracy on small objects while costing compute that grows with the square of the side length.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The standard evaluation preprocessing pipeline',
        caption: 'The exact sequence torchvision uses for every ImageNet pretrained classifier.',
        steps: [
          { label: 'Resize(256)', detail: 'Scale so the shorter side is 256, preserving aspect ratio. Bilinear by default.' },
          { label: 'CenterCrop(224)', detail: 'Take the middle 224x224 square. Discards the edges of the longer dimension.' },
          { label: 'ToTensor()', detail: 'Permute HWC to CHW and divide by 255, giving float32 in [0, 1].' },
          { label: 'Normalize(mean, std)', detail: 'Subtract the per-channel mean and divide by the per-channel std, giving roughly [-2.1, +2.6].' },
          { label: 'Feed the model', detail: 'Shape (N, 3, 224, 224), the exact distribution the weights were trained on.' },
        ],
      },
      {
        kind: 'table',
        title: 'Choosing an interpolation method',
        columns: ['Method', 'How it works', 'Use it for', 'Avoid it for'],
        rows: [
          ['Nearest', 'Copies the closest source pixel', 'Segmentation masks and label maps, where invented values are illegal', 'Photographs — it produces blocky staircase edges'],
          ['Bilinear', 'Weighted average of the 4 surrounding pixels', 'The sane default for photographs, and what most training recipes used', 'Heavy downsampling without antialiasing, which causes aliasing'],
          ['Bicubic', 'Cubic fit over 16 neighbours', 'Upsampling where a little extra sharpness is wanted', 'Cases where slight overshoot ringing near edges matters'],
          ['Lanczos / area', 'Windowed sinc, or averaging over the source footprint', 'Large downscales; area is what cv2.INTER_AREA does', 'Small upscales, where area degenerates to nearest'],
        ],
      },
      {
        kind: 'compare',
        title: 'Squash versus letterbox',
        caption: 'Both reach 640x640. They teach the model different things.',
        left: {
          heading: 'Plain resize to a square',
          points: [
            'Uses every pixel of the frame — no wasted area',
            'Distorts aspect ratio: a person becomes short and wide',
            'Bounding boxes distort with the image, so they stay valid',
            'Fine for classification, risky for geometry-sensitive tasks',
          ],
        },
        right: {
          heading: 'Letterbox (scale and pad)',
          points: [
            'Preserves aspect ratio exactly, so shapes stay true',
            'Wastes frame area on padding bars, losing effective resolution',
            'Requires undoing the scale and offset to map boxes back to the original',
            'The standard choice for detection, used by every YOLO release',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Watch the numbers change as you resize and normalise',
        caption: 'Inspect the same pixel before and after each preprocessing step.',
        widget: 'image-pixels-lab',
      },
    ],

    formalDefinition:
      'Resizing is resampling a discrete image onto a new sampling grid: each output coordinate is mapped back to a continuous source coordinate and assigned a value by an interpolation kernel over nearby source pixels. Normalisation is an affine, per-channel transform x_c -> (x_c / 255 - mu_c) / sigma_c, where mu_c and sigma_c are constants estimated from the training distribution, chosen so that the input to the first layer is approximately zero-mean and unit-variance in every channel.',

    math: {
      intuition:
        'Normalisation is two operations that people often run together without separating them: divide by 255 to move from bytes to a unit interval, then subtract a mean and divide by a standard deviation per channel so the values straddle zero. The second step matters for optimisation because a layer weight sees gradients proportional to its input, so inputs that are all positive and all large push every weight in the same direction at once and make the loss surface a long narrow valley.',
      formulas: [
        {
          latex: 'x_{\\text{norm}, c} = \\frac{\\dfrac{x_{\\text{uint8}, c}}{255} - \\mu_c}{\\sigma_c}',
          name: 'Per-channel standardisation',
          meaning:
            'The complete preprocessing arithmetic. Applied independently to each of the three channels, with its own constant pair. This is exactly what ToTensor followed by Normalize computes.',
          variables: [
            { symbol: 'x_{uint8,c}', meaning: 'Raw stored intensity in channel c, an integer 0–255' },
            { symbol: '\\mu_c', meaning: 'Mean of channel c over the training set, on the [0,1] scale — 0.485, 0.456, 0.406 for ImageNet RGB' },
            { symbol: '\\sigma_c', meaning: 'Standard deviation of channel c — 0.229, 0.224, 0.225 for ImageNet' },
            { symbol: 'x_{norm,c}', meaning: 'The normalised value the network actually consumes, typically in about [-2.1, 2.6]' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 's = \\min\\!\\left(\\frac{W_t}{W}, \\frac{H_t}{H}\\right), \\quad p_x = \\frac{W_t - sW}{2}, \\quad p_y = \\frac{H_t - sH}{2}',
          name: 'Letterbox scale and padding',
          meaning:
            'The single scale factor that makes the image fit inside the target without distortion, and the symmetric padding that fills the leftover strips. Keeping s, p_x and p_y is what lets you map predicted boxes back to original pixel coordinates.',
          variables: [
            { symbol: 'W, H', meaning: 'Original width and height in pixels' },
            { symbol: 'W_t, H_t', meaning: 'Target width and height' },
            { symbol: 's', meaning: 'Uniform scale factor applied to both axes' },
            { symbol: 'p_x, p_y', meaning: 'Padding added on each side, in target pixels' },
          ],
        },
        {
          latex: 'I_{\\text{bilinear}} = (1-a)(1-b)\\,I_{00} + a(1-b)\\,I_{10} + (1-a)b\\,I_{01} + ab\\,I_{11}',
          name: 'Bilinear interpolation',
          meaning:
            'The value at a point between four known pixels is their weighted average, with weights given by how close the point is to each corner. The four weights always sum to one, so brightness is preserved.',
          variables: [
            { symbol: 'I_{00}, I_{10}, I_{01}, I_{11}', meaning: 'The four surrounding source pixel values' },
            { symbol: 'a', meaning: 'Fractional horizontal distance from the left pair, in [0,1]' },
            { symbol: 'b', meaning: 'Fractional vertical distance from the top pair, in [0,1]' },
          ],
        },
      ],
      derivation: [
        'Take a mid-grey pixel whose red channel is 128 and push it through the ImageNet recipe.',
        'Scale to the unit interval: 128 / 255 = 0.50196.',
        'Subtract the red mean: 0.50196 - 0.485 = 0.01696.',
        'Divide by the red standard deviation: 0.01696 / 0.229 = 0.0741.',
        'So a mid-grey pixel arrives at the network as roughly 0.07, just above zero — which is the point, since the average training pixel should map to about zero.',
        'Check the extremes: 0 maps to (0 - 0.485)/0.229 = -2.118 and 255 maps to (1 - 0.485)/0.229 = +2.249, so the whole input range lands inside roughly [-2.2, +2.6].',
      ],
    },

    workedExample: {
      title: 'Letterboxing a 1280x720 frame into 640x640',
      setup:
        'A detector expects a 640x640 input. The camera produces 1280x720 video. Squashing it to a square would make every person 1.8 times too wide, so we letterbox instead, and we keep the numbers needed to undo the transform later.',
      steps: [
        {
          label: 'Compute the single scale factor',
          detail: 'min(640/1280, 640/720) = min(0.5, 0.8889) = 0.5. The width is the binding constraint.',
          latex: 's = \\min(0.5, 0.8889) = 0.5',
        },
        {
          label: 'Scale both axes by it',
          detail: '1280 x 0.5 = 640 and 720 x 0.5 = 360. The content now occupies 640x360 inside a 640x640 canvas.',
        },
        {
          label: 'Split the leftover height',
          detail: '640 - 360 = 280 pixels of unused height, so 140 rows of padding above and 140 below. Horizontal padding is zero.',
          latex: 'p_y = \\frac{640 - 360}{2} = 140',
        },
        {
          label: 'Note the resolution cost',
          detail:
            'Only 360 of 640 rows carry content, so 43.75 per cent of the input tensor is constant grey. This is the price of preserving shape, and it is why some pipelines pad to a rectangular 640x384 instead.',
        },
        {
          label: 'Map a prediction back to the original frame',
          detail:
            'A predicted box (x1, y1, x2, y2) = (100, 200, 300, 400) in letterbox coordinates becomes ((100 - 0)/0.5, (200 - 140)/0.5, (300 - 0)/0.5, (400 - 140)/0.5) = (200, 120, 600, 520) in the 1280x720 frame.',
          latex: 'x_{\\text{orig}} = \\frac{x_{\\text{letterbox}} - p_x}{s}, \\quad y_{\\text{orig}} = \\frac{y_{\\text{letterbox}} - p_y}{s}',
        },
      ],
      conclusion:
        'Letterboxing is three numbers — s, p_x and p_y — and every one of them is needed twice: once going in and once coming back out. Forgetting to subtract the padding before dividing by the scale is the single most common cause of detection boxes that are consistently offset downwards, and because the offset is small the output still looks almost right.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The canonical torchvision preprocessing, unpacked',
        runnable: true,
        code: `import torch
from PIL import Image
from torchvision import transforms

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]

eval_tf = transforms.Compose([
    transforms.Resize(256),                 # shorter side to 256, ratio preserved
    transforms.CenterCrop(224),             # middle square
    transforms.ToTensor(),                  # HWC uint8 -> CHW float32 in [0, 1]
    transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
])

img = Image.open("cone.jpg").convert("RGB")
x = eval_tf(img).unsqueeze(0)

print("shape:", tuple(x.shape), "dtype:", x.dtype)
print("range:", round(float(x.min()), 3), "to", round(float(x.max()), 3))
print("per-channel mean:", [round(float(m), 3) for m in x.mean(dim=(0, 2, 3))])`,
        output: `shape: (1, 3, 224, 224) dtype: torch.float32
range: -2.118 to 2.64
per-channel mean: [0.219, 0.092, -0.104]`,
        explanation:
          'Read the range: -2.118 is exactly (0 - 0.485)/0.229, the darkest possible red pixel, and 2.64 is (1 - 0.406)/0.225, the brightest possible blue. The per-channel means are near zero but not at zero, because this one photograph is not the average of ImageNet. Applying Normalize before ToTensor raises an error, since Normalize operates on tensors, not on PIL images — the order in Compose is not decorative.',
      },
      {
        language: 'python',
        title: 'Letterbox, and undo it',
        runnable: true,
        code: `import cv2
import numpy as np


def letterbox(img, target=640, colour=(114, 114, 114)):
    h, w = img.shape[:2]
    s = min(target / w, target / h)
    nw, nh = int(round(w * s)), int(round(h * s))
    resized = cv2.resize(img, (nw, nh), interpolation=cv2.INTER_LINEAR)
    canvas = np.full((target, target, 3), colour, dtype=np.uint8)
    px, py = (target - nw) // 2, (target - nh) // 2
    canvas[py:py + nh, px:px + nw] = resized
    return canvas, s, px, py


frame = np.zeros((720, 1280, 3), dtype=np.uint8)
padded, s, px, py = letterbox(frame)
print("output:", padded.shape, "scale:", s, "pad:", (px, py))

box_lb = np.array([100.0, 200.0, 300.0, 400.0])          # x1, y1, x2, y2
box_orig = (box_lb - np.array([px, py, px, py])) / s
print("box in original frame:", box_orig)`,
        output: `output: (640, 640, 3) scale: 0.5 pad: (0, 140)
box in original frame: [200. 120. 600. 520.]`,
        explanation:
          'The function returns not only the image but the three numbers needed to invert the transform, which is the part beginners omit. Note the grey 114 fill, which is the value every YOLO implementation uses so that padding is far from both black and white and therefore unlikely to look like a real object. Note too that the inverse subtracts padding before dividing by the scale; doing it in the other order produces boxes offset by p/s pixels.',
      },
      {
        language: 'python',
        title: 'What wrong normalisation costs you',
        runnable: true,
        code: `import torch
from torchvision import transforms
from torchvision.models import resnet18, ResNet18_Weights
from PIL import Image

weights = ResNet18_Weights.IMAGENET1K_V1
model = resnet18(weights=weights).eval()
img = Image.open("cone.jpg").convert("RGB")

correct = weights.transforms()                      # the exact recipe used in training
sloppy = transforms.Compose([                       # resize + ToTensor, no Normalize
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

with torch.no_grad():
    for name, tf in [("correct", correct), ("no normalisation", sloppy)]:
        probs = model(tf(img).unsqueeze(0)).softmax(dim=1)
        conf, idx = probs.max(dim=1)
        print(f"{name:18s} -> {weights.meta['categories'][idx]:20s} p={conf.item():.3f}")`,
        output: `correct            -> traffic light        p=0.612
no normalisation   -> sundial              p=0.208`,
        explanation:
          'Nothing raised an exception. The second call returned a confident-looking prediction that happens to be wrong, because the network is seeing inputs in [0,1] when its first convolution learned to expect values straddling zero with unit scale. Using weights.transforms() rather than hand-writing the pipeline removes this entire class of bug, because the recipe travels with the checkpoint.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A medical imaging model that silently degraded in a new hospital',
        usage:
          'Scanner A stored 12-bit data windowed one way, scanner B another. The pipeline normalised with statistics from A, so images from B arrived shifted, and sensitivity dropped by several points without any error being logged. Normalisation constants are part of the model contract, not an implementation detail.',
      },
      {
        context: 'Real-time detection on video',
        usage:
          'Every YOLO release letterboxes to a square with grey 114 padding and records the scale and offsets, because detection accuracy depends on shapes staying true and because boxes must be mapped back to original frame coordinates for display and tracking.',
      },
      {
        context: 'Segmentation label maps',
        usage:
          'Resizing a mask with bilinear interpolation invents fractional class ids such as 3.5 between class 3 and class 4, corrupting the labels. Mask resizing always uses nearest-neighbour, while the matching photograph uses bilinear.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.transforms', role: 'Resize, CenterCrop, ToTensor and Normalize compose the standard recipe; weights.transforms() supplies the exact one for a checkpoint.' },
      { tool: 'OpenCV', role: 'cv2.resize with INTER_AREA for downscaling and INTER_NEAREST for masks; the fastest path in a CPU preprocessing loop.' },
      { tool: 'Albumentations', role: 'LongestMaxSize plus PadIfNeeded implement letterboxing, and apply the same geometry to images, masks and boxes together.' },
      { tool: 'ONNX Runtime / TensorRT', role: 'Preprocessing usually lives outside the exported graph, so the constants must be duplicated exactly in the serving code.' },
    ],

    commonMistakes: [
      {
        mistake: 'Applying ToTensor twice, or Normalize before ToTensor',
        why: 'ToTensor already divides by 255. Applying it to an already-scaled tensor, or normalising a PIL image, either raises a type error or quietly shrinks the range to about [0, 0.004].',
        fix: 'Keep one canonical transform object per split and print x.min(), x.max() and x.mean() once after building it. The range should be roughly -2.1 to 2.6, not 0 to 1.',
      },
      {
        mistake: 'Using different preprocessing at training and inference time',
        why: 'A model learns the joint distribution of its inputs. Changing the resize method, the crop, or the normalisation constants between train and serve shifts that distribution, which shows up as an accuracy drop no metric on the training set can reveal.',
        fix: 'Define the eval transform once, import it in both the training script and the serving code, and assert equality of the resulting tensor on a fixture image in CI.',
      },
      {
        mistake: 'Resizing a segmentation mask with bilinear interpolation',
        why: 'Interpolation averages class indices, producing labels that do not exist. Halfway between road (3) and pavement (4) it invents 3.5, which then rounds to an arbitrary class along every boundary.',
        fix: 'Always use nearest-neighbour for masks and label maps, and bilinear or area for the image itself. Albumentations lets you set the two independently in one transform.',
      },
      {
        mistake: 'Normalising with BGR data using RGB statistics',
        why: 'The means 0.485, 0.456, 0.406 are in RGB order. Applying them to a BGR array subtracts the red mean from the blue channel, so the input distribution is skewed in two channels at once.',
        fix: 'Convert to RGB immediately after cv2.imread, before any tensor conversion, and keep a single assertion that the pipeline is RGB end to end.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why do we normalise images with a mean and standard deviation rather than just dividing by 255?',
        answer:
          'Dividing by 255 fixes the scale but leaves every input strictly positive and clustered well away from zero. That is bad for optimisation: for a given neuron, all input features share the same sign, so all of its weight gradients share a sign too, and updates zig-zag along a narrow valley instead of heading straight downhill. Subtracting the per-channel mean centres the data near zero and dividing by the standard deviation makes the three channels comparable in scale, so gradients across channels have similar magnitudes and a single learning rate suits all of them. There is a second, more practical reason: a pretrained network learned its first-layer filters on a specific input distribution, so reproducing that distribution exactly is a precondition for the transferred weights to mean anything.',
        followUp:
          'Strong candidates note that batch normalisation inside the network provides similar conditioning for hidden layers, but cannot retroactively fix the input distribution a pretrained first layer expects.',
      },
      {
        level: 'intermediate',
        question: 'When would you letterbox rather than resize to a square, and what must you keep track of?',
        answer:
          'Letterbox whenever the geometry of the output matters — object detection, pose estimation, anything producing coordinates — because squashing changes every aspect ratio in the scene and a network that must regress box widths then has to learn a distortion that varies with the source resolution. You keep three numbers: the scale factor s = min(target_w/w, target_h/h) and the two padding offsets. They are needed to map predictions back into original image coordinates, by subtracting the padding first and then dividing by the scale. The cost is wasted input area: a 16:9 frame letterboxed into a square leaves about 44 per cent of the tensor as constant padding, which is why some pipelines use a rectangular target that matches the source ratio more closely.',
        followUp:
          'Mentioning that classification is generally tolerant of aspect distortion, and that RandomResizedCrop deliberately introduces it as augmentation, shows the trade-off is understood rather than memorised.',
      },
      {
        level: 'ml-engineer',
        question: 'A fine-tuned model scores 92 per cent offline but 84 per cent in production. Preprocessing is the suspect. How do you find the discrepancy?',
        answer:
          'Take a single fixture image and dump the final tensor from both paths, then compare them numerically rather than visually: shape, dtype, min, max, per-channel mean, and the maximum absolute difference. That check catches the whole family at once — BGR versus RGB, missing or doubled normalisation, a different interpolation method, resize-then-crop versus direct resize, and a JPEG decoder that applies EXIF rotation in one path but not the other. Once the tensors agree, the gap is genuinely a data distribution problem rather than a plumbing problem. The durable fix is to make preprocessing a single shared function with a golden-tensor regression test in CI, and to load the recipe from the checkpoint metadata where the framework supports it, as torchvision does with weights.transforms().',
        followUp:
          'The strongest answers also check resize antialiasing, which differs between PIL, OpenCV and torch.nn.functional.interpolate and can shift accuracy by a point on its own.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A pixel has red channel value 200. Compute the value the network sees after the ImageNet recipe, showing both steps.',
        hint: 'Divide by 255 first, then subtract 0.485 and divide by 0.229.',
        solution:
          '200 / 255 = 0.78431. Then (0.78431 - 0.485) / 0.229 = 0.29931 / 0.229 = 1.3070. So the network sees about 1.31 — noticeably above the mean but well inside the usual range, since the maximum possible red is (1 - 0.485)/0.229 = 2.249.',
      },
      {
        prompt:
          'An image is 1920x1080 and the target is 512x512. Give the letterbox scale, the resized dimensions, the padding on each side, and the fraction of the canvas that is padding.',
        hint: 'The scale is the smaller of the two ratios; padding is split evenly on the axis that falls short.',
        solution:
          's = min(512/1920, 512/1080) = min(0.2667, 0.4741) = 0.2667. Resized: 1920 x 0.2667 = 512 wide and 1080 x 0.2667 = 288 tall. Vertical padding: (512 - 288)/2 = 112 rows top and bottom; horizontal padding zero. Padding fraction: 224/512 = 43.75 per cent of the canvas is grey, exactly as for any 16:9 source squared off.',
      },
      {
        prompt:
          'Write a function that asserts two preprocessing pipelines agree on a fixture image, reporting the first field that differs.',
        hint: 'Compare shape, dtype and then the maximum absolute elementwise difference.',
        language: 'python',
        starterCode: 'import torch\n\n\ndef assert_same_preprocessing(tf_a, tf_b, img, atol=1e-6):\n',
        solution:
          'a, b = tf_a(img), tf_b(img)\nassert a.shape == b.shape, f"shape: {tuple(a.shape)} vs {tuple(b.shape)}"\nassert a.dtype == b.dtype, f"dtype: {a.dtype} vs {b.dtype}"\ndiff = (a - b).abs().max().item()\nassert diff < atol, f"values differ by up to {diff:.4f}"\nreturn True\n\nThe order matters: shape and dtype mismatches produce clearer messages than a broadcast subtraction would, and the elementwise tolerance catches the subtle cases such as a different interpolation method or antialiasing setting, which leave shape and dtype identical.',
      },
    ],

    quiz: [
      {
        id: 'CV-003-q1',
        type: 'mcq',
        concept: 'interpolation choice',
        prompt: 'You are downscaling a segmentation mask whose pixel values are class indices 0–20. Which interpolation should you use?',
        options: [
          'Nearest neighbour',
          'Bilinear',
          'Bicubic',
          'Lanczos',
        ],
        answerIndex: 0,
        explanation:
          'Every other method averages neighbouring values, inventing fractional class indices such as 3.5 that correspond to no class at all. Nearest neighbour copies an existing label, which is the only operation that keeps a label map valid.',
      },
      {
        id: 'CV-003-q2',
        type: 'numeric',
        concept: 'normalisation arithmetic',
        prompt:
          'Using the ImageNet recipe, what value does a green channel byte of 0 become? Green mean is 0.456 and green std is 0.224. Answer to three decimal places.',
        answer: -2.036,
        tolerance: 0.01,
        explanation:
          '0/255 = 0, then (0 - 0.456)/0.224 = -2.0357. The darkest possible pixel maps to about -2.04, which is why normalised inputs span roughly -2.1 to 2.6 rather than 0 to 1.',
      },
      {
        id: 'CV-003-q3',
        type: 'truefalse',
        concept: 'pretrained preprocessing',
        prompt: 'If you forget Normalize when using an ImageNet pretrained model, PyTorch raises an error.',
        answer: false,
        explanation:
          'Nothing raises. The shapes and dtypes are valid, so the model runs and returns confident predictions computed from an input distribution it has never seen. Silent accuracy loss is the characteristic failure mode of preprocessing bugs.',
      },
      {
        id: 'CV-003-q4',
        type: 'numeric',
        concept: 'letterboxing',
        prompt:
          'A 1280x720 frame is letterboxed into 640x640. How many rows of padding are added at the top?',
        answer: 140,
        tolerance: 0,
        unit: 'pixels',
        explanation:
          'The scale is min(640/1280, 640/720) = 0.5, so the content becomes 640x360. The leftover 280 rows split evenly, giving 140 at the top and 140 at the bottom.',
      },
      {
        id: 'CV-003-q5',
        type: 'multi',
        concept: 'preprocessing parity',
        prompt: 'Which of these change the tensor a model sees without raising any error? Select all that apply.',
        options: [
          'Loading with cv2.imread instead of PIL, without converting BGR to RGB',
          'Using bicubic instead of bilinear interpolation for the resize',
          'Omitting the Normalize step',
          'Passing an image with the wrong number of dimensions',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The first three all produce valid tensors with wrong contents, which is exactly why they are dangerous. A rank-3 tensor where rank 4 is required fails immediately with a dimension error, so it costs a minute rather than a week.',
      },
      {
        id: 'CV-003-q6',
        type: 'explain',
        concept: 'why normalise',
        prompt:
          'Explain why a pretrained network needs the same normalisation constants it was trained with, in terms of what the first convolution layer has learned.',
        rubric: [
          'States that weights were fitted against a specific input distribution',
          'Explains that shifting or scaling inputs changes every pre-activation',
          'Notes that the failure is silent rather than an error',
        ],
        sampleAnswer:
          'The first convolution computes a weighted sum of input pixels and adds a bias, and both the weights and that bias were fitted while the inputs had a particular mean and spread. If you hand the same layer values in [0,1] instead of values centred on zero with unit scale, every pre-activation shifts, the biases are now wrong relative to the data, and the ReLU thresholds fire on different patterns than they were tuned for. That error compounds through fifty layers. Nothing about the shapes is invalid, so no exception is raised: the model simply produces a worse answer with the same apparent confidence, which is why preprocessing parity is checked with an assertion on a fixture tensor rather than by looking at the picture.',
        explanation:
          'The key insight is that trained weights encode assumptions about the input distribution, so preprocessing is part of the model rather than a step before it.',
      },
    ],

    flashcards: [
      { front: 'What are the ImageNet normalisation constants?', back: 'mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225], in RGB order on the [0,1] scale.' },
      { front: 'Which interpolation for segmentation masks?', back: 'Nearest neighbour always — any averaging method invents class indices that do not exist.' },
      { front: 'What is the letterbox scale factor?', back: 's = min(target_w / w, target_h / h), then pad the shorter axis symmetrically. Keep s and the offsets to invert it.' },
      { front: 'What does ToTensor do that Normalize does not?', back: 'ToTensor permutes HWC to CHW and divides by 255. Normalize then subtracts the mean and divides by the std.' },
      { front: 'Range of an ImageNet-normalised input?', back: 'About -2.12 to +2.64, not 0 to 1. Printing min and max is the fastest sanity check of a pipeline.' },
      { front: 'Why does forgetting Normalize not raise an error?', back: 'Shape and dtype stay valid, so the model runs on a distribution it never saw and loses accuracy silently.' },
    ],

    challenge: {
      title: 'A preprocessing parity harness',
      brief:
        'Build a small harness that takes one fixture image and three candidate pipelines — a correct torchvision recipe, an OpenCV reimplementation of the same recipe, and a deliberately broken one that skips normalisation — and reports for each the shape, dtype, min, max, per-channel mean, and maximum absolute difference from the reference. Then measure the effect: run a pretrained resnet18 on all three and print the top-1 prediction and confidence for each.',
      language: 'python',
      acceptanceCriteria: [
        'The OpenCV path matches the torchvision reference within a stated tolerance, with BGR converted to RGB',
        'The report includes per-channel means, not just a global mean',
        'The broken pipeline is shown to produce a different prediction or a materially lower confidence',
        'The code explains in comments why each difference arises',
        'The reference recipe is obtained from weights.transforms() rather than hard-coded twice',
      ],
      starterCode: 'import cv2\nimport numpy as np\nimport torch\nfrom PIL import Image\nfrom torchvision.models import resnet18, ResNet18_Weights\n\nweights = ResNet18_Weights.IMAGENET1K_V1\nreference = weights.transforms()\n',
    },

    teachingPrompt: {
      prompt:
        'A classmate asks why their pretrained model works in the tutorial notebook but gives nonsense in their own script. Teach them what preprocessing is, and why it is part of the model rather than a step before it.',
      mustCover: [
        'Models need a fixed input size, so images must be resized and that involves inventing pixel values',
        'Pixel values are rescaled to [0,1] and then centred with a per-channel mean and standard deviation',
        'The constants come from the dataset the model was trained on and must be reproduced exactly',
        'Getting it wrong lowers accuracy silently, with no error raised',
      ],
      bonusSignals: ['mentions the specific ImageNet constants', 'mentions aspect ratio and letterboxing', 'mentions nearest-neighbour for masks'],
      sampleExplanation:
        'A network has a fixed number of input slots, so every picture has to be squeezed onto the same size grid first, and that means inventing values for pixels that fall between the originals — which is what bilinear or nearest interpolation is choosing between. After resizing, the numbers are still 0 to 255, which is an awkward range for learning, so we divide by 255 to get 0 to 1 and then subtract an average and divide by a spread for each colour channel separately. Here is the part that catches people: those six numbers are not generic. They are the average and spread of red, green and blue over the million photographs the model was originally trained on, and the first layer of the network learned its filters against inputs on that exact scale. Hand it data on a different scale and nothing breaks, nothing warns you, and the predictions just get worse. So preprocessing is not a step before the model, it is part of the model, and the reliable habit is to take the transform from the checkpoint rather than retyping it.',
    },
  },
