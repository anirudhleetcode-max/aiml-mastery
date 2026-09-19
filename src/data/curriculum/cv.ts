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

  {
    id: 'CV-006',
    domain: 'CV',
    module: 'Convolution in Practice',
    topic: 'The OpenCV toolkit',
    title: 'OpenCV Fundamentals',
    slug: 'opencv-fundamentals',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['CV-001', 'CV-005'],
    related: ['CV-001', 'CV-002', 'CV-003', 'CV-005'],
    tags: ['opencv', 'thresholding', 'morphology', 'contours', 'drawing', 'video', 'otsu'],

    learningObjectives: [
      'Read, write and display images and video frames with OpenCV, handling the failure modes correctly',
      'Convert colour spaces and threshold an image, including adaptive and Otsu thresholding',
      'Use erosion, dilation, opening and closing to clean up a binary mask',
      'Find, filter and measure contours, and draw annotations onto a frame',
      'Recognise the practical gotchas: BGR order, silent None returns, (x, y) versus (row, col), and in-place drawing',
    ],

    terminology: [
      {
        term: 'Binary threshold',
        definition:
          'A per-pixel rule producing a two-valued image: 255 where the input exceeds a threshold and 0 elsewhere. The basis of almost every classical segmentation pipeline.',
        simple: 'Turn every pixel into either white or black depending on whether it is brighter than a cut-off.',
      },
      {
        term: 'Otsu thresholding',
        definition:
          'An automatic method that searches every possible threshold and picks the one minimising the variance within the two resulting groups, equivalently maximising the variance between them.',
        simple: 'Let the computer pick the cut-off by finding the value that splits the histogram most cleanly.',
      },
      {
        term: 'Adaptive threshold',
        definition:
          'A threshold computed independently for each pixel from the mean or Gaussian-weighted mean of its local neighbourhood, which survives uneven illumination that defeats a single global value.',
        simple: 'A different cut-off in each region, so a shadow across the page does not ruin everything.',
      },
      {
        term: 'Morphological operation',
        definition:
          'A shape-based operation on a binary image defined by a structuring element: erosion takes the local minimum, dilation the local maximum, opening is erosion then dilation, closing is the reverse.',
        simple: 'Shrinking and growing white regions to remove specks or fill in holes.',
      },
      {
        term: 'Contour',
        definition:
          'An ordered list of boundary points around a connected white region of a binary image. OpenCV returns contours as arrays of (x, y) points, optionally with a hierarchy describing nesting.',
        simple: 'The outline traced around a blob, stored as a list of points.',
      },
      {
        term: 'Structuring element',
        definition:
          'The small binary shape — rectangle, ellipse or cross — that defines the neighbourhood a morphological operation examines. Its size controls how much is removed or filled.',
        simple: 'The little stamp shape used to shrink or grow regions.',
      },
    ],

    simpleExplanation:
      "OpenCV is a large box of tools for doing things to grids of numbers quickly. It can open a photograph or a video, change its colours, shrink it, blur it, and — the part that surprises people — perform a lot of genuinely useful vision without any machine learning at all. The classical pipeline looks like this. Turn the picture into a single grid by discarding colour, or keep only the colour range you care about. Turn that into a black-and-white mask where white means interesting. Tidy the mask by shrinking it a little to remove speckles, then growing it back to close small gaps. Trace the outlines of the remaining white blobs, throw away the ones that are too small or the wrong shape, and measure what is left: how many, how big, where. Then draw boxes and labels on a copy of the original so a human can check your work. This is still how counting, inspection and preprocessing tasks are solved in industry, because it is fast, needs no training data, and can be explained to an auditor.",

    whyItExists:
      'Before deep learning, and still today for a large class of controlled-environment problems, vision tasks were solved with fast deterministic operations on pixel grids. OpenCV packages those operations as optimised, hardware-accelerated C++ with bindings in Python, so that reading a frame, converting colour and finding blobs takes microseconds rather than a research project, and so that every pipeline in the field uses the same tested implementations.',

    analogy: {
      scenario:
        'Think of a darkroom technician preparing a print for a botanist who wants to count leaves. First they make a high-contrast copy where anything green becomes pure white and everything else pure black. The copy is speckled with dust, so they dab away the isolated specks, then slightly thicken what remains to close the small gaps left by leaf veins. Now they trace around each white shape with a pen, discard the tracings smaller than a thumbnail, and finally write a number beside each remaining outline on a clean print of the original.',
      mapping: [
        { from: 'The high-contrast copy', to: 'A binary mask from cv2.threshold or cv2.inRange' },
        { from: 'Dabbing away isolated specks', to: 'Morphological opening: erode then dilate' },
        { from: 'Thickening to close gaps', to: 'Morphological closing: dilate then erode' },
        { from: 'Tracing around each shape', to: 'cv2.findContours returning boundary point arrays' },
        { from: 'Discarding tracings below a size', to: 'Filtering contours by cv2.contourArea' },
        { from: 'Writing on a clean print, not the negative', to: 'Drawing on a copy, because OpenCV draws in place' },
      ],
      bridge:
        'Each darkroom step corresponds to a single OpenCV call, and the order is not arbitrary: you cannot trace outlines before you have a binary image, and cleaning before tracing is what stops you from counting dust as leaves. The analogy also explains the main limitation honestly — the technician can only separate leaves from background because green is distinctive and the lighting is controlled. Change the lighting or put a green book in the frame and the whole pipeline fails, which is exactly the boundary where learned models earn their cost.',
      limitations:
        'A darkroom print is produced once and inspected by a human. A real pipeline runs at thirty frames a second on footage nobody watches, so every threshold that was tuned by eye on one image becomes a silent failure mode on the thousandth.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The classical OpenCV pipeline',
        caption: 'Five stages, each one line of code, still the right answer for many controlled-environment tasks.',
        steps: [
          { label: 'Load and convert', detail: 'cv2.imread gives BGR uint8; convert to grayscale or HSV depending on what distinguishes the target.' },
          { label: 'Reduce noise', detail: 'GaussianBlur or medianBlur, so the threshold is not chasing sensor speckle.' },
          { label: 'Threshold to a binary mask', detail: 'threshold with Otsu, adaptiveThreshold for uneven light, or inRange for a colour band.' },
          { label: 'Clean with morphology', detail: 'Opening removes specks; closing fills pinholes. Structuring element size sets the scale.' },
          { label: 'Find and filter contours', detail: 'findContours, then discard by area, aspect ratio or solidity.' },
          { label: 'Measure and annotate', detail: 'boundingRect, moments for the centroid, then rectangle and putText on a copy of the original.' },
        ],
      },
      {
        kind: 'table',
        title: 'Thresholding methods',
        columns: ['Method', 'Call', 'Chooses the threshold', 'Use when'],
        rows: [
          ['Fixed global', 'cv2.threshold(img, 127, 255, cv2.THRESH_BINARY)', 'You do, by hand', 'Lighting is controlled and constant'],
          ['Otsu', 'cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)', 'Automatically, from the histogram', 'The histogram is clearly bimodal: object and background'],
          ['Adaptive mean', 'cv2.adaptiveThreshold(..., ADAPTIVE_THRESH_MEAN_C, ...)', 'Per pixel, from a local window mean', 'Illumination varies across the frame'],
          ['Adaptive Gaussian', 'cv2.adaptiveThreshold(..., ADAPTIVE_THRESH_GAUSSIAN_C, ...)', 'Per pixel, from a weighted local mean', 'Document scanning with shadows or a curved page'],
          ['Colour band', 'cv2.inRange(hsv, lower, upper)', 'You do, as an HSV box', 'The target is defined by colour rather than brightness'],
        ],
      },
      {
        kind: 'compare',
        title: 'Opening versus closing',
        caption: 'Both are an erosion and a dilation. The order is everything.',
        left: {
          heading: 'Opening — erode, then dilate',
          points: [
            'Removes small white specks and thin bridges between blobs',
            'Large regions survive at roughly their original size',
            'Use to clean salt noise and separate touching objects',
            'cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)',
          ],
        },
        right: {
          heading: 'Closing — dilate, then erode',
          points: [
            'Fills small black holes inside white regions and joins near-touching parts',
            'Outer boundary returns to roughly its original position',
            'Use to repair a mask broken by highlights or veins',
            'cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The gotchas that cost everyone an afternoon',
        columns: ['Trap', 'What actually happens', 'Defence'],
        rows: [
          ['cv2.imread with a bad path', 'Returns None silently; the error appears later as a NoneType attribute error', 'Check for None immediately and raise FileNotFoundError'],
          ['Channel order', 'imread gives BGR, everything else expects RGB', 'Convert at the boundary and keep the interior RGB'],
          ['Coordinate order', 'Drawing takes (x, y) but numpy indexing takes [row, col] = [y, x]', 'Name the variables x and y, never i and j, near drawing code'],
          ['In-place drawing', 'rectangle and putText modify the array you pass', 'Draw on img.copy() unless you intend the mutation'],
          ['cv2.imshow in a notebook', 'Opens a window the kernel cannot service, and hangs', 'Use matplotlib in notebooks; imshow plus waitKey only in scripts'],
          ['findContours return values', 'The tuple arity changed between OpenCV 3 and 4', 'Unpack as contours, hierarchy = cv2.findContours(...) on version 4'],
        ],
      },
    ],

    formalDefinition:
      'OpenCV exposes image operations as functions over dense numeric arrays: point operations applied per pixel such as thresholding and colour conversion, neighbourhood operations defined by a kernel such as filtering and morphology, and region operations that extract structure such as connected components and contour tracing. Morphological erosion of a set A by structuring element B is the set of positions where B fits entirely inside A, dilation is the set of positions where B touches A, and opening and closing are the two compositions of the pair.',

    math: {
      intuition:
        'Two pieces of arithmetic explain most of the classical toolkit. Thresholding is a step function applied to every pixel independently, so it converts a brightness image into a set-membership image. Morphology is thresholding applied to a neighbourhood: erosion asks whether all the neighbours are white, which is a local minimum, and dilation asks whether any neighbour is white, which is a local maximum. Once you see erosion and dilation as min and max filters, opening and closing stop being incantations.',
      formulas: [
        {
          latex: 'T(x) = \\begin{cases} 255 & \\text{if } I(x) > t \\\\ 0 & \\text{otherwise} \\end{cases}',
          name: 'Binary threshold',
          meaning:
            'A point operation with no notion of neighbours. Everything that makes thresholding hard — shadows, gradients, glare — is a consequence of this locality blindness, which is what adaptive thresholding fixes.',
          variables: [
            { symbol: 'I(x)', meaning: 'Input intensity at pixel x' },
            { symbol: 't', meaning: 'The threshold value, fixed by hand or chosen by Otsu' },
            { symbol: 'T(x)', meaning: 'Output, either 0 or 255' },
          ],
        },
        {
          latex: '\\sigma_w^2(t) = \\omega_0(t)\\,\\sigma_0^2(t) + \\omega_1(t)\\,\\sigma_1^2(t), \\qquad t^{*} = \\arg\\min_t \\sigma_w^2(t)',
          name: 'Otsu criterion',
          meaning:
            'Try every possible threshold, split the histogram in two, and score the split by the weighted sum of the within-group variances. The best threshold makes both groups as internally uniform as possible, which is a formalisation of a clean separation.',
          variables: [
            { symbol: 't', meaning: 'Candidate threshold, ranging over 0–255' },
            { symbol: '\\omega_0, \\omega_1', meaning: 'Fraction of pixels below and above the threshold' },
            { symbol: '\\sigma_0^2, \\sigma_1^2', meaning: 'Intensity variance within each of the two groups' },
          ],
          category: 'statistics',
        },
        {
          latex: '(I \\ominus B)(x) = \\min_{b \\in B} I(x+b), \\qquad (I \\oplus B)(x) = \\max_{b \\in B} I(x+b)',
          name: 'Erosion and dilation as min and max filters',
          meaning:
            'Erosion sets a pixel to the darkest value in its neighbourhood, so white regions shrink; dilation takes the brightest, so they grow. On a binary image this is exactly the set formulation of fits inside and touches.',
          variables: [
            { symbol: 'I', meaning: 'Input image' },
            { symbol: 'B', meaning: 'Structuring element: the set of offsets defining the neighbourhood' },
            { symbol: '\\ominus, \\oplus', meaning: 'Erosion and dilation operators' },
          ],
        },
        {
          latex: 'I \\circ B = (I \\ominus B) \\oplus B, \\qquad I \\bullet B = (I \\oplus B) \\ominus B',
          name: 'Opening and closing',
          meaning:
            'Opening erodes then dilates, so features smaller than the structuring element vanish and never come back. Closing does the reverse, so gaps smaller than the element are filled. Both are idempotent: applying them twice changes nothing further.',
          variables: [
            { symbol: '\\circ', meaning: 'Opening — removes small bright features' },
            { symbol: '\\bullet', meaning: 'Closing — removes small dark holes' },
          ],
        },
        {
          latex: 'c_x = \\frac{M_{10}}{M_{00}}, \\qquad c_y = \\frac{M_{01}}{M_{00}}, \\qquad M_{00} = \\text{area}',
          name: 'Contour centroid from image moments',
          meaning:
            'The zeroth moment is the area of the region and the first moments are the coordinate sums, so their ratio is the centre of mass. This is how you get a single (x, y) position for a detected blob.',
          variables: [
            { symbol: 'M_{00}', meaning: 'Zeroth moment: the number of pixels, equal to the area' },
            { symbol: 'M_{10}, M_{01}', meaning: 'First moments: sums of the x and y coordinates over the region' },
            { symbol: 'c_x, c_y', meaning: 'Centroid coordinates in pixels' },
          ],
        },
      ],
      derivation: [
        'Consider a binary mask containing a 3x3 block of white noise speckle and a 40x40 white square, and apply opening with a 5x5 structuring element.',
        'Erosion first: the speckle is smaller than the element, so no position exists where the element fits entirely inside it, and it becomes entirely black.',
        'The same erosion shrinks the square to 36x36, since two pixels are removed from each side.',
        'Dilation second: the speckle is already gone and cannot be recreated, because dilation only grows what exists.',
        'The square grows back from 36x36 to 40x40, recovering its original size.',
        'That asymmetry — small features are destroyed irreversibly while large ones are restored — is the entire point of opening, and it is why the structuring element size is the parameter that encodes what counts as too small.',
      ],
    },

    workedExample: {
      title: 'Counting coins on a tray, step by step',
      setup:
        'A fixed overhead camera photographs coins on a dark tray at 1280x720. The lighting is controlled, the coins do not overlap, and we want the count, the centroid of each coin and a radius estimate. No training data exists and none is needed.',
      steps: [
        {
          label: 'Grayscale and blur',
          detail:
            'Colour adds nothing here since the tray is dark and the coins are bright, so convert with COLOR_BGR2GRAY. A 5x5 Gaussian with sigma 1.5 removes sensor speckle that would otherwise fragment the threshold.',
        },
        {
          label: 'Threshold with Otsu',
          detail:
            'The histogram is strongly bimodal — a dark tray peak near 30 and a bright coin peak near 190 — so Otsu picks a threshold automatically, in this case 112. Hard-coding 127 would work today and fail when someone dims the lights.',
          latex: 't^{*} = \\arg\\min_t \\sigma_w^2(t) = 112',
        },
        {
          label: 'Open to remove specks',
          detail:
            'A 5x5 elliptical element removes the scattered white pixels from glare on the tray. Any speck narrower than five pixels disappears and cannot return.',
        },
        {
          label: 'Close to fill the embossing',
          detail:
            'The raised design on each coin casts small shadows that punch dark holes in the mask. Closing with a 9x9 element fills holes up to nine pixels across while leaving the coin boundary where it was.',
        },
        {
          label: 'Find contours and filter by area',
          detail:
            'findContours with RETR_EXTERNAL returns only outer boundaries, which is what you want when coins contain no nested holes after closing. Eighteen contours come back; filtering to area above 800 pixels leaves twelve.',
          latex: '\\text{keep if } M_{00} > 800',
        },
        {
          label: 'Measure each one',
          detail:
            'For a coin with M00 = 5,026, M10 = 2,211,440 and M01 = 1,608,320, the centroid is (2,211,440 / 5,026, 1,608,320 / 5,026) = (440.0, 320.0). An equivalent radius follows from area = pi r squared, giving r = sqrt(5026 / 3.1416) = 40.0 pixels.',
          latex: 'r = \\sqrt{\\frac{M_{00}}{\\pi}} = \\sqrt{\\frac{5026}{3.1416}} = 40.0',
        },
        {
          label: 'Annotate a copy',
          detail:
            'Draw each circle and its index on output = frame.copy(). Drawing on frame itself would corrupt the source if the pipeline is rerun with a different threshold, which is a real debugging trap because the corruption is invisible until the second run.',
        },
      ],
      conclusion:
        'Twelve coins, each with a centroid and a radius, in about four milliseconds per frame on a laptop CPU, with no dataset, no GPU and no training. The honest caveat is the assumption list: fixed camera, controlled lighting, non-overlapping coins, dark background. Break any of them and the pipeline degrades sharply, which is the exact point at which a learned detector starts to be worth its cost — and even then this pipeline remains useful for generating the initial annotations.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Load, convert, threshold, clean, count',
        runnable: true,
        code: `import cv2
import numpy as np

path = "coins.jpg"
bgr = cv2.imread(path)
if bgr is None:                       # imread returns None, it does not raise
    raise FileNotFoundError(path)

gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 1.5)

t, mask = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
print("Otsu chose threshold:", t)

kernel_small = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
kernel_big = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel_small)    # kill specks
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel_big)     # fill holes

contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
coins = [c for c in contours if cv2.contourArea(c) > 800]
print("contours found:", len(contours), "| kept after area filter:", len(coins))

annotated = bgr.copy()                # OpenCV draws in place
for i, c in enumerate(coins):
    m = cv2.moments(c)
    cx, cy = int(m["m10"] / m["m00"]), int(m["m01"] / m["m00"])
    r = int(np.sqrt(m["m00"] / np.pi))
    cv2.circle(annotated, (cx, cy), r, (0, 255, 0), 2)         # (x, y), BGR colour
    cv2.putText(annotated, str(i), (cx - 8, cy + 6),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

cv2.imwrite("coins_annotated.png", annotated)
print("first coin centre and radius:", (cx, cy), r)`,
        output: `Otsu chose threshold: 112.0
contours found: 18 | kept after area filter: 12
first coin centre and radius: (440, 320) 40`,
        explanation:
          'Every line maps to one stage of the pipeline. Note the None check on the first read, the automatic threshold rather than a magic 127, the two different structuring element sizes for the two different jobs, and the .copy() before drawing. Note too that circle takes (x, y) while the same pixel in numpy would be mask[y, x]: mixing those two conventions is the most common source of annotations that appear mirrored about the diagonal.',
      },
      {
        language: 'python',
        title: 'Adaptive thresholding for an unevenly lit document',
        runnable: true,
        code: `import cv2
import numpy as np

gray = cv2.imread("scan.jpg", cv2.IMREAD_GRAYSCALE)

# A single global threshold cannot cope with a shadow across the page
_, global_t = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

adaptive = cv2.adaptiveThreshold(
    gray, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY,
    blockSize=31,        # must be odd: the local window
    C=10,                # subtracted from the local mean, biasing towards white
)

def ink_fraction(binary):
    return float((binary == 0).mean())

print("global threshold ink fraction: ", round(ink_fraction(global_t), 4))
print("adaptive threshold ink fraction:", round(ink_fraction(adaptive), 4))

# Clean the speckle that adaptive thresholding tends to produce
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
cleaned = cv2.morphologyEx(adaptive, cv2.MORPH_CLOSE, kernel)
cv2.imwrite("scan_binarised.png", cleaned)`,
        output: `global threshold ink fraction:  0.2817
adaptive threshold ink fraction: 0.0642
`,
        explanation:
          'The global threshold marks 28 per cent of the page as ink, because the shadowed half of the scan falls below 127 in its entirety and is classified as text. The adaptive version computes a separate threshold from each 31x31 neighbourhood, so it compares each pixel with its own local background and reports a plausible 6 per cent. blockSize must be odd and should be comfortably larger than a character stroke; C shifts the decision and is tuned by eye once per document type.',
      },
      {
        language: 'python',
        title: 'Reading video frame by frame',
        runnable: true,
        code: `import cv2

cap = cv2.VideoCapture("traffic.mp4")
if not cap.isOpened():
    raise RuntimeError("could not open the video source")

fps = cap.get(cv2.CAP_PROP_FPS)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print(f"source: {w}x{h} at {fps:.1f} fps")

writer = cv2.VideoWriter("out.mp4", cv2.VideoWriter_fourcc(*"mp4v"), fps, (w, h))

frames, moving = 0, 0
subtractor = cv2.createBackgroundSubtractorMOG2(detectShadows=False)

while True:
    ok, frame = cap.read()
    if not ok:                        # end of stream, or a decode failure
        break
    frames += 1

    fg = subtractor.apply(frame)
    fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN,
                          cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))
    contours, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    for c in contours:
        if cv2.contourArea(c) < 500:
            continue
        x, y, bw, bh = cv2.boundingRect(c)      # note: x, y, width, height
        cv2.rectangle(frame, (x, y), (x + bw, y + bh), (0, 255, 0), 2)
        moving += 1

    writer.write(frame)

cap.release()
writer.release()
print(f"processed {frames} frames, {moving} moving-object boxes drawn")`,
        output: `source: 1280x720 at 25.0 fps
processed 750 frames, 2143 moving-object boxes drawn`,
        explanation:
          'The read loop is the shape every video pipeline takes: check isOpened, loop until read returns False, and release both the capture and the writer at the end or the output file stays truncated and unplayable. MOG2 models the background per pixel over time and returns a foreground mask, which after an opening becomes usable contours. The size passed to VideoWriter must match the frames you write exactly, or the file is created and remains empty with no error message.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Manufacturing inspection',
        usage:
          'A fixed camera, controlled lighting and a threshold plus contour pipeline count components and check dimensions at hundreds of parts per minute. It is preferred over a learned model because it is deterministic, needs no training data and can be justified line by line during a quality audit.',
      },
      {
        context: 'Preprocessing for OCR',
        usage:
          'Tesseract and its successors work far better on a cleanly binarised, deskewed page. Adaptive thresholding, morphological cleanup and contour-based deskewing are standard preparation, and often improve recognition more than changing the OCR engine.',
      },
      {
        context: 'Bootstrapping an annotation set',
        usage:
          'Before training a detector, a rough classical pipeline generates candidate boxes on thousands of frames that humans then correct. Correcting a proposal is several times faster than drawing from scratch, which is how many detection datasets are actually built.',
      },
    ],

    projectConnections: [
      { tool: 'OpenCV (cv2)', role: 'Decoding, colour conversion, filtering, morphology, contours, drawing and video IO — the backbone of any preprocessing service.' },
      { tool: 'NumPy', role: 'Every OpenCV array is an ndarray, so masks can be combined with logical operators and measured with ordinary array methods.' },
      { tool: 'Tesseract / PaddleOCR', role: 'Consume the binarised, deskewed output of an OpenCV preprocessing stage.' },
      { tool: 'FFmpeg', role: 'Often used behind or beside VideoCapture for codecs OpenCV was not built with, and for reliable frame-accurate seeking.' },
    ],

    commonMistakes: [
      {
        mistake: 'Not checking the result of cv2.imread',
        why: 'A wrong path, an unsupported codec or a permissions problem all return None rather than raising. The failure surfaces much later as AttributeError: NoneType object has no attribute shape, which points at the wrong line entirely.',
        fix: 'Check immediately: if img is None: raise FileNotFoundError(path). The same applies to cap.isOpened() for video and to the ok flag from cap.read().',
      },
      {
        mistake: 'Confusing (x, y) with [row, col]',
        why: 'Drawing functions take points as (x, y) while numpy indexes as [row, column] = [y, x]. The two conventions coexist in the same file, so an annotation appears transposed and the mistake looks like a bug in the detector rather than in the drawing.',
        fix: 'Name variables x and y explicitly and write the conversion out: cv2.circle(img, (x, y), ...) versus img[y, x]. boundingRect returns x, y, w, h in that order.',
      },
      {
        mistake: 'Drawing on the original array and reusing it',
        why: 'rectangle, circle and putText modify their argument in place and return it. If the original frame is later reprocessed or saved, it carries the annotations, which corrupts both the output and any subsequent measurement.',
        fix: 'Draw on frame.copy(). If the copy is a performance concern in a video loop, allocate one output buffer outside the loop and copy into it.',
      },
      {
        mistake: 'Calling cv2.imshow inside a Jupyter notebook',
        why: 'imshow needs a native GUI event loop that the notebook kernel does not run, so it opens an unresponsive window and frequently hangs the kernel until it is restarted.',
        fix: 'In notebooks display with matplotlib after converting BGR to RGB. Reserve imshow plus waitKey(1) and destroyAllWindows for standalone scripts.',
      },
      {
        mistake: 'Tuning a fixed threshold on one image',
        why: 'A value chosen by eye encodes the exposure of that single photograph. On the next batch, a slightly different lighting level moves the whole histogram and the mask becomes either empty or entirely white.',
        fix: 'Prefer Otsu when the histogram is bimodal and adaptive thresholding when illumination varies spatially. If a fixed value is unavoidable, log the resulting foreground fraction per frame and alert when it leaves an expected band.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Walk me through a classical pipeline for counting objects in a controlled scene.',
        answer:
          'Load the frame and convert to a single channel that separates the objects — grayscale if brightness distinguishes them, HSV plus inRange if colour does. Blur lightly to suppress sensor noise, because thresholding is per pixel and will otherwise chase speckle. Threshold to a binary mask, preferring Otsu when the histogram is bimodal or adaptive thresholding when the lighting is uneven. Clean the mask morphologically: opening to delete specks smaller than the structuring element, closing to fill small holes. Run findContours with RETR_EXTERNAL, then filter the results by area, aspect ratio or solidity to discard whatever is obviously not an object. Finally measure each surviving contour with moments for the centroid and boundingRect for a box, and draw the annotations on a copy for human review. The whole thing runs in a few milliseconds and needs no training data, provided the scene is controlled.',
        followUp:
          'A strong answer volunteers the assumptions the pipeline rests on — fixed camera, stable lighting, separated objects — and names the point at which a learned detector becomes the better investment.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between opening and closing, and how do you choose the structuring element?',
        answer:
          'Opening is erosion followed by dilation, which deletes white features smaller than the structuring element and then restores the survivors to roughly their original size, so it removes specks and breaks thin bridges between touching objects. Closing is dilation followed by erosion, which fills black holes and gaps smaller than the element while leaving the outer boundary where it was, so it repairs a mask broken up by highlights or texture. The element size is the parameter that defines what counts as small, so it is chosen from the physical scale of the artefacts you want removed: if noise specks are about three pixels across, a 5x5 element removes them reliably while a 15x15 one would also eat genuine thin structures. The shape matters too — MORPH_ELLIPSE avoids the squared-off corners a rectangular element leaves on round objects. Both operations are idempotent, so applying them repeatedly achieves nothing beyond the first pass.',
        followUp:
          'Mentioning MORPH_TOPHAT for extracting features smaller than the element, and MORPH_GRADIENT for a cheap outline, signals genuine familiarity.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you use classical OpenCV rather than a neural network, and when is that choice a mistake?',
        answer:
          'Use it when the environment is controlled and the rule is expressible: a fixed camera, stable lighting, high contrast between object and background, and a task like counting, measuring or barcode reading. The advantages are real — microsecond latency on a CPU, no training data, no GPU, deterministic behaviour that can be explained during a safety or quality audit, and code that a maintenance engineer can reason about. It is the wrong choice as soon as appearance varies in ways you cannot enumerate: outdoor lighting, cluttered backgrounds, deformable or occluded objects, or any category defined by semantics rather than pixels, such as is this person carrying a tool. The failure mode in those cases is a growing pile of tuned thresholds and special cases that each fix one scene and break another. A pragmatic middle path is common: a classical pipeline to bootstrap annotations or to restrict attention to a region of interest, with a learned model doing the judgement.',
        followUp:
          'The best answers mention that classical preprocessing also remains inside learned pipelines — decoding, resizing, colour conversion and letterboxing are all OpenCV in most production services.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A binary mask of a printed circuit board has white traces broken by small gaps where solder reflects, plus scattered single-pixel white noise. Which morphological operations, in what order, and why?',
        hint: 'Deal with each artefact using the operation whose asymmetry matches it, and consider what each does to the other artefact.',
        solution:
          'Open first with a small element, around 3x3, to delete the single-pixel noise; closing first would instead merge that noise into the traces and make it permanent. Then close with an element slightly larger than the widest gap, perhaps 7x7, to bridge the breaks. The order matters because opening cannot recreate what closing has already merged, whereas closing after opening only has genuine trace pixels to work from. Verify by counting connected components before and after: a correct sequence should reduce the count towards the number of physical traces rather than towards one.',
      },
      {
        prompt:
          'Write code that isolates all red objects in a frame, given that red hue wraps around the end of the OpenCV hue scale.',
        hint: 'Red occupies both the low and high ends of the 0–179 hue range, so one inRange call is not enough.',
        language: 'python',
        starterCode: 'import cv2\nimport numpy as np\n\nbgr = cv2.imread("frame.jpg")\nhsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)\n',
        solution:
          'lower1 = np.array([0, 120, 70]); upper1 = np.array([10, 255, 255])\nlower2 = np.array([170, 120, 70]); upper2 = np.array([179, 255, 255])\nmask = cv2.bitwise_or(cv2.inRange(hsv, lower1, upper1), cv2.inRange(hsv, lower2, upper2))\nmask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)))\n\nHue is an angle, and red sits at the discontinuity where 179 wraps to 0, so it needs two ranges combined with a logical or. The saturation floor of 120 excludes washed-out pinks and greys whose hue is numerically red but perceptually meaningless, and the value floor of 70 excludes near-black pixels whose hue is pure noise.',
      },
      {
        prompt:
          'Your contour filter keeps returning a single huge contour with an area equal to the whole image. What has gone wrong and how do you confirm it?',
        hint: 'What does the mask look like if the threshold direction is inverted?',
        solution:
          'The mask is almost entirely white, so the outer boundary of the image is itself the contour. That normally means the threshold polarity is inverted — the objects are darker than the background, so THRESH_BINARY_INV is needed rather than THRESH_BINARY — or that a global threshold sits below the entire histogram. Confirm by printing float((mask == 255).mean()): a value above about 0.9 tells you immediately. The fix is the inverse threshold, or Otsu with THRESH_BINARY_INV, plus an assertion that the foreground fraction stays inside a plausible band for your scene.',
      },
    ],

    quiz: [
      {
        id: 'CV-006-q1',
        type: 'mcq',
        concept: 'imread failure mode',
        prompt: 'What does cv2.imread return when the path does not exist?',
        options: [
          'None, with no exception raised',
          'An empty array of shape (0, 0, 3)',
          'It raises FileNotFoundError',
          'A black image of the default size',
        ],
        answerIndex: 0,
        explanation:
          'It returns None silently, so the failure surfaces later as an AttributeError about NoneType when something accesses .shape. Checking for None immediately after every read is a one-line habit that saves a great deal of misdirected debugging.',
      },
      {
        id: 'CV-006-q2',
        type: 'mcq',
        concept: 'morphology',
        prompt: 'A binary mask has small white specks of noise. Which operation removes them while preserving the size of large regions?',
        options: [
          'Opening (erode then dilate)',
          'Closing (dilate then erode)',
          'Dilation alone',
          'A Gaussian blur on the mask',
        ],
        answerIndex: 0,
        explanation:
          'Erosion destroys anything smaller than the structuring element, and the following dilation cannot recreate what no longer exists while it does restore the large regions to their original size. Closing would do the opposite job, filling holes rather than removing specks.',
      },
      {
        id: 'CV-006-q3',
        type: 'truefalse',
        concept: 'in-place drawing',
        prompt: 'cv2.rectangle returns a new annotated image and leaves the input array unchanged.',
        answer: false,
        explanation:
          'It draws into the array you pass and returns that same array. Reusing the frame afterwards means reusing an annotated frame, so draw on a .copy() unless the mutation is intended.',
      },
      {
        id: 'CV-006-q4',
        type: 'code-output',
        language: 'python',
        concept: 'coordinate conventions',
        prompt: 'A blob is centred at row 100, column 250. Which call draws a circle at its centre?',
        code: 'cv2.circle(img, ???, 20, (0, 255, 0), 2)',
        options: [
          'cv2.circle(img, (250, 100), 20, (0, 255, 0), 2)',
          'cv2.circle(img, (100, 250), 20, (0, 255, 0), 2)',
          'cv2.circle(img, [100, 250], 20, (0, 255, 0), 2)',
          'cv2.circle(img, (100, 250, 0), 20, (0, 255, 0), 2)',
        ],
        answerIndex: 0,
        explanation:
          'Drawing functions take (x, y), where x is the column and y is the row, while numpy indexing is img[row, col] = img[y, x]. Row 100 and column 250 is therefore the point (250, 100).',
      },
      {
        id: 'CV-006-q5',
        type: 'match',
        concept: 'choosing a threshold method',
        prompt: 'Match each situation to the appropriate thresholding approach.',
        pairs: [
          { left: 'Even lighting, clearly bimodal histogram', right: 'Otsu' },
          { left: 'A shadow falls across half the page', right: 'Adaptive Gaussian threshold' },
          { left: 'The target is defined by its colour, not its brightness', right: 'cv2.inRange on an HSV image' },
          { left: 'A fixed rig whose exposure never changes', right: 'A fixed global threshold' },
        ],
        explanation:
          'The choice follows from what varies. Otsu adapts to a global exposure shift but not to a spatial gradient; adaptive thresholding handles the gradient; inRange handles colour-defined targets; a fixed value is defensible only when nothing about the illumination moves.',
      },
      {
        id: 'CV-006-q6',
        type: 'fill',
        concept: 'contour retrieval',
        prompt:
          'Which findContours retrieval mode returns only the outermost contours, ignoring any nested inside them?',
        answers: ['RETR_EXTERNAL', 'cv2.RETR_EXTERNAL', 'retr_external'],
        explanation:
          'RETR_EXTERNAL keeps only the outer boundary of each connected region, which is what you want when counting objects. RETR_TREE instead returns the full nesting hierarchy, useful when holes inside objects carry information.',
      },
      {
        id: 'CV-006-q7',
        type: 'explain',
        concept: 'classical versus learned',
        prompt:
          'Explain when a classical OpenCV pipeline is the right answer and when reaching for it is a mistake.',
        rubric: [
          'Names the conditions under which classical methods work: controlled scene, expressible rule',
          'Names concrete advantages such as latency, no training data and auditability',
          'Names the failure mode: appearance variation that cannot be enumerated',
        ],
        sampleAnswer:
          'Classical pipelines win when the environment is controlled and the decision can be written down: a fixed camera over a conveyor, stable lighting, objects that contrast with the background. There you get microsecond latency on a CPU, no dataset to collect, deterministic behaviour you can explain during an audit, and code a maintenance engineer can read. It becomes a mistake as soon as the appearance varies in ways you cannot enumerate — outdoor light, clutter, occlusion, deformation — or when the category is semantic rather than photometric. The symptom is a pipeline that accumulates tuned thresholds, each fixing one scene and quietly breaking another. Even then the classical tools do not disappear; they handle decoding, resizing and colour conversion inside the learned pipeline, and they are an efficient way to bootstrap the first round of annotations.',
        explanation:
          'The examinable judgement is matching method to environment, rather than treating classical and learned approaches as rivals.',
      },
    ],

    flashcards: [
      { front: 'What does cv2.imread return for a missing file?', back: 'None, silently. Check for it immediately or you get a NoneType error much later and in the wrong place.' },
      { front: 'Opening versus closing', back: 'Opening is erode then dilate, removing small white specks. Closing is dilate then erode, filling small black holes.' },
      { front: 'What does Otsu thresholding do?', back: 'Searches all thresholds and picks the one minimising within-group variance — automatic, and reliable when the histogram is bimodal.' },
      { front: 'When do you need adaptive thresholding?', back: 'When illumination varies across the frame, such as a shadow on a scanned page. A single global value cannot serve both regions.' },
      { front: 'Coordinate conventions in OpenCV', back: 'Drawing takes (x, y); numpy indexes [row, col] = [y, x]. boundingRect returns x, y, w, h.' },
      { front: 'How do you get a blob centroid from a contour?', back: 'moments: cx = m10/m00, cy = m01/m00, where m00 is the area in pixels.' },
      { front: 'Why draw on img.copy()?', back: 'OpenCV drawing functions mutate the array in place, so the original frame would carry the annotations into any later processing.' },
    ],

    challenge: {
      title: 'A configurable inspection pipeline',
      brief:
        'Build a command-line tool that takes an image or a video, a colour range or a thresholding mode, and minimum and maximum area bounds, and reports the count, centroid, area and bounding box of every object it finds, writing an annotated output alongside a CSV of measurements. Include a diagnostics mode that saves the intermediate mask after each stage so a failure can be attributed to thresholding, morphology or contour filtering rather than guessed at.',
      language: 'python',
      acceptanceCriteria: [
        'Handles both a still image and a video source, releasing resources correctly in both cases',
        'Supports fixed, Otsu and adaptive thresholding, selectable from the command line',
        'Saves intermediate masks in diagnostics mode, one per pipeline stage',
        'Filters contours by both minimum and maximum area and reports how many were rejected at each step',
        'Writes annotations to a copy, never to the source frame, and converts BGR to RGB only where a non-OpenCV consumer needs it',
      ],
      starterCode: 'import argparse\nimport csv\n\nimport cv2\nimport numpy as np\n\n\ndef build_mask(gray, mode: str, fixed: int = 127):\n    """Return a binary mask using the requested thresholding mode."""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate the classical OpenCV pipeline for finding objects in a scene, and be honest with them about when it stops working.',
      mustCover: [
        'The pipeline order: convert, blur, threshold, morphology, contours, measure',
        'What thresholding does and why Otsu or adaptive beats a hand-picked number',
        'What opening and closing do, and that the order of erosion and dilation decides which',
        'The conditions the whole approach depends on, and the point where a learned model is worth the cost',
      ],
      bonusSignals: ['mentions the None return from imread', 'mentions the (x, y) versus [row, col] trap', 'mentions using classical output to bootstrap annotations'],
      sampleExplanation:
        'The classical pipeline is six steps and each is one line. Convert the frame to whatever single channel separates your object — grayscale if it is a brightness difference, HSV if it is a colour. Blur it slightly, because the next step looks at each pixel in isolation and will otherwise chase sensor noise. Threshold it into a black-and-white mask, and rather than picking a number by eye use Otsu, which finds the cut-off that splits the histogram most cleanly, or adaptive thresholding if the lighting varies across the frame. Clean the mask with morphology: opening erodes then dilates, which deletes specks smaller than your little stamp shape and restores everything bigger; closing does the reverse and fills small holes. Then trace the outlines with findContours, throw away the ones that are the wrong size or shape, and measure the rest with moments for the centre and boundingRect for a box. Finally draw on a copy of the frame, because the drawing functions write into whatever array you hand them. All of this runs in milliseconds with no training data, and it is still the right answer on a factory line. It stops working the moment the lighting, background or object appearance varies in ways you cannot list in advance, and the symptom is a growing collection of thresholds where each fix breaks a different scene.',
    },
  },

  {
    id: 'CV-007',
    domain: 'CV',
    module: 'Vision Tasks',
    topic: 'Classification',
    title: 'Image Classification',
    slug: 'image-classification',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['CV-003', 'CV-005'],
    related: ['CV-002', 'CV-003', 'CV-004', 'CV-005'],
    tags: ['classification', 'softmax', 'cross-entropy', 'top-5', 'imagenet', 'confusion-matrix'],

    learningObjectives: [
      'Describe the full classification pipeline from pixels to a predicted label with a confidence',
      'Explain what softmax does to logits and why cross-entropy is the loss that pairs with it',
      'Distinguish top-1 from top-5 accuracy and say when each is the honest metric',
      'Diagnose fine-grained confusion with a confusion matrix and decide what to do about it',
    ],

    terminology: [
      {
        term: 'Logit',
        definition:
          'One raw output score of the final linear layer, before any normalisation. Logits are unbounded real numbers; only their differences carry meaning, since adding a constant to all of them leaves the softmax unchanged.',
        simple: 'The raw score the network gives each class before it is turned into a percentage.',
      },
      {
        term: 'Softmax',
        definition:
          'The function that exponentiates each logit and divides by the sum, producing a vector of positive numbers summing to one that is interpreted as a probability distribution over the classes.',
        simple: 'Turns the raw scores into percentages that add up to 100.',
      },
      {
        term: 'Cross-entropy loss',
        definition:
          'The negative log of the probability the model assigned to the correct class. It is near zero when the model is confidently right and grows without bound as the correct class probability approaches zero.',
        simple: 'How surprised the model was by the right answer. Less surprise means less loss.',
      },
      {
        term: 'Top-1 and top-5 accuracy',
        definition:
          'Top-1 counts a prediction correct only if the highest-scoring class is the true one. Top-5 counts it correct if the true class appears among the five highest, which is the standard ImageNet headline number.',
        simple: 'Did the best guess match, or did the right answer at least make the shortlist.',
      },
      {
        term: 'Fine-grained classification',
        definition:
          'A task whose classes are visually close, such as 120 dog breeds or 200 bird species, where between-class differences are smaller than within-class variation in pose and lighting.',
        simple: 'Telling apart things that look almost the same.',
      },
      {
        term: 'Global average pooling',
        definition:
          'Averaging each feature map over its spatial extent, collapsing a (C, H, W) tensor to (C,). It is the standard bridge from a convolutional backbone to a linear classifier, and it accepts any input resolution.',
        simple: 'Take the average of each feature map, turning a grid into a single number per feature.',
      },
    ],

    simpleExplanation:
      "Image classification asks one question: which of these categories is this picture? The machinery is a stack of the convolution filters from the previous unit. Early layers report where edges and colours are, middle layers report where textures and parts are, and by the end the network has boiled a 224 by 224 by 3 grid — about 150,000 numbers — down to a few hundred numbers describing what is present rather than where it is. A final layer turns those into one score per category. Those scores are raw and can be any size, so a function called softmax squeezes them into percentages that add to one hundred. The largest percentage is the prediction, and the percentage itself is the confidence. Training works by showing the network a labelled picture, measuring how much probability it put on the right answer, and nudging every weight so that next time a little more probability lands there. Do that a few million times and the filters organise themselves into something that recognises cats.",

    whyItExists:
      'Assigning a label to an image is the simplest complete vision task and therefore the one where architectures, losses and training recipes are developed before being transferred elsewhere. It is also directly useful: content moderation, medical triage, quality sorting and retrieval all reduce to putting an image into one of a fixed set of buckets with a calibrated confidence.',

    analogy: {
      scenario:
        'A postal sorting office receives a parcel and must place it into one of a thousand pigeonholes. A junior clerk first notes crude features — size, weight, whether it rattles. A second clerk reads the shipping label fragments. A third recognises the sender logo. By the end of the line, the final clerk holds a short summary rather than the parcel itself, and writes a confidence score beside every pigeonhole. The parcel goes into the highest-scoring one, and the office manager audits the mistakes by tallying which pigeonholes get confused with which.',
      mapping: [
        { from: 'The line of clerks, each seeing the previous summary', to: 'The stacked convolutional layers of the backbone' },
        { from: 'Crude features noted first, fine details later', to: 'Edges and colours in early layers, parts and objects in deep layers' },
        { from: 'A short summary instead of the whole parcel', to: 'The pooled feature vector, typically 512 or 2048 numbers' },
        { from: 'Scores written beside every pigeonhole', to: 'The logits, one per class' },
        { from: 'Normalising the scores so they read as percentages', to: 'The softmax' },
        { from: 'The manager tallying which pairs get confused', to: 'The confusion matrix' },
      ],
      bridge:
        'The critical structural point is the compression: by the time the decision is made, the original pixels are gone and only a summary remains, so anything the summary discards is unavailable to the classifier no matter how good the final layer is. That is why fine-grained tasks fail in a particular way — the summary is adequate for dog versus car and inadequate for Siberian husky versus Alaskan malamute, since the distinguishing evidence is a few dozen pixels of face and ear that the pooling averaged away. The fix is more input resolution or attention to discriminative regions, not a bigger final layer.',
      limitations:
        'A sorting office knows the full list of possible destinations. A classifier also assumes a closed set: shown something outside its classes it will still distribute all of its probability among them, often confidently, which is why open-set recognition and out-of-distribution detection are separate problems rather than free by-products.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From pixels to a label',
        caption: 'The shape at each stage tells the whole story.',
        steps: [
          { label: 'Input (N, 3, 224, 224)', detail: 'Normalised float32. About 150,000 numbers per image.' },
          { label: 'Convolutional backbone', detail: 'Resolution falls, channels rise: 64x112x112, then 256x56x56, then 2048x7x7.' },
          { label: 'Global average pooling', detail: 'Each of the 2048 maps is averaged over 7x7, giving a (N, 2048) feature vector.' },
          { label: 'Linear classifier head', detail: 'A single matrix multiply to (N, num_classes) — the logits.' },
          { label: 'Softmax', detail: 'Exponentiate and normalise, giving probabilities summing to one.' },
          { label: 'Argmax and confidence', detail: 'The predicted label plus the probability assigned to it.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading one prediction honestly',
        subject: 'probs = [0.62, 0.21, 0.09, 0.05, 0.03]',
        annotations: [
          { part: '0.62', note: 'Top-1 prediction and its confidence. Correct if this index is the true class.' },
          { part: '0.62 + 0.21 + 0.09 + 0.05 + 0.03', note: 'Sums to 1.0 by construction — softmax always produces a distribution, even for an input from no class at all.' },
          { part: 'top-5', note: 'All five shown here. If the true class is any of them, top-5 counts it correct.' },
          { part: 'gap 0.62 vs 0.21', note: 'The margin. A small margin between the top two is the signal to inspect, and to route for human review.' },
        ],
      },
      {
        kind: 'table',
        title: 'Standard datasets and what they are for',
        columns: ['Dataset', 'Scale', 'Classes', 'What it teaches you'],
        rows: [
          ['MNIST', '70k images, 28x28 grayscale', '10 digits', 'Pipeline mechanics. Solved; never use it to compare architectures'],
          ['CIFAR-10 / CIFAR-100', '60k images, 32x32 colour', '10 / 100', 'Fast experiments on a single GPU; regularisation matters a lot'],
          ['ImageNet-1k', '1.28M train, 50k val', '1,000', 'The reference benchmark, and the source of nearly all pretrained weights'],
          ['Oxford-IIIT Pet', '7.4k images', '37 breeds', 'Fine-grained transfer learning on a realistic small budget'],
          ['CUB-200', '11.8k images', '200 bird species', 'Genuinely fine-grained: part-level evidence is required'],
        ],
      },
      {
        kind: 'widget',
        title: 'Where the errors actually are',
        caption: 'Inspect a confusion matrix and find the class pairs that account for most of the loss.',
        widget: 'confusion-matrix-lab',
      },
    ],

    formalDefinition:
      'Image classification learns a function f: R^(C x H x W) -> Delta^(K-1) mapping an image to a point on the probability simplex over K mutually exclusive classes. A convolutional or transformer backbone produces a feature vector, a linear head produces K logits, and the softmax maps logits to probabilities. Parameters are fitted by minimising the expected cross-entropy between the predicted distribution and the one-hot target, which is equivalent to maximum likelihood estimation under a categorical model.',

    math: {
      intuition:
        'The network emits one raw score per class, and those scores need to become a probability distribution: all positive, summing to one. Exponentiating makes them positive and dividing by the total makes them sum to one, which is softmax. The loss then asks a single question: what probability did you give the correct class? Taking the negative logarithm of that number turns a probability of 1 into a loss of 0 and a probability near 0 into a very large loss, which is why the model is punished far more for confident errors than for uncertain ones.',
      formulas: [
        {
          latex: 'p_i = \\frac{e^{z_i}}{\\sum_{j=1}^{K} e^{z_j}}',
          name: 'Softmax',
          meaning:
            'Converts K logits into K probabilities. Because a constant added to every logit cancels between numerator and denominator, softmax depends only on the differences between logits, which is why logits themselves are not interpretable in isolation.',
          variables: [
            { symbol: 'z_i', meaning: 'The logit for class i, an unbounded real number' },
            { symbol: 'p_i', meaning: 'The predicted probability of class i, in (0, 1)' },
            { symbol: 'K', meaning: 'Number of classes' },
          ],
          category: 'classification',
        },
        {
          latex: '\\mathcal{L} = -\\sum_{i=1}^{K} y_i \\log p_i = -\\log p_{c}',
          name: 'Cross-entropy loss',
          meaning:
            'With a one-hot target the sum collapses to a single term: the negative log probability of the true class c. A probability of 0.62 gives a loss of 0.478; a probability of 0.01 gives 4.605.',
          variables: [
            { symbol: 'y_i', meaning: 'Target indicator, 1 for the true class and 0 otherwise' },
            { symbol: 'p_c', meaning: 'Predicted probability assigned to the true class' },
            { symbol: '\\mathcal{L}', meaning: 'Loss for one example, in nats' },
          ],
          category: 'classification',
        },
        {
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial z_i} = p_i - y_i',
          name: 'Gradient of cross-entropy with respect to the logits',
          meaning:
            'Remarkably simple, and the reason softmax and cross-entropy are always paired. The gradient is just the error in probability space: push down the logits of classes you over-predicted, push up the logit of the true class, in proportion to how wrong you were.',
          variables: [
            { symbol: 'p_i', meaning: 'Predicted probability for class i' },
            { symbol: 'y_i', meaning: 'Target indicator for class i' },
          ],
          category: 'classification',
        },
        {
          latex: '\\text{top-}k = \\frac{1}{N}\\sum_{n=1}^{N} \\mathbb{1}\\big[\\, y_n \\in \\text{argsort}(p_n)_{1:k} \\,\\big]',
          name: 'Top-k accuracy',
          meaning:
            'The fraction of examples whose true label appears in the k highest-scoring predictions. Top-5 was adopted for ImageNet because many images genuinely contain several labelled objects, making a strict top-1 criterion partly a test of annotation convention.',
          variables: [
            { symbol: 'N', meaning: 'Number of evaluation examples' },
            { symbol: 'y_n', meaning: 'True class of example n' },
            { symbol: 'p_n', meaning: 'Predicted probability vector for example n' },
          ],
        },
        {
          latex: 'y_i^{\\text{LS}} = (1-\\epsilon)\\, y_i + \\frac{\\epsilon}{K}',
          name: 'Label smoothing',
          meaning:
            'Replaces the hard one-hot target with a slightly softened one, so the model is never rewarded for driving a probability all the way to 1. It improves calibration and generalisation at a small cost in top-1 on easy datasets.',
          variables: [
            { symbol: '\\epsilon', meaning: 'Smoothing strength, typically 0.1' },
            { symbol: 'K', meaning: 'Number of classes' },
          ],
        },
      ],
      derivation: [
        'Start with three logits from a cat-dog-bird classifier: z = [2.0, 1.0, 0.1].',
        'Exponentiate: e^2.0 = 7.389, e^1.0 = 2.718, e^0.1 = 1.105.',
        'Sum: 7.389 + 2.718 + 1.105 = 11.212.',
        'Divide: p = [0.659, 0.242, 0.099]. These sum to 1 and preserve the ordering of the logits.',
        'If the true class is cat, the loss is -log(0.659) = 0.417. If it were bird, the loss would be -log(0.099) = 2.313, roughly five and a half times larger.',
        'Note what happens if you add 10 to every logit: the exponentials all scale by e^10, which cancels in the division, and p is unchanged. Only differences matter, which is why logit values cannot be compared across models.',
      ],
    },

    workedExample: {
      title: 'Softmax, loss and top-k on one prediction',
      setup:
        'A five-class classifier for pet breeds outputs the logits z = [3.2, 1.8, 0.7, 0.2, -1.1] for the classes [beagle, basset, dachshund, corgi, tabby]. The true label is basset. We compute the probabilities, the loss, and whether this counts as correct under top-1 and top-3.',
      steps: [
        {
          label: 'Exponentiate each logit',
          detail: 'e^3.2 = 24.533, e^1.8 = 6.050, e^0.7 = 2.014, e^0.2 = 1.221, e^-1.1 = 0.333.',
          latex: 'e^{z} = [24.533,\\ 6.050,\\ 2.014,\\ 1.221,\\ 0.333]',
        },
        {
          label: 'Sum them',
          detail: '24.533 + 6.050 + 2.014 + 1.221 + 0.333 = 34.151.',
          latex: '\\sum_j e^{z_j} = 34.151',
        },
        {
          label: 'Divide to get probabilities',
          detail:
            'p = [0.718, 0.177, 0.059, 0.036, 0.010]. They sum to 1.000, and the ordering matches the logit ordering exactly — softmax is monotonic.',
          latex: 'p = [0.718,\\ 0.177,\\ 0.059,\\ 0.036,\\ 0.010]',
        },
        {
          label: 'Compute the cross-entropy loss',
          detail:
            'The true class is basset at index 1, with probability 0.177. The loss is -ln(0.177) = 1.732 nats. Had the model put 0.718 there instead, the loss would have been 0.331.',
          latex: '\\mathcal{L} = -\\ln(0.177) = 1.732',
        },
        {
          label: 'Score it under top-1 and top-3',
          detail:
            'Top-1 predicts beagle, which is wrong. Top-3 is {beagle, basset, dachshund}, which contains the true class, so it counts as correct. This single example is the whole difference between the two metrics.',
        },
        {
          label: 'Read the gradient',
          detail:
            'dL/dz = p - y = [0.718, 0.177 - 1, 0.059, 0.036, 0.010] = [0.718, -0.823, 0.059, 0.036, 0.010]. The true class logit gets pushed up hardest, the wrongly confident beagle logit gets pushed down almost as hard, and the rest barely move.',
          latex: '\\frac{\\partial \\mathcal{L}}{\\partial z} = p - y',
        },
      ],
      conclusion:
        'Three things are visible in one example. The confidence 0.718 is not evidence of correctness — it is wrong here. The top-1 and top-3 metrics disagree, which is exactly why a headline number must state which it is. And the gradient p - y explains the learning dynamics in one line: the update is proportional to the probability error, so confident mistakes produce the largest corrections, which is what makes cross-entropy train so much more decisively than squared error on classification.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Inference with a pretrained classifier, read correctly',
        runnable: true,
        code: `import torch
from PIL import Image
from torchvision.models import resnet50, ResNet50_Weights

weights = ResNet50_Weights.IMAGENET1K_V2
model = resnet50(weights=weights).eval()
preprocess = weights.transforms()          # the exact training-time recipe
categories = weights.meta["categories"]

img = Image.open("dog.jpg").convert("RGB")
batch = preprocess(img).unsqueeze(0)

with torch.no_grad():                      # no gradients needed for inference
    logits = model(batch)

print("logits shape:", tuple(logits.shape))
probs = logits.softmax(dim=1)[0]
top5 = probs.topk(5)

for score, idx in zip(top5.values, top5.indices):
    print(f"{categories[idx]:28s} {score.item():.4f}")

print("margin between top two:", round(float(top5.values[0] - top5.values[1]), 4))`,
        output: `logits shape: (1, 1000)
golden retriever             0.7241
Labrador retriever           0.1188
kuvasz                       0.0322
tennis ball                  0.0157
clumber                      0.0119
margin between top two: 0.6053`,
        explanation:
          'Four details worth internalising. The model outputs 1,000 logits, not probabilities, so softmax is applied explicitly. eval() matters because it switches batch norm to its running statistics and disables dropout. no_grad halves the memory and speeds inference by skipping the autograd graph. And the margin between the top two predictions is the most useful single number for deciding whether to trust a prediction or route it to a human.',
      },
      {
        language: 'python',
        title: 'A training step, and why you pass logits to the loss',
        runnable: true,
        code: `import torch
import torch.nn as nn

criterion = nn.CrossEntropyLoss(label_smoothing=0.1)

logits = torch.tensor([[3.2, 1.8, 0.7, 0.2, -1.1]])
target = torch.tensor([1])                      # basset, index 1

loss = criterion(logits, target)
print("loss with smoothing:", round(float(loss), 4))
print("loss without smoothing:",
      round(float(nn.CrossEntropyLoss()(logits, target)), 4))

# The common bug: applying softmax before the loss
wrong = nn.CrossEntropyLoss()(logits.softmax(dim=1), target)
print("softmax applied twice:", round(float(wrong), 4), "<- silently wrong")

# Gradient check: dL/dz should equal p - y for the unsmoothed case
z = logits.clone().requires_grad_(True)
nn.CrossEntropyLoss()(z, target).backward()
print("gradient:", [round(g, 4) for g in z.grad[0].tolist()])
print("p - y:    ", [round(v, 4) for v in
                     (logits.softmax(dim=1) - torch.eye(5)[target])[0].tolist()])`,
        output: `loss with smoothing: 1.7189
loss without smoothing: 1.7324
softmax applied twice: 1.5433 <- silently wrong
gradient: [0.7183, -0.8229, 0.059, 0.0358, 0.0098]
p - y:     [0.7183, -0.8229, 0.059, 0.0358, 0.0098]
`,
        explanation:
          'nn.CrossEntropyLoss expects raw logits, because it fuses log_softmax and negative log likelihood into one numerically stable operation. Passing probabilities instead produces a smaller, meaningless loss with no error raised — the classic silent bug of this unit. The last two lines verify the derivation by hand: the gradient with respect to the logits really is p - y, which is worth seeing once with actual numbers.',
      },
      {
        language: 'python',
        title: 'Evaluate properly: top-1, top-5 and the worst confusions',
        runnable: true,
        code: `import numpy as np
import torch


@torch.no_grad()
def evaluate(model, loader, num_classes, device="cuda"):
    model.eval()
    top1 = top5 = total = 0
    confusion = np.zeros((num_classes, num_classes), dtype=np.int64)

    for images, targets in loader:
        images, targets = images.to(device), targets.to(device)
        logits = model(images)
        _, pred5 = logits.topk(5, dim=1)

        correct = pred5.eq(targets.view(-1, 1))
        top1 += int(correct[:, 0].sum())
        top5 += int(correct.any(dim=1).sum())
        total += targets.size(0)

        for t, p in zip(targets.tolist(), pred5[:, 0].tolist()):
            confusion[t, p] += 1

    off_diagonal = confusion.copy()
    np.fill_diagonal(off_diagonal, 0)
    worst = np.dstack(np.unravel_index(
        np.argsort(off_diagonal.ravel())[::-1][:3], off_diagonal.shape))[0]

    print(f"top-1: {top1 / total:.4f}   top-5: {top5 / total:.4f}   n={total}")
    for true_c, pred_c in worst:
        print(f"  true {true_c:3d} predicted as {pred_c:3d}: "
              f"{off_diagonal[true_c, pred_c]} times")
    return confusion`,
        output: `top-1: 0.8142   top-5: 0.9573   n=3669
  true  23 predicted as  24: 41 times
  true  24 predicted as  23: 38 times
  true   7 predicted as  31: 29 times`,
        explanation:
          'Headline accuracy tells you how much is wrong; the confusion matrix tells you what to do about it. Here two classes account for 79 errors between them in both directions, which is the signature of a genuinely fine-grained pair rather than a general capacity problem — the remedy is higher input resolution or more examples of that pair, not a bigger model. The @torch.no_grad() decorator and model.eval() are both required; forgetting eval leaves batch norm updating its statistics on validation data.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Diabetic retinopathy screening',
        usage:
          'Retinal photographs are graded into five severity classes, and the model triages which patients an ophthalmologist sees first. Because the cost of missing severe disease is asymmetric, the operating threshold is set on the probability rather than taking the argmax.',
      },
      {
        context: 'Content moderation at scale',
        usage:
          'A classifier assigns each upload to policy categories, with high-confidence cases actioned automatically and low-margin cases queued for human review. The margin between the top two probabilities is the routing signal, which makes calibration as important as accuracy.',
      },
      {
        context: 'Agricultural disease identification',
        usage:
          'Phone photographs of leaves are classified into crop diseases. This is fine-grained and heavily affected by lighting and background, so the deployed pipeline combines a pretrained backbone with aggressive augmentation and an explicit out-of-scope class for unrecognisable images.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.models', role: 'Pretrained backbones and the weights.transforms() recipe, the usual starting point for any classification task.' },
      { tool: 'timm', role: 'A far larger catalogue of architectures and pretrained checkpoints, with a consistent interface for replacing the classifier head.' },
      { tool: 'scikit-learn', role: 'confusion_matrix and classification_report for per-class precision, recall and support after inference.' },
      { tool: 'Weights & Biases / TensorBoard', role: 'Logging per-class accuracy and a confusion heatmap, which is where the actionable information lives.' },
    ],

    commonMistakes: [
      {
        mistake: 'Applying softmax before nn.CrossEntropyLoss',
        why: 'The loss already applies log_softmax internally for numerical stability. Feeding it probabilities squashes the input range, producing a smaller loss that trains badly, and nothing raises an error.',
        fix: 'Pass raw logits to nn.CrossEntropyLoss, and apply softmax only when you need probabilities for display or thresholding. If you genuinely need log-probabilities as the model output, pair nn.LogSoftmax with nn.NLLLoss instead.',
      },
      {
        mistake: 'Forgetting model.eval() during validation',
        why: 'Dropout remains active and batch norm keeps updating its running statistics from validation batches, which both lowers the reported score and contaminates the model state with information from the validation set.',
        fix: 'Wrap evaluation in model.eval() plus torch.no_grad(), and switch back with model.train() at the top of each training epoch.',
      },
      {
        mistake: 'Reading accuracy as the only metric on an imbalanced dataset',
        why: 'With 95 per cent negatives, a model that always predicts the majority class scores 95 per cent while being useless. The headline number conceals complete failure on the class that matters.',
        fix: 'Report per-class recall and a confusion matrix, use balanced accuracy or macro F1 as the selection metric, and consider class weighting or resampling during training.',
      },
      {
        mistake: 'Treating softmax confidence as a probability of correctness',
        why: 'Modern networks are systematically overconfident: a set of predictions at 0.95 confidence is often only 85 per cent correct. Softmax also assigns all of its mass among the known classes even for an input belonging to none of them.',
        fix: 'Calibrate with temperature scaling on a held-out split, verify with a reliability diagram, and handle out-of-distribution inputs explicitly rather than hoping low confidence will flag them.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why is cross-entropy used for classification rather than mean squared error?',
        answer:
          'Two reasons, one statistical and one about optimisation. Statistically, cross-entropy is the negative log-likelihood of a categorical model, so minimising it is maximum likelihood estimation for the distribution we actually assumed; squared error corresponds to a Gaussian likelihood, which is the wrong model for a discrete label. Practically, the gradient of cross-entropy with respect to the logits is exactly p - y, so a confident mistake produces a large gradient and gets corrected decisively. With squared error applied after a softmax or sigmoid, the gradient is multiplied by the derivative of that saturating function, which is nearly zero exactly when the model is confidently wrong — so the worst errors generate the weakest learning signal and training stalls.',
        followUp:
          'A strong answer mentions that frameworks fuse log_softmax with the negative log-likelihood for numerical stability, which is why the loss expects logits rather than probabilities.',
      },
      {
        level: 'intermediate',
        question: 'Your model reports 94 per cent accuracy but the business says it is useless. How do you investigate?',
        answer:
          'Start with the class distribution: if 94 per cent of the data belongs to one class, then constant prediction achieves the same score and accuracy is measuring nothing. Produce a confusion matrix and per-class recall, which will show whether the rare and valuable classes are ever being predicted. Then check the metric against the actual cost structure — in screening, a false negative may cost a hundred times a false positive, in which case recall at a fixed precision, or a cost-weighted metric, is the number to optimise and report. Also verify that the evaluation split is representative: a random split of data with duplicates, or with several images per subject, leaks information and inflates every metric. Finally check calibration, because a downstream system thresholding on confidence behaves very differently with an overconfident model even when the argmax accuracy is unchanged.',
        followUp:
          'The best answers ask what decision the model output drives before choosing a metric, rather than defaulting to accuracy or F1.',
      },
      {
        level: 'ml-engineer',
        question: 'What does top-5 accuracy measure that top-1 does not, and when is quoting it dishonest?',
        answer:
          'Top-5 counts a prediction correct if the true label appears anywhere in the five highest-scoring classes. It was adopted for ImageNet for a defensible reason: many images contain several labelled objects while the ground truth records only one, so strict top-1 partly measures agreement with an annotation convention rather than recognition. Top-5 is therefore a reasonable research benchmark on a thousand-class problem with ambiguous labels. Quoting it is dishonest when the deployed system acts on a single prediction, which is almost always, and it is meaningless when the class count is small — top-5 on a six-class problem is nearly free. The rule is to report the metric matching how the output is consumed: top-1 for automated single-label decisions, recall at a fixed precision for triage, and top-k only where a shortlist is genuinely shown to a human.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given logits [1.0, 2.0, 3.0], compute the softmax probabilities and the cross-entropy loss if the true class is index 0.',
        hint: 'Exponentiate, sum, divide, then take the negative natural log of the probability at the true index.',
        solution:
          'Exponentials: e^1 = 2.718, e^2 = 7.389, e^3 = 20.086. Sum = 30.193. Probabilities = [0.0900, 0.2447, 0.6652], which sum to 1. The true class is index 0 with probability 0.0900, so the loss is -ln(0.0900) = 2.408 nats. For reference, random guessing over three classes would give -ln(1/3) = 1.099, so this prediction is worse than chance on this example — the model is confidently wrong.',
      },
      {
        prompt:
          'A 10-class model has 0.92 top-1 accuracy overall, but class 7 has recall 0.31 with 400 of its 500 validation images predicted as class 8. What is happening and what are your next three actions?',
        hint: 'Read the number as a directional confusion rather than as general weakness.',
        solution:
          'This is a directional fine-grained confusion: class 7 is being absorbed into class 8, while class 8 itself may look healthy because it is receiving extra predictions. Overall accuracy hides it because the other eight classes are fine. Three actions: first, look at fifty images from each class side by side to decide whether the distinction is even visible at the current input resolution, since if it is not, raising resolution or cropping to the discriminative region is the fix; second, check the labels, because a systematic one-directional confusion is often an annotation problem; third, if the distinction is real and labelled correctly, rebalance with class weighting or oversampling and retrain, then re-examine the same cell of the matrix rather than the headline number.',
      },
      {
        prompt:
          'Write an evaluation function that returns top-1 accuracy, macro-averaged recall and the three most confused class pairs, and explain why macro recall is reported alongside accuracy.',
        hint: 'Accumulate a confusion matrix; every metric you need is a function of it.',
        language: 'python',
        starterCode: 'import numpy as np\nimport torch\n\n\n@torch.no_grad()\ndef report(model, loader, num_classes, device="cuda"):\n    model.eval()\n    confusion = np.zeros((num_classes, num_classes), dtype=np.int64)\n',
        solution:
          'Accumulate confusion[true, pred] += 1 over the loader, then: top1 = np.trace(confusion) / confusion.sum(); per_class_recall = np.diag(confusion) / np.maximum(confusion.sum(axis=1), 1); macro_recall = per_class_recall.mean(); and for the pairs, zero the diagonal and take the three largest entries with np.argsort on the flattened array.\n\nMacro recall averages over classes rather than over examples, so every class counts equally regardless of how many samples it has. On an imbalanced set, accuracy is dominated by the majority class while macro recall falls immediately when a rare class is ignored, which is precisely the failure that a single accuracy number conceals.',
      },
    ],

    quiz: [
      {
        id: 'CV-007-q1',
        type: 'mcq',
        concept: 'softmax',
        prompt: 'What does softmax do to a vector of logits?',
        options: [
          'Exponentiates each and divides by the sum, giving positive values summing to one',
          'Scales them linearly into the range 0 to 1',
          'Sets the largest to 1 and all others to 0',
          'Subtracts the mean and divides by the standard deviation',
        ],
        answerIndex: 0,
        explanation:
          'Exponentiation makes every value positive and preserves the ordering; dividing by the total makes them sum to one. Because a constant added to all logits cancels, softmax depends only on the differences between them.',
      },
      {
        id: 'CV-007-q2',
        type: 'numeric',
        concept: 'cross-entropy arithmetic',
        prompt:
          'A model assigns probability 0.25 to the true class. What is the cross-entropy loss in nats? Answer to three decimal places.',
        answer: 1.386,
        tolerance: 0.01,
        explanation:
          'The loss is -ln(0.25) = 1.386 nats. For comparison, a probability of 0.5 gives 0.693 and 0.9 gives 0.105 — the penalty grows sharply as the probability assigned to the correct class falls.',
      },
      {
        id: 'CV-007-q3',
        type: 'debug',
        language: 'python',
        concept: 'loss input',
        prompt: 'Why does this training loop converge badly?',
        code: 'logits = model(images)\nprobs = torch.softmax(logits, dim=1)\nloss = nn.CrossEntropyLoss()(probs, targets)',
        options: [
          'CrossEntropyLoss applies log_softmax itself, so softmax is being applied twice',
          'dim should be 0 rather than 1',
          'CrossEntropyLoss requires one-hot targets, not class indices',
          'The model output must be detached before the loss',
        ],
        answerIndex: 0,
        explanation:
          'nn.CrossEntropyLoss expects raw logits and fuses log_softmax with negative log likelihood for stability. Passing probabilities compresses the input range so the gradients are far too small, and no error is raised — a textbook silent bug.',
      },
      {
        id: 'CV-007-q4',
        type: 'truefalse',
        concept: 'confidence and calibration',
        prompt: 'A softmax probability of 0.99 means the model is correct about 99 per cent of the time on such predictions.',
        answer: false,
        explanation:
          'Modern networks are systematically overconfident, so the accuracy among predictions at 0.99 confidence is usually meaningfully lower. Calibration must be measured on a held-out split and corrected, commonly with temperature scaling.',
      },
      {
        id: 'CV-007-q5',
        type: 'multi',
        concept: 'diagnosing errors',
        prompt: 'Your model reports 95 per cent accuracy on a dataset where 94 per cent of images are class A. What should you do? Select all that apply.',
        options: [
          'Report per-class recall rather than overall accuracy',
          'Inspect the confusion matrix to see whether the minority class is ever predicted',
          'Use macro F1 or balanced accuracy as the model-selection metric',
          'Conclude the model is performing well and ship it',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Constant prediction of the majority class would score 94 per cent, so 95 per cent tells you almost nothing. Per-class recall, the confusion matrix and a balanced selection metric all reveal whether the minority class is being learned at all.',
      },
      {
        id: 'CV-007-q6',
        type: 'order',
        concept: 'inference pipeline',
        prompt: 'Order the steps of classifying one image with a pretrained model.',
        items: [
          'Apply the checkpoint preprocessing recipe to the loaded image',
          'Add a batch dimension with unsqueeze(0)',
          'Run the model under torch.no_grad() in eval mode',
          'Apply softmax to the logits',
          'Take the argmax and map the index to a class name',
        ],
        explanation:
          'Preprocessing must match training exactly, the model requires a batch axis, inference runs without gradients and with batch norm in eval mode, and only then are the logits converted to probabilities and to a label.',
      },
      {
        id: 'CV-007-q7',
        type: 'explain',
        concept: 'fine-grained failure',
        prompt:
          'Explain why a classifier that separates dogs from cars easily can still fail badly at separating two dog breeds, in terms of what the backbone produces.',
        rubric: [
          'Notes that the backbone compresses the image to a fixed-length feature vector',
          'Notes that the distinguishing evidence between breeds is small and localised',
          'Concludes that resolution or attention to discriminative regions is the fix, not a larger head',
        ],
        sampleAnswer:
          'By the time the decision is made, the image is no longer available: the backbone has compressed roughly 150,000 pixel values into a few thousand pooled features summarising what is present rather than where. Dog versus car is easy because almost every feature differs. Two closely related breeds differ in a small number of localised cues — the shape of an ear, the pattern on a muzzle — that may cover only a few dozen pixels, and global average pooling averages them together with the whole body and background. Enlarging the classifier head cannot recover information that pooling discarded. The effective remedies act earlier: higher input resolution so the cue survives downsampling, cropping or attention that focuses on the discriminative region, and more training examples of exactly that confusable pair, which the confusion matrix identifies precisely.',
        explanation:
          'The examinable idea is the information bottleneck: what the backbone discards cannot be recovered by the classifier, so fine-grained failures are resolution and attention problems rather than capacity problems.',
      },
    ],

    flashcards: [
      { front: 'What is a logit?', back: 'A raw, unbounded class score before softmax. Only differences between logits matter, so absolute values are not comparable across models.' },
      { front: 'Cross-entropy loss in one sentence?', back: 'The negative log of the probability assigned to the true class: 0 when confidently right, unbounded when confidently wrong.' },
      { front: 'What is the gradient of cross-entropy with respect to the logits?', back: 'p - y, the probability error. This is why softmax and cross-entropy are always paired.' },
      { front: 'Top-1 versus top-5', back: 'Top-1 requires the highest-scoring class to be correct; top-5 requires only that the true class appear in the five highest.' },
      { front: 'Why pass logits, not probabilities, to nn.CrossEntropyLoss?', back: 'It applies log_softmax internally for numerical stability. Passing probabilities applies softmax twice and trains badly with no error.' },
      { front: 'What does global average pooling do?', back: 'Averages each feature map over its spatial extent, turning (C, H, W) into (C,) so any input size reaches the linear head.' },
      { front: 'Why can accuracy be misleading?', back: 'On imbalanced data, always predicting the majority class scores well. Report per-class recall and a confusion matrix instead.' },
    ],

    challenge: {
      title: 'Fine-grained classifier with an honest evaluation report',
      brief:
        'Train a classifier on a fine-grained dataset such as Oxford-IIIT Pet using a pretrained backbone, then produce an evaluation report rather than a single number. The report must contain top-1 and top-5 accuracy, per-class recall sorted worst first, a confusion heatmap, the ten highest-loss validation images with their predicted and true labels, and a reliability diagram comparing confidence with observed accuracy in ten bins. Conclude with a written paragraph naming the two class pairs responsible for most of the error and what you would do next.',
      language: 'python',
      acceptanceCriteria: [
        'Reports top-1, top-5 and macro recall, not accuracy alone',
        'Includes a confusion heatmap and identifies the worst class pairs programmatically',
        'Shows the highest-loss examples, which is where labelling errors surface',
        'Includes a reliability diagram and comments on whether the model is overconfident',
        'Evaluation runs under model.eval() and torch.no_grad(), with the deterministic eval transform',
      ],
      starterCode: 'import torch\nimport torch.nn as nn\nfrom torchvision import datasets, transforms\nfrom torchvision.models import resnet18, ResNet18_Weights\n\nweights = ResNet18_Weights.IMAGENET1K_V1\nmodel = resnet18(weights=weights)\nmodel.fc = nn.Linear(model.fc.in_features, 37)\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate how an image classifier turns pixels into a labelled prediction with a confidence, and what the confidence does and does not mean.',
      mustCover: [
        'The backbone compresses the image into a feature vector, then a linear head produces one score per class',
        'Softmax turns those raw scores into probabilities that sum to one',
        'Cross-entropy measures the negative log probability given to the correct class, and training minimises it',
        'A high softmax probability is not the same as a high probability of being right',
      ],
      bonusSignals: ['works through a softmax calculation', 'distinguishes top-1 from top-5', 'mentions the confusion matrix as the diagnostic tool'],
      sampleExplanation:
        'The picture goes through a stack of convolution layers that gradually trade spatial detail for meaning: the resolution shrinks while the number of feature maps grows, so by the end you no longer have 150,000 pixel values but a couple of thousand numbers describing what kinds of structure are present. A single matrix multiply turns those into one raw score per class, called a logit. Logits can be any size, so softmax exponentiates them and divides by the total, giving numbers that are positive and add up to one — which we read as percentages. The largest is the prediction. Training measures the negative logarithm of the probability the model gave to the correct answer, so being right with 0.9 costs almost nothing and being wrong with 0.01 costs a great deal, and every weight is nudged to move probability towards the truth. The caution is that the confidence is not a probability of correctness: these networks are usually overconfident, and shown something belonging to none of their classes they will still hand out all of their probability among them, often decisively. That is why you look at a confusion matrix rather than a single accuracy number, and calibrate before letting a threshold make decisions.',
    },
  },

  {
    id: 'CV-008',
    domain: 'CV',
    module: 'Vision Tasks',
    topic: 'Detection and boxes',
    title: 'Object Detection and Bounding Boxes',
    slug: 'object-detection',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['CV-003', 'CV-007'],
    related: ['CV-002', 'CV-003', 'CV-005', 'CV-007'],
    tags: ['detection', 'bounding-box', 'iou', 'nms', 'map', 'yolo', 'faster-rcnn', 'anchors'],

    learningObjectives: [
      'State what detection adds to classification, and why the output is a variable-length list',
      'Convert between xyxy, xywh, cxcywh and normalised box formats without error',
      'Compute intersection over union by hand and explain what a given value means',
      'Explain non-maximum suppression step by step and say what its threshold controls',
      'Contrast one-stage and two-stage detectors, and explain anchors and the anchor-free trend',
      'Read a mean average precision number and know what it hides',
    ],

    terminology: [
      {
        term: 'Bounding box',
        definition:
          'An axis-aligned rectangle localising one object, stored as four numbers. The format must be stated: xyxy gives two corners, xywh gives a corner plus extents, cxcywh gives the centre plus extents.',
        simple: 'A rectangle drawn around an object, written as four numbers.',
      },
      {
        term: 'Intersection over union (IoU)',
        definition:
          'The area of overlap between two boxes divided by the area of their union. It is 1 for identical boxes, 0 for disjoint ones, and is the standard measure of localisation quality.',
        simple: 'How much two rectangles overlap, as a fraction of the total area they cover between them.',
      },
      {
        term: 'Non-maximum suppression (NMS)',
        definition:
          'The post-processing step that removes duplicate detections: sort by confidence, keep the highest, discard every remaining box of the same class whose IoU with it exceeds a threshold, and repeat.',
        simple: 'Keep the best box and throw away the near-copies of it.',
      },
      {
        term: 'Anchor box',
        definition:
          'A predefined reference rectangle of fixed size and aspect ratio tiled across the feature map. The network predicts offsets from anchors rather than absolute coordinates, which stabilises regression.',
        simple: 'A starting-guess rectangle the network only has to correct, rather than invent from nothing.',
      },
      {
        term: 'Mean average precision (mAP)',
        definition:
          'The area under the precision-recall curve averaged over classes, at one or more IoU thresholds. COCO mAP averages over IoU from 0.50 to 0.95 in steps of 0.05, which makes it much stricter than mAP at 0.50.',
        simple: 'One number summarising how well a detector finds things without crying wolf.',
      },
      {
        term: 'One-stage versus two-stage',
        definition:
          'Two-stage detectors first propose candidate regions then classify and refine them; one-stage detectors predict class and box densely in a single pass. The distinction trades accuracy on difficult cases against latency.',
        simple: 'Either shortlist first and examine carefully, or judge everywhere at once and be fast.',
      },
    ],

    simpleExplanation:
      "Classification answers what is in this picture. Detection answers what is in this picture and where, for every object at once. That change sounds small and is not. A classifier always produces the same shaped answer: one score per category. A detector must produce a list whose length it does not know in advance — no cars in this frame, seventeen in the next — and each entry needs a rectangle, a category and a confidence. The usual approach is to ask the same question at thousands of positions across the image: is there an object centred near here, what is it, and how should the rectangle around it be adjusted. That produces a mess of overlapping guesses, most of them near-duplicates of each other, so a cleanup step keeps the most confident box of each cluster and deletes the rest. To judge whether a predicted rectangle counts as correct, we measure how much it overlaps the true rectangle using a ratio called intersection over union, and require that ratio to exceed a threshold before we call it a hit.",

    whyItExists:
      'Most useful decisions about an image depend on where things are and how many there are, not merely whether something is present: counting stock, avoiding a pedestrian, reading a form field, tracking a player. A whole-image label cannot express multiplicity or position, so detection exists to produce a variable-length, spatially grounded description that downstream systems can act on.',

    analogy: {
      scenario:
        'Picture a stocktake in a warehouse aisle. One person walks past with a clipboard and, standing at each metre mark, writes down whether a pallet seems to start near them, what is on it and roughly where its edges are. Walking the aisle produces dozens of overlapping entries, because the same pallet is noticed from three consecutive positions. A supervisor then merges the duplicates: for each cluster of entries describing the same region, keep the most confident one and strike out the rest. To audit the result, an inspector compares each recorded rectangle against the true pallet footprint and accepts it only if the overlap is good enough.',
      mapping: [
        { from: 'Standing at each metre mark and reporting', to: 'Dense prediction at every position of the feature map' },
        { from: 'Several entries for one pallet', to: 'Multiple raw detections of a single object' },
        { from: 'The supervisor merging duplicates', to: 'Non-maximum suppression' },
        { from: 'Keeping the most confident entry of a cluster', to: 'Sorting by score and retaining the maximum' },
        { from: 'The inspector requiring good enough overlap', to: 'The IoU threshold that defines a true positive' },
        { from: 'A rough rectangle the clerk corrects rather than invents', to: 'An anchor box, refined by a predicted offset' },
      ],
      bridge:
        'The clipboard walk is exactly the structure of a one-stage detector: a fixed grid of positions, a prediction at each, and a merge step at the end. Two things follow that beginners find surprising. The number of detections is not something the network outputs — it emerges from thresholding and suppression, which is why a confidence threshold changes the count. And the IoU threshold is a policy decision, not a property of the model: raising it from 0.5 to 0.75 will make the same detector look considerably worse without changing a single weight.',
      limitations:
        'A warehouse aisle is one-dimensional and pallets do not overlap. Real scenes have objects in front of each other, and NMS handles that badly: two genuinely distinct objects that overlap heavily will suppress one another, which is precisely why crowded-scene detection remains hard and why soft-NMS and set-prediction approaches exist.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Box formats, and the conversions that bite',
        columns: ['Format', 'Four numbers', 'Used by', 'Conversion to xyxy'],
        rows: [
          ['xyxy (Pascal VOC)', 'x_min, y_min, x_max, y_max', 'torchvision, Pascal VOC, most losses', 'Already there'],
          ['xywh (COCO)', 'x_min, y_min, width, height', 'COCO JSON annotations', 'x2 = x1 + w, y2 = y1 + h'],
          ['cxcywh (YOLO)', 'centre_x, centre_y, width, height', 'YOLO label files, usually normalised', 'x1 = cx - w/2, y1 = cy - h/2'],
          ['Normalised', 'Any of the above divided by image width and height', 'YOLO text labels, resolution-independent storage', 'Multiply by W and H first'],
        ],
      },
      {
        kind: 'flow',
        title: 'Non-maximum suppression, step by step',
        caption: 'Run per class. The threshold decides how much overlap counts as a duplicate.',
        steps: [
          { label: 'Discard low scores', detail: 'Drop every box below the confidence threshold, often 0.25 for display or 0.001 for evaluation.' },
          { label: 'Sort by confidence', detail: 'Highest first. NMS is greedy and never revisits a decision.' },
          { label: 'Take the top box and keep it', detail: 'It is by definition the most confident remaining detection.' },
          { label: 'Suppress its near-duplicates', detail: 'Remove every remaining same-class box with IoU above the threshold, commonly 0.45 to 0.7.' },
          { label: 'Repeat on what remains', detail: 'Continue until the list is empty. The survivors are the final detections.' },
        ],
      },
      {
        kind: 'compare',
        title: 'One-stage versus two-stage detectors',
        caption: 'Both are still in production use; the choice is a latency-accuracy decision.',
        left: {
          heading: 'One-stage — YOLO, SSD, RetinaNet, FCOS',
          points: [
            'Predicts class and box densely in a single forward pass',
            'Real-time on modest hardware; YOLO variants run at hundreds of frames per second',
            'Historically weaker on small and heavily overlapping objects',
            'Focal loss was invented to fix the extreme foreground-background imbalance this creates',
          ],
        },
        right: {
          heading: 'Two-stage — Faster R-CNN and successors',
          points: [
            'A region proposal network shortlists candidates, then a head classifies and refines each',
            'Typically stronger localisation, especially at high IoU thresholds',
            'Several times slower, with a more complex training recipe',
            'Extends naturally to instance segmentation by adding a mask head, as in Mask R-CNN',
          ],
        },
      },
      {
        kind: 'timeline',
        title: 'How detection architectures evolved',
        events: [
          { when: '2001', what: 'Viola-Jones: cascaded Haar features make real-time face detection possible on a CPU.' },
          { when: '2014', what: 'R-CNN: run a CNN on each of 2,000 region proposals. Accurate and about 47 seconds per image.' },
          { when: '2015', what: 'Faster R-CNN: the region proposal network is learned and shares the backbone, reaching about 5 frames per second.' },
          { when: '2016', what: 'YOLO and SSD: a single pass over a grid, trading some accuracy for real-time speed.' },
          { when: '2017', what: 'Focal loss and RetinaNet: one-stage accuracy catches up by fixing class imbalance.' },
          { when: '2019', what: 'FCOS and CenterNet: anchors are dropped in favour of predicting object centres directly.' },
          { when: '2020', what: 'DETR: set prediction with bipartite matching removes NMS from the pipeline entirely.' },
          { when: '2023 onwards', what: 'Anchor-free YOLO variants and real-time DETR converge on high accuracy at video rates.' },
        ],
      },
    ],

    formalDefinition:
      'Object detection learns a function from an image to a set of tuples (b, c, s), where b is a bounding box in R^4, c is a class label and s a confidence score, with the set cardinality unknown a priori. Training minimises a sum of a classification loss over assigned locations and a localisation loss over positive assignments, where assignment is determined by IoU with ground-truth boxes or by a matching criterion. Evaluation computes precision and recall as functions of the confidence threshold, with a detection counted as a true positive when its IoU with an unmatched ground-truth box of the same class exceeds a stated threshold, and summarises the resulting curve as average precision, averaged over classes to give mAP.',

    math: {
      intuition:
        'Everything in detection evaluation rests on one ratio. Two rectangles either overlap or they do not; the overlapping area measures agreement, and dividing by the union normalises it so that large boxes are not flattered. The resulting number is between 0 and 1, is 1 only for identical boxes, and gives a threshold that turns a continuous notion of closeness into the binary decision that precision and recall require.',
      formulas: [
        {
          latex: '\\text{IoU}(A, B) = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{|A \\cap B|}{|A| + |B| - |A \\cap B|}',
          name: 'Intersection over union',
          meaning:
            'The overlap area divided by the combined area. The right-hand form is the one you compute, since the union is never measured directly — it is the sum of the two areas minus the double-counted intersection.',
          variables: [
            { symbol: 'A, B', meaning: 'The two boxes, typically a prediction and a ground-truth box' },
            { symbol: '|A \\cap B|', meaning: 'Area of the overlapping rectangle, zero if they do not overlap' },
            { symbol: '|A \\cup B|', meaning: 'Area covered by either box' },
          ],
        },
        {
          latex: 'w_{\\cap} = \\max\\!\\big(0,\\ \\min(x_2^A, x_2^B) - \\max(x_1^A, x_1^B)\\big)',
          name: 'Intersection width (and identically, height)',
          meaning:
            'The overlap along one axis is the rightmost left edge subtracted from the leftmost right edge, clamped at zero. The clamp is what makes disjoint boxes give zero rather than a spurious negative area.',
          variables: [
            { symbol: 'x_1, x_2', meaning: 'Left and right edges of a box in xyxy format' },
            { symbol: 'w_{\\cap}', meaning: 'Width of the intersection rectangle' },
          ],
        },
        {
          latex: 'P = \\frac{TP}{TP + FP}, \\qquad R = \\frac{TP}{TP + FN}, \\qquad AP = \\int_0^1 P(R)\\, dR',
          name: 'Precision, recall and average precision',
          meaning:
            'Sweeping the confidence threshold traces a curve of precision against recall; average precision is the area beneath it. A detector can always raise recall by lowering the threshold, so only the curve, not a single operating point, characterises it.',
          variables: [
            { symbol: 'TP', meaning: 'Detections matching an unmatched ground-truth box above the IoU threshold' },
            { symbol: 'FP', meaning: 'Detections with no valid match, including duplicates of an already-matched object' },
            { symbol: 'FN', meaning: 'Ground-truth objects with no matching detection' },
          ],
          category: 'classification',
        },
        {
          latex: '\\text{mAP}@[.5{:}.95] = \\frac{1}{10}\\sum_{t \\in \\{0.50, 0.55, \\ldots, 0.95\\}} \\text{mAP}@t',
          name: 'COCO mean average precision',
          meaning:
            'Averages mAP over ten IoU thresholds, so a detector is rewarded for tight localisation rather than merely hitting the object. This is why COCO mAP values look low: 0.45 is a strong result, whereas mAP at 0.50 alone for the same model might be 0.65.',
          variables: [
            { symbol: 't', meaning: 'The IoU threshold defining a true positive' },
          ],
        },
        {
          latex: 't_x = \\frac{x - x_a}{w_a}, \\quad t_w = \\log\\!\\frac{w}{w_a}',
          name: 'Anchor box parameterisation',
          meaning:
            'The network predicts normalised offsets from an anchor rather than absolute coordinates: a centre shift measured in anchor widths, and a log scale ratio. The log makes the width target symmetric for doubling and halving, and keeps the regression targets near zero.',
          variables: [
            { symbol: 'x, w', meaning: 'Ground-truth centre and width' },
            { symbol: 'x_a, w_a', meaning: 'Anchor centre and width' },
            { symbol: 't_x, t_w', meaning: 'The regression targets the network actually learns' },
          ],
        },
      ],
      derivation: [
        'Why divide by the union rather than by the ground-truth area alone? Consider a prediction that covers the entire image and a ground-truth box of 100x100 pixels.',
        'Intersection over ground-truth area would be 10,000/10,000 = 1.0: a perfect score for a box that localises nothing.',
        'Intersection over union is 10,000 divided by the whole image area, which for a 1000x1000 image is 10,000/1,000,000 = 0.01.',
        'The union term therefore penalises over-large predictions as well as under-large ones, making IoU symmetric in a way that one-sided ratios are not.',
        'The same argument explains why IoU is scale-invariant: multiplying both boxes by a constant scales intersection and union equally, leaving the ratio unchanged.',
      ],
    },

    workedExample: {
      title: 'Computing IoU by hand, then running NMS on four boxes',
      setup:
        'A detector predicts a box A = (50, 50, 150, 150) in xyxy pixel coordinates. The ground-truth box is B = (100, 100, 200, 200). We compute the IoU exactly, decide whether it counts as a true positive, and then run non-maximum suppression over a small set of overlapping predictions.',
      steps: [
        {
          label: 'Compute each area',
          detail: 'A is 100 wide and 100 tall, so 10,000 square pixels. B is the same size, also 10,000.',
          latex: '|A| = (150-50)(150-50) = 10{,}000, \\quad |B| = 10{,}000',
        },
        {
          label: 'Find the intersection rectangle',
          detail:
            'Left edge: max(50, 100) = 100. Right edge: min(150, 200) = 150. Top edge: max(50, 100) = 100. Bottom edge: min(150, 200) = 150. So the overlap is the square (100, 100, 150, 150).',
          latex: '\\cap = (\\max(50,100),\\ \\max(50,100),\\ \\min(150,200),\\ \\min(150,200))',
        },
        {
          label: 'Compute the intersection area',
          detail: 'Width = 150 - 100 = 50, height = 150 - 100 = 50, so the area is 2,500 square pixels. Both dimensions are positive, so the boxes genuinely overlap.',
          latex: '|A \\cap B| = 50 \\times 50 = 2{,}500',
        },
        {
          label: 'Compute the union',
          detail: 'Add the areas and subtract the double-counted overlap: 10,000 + 10,000 - 2,500 = 17,500.',
          latex: '|A \\cup B| = 10{,}000 + 10{,}000 - 2{,}500 = 17{,}500',
        },
        {
          label: 'Divide',
          detail:
            'IoU = 2,500 / 17,500 = 0.1429. Against the usual threshold of 0.5 this is a false positive, and the ground-truth object counts as missed. Visually the boxes look as though they overlap substantially, which is worth noticing: IoU is much harsher than intuition.',
          latex: '\\text{IoU} = \\frac{2{,}500}{17{,}500} = 0.1429',
        },
        {
          label: 'Now a second prediction',
          detail:
            'C = (95, 105, 205, 195) against the same B. Intersection: x from max(100,95)=100 to min(200,205)=200, so 100 wide; y from max(100,105)=105 to min(200,195)=195, so 90 tall — area 9,000. Areas: |C| = 110 x 90 = 9,900, |B| = 10,000. Union = 9,900 + 10,000 - 9,000 = 10,900. IoU = 9,000/10,900 = 0.826.',
          latex: '\\text{IoU}(C, B) = \\frac{9{,}000}{10{,}900} = 0.826',
        },
        {
          label: 'Run NMS over four predictions',
          detail:
            'Same class, scores: C (0.92), D = (98, 102, 202, 198) (0.88), A (0.61), E = (400, 400, 500, 500) (0.55). Sort descending. Keep C. IoU(C, D) = 0.889, above the 0.5 threshold, so D is suppressed as a duplicate. IoU(C, A) = 0.142, below the threshold, so A survives this round. Keep A next. IoU(A, E) = 0, so E survives and is kept.',
        },
        {
          label: 'Read the outcome honestly',
          detail:
            'NMS returns C, A and E. Matching against the single ground-truth box B: C matches at IoU 0.826 and is the true positive; A is a false positive because B is already matched; E is a false positive with no overlap at all. Precision is 1/3 and recall is 1/1.',
        },
      ],
      conclusion:
        'Two lessons that repay memorising. First, boxes that look well aligned can score surprisingly low — a half-overlap in each axis gives an IoU of about 0.14, not 0.5 — which is why localisation quality must be measured rather than eyeballed. Second, NMS is greedy and per class: it removed the genuine duplicate D, but it also let through A, which survived only because it overlapped the true object too little to be recognised as a duplicate. Raising the confidence threshold, not the NMS threshold, is the correct lever against that kind of false positive.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'IoU and NMS written out, then checked against torchvision',
        runnable: true,
        code: `import torch
from torchvision.ops import box_iou, nms


def iou_pair(a, b):
    """IoU of two boxes in xyxy format, computed step by step."""
    ix1, iy1 = max(a[0], b[0]), max(a[1], b[1])
    ix2, iy2 = min(a[2], b[2]), min(a[3], b[3])
    iw, ih = max(0.0, ix2 - ix1), max(0.0, iy2 - iy1)   # clamp: no negative overlap
    inter = iw * ih
    area_a = (a[2] - a[0]) * (a[3] - a[1])
    area_b = (b[2] - b[0]) * (b[3] - b[1])
    return inter / (area_a + area_b - inter)


A = [50.0, 50.0, 150.0, 150.0]
B = [100.0, 100.0, 200.0, 200.0]
print("IoU(A, B) by hand:", round(iou_pair(A, B), 4))

boxes = torch.tensor([
    [95.0, 105.0, 205.0, 195.0],     # C
    [98.0, 102.0, 202.0, 198.0],     # D, a near-duplicate of C
    [50.0, 50.0, 150.0, 150.0],      # A
    [400.0, 400.0, 500.0, 500.0],    # E, elsewhere entirely
])
scores = torch.tensor([0.92, 0.88, 0.61, 0.55])

print("pairwise IoU:\\n", box_iou(boxes, boxes).round(decimals=3))
kept = nms(boxes, scores, iou_threshold=0.5)
print("kept indices:", kept.tolist())
print("kept scores:", [round(float(s), 2) for s in scores[kept]])`,
        output: `IoU(A, B) by hand: 0.1429
pairwise IoU:
 tensor([[1.000, 0.889, 0.142, 0.000],
        [0.889, 1.000, 0.143, 0.000],
        [0.142, 0.143, 1.000, 0.000],
        [0.000, 0.000, 0.000, 1.000]])
kept indices: [0, 2, 3]
kept scores: [0.92, 0.61, 0.55]`,
        explanation:
          'The hand-written function reproduces the 0.1429 computed on paper. Two implementation details matter: the clamp at zero, without which disjoint boxes produce a negative intersection and a nonsensical negative IoU; and the fact that torchvision nms is class-agnostic, so you must either call it per class or use batched_nms, which offsets the coordinates by class id to achieve the same effect in one call.',
      },
      {
        language: 'python',
        title: 'Box format conversions, where most detection bugs live',
        runnable: true,
        code: `import torch
from torchvision.ops import box_convert

xyxy = torch.tensor([[100.0, 150.0, 300.0, 450.0]])
img_w, img_h = 640.0, 480.0

xywh = box_convert(xyxy, in_fmt="xyxy", out_fmt="xywh")
cxcywh = box_convert(xyxy, in_fmt="xyxy", out_fmt="cxcywh")
print("xyxy  :", xyxy.tolist())
print("xywh  :", xywh.tolist())          # x_min, y_min, w, h
print("cxcywh:", cxcywh.tolist())        # centre_x, centre_y, w, h

# YOLO label files store cxcywh NORMALISED by image size
normalised = cxcywh / torch.tensor([img_w, img_h, img_w, img_h])
print("yolo txt line:", " ".join(f"{v:.6f}" for v in normalised[0].tolist()))

# And back again -- the round trip every dataloader must get right
back = box_convert(normalised * torch.tensor([img_w, img_h, img_w, img_h]),
                   in_fmt="cxcywh", out_fmt="xyxy")
print("round trip matches:", torch.allclose(back, xyxy))`,
        output: `xyxy  : [[100.0, 150.0, 300.0, 450.0]]
xywh  : [[100.0, 150.0, 200.0, 300.0]]
cxcywh: [[200.0, 300.0, 200.0, 300.0]]
yolo txt line: 0.312500 0.625000 0.312500 0.625000
round trip matches: True`,
        explanation:
          'Notice that xywh and cxcywh share the same last two numbers and differ entirely in the first two, which is exactly why confusing them produces boxes offset by half their size — an error small enough to look like a poorly trained model rather than a bug. Normalisation adds a second trap: a normalised box fed to a function expecting pixels collapses to a few pixels in the top-left corner. Always convert explicitly, and assert that coordinates lie in the range you expect.',
      },
      {
        language: 'python',
        title: 'Running a pretrained detector and reading its output',
        runnable: true,
        code: `import torch
from torchvision.io import read_image
from torchvision.models.detection import (
    fasterrcnn_resnet50_fpn_v2, FasterRCNN_ResNet50_FPN_V2_Weights,
)

weights = FasterRCNN_ResNet50_FPN_V2_Weights.DEFAULT
model = fasterrcnn_resnet50_fpn_v2(weights=weights, box_score_thresh=0.5).eval()
names = weights.meta["categories"]

img = read_image("street.jpg")                    # uint8 CHW tensor
batch = [weights.transforms()(img)]               # a LIST of images, not a stack

with torch.no_grad():
    output = model(batch)[0]

print("keys:", sorted(output.keys()))
print("detections above threshold:", len(output["boxes"]))
for box, label, score in zip(output["boxes"], output["labels"], output["scores"]):
    x1, y1, x2, y2 = (round(float(v)) for v in box)
    print(f"  {names[label]:12s} {score:.3f}  ({x1}, {y1}) -> ({x2}, {y2})"
          f"  area={((x2 - x1) * (y2 - y1)):,} px")`,
        output: `keys: ['boxes', 'labels', 'scores']
detections above threshold: 4
  person        0.997  (412, 188) -> (498, 421)  area=20,038
  car           0.991  (12, 240) -> (231, 372)   area=28,908
  car           0.964  (298, 251) -> (389, 320)  area=6,279
  bicycle       0.812  (455, 330) -> (540, 430)  area=8,500
`,
        explanation:
          'Three things distinguish a detector API from a classifier. It takes a list of images of arbitrary sizes rather than a stacked batch, because detection handles variable resolution natively. It returns a dictionary of parallel arrays whose length varies per image and depends on box_score_thresh, so the number of detections is a function of your threshold rather than a property of the scene. And the boxes come back in xyxy pixel coordinates of the input image, already through NMS — which is why raising box_score_thresh changes the count while the NMS threshold changes how aggressively near-duplicates were merged.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Driver assistance and autonomous driving',
        usage:
          'Pedestrian, vehicle and sign detection run at video rate with a hard latency budget, which is why one-stage anchor-free detectors dominate. Recall on small and distant objects is the metric that matters, and it is reported separately from the headline mAP.',
      },
      {
        context: 'Retail shelf auditing',
        usage:
          'Detectors count facings of each product on a shelf from a phone photograph. The scene is dense and repetitive, so NMS tuning is decisive: too aggressive and adjacent identical products merge into one detection, undercounting the shelf.',
      },
      {
        context: 'Medical imaging triage',
        usage:
          'Lesion and nodule detection is evaluated with FROC — sensitivity against false positives per scan — rather than mAP, because a radiologist cares about how many spurious marks they must dismiss per case, not about an area under a precision-recall curve.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.ops', role: 'box_iou, nms, batched_nms, box_convert and generalized_box_iou_loss — the primitives every detection pipeline needs.' },
      { tool: 'Ultralytics YOLO', role: 'A complete one-stage training and export pipeline with letterboxing, mosaic augmentation and NMS built in.' },
      { tool: 'Detectron2 / MMDetection', role: 'Research-grade two-stage and one-stage implementations with reproducible configurations.' },
      { tool: 'pycocotools', role: 'The reference mAP implementation. Report COCO mAP with this rather than a hand-written evaluator.' },
      { tool: 'Albumentations', role: 'Augments images and boxes together, with min_visibility to drop boxes cropped out of the frame.' },
    ],

    commonMistakes: [
      {
        mistake: 'Mixing up xywh and cxcywh',
        why: 'Both formats end with width and height, so shapes and ranges look plausible. The difference is whether the first two numbers are a corner or the centre, so every box lands offset by half its own size.',
        fix: 'Convert explicitly with torchvision box_convert and name variables for their format, such as boxes_xyxy. Assert that x_min is less than x_max after every conversion.',
      },
      {
        mistake: 'Forgetting to transform boxes when the image is resized or letterboxed',
        why: 'The image changes coordinates but the annotations do not, so the model learns a systematic offset. When the transform is letterboxing, the offset also varies with each image aspect ratio, which makes it look like random noise in the labels.',
        fix: 'Use a library that transforms images and boxes jointly, and keep the letterbox scale and padding so predictions can be mapped back. Render a sample of training images with their boxes drawn before every run.',
      },
      {
        mistake: 'Running class-agnostic NMS across all classes',
        why: 'A person standing in front of a car legitimately produces two heavily overlapping boxes of different classes. Suppressing across classes deletes one of them, losing a correct detection entirely.',
        fix: 'Run NMS per class, or use torchvision batched_nms, which offsets coordinates by class index so that different classes can never suppress each other.',
      },
      {
        mistake: 'Comparing mAP numbers from different protocols',
        why: 'COCO mAP averages over IoU 0.50 to 0.95 while Pascal VOC mAP uses IoU 0.50 alone, and the same model routinely scores twenty points higher under the second. Small-object subsets and maximum-detection limits differ too.',
        fix: 'State the protocol with every number: mAP@[.5:.95] or mAP@0.5, which dataset, and which detection limit. Use pycocotools so the protocol is not reimplemented informally.',
      },
      {
        mistake: 'Treating the confidence threshold as a model property',
        why: 'The number of detections, and therefore precision and recall, are entirely determined by the threshold. Two teams reporting different results often have identical models and different thresholds.',
        fix: 'Evaluate over the whole precision-recall curve with a near-zero threshold, and choose an operating point separately based on the cost of a false positive against a miss.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain IoU and non-maximum suppression, and say what each threshold controls.',
        answer:
          'IoU is the area of overlap between two boxes divided by the area of their union, giving a scale-invariant number between 0 and 1 that measures localisation agreement. It is used in two distinct places, which is a common source of confusion. In evaluation it defines what counts as a true positive: a prediction matches a ground-truth box only if their IoU exceeds a stated threshold, typically 0.5 for the permissive Pascal VOC protocol and averaged from 0.5 to 0.95 for COCO. In post-processing it drives NMS: sort detections by confidence, keep the highest, remove every remaining same-class box whose IoU with it exceeds the NMS threshold, and repeat. The NMS threshold therefore controls how eager you are to call two boxes duplicates — lower it and crowded scenes lose genuine objects, raise it and every object sprouts several boxes. The evaluation threshold is a measurement policy and changes no weights; the NMS threshold changes the output the model actually produces.',
        followUp:
          'A strong answer notes that NMS must be run per class, and mentions soft-NMS or DETR-style set prediction as ways of avoiding the crowded-scene failure altogether.',
      },
      {
        level: 'advanced',
        question: 'What are anchor boxes, why were they introduced, and why is the field moving away from them?',
        answer:
          'An anchor is a predefined reference rectangle of a given scale and aspect ratio, tiled at every position of a feature map. Rather than regressing absolute coordinates, the network predicts small normalised offsets from the anchor — a centre shift in anchor widths and a log scale ratio — which keeps regression targets near zero and well conditioned, and lets one position handle objects of several shapes at once. They were introduced in Faster R-CNN and became universal because direct coordinate regression trained poorly. The costs accumulated, though: anchor scales and ratios are dataset-specific hyperparameters that must be tuned or clustered, the assignment rule between anchors and ground truth adds complexity, and tiling many anchors creates an extreme foreground-background imbalance that needed focal loss to fix. Anchor-free detectors such as FCOS and CenterNet instead predict object centres and distances to the four edges directly, removing those hyperparameters entirely, and DETR goes further by treating detection as set prediction with bipartite matching, which eliminates NMS as well. Modern YOLO releases are anchor-free for the same reasons.',
      },
      {
        level: 'ml-engineer',
        question: 'A detector reports mAP@0.5 of 0.72 but the customer says it misses too much. How do you investigate?',
        answer:
          'First establish what miss means operationally, because mAP is an average over classes and thresholds and hides exactly this. Break the number down: per-class average precision will often show that one important class is far below the mean; per-size breakdown, as COCO reports for small, medium and large objects, usually shows small objects collapsing, which points at input resolution or feature-pyramid levels rather than at the model family. Then separate the error types: are the misses complete failures to fire, in which case recall at a low confidence threshold is the diagnostic, or are they detections suppressed by NMS in crowded regions, or boxes that fired but fell below the operating threshold? The fixes differ entirely — raise resolution, adjust the NMS threshold, lower the confidence threshold and accept more false positives, or collect more examples of the failing class. Finally check the evaluation protocol matches the customer expectation: they may care about recall at a fixed false-positive rate, which no mAP number reports.',
        followUp:
          'The strongest answers ask to see the actual failure images before touching the model, since a systematic miss on one camera angle or lighting condition is a data problem, not an architecture problem.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the IoU of boxes (0, 0, 100, 100) and (50, 50, 150, 150) in xyxy format, showing every step.',
        hint: 'Find the intersection rectangle first, then use union = areaA + areaB - intersection.',
        solution:
          'Intersection: x from max(0, 50) = 50 to min(100, 150) = 100, so width 50; y identically 50. Intersection area = 2,500. Each box is 100 x 100 = 10,000, so the union is 10,000 + 10,000 - 2,500 = 17,500. IoU = 2,500/17,500 = 0.1429. Against the usual 0.5 threshold this is not a match, which is worth sitting with: two boxes overlapping by half in each axis score only 0.14, so IoU punishes misalignment far harder than the eye does.',
      },
      {
        prompt:
          'You have five same-class detections with scores [0.9, 0.85, 0.8, 0.4, 0.35]. Box 2 has IoU 0.7 with box 1, box 3 has IoU 0.3 with box 1 and 0.8 with box 2, and boxes 4 and 5 overlap nothing. Which survive NMS at threshold 0.5?',
        hint: 'NMS is greedy: process in score order, and suppressed boxes never suppress anyone themselves.',
        solution:
          'Keep box 1 (0.9). Box 2 has IoU 0.7 with it, above 0.5, so box 2 is suppressed. Box 3 has IoU 0.3 with box 1, below the threshold, so it survives this round — and crucially its IoU of 0.8 with box 2 is irrelevant, because box 2 has already been removed and removed boxes do not suppress. Next kept is box 3 (0.8). Boxes 4 and 5 overlap nothing, so both survive. Final: boxes 1, 3, 4 and 5. This illustrates the greediness of NMS: a different score ordering would have produced a different surviving set from the same geometry.',
      },
      {
        prompt:
          'Write a function converting a YOLO label line (class cx cy w h, all normalised) into an xyxy pixel box, and explain the two assertions you would add.',
        hint: 'Denormalise first, then shift from centre to corners.',
        language: 'python',
        starterCode: 'def yolo_to_xyxy(line: str, img_w: int, img_h: int):\n    cls, cx, cy, w, h = line.split()\n',
        solution:
          'cls = int(cls); cx, cy, w, h = (float(v) for v in (cx, cy, w, h))\nassert all(0.0 <= v <= 1.0 for v in (cx, cy, w, h)), "YOLO labels must be normalised"\ncx, w = cx * img_w, w * img_w\ncy, h = cy * img_h, h * img_h\nx1, y1 = cx - w / 2, cy - h / 2\nx2, y2 = cx + w / 2, cy + h / 2\nassert x1 < x2 and y1 < y2, "degenerate box after conversion"\nreturn cls, [x1, y1, x2, y2]\n\nThe first assertion catches the most common dataset error, a label file already in pixels being read as normalised, which would otherwise produce boxes a few pixels across in the top-left corner. The second catches a corner-versus-centre mix-up, which frequently yields x1 greater than x2 and would silently give a negative area in any IoU computation.',
      },
    ],

    quiz: [
      {
        id: 'CV-008-q1',
        type: 'numeric',
        concept: 'IoU by hand',
        prompt:
          'Boxes A = (50, 50, 150, 150) and B = (100, 100, 200, 200) in xyxy. What is their IoU, to four decimal places?',
        answer: 0.1429,
        tolerance: 0.002,
        explanation:
          'The intersection is the 50x50 square (100, 100, 150, 150), area 2,500. Each box has area 10,000, so the union is 10,000 + 10,000 - 2,500 = 17,500, and 2,500/17,500 = 0.1429 — below the usual 0.5 threshold despite looking like a substantial overlap.',
      },
      {
        id: 'CV-008-q2',
        type: 'mcq',
        concept: 'non-maximum suppression',
        prompt: 'What problem does non-maximum suppression solve?',
        options: [
          'Multiple overlapping detections of the same object, keeping only the most confident',
          'Class imbalance between foreground and background during training',
          'Boxes that extend beyond the image boundary',
          'Objects that are too small for the feature map resolution',
        ],
        answerIndex: 0,
        explanation:
          'Dense prediction fires at several positions around one object, so the raw output contains clusters of near-duplicates. NMS keeps the highest-scoring box of each cluster and removes the rest. Foreground-background imbalance is what focal loss addresses, which is a different problem entirely.',
      },
      {
        id: 'CV-008-q3',
        type: 'truefalse',
        concept: 'evaluation protocols',
        prompt: 'COCO mAP@[.5:.95] and Pascal VOC mAP@0.5 are directly comparable numbers.',
        answer: false,
        explanation:
          'COCO averages over ten IoU thresholds up to 0.95 and therefore rewards tight localisation, so the same detector typically scores fifteen to twenty points lower under COCO than under VOC. Any reported mAP must state its protocol.',
      },
      {
        id: 'CV-008-q4',
        type: 'match',
        concept: 'box formats',
        prompt: 'Match each box format to what its four numbers mean.',
        pairs: [
          { left: 'xyxy', right: 'x_min, y_min, x_max, y_max' },
          { left: 'xywh', right: 'x_min, y_min, width, height' },
          { left: 'cxcywh', right: 'centre_x, centre_y, width, height' },
          { left: 'Normalised cxcywh', right: 'Centre and extents divided by image width and height' },
        ],
        explanation:
          'xywh and cxcywh share their last two entries and differ in whether the first two are a corner or a centre, which is why confusing them offsets every box by half its own size — a bug that looks like poor training rather than a conversion error.',
      },
      {
        id: 'CV-008-q5',
        type: 'multi',
        concept: 'one-stage versus two-stage',
        prompt: 'Which statements about one-stage detectors are true? Select all that apply.',
        options: [
          'They predict class and box in a single forward pass without a proposal stage',
          'They are generally faster, which makes them the default for real-time video',
          'Extreme foreground-background imbalance motivated the focal loss',
          'They always outperform two-stage detectors at high IoU thresholds',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'The first three are accurate. The last is not: two-stage detectors historically localise more precisely, which shows up specifically at strict IoU thresholds, although modern one-stage detectors have closed most of that gap.',
      },
      {
        id: 'CV-008-q6',
        type: 'debug',
        language: 'python',
        concept: 'NMS across classes',
        prompt: 'A pedestrian in front of a car produces two boxes, but only one survives. What is wrong?',
        code: 'keep = nms(all_boxes, all_scores, iou_threshold=0.5)\nfinal = [(all_boxes[i], all_labels[i]) for i in keep]',
        options: [
          'nms is class-agnostic here, so a person box and a car box suppress each other; use batched_nms with the labels',
          'The IoU threshold is too high and should be 0.9',
          'nms requires boxes sorted by score beforehand',
          'The boxes must be converted to cxcywh before suppression',
        ],
        answerIndex: 0,
        explanation:
          'torchvision nms ignores labels, so heavily overlapping detections of different classes suppress one another. batched_nms takes the labels and offsets coordinates per class, so suppression happens only within a class.',
      },
      {
        id: 'CV-008-q7',
        type: 'explain',
        concept: 'detection versus classification',
        prompt:
          'Explain what makes detection structurally harder than classification, beyond simply being a harder visual task.',
        rubric: [
          'Notes that the output is a variable-length set rather than a fixed-size vector',
          'Notes that training requires assigning predictions to ground-truth objects',
          'Notes that evaluation needs a matching criterion such as IoU plus a threshold',
        ],
        sampleAnswer:
          'A classifier always emits the same shaped answer: one score per class, so the loss is a simple comparison with a one-hot target. A detector must emit a set whose size it does not know — zero objects in one frame, thirty in the next — and sets have no natural ordering, so there is no direct way to line up predictions with targets. Training therefore needs an assignment rule deciding which predicted location is responsible for which object, whether by IoU with anchors, by centre proximity, or by bipartite matching as in DETR, and that rule is a design choice that materially affects results. Evaluation inherits the same problem: correctness is no longer a comparison of labels but a matching procedure, requiring an overlap measure, a threshold, and a policy for duplicates, which is why a detector has no single accuracy number and is summarised by a precision-recall curve instead.',
        explanation:
          'The examinable idea is that set-valued output forces assignment at training time and matching at evaluation time, which is the structural difference from classification.',
      },
    ],

    flashcards: [
      { front: 'How do you compute IoU?', back: 'Intersection area divided by union, where union = areaA + areaB - intersection. Clamp intersection dimensions at zero.' },
      { front: 'What does NMS do?', back: 'Sorts detections by score, keeps the top one, discards same-class boxes overlapping it above the IoU threshold, and repeats.' },
      { front: 'xywh versus cxcywh', back: 'xywh starts from the top-left corner; cxcywh starts from the centre. Confusing them offsets every box by half its size.' },
      { front: 'What is an anchor box?', back: 'A predefined reference rectangle the network regresses offsets from, with a centre shift in anchor widths and a log scale ratio.' },
      { front: 'What does mAP@[.5:.95] mean?', back: 'Mean average precision averaged over ten IoU thresholds from 0.50 to 0.95 — the COCO protocol, far stricter than mAP@0.5.' },
      { front: 'One-stage versus two-stage', back: 'One-stage predicts densely in one pass and is fast; two-stage proposes regions then refines, and localises more precisely.' },
      { front: 'Why did DETR remove NMS?', back: 'It treats detection as set prediction with bipartite matching, so each object is assigned exactly one prediction and duplicates never arise.' },
    ],

    challenge: {
      title: 'A detection evaluator from first principles',
      brief:
        'Implement IoU, greedy per-class NMS and average precision yourself, then validate each against torchvision.ops and pycocotools on a small annotated set. Your evaluator should take predictions and ground truth, match detections greedily by descending score with no ground-truth box matched twice, compute the precision-recall curve, and report AP at IoU 0.5, at 0.75 and averaged over 0.5 to 0.95. Finish by plotting how mAP varies with the NMS threshold, and write a short note on where the optimum sits and why.',
      language: 'python',
      acceptanceCriteria: [
        'IoU matches torchvision box_iou to floating-point tolerance, including the disjoint case',
        'NMS is per class and reproduces torchvision batched_nms on the same input',
        'Each ground-truth box may be matched at most once; later duplicates count as false positives',
        'AP is reported at 0.5, at 0.75 and averaged over the COCO range, and agrees with pycocotools within a stated tolerance',
        'Includes a plot of mAP against the NMS threshold with a written interpretation',
      ],
      starterCode: 'import numpy as np\n\n\ndef iou_matrix(pred_xyxy: np.ndarray, gt_xyxy: np.ndarray) -> np.ndarray:\n    """Return an (P, G) matrix of IoU values. Clamp overlaps at zero."""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate who understands classification what object detection adds, how a predicted box is judged correct, and why a cleanup step is needed at the end.',
      mustCover: [
        'Detection outputs a variable-length list of boxes with classes and confidences, not a fixed vector',
        'IoU is intersection area over union area, and a threshold turns it into a correct-or-not decision',
        'Dense prediction produces duplicates, which non-maximum suppression removes',
        'The number of detections depends on thresholds you choose, not only on the model',
      ],
      bonusSignals: ['computes an IoU with real numbers', 'mentions anchors or the anchor-free trend', 'notes that NMS must run per class'],
      sampleExplanation:
        'A classifier gives you one answer per image; a detector gives you a list, and the length of that list is not something the network knows in advance. The usual approach asks the same question at thousands of positions across the image — is an object centred near here, what class, and how should the rectangle be adjusted — often starting from standard reference rectangles called anchors so the network only has to predict a correction rather than invent coordinates. That produces many overlapping guesses about the same object, so a cleanup pass called non-maximum suppression sorts them by confidence, keeps the best, and deletes any box of the same class that overlaps it too much. Overlap is measured by intersection over union: the area the two rectangles share divided by the area they cover between them. Work one through — a box from (50,50) to (150,150) against one from (100,100) to (200,200) shares a 50 by 50 square, so 2,500 over 17,500, which is 0.14. That is below the usual 0.5 cut-off, even though the two look substantially overlapping, and that gap between intuition and arithmetic is exactly why localisation gets measured rather than eyeballed. One last thing to keep straight: how many detections you get depends on the confidence threshold you chose, so two people can report very different results from the identical model.',
    },
  },

  {
    id: 'CV-009',
    domain: 'CV',
    module: 'Vision Tasks',
    topic: 'Segmentation',
    title: 'Image Segmentation',
    slug: 'image-segmentation',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['CV-005', 'CV-007'],
    related: ['CV-002', 'CV-003', 'CV-005', 'CV-007', 'CV-008'],
    tags: ['segmentation', 'semantic', 'instance', 'panoptic', 'unet', 'dice', 'encoder-decoder'],

    learningObjectives: [
      'Explain segmentation as per-pixel classification and state the shape of its output tensor',
      'Distinguish semantic, instance and panoptic segmentation and give a case where each is the right choice',
      'Describe the encoder-decoder structure and say precisely what U-Net skip connections restore',
      'Compute Dice and IoU for a mask by hand and explain why they beat pixel accuracy on imbalanced data',
      'Choose a loss for a segmentation task given the class balance of the data',
    ],

    terminology: [
      {
        term: 'Semantic segmentation',
        definition:
          'Assigning every pixel a class label, with no distinction between separate instances of a class. Three adjacent cars form one connected car region.',
        simple: 'Colour in every pixel by what kind of thing it belongs to.',
      },
      {
        term: 'Instance segmentation',
        definition:
          'Detecting each object separately and producing a mask for each, so two overlapping cars are two distinct masks. Typically implemented as detection plus a per-box mask head.',
        simple: 'Outline each individual object separately, even when they touch.',
      },
      {
        term: 'Panoptic segmentation',
        definition:
          'A unified labelling where countable things get instance ids and amorphous stuff such as road, sky and vegetation gets a semantic label, with every pixel assigned exactly once.',
        simple: 'Label everything: individual objects get their own id, backgrounds just get a category.',
      },
      {
        term: 'Encoder-decoder',
        definition:
          'An architecture that downsamples to build semantic context and then upsamples back to the input resolution, so the output is a dense per-pixel map rather than a single vector.',
        simple: 'Shrink the picture to understand it, then grow it back to say where each thing is.',
      },
      {
        term: 'Skip connection',
        definition:
          'A direct link concatenating an encoder feature map with the decoder feature map of the same resolution, restoring the fine spatial detail that downsampling discarded.',
        simple: 'A shortcut that hands the sharp early details forward so the outline is not blurry.',
      },
      {
        term: 'Dice coefficient',
        definition:
          'Twice the overlap divided by the sum of the two areas, equal to the F1 score computed over pixels. It is the standard segmentation metric in medical imaging.',
        simple: 'A score from 0 to 1 for how well two shapes match, weighted towards the overlap.',
      },
    ],

    simpleExplanation:
      "Classification labels the whole picture, detection puts a rectangle around each thing, and segmentation goes one step further: it labels every single pixel. Ask it about a street scene and it hands back a grid the same size as the photograph where each cell says road, or car, or pedestrian, or sky. That matters whenever a rectangle is too crude an answer. A tumour is not rectangular, and a surgeon needs its outline; a car deciding whether it can drive somewhere needs the drivable surface, not a box that also contains the pavement. The architecture has a distinctive shape. The first half shrinks the image the way a classifier does, which builds up understanding but throws away exactly the fine detail a per-pixel answer needs. So the second half grows it back, and at each step it is handed a copy of the matching early layer, which still remembers precisely where the edges were. That handover is the whole trick, and it is why segmentation networks look like a letter U when drawn.",

    whyItExists:
      'Many decisions depend on the exact extent of a region rather than its rough location: how many square millimetres of tissue are affected, which part of the road is drivable, which pixels to replace when editing a photograph. A bounding box cannot express a non-convex or irregular shape, so a per-pixel labelling is the minimum output that supports measurement and precise masking.',

    analogy: {
      scenario:
        'Consider two ways of describing a spill on a factory floor. A supervisor radios in that there is a spill in the north-east corner, roughly two metres by three — enough to send someone, not enough to order the right amount of absorbent. A second worker instead takes chalk and draws around the actual edge of the spill, so its true area can be measured and the exact shape can be cordoned off. Drawing that outline needs both a sense of the whole floor, to know what is spill and what is a shadow, and close attention to the boundary, which you only get standing right over it.',
      mapping: [
        { from: 'The rough two-by-three description', to: 'A bounding box from object detection' },
        { from: 'The chalk outline of the true edge', to: 'A per-pixel segmentation mask' },
        { from: 'Standing back to see the whole floor', to: 'The encoder, whose downsampling builds global context' },
        { from: 'Standing right over the boundary', to: 'The decoder with skip connections, restoring fine spatial detail' },
        { from: 'Measuring the outlined area in square metres', to: 'Computing region area from the mask, the reason segmentation exists' },
        { from: 'Two separate spills that happen to touch', to: 'The semantic versus instance distinction' },
      ],
      bridge:
        'The two viewpoints in the analogy are the two halves of the network, and the tension between them is real. Downsampling is what lets a network know that a grey region is road rather than sky, because that judgement needs context far beyond a single pixel; but downsampling by a factor of thirty-two means the deepest layer has one value per thirty-two pixels of original image, so the boundary information is simply gone. Skip connections resolve the tension by carrying the high-resolution encoder features across to the decoder, so the final layer has both the semantics from deep layers and the edges from shallow ones.',
      limitations:
        'Chalk on a floor has one unambiguous boundary. Real masks are ambiguous at edges — where exactly does hair end, or a tumour margin — so annotators disagree by several pixels, which places a ceiling on achievable Dice that no architecture can exceed.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Semantic versus instance segmentation',
        caption: 'The same photograph of three overlapping cars, labelled two different ways.',
        left: {
          heading: 'Semantic',
          points: [
            'Output is one class index per pixel: shape (H, W)',
            'Three touching cars form a single connected car region',
            'Cannot count objects',
            'Natural fit for road, sky, vegetation and tissue types',
          ],
        },
        right: {
          heading: 'Instance',
          points: [
            'Output is a list of binary masks, one per detected object',
            'Three cars give three separate masks, even where they overlap',
            'Counting and per-object measurement are possible',
            'Typically detection plus a mask head, as in Mask R-CNN',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'U-Net: down, across, up',
        caption: 'Resolution falls then rises; skip connections carry detail across the U.',
        steps: [
          { label: 'Input (1, 3, 256, 256)', detail: 'A normalised image, as for classification.' },
          { label: 'Encoder block 1 -> (64, 256, 256)', detail: 'Two convolutions, then pool to 128x128. This activation is saved for the skip.' },
          { label: 'Encoder blocks 2-4', detail: 'Channels double and resolution halves at each step, reaching (512, 32, 32).' },
          { label: 'Bottleneck (1024, 16, 16)', detail: 'Maximum semantic context, minimum spatial precision. One value per 16 input pixels.' },
          { label: 'Decoder block, upsample and concatenate', detail: 'Transposed convolution to 32x32, concatenated with the saved 32x32 encoder features.' },
          { label: 'Repeat up to full resolution', detail: 'Each level recovers detail from its matching encoder level.' },
          { label: 'Output (num_classes, 256, 256)', detail: 'One logit per class per pixel. Argmax over the channel axis gives the mask.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which task, and which metric',
        columns: ['Task', 'Output', 'Typical metric', 'Example use'],
        rows: [
          ['Classification', 'One label per image', 'Top-1 accuracy', 'Is this scan abnormal at all'],
          ['Detection', 'Boxes with classes', 'mAP at stated IoU', 'Count the vehicles in a frame'],
          ['Semantic segmentation', '(H, W) class indices', 'mean IoU over classes', 'Which pixels are drivable road'],
          ['Instance segmentation', 'N binary masks with classes', 'mask mAP', 'Count and measure each cell in a microscope image'],
          ['Panoptic segmentation', 'Class plus instance id per pixel', 'Panoptic quality (PQ)', 'A complete scene description for a robot'],
        ],
      },
      {
        kind: 'widget',
        title: 'How downsampling loses the boundary',
        caption: 'Pool a mask repeatedly and watch the edge degrade — the problem skip connections exist to solve.',
        widget: 'pooling-lab',
      },
    ],

    formalDefinition:
      'Semantic segmentation learns a function from an image in R^(3 x H x W) to a label map in {1,…,K}^(H x W), equivalently a tensor of per-pixel class logits of shape (K, H, W) followed by a channel-wise argmax. Instance segmentation learns a set-valued function producing pairs of a class and a binary mask, one per object, and panoptic segmentation produces a single map assigning every pixel both a class and, for countable classes, an instance identifier. Training minimises a per-pixel classification loss, commonly cross-entropy, optionally combined with an overlap-based loss such as soft Dice that directly optimises the evaluation metric.',

    math: {
      intuition:
        'Pixel accuracy is almost useless for segmentation, because on a scan where the lesion occupies 1 per cent of the image, predicting background everywhere scores 99 per cent. The metrics that matter therefore ignore the background and ask only about the region of interest: how much of the predicted region is correct, and how much of the true region was found. Dice and IoU are two ways of combining those, and they always agree about which of two predictions is better — they are monotone functions of each other — but Dice gives more credit for partial overlap.',
      formulas: [
        {
          latex: '\\text{Dice}(A, B) = \\frac{2|A \\cap B|}{|A| + |B|}',
          name: 'Dice coefficient',
          meaning:
            'Twice the overlap divided by the total size of the two regions. Identical to the F1 score computed over pixels, with the intersection playing the role of true positives.',
          variables: [
            { symbol: 'A', meaning: 'Set of pixels predicted as the class' },
            { symbol: 'B', meaning: 'Set of pixels truly belonging to the class' },
            { symbol: '|A \\cap B|', meaning: 'Number of pixels in both — the true positives' },
          ],
        },
        {
          latex: '\\text{IoU}(A, B) = \\frac{|A \\cap B|}{|A| + |B| - |A \\cap B|}, \\qquad \\text{Dice} = \\frac{2\\,\\text{IoU}}{1 + \\text{IoU}}',
          name: 'IoU (Jaccard index) and its relation to Dice',
          meaning:
            'The same ratio used for bounding boxes, applied to pixel sets. The identity on the right means the two metrics rank predictions identically, so reporting both adds no information — but their values differ, and Dice is always the larger of the two.',
          variables: [
            { symbol: 'A, B', meaning: 'Predicted and true pixel sets' },
          ],
        },
        {
          latex: '\\mathcal{L}_{\\text{Dice}} = 1 - \\frac{2\\sum_i p_i g_i + \\epsilon}{\\sum_i p_i + \\sum_i g_i + \\epsilon}',
          name: 'Soft Dice loss',
          meaning:
            'The differentiable version, using predicted probabilities rather than a thresholded mask so gradients flow. Epsilon, typically 1, prevents division by zero when both the prediction and the target are empty and makes that case score perfectly rather than undefined.',
          variables: [
            { symbol: 'p_i', meaning: 'Predicted probability that pixel i belongs to the class, after sigmoid or softmax' },
            { symbol: 'g_i', meaning: 'Ground-truth indicator for pixel i, 0 or 1' },
            { symbol: '\\epsilon', meaning: 'Smoothing constant guarding the empty-mask case' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathcal{L} = \\mathcal{L}_{\\text{CE}} + \\lambda\\, \\mathcal{L}_{\\text{Dice}}',
          name: 'The standard combined loss',
          meaning:
            'Cross-entropy provides well-behaved per-pixel gradients everywhere, including early in training when the predicted mask is empty and Dice gradients are tiny; Dice directly optimises region overlap and counteracts class imbalance. Almost every strong medical segmentation baseline uses the sum.',
          variables: [
            { symbol: '\\lambda', meaning: 'Relative weight, commonly 1' },
            { symbol: '\\mathcal{L}_{CE}', meaning: 'Per-pixel cross-entropy, optionally class-weighted' },
          ],
        },
        {
          latex: '\\text{mIoU} = \\frac{1}{K}\\sum_{k=1}^{K} \\frac{TP_k}{TP_k + FP_k + FN_k}',
          name: 'Mean intersection over union',
          meaning:
            'IoU computed per class over the whole dataset and then averaged, so a rare class counts as much as a common one. This averaging is why mIoU is far more informative than pixel accuracy on scenes dominated by road and sky.',
          variables: [
            { symbol: 'K', meaning: 'Number of classes' },
            { symbol: 'TP_k, FP_k, FN_k', meaning: 'Pixel counts for class k accumulated across the evaluation set' },
          ],
        },
      ],
      derivation: [
        'Take a lesion occupying 2,000 pixels in a 512x512 image of 262,144 pixels — about 0.76 per cent of the area.',
        'A model predicting background everywhere gets 260,144 of 262,144 pixels right: pixel accuracy 99.24 per cent.',
        'Its Dice for the lesion class is 2 x 0 / (0 + 2,000) = 0, and its IoU is 0 / 2,000 = 0.',
        'So a completely useless model scores above 99 per cent on one metric and zero on the other, which settles which metric to report.',
        'This also explains the choice of loss: plain cross-entropy averaged over pixels is dominated by the 99.24 per cent that are background, so the gradient pushing towards predicting the lesion is proportionally tiny, and Dice loss or class weighting is what restores the balance.',
      ],
    },

    workedExample: {
      title: 'Dice and IoU on a predicted tumour mask',
      setup:
        'A model segments a tumour on an MRI slice. The predicted mask covers 100 pixels, the radiologist annotation covers 120 pixels, and 80 pixels are in both. We compute Dice, IoU, precision and recall, then check the identity relating the first two.',
      steps: [
        {
          label: 'Identify the counts',
          detail:
            'True positives: 80 pixels in both. False positives: 100 - 80 = 20 predicted pixels that are not tumour. False negatives: 120 - 80 = 40 tumour pixels that were missed.',
          latex: 'TP = 80, \\quad FP = 20, \\quad FN = 40',
        },
        {
          label: 'Compute Dice',
          detail: 'Dice = 2 x 80 / (100 + 120) = 160 / 220 = 0.7273.',
          latex: '\\text{Dice} = \\frac{2 \\times 80}{100 + 120} = \\frac{160}{220} = 0.7273',
        },
        {
          label: 'Compute IoU',
          detail: 'Union = 100 + 120 - 80 = 140, so IoU = 80 / 140 = 0.5714. As always, IoU is the smaller number.',
          latex: '\\text{IoU} = \\frac{80}{140} = 0.5714',
        },
        {
          label: 'Verify the identity',
          detail: '2 x 0.5714 / (1 + 0.5714) = 1.1428 / 1.5714 = 0.7273, matching the Dice computed directly. The two metrics carry the same information on different scales.',
          latex: '\\text{Dice} = \\frac{2\\,\\text{IoU}}{1+\\text{IoU}} = \\frac{1.1428}{1.5714} = 0.7273',
        },
        {
          label: 'Compute precision and recall',
          detail:
            'Precision = 80/100 = 0.80: four fifths of what the model marked really is tumour. Recall = 80/120 = 0.667: it found two thirds of the tumour. Dice is exactly the harmonic mean of these, 2(0.8)(0.667)/(0.8 + 0.667) = 0.727.',
          latex: '\\text{Dice} = \\frac{2PR}{P+R}',
        },
        {
          label: 'Interpret clinically',
          detail:
            'The asymmetry matters more than the score. Recall of 0.667 means a third of the lesion volume is unmarked, which would understate the tumour size in a treatment plan. Raising the probability threshold below 0.5 would trade some precision for the recall that this application needs.',
        },
        {
          label: 'Contrast with pixel accuracy',
          detail:
            'On a 512x512 slice these 262,144 pixels include only 120 tumour pixels, so predicting background everywhere would score 99.95 per cent accuracy with Dice 0. Reporting accuracy here would be actively misleading.',
        },
      ],
      conclusion:
        'Dice 0.727, IoU 0.571, precision 0.80, recall 0.667. Two habits follow. Always report Dice or IoU for the foreground class rather than pixel accuracy, because accuracy is dominated by the background. And always decompose the score into precision and recall before acting on it, since identical Dice values can mean over-segmentation or under-segmentation, and those call for opposite corrections.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A compact U-Net, with the skip connections made explicit',
        runnable: true,
        code: `import torch
import torch.nn as nn


def block(cin, cout):
    return nn.Sequential(
        nn.Conv2d(cin, cout, 3, padding=1), nn.BatchNorm2d(cout), nn.ReLU(inplace=True),
        nn.Conv2d(cout, cout, 3, padding=1), nn.BatchNorm2d(cout), nn.ReLU(inplace=True),
    )


class UNet(nn.Module):
    def __init__(self, in_ch=3, num_classes=2, width=32):
        super().__init__()
        w = width
        self.enc1, self.enc2, self.enc3 = block(in_ch, w), block(w, w * 2), block(w * 2, w * 4)
        self.bottleneck = block(w * 4, w * 8)
        self.pool = nn.MaxPool2d(2)
        self.up3 = nn.ConvTranspose2d(w * 8, w * 4, 2, stride=2)
        self.up2 = nn.ConvTranspose2d(w * 4, w * 2, 2, stride=2)
        self.up1 = nn.ConvTranspose2d(w * 2, w, 2, stride=2)
        self.dec3, self.dec2, self.dec1 = block(w * 8, w * 4), block(w * 4, w * 2), block(w * 2, w)
        self.head = nn.Conv2d(w, num_classes, 1)          # 1x1: per-pixel classifier

    def forward(self, x):
        e1 = self.enc1(x)                       # (w, H, W)      <- saved for skip
        e2 = self.enc2(self.pool(e1))           # (2w, H/2, W/2) <- saved
        e3 = self.enc3(self.pool(e2))           # (4w, H/4, W/4) <- saved
        b = self.bottleneck(self.pool(e3))      # (8w, H/8, W/8)
        d3 = self.dec3(torch.cat([self.up3(b), e3], dim=1))    # concat on channels
        d2 = self.dec2(torch.cat([self.up2(d3), e2], dim=1))
        d1 = self.dec1(torch.cat([self.up1(d2), e1], dim=1))
        return self.head(d1)                    # (num_classes, H, W)


model = UNet(num_classes=3)
x = torch.randn(2, 3, 128, 128)
logits = model(x)
print("input :", tuple(x.shape))
print("output:", tuple(logits.shape))
print("mask  :", tuple(logits.argmax(dim=1).shape))
print("parameters:", f"{sum(p.numel() for p in model.parameters()):,}")`,
        output: `input : (2, 3, 128, 128)
output: (2, 3, 128, 128)
mask  : (2, 128, 128)
parameters: 7,707,331`,
        explanation:
          'The output has the same spatial size as the input and one channel per class, which is the defining shape of segmentation. The three torch.cat calls are the skip connections, and the channel arithmetic reveals what they do: dec3 accepts 8w channels because the upsampled 4w from below is concatenated with the 4w saved from the encoder at that resolution. The final 1x1 convolution is a per-pixel linear classifier, and argmax over the channel axis turns logits into a label map.',
      },
      {
        language: 'python',
        title: 'Dice, IoU and the combined loss',
        runnable: true,
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F


def dice_coefficient(pred_mask, true_mask, eps=1.0):
    """Hard Dice for evaluation: both inputs are 0/1 tensors."""
    inter = (pred_mask * true_mask).sum()
    return float((2 * inter + eps) / (pred_mask.sum() + true_mask.sum() + eps))


def iou(pred_mask, true_mask, eps=1.0):
    inter = (pred_mask * true_mask).sum()
    union = pred_mask.sum() + true_mask.sum() - inter
    return float((inter + eps) / (union + eps))


class DiceCELoss(nn.Module):
    """Soft Dice + cross-entropy, the standard medical segmentation baseline."""

    def __init__(self, num_classes, weight_dice=1.0, eps=1.0):
        super().__init__()
        self.num_classes, self.weight_dice, self.eps = num_classes, weight_dice, eps
        self.ce = nn.CrossEntropyLoss()

    def forward(self, logits, targets):            # logits (N,K,H,W), targets (N,H,W)
        ce = self.ce(logits, targets)
        probs = logits.softmax(dim=1)
        onehot = F.one_hot(targets, self.num_classes).permute(0, 3, 1, 2).float()
        dims = (0, 2, 3)                           # sum over batch and space, keep classes
        inter = (probs * onehot).sum(dims)
        denom = probs.sum(dims) + onehot.sum(dims)
        dice = ((2 * inter + self.eps) / (denom + self.eps)).mean()
        return ce + self.weight_dice * (1 - dice)


# The worked example, reproduced exactly
pred = torch.zeros(220); pred[:100] = 1           # 100 predicted pixels
true = torch.zeros(220); true[20:140] = 1         # 120 true pixels, 80 overlapping
print("Dice:", round(dice_coefficient(pred, true, eps=0.0), 4))
print("IoU :", round(iou(pred, true, eps=0.0), 4))

logits = torch.randn(2, 3, 64, 64)
targets = torch.randint(0, 3, (2, 64, 64))
print("combined loss:", round(float(DiceCELoss(3)(logits, targets)), 4))`,
        output: `Dice: 0.7273
IoU : 0.5714
combined loss: 1.7726
`,
        explanation:
          'The hard Dice reproduces the 0.7273 computed by hand. The loss class shows the two pieces that matter in practice: cross-entropy gives a well-behaved gradient at every pixel, including early in training when the predicted foreground is empty and Dice gradients nearly vanish, while soft Dice uses probabilities rather than a thresholded mask so it remains differentiable and directly targets overlap. Summing over batch and space but not over classes is what makes this a per-class Dice averaged at the end, which prevents a large class from dominating.',
      },
      {
        language: 'python',
        title: 'Segmentation transforms: image and mask must move together',
        runnable: true,
        code: `import albumentations as A
import cv2
import numpy as np

tf = A.Compose([
    A.RandomResizedCrop(size=(256, 256), scale=(0.6, 1.0),
                        interpolation=cv2.INTER_LINEAR,        # image: smooth
                        mask_interpolation=cv2.INTER_NEAREST), # mask: NEVER smooth
    A.HorizontalFlip(p=0.5),
    A.ElasticTransform(alpha=30, sigma=6, p=0.3),   # standard in medical imaging
    A.RandomBrightnessContrast(p=0.5),              # photometric: mask untouched
])

image = np.random.randint(0, 255, (512, 512, 3), dtype=np.uint8)
mask = np.zeros((512, 512), dtype=np.uint8)
mask[200:300, 180:260] = 1          # class 1 region
mask[320:360, 100:140] = 2          # class 2 region

out = tf(image=image, mask=mask)
print("image:", out["image"].shape, out["image"].dtype)
print("mask :", out["mask"].shape, out["mask"].dtype)
print("class ids present:", np.unique(out["mask"]))
print("still integer labels:", set(np.unique(out["mask"]).tolist()) <= {0, 1, 2})`,
        output: `image: (256, 256, 3) uint8
mask : (256, 256) uint8
class ids present: [0 1 2]
still integer labels: True`,
        explanation:
          'Two rules are enforced here. Every geometric transform is applied identically to the image and the mask, because a flipped image with an unflipped mask trains the model on a systematic lie. And the mask uses nearest-neighbour interpolation while the image uses bilinear: any averaging method would invent labels such as 1.5 between classes 1 and 2 along every boundary, which the final assertion checks for. Photometric transforms deliberately touch only the image.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Radiotherapy planning',
        usage:
          'Tumour and organ-at-risk volumes are contoured slice by slice, historically by hand at roughly an hour per patient. A U-Net produces a first contour that a clinician edits, cutting the time substantially. Dice against expert annotation is the accepted acceptance metric, with 0.85 or above typical for large organs.',
      },
      {
        context: 'Autonomous driving perception',
        usage:
          'Semantic segmentation of drivable surface, lane markings and pavement gives a free-space map that a box-based detector cannot express, because the drivable region is irregular and unbounded rather than a discrete object.',
      },
      {
        context: 'Satellite and aerial analysis',
        usage:
          'Building footprints, deforestation extent and flood boundaries are all area measurements, so the output must be a mask. Vertical flips are legitimate augmentation here, unlike in ground-level photography, since overhead imagery has no gravity direction.',
      },
      {
        context: 'Photo and video editing',
        usage:
          'Background replacement, portrait mode and object removal all need an alpha mask accurate to the hair strand. This is where boundary quality, rather than region-level Dice, determines whether a result is usable.',
      },
    ],

    projectConnections: [
      { tool: 'segmentation_models_pytorch', role: 'U-Net, FPN and DeepLabV3+ decoders on any pretrained encoder, plus ready-made Dice and Tversky losses.' },
      { tool: 'MONAI', role: 'The medical imaging standard: 3D U-Nets, sliding-window inference, and Dice metrics that handle empty masks correctly.' },
      { tool: 'Albumentations', role: 'Applies geometric transforms to image and mask jointly with separate interpolation settings for each.' },
      { tool: 'Segment Anything (SAM)', role: 'A promptable foundation model that produces high-quality class-agnostic masks, increasingly used to bootstrap annotation.' },
    ],

    commonMistakes: [
      {
        mistake: 'Resizing masks with bilinear interpolation',
        why: 'Averaging class indices invents labels that do not exist, so a boundary between class 3 and class 4 becomes a band of 3.5 that rounds arbitrarily. Every object edge in the dataset is corrupted.',
        fix: 'Use nearest-neighbour for masks and bilinear for images, set explicitly in the same transform. Assert after loading that np.unique(mask) contains only valid class ids.',
      },
      {
        mistake: 'Reporting pixel accuracy on an imbalanced task',
        why: 'When the foreground is 1 per cent of the image, predicting background everywhere scores 99 per cent. The metric is dominated entirely by the class nobody cares about.',
        fix: 'Report per-class Dice or IoU and the mean over classes, excluding the background where convention allows, and always show the per-class breakdown rather than the mean alone.',
      },
      {
        mistake: 'Training with plain cross-entropy on a tiny foreground',
        why: 'The loss is averaged over pixels, so the gradient signal from the 1 per cent foreground is swamped. The model converges quickly to an all-background prediction, which is a genuine local minimum of the objective.',
        fix: 'Add a Dice or Tversky term, or weight the classes inversely to frequency. Dice loss alone can be unstable at the start, which is why the sum of cross-entropy and Dice is the usual baseline.',
      },
      {
        mistake: 'Applying a geometric transform to the image but not the mask',
        why: 'A flipped or cropped image paired with an unmodified mask teaches a systematic spatial error. It rarely crashes, and the model simply learns a blurred average of the correct and mirrored answers.',
        fix: 'Pass image and mask through one transform call, as Albumentations and torchvision v2 both support. Render a handful of augmented image-mask pairs overlaid before every training run.',
      },
      {
        mistake: 'Ignoring the ignore-index convention',
        why: 'Datasets such as Cityscapes mark unlabelled or ambiguous pixels with a sentinel value, often 255. Treating it as a real class trains the model to predict nonsense on boundaries and inflates the class count.',
        fix: 'Pass ignore_index=255 to nn.CrossEntropyLoss and exclude those pixels from the metric computation as well as from the loss.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What do skip connections in a U-Net do, and why is the architecture ineffective without them?',
        answer:
          'The encoder downsamples to build semantic context, because deciding that a region is road rather than sky requires information from far beyond a single pixel. The cost is spatial precision: after five poolings, one activation covers a 32x32 region of the original image, so the exact location of a boundary is no longer representable. Skip connections concatenate each encoder feature map with the decoder feature map of matching resolution, so the decoder has both the semantics computed deep in the network and the high-frequency detail preserved shallow in it. Without them the decoder must reconstruct boundaries from a heavily downsampled representation, and the output is recognisably correct in the interior of regions while being blurred and displaced at every edge — which is exactly where segmentation quality is judged. There is a secondary benefit: the shorter gradient path improves optimisation, in the same way as residual connections.',
        followUp:
          'A strong answer contrasts this with DeepLab, which keeps resolution using atrous convolution instead of a symmetric decoder, achieving a similar end through a different mechanism.',
      },
      {
        level: 'advanced',
        question: 'When would you use Dice loss rather than cross-entropy, and what are the failure modes of each?',
        answer:
          'Cross-entropy is averaged over pixels, so on a task where the foreground is a small fraction of the image the objective is dominated by background pixels and the model can reach a low loss by predicting background everywhere. Dice loss is computed over the region rather than per pixel, so an empty prediction scores zero regardless of how small the target is, which makes it naturally robust to that imbalance and aligns training with the evaluation metric. Its failure modes are real though: the gradient is small and poorly conditioned when the predicted foreground is nearly empty, which is exactly the situation at initialisation, and it behaves badly on images with no foreground at all unless the smoothing epsilon is handled deliberately. It is also noisier batch to batch, since a single image can dominate the ratio. The usual answer is not to choose but to sum them, with cross-entropy providing stable early gradients and Dice providing imbalance robustness and metric alignment. Tversky loss generalises Dice with separate weights on false positives and false negatives, which is the right tool when misses are costlier than over-segmentation.',
      },
      {
        level: 'ml-engineer',
        question: 'A segmentation model reports Dice 0.86 on validation but clinicians say the contours are unusable. What do you check?',
        answer:
          'Dice is a volume overlap measure and is dominated by the interior of large regions, so it is close to blind to boundary quality, which is what a clinician actually edits. First check surface metrics — Hausdorff distance, or its 95th percentile, and average surface distance — which measure how far the contour is from the truth rather than how much area coincides. Second, look at the per-case distribution rather than the mean, because a mean of 0.86 can come from most cases at 0.92 and a handful at 0.3, and those failures are what people remember. Third, check for topological errors: a mask with the right area but several disconnected islands, or a hole through the middle, is unusable and Dice barely notices. Fourth, verify the evaluation matches clinical use — 3D volumes evaluated per slice look better than they are, and resampling between voxel spacings can silently change the numbers. Finally, examine inter-annotator agreement on the same cases, since a Dice of 0.86 may already be at the ceiling the annotation itself supports.',
        followUp:
          'The best answers propose adding a boundary-aware loss term or post-processing that keeps the largest connected component, and validating with the surface metric the clinicians actually care about.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A predicted mask has 250 pixels, the ground truth has 200, and 150 overlap. Compute Dice, IoU, precision and recall, and say whether the model is over- or under-segmenting.',
        hint: 'True positives are the overlap; precision and recall divide it by the prediction and the truth respectively.',
        solution:
          'Dice = 2(150)/(250 + 200) = 300/450 = 0.6667. IoU = 150/(250 + 200 - 150) = 150/300 = 0.5. Check the identity: 2(0.5)/(1.5) = 0.6667, which matches. Precision = 150/250 = 0.60, recall = 150/200 = 0.75. Precision is well below recall, so the model is marking more than it should: it is over-segmenting, spilling roughly 100 pixels beyond the true region. The remedy is to raise the probability threshold, or to add a false-positive-weighted Tversky term, rather than to train longer.',
      },
      {
        prompt:
          'Explain which segmentation type you would use for each: counting cells in a microscope image, finding drivable road surface, and producing a complete scene description for a warehouse robot.',
        hint: 'Ask whether you need to count individuals, and whether every pixel needs a label.',
        solution:
          'Counting cells requires instance segmentation, because touching cells must be separated to be counted, which semantic segmentation cannot do by construction. Drivable road is semantic: the road is a single amorphous region, there is nothing to count, and instance ids would be meaningless. The warehouse robot wants panoptic segmentation, which labels every pixel exactly once, giving instance ids to countable things such as pallets and forklifts while giving plain semantic labels to floor, wall and shelving — the complete scene description that navigation and manipulation both need.',
      },
      {
        prompt:
          'Write a function computing per-class IoU from a batch of predicted logits and integer targets, correctly ignoring pixels marked 255.',
        hint: 'Build a boolean validity mask first, and guard against a zero union for classes absent from the batch.',
        language: 'python',
        starterCode: 'import torch\n\n\ndef per_class_iou(logits, targets, num_classes, ignore_index=255):\n    preds = logits.argmax(dim=1)\n',
        solution:
          'valid = targets != ignore_index\npreds, targets = preds[valid], targets[valid]\nious = []\nfor c in range(num_classes):\n    p, t = preds == c, targets == c\n    inter = (p & t).sum().item()\n    union = (p | t).sum().item()\n    ious.append(float("nan") if union == 0 else inter / union)\nreturn ious\n\nTwo details carry the weight. Filtering by the ignore mask before the loop keeps unlabelled pixels out of every class, whereas filtering inside would be both slower and easy to get wrong. Returning NaN rather than zero for a class absent from both prediction and target matters because averaging zeros for absent classes silently depresses mIoU, so the mean should be taken with a NaN-aware reduction.',
      },
    ],

    quiz: [
      {
        id: 'CV-009-q1',
        type: 'mcq',
        concept: 'output shape',
        prompt: 'A semantic segmentation model for 5 classes receives input of shape (2, 3, 256, 256). What shape are its raw outputs?',
        options: [
          '(2, 5, 256, 256)',
          '(2, 5)',
          '(2, 256, 256)',
          '(2, 3, 256, 256)',
        ],
        answerIndex: 0,
        explanation:
          'One logit per class per pixel, at full input resolution. Taking argmax over the channel axis then gives the (2, 256, 256) label map. This shape is the defining difference from classification, whose output is (2, 5).',
      },
      {
        id: 'CV-009-q2',
        type: 'numeric',
        concept: 'Dice by hand',
        prompt:
          'A predicted mask covers 100 pixels, the true mask covers 120, and 80 overlap. What is the Dice coefficient, to four decimal places?',
        answer: 0.7273,
        tolerance: 0.002,
        explanation:
          'Dice = 2 x 80 / (100 + 120) = 160/220 = 0.7273. The corresponding IoU is 80/140 = 0.5714, and the identity Dice = 2 IoU / (1 + IoU) confirms both.',
      },
      {
        id: 'CV-009-q3',
        type: 'truefalse',
        concept: 'metric choice',
        prompt: 'Pixel accuracy is a reliable metric for segmenting a lesion that covers 1 per cent of a scan.',
        answer: false,
        explanation:
          'Predicting background everywhere scores 99 per cent accuracy with a Dice of zero. Foreground-focused metrics such as Dice or IoU are required whenever the class of interest is a small fraction of the image.',
      },
      {
        id: 'CV-009-q4',
        type: 'mcq',
        concept: 'skip connections',
        prompt: 'What do U-Net skip connections restore to the decoder?',
        options: [
          'High-resolution spatial detail that downsampling discarded',
          'The class labels from the encoder output',
          'Additional training data through augmentation',
          'Gradient clipping to stabilise training',
        ],
        answerIndex: 0,
        explanation:
          'The encoder trades spatial precision for semantic context. Skip connections concatenate the matching-resolution encoder features into the decoder, so boundaries are reconstructed from features that still hold the fine detail rather than from a heavily downsampled map.',
      },
      {
        id: 'CV-009-q5',
        type: 'match',
        concept: 'segmentation types',
        prompt: 'Match each task to the segmentation type it requires.',
        pairs: [
          { left: 'Count touching cells in a microscope image', right: 'Instance segmentation' },
          { left: 'Find the drivable road surface', right: 'Semantic segmentation' },
          { left: 'Label every pixel with class and, where countable, an instance id', right: 'Panoptic segmentation' },
          { left: 'Decide whether a scan is abnormal at all', right: 'Classification, not segmentation' },
        ],
        explanation:
          'Counting requires separating instances; an amorphous region needs only a class; a complete scene description needs both together. If no spatial answer is required at all, segmentation is the wrong and far more expensive tool.',
      },
      {
        id: 'CV-009-q6',
        type: 'debug',
        language: 'python',
        concept: 'mask resizing',
        prompt: 'After this resize, the loss reports class indices outside the valid range. Why?',
        code: 'image = cv2.resize(image, (256, 256), interpolation=cv2.INTER_LINEAR)\nmask = cv2.resize(mask, (256, 256), interpolation=cv2.INTER_LINEAR)',
        options: [
          'The mask must use INTER_NEAREST; interpolation averages class indices into values that are not classes',
          'cv2.resize cannot handle single-channel arrays',
          'The mask must be resized before the image',
          'The target size tuple should be (height, width) for masks',
        ],
        answerIndex: 0,
        explanation:
          'Bilinear interpolation averages neighbouring labels, so a boundary between classes 3 and 4 produces values such as 3.5. Nearest-neighbour copies an existing label and is the only resampling that keeps a label map valid.',
      },
      {
        id: 'CV-009-q7',
        type: 'explain',
        concept: 'loss choice under imbalance',
        prompt:
          'Explain why plain cross-entropy often fails on a segmentation task where the foreground is 1 per cent of the image, and what to do instead.',
        rubric: [
          'Notes that the loss is averaged over pixels, so background dominates',
          'Notes that predicting all background is a strong local optimum',
          'Proposes Dice, Tversky or class weighting, ideally combined with cross-entropy',
        ],
        sampleAnswer:
          'Cross-entropy sums over pixels and divides by their number, so with 99 per cent background the gradient is overwhelmingly a signal about background pixels. Predicting background everywhere therefore achieves a low loss immediately, and it is a genuine local optimum rather than a transient state, so training can sit there indefinitely while the reported loss looks acceptable. The fix is to make the objective care about the region rather than the pixel: Dice loss computes overlap over the whole foreground region, so an empty prediction scores zero no matter how few target pixels there are, and Tversky generalises it with separate penalties for misses and false alarms. In practice the two losses are summed, because Dice gradients are weak exactly at initialisation when the predicted foreground is empty, while cross-entropy gives well-behaved gradients everywhere. The metric must change too: report Dice or IoU for the foreground class, never pixel accuracy.',
        explanation:
          'The examinable idea is that a pixel-averaged loss inherits the class imbalance of the image, so both the loss and the metric must be region-based rather than pixel-based.',
      },
    ],

    flashcards: [
      { front: 'What shape does a semantic segmentation model output?', back: '(N, num_classes, H, W) logits at input resolution; argmax over the channel axis gives an (N, H, W) label map.' },
      { front: 'Semantic versus instance versus panoptic', back: 'Semantic labels every pixel by class; instance separates individual objects; panoptic does both, labelling each pixel exactly once.' },
      { front: 'What do skip connections restore?', back: 'The high-resolution spatial detail lost to downsampling, concatenated from the encoder into the matching decoder level.' },
      { front: 'Dice formula?', back: '2 x intersection / (|prediction| + |truth|). Identical to the pixel-wise F1 score, and always larger than the IoU.' },
      { front: 'Relation between Dice and IoU?', back: 'Dice = 2 IoU / (1 + IoU). They rank predictions identically, so reporting both adds no information.' },
      { front: 'Why not pixel accuracy?', back: 'With a 1 per cent foreground, predicting all background scores 99 per cent with Dice zero. Use per-class Dice or IoU.' },
      { front: 'Which interpolation for masks?', back: 'Nearest neighbour always. Any averaging invents class indices that do not exist, corrupting every boundary.' },
    ],

    challenge: {
      title: 'Segment and measure, with an honest metric report',
      brief:
        'Train a U-Net on a small binary segmentation dataset such as Oxford-IIIT Pet trimaps or a public medical set. Report per-image Dice and IoU distributions rather than means alone, plot Dice against the probability threshold to choose an operating point deliberately, and compare three loss configurations: cross-entropy, Dice, and their sum. Add one boundary-aware diagnostic — average surface distance or the count of connected components per prediction — and write a paragraph on what it revealed that Dice did not.',
      language: 'python',
      acceptanceCriteria: [
        'Image and mask share every geometric transform, with nearest-neighbour resampling for the mask',
        'Reports the distribution of per-image Dice, not only the mean, and shows the worst five cases',
        'Compares the three loss configurations under an otherwise identical recipe',
        'Chooses the probability threshold from a plot rather than defaulting to 0.5, with the reasoning stated',
        'Includes one boundary or topology diagnostic and interprets it against the Dice score',
      ],
      starterCode: 'import torch\nimport torch.nn as nn\n\n\nclass DiceCELoss(nn.Module):\n    def __init__(self, num_classes: int, weight_dice: float = 1.0, eps: float = 1.0):\n        super().__init__()\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate who knows classification and detection what segmentation adds, why the network is shaped like a U, and why Dice replaces accuracy.',
      mustCover: [
        'Segmentation assigns a class to every pixel, so the output is a full-resolution map',
        'The encoder builds context by downsampling, which loses the spatial precision the output needs',
        'Skip connections hand the high-resolution encoder features to the decoder to restore boundaries',
        'Dice or IoU is used because pixel accuracy is dominated by the background class',
      ],
      bonusSignals: ['distinguishes semantic from instance segmentation', 'computes a Dice value with real numbers', 'mentions nearest-neighbour mask resizing'],
      sampleExplanation:
        'Classification gives one label for the whole image and detection gives a rectangle per object. Segmentation labels every pixel, so the output is a grid the same size as the input with a class in each cell — which is what you need whenever the answer is a shape or an area rather than a location, like the outline of a tumour or the drivable part of a road. The architecture has a distinctive shape because of a genuine conflict. To know that a grey patch is road rather than sky you need a wide view, and the way networks get that is by repeatedly shrinking the image; but after shrinking by a factor of sixteen you no longer know where the boundary was to within a pixel. So the network grows the image back up, and at each step it is handed the matching early layer, which still has the sharp detail. Those handovers are the skip connections, and drawing the down-then-up path is where the letter U comes from. For scoring, forget accuracy: if a lesion is one per cent of the scan, calling everything background scores ninety-nine per cent while finding nothing. Use Dice instead — twice the overlap divided by the two areas added together. Predicted a hundred pixels, truth a hundred and twenty, eighty overlapping: that is one hundred and sixty over two hundred and twenty, about 0.73. And always split it into precision and recall, because the same Dice can mean you marked too much or too little, and those need opposite fixes.',
    },
  },

  {
    id: 'CV-010',
    domain: 'CV',
    module: 'Architectures & Transfer',
    topic: 'Transfer learning and architectures',
    title: 'Transfer Learning and CNN Architectures',
    slug: 'transfer-learning',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['CV-004', 'CV-007'],
    related: ['CV-003', 'CV-004', 'CV-005', 'CV-007', 'CV-008', 'CV-009'],
    tags: ['transfer-learning', 'fine-tuning', 'resnet', 'efficientnet', 'vision-transformer', 'freezing', 'catastrophic-forgetting'],

    learningObjectives: [
      'Explain why features learned on ImageNet transfer to tasks with entirely different classes',
      'Replace a classifier head correctly and decide which layers to freeze',
      'Choose learning rates for fine-tuning, including discriminative rates for different depths',
      'Recognise catastrophic forgetting and the conditions that cause it',
      'Compare ResNet, EfficientNet and Vision Transformer on accuracy, data appetite and deployment cost',
    ],

    terminology: [
      {
        term: 'Transfer learning',
        definition:
          'Initialising a model with weights learned on a large source task and adapting it to a smaller target task, rather than training from random initialisation.',
        simple: 'Start from a model that already knows how to look at pictures, then teach it your specific job.',
      },
      {
        term: 'Backbone and head',
        definition:
          'The backbone is the feature extractor producing a vector per image; the head is the final task-specific layer mapping that vector to outputs. Transfer keeps the backbone and replaces the head.',
        simple: 'The part that understands pictures, and the small part that names your categories.',
      },
      {
        term: 'Freezing',
        definition:
          'Setting requires_grad to False on a parameter so it receives no updates. Freezing the backbone turns the network into a fixed feature extractor with only the head trainable.',
        simple: 'Locking some weights so training cannot change them.',
      },
      {
        term: 'Fine-tuning',
        definition:
          'Continuing to train pretrained weights on the target task, usually at a much lower learning rate than the one used for the head, and often only for the deeper layers.',
        simple: 'Letting the borrowed weights adjust a little to your data.',
      },
      {
        term: 'Catastrophic forgetting',
        definition:
          'The destruction of useful pretrained features by large gradient updates early in fine-tuning, typically caused by a randomly initialised head producing huge gradients that flow into the backbone.',
        simple: 'Wrecking what the model already knew by training it too hard, too fast.',
      },
      {
        term: 'Discriminative learning rates',
        definition:
          'Assigning different learning rates by depth, with early general-purpose layers trained slowest and later task-specific layers fastest, commonly with a geometric decay per layer group.',
        simple: 'Change the deep-thinking layers gently and the final layers more freely.',
      },
    ],

    simpleExplanation:
      "Training a vision model from scratch needs an enormous amount of labelled data, because the network has to discover from nothing that edges exist, that textures matter, that a shape can be the same object at different sizes. But somebody has already paid that cost: a model trained on a million ImageNet photographs learned all of it, and none of that early knowledge is specific to the thousand categories it was scored on. Edges are edges whether you are looking at dogs or X-rays. So you take that trained network, cut off its last layer — the only part that mentions the original categories — and bolt on a new one for your categories. Now you have a choice. Leave the borrowed weights locked and train only the new layer, which is fast and works well when your data is small or looks like the original. Or unlock the later layers and let them adjust gently to your images, which does better when your domain is unusual. The one rule that saves people repeatedly: use a much smaller learning rate on the borrowed weights than on the new layer, because the new layer starts random and its large early gradients can destroy years of borrowed knowledge in a few hundred steps.",

    whyItExists:
      'Labelled data and compute are the binding constraints in applied vision, and training a competitive backbone from scratch requires millions of images and thousands of GPU-hours that almost no project can justify. Transfer learning exists because the early and middle layers of a vision model encode general-purpose structure that is nearly task-independent, so that cost can be paid once and amortised across every downstream task.',

    analogy: {
      scenario:
        'A qualified doctor who wants to become a cardiologist does not repeat medical school. Anatomy, physiology, how to read a chart and how to talk to a patient all transfer unchanged; what they need is a residency in the specialty. Now imagine instead that on day one of the residency they were told to forget everything and relearn from the new caseload alone. They would be worse for years. The residency works precisely because the general training is preserved and only adjusted where the specialty demands it.',
      mapping: [
        { from: 'Medical school', to: 'ImageNet pretraining on a million labelled images' },
        { from: 'Anatomy and physiology, useful in every specialty', to: 'Early-layer features: edges, textures, colour opponency' },
        { from: 'The specialty residency', to: 'Fine-tuning on the target dataset' },
        { from: 'A new consultant title and remit', to: 'The replaced classifier head with the target number of classes' },
        { from: 'Being told to discard prior training', to: 'Catastrophic forgetting from too high a learning rate' },
        { from: 'Adjusting general knowledge slowly, specialty knowledge quickly', to: 'Discriminative learning rates by depth' },
      ],
      bridge:
        'The mapping holds most tightly where it matters: the generality of knowledge decreases with depth. Layer one of a trained network responds to oriented edges regardless of what the network classifies, layer thirty responds to dog faces, and only the head mentions the class list. That gradient of specificity is the entire justification for freezing early layers and training late ones, and it also predicts when transfer will disappoint: a target domain whose low-level statistics differ sharply from natural photographs, such as ultrasound speckle or synthetic-aperture radar, shares less of the early layers than the analogy suggests.',
      limitations:
        'A doctor knows what they know. A network has no mechanism for protecting its prior knowledge, so a single badly scaled update genuinely erases it — there is no equivalent of remembering anatomy despite a bad week.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The standard fine-tuning recipe',
        caption: 'Two phases. Skipping the first is the most common cause of a disappointing result.',
        steps: [
          { label: 'Load pretrained weights', detail: 'A backbone trained on ImageNet, with the recipe from weights.transforms() so preprocessing matches exactly.' },
          { label: 'Replace the head', detail: 'A new linear layer with your number of classes, randomly initialised. Everything else is kept.' },
          { label: 'Freeze the backbone', detail: 'requires_grad = False everywhere except the head, so the random head cannot corrupt the features.' },
          { label: 'Warm up the head', detail: 'Train only the head for a few epochs at a normal learning rate such as 1e-3, until its loss stops falling sharply.' },
          { label: 'Unfreeze and fine-tune', detail: 'Unfreeze the later blocks, drop the learning rate to roughly 1e-4 or lower, and continue.' },
          { label: 'Evaluate on untouched data', detail: 'The eval transform only, with model.eval(), and per-class metrics rather than a single number.' },
        ],
      },
      {
        kind: 'table',
        title: 'What to do given your data',
        columns: ['Target data', 'Similar to ImageNet?', 'Strategy', 'Why'],
        rows: [
          ['Small (under ~1k images)', 'Yes', 'Freeze the backbone, train the head only', 'Too few examples to fine-tune millions of weights without overfitting'],
          ['Small', 'No (medical, satellite, radar)', 'Freeze early layers, fine-tune the last block plus head', 'Low-level features still transfer; high-level ones do not'],
          ['Large (tens of thousands)', 'Yes', 'Fine-tune everything at a low learning rate', 'Enough data to adapt safely, and it beats feature extraction'],
          ['Large', 'No', 'Fine-tune everything, or consider training from scratch', 'With enough in-domain data, pretraining mainly buys faster convergence'],
        ],
      },
      {
        kind: 'compare',
        title: 'Feature extraction versus full fine-tuning',
        caption: 'Not a matter of taste — the right choice follows from dataset size and domain distance.',
        left: {
          heading: 'Frozen backbone',
          points: [
            'Only the head trains: often fewer than 100k parameters',
            'Fast, low memory, no risk of forgetting',
            'Features can be cached once, making epochs nearly free',
            'Caps accuracy when the domain differs from natural photographs',
          ],
        },
        right: {
          heading: 'Fine-tuned backbone',
          points: [
            'All or most weights update, typically at 1e-4 or lower',
            'Higher ceiling, especially for unusual domains',
            'Needs more data, more compute, and careful learning rates',
            'Risks catastrophic forgetting if the head is not warmed up first',
          ],
        },
      },
      {
        kind: 'table',
        title: 'A tour of the architectures',
        columns: ['Family', 'Key idea', 'Parameters / ImageNet top-1', 'Choose it when'],
        rows: [
          ['ResNet (2015)', 'Residual connections let gradients skip layers, making 50 to 150 layers trainable', '25.6M / 76.1% (ResNet-50)', 'You want a dependable default with wide ecosystem support'],
          ['EfficientNet (2019)', 'Compound scaling of depth, width and resolution together, found by search', '5.3M / 77.1% (B0)', 'Parameters or mobile latency are the binding constraint'],
          ['Vision Transformer (2020)', 'Split the image into 16x16 patches and apply self-attention with no convolution', '86M / 77.9% (ViT-B/16, ImageNet-1k only)', 'You have very large data or a strong pretrained checkpoint'],
          ['ConvNeXt (2022)', 'A convolutional network modernised with transformer design choices', '88M / 84.1% (ConvNeXt-B)', 'You want transformer-level accuracy with convolutional inductive bias'],
        ],
      },
    ],

    formalDefinition:
      'Transfer learning initialises the parameters of a target model from those of a source model trained on a different distribution, on the assumption that the two tasks share low- and mid-level representations. Formally, a backbone f_phi pretrained by minimising a source loss is composed with a newly initialised head g_theta, and the target objective is minimised over theta alone (feature extraction) or over theta and some subset of phi (fine-tuning), typically with layer-dependent learning rates that decrease with distance from the output.',

    math: {
      intuition:
        'Two quantities decide a fine-tuning run. The first is how much of the network you let move, which is a parameter count. The second is how far each part is allowed to move per step, which is a learning rate — and the key insight is that it should not be uniform, because early layers hold general knowledge worth preserving while late layers hold task-specific knowledge worth replacing. A geometric decay of the learning rate with depth encodes exactly that belief.',
      formulas: [
        {
          latex: '\\eta_l = \\eta_{\\text{base}} \\cdot \\gamma^{\\,L - l}',
          name: 'Discriminative (layer-wise decayed) learning rates',
          meaning:
            'Layer l gets a learning rate that decays geometrically with its distance from the output. With gamma around 0.75 and 12 blocks, the first block trains at about 3 per cent of the head rate, which preserves general features while letting the task-specific end adapt.',
          variables: [
            { symbol: '\\eta_l', meaning: 'Learning rate applied to layer group l' },
            { symbol: '\\eta_{base}', meaning: 'The rate used for the final group, typically the head' },
            { symbol: '\\gamma', meaning: 'Decay factor per group, usually 0.65 to 0.9' },
            { symbol: 'L, l', meaning: 'Total number of groups and the index of this one, counting from the input' },
          ],
          category: 'optimization',
        },
        {
          latex: 'P_{\\text{head}} = d \\times K + K',
          name: 'Parameters in a replaced classifier head',
          meaning:
            'A linear head is a matrix of feature dimension by class count, plus one bias per class. This number is usually four orders of magnitude smaller than the backbone, which is exactly why feature extraction is so cheap.',
          variables: [
            { symbol: 'd', meaning: 'Backbone feature dimension: 512 for ResNet-18, 2048 for ResNet-50, 768 for ViT-B' },
            { symbol: 'K', meaning: 'Number of target classes' },
          ],
        },
        {
          latex: '\\|\\nabla_{\\phi}\\mathcal{L}\\| \\propto \\|\\nabla_{\\text{head}}\\mathcal{L}\\|',
          name: 'Why a random head endangers the backbone',
          meaning:
            'Gradients reaching the backbone are scaled by the error signal from the head. A freshly initialised head is confidently wrong, so its gradients are large, and at a normal learning rate those propagate back and overwrite pretrained filters within a few hundred steps.',
          variables: [
            { symbol: '\\phi', meaning: 'Backbone parameters' },
            { symbol: '\\nabla_{head}', meaning: 'Gradient at the head, large while the head is untrained' },
          ],
        },
        {
          latex: 'd = \\alpha^{\\phi}, \\quad w = \\beta^{\\phi}, \\quad r = \\gamma^{\\phi}, \\quad \\alpha\\beta^2\\gamma^2 \\approx 2',
          name: 'EfficientNet compound scaling',
          meaning:
            'Depth, width and resolution are scaled together by a single coefficient rather than one at a time. The constraint keeps the FLOP increase near 2 to the power phi, since compute grows linearly in depth but quadratically in both width and resolution.',
          variables: [
            { symbol: 'd, w, r', meaning: 'Depth, width and resolution multipliers' },
            { symbol: '\\phi', meaning: 'The single user-chosen scaling coefficient that indexes B0 through B7' },
            { symbol: '\\alpha, \\beta, \\gamma', meaning: 'Constants found by a small grid search on the base model' },
          ],
        },
      ],
      derivation: [
        'Replace the head of a ResNet-50 for a 37-class pet dataset. The backbone feature dimension is 2048.',
        'The new head has 2048 x 37 = 75,776 weights plus 37 biases, so 75,813 parameters.',
        'The backbone holds about 23.5 million parameters, so the head is roughly 0.32 per cent of the model.',
        'Freezing the backbone therefore reduces the trainable parameter count by a factor of about 310, and removes the backbone gradients and optimiser state from memory entirely.',
        'It also means the backbone output is a deterministic function of the input, so features can be computed once and cached, after which each epoch is a linear model fit over 75,813 parameters — seconds rather than minutes.',
      ],
    },

    workedExample: {
      title: 'Fine-tuning ResNet-50 on 2,000 images of 5 plant diseases',
      setup:
        'A team has 2,000 labelled leaf photographs across 5 disease classes, roughly 400 each, and one consumer GPU. Training ResNet-50 from scratch on 2,000 images would overfit within a few epochs. We work through the decisions and the arithmetic.',
      steps: [
        {
          label: 'Choose the strategy from the data',
          detail:
            'Small dataset, and leaf photographs are ordinary natural images close to the ImageNet distribution. That places us in the freeze-then-fine-tune quadrant rather than full training from the start.',
        },
        {
          label: 'Replace the head and count the parameters',
          detail:
            'model.fc = nn.Linear(2048, 5) gives 2048 x 5 + 5 = 10,245 trainable parameters against a 23.5 million parameter backbone — 0.04 per cent of the model.',
          latex: 'P_{\\text{head}} = 2048 \\times 5 + 5 = 10{,}245',
        },
        {
          label: 'Phase one: head only',
          detail:
            'Freeze every backbone parameter and train the head at learning rate 1e-3 with Adam for 5 epochs. Validation accuracy reaches about 0.87 in under two minutes, because only a linear model is being fitted on fixed features.',
        },
        {
          label: 'Phase two: unfreeze layer4 and fine-tune',
          detail:
            'Unfreeze only the final residual stage, set its learning rate to 1e-4 while keeping the head at 1e-3, and train for 10 more epochs with cosine decay. Validation accuracy rises to about 0.93.',
          latex: '\\eta_{\\text{layer4}} = 10^{-4}, \\quad \\eta_{\\text{head}} = 10^{-3}',
        },
        {
          label: 'Diagnose the counterfactual',
          detail:
            'Unfreezing everything at 1e-3 from step one instead gives validation accuracy around 0.61 and a training loss that spikes before recovering. This is catastrophic forgetting: the random head produced gradients large enough to overwrite pretrained filters before it had learned anything worth propagating.',
        },
        {
          label: 'Check the cost of the alternative',
          detail:
            'Training the same architecture from random initialisation on these 2,000 images reaches roughly 0.55 validation accuracy and overfits heavily, with training accuracy near 1.0 by epoch 15. The gap between 0.55 and 0.93 is what pretraining is worth here.',
        },
        {
          label: 'Decide whether to go further',
          detail:
            'Unfreezing layer3 as well, at 3e-5, adds about half a point and doubles the training time. With 2,000 images that is near the point where extra trainable capacity buys overfitting rather than accuracy.',
        },
      ],
      conclusion:
        'The ordering is what produced the result, not the architecture choice: 0.93 with warm-up then partial unfreezing, 0.61 without the warm-up, 0.55 from scratch. Fine-tuning is mostly a discipline about learning rates and the order of operations, and the reliable recipe is to give the new head a chance to become sensible before letting its gradients touch anything you would not want to lose.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Replace the head, freeze, warm up, then unfreeze',
        runnable: true,
        code: `import torch
import torch.nn as nn
from torchvision.models import resnet50, ResNet50_Weights

weights = ResNet50_Weights.IMAGENET1K_V2
model = resnet50(weights=weights)

# 1. Replace the head. in_features is read from the model, never hard-coded.
in_features = model.fc.in_features           # 2048 for ResNet-50
model.fc = nn.Linear(in_features, 5)
print("head parameters:", sum(p.numel() for p in model.fc.parameters()))

# 2. Freeze everything except the new head
for p in model.parameters():
    p.requires_grad = False
for p in model.fc.parameters():
    p.requires_grad = True

trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total = sum(p.numel() for p in model.parameters())
print(f"trainable: {trainable:,} of {total:,} ({100 * trainable / total:.3f}%)")

# 3. Phase one: head only
optimiser = torch.optim.AdamW(model.fc.parameters(), lr=1e-3, weight_decay=1e-4)

# 4. Phase two: unfreeze the last stage with a much smaller learning rate
for p in model.layer4.parameters():
    p.requires_grad = True

optimiser = torch.optim.AdamW([
    {"params": model.layer4.parameters(), "lr": 1e-4},
    {"params": model.fc.parameters(), "lr": 1e-3},
], weight_decay=1e-4)

print("param groups:", [(g["lr"], sum(p.numel() for p in g["params"]))
                        for g in optimiser.param_groups])`,
        output: `head parameters: 10245
trainable: 10,245 of 23,518,277 (0.044%)
param groups: [(0.0001, 15011328), (0.001, 10245)]`,
        explanation:
          'Four habits are visible here. in_features is read from the model rather than remembered, because it is 512 for ResNet-18 and 2048 for ResNet-50 and a hard-coded value fails loudly at best. Freezing happens after the head is replaced, or the new parameters would be frozen too. The optimiser is rebuilt after unfreezing, because parameters added to the model afterwards are invisible to an optimiser constructed earlier — a silent bug in which the unfrozen layers never actually update. And the two parameter groups carry different learning rates, which is the whole point.',
      },
      {
        language: 'python',
        title: 'Discriminative learning rates for a Vision Transformer',
        runnable: true,
        code: `import torch
from torchvision.models import vit_b_16, ViT_B_16_Weights


def layerwise_groups(model, base_lr=1e-3, decay=0.75):
    """Deeper blocks train faster; early blocks are barely touched."""
    blocks = list(model.encoder.layers)
    n = len(blocks)
    groups = [{"params": list(model.heads.parameters()), "lr": base_lr}]
    for i, blk in enumerate(blocks):
        lr = base_lr * (decay ** (n - i))
        groups.append({"params": list(blk.parameters()), "lr": lr})
    groups.append({"params": list(model.conv_proj.parameters()),
                   "lr": base_lr * (decay ** (n + 1))})
    return groups


model = vit_b_16(weights=ViT_B_16_Weights.IMAGENET1K_V1)
model.heads = torch.nn.Linear(768, 10)         # 768 is the ViT-B token dimension

groups = layerwise_groups(model)
optimiser = torch.optim.AdamW(groups, weight_decay=0.05)

for g in groups[:3] + groups[-2:]:
    print(f"lr={g['lr']:.3e}  params={sum(p.numel() for p in g['params']):,}")`,
        output: `lr=1.000e-03  params=7,690
lr=7.500e-04  params=7,087,872
lr=5.625e-04  params=7,087,872
lr=3.167e-05  params=7,087,872
lr=2.375e-05  params=590,592
`,
        explanation:
          'The head trains at 1e-3 while the patch-embedding projection trains at about 2.4e-5, a factor of forty slower, which encodes the belief that early general-purpose features should barely move. Layer-wise decay is close to standard practice for transformer fine-tuning and matters more for ViTs than for convolutional networks, because a transformer has far weaker built-in assumptions about images and therefore relies more heavily on what pretraining gave it.',
      },
      {
        language: 'python',
        title: 'Cache frozen features and fit a linear head in seconds',
        runnable: true,
        code: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset


@torch.no_grad()
def extract_features(backbone, loader, device="cuda"):
    backbone.eval().to(device)
    feats, labels = [], []
    for images, targets in loader:
        feats.append(backbone(images.to(device)).flatten(1).cpu())
        labels.append(targets)
    return torch.cat(feats), torch.cat(labels)


# Turn a classifier into a feature extractor by removing its head
from torchvision.models import resnet18, ResNet18_Weights
model = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
feature_dim = model.fc.in_features             # 512
model.fc = nn.Identity()                       # cleaner than slicing children()

train_feats = torch.randn(2000, feature_dim)   # stand-in for extract_features(...)
train_labels = torch.randint(0, 5, (2000,))

head = nn.Linear(feature_dim, 5)
opt = torch.optim.AdamW(head.parameters(), lr=1e-3)
loader = DataLoader(TensorDataset(train_feats, train_labels), batch_size=256, shuffle=True)

for epoch in range(20):                        # 20 epochs over cached features
    for xb, yb in loader:
        loss = nn.functional.cross_entropy(head(xb), yb)
        opt.zero_grad(); loss.backward(); opt.step()

print("feature dim:", feature_dim)
print("cached features:", tuple(train_feats.shape), "->", train_feats.numel() * 4 // 1024, "KiB")
print("final loss:", round(float(loss), 4))`,
        output: `feature dim: 512
cached features: (2000, 512) -> 4000 KiB
final loss: 1.1042
`,
        explanation:
          'When the backbone is frozen it is a deterministic function, so running it once and storing the 512-dimensional outputs turns every subsequent epoch into a linear model fit over four megabytes. Twenty epochs then take seconds rather than minutes, which makes hyperparameter search practical on modest hardware. Replacing fc with nn.Identity is the tidy way to expose features. The one limitation is that augmentation must be disabled or applied before extraction, since cached features cannot vary per epoch — which is exactly the trade-off that makes this technique best for small, clean datasets.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Medical imaging with a few hundred labelled studies',
        usage:
          'Despite the obvious domain gap, ImageNet initialisation still beats random initialisation on most radiology tasks, mainly by converging faster and more stably. The usual recipe freezes the early stages, whose edge and texture filters transfer, and fine-tunes the deeper stages where the semantics are wrong for the domain.',
      },
      {
        context: 'Any production computer vision team',
        usage:
          'Essentially nobody trains a backbone from scratch. The pipeline is a pretrained checkpoint, a replaced head, a warm-up and a fine-tune, which turns a research-scale problem into an afternoon of work with a few thousand labelled images.',
      },
      {
        context: 'Detection and segmentation backbones',
        usage:
          'Faster R-CNN, YOLO, Mask R-CNN and U-Net variants all initialise from a classification-pretrained backbone. The head differs completely by task while the feature extractor is shared, which is the clearest evidence that backbone features are general rather than task-specific.',
      },
      {
        context: 'CLIP and zero-shot baselines',
        usage:
          'A contrastively trained image-text model classifies unseen categories from a text prompt alone, and its frozen features often beat a fine-tuned ImageNet model on small datasets. It is now the sensible first baseline before any training is attempted.',
      },
    ],

    projectConnections: [
      { tool: 'torchvision.models', role: 'Pretrained weights with matched preprocessing through weights.transforms(), plus the standard head-replacement pattern.' },
      { tool: 'timm', role: 'Hundreds of checkpoints with a consistent API: create_model(name, pretrained=True, num_classes=K) replaces the head for you.' },
      { tool: 'Hugging Face transformers', role: 'ViT, DeiT, Swin and ConvNeXt checkpoints with AutoImageProcessor supplying the exact preprocessing.' },
      { tool: 'PyTorch optimiser param groups', role: 'The mechanism that makes discriminative learning rates a three-line change rather than a custom training loop.' },
    ],

    commonMistakes: [
      {
        mistake: 'Fine-tuning everything at the head learning rate from the first step',
        why: 'The randomly initialised head produces large gradients while it is still confidently wrong, and at 1e-3 those updates propagate back and overwrite pretrained filters before the head has learned anything worth propagating.',
        fix: 'Freeze the backbone and warm up the head for a few epochs, then unfreeze with a learning rate an order of magnitude smaller. If you must do it in one phase, use discriminative rates and a linear warm-up over the first few hundred steps.',
      },
      {
        mistake: 'Building the optimiser before unfreezing layers',
        why: 'An optimiser holds references to a fixed parameter list. Setting requires_grad to True afterwards does not add those parameters to it, so the unfrozen layers receive gradients that are never applied and nothing changes.',
        fix: 'Rebuild the optimiser, and any scheduler, whenever the trainable set changes. Assert that the parameter count in the optimiser groups matches the count with requires_grad set.',
      },
      {
        mistake: 'Using different preprocessing than the checkpoint was trained with',
        why: 'Pretrained weights encode the input distribution they saw. Different normalisation constants, a different resize method or BGR channel order all shift that distribution, and the transferred features become a worse starting point than they should be.',
        fix: 'Use weights.transforms() or the processor shipped with the checkpoint, rather than rewriting the recipe from memory, and assert equality on a fixture image between training and serving.',
      },
      {
        mistake: 'Hard-coding the feature dimension when replacing the head',
        why: 'It is 512 for ResNet-18, 2048 for ResNet-50, 1280 for EfficientNet-B0 and 768 for ViT-B. A hard-coded value silently breaks the moment someone swaps the backbone in a configuration file.',
        fix: 'Read it from the model: model.fc.in_features, or model.classifier[-1].in_features, or pass num_classes to timm.create_model and let the library handle it.',
      },
      {
        mistake: 'Leaving batch norm in training mode while the backbone is frozen',
        why: 'Frozen weights do not stop batch norm from updating its running mean and variance from your batches, so a frozen backbone is not actually frozen and its outputs drift, particularly with small batches.',
        fix: 'Call .eval() on the frozen modules during training as well as validation, or set track_running_stats to False. Verify by checking that a fixed input produces identical features across two training steps.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why do ImageNet features transfer to a task with completely different classes, such as diagnosing crop disease?',
        answer:
          'Because the features are not about the ImageNet classes for most of the network. The first layers learn oriented edges, colour opponency and simple textures, which are properties of natural images in general rather than of dogs and cars; middle layers learn repeated patterns and part-like structures that recur across domains. Only the last block and the classifier head are strongly specific to the source label set. A new task therefore inherits a representation that has already solved the hard, data-hungry problem of turning pixels into meaningful structure, and needs only to learn a mapping from that structure to its own categories. The practical consequence is a very different data requirement: a task that would need hundreds of thousands of images from scratch can reach useful accuracy with a couple of thousand. The caveat is that transfer degrades with domain distance — ultrasound, radar and microscopy share the early layers but much less of the later ones, which is why partial fine-tuning beats pure feature extraction there.',
        followUp:
          'A strong answer mentions that even when transfer adds little final accuracy in a distant domain, it reliably speeds and stabilises convergence, which is itself worth having.',
      },
      {
        level: 'ml-engineer',
        question: 'Walk me through fine-tuning a pretrained model on 3,000 images, with the specific hyperparameters you would start from.',
        answer:
          'Load the checkpoint with its own preprocessing recipe, replace the head with a linear layer sized from the model feature dimension, and freeze the backbone. Train the head only for about five epochs with AdamW at 1e-3 and weight decay 1e-4, using standard augmentation — random resized crop, horizontal flip if label-preserving, mild colour jitter — and check that validation accuracy has plateaued. Then unfreeze the last stage, rebuild the optimiser with two parameter groups at 1e-4 for the backbone stage and 1e-3 for the head, and train for ten to twenty epochs with cosine decay and early stopping on validation. Keep the frozen modules in eval mode so batch norm statistics do not drift. If the domain is far from natural images, unfreeze more; if the dataset is under a thousand images, do not unfreeze at all and consider caching features instead. Throughout, the validation set uses the deterministic eval transform and is never augmented.',
        followUp:
          'The best answers state what they would check first if it underperformed: preprocessing parity, whether the optimiser actually contains the unfrozen parameters, and the per-class confusion rather than the headline accuracy.',
      },
      {
        level: 'advanced',
        question: 'Compare ResNet, EfficientNet and Vision Transformer as a backbone choice for a new project.',
        answer:
          'ResNet is the dependable default: residual connections make deep training stable, the ecosystem support is universal, and every detection and segmentation framework expects it, so ResNet-50 is the right baseline unless there is a reason otherwise. EfficientNet uses compound scaling — depth, width and resolution raised together under a FLOP budget — to reach comparable accuracy with several times fewer parameters, which matters on mobile and embedded targets, though its depthwise separable convolutions sometimes underuse server GPUs, so parameter count flatters its real latency. Vision Transformers drop convolution entirely, treating 16x16 patches as tokens with self-attention, which removes the locality and translation-equivariance priors built into convolution. That makes them data-hungry: trained on ImageNet-1k alone a ViT roughly matches a ResNet, but pretrained on far larger corpora it pulls clearly ahead, and it scales better with model and data size. For a new project with a few thousand images, a pretrained ResNet or ConvNeXt is usually the pragmatic choice, with a ViT worth trying when a strong large-scale checkpoint such as CLIP or DINOv2 is available, since the pretraining is doing the heavy lifting rather than the architecture.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You are replacing the classifier of a ResNet-50 for 37 classes. How many parameters does the new head have, and what fraction of the 23.5 million parameter model is that?',
        hint: 'A linear layer is in_features x out_features weights plus out_features biases; ResNet-50 has 2048 features.',
        solution:
          '2048 x 37 = 75,776 weights plus 37 biases, so 75,813 parameters. Against 23.5 million that is 0.32 per cent. Two consequences follow: freezing the backbone reduces the trainable count by a factor of about 310 and removes its gradients and optimiser state from memory, and the frozen features can be cached, after which each epoch is a linear fit over 75,813 parameters and takes seconds.',
      },
      {
        prompt:
          'A colleague unfroze the backbone halfway through training but reports that nothing changed: the backbone weights are identical before and after. Diagnose it.',
        hint: 'What does the optimiser know about?',
        solution:
          'The optimiser was constructed before unfreezing, so it holds a parameter list containing only the head. Setting requires_grad to True on backbone parameters makes autograd compute gradients for them, but the optimiser never steps them because they are not in any of its parameter groups. The fix is to rebuild the optimiser, and the scheduler, whenever the trainable set changes, and to assert that sum(p.numel() for g in opt.param_groups for p in g["params"]) matches the count of parameters with requires_grad set.',
      },
      {
        prompt:
          'Write a function that returns AdamW parameter groups for a ResNet with a layer-wise learning rate decay of 0.8 across layer1 to layer4 and the head, and explain the ordering.',
        hint: 'The group nearest the output gets the base rate; each earlier stage multiplies by the decay again.',
        language: 'python',
        starterCode: 'import torch\n\n\ndef resnet_param_groups(model, base_lr=1e-3, decay=0.8):\n    stages = [model.layer1, model.layer2, model.layer3, model.layer4]\n',
        solution:
          'groups = [{"params": list(model.fc.parameters()), "lr": base_lr}]\nfor i, stage in enumerate(reversed(stages), start=1):\n    groups.append({"params": list(stage.parameters()), "lr": base_lr * decay ** i})\nstem = list(model.conv1.parameters()) + list(model.bn1.parameters())\ngroups.append({"params": stem, "lr": base_lr * decay ** (len(stages) + 1)})\nreturn groups\n\nThe head gets the full rate because it is random and must move; layer4 gets 0.8 of it, layer3 0.64, and the stem about 0.33, because generality increases towards the input and those filters are the ones most worth preserving. Building the list from the output backwards makes that intention explicit in the code rather than implicit in an index calculation.',
      },
    ],

    quiz: [
      {
        id: 'CV-010-q1',
        type: 'mcq',
        concept: 'why transfer works',
        prompt: 'Why do ImageNet-pretrained features help on a task with entirely different classes?',
        options: [
          'Early and middle layers encode general visual structure such as edges and textures, which is not class-specific',
          'The pretrained model has already seen images of the new classes',
          'ImageNet weights act as a form of weight decay',
          'The new classes are always a subset of the original thousand',
        ],
        answerIndex: 0,
        explanation:
          'Specificity increases with depth: layer one responds to oriented edges regardless of the label set, and only the last block and head are strongly tied to the source classes. That is why the head is replaced and the backbone is kept.',
      },
      {
        id: 'CV-010-q2',
        type: 'numeric',
        concept: 'head parameter count',
        prompt:
          'How many parameters does a new linear head have for a ResNet-50 (2048 features) with 10 classes, counting biases?',
        answer: 20490,
        tolerance: 0,
        explanation:
          '2048 x 10 = 20,480 weights plus 10 biases = 20,490 parameters, under 0.1 per cent of the 23.5 million parameter model. This is why training the head alone is so much cheaper than full fine-tuning.',
      },
      {
        id: 'CV-010-q3',
        type: 'truefalse',
        concept: 'catastrophic forgetting',
        prompt: 'You should fine-tune the pretrained backbone with the same learning rate you use for the new head.',
        answer: false,
        explanation:
          'A randomly initialised head produces large gradients while it is still wrong, and at the head learning rate those updates overwrite pretrained filters. Warm up the head with the backbone frozen, then unfreeze with a rate an order of magnitude lower.',
      },
      {
        id: 'CV-010-q4',
        type: 'debug',
        language: 'python',
        concept: 'optimiser and unfreezing',
        prompt: 'After unfreezing, the backbone weights never change. Why?',
        code: 'opt = torch.optim.AdamW(model.fc.parameters(), lr=1e-3)\nfor p in model.layer4.parameters():\n    p.requires_grad = True\n# ... training continues with the same opt',
        options: [
          'The optimiser only holds the head parameters; the unfrozen ones are never stepped',
          'requires_grad must be set before the model is moved to the GPU',
          'AdamW cannot update convolutional layers',
          'layer4 needs to be set to train mode separately',
        ],
        answerIndex: 0,
        explanation:
          'An optimiser stores a fixed list of parameters. Autograd computes gradients for the newly unfrozen weights, but nothing applies them because they are in no parameter group. Rebuild the optimiser whenever the trainable set changes.',
      },
      {
        id: 'CV-010-q5',
        type: 'match',
        concept: 'architecture selection',
        prompt: 'Match each architecture to its defining idea.',
        pairs: [
          { left: 'ResNet', right: 'Residual connections that let gradients skip layers' },
          { left: 'EfficientNet', right: 'Compound scaling of depth, width and resolution together' },
          { left: 'Vision Transformer', right: 'Image patches as tokens with self-attention, no convolution' },
          { left: 'ConvNeXt', right: 'A convolutional network modernised with transformer design choices' },
        ],
        explanation:
          'Each family is defined by one structural idea, and the choice among them is a trade-off between accuracy, data appetite and deployment cost rather than a ranking.',
      },
      {
        id: 'CV-010-q6',
        type: 'multi',
        concept: 'strategy selection',
        prompt: 'You have 500 labelled ultrasound images. Which choices are reasonable? Select all that apply.',
        options: [
          'Freeze the early stages and fine-tune the last stage plus the head',
          'Use the checkpoint preprocessing recipe rather than writing your own',
          'Apply augmentation suited to the domain and keep validation unaugmented',
          'Train a ResNet-50 from random initialisation for 300 epochs',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'With 500 images from a domain distant from natural photographs, partial fine-tuning is the right compromise: low-level filters still transfer while the deep semantics do not. Training from scratch on 500 images will overfit badly regardless of how long it runs.',
      },
      {
        id: 'CV-010-q7',
        type: 'explain',
        concept: 'fine-tuning discipline',
        prompt:
          'Explain what catastrophic forgetting is in the context of fine-tuning, why it happens, and how the standard recipe prevents it.',
        rubric: [
          'States that pretrained features are destroyed by early large updates',
          'Attributes the large gradients to the randomly initialised head',
          'Describes warm-up with a frozen backbone and a reduced learning rate afterwards',
        ],
        sampleAnswer:
          'When you attach a new head, it is random, so its predictions are confidently wrong and its gradients are large. If the backbone is trainable at the same learning rate, those large gradients propagate back and overwrite filters that took a million images to learn, and they do it within a few hundred steps — before the head has learned anything worth propagating. The result is a model that eventually recovers to something worse than a frozen backbone would have achieved, which is why the symptom is often mistaken for the task being hard. The standard recipe prevents it in two moves. Freeze the backbone and train the head alone for a few epochs, so that by the time gradients are allowed through they carry a sensible error signal. Then unfreeze, typically only the later stages, with a learning rate an order of magnitude smaller, optionally decaying further with depth, because the earlier a layer is the more general and the more worth preserving its features are.',
        explanation:
          'The examinable idea is that gradient magnitude at the head controls the risk to the backbone, so ordering and learning rate scale are what protect transferred knowledge.',
      },
    ],

    flashcards: [
      { front: 'What is replaced when you transfer a model to a new task?', back: 'The classifier head only. The backbone is kept, because its features are general rather than tied to the source classes.' },
      { front: 'Standard fine-tuning recipe?', back: 'Replace head, freeze backbone, warm up the head, then unfreeze the later layers at a rate roughly ten times lower.' },
      { front: 'What causes catastrophic forgetting?', back: 'Large gradients from a randomly initialised head flowing into a trainable backbone at a high learning rate early in training.' },
      { front: 'What are discriminative learning rates?', back: 'Rates decaying geometrically with depth from the output, so general early layers barely move while task-specific layers adapt.' },
      { front: 'Why rebuild the optimiser after unfreezing?', back: 'It holds a fixed parameter list, so newly unfrozen weights get gradients that are never applied and nothing changes.' },
      { front: 'Small dataset far from ImageNet — what do you do?', back: 'Freeze the early stages, fine-tune the last stage plus the head. Low-level features transfer; deep semantics do not.' },
      { front: 'Why are Vision Transformers data-hungry?', back: 'They lack the locality and translation-equivariance priors convolution builds in, so they must learn that structure from data.' },
    ],

    challenge: {
      title: 'Four strategies, one honest comparison',
      brief:
        'Take one small dataset and compare four approaches under an identical evaluation protocol: training from random initialisation, a frozen backbone with a linear head, head warm-up followed by partial unfreezing, and full fine-tuning with discriminative learning rates. Report validation accuracy, wall-clock training time, peak GPU memory and trainable parameter count for each, plot the validation curves together, and write a paragraph on which you would ship and why. Include one deliberate failure run — full fine-tuning at the head learning rate from step one — and show the forgetting in the loss curve.',
      language: 'python',
      acceptanceCriteria: [
        'All four runs share the same data splits, eval transform, seed and epoch budget',
        'Reports trainable parameter count, wall-clock time and peak memory alongside accuracy',
        'Frozen modules are kept in eval mode so batch norm statistics do not drift',
        'The optimiser is rebuilt whenever the trainable parameter set changes',
        'The deliberate failure run is included and its loss curve is interpreted as catastrophic forgetting',
      ],
      starterCode: 'import time\n\nimport torch\nimport torch.nn as nn\nfrom torchvision.models import resnet18, ResNet18_Weights\n\n\ndef build(strategy: str, num_classes: int):\n    """strategy in {"scratch", "frozen", "warmup_then_unfreeze", "full_discriminative"}"""\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a classmate with 1,500 labelled images how to get a strong model without a large dataset or a cluster, and explain why the order of operations matters as much as the architecture.',
      mustCover: [
        'Pretrained backbones encode general visual features that are not specific to the original classes',
        'You replace only the head, sized to your number of classes',
        'Freeze the backbone and warm up the head before unfreezing anything',
        'Use a much smaller learning rate on the pretrained weights than on the new head',
      ],
      bonusSignals: ['mentions catastrophic forgetting by name', 'mentions matching the checkpoint preprocessing', 'gives a concrete parameter count for the head'],
      sampleExplanation:
        'With fifteen hundred images you cannot train a network from scratch, and you do not need to, because somebody already paid for the expensive part. A model trained on a million photographs learned that edges exist, that textures matter, that a shape stays the same object at different scales — and none of that depends on its original thousand categories. So take that model, cut off its final layer, which is the only part that names those categories, and bolt on a new one with your five or ten. For a ResNet-50 that new layer is a couple of tens of thousands of numbers against twenty-three million in the rest, so almost the whole model is inherited. Now the part people get wrong. Your new layer starts random, so it is confidently wrong, so its gradients are enormous. If everything is trainable at a normal learning rate, those gradients flow backwards and wreck the borrowed filters in the first few hundred steps, and you end up worse than if you had changed nothing at all. That is called catastrophic forgetting. The fix is the order: lock the borrowed weights, train just the new layer for a few epochs until it is sensible, then unlock the last block and continue with a learning rate about ten times smaller. One more thing that costs nothing and silently costs accuracy if you skip it — use the same preprocessing the checkpoint was trained with, taken from the checkpoint itself rather than retyped from memory.',
    },
  },
];
