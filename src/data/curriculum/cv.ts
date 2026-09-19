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

  {
    id: 'CV-004',
    domain: 'CV',
    module: 'Preprocessing & Augmentation',
    topic: 'Data augmentation',
    title: 'Data Augmentation',
    slug: 'data-augmentation',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['CV-002', 'CV-003'],
    related: ['CV-001', 'CV-002', 'CV-003'],
    tags: ['augmentation', 'regularisation', 'overfitting', 'albumentations', 'torchvision', 'label-preserving'],

    learningObjectives: [
      'Explain augmentation as a regulariser that encodes invariances you already believe in',
      'Distinguish geometric from photometric transforms and name the common members of each family',
      'Decide whether a given transform is label-preserving for a given dataset, and justify the decision',
      'Apply augmentation to the training split only, and explain precisely why validation must stay untouched',
    ],

    terminology: [
      {
        term: 'Data augmentation',
        definition:
          'Applying randomised, label-preserving transformations to training inputs so the model sees a different version of each example on every epoch, effectively enlarging the training distribution.',
        simple: 'Showing the model slightly changed copies of the same photo so it learns the thing, not the photo.',
      },
      {
        term: 'Label-preserving',
        definition:
          'A transform is label-preserving if the correct answer is unchanged by it. Horizontal flip preserves the label cat but destroys the label 6, which becomes a mirror image that is not a 6.',
        simple: 'The change must not turn the right answer into a wrong one.',
      },
      {
        term: 'Geometric transform',
        definition:
          'A change to where pixels are: flip, rotation, translation, scale, shear, perspective, random resized crop. For detection and segmentation the targets must be transformed with the image.',
        simple: 'Moving the pixels around without changing their colours.',
      },
      {
        term: 'Photometric transform',
        definition:
          'A change to pixel values only: brightness, contrast, saturation, hue jitter, gamma, blur, noise, JPEG compression. Geometry and therefore boxes and masks are untouched.',
        simple: 'Changing how it looks — lighter, darker, more colourful — without moving anything.',
      },
      {
        term: 'Invariance',
        definition:
          'A property the model should ignore. Augmenting with a transform is a statement that the output must not depend on it, which is why the choice of transforms is a statement about the problem rather than a tuning knob.',
        simple: 'Something you want the model not to care about.',
      },
    ],

    simpleExplanation:
      "If you only ever show a child photographs of a cat sitting in the same corner of the same sofa in the same light, they may learn sofa rather than cat. The cure is variety: the same cat from the left, in shadow, a bit closer, slightly tilted. Data augmentation is that cure for a neural network, done automatically. Every time an image is fetched for training, the code makes a small random change to it first — maybe mirror it, maybe crop a different part, maybe brighten it — so the network almost never sees exactly the same pixels twice. It learns the parts that stayed the same across all those versions, which is precisely what we mean by the cat. Two rules matter enormously. First, the change must never alter the correct answer, so mirroring a cat is fine but mirroring a handwritten 6 turns it into something that is not a 6. Second, augmentation is only for training. The validation set must stay untouched, because it is your only honest measurement of how the model does on real data.",

    whyItExists:
      'Deep networks have far more parameters than any realistic labelled dataset has examples, so they can memorise the training set instead of learning the concept. Collecting more data is the best cure and is usually impossible; augmentation is the cheap substitute, injecting the invariances a human already knows hold — a mirrored cat is still a cat — so the model cannot rely on accidental details that will not repeat at test time.',

    analogy: {
      scenario:
        'A student preparing for an exam has ten past papers. If they memorise the answers to those ten, they will score perfectly on them and badly on the real thing. A good tutor instead rewrites each question: changes the names and numbers, reorders the parts, phrases it differently. The underlying mathematics is identical, so the correct method is unchanged, but the student can no longer succeed by recall. What survives all the rewrites is understanding.',
      mapping: [
        { from: 'The ten original past papers', to: 'The finite labelled training set' },
        { from: 'Rewriting names and numbers each time', to: 'Randomised transforms applied fresh every epoch' },
        { from: 'Keeping the underlying method identical', to: 'The label-preserving requirement' },
        { from: 'Memorising the answer sheet', to: 'Overfitting — low training loss, high validation loss' },
        { from: 'A clean, unrewritten mock exam kept aside', to: 'The validation set, which is never augmented' },
      ],
      bridge:
        'The tutor must be careful about which rewrites are legitimate: changing the numbers in an arithmetic question is fine, but reversing an inequality sign changes the answer, and the student would then be trained on a lie. That is exactly the label-preserving condition. Formally, each transform asserts an invariance of the true labelling function, and augmenting with a transform that does not respect it injects label noise that caps achievable accuracy.',
      limitations:
        'The analogy suggests more rewriting is always better. In practice augmentation that is too aggressive makes the training distribution diverge from the test distribution, and the model spends capacity on variation it will never encounter — visible as training loss that stays stubbornly high while validation loss does not improve either.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Try the transforms on a real image',
        caption: 'Adjust each transform and watch which ones keep the label intact.',
        widget: 'augmentation-lab',
      },
      {
        kind: 'table',
        title: 'Is it label-preserving? It depends on the dataset',
        columns: ['Transform', 'Safe for', 'Destroys the label for', 'Why'],
        rows: [
          ['Horizontal flip', 'Cats, cars, faces, most natural scenes', 'Digits (6 vs 9), text, left-vs-right hand, road signs with arrows', 'Mirror symmetry is not a property of glyphs or of chirality'],
          ['Vertical flip', 'Satellite and microscopy imagery', 'Anything with gravity: people, buildings, street scenes', 'Upside-down pedestrians do not occur at test time'],
          ['Rotation ±15°', 'Photographs of objects', 'Document scans where skew matters, digits beyond about 20°', 'Large rotations turn a 6 towards a 9 continuously'],
          ['Colour jitter', 'General object recognition', 'Colour-defined classes: ripe vs unripe fruit, medical stains', 'The label is literally a function of the hue you are jittering'],
          ['Random resized crop', 'ImageNet-style classification', 'Small-object detection, where the object may be cropped out', 'Crop can remove the evidence while the label stays'],
          ['Gaussian noise / blur', 'Robustness to camera quality', 'Fine-grained texture tasks such as defect detection', 'The signal being classified is of the same scale as the noise'],
        ],
      },
      {
        kind: 'flow',
        title: 'Where augmentation sits in a training step',
        caption: 'Randomness is applied per sample, per epoch — never cached.',
        steps: [
          { label: 'Dataset __getitem__ is called', detail: 'The raw uint8 image is decoded from disk for index i.' },
          { label: 'Random transform is sampled', detail: 'Each call draws new random parameters: this flip, that crop box, that brightness factor.' },
          { label: 'Transform is applied to image and targets', detail: 'Geometric changes must move boxes and masks with the pixels; photometric ones leave them alone.' },
          { label: 'ToTensor and Normalize', detail: 'Deterministic preprocessing runs last, so the augmented pixels reach the model on the expected scale.' },
          { label: 'Batch is collated and stepped', detail: 'The next epoch sees the same image again with different random parameters.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Train transform versus eval transform',
        caption: 'Two pipelines, built once, imported everywhere.',
        left: {
          heading: 'Training',
          points: [
            'RandomResizedCrop(224), RandomHorizontalFlip()',
            'ColorJitter, RandAugment or TrivialAugmentWide',
            'Fresh randomness on every access, every epoch',
            'Makes training loss look worse than it is — this is expected',
          ],
        },
        right: {
          heading: 'Validation and test',
          points: [
            'Resize(256) then CenterCrop(224) — deterministic',
            'No flips, no jitter, no random crops',
            'Same pipeline used in production serving',
            'The only honest estimate of generalisation you have',
          ],
        },
      },
    ],

    formalDefinition:
      'Data augmentation replaces the empirical risk over a finite sample with the expected risk over a distribution of transformed samples: the objective becomes an expectation over a family of stochastic transforms T, each required to satisfy the label-preservation condition y(t(x)) = y(x). It acts as a data-dependent regulariser, enlarging the support of the training distribution along directions the modeller asserts are irrelevant, and it is applied only to the training split so that validation remains an unbiased estimate of performance on untransformed data.',

    math: {
      intuition:
        'Ordinary training minimises the average loss over the examples you happen to have. Augmentation changes the target to the average loss over every transformed version of every example, which is an infinitely larger set that you sample from one draw at a time. Because the transforms are chosen to leave the label alone, the minimiser is pushed towards functions that give the same answer across the whole orbit of each image — which is the formal content of the phrase learn the object, not the photograph.',
      formulas: [
        {
          latex: '\\mathcal{L}_{\\text{aug}} = \\frac{1}{N}\\sum_{i=1}^{N} \\mathbb{E}_{t \\sim \\mathcal{T}}\\big[\\, \\ell\\big(f_\\theta(t(x_i)),\\, y_i\\big) \\,\\big]',
          name: 'Augmented empirical risk',
          meaning:
            'The quantity training actually minimises when augmentation is on. The inner expectation over transforms is never computed exactly; each epoch draws one sample of t per image, which is an unbiased estimate of it.',
          variables: [
            { symbol: 'N', meaning: 'Number of labelled training examples' },
            { symbol: 't \\sim \\mathcal{T}', meaning: 'A transform drawn from the augmentation distribution, for example a flip with probability 0.5 combined with a random crop' },
            { symbol: 'f_\\theta', meaning: 'The network with parameters theta' },
            { symbol: '\\ell', meaning: 'The per-example loss, typically cross-entropy' },
            { symbol: 'y_i', meaning: 'The label, which by assumption is unchanged by t' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'y\\big(t(x)\\big) = y(x) \\quad \\forall t \\in \\mathcal{T}',
          name: 'The label-preservation condition',
          meaning:
            'The assumption that makes augmentation valid. Violating it means training on examples whose labels are wrong, which is indistinguishable from label noise and puts a ceiling on achievable accuracy.',
          variables: [
            { symbol: 'y(\\cdot)', meaning: 'The true labelling function of the task' },
            { symbol: 't', meaning: 'Any transform in the chosen family' },
            { symbol: '\\mathcal{T}', meaning: 'The augmentation family you configured' },
          ],
        },
        {
          latex: '\\tilde{x} = \\lambda x_i + (1-\\lambda) x_j, \\qquad \\tilde{y} = \\lambda y_i + (1-\\lambda) y_j, \\qquad \\lambda \\sim \\text{Beta}(\\alpha, \\alpha)',
          name: 'Mixup',
          meaning:
            'An augmentation that blends two images and their one-hot labels in the same proportion. It is not label-preserving in the usual sense; instead it changes the label consistently, which regularises the decision boundary between classes.',
          variables: [
            { symbol: 'x_i, x_j', meaning: 'Two training images drawn from the batch' },
            { symbol: '\\lambda', meaning: 'Mixing weight in [0,1], drawn from a Beta distribution with alpha typically 0.2 to 0.4' },
            { symbol: '\\tilde{y}', meaning: 'The soft label, which is no longer one-hot' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Without augmentation the model can drive the training loss to zero by memorising each x_i, because with enough parameters a network can fit arbitrary labels.',
        'With augmentation, the same weights must now achieve low loss on t(x_i) for every t in the family, and the model never sees the same pixel array twice.',
        'Memorising a specific pixel array therefore buys almost nothing, since the exact array recurs with probability near zero.',
        'The cheapest remaining way to reduce loss is to become insensitive to the transform family while staying sensitive to whatever distinguishes the classes.',
        'That insensitivity is the invariance you wanted, which is why the choice of family is a modelling decision and not a hyperparameter to be swept blindly.',
      ],
    },

    workedExample: {
      title: 'Auditing an augmentation policy for a street-sign dataset',
      setup:
        'A team is training a classifier on 43 classes of European road signs, roughly 2,000 images per class, taken from dashcams in daylight and at night. They copy a standard ImageNet recipe: RandomResizedCrop(224, scale=(0.08, 1.0)), RandomHorizontalFlip(), ColorJitter(0.4, 0.4, 0.4, 0.1). Validation accuracy stalls at 91 per cent while training accuracy sits at 94. We audit each transform against the task.',
      steps: [
        {
          label: 'Horizontal flip: reject',
          detail:
            'Several classes are distinguished only by direction — turn left ahead versus turn right ahead, and the two no-overtaking variants. Flipping turns one class into another while keeping the old label, so roughly one image in two of those classes is now mislabelled.',
          latex: 'y(\\text{flip}(x)) \\neq y(x) \\text{ for directional classes}',
        },
        {
          label: 'Colour jitter with hue 0.1: reduce sharply',
          detail:
            'Red versus blue is the primary cue separating prohibition signs from information signs. A hue jitter of 0.1 is 36 degrees of hue rotation, which is enough to move a red rim towards orange and weaken exactly the feature the task depends on. Brightness and contrast jitter, by contrast, model day and night and should stay.',
        },
        {
          label: 'RandomResizedCrop with scale down to 0.08: reduce',
          detail:
            'Signs are already tightly cropped, so a crop taking 8 per cent of the area frequently contains only rim and no glyph, while the label still claims the glyph. Raising the lower bound to 0.7 keeps scale variation without destroying evidence.',
          latex: '\\text{scale} \\in [0.08, 1.0] \\rightarrow [0.7, 1.0]',
        },
        {
          label: 'Add transforms that match the real failure modes',
          detail:
            'Dashcam footage is motion-blurred, compressed and sometimes rotated by a few degrees on a bumpy road. Adding MotionBlur, ImageCompression(quality 40–90) and Rotate(limit=10) augments along directions the test distribution actually varies.',
        },
        {
          label: 'Measure, do not assume',
          detail:
            'Each change is validated on the untouched validation split. Removing flip alone recovered 2.1 points; the added dashcam-specific transforms added a further 1.4, and validation accuracy settled at 94.6 with training accuracy at 95.8 — a healthy, small gap.',
        },
      ],
      conclusion:
        'The default recipe was not wrong in general; it was wrong for this labelling function. Augmentation is a statement about which changes leave the answer alone, so it must be audited class by class rather than copied. The tell-tale symptom of a label-destroying transform is a validation score that plateaus below what the data should support while the train-validation gap stays small, because the model is fitting contradictory labels rather than memorising.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Two pipelines: one for training, one for everything else',
        runnable: true,
        code: `from torchvision import transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]

train_tf = transforms.Compose([
    transforms.RandomResizedCrop(224, scale=(0.5, 1.0)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2),
    transforms.ToTensor(),
    transforms.Normalize(MEAN, STD),
    transforms.RandomErasing(p=0.25),          # after Normalize, on the tensor
])

eval_tf = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(MEAN, STD),
])

train_ds = ImageFolder("data/train", transform=train_tf)
val_ds = ImageFolder("data/val", transform=eval_tf)   # never the train transform

train_dl = DataLoader(train_ds, batch_size=64, shuffle=True, num_workers=8)
val_dl = DataLoader(val_ds, batch_size=64, shuffle=False, num_workers=8)

print("train samples:", len(train_ds), "| classes:", len(train_ds.classes))
print("same index twice gives different pixels:",
      not train_ds[0][0].equal(train_ds[0][0]))`,
        output: `train samples: 12800 | classes: 10
same index twice gives different pixels: True`,
        explanation:
          'The final print is the important one: asking for sample 0 twice returns two different tensors, because the random parameters are drawn inside __getitem__ on every access rather than once at construction. Note also that RandomErasing comes after Normalize, since it operates on tensors and erases with zeros on the normalised scale, while all the PIL-based transforms must precede ToTensor.',
      },
      {
        language: 'python',
        title: 'Albumentations keeps boxes and masks in sync',
        runnable: true,
        code: `import albumentations as A
import numpy as np

tf = A.Compose(
    [
        A.LongestMaxSize(max_size=640),
        A.PadIfNeeded(640, 640, border_mode=0, value=(114, 114, 114)),
        A.HorizontalFlip(p=0.5),
        A.RandomBrightnessContrast(p=0.5),
        A.MotionBlur(blur_limit=5, p=0.2),
    ],
    bbox_params=A.BboxParams(format="pascal_voc", label_fields=["labels"], min_visibility=0.3),
)

image = np.zeros((720, 1280, 3), dtype=np.uint8)
boxes = [[100, 200, 300, 500]]          # x_min, y_min, x_max, y_max
labels = [1]

out = tf(image=image, bboxes=boxes, labels=labels)
print("image:", out["image"].shape)
print("boxes:", [[round(v, 1) for v in b] for b in out["bboxes"]])
print("labels kept:", out["labels"])`,
        output: `image: (640, 640, 3)
boxes: [[50.0, 240.0, 150.0, 390.0]]
labels kept: [1]`,
        explanation:
          'The geometric transforms moved the box automatically, which is the whole reason Albumentations exists for detection: writing the box arithmetic by hand for a flip followed by a pad followed by a crop is where hours disappear. min_visibility=0.3 drops boxes whose visible area falls below 30 per cent after cropping, preventing the model from being trained to find an object that is no longer in the frame. The same Compose accepts a mask= argument and applies nearest-neighbour resampling to it.',
      },
      {
        language: 'python',
        title: 'Mixup in a training step',
        runnable: true,
        code: `import numpy as np
import torch
import torch.nn.functional as F


def mixup(x, y, alpha=0.2):
    lam = float(np.random.beta(alpha, alpha))
    idx = torch.randperm(x.size(0), device=x.device)
    mixed = lam * x + (1.0 - lam) * x[idx]
    return mixed, y, y[idx], lam


x = torch.randn(4, 3, 32, 32)
y = torch.tensor([0, 1, 2, 3])

mixed_x, y_a, y_b, lam = mixup(x, y)
logits = torch.randn(4, 10)                     # stand-in for model(mixed_x)
loss = lam * F.cross_entropy(logits, y_a) + (1 - lam) * F.cross_entropy(logits, y_b)

print("lambda:", round(lam, 3))
print("mixed batch:", tuple(mixed_x.shape))
print("loss:", round(float(loss), 4))`,
        output: `lambda: 0.271
mixed batch: (4, 3, 32, 32)
loss: 2.4713`,
        explanation:
          'Mixup blends two images and weights the two losses by the same lambda, which is equivalent to training on the blended soft label without materialising it. The partner images come from a permutation of the current batch, so no extra data loading is needed. It regularises the decision boundary and improves calibration, at the cost of a training loss that is no longer comparable to a non-mixup run — a frequent source of confusion when comparing experiments.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Medical imaging with a few hundred labelled scans',
        usage:
          'Elastic deformation, small rotations and intensity shifts are standard because expert annotation is prohibitively expensive. Horizontal flip is often banned outright: organ laterality is diagnostic, and a mirrored chest X-ray can turn dextrocardia into a normal heart.',
      },
      {
        context: 'Self-driving perception stacks',
        usage:
          'Training data is augmented with synthetic rain, fog, glare, motion blur and night-time colour shifts, because the long tail of weather is what causes failures and collecting real examples of every condition is slow and dangerous.',
      },
      {
        context: 'Self-supervised pretraining',
        usage:
          'SimCLR and its successors define the learning signal itself with augmentation: two random views of the same image must produce similar representations. The choice of augmentation family stops being a regulariser and becomes the definition of the task.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.transforms.v2', role: 'The current API, which unlike v1 transforms images, boxes and masks together and accepts tensors as well as PIL images.' },
      { tool: 'Albumentations', role: 'Fast OpenCV-backed augmentation with first-class support for bounding boxes and segmentation masks.' },
      { tool: 'RandAugment / TrivialAugmentWide', role: 'Automated policies that remove most manual tuning; TrivialAugmentWide has no hyperparameters at all and is a strong default.' },
      { tool: 'Weights & Biases or TensorBoard', role: 'Logging a grid of augmented batches is the only reliable way to catch a policy that is destroying labels.' },
    ],

    commonMistakes: [
      {
        mistake: 'Augmenting the validation or test set',
        why: 'The validation score stops measuring performance on real data and starts measuring performance on randomly distorted data, so it becomes noisy between epochs and systematically pessimistic, and model selection based on it picks the wrong checkpoint.',
        fix: 'Build exactly two transforms — train and eval — and pass eval_tf to both the validation and test datasets. The one legitimate exception is deliberate test-time augmentation, which averages predictions over several views and must be applied identically at every evaluation.',
      },
      {
        mistake: 'Using horizontal flip on digits, text or directional classes',
        why: 'The transform is not label-preserving: a mirrored 6 is not a 6, mirrored text is not text, and a mirrored turn-left sign is a turn-right sign. The model is trained on contradictory labels and cannot resolve them.',
        fix: 'Audit each transform against the labelling function of your specific dataset. When in doubt, render a grid of augmented samples and try to label them yourself.',
      },
      {
        mistake: 'Applying the same random transform to a whole batch',
        why: 'Sampling the random parameters once outside the loop means every image in the batch is flipped identically, which reduces the effective variety enormously and correlates the gradient contributions.',
        fix: 'Sample inside __getitem__ so each image is transformed independently. Batch-level operations such as mixup are a deliberate exception and are applied on top, not instead.',
      },
      {
        mistake: 'Forgetting to transform boxes and masks with the image',
        why: 'A geometric augmentation that moves pixels but leaves targets alone produces training data where the box is in the wrong place, which teaches the model a systematic localisation error.',
        fix: 'Use an API that transforms targets jointly — Albumentations with bbox_params, or torchvision transforms v2 — rather than applying transforms to images and targets in separate code paths.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why does data augmentation reduce overfitting? Answer without using the phrase more data.',
        answer:
          'Overfitting is the model using features that are predictive in the training sample but not in the population — the exact background, the exact crop, a lighting quirk. Augmentation randomises precisely those nuisance factors, so a feature that depends on them stops being predictive during training and the optimiser abandons it. Put formally, it changes the objective from the average loss over the sample to the average loss over the orbit of each sample under a transform family, which constrains the learned function to be approximately invariant along those directions. That is a regularisation constraint, and like any regulariser it trades a little training fit for better generalisation, which is why training accuracy usually falls when you add augmentation while validation accuracy rises.',
        followUp:
          'A strong answer notes the constraint is only valid when the transforms are label-preserving, and that the invariances imposed are a modelling assumption that can be wrong.',
      },
      {
        level: 'ml-engineer',
        question: 'Your validation accuracy is noisy and consistently lower than training accuracy by twenty points. What do you check, in order?',
        answer:
          'First, whether the validation set is being augmented — random transforms on validation make the metric jump between epochs and bias it downwards. Second, whether the model is in eval mode during validation, since dropout stays active and batch norm keeps updating its running statistics otherwise. Third, whether the two splits are genuinely from the same distribution: a temporal or per-patient split can be legitimately harder than a random one, and duplicate or near-duplicate images leaking across splits produce the opposite error. Only once those are ruled out is a twenty-point gap real overfitting, at which point stronger augmentation, weight decay, early stopping and a smaller model are the tools, in roughly that order of cost.',
        followUp:
          'The best answers mention checking that the augmentation policy is label-preserving, since a destructive transform lowers both scores and can be mistaken for underfitting.',
      },
      {
        level: 'advanced',
        question: 'How is mixup different from the geometric and photometric transforms, and when is it worth using?',
        answer:
          'Conventional augmentation preserves the label exactly and enlarges the support of the input distribution along directions we believe are irrelevant. Mixup does something different: it forms convex combinations of two images and of their one-hot labels, so the label genuinely changes and the model is asked to behave linearly between examples. That is a constraint on the decision boundary rather than an invariance, and empirically it improves calibration, reduces memorisation of corrupted labels and helps robustness to adversarial perturbations. It is worth using for large-scale classification where you already have strong standard augmentation and are chasing the last point or two, and it pairs well with CutMix and label smoothing. It is a poor fit for detection and segmentation, where blending two scenes produces targets that no longer correspond to anything physical, and it makes training loss incomparable to a baseline run.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For a dataset of chest X-rays labelled with pathology, decide whether each is label-preserving: horizontal flip, ±10 degree rotation, brightness jitter, vertical flip. Justify each.',
        hint: 'Ask whether the transformed image could plausibly arrive from the real imaging process with the same correct label.',
        solution:
          'Horizontal flip: not safe. Laterality is diagnostic — a left-sided pleural effusion becomes right-sided, and situs inversus is itself a finding. Rotation ±10 degrees: safe, since patient positioning varies by a few degrees in practice. Brightness jitter: safe in moderation, as exposure varies between machines, though extreme shifts can wash out the low-contrast findings that define some labels. Vertical flip: not safe, because no chest radiograph is ever acquired upside down, so it wastes capacity on a region of input space the model will never see at test time.',
      },
      {
        prompt:
          'Write the training and evaluation transforms for a 64x64 fine-grained flower classification task where colour is a defining feature, and explain the two decisions you made differently from the ImageNet default.',
        hint: 'Consider which of the standard transforms attacks the feature the labels depend on.',
        language: 'python',
        starterCode: 'from torchvision import transforms\n\nMEAN = [0.485, 0.456, 0.406]\nSTD = [0.229, 0.224, 0.225]\n',
        solution:
          'train_tf = transforms.Compose([\n    transforms.RandomResizedCrop(64, scale=(0.6, 1.0)),\n    transforms.RandomHorizontalFlip(),\n    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.1, hue=0.0),\n    transforms.ToTensor(),\n    transforms.Normalize(MEAN, STD),\n])\neval_tf = transforms.Compose([\n    transforms.Resize(72),\n    transforms.CenterCrop(64),\n    transforms.ToTensor(),\n    transforms.Normalize(MEAN, STD),\n])\n\nTwo deliberate departures. Hue jitter is set to zero because petal colour is a defining feature and rotating hue would relabel a blue flower as purple. The crop scale floor is raised from 0.08 to 0.6 because at 64 pixels an aggressive crop leaves too little of the flower to identify, so the label would no longer be supported by the evidence in the image.',
      },
      {
        prompt:
          'A colleague reports that augmentation made training accuracy drop from 99 per cent to 93 per cent, and wants to turn it off. What do you tell them, and what would you ask to see?',
        hint: 'Which number actually measures the thing you care about?',
        solution:
          'Training accuracy falling is the expected consequence of augmentation, not evidence against it: the model is now being scored on harder, distorted versions of the data. The only number that matters is validation accuracy on the untouched split. Ask to see both curves together. If validation improved, augmentation is working and 93 versus 99 is the healthy price. If validation is flat or worse, the policy is probably too aggressive or contains a transform that is not label-preserving for this dataset, and the next step is to render a grid of augmented samples and check whether a human could still label them correctly.',
      },
    ],

    quiz: [
      {
        id: 'CV-004-q1',
        type: 'truefalse',
        concept: 'where augmentation applies',
        prompt: 'Augmentation should be applied to the training set and the validation set equally, to keep them comparable.',
        answer: false,
        explanation:
          'Only the training split is augmented. Validation exists to estimate performance on real, untransformed data, and randomising it makes the metric noisy and pessimistic, which corrupts model selection and early stopping.',
      },
      {
        id: 'CV-004-q2',
        type: 'multi',
        concept: 'label preservation',
        prompt: 'For a dataset of handwritten digits, which transforms are safe to use? Select all that apply.',
        options: [
          'Small rotations of up to 10 degrees',
          'Horizontal flip',
          'Random translation of a few pixels',
          'Vertical flip',
          'Mild elastic deformation',
        ],
        answerIndices: [0, 2, 4],
        explanation:
          'Flips break digits: a mirrored 6 is not a 6, and a vertically flipped 6 looks like a 9. Small rotations, translations and elastic deformations all model genuine handwriting variation and leave the label intact, which is why they are standard for digit datasets.',
      },
      {
        id: 'CV-004-q3',
        type: 'mcq',
        concept: 'augmentation as regularisation',
        prompt: 'After adding augmentation, training accuracy fell and validation accuracy rose. What happened?',
        options: [
          'The regulariser is working: the model can no longer memorise, so it generalises better',
          'The model is broken and should be retrained without augmentation',
          'The learning rate is now too high',
          'The validation set must have been augmented too',
        ],
        answerIndex: 0,
        explanation:
          'A narrower train-validation gap with a higher validation score is exactly the intended effect. Training accuracy is measured on deliberately harder, distorted inputs, so its drop is a cost that was paid for the generalisation gain.',
      },
      {
        id: 'CV-004-q4',
        type: 'debug',
        language: 'python',
        concept: 'transform placement',
        prompt: 'A team finds their validation accuracy fluctuates by three points between epochs. What is wrong?',
        code: 'train_ds = ImageFolder("data/train", transform=train_tf)\nval_ds = ImageFolder("data/val", transform=train_tf)',
        options: [
          'The validation dataset is using the random training transform instead of the deterministic eval transform',
          'The batch size is too small for validation',
          'shuffle should be True for the validation loader',
          'ImageFolder cannot be used for validation data',
        ],
        answerIndex: 0,
        explanation:
          'Both datasets were given train_tf, so validation images are randomly cropped, flipped and jittered on every epoch. The metric then measures a different, harder dataset each time, which explains both the fluctuation and its systematic pessimism.',
      },
      {
        id: 'CV-004-q5',
        type: 'match',
        concept: 'transform families',
        prompt: 'Match each transform to its family and to what must be updated alongside the image.',
        pairs: [
          { left: 'RandomHorizontalFlip', right: 'Geometric — boxes and masks must be flipped with it' },
          { left: 'ColorJitter', right: 'Photometric — targets are untouched' },
          { left: 'RandomResizedCrop', right: 'Geometric — boxes may be clipped or dropped entirely' },
          { left: 'GaussianNoise', right: 'Photometric — models sensor quality, targets unchanged' },
        ],
        explanation:
          'Geometric transforms move pixels, so any target expressed in pixel coordinates must move identically. Photometric transforms change values only, which is why they are safe to apply to the image alone in a detection pipeline.',
      },
      {
        id: 'CV-004-q6',
        type: 'explain',
        concept: 'invariance as an assumption',
        prompt:
          'Explain why choosing an augmentation policy is a modelling decision about the task rather than a hyperparameter to sweep.',
        rubric: [
          'States that each transform asserts an invariance of the true labelling function',
          'Gives a concrete example where the assertion is false',
          'Explains the consequence: label noise that caps achievable accuracy',
        ],
        sampleAnswer:
          'Adding a transform to the policy is a claim that the correct answer does not change when you apply it. For cats and horizontal flip that claim is true, so the model is being told something correct about the world and learns faster. For road signs it is false, because a mirrored turn-left sign is a turn-right sign, and the training set now contains images whose stated label contradicts their content. No amount of capacity or training time resolves a contradiction, so accuracy plateaus below what the data supports and the train-validation gap stays deceptively small. You cannot discover this by sweeping a strength parameter, because the problem is not the amount of the transform but its validity, which only knowledge of the labelling function can settle.',
        explanation:
          'The examinable idea is that augmentation encodes prior knowledge about invariances, so a wrong choice injects label noise rather than merely being suboptimal.',
      },
    ],

    flashcards: [
      { front: 'What makes a transform label-preserving?', back: 'The correct answer is unchanged by it. Flipping a cat is fine; flipping a 6, text or a directional road sign is not.' },
      { front: 'Which splits get augmented?', back: 'Training only. Validation and test use the deterministic eval transform, so the metric measures real data.' },
      { front: 'Geometric versus photometric', back: 'Geometric moves pixels, so boxes and masks must move too. Photometric changes values only and leaves targets alone.' },
      { front: 'Why does training accuracy drop when augmentation is added?', back: 'The model is scored on harder distorted inputs. Only validation accuracy measures what you care about.' },
      { front: 'What does mixup do?', back: 'Blends two images and their labels with the same weight lambda, regularising the decision boundary and improving calibration.' },
      { front: 'Where should random parameters be sampled?', back: 'Inside __getitem__, per image, per epoch — so every sample is transformed independently and never cached.' },
    ],

    challenge: {
      title: 'Audit and improve an augmentation policy',
      brief:
        'Take a dataset of your choice and a baseline policy of RandomResizedCrop plus RandomHorizontalFlip plus ColorJitter. Write code that renders a 4x8 grid of augmented samples with their labels, then label twenty of them yourself without seeing the ground truth and measure your own accuracy. Use that result to justify keeping, weakening or removing each transform, then train two short runs — baseline policy and revised policy — and report train and validation curves for both.',
      language: 'python',
      acceptanceCriteria: [
        'Renders a grid of augmented samples with labels for visual inspection',
        'Includes a written judgement on label preservation for every transform in the policy',
        'Compares train and validation curves for baseline and revised policies, not just final numbers',
        'The evaluation transform is identical across both runs',
        'States one transform that was added because it matches a real failure mode of the data',
      ],
      starterCode: 'import matplotlib.pyplot as plt\nimport torch\nfrom torchvision import transforms\nfrom torchvision.utils import make_grid\n\n\ndef show_augmented(dataset, n=32):\n    samples = [dataset[i % len(dataset)][0] for i in range(n)]\n',
    },

    teachingPrompt: {
      prompt:
        'A classmate has a small dataset and a model that scores 99 per cent on training data and 72 per cent on validation. Teach them what augmentation is, why it helps here, and what they must be careful about.',
      mustCover: [
        'Augmentation applies random label-preserving changes to training images on every epoch',
        'It works because it removes the nuisance features a model would otherwise memorise',
        'A transform must never change the correct answer, and whether it does depends on the dataset',
        'Only the training split is augmented; validation stays untouched so it measures reality',
      ],
      bonusSignals: ['mentions that training accuracy is expected to fall', 'names a transform that is unsafe for a specific dataset', 'mentions transforming boxes and masks alongside the image'],
      sampleExplanation:
        'A 27-point gap between training and validation means the model has memorised the specific photographs rather than learned the categories, which happens when there are far more parameters than examples. Augmentation attacks that directly: every time an image is loaded for training, the code makes a small random change first — mirrors it, crops a different region, brightens it a little — so the exact pixel array almost never repeats. Memorising stops paying off, and the only thing that reliably reduces the loss across all those variants is the feature that actually defines the class. Two cautions. The change must never alter the right answer: mirroring a cat is fine, mirroring a handwritten 6 or a turn-left sign is not, and if you get that wrong you are training on labels that contradict the pixels. And augmentation is for training only — leave validation alone, because it is your one honest measurement. Expect training accuracy to fall when you switch this on; that is the price, and the validation number is the one to watch.',
    },
  },

  {
    id: 'CV-005',
    domain: 'CV',
    module: 'Convolution in Practice',
    topic: 'Filters and edges',
    title: 'Convolution Filters and Edge Detection',
    slug: 'convolution-filters-edge-detection',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['CV-001', 'CV-002'],
    related: ['CV-001', 'CV-002', 'CV-003'],
    tags: ['convolution', 'kernel', 'sobel', 'laplacian', 'blur', 'edge-detection', 'cross-correlation'],

    learningObjectives: [
      'Slide a 3x3 kernel over a patch and compute the output value by hand',
      'Distinguish true convolution from cross-correlation and explain why deep learning libraries implement the latter',
      'Explain what Sobel, Laplacian and box or Gaussian blur kernels do and why their weights have the signs they do',
      'Compute output spatial size from input size, kernel size, padding and stride',
      'Explain the central shift: CNNs learn kernel weights rather than having them hand-designed',
    ],

    terminology: [
      {
        term: 'Kernel (filter)',
        definition:
          'A small grid of weights, usually 3x3 or 5x5, that is slid across the image. At each position the overlapping pixels are multiplied by the weights and summed to produce one output value.',
        simple: 'A tiny grid of numbers you slide over the picture, multiplying and adding as you go.',
      },
      {
        term: 'Cross-correlation',
        definition:
          'The sliding weighted sum without flipping the kernel. This is what cv2.filter2D, scipy.signal.correlate2d and every deep learning convolution layer actually compute.',
        simple: 'Sliding the little grid over the picture exactly as written.',
      },
      {
        term: 'Convolution (strict)',
        definition:
          'The same operation with the kernel rotated by 180 degrees first. The flip makes the operation commutative and associative, which matters for signal-processing theory and not at all for learned weights.',
        simple: 'The same thing, but the little grid is turned upside down first.',
      },
      {
        term: 'Feature map',
        definition:
          'The output grid produced by applying one kernel across the whole input. A layer with 64 kernels produces 64 feature maps, which become the channel axis of the next layer input.',
        simple: 'The picture of responses you get after sliding one filter everywhere.',
      },
      {
        term: 'Padding and stride',
        definition:
          'Padding adds a border of pixels, usually zeros, so the output keeps its size and the edges are not undersampled. Stride is the step between sampling positions; a stride of 2 halves the output resolution.',
        simple: 'Padding is a border so the edges get a fair turn; stride is how far you jump each time.',
      },
      {
        term: 'Gradient magnitude',
        definition:
          'The length of the vector of horizontal and vertical derivatives at a pixel, sqrt(Gx^2 + Gy^2). It is large where intensity changes rapidly, which is the operational definition of an edge.',
        simple: 'How fast the brightness is changing at that spot, ignoring which direction.',
      },
    ],

    simpleExplanation:
      "Put a small grid of numbers — say three by three — on top of the image so it covers nine pixels. Multiply each pixel by the number sitting on it, add up the nine products, and write the answer into a new image at the position of the centre. Then shift the little grid one pixel to the right and do it again, and keep going until you have covered the whole picture. That is a convolution, and everything from blurring to sharpening to finding edges is just a different choice of those nine numbers. If all nine are one ninth, you are averaging the neighbourhood and the picture gets blurry. If the left column is negative and the right column is positive, the sum is near zero wherever the brightness is flat and large wherever the left side is darker than the right — which is precisely what a vertical edge is. For forty years engineers designed those numbers by hand. The breakthrough behind every modern vision system is simple to state: stop designing them, make them parameters, and let gradient descent discover which filters are worth having.",

    whyItExists:
      'Individual pixel values carry almost no information about content, because what identifies an object is local structure: edges, corners, textures, repeated patterns. Convolution is the operation that measures local structure at every position at once, with the same small set of weights reused everywhere, so it captures the two facts that matter about images — that useful features are local, and that a feature means the same thing wherever it appears.',

    analogy: {
      scenario:
        'Imagine reading a long document through a small cardboard window that shows only three words at a time, with a scoring card telling you how much each of the three positions counts. You slide the window along, compute a score at every position, and write the scores in the margin. One scoring card gives a high score wherever a sentence changes topic; another gives a high score wherever a name appears. The document is unchanged — you have produced a new strip of numbers describing where something of interest happens.',
      mapping: [
        { from: 'The small cardboard window', to: 'The kernel footprint — the receptive field of one output value' },
        { from: 'The scoring card of weights', to: 'The kernel weights themselves' },
        { from: 'Sliding the window along the page', to: 'Translating the kernel across every spatial position' },
        { from: 'Using the same card at every position', to: 'Weight sharing, which makes a feature mean the same thing everywhere' },
        { from: 'The strip of scores in the margin', to: 'The output feature map' },
        { from: 'Owning several scoring cards', to: 'A layer with many kernels, producing many feature maps' },
      ],
      bridge:
        'The essential move is that a scoring card is not a description of the document, it is a detector for one pattern, and running many cards over the same page gives you a profile of what kinds of structure occur where. A convolution layer with 64 kernels is 64 such detectors applied everywhere. The step that turns this into learning is refusing to design the cards: initialise them randomly, measure how badly the final answer comes out, and adjust the weights in the direction that reduces the error — which is exactly what backpropagation does to convolution kernels.',
      limitations:
        'The reading analogy is one-dimensional and suggests each position is independent. Real convolution stacks: the second layer sees the outputs of the first, so its three-by-three window covers a much larger region of the original image, and by the tenth layer a single output value depends on most of the picture.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'Slide a kernel and watch the sum',
        caption: 'Change the weights and see which structures light up in the output.',
        widget: 'convolution-lab',
      },
      {
        kind: 'widget',
        title: 'Edge detection on a real photograph',
        caption: 'Compare Sobel horizontal, Sobel vertical, gradient magnitude and Laplacian on the same image.',
        widget: 'edge-detection-lab',
      },
      {
        kind: 'table',
        title: 'Classic kernels and what they measure',
        columns: ['Kernel', 'Weights (3x3, row-major)', 'Effect', 'Why the weights work'],
        rows: [
          ['Identity', '0 0 0 / 0 1 0 / 0 0 0', 'Copies the image unchanged', 'Only the centre pixel contributes, with weight one'],
          ['Box blur', '1/9 everywhere', 'Smooths, reduces noise, loses detail', 'A plain average of the neighbourhood; weights sum to 1 so brightness is preserved'],
          ['Gaussian blur', '1 2 1 / 2 4 2 / 1 2 1, divided by 16', 'Smooths with less ringing than a box', 'Nearer pixels count more, approximating a Gaussian falloff'],
          ['Sobel x', '-1 0 1 / -2 0 2 / -1 0 1', 'Responds to vertical edges', 'Right minus left, with the centre row weighted double for noise resistance'],
          ['Sobel y', '-1 -2 -1 / 0 0 0 / 1 2 1', 'Responds to horizontal edges', 'Bottom minus top, the transpose of Sobel x'],
          ['Laplacian', '0 1 0 / 1 -4 1 / 0 1 0', 'Responds to intensity curvature, both edges and blobs', 'Sum of neighbours minus four times the centre; zero on any flat or linear ramp'],
          ['Sharpen', '0 -1 0 / -1 5 -1 / 0 -1 0', 'Increases local contrast', 'Identity plus a Laplacian: the original with its own curvature added back'],
        ],
      },
      {
        kind: 'compare',
        title: 'Hand-designed filters versus learned filters',
        caption: 'The same arithmetic. A completely different research programme.',
        left: {
          heading: 'Classical computer vision',
          points: [
            'A human chooses the weights from theory: Sobel, Gabor, Haar, SIFT descriptors',
            'Interpretable, no training data needed, deterministic',
            'Each new task needs a new hand-designed feature pipeline',
            'Performance plateaued on ImageNet at roughly 74 per cent top-5 in 2011',
          ],
        },
        right: {
          heading: 'Convolutional networks',
          points: [
            'Weights are parameters initialised randomly and learned by gradient descent',
            'The first layer typically converges to edge and colour-blob detectors anyway',
            'Deeper layers learn features no one would have designed',
            'AlexNet reached 84.7 per cent top-5 in 2012 and the gap kept widening',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'The output-size formula',
        subject: 'H_out = floor((H_in + 2P - K) / S) + 1',
        annotations: [
          { part: 'H_in', note: 'Input height. The same formula applies independently to width.' },
          { part: '2P', note: 'Padding added on both sides. P = 1 with K = 3 keeps the size unchanged.' },
          { part: 'K', note: 'Kernel size. A 3x3 kernel with no padding loses one pixel at each edge.' },
          { part: 'S', note: 'Stride. S = 2 approximately halves the output, which is how networks downsample.' },
          { part: 'floor(...) + 1', note: 'Count the valid positions: the last partial window is simply not sampled.' },
        ],
      },
    ],

    formalDefinition:
      'For a single-channel input I and kernel K of size (2a+1) x (2b+1), the cross-correlation at position (i, j) is S(i, j) = sum over u in [-a, a], v in [-b, b] of I(i+u, j+v) K(a+u, b+v). True convolution flips the kernel in both axes before this sum. A convolutional layer generalises it to multiple channels: each of the C_out kernels has shape (C_in, K, K), is correlated across all input channels and summed, and a per-kernel bias is added, giving an output tensor of shape (N, C_out, H_out, W_out) with spatial dimensions floor((H + 2P - K)/S) + 1.',

    math: {
      intuition:
        'Every kernel answers one question about a neighbourhood, and the answer is a dot product between the kernel weights and the pixels underneath. Blur kernels have all-positive weights that sum to one, so they answer what is the average brightness here. Derivative kernels have weights summing to zero, so they answer how fast is brightness changing here — and summing to zero is exactly why they output nothing on a flat region, which is what makes edges stand out.',
      formulas: [
        {
          latex: 'S(i,j) = \\sum_{u=-a}^{a} \\sum_{v=-b}^{b} I(i+u,\\, j+v)\\, K(a+u,\\, b+v)',
          name: 'Cross-correlation (what libraries call convolution)',
          meaning:
            'The output at one position is the sum of products between each kernel weight and the pixel beneath it. Note the plus signs in the index of I: the kernel is used as written, not flipped.',
          variables: [
            { symbol: 'I', meaning: 'The input image, indexed by row and column' },
            { symbol: 'K', meaning: 'The kernel of weights, size (2a+1) x (2b+1)' },
            { symbol: 'i, j', meaning: 'The output position, corresponding to the kernel centre' },
            { symbol: 'u, v', meaning: 'Offsets within the kernel footprint' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '(I * K)(i,j) = \\sum_{u}\\sum_{v} I(i-u,\\, j-v)\\, K(u,v)',
          name: 'True convolution',
          meaning:
            'The textbook operation, with minus signs that amount to rotating the kernel by 180 degrees. It is commutative and associative, which matters for Fourier arguments; for learned weights the flip is absorbed into the parameters and is therefore irrelevant.',
          variables: [
            { symbol: '*', meaning: 'The convolution operator' },
            { symbol: 'I(i-u, j-v)', meaning: 'The input sampled in reversed order, which is the flip' },
          ],
        },
        {
          latex: 'G_x = \\begin{bmatrix} -1 & 0 & 1 \\\\ -2 & 0 & 2 \\\\ -1 & 0 & 1 \\end{bmatrix}, \\quad G_y = \\begin{bmatrix} -1 & -2 & -1 \\\\ 0 & 0 & 0 \\\\ 1 & 2 & 1 \\end{bmatrix}',
          name: 'Sobel operators',
          meaning:
            'Separable approximations to the horizontal and vertical partial derivatives. Each is a difference of two sides combined with a [1 2 1] smoothing along the perpendicular axis, which is why Sobel is much less noise-sensitive than a bare difference.',
          variables: [
            { symbol: 'G_x', meaning: 'Kernel whose response is large at vertical edges (horizontal change)' },
            { symbol: 'G_y', meaning: 'Kernel whose response is large at horizontal edges (vertical change)' },
          ],
        },
        {
          latex: 'M = \\sqrt{G_x^2 + G_y^2}, \\qquad \\theta = \\operatorname{atan2}(G_y,\\, G_x)',
          name: 'Gradient magnitude and orientation',
          meaning:
            'Combining the two directional responses gives edge strength independent of direction, and the angle of the strongest change. Canny edge detection is built on exactly these two quantities.',
          variables: [
            { symbol: 'M', meaning: 'Edge strength at the pixel' },
            { symbol: '\\theta', meaning: 'Edge orientation in radians, perpendicular to the edge itself' },
          ],
        },
        {
          latex: 'H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} + 2P - K}{S} \\right\\rfloor + 1',
          name: 'Output spatial size',
          meaning:
            'The arithmetic that decides whether your layers line up. With K = 3, P = 1, S = 1 the size is preserved exactly; with S = 2 it halves, which is the standard downsampling step in a CNN.',
          variables: [
            { symbol: 'H_in', meaning: 'Input height (or width, computed separately)' },
            { symbol: 'P', meaning: 'Padding applied to each side' },
            { symbol: 'K', meaning: 'Kernel size along that axis' },
            { symbol: 'S', meaning: 'Stride along that axis' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Ask why derivative kernels must have weights summing to zero. Apply an arbitrary kernel K to a perfectly flat patch where every pixel equals c.',
        'The output is sum over u,v of c times K(u,v) = c times sum of K.',
        'If the weights sum to zero, the output is zero regardless of c: the filter is blind to absolute brightness and responds only to variation. That is the definition of a derivative filter.',
        'If instead the weights sum to one, a flat patch of value c returns c: brightness is preserved, which is what a blur must do.',
        'Check Sobel x: (-1 + 0 + 1) + (-2 + 0 + 2) + (-1 + 0 + 1) = 0, so it vanishes on flat regions. Check box blur: nine times one ninth = 1, so brightness survives.',
        'This single observation explains why a blur kernel that does not sum to one darkens or brightens an image, a bug that appears the first time anyone builds a kernel by hand.',
      ],
    },

    workedExample: {
      title: 'Computing a 3x3 Sobel response by hand',
      setup:
        'Take a 3x3 patch straddling a vertical edge in a grayscale image: the left column is dark at 10, the middle column is a transition at 100, and the right column is bright at 200. We will apply Sobel x, then Sobel y, then combine them, using nothing but multiplication and addition. The patch, row by row, is [10, 100, 200] / [10, 100, 200] / [10, 100, 200].',
      steps: [
        {
          label: 'Write the kernel over the patch',
          detail:
            'Sobel x is [-1, 0, 1] / [-2, 0, 2] / [-1, 0, 1]. Each kernel weight sits on the pixel in the same position, so -1 sits on 10, 0 sits on 100, 1 sits on 200 in the top row, and so on.',
        },
        {
          label: 'Multiply the top row',
          detail: '(-1)(10) + (0)(100) + (1)(200) = -10 + 0 + 200 = 190.',
          latex: '(-1)(10) + (0)(100) + (1)(200) = 190',
        },
        {
          label: 'Multiply the middle row',
          detail: 'The centre row carries double weight: (-2)(10) + (0)(100) + (2)(200) = -20 + 0 + 400 = 380.',
          latex: '(-2)(10) + (0)(100) + (2)(200) = 380',
        },
        {
          label: 'Multiply the bottom row',
          detail: 'Identical to the top row by symmetry: (-1)(10) + (0)(100) + (1)(200) = 190.',
          latex: '(-1)(10) + (0)(100) + (1)(200) = 190',
        },
        {
          label: 'Sum the three rows for Gx',
          detail: '190 + 380 + 190 = 760. A large positive value, meaning brightness increases strongly from left to right at this pixel.',
          latex: 'G_x = 190 + 380 + 190 = 760',
        },
        {
          label: 'Now apply Sobel y to the same patch',
          detail:
            'Sobel y is [-1, -2, -1] / [0, 0, 0] / [1, 2, 1]. Top row: (-1)(10) + (-2)(100) + (-1)(200) = -410. Middle row: zero by construction. Bottom row: (1)(10) + (2)(100) + (1)(200) = 410. Total: -410 + 0 + 410 = 0.',
          latex: 'G_y = -410 + 0 + 410 = 0',
        },
        {
          label: 'Combine into magnitude and orientation',
          detail:
            'M = sqrt(760^2 + 0^2) = 760. Theta = atan2(0, 760) = 0 radians, meaning the direction of greatest change is purely horizontal, which is correct for a vertical edge.',
          latex: 'M = \\sqrt{760^2 + 0^2} = 760, \\quad \\theta = 0',
        },
        {
          label: 'Sanity-check on a flat patch',
          detail:
            'Replace every pixel with 100. Gx = (-1)(100) + (1)(100) + (-2)(100) + (2)(100) + (-1)(100) + (1)(100) = 0, because the kernel weights sum to zero. No edge, no response.',
          latex: 'G_x^{\\text{flat}} = 100 \\sum_{u,v} K(u,v) = 100 \\times 0 = 0',
        },
      ],
      conclusion:
        'One number, 760, summarises that this position sits on a strong left-to-right brightness increase, while Gy of zero says there is no vertical change at all. Two observations generalise: the response scales with the contrast of the edge, so Sobel outputs routinely exceed 255 and must be stored in a signed wider type such as CV_64F rather than uint8; and the whole operation was eighteen multiplications and sixteen additions, repeated once per pixel. A 224x224 image with a 3x3 kernel is about 450,000 multiply-accumulates per channel, which is why this work belongs on a GPU once channels number in the hundreds.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Convolution written out in numpy, then checked against OpenCV',
        runnable: true,
        code: `import cv2
import numpy as np


def correlate2d(img, kernel):
    """Cross-correlation with zero padding, exactly as cv2.filter2D computes it."""
    kh, kw = kernel.shape
    ph, pw = kh // 2, kw // 2
    padded = np.pad(img.astype(np.float64), ((ph, ph), (pw, pw)), mode="constant")
    out = np.zeros_like(img, dtype=np.float64)
    for i in range(img.shape[0]):
        for j in range(img.shape[1]):
            patch = padded[i:i + kh, j:j + kw]
            out[i, j] = float((patch * kernel).sum())
    return out


patch = np.array([[10, 100, 200],
                  [10, 100, 200],
                  [10, 100, 200]], dtype=np.float64)

sobel_x = np.array([[-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]], dtype=np.float64)

mine = correlate2d(patch, sobel_x)
theirs = cv2.filter2D(patch, ddepth=cv2.CV_64F, kernel=sobel_x,
                      borderType=cv2.BORDER_CONSTANT)

print("centre value, mine:  ", mine[1, 1])
print("centre value, OpenCV:", theirs[1, 1])
print("max difference:", np.abs(mine - theirs).max())`,
        output: `centre value, mine:   760.0
centre value, OpenCV: 760.0
max difference: 0.0`,
        explanation:
          'The loop is the definition, and it produces exactly the 760 computed by hand above. Two details are worth noticing. cv2.filter2D performs cross-correlation, not true convolution, which is why the kernel is used as written; to get strict convolution you would pass cv2.flip(kernel, -1). And ddepth=cv2.CV_64F matters: leaving it as -1 keeps the uint8 input depth, so 760 saturates to 255 and every strong edge collapses to the same value.',
      },
      {
        language: 'python',
        title: 'Sobel, Laplacian and blur on a real image',
        runnable: true,
        code: `import cv2
import numpy as np

gray = cv2.imread("street.jpg", cv2.IMREAD_GRAYSCALE)
print("input:", gray.shape, gray.dtype)

blurred = cv2.GaussianBlur(gray, (5, 5), sigmaX=1.4)   # denoise first, always

gx = cv2.Sobel(blurred, cv2.CV_64F, dx=1, dy=0, ksize=3)
gy = cv2.Sobel(blurred, cv2.CV_64F, dx=0, dy=1, ksize=3)
magnitude = np.sqrt(gx ** 2 + gy ** 2)

print("gx range:", round(gx.min(), 1), "to", round(gx.max(), 1))
print("magnitude range:", round(magnitude.min(), 1), "to", round(magnitude.max(), 1))

lap = cv2.Laplacian(blurred, cv2.CV_64F, ksize=3)
print("laplacian mean (near zero on flat regions):", round(float(lap.mean()), 3))

# Only now convert back to a viewable 8-bit image
viewable = cv2.convertScaleAbs(magnitude)
cv2.imwrite("edges.png", viewable)

# Canny wraps this whole pipeline: blur, gradients, thin, threshold with hysteresis
canny = cv2.Canny(gray, threshold1=80, threshold2=160)
print("canny is binary:", np.unique(canny))`,
        output: `input: (720, 1280) uint8
gx range: -948.0 to 955.0
magnitude range: 0.0 to 1082.7
laplacian mean (near zero on flat regions): -0.014
canny is binary: [  0 255]`,
        explanation:
          'Three practical points. Blurring before differentiating is not optional: derivatives amplify high frequencies, so noise that was invisible becomes the dominant signal in the output. The gradient range reaches beyond 1000, which is why CV_64F is used and the conversion to uint8 happens only at the end. And Canny is not a different idea — it is Sobel gradients plus non-maximum suppression to thin the edges plus two-level hysteresis thresholding to link them, which is why its output is binary rather than a magnitude.',
      },
      {
        language: 'python',
        title: 'The same kernel as a learnable PyTorch layer',
        runnable: true,
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F

patch = torch.tensor([[10.0, 100.0, 200.0],
                      [10.0, 100.0, 200.0],
                      [10.0, 100.0, 200.0]]).view(1, 1, 3, 3)

sobel_x = torch.tensor([[-1.0, 0.0, 1.0],
                        [-2.0, 0.0, 2.0],
                        [-1.0, 0.0, 1.0]]).view(1, 1, 3, 3)

out = F.conv2d(patch, sobel_x, padding=1)
print("centre response:", float(out[0, 0, 1, 1]))     # the 760 computed by hand

# A real layer: same operation, but the weights are parameters
conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, stride=1, padding=1)
x = torch.randn(8, 3, 32, 32)
y = conv(x)

print("layer output:", tuple(y.shape))
print("weight shape:", tuple(conv.weight.shape), "bias:", tuple(conv.bias.shape))
print("learnable parameters:", conv.weight.numel() + conv.bias.numel())
print("requires_grad:", conv.weight.requires_grad)`,
        output: `centre response: 760.0
layer output: (8, 64, 32, 32)
weight shape: (64, 3, 3, 3) bias: (64,)
learnable parameters: 1792
requires_grad: True
`,
        explanation:
          'The first half proves that F.conv2d computes precisely what you computed by hand, Sobel included. The second half is the conceptual pivot: the layer holds 64 kernels of shape (3, 3, 3) — one 3x3 grid per input channel per output channel — and every one of those 1,728 weights plus 64 biases is a parameter with requires_grad set. Nobody chose them. Train the network and the first layer reliably converges to something that looks like oriented edge and colour-opponent detectors, because those are the filters that reduce the loss.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Document scanning and barcode readers',
        usage:
          'Classical gradient-based edge detection is still the fastest way to find the four corners of a page or the bars of a barcode on a low-power device. No training data is needed, and the maths is verifiable, which matters for certification.',
      },
      {
        context: 'The first layer of any pretrained CNN',
        usage:
          'Visualising the 64 learned 7x7 filters of a trained ResNet shows oriented edge detectors and colour-opponent blobs that look strikingly like Gabor and Sobel filters, discovered rather than designed. This is the standard demonstration that learning rediscovers classical features.',
      },
      {
        context: 'Autofocus and image quality scoring',
        usage:
          'The variance of the Laplacian is a standard sharpness metric: a blurred image has little intensity curvature, so the variance collapses. Phone cameras and microscopy stages use it to choose the focal plane.',
      },
    ],

    projectConnections: [
      { tool: 'OpenCV', role: 'filter2D, Sobel, Laplacian, GaussianBlur and Canny implement these kernels with optimised, separable C++ code.' },
      { tool: 'PyTorch nn.Conv2d', role: 'The same arithmetic with learnable weights, batched over channels and images and dispatched to cuDNN.' },
      { tool: 'scipy.ndimage', role: 'convolve and correlate make the flip distinction explicit, which is useful when verifying an implementation.' },
      { tool: 'scikit-image', role: 'filters.sobel and feature.canny provide float-first implementations that avoid the uint8 saturation trap.' },
    ],

    commonMistakes: [
      {
        mistake: 'Storing gradient output in uint8',
        why: 'Sobel responses are signed and routinely exceed 1000 in magnitude. Writing them into an 8-bit array clips everything above 255 and discards every negative value, so half the edges disappear and the rest are flattened to a single brightness.',
        fix: 'Compute in cv2.CV_64F or float32, then convert for display only at the very end with cv2.convertScaleAbs or by normalising to 0–255.',
      },
      {
        mistake: 'Differentiating without blurring first',
        why: 'Derivative filters amplify high frequencies, and sensor noise is the highest frequency content present. The edge map becomes a field of speckle in which real edges are no longer the strongest response.',
        fix: 'Apply a Gaussian blur with a sigma matched to the noise scale first. This is why Canny begins with a blur, and why Laplacian of Gaussian exists as a single combined kernel.',
      },
      {
        mistake: 'Expecting a blur kernel whose weights do not sum to one to preserve brightness',
        why: 'A flat patch of value c returns c times the sum of the weights. A kernel of nine ones therefore multiplies the image by nine, saturating it to white.',
        fix: 'Normalise: divide the kernel by the sum of its entries. Derivative kernels are the deliberate opposite, summing to zero so flat regions return zero.',
      },
      {
        mistake: 'Believing deep learning convolution is true convolution',
        why: 'Every framework implements cross-correlation and calls it convolution. Someone porting a signal-processing formula, or comparing against scipy.signal.convolve2d, gets a kernel-flipped result and an apparent bug.',
        fix: 'Remember that for learned weights the flip is absorbed into the parameters and nothing changes. When it does matter — verifying an implementation, or using a designed asymmetric kernel — flip explicitly with cv2.flip(kernel, -1) or use scipy.signal.correlate2d.',
      },
      {
        mistake: 'Getting the output size wrong when stacking layers',
        why: 'A 3x3 convolution with no padding loses one pixel on each side, so after ten layers a 32x32 input is 12x12 and a later reshape into a fully connected layer fails with a confusing size mismatch.',
        fix: 'Use padding = (kernel_size - 1) // 2 for odd kernels to keep the size, and compute floor((H + 2P - K)/S) + 1 for each layer before writing the model.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between convolution and cross-correlation, and which do neural networks use?',
        answer:
          'True convolution flips the kernel by 180 degrees before the sliding weighted sum; cross-correlation does not. Neural networks — PyTorch, TensorFlow, cuDNN, and OpenCV filter2D — all implement cross-correlation while calling it convolution. It makes no difference to a learned layer, because if the optimal operation were the flipped one, gradient descent would simply learn the flipped weights; the two hypothesis classes are identical. The distinction matters in three places: reproducing a signal-processing formula, comparing against scipy.signal.convolve2d, and using a hand-designed asymmetric kernel where the orientation of the response would silently reverse. The flip exists in the mathematical definition because it makes convolution commutative and makes the convolution theorem with the Fourier transform hold cleanly.',
        followUp:
          'A strong answer observes that for symmetric kernels such as Gaussian blur and the Laplacian, the two operations are numerically identical, which is why the confusion so rarely surfaces.',
      },
      {
        level: 'intermediate',
        question: 'An input is 224x224. What is the output size after a 3x3 convolution with stride 2 and padding 1? How many parameters does that layer hold if it goes from 3 to 64 channels?',
        answer:
          'Spatial size is floor((224 + 2 - 3)/2) + 1 = floor(223/2) + 1 = 111 + 1 = 112, so the output is 112x112. Parameters: each of the 64 output kernels spans all 3 input channels at 3x3, giving 64 x 3 x 3 x 3 = 1,728 weights, plus 64 biases, for 1,792 in total. The point worth making is how small that is — a fully connected layer mapping 224x224x3 to even a single 112x112 output would need billions of weights. Weight sharing across positions is what makes convolution tractable, and it also builds in translation equivariance, since the same filter is applied everywhere.',
        followUp:
          'Strong candidates add that the compute cost, unlike the parameter count, does scale with resolution: about 112 x 112 x 1,728 multiply-accumulates for this layer, around 21.7 million per image.',
      },
      {
        level: 'advanced',
        question: 'Why did learned filters replace hand-designed ones, given that the first layer of a trained CNN looks like a bank of edge detectors anyway?',
        answer:
          'The first layer looking like Gabor and Sobel filters is a validation of the classical intuition, not an argument against learning, and it is also the least interesting layer. The value of learning appears deeper: layer four of a trained network responds to textures and part fragments, and layer thirty to object parts, and nobody has ever hand-designed a useful bank of those because the space of candidates is far too large and the right features depend on the dataset. There is a second, structural argument: a hand-designed pipeline optimises each stage in isolation against a proxy objective, whereas a learned stack optimises every stage jointly against the actual task loss, so earlier layers adapt to what later layers need. The empirical record settles it — the ImageNet top-5 error fell from about 26 per cent with engineered features to 16 per cent with AlexNet in a single year, and classical pipelines never caught up.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Apply the kernel [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] by hand to the 3x3 patch [[100, 100, 100], [100, 150, 100], [100, 100, 100]]. What is the centre output, and what does the filter do?',
        hint: 'Only five weights are non-zero. Check what the weights sum to.',
        solution:
          'Centre: 5 x 150 = 750. Four neighbours: -1 x 100 four times = -400. Total = 750 - 400 = 350. The original centre was 150, so the filter pushed it to 350, more than doubling its contrast against the surround. The weights sum to 1, so a flat patch is unchanged; the kernel is the identity plus a negative Laplacian, which is the standard sharpening construction. Note that 350 exceeds 255 and would clip if stored as uint8, which is precisely how over-sharpening produces blown-out white haloes.',
      },
      {
        prompt:
          'Design a 3x3 kernel that detects diagonal edges running from bottom-left to top-right, and verify it returns zero on a flat patch.',
        hint: 'You want positive weights on one side of that diagonal and negative on the other, summing to zero.',
        solution:
          '[[0, 1, 2], [-1, 0, 1], [-2, -1, 0]] works. The weights sum to 0 + 1 + 2 - 1 + 0 + 1 - 2 - 1 + 0 = 0, so on any flat patch of value c the output is c x 0 = 0. It measures the difference between the top-right triangle and the bottom-left triangle, so it responds maximally to an edge running from bottom-left to top-right and returns zero on a perpendicular edge. This is the Sobel construction rotated 45 degrees, and it is exactly one of the eight Kirsch compass kernels.',
      },
      {
        prompt:
          'A network takes 128x128 input and applies four consecutive 3x3 convolutions with stride 2 and padding 1. What is the final spatial size, and what is the receptive field of one output value in input pixels?',
        hint: 'Apply the size formula four times. For the receptive field, work backwards: each stride-2 layer doubles the step between the positions a kernel covers.',
        solution:
          'Sizes: 128 to 64 to 32 to 16 to 8, since each layer computes floor((H + 2 - 3)/2) + 1 = H/2 for even H. The receptive field grows as r_out = r_in + (K - 1) x jump, with the jump doubling each layer: after layer one r = 3 with jump 2; layer two r = 3 + 2x2 = 7, jump 4; layer three r = 7 + 2x4 = 15, jump 8; layer four r = 15 + 2x8 = 31. So one value in the 8x8 output sees a 31x31 region of the input. This is the mechanism by which stacked small kernels reach a large context without ever using a large kernel.',
      },
    ],

    quiz: [
      {
        id: 'CV-005-q1',
        type: 'numeric',
        concept: 'convolution by hand',
        prompt:
          'Apply Sobel x, [[-1,0,1],[-2,0,2],[-1,0,1]], to the patch [[10,100,200],[10,100,200],[10,100,200]]. What is the centre output?',
        answer: 760,
        tolerance: 0,
        explanation:
          'Rows give (-1)(10)+(1)(200) = 190, (-2)(10)+(2)(200) = 380 and 190 again. The total is 760: a strong positive response because brightness increases sharply from left to right, which is what a vertical edge is.',
      },
      {
        id: 'CV-005-q2',
        type: 'mcq',
        concept: 'kernel weights',
        prompt: 'Why do derivative kernels such as Sobel have weights that sum to zero?',
        options: [
          'So that a region of constant brightness produces no response',
          'So that the output always fits in uint8',
          'So that the kernel is symmetric and can be flipped safely',
          'So that the filter runs faster on a GPU',
        ],
        answerIndex: 0,
        explanation:
          'On a flat patch of value c the output is c times the sum of the weights. Summing to zero makes that output zero regardless of brightness, so the filter measures change rather than level. Blur kernels sum to one for the opposite reason: they must preserve brightness.',
      },
      {
        id: 'CV-005-q3',
        type: 'numeric',
        concept: 'output size arithmetic',
        prompt:
          'An input is 64x64. After a 5x5 convolution with stride 1 and padding 0, what is the output height?',
        answer: 60,
        tolerance: 0,
        unit: 'pixels',
        explanation:
          'floor((64 + 0 - 5)/1) + 1 = 59 + 1 = 60. A 5x5 kernel with no padding loses two pixels at each edge, so the size drops by four in each dimension.',
      },
      {
        id: 'CV-005-q4',
        type: 'truefalse',
        concept: 'correlation versus convolution',
        prompt: 'PyTorch nn.Conv2d computes true mathematical convolution, with the kernel flipped by 180 degrees.',
        answer: false,
        explanation:
          'It computes cross-correlation and calls it convolution, as do TensorFlow, cuDNN and cv2.filter2D. For learned weights the distinction is irrelevant, since the flipped kernel is equally learnable, but it matters when reproducing a signal-processing formula.',
      },
      {
        id: 'CV-005-q5',
        type: 'code-output',
        language: 'python',
        concept: 'layer shapes and parameters',
        prompt: 'What does this print?',
        code: 'import torch, torch.nn as nn\nconv = nn.Conv2d(3, 16, kernel_size=3, stride=2, padding=1)\nx = torch.randn(4, 3, 32, 32)\nprint(tuple(conv(x).shape), conv.weight.numel())',
        options: [
          '(4, 16, 16, 16) 432',
          '(4, 16, 32, 32) 432',
          '(4, 16, 16, 16) 144',
          '(4, 3, 16, 16) 432',
        ],
        answerIndex: 0,
        explanation:
          'Spatial size is floor((32 + 2 - 3)/2) + 1 = 16, channels become 16, and the batch is unchanged. Weights number 16 x 3 x 3 x 3 = 432, since each output kernel spans all three input channels; the 16 biases are counted separately.',
      },
      {
        id: 'CV-005-q6',
        type: 'order',
        concept: 'Canny pipeline',
        prompt: 'Put the stages of Canny edge detection in the order they run.',
        items: [
          'Gaussian blur to suppress noise',
          'Compute Sobel gradients in x and y',
          'Compute gradient magnitude and orientation',
          'Non-maximum suppression to thin edges to one pixel',
          'Hysteresis thresholding with a high and a low threshold',
        ],
        explanation:
          'Canny is not a new operator but a pipeline built on Sobel: blur first because differentiation amplifies noise, then gradients, then thinning, then linking weak edges that touch strong ones. That is why its output is binary rather than a magnitude map.',
      },
      {
        id: 'CV-005-q7',
        type: 'explain',
        concept: 'learned versus designed filters',
        prompt:
          'Explain what changed conceptually when convolution kernels stopped being designed and started being learned.',
        rubric: [
          'States that the arithmetic of convolution is identical in both cases',
          'States that kernel weights became parameters optimised against the task loss',
          'Explains why this scales to features nobody could design by hand',
        ],
        sampleAnswer:
          'The operation did not change at all: a small grid of weights is still slid across the image, multiplied and summed. What changed is where the weights come from. In classical vision a person chose them from theory, so Sobel measures brightness change because someone reasoned that it should. In a convolutional network the weights are initialised randomly and adjusted by gradient descent to reduce the final task loss, so the network discovers which local patterns are worth measuring for this particular problem. The first layer usually rediscovers edge detectors, which is reassuring, but the real gain is deeper: layer thirty responds to object parts that no one has a formula for, and every layer is tuned jointly with the layers that consume it rather than optimised in isolation against a proxy.',
        explanation:
          'The core idea is that learning replaces the source of the weights, not the operation, which is why understanding hand-designed kernels transfers directly to understanding CNNs.',
      },
    ],

    flashcards: [
      { front: 'What does a convolution compute at one position?', back: 'The sum of products between kernel weights and the pixels beneath them — a dot product over a local patch.' },
      { front: 'Sobel x weights?', back: '[[-1,0,1],[-2,0,2],[-1,0,1]] — right minus left, with the centre row doubled. Responds to vertical edges.' },
      { front: 'Why must blur kernels sum to 1 and derivative kernels sum to 0?', back: 'A flat patch of value c returns c times the weight sum: 1 preserves brightness, 0 makes the filter blind to level and sensitive only to change.' },
      { front: 'Output size formula for a convolution?', back: 'floor((H + 2P - K)/S) + 1. With K=3, P=1, S=1 the size is preserved; S=2 halves it.' },
      { front: 'Do frameworks implement convolution or cross-correlation?', back: 'Cross-correlation, without the kernel flip. Irrelevant for learned weights, relevant when reproducing a designed filter.' },
      { front: 'Why blur before computing gradients?', back: 'Differentiation amplifies high frequencies, so sensor noise would dominate the edge map. Canny starts with a Gaussian for this reason.' },
      { front: 'What is the big idea behind CNNs?', back: 'Do not design the kernel weights — make them parameters and let gradient descent find the filters that reduce the task loss.' },
    ],

    challenge: {
      title: 'A filter bank from scratch',
      brief:
        'Implement cross-correlation yourself with numpy, supporting arbitrary odd kernels, a padding argument and a stride argument, and verify it against cv2.filter2D for stride 1. Then build a bank of six kernels — identity, box blur, Gaussian blur, Sobel x, Sobel y and Laplacian — apply them all to one image, and produce a labelled figure. Finish by computing the gradient magnitude and orientation, and reimplementing non-maximum suppression so that your edges are one pixel wide.',
      language: 'python',
      acceptanceCriteria: [
        'The implementation matches cv2.filter2D to within floating-point tolerance for stride 1',
        'Stride and padding arguments both work, verified against the output-size formula',
        'All six kernels are applied and displayed with correct intensity scaling rather than clipped uint8',
        'Gradient magnitude and orientation are computed from the two Sobel responses',
        'Non-maximum suppression produces edges that are one pixel wide, compared side by side against cv2.Canny',
      ],
      starterCode: 'import numpy as np\nimport cv2\n\n\ndef correlate2d(img, kernel, padding=1, stride=1):\n    """Cross-correlation. Returns float64 — never uint8."""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate what a convolution filter is, using a concrete 3x3 example they can follow on paper, and then explain what a convolutional network changed about the idea.',
      mustCover: [
        'A kernel is a small grid of weights slid over the image, multiplying and summing at every position',
        'Different weights compute different things: averaging blurs, differences find edges',
        'Derivative kernels sum to zero so flat regions produce no response',
        'CNNs make the kernel weights learnable parameters instead of hand-designed constants',
      ],
      bonusSignals: ['works through actual numbers', 'mentions the output size formula', 'mentions that the first layer of a trained CNN rediscovers edge detectors'],
      sampleExplanation:
        'Take a three-by-three grid of numbers and lay it on top of nine pixels. Multiply each pixel by the number on top of it, add the nine results, and that single number becomes the output at the centre position. Slide the grid one pixel across and repeat until you have covered the image. Everything follows from the choice of those nine numbers. Make them all one ninth and you are averaging the neighbourhood, so the picture blurs. Make the left column negative one and the right column positive one, and on a flat area the positives and negatives cancel to zero, while at a place where the left is dark and the right is bright you get a big number — that is edge detection, and a real Sobel filter doubles the middle row to resist noise. Try it on a patch with columns 10, 100, 200: the answer is 760. For decades people chose those numbers using theory. The idea behind convolutional networks is to stop choosing: start from random numbers, see how wrong the final prediction is, and nudge every weight in the direction that makes it less wrong. Do that a few million times and the network invents its own filters, and the surprise is that the first layer usually invents edge detectors anyway.',
    },
  },
