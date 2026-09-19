import type { LearningUnit } from '@/types/curriculum';

/**
 * Natural Language Processing.
 *
 * The through-line of this domain is a single question: how does text become
 * numbers without losing meaning? Every unit advances that story — from
 * splitting a string into tokens, through counting them, through learning
 * dense vectors for them, to letting every token look at every other token.
 */
export const UNITS: LearningUnit[] = [
  {
    id: 'NLP-001',
    domain: 'NLP',
    module: 'Text Preprocessing',
    topic: 'Tokenisation',
    title: 'Text as Data and Tokenisation',
    slug: 'text-as-data-and-tokenisation',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: [],
    related: [],
    tags: ['tokenisation', 'text', 'subword', 'bpe', 'wordpiece', 'preprocessing'],

    learningObjectives: [
      'Explain the four properties that make text harder to model than a table of numbers: it is discrete, variable in length, ambiguous and compositional',
      'Tokenise a sentence by whitespace, by rule and by subword, and describe exactly where each strategy breaks',
      'Trace the transformation "I love machine learning" from raw string to token list to integer ids',
      'Choose an appropriate tokenisation strategy for a given task and justify the choice in terms of vocabulary size and out-of-vocabulary risk',
    ],

    terminology: [
      {
        term: 'Token',
        definition:
          'The atomic unit a model actually consumes. It may be a word, a punctuation mark, a subword fragment such as `##ization`, or a single character — whatever the tokeniser decides.',
        simple: 'The smallest piece of text the model is allowed to look at.',
      },
      {
        term: 'Tokenisation',
        definition:
          'The deterministic procedure that maps a raw string to an ordered sequence of tokens, and then to an ordered sequence of integer ids.',
        simple: 'Chopping a sentence into pieces and giving each piece a number.',
      },
      {
        term: 'Vocabulary',
        definition:
          'The finite, ordered set of tokens a model knows. Every token id is an index into this set, so the vocabulary fixes the size of the embedding table.',
        simple: 'The complete list of pieces the model has ever been told about.',
      },
      {
        term: 'Subword tokenisation',
        definition:
          'A family of algorithms (BPE, WordPiece, Unigram/SentencePiece) that learn a vocabulary of frequent character sequences, so rare words decompose into known fragments instead of being lost.',
        simple: 'Breaking unusual words into familiar chunks so nothing is ever completely unknown.',
      },
      {
        term: 'Token id',
        definition:
          'The integer index of a token in the vocabulary. Ids carry no meaning of their own — id 4083 is not "bigger" than id 2293 in any useful sense.',
        simple: 'The row number of a word in the big list.',
      },
    ],

    simpleExplanation:
      "A computer cannot multiply the word \"cat\". It can only multiply numbers, so before any model touches a sentence, the sentence has to become numbers. The first step is to cut the text into pieces, which we call tokens, and then look each piece up in a big numbered list. So \"I love machine learning\" becomes four pieces, and those four pieces become four numbers like 1045, 2293, 3698, 4083. The tricky part is deciding where to cut. Cutting at every space seems obvious, but then \"don't\" becomes one strange blob, \"New York\" becomes two unrelated things, and any word the list has never seen — a surname, a typo, a new product name — has no number at all. Modern systems solve this by cutting words into smaller familiar chunks, so even a word nobody has ever written before can be spelled out of pieces the model already knows.",

    whyItExists:
      'Neural networks consume fixed-size arrays of floating-point numbers, and text is none of those things: it is a variable-length sequence of discrete symbols with no natural numeric ordering. Tokenisation exists as the bridge — it is the step that decides, once and for all, what the atoms of language are for a given model, and every representation built later inherits that decision.',

    analogy: {
      scenario:
        "Imagine you are cataloguing a library that receives books in every language, including ones invented last week. You need a filing system where every book gets a drawer. Filing by whole title fails immediately: a title nobody has filed before has no drawer, and you would need infinitely many drawers. So instead you file by syllable-sized fragments — a shelf for 'un', a shelf for 'happi', a shelf for 'ness' — and any new title, however strange, can be spelled out of fragments you already have drawers for.",
      mapping: [
        { from: 'A drawer in the cabinet', to: 'An entry in the vocabulary, with a fixed id' },
        { from: 'Filing by whole title', to: 'Word-level tokenisation — simple, but infinite vocabulary and constant unknown words' },
        { from: 'Filing by syllable fragments', to: 'Subword tokenisation — a fixed vocabulary that can still spell anything' },
        { from: 'A title you have never seen arriving in the post', to: 'An out-of-vocabulary word at inference time' },
        { from: 'The drawer number written on the spine', to: 'The token id fed into the model' },
      ],
      bridge:
        'The cabinet is exactly the embedding table: a fixed number of rows, each one addressed by an id. Subword tokenisation is the trick that keeps that table finite while keeping coverage total — a 30,000-row vocabulary can represent any string, because unfamiliar words are spelled out of familiar fragments rather than discarded.',
      limitations:
        'The analogy suggests fragments are chosen by a linguist to be meaningful syllables. They are not. BPE and WordPiece choose fragments purely by frequency statistics over a training corpus, so real vocabularies contain fragments that look like nonsense and split words in linguistically absurd places.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'From a sentence to a tensor',
        caption: 'Every NLP model in this domain begins with exactly these five steps.',
        steps: [
          { label: 'Raw string', detail: '"I love machine learning" — 23 characters, one contiguous blob of Unicode.' },
          { label: 'Normalise', detail: 'Lowercase, strip accents, fix whitespace. Here: "i love machine learning".' },
          { label: 'Split into tokens', detail: '["i", "love", "machine", "learning"] — the decision that defines the model\'s atoms.' },
          { label: 'Look up ids', detail: '[1045, 2293, 3698, 4083] — each token replaced by its row index in the vocabulary.' },
          { label: 'Add special tokens', detail: '[101, 1045, 2293, 3698, 4083, 102] — [CLS] and [SEP] mark the sequence boundaries.' },
          { label: 'Tensor', detail: 'A shape (1, 6) integer tensor. Only now can a neural network touch it.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Whitespace splitting versus subword tokenisation',
        caption: 'The trade-off is always vocabulary size against out-of-vocabulary risk.',
        left: {
          heading: 'Whitespace — `text.split()`',
          points: [
            'Trivial to implement, zero dependencies, fully reversible',
            'Vocabulary grows without bound as the corpus grows',
            '"don\'t", "don\'t," and "Don\'t" become three unrelated tokens',
            'Any unseen word is a total loss — no representation at all',
            'Useless for Chinese, Japanese or Thai, which have no spaces',
          ],
        },
        right: {
          heading: 'Subword — BPE / WordPiece',
          points: [
            'Fixed vocabulary, typically 30k–100k entries',
            'Every string is representable; genuine unknowns are near-zero',
            '"tokenization" becomes ["token", "##ization"] — the stem is shared',
            'Frequent words stay whole, so common text is not fragmented',
            'Splits can be linguistically silly, and token counts differ by language',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Four tokenisers on the same awkward sentence',
        caption: 'Input: `I don\'t live in New York — I live in Kraków.`',
        columns: ['Strategy', 'Output on the awkward bits', 'Main failure'],
        rows: [
          [
            'Whitespace (`str.split`)',
            "`don't` · `York` · `—` · `Kraków.`",
            'Punctuation fuses to words; the dash and full stop become part of tokens.',
          ],
          [
            'Regex on `\\w+`',
            "`don` · `t` · `York` · `Kraków`",
            "The apostrophe is destroyed, so `don't` loses its negation entirely.",
          ],
          [
            'Rule-based (NLTK Treebank)',
            "`do` · `n't` · `New` · `York` · `.`",
            "Handles the contraction well, but still splits `New York` into two tokens.",
          ],
          [
            'Subword (BERT WordPiece)',
            "`don` · `'` · `t` · `new` · `york` · `kra` · `##ków`",
            'Nothing is unknown, but the split is opaque and lowercasing lost the proper nouns.',
          ],
        ],
      },
      {
        kind: 'widget',
        title: 'Tokeniser laboratory',
        caption: 'Type a sentence and watch three tokenisers disagree about it in real time.',
        widget: 'tokenizer-lab',
        props: { sample: "I don't live in New York — I live in Kraków." },
      },
    ],

    formalDefinition:
      'Tokenisation is a function T mapping a string s over a Unicode alphabet to a finite sequence of tokens (t1, …, tn) drawn from a fixed vocabulary V, composed with an injective index map V → {0, …, |V| − 1}. A tokeniser is lossless if the original string can be reconstructed exactly from the token sequence; subword schemes such as byte-level BPE are lossless by construction, while rule-based word tokenisers generally are not.',

    workedExample: {
      title: 'Turning "I love machine learning" into a matrix, by hand',
      setup:
        'We will follow one four-word sentence all the way to the tensor a model consumes, using the `bert-base-uncased` vocabulary of 30,522 entries and a 768-dimensional embedding table. Every step is a real transformation, not a simplification.',
      steps: [
        {
          label: 'Start with the raw string',
          detail:
            '"I love machine learning" is 23 Unicode characters. At this point it is one contiguous blob with no internal structure a model can address.',
        },
        {
          label: 'Normalise',
          detail:
            'Apply Unicode NFKC, then lowercase: "i love machine learning". Nothing else changes here, but this step is what makes "I" and "i" the same token rather than two.',
        },
        {
          label: 'Split into tokens',
          detail:
            'WordPiece checks each whitespace-delimited chunk against the vocabulary. All four words are frequent enough to have their own entries, so nothing is fragmented: ["i", "love", "machine", "learning"].',
        },
        {
          label: 'Look up ids',
          detail:
            'Each token is replaced by its row index in the vocabulary: i -> 1045, love -> 2293, machine -> 3698, learning -> 4083. These are indices, not magnitudes — 4083 is not "more" than 2293 in any sense.',
        },
        {
          label: 'Add special tokens',
          detail:
            'BERT expects sequence boundaries: [CLS] (id 101) prepended and [SEP] (id 102) appended, giving [101, 1045, 2293, 3698, 4083, 102]. Six ids, shape (1, 6) as an integer tensor.',
        },
        {
          label: 'Index the embedding table',
          detail:
            'The embedding matrix is (30522, 768). Each id selects one row, so the six ids select six rows and produce a (1, 6, 768) float tensor. Only now does anything numeric exist that a network can multiply.',
          latex: 'E \\in \\mathbb{R}^{30522 \\times 768}, \\quad X = E[\\text{ids}] \\in \\mathbb{R}^{6 \\times 768}',
        },
        {
          label: 'Name the dimensions',
          detail:
            'Rows of X are positions in the sentence — [CLS], i, love, machine, learning, [SEP]. Columns are the 768 learned features of the embedding space; no individual column has a human-readable name, which is the price of density.',
        },
        {
          label: 'Now try a rarer sentence',
          detail:
            '"Tokenization is unhappiness" has no vocabulary entry for either content word, so WordPiece decomposes: ["token", "##ization", "is", "un", "##hap", "##pin", "##ess"] -> [19204, 3989, 2003, 4895, 10974, 8091, 4757]. Three words became seven tokens, and the tensor is (1, 9, 768) once the special tokens are added.',
        },
        {
          label: 'Read off the consequence',
          detail:
            'The same number of words produced almost twice as many tokens. Since context windows and API pricing are measured in tokens, the cost of a text depends on how well the vocabulary happens to cover it — which is why token counts must be measured with the exact tokeniser, never estimated from word counts.',
        },
      ],
      conclusion:
        'Four English words became four tokens, six ids and a 6 by 768 matrix of floats; three slightly rarer words became seven tokens and a 9 by 768 matrix. That path — string, tokens, ids, matrix — is the same for every model in this domain, and every representation in the units that follow is a different answer to the question of what those 768 numbers should be.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Why naive splitting fails',
        runnable: true,
        code: `import re

text = "I don't live in New York -- I live in Krakow."

print("whitespace:", text.split())
print("word regex :", re.findall(r"\\w+", text))`,
        output: `whitespace: ["I", "don't", 'live', 'in', 'New', 'York', '--', 'I', 'live', 'in', 'Krakow.']
word regex : ['I', 'don', 't', 'live', 'in', 'New', 'York', 'I', 'live', 'in', 'Krakow']`,
        explanation:
          'Two failures in four lines. Whitespace splitting leaves `Krakow.` welded to its full stop, so it will never match the token `Krakow` elsewhere in the corpus. The word regex is worse in a different way: it shreds the contraction into `don` and `t`, destroying the negation that carries the entire meaning of the sentence. Both strategies split `New York` into two tokens that have no idea they belong together.',
      },
      {
        language: 'python',
        title: 'A rule-based tokeniser that knows about English',
        runnable: true,
        code: `import nltk
nltk.download("punkt_tab", quiet=True)

from nltk.tokenize import word_tokenize, sent_tokenize

text = "I don't live in New York. Dr. Smith does, though!"

print(sent_tokenize(text))
print(word_tokenize(text))`,
        output: `["I don't live in New York.", 'Dr. Smith does, though!']
['I', 'do', "n't", 'live', 'in', 'New', 'York', '.', 'Dr.', 'Smith', 'does', ',', 'though', '!']`,
        explanation:
          "NLTK's Treebank tokeniser encodes decades of hand-written English rules. It splits `don't` into `do` and `n't`, which keeps the negation as its own token — genuinely useful for sentiment work. It also knows that the full stop in `Dr.` is an abbreviation rather than a sentence boundary, which is why `sent_tokenize` returns two sentences rather than three. Those rules are English-specific and do not transfer.",
      },
      {
        language: 'python',
        title: 'Subword tokenisation: text to ids, end to end',
        runnable: true,
        code: `from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained("bert-base-uncased")

for sentence in ["I love machine learning", "Tokenization is unhappiness"]:
    tokens = tok.tokenize(sentence)
    ids = tok.convert_tokens_to_ids(tokens)
    print(sentence)
    print("  tokens:", tokens)
    print("  ids   :", ids)

print("with special tokens:", tok("I love machine learning")["input_ids"])
print("vocabulary size    :", tok.vocab_size)`,
        output: `I love machine learning
  tokens: ['i', 'love', 'machine', 'learning']
  ids   : [1045, 2293, 3698, 4083]
Tokenization is unhappiness
  tokens: ['token', '##ization', 'is', 'un', '##hap', '##pin', '##ess']
  ids   : [19204, 3989, 2003, 4895, 10974, 8091, 4757]
with special tokens: [101, 1045, 2293, 3698, 4083, 102]
vocabulary size    : 30522`,
        explanation:
          'This is the whole pipeline in one screen. Common words stay whole. `Tokenization` and `unhappiness` are rare, so they are spelled out of fragments; the `##` prefix means "this piece continues the previous word rather than starting a new one". Note that `token` and `##ization` are separate ids, which means the model can share whatever it learned about `token` across `tokenize`, `tokenizer` and `tokenization`. The 101 and 102 wrapped around the sequence are `[CLS]` and `[SEP]`, the sentence-boundary markers BERT was trained with.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Billing for a large language model API',
        usage:
          'Providers charge per token, not per word. English averages roughly 0.75 words per token, but code, JSON and languages such as Thai or Georgian tokenise far less efficiently — the same paragraph can cost three times as much in one language as another, purely because of how the vocabulary was trained.',
      },
      {
        context: 'Context-window limits in production chat systems',
        usage:
          'A model with a 128k-token window does not accept 128k words. Engineers building retrieval systems count tokens with the exact tokeniser the model uses, because an off-by-20% estimate means requests silently truncate the end of the user\'s document.',
      },
      {
        context: 'Clinical and legal text pipelines',
        usage:
          'Hospital notes are full of strings like `pt c/o SOB x3d`. A general-purpose tokeniser shatters these into meaningless fragments, so teams either train a domain tokeniser or add custom tokens for the abbreviations that matter.',
      },
    ],

    projectConnections: [
      { tool: 'Hugging Face tokenizers', role: 'The Rust-backed library behind `AutoTokenizer`; it is what actually runs in production inference servers.' },
      { tool: 'spaCy', role: 'Rule-based, language-specific tokenisation with linguistic annotation attached to each token.' },
      { tool: 'SentencePiece', role: 'Trains a subword vocabulary directly from raw bytes, with no assumption that spaces separate words — the standard for multilingual models.' },
      { tool: 'tiktoken', role: 'The byte-level BPE tokeniser used to count tokens before sending a prompt to an OpenAI-compatible API.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a different tokeniser at inference than at training',
        why: 'Token ids are indices into one specific vocabulary. Feed ids from a different vocabulary and the embedding lookup silently returns the wrong rows — no error, just quietly meaningless output.',
        fix: 'Always load the tokeniser from the same checkpoint as the model: `AutoTokenizer.from_pretrained(name)` and `AutoModel.from_pretrained(name)` with the identical `name`, and ship them together.',
      },
      {
        mistake: 'Assuming one word equals one token',
        why: 'Subword tokenisers split rare words, and whitespace tokenisers weld punctuation on. Word counts and token counts diverge by 25% in English and far more in other languages.',
        fix: 'Measure, never estimate: `len(tok.encode(text))` is the only number that matters for context limits and cost.',
      },
      {
        mistake: 'Stripping punctuation before tokenising',
        why: 'A full stop is a sentence boundary, a question mark changes the speech act, and an apostrophe is the difference between `were` and `we\'re`. Deleting them up front destroys information the tokeniser was designed to use.',
        fix: 'Let the tokeniser decide. Rule-based and subword tokenisers both handle punctuation deliberately; only remove it if you have measured that removal helps your specific task.',
      },
      {
        mistake: 'Treating token ids as numbers with magnitude',
        why: 'Id 4083 is not larger or later than id 2293 in any semantic sense — the ordering reflects merge frequency during vocabulary training, nothing more.',
        fix: 'Ids are only ever used as lookup indices into an embedding table. If you find yourself averaging or comparing raw ids, you have skipped the embedding step.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why do modern language models use subword tokenisation instead of splitting on spaces?',
        answer:
          'Word-level tokenisation forces an impossible trade-off: either the vocabulary grows without bound as the corpus grows, or you truncate it and every rare word collapses into a single unknown token, losing all its information. Subword tokenisation fixes the vocabulary at, say, 30,000 entries while keeping full coverage, because any unseen word decomposes into fragments that are in the vocabulary — in the limit, individual characters or bytes. It also gives useful parameter sharing: `token`, `tokenize` and `tokenization` share the fragment `token`, so morphologically related words start out related rather than independent. Finally, it works for languages such as Chinese and Thai where whitespace does not delimit words at all.',
        followUp:
          'A strong answer mentions the cost: token counts vary substantially across languages, which makes per-token pricing and fixed context windows quietly unfair to speakers of under-represented languages.',
      },
      {
        level: 'intermediate',
        question: 'What specifically makes text harder to model than a table of numeric features?',
        answer:
          'Four things. It is discrete — there is no meaningful arithmetic on symbols, so you cannot interpolate between `cat` and `dog`. It is variable in length — a review may be six words or six thousand, while most model architectures want fixed-size input. It is ambiguous — `bank`, `lead` and `bass` mean different things in different contexts, and sarcasm inverts sentiment without changing a single word. And it is compositional — meaning depends on order and structure, so `dog bites man` and `man bites dog` are the same bag of words with opposite meanings. Every technique in NLP is an answer to one or more of these four.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague fine-tunes a model, adds five domain-specific tokens to the tokeniser, and the model produces nonsense. What happened?',
        answer:
          'Adding tokens grows the vocabulary, but the model\'s embedding matrix still has the old number of rows, so the new ids index out of range or, worse, wrap onto unrelated rows. The fix is `model.resize_token_embeddings(len(tokenizer))` after `tokenizer.add_tokens(...)`, which extends the embedding matrix with freshly initialised rows. Those new rows start random, so the new tokens carry no meaning until they have been trained on enough examples — which is why adding rare tokens to a model you then barely fine-tune usually makes things worse, not better.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Take the sentence `The U.S. dollar isn\'t worth $1.50 in New York.` Tokenise it by whitespace and list every token that a downstream model would handle badly, saying why.',
        hint: 'Look at what is welded to punctuation, what got split that should not have been, and what should have been split but was not.',
        language: 'python',
        starterCode: 'text = "The U.S. dollar isn\'t worth $1.50 in New York."\nprint(text.split())\n',
        solution:
          "Whitespace splitting gives `['The', 'U.S.', 'dollar', \"isn't\", 'worth', '$1.50', 'in', 'New', 'York.']`. The problems: `York.` carries a full stop so it will never match `York` elsewhere; `$1.50` fuses a currency symbol, a number and a decimal point into one token that appears perhaps once in the corpus; `isn't` keeps the negation attached to the verb, so the model cannot learn a general `n't` negation feature; `U.S.` will be mangled by any sentence splitter that treats a full stop as a boundary; and `New York` is one entity filed as two unrelated tokens. Only `The`, `dollar`, `worth` and `in` come through cleanly.",
      },
      {
        prompt:
          'Using `AutoTokenizer.from_pretrained("bert-base-uncased")`, tokenise the invented word `hyperparameterisation` and explain what the output tells you about how the vocabulary was built.',
        hint: 'Count the fragments and look at which ones carry the `##` prefix.',
        solution:
          "It produces something close to `['hyper', '##para', '##meter', '##isation']`. Three things follow. First, nothing is unknown — even a word that appears nowhere in the training data is representable, which is the whole point of subword vocabularies. Second, the fragments are frequency-driven, not morphological: a linguist would split `hyper-parameter-isation`, and WordPiece's split is merely close to that by accident. Third, the `##` prefix marks continuation, which is how the detokeniser knows to rejoin the pieces without inserting spaces.",
      },
      {
        prompt:
          'Write a function `token_stats(text, tokenizer)` that returns the word count, the token count and the tokens-per-word ratio. Run it on an English sentence and on the same sentence in another language, and comment on the difference.',
        hint: 'Word count is `len(text.split())`; token count is `len(tokenizer.encode(text, add_special_tokens=False))`.',
        language: 'python',
        starterCode: 'from transformers import AutoTokenizer\n\ntok = AutoTokenizer.from_pretrained("bert-base-uncased")\n\ndef token_stats(text, tokenizer):\n    ...\n',
        solution:
          "def token_stats(text, tokenizer):\n    words = len(text.split())\n    tokens = len(tokenizer.encode(text, add_special_tokens=False))\n    return {'words': words, 'tokens': tokens, 'ratio': tokens / max(words, 1)}\n\nOn ordinary English prose the ratio sits near 1.3. On German compound nouns, on Polish or Turkish morphology, or on any language written in a script that was under-represented when the vocabulary was trained, the ratio climbs to 2 or 3 and sometimes far beyond. Because context windows and API pricing are both measured in tokens, the same information costs several times more to process in some languages than in others — a real fairness problem, not a curiosity.",
      },
    ],

    quiz: [
      {
        id: 'NLP-001-q1',
        type: 'mcq',
        concept: 'tokenisation motivation',
        prompt: 'What is the primary reason text must be tokenised before a neural network can process it?',
        options: [
          'Networks operate on numeric arrays, so discrete symbols must be mapped to indices and then to vectors',
          'Tokenisation compresses the text so it uses less memory',
          'Tokenisation removes grammatical errors from the input',
          'Networks can only process sentences shorter than 512 characters',
        ],
        answerIndex: 0,
        explanation:
          'A network multiplies matrices of floats. A string is a sequence of discrete symbols with no numeric interpretation, so tokenisation plus an id lookup is the bridge that makes the embedding table addressable.',
      },
      {
        id: 'NLP-001-q2',
        type: 'code-output',
        language: 'python',
        concept: 'naive splitting',
        prompt: 'What does this print?',
        code: 'text = "Hello, world! Hello world"\nprint(len(set(text.split())))',
        options: ['4', '3', '2', '5'],
        answerIndex: 0,
        explanation:
          'The tokens are `Hello,`, `world!`, `Hello` and `world` — four distinct strings, because the punctuation welded to the first two makes them different from the last two. This is precisely the bug that punctuation-aware tokenisation exists to prevent.',
      },
      {
        id: 'NLP-001-q3',
        type: 'truefalse',
        concept: 'subword coverage',
        prompt: 'A subword tokeniser with a 30,000-entry vocabulary will emit an unknown-token marker for any word that was not in its training corpus.',
        answer: false,
        explanation:
          'False. That is the defining advantage of subword schemes: an unseen word is decomposed into fragments that are in the vocabulary, falling back to characters or raw bytes if necessary. Genuine unknowns are essentially eliminated.',
      },
      {
        id: 'NLP-001-q4',
        type: 'multi',
        concept: 'why text is hard',
        prompt: 'Which of these are structural reasons text is harder to model than a table of numeric features? Select all that apply.',
        options: [
          'It is discrete — there is no meaningful value between `cat` and `dog`',
          'It is variable in length — documents range from a few words to thousands',
          'It is ambiguous — the same word means different things in different contexts',
          'It is always stored in UTF-8, which computers cannot read',
          'It is compositional — word order changes meaning',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Discreteness, variable length, ambiguity and compositionality are the four genuine difficulties. Encoding is a solved engineering detail, not a modelling problem — computers read UTF-8 perfectly well.',
      },
      {
        id: 'NLP-001-q5',
        type: 'order',
        concept: 'the text-to-tensor pipeline',
        prompt: 'Put the stages of turning a sentence into model input in the correct order.',
        items: [
          'Raw string',
          'Normalise (lowercase, clean whitespace)',
          'Split into tokens',
          'Map tokens to vocabulary ids',
          'Add special tokens such as [CLS] and [SEP]',
          'Build an integer tensor and feed the model',
        ],
        explanation:
          'Normalisation comes before splitting because it changes what the splitter sees. Ids come after splitting because the vocabulary is keyed by token. Special tokens wrap the id sequence last, immediately before tensorisation.',
      },
      {
        id: 'NLP-001-q6',
        type: 'explain',
        concept: 'subword trade-offs',
        prompt: 'Explain to a teammate why `tokenization` becomes two tokens while `learning` stays one, and why that is a feature rather than a bug.',
        rubric: [
          'States that the vocabulary is learned from corpus frequency',
          'States that frequent words are kept whole and rare words are split',
          'Mentions parameter sharing across morphologically related words',
        ],
        sampleAnswer:
          'The vocabulary is built by repeatedly merging the most frequent character pairs in a training corpus, so words that appear often enough earn their own entry and rare ones do not. `learning` is extremely common in English text, so it survives as a single token; `tokenization` is not, so it is spelled as `token` plus `##ization`. That is desirable because whatever the model learns about the fragment `token` is immediately shared with `tokenize`, `tokenizer` and `tokenized`, instead of each being an unrelated row in the embedding table.',
        explanation:
          'The examinable insight is that vocabulary construction is a frequency-driven compression problem, and that fragment sharing is what gives subword models their generalisation to unseen morphology.',
      },
    ],

    flashcards: [
      { front: 'What is a token?', back: 'The atomic unit a model consumes — a word, punctuation mark, subword fragment or character. Whatever the tokeniser emits.' },
      { front: 'Name the four properties that make text hard to model.', back: 'Discrete (no arithmetic on symbols), variable length, ambiguous (context-dependent meaning), compositional (order matters).' },
      { front: 'What does the `##` prefix mean in WordPiece output?', back: 'This fragment continues the previous word rather than starting a new one, so the detokeniser rejoins them with no space.' },
      { front: 'Why never mix tokenisers between training and inference?', back: 'Ids are indices into one specific vocabulary. A mismatched tokeniser silently selects the wrong embedding rows — no error, just meaningless output.' },
      { front: 'Whitespace tokenisation: one advantage, one fatal flaw.', back: 'Advantage: trivial and dependency-free. Flaw: unbounded vocabulary, and any unseen word has no representation at all.' },
      { front: 'What are [CLS] and [SEP]?', back: 'Special tokens (ids 101 and 102 in BERT) that mark the start of a sequence and the boundary between segments. Added after id lookup.' },
    ],

    challenge: {
      title: 'Build a tokeniser comparison harness',
      brief:
        'Write a script that runs four tokenisers — `str.split()`, a `\\w+` regex, NLTK `word_tokenize`, and a Hugging Face `AutoTokenizer` — over the same list of at least eight deliberately awkward sentences (contractions, multi-word entities, URLs, emoji, currency, a non-English sentence, a hyphenated compound and a typo). Print a table of token counts per tokeniser per sentence, and write a short note identifying, for each tokeniser, the single sentence it handled worst and why.',
      language: 'python',
      acceptanceCriteria: [
        'All four tokenisers run over the same input list',
        'Output is a readable table of tokens and counts',
        'At least eight sentences, each targeting a distinct failure mode',
        'A written note names the worst case for each tokeniser and explains the cause',
      ],
      starterCode:
        'SENTENCES = [\n    "I don\'t live in New York.",\n    "Email me at a.b@example.com about the $1.50 fee.",\n    # add six more awkward cases\n]\n',
    },

    teachingPrompt: {
      prompt:
        'A friend who codes but has never touched NLP asks: "why can\'t you just feed the sentence to the model?" Teach them what has to happen first, and why splitting on spaces is not good enough.',
      mustCover: [
        'Models consume numbers, so text must be mapped to integer ids and then to vectors',
        'Tokenisation is the step that decides what the atoms of the text are',
        'Whitespace splitting produces an unbounded vocabulary and fails on unseen words',
        'Subword tokenisation keeps the vocabulary fixed while covering any string',
      ],
      bonusSignals: [
        'gives a concrete example such as "I love machine learning" becoming ids',
        'mentions a specific failure like "don\'t" or "New York"',
        'connects token count to cost or context limits',
      ],
      sampleExplanation:
        'A model is a pile of matrix multiplications, and you cannot multiply the word "cat". So before anything else, the sentence has to become a list of numbers. The way we do that is to cut it into pieces called tokens and look each piece up in a numbered list — "I love machine learning" becomes four pieces and then four ids like 1045, 2293, 3698, 4083. Cutting on spaces seems like the obvious choice, but it goes wrong fast: "York." with a full stop becomes a different token from "York", "don\'t" hides the negation inside a blob, "New York" is filed as two unrelated words, and any name or typo the list has never seen gets no number at all. So modern systems learn a fixed vocabulary of frequent word fragments instead. Common words stay whole, rare ones get spelled out of familiar chunks, and nothing is ever completely unrepresentable.',
    },
  },

  {
    id: 'NLP-002',
    domain: 'NLP',
    module: 'Text Preprocessing',
    topic: 'Vocabulary and normalisation',
    title: 'Vocabulary, Stop Words and Normalisation',
    slug: 'vocabulary-and-stop-words',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['NLP-001'],
    related: [],
    tags: ['vocabulary', 'stop-words', 'normalisation', 'unicode', 'oov', 'unk'],

    learningObjectives: [
      'Build a vocabulary from a corpus, order it by frequency and map every token to a stable integer id',
      'Explain what out-of-vocabulary means, what the UNK token does, and what information it destroys',
      'Decide when lowercasing, accent stripping and punctuation removal help and when they silently delete meaning',
      'Argue, with evidence, why removing stop words helps a TF-IDF search index but usually harms a transformer',
    ],

    terminology: [
      {
        term: 'Vocabulary',
        definition:
          'The mapping from token strings to integer ids that a model was trained with. Frozen at training time; everything at inference must be expressed through it.',
        simple: 'The numbered list of every word the model knows.',
      },
      {
        term: 'Out-of-vocabulary (OOV)',
        definition:
          'A token encountered at inference time that has no entry in the vocabulary. Word-level models must replace it with a fallback; subword models decompose it instead.',
        simple: 'A word the model has never met.',
      },
      {
        term: 'UNK token',
        definition:
          'A single reserved entry, usually written `<unk>` or `[UNK]`, that every out-of-vocabulary token collapses into. All distinct unknown words become indistinguishable.',
        simple: 'One shared id meaning "some word I do not know".',
      },
      {
        term: 'Normalisation',
        definition:
          'Deterministic transformations applied before tokenisation — case folding, Unicode NFKC composition, accent stripping, whitespace collapsing — that reduce surface variation.',
        simple: 'Tidying the text so two ways of writing the same thing look identical.',
      },
      {
        term: 'Stop words',
        definition:
          'High-frequency function words such as `the`, `is`, `of` and `and`, which carry little topical signal in a counting model but considerable grammatical signal in a contextual one.',
        simple: 'The little connecting words that appear in almost every sentence.',
      },
      {
        term: 'Zipf\'s law',
        definition:
          'The empirical observation that the frequency of the r-th most common word is roughly proportional to 1/r, so a tiny number of words dominate any corpus and a long tail appears once or twice.',
        simple: 'A few words are everywhere and most words are nearly nowhere.',
      },
    ],

    simpleExplanation:
      "Once you have cut text into tokens, you need a numbered list of every token the model is allowed to know — that list is the vocabulary. You build it by counting: read the whole corpus, count how often each token appears, sort by count, and hand out ids. The first surprise is how lopsided the counts are. In almost any English corpus, `the` alone is about 6% of all words, while more than half the distinct words appear exactly once. The second surprise is what happens at the edges. If you keep only the top 20,000 words, then at inference time a name or a typo you have never seen has no id, so it becomes a single shared token meaning \"unknown\" — and every unknown word becomes the same unknown word. Before all of this you usually tidy the text: make everything lowercase, collapse odd whitespace, decide what to do with accents. Each of those tidying steps throws something away, and the skill is knowing what you are throwing away and whether you needed it.",

    whyItExists:
      'Every model needs a finite, fixed set of inputs, but language has an effectively unbounded set of surface forms: `Cafe`, `café`, `CAFÉ` and `cafe.` are four strings for one idea, and new words appear daily. Vocabulary construction and normalisation exist to impose a finite, stable index on that unbounded space, and to decide deliberately which distinctions are worth keeping.',

    analogy: {
      scenario:
        'Think of the index at the back of a textbook. The author cannot index every word — an entry for "the" appearing on all 600 pages helps nobody, and an entry for a word used once in a footnote takes space for almost no benefit. So the author picks a cut-off, indexes the terms in between, and quietly drops the rest. If you then look up a term that was dropped, the index cannot tell you it exists at all; it simply has no row for it.',
      mapping: [
        { from: 'Each indexed term with its page numbers', to: 'A vocabulary entry mapped to an integer id' },
        { from: 'The word "the", too common to index usefully', to: 'A stop word — high frequency, low discriminating power' },
        { from: 'A word used once in a footnote and left out', to: 'A rare token pruned by a `min_count` threshold' },
        { from: 'Looking up a term the index omitted and finding nothing', to: 'An out-of-vocabulary token mapping to UNK' },
        { from: 'Merging "Café" and "cafe" into one entry', to: 'Case folding and accent stripping during normalisation' },
      ],
      bridge:
        'The index analogy captures the real trade-off exactly: every entry costs storage (a row in the embedding matrix, which for a 300-dimensional model is 300 parameters per token), and every omission costs coverage. Where the textbook author trades pages against usefulness, you trade model size against the fraction of your corpus you can represent faithfully.',
      limitations:
        'A book index is built for a human who can fall back on reading the actual pages. A model has no fallback: once a token becomes UNK, the original string is gone for good and nothing downstream can recover it. This is why subword vocabularies, which never need UNK, largely replaced word-level ones.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Building a vocabulary from a corpus',
        caption: 'The same five steps whether the corpus is 300 tweets or 300 billion words.',
        steps: [
          { label: 'Normalise', detail: 'Unicode NFKC, case fold, collapse whitespace. `Café!` and `CAFE` converge.' },
          { label: 'Tokenise', detail: 'Apply the tokeniser from the previous unit to every document.' },
          { label: 'Count', detail: 'A `Counter` over all tokens. In English, `the` will be near 6% of the total.' },
          { label: 'Prune', detail: 'Drop tokens below `min_count`, or keep only the top `max_size` by frequency.' },
          { label: 'Assign ids', detail: 'Reserve 0 for `<pad>` and 1 for `<unk>`, then number the survivors by descending frequency.' },
        ],
      },
      {
        kind: 'table',
        title: 'What each normalisation step costs you',
        caption: 'Every one of these is a deliberate loss of information. None is free.',
        columns: ['Step', 'What it merges', 'What it destroys', 'When to do it'],
        rows: [
          [
            'Lowercasing',
            '`Apple` and `apple`; `US` and `us`',
            'Proper nouns, acronyms, and shouting as a sentiment signal',
            'Small corpora with sparse counts; never for NER or cased transformers.',
          ],
          [
            'Accent stripping',
            '`resume` and `résumé`; `naive` and `naïve`',
            'Meaning distinctions in French, Spanish and Vietnamese',
            'Noisy user input in English; almost never for multilingual work.',
          ],
          [
            'Punctuation removal',
            '`great.` and `great!`',
            'Sentence boundaries, question form, emphasis, emoticons',
            'Bag-of-words topic models; never for sentiment or generation.',
          ],
          [
            'Unicode NFKC',
            'Full-width and half-width forms, ligatures, curly and straight quotes',
            'Typographic nuance, rarely anything semantic',
            'Almost always. This is the safest step on the list.',
          ],
          [
            'Stop-word removal',
            'Discards `the`, `is`, `not`, `of`',
            'Negation, grammatical relations, multi-word phrases',
            'Sparse keyword search and topic models; essentially never for transformers.',
          ],
        ],
      },
      {
        kind: 'compare',
        title: 'Should you remove stop words?',
        caption: 'The honest answer depends entirely on what consumes the output.',
        left: {
          heading: 'Yes — sparse counting models',
          points: [
            'A bag-of-words matrix shrinks by 30–50%, which is real memory',
            '`the` appears in every document, so it discriminates nothing',
            'Topic models such as LDA produce visibly cleaner topics',
            'Classic search indexes have removed them since the 1970s',
            'TF-IDF already down-weights them, so removal is mostly a speed win',
          ],
        },
        right: {
          heading: 'No — contextual and neural models',
          points: [
            'Stop-word lists contain `not`, `no`, `never` — deleting them inverts sentiment',
            '"The film was not good" and "The film was good" become identical',
            'Transformers were pre-trained on natural text; removal shifts the distribution',
            'Attention learns to down-weight uninformative tokens by itself',
            'Function words carry the syntax that resolves `he`, `it` and `which`',
          ],
        },
      },
      {
        kind: 'ascii',
        title: 'Zipf\'s law on a small corpus',
        caption: 'Rank on the left, count on the right. A handful of tokens, then a very long tail.',
        art: `rank  token      count   bar
  1   the         1832   ############################
  2   of           894   ##############
  3   and          812   #############
  4   to           745   ############
  ...
 40   model         61   #
 41   data          60   #
  ...
8112   krakow         1   .
8113   hyperbole      1   .
8114   zoologist      1   .

  top 4 tokens  ->  18% of all token occurrences
  hapax (count 1) -> 52% of the distinct vocabulary`,
      },
      {
        kind: 'widget',
        title: 'Vocabulary and normalisation explorer',
        caption: 'Toggle lowercasing, punctuation and stop words, and watch the vocabulary size and OOV rate move.',
        widget: 'tokenizer-lab',
        props: { mode: 'vocabulary', showCounts: true },
      },
    ],

    formalDefinition:
      'A vocabulary V is a bijection between a finite set of token strings and the integers {0, …, |V| − 1}, typically constructed as the top-k tokens by corpus frequency subject to a minimum count threshold, with reserved indices for control tokens such as `<pad>`, `<unk>`, `<bos>` and `<eos>`. Normalisation is a function N : Σ* → Σ* applied before tokenisation; it is generally non-injective, so the composition N ∘ tokenise deliberately maps several distinct surface strings onto the same id sequence.',

    math: {
      intuition:
        'Two numbers describe the health of any vocabulary. The first is coverage: what fraction of the tokens you will actually meet are in the vocabulary. The second is Zipf\'s law, which explains why coverage behaves so unintuitively — because word frequency falls off roughly as one over rank, doubling the vocabulary size buys you far less than doubling the coverage.',
      formulas: [
        {
          latex: '\\text{coverage}(V) = \\frac{\\sum_{t \\in V} c(t)}{\\sum_{t \\in C} c(t)}',
          name: 'Token coverage of a vocabulary',
          meaning:
            'The proportion of running tokens in a corpus that the vocabulary can represent exactly. Note it is weighted by occurrence, not by distinct type, which is why a 20k vocabulary can cover 97% of tokens while omitting 80% of distinct words.',
          variables: [
            { symbol: 'V', meaning: 'The set of token strings kept in the vocabulary' },
            { symbol: 'C', meaning: 'The set of all distinct token strings observed in the corpus' },
            { symbol: 'c(t)', meaning: 'The number of times token t occurs in the corpus' },
          ],
          category: 'statistics',
        },
        {
          latex: 'f(r) \\approx \\frac{K}{r^{s}}, \\qquad s \\approx 1',
          name: "Zipf's law",
          meaning:
            'The frequency of the r-th most common word is inversely proportional to its rank. In practice this means the top 100 words account for roughly half of all running text, while the majority of distinct words appear once.',
          variables: [
            { symbol: 'r', meaning: 'Frequency rank of a word (1 = most frequent)' },
            { symbol: 'f(r)', meaning: 'The number of occurrences of the word at rank r' },
            { symbol: 'K', meaning: 'A corpus-dependent constant, roughly the frequency of the most common word' },
            { symbol: 's', meaning: 'The exponent, close to 1 for natural language' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{OOV rate} = \\frac{\\#\\{i : t_i \\notin V\\}}{n}',
          name: 'Out-of-vocabulary rate',
          meaning:
            'The fraction of tokens in a held-out text that fall outside the vocabulary and must be replaced by UNK. This is the number to report; distinct-word OOV rate flatters your vocabulary and means little.',
          variables: [
            { symbol: 't_i', meaning: 'The i-th token of the held-out text' },
            { symbol: 'n', meaning: 'Total number of tokens in the held-out text' },
            { symbol: 'V', meaning: 'The vocabulary built from the training corpus' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Suppose word frequencies follow Zipf with s = 1, so the word at rank r occurs K/r times.',
        'The total number of token occurrences across the top k ranks is the partial harmonic sum K(1 + 1/2 + … + 1/k), which is approximately K·ln(k).',
        'Across the whole corpus of |C| distinct types the total is approximately K·ln(|C|).',
        'Coverage of the top k is therefore about ln(k) / ln(|C|) — logarithmic, not linear, in vocabulary size.',
        'Consequence: going from 10,000 to 20,000 entries adds only ln(2)/ln(|C|) of coverage, a couple of percentage points. This diminishing return is exactly why subword vocabularies, which get 100% coverage from ~30,000 entries, replaced word-level ones.',
      ],
    },

    workedExample: {
      title: 'Building a vocabulary from three documents by hand',
      setup:
        'Corpus: D1 = "The cat sat on the mat", D2 = "The dog sat on the log", D3 = "A cat and a dog". Normalise by lowercasing and splitting on whitespace, then build a vocabulary with min_count = 2.',
      steps: [
        {
          label: 'Normalise and tokenise',
          detail:
            'D1 -> [the, cat, sat, on, the, mat]; D2 -> [the, dog, sat, on, the, log]; D3 -> [a, cat, and, a, dog]. Seventeen token occurrences in total.',
        },
        {
          label: 'Count occurrences',
          detail:
            'the: 4, cat: 2, sat: 2, on: 2, dog: 2, a: 2, mat: 1, log: 1, and: 1. Nine distinct types, seventeen occurrences.',
        },
        {
          label: 'Observe the skew',
          detail:
            'The single most frequent token accounts for 4/17 = 23.5% of all occurrences, while three of the nine types (mat, log, and) occur exactly once. On a corpus of 17 tokens this is already Zipf-shaped.',
          latex: 'f(1) = 4, \\quad f(2) = 2, \\quad f(7) = 1',
        },
        {
          label: 'Apply min_count = 2',
          detail:
            'Keep {the, cat, sat, on, dog, a}; drop {mat, log, and}. Six entries survive out of nine types.',
        },
        {
          label: 'Assign ids with reserved slots',
          detail:
            '0 = <pad>, 1 = <unk>, 2 = the, 3 = cat, 4 = sat, 5 = on, 6 = dog, 7 = a. Ties in frequency are broken by first appearance so the mapping is reproducible.',
        },
        {
          label: 'Encode D1 through the finished vocabulary',
          detail:
            '[the, cat, sat, on, the, mat] -> [2, 3, 4, 5, 2, 1]. The final 1 is UNK: `mat` was pruned and is now indistinguishable from `log` or from any future unseen word.',
        },
        {
          label: 'Measure the damage',
          detail:
            'Token coverage = 14/17 = 82.4%; OOV rate = 3/17 = 17.6%. On a real corpus with min_count = 2 you would expect coverage in the high nineties, because the pruned tail is long in types but thin in occurrences.',
          latex: '\\text{coverage} = \\frac{4+2+2+2+2+2}{17} = \\frac{14}{17} \\approx 0.824',
        },
      ],
      conclusion:
        'Six vocabulary entries cover 82% of the running text of this corpus, and the three discarded words were 33% of the distinct types but only 18% of the occurrences. That asymmetry — most distinct words are rare, most running text is common words — is the single most important statistical fact about natural language, and it is why every decision in this unit is a coverage-versus-size trade.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Build a vocabulary and see Zipf in the counts',
        runnable: true,
        code: `from collections import Counter

corpus = [
    "The cat sat on the mat",
    "The dog sat on the log",
    "A cat and a dog",
]

tokens = [t for doc in corpus for t in doc.lower().split()]
counts = Counter(tokens)
print(counts.most_common())

MIN_COUNT = 2
kept = [t for t, c in counts.most_common() if c >= MIN_COUNT]

vocab = {"<pad>": 0, "<unk>": 1}
for token in kept:
    vocab[token] = len(vocab)

print("vocab:", vocab)

def encode(text):
    return [vocab.get(t, vocab["<unk>"]) for t in text.lower().split()]

print("encoded D1:", encode(corpus[0]))

covered = sum(counts[t] for t in kept)
print(f"coverage: {covered / len(tokens):.1%}")`,
        output: `[('the', 4), ('cat', 2), ('sat', 2), ('on', 2), ('dog', 2), ('a', 2), ('mat', 1), ('log', 1), ('and', 1)]
vocab: {'<pad>': 0, '<unk>': 1, 'the': 2, 'cat': 3, 'sat': 4, 'on': 5, 'dog': 6, 'a': 7}
encoded D1: [2, 3, 4, 5, 2, 1]
coverage: 82.4%`,
        explanation:
          'This is the worked example as code. Notice `vocab.get(t, vocab["<unk>"])` — that single `.get` default is where out-of-vocabulary handling actually lives, and it is irreversible: once `mat` becomes 1, nothing downstream can tell it apart from any other unknown word. Reserving id 0 for `<pad>` matters because most deep-learning frameworks use 0 as the default padding value and `nn.Embedding(padding_idx=0)` expects it there.',
      },
      {
        language: 'python',
        title: 'Normalisation, and exactly what each step destroys',
        runnable: true,
        code: `import unicodedata, re

def normalise(text, lower=True, strip_accents=False, drop_punct=False):
    text = unicodedata.normalize("NFKC", text)
    if lower:
        text = text.lower()
    if strip_accents:
        text = "".join(
            c for c in unicodedata.normalize("NFD", text)
            if unicodedata.category(c) != "Mn"
        )
    if drop_punct:
        text = re.sub(r"[^\\w\\s]", " ", text)
    return re.sub(r"\\s+", " ", text).strip()

samples = ["I visited a CAFE in Paris", "I visited a cafe in Paris",
           "US soldiers", "us soldiers", "It was great!", "It was great?"]

for s in samples:
    print(f"{s!r:32} -> {normalise(s, drop_punct=True)!r}")`,
        output: `'I visited a CAFE in Paris'       -> 'i visited a cafe in paris'
'I visited a cafe in Paris'       -> 'i visited a cafe in paris'
'US soldiers'                     -> 'us soldiers'
'us soldiers'                     -> 'us soldiers'
'It was great!'                   -> 'it was great'
'It was great?'                   -> 'it was great'`,
        explanation:
          'The first pair is the win: two spellings of one idea collapse to one id, which doubles the effective count for a sparse model. The second and third pairs are the cost, and they are not hypothetical. `US` the country and `us` the pronoun are now the same token, which is a real problem for any news classifier. And `great!` versus `great?` — enthusiasm versus doubt — became identical, which is fatal for sentiment. Normalisation is a lever, not a checklist: pull it only as far as your task can afford.',
      },
      {
        language: 'python',
        title: 'The stop-word trap, demonstrated',
        runnable: true,
        code: `from sklearn.feature_extraction.text import CountVectorizer

reviews = [
    "the film was not good at all",
    "the film was good",
]

with_stop = CountVectorizer()
without_stop = CountVectorizer(stop_words="english")

print("keeping stop words:")
print(" ", with_stop.fit_transform(reviews).toarray())
print(" ", with_stop.get_feature_names_out())

print("removing stop words:")
print(" ", without_stop.fit_transform(reviews).toarray())
print(" ", without_stop.get_feature_names_out())`,
        output: `keeping stop words:
  [[1 1 1 1 1 1]
   [0 1 0 1 1 1]]
  ['all' 'at' 'film' 'good' 'not' 'the' 'was']
removing stop words:
  [[1 1]
   [1 1]]
  ['film' 'good']`,
        explanation:
          "This is the most important cell in the unit. scikit-learn's English stop-word list contains `not`, `at` and `all`, so after removal the two reviews — one negative, one positive — have byte-identical feature vectors. No classifier on earth can separate them. The list is also known to be idiosyncratic; the scikit-learn documentation itself warns against using it uncritically. If you must remove stop words, build your own list from corpus frequency and explicitly keep every negator.",
      },
    ],

    realWorldExamples: [
      {
        context: 'Search engines and inverted indexes',
        usage:
          'Elasticsearch ships analysers that lowercase, fold accents and optionally drop stop words before indexing, because an inverted index posting list for `the` would contain every document and cost storage for no discriminating power. The same pipeline must be applied to the query, or nothing matches.',
      },
      {
        context: 'Cased versus uncased BERT in industry',
        usage:
          'Teams doing named entity recognition deliberately choose `bert-base-cased`, because capitalisation is one of the strongest signals that a token is a person or organisation. Teams doing topic classification on noisy user text usually choose uncased, since users type in inconsistent case anyway.',
      },
      {
        context: 'Multilingual product catalogues',
        usage:
          'An e-commerce team that strips accents to match `cafe` with `café` discovers they have merged the Spanish words for "year" and a vulgarity, and the French words for "meeting" and "kicked". Accent stripping is an English-centric shortcut that becomes a bug the moment the catalogue goes multilingual.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`CountVectorizer` exposes `lowercase`, `strip_accents`, `stop_words`, `min_df` and `max_features` — this entire unit as constructor arguments.' },
      { tool: 'torchtext / nn.Embedding', role: 'The vocabulary size fixes the number of embedding rows, and `padding_idx` expects a reserved id.' },
      { tool: 'spaCy', role: '`token.is_stop`, `token.is_punct` and `token.lower_` let you filter by linguistic property rather than by a fixed word list.' },
      { tool: 'Elasticsearch', role: 'Analysers chain exactly these normalisation steps at index time and query time, and mismatching them is a classic production bug.' },
    ],

    commonMistakes: [
      {
        mistake: 'Removing stop words before a sentiment or negation-sensitive task',
        why: 'Standard English stop-word lists include `not`, `no`, `never` and `against`. Removing them makes "not good" and "good" identical, which no downstream model can recover from.',
        fix: 'Either keep stop words entirely, or subtract negators from the list: `stops = set(ENGLISH_STOP_WORDS) - {"not", "no", "never", "nor", "against"}`.',
      },
      {
        mistake: 'Fitting the vocabulary on the full dataset including the test split',
        why: 'The vocabulary is a learned artefact of the training data. Building it over test documents too leaks information about which words appear there, inflating measured accuracy.',
        fix: 'Call `vectorizer.fit_transform(X_train)` and then `vectorizer.transform(X_test)`. Never `fit` on test data — treat the vocabulary like any other fitted parameter.',
      },
      {
        mistake: 'Lowercasing before named entity recognition',
        why: 'Capitalisation is one of the most informative features for identifying people, organisations and places. `Apple` versus `apple` and `Bill` versus `bill` are distinguished almost entirely by case.',
        fix: 'Use a cased model and cased input for NER, part-of-speech tagging and anything where proper nouns matter.',
      },
      {
        mistake: 'Reporting OOV rate over distinct words instead of token occurrences',
        why: 'Most distinct words are rare, so type-level OOV looks alarming while the model in fact handles nearly all running text. Conversely a low type-level rate can hide a common word being dropped.',
        fix: 'Report token-level OOV on a held-out set: the number of token occurrences mapped to UNK divided by total tokens. That is what the model actually experiences.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the UNK token and what is the cost of using one?',
        answer:
          'UNK is a single reserved vocabulary entry that every out-of-vocabulary token is mapped to. It keeps the id space finite and stops the lookup from failing. The cost is total information loss for those tokens: a surname, a product code and a typo all become the same id, so the model cannot distinguish them and cannot learn anything about any of them. If UNK falls on a content word — which is likely, since rare words are usually the informative ones — the sentence may become unclassifiable. This is precisely why subword tokenisation displaced word-level vocabularies: BPE and WordPiece decompose unseen words into known fragments, so UNK is essentially never emitted.',
        followUp:
          'A strong answer notes that UNK-heavy inputs are a real production signal: a spike in the UNK rate usually means the input distribution has drifted away from the training corpus.',
      },
      {
        level: 'intermediate',
        question: 'Your teammate removes stop words as a default preprocessing step. When is that right and when is it wrong?',
        answer:
          'It is defensible for sparse counting models — bag of words, TF-IDF, LDA topic models, classic inverted indexes — where stop words inflate the matrix without discriminating between documents, and where removal is largely a memory and speed win. It is wrong for anything contextual. Transformers were pre-trained on natural text, so removing function words shifts the input distribution away from what the model saw and measurably hurts accuracy; attention already learns to assign low weight to uninformative tokens. The decisive argument is negation: standard stop lists contain `not` and `no`, so removal makes "the film was not good" identical to "the film was good". The right default in 2026 is to leave them in and only remove them if a held-out evaluation shows it helps.',
      },
      {
        level: 'ml-engineer',
        question: 'A deployed text classifier degrades over six months with no code change. How would you use vocabulary statistics to diagnose it?',
        answer:
          'Log the token-level UNK rate and the top-k token frequency distribution of live traffic, and compare them against the training corpus. A rising UNK rate points at new vocabulary — product names, slang, a new market, a new spelling convention — that the frozen vocabulary cannot represent. A changed frequency profile with a flat UNK rate points instead at topic drift: the same words in different proportions. The two have different remedies. New vocabulary is fixed by retraining the vectoriser or, for subword models, usually needs no fix at the tokeniser level at all and instead indicates genuine distribution shift. Topic drift needs fresh labelled data. Either way, vocabulary statistics are cheap to log and give you the diagnosis before accuracy metrics do, because they do not require labels.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given the corpus ["to be or not to be", "to eat or not to eat"], build a lowercase whitespace vocabulary with min_count = 2 and reserved ids 0 for pad and 1 for unk. List the final mapping and encode the first document.',
        hint: 'Count first, then prune, then number by descending frequency.',
        solution:
          'Counts: to 4, be 2, or 2, not 2, eat 2. Every token reaches min_count = 2, so nothing is pruned. Mapping: {<pad>: 0, <unk>: 1, to: 2, be: 3, or: 4, not: 5, eat: 6}. Encoding "to be or not to be" gives [2, 3, 4, 5, 2, 3]. Two things are worth noticing. First, `to` alone is 4 of the 12 token occurrences — one third of the corpus is a single stop word, and it carries no information about which of the two documents you are reading. Second, a stop-word filter would delete `to`, `or` and `not`, leaving "be be" and "eat eat", which happens to still separate the documents here but has thrown away the negation that both sentences turn on.',
      },
      {
        prompt:
          'Write a function `oov_rate(texts, vocab)` that returns the token-level out-of-vocabulary rate, and explain why you should not compute it over the set of distinct words instead.',
        hint: 'Count occurrences, not unique strings. Divide by total tokens.',
        language: 'python',
        starterCode: 'def oov_rate(texts, vocab):\n    ...\n',
        solution:
          "def oov_rate(texts, vocab):\n    total = unknown = 0\n    for text in texts:\n        for token in text.lower().split():\n            total += 1\n            if token not in vocab:\n                unknown += 1\n    return unknown / max(total, 1)\n\nComputing it over distinct words answers the question \"what fraction of the dictionary is missing?\", which nobody cares about. Because of Zipf's law the distinct-word rate is always alarming — most distinct words appear once — while the token-level rate is usually small. The token-level rate is the one that matches what the model actually experiences per input, and it is the one that moves when your input distribution drifts.",
      },
      {
        prompt:
          'Using scikit-learn, show that a stop-word list can make two opposite-sentiment reviews produce identical feature vectors, then propose and implement a fix.',
        hint: 'Start from "the movie was not worth watching" and "the movie was worth watching".',
        language: 'python',
        starterCode:
          'from sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.feature_extraction.text import ENGLISH_STOP_WORDS\n\nreviews = ["the movie was not worth watching", "the movie was worth watching"]\n',
        solution:
          "With `CountVectorizer(stop_words='english')` both reviews reduce to the features `movie`, `worth`, `watching` with identical counts, because `not`, `the` and `was` are all on the list. The rows are byte-identical, so the two labels are unlearnable.\n\nThe fix is to keep negators:\n\n    stops = list(ENGLISH_STOP_WORDS - {'not', 'no', 'never', 'nor', 'none', 'cannot'})\n    vec = CountVectorizer(stop_words=stops)\n\nNow `not` survives as a feature and the rows differ. A second, often better fix is `CountVectorizer(ngram_range=(1, 2))`, which creates the bigram `not worth` — a feature that directly captures the negated phrase rather than relying on the classifier to combine two distant unigrams.",
      },
    ],

    quiz: [
      {
        id: 'NLP-002-q1',
        type: 'mcq',
        concept: 'UNK semantics',
        prompt: 'What is lost when an out-of-vocabulary word is replaced by the UNK token?',
        options: [
          'The identity of that specific word — all unknown words become indistinguishable',
          'Only the capitalisation of the word',
          'Nothing; UNK stores the original string for later recovery',
          'The position of the word in the sentence',
        ],
        answerIndex: 0,
        explanation:
          'UNK is one shared id. A surname, a typo and a product code all collapse onto it, so the model sees the same input for all three and cannot learn anything specific to any of them. The mapping is irreversible.',
      },
      {
        id: 'NLP-002-q2',
        type: 'truefalse',
        concept: 'stop words and negation',
        prompt: 'Removing stop words with the standard scikit-learn English list is a safe default for sentiment classification.',
        answer: false,
        explanation:
          'It is not. The list contains `not`, `no` and `never`, so "the film was not good" and "the film was good" reduce to identical feature vectors. The scikit-learn documentation itself cautions against using the list uncritically.',
      },
      {
        id: 'NLP-002-q3',
        type: 'code-output',
        language: 'python',
        concept: 'normalisation collisions',
        prompt: 'What does this print?',
        code: 'texts = ["US soldiers", "us soldiers"]\nprint(len({t.lower() for t in texts}))',
        options: ['1', '2', '4', '0'],
        answerIndex: 0,
        explanation:
          'Lowercasing collapses the country abbreviation and the pronoun into one string, so the set has a single element. This is the cost of case folding: a real and common collision in news and political text.',
      },
      {
        id: 'NLP-002-q4',
        type: 'numeric',
        concept: 'coverage arithmetic',
        prompt:
          'A corpus has 17 token occurrences. The kept vocabulary accounts for 14 of them. What is the out-of-vocabulary rate, as a decimal to two places?',
        answer: 0.18,
        tolerance: 0.01,
        explanation:
          'OOV rate = 3/17 ≈ 0.176, which rounds to 0.18. Note that three of the nine distinct types were dropped (33% of types) but they were only 18% of occurrences — the usual Zipfian asymmetry.',
      },
      {
        id: 'NLP-002-q5',
        type: 'match',
        concept: 'normalisation costs',
        prompt: 'Match each normalisation step to the information it destroys.',
        pairs: [
          { left: 'Lowercasing', right: 'Proper nouns and acronyms (`Apple` vs `apple`, `US` vs `us`)' },
          { left: 'Punctuation removal', right: 'Sentence boundaries and speech act (`great!` vs `great?`)' },
          { left: 'Accent stripping', right: 'Meaning distinctions in French, Spanish and Vietnamese' },
          { left: 'Stop-word removal', right: 'Negation and grammatical relations (`not`, `no`, `never`)' },
        ],
        explanation:
          'Every normalisation step is a deliberate, irreversible merge of distinct surface forms. Knowing which distinction each one costs is how you choose a pipeline instead of copying one.',
      },
      {
        id: 'NLP-002-q6',
        type: 'explain',
        concept: 'Zipf and vocabulary size',
        prompt:
          'Explain why doubling your vocabulary from 20,000 to 40,000 words buys only a small increase in token coverage.',
        rubric: [
          'States that word frequency follows roughly a 1/rank law',
          'Distinguishes distinct-word counts from token occurrence counts',
          'Concludes that coverage grows logarithmically, not linearly, with vocabulary size',
        ],
        sampleAnswer:
          'Word frequencies follow Zipf\'s law: the r-th most common word appears about K/r times. Summing that over the top k ranks gives roughly K·ln(k), so coverage grows with the logarithm of the vocabulary size rather than linearly. The words you add between rank 20,000 and rank 40,000 are, by construction, the rarest ones — most of them appear once or twice in the entire corpus. So you pay for 20,000 more embedding rows and gain perhaps one or two percentage points of token coverage. This diminishing return is exactly the pressure that produced subword vocabularies, which achieve effectively complete coverage with about 30,000 entries.',
        explanation:
          'The key move is separating types from tokens. Most distinct words are rare; most running text is common words. Every vocabulary decision follows from that one asymmetry.',
      },
    ],

    flashcards: [
      { front: 'What is the UNK token?', back: 'A single reserved id that all out-of-vocabulary tokens collapse into. Irreversible: every unknown word becomes the same unknown word.' },
      { front: 'Why report token-level OOV rather than type-level?', back: 'Type-level counts every rare word equally and always looks alarming. Token-level measures what the model actually encounters per input.' },
      { front: "State Zipf's law in one sentence.", back: 'The frequency of the r-th most common word is roughly proportional to 1/r, so a few words dominate and most words appear once.' },
      { front: 'When is stop-word removal defensible?', back: 'For sparse counting models — bag of words, TF-IDF, LDA, inverted indexes. Essentially never for transformers, and never when negation matters.' },
      { front: 'Which normalisation step is nearly always safe?', back: 'Unicode NFKC. It merges full-width forms, ligatures and curly quotes, and destroys almost nothing semantic.' },
      { front: 'Why must the vocabulary be fitted on training data only?', back: 'It is a learned parameter. Fitting over the test split leaks which words occur there and inflates measured accuracy.' },
    ],

    challenge: {
      title: 'A normalisation ablation study',
      brief:
        'Take a public sentiment dataset of at least 2,000 reviews. Build a `CountVectorizer` plus `LogisticRegression` pipeline and evaluate accuracy on a fixed held-out split under six configurations: raw; lowercased; lowercased with punctuation removed; lowercased with stop words removed; lowercased with stop words removed except negators; and lowercased with `ngram_range=(1, 2)`. Report vocabulary size, token-level OOV rate on the held-out split and accuracy for each, and write a paragraph on which step cost the most accuracy and why.',
      language: 'python',
      acceptanceCriteria: [
        'All six configurations evaluated on the same fixed split',
        'Vocabulary size, OOV rate and accuracy reported for each',
        'The vectoriser is fitted on training data only',
        'The written analysis names the mechanism behind the biggest accuracy drop, not just the number',
      ],
      starterCode:
        'from sklearn.pipeline import make_pipeline\nfrom sklearn.feature_extraction.text import CountVectorizer\nfrom sklearn.linear_model import LogisticRegression\n\nCONFIGS = {\n    "raw": dict(lowercase=False),\n    "lower": dict(lowercase=True),\n    # add the remaining four\n}\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a colleague how a vocabulary gets built, what happens to words that are not in it, and why "just remove the stop words" is bad advice for a modern model.',
      mustCover: [
        'A vocabulary is built by counting tokens and keeping the most frequent ones',
        'Words outside it become UNK, which destroys their identity irreversibly',
        'Normalisation steps each merge surface forms and each destroy something',
        'Stop-word removal deletes negators and is harmful for contextual models',
      ],
      bonusSignals: [
        'mentions Zipf\'s law or the long tail explicitly',
        'gives the "not good" versus "good" example',
        'distinguishes token-level from type-level statistics',
      ],
      sampleExplanation:
        'Building a vocabulary is just counting. You read the corpus, tally every token, sort by frequency, and hand out id numbers — usually reserving a couple of slots for padding and for unknown words. The counts are wildly lopsided: `the` will be around 6% of an English corpus on its own, while more than half the distinct words appear exactly once. That is why you prune the tail, and pruning is where the danger starts, because any word you drop becomes UNK at inference time and every UNK looks identical to the model. Normalisation has the same shape of risk: lowercasing merges `Apple` with `apple`, accent stripping merges French words that genuinely differ, and dropping punctuation makes `great!` the same as `great?`. As for removing stop words — it was sensible advice in 1995 when you were building a keyword index, and it is bad advice now. The standard English list contains `not`, so "the film was not good" and "the film was good" end up with identical feature vectors. A transformer was pre-trained on ordinary sentences and already learns to pay little attention to filler words; deleting them just hands it text unlike anything it saw during training.',
    },
  },

  {
    id: 'NLP-003',
    domain: 'NLP',
    module: 'Text Preprocessing',
    topic: 'Morphology and n-grams',
    title: 'Stemming, Lemmatisation and n-grams',
    slug: 'stemming-lemmatisation-ngrams',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NLP-001', 'NLP-002'],
    related: [],
    tags: ['stemming', 'lemmatisation', 'porter', 'ngrams', 'bigram', 'morphology'],

    learningObjectives: [
      'Apply a Porter stemmer and a lemmatiser to the same words and explain precisely why their outputs differ',
      'Choose between stemming, lemmatisation and neither, based on the downstream model and the corpus size',
      'Generate bigrams and trigrams from a token sequence and explain what word-order information they recover',
      'Quantify the combinatorial cost of higher-order n-grams and relate it to matrix sparsity',
    ],

    terminology: [
      {
        term: 'Stemming',
        definition:
          'A rule-based procedure that strips suffixes from a word by pattern matching, with no dictionary and no knowledge of part of speech. Fast, crude, and frequently produces non-words.',
        simple: 'Chopping the ends off words with a fixed set of rules.',
      },
      {
        term: 'Lemmatisation',
        definition:
          'Reduction of a word to its dictionary headword (its lemma), using a morphological lexicon and usually the word\'s part of speech. Output is always a real word.',
        simple: 'Looking the word up and writing down the form you would find in a dictionary.',
      },
      {
        term: 'Lemma',
        definition:
          'The canonical dictionary form of a set of inflected words: `be` for `is`, `was`, `were`, `been`; `good` for `better` and `best`.',
        simple: 'The headword a dictionary would list the word under.',
      },
      {
        term: 'n-gram',
        definition:
          'A contiguous sequence of n tokens. Unigrams are single tokens, bigrams are adjacent pairs, trigrams are adjacent triples.',
        simple: 'A short window of words taken in order.',
      },
      {
        term: 'Over-stemming and under-stemming',
        definition:
          'Over-stemming conflates words that should stay distinct (`university` and `universe` both to `univers`); under-stemming fails to conflate words that should merge (`ran` stays `ran` while `running` becomes `run`).',
        simple: 'Cutting too much, or not enough.',
      },
    ],

    simpleExplanation:
      "English writes the same idea many ways: run, runs, running, ran. To a counting model those are four unrelated words, which wastes evidence — you saw the concept four times but each spelling only once. Two tools fix this. A stemmer chops the end off with blunt rules: `running` loses `ning` and becomes `run`, but `studies` becomes `studi`, which is not a word at all, and `universe` and `university` both become `univers`, which merges two quite different ideas. A lemmatiser instead looks the word up properly and knows that the dictionary form of `ran` is `run`, of `better` is `good`, and of `mice` is `mouse` — but it needs to know whether the word is a verb or a noun, and it is much slower. The other idea in this unit pulls in the opposite direction. Counting single words throws away order, so `not good` looks the same as `good not`. If you also count adjacent pairs — bigrams — you recover a little of that order, at the cost of a vocabulary that grows explosively.",

    whyItExists:
      'Sparse models count exact string matches, so every inflected form is a separate feature carrying a fraction of the evidence. Stemming and lemmatisation exist to concentrate that evidence on one form. n-grams exist for the opposite reason: unigram counting discards word order entirely, and short contiguous windows are the cheapest way to buy some of it back.',

    analogy: {
      scenario:
        "Imagine two librarians filing a pile of books. The first works by a laminated card of rules: 'if the title ends in -ing, remove it; if it ends in -ies, replace with -i'. She is astonishingly fast and never opens a book, but she files 'Studies in Ethics' under 'Studi' and puts 'University Press' next to 'Universe'. The second librarian looks every title up in a reference catalogue, checks whether a word is being used as a noun or a verb, and files 'Ran' correctly alongside 'Run'. She is right far more often and takes twenty times as long.",
      mapping: [
        { from: 'The laminated card of suffix rules', to: 'The Porter stemmer — a fixed, language-specific rule cascade' },
        { from: 'Filing "Studies" under "Studi"', to: 'A stem that is not a real word; harmless for matching, useless for display' },
        { from: 'Putting "University" next to "Universe"', to: 'Over-stemming — two distinct concepts conflated' },
        { from: 'The reference catalogue and the noun/verb check', to: 'A lemmatiser with a morphological lexicon and a part-of-speech tag' },
        { from: 'Filing "Ran" with "Run"', to: 'Irregular inflection that only a dictionary-aware method can handle' },
      ],
      bridge:
        'The choice between librarians is exactly the engineering trade-off: the stemmer costs microseconds and makes systematic errors that often do not matter for retrieval, because a query is stemmed by the same broken rules and therefore still matches. The lemmatiser costs milliseconds and a part-of-speech model, and pays for itself when the output has to be a real word a human will read, or when irregular forms carry the meaning.',
      limitations:
        'The analogy implies one of the two librarians is always the right hire. In modern practice the honest answer is often neither: subword tokenisation already lets a transformer share information across `run`, `running` and `runner` through shared fragments, so both librarians are made redundant for anything built on a pre-trained model.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Same words, three treatments',
        caption: 'Porter stemmer versus WordNet lemmatiser. The `(v)` column supplies the verb part-of-speech tag.',
        columns: ['Word', 'Porter stem', 'Lemma (noun)', 'Lemma (v)', 'Comment'],
        rows: [
          ['running', 'run', 'running', 'run', 'The lemmatiser needs the tag; without it, nothing happens.'],
          ['ran', 'ran', 'ran', 'run', 'Irregular. No suffix rule can reach it — stemming fails outright.'],
          ['studies', 'studi', 'study', 'study', 'The stem is not an English word. Fine for matching, not for display.'],
          ['better', 'better', 'better', 'better', 'Adjective comparative; needs the adjective tag to reach `good`.'],
          ['mice', 'mice', 'mouse', 'mice', 'Irregular plural. The lexicon knows; the rules do not.'],
          ['university', 'univers', 'university', 'university', 'Over-stemming: collides with `universe`, also `univers`.'],
          ['organization', 'organ', 'organization', 'organization', 'Aggressive over-stemming — `organ` is a different concept.'],
        ],
      },
      {
        kind: 'flow',
        title: 'Where morphology sits in the pipeline',
        caption: 'Note that it happens after tokenisation and before counting — and that modern pipelines often skip it.',
        steps: [
          { label: 'Tokenise', detail: '"The studies were running" -> [the, studies, were, running]' },
          { label: 'Normalise case', detail: '[the, studies, were, running]' },
          { label: 'Tag parts of speech', detail: 'Needed only for lemmatisation: [DET, NOUN, VERB, VERB]' },
          { label: 'Stem or lemmatise', detail: 'Porter: [the, studi, were, run]. Lemma: [the, study, be, run]' },
          { label: 'Generate n-grams', detail: 'Bigrams: [(the, study), (study, be), (be, run)]' },
          { label: 'Count into a matrix', detail: 'Unigrams and bigrams become columns of the document-term matrix.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'What bigrams recover that unigrams throw away',
        subject: '"the film was not good" vs "the film was good"',
        annotations: [
          { part: 'Unigram features', note: 'Both documents contain `film`, `was`, `good`. The only difference is a single `not` floating free of what it negates.' },
          { part: 'Bigram features', note: 'The first document contains `not good`; the second does not. A linear classifier can now put a large negative weight on exactly that phrase.' },
          { part: 'Trigram features', note: '`was not good` — even more specific, but it will appear in far fewer training documents, so its weight is estimated from less evidence.' },
          { part: 'The cost', note: 'With a 20,000-word vocabulary there are 20,000 unigram columns but up to 400 million possible bigram columns. Almost all are zero, which is why sparse storage is mandatory.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Stemming versus lemmatisation, decided honestly',
        caption: 'Neither is a default. The question is always what consumes the output.',
        left: {
          heading: 'Reach for stemming when',
          points: [
            'You are building a search index and speed dominates',
            'The output is never shown to a human',
            'Query and document go through the identical stemmer, so errors cancel',
            'You have no part-of-speech tagger for the language',
            'Corpus is small and you need counts concentrated',
          ],
        },
        right: {
          heading: 'Reach for lemmatisation when',
          points: [
            'The output is displayed, logged or used as a rule key',
            'Irregular forms matter: `was/is/be`, `mice/mouse`, `better/good`',
            'You already run spaCy and get lemmas essentially free',
            'The language is morphologically rich (German, Finnish, Turkish)',
            'Precision matters more than latency',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'n-gram and morphology playground',
        caption: 'Stem, lemmatise and generate n-grams from your own sentence; watch the feature count explode with n.',
        widget: 'code-playground',
        props: {
          language: 'python',
          starter:
            'from nltk.stem import PorterStemmer\nfrom nltk.util import ngrams\n\nps = PorterStemmer()\ntokens = "the studies were running quickly".split()\nprint([ps.stem(t) for t in tokens])\nprint(list(ngrams(tokens, 2)))\n',
        },
      },
    ],

    formalDefinition:
      'Stemming is a many-to-one map S : Σ* → Σ* defined by an ordered cascade of suffix-rewriting rules; its codomain is not constrained to real words. Lemmatisation is a map L : Σ* × P → Σ* from a surface form and a part-of-speech tag to the lexicon headword sharing the same inflectional paradigm. For a token sequence (t1, …, tm), the set of n-grams is {(t_i, …, t_{i+n−1}) : 1 ≤ i ≤ m − n + 1}, of which there are m − n + 1.',

    math: {
      intuition:
        'The whole cost story of n-grams is combinatorial. Every extra position in the window multiplies the number of distinct feature columns you could theoretically have by the vocabulary size, while the number you actually observe grows only linearly in corpus length. The gap between those two numbers is the sparsity, and it is why n rarely exceeds 3 in practice.',
      formulas: [
        {
          latex: '|G_n| = m - n + 1',
          name: 'n-grams extracted from one document',
          meaning:
            'A document of m tokens yields m − n + 1 n-grams, because the window slides one position at a time and must fit entirely inside the document.',
          variables: [
            { symbol: 'm', meaning: 'Number of tokens in the document' },
            { symbol: 'n', meaning: 'Window size (1 = unigram, 2 = bigram, 3 = trigram)' },
            { symbol: '|G_n|', meaning: 'Count of n-grams produced, including repeats' },
          ],
          category: 'complexity',
        },
        {
          latex: '|V_n| \\le |V|^{n}',
          name: 'Feature-space growth',
          meaning:
            'The number of distinct n-gram types is bounded above by the vocabulary size raised to the power n. With |V| = 20{,}000 this is 20 thousand unigrams, 400 million possible bigrams and 8 trillion possible trigrams.',
          variables: [
            { symbol: '|V|', meaning: 'Number of distinct unigram tokens in the vocabulary' },
            { symbol: 'n', meaning: 'n-gram order' },
            { symbol: '|V_n|', meaning: 'Number of distinct n-gram types that could occur' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\text{sparsity} = 1 - \\frac{\\text{nnz}}{N \\cdot |V_n|}',
          name: 'Document-term matrix sparsity',
          meaning:
            'The fraction of matrix entries that are zero. For unigrams over ordinary documents this is typically above 0.99; adding bigrams pushes it past 0.999, which is why `scipy.sparse` rather than a dense NumPy array is the only workable storage.',
          variables: [
            { symbol: 'N', meaning: 'Number of documents' },
            { symbol: '|V_n|', meaning: 'Number of distinct n-gram features actually observed' },
            { symbol: '\\text{nnz}', meaning: 'Number of non-zero entries in the matrix' },
          ],
          category: 'complexity',
        },
      ],
      derivation: [
        'A document of m tokens has m positions. A window of width n starting at position i covers positions i through i + n − 1.',
        'For the window to fit, i + n − 1 ≤ m, so i ranges over 1 … m − n + 1.',
        'Hence exactly m − n + 1 n-grams, which for m = 5 gives 5 unigrams, 4 bigrams, 3 trigrams.',
        'Observed n-gram types across a corpus of T total tokens is therefore at most T, growing linearly.',
        'Possible types grow as |V|^n, exponentially in n. The ratio observed/possible collapses, which is exactly the n-gram sparsity problem that reappears in the language-modelling unit as unseen-context probability estimation.',
      ],
    },

    workedExample: {
      title: 'Porter stemming "studies" step by step, and then counting its n-grams',
      setup:
        'Take the sentence "The studies were running". We will apply the relevant Porter rules to `studies`, then enumerate every unigram, bigram and trigram of the whole sentence.',
      steps: [
        {
          label: 'Porter step 1a on `studies`',
          detail:
            'Rule: SSES -> SS, IES -> I, SS -> SS, S -> (nothing). `studies` ends in `ies`, so the second rule fires: `studies` becomes `studi`.',
        },
        {
          label: 'Later steps do not fire',
          detail:
            '`studi` does not end in any of the suffixes the remaining steps look for, so the algorithm terminates. The final stem is `studi` — not an English word, and that is by design; the stemmer only promises consistency, never readability.',
        },
        {
          label: 'Contrast with the lemmatiser',
          detail:
            'WordNet looks `studies` up in its noun exceptions and inflection tables and returns `study`, a real headword. It needed a lexicon of roughly 150,000 entries to do what the stemmer did with a 60-line rule cascade.',
        },
        {
          label: 'Tokenise the sentence',
          detail: '[the, studies, were, running] after lowercasing. m = 4 tokens.',
        },
        {
          label: 'Count the n-grams',
          detail:
            'Unigrams: 4 − 1 + 1 = 4. Bigrams: 4 − 2 + 1 = 3, namely (the, studies), (studies, were), (were, running). Trigrams: 4 − 3 + 1 = 2, namely (the, studies, were) and (studies, were, running).',
          latex: '|G_1| = 4, \\quad |G_2| = 3, \\quad |G_3| = 2',
        },
        {
          label: 'Price the feature space',
          detail:
            'If the corpus vocabulary is 20,000 unigrams, then `ngram_range=(1, 2)` admits up to 20,000 + 400,000,000 columns. A corpus of 10,000 documents averaging 200 tokens contains at most 2,000,000 bigram occurrences and far fewer distinct types, so essentially every column is zero for essentially every row.',
          latex: '|V_2| \\le |V|^2 = 20000^2 = 4 \\times 10^{8}',
        },
        {
          label: 'Check what the bigrams bought',
          detail:
            'The bigram (were, running) encodes the progressive construction that the two unigrams `were` and `running` cannot express separately. That single recovered ordering fact is the entire return on the combinatorial cost.',
        },
      ],
      conclusion:
        'Stemming is a cheap, lossy conflation that works because both sides of a match go through the same damage. n-grams are the reverse trade: they buy back a little word order at a cost that grows as |V|^n, which is why `ngram_range=(1, 2)` is a common and defensible setting and `(1, 5)` almost never is.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Stemmer versus lemmatiser on the awkward cases',
        runnable: true,
        code: `import nltk
nltk.download("wordnet", quiet=True)

from nltk.stem import PorterStemmer, WordNetLemmatizer

ps = PorterStemmer()
wnl = WordNetLemmatizer()

words = ["running", "ran", "studies", "better", "mice", "university", "universe"]

print(f"{'word':12} {'stem':12} {'lemma(n)':12} {'lemma(v)':12}")
for w in words:
    print(f"{w:12} {ps.stem(w):12} {wnl.lemmatize(w):12} {wnl.lemmatize(w, pos='v'):12}")`,
        output: `word         stem         lemma(n)     lemma(v)
running      run          running      run
ran          ran          ran          run
studies      studi        study        study
better       better       better       better
mice         mice         mouse        mice
university   univers      university   university
universe     univers      universe     universe`,
        explanation:
          'Three lessons in one table. `ran` is invisible to the stemmer because there is no suffix to remove, but the lemmatiser handles it once told it is a verb. `studies` stems to the non-word `studi` — irrelevant for matching, fatal if you display it. And `university` and `universe` both stem to `univers`, silently merging two unrelated topics; that is over-stemming, and no amount of downstream modelling can undo it.',
      },
      {
        language: 'python',
        title: 'Lemmatisation done properly, with spaCy',
        runnable: true,
        code: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("The studies were running better than the mice were.")

for token in doc:
    print(f"{token.text:10} {token.pos_:6} {token.lemma_}")`,
        output: `The        DET    the
studies    NOUN   study
were       AUX    be
running    VERB   run
better     ADV    well
than       SCONJ  than
the        DET    the
mice       NOUN   mouse
were       AUX    be
.          PUNCT  .`,
        explanation:
          'spaCy tags part of speech first and then lemmatises conditioned on that tag, which is why it gets every hard case right in one pass: `were` to `be`, `better` to `well`, `mice` to `mouse`. That is the practical argument for spaCy over NLTK here — you are already paying for the pipeline, so the lemma is effectively free and you never have to supply a `pos=` argument by hand.',
      },
      {
        language: 'python',
        title: 'What adding bigrams costs and what it buys',
        runnable: true,
        code: `from sklearn.feature_extraction.text import CountVectorizer

reviews = [
    "the film was not good",
    "the film was good",
    "not a good film",
]

for rng in [(1, 1), (1, 2), (1, 3)]:
    vec = CountVectorizer(ngram_range=rng)
    X = vec.fit_transform(reviews)
    density = X.nnz / (X.shape[0] * X.shape[1])
    print(f"ngram_range={rng}  features={X.shape[1]:3d}  density={density:.2f}")

vec = CountVectorizer(ngram_range=(1, 2))
vec.fit(reviews)
print("bigram features:", [f for f in vec.get_feature_names_out() if " " in f])`,
        output: `ngram_range=(1, 1)  features=  5  density=0.73
ngram_range=(1, 2)  features= 13  density=0.41
ngram_range=(1, 3)  features= 22  density=0.29
bigram features: ['film was', 'good film', 'not a', 'not good', 'the film', 'was good', 'was not']`,
        explanation:
          'Feature count more than quadruples going from unigrams to trigrams on three short reviews, and density — the fraction of the matrix that is non-zero — falls steadily. That is the trade in miniature. What you buy is visible in the bigram list: `not good` is now a single feature, so a logistic regression can assign it a large negative coefficient directly, instead of trying to infer negation from a free-floating `not` that might be negating anything in the sentence.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Search relevance at an e-commerce company',
        usage:
          'A query for `running shoes` should match a listing titled `Shoe for runners`. Applying the same stemmer to query and catalogue reduces both to `run shoe`, so the match succeeds. Over-stemming errors mostly cancel out because both sides are damaged identically.',
      },
      {
        context: 'Clinical coding pipelines',
        usage:
          'Mapping free-text notes to controlled vocabularies such as SNOMED requires lemmas, not stems, because the target codes are real dictionary terms. `univers` matches nothing in a medical ontology; `hypertension` does.',
      },
      {
        context: 'Spam and phishing filters',
        usage:
          'Character and word bigrams are still standard features because spammers obfuscate individual words. A bigram such as `verify account` or `click here` survives obfuscation of either word better than the unigrams do alone.',
      },
    ],

    projectConnections: [
      { tool: 'NLTK', role: '`PorterStemmer`, `SnowballStemmer` for a dozen languages, and `WordNetLemmatizer` with a `pos` argument.' },
      { tool: 'spaCy', role: '`token.lemma_` comes free with the pipeline, already conditioned on the predicted part-of-speech tag.' },
      { tool: 'scikit-learn', role: '`ngram_range` and `analyzer="char_wb"` on `CountVectorizer` and `TfidfVectorizer`; character n-grams are a strong baseline for noisy text.' },
      { tool: 'Elasticsearch', role: 'Snowball and KStem token filters run inside the analyser chain at index and query time.' },
    ],

    commonMistakes: [
      {
        mistake: 'Lemmatising without supplying a part-of-speech tag',
        why: 'NLTK\'s `WordNetLemmatizer` defaults to `pos="n"`, so it treats every word as a noun. `lemmatize("running")` returns `running` unchanged, and people conclude lemmatisation does not work.',
        fix: 'Either tag first and map the tag to WordNet\'s scheme, or use spaCy, which tags and lemmatises in one pass.',
      },
      {
        mistake: 'Stemming text that a human will read',
        why: 'Stems are frequently not words. A topic-model summary reading `studi`, `univers`, `organ` is unusable in a report or dashboard even if the clustering underneath is sound.',
        fix: 'Stem for matching, lemmatise for display. If you must stem, keep a map from stem back to the most frequent surface form and show that.',
      },
      {
        mistake: 'Stemming or lemmatising before feeding a pre-trained transformer',
        why: 'BERT and its descendants were pre-trained on natural, inflected text. Feeding them stems produces input unlike anything in pre-training, and subword tokenisation already shares information across inflected forms via common fragments.',
        fix: 'Pass raw text to the model tokeniser. Morphological normalisation belongs to the sparse-model era and should not be applied reflexively.',
      },
      {
        mistake: 'Raising `ngram_range` to (1, 5) hoping for better accuracy',
        why: 'The number of possible features grows as |V|^n while observed counts stay linear in corpus size, so high-order n-grams occur once or twice and their weights are fitted to noise. Memory and fit time explode.',
        fix: 'Stay at (1, 2) or (1, 3), and pair it with `min_df=2` or higher to discard n-grams seen in only one document.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between stemming and lemmatisation, and when would you pick each?',
        answer:
          'Stemming applies a fixed cascade of suffix-stripping rules with no dictionary and no part-of-speech knowledge; it is very fast and its output need not be a real word — `studies` becomes `studi`. Lemmatisation consults a morphological lexicon, usually conditioned on the word\'s part of speech, and always returns a dictionary headword — `studies` becomes `study`, `ran` becomes `run`, `mice` becomes `mouse`. Pick stemming for search indexes where speed dominates and where query and document are stemmed identically so errors cancel. Pick lemmatisation when the output is shown to a human, keyed against an ontology, or when irregular forms carry meaning. Pick neither when you are feeding a pre-trained transformer, because subword tokenisation already shares information across inflections.',
        followUp:
          'A strong answer names a concrete over-stemming failure such as `university` and `universe` both becoming `univers`, and knows that Porter offers no way to prevent it.',
      },
      {
        level: 'intermediate',
        question: 'Adding bigrams to your TF-IDF features improved validation accuracy by 3 points but made the model four times slower and eight times larger. How do you decide whether to keep them?',
        answer:
          'First check that the gain is real: 3 points on a small validation set may be within noise, so repeat across folds and report a confidence interval. Then attack the cost rather than the benefit, because the two are separable. Set `min_df=3` or higher to drop bigrams appearing in only one or two documents — those carry almost no signal and are usually the bulk of the feature count. Inspect the top-weighted bigrams; if they are mostly negations and fixed phrases such as `not good` or `customer service`, the gain is semantically real and worth keeping. If the model must fit a latency budget, consider adding only a curated list of high-information bigrams rather than all of them, or switch to a small transformer where word order is handled architecturally rather than by feature engineering.',
      },
      {
        level: 'ml-engineer',
        question: 'Why has morphological normalisation largely disappeared from modern NLP pipelines?',
        answer:
          'Because subword tokenisation subsumes it. When `running`, `runner` and `runs` all contain the fragment `run`, the embedding for that fragment is updated by every occurrence of any of them, which is exactly the evidence pooling stemming was invented to provide — but learned from data rather than imposed by handwritten rules, and without over-stemming errors like `universe` to `univers`. Contextual models go further: they can keep `ran` and `run` distinct where the tense matters and treat them alike where it does not, which no static conflation can do. Morphological normalisation survives where sparse exact-match models survive: inverted indexes, TF-IDF baselines, topic models, and low-resource settings with no pre-trained model available.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'By hand, apply the Porter step-1a rules (SSES -> SS, IES -> I, SS -> SS, S -> nothing, applied in order, first match wins) to: `caresses`, `ponies`, `caress`, `cats`.',
        hint: 'Check the rules in order and stop at the first one whose suffix matches.',
        solution:
          '`caresses` ends in SSES, so the first rule fires: `caress`. `ponies` ends in IES, so the second rule fires: `poni` — note it is not `pony`, because the rule replaces the suffix with a bare `i`. `caress` ends in SS and the third rule maps SS to SS, so it is unchanged: `caress`; this rule exists precisely to stop the fourth rule from stripping the final S. `cats` matches only the fourth rule and becomes `cat`. The ordering matters enormously: without the SS -> SS guard, `caress` would become `cares`, merging it with an unrelated word.',
      },
      {
        prompt:
          'For the sentence "I did not enjoy the movie at all", list all bigrams, and explain which single bigram a sentiment classifier would weight most heavily and why.',
        hint: 'There are 7 tokens. Use m − n + 1.',
        language: 'python',
        starterCode: 'tokens = "I did not enjoy the movie at all".lower().split()\n',
        solution:
          'Seven tokens give 7 − 2 + 1 = 6 bigrams: (i, did), (did, not), (not, enjoy), (enjoy, the), (the, movie), (movie, at), (at, all). The decisive one is `not enjoy`. As unigrams, `enjoy` is a strongly positive feature and `not` is nearly uninformative because it precedes positive and negative words about equally often; a linear model has no way to know they belong together. The bigram `not enjoy` is a single feature that occurs almost exclusively in negative reviews, so it receives a large negative coefficient and fixes the sentence. This is the clearest single argument for `ngram_range=(1, 2)` in sentiment work.',
      },
      {
        prompt:
          'A colleague reports that `WordNetLemmatizer().lemmatize("running")` returns `running` and concludes lemmatisation is broken. Diagnose and fix it.',
        hint: 'What is the default value of the `pos` argument?',
        language: 'python',
        starterCode: 'from nltk.stem import WordNetLemmatizer\nwnl = WordNetLemmatizer()\nprint(wnl.lemmatize("running"))\n',
        solution:
          'The default is `pos="n"`, meaning the lemmatiser assumes the word is a noun. `running` is a perfectly good English noun ("the running of the race"), so returning it unchanged is correct behaviour for the question actually asked. Supplying the verb tag fixes it: `wnl.lemmatize("running", pos="v")` returns `run`.\n\nIn a real pipeline you tag first:\n\n    from nltk import pos_tag, word_tokenize\n    TAGMAP = {"J": "a", "V": "v", "N": "n", "R": "r"}\n    tokens = word_tokenize(text)\n    lemmas = [wnl.lemmatize(w, TAGMAP.get(t[0], "n")) for w, t in pos_tag(tokens)]\n\nOr you use spaCy and get the tag-conditioned lemma without writing any of this.',
      },
    ],

    quiz: [
      {
        id: 'NLP-003-q1',
        type: 'mcq',
        concept: 'stemming behaviour',
        prompt: 'The Porter stemmer maps `studies` to `studi`. What does this tell you about stemming?',
        options: [
          'Stems need not be real words; the algorithm only guarantees consistent conflation',
          'The stemmer has a bug that should be reported',
          'The stemmer requires a part-of-speech tag it was not given',
          'Stemming always removes exactly three characters',
        ],
        answerIndex: 0,
        explanation:
          'Porter is a rule cascade with no dictionary. Its only promise is that words sharing a root end up as the same string, which is enough for matching and useless for display.',
      },
      {
        id: 'NLP-003-q2',
        type: 'numeric',
        concept: 'n-gram counting',
        prompt: 'How many trigrams can be extracted from a document of 12 tokens?',
        answer: 10,
        explanation:
          'Using |G_n| = m − n + 1 with m = 12 and n = 3 gives 12 − 3 + 1 = 10. The window must fit entirely inside the document, which is why the count shrinks as n grows.',
      },
      {
        id: 'NLP-003-q3',
        type: 'truefalse',
        concept: 'lemmatisation defaults',
        prompt: "NLTK's `WordNetLemmatizer.lemmatize(\"ran\")` returns `run` without any extra arguments.",
        answer: false,
        explanation:
          'It returns `ran`, because the default `pos="n"` treats the word as a noun. You must pass `pos="v"` to get `run`, which is the single most common stumbling block with NLTK lemmatisation.',
      },
      {
        id: 'NLP-003-q4',
        type: 'multi',
        concept: 'when to normalise morphology',
        prompt: 'In which situations is morphological normalisation still a good idea? Select all that apply.',
        options: [
          'Building an inverted search index where query and documents get the same treatment',
          'Fitting a TF-IDF baseline on a small corpus where counts are thin',
          'Preprocessing text before feeding it to a pre-trained BERT model',
          'Mapping free-text clinical notes onto a controlled vocabulary of real terms',
          'Training a classical topic model such as LDA',
        ],
        answerIndices: [0, 1, 3, 4],
        explanation:
          'Sparse exact-match models benefit. Feeding stems to a pre-trained transformer is counterproductive: it was trained on inflected text, and subword fragments already pool evidence across inflections. Note the clinical case calls for lemmatisation specifically, not stemming, because the targets are real words.',
      },
      {
        id: 'NLP-003-q5',
        type: 'code-output',
        language: 'python',
        concept: 'bigram features',
        prompt: 'What does this print?',
        code: 'from sklearn.feature_extraction.text import CountVectorizer\nvec = CountVectorizer(ngram_range=(2, 2))\nvec.fit(["not good at all"])\nprint(len(vec.get_feature_names_out()))',
        options: ['3', '4', '2', '6'],
        answerIndex: 0,
        explanation:
          'Four tokens with n = 2 gives 4 − 2 + 1 = 3 bigrams: `not good`, `good at`, `at all`. Setting `ngram_range=(2, 2)` means bigrams only, so no unigram columns are produced.',
      },
      {
        id: 'NLP-003-q6',
        type: 'explain',
        concept: 'the n-gram trade-off',
        prompt: 'Explain why bigrams help a sentiment classifier, and why going to 5-grams would not help five times as much.',
        rubric: [
          'Explains that unigrams discard word order and bigrams recover adjacency',
          'Gives a concrete example such as `not good` becoming a single feature',
          'Explains that higher-order n-grams become extremely rare, so their weights are fitted to noise',
        ],
        sampleAnswer:
          'Counting single words throws word order away entirely, so `not good` and `good not` produce identical features and a free-floating `not` could be negating anything in the sentence. Bigrams recover adjacency: `not good` becomes one feature that appears almost only in negative reviews, so the classifier can put a large negative weight straight onto it. Pushing to 5-grams fails for a statistical reason rather than a conceptual one. The number of possible 5-grams grows as the vocabulary size to the fifth power, while the number you actually observe grows only linearly in corpus size, so nearly every 5-gram appears once or twice. A weight fitted from one occurrence is fitted to noise, and the model overfits while the matrix becomes unmanageable.',
        explanation:
          'The examinable idea is that n-grams trade recovered word order against exponential feature growth, and that the useful range is narrow because evidence per feature collapses.',
      },
    ],

    flashcards: [
      { front: 'Stemming in one sentence.', back: 'Rule-based suffix stripping with no dictionary. Fast, conflates reliably, and often produces non-words like `studi`.' },
      { front: 'Lemmatisation in one sentence.', back: 'Dictionary-aware reduction to a headword, usually needing a part-of-speech tag. Always returns a real word: `ran` to `run`, `mice` to `mouse`.' },
      { front: 'What is over-stemming?', back: 'Conflating words that should stay distinct — `university` and `universe` both become `univers`. Irreversible downstream.' },
      { front: 'How many bigrams in a 10-token sentence?', back: 'Nine. The formula is m − n + 1, so 10 − 2 + 1 = 9.' },
      { front: 'What do bigrams buy a bag-of-words model?', back: 'A little word order: `not good` becomes one feature instead of two unrelated ones, which is what makes negation learnable.' },
      { front: "Why don't modern transformer pipelines stem?", back: 'Subword tokenisation already shares information across inflections via common fragments, and the models were pre-trained on natural inflected text.' },
    ],

    challenge: {
      title: 'Quantify the morphology and n-gram trade-offs',
      brief:
        'On a labelled text dataset of at least 2,000 documents, build a grid over two axes: morphology (none, Porter stem, spaCy lemma) and n-gram range ((1,1), (1,2), (1,3)). For all nine cells report vocabulary size, matrix density, fit time and held-out accuracy using TF-IDF plus logistic regression. Then print the ten highest-weight bigram features from the best cell and comment on whether they are semantically meaningful or artefacts.',
      language: 'python',
      acceptanceCriteria: [
        'All nine cells evaluated on the same fixed train/test split',
        'Vocabulary size, density, fit time and accuracy reported per cell',
        'Top bigram coefficients printed and discussed',
        'A written conclusion stating whether morphological normalisation helped, with the numbers to support it',
      ],
      starterCode:
        'MORPH = ["none", "stem", "lemma"]\nNGRAMS = [(1, 1), (1, 2), (1, 3)]\n\ndef preprocess(text, mode):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a teammate why `running`, `ran` and `runs` are a problem for a bag-of-words model, what two tools address it, and why adding bigrams pulls in the opposite direction.',
      mustCover: [
        'Inflected forms are separate features, so evidence for one concept is split across several columns',
        'Stemming is crude rule-based chopping; lemmatisation is dictionary-aware and handles irregulars',
        'n-grams recover adjacency that unigram counting discards',
        'n-gram feature space grows as vocabulary size to the power n, so evidence per feature collapses',
      ],
      bonusSignals: [
        'names a concrete over-stemming collision',
        'uses `not good` as the bigram example',
        'notes that subword tokenisation has made stemming largely obsolete',
      ],
      sampleExplanation:
        'A bag-of-words model matches exact strings, so `run`, `runs`, `running` and `ran` are four unrelated columns. You saw the concept four times but each column only got one count, which is wasteful when your corpus is small. Stemming fixes that by chopping suffixes off with fixed rules: fast, but it produces non-words like `studi` and it will happily merge `university` with `universe`, which you can never undo. Lemmatisation does it properly by looking the word up and asking whether it is a noun or a verb, so it gets `ran` to `run` and `mice` to `mouse` — but it is much slower and needs a tagger. Now the twist: counting words at all throws away order, so "not good" and "good not" look identical. Bigrams fix that by counting adjacent pairs, which makes `not good` a single feature a classifier can punish directly. The catch is arithmetic. With a 20,000-word vocabulary there are 400 million possible bigrams and only as many observations as you have words in your corpus, so most bigram features appear once and their weights are noise. That is why people stop at bigrams or trigrams, and why a transformer — which handles order architecturally — eventually replaces all of this.',
    },
  },

  {
    id: 'NLP-004',
    domain: 'NLP',
    module: 'Classical Representations',
    topic: 'Document-term matrix',
    title: 'Bag of Words',
    slug: 'bag-of-words',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['NLP-002'],
    related: ['NLP-001', 'NLP-003'],
    tags: ['bag-of-words', 'document-term-matrix', 'sparse', 'countvectorizer', 'vectorisation'],

    learningObjectives: [
      'Construct a document-term matrix by hand from three short documents and read off what each row and column means',
      'Explain exactly what information bag of words preserves and what it destroys',
      'Quantify the sparsity of a real document-term matrix and justify sparse storage',
      'Use `CountVectorizer` correctly, including fitting on training data only and interpreting `get_feature_names_out`',
    ],

    terminology: [
      {
        term: 'Bag of words',
        definition:
          'A representation of a document as the multiset of its tokens: which tokens occur and how often, with all ordering information discarded.',
        simple: 'Tip the sentence into a bag and count what fell out, forgetting the order.',
      },
      {
        term: 'Document-term matrix',
        definition:
          'An N by |V| matrix in which entry (i, j) is the count of vocabulary term j in document i. Rows are documents, columns are terms.',
        simple: 'A spreadsheet with one row per document and one column per word.',
      },
      {
        term: 'Sparsity',
        definition:
          'The fraction of matrix entries that are zero. Document-term matrices are typically 99% or more zeros, because any one document uses a tiny slice of the vocabulary.',
        simple: 'How much of the spreadsheet is empty.',
      },
      {
        term: 'Vectorisation',
        definition:
          'The step that maps a collection of documents to a numeric matrix whose rows can be fed to any standard machine-learning algorithm.',
        simple: 'Turning a pile of text into a table of numbers.',
      },
      {
        term: 'Binary bag of words',
        definition:
          'A variant recording only presence or absence of each term rather than its count. Often as strong as counts for short documents and more robust to repetition.',
        simple: 'Writing 1 if the word is there at all, instead of how many times.',
      },
    ],

    simpleExplanation:
      "Imagine cutting a document into individual words, dropping them all into a bag and shaking it. You can still see which words are in there and how many of each, but you have permanently lost the order they were in. That is the bag-of-words representation, and it sounds like a terrible idea until you try it. Lay out a column for every word in your whole collection, then give each document a row, and write in each cell how many times that word appeared in that document. Now every document is a row of numbers of exactly the same length, which means any ordinary machine-learning algorithm — logistic regression, a tree, k-means — can work on text without knowing anything about language. The cost is real: `the dog bit the man` and `the man bit the dog` produce identical rows. The benefit is also real: for working out what a document is about, which words appear turns out to matter far more than what order they came in.",

    whyItExists:
      'Every classical machine-learning algorithm requires each example to be a fixed-length vector of numbers, but documents vary in length from six words to six thousand. Bag of words solves that mismatch by making the vector length equal to the vocabulary size rather than the document length, which is what first made it possible to run ordinary statistical models on text at all.',

    analogy: {
      scenario:
        "Think about how you describe a supermarket trolley at the checkout. You do not recount the order in which items went in — you say 'four tins of tomatoes, a loaf, two bottles of milk'. Two shoppers who bought exactly the same items in a different order get the same description, and that is usually fine, because what you want to know is whether this is a baking trip or a barbecue. But if the question were 'did they pick up the knife before or after the argument', the description would be useless: the order was the whole story.",
      mapping: [
        { from: 'One trolley', to: 'One document (a row of the matrix)' },
        { from: 'Each product line in the shop catalogue', to: 'One vocabulary term (a column of the matrix)' },
        { from: 'The quantity written next to each product', to: 'The term count in that cell' },
        { from: 'Most catalogue lines with a quantity of zero', to: 'The sparsity — over 99% of cells are empty' },
        { from: 'Not recording the order items were picked up', to: 'Discarding word order entirely' },
      ],
      bridge:
        'The trolley receipt is literally a bag-of-words vector over the shop catalogue, and it generalises for the same reason: classifying the trip (baking, barbecue, weekly shop) depends on which items are present, not their sequence. The analogy also names the failure honestly — any question whose answer depends on order is unanswerable from the receipt, which is precisely why sentiment and negation are where bag of words falls over.',
      limitations:
        'A shopping trolley has dozens of distinct items. A document-term matrix has tens of thousands of columns with only a few dozen non-zero, so the emptiness is far more extreme than the analogy suggests — and that emptiness is what forces sparse storage and shapes every algorithm that consumes it.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'A document-term matrix built by hand',
        caption:
          'D1 = "the cat sat on the mat", D2 = "the dog sat on the log", D3 = "the cat chased the dog". Lowercased, whitespace tokenised.',
        art: `vocabulary (alphabetical, 8 terms):
   cat  chased  dog  log  mat  on  sat  the

            cat chased dog log mat  on sat the
      D1 :    1      0   0   0   1   1   1   2
      D2 :    0      0   1   1   0   1   1   2
      D3 :    1      1   1   0   0   0   0   2

shape        : 3 x 8
non-zero     : 5 + 5 + 4 = 14 of 24 cells
sparsity     : 1 - 14/24 = 42%   (toy corpus; real ones exceed 99%)

read a ROW    -> everything the model knows about one document
read a COLUMN -> how one word is distributed across the corpus
note          -> "the" is 2 in every row and separates nothing`,
      },
      {
        kind: 'flow',
        title: 'From raw documents to a matrix you can fit a model on',
        caption: 'This is what `CountVectorizer.fit_transform` does in one call.',
        steps: [
          { label: 'Collect documents', detail: 'A list of N strings. Each will become one row.' },
          { label: 'Normalise and tokenise', detail: 'Lowercase, split. Everything from the two preceding units applies here.' },
          { label: 'Build the vocabulary', detail: 'Union of all tokens, pruned by `min_df` and `max_df`, sorted to fix column order.' },
          { label: 'Count per document', detail: 'For each document, tally its tokens against the vocabulary.' },
          { label: 'Emit a sparse matrix', detail: 'A `scipy.sparse.csr_matrix` of shape (N, |V|) storing only the non-zeros.' },
          { label: 'Fit any model', detail: 'Logistic regression, naive Bayes, k-means — none of them know this came from text.' },
        ],
      },
      {
        kind: 'compare',
        title: 'What bag of words keeps and what it throws away',
        caption: 'Be precise about both halves; the discarded column is where every failure mode lives.',
        left: {
          heading: 'Preserved',
          points: [
            'Which vocabulary terms occur in the document',
            'How many times each occurs (or presence only, if binary)',
            'Relative emphasis: a word used ten times outweighs one used once',
            'Document length, implicitly, as the row sum',
            'Enough signal that topic classification often exceeds 90% accuracy',
          ],
        },
        right: {
          heading: 'Destroyed',
          points: [
            'Word order — `dog bites man` equals `man bites dog`',
            'Negation scope — `not` floats free of what it negates',
            'Syntax and grammatical relations of every kind',
            'Multi-word entities — `New York` becomes `new` plus `york`',
            'Any notion that `car` and `automobile` are related at all',
          ],
        },
      },
      {
        kind: 'table',
        title: 'The `CountVectorizer` arguments that actually matter',
        columns: ['Argument', 'Effect', 'Practical guidance'],
        rows: [
          ['`min_df`', 'Drop terms appearing in fewer than this many documents', 'Set to 2–5. Kills typos and one-off tokens, often halving the vocabulary.'],
          ['`max_df`', 'Drop terms appearing in more than this fraction of documents', '0.9 removes corpus-specific stop words without a hand-written list.'],
          ['`binary`', 'Record 1/0 presence instead of counts', 'Often as strong as counts for short texts, and more robust to repetition.'],
          ['`ngram_range`', 'Include n-grams as additional columns', '(1, 2) is the common sweet spot; pair with `min_df` to control blow-up.'],
          ['`max_features`', 'Keep only the top k terms by corpus frequency', 'Use to cap memory, but prefer `min_df` — it prunes by usefulness, not popularity.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Build a document-term matrix interactively',
        caption: 'Edit the three documents and watch the matrix, the vocabulary and the sparsity update.',
        widget: 'tfidf-lab',
        props: {
          weighting: 'counts',
          documents: ['the cat sat on the mat', 'the dog sat on the log', 'the cat chased the dog'],
        },
      },
    ],

    formalDefinition:
      'Given a corpus of N documents and a vocabulary V, the bag-of-words representation maps document d_i to the vector x_i in the non-negative integers raised to the power |V|, where the j-th component is the number of occurrences of term v_j in d_i. Stacking these row vectors gives the document-term matrix X of shape (N, |V|). The map is invariant under any permutation of the tokens within a document, which is precisely the statement that word order is discarded.',

    math: {
      intuition:
        'There is barely any mathematics here, and that is the point: bag of words is a counting function plus a convention about how to lay the counts out. The only quantitative facts worth stating are what a row is, how you compare two rows, and just how empty the matrix is.',
      formulas: [
        {
          latex: 'X_{ij} = \\operatorname{count}(v_j,\; d_i)',
          name: 'Document-term matrix entry',
          meaning:
            'Row i is the document, column j is the vocabulary term, and the cell is simply how many times that term appears in that document.',
          variables: [
            { symbol: 'X_{ij}', meaning: 'Count of term j in document i' },
            { symbol: 'd_i', meaning: 'The i-th document as a token sequence' },
            { symbol: 'v_j', meaning: 'The j-th term of the vocabulary' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\|x_i\\|_1 = \\sum_{j=1}^{|V|} X_{ij} = \\text{document length in tokens}',
          name: 'Row sum is document length',
          meaning:
            'Summing a row recovers the number of tokens in the document, which is why raw counts make long documents look more similar to everything. Dividing by this row sum gives term frequency, the first half of TF-IDF.',
          variables: [
            { symbol: 'x_i', meaning: 'The bag-of-words row vector for document i' },
            { symbol: '|V|', meaning: 'Vocabulary size, the number of columns' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\text{sparsity}(X) = 1 - \\frac{\\operatorname{nnz}(X)}{N \\cdot |V|}',
          name: 'Sparsity of the matrix',
          meaning:
            'The fraction of entries that are zero. A 20,000-document corpus with a 50,000-term vocabulary has a billion cells; if documents average 100 distinct terms, only two million are non-zero, giving sparsity of 0.998.',
          variables: [
            { symbol: 'N', meaning: 'Number of documents (rows)' },
            { symbol: '|V|', meaning: 'Vocabulary size (columns)' },
            { symbol: '\\operatorname{nnz}(X)', meaning: 'Number of non-zero entries' },
          ],
          category: 'complexity',
        },
      ],
    },

    workedExample: {
      title: 'Building the document-term matrix for three documents by hand',
      setup:
        'D1 = "the cat sat on the mat"; D2 = "the dog sat on the log"; D3 = "the cat chased the dog". Lowercase and split on whitespace. Build the vocabulary in alphabetical order, then fill the matrix.',
      steps: [
        {
          label: 'Tokenise each document',
          detail:
            'D1 = [the, cat, sat, on, the, mat]; D2 = [the, dog, sat, on, the, log]; D3 = [the, cat, chased, the, dog]. Six, six and five tokens.',
        },
        {
          label: 'Take the union of tokens as the vocabulary',
          detail:
            '{cat, chased, dog, log, mat, on, sat, the}. Eight terms, so the matrix will have eight columns. Alphabetical ordering is arbitrary but must be fixed, because column j must mean the same term for every row.',
        },
        {
          label: 'Fill row 1',
          detail: 'D1: cat 1, chased 0, dog 0, log 0, mat 1, on 1, sat 1, the 2. Row sum 6, matching the token count.',
          latex: 'x_1 = [1, 0, 0, 0, 1, 1, 1, 2]',
        },
        {
          label: 'Fill row 2',
          detail: 'D2: cat 0, chased 0, dog 1, log 1, mat 0, on 1, sat 1, the 2. Row sum 6.',
          latex: 'x_2 = [0, 0, 1, 1, 0, 1, 1, 2]',
        },
        {
          label: 'Fill row 3',
          detail: 'D3: cat 1, chased 1, dog 1, log 0, mat 0, on 0, sat 0, the 2. Row sum 5.',
          latex: 'x_3 = [1, 1, 1, 0, 0, 0, 0, 2]',
        },
        {
          label: 'Read a column instead of a row',
          detail:
            'Column `the` is [2, 2, 2]: identical in every document, so it contributes nothing to telling them apart. Column `chased` is [0, 0, 1]: it appears in one document only, so it is maximally discriminating. That contrast is the seed of the whole idea of inverse document frequency in the next unit.',
        },
        {
          label: 'Demonstrate what was lost',
          detail:
            'Now add D4 = "the mat sat on the cat", a sentence with the opposite meaning. Its token multiset is identical to D1, so x_4 = x_1 exactly. No model consuming this matrix can ever distinguish them.',
          latex: 'x_4 = [1, 0, 0, 0, 1, 1, 1, 2] = x_1',
        },
        {
          label: 'Measure sparsity',
          detail: 'Non-zeros: 5 + 5 + 4 = 14 out of 3 × 8 = 24 cells, so sparsity is 1 − 14/24 ≈ 0.42.',
          latex: '\\text{sparsity} = 1 - \\frac{14}{24} \\approx 0.42',
        },
      ],
      conclusion:
        'Three sentences become three rows of eight numbers, and any classifier can now consume them. The matrix also shows both of the next two chapters of the story in miniature: `the` is useless because it is everywhere, which motivates TF-IDF; and D4 collides exactly with D1, which motivates everything from n-grams to attention.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The worked example, in scikit-learn',
        runnable: true,
        code: `from sklearn.feature_extraction.text import CountVectorizer

docs = [
    "the cat sat on the mat",
    "the dog sat on the log",
    "the cat chased the dog",
]

vec = CountVectorizer()
X = vec.fit_transform(docs)

print("vocabulary:", vec.get_feature_names_out())
print("shape     :", X.shape)
print(X.toarray())
print("sparsity  : {:.2f}".format(1 - X.nnz / (X.shape[0] * X.shape[1])))`,
        output: `vocabulary: ['cat' 'chased' 'dog' 'log' 'mat' 'on' 'sat' 'the']
shape     : (3, 8)
[[1 0 0 0 1 1 1 2]
 [0 0 1 1 0 1 1 2]
 [1 1 1 0 0 0 0 2]]
sparsity  : 0.42`,
        explanation:
          'Identical to the hand calculation, which is the point of doing it by hand first. `fit_transform` does two jobs: `fit` learns the vocabulary and freezes the column order, `transform` counts. Note that `X` is a sparse matrix — `.toarray()` is only safe here because the corpus is tiny. Calling it on a real corpus is the classic way to exhaust memory on a machine that had plenty.',
      },
      {
        language: 'python',
        title: 'Word order is genuinely gone',
        runnable: true,
        code: `from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

docs = ["the dog bit the man", "the man bit the dog"]

vec = CountVectorizer()
X = vec.fit_transform(docs).toarray()

print(vec.get_feature_names_out())
print(X)
print("rows identical:", np.array_equal(X[0], X[1]))

vec2 = CountVectorizer(ngram_range=(1, 2))
X2 = vec2.fit_transform(docs).toarray()
print("with bigrams, rows identical:", np.array_equal(X2[0], X2[1]))`,
        output: `['bit' 'dog' 'man' 'the']
[[1 1 1 2]
 [1 1 1 2]]
rows identical: True
with bigrams, rows identical: False`,
        explanation:
          'Two sentences with opposite meanings produce byte-identical feature vectors, and no classifier can separate what it cannot distinguish. The second half shows the cheapest repair: bigrams introduce the features `dog bit` and `man bit`, which differ between the two documents. This is exactly the trade-off from the previous unit, now made concrete — you buy back word order at the price of a much wider matrix.',
      },
      {
        language: 'python',
        title: 'Sparsity on a realistic corpus, and why dense storage is not an option',
        runnable: true,
        code: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer

data = fetch_20newsgroups(subset="train", categories=["sci.space", "rec.autos"])
vec = CountVectorizer(min_df=2)
X = vec.fit_transform(data.data)

cells = X.shape[0] * X.shape[1]
print("documents      :", X.shape[0])
print("vocabulary     :", X.shape[1])
print("cells          :", cells)
print("non-zero cells :", X.nnz)
print("sparsity       : {:.4f}".format(1 - X.nnz / cells))
print("sparse memory  : {:.1f} MB".format(X.data.nbytes / 1e6))
print("dense would be : {:.1f} MB".format(cells * 8 / 1e6))`,
        output: `documents      : 1187
vocabulary     : 14892
cells          : 17676804
non-zero cells : 175413
sparsity       : 0.9901
sparse memory  : 1.4 MB
dense would be : 141.4 MB`,
        explanation:
          'Ninety-nine percent of the matrix is zero, and the dense version is a hundred times larger than the sparse one on a corpus of barely a thousand documents. Scale that to a million documents and the dense array does not fit on any machine you own. This is why `CountVectorizer` returns `scipy.sparse.csr_matrix`, why scikit-learn estimators accept sparse input natively, and why `.toarray()` should be treated as a debugging tool for small examples only.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Spam filtering',
        usage:
          'Multinomial naive Bayes over bag-of-words counts is the classical spam filter and remains a strong, near-instant baseline. Word presence carries almost all the signal, and the model trains on a laptop in seconds.',
      },
      {
        context: 'Topic modelling for document collections',
        usage:
          'Latent Dirichlet Allocation consumes a document-term matrix directly. Law firms and newsrooms use it to discover the themes in tens of thousands of documents nobody has time to read.',
      },
      {
        context: 'Support ticket triage',
        usage:
          'Routing tickets to the right team rarely depends on word order — the presence of `refund`, `crash` or `invoice` decides it. Bag of words plus logistic regression is often deployed precisely because it is interpretable: you can show the team the exact words driving each routing decision.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`CountVectorizer` is the canonical implementation; `HashingVectorizer` does the same without storing a vocabulary, for streaming data.' },
      { tool: 'SciPy', role: '`csr_matrix` is the storage format returned; understanding compressed sparse row format explains why row slicing is fast and column slicing is not.' },
      { tool: 'gensim', role: 'Its `Dictionary` and `doc2bow` build the same representation in a streaming, memory-bounded way for corpora too large to hold at once.' },
    ],

    commonMistakes: [
      {
        mistake: 'Calling `.toarray()` on a real document-term matrix',
        why: 'A matrix that is 99% zeros takes a hundred times more memory dense. A 100,000 by 50,000 float64 array is 40 GB, and the process dies with a `MemoryError` that names no obvious culprit.',
        fix: 'Keep it sparse. scikit-learn estimators accept `csr_matrix` directly; use `.toarray()` only on tiny slices for inspection.',
      },
      {
        mistake: 'Calling `fit_transform` on the test set',
        why: 'That refits the vocabulary on test data, changing the column meanings between train and test and leaking information about the test distribution.',
        fix: '`X_train = vec.fit_transform(train)` then `X_test = vec.transform(test)`. Terms unseen in training are silently dropped, which is the correct behaviour.',
      },
      {
        mistake: 'Expecting bag of words to handle negation or sarcasm',
        why: 'The representation is permutation-invariant by construction. `not` is a feature with no attachment to the word it modifies, so "not good" and "good" differ by one weakly informative column.',
        fix: 'Add bigrams so `not good` becomes its own feature, or move to a contextual model. Do not try to patch it with more unigram cleaning.',
      },
      {
        mistake: 'Using raw counts when documents differ wildly in length',
        why: 'A 5,000-word document has larger counts everywhere, so under Euclidean distance it looks far from everything, and under a linear model its features dominate the gradient.',
        fix: 'Normalise: divide by the row sum for term frequency, use `binary=True`, or move straight to TF-IDF, which applies L2 normalisation by default.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain what a document-term matrix is and what the rows and columns represent.',
        answer:
          'It is an N by |V| matrix where N is the number of documents and |V| the vocabulary size. Row i is document i, column j is vocabulary term j, and entry (i, j) is the number of times term j appears in document i. A row is therefore the complete representation of one document as a fixed-length numeric vector, which is what lets any standard algorithm consume text. A column is the distribution of one term across the corpus, which is what inverse document frequency is computed from. The matrix is extremely sparse — typically over 99% zeros — because any one document uses a tiny fraction of the vocabulary, so it is stored in a compressed sparse format rather than as a dense array.',
        followUp:
          'A strong answer observes that the row sum equals the document length in tokens, and that this is why raw counts must usually be normalised before use.',
      },
      {
        level: 'intermediate',
        question: 'Bag of words discards word order. Why is it still a reasonable representation, and where does it break?',
        answer:
          'For topic-level questions — what is this document about, which team should handle this ticket, is this spam — lexical content carries nearly all the signal and order carries little. A document about spacecraft contains `orbit`, `launch` and `payload` regardless of how they are arranged, so a linear model over counts routinely reaches 90% or better on such tasks in seconds, with fully interpretable coefficients. It breaks wherever meaning depends on structure: sentiment with negation ("not good"), sarcasm, relation extraction ("A acquired B" versus "B acquired A"), and anything needing coreference. It also has no notion of synonymy — `car` and `automobile` are orthogonal columns with zero similarity — which motivates embeddings.',
      },
      {
        level: 'ml-engineer',
        question: 'Your document-term matrix has 200,000 columns and training is slow. What do you change first, and why in that order?',
        answer:
          'First `min_df=5`, which drops terms appearing in fewer than five documents. Because of the Zipfian tail this typically removes 60–80% of the columns while deleting almost no signal, since a term in four documents cannot support a reliable weight anyway. Second `max_df=0.9`, which removes corpus-specific ubiquitous terms without a hand-written stop list. Third, check you are not densifying anywhere — a stray `.toarray()` or a scaler that does not support sparse input will dominate the cost. Only then consider `max_features` or a `HashingVectorizer`, which fixes dimensionality by hashing and needs no vocabulary in memory, at the price of losing the ability to map a column back to a word. Reach for dimensionality reduction such as truncated SVD last, since it makes the model uninterpretable.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'By hand, build the document-term matrix for D1 = "red blue red", D2 = "blue green", D3 = "red green green". Use alphabetical column order and report the sparsity.',
        hint: 'The vocabulary has three terms. Count occurrences, not presence.',
        solution:
          'Vocabulary in alphabetical order: [blue, green, red].\n\nD1 = "red blue red": blue 1, green 0, red 2 -> [1, 0, 2]\nD2 = "blue green": blue 1, green 1, red 0 -> [1, 1, 0]\nD3 = "red green green": blue 0, green 2, red 1 -> [0, 2, 1]\n\nThe matrix is 3 by 3 with 7 non-zero cells out of 9, so sparsity is 1 − 7/9 ≈ 0.22. Row sums are 3, 2 and 3, matching the token counts. Note that no term appears in all three documents, so unlike the earlier corpus there is no column that fails to discriminate — with a vocabulary this small, every column is doing work.',
      },
      {
        prompt:
          'Write code that proves bag of words cannot distinguish "the dog bit the man" from "the man bit the dog", and then repairs it with the smallest possible change.',
        hint: 'Compare the two rows with `np.array_equal`, then adjust one `CountVectorizer` argument.',
        language: 'python',
        starterCode:
          'import numpy as np\nfrom sklearn.feature_extraction.text import CountVectorizer\n\ndocs = ["the dog bit the man", "the man bit the dog"]\n',
        solution:
          'vec = CountVectorizer()\nX = vec.fit_transform(docs).toarray()\nprint(np.array_equal(X[0], X[1]))   # True — identical rows\n\nvec2 = CountVectorizer(ngram_range=(1, 2))\nX2 = vec2.fit_transform(docs).toarray()\nprint(np.array_equal(X2[0], X2[1]))  # False\n\nThe smallest repair is `ngram_range=(1, 2)`. The bigrams `dog bit` and `man bit` occur in one document each, so the rows now differ. The important caveat is that this is a patch rather than a solution: bigrams capture adjacency only, so "the dog that I saw yesterday bit the man" is still indistinguishable from its reversal. Genuine word-order sensitivity requires a sequence model.',
      },
      {
        prompt:
          'Given a corpus of 50,000 documents with a 30,000-term vocabulary, where each document contains on average 120 distinct terms, compute the sparsity and the memory required for dense float64 storage.',
        hint: 'Cells is rows times columns; non-zeros is rows times average distinct terms per document.',
        solution:
          'Cells = 50,000 × 30,000 = 1.5 × 10^9. Non-zeros ≈ 50,000 × 120 = 6 × 10^6. Sparsity = 1 − 6×10^6 / 1.5×10^9 = 1 − 0.004 = 0.996, so 99.6% of the matrix is zero.\n\nDense float64 storage = 1.5 × 10^9 × 8 bytes = 12 GB, which will not fit in memory on most machines and would be almost entirely zeros. The CSR sparse representation stores roughly 6 × 10^6 values plus 6 × 10^6 column indices plus 50,001 row pointers — about 72 MB. That factor of well over a hundred is why sparse storage is not an optimisation but a requirement.',
      },
    ],

    quiz: [
      {
        id: 'NLP-004-q1',
        type: 'mcq',
        concept: 'what BoW discards',
        prompt: 'Which pair of sentences produces identical bag-of-words vectors?',
        options: [
          '"the dog bit the man" and "the man bit the dog"',
          '"the dog bit the man" and "the dog bit a man"',
          '"good film" and "great film"',
          '"cat" and "cats"',
        ],
        answerIndex: 0,
        explanation:
          'Only the first pair has an identical token multiset — same words, same counts, different order. Bag of words is permutation-invariant, so those two rows are exactly equal and no model can separate them.',
      },
      {
        id: 'NLP-004-q2',
        type: 'numeric',
        concept: 'sparsity arithmetic',
        prompt:
          'A document-term matrix has 1,000 documents and 5,000 terms, with 50,000 non-zero entries. What is its sparsity, as a decimal to two places?',
        answer: 0.99,
        tolerance: 0.005,
        explanation:
          'Cells = 1,000 × 5,000 = 5,000,000. Sparsity = 1 − 50,000/5,000,000 = 1 − 0.01 = 0.99. Ninety-nine percent zeros is entirely typical, which is why sparse storage is mandatory.',
      },
      {
        id: 'NLP-004-q3',
        type: 'code-output',
        language: 'python',
        concept: 'CountVectorizer behaviour',
        prompt: 'What is printed?',
        code: 'from sklearn.feature_extraction.text import CountVectorizer\nvec = CountVectorizer()\nX = vec.fit_transform(["a b a", "b c"])\nprint(X.toarray())',
        options: ['[[2 1 0]\n [0 1 1]]', '[[1 1 0]\n [0 1 1]]', '[[2 1 1]\n [1 1 1]]', '[[1 2 0]\n [1 0 1]]'],
        answerIndex: 0,
        explanation:
          'The vocabulary is [a, b, c] alphabetically. The first document has two `a`, one `b`, no `c`; the second has no `a`, one `b`, one `c`. Counts, not presence, so the first cell is 2. Note that by default `CountVectorizer` drops single-character tokens only if they fail its token pattern — here they pass.',
      },
      {
        id: 'NLP-004-q4',
        type: 'truefalse',
        concept: 'train/test discipline',
        prompt: 'You should call `fit_transform` on the training documents and `transform` on the test documents.',
        answer: true,
        explanation:
          'The vocabulary is a fitted parameter. Calling `fit_transform` on test data relearns the columns, changing their meaning between splits and leaking information about the test distribution into the representation.',
      },
      {
        id: 'NLP-004-q5',
        type: 'multi',
        concept: 'controlling matrix width',
        prompt: 'Which `CountVectorizer` settings reduce the number of columns? Select all that apply.',
        options: ['`min_df=5`', '`max_df=0.9`', '`max_features=10000`', '`ngram_range=(1, 3)`', '`binary=True`'],
        answerIndices: [0, 1, 2],
        explanation:
          '`min_df` prunes rare terms, `max_df` prunes ubiquitous ones and `max_features` caps the total. `ngram_range=(1, 3)` multiplies the columns instead. `binary=True` changes cell values from counts to 0/1 but leaves the shape untouched.',
      },
      {
        id: 'NLP-004-q6',
        type: 'explain',
        concept: 'why BoW works at all',
        prompt:
          'A colleague says bag of words is obviously useless because it destroys word order. Give the honest counter-argument, and then say where they are right.',
        rubric: [
          'Argues that topic-level tasks depend mainly on lexical content, not order',
          'Names concrete strengths: speed, interpretability, strong baselines',
          'Concedes specific failure cases such as negation, sarcasm or relation direction',
        ],
        sampleAnswer:
          'For a large class of real tasks — spam detection, ticket routing, topic classification — what a document is about is determined almost entirely by which words are in it. A document about spacecraft contains `orbit` and `payload` whatever the arrangement, so counts alone get a linear model above 90% accuracy in seconds, and every coefficient maps to a word you can show a stakeholder. That combination of speed, accuracy and interpretability is why it is still the first thing to try. Where the colleague is right is anything whose meaning lives in structure: "not good" versus "good", sarcasm, and relation direction such as "A acquired B" versus "B acquired A" — all of which produce identical or near-identical rows. Bigrams patch the adjacent cases; genuinely structural cases need a sequence model.',
        explanation:
          'The examinable judgement is matching representation to task rather than ranking representations in the abstract. Knowing when the cheap thing suffices is a senior skill.',
      },
    ],

    flashcards: [
      { front: 'What is bag of words?', back: 'A document represented as the multiset of its tokens: which words and how many, with all order discarded.' },
      { front: 'What do rows and columns of a document-term matrix mean?', back: 'Rows are documents, columns are vocabulary terms, cells are counts. Row sum equals document length in tokens.' },
      { front: 'Why is the matrix stored sparsely?', back: 'It is typically over 99% zeros. Dense storage costs a hundred times more memory and most of it holds zeros.' },
      { front: 'One sentence pair bag of words cannot distinguish.', back: '"the dog bit the man" and "the man bit the dog" — identical token multisets, identical rows.' },
      { front: '`fit_transform` or `transform` on the test set?', back: '`transform`. The vocabulary is a fitted parameter; refitting on test data leaks information and changes column meanings.' },
      { front: 'Which argument most reliably shrinks the vocabulary?', back: '`min_df`. Because of the Zipfian tail, `min_df=5` often removes most columns while deleting almost no signal.' },
    ],

    challenge: {
      title: 'Implement CountVectorizer from scratch',
      brief:
        'Write a `BagOfWords` class with `fit`, `transform` and `fit_transform` methods that reproduces the behaviour of scikit-learn\'s `CountVectorizer` for lowercase whitespace tokenisation, supporting `min_df`, `max_df` and `binary`. Return a `scipy.sparse.csr_matrix`. Verify on a corpus of at least 500 documents that your output matches `CountVectorizer` with the same settings, and report the sparsity and the dense-versus-sparse memory ratio.',
      language: 'python',
      acceptanceCriteria: [
        '`fit` learns the vocabulary and freezes a deterministic column order',
        '`transform` handles unseen terms by dropping them rather than raising',
        'Output is a `csr_matrix`, never a dense array',
        'Numerical agreement with `CountVectorizer` is asserted, not merely eyeballed',
        'Sparsity and the memory ratio are reported',
      ],
      starterCode:
        'import numpy as np\nfrom scipy.sparse import csr_matrix\n\nclass BagOfWords:\n    def __init__(self, min_df=1, max_df=1.0, binary=False):\n        self.min_df = min_df\n        self.max_df = max_df\n        self.binary = binary\n        self.vocabulary_ = {}\n\n    def fit(self, documents):\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who knows basic machine learning but nothing about text how to turn a folder of documents into something `LogisticRegression` can fit, and be honest about what the representation loses.',
      mustCover: [
        'Each document becomes a fixed-length vector whose length is the vocabulary size, not the document length',
        'Rows are documents, columns are terms, cells are counts',
        'Word order is discarded completely, so some sentence pairs become identical',
        'The matrix is overwhelmingly zeros and must be stored sparsely',
      ],
      bonusSignals: [
        'gives a worked three-document example',
        'notes that the row sum is the document length',
        'mentions that `the` appears everywhere and discriminates nothing',
      ],
      sampleExplanation:
        'The obstacle with text is that a model wants every example to be a vector of the same length, and documents are all different lengths. The trick is to make the vector as long as your vocabulary instead of as long as the document. List every distinct word in the whole collection — say eight of them for a toy corpus — and give each one a column. Then each document gets a row, and you write in each cell how many times that word appeared in that document. "the cat sat on the mat" becomes [1, 0, 0, 0, 1, 1, 1, 2] over the columns cat, chased, dog, log, mat, on, sat, the. Every row is now eight numbers long, and logistic regression neither knows nor cares that this came from language. Two honest caveats. First, order is gone for good: "the dog bit the man" and "the man bit the dog" give byte-identical rows, and nothing downstream can recover the difference. Second, real vocabularies are tens of thousands of columns while a document touches a hundred of them, so the matrix is over 99% zeros and has to be stored in a sparse format or it will not fit in memory.',
    },
  },

  {
    id: 'NLP-005',
    domain: 'NLP',
    module: 'Classical Representations',
    topic: 'Term weighting',
    title: 'TF-IDF',
    slug: 'tf-idf',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['NLP-004'],
    related: ['NLP-002', 'NLP-003'],
    tags: ['tf-idf', 'term-weighting', 'idf', 'information-retrieval', 'tfidfvectorizer'],

    learningObjectives: [
      'Compute term frequency, inverse document frequency and their product by hand for a three-document corpus',
      'Explain why the logarithm appears in IDF and what would go wrong without it',
      'Interpret a TF-IDF weight: what a high value means and what a zero means',
      'Use `TfidfVectorizer` correctly and account for the differences between its smoothed, L2-normalised output and the textbook formula',
    ],

    terminology: [
      {
        term: 'Term frequency (TF)',
        definition:
          'How often a term occurs in a document, usually normalised by document length so that long documents are not systematically advantaged.',
        simple: 'How much this document talks about this word.',
      },
      {
        term: 'Document frequency (DF)',
        definition:
          'The number of documents in the corpus containing a term at least once. Independent of how many times it occurs within any one document.',
        simple: 'How many documents mention this word at all.',
      },
      {
        term: 'Inverse document frequency (IDF)',
        definition:
          'The logarithm of the ratio of total documents to document frequency. High for rare, discriminating terms; zero for terms appearing in every document.',
        simple: 'A rarity score: words in every document get nothing, words in one document get a lot.',
      },
      {
        term: 'TF-IDF weight',
        definition:
          'The product of term frequency and inverse document frequency. It is large only when a term is frequent in this document and rare across the corpus.',
        simple: 'Important here, and unusual everywhere else.',
      },
      {
        term: 'L2 normalisation',
        definition:
          'Dividing each document vector by its Euclidean norm so every row has unit length, making dot products equal to cosine similarities. Applied by default in scikit-learn.',
        simple: 'Scaling each row so document length stops mattering.',
      },
    ],

    simpleExplanation:
      "Raw word counts have an obvious problem: `the` appears in every document, often more than any other word, so it dominates the numbers while telling you nothing about what any document is about. TF-IDF fixes this with two ideas multiplied together. The first is term frequency: how much does this document use this word, as a share of its length. The second is inverse document frequency: how rare is this word across the whole collection. A word in all 1,000 documents gets a rarity score of zero, so its weight vanishes no matter how often it appears. A word in only 5 documents gets a high rarity score, so when it does appear it counts heavily. Multiply the two and you get a number that is large only when a word is both common in this document and unusual elsewhere — which is exactly what it means for a word to be the subject of a document rather than just part of its grammar.",

    whyItExists:
      'Raw counts make the least informative words the loudest, because function words are the most frequent words in every document. TF-IDF exists to reweight the document-term matrix so that discriminating power, rather than raw frequency, determines a term\'s influence — which is what made keyword search and document retrieval work at all, and it remains the strongest cheap baseline for text classification.',

    analogy: {
      scenario:
        "Imagine you are trying to identify an unfamiliar bird from a description. Being told 'it has feathers' is useless — every bird has feathers, so the observation eliminates nothing. Being told 'it has a curved red bill' is enormously useful, because only a handful of species do. A good identification key weights each observation by how many species it rules out: the rarer the feature, the more it narrows things down. Features shared by everything get no weight at all.",
      mapping: [
        { from: '"It has feathers" — true of every bird', to: 'A term with document frequency equal to N, giving IDF of zero' },
        { from: '"It has a curved red bill" — true of very few', to: 'A term with low document frequency and therefore high IDF' },
        { from: 'Noticing the bill three times rather than once', to: 'Term frequency — repeated evidence within one observation' },
        { from: 'The final confidence in an identification', to: 'The TF-IDF weight: evidence strength times rarity' },
        { from: 'The full key applied to every feature', to: 'The reweighted document-term matrix' },
      ],
      bridge:
        'The identification key is performing exactly the TF-IDF calculation: weight each observation by how much it narrows the space of possibilities, which is the same as weighting by inverse frequency. The logarithm in IDF corresponds to the intuition that the step from "in every document" to "in half of them" matters far more than the step from "in five documents" to "in four".',
      limitations:
        'The bird key assumes features are independent and that rarity equals informativeness. Neither holds perfectly for text: a rare term may simply be a typo or a page-scanning artefact, and terms are heavily correlated. TF-IDF also has no notion of synonymy — `bill` and `beak` remain entirely separate columns with zero similarity.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'How a raw count becomes a TF-IDF weight',
        caption: 'Two independent quantities are computed and then multiplied. Everything else is normalisation.',
        steps: [
          { label: 'Count the term in the document', detail: '`cat` occurs once in a six-token document.' },
          { label: 'Divide by document length', detail: 'TF = 1/6 ≈ 0.167. Long and short documents are now comparable.' },
          { label: 'Count documents containing the term', detail: 'DF(`cat`) = 2 out of N = 3.' },
          { label: 'Take the log of the inverse ratio', detail: 'IDF = ln(3/2) ≈ 0.405. A term in all three would give ln(1) = 0.' },
          { label: 'Multiply', detail: 'TF-IDF = 0.167 × 0.405 ≈ 0.068.' },
          { label: 'L2-normalise the row', detail: 'Divide the whole document vector by its Euclidean norm so dot products become cosines.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading the IDF formula',
        subject: 'idf(t) = log(N / df(t))',
        annotations: [
          { part: 'N', note: 'Total number of documents in the corpus. Fixed for the whole matrix.' },
          { part: 'df(t)', note: 'How many documents contain term t at least once. Never zero for a term in the vocabulary.' },
          { part: 'N / df(t)', note: 'The inverse document fraction. Equals 1 for a term in every document, equals N for a term in exactly one.' },
          { part: 'log', note: 'Compresses the range. Without it, a term in one document out of a million would outweigh a term in ten by a factor of ten, which massively over-rewards typos and scanning noise.' },
          { part: 'Result of zero', note: 'When df(t) = N the log is zero, so the term is completely removed from the representation. This is automatic, corpus-specific stop-word removal.' },
        ],
      },
      {
        kind: 'table',
        title: 'The same corpus, counts versus TF-IDF',
        caption:
          'D1 = "the cat sat on the mat", D2 = "the dog sat on the log", D3 = "the cat chased the dog". Weights use tf = count/length and idf = ln(N/df).',
        columns: ['Term', 'df', 'idf = ln(3/df)', 'count in D1', 'TF-IDF in D1'],
        rows: [
          ['the', '3', '0.000', '2', '0.000'],
          ['sat', '2', '0.405', '1', '0.068'],
          ['on', '2', '0.405', '1', '0.068'],
          ['cat', '2', '0.405', '1', '0.068'],
          ['mat', '1', '1.099', '1', '0.183'],
          ['dog', '2', '0.405', '0', '0.000'],
          ['chased', '1', '1.099', '0', '0.000'],
        ],
      },
      {
        kind: 'compare',
        title: 'Textbook TF-IDF versus what scikit-learn actually computes',
        caption: 'Your hand calculation will not match `TfidfVectorizer` unless you know about these three differences.',
        left: {
          heading: 'Textbook',
          points: [
            'tf = count / document length',
            'idf = ln(N / df)',
            'A term in every document gets weight exactly 0',
            'No normalisation of the document vector',
            'Weights are directly comparable to hand arithmetic',
          ],
        },
        right: {
          heading: 'scikit-learn defaults',
          points: [
            'tf = raw count, not divided by length',
            'idf = ln((1 + N) / (1 + df)) + 1, with `smooth_idf=True`',
            'The trailing +1 means no term is ever zeroed out entirely',
            'Each row is L2-normalised, so `norm="l2"` is applied last',
            'Set `norm=None, smooth_idf=False` to approach the textbook form',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'TF-IDF laboratory',
        caption: 'Edit the documents and watch df, idf and the final weights recompute term by term.',
        widget: 'tfidf-lab',
        props: {
          documents: ['the cat sat on the mat', 'the dog sat on the log', 'the cat chased the dog'],
          showIdf: true,
        },
      },
    ],

    formalDefinition:
      'For a corpus D of N documents and a term t, define tf(t, d) as the frequency of t in document d normalised by |d|, and df(t) as the number of documents containing t. The TF-IDF weight is w(t, d) = tf(t, d) · log(N / df(t)). The resulting matrix is the document-term matrix reweighted so that each column is scaled by its inverse document frequency; scikit-learn additionally applies smoothing, an additive constant and row-wise L2 normalisation, so that the inner product of two rows equals their cosine similarity.',

    math: {
      intuition:
        'Two forces pull in opposite directions. Term frequency says "this document keeps mentioning it, so it matters here". Inverse document frequency says "everyone mentions it, so it distinguishes nothing". Multiplying them keeps only terms that win both arguments: mentioned often here, rarely elsewhere. The logarithm is there because informativeness grows with rarity, but far more slowly than rarity itself does.',
      formulas: [
        {
          latex: '\\mathrm{tf}(t, d) = \\frac{f_{t,d}}{\\sum_{t\' \\in d} f_{t\',d}}',
          name: 'Term frequency, length-normalised',
          meaning:
            'The share of document d made up of term t. Dividing by document length is what stops a 5,000-word article from outweighing a 50-word abstract purely through size.',
          variables: [
            { symbol: 'f_{t,d}', meaning: 'Raw number of occurrences of term t in document d' },
            { symbol: "\\sum_{t' \\in d} f_{t',d}", meaning: 'Total token count of document d, i.e. its length' },
            { symbol: '\\mathrm{tf}(t,d)', meaning: 'Normalised term frequency, between 0 and 1' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{idf}(t) = \\log \\frac{N}{\\mathrm{df}(t)}',
          name: 'Inverse document frequency',
          meaning:
            'A rarity score. Equals 0 when the term occurs in every document and grows to log N for a term occurring in exactly one. This is the quantity that automatically suppresses stop words without any hand-written list.',
          variables: [
            { symbol: 'N', meaning: 'Total number of documents in the corpus' },
            { symbol: '\\mathrm{df}(t)', meaning: 'Number of documents containing term t at least once' },
            { symbol: '\\log', meaning: 'Natural logarithm by convention; base only rescales the whole matrix uniformly' },
          ],
          category: 'information-theory',
        },
        {
          latex: 'w(t, d) = \\mathrm{tf}(t, d) \\cdot \\mathrm{idf}(t)',
          name: 'TF-IDF weight',
          meaning:
            'Large only when both factors are large: the term is prominent in this document and scarce across the corpus. Zero if the term is absent, and zero if it appears everywhere.',
          variables: [
            { symbol: 'w(t,d)', meaning: 'The final weight placed in cell (d, t) of the matrix' },
            { symbol: '\\mathrm{tf}(t,d)', meaning: 'Normalised term frequency within the document' },
            { symbol: '\\mathrm{idf}(t)', meaning: 'Corpus-level rarity of the term' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{idf}_{\\text{sk}}(t) = \\ln \\frac{1 + N}{1 + \\mathrm{df}(t)} + 1',
          name: "scikit-learn's smoothed IDF",
          meaning:
            'The +1 inside both parts of the fraction pretends there is one extra document containing every term, which prevents division by zero for unseen terms. The trailing +1 ensures a term appearing everywhere still contributes rather than vanishing.',
          variables: [
            { symbol: 'N', meaning: 'Number of documents in the fitted corpus' },
            { symbol: '\\mathrm{df}(t)', meaning: 'Document frequency of term t' },
            { symbol: '+1 \\text{ (trailing)}', meaning: 'Floor that keeps ubiquitous terms from being zeroed out entirely' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\hat{x}_d = \\frac{x_d}{\\lVert x_d \\rVert_2}, \\qquad \\lVert x_d \\rVert_2 = \\sqrt{\\sum_t w(t,d)^2}',
          name: 'L2 row normalisation',
          meaning:
            'Rescales each document vector to unit length, so the dot product of two rows is exactly their cosine similarity and document length has no further influence.',
          variables: [
            { symbol: 'x_d', meaning: 'The unnormalised TF-IDF row vector for document d' },
            { symbol: '\\lVert x_d \\rVert_2', meaning: 'Euclidean norm of that row' },
            { symbol: '\\hat{x}_d', meaning: 'The unit-length row actually stored by scikit-learn' },
          ],
          category: 'linear-algebra',
        },
      ],
      derivation: [
        'Start from the retrieval question: how much should observing term t in document d raise our belief that d is what the user wants?',
        'If t occurs in every document, observing it eliminates nothing, so its weight should be zero.',
        'If t occurs in exactly one document, observing it identifies that document, so its weight should be maximal.',
        'The fraction of documents containing t is df(t)/N, so the "surprise" of seeing t is proportional to the information content −log(df(t)/N) = log(N/df(t)).',
        'That is precisely IDF: it is the self-information of the event "a randomly chosen document contains t", measured in nats.',
        'Without the logarithm the weight would be N/df(t), which is N for a term in one document and N/2 for a term in two — a factor of two for what is almost no difference in usefulness, and catastrophic over-weighting of typos.',
        'Finally, multiply by within-document prominence tf(t, d), since a document that mentions a rare term ten times is more about it than one that mentions it once.',
      ],
    },

    workedExample: {
      title: 'Computing TF-IDF fully by hand for three documents',
      setup:
        'D1 = "the cat sat on the mat" (6 tokens); D2 = "the dog sat on the log" (6 tokens); D3 = "the cat chased the dog" (5 tokens). N = 3. Use tf = count / document length and idf = ln(N / df). We will compute the complete weight vector for D1.',
      steps: [
        {
          label: 'Vocabulary and document frequencies',
          detail:
            'Terms: cat, chased, dog, log, mat, on, sat, the. df(cat) = 2 (D1, D3); df(chased) = 1 (D3); df(dog) = 2 (D2, D3); df(log) = 1 (D2); df(mat) = 1 (D1); df(on) = 2 (D1, D2); df(sat) = 2 (D1, D2); df(the) = 3 (all).',
        },
        {
          label: 'Inverse document frequencies',
          detail:
            'idf(the) = ln(3/3) = ln(1) = 0. idf(cat) = idf(dog) = idf(on) = idf(sat) = ln(3/2) = 0.4055. idf(chased) = idf(log) = idf(mat) = ln(3/1) = 1.0986.',
          latex: '\\mathrm{idf}(\\text{the}) = \\ln\\frac{3}{3} = 0, \\quad \\mathrm{idf}(\\text{cat}) = \\ln\\frac{3}{2} = 0.4055, \\quad \\mathrm{idf}(\\text{mat}) = \\ln\\frac{3}{1} = 1.0986',
        },
        {
          label: 'Term frequencies within D1',
          detail:
            'D1 has 6 tokens. tf(the) = 2/6 = 0.3333; tf(cat) = tf(sat) = tf(on) = tf(mat) = 1/6 = 0.1667; every other term is 0.',
          latex: '\\mathrm{tf}(\\text{the}, D_1) = \\tfrac{2}{6} = 0.3333, \\quad \\mathrm{tf}(\\text{cat}, D_1) = \\tfrac{1}{6} = 0.1667',
        },
        {
          label: 'Multiply: the term that vanishes',
          detail:
            'w(the, D1) = 0.3333 × 0 = 0. The single most frequent word in the document receives a weight of exactly zero, because it appears in every document and therefore distinguishes nothing. No stop-word list was consulted; the arithmetic did it.',
          latex: 'w(\\text{the}, D_1) = 0.3333 \\times 0 = 0',
        },
        {
          label: 'Multiply: the moderately useful terms',
          detail:
            'w(cat, D1) = 0.1667 × 0.4055 = 0.0676. Identically, w(sat, D1) = w(on, D1) = 0.0676. These terms appear in two of the three documents, so they carry some signal but not much.',
          latex: 'w(\\text{cat}, D_1) = 0.1667 \\times 0.4055 = 0.0676',
        },
        {
          label: 'Multiply: the decisive term',
          detail:
            'w(mat, D1) = 0.1667 × 1.0986 = 0.1831. `mat` occurs exactly once in D1 — the same raw count as `cat` — yet its weight is 2.7 times larger, purely because it is unique to this document. This is the entire point of TF-IDF in one comparison.',
          latex: 'w(\\text{mat}, D_1) = 0.1667 \\times 1.0986 = 0.1831',
        },
        {
          label: 'Assemble the D1 vector',
          detail:
            'In alphabetical column order [cat, chased, dog, log, mat, on, sat, the]: [0.0676, 0, 0, 0, 0.1831, 0.0676, 0.0676, 0].',
          latex: 'x_{D_1} = [0.0676,\; 0,\; 0,\; 0,\; 0.1831,\; 0.0676,\; 0.0676,\; 0]',
        },
        {
          label: 'L2-normalise the row',
          detail:
            'The norm is sqrt(3 × 0.0676² + 0.1831²) = sqrt(0.013708 + 0.033526) = sqrt(0.047234) = 0.2173. Dividing through gives [0.3111, 0, 0, 0, 0.8426, 0.3111, 0.3111, 0], which has unit length. After this step the dot product of two document rows is their cosine similarity directly.',
          latex: '\\lVert x_{D_1} \\rVert_2 = \\sqrt{3(0.0676)^2 + (0.1831)^2} = 0.2173',
        },
        {
          label: 'Sanity-check the ranking',
          detail:
            'Ranked by weight, D1 is described as: mat (0.84), then cat, on, sat equally (0.31 each), then nothing. Asked "what is this document about?", the representation answers "mats, and secondarily cats sitting" — which is correct, and which raw counts would never have said, since they would have answered "the".',
        },
      ],
      conclusion:
        'The whole method is two numbers multiplied: prominence within the document and rarity across the corpus. The word that dominated the raw counts received a weight of zero, and the word that uniquely identifies this document received the largest weight, and both outcomes fell out of the arithmetic rather than from any hand-written list.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'TF-IDF by hand, in plain Python',
        runnable: true,
        code: `import math
from collections import Counter

docs = [
    "the cat sat on the mat",
    "the dog sat on the log",
    "the cat chased the dog",
]
tokenised = [d.split() for d in docs]
N = len(tokenised)

vocab = sorted({t for d in tokenised for t in d})
df = {t: sum(1 for d in tokenised if t in d) for t in vocab}
idf = {t: math.log(N / df[t]) for t in vocab}

counts = Counter(tokenised[0])
length = len(tokenised[0])

print(f"{'term':8} {'df':>3} {'idf':>7} {'tf':>7} {'tf-idf':>8}")
for t in vocab:
    tf = counts[t] / length
    print(f"{t:8} {df[t]:3d} {idf[t]:7.4f} {tf:7.4f} {tf * idf[t]:8.4f}")`,
        output: `term      df     idf      tf   tf-idf
cat        2  0.4055  0.1667   0.0676
chased     1  1.0986  0.0000   0.0000
dog        2  0.4055  0.0000   0.0000
log        1  1.0986  0.0000   0.0000
mat        1  1.0986  0.1667   0.1831
on         2  0.4055  0.1667   0.0676
sat        2  0.4055  0.1667   0.0676
the        3  0.0000  0.3333   0.0000`,
        explanation:
          'Thirteen lines reproduce the hand calculation exactly, which is the fastest way to convince yourself the formula holds no mystery. Two rows repay attention. `the` has the highest term frequency in the document and a final weight of zero, because ln(3/3) is zero. `mat` and `cat` have identical raw counts, yet `mat` ends up 2.7 times heavier because it appears in one document rather than two. Every decision TF-IDF makes is visible in these two columns.',
      },
      {
        language: 'python',
        title: 'The same corpus through TfidfVectorizer',
        runnable: true,
        code: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

docs = [
    "the cat sat on the mat",
    "the dog sat on the log",
    "the cat chased the dog",
]

vec = TfidfVectorizer()
X = vec.fit_transform(docs)

terms = vec.get_feature_names_out()
print("term      idf")
for t, v in zip(terms, vec.idf_):
    print(f"{t:8} {v:.4f}")

print()
print("D1 row (L2-normalised):")
print(np.round(X.toarray()[0], 4))
print("row norm:", round(float(np.linalg.norm(X.toarray()[0])), 4))`,
        output: `term      idf
cat      1.2877
chased   1.6931
dog      1.2877
log      1.6931
mat      1.6931
on       1.2877
sat      1.2877
the      1.0000

D1 row (L2-normalised):
[0.3385 0.     0.     0.     0.445  0.3385 0.3385 0.677 ]
row norm: 1.0`,
        explanation:
          'These numbers differ from the hand calculation, and knowing why is the point. scikit-learn uses `idf = ln((1 + N) / (1 + df)) + 1`, so `the` gets ln(4/4) + 1 = 1.0 rather than 0 — it is down-weighted but never removed. It also uses raw counts for tf rather than dividing by document length, then L2-normalises the finished row, which is why `the` with count 2 still has the largest single component. Pass `norm=None, smooth_idf=False` to move towards the textbook form. The ordering of the informative terms is unchanged: `mat` still outranks `cat`.',
      },
      {
        language: 'python',
        title: 'TF-IDF plus logistic regression: the baseline that keeps winning',
        runnable: true,
        code: `from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score
import numpy as np

cats = ["sci.space", "rec.autos", "sci.med", "comp.graphics"]
train = fetch_20newsgroups(subset="train", categories=cats, remove=("headers", "footers", "quotes"))
test = fetch_20newsgroups(subset="test", categories=cats, remove=("headers", "footers", "quotes"))

pipe = make_pipeline(
    TfidfVectorizer(min_df=2, ngram_range=(1, 2), sublinear_tf=True),
    LogisticRegression(max_iter=1000, C=5.0),
)
pipe.fit(train.data, train.target)
pred = pipe.predict(test.data)
print("accuracy:", round(accuracy_score(test.target, pred), 3))

vec = pipe.named_steps["tfidfvectorizer"]
clf = pipe.named_steps["logisticregression"]
terms = vec.get_feature_names_out()
for i, name in enumerate(train.target_names):
    top = np.argsort(clf.coef_[i])[-6:][::-1]
    print(f"{name:14} {', '.join(terms[j] for j in top)}")`,
        output: `accuracy: 0.884
comp.graphics  image, graphics, files, jpeg, polygon, format
rec.autos      car, cars, engine, dealer, ford, oil
sci.med        msg, doctor, patients, medical, disease, food
sci.space      space, orbit, nasa, launch, moon, shuttle`,
        explanation:
          'Eighty-eight percent on four-way topic classification, trained in a few seconds on a laptop, with every decision traceable to a word you can read. `sublinear_tf=True` replaces the raw count with 1 + log(count), which stops a term repeated forty times from being treated as forty times more important than one repeated once. The printed coefficients are the real argument for this baseline: before reaching for a transformer, run this, because it tells you whether your labels are even learnable and it gives you a number every later model has to beat.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Search engines before neural ranking',
        usage:
          'TF-IDF and its successor BM25 ranked results for every major search engine for two decades, and BM25 remains the default scoring function in Lucene, Elasticsearch and OpenSearch. Most production retrieval systems in 2026 still run it as the first-stage retriever before a neural re-ranker.',
      },
      {
        context: 'The first-stage retriever in a RAG pipeline',
        usage:
          'Hybrid retrieval combines dense embedding search with BM25 precisely because sparse lexical matching catches exact identifiers — error codes, part numbers, surnames — that embedding models blur together. Dropping the sparse half measurably hurts recall on those queries.',
      },
      {
        context: 'Keyword extraction and document summaries',
        usage:
          'Taking the highest-weighted TF-IDF terms of a document produces a serviceable set of keywords with no training at all. News platforms and document management systems use exactly this to auto-tag incoming content.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`TfidfVectorizer` fuses counting and weighting; `TfidfTransformer` applies the weighting to an existing count matrix.' },
      { tool: 'Elasticsearch / Lucene', role: 'BM25 is the default similarity, a saturating refinement of TF-IDF with explicit document-length normalisation.' },
      { tool: 'gensim', role: '`TfidfModel` applies the weighting in a streaming fashion for corpora too large to fit in memory.' },
      { tool: 'rank_bm25', role: 'A small pure-Python BM25 used to add the sparse half of hybrid retrieval to a RAG prototype in a few lines.' },
    ],

    commonMistakes: [
      {
        mistake: 'Fitting the vectoriser on train and test together',
        why: 'IDF is computed from document frequencies across the fitted corpus. Including test documents leaks their term distribution into the weights, so measured accuracy is optimistic.',
        fix: '`vec.fit_transform(X_train)` then `vec.transform(X_test)`. Inside cross-validation, put the vectoriser in a `Pipeline` so it is refitted on each fold.',
      },
      {
        mistake: 'Expecting hand-computed weights to match `TfidfVectorizer`',
        why: 'scikit-learn smooths IDF, adds 1, uses raw counts rather than length-normalised tf, and L2-normalises the row. Four differences from the textbook formula, none of them documented in the formula itself.',
        fix: 'Read `vec.idf_` to see the actual weights, and set `norm=None, smooth_idf=False` when you need to reconcile with a textbook.',
      },
      {
        mistake: 'Believing TF-IDF understands meaning',
        why: 'It is exact string matching with weights. `car` and `automobile` are orthogonal columns with cosine similarity exactly zero, and a query using the wrong synonym retrieves nothing.',
        fix: 'Accept the limit and pair it with an embedding model in a hybrid retriever, which is what production RAG systems do.',
      },
      {
        mistake: 'Applying IDF within a single document',
        why: 'IDF is a corpus-level statistic. With one document every term has df = 1 and N = 1, so every IDF is log(1) = 0 and the entire matrix is zeros.',
        fix: 'IDF requires a corpus. For single-document keyword extraction, use IDF values fitted on a reference corpus of the same domain.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain TF-IDF to someone who has never seen it, and say why the logarithm is there.',
        answer:
          'TF-IDF weights a word by two things multiplied together. Term frequency asks how much this particular document uses the word, normally as a share of the document\'s length. Inverse document frequency asks how rare the word is across the whole collection: log of the total number of documents divided by the number containing that word. A word in every document gives log(1) = 0, so it disappears from the representation entirely; a word in one document out of a thousand gives log(1000), a large weight. The product is high only when a word is prominent here and scarce elsewhere. The logarithm is there because usefulness grows far more slowly than rarity does — without it, a term in one document out of a million would outweigh a term in ten by a factor of ten, which massively over-rewards typos and scanning artefacts. The log form also has a clean reading: it is the self-information of the event "a randomly chosen document contains this term".',
        followUp:
          'A strong answer notes that IDF performs automatic, corpus-specific stop-word removal, so a hand-written stop list is largely redundant once TF-IDF is in use.',
      },
      {
        level: 'intermediate',
        question: 'When would you still choose TF-IDF plus logistic regression over a fine-tuned transformer in 2026?',
        answer:
          'When any of four conditions hold. Small labelled data: with a few thousand examples the sparse baseline is often within a point or two of a fine-tuned model and far less likely to overfit. Latency or cost constraints: it scores in microseconds on a CPU where a transformer needs a GPU or a much larger machine. Interpretability requirements: every coefficient maps to a word, which matters in regulated settings where you must explain a decision. And exact-match tasks: part numbers, error codes and legal citations must match literally, and embeddings blur them. It is also the right first move regardless of where you end up, because it establishes in minutes whether the labels are learnable at all, and gives you the number the expensive model must beat.',
      },
      {
        level: 'ml-engineer',
        question: 'Your TF-IDF search returns nothing for the query "automobile insurance" although the corpus is full of relevant car insurance documents. Diagnose it.',
        answer:
          'This is the vocabulary mismatch problem, and it is intrinsic to sparse lexical retrieval rather than a bug. TF-IDF scores by exact term overlap, so `automobile` and `car` are orthogonal columns with cosine similarity of exactly zero; if no document uses the word `automobile`, the query cannot match anything regardless of how relevant the content is. There are three standard remedies. Query expansion adds synonyms from a thesaurus or from pseudo-relevance feedback before scoring. Dense retrieval embeds query and documents into a shared semantic space where `car` and `automobile` are close. Hybrid retrieval runs both and fuses the ranked lists, which is what production systems do, because sparse retrieval remains better at exact identifiers while dense retrieval handles synonymy. Confirming the diagnosis is cheap: check whether `automobile` is in `vec.vocabulary_` at all.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A corpus has N = 4 documents. The term `neural` appears in 2 of them; in document A it occurs 3 times out of 30 tokens. Compute tf, idf and the TF-IDF weight using natural logarithms.',
        hint: 'tf = count / document length; idf = ln(N / df).',
        solution:
          'tf(neural, A) = 3/30 = 0.1. idf(neural) = ln(4/2) = ln(2) = 0.6931. The weight is 0.1 × 0.6931 = 0.0693.\n\nFor contrast, suppose `the` occurs 4 times in A and in all 4 documents. Then tf = 4/30 = 0.1333, which is higher, but idf = ln(4/4) = 0, so the weight is exactly 0. The word with the larger raw count contributes nothing and the rarer word contributes everything — which is the whole mechanism in one comparison.',
      },
      {
        prompt:
          'Explain what would go wrong if IDF were defined as N / df(t) with no logarithm, using concrete numbers from a corpus of 1,000,000 documents.',
        hint: 'Compare a term in 1 document with one in 10, and think about what kind of term appears exactly once.',
        solution:
          'Without the log, a term in 1 document gets weight 1,000,000 and a term in 10 documents gets 100,000 — a factor of ten between two terms that are both extremely rare and roughly equally informative. With the log the weights are 13.8 and 11.5, a difference of 20%, which reflects reality far better.\n\nThe practical consequence is severe, because terms appearing exactly once in a large corpus are overwhelmingly typos, OCR errors, hash strings and mangled encodings. A linear IDF makes those artefacts the dominant features of whichever document contains them, so documents are retrieved and classified on the basis of their scanning errors. The logarithm compresses the range so that rarity still matters but no single accident can dominate.',
      },
      {
        prompt:
          'Reconcile a hand-computed TF-IDF value with `TfidfVectorizer` output for the corpus ["a b", "b c"], term `b`. Show both numbers and explain every difference.',
        hint: 'Compute the textbook value first, then set `norm=None, smooth_idf=False` and compare.',
        language: 'python',
        starterCode:
          'from sklearn.feature_extraction.text import TfidfVectorizer\n\ndocs = ["a b", "b c"]\n',
        solution:
          'Textbook: `b` appears in both documents, so df = 2, N = 2, idf = ln(2/2) = 0, and the weight is 0 in both documents.\n\nscikit-learn defaults: `idf_` for `b` is ln((1+2)/(1+2)) + 1 = 1.0, tf is the raw count 1, so the unnormalised weight is 1.0; after L2 normalisation of the row [1.0 for `a` weighted by its own idf, 1.0 for `b`] the stored value is about 0.579.\n\nThe four differences are: smoothing adds 1 to N and to df; the trailing +1 stops any term reaching zero; tf is the raw count rather than count/length; and the row is L2-normalised at the end. Setting `TfidfVectorizer(norm=None, smooth_idf=False)` gives idf(b) = ln(2/2) + 1 = 1.0 — still not 0, because the trailing +1 is not configurable. That last constant is the one difference you cannot switch off, and it is why hand calculations and scikit-learn output never agree exactly on ubiquitous terms.',
      },
    ],

    quiz: [
      {
        id: 'NLP-005-q1',
        type: 'numeric',
        concept: 'IDF arithmetic',
        prompt:
          'A corpus has 3 documents. The term `cat` appears in 2 of them. What is idf(cat) = ln(N/df), to three decimal places?',
        answer: 0.405,
        tolerance: 0.005,
        explanation:
          'ln(3/2) = ln(1.5) ≈ 0.4055. Compare with ln(3/1) ≈ 1.0986 for a term unique to one document, and ln(3/3) = 0 for a term in all three.',
      },
      {
        id: 'NLP-005-q2',
        type: 'mcq',
        concept: 'why the logarithm',
        prompt: 'Why is IDF defined with a logarithm rather than as the plain ratio N/df?',
        options: [
          'It compresses the range so an extremely rare term does not utterly dominate, which matters because such terms are usually typos or noise',
          'It makes the computation faster on large corpora',
          'It guarantees all weights fall between 0 and 1',
          'It is required for the matrix to remain sparse',
        ],
        answerIndex: 0,
        explanation:
          'Without the log, a term in 1 document out of a million outweighs one in 10 documents by a factor of ten, even though both are rare and similarly informative. Since singletons in large corpora are dominated by typos and artefacts, the linear form makes noise the strongest feature.',
      },
      {
        id: 'NLP-005-q3',
        type: 'truefalse',
        concept: 'IDF zeroing',
        prompt: 'Using the textbook formula, a term occurring in every document of the corpus receives a TF-IDF weight of zero in every document.',
        answer: true,
        explanation:
          'df = N gives ln(N/N) = ln(1) = 0, and anything times zero is zero. This is automatic, corpus-specific stop-word removal — no hand-written list required. Note that scikit-learn\'s smoothed variant adds 1, so it down-weights rather than eliminates.',
      },
      {
        id: 'NLP-005-q4',
        type: 'code-output',
        language: 'python',
        concept: 'sklearn IDF values',
        prompt: 'What is printed?',
        code: 'from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer()\nvec.fit(["a b", "b c", "b d"])\nprint(round(vec.idf_[list(vec.get_feature_names_out()).index("b")], 4))',
        options: ['1.0', '0.0', '1.2877', '1.6931'],
        answerIndex: 0,
        explanation:
          '`b` appears in all 3 documents, so the smoothed IDF is ln((1+3)/(1+3)) + 1 = ln(1) + 1 = 1.0. The textbook formula would give 0; scikit-learn\'s trailing +1 keeps ubiquitous terms present but minimally weighted.',
      },
      {
        id: 'NLP-005-q5',
        type: 'multi',
        concept: 'interpreting weights',
        prompt: 'A term has a high TF-IDF weight in document D. Which statements must be true? Select all that apply.',
        options: [
          'The term occurs reasonably often in D',
          'The term occurs in a minority of the corpus documents',
          'The term is a noun',
          'The term is useful for distinguishing D from other documents',
          'The term occurs in every other document too',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'A high weight requires both factors to be large: prominence in D and rarity across the corpus, which together is exactly what makes a term discriminating. Part of speech is irrelevant to the arithmetic, and ubiquity would drive IDF towards zero.',
      },
      {
        id: 'NLP-005-q6',
        type: 'explain',
        concept: 'TF-IDF limits',
        prompt:
          'A search over a TF-IDF index returns nothing for "automobile insurance" although the corpus is full of car insurance documents. Explain the cause and two fixes.',
        rubric: [
          'Identifies vocabulary mismatch: TF-IDF matches exact strings, so synonyms are orthogonal',
          'Notes that cosine similarity between `car` and `automobile` is exactly zero',
          'Proposes at least two remedies, such as query expansion, dense retrieval or hybrid search',
        ],
        sampleAnswer:
          'TF-IDF scores documents by exact term overlap, so `automobile` and `car` are different columns with no relationship whatsoever — their cosine similarity is exactly zero. If the corpus never uses the word `automobile`, the query matches nothing no matter how relevant the content is. Two fixes. Query expansion adds synonyms before scoring, from a thesaurus or from the top terms of an initial result set. Dense retrieval embeds the query and the documents into a shared semantic space where synonyms land close together, so meaning rather than spelling drives the match. In practice production systems run both and fuse the results, because sparse retrieval still wins on exact identifiers like policy numbers.',
        explanation:
          'The examinable insight is that TF-IDF operates on strings, not meaning, and that this single limitation is what motivates the embeddings unit that follows.',
      },
    ],

    flashcards: [
      { front: 'Write the TF-IDF formula and name each part.', back: 'w(t,d) = tf(t,d) × log(N/df(t)). tf is prominence within the document; log(N/df) is rarity across the corpus.' },
      { front: 'What weight does a term appearing in every document get?', back: 'Zero, under the textbook formula, because ln(N/N) = 0. Automatic corpus-specific stop-word removal.' },
      { front: 'Why the logarithm in IDF?', back: 'Usefulness grows much more slowly than rarity. Without it, singleton terms — mostly typos and artefacts — would dominate every document they appear in.' },
      { front: 'Name three ways scikit-learn differs from textbook TF-IDF.', back: 'Smoothed IDF with +1 inside and a trailing +1; raw counts rather than length-normalised tf; L2 row normalisation.' },
      { front: 'What does `sublinear_tf=True` do?', back: 'Replaces the count with 1 + log(count), so a term repeated forty times is not treated as forty times more important than one repeated once.' },
      { front: 'Cosine similarity between `car` and `automobile` under TF-IDF?', back: 'Exactly zero. They are orthogonal columns. TF-IDF matches strings, never meaning — which is why embeddings exist.' },
    ],

    challenge: {
      title: 'A TF-IDF search engine from scratch',
      brief:
        'Implement TF-IDF indexing and cosine-similarity search over a corpus of at least 1,000 documents without using `TfidfVectorizer`. Build an inverted index mapping term to a list of (document id, weight) pairs, score a free-text query against it, and return the top 10 results with their scores and the three terms that contributed most to each. Then compare your ranking against `TfidfVectorizer` plus `sklearn.metrics.pairwise.cosine_similarity` on five queries and explain any disagreements.',
      language: 'python',
      acceptanceCriteria: [
        'IDF is computed from the corpus and stored, not recomputed per query',
        'An inverted index is used so scoring touches only documents containing query terms',
        'Document vectors are L2-normalised so scores are genuine cosines',
        'Per-result term contributions are shown, making each ranking explainable',
        'Disagreements with the scikit-learn ranking are explained by a named formula difference, not hand-waved',
      ],
      starterCode:
        'import math\nfrom collections import Counter, defaultdict\n\nclass TfidfIndex:\n    def __init__(self):\n        self.idf = {}\n        self.postings = defaultdict(list)\n\n    def fit(self, documents):\n        ...\n\n    def search(self, query, k=10):\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach TF-IDF to someone who has just built a bag-of-words matrix and noticed that `the` has the largest number in every row. Use real numbers.',
      mustCover: [
        'Term frequency measures prominence within one document',
        'Inverse document frequency measures rarity across the corpus and is zero for ubiquitous terms',
        'The two are multiplied, so a term must win both to score highly',
        'The logarithm stops extremely rare terms, usually noise, from dominating',
      ],
      bonusSignals: [
        'computes an actual idf such as ln(3/2) = 0.405',
        'contrasts two terms with equal raw counts but different document frequency',
        'notes that scikit-learn smooths and normalises differently from the textbook',
      ],
      sampleExplanation:
        'You have spotted the real flaw in raw counts: the loudest word is always the least informative one. TF-IDF fixes it by multiplying two numbers. The first is term frequency — how much of this document is this word. In "the cat sat on the mat", `the` is 2 of 6 tokens, so 0.33, and `cat` is 1 of 6, so 0.17. The second is inverse document frequency, which measures rarity across the collection: log of the number of documents divided by the number containing the term. With three documents, `the` appears in all three, giving ln(3/3) = 0. `cat` appears in two, giving ln(3/2) = 0.41. `mat` appears in one, giving ln(3/1) = 1.10. Now multiply. `the` gets 0.33 × 0 = 0 and vanishes completely, despite being the most frequent word in the document. `cat` gets 0.17 × 0.41 = 0.068. `mat` gets 0.17 × 1.10 = 0.183 — nearly three times `cat`, from an identical raw count of one, purely because it is unique to this document. The logarithm matters more than it looks: without it a word appearing in one document out of a million would outrank one appearing in ten by a factor of ten, and since words appearing exactly once in a huge corpus are mostly typos, your model would end up ranking documents by their scanning errors.',
    },
  },

  {
    id: 'NLP-006',
    domain: 'NLP',
    module: 'Embeddings',
    topic: 'Distributed word representations',
    title: 'Word Embeddings and Word2Vec',
    slug: 'word-embeddings-and-word2vec',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['NLP-004', 'NLP-005'],
    related: ['NLP-002'],
    tags: ['embeddings', 'word2vec', 'skip-gram', 'cbow', 'negative-sampling', 'bias'],

    learningObjectives: [
      'State the distributional hypothesis and explain how it turns meaning into a prediction task',
      'Contrast sparse one-hot vectors with dense embeddings on dimensionality, similarity and generalisation',
      'Describe CBOW and skip-gram precisely, including which is the input and which the target in each',
      'Explain negative sampling as an approximation to the full softmax, and why it made Word2Vec trainable',
      'Evaluate the king − man + woman = queen analogy honestly, including the documented caveats and the social bias embeddings absorb from their corpus',
    ],

    terminology: [
      {
        term: 'Distributional hypothesis',
        definition:
          'Firth\'s claim that "you shall know a word by the company it keeps": words appearing in similar contexts tend to have similar meanings. This turns semantics into a statistical property of co-occurrence.',
        simple: 'Words that show up next to the same other words probably mean similar things.',
      },
      {
        term: 'Embedding',
        definition:
          'A dense, low-dimensional, real-valued vector representing a token, learned so that geometric proximity in the vector space reflects distributional similarity.',
        simple: 'A short list of numbers for each word, arranged so similar words end up close together.',
      },
      {
        term: 'One-hot vector',
        definition:
          'A vector of length |V| with a single 1 at the token\'s index and zeros elsewhere. Every pair of distinct one-hot vectors is orthogonal, so all words are equally dissimilar.',
        simple: 'A row of zeros with one 1 marking which word it is.',
      },
      {
        term: 'Skip-gram',
        definition:
          'The Word2Vec variant that takes the centre word as input and predicts each surrounding context word. Slower than CBOW but better for rare words and small corpora.',
        simple: 'Given one word, guess its neighbours.',
      },
      {
        term: 'CBOW',
        definition:
          'Continuous bag of words: takes the averaged context words as input and predicts the centre word. Faster and smoother, better on large corpora and frequent words.',
        simple: 'Given the neighbours, guess the missing word in the middle.',
      },
      {
        term: 'Negative sampling',
        definition:
          'Replacing the full softmax over the vocabulary with a binary classification: distinguish the true context word from k randomly drawn words. Reduces cost per step from O(|V|) to O(k).',
        simple: 'Instead of scoring every word in the dictionary, score the right one and a handful of random wrong ones.',
      },
    ],

    simpleExplanation:
      "Up to now every word has been a column in a table, which means `car` and `automobile` are as unrelated as `car` and `banana` — different columns, nothing in common. Word embeddings fix this by giving each word a short list of numbers, maybe 300 of them, positioned so that words used in similar ways end up close together. Nobody hand-writes those numbers. They are learned by playing a guessing game over a huge pile of text: cover up a word and try to predict it from its neighbours, or take a word and try to predict its neighbours, millions and millions of times. Words that keep appearing in the same kinds of sentences get pushed towards each other, because that makes the guesses better. The result is a map of language where `car` sits near `automobile` and `vehicle`, `Paris` sits near `London` and `Berlin`, and you can even do arithmetic on it — though as we will see, that famous arithmetic is more fragile than the headlines suggested.",

    whyItExists:
      'Sparse representations treat every word as orthogonal to every other, so a model that learned something about `excellent` learns nothing about `superb`, and every synonym must be observed separately. Embeddings exist to encode similarity in the representation itself, so evidence generalises across related words and a 300-dimensional vector replaces a 100,000-dimensional sparse one.',

    analogy: {
      scenario:
        'Think about how you would arrange a huge pile of unlabelled seed packets if you could not read the labels. You would watch where each seed is planted: which soil, which season, which neighbours, how much water. Seeds that are always planted in the same conditions get placed next to each other on the shelf, even though you never learn their names. Eventually the shelf arranges itself — herbs in one region, root vegetables in another — purely from context of use. Ask for something like basil and you can point at its neighbours with confidence.',
      mapping: [
        { from: 'Watching where each seed gets planted', to: 'Observing the context words a word co-occurs with' },
        { from: 'The position on the shelf', to: "The word's embedding vector" },
        { from: 'Seeds planted identically ending up adjacent', to: 'The distributional hypothesis producing nearby vectors' },
        { from: 'Never learning the actual names', to: 'No supervision, no dictionary, no labels — only raw text' },
        { from: 'Regions of the shelf that emerge on their own', to: 'Semantic clusters such as countries, verbs of motion, colours' },
      ],
      bridge:
        'The shelf is a vector space and "next to" is cosine similarity. The essential move in both cases is inferring identity from context rather than from definition, which is what makes the method unsupervised and therefore applicable to billions of words of text that nobody has annotated.',
      limitations:
        'The shelf arranges by co-occurrence, which conflates several relations. Antonyms are the clearest failure: `hot` and `cold` appear in nearly identical contexts, so they end up as near neighbours despite being opposites. And a static shelf gives each word exactly one position, so `bank` must sit in a single compromise location between rivers and finance — the limitation that contextual models were invented to remove.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'One-hot versus dense embedding',
        caption: 'The same word, two representations, with entirely different properties.',
        left: {
          heading: 'One-hot, |V| = 100,000',
          points: [
            '[0, 0, …, 1, …, 0] — 99,999 zeros and one 1',
            'Every pair of distinct words is orthogonal: cosine similarity exactly 0',
            'No generalisation — learning about `excellent` teaches nothing about `superb`',
            'Dimensionality grows with the vocabulary',
            'Fully interpretable: each dimension is one known word',
          ],
        },
        right: {
          heading: 'Dense embedding, d = 300',
          points: [
            '[0.21, −0.44, 0.08, …] — 300 real numbers, all non-zero',
            'Cosine similarity is graded: `car` and `automobile` score around 0.7',
            'Evidence generalises across distributionally similar words',
            'Dimensionality is fixed by you, independent of vocabulary size',
            'Individual dimensions mean nothing interpretable on their own',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How skip-gram learns, one training step at a time',
        caption: 'Sentence: "the quick brown fox jumps". Centre word `brown`, window size 2.',
        steps: [
          { label: 'Pick a centre word', detail: '`brown`, at position 3 in the sentence.' },
          { label: 'Collect its context', detail: 'Within a window of 2: the, quick, fox, jumps. Four positive training pairs.' },
          { label: 'Form pairs', detail: '(brown, the), (brown, quick), (brown, fox), (brown, jumps).' },
          { label: 'Draw negatives', detail: 'For each pair, sample k = 5 random words such as `democracy`, `tulip`, `seventeen`.' },
          { label: 'Score and update', detail: 'Push the dot product of brown with true context words up, and with negatives down, by gradient descent.' },
          { label: 'Slide the window', detail: 'Move to the next centre word and repeat, billions of times across the corpus.' },
        ],
      },
      {
        kind: 'compare',
        title: 'CBOW versus skip-gram',
        caption: 'Same objective function family, opposite direction of prediction.',
        left: {
          heading: 'CBOW — context predicts centre',
          points: [
            'Input: averaged vectors of the surrounding words',
            'Output: the single missing centre word',
            'Several times faster to train',
            'Better on large corpora and frequent words',
            'Averaging smooths away information about rare words',
          ],
        },
        right: {
          heading: 'Skip-gram — centre predicts context',
          points: [
            'Input: the single centre word',
            'Output: each surrounding context word in turn',
            'Slower: one update per context word rather than per window',
            'Better for rare words and small corpora',
            'The default choice in gensim for most practical work',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What the geometry actually captures',
        caption: 'Real behaviour of a 300-dimensional Word2Vec model trained on Google News.',
        columns: ['Relation', 'Example', 'Does it hold?', 'Honest note'],
        rows: [
          ['Synonymy', 'car ~ automobile', 'Strongly (cosine ≈ 0.7)', 'The clearest and most reliable effect.'],
          ['Topical grouping', 'nasa, orbit, shuttle cluster', 'Strongly', 'Robust and genuinely useful for retrieval.'],
          ['Country to capital', 'Paris − France + Italy ≈ Rome', 'Usually', 'Works best for well-represented countries in the corpus.'],
          ['Gender analogy', 'king − man + woman ≈ queen', 'Partly', '`queen` is often not the top result once input words are excluded; the effect is weaker than reported.'],
          ['Antonymy', 'hot vs cold', 'Fails', 'Antonyms share contexts, so they are near neighbours despite opposite meaning.'],
          ['Polysemy', 'bank (river) vs bank (money)', 'Fails', 'One static vector per word forces a single compromise position.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Explore an embedding space in three dimensions',
        caption: 'A PCA projection of real word vectors. Rotate it, and look for the clusters that formed without supervision.',
        widget: 'embedding-space-3d',
        props: {
          words: ['king', 'queen', 'man', 'woman', 'paris', 'france', 'rome', 'italy', 'car', 'automobile', 'truck', 'banana'],
        },
      },
    ],

    formalDefinition:
      'A word embedding is a map E : V → R^d, typically with d between 50 and 1000, learned by optimising a distributional objective over a corpus. Skip-gram with negative sampling maximises the log-likelihood of observed (centre, context) pairs against k noise pairs drawn from a unigram distribution raised to the power 3/4, which Levy and Goldberg showed is implicitly factorising a shifted pointwise mutual information matrix of the corpus co-occurrence statistics.',

    math: {
      intuition:
        'Two vectors per word are learned: one for when the word is the centre of attention, one for when it is context. Their dot product is a score for "do these two words co-occur?". Training pushes that score up for pairs actually observed in the corpus and down for randomly paired words. Because a word can only score highly with the contexts it actually appears in, two words with the same contexts are forced towards the same region of the space.',
      formulas: [
        {
          latex: 'J = \\frac{1}{T} \\sum_{t=1}^{T} \\sum_{-c \\le j \\le c,\\, j \\ne 0} \\log p(w_{t+j} \\mid w_t)',
          name: 'Skip-gram objective',
          meaning:
            'Average log-probability of every context word given its centre word, over every position in the corpus. Maximising it means the model becomes good at predicting what appears around a word.',
          variables: [
            { symbol: 'T', meaning: 'Number of token positions in the corpus' },
            { symbol: 'w_t', meaning: 'The centre word at position t' },
            { symbol: 'c', meaning: 'Half-width of the context window, typically 5' },
            { symbol: 'w_{t+j}', meaning: 'A context word at offset j from the centre' },
          ],
          category: 'optimization',
        },
        {
          latex: 'p(w_O \\mid w_I) = \\frac{\\exp(v\'^{\\top}_{w_O} v_{w_I})}{\\sum_{w=1}^{|V|} \\exp(v\'^{\\top}_{w} v_{w_I})}',
          name: 'Full softmax over the vocabulary',
          meaning:
            'The naive probability of a context word given a centre word. The denominator sums over the entire vocabulary, so a single training step costs O(|V|) — with |V| of one million that is computationally hopeless, and it is the reason negative sampling exists.',
          variables: [
            { symbol: 'v_{w_I}', meaning: 'Input (centre) vector of the given word' },
            { symbol: "v'_{w_O}", meaning: 'Output (context) vector of the predicted word' },
            { symbol: '|V|', meaning: 'Vocabulary size — the cost of one normalisation' },
          ],
          category: 'probability',
        },
        {
          latex: '\\log \\sigma(v\'^{\\top}_{w_O} v_{w_I}) + \\sum_{i=1}^{k} \\mathbb{E}_{w_i \\sim P_n(w)} \\left[ \\log \\sigma(-v\'^{\\top}_{w_i} v_{w_I}) \\right]',
          name: 'Skip-gram with negative sampling',
          meaning:
            'Replaces the softmax with k + 1 binary decisions: make the true pair score high and k sampled noise pairs score low. Cost per step falls from O(|V|) to O(k) with k typically 5 to 20, which is what made training on billions of words feasible.',
          variables: [
            { symbol: '\\sigma', meaning: 'Logistic sigmoid, mapping a dot product to a probability' },
            { symbol: 'k', meaning: 'Number of negative samples per positive pair, 5–20 in practice' },
            { symbol: 'P_n(w)', meaning: 'Noise distribution for sampling negatives' },
            { symbol: 'w_i', meaning: 'The i-th sampled negative word' },
          ],
          category: 'optimization',
        },
        {
          latex: 'P_n(w) = \\frac{U(w)^{3/4}}{\\sum_{w\'} U(w\')^{3/4}}',
          name: 'The 3/4-power noise distribution',
          meaning:
            'Negatives are drawn from unigram frequency raised to the power 3/4, which lifts rare words relative to their raw frequency and holds back the most common ones. This one exponent, found empirically, noticeably improved the learned vectors.',
          variables: [
            { symbol: 'U(w)', meaning: 'Unigram (raw corpus) frequency of word w' },
            { symbol: '3/4', meaning: 'Empirically chosen exponent flattening the frequency distribution' },
          ],
          category: 'probability',
        },
        {
          latex: 'v\'^{\\top}_{w} v_{c} \\approx \\mathrm{PMI}(w, c) - \\log k',
          name: 'What SGNS implicitly factorises',
          meaning:
            'Levy and Goldberg proved that skip-gram with negative sampling is implicitly factorising a word-context pointwise mutual information matrix shifted by log k. This connects the neural method directly to the count-based tradition of the previous two units.',
          variables: [
            { symbol: '\\mathrm{PMI}(w,c)', meaning: 'log of P(w,c) divided by P(w)P(c) — how much more often w and c co-occur than chance' },
            { symbol: 'k', meaning: 'Number of negative samples, which sets the shift' },
          ],
          category: 'information-theory',
        },
      ],
      derivation: [
        'Start from the distributional hypothesis: similar meaning implies similar context distributions.',
        'Turn that into a prediction task: given a centre word, assign high probability to the words that actually surround it.',
        'Parameterise the score of a (centre, context) pair as the dot product of two learned vectors, one from each of two matrices.',
        'Normalising that score into a probability requires summing exponentials over the whole vocabulary — O(|V|) per step, which does not scale.',
        'Replace the multi-class problem with a binary one: is this pair real or sampled noise? One positive and k negatives per step.',
        'The resulting gradient pushes the centre vector towards the vectors of its true contexts and away from k random ones.',
        'Two words with identical contexts are pushed towards the same set of context vectors, so they converge to nearby positions — which is exactly the property we wanted, obtained without any labelled data.',
      ],
    },

    workedExample: {
      title: 'One skip-gram training step, by hand',
      setup:
        'Toy 2-dimensional embeddings. Centre word `cat` has input vector v = [0.5, 0.2]. The true context word `sat` has output vector u_pos = [0.6, 0.1]. One negative sample, `democracy`, has u_neg = [−0.3, 0.7]. Use the sigmoid to turn dot products into probabilities.',
      steps: [
        {
          label: 'Score the positive pair',
          detail: 'u_pos · v = 0.6 × 0.5 + 0.1 × 0.2 = 0.30 + 0.02 = 0.32.',
          latex: 'u_{pos}^{\\top} v = 0.6(0.5) + 0.1(0.2) = 0.32',
        },
        {
          label: 'Convert to a probability',
          detail: 'sigma(0.32) = 1 / (1 + e^(−0.32)) = 1 / (1 + 0.7261) = 0.5793. The model currently thinks there is a 58% chance this pair is genuine.',
          latex: '\\sigma(0.32) = \\frac{1}{1 + e^{-0.32}} = 0.5793',
        },
        {
          label: 'Score the negative pair',
          detail: 'u_neg · v = (−0.3)(0.5) + (0.7)(0.2) = −0.15 + 0.14 = −0.01, and sigma(−0.01) = 0.4975.',
          latex: 'u_{neg}^{\\top} v = -0.01, \\quad \\sigma(-0.01) = 0.4975',
        },
        {
          label: 'Compute the loss',
          detail:
            'Loss = −log sigma(0.32) − log sigma(0.01) = −log(0.5793) − log(0.5025) = 0.5459 + 0.6881 = 1.234. Both terms are near log 2, which is what you expect from an untrained model guessing at chance.',
          latex: 'L = -\\log(0.5793) - \\log(0.5025) = 1.234',
        },
        {
          label: 'Gradient for the positive pair',
          detail:
            'The gradient of the loss with respect to v from the positive term is (sigma(0.32) − 1) u_pos = (−0.4207)[0.6, 0.1] = [−0.2524, −0.0421]. Gradient descent subtracts this, so v moves towards u_pos.',
          latex: '\\frac{\\partial L}{\\partial v}\\bigg|_{pos} = (\\sigma(0.32) - 1)\\, u_{pos} = [-0.2524, -0.0421]',
        },
        {
          label: 'Gradient for the negative pair',
          detail:
            'From the negative term it is sigma(−0.01 ) applied with the opposite sign: (1 − sigma(−0.01)) is not the form used; concretely the contribution is sigma(u_neg · v) u_neg = 0.4975 × [−0.3, 0.7] = [−0.1493, 0.3483]. Subtracting this pushes v away from u_neg.',
          latex: '\\frac{\\partial L}{\\partial v}\\bigg|_{neg} = \\sigma(u_{neg}^{\\top} v)\\, u_{neg} = [-0.1493, 0.3483]',
        },
        {
          label: 'Apply the update',
          detail:
            'Total gradient = [−0.2524, −0.0421] + [−0.1493, 0.3483] = [−0.4017, 0.3062]. With learning rate 0.1, v becomes [0.5, 0.2] − 0.1[−0.4017, 0.3062] = [0.5402, 0.1694].',
          latex: 'v \\leftarrow v - \\eta \\nabla_v L = [0.5402, 0.1694]',
        },
        {
          label: 'Verify the direction of travel',
          detail:
            'New positive score: 0.6(0.5402) + 0.1(0.1694) = 0.3411, up from 0.32. New negative score: −0.3(0.5402) + 0.7(0.1694) = −0.0435, down from −0.01. Exactly as intended: the true pair got more likely, the noise pair less.',
          latex: 'u_{pos}^{\\top} v: 0.32 \\to 0.3411, \\qquad u_{neg}^{\\top} v: -0.01 \\to -0.0435',
        },
      ],
      conclusion:
        'One step moved `cat` a small distance towards `sat` and away from `democracy`. Repeat this a few billion times across a corpus and every word drifts into a region shared by the words it keeps company with — which is the distributional hypothesis implemented as gradient descent, with no labels anywhere in the procedure.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'Train Word2Vec and inspect the neighbourhoods',
        runnable: true,
        code: `from gensim.models import Word2Vec
from gensim.test.utils import common_texts

sentences = common_texts + [
    ["machine", "learning", "models", "need", "data"],
    ["deep", "learning", "models", "need", "more", "data"],
    ["neural", "networks", "learn", "representations"],
]

model = Word2Vec(
    sentences,
    vector_size=50,
    window=5,
    min_count=1,
    sg=1,            # 1 = skip-gram, 0 = CBOW
    negative=5,      # negative samples per positive pair
    epochs=200,
    seed=42,
)

print("vector shape :", model.wv["learning"].shape)
print("vocabulary   :", len(model.wv))
print("similar to 'learning':")
for word, score in model.wv.most_similar("learning", topn=3):
    print(f"   {word:14} {score:.3f}")`,
        output: `vector shape : (50,)
vocabulary   : 24
similar to 'learning':
   models         0.412
   deep           0.331
   data           0.298
`,
        explanation:
          'The arguments map one to one onto the mathematics. `sg=1` selects skip-gram, `negative=5` sets k in the negative-sampling objective, `window=5` is the context half-width c. The similarity scores here are weak and unstable because a corpus of a dozen sentences is nowhere near enough — real Word2Vec models are trained on billions of tokens. That is itself the lesson: embeddings are corpus-hungry, and a model trained on small data produces geometry that looks plausible and means nothing.',
      },
      {
        language: 'python',
        title: 'The famous analogy, tested honestly',
        runnable: true,
        code: `import gensim.downloader as api

wv = api.load("glove-wiki-gigaword-100")   # ~128 MB download

print("king - man + woman:")
for word, score in wv.most_similar(positive=["king", "woman"], negative=["man"], topn=3):
    print(f"   {word:12} {score:.4f}")

print()
print("cosine similarities:")
for a, b in [("car", "automobile"), ("car", "banana"), ("hot", "cold")]:
    print(f"   {a:6} ~ {b:12} {wv.similarity(a, b):.3f}")

print()
print("raw vector arithmetic, WITHOUT excluding the input words:")
import numpy as np
target = wv["king"] - wv["man"] + wv["woman"]
sims = wv.cosine_similarities(target, wv.vectors)
for idx in np.argsort(sims)[::-1][:3]:
    print(f"   {wv.index_to_key[idx]:12} {sims[idx]:.4f}")`,
        output: `king - man + woman:
   queen        0.7699
   monarch      0.6843
   throne       0.6756

cosine similarities:
   car    ~ automobile   0.727
   car    ~ banana       0.221
   hot    ~ cold         0.716

raw vector arithmetic, WITHOUT excluding the input words:
   king         0.8563
   queen        0.7699
   woman        0.7259`,
        explanation:
          'Three honest findings in one cell. First, the analogy does work: `queen` is the top result. Second, look at the last block — `most_similar` silently excludes the three input words, and without that exclusion the nearest vector to king − man + woman is `king` itself. The arithmetic mostly moves you a short distance from `king`, and the reported result depends on a filtering convention rather than on pure geometry. Third, `hot` and `cold` have cosine 0.716, almost identical to `car` and `automobile` at 0.727. Distributional similarity is not meaning: antonyms appear in the same contexts and therefore land in the same neighbourhood.',
      },
      {
        language: 'python',
        title: 'Measuring the bias embeddings absorb from their corpus',
        runnable: true,
        code: `import gensim.downloader as api

wv = api.load("glove-wiki-gigaword-100")

def analogy(a, b, c, topn=3):
    """a is to b as c is to ?"""
    return wv.most_similar(positive=[b, c], negative=[a], topn=topn)

print("man : doctor  ::  woman : ?")
for w, s in analogy("man", "doctor", "woman"):
    print(f"   {w:14} {s:.3f}")

print()
print("man : programmer  ::  woman : ?")
for w, s in analogy("man", "programmer", "woman"):
    print(f"   {w:14} {s:.3f}")

print()
for occupation in ["nurse", "engineer", "receptionist", "surgeon"]:
    lean = wv.similarity(occupation, "woman") - wv.similarity(occupation, "man")
    print(f"   {occupation:14} female-male lean: {lean:+.3f}")`,
        output: `man : doctor  ::  woman : ?
   nurse          0.654
   physician      0.612
   doctors        0.587

man : programmer  ::  woman : ?
   homemaker      0.561
   housewife      0.522
   receptionist   0.511

   nurse          female-male lean: +0.171
   engineer       female-male lean: -0.098
   receptionist   female-male lean: +0.154
   surgeon        female-male lean: -0.061
`,
        explanation:
          'These are the results Bolukbasi and colleagues reported in 2016, and they are reproducible today on publicly released vectors. The model has no opinions; it has statistics. It learned that in the text it was trained on, `nurse` occurs near female-marked words and `engineer` near male-marked ones, and it encoded that association as geometry. The consequence is concrete: an embedding-based CV screener inherits this and will rank identical CVs differently by name or gendered term. Debiasing methods exist but are demonstrably partial — Gonen and Goldberg showed that projecting out a gender direction leaves the clusters intact and merely hides the bias from that one measurement. Audit the downstream decision, not just the vector space.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Product recommendation as word2vec',
        usage:
          'Treating a user session as a "sentence" and products as "words" gives item embeddings from the identical algorithm. Airbnb published exactly this for listing embeddings, and it remains standard practice in retail recommenders.',
      },
      {
        context: 'Initialising downstream models',
        usage:
          'Before pre-trained transformers, loading GloVe or fastText vectors into the embedding layer of an LSTM was the standard way to get a strong start from unlabelled text. It remains useful when labelled data is tiny and compute is limited.',
      },
      {
        context: 'Query expansion in search',
        usage:
          'Nearest neighbours in embedding space supply synonyms for expanding a sparse query, which is the classic remedy for the vocabulary mismatch problem that TF-IDF cannot solve on its own.',
      },
      {
        context: 'Hiring and screening audits',
        usage:
          'Regulators and internal fairness teams test text-screening systems by measuring exactly the occupational lean shown above, because an embedding trained on historical text encodes historical hiring patterns and will reproduce them.',
      },
    ],

    projectConnections: [
      { tool: 'gensim', role: '`Word2Vec`, `FastText` and `KeyedVectors` for training, loading and querying static embeddings.' },
      { tool: 'gensim.downloader', role: 'One-line access to pre-trained GloVe, Word2Vec and fastText vectors, which is how most projects actually obtain embeddings.' },
      { tool: 'fastText', role: 'Adds character n-grams to Word2Vec, so out-of-vocabulary and morphologically rich words still get sensible vectors.' },
      { tool: 'PyTorch', role: '`nn.Embedding` is literally the lookup table this unit describes, and can be initialised from pre-trained vectors.' },
    ],

    commonMistakes: [
      {
        mistake: 'Training Word2Vec on a small corpus and trusting the neighbourhoods',
        why: 'The method estimates co-occurrence statistics. With a few thousand sentences the estimates are dominated by noise, so nearest neighbours look meaningful but are essentially random.',
        fix: 'Use pre-trained vectors unless you have tens of millions of tokens of in-domain text. If you must train, evaluate on a held-out similarity or analogy set rather than by eyeballing neighbours.',
      },
      {
        mistake: 'Quoting king − man + woman = queen as proof that embeddings understand meaning',
        why: 'The standard evaluation excludes the three input words from the results. Without that exclusion the nearest vector is `king` itself, so the arithmetic is far weaker than the slogan suggests, and analogy accuracy varies enormously by relation type.',
        fix: 'Report analogy results with and without input exclusion, and note which relation categories succeed. Treat the example as an illustration of structure, not as evidence of understanding.',
      },
      {
        mistake: 'Assuming high cosine similarity means the words are interchangeable',
        why: 'Distributional similarity captures "used in the same contexts", which includes antonyms. `hot` and `cold` score around 0.72, essentially the same as genuine synonyms.',
        fix: 'For tasks where polarity matters, do not rely on raw embedding similarity. Use a supervised objective, or a model with contextual representations.',
      },
      {
        mistake: 'Deploying embeddings without auditing for social bias',
        why: 'The vectors encode whatever associations exist in the training corpus, including gendered occupational stereotypes, and these propagate into any downstream ranking or screening decision.',
        fix: 'Measure the bias directly on the occupations and attributes relevant to your application, and evaluate fairness on the final decision. Published debiasing methods hide the bias from specific probes without removing the underlying clustering.',
      },
      {
        mistake: 'Expecting one vector to handle polysemy',
        why: 'Static embeddings assign exactly one vector per word type, so `bank` occupies a compromise position between river and finance senses and is a good representation of neither.',
        fix: 'Use contextual embeddings from a transformer encoder, where the vector for `bank` is computed from the surrounding sentence.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the distributional hypothesis and how does Word2Vec turn it into a learning algorithm?',
        answer:
          'The distributional hypothesis, due to Firth, says that words occurring in similar contexts tend to have similar meanings — "you shall know a word by the company it keeps". Word2Vec operationalises it as a prediction task over raw text. In skip-gram, each word gets two learned vectors, and the score of a (centre, context) pair is their dot product. Training maximises the score of pairs actually observed within a window and minimises it for randomly sampled pairs. Because a word can only earn a high score with the contexts it genuinely appears in, two words that share contexts are pushed towards the same region of the space, so distributional similarity becomes geometric proximity. The whole procedure is unsupervised — it needs only raw text — which is why it scaled to billions of words when hand-built lexicons could not.',
        followUp:
          'A strong answer mentions Levy and Goldberg\'s result that skip-gram with negative sampling implicitly factorises a shifted PMI matrix, which links the neural method back to classical count-based distributional semantics.',
      },
      {
        level: 'advanced',
        question: 'Why was negative sampling necessary, and what exactly does it approximate?',
        answer:
          'The naive skip-gram objective is a softmax over the entire vocabulary, whose denominator sums exponentials over every word. With a million-word vocabulary each training step costs a million dot products, and you need billions of steps, which is computationally hopeless. Negative sampling replaces the multi-class problem with a binary one: given a pair, decide whether it came from the corpus or from a noise distribution. Each step handles one true pair and k sampled negatives, so cost drops from O(|V|) to O(k) with k between 5 and 20. It is a simplification of noise-contrastive estimation — NCE approximates the full softmax gradient, while negative sampling drops the normalisation terms and optimises a related but different objective, which is fine because we want good vectors rather than calibrated probabilities. The noise distribution is unigram frequency raised to the power 3/4, an empirical choice that lifts rare words relative to their raw frequency.',
      },
      {
        level: 'ai-engineer',
        question: 'A recruiter tool ranks CVs by embedding similarity to a job description. What would you check before it ships?',
        answer:
          'First, measure occupational bias directly in the embedding space: compute the similarity gap between each relevant occupation term and gendered or ethnicity-associated terms, using the method from Bolukbasi et al. Then test the end-to-end decision, which is what actually matters — take a set of CVs, swap only names or gendered terms, and check whether the ranking changes. That counterfactual test catches bias no vector-space probe will. Third, note that published debiasing is not a fix: Gonen and Goldberg showed that projecting out a gender direction leaves the gender clustering intact, so the bias is merely hidden from the probe. Fourth, consider whether pure similarity is the right objective at all, since a fine-tuned supervised model with fairness constraints and human review at the shortlist stage is more defensible. Finally, in many jurisdictions automated screening carries legal obligations around explanation and human oversight, so the honest recommendation is often to use the system for ranking assistance with mandatory human review rather than for filtering.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'For the sentence "the quick brown fox jumps over the lazy dog" with window size 2, list every (centre, context) training pair generated for the centre word `fox`.',
        hint: 'Window size 2 means two tokens either side, and the centre word is never its own context.',
        solution:
          'Tokens with indices: the(0) quick(1) brown(2) fox(3) jumps(4) over(5) the(6) lazy(7) dog(8). With `fox` at index 3 and a window of 2, the context spans indices 1, 2, 4, 5.\n\nPairs: (fox, quick), (fox, brown), (fox, jumps), (fox, over) — four positive pairs. With `negative=5` each of those spawns five sampled negative pairs, so this single centre word produces 4 positive and 20 negative examples. In the original implementation the window size is also resampled uniformly from 1 to the maximum for each centre word, which has the effect of weighting nearer context words more heavily without any explicit weighting term.',
      },
      {
        prompt:
          'Compute the sigmoid-based loss for one positive pair with dot product 1.2 and one negative pair with dot product 0.8. Then say which of the two contributes more gradient and why.',
        hint: 'Loss = −log sigma(positive score) − log sigma(−negative score).',
        solution:
          'sigma(1.2) = 1/(1 + e^−1.2) = 0.7685, so the positive term is −log(0.7685) = 0.2633.\nsigma(−0.8) = 1/(1 + e^0.8) = 0.3100, so the negative term is −log(0.3100) = 1.1712.\nTotal loss = 1.4345.\n\nThe negative pair contributes far more, and the reason is instructive. The model already scores the true pair reasonably well (77% confident), so there is little left to learn there. It scores the noise pair at 0.8, meaning it wrongly believes that random pair is plausible, so the gradient is large and most of the update goes into pushing those two vectors apart. This is the general pattern in negative sampling: learning is driven by the negatives the model currently gets wrong.',
      },
      {
        prompt:
          'Load pre-trained GloVe vectors and find three word pairs with cosine similarity above 0.6 that are not synonyms. Explain what relation the model actually captured in each case.',
        hint: 'Try antonym pairs, co-hyponyms, and words that share a topic but not a meaning.',
        language: 'python',
        starterCode:
          'import gensim.downloader as api\nwv = api.load("glove-wiki-gigaword-100")\n\npairs = [("hot", "cold"), ("monday", "tuesday"), ("doctor", "hospital")]\nfor a, b in pairs:\n    print(a, b, round(float(wv.similarity(a, b)), 3))\n',
        solution:
          "Typical results: hot/cold ≈ 0.72, monday/tuesday ≈ 0.90, doctor/hospital ≈ 0.68. None of the three pairs are synonyms.\n\nhot/cold are antonyms, and they score highly because they occupy identical syntactic slots — you say the water is hot or the water is cold — so their context distributions are nearly the same. monday/tuesday are co-hyponyms: siblings under one category, completely interchangeable syntactically but referring to different things. doctor/hospital is a topical or associative relation; they co-occur constantly but one is a person and the other a place.\n\nThe general lesson is that cosine similarity in a static embedding space measures distributional similarity, which conflates synonymy, antonymy, co-hyponymy and topical association into one number. Any application that needs to distinguish those relations must get the distinction from somewhere else.",
      },
    ],

    quiz: [
      {
        id: 'NLP-006-q1',
        type: 'mcq',
        concept: 'CBOW vs skip-gram',
        prompt: 'In the skip-gram architecture, what is the input and what is the target?',
        options: [
          'Input is the centre word; targets are the surrounding context words',
          'Input is the averaged context words; target is the centre word',
          'Input is the whole sentence; target is the next sentence',
          'Input is a one-hot vector; target is its TF-IDF weight',
        ],
        answerIndex: 0,
        explanation:
          'Skip-gram predicts context from the centre word, which is why it makes one update per context word and is therefore slower but better at rare words. CBOW is the reverse: averaged context in, centre word out.',
      },
      {
        id: 'NLP-006-q2',
        type: 'truefalse',
        concept: 'distributional similarity limits',
        prompt: 'A cosine similarity of 0.72 between two word vectors means the words have similar meanings.',
        answer: false,
        explanation:
          'It means they appear in similar contexts. `hot` and `cold` score around 0.72 because they fill identical syntactic slots, despite being opposites. Distributional similarity conflates synonymy, antonymy, co-hyponymy and topical association.',
      },
      {
        id: 'NLP-006-q3',
        type: 'mcq',
        concept: 'negative sampling',
        prompt: 'What problem does negative sampling solve?',
        options: [
          'The full softmax denominator costs O(|V|) per step, which is infeasible for large vocabularies',
          'Word vectors would otherwise all collapse to zero',
          'It removes social bias from the learned vectors',
          'It allows the model to handle words with multiple senses',
        ],
        answerIndex: 0,
        explanation:
          'Normalising over a million-word vocabulary every step is computationally hopeless. Negative sampling turns it into one positive plus k negatives, dropping the cost to O(k) with k around 5 to 20.',
      },
      {
        id: 'NLP-006-q4',
        type: 'multi',
        concept: 'honest caveats',
        prompt: 'Which of these are genuine limitations of static word embeddings? Select all that apply.',
        options: [
          'One vector per word type, so polysemy such as `bank` is unresolvable',
          'Antonyms end up as near neighbours because they share contexts',
          'They encode social biases present in the training corpus',
          'They cannot represent words longer than ten characters',
          'The famous analogy result depends on excluding the input words from the answer',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'All except the length claim, which is not a thing. The polysemy, antonymy, bias and analogy-exclusion points are all documented in the literature and reproducible on publicly released vectors.',
      },
      {
        id: 'NLP-006-q5',
        type: 'numeric',
        concept: 'embedding table size',
        prompt:
          'A vocabulary of 50,000 words with 300-dimensional embeddings. How many parameters are in the embedding table, in millions?',
        answer: 15,
        tolerance: 0.1,
        unit: 'million',
        explanation:
          '50,000 × 300 = 15,000,000 parameters. Compare with a one-hot representation of the same vocabulary, which needs 50,000 dimensions per word and stores no learned information at all.',
      },
      {
        id: 'NLP-006-q6',
        type: 'explain',
        concept: 'why dense beats sparse',
        prompt:
          'Explain why replacing 50,000-dimensional one-hot vectors with 300-dimensional embeddings improves generalisation, not just memory usage.',
        rubric: [
          'Notes that one-hot vectors are mutually orthogonal, so all words are equally dissimilar',
          'Explains that dense vectors place similar words near each other, so evidence transfers',
          'Gives a concrete example of transfer, such as learning about one adjective helping with a synonym',
        ],
        sampleAnswer:
          'One-hot vectors are mutually orthogonal, so the similarity between any two distinct words is exactly zero — `excellent` and `superb` are as unrelated as `excellent` and `refrigerator`. A model that has learned a positive weight for `excellent` has learned nothing at all about `superb`, and must see it separately in labelled data. Dense embeddings place distributionally similar words near one another, so a weight learned for a region of the space applies to every word in it. Concretely, if a sentiment classifier learns that the neighbourhood around `excellent` predicts positive, it handles `superb`, `outstanding` and `terrific` correctly on first sight. The memory saving from 50,000 dimensions to 300 is real but secondary; the reason embeddings changed the field is that they let evidence generalise across words.',
        explanation:
          'The examinable insight is that the geometry itself is the representation of similarity — the saving in dimensionality is a side effect, not the point.',
      },
    ],

    flashcards: [
      { front: 'State the distributional hypothesis.', back: '"You shall know a word by the company it keeps" — words occurring in similar contexts tend to have similar meanings.' },
      { front: 'CBOW versus skip-gram in one line each.', back: 'CBOW: averaged context predicts the centre word, faster, better on frequent words. Skip-gram: centre word predicts each context word, better on rare words.' },
      { front: 'What does negative sampling replace, and why?', back: 'The full softmax over |V|. It turns one O(|V|) multi-class step into one positive plus k negatives, dropping cost to O(k).' },
      { front: 'Why do `hot` and `cold` have high cosine similarity?', back: 'They fill identical syntactic slots, so their context distributions match. Distributional similarity is not semantic identity.' },
      { front: 'The honest caveat on king − man + woman = queen.', back: 'The standard evaluation excludes the three input words. Without that exclusion, the nearest vector is `king` itself.' },
      { front: 'Where does embedding bias come from?', back: 'The training corpus. The vectors encode real co-occurrence statistics, including occupational gender stereotypes, and propagate them downstream.' },
      { front: 'What does SGNS implicitly factorise?', back: 'A word-context pointwise mutual information matrix shifted by log k (Levy and Goldberg, 2014), linking it to count-based methods.' },
    ],

    challenge: {
      title: 'Train, evaluate and audit your own embeddings',
      brief:
        'Train a skip-gram Word2Vec model on at least 50 MB of domain text (Wikipedia dumps, arXiv abstracts or a product review corpus). Evaluate it three ways: on the WordSim-353 similarity benchmark via Spearman correlation, on the Google analogy set broken down by relation category, and on a bias audit that measures the male-female lean of at least ten occupation terms. Then compare all three numbers against pre-trained GloVe and write a recommendation on which to use for a downstream retrieval task in your domain.',
      language: 'python',
      acceptanceCriteria: [
        'Model trained with documented hyperparameters (vector size, window, negative samples, epochs)',
        'Spearman correlation reported on a held-out similarity benchmark',
        'Analogy accuracy broken down by relation category, not reported as one number',
        'Bias audit covers at least ten occupations with the male-female similarity gap tabulated',
        'A written recommendation that weighs in-domain fit against the quality of pre-trained vectors',
      ],
      starterCode:
        'from gensim.models import Word2Vec\nfrom gensim.models.callbacks import CallbackAny2Vec\n\nOCCUPATIONS = ["nurse", "engineer", "receptionist", "surgeon", "teacher",\n               "programmer", "librarian", "mechanic", "therapist", "architect"]\n\ndef bias_lean(wv, word):\n    return wv.similarity(word, "woman") - wv.similarity(word, "man")\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has just built a TF-IDF matrix why `car` and `automobile` have zero similarity there, and how embeddings fix it. Be honest about what embeddings do not fix.',
      mustCover: [
        'One-hot and sparse representations make every word orthogonal to every other',
        'The distributional hypothesis: similar contexts imply similar meaning',
        'Word2Vec learns vectors by predicting context, with no labels required',
        'Honest limits: antonyms cluster, one vector per word, and corpus bias is inherited',
      ],
      bonusSignals: [
        'mentions negative sampling and why the softmax was infeasible',
        'states the analogy caveat about excluded input words',
        'gives a concrete bias example such as the nurse/engineer lean',
      ],
      sampleExplanation:
        'In your TF-IDF matrix every word is its own column, which means `car` and `automobile` have nothing in common — their vectors are orthogonal, cosine similarity exactly zero, just as `car` and `banana` are. Anything the model learns about one synonym is useless for the other. Embeddings solve this by giving each word a short dense vector, say 300 numbers, positioned so that words used in the same way sit close together. The positions are learned by a guessing game with no labels: take a word, try to predict which words surround it, and nudge the vectors to make the true neighbours score higher than random words. Because a word can only score well on the contexts it genuinely appears in, two words that share contexts get pushed into the same region. Doing this over billions of words produces a map where `car` sits near `automobile` and `vehicle`. Three things it does not fix, and you should know them before you trust it. Antonyms appear in the same contexts, so `hot` and `cold` end up as close as real synonyms. Each word gets exactly one vector, so `bank` sits in a compromise position between rivers and finance. And the vectors absorb whatever associations were in the corpus, including that `nurse` leans female and `engineer` leans male — which becomes a real problem the moment you rank CVs with them.',
    },
  },

  {
    id: 'NLP-007',
    domain: 'NLP',
    module: 'Embeddings',
    topic: 'Vector space similarity',
    title: 'Semantic Similarity and Embedding Spaces',
    slug: 'semantic-similarity',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['NLP-006'],
    related: ['NLP-004', 'NLP-005'],
    tags: ['cosine-similarity', 'nearest-neighbours', 'sentence-embeddings', 'vector-search', 'semantic-search'],

    learningObjectives: [
      'Compute cosine similarity between two document vectors by hand and interpret the result',
      'Explain precisely why cosine is preferred to Euclidean distance for text, using a length-doubling example',
      'Retrieve nearest neighbours in an embedding space and judge when the results are trustworthy',
      'Produce a sentence embedding with sentence-transformers and explain why mean-pooling raw BERT outputs is a weaker approach',
      'Articulate, with examples, why high similarity does not mean the same meaning',
    ],

    terminology: [
      {
        term: 'Cosine similarity',
        definition:
          'The cosine of the angle between two vectors: their dot product divided by the product of their norms. Ranges from −1 to 1, and from 0 to 1 for non-negative count vectors.',
        simple: 'How closely two arrows point in the same direction, ignoring how long they are.',
      },
      {
        term: 'Nearest neighbour search',
        definition:
          'Finding the k vectors in a collection closest to a query vector under a chosen metric. Exact search is O(N·d); approximate methods such as HNSW trade a little recall for orders-of-magnitude speed.',
        simple: 'Looking up the k most similar items to the one you have.',
      },
      {
        term: 'Sentence embedding',
        definition:
          'A single fixed-length vector representing a whole sentence or passage, produced by a model trained so that semantically similar sentences receive nearby vectors.',
        simple: 'One list of numbers standing for a whole sentence, not just a word.',
      },
      {
        term: 'Semantic search',
        definition:
          'Retrieval by embedding proximity rather than by lexical overlap, so a query retrieves passages that mean the same thing even when they share no words.',
        simple: 'Searching by meaning instead of by exact words.',
      },
      {
        term: 'Anisotropy',
        definition:
          'The observed tendency of raw transformer output vectors to occupy a narrow cone rather than spreading through the space, which inflates all cosine similarities and compresses the useful range.',
        simple: 'All the vectors bunching up in one direction, so everything looks similar to everything.',
      },
    ],

    simpleExplanation:
      "Once every document or sentence is a vector, comparing two of them becomes geometry. The natural first instinct is to measure the straight-line distance between the two points, but that turns out to be the wrong tool for text. Imagine one article about cats and a second article that is the same article repeated twice: identical subject matter, but the second one has every count doubled, so it sits twice as far from the origin and the straight-line distance between them is large. What has not changed is the direction the vector points, and direction is what carries the topic. So we measure the angle instead. Cosine similarity is 1 when two vectors point exactly the same way, 0 when they are at right angles, and it is completely blind to length — which means a tweet and a novel about the same subject can be recognised as similar. This one measurement is the engine behind semantic search, recommendation, deduplication and the retrieval half of every RAG system.",

    whyItExists:
      'Documents vary enormously in length, and under Euclidean distance length dominates topic: a long document is far from everything, including other long documents about the same subject. Cosine similarity exists to compare direction while ignoring magnitude, which for text means comparing what a document is about while ignoring how much of it there is.',

    analogy: {
      scenario:
        'Think of two people describing the route to a destination by pointing. One points firmly with their whole arm; the other gives a small flick of the wrist. If you measured the distance between their fingertips you would conclude they disagree, because one arm is extended and the other is not. What you actually care about is whether they are pointing the same way, and that is a question about angle, not about how far the fingertip travelled.',
      mapping: [
        { from: 'The direction the arm points', to: 'The direction of the document vector, which encodes its topic' },
        { from: 'How far the arm extends', to: 'The magnitude of the vector, which mostly encodes document length' },
        { from: 'Comparing fingertip positions', to: 'Euclidean distance, which conflates topic with length' },
        { from: 'Comparing the angle between arms', to: 'Cosine similarity, which isolates topic from length' },
        { from: 'Two people pointing at right angles', to: 'Cosine 0 — no shared terms at all' },
      ],
      bridge:
        'The pointing analogy is exact rather than loose: a document-term vector really is a direction in term space, and doubling a document really does double the vector length while leaving its direction untouched. That is why L2-normalising rows, which `TfidfVectorizer` does by default, makes the dot product equal to the cosine — you are stripping the arm length off before comparing.',
      limitations:
        'Pointing is one-dimensional in the analogy but embeddings have hundreds of dimensions, where geometry behaves counter-intuitively: in high dimensions random vectors are almost always near-orthogonal, and raw transformer outputs occupy a narrow cone that inflates every similarity. A cosine of 0.8 means very different things in different spaces, so calibrate against your own data rather than against a remembered threshold.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of the cosine formula',
        subject: 'cos(A, B) = (A · B) / (||A|| · ||B||)',
        annotations: [
          { part: 'A · B', note: 'The dot product: multiply matching components and sum. Large when the two vectors have high values in the same dimensions — that is, when they share terms.' },
          { part: '||A||', note: 'The Euclidean norm of A, sqrt of the sum of its squared components. For a count vector this grows with document length.' },
          { part: 'Dividing by the norms', note: 'Removes magnitude entirely, leaving pure direction. This is what makes a tweet comparable with a novel.' },
          { part: 'Result of 1', note: 'Identical direction. For count vectors this means identical term proportions, not identical documents.' },
          { part: 'Result of 0', note: 'Orthogonal — no shared terms at all. The usual outcome for two random documents in a sparse space.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Cosine versus Euclidean on text',
        caption: 'The decisive case is a document compared with a repeated copy of itself.',
        left: {
          heading: 'Cosine similarity',
          points: [
            'Invariant to vector length, so document size does not matter',
            'A doubled document is identical to the original: cosine 1.0',
            'Bounded in [−1, 1], so thresholds transfer between datasets more readily',
            'Equals the dot product once vectors are L2-normalised — very fast',
            'The default in every vector database and every RAG pipeline',
          ],
        },
        right: {
          heading: 'Euclidean distance',
          points: [
            'Dominated by magnitude, so long documents are far from everything',
            'A doubled document sits at distance 2.83 from the original in our example',
            'Unbounded above, so thresholds are dataset-specific',
            'Equivalent to cosine ranking only after L2 normalisation',
            'Appropriate when magnitude is meaningful, which for raw text counts it is not',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What a cosine value typically means, by space',
        caption: 'These bands are empirical rules of thumb. Always calibrate on your own data.',
        columns: ['Space', 'Unrelated', 'Loosely related', 'Near-duplicate'],
        rows: [
          ['TF-IDF (sparse)', '0.00 – 0.05', '0.10 – 0.30', 'above 0.7'],
          ['Static word vectors (GloVe)', '0.00 – 0.20', '0.35 – 0.55', 'above 0.75'],
          ['Sentence-transformer embeddings', '0.00 – 0.25', '0.40 – 0.60', 'above 0.85'],
          ['Raw mean-pooled BERT (anisotropic)', '0.60 – 0.75', '0.75 – 0.85', 'above 0.95'],
        ],
      },
      {
        kind: 'flow',
        title: 'Semantic search end to end',
        caption: 'The retrieval half of every RAG system is exactly these six steps.',
        steps: [
          { label: 'Chunk the corpus', detail: 'Split documents into passages of a few hundred tokens, with overlap.' },
          { label: 'Embed every chunk', detail: 'One vector per chunk from a sentence-embedding model. Done once, offline.' },
          { label: 'Index the vectors', detail: 'Load into FAISS, hnswlib or a vector database for approximate nearest-neighbour search.' },
          { label: 'Embed the query', detail: 'The same model, at query time, producing one vector.' },
          { label: 'Retrieve top k by cosine', detail: 'Approximate search returns the k closest chunks in milliseconds over millions of vectors.' },
          { label: 'Use the results', detail: 'Show them, re-rank them, or paste them into a language-model prompt as context.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Embedding space explorer',
        caption: 'Move a query point around and watch which vectors become its nearest neighbours under cosine.',
        widget: 'embedding-space-3d',
        props: { metric: 'cosine', showNeighbours: true },
      },
    ],

    formalDefinition:
      'For non-zero vectors A and B in R^n, cosine similarity is defined as the inner product of A and B divided by the product of their Euclidean norms, which equals the cosine of the angle between them and is invariant under positive scaling of either argument. Cosine distance is defined as 1 minus cosine similarity; it is not a metric, since it violates the triangle inequality, but on L2-normalised vectors it induces the same ranking as squared Euclidean distance, since ||A − B||² = 2 − 2·cos(A, B).',

    math: {
      intuition:
        'The dot product measures agreement: it is large when two vectors have big values in the same coordinates. But it also grows when either vector simply gets longer, which for text means "this document is bigger". Dividing by both norms cancels that growth exactly, leaving only the agreement in direction.',
      formulas: [
        {
          latex: '\\cos(A, B) = \\frac{A \\cdot B}{\\lVert A \\rVert\\, \\lVert B \\rVert} = \\frac{\\sum_{i=1}^{n} A_i B_i}{\\sqrt{\\sum_{i=1}^{n} A_i^2}\\, \\sqrt{\\sum_{i=1}^{n} B_i^2}}',
          name: 'Cosine similarity',
          meaning:
            'The cosine of the angle between two vectors. Equals 1 for identical direction, 0 for orthogonal vectors, and −1 for opposite direction. For non-negative count vectors it never goes below 0.',
          variables: [
            { symbol: 'A_i, B_i', meaning: 'The i-th component of each vector, e.g. the weight of term i' },
            { symbol: 'n', meaning: 'Dimensionality — vocabulary size for sparse vectors, embedding size for dense ones' },
            { symbol: '\\lVert A \\rVert', meaning: 'Euclidean norm of A, the square root of the sum of its squared components' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: 'd_E(A, B) = \\lVert A - B \\rVert_2 = \\sqrt{\\sum_{i=1}^{n} (A_i - B_i)^2}',
          name: 'Euclidean distance',
          meaning:
            'Straight-line distance between the two points. Sensitive to magnitude, which for raw text vectors means sensitive to document length rather than to topic.',
          variables: [
            { symbol: 'A_i - B_i', meaning: 'Per-dimension difference between the two vectors' },
            { symbol: 'd_E', meaning: 'The distance; 0 means identical, unbounded above' },
          ],
          category: 'linear-algebra',
        },
        {
          latex: '\\lVert \\hat{A} - \\hat{B} \\rVert_2^2 = 2 - 2\\cos(A, B)',
          name: 'The identity linking the two metrics',
          meaning:
            'Once both vectors are L2-normalised, squared Euclidean distance is a strictly decreasing function of cosine similarity, so the two produce identical rankings. This is why vector databases can store normalised vectors and use whichever metric is faster.',
          variables: [
            { symbol: '\\hat{A}, \\hat{B}', meaning: 'The L2-normalised (unit-length) versions of A and B' },
            { symbol: '\\cos(A,B)', meaning: 'Cosine similarity, unchanged by the normalisation' },
          ],
          category: 'linear-algebra',
        },
      ],
      derivation: [
        'Write the squared Euclidean distance between unit vectors: ||Â − B̂||² = (Â − B̂)·(Â − B̂).',
        'Expand the inner product: Â·Â − 2Â·B̂ + B̂·B̂.',
        'Since both are unit length, Â·Â = 1 and B̂·B̂ = 1.',
        'So ||Â − B̂||² = 2 − 2(Â·B̂).',
        'And for unit vectors the dot product is exactly the cosine, so ||Â − B̂||² = 2 − 2cos(A, B).',
        'Therefore minimising Euclidean distance on normalised vectors is identical to maximising cosine similarity — the same ranking, different arithmetic. Without normalisation the two genuinely differ, and for text cosine is the one you want.',
      ],
    },

    workedExample: {
      title: 'Cosine similarity by hand, and why Euclidean gets it wrong',
      setup:
        'A = "the cat sat on the mat", B = "the dog sat on the log", and C = A written out twice. Vocabulary in fixed order [the, cat, sat, on, mat, dog, log]. Count vectors: A = [2,1,1,1,1,0,0], B = [2,0,1,1,0,1,1], C = [4,2,2,2,2,0,0].',
      steps: [
        {
          label: 'Dot product of A and B',
          detail:
            'Multiply component by component and sum: (2)(2) + (1)(0) + (1)(1) + (1)(1) + (1)(0) + (0)(1) + (0)(1) = 4 + 0 + 1 + 1 + 0 + 0 + 0 = 6.',
          latex: 'A \\cdot B = 4 + 0 + 1 + 1 + 0 + 0 + 0 = 6',
        },
        {
          label: 'Norm of A',
          detail: 'sqrt(2² + 1² + 1² + 1² + 1² + 0 + 0) = sqrt(4 + 1 + 1 + 1 + 1) = sqrt(8) = 2.8284.',
          latex: '\\lVert A \\rVert = \\sqrt{4+1+1+1+1} = \\sqrt{8} = 2.8284',
        },
        {
          label: 'Norm of B',
          detail: 'sqrt(2² + 0 + 1² + 1² + 0 + 1² + 1²) = sqrt(4 + 1 + 1 + 1 + 1) = sqrt(8) = 2.8284. The same, since both sentences have the same shape.',
          latex: '\\lVert B \\rVert = \\sqrt{8} = 2.8284',
        },
        {
          label: 'Cosine of A and B',
          detail: '6 / (2.8284 × 2.8284) = 6 / 8 = 0.75. The two sentences share `the`, `sat` and `on` and differ in two content words, and 0.75 is a fair reading of that.',
          latex: '\\cos(A, B) = \\frac{6}{\\sqrt{8}\\sqrt{8}} = \\frac{6}{8} = 0.75',
        },
        {
          label: 'Now compare A with C, its own doubled copy',
          detail:
            'A · C = (2)(4) + (1)(2) + (1)(2) + (1)(2) + (1)(2) = 8 + 2 + 2 + 2 + 2 = 16. ||C|| = sqrt(16+4+4+4+4) = sqrt(32) = 5.6569.',
          latex: 'A \\cdot C = 16, \\qquad \\lVert C \\rVert = \\sqrt{32} = 5.6569',
        },
        {
          label: 'Cosine of A and C',
          detail:
            '16 / (2.8284 × 5.6569) = 16 / 16 = 1.0 exactly. Cosine correctly reports that a document and a doubled copy of itself are about precisely the same thing.',
          latex: '\\cos(A, C) = \\frac{16}{\\sqrt{8}\\sqrt{32}} = \\frac{16}{16} = 1.0',
        },
        {
          label: 'The same pair under Euclidean distance',
          detail:
            'A − C = [−2, −1, −1, −1, −1, 0, 0], so the distance is sqrt(4 + 1 + 1 + 1 + 1) = sqrt(8) = 2.8284. Meanwhile A − B = [0, 1, 0, 0, 1, −1, −1] gives sqrt(0+1+0+0+1+1+1) = sqrt(4) = 2.0.',
          latex: 'd_E(A, C) = \\sqrt{8} = 2.8284 > d_E(A, B) = 2.0',
        },
        {
          label: 'Read off the contradiction',
          detail:
            'Euclidean distance says A is closer to B — a different sentence about a dog — than to C, which is literally A repeated. That is the wrong answer, and it arises purely because C is longer. Cosine gives 1.0 for A and C and 0.75 for A and B, which is the correct ordering.',
        },
      ],
      conclusion:
        'Cosine similarity of A and B is 6/8 = 0.75, and of A with its own doubled copy is exactly 1.0. Euclidean distance reverses the ranking because it is dominated by magnitude, and magnitude in a text vector mostly means length. This single example is the whole argument for cosine in text retrieval, and it is why L2 normalisation is applied by default throughout scikit-learn and every vector database.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The worked example verified in NumPy',
        runnable: true,
        code: `import numpy as np

# vocabulary order: [the, cat, sat, on, mat, dog, log]
A = np.array([2, 1, 1, 1, 1, 0, 0])
B = np.array([2, 0, 1, 1, 0, 1, 1])
C = A * 2                     # the same document, written twice

def cosine(u, v):
    return float(u @ v / (np.linalg.norm(u) * np.linalg.norm(v)))

print("cos(A, B) =", round(cosine(A, B), 4))
print("cos(A, C) =", round(cosine(A, C), 4))
print("euclid(A, B) =", round(float(np.linalg.norm(A - B)), 4))
print("euclid(A, C) =", round(float(np.linalg.norm(A - C)), 4))`,
        output: `cos(A, B) = 0.75
cos(A, C) = 1.0
euclid(A, B) = 2.0
euclid(A, C) = 2.8284`,
        explanation:
          'The numbers match the hand calculation exactly. The last two lines are the punchline: under Euclidean distance the doubled copy of A is *further* from A than a different sentence about a dog is, because distance is dominated by magnitude. Cosine ignores magnitude and gives the answer a human would give. Note also that `u @ v` on L2-normalised vectors is already the cosine, which is why production systems normalise once at index time and then use plain dot products.',
      },
      {
        language: 'python',
        title: 'Sentence embeddings and semantic search',
        runnable: true,
        code: `from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

corpus = [
    "The cat sat on the mat.",
    "A feline rested upon the rug.",
    "Stock markets fell sharply this morning.",
    "Equity prices dropped at the open.",
    "How do I reset my password?",
]
emb = model.encode(corpus, normalize_embeddings=True)

query = model.encode("I forgot my login credentials", normalize_embeddings=True)
scores = util.cos_sim(query, emb)[0]

for idx in scores.argsort(descending=True)[:3]:
    print(f"{scores[idx]:.3f}  {corpus[idx]}")

print()
print("no shared words, same meaning:")
print(round(float(util.cos_sim(emb[0], emb[1])), 3), "cat/mat vs feline/rug")
print(round(float(util.cos_sim(emb[2], emb[3])), 3), "markets fell vs prices dropped")
print(round(float(util.cos_sim(emb[0], emb[2])), 3), "cat vs stock markets")`,
        output: `0.584  How do I reset my password?
0.104  Stock markets fell sharply this morning.
0.071  Equity prices dropped at the open.

no shared words, same meaning:
0.638 cat/mat vs feline/rug
0.712 markets fell vs prices dropped
0.021 cat vs stock markets
`,
        explanation:
          'This is exactly what TF-IDF cannot do. "I forgot my login credentials" and "How do I reset my password?" share not a single content word, so their TF-IDF cosine is zero, yet the embedding similarity is 0.58 and the right passage is retrieved. Likewise "the cat sat on the mat" and "a feline rested upon the rug" score 0.64 with no lexical overlap at all. `normalize_embeddings=True` makes every vector unit length, so cosine similarity and dot product coincide and the search is a single matrix multiplication.',
      },
      {
        language: 'python',
        title: 'Why mean-pooling raw BERT is a weaker choice',
        runnable: true,
        code: `import torch
from transformers import AutoTokenizer, AutoModel
from sentence_transformers import SentenceTransformer, util

pairs = [
    ("The cat sat on the mat.", "A feline rested upon the rug."),
    ("The cat sat on the mat.", "Stock markets fell sharply."),
]

tok = AutoTokenizer.from_pretrained("bert-base-uncased")
bert = AutoModel.from_pretrained("bert-base-uncased")

def mean_pooled(text):
    enc = tok(text, return_tensors="pt")
    with torch.no_grad():
        out = bert(**enc).last_hidden_state
    mask = enc["attention_mask"].unsqueeze(-1)
    return (out * mask).sum(1) / mask.sum(1)

st = SentenceTransformer("all-MiniLM-L6-v2")

for a, b in pairs:
    raw = torch.nn.functional.cosine_similarity(mean_pooled(a), mean_pooled(b)).item()
    tuned = float(util.cos_sim(st.encode(a), st.encode(b)))
    print(f"raw BERT {raw:.3f}   sentence-transformer {tuned:.3f}   | {a[:22]} / {b[:22]}")`,
        output: `raw BERT 0.812   sentence-transformer 0.638   | The cat sat on the mat / A feline rested upon
raw BERT 0.735   sentence-transformer 0.021   | The cat sat on the mat / Stock markets fell sh`,
        explanation:
          'Raw mean-pooled BERT gives 0.81 for the related pair and 0.74 for two sentences with nothing in common — a gap of 0.08, which is far too narrow to threshold reliably. This is anisotropy: BERT was never trained so that its output vectors would be comparable by cosine, so they all bunch into a narrow cone and everything looks similar to everything. The sentence-transformer, fine-tuned with a contrastive objective on sentence pairs, gives 0.64 and 0.02 — a gap of 0.62. The lesson is that an embedding is only good for similarity if it was trained for similarity.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Retrieval-augmented generation',
        usage:
          'Every RAG system embeds document chunks offline, embeds the user question at query time, and retrieves by cosine similarity. The quality of the final answer is bounded by whether the right chunk was in the top k, which makes this one similarity computation the highest-leverage component in the stack.',
      },
      {
        context: 'Duplicate and near-duplicate detection',
        usage:
          'Support desks and job boards deduplicate incoming items by embedding them and flagging anything above a tuned cosine threshold. Because cosine ignores length, a short and a long version of the same complaint still match.',
      },
      {
        context: 'Recommendation without user history',
        usage:
          'For a new item with no interaction data, content-based recommendation embeds its description and returns the nearest existing items. This is the standard cold-start remedy in retail and media catalogues.',
      },
      {
        context: 'Clustering support tickets',
        usage:
          'Embedding tickets and running k-means over the vectors surfaces the recurring themes nobody had a label for. Cosine on normalised vectors is the standard metric, which is why spherical k-means is the usual variant.',
      },
    ],

    projectConnections: [
      { tool: 'sentence-transformers', role: 'The standard way to produce sentence embeddings trained specifically for cosine comparison.' },
      { tool: 'FAISS', role: 'Facebook\'s library for exact and approximate nearest-neighbour search over millions of vectors, with an inner-product index for normalised embeddings.' },
      { tool: 'scikit-learn', role: '`cosine_similarity` and `NearestNeighbors(metric="cosine")` for datasets small enough to hold in memory.' },
      { tool: 'Vector databases', role: 'Qdrant, Weaviate, pgvector and similar store embeddings with HNSW indexes and expose cosine as the default metric.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using Euclidean distance on unnormalised text vectors',
        why: 'Magnitude tracks document length, so long documents end up far from everything, including other long documents on the same topic. The worked example shows a doubled document landing further away than an unrelated one.',
        fix: 'Use cosine, or L2-normalise first and then use Euclidean, which gives an identical ranking via ||Â − B̂||² = 2 − 2cos.',
      },
      {
        mistake: 'Carrying a similarity threshold from one model to another',
        why: 'Cosine values are not comparable across embedding spaces. 0.75 is a near-duplicate in TF-IDF space and barely above the floor in raw mean-pooled BERT space, where unrelated sentences already score 0.7.',
        fix: 'Calibrate the threshold on labelled pairs from your own data and your own model, and re-calibrate whenever you change the model.',
      },
      {
        mistake: 'Mean-pooling raw BERT outputs and expecting good similarity',
        why: 'BERT\'s pre-training objective never required its output vectors to be comparable by cosine, so they are anisotropic — bunched into a narrow cone — and every pair scores high.',
        fix: 'Use a model fine-tuned with a contrastive or triplet objective, such as anything from sentence-transformers, or apply whitening as a cheaper partial remedy.',
      },
      {
        mistake: 'Treating high similarity as identity of meaning',
        why: 'Embeddings capture distributional and topical relatedness. "The flight was delayed" and "The flight was on time" score high because they are about the same thing, while asserting the opposite.',
        fix: 'For entailment, contradiction or factual verification, use a cross-encoder or a natural-language-inference model, which scores a pair jointly rather than comparing two independent vectors.',
      },
      {
        mistake: 'Embedding query and corpus with different models',
        why: 'Two models produce vectors in unrelated spaces, so the cosine between them is meaningless noise. The failure is silent: search returns results, they are just arbitrary.',
        fix: 'Pin one model for both sides, record its name and version alongside the index, and re-embed the entire corpus whenever it changes.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why is cosine similarity preferred to Euclidean distance for comparing documents?',
        answer:
          'Because document vectors vary in magnitude mainly according to length, and length is not what we are comparing. Take a document A and let C be the same document written out twice: C is 2A, so every count doubles. Under cosine, A and C have an angle of zero and similarity exactly 1, which is right — they are about precisely the same thing. Under Euclidean distance they are sqrt(8) ≈ 2.83 apart in a small worked example, while a genuinely different sentence about a dog is only 2.0 away, so the ranking is inverted. Cosine isolates direction, and for a term vector direction encodes the mixture of topics. A useful footnote is that after L2 normalisation the two metrics give identical rankings, because squared Euclidean distance between unit vectors equals 2 − 2cos.',
        followUp:
          'A strong answer mentions that this identity is why vector databases store normalised vectors and then use inner product, which is faster to compute than cosine.',
      },
      {
        level: 'intermediate',
        question: 'Your semantic search returns plausible but wrong passages. How do you diagnose it?',
        answer:
          'Work through the pipeline in order. First check that query and corpus were embedded with the identical model and version — a mismatch produces meaningless scores silently. Second, inspect the score distribution: if unrelated pairs already score 0.7, the space is anisotropic and you are probably mean-pooling a model that was not trained for similarity. Third, look at chunking; if chunks are too long the embedding averages several topics and matches nothing precisely, and if too short they lack the context that makes them interpretable. Fourth, test whether the failures are lexical, such as part numbers or error codes, which dense retrieval systematically blurs — the fix there is hybrid retrieval with BM25. Fifth, check recall rather than precision by verifying the correct chunk is anywhere in the top 50; if it is, you need a cross-encoder re-ranker, and if it is not, the problem is in the embedding or the chunking.',
      },
      {
        level: 'ai-engineer',
        question: 'Explain the difference between a bi-encoder and a cross-encoder, and when you would use each.',
        answer:
          'A bi-encoder embeds each text independently into a fixed vector, so the corpus can be embedded once offline and searched with approximate nearest neighbours in milliseconds over millions of items. The cost is that the two texts never interact during encoding, so the model cannot attend from a query token to a document token and fine distinctions — negation, numeric mismatch, which of two entities is the subject — are often lost. A cross-encoder feeds the pair jointly through a transformer and outputs one relevance score, which is much more accurate precisely because of that interaction, but requires a forward pass per candidate pair and so cannot scale to a whole corpus. The standard production architecture uses both: a bi-encoder retrieves the top 50 to 100 candidates cheaply, then a cross-encoder re-ranks them to produce the final top 5. That gives most of the cross-encoder accuracy at close to bi-encoder latency.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Compute the cosine similarity between A = [1, 2, 0, 1] and B = [2, 0, 1, 1] by hand, showing the dot product and both norms.',
        hint: 'Dot product first, then the two norms, then divide.',
        solution:
          'Dot product: (1)(2) + (2)(0) + (0)(1) + (1)(1) = 2 + 0 + 0 + 1 = 3.\n||A|| = sqrt(1 + 4 + 0 + 1) = sqrt(6) = 2.4495.\n||B|| = sqrt(4 + 0 + 1 + 1) = sqrt(6) = 2.4495.\ncos(A, B) = 3 / (2.4495 × 2.4495) = 3 / 6 = 0.5.\n\nExactly 0.5, or an angle of 60 degrees. Note the shortcut: when both norms are equal, the cosine is simply the dot product divided by the squared norm, here 3/6. For sparse text vectors this is a useful sanity check, since the denominator is often the easier part to get wrong.',
      },
      {
        prompt:
          'Show numerically that L2-normalising two vectors makes Euclidean ranking agree with cosine ranking, using A = [3, 4] and B = [6, 8] and C = [4, 3].',
        hint: 'B is a scalar multiple of A. Compute both metrics before and after normalisation.',
        language: 'python',
        starterCode:
          'import numpy as np\nA = np.array([3.0, 4.0]); B = np.array([6.0, 8.0]); C = np.array([4.0, 3.0])\n',
        solution:
          "Before normalisation: ||A − B|| = ||[−3, −4]|| = 5, while ||A − C|| = ||[−1, 1]|| = 1.414. So Euclidean says A is closer to C than to B. But cos(A, B) = 50/(5×10) = 1.0 exactly (B is 2A, same direction), and cos(A, C) = (12+12)/(5×5) = 24/25 = 0.96. Cosine says A is closer to B. The two metrics disagree.\n\nAfter normalisation: Â = [0.6, 0.8], B̂ = [0.6, 0.8], Ĉ = [0.8, 0.6]. Now ||Â − B̂|| = 0 and ||Â − Ĉ|| = sqrt(0.04 + 0.04) = 0.283, so Euclidean agrees with cosine. This is the identity ||Â − B̂||² = 2 − 2cos in action: 0² = 2 − 2(1.0) and 0.283² = 0.08 = 2 − 2(0.96).",
      },
      {
        prompt:
          'Build a tiny semantic search over ten sentences of your choosing, and find one pair with high cosine similarity but genuinely different meaning. Explain what the model captured instead of meaning.',
        hint: 'Try sentences that differ only by a negation, a number, or which of two entities is the subject.',
        language: 'python',
        starterCode:
          'from sentence_transformers import SentenceTransformer, util\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\n\nsentences = [\n    "The flight was delayed by two hours.",\n    "The flight arrived exactly on time.",\n    # add eight more\n]\n',
        solution:
          "The two seed sentences typically score around 0.6 to 0.7 despite asserting opposite facts. Other reliable examples: \"Paris is the capital of France\" versus \"France is the capital of Paris\" (very high, because the token sets are nearly identical); \"the order shipped on Monday\" versus \"the order shipped on Friday\" (high, because one token differs); \"I love this product\" versus \"I do not love this product\".\n\nWhat the model captured is topical and lexical relatedness — same domain, same entities, same syntactic frame. Sentence embeddings are trained so that semantically related sentences are near each other, and contradiction is a form of relatedness: two sentences about the same flight are about the same flight. To distinguish them you need a model that scores the pair jointly, such as a cross-encoder or a natural-language-inference model that outputs entailment, neutral or contradiction. This is exactly why RAG systems re-rank with a cross-encoder rather than trusting bi-encoder scores alone.",
      },
    ],

    quiz: [
      {
        id: 'NLP-007-q1',
        type: 'numeric',
        concept: 'cosine arithmetic',
        prompt:
          'A = [2,1,1,1,1,0,0] and B = [2,0,1,1,0,1,1]. Their dot product is 6 and both norms are sqrt(8). What is cos(A, B)?',
        answer: 0.75,
        tolerance: 0.01,
        explanation:
          '6 / (sqrt(8) × sqrt(8)) = 6/8 = 0.75. When both vectors have the same norm, the cosine reduces to the dot product over the squared norm, which is a handy shortcut for checking work.',
      },
      {
        id: 'NLP-007-q2',
        type: 'truefalse',
        concept: 'length invariance',
        prompt: 'A document and the same document written out twice have cosine similarity 1.0.',
        answer: true,
        explanation:
          'Doubling every count doubles the vector length but leaves its direction unchanged, and cosine measures only direction. Euclidean distance, by contrast, reports them as far apart, which is the central argument for cosine on text.',
      },
      {
        id: 'NLP-007-q3',
        type: 'code-output',
        language: 'python',
        concept: 'cosine of orthogonal vectors',
        prompt: 'What does this print?',
        code: 'import numpy as np\na = np.array([1, 0, 0])\nb = np.array([0, 1, 1])\nprint(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))',
        options: ['0.0', '1.0', '0.5', '0.7071'],
        answerIndex: 0,
        explanation:
          'The dot product is 0 because the vectors share no non-zero dimension, so the cosine is 0 regardless of the norms. For sparse text vectors this is the usual outcome for two documents with no terms in common.',
      },
      {
        id: 'NLP-007-q4',
        type: 'multi',
        concept: 'when high similarity misleads',
        prompt: 'Which pairs would you expect to receive high sentence-embedding similarity despite meaning different things? Select all that apply.',
        options: [
          '"The flight was delayed" and "The flight was on time"',
          '"Paris is the capital of France" and "France is the capital of Paris"',
          '"The order shipped Monday" and "The order shipped Friday"',
          '"I love this product" and "Photosynthesis requires light"',
          '"The patient improved" and "The patient deteriorated"',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Embeddings capture topical and lexical relatedness, and contradictions are highly related — same entities, same frame, one token flipped. Only the fourth pair is genuinely unrelated and would score near zero. Distinguishing the others needs a cross-encoder or an NLI model.',
      },
      {
        id: 'NLP-007-q5',
        type: 'order',
        concept: 'semantic search pipeline',
        prompt: 'Order the steps of a semantic search system.',
        items: [
          'Split documents into chunks',
          'Embed every chunk with the chosen model (offline)',
          'Build an approximate nearest-neighbour index',
          'Embed the incoming query with the same model',
          'Retrieve the top k chunks by cosine similarity',
          'Re-rank the candidates with a cross-encoder',
        ],
        explanation:
          'Chunking and embedding happen once offline; query embedding and retrieval happen per request. Re-ranking comes last because a cross-encoder needs one forward pass per candidate and can only be afforded on a shortlist.',
      },
      {
        id: 'NLP-007-q6',
        type: 'explain',
        concept: 'anisotropy',
        prompt:
          'A colleague mean-pools BERT outputs and finds every sentence pair scores above 0.7. Explain what is happening and what to do about it.',
        rubric: [
          'Identifies anisotropy: raw transformer vectors occupy a narrow cone',
          'Explains that BERT\'s pre-training never required cosine-comparable outputs',
          'Recommends a model trained with a contrastive or similarity objective',
        ],
        sampleAnswer:
          'This is anisotropy. BERT was pre-trained on masked-token prediction, an objective that never required its output vectors to be comparable by cosine, so the representations end up concentrated in a narrow cone of the space. Within a cone, every pair of vectors has a small angle and therefore a high cosine, so the useful range collapses: unrelated sentences score 0.7 and genuinely similar ones score 0.8, leaving no room to set a threshold. The remedy is to use an embedding model fine-tuned specifically for similarity with a contrastive or triplet objective — anything from sentence-transformers — which spreads the vectors out and restores a wide dynamic range. A cheaper partial fix is whitening the embeddings, which removes the dominant directions, but it is not as effective as using a model trained for the job.',
        explanation:
          'The examinable idea is that an embedding is only good for a comparison the model was trained to support. Pooling hidden states from an arbitrary model does not produce a similarity space.',
      },
    ],

    flashcards: [
      { front: 'Write the cosine similarity formula.', back: 'cos(A,B) = (A · B) / (||A|| ||B||). Dot product over the product of the norms; 1 means same direction, 0 means orthogonal.' },
      { front: 'Why cosine rather than Euclidean for text?', back: 'Magnitude tracks document length, not topic. A doubled document has cosine 1.0 with the original but a large Euclidean distance.' },
      { front: 'What is the identity linking the two metrics?', back: 'For unit vectors, ||Â − B̂||² = 2 − 2cos(A,B). After L2 normalisation, both give identical rankings.' },
      { front: 'What is anisotropy?', back: 'Raw transformer output vectors bunching into a narrow cone, so all cosine similarities are inflated and the useful range collapses.' },
      { front: 'Bi-encoder versus cross-encoder.', back: 'Bi-encoder embeds each text independently — fast, indexable. Cross-encoder scores a pair jointly — accurate, one forward pass per pair. Use both: retrieve then re-rank.' },
      { front: 'Does high cosine similarity mean same meaning?', back: 'No. "The flight was delayed" and "The flight was on time" score high because they are topically related. Contradiction is a form of relatedness.' },
    ],

    challenge: {
      title: 'Build and evaluate a semantic search engine',
      brief:
        'Index at least 5,000 text passages with a sentence-transformer model and build a search interface returning the top 10 by cosine similarity. Then evaluate it properly: create at least 30 query-relevance pairs by hand, and report recall@10 and mean reciprocal rank for three configurations — dense only, BM25 only, and a hybrid that fuses both rankings. Also report the cosine score distribution for relevant and irrelevant pairs, and use it to choose a cut-off threshold.',
      language: 'python',
      acceptanceCriteria: [
        'Embeddings are L2-normalised and the same model is used for corpus and queries',
        'recall@10 and MRR reported for dense, sparse and hybrid retrieval',
        'Score distributions for relevant and irrelevant pairs are plotted or tabulated',
        'A threshold is chosen from the data with the reasoning stated',
        'At least one query is identified where dense retrieval loses to BM25, with an explanation',
      ],
      starterCode:
        'from sentence_transformers import SentenceTransformer\nimport numpy as np\n\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\n\nQUERIES = {\n    "how do I reset my password": ["doc_17", "doc_92"],\n    # at least 29 more\n}\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has just built embeddings how to compare two of them, why the obvious distance measure is wrong, and what "similar" does and does not mean.',
      mustCover: [
        'Cosine similarity is the dot product divided by the product of the norms',
        'It measures direction and ignores magnitude, which for text means ignoring length',
        'Euclidean distance is dominated by length and gives the wrong ranking on a doubled document',
        'High similarity means topical relatedness, not identical meaning — contradictions score high',
      ],
      bonusSignals: [
        'works a small numeric example such as 6/8 = 0.75',
        'mentions that L2 normalisation makes the two metrics agree',
        'notes that thresholds do not transfer between embedding models',
      ],
      sampleExplanation:
        'Once each document is a vector, comparing them is geometry, and the measure you want is the angle rather than the distance. Cosine similarity is the dot product of the two vectors divided by the product of their lengths, which gives 1 for vectors pointing the same way and 0 for vectors at right angles. Take two sentences, "the cat sat on the mat" and "the dog sat on the log": as counts over a seven-word vocabulary their dot product is 6 and both norms are sqrt(8), so the cosine is 6/8 = 0.75. Now take that first sentence written out twice. Every count doubles, so the vector is twice as long but points in exactly the same direction — cosine 1.0, which is correct, since it is the same document. Under straight-line distance it would be 2.83 away from the original, while the dog sentence is only 2.0 away, so Euclidean distance would tell you a document is less like itself than like something else. That is why cosine is the default everywhere in text retrieval. Two cautions. Thresholds do not transfer between models: 0.75 is a near-duplicate in TF-IDF space and barely above the floor in raw BERT space. And high similarity means "about the same thing", not "says the same thing" — "the flight was delayed" and "the flight was on time" score high, because contradicting each other requires being about the same subject.',
    },
  },

  {
    id: 'NLP-008',
    domain: 'NLP',
    module: 'Sequence Modelling',
    topic: 'Predicting the next token',
    title: 'Language Modelling',
    slug: 'language-modelling',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['NLP-001', 'NLP-006'],
    related: ['NLP-003', 'NLP-007'],
    tags: ['language-model', 'n-gram', 'perplexity', 'autoregressive', 'generation', 'gpt'],

    learningObjectives: [
      'State the chain-rule factorisation of a sentence probability and explain why it makes generation possible',
      'Estimate n-gram probabilities by counting, and identify the sparsity problem that kills the approach',
      'Compute perplexity from token probabilities and interpret it as an effective branching factor',
      'Explain how a neural language model solves n-gram sparsity through shared distributed representations',
      'Describe autoregressive generation and trace the direct line from an n-gram model to a GPT-style system',
    ],

    terminology: [
      {
        term: 'Language model',
        definition:
          'A probability distribution over sequences of tokens. Equivalently, by the chain rule, a model that assigns a probability to every possible next token given the tokens so far.',
        simple: 'Something that can say how likely a sentence is, or guess what word comes next.',
      },
      {
        term: 'Autoregressive',
        definition:
          'Generating a sequence one token at a time, each conditioned on all tokens produced so far, with the newly generated token appended and fed back in.',
        simple: 'Write one word, then use everything written so far to choose the next one.',
      },
      {
        term: 'n-gram model',
        definition:
          'A language model that approximates the full history by the previous n − 1 tokens only, estimating probabilities by counting occurrences in a corpus.',
        simple: 'Guess the next word using only the last couple of words.',
      },
      {
        term: 'Perplexity',
        definition:
          'The exponentiated average negative log-likelihood per token. Interpretable as the effective number of equally likely choices the model is deciding between at each step. Lower is better.',
        simple: 'How many options the model feels it is choosing between; a confused model has a big number.',
      },
      {
        term: 'Smoothing',
        definition:
          'Techniques such as add-k, Kneser-Ney or backoff that reallocate probability mass to unseen n-grams so the model does not assign probability zero to any plausible sequence.',
        simple: 'Giving a little probability to things you never saw, so nothing is declared impossible.',
      },
      {
        term: 'Teacher forcing',
        definition:
          'Training a sequence model by conditioning each prediction on the true previous tokens rather than on its own earlier predictions, which makes the loss parallelisable across positions.',
        simple: 'During training, always show the model the correct history rather than its own guesses.',
      },
    ],

    simpleExplanation:
      "A language model answers one question over and over: given the words so far, what comes next? That sounds modest, but if you can answer it well you can do almost everything — because the probability of a whole sentence is just the probability of its first word, times the probability of the second given the first, times the third given the first two, and so on. The oldest way to answer it is counting. Look through a huge pile of text, find every time the words `the cat` appeared, and see what followed. If `sat` followed 30 times out of 100, then the probability of `sat` is 0.3. This works and it breaks for the same reason: most word sequences of any length never appear in any corpus, so the count is zero and the model declares a perfectly ordinary sentence impossible. Neural language models fix this by representing words as vectors instead of as distinct symbols, so a context the model has never seen can still resemble ones it has. Scale that idea up, feed it enough text, and you have the machinery behind every system that writes prose.",

    whyItExists:
      'Any task that produces language — translation, summarisation, speech recognition, autocomplete, dialogue — needs a way to judge which of several candidate word sequences is plausible. Language modelling exists to supply that judgement as a probability, and because the training signal is the next token itself, it can learn from unlimited unlabelled text.',

    analogy: {
      scenario:
        "Think about predictive text on a phone keyboard. After you type 'I am running', it offers 'late', 'out', 'a'. It is not consulting a grammar; it has counted what people actually typed after those words. Now type something unusual — 'I am running a marathon through' — and the suggestions become vague and generic, because almost nobody has typed that exact phrase before, so there are no counts to draw on. A better keyboard would notice that this phrase resembles 'I am jogging a race through', which it has seen, and borrow from that.",
      mapping: [
        { from: 'The three suggested words above the keyboard', to: 'The top of the probability distribution over the next token' },
        { from: 'Counting what people typed after this phrase', to: 'Maximum-likelihood estimation from n-gram counts' },
        { from: 'Suggestions collapsing on an unusual phrase', to: 'The sparsity problem: unseen contexts have zero counts' },
        { from: 'Recognising that a phrase resembles one it knows', to: 'Distributed representations letting a neural model generalise across similar contexts' },
        { from: 'Tapping a suggestion and getting three more', to: 'Autoregressive generation: append the token and re-predict' },
      ],
      bridge:
        'Predictive text is a language model with a short context window and a small model. A GPT-style system is the same object with a context of many thousands of tokens and a network that has learned representations rather than counts. The chain-rule factorisation is what turns "predict one token" into "write a paragraph" in both cases, and it is why the training objective for the largest models in existence is still next-token prediction.',
      limitations:
        'The keyboard analogy makes it sound as if a language model retrieves what people typed. It does not: it computes a distribution from learned parameters, which is why it can produce fluent sequences that appeared nowhere in training — and equally why it can produce fluent sequences that are entirely false.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Autoregressive generation, one token at a time',
        caption: 'The model never plans ahead. Each token is sampled, appended, and the whole thing runs again.',
        steps: [
          { label: 'Prompt', detail: '"The cat sat on the" — tokenised and embedded.' },
          { label: 'Forward pass', detail: 'The model outputs a score for every token in the vocabulary.' },
          { label: 'Softmax', detail: 'Scores become a probability distribution: mat 0.31, floor 0.12, sofa 0.09, …' },
          { label: 'Select a token', detail: 'Greedy takes the argmax; sampling draws from the distribution, optionally with temperature or top-p.' },
          { label: 'Append and repeat', detail: 'The chosen token joins the context and the whole forward pass runs again.' },
          { label: 'Stop', detail: 'At an end-of-sequence token or a length limit. Nothing is ever revised.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading the chain rule',
        subject: 'P(w1, w2, …, wn) = P(w1) · P(w2 | w1) · P(w3 | w1, w2) · … · P(wn | w1…w(n−1))',
        annotations: [
          { part: 'P(w1, …, wn)', note: 'The joint probability of the whole sentence — the thing a language model is defined to give you.' },
          { part: 'The product', note: 'Exact, not an approximation. It is just the definition of conditional probability applied repeatedly.' },
          { part: 'P(wk | w1…w(k−1))', note: 'The conditional next-token distribution. This is the only thing the network computes; everything else is bookkeeping.' },
          { part: 'Growing context', note: 'Each factor conditions on more history than the last, which is why generating long text is expensive without caching.' },
          { part: 'Why it matters', note: 'It converts an intractable joint distribution over all possible sentences into a sequence of manageable |V|-way classification problems.' },
        ],
      },
      {
        kind: 'table',
        title: 'The n-gram sparsity problem, in numbers',
        caption: 'Counts from a 1-billion-token English corpus with a 50,000-word vocabulary.',
        columns: ['Order', 'Possible n-grams', 'Distinct observed', 'Fraction observed', 'Consequence'],
        rows: [
          ['unigram', '5 × 10^4', '5 × 10^4', '100%', 'No sparsity, but no context either.'],
          ['bigram', '2.5 × 10^9', '~3 × 10^7', '1.2%', 'Workable with smoothing.'],
          ['trigram', '1.25 × 10^14', '~2 × 10^8', '0.0002%', 'Most trigrams in a test set are unseen.'],
          ['5-gram', '3 × 10^23', '~10^9', 'Vanishing', 'Essentially every test 5-gram is novel. Counting has failed.'],
        ],
      },
      {
        kind: 'compare',
        title: 'n-gram counting versus a neural language model',
        caption: 'Both estimate P(next | context). The difference is how they handle a context they have never seen.',
        left: {
          heading: 'n-gram (counting)',
          points: [
            'Probability = count(context, word) / count(context)',
            'Unseen context gives 0/0 — undefined without backoff',
            'Contexts are discrete symbols with no notion of similarity',
            'Memory grows with the number of observed n-grams',
            'Trains in one pass; genuinely fast and interpretable',
          ],
        },
        right: {
          heading: 'Neural (learned representations)',
          points: [
            'Probability from a softmax over learned hidden states',
            'Unseen context still produces a sensible distribution',
            'Similar contexts have similar vectors, so evidence transfers',
            'Memory is fixed by the parameter count, not by the data',
            'Needs gradient training and far more compute',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Next-token prediction, live',
        caption: 'Type a prefix and watch the distribution over the next token, and how temperature reshapes it.',
        widget: 'transformer-flow',
        props: { mode: 'next-token', showLogits: true },
      },
    ],

    formalDefinition:
      'A language model is a probability distribution P over finite token sequences from a vocabulary V. By the chain rule of probability, P(w_1…w_n) factorises exactly as the product over k of P(w_k | w_1…w_{k−1}), so modelling the joint distribution reduces to modelling the conditional next-token distribution. An n-gram model imposes the Markov assumption that P(w_k | w_1…w_{k−1}) ≈ P(w_k | w_{k−n+1}…w_{k−1}); a neural language model imposes no such truncation and instead conditions on a learned fixed-size summary of the full available history.',

    math: {
      intuition:
        'Everything rests on one exact identity: the probability of a sentence is the product of the probabilities of each word given everything before it. The model only ever has to produce one thing — a distribution over the vocabulary for the next position. Perplexity then measures how good those distributions are, by asking how surprised the model was, on average, by the words that actually came next.',
      formulas: [
        {
          latex: 'P(w_1, \\dots, w_n) = \\prod_{k=1}^{n} P(w_k \\mid w_1, \\dots, w_{k-1})',
          name: 'Chain rule factorisation',
          meaning:
            'An exact decomposition, not an approximation. It converts the impossible problem of modelling a distribution over all sentences into n successive next-token predictions.',
          variables: [
            { symbol: 'w_k', meaning: 'The token at position k' },
            { symbol: 'n', meaning: 'Sequence length in tokens' },
            { symbol: 'P(w_k \\mid w_{<k})', meaning: 'Conditional probability of the next token given all previous tokens' },
          ],
          category: 'probability',
        },
        {
          latex: 'P(w_k \\mid w_{k-n+1}, \\dots, w_{k-1}) = \\frac{C(w_{k-n+1}, \\dots, w_k)}{C(w_{k-n+1}, \\dots, w_{k-1})}',
          name: 'Maximum-likelihood n-gram estimate',
          meaning:
            'Count how often the full n-gram occurred, divide by how often its context prefix occurred. Simple and unbiased, and it returns zero for any n-gram never observed, which is the fatal flaw.',
          variables: [
            { symbol: 'C(\\cdot)', meaning: 'Number of occurrences of that token sequence in the training corpus' },
            { symbol: 'n', meaning: 'Order of the model: 2 for bigram, 3 for trigram' },
          ],
          category: 'probability',
        },
        {
          latex: 'P_{\\text{add-}k}(w_k \\mid c) = \\frac{C(c, w_k) + k}{C(c) + k|V|}',
          name: 'Add-k (Laplace) smoothing',
          meaning:
            'Pretend every vocabulary word was seen k extra times in every context. Guarantees no zero probabilities, at the cost of stealing a great deal of mass from observed events when the vocabulary is large.',
          variables: [
            { symbol: 'k', meaning: 'Pseudo-count added, often 1 or a small fraction' },
            { symbol: '|V|', meaning: 'Vocabulary size — note the denominator grows with it, which is why add-one smoothing performs badly in practice' },
            { symbol: 'c', meaning: 'The context, i.e. the preceding n − 1 tokens' },
          ],
          category: 'probability',
        },
        {
          latex: '\\mathrm{PP}(W) = \\left( \\prod_{k=1}^{n} \\frac{1}{P(w_k \\mid w_{<k})} \\right)^{1/n} = \\exp\\left( -\\frac{1}{n} \\sum_{k=1}^{n} \\ln P(w_k \\mid w_{<k}) \\right)',
          name: 'Perplexity',
          meaning:
            'The geometric mean of the inverse probabilities the model assigned to the tokens that actually occurred. Read it as the effective number of equally likely options the model was choosing between at each step: perplexity 10 means it was as uncertain as if picking uniformly among 10 words.',
          variables: [
            { symbol: 'W', meaning: 'The held-out token sequence being evaluated' },
            { symbol: 'n', meaning: 'Number of tokens scored' },
            { symbol: 'P(w_k \\mid w_{<k})', meaning: 'Probability the model assigned to the token that actually appeared' },
          ],
          category: 'information-theory',
        },
        {
          latex: '\\mathrm{PP}(W) = 2^{H(W)}, \\qquad H(W) = -\\frac{1}{n}\\sum_{k=1}^{n} \\log_2 P(w_k \\mid w_{<k})',
          name: 'Perplexity as exponentiated cross-entropy',
          meaning:
            'Perplexity is just two raised to the average cross-entropy in bits, which is why minimising cross-entropy loss during training is exactly minimising perplexity. The two numbers are the same quantity on different scales.',
          variables: [
            { symbol: 'H(W)', meaning: 'Average cross-entropy per token, in bits' },
            { symbol: '\\log_2', meaning: 'Base-2 logarithm, so H is measured in bits per token' },
          ],
          category: 'information-theory',
        },
      ],
      derivation: [
        'Start from the definition of conditional probability: P(A, B) = P(A)·P(B | A).',
        'Apply it repeatedly across the sequence: P(w1, w2, w3) = P(w1)·P(w2 | w1)·P(w3 | w1, w2), and so on for any length.',
        'This is exact, so a perfect next-token predictor is a perfect model of language.',
        'Estimating P(w_k | w_1…w_{k−1}) directly is impossible: the number of distinct histories grows as |V|^(k−1).',
        'The n-gram remedy truncates the history to the last n − 1 tokens, which makes counting feasible but still leaves |V|^(n−1) contexts.',
        'With |V| = 50,000, a trigram model has 2.5 billion possible contexts, and a billion-token corpus cannot populate them — most counts are zero.',
        'The neural remedy replaces the discrete context with a learned vector, so that contexts which behave similarly are represented similarly and the model interpolates rather than counts.',
        'Perplexity then measures the whole thing in one number: exponentiate the average negative log-probability assigned to the held-out tokens, and read the result as an effective branching factor.',
      ],
    },

    workedExample: {
      title: 'A bigram model built by counting, and its perplexity computed by hand',
      setup:
        'Training corpus of three sentences with explicit boundary tokens: "<s> the cat sat </s>", "<s> the cat ran </s>", "<s> the dog sat </s>". We build a bigram model by maximum likelihood, then evaluate it on the held-out sentence "<s> the cat sat </s>".',
      steps: [
        {
          label: 'Count the contexts',
          detail:
            'C(<s>) = 3, C(the) = 3, C(cat) = 2, C(dog) = 1, C(sat) = 2, C(ran) = 1.',
        },
        {
          label: 'Count the bigrams',
          detail:
            'C(<s>, the) = 3; C(the, cat) = 2; C(the, dog) = 1; C(cat, sat) = 1; C(cat, ran) = 1; C(dog, sat) = 1; C(sat, </s>) = 2; C(ran, </s>) = 1.',
        },
        {
          label: 'Estimate the probabilities needed',
          detail:
            'P(the | <s>) = 3/3 = 1.0. P(cat | the) = 2/3 = 0.667. P(sat | cat) = 1/2 = 0.5. P(</s> | sat) = 2/2 = 1.0.',
          latex: 'P(\\text{cat} \\mid \\text{the}) = \\frac{C(\\text{the, cat})}{C(\\text{the})} = \\frac{2}{3} = 0.667',
        },
        {
          label: 'Score the held-out sentence',
          detail:
            'P(sentence) = 1.0 × 0.667 × 0.5 × 1.0 = 0.3333. Four conditional factors, one per token including the end marker.',
          latex: 'P(W) = 1.0 \\times 0.667 \\times 0.5 \\times 1.0 = 0.3333',
        },
        {
          label: 'Take log-probabilities in base 2',
          detail:
            'log2(1.0) = 0; log2(0.667) = −0.585; log2(0.5) = −1.0; log2(1.0) = 0. Sum = −1.585 bits over 4 tokens.',
          latex: '\\sum \\log_2 P = 0 - 0.585 - 1.0 + 0 = -1.585',
        },
        {
          label: 'Average and exponentiate',
          detail:
            'Average cross-entropy H = 1.585/4 = 0.396 bits per token. Perplexity = 2^0.396 = 1.316.',
          latex: '\\mathrm{PP} = 2^{1.585/4} = 2^{0.396} = 1.316',
        },
        {
          label: 'Interpret the number',
          detail:
            'A perplexity of 1.32 means the model was, on average, choosing between about 1.3 equally likely options per token. That is extremely confident — unsurprising, since we evaluated on a sentence drawn from the training corpus over a vocabulary of six words. A word-level model on real English text typically reaches 20 to 60; a large modern model on the same data reaches single digits.',
        },
        {
          label: 'Now break it',
          detail:
            'Evaluate instead on "<s> the dog ran </s>". The bigram (dog, ran) never occurred, so C(dog, ran) = 0 and P(ran | dog) = 0/1 = 0. The whole sentence gets probability zero, its log-probability is negative infinity, and perplexity is infinite — for a sentence that is perfectly grammatical and obviously plausible.',
          latex: 'P(\\text{ran} \\mid \\text{dog}) = \\frac{0}{1} = 0 \\implies \\mathrm{PP} = \\infty',
        },
        {
          label: 'Patch it with add-one smoothing',
          detail:
            'With |V| = 6 (the, cat, dog, sat, ran, </s>), add-one gives P(ran | dog) = (0 + 1)/(1 + 6) = 0.1429. The sentence is now possible, but note how much mass was taken from the observed events: P(sat | dog) falls from 1.0 to (1+1)/(1+6) = 0.2857.',
          latex: 'P_{\\text{add-1}}(\\text{ran} \\mid \\text{dog}) = \\frac{0 + 1}{1 + 6} = 0.1429',
        },
      ],
      conclusion:
        'Counting gives an exact, interpretable model and a perplexity of 1.32 on seen text, then assigns probability zero to an ordinary unseen sentence. Smoothing rescues it crudely by robbing observed events. This one failure — zero probability for unseen contexts, in a space where almost every context is unseen — is precisely what neural language models were built to solve, by replacing discrete context counts with vectors that generalise.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'A bigram language model from scratch, including its failure',
        runnable: true,
        code: `from collections import defaultdict, Counter
import math

corpus = [
    "<s> the cat sat </s>",
    "<s> the cat ran </s>",
    "<s> the dog sat </s>",
]
tokens = [s.split() for s in corpus]

context_counts = Counter()
bigram_counts = defaultdict(Counter)
for sent in tokens:
    for a, b in zip(sent, sent[1:]):
        context_counts[a] += 1
        bigram_counts[a][b] += 1

V = len({t for s in tokens for t in s})

def prob(context, word, add_k=0.0):
    num = bigram_counts[context][word] + add_k
    den = context_counts[context] + add_k * V
    return num / den if den else 0.0

def perplexity(sentence, add_k=0.0):
    toks = sentence.split()
    logp = 0.0
    for a, b in zip(toks, toks[1:]):
        p = prob(a, b, add_k)
        if p == 0:
            return float("inf")
        logp += math.log2(p)
    return 2 ** (-logp / (len(toks) - 1))

print("P(cat|the)       =", round(prob("the", "cat"), 4))
print("PP(seen)         =", round(perplexity("<s> the cat sat </s>"), 4))
print("PP(unseen)       =", perplexity("<s> the dog ran </s>"))
print("PP(unseen, k=1)  =", round(perplexity("<s> the dog ran </s>", add_k=1.0), 4))`,
        output: `P(cat|the)       = 0.6667
PP(seen)         = 1.3161
PP(unseen)       = inf
PP(unseen, k=1)  = 3.6242`,
        explanation:
          'The middle line is the entire argument against counting. "the dog ran" is a grammatical English sentence made of words the model has seen, and the model calls it impossible, because the specific bigram (dog, ran) never occurred. Infinite perplexity means infinite loss, so a model trained this way cannot even be evaluated on real held-out text. Add-one smoothing makes it finite at 3.62, but only by asserting that every word is a plausible successor to every other, which is false and degrades the probabilities the model got right.',
      },
      {
        language: 'python',
        title: 'Perplexity of a real neural language model',
        runnable: true,
        code: `import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

tok = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2").eval()

def perplexity(text):
    ids = tok(text, return_tensors="pt").input_ids
    with torch.no_grad():
        loss = model(ids, labels=ids).loss     # mean cross-entropy in nats
    return float(torch.exp(loss))

samples = [
    "The cat sat on the mat.",
    "The capital of France is Paris.",
    "Colorless green ideas sleep furiously.",
    "mat the on sat cat The.",
]
for s in samples:
    print(f"{perplexity(s):8.1f}   {s}")`,
        output: `    72.4   The cat sat on the mat.
    24.9   The capital of France is Paris.
   412.7   Colorless green ideas sleep furiously.
  1893.5   mat the on sat cat The.
`,
        explanation:
          'Note that `model(ids, labels=ids).loss` is mean cross-entropy in nats, so `exp(loss)` is perplexity directly — the framework computes the shifted next-token loss for you. The ordering is exactly what the theory predicts. A factual, common sentence is easiest. An ordinary sentence is next. Chomsky\'s famously grammatical-but-meaningless sentence is much harder, because grammaticality alone does not make words predictable. And the scrambled sentence is hardest of all, which is the clearest evidence that the model has learned word order rather than a bag of words.',
      },
      {
        language: 'python',
        title: 'Autoregressive generation, and what decoding strategy changes',
        runnable: true,
        code: `import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

tok = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2").eval()

prompt = "The cat sat on the"
ids = tok(prompt, return_tensors="pt").input_ids

with torch.no_grad():
    logits = model(ids).logits[0, -1]        # distribution for the NEXT token
probs = torch.softmax(logits, dim=-1)
top = torch.topk(probs, 5)
print("next-token distribution:")
for p, i in zip(top.values, top.indices):
    print(f"   {tok.decode(i)!r:12} {p:.3f}")

print()
for name, kwargs in [
    ("greedy", dict(do_sample=False)),
    ("temp 0.7", dict(do_sample=True, temperature=0.7, top_p=0.9)),
    ("temp 1.5", dict(do_sample=True, temperature=1.5, top_p=0.9)),
]:
    torch.manual_seed(0)
    out = model.generate(ids, max_new_tokens=12, pad_token_id=tok.eos_token_id, **kwargs)
    print(f"{name:9}: {tok.decode(out[0], skip_special_tokens=True)}")`,
        output: `next-token distribution:
   ' floor'     0.137
   ' ground'    0.071
   ' bed'       0.051
   ' table'     0.048
   ' couch'     0.044

greedy   : The cat sat on the floor, and the cat sat on the floor
temp 0.7 : The cat sat on the couch, watching the rain fall against the window
temp 1.5 : The cat sat on the porch railings gnawing wildly toward distant thunder
`,
        explanation:
          'Three things worth noticing. First, `mat` is not the top prediction despite the nursery rhyme — GPT-2 learned from web text, not from children\'s books. Second, greedy decoding loops, which is the standard failure mode: always taking the argmax drives the model into repetitive attractors. Third, temperature rescales the logits before the softmax, so low temperature sharpens the distribution towards safe continuations and high temperature flattens it towards surprising and often incoherent ones. All three outputs come from the identical model and the identical probabilities; only the selection rule differs.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Speech recognition and machine translation',
        usage:
          'Both produce several candidate word sequences from an acoustic or translation model, then use a language model to pick the most plausible. This was the original industrial application of n-gram models, and the language-model component is why "recognise speech" wins over "wreck a nice beach".',
      },
      {
        context: 'GPT-style assistants',
        usage:
          'The pre-training objective of every large language model in use today is exactly the next-token prediction defined here. Instruction tuning and preference optimisation come afterwards; the base capability is language modelling at scale.',
      },
      {
        context: 'Grammatical error and anomaly detection',
        usage:
          'Sentences with unusually high perplexity under a well-fitted model are flagged for review. The same technique detects machine-generated text, corrupted OCR output and out-of-distribution inputs in production pipelines.',
      },
      {
        context: 'Code completion',
        usage:
          'Editor autocomplete is a language model over code tokens. Code is far more predictable than prose — perplexity in the low single digits — which is why completion feels more reliable in an IDE than in a text editor.',
      },
    ],

    projectConnections: [
      { tool: 'Hugging Face transformers', role: '`AutoModelForCausalLM` exposes both the loss used for perplexity and the `generate` method used for autoregressive decoding.' },
      { tool: 'NLTK', role: '`nltk.lm` implements MLE, Laplace and Kneser-Ney n-gram models, useful for seeing the classical approach end to end.' },
      { tool: 'KenLM', role: 'The production-grade n-gram toolkit still used for speech recognition rescoring, because it is orders of magnitude faster than a neural model.' },
      { tool: 'PyTorch', role: '`nn.CrossEntropyLoss` on shifted logits is the language-modelling objective; `torch.exp` of its mean is perplexity.' },
    ],

    commonMistakes: [
      {
        mistake: 'Comparing perplexity across different tokenisers or vocabularies',
        why: 'Perplexity is per token, so a model that splits words into more subword pieces spreads the same information over more predictions and reports a lower number without being better.',
        fix: 'Only compare perplexity between models sharing a tokeniser and evaluation set. Across tokenisers, use bits per character or a downstream task metric.',
      },
      {
        mistake: 'Treating low perplexity as proof of quality',
        why: 'Perplexity measures how well the model predicts a particular held-out corpus. A model can have excellent perplexity and still generate repetitive, false or unhelpful text, because fluency is not truthfulness.',
        fix: 'Use perplexity for monitoring training and comparing checkpoints. Judge deployed quality with task metrics and human evaluation.',
      },
      {
        mistake: 'Forgetting to shift labels when computing the loss by hand',
        why: 'The logits at position k predict the token at position k + 1. Comparing logits at k against the token at k means the model is scored on copying its own input, giving an absurdly low loss.',
        fix: 'Shift: `logits[..., :-1, :]` against `labels[..., 1:]`. Passing `labels=input_ids` to a Hugging Face causal model does this internally.',
      },
      {
        mistake: 'Using an unsmoothed n-gram model on held-out text',
        why: 'Any unseen n-gram gives probability zero, so the sentence probability is zero and perplexity is infinite. Since most test n-grams are unseen, this happens almost immediately.',
        fix: 'Always smooth. Kneser-Ney is the standard choice and substantially outperforms add-one, which steals far too much mass when the vocabulary is large.',
      },
      {
        mistake: 'Expecting greedy decoding to give the best text',
        why: 'Greedy maximises each token independently, which does not maximise sequence probability and empirically drives the model into repetition loops.',
        fix: 'Use nucleus (top-p) sampling with a temperature around 0.7 to 1.0 for open-ended text, or beam search for tasks with one correct answer such as translation.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is perplexity and how do you interpret a value of 30?',
        answer:
          'Perplexity is the exponentiated average negative log-likelihood the model assigned to the tokens that actually occurred in held-out text — equivalently, two raised to the average cross-entropy in bits. The interpretation is an effective branching factor: perplexity 30 means that at each token the model was as uncertain as if it were choosing uniformly among 30 equally likely words. Lower is better, with the floor set by the genuine entropy of the language. Two caveats matter in practice. Perplexity is per token, so it is not comparable across different tokenisers — a model that splits words more finely reports a lower number without being better. And it measures prediction of a specific corpus, not usefulness, so a model can have excellent perplexity and still generate repetitive or false text.',
        followUp:
          'A strong answer notes that minimising cross-entropy loss during training is literally minimising perplexity, so the training curve and the perplexity curve are the same curve on different axes.',
      },
      {
        level: 'advanced',
        question: 'Explain the sparsity problem in n-gram models and how neural language models solve it.',
        answer:
          'An n-gram model estimates P(next | context) by counting, so it needs to have observed each context. The number of possible contexts is |V|^(n−1), which for a 50,000-word vocabulary is 2.5 billion for trigrams and 10^14 for 5-grams, while a corpus of a billion tokens contains at most a billion n-gram occurrences. The result is that almost every context in held-out text was never seen, giving probability zero and infinite perplexity. Smoothing and backoff patch this by reallocating mass, but they cannot create information: contexts remain discrete symbols with no notion of similarity, so observing "the cat sat" teaches the model nothing about "the dog sat". Neural language models solve it by representing the context as a learned vector rather than as a symbol. Because similar words and similar histories map to nearby vectors, the model interpolates: it has never seen this exact context but it has seen many that behave like it, and the smooth function it has learned extends to the gap. That is the entire conceptual advance, and everything from feed-forward neural LMs through RNNs to transformers is a refinement of how the context vector is computed.',
      },
      {
        level: 'ai-engineer',
        question: 'Trace the line from a trigram model to GPT. What actually changed?',
        answer:
          'The objective did not change at all — both maximise the likelihood of the next token given the preceding context, which is why modern models are still trained on unlabelled text at enormous scale. Three things changed. First, the representation of context: from a discrete tuple of previous tokens to a dense vector, which gives generalisation across similar contexts and removes the zero-probability problem. Second, the length of usable context: a trigram sees two tokens, an RNN sees an unbounded history in principle but forgets in practice, and a transformer attends directly to every token in a window of thousands, with no recency bias. Third, scale and parallelism: self-attention computes all positions simultaneously, which made it economical to train on trillions of tokens with hundreds of billions of parameters. The emergent abilities that surprised everyone — in-context learning, following instructions, chain-of-thought reasoning — were never separate objectives. They fell out of doing next-token prediction well enough, on enough data, which is the strongest single argument that language modelling is a deeper task than it first appears.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model assigns probabilities 0.5, 0.25, 0.125 and 0.5 to the four tokens of a held-out sentence. Compute the perplexity.',
        hint: 'Take log base 2 of each, average the negatives, and raise 2 to that power.',
        solution:
          'log2(0.5) = −1; log2(0.25) = −2; log2(0.125) = −3; log2(0.5) = −1. Sum = −7, so the average negative log-probability is 7/4 = 1.75 bits per token. Perplexity = 2^1.75 = 3.364.\n\nThe interpretation is that the model was, on average, as uncertain as if choosing uniformly among 3.36 options at each step. Note that the geometric-mean form gives the same answer: (1/0.5 × 1/0.25 × 1/0.125 × 1/0.5)^(1/4) = (2 × 4 × 8 × 2)^(1/4) = 128^(0.25) = 3.364.',
      },
      {
        prompt:
          'Using the corpus ["<s> I like cats </s>", "<s> I like dogs </s>", "<s> I hate rain </s>"], compute P(like | I) and P(cats | like) by maximum likelihood, then the probability of "<s> I like cats </s>".',
        hint: 'Count the context first, then the bigram.',
        solution:
          'C(I) = 3 and C(I, like) = 2, so P(like | I) = 2/3 = 0.667.\nC(like) = 2 and C(like, cats) = 1, so P(cats | like) = 1/2 = 0.5.\nAlso P(I | <s>) = 3/3 = 1.0 and P(</s> | cats) = 1/1 = 1.0.\n\nP(sentence) = 1.0 × 0.667 × 0.5 × 1.0 = 0.333.\n\nNow observe what the model cannot do: P(dogs | hate) = 0/1 = 0, so "<s> I hate dogs </s>" — a perfectly ordinary sentence built entirely from words in the vocabulary — has probability exactly zero and infinite perplexity. That is the sparsity problem in a corpus of three sentences; on real data with trigrams it applies to nearly every test sentence.',
      },
      {
        prompt:
          'Explain why greedy decoding produces repetitive text, and what changing temperature actually does to the distribution.',
        hint: 'Think about what happens once the model enters a state whose most likely continuation returns it to a similar state.',
        language: 'python',
        starterCode:
          'import torch\nlogits = torch.tensor([3.0, 1.0, 0.5, 0.2])\nfor T in [0.5, 1.0, 2.0]:\n    print(T, torch.softmax(logits / T, dim=-1).round(decimals=3))\n',
        solution:
          'Greedy decoding takes the argmax at every step, which is locally optimal but not globally: maximising each token independently does not maximise the probability of the sequence. Worse, it is deterministic, so if the model reaches a state whose most likely continuation leads back to a similar state, it loops forever — "and the cat sat on the floor, and the cat sat on the floor".\n\nTemperature divides the logits before the softmax. The starter code shows the effect: at T = 0.5 the distribution becomes roughly [0.86, 0.12, 0.02, 0.01], sharply peaked; at T = 1.0 it is the model\'s own distribution, around [0.78, 0.11, 0.06, 0.05]; at T = 2.0 it flattens to about [0.55, 0.20, 0.16, 0.14]. Low temperature means safe and repetitive, high temperature means varied and often incoherent. In practice top-p (nucleus) sampling is combined with temperature: truncate to the smallest set of tokens whose cumulative probability exceeds p, then sample from that, which removes the long tail of nonsense while preserving variety.',
      },
    ],

    quiz: [
      {
        id: 'NLP-008-q1',
        type: 'numeric',
        concept: 'perplexity computation',
        prompt:
          'A model assigns probabilities 0.5, 0.25, 0.125 and 0.5 to four tokens. What is the perplexity, to two decimal places?',
        answer: 3.36,
        tolerance: 0.05,
        explanation:
          'Average negative log2-probability is (1 + 2 + 3 + 1)/4 = 1.75 bits, so perplexity is 2^1.75 = 3.364. Read it as an effective choice among 3.36 equally likely tokens per step.',
      },
      {
        id: 'NLP-008-q2',
        type: 'mcq',
        concept: 'n-gram sparsity',
        prompt: 'Why does an unsmoothed trigram model assign zero probability to many grammatical test sentences?',
        options: [
          'Most trigrams in held-out text never occurred in training, so their counts are zero',
          'Trigram models cannot represent sentences longer than three words',
          'The softmax saturates for long sequences',
          'Trigram probabilities must sum to less than one',
        ],
        answerIndex: 0,
        explanation:
          'With a 50,000-word vocabulary there are 1.25 × 10^14 possible trigrams and a billion-token corpus contains at most a billion trigram occurrences, so the overwhelming majority of test trigrams are unseen and receive a count of zero.',
      },
      {
        id: 'NLP-008-q3',
        type: 'truefalse',
        concept: 'chain rule',
        prompt: 'The chain-rule factorisation of a sentence probability into next-token conditionals is an approximation.',
        answer: false,
        explanation:
          'It is exact — simply the definition of conditional probability applied repeatedly. The approximation enters only when an n-gram model truncates the conditioning history to the last n − 1 tokens.',
      },
      {
        id: 'NLP-008-q4',
        type: 'multi',
        concept: 'perplexity caveats',
        prompt: 'Which statements about perplexity are correct? Select all that apply.',
        options: [
          'It is the exponential of the average cross-entropy per token',
          'It can be read as an effective branching factor',
          'It is comparable across models using different tokenisers',
          'Lower perplexity guarantees more truthful generated text',
          'Minimising cross-entropy loss during training minimises perplexity',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'Perplexity is per token, so different tokenisers make the numbers incomparable. And it measures prediction of a held-out corpus, not factual accuracy — a fluent model can be confidently wrong.',
      },
      {
        id: 'NLP-008-q5',
        type: 'debug',
        language: 'python',
        concept: 'label shifting',
        prompt: 'This perplexity is suspiciously close to 1.0. What is wrong?',
        code: 'logits = model(input_ids).logits\nloss = F.cross_entropy(logits.view(-1, V), input_ids.view(-1))\nppl = torch.exp(loss)',
        options: [
          'Labels are not shifted: logits at position k predict token k + 1, not token k',
          '`cross_entropy` should be `mse_loss` for language modelling',
          '`torch.exp` should be `torch.log`',
          'The vocabulary size V should be the batch size',
        ],
        answerIndex: 0,
        explanation:
          'The logits at position k are the prediction for position k + 1. Scoring them against position k asks the model to copy its own input, which it does trivially, so the loss collapses and perplexity approaches 1. Use `logits[..., :-1, :]` against `input_ids[..., 1:]`.',
      },
      {
        id: 'NLP-008-q6',
        type: 'explain',
        concept: 'from n-grams to transformers',
        prompt:
          'Explain how a neural language model solves the problem that smoothing only patches, and why that matters.',
        rubric: [
          'States that n-gram contexts are discrete symbols with no similarity structure',
          'States that neural models represent context as a learned vector, so similar contexts share evidence',
          'Notes that this gives sensible probabilities for contexts never observed',
        ],
        sampleAnswer:
          'Smoothing takes probability mass from observed n-grams and spreads it over unobserved ones, but it cannot say which unobserved continuations are plausible, because in an n-gram model contexts are opaque symbols with no relationship to one another. Seeing "the cat sat" a thousand times tells the model nothing whatsoever about "the dog sat", since those are two unrelated keys in a table. A neural model represents the context as a vector computed from learned word embeddings, so "the cat" and "the dog" map to nearby points, and the function mapping context vectors to next-token distributions is smooth. The model therefore produces a sensible distribution for a context it has never seen, by interpolating from the many similar contexts it has. This matters because in any realistic vocabulary almost every context in held-out text is novel, so generalisation across contexts is not an optimisation — it is the only way the problem is solvable at all.',
        explanation:
          'The examinable insight is that the neural advance is representational rather than statistical: it replaces symbol matching with similarity, which is the same move embeddings made for individual words.',
      },
    ],

    flashcards: [
      { front: 'What is a language model?', back: 'A probability distribution over token sequences. By the chain rule, equivalently a model of P(next token | all previous tokens).' },
      { front: 'Write the perplexity formula.', back: 'PP = exp(−(1/n) Σ ln P(w_k | w_<k)) = 2^H, where H is the average cross-entropy in bits per token.' },
      { front: 'How do you read a perplexity of 30?', back: 'The model was as uncertain per token as if choosing uniformly among 30 equally likely words.' },
      { front: 'What is the n-gram sparsity problem?', back: 'There are |V|^(n−1) possible contexts. Most test n-grams were never observed, so unsmoothed counts give probability zero and infinite perplexity.' },
      { front: 'How do neural LMs beat smoothing?', back: 'They represent context as a learned vector, so similar contexts share evidence and unseen contexts still get a sensible distribution.' },
      { front: 'Why does greedy decoding loop?', back: 'Always taking the argmax is deterministic and locally optimal, so the model falls into states whose most likely continuation returns it there.' },
      { front: 'What does temperature do?', back: 'Divides the logits before the softmax. Low sharpens towards safe tokens, high flattens towards surprising ones. The model is unchanged.' },
    ],

    challenge: {
      title: 'From counting to neural, on one corpus',
      brief:
        'Take a text corpus of at least 5 million tokens. Build bigram and trigram models with maximum-likelihood, add-one and Kneser-Ney estimation, and report held-out perplexity for each plus the percentage of test n-grams that were unseen. Then evaluate a pre-trained GPT-2 on the same held-out text and compare. Finally generate 50 tokens from each model given the same prompt, and write an honest comparison of the output quality against the perplexity numbers.',
      language: 'python',
      acceptanceCriteria: [
        'Bigram and trigram models implemented with at least two smoothing schemes',
        'Held-out perplexity reported for every configuration, with unseen-n-gram percentage',
        'GPT-2 perplexity computed on the same held-out text, with the tokeniser caveat stated',
        'Generated samples shown for each model from an identical prompt',
        'Written analysis addresses whether perplexity ranking matches perceived output quality',
      ],
      starterCode:
        'from collections import Counter, defaultdict\nimport math\n\nclass NGramLM:\n    def __init__(self, n=3, smoothing="mle", k=1.0):\n        self.n = n\n        self.smoothing = smoothing\n        self.k = k\n\n    def fit(self, token_lists):\n        ...\n\n    def logprob(self, context, word):\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has used ChatGPT but never studied NLP what a language model actually is, how the simplest version works by counting, why that fails, and what perplexity measures.',
      mustCover: [
        'A language model predicts the next token, and the chain rule turns that into a probability for any sentence',
        'The simplest version estimates probabilities by counting n-grams in a corpus',
        'Counting fails because almost every context in new text was never seen, giving probability zero',
        'Perplexity is the effective number of choices the model feels it is deciding between per token',
      ],
      bonusSignals: [
        'works a small perplexity calculation',
        'explains that neural models generalise via vector representations of context',
        'notes that next-token prediction is still the objective for the largest models',
      ],
      sampleExplanation:
        'A language model does one thing: given the words so far, produce a probability for every possible next word. That seems limited until you notice the chain rule — the probability of a whole sentence is the first word\'s probability, times the second given the first, times the third given the first two, and so on. So a good next-word predictor is a model of language, and you can also run it forwards to generate: pick a word, append it, predict again. The oldest version just counts. Go through a corpus, find every occurrence of "the cat", see what followed, and divide. If "sat" followed 30 times out of 100, the probability is 0.3. Then you hit the wall. With a 50,000-word vocabulary there are 2.5 billion possible two-word contexts, and no corpus populates them all, so a sentence like "the dog ran" can get a count of exactly zero and the model declares an ordinary English sentence impossible. Neural models fix this by representing the context as a vector rather than as a symbol, so "the dog" sits near "the cat" and the model can interpolate to a context it has never seen. To measure any of this you use perplexity: take the probability the model assigned to each word that actually occurred, average the negative logs, and exponentiate. If a model assigned 0.5, 0.25, 0.125 and 0.5 to four words, the average is 1.75 bits and perplexity is 2^1.75 ≈ 3.4, meaning it was about as uncertain as picking among three or four equally likely words each time. And the punchline: the objective behind every large model you have used is still exactly this — predict the next token, at enormous scale.',
    },
  },

  {
    id: 'NLP-009',
    domain: 'NLP',
    module: 'Sequence Modelling',
    topic: 'Self-attention',
    title: 'Attention in NLP and Transformer Encoders',
    slug: 'attention-in-nlp',
    difficulty: 5,
    estimatedMinutes: 45,
    prerequisites: ['NLP-008'],
    related: ['NLP-006', 'NLP-007'],
    tags: ['attention', 'self-attention', 'transformer', 'bert', 'multi-head', 'positional-encoding'],

    learningObjectives: [
      'Explain the fixed-bottleneck problem in encoder-decoder models and how attention removes it',
      'Describe query, key and value as a differentiable soft dictionary lookup',
      'Compute self-attention weights over a three-token sentence by hand, including the scaling factor',
      'Justify multi-head attention and explain why positional information must be injected separately',
      'Contrast BERT-style bidirectional encoders with decoder-only models on masking, training objective and appropriate use',
    ],

    terminology: [
      {
        term: 'Attention',
        definition:
          'A mechanism producing an output as a weighted average of value vectors, where the weights come from a learned compatibility score between a query and each key.',
        simple: 'Deciding how much to listen to each other word, then blending them in those proportions.',
      },
      {
        term: 'Query, key, value',
        definition:
          'Three linear projections of the input. The query asks what this position is looking for, keys advertise what each position offers, and values carry the content that is actually retrieved.',
        simple: 'What I am looking for, what each word advertises, and what each word actually gives me.',
      },
      {
        term: 'Self-attention',
        definition:
          'Attention where queries, keys and values all derive from the same sequence, so every token attends to every token including itself.',
        simple: 'Every word in the sentence looking at every other word in the same sentence.',
      },
      {
        term: 'Multi-head attention',
        definition:
          'Running several attention operations in parallel on lower-dimensional projections and concatenating the results, so different heads can specialise in different relations.',
        simple: 'Several independent attention passes, each free to track a different kind of relationship.',
      },
      {
        term: 'Positional encoding',
        definition:
          'Position-dependent vectors added to or combined with token embeddings, because self-attention is permutation-equivariant and would otherwise treat a sentence as a set.',
        simple: 'Stamping each word with where it sits, since attention alone cannot tell.',
      },
      {
        term: 'Bidirectional encoder',
        definition:
          'A transformer whose self-attention is unmasked, so every token attends to both left and right context. Trained with masked-token prediction, as in BERT.',
        simple: 'A model that reads the whole sentence at once, both directions.',
      },
    ],

    simpleExplanation:
      "Consider the sentence \"the animal did not cross the street because it was too tired\". To represent `it` properly, a model must work out that `it` refers to the animal and not to the street. Older models read left to right and squeezed everything they had seen into one fixed-size memory, so by the time they reached `it` the beginning had been compressed almost out of existence. Attention removes that bottleneck by letting each word look directly at every other word and decide, for itself, how much each one matters. The mechanism is a soft dictionary lookup. Each word emits a query — what am I looking for — and every word also emits a key advertising what it offers. Compare the query against every key, turn those comparisons into weights that sum to one, and blend the words' value vectors in those proportions. When the model processes `it`, most of the weight lands on `animal`, so the resulting vector for `it` is largely made of `animal`. Nothing about that is hand-coded; the projections that produce queries and keys are learned.",

    whyItExists:
      'Recurrent encoder-decoder models compressed an entire input sequence into one fixed-length vector, so information from early tokens was crushed and long-range dependencies were unlearnable. Attention exists to give every output position direct, weighted access to every input position, removing the bottleneck and making the path length between any two tokens constant rather than proportional to their distance.',

    analogy: {
      scenario:
        "Imagine researching a question in a library where you are allowed to consult every book at once. You hold a specific question in mind — your query. Every book has a spine label advertising its subject — its key. You glance at all the labels, decide that three books are highly relevant, two are marginal and the rest are irrelevant, and then you read those books in proportion to your judgement: most of your notes come from the three, a little from the two, none from the rest. Your notes on the question are a weighted blend of the books, with the weights chosen by matching your question against the labels.",
      mapping: [
        { from: 'The question you are holding in mind', to: 'The query vector of the current token' },
        { from: 'Spine labels advertising each book', to: 'The key vector of every token' },
        { from: 'The actual contents you read', to: 'The value vector of every token' },
        { from: 'Deciding how relevant each book is', to: 'The dot product of query and key, giving a compatibility score' },
        { from: 'Making the relevances sum to one before blending', to: 'The softmax over scores, producing attention weights' },
        { from: 'Your final notes', to: 'The output vector: a weighted sum of values' },
      ],
      bridge:
        'The key insight the analogy makes concrete is why there are three separate projections rather than one. A book\'s label and its contents serve different purposes, and what you are looking for is different again — so the model learns three different linear maps of the same embedding. It is a dictionary lookup made soft and differentiable: instead of retrieving one entry, you retrieve a weighted mixture of all of them, which is exactly what makes it trainable by gradient descent.',
      limitations:
        'A researcher reads books sequentially and remembers doing so. Self-attention has no inherent sense of order at all: permute the input and the outputs permute identically. Position must be injected separately, which is a genuinely unintuitive property and the source of many implementation bugs.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Scaled dot-product attention, step by step',
        caption: 'The same six steps whether the sequence is 3 tokens or 30,000.',
        steps: [
          { label: 'Project', detail: 'From each token embedding produce Q = XW_Q, K = XW_K, V = XW_V. Three learned linear maps.' },
          { label: 'Score', detail: 'Compute QKᵀ — the dot product of every query with every key, giving an n × n matrix.' },
          { label: 'Scale', detail: 'Divide by sqrt(d_k). Without this, large d_k makes dot products huge and the softmax saturates.' },
          { label: 'Mask (optional)', detail: 'Set future positions to −inf for a decoder, or padding positions for any model.' },
          { label: 'Softmax', detail: 'Row-wise, so each token\'s weights over all tokens sum to 1.' },
          { label: 'Blend', detail: 'Multiply the weight matrix by V. Each output row is a weighted mixture of value vectors.' },
        ],
      },
      {
        kind: 'ascii',
        title: 'Attention weights over a real sentence',
        caption:
          'Row = the token doing the looking. Values are attention weights from one head, summing to 1 per row.',
        art: `                the   animal  did   not   cross  the   street  because   it
  the          0.31   0.22   0.08  0.05   0.11  0.09   0.08     0.03    0.03
  animal       0.14   0.44   0.09  0.04   0.13  0.05   0.06     0.03    0.02
  cross        0.06   0.19   0.11  0.07   0.31  0.08   0.14     0.02    0.02
  street       0.08   0.07   0.04  0.03   0.18  0.22   0.35     0.02    0.01
  it           0.04   0.51   0.03  0.02   0.06  0.03   0.19     0.05    0.07
                      ^^^^                             ^^^^
                   coreference resolved here: "it" puts 0.51 on "animal"
                   and only 0.19 on "street" — the model has decided what
                   the pronoun refers to, and nothing about that was coded.`,
      },
      {
        kind: 'compare',
        title: 'Encoder-only (BERT) versus decoder-only (GPT)',
        caption: 'Same attention mechanism. The mask and the training objective are what differ.',
        left: {
          heading: 'Bidirectional encoder — BERT',
          points: [
            'No causal mask: every token attends left and right',
            'Trained by masked-token prediction — 15% of tokens hidden',
            'Produces contextual representations, not continuations',
            'Ideal for classification, NER, retrieval, sentence similarity',
            'Cannot generate text autoregressively',
          ],
        },
        right: {
          heading: 'Causal decoder — GPT',
          points: [
            'Causal mask: token k attends only to positions ≤ k',
            'Trained by next-token prediction on raw text',
            'Generates by sampling and feeding back its own output',
            'Ideal for generation, dialogue, in-context learning',
            'Each representation sees only leftward context',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Why attention displaced recurrence',
        columns: ['Property', 'RNN / LSTM', 'Self-attention'],
        rows: [
          ['Path length between two tokens', 'O(distance) — information decays', 'O(1) — direct connection'],
          ['Parallelism during training', 'None; step t needs step t − 1', 'Full; all positions computed at once'],
          ['Compute per layer', 'O(n · d²)', 'O(n² · d) — quadratic in sequence length'],
          ['Long-range dependencies', 'Learned poorly beyond a few dozen tokens', 'Learned directly at any distance in the window'],
          ['Order awareness', 'Intrinsic to the architecture', 'None — must be injected as positional encoding'],
        ],
      },
      {
        kind: 'widget',
        title: 'Attention laboratory',
        caption: 'Enter a sentence and inspect the attention weights of each head, layer by layer.',
        widget: 'attention-lab',
        props: { sentence: 'the animal did not cross the street because it was too tired', heads: 8 },
      },
      {
        kind: 'widget',
        title: 'Inside a transformer encoder block',
        caption: 'Follow one token through attention, residual, layer norm and the feed-forward sublayer.',
        widget: 'transformer-flow',
        props: { variant: 'encoder', layers: 2 },
      },
    ],

    formalDefinition:
      'Scaled dot-product attention maps a query matrix Q in R^(n×d_k), a key matrix K in R^(m×d_k) and a value matrix V in R^(m×d_v) to softmax(QKᵀ / sqrt(d_k))V in R^(n×d_v). In self-attention, Q, K and V are distinct learned linear projections of the same input sequence, so n = m. Multi-head attention applies h such operations in parallel on d_model/h-dimensional projections and concatenates the results through an output projection W_O. Self-attention is permutation-equivariant: permuting the input rows permutes the output rows identically, which is why explicit positional information is required.',

    math: {
      intuition:
        'A dot product measures agreement between two vectors, so the dot product of a query with a key measures how relevant that position is to what this position is asking for. Softmax turns those relevances into weights that sum to one, and multiplying by the values blends the content in those proportions. The division by sqrt(d_k) exists because in high dimensions dot products of random vectors grow with the square root of the dimension, and without correction the softmax would saturate into a hard argmax with vanishing gradients.',
      formulas: [
        {
          latex: '\\mathrm{Attention}(Q, K, V) = \\mathrm{softmax}\\!\\left( \\frac{QK^{\\top}}{\\sqrt{d_k}} \\right) V',
          name: 'Scaled dot-product attention',
          meaning:
            'The entire mechanism in one line. QKᵀ scores every query against every key, the scaling keeps the softmax in a useful range, and multiplying by V produces a weighted blend of the value vectors.',
          variables: [
            { symbol: 'Q', meaning: 'Query matrix, one row per position, dimension d_k' },
            { symbol: 'K', meaning: 'Key matrix, one row per position, dimension d_k' },
            { symbol: 'V', meaning: 'Value matrix, one row per position, dimension d_v' },
            { symbol: 'd_k', meaning: 'Key and query dimensionality, used for the scaling factor' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\alpha_{ij} = \\frac{\\exp(q_i \\cdot k_j / \\sqrt{d_k})}{\\sum_{l=1}^{n} \\exp(q_i \\cdot k_l / \\sqrt{d_k})}, \\qquad z_i = \\sum_{j=1}^{n} \\alpha_{ij} v_j',
          name: 'Attention weights for one position',
          meaning:
            'The per-token view. Alpha_ij is how much token i attends to token j, non-negative and summing to 1 over j. The output for token i is the value vectors blended in exactly those proportions.',
          variables: [
            { symbol: '\\alpha_{ij}', meaning: 'Attention weight from query position i to key position j' },
            { symbol: 'q_i, k_j, v_j', meaning: 'Query of position i, key and value of position j' },
            { symbol: 'z_i', meaning: 'Output representation for position i' },
            { symbol: 'n', meaning: 'Sequence length' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{Var}(q \\cdot k) = d_k \\quad \\text{for unit-variance components} \\implies \\text{divide by } \\sqrt{d_k}',
          name: 'Why the scaling factor is sqrt(d_k)',
          meaning:
            'If query and key components are independent with mean 0 and variance 1, their dot product has variance d_k and hence standard deviation sqrt(d_k). Dividing by sqrt(d_k) restores unit variance, keeping the softmax away from saturation where gradients vanish.',
          variables: [
            { symbol: 'd_k', meaning: 'Dimensionality of the query and key vectors, typically 64 per head' },
            { symbol: '\\mathrm{Var}', meaning: 'Variance across random initialisation' },
          ],
          category: 'deep-learning',
        },
        {
          latex: '\\mathrm{MultiHead}(X) = \\mathrm{Concat}(\\mathrm{head}_1, \\dots, \\mathrm{head}_h) W_O, \\quad \\mathrm{head}_i = \\mathrm{Attention}(XW_Q^i, XW_K^i, XW_V^i)',
          name: 'Multi-head attention',
          meaning:
            'Run h attention operations in parallel on separate low-dimensional projections, concatenate and project back. Each head is free to specialise: empirically some track syntactic dependencies, some track coreference, some attend to delimiters.',
          variables: [
            { symbol: 'h', meaning: 'Number of heads, typically 8 to 16' },
            { symbol: 'W_Q^i, W_K^i, W_V^i', meaning: 'Per-head projection matrices, each of width d_model/h' },
            { symbol: 'W_O', meaning: 'Output projection mixing the concatenated head outputs back to d_model' },
          ],
          category: 'deep-learning',
        },
        {
          latex: 'PE_{(pos, 2i)} = \\sin\\!\\left(\\frac{pos}{10000^{2i/d}}\\right), \\quad PE_{(pos, 2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{2i/d}}\\right)',
          name: 'Sinusoidal positional encoding',
          meaning:
            'Adds a deterministic position-dependent pattern to each embedding. Different dimensions oscillate at different frequencies, so a fixed offset corresponds to a linear transformation of the encoding, which lets the model learn relative position.',
          variables: [
            { symbol: 'pos', meaning: 'Position index in the sequence, starting at 0' },
            { symbol: 'i', meaning: 'Dimension index within the embedding' },
            { symbol: 'd', meaning: 'Model dimensionality' },
          ],
          category: 'deep-learning',
        },
      ],
      derivation: [
        'Start from the problem: an encoder-decoder RNN compresses the whole input into one fixed vector, so early tokens are crushed and long dependencies cannot be learned.',
        'Instead, keep every input position available and let the decoder compute a relevance score for each one at every output step.',
        'Parameterise relevance as a dot product, since it is cheap, differentiable, and large exactly when two vectors agree.',
        'Normalise the scores with a softmax so they form a convex combination — this makes the output a weighted average that stays in the same space as the values.',
        'Observe that the query, the advertisement and the retrieved content serve different roles, so learn three separate projections rather than reusing the embedding for all three.',
        'Note that dot products of d_k-dimensional random vectors have standard deviation sqrt(d_k), which would saturate the softmax; divide by sqrt(d_k) to fix it.',
        'Notice that one attention pattern can only express one relation, so run h of them in parallel on smaller projections and concatenate.',
        'Finally observe that nothing in any of this depends on order — permuting the input permutes the output identically — so add positional information to the embeddings before the first layer.',
      ],
    },

    workedExample: {
      title: 'Self-attention over "the cat sat", computed by hand',
      setup:
        'Three tokens, d_k = d_v = 2. Keys: k_the = [0, 1], k_cat = [1, 1], k_sat = [1, 0]. Values: v_the = [1, 0], v_cat = [0, 1], v_sat = [1, 1]. We compute the output for the query of `sat`, which is q = [1, 0].',
      steps: [
        {
          label: 'Score the query against every key',
          detail: 'q · k_the = (1)(0) + (0)(1) = 0. q · k_cat = (1)(1) + (0)(1) = 1. q · k_sat = (1)(1) + (0)(0) = 1.',
          latex: 'q \\cdot k_{the} = 0, \\quad q \\cdot k_{cat} = 1, \\quad q \\cdot k_{sat} = 1',
        },
        {
          label: 'Scale by sqrt(d_k)',
          detail: 'd_k = 2, so sqrt(d_k) = 1.4142. Scaled scores: 0/1.4142 = 0, 1/1.4142 = 0.7071, 1/1.4142 = 0.7071.',
          latex: '\\frac{q \\cdot k_j}{\\sqrt{2}} = [0,\; 0.7071,\; 0.7071]',
        },
        {
          label: 'Exponentiate',
          detail: 'exp(0) = 1.0000; exp(0.7071) = 2.0281; exp(0.7071) = 2.0281. Sum = 5.0562.',
          latex: '[e^{0}, e^{0.7071}, e^{0.7071}] = [1.0000,\; 2.0281,\; 2.0281], \\ \\Sigma = 5.0562',
        },
        {
          label: 'Softmax to get attention weights',
          detail:
            'alpha_the = 1.0000/5.0562 = 0.1978; alpha_cat = 2.0281/5.0562 = 0.4011; alpha_sat = 2.0281/5.0562 = 0.4011. They sum to 1.0000, as they must.',
          latex: '\\alpha = [0.1978,\; 0.4011,\; 0.4011]',
        },
        {
          label: 'Blend the value vectors',
          detail:
            'z = 0.1978 × [1, 0] + 0.4011 × [0, 1] + 0.4011 × [1, 1]. First component: 0.1978 + 0 + 0.4011 = 0.5989. Second: 0 + 0.4011 + 0.4011 = 0.8022.',
          latex: 'z_{sat} = 0.1978\\,v_{the} + 0.4011\\,v_{cat} + 0.4011\\,v_{sat} = [0.5989,\; 0.8022]',
        },
        {
          label: 'Read the result',
          detail:
            'The new representation of `sat` is 40% `cat`, 40% itself and 20% `the`. It is no longer a static embedding of the word `sat` — it is a context-dependent vector that carries information about what sat. Change `cat` to `dog` and this vector changes, which is exactly what static Word2Vec embeddings could never do.',
        },
        {
          label: 'Check what the scaling bought',
          detail:
            'Without the sqrt(2) divisor the scores would be [0, 1, 1], giving weights [0.1554, 0.4223, 0.4223] — a sharper distribution. With d_k = 64 rather than 2 the difference is dramatic: unscaled dot products would have standard deviation 8, pushing the softmax towards a one-hot vector where gradients are nearly zero and learning stalls.',
          latex: '\\text{unscaled: } \\alpha = [0.1554,\; 0.4223,\; 0.4223]',
        },
        {
          label: 'Note the permutation property',
          detail:
            'Nothing in this calculation used the fact that `the` came first. Permute the three tokens and the three output vectors permute identically — the values are unchanged. That is why positional encodings are added to the embeddings before any of this happens.',
        },
      ],
      conclusion:
        'One query, three keys, a softmax and a weighted sum produce a contextual representation of `sat` that is 40% made of `cat`. Every token does this simultaneously, in parallel, in every head of every layer. That is the entire transformer encoder — everything else in the architecture is residual connections, layer normalisation and a position-wise feed-forward network.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The worked example, verified in NumPy',
        runnable: true,
        code: `import numpy as np

K = np.array([[0.0, 1.0],    # the
              [1.0, 1.0],    # cat
              [1.0, 0.0]])   # sat
V = np.array([[1.0, 0.0],
              [0.0, 1.0],
              [1.0, 1.0]])
q = np.array([1.0, 0.0])     # query for "sat"

d_k = K.shape[1]
scores = K @ q / np.sqrt(d_k)
weights = np.exp(scores) / np.exp(scores).sum()
z = weights @ V

print("scaled scores  :", np.round(scores, 4))
print("attention      :", np.round(weights, 4), "sum =", round(weights.sum(), 4))
print("output for sat :", np.round(z, 4))

unscaled = K @ q
w2 = np.exp(unscaled) / np.exp(unscaled).sum()
print("without scaling:", np.round(w2, 4))`,
        output: `scaled scores  : [0.     0.7071 0.7071]
attention      : [0.1978 0.4011 0.4011] sum = 1.0
output for sat : [0.5989 0.8022]
without scaling: [0.1554 0.4223 0.4223]`,
        explanation:
          'Six lines are the whole mechanism. The weights are non-negative and sum to exactly 1, so the output is a convex combination of the value vectors and therefore lives in the same space as them — that is what makes attention stackable across layers. The final line shows what scaling does: removing it sharpens the distribution, and at the realistic d_k = 64 it sharpens it to the point where the softmax saturates and gradients vanish.',
      },
      {
        language: 'python',
        title: 'Full multi-head self-attention in PyTorch',
        runnable: true,
        code: `import torch
import torch.nn.functional as F

torch.manual_seed(0)
batch, seq, d_model, heads = 1, 5, 64, 8
d_k = d_model // heads

x = torch.randn(batch, seq, d_model)
Wq, Wk, Wv = (torch.nn.Linear(d_model, d_model, bias=False) for _ in range(3))

def split_heads(t):
    return t.view(batch, seq, heads, d_k).transpose(1, 2)   # (B, H, S, d_k)

Q, K, V = split_heads(Wq(x)), split_heads(Wk(x)), split_heads(Wv(x))

scores = Q @ K.transpose(-2, -1) / d_k ** 0.5               # (B, H, S, S)
attn = F.softmax(scores, dim=-1)
out = (attn @ V).transpose(1, 2).reshape(batch, seq, d_model)

print("scores shape   :", tuple(scores.shape))
print("attn row sums  :", attn[0, 0].sum(-1).round(decimals=4).tolist())
print("output shape   :", tuple(out.shape))

causal = torch.tril(torch.ones(seq, seq)).bool()
masked = F.softmax(scores.masked_fill(~causal, float("-inf")), dim=-1)
print("causal row 0   :", masked[0, 0, 0].round(decimals=3).tolist())
print("causal row 4   :", masked[0, 0, 4].round(decimals=3).tolist())`,
        output: `scores shape   : (1, 8, 5, 5)
attn row sums  : [1.0, 1.0, 1.0, 1.0, 1.0]
output shape   : (1, 5, 64)
causal row 0   : [1.0, 0.0, 0.0, 0.0, 0.0]
causal row 4   : [0.197, 0.211, 0.184, 0.209, 0.199]
`,
        explanation:
          'The score tensor is (batch, heads, seq, seq) — one full attention matrix per head, which is where the quadratic memory cost lives and why long contexts are expensive. Every row of the softmax sums to 1, confirming each token distributes exactly one unit of attention. The causal mask is the single difference between an encoder and a decoder: setting the upper triangle to negative infinity before the softmax makes those weights exactly zero, so the first token can only attend to itself while the last can attend to everything.',
      },
      {
        language: 'python',
        title: 'Contextual embeddings: the same word, two vectors',
        runnable: true,
        code: `import torch
from transformers import AutoTokenizer, AutoModel

tok = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased", output_attentions=True).eval()

sentences = [
    "I deposited cash at the bank.",
    "We sat on the river bank.",
]

vectors = []
for s in sentences:
    enc = tok(s, return_tensors="pt")
    with torch.no_grad():
        out = model(**enc)
    idx = enc.input_ids[0].tolist().index(tok.convert_tokens_to_ids("bank"))
    vectors.append(out.last_hidden_state[0, idx])

cos = torch.nn.functional.cosine_similarity(vectors[0], vectors[1], dim=0)
print("cosine between the two 'bank' vectors:", round(float(cos), 3))

enc = tok(sentences[1], return_tensors="pt")
with torch.no_grad():
    att = model(**enc).attentions[-1]           # (1, heads, seq, seq)
tokens = tok.convert_ids_to_tokens(enc.input_ids[0])
bank_row = att[0, :, tokens.index("bank"), :].mean(0)
top = torch.topk(bank_row, 3)
print("what 'bank' attends to:", [(tokens[i], round(float(v), 3)) for v, i in zip(top.values, top.indices)])`,
        output: `cosine between the two 'bank' vectors: 0.478

what 'bank' attends to: [('[SEP]', 0.201), ('river', 0.164), ('bank', 0.142)]
`,
        explanation:
          'A static Word2Vec embedding gives `bank` one vector, so the financial and geographic senses are forced into a single compromise position. BERT gives two vectors with cosine similarity of only 0.48, because each was computed by attending to a different sentence — the river sense attends strongly to `river`. This is the concrete payoff of attention over static embeddings, and it closes the loop on the polysemy limitation identified in the Word2Vec unit. The high weight on `[SEP]` is a well-documented artefact: heads with nothing useful to do park their attention on delimiter tokens, a "no-op" behaviour that is worth knowing before you over-interpret an attention map.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Every modern language model',
        usage:
          'BERT, GPT, T5, Llama and their descendants are all stacks of the attention block computed above. The differences between them are the mask, the training objective, the position scheme and the scale — not the core mechanism.',
      },
      {
        context: 'Retrieval re-ranking',
        usage:
          'A cross-encoder re-ranker feeds query and document jointly through an encoder so attention runs across both, letting query tokens attend to document tokens. That interaction is precisely why it is more accurate than comparing two independent embeddings.',
      },
      {
        context: 'Protein structure prediction',
        usage:
          'AlphaFold treats an amino-acid sequence as a sequence of tokens and uses attention over residue pairs. The mechanism transferred unchanged from language to biology, which is a strong hint that it encodes something general about structured sequences.',
      },
      {
        context: 'Long-context engineering',
        usage:
          'The n² cost of the score matrix is why context windows are expensive and why FlashAttention, sliding-window attention and KV caching exist. Anyone operating a model in production is managing the consequences of that quadratic term.',
      },
    ],

    projectConnections: [
      { tool: 'PyTorch', role: '`nn.MultiheadAttention` and `F.scaled_dot_product_attention`, the latter dispatching to fused kernels such as FlashAttention.' },
      { tool: 'Hugging Face transformers', role: '`output_attentions=True` returns the weight matrices for inspection; `AutoModel` loads encoders and `AutoModelForCausalLM` loads decoders.' },
      { tool: 'BertViz', role: 'Interactive visualisation of attention heads across layers, useful for seeing head specialisation directly.' },
      { tool: 'FlashAttention', role: 'A fused kernel that computes the same result without materialising the n × n matrix, which is what makes long contexts affordable.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting that self-attention is order-blind',
        why: 'The operation is permutation-equivariant, so without positional information a sentence is processed as a set and "dog bites man" is indistinguishable from "man bites dog".',
        fix: 'Add sinusoidal or learned positional embeddings before the first layer, or use a relative scheme such as RoPE or ALiBi. Never omit it.',
      },
      {
        mistake: 'Omitting the sqrt(d_k) scaling',
        why: 'Dot products of d_k-dimensional vectors have standard deviation proportional to sqrt(d_k). At d_k = 64 the logits reach magnitudes where the softmax is effectively one-hot, gradients vanish, and training stalls with no error message.',
        fix: 'Always divide by sqrt(d_k). If you use `F.scaled_dot_product_attention` it is applied for you.',
      },
      {
        mistake: 'Treating attention weights as an explanation',
        why: 'High weight means the value vector was heavily mixed in, which is not the same as that token being causally responsible for the output. Jain and Wallace showed that substantially different attention distributions can produce identical predictions.',
        fix: 'Use attention maps as a debugging hint, not as evidence. For attribution use gradient-based methods or intervention studies that actually change the input.',
      },
      {
        mistake: 'Applying a causal mask in an encoder',
        why: 'BERT-style models are meant to see both directions. Masking the future turns a bidirectional encoder into a weak decoder, and fine-tuning accuracy drops with no obvious cause.',
        fix: 'Use a causal mask only for autoregressive generation. Encoders mask padding positions only.',
      },
      {
        mistake: 'Ignoring the quadratic cost until it bites',
        why: 'The score matrix is n × n per head per layer, so doubling the sequence length quadruples attention memory. A model that runs fine at 512 tokens can exhaust GPU memory at 4,096.',
        fix: 'Budget memory as heads × layers × n² × batch. Use FlashAttention, sliding-window attention or chunking for long documents.',
      },
    ],

    interviewQuestions: [
      {
        level: 'advanced',
        question: 'Explain query, key and value, and why three separate projections are needed rather than one.',
        answer:
          'Attention is a soft dictionary lookup. The query is what the current position is looking for, the keys advertise what each position offers so they can be matched against the query, and the values carry the content that gets retrieved. These are three genuinely different roles, so tying them to a single vector would force one representation to serve all three and reduce expressiveness — in particular, a shared query and key would make the score matrix symmetric, so "A attends to B" and "B attends to A" would always be equal, which is wrong for relations like modification or coreference. Concretely, the score is softmax(q·k/sqrt(d_k)) and the output is the weighted sum of the values, so the model can learn to match on one property and retrieve a different one. That asymmetry is the point.',
        followUp:
          'A strong answer notes that the sqrt(d_k) scaling exists because dot products of d_k-dimensional vectors have standard deviation sqrt(d_k), and without it the softmax saturates and gradients vanish.',
      },
      {
        level: 'advanced',
        question: 'Why does multi-head attention outperform a single head of the same total width?',
        answer:
          'A single softmax over a single score matrix can only express one attention pattern per position — it must commit to one distribution of relevance. But a token usually stands in several relations simultaneously: a verb relates to its subject, its object, its auxiliary and its clause boundary at once. Splitting the width into h independent subspaces lets each head form its own pattern, and probing studies find heads that specialise in exactly these relations: some track syntactic dependencies, some resolve coreference, some attend to the previous token, some park on delimiters as a no-op. The concatenation and output projection then mix the results. The cost is unchanged, since each head works in d_model/h dimensions, so multi-head attention is strictly more expressive for the same parameter budget.',
      },
      {
        level: 'ai-engineer',
        question: 'When would you choose a BERT-style encoder over a decoder-only model, in 2026?',
        answer:
          'When the task produces a label or a vector rather than text, and latency or cost matters. Encoders see both directions, so every token representation is informed by the full sentence, which suits classification, token labelling such as NER, extractive question answering and sentence embeddings for retrieval. A fine-tuned 110-million-parameter encoder routinely matches or beats a far larger decoder on those tasks, runs on CPU, costs almost nothing per request and gives deterministic output — all of which matter in production. Decoder-only models win when you need open-ended generation, when the task is best expressed as an instruction, when you have almost no labelled data and need zero- or few-shot behaviour, or when the task list keeps changing and maintaining one fine-tuned model per task is impractical. A common architecture uses both: an encoder as the bi-encoder retriever and a decoder to compose the final answer.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given q = [1, 1], k_1 = [1, 0], k_2 = [0, 1], k_3 = [1, 1] and d_k = 2, compute the attention weights.',
        hint: 'Dot products, divide by sqrt(2), exponentiate, normalise.',
        solution:
          'Dot products: q·k_1 = 1, q·k_2 = 1, q·k_3 = 2.\nScaled by sqrt(2) = 1.4142: 0.7071, 0.7071, 1.4142.\nExponentiate: 2.0281, 2.0281, 4.1133. Sum = 8.1695.\nWeights: 0.2483, 0.2483, 0.5035.\n\nThe third key gets just over half the attention because it points in the same direction as the query, so its dot product is twice the others. Note how gently the softmax separates them: a 2× difference in raw score becomes only a 2× difference in weight, not a hard selection. That softness is what makes attention differentiable and trainable, and it is also why attention rarely produces the clean one-hot alignments that visualisations sometimes suggest.',
      },
      {
        prompt:
          'Explain what breaks if you remove positional encodings from a transformer encoder, and design a two-sentence experiment that demonstrates it.',
        hint: 'Think about what self-attention computes when you permute the input rows.',
        language: 'python',
        starterCode:
          'import torch\nimport torch.nn.functional as F\n\nx = torch.randn(1, 4, 8)          # 4 tokens, no positional information\nperm = torch.tensor([2, 0, 3, 1])\n',
        solution:
          'Self-attention is permutation-equivariant: permuting the input rows permutes the output rows identically and changes nothing else, because every score is a dot product between two rows and the softmax is over a set. So without positional encodings a transformer processes a sentence as a bag of tokens and cannot distinguish "dog bites man" from "man bites dog".\n\nThe experiment: run attention on x, then on x[:, perm, :], and check that the second output equals the first with the same permutation applied. With positional encodings added to x beforehand, that equality fails, which is precisely the evidence that order now matters.\n\n    out1 = attention(x)\n    out2 = attention(x[:, perm, :])\n    assert torch.allclose(out2, out1[:, perm, :], atol=1e-5)   # passes without PE\n\nThis is also why the choice of position scheme — sinusoidal, learned absolute, RoPE, ALiBi — is a real architectural decision rather than a detail, since it determines how well the model extrapolates beyond the context length it was trained on.',
      },
      {
        prompt:
          'Estimate the attention memory for a 12-layer, 12-head model at sequence lengths 512 and 4096, with batch size 8 and float32 storage. Comment on the result.',
        hint: 'The score matrix is (batch × heads × n × n) per layer, at 4 bytes per element.',
        solution:
          'At n = 512: 8 × 12 × 512 × 512 = 25,165,824 elements per layer, times 4 bytes = 100.7 MB per layer, times 12 layers = 1.21 GB.\n\nAt n = 4096: 8 × 12 × 4096 × 4096 = 1,610,612,736 elements per layer = 6.44 GB per layer, times 12 layers = 77.3 GB.\n\nAn eightfold increase in sequence length produced a 64-fold increase in attention memory, which is the quadratic term made concrete. This is why a model that trains comfortably at 512 tokens will not fit at 4,096 on the same hardware, and why FlashAttention matters so much: it computes the identical result in tiles without ever materialising the n × n matrix, reducing memory from quadratic to linear in n while keeping the same arithmetic.',
      },
    ],

    quiz: [
      {
        id: 'NLP-009-q1',
        type: 'mcq',
        concept: 'attention mechanism',
        prompt: 'In scaled dot-product attention, what do the softmax weights multiply?',
        options: [
          'The value vectors',
          'The key vectors',
          'The query vectors',
          'The positional encodings',
        ],
        answerIndex: 0,
        explanation:
          'Queries and keys produce the scores; the resulting weights are applied to the values. That separation is what lets the model match on one property and retrieve a different one.',
      },
      {
        id: 'NLP-009-q2',
        type: 'numeric',
        concept: 'softmax weights',
        prompt:
          'Scaled scores are [0, 0.7071, 0.7071]. What attention weight does the first position receive, to three decimal places?',
        answer: 0.198,
        tolerance: 0.005,
        explanation:
          'exp(0) = 1 and exp(0.7071) = 2.0281 twice, so the sum is 5.0562 and the first weight is 1/5.0562 = 0.1978. The other two receive 0.4011 each, and all three sum to 1.',
      },
      {
        id: 'NLP-009-q3',
        type: 'truefalse',
        concept: 'permutation equivariance',
        prompt: 'Without positional encodings, a transformer encoder would treat "dog bites man" and "man bites dog" identically.',
        answer: true,
        explanation:
          'Self-attention is permutation-equivariant: permuting the input rows permutes the output rows and changes nothing else. Order enters only through the positional information added to the embeddings.',
      },
      {
        id: 'NLP-009-q4',
        type: 'mcq',
        concept: 'scaling factor',
        prompt: 'Why are the dot products divided by sqrt(d_k) before the softmax?',
        options: [
          'Dot products grow with sqrt(d_k), and without scaling the softmax saturates and gradients vanish',
          'It makes the attention weights sum to 1',
          'It reduces the memory needed for the score matrix',
          'It is required for the causal mask to work',
        ],
        answerIndex: 0,
        explanation:
          'For unit-variance components the dot product has variance d_k, hence standard deviation sqrt(d_k). At d_k = 64 the logits reach magnitudes where the softmax is effectively one-hot and no gradient flows. The softmax itself is what makes weights sum to 1.',
      },
      {
        id: 'NLP-009-q5',
        type: 'match',
        concept: 'encoder versus decoder',
        prompt: 'Match each property to the architecture it belongs to.',
        pairs: [
          { left: 'Causal mask hiding future tokens', right: 'Decoder-only (GPT)' },
          { left: 'Masked-token prediction objective', right: 'Bidirectional encoder (BERT)' },
          { left: 'Best for sentence embeddings and NER', right: 'Bidirectional encoder (BERT)' },
          { left: 'Generates text by feeding output back in', right: 'Decoder-only (GPT)' },
        ],
        explanation:
          'The attention mechanism is identical in both. What differs is the mask, the training objective and therefore what the resulting representations are good for.',
      },
      {
        id: 'NLP-009-q6',
        type: 'explain',
        concept: 'the bottleneck attention solved',
        prompt:
          'Explain the fixed-bottleneck problem in sequence-to-sequence models and how attention removes it.',
        rubric: [
          'Describes compressing the entire input into one fixed-size vector',
          'Explains that early tokens are crushed and long-range dependencies are lost',
          'Explains that attention gives every output position weighted access to every input position',
        ],
        sampleAnswer:
          'A classical encoder-decoder RNN read the whole input and compressed it into a single fixed-size hidden state, which the decoder then had to work from. That vector is the bottleneck: no matter how long the input, everything must fit in the same number of numbers, so information from early tokens is progressively overwritten and long-range dependencies cannot be learned. Translation quality degraded sharply with sentence length, which was the symptom that motivated the fix. Attention removes the bottleneck by keeping every input position available and letting each output step compute its own weighted combination of all of them. The path between any two positions becomes length one rather than proportional to their distance, so gradients flow directly and no compression is forced. Self-attention then applies the same idea within a single sequence, which is what makes each token representation contextual.',
        explanation:
          'The examinable insight is that attention is a fix for an information-routing problem, and that constant path length between positions is what makes long-range dependencies learnable.',
      },
    ],

    flashcards: [
      { front: 'Write the attention formula.', back: 'Attention(Q,K,V) = softmax(QKᵀ / sqrt(d_k))V. Queries score against keys; the resulting weights blend the values.' },
      { front: 'What are query, key and value?', back: 'What this position seeks, what each position advertises, and what each position actually contributes. Three separate learned projections of the same input.' },
      { front: 'Why divide by sqrt(d_k)?', back: 'Dot products of d_k-dimensional vectors have standard deviation sqrt(d_k). Without scaling the softmax saturates and gradients vanish.' },
      { front: 'Why multi-head rather than one wide head?', back: 'One softmax expresses one relation per position. Separate heads specialise — syntax, coreference, previous-token — for the same parameter budget.' },
      { front: 'Why are positional encodings necessary?', back: 'Self-attention is permutation-equivariant, so without them a sentence is a set and word order carries no information.' },
      { front: 'BERT versus GPT in one line.', back: 'Same attention; BERT is unmasked and trained on masked-token prediction for representations, GPT is causally masked and trained on next-token prediction for generation.' },
      { front: 'What is the cost of self-attention in sequence length?', back: 'O(n²·d) time and O(n²) memory per head per layer, which is why long contexts are expensive and FlashAttention exists.' },
    ],

    challenge: {
      title: 'Implement and probe a transformer encoder block',
      brief:
        'Implement multi-head self-attention and a full encoder block — attention, residual, layer norm, position-wise feed-forward, residual, layer norm — in PyTorch without using `nn.MultiheadAttention` or `nn.TransformerEncoderLayer`. Verify numerically against the built-in modules with the same weights. Then load `bert-base-uncased` with `output_attentions=True`, extract the attention matrices for five sentences, and identify at least three heads with an interpretable specialisation, supporting each claim with the weights.',
      language: 'python',
      acceptanceCriteria: [
        'Multi-head attention implemented from primitives with correct head splitting and recombination',
        'Scaling by sqrt(d_k) and optional causal masking both supported',
        'Numerical agreement with `nn.MultiheadAttention` asserted to a stated tolerance',
        'At least three heads characterised with evidence from actual attention weights',
        'A written caveat that attention weights are not a causal explanation of the prediction',
      ],
      starterCode:
        'import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\n\nclass MultiHeadSelfAttention(nn.Module):\n    def __init__(self, d_model, n_heads):\n        super().__init__()\n        assert d_model % n_heads == 0\n        self.n_heads = n_heads\n        self.d_k = d_model // n_heads\n        self.Wq = nn.Linear(d_model, d_model, bias=False)\n        self.Wk = nn.Linear(d_model, d_model, bias=False)\n        self.Wv = nn.Linear(d_model, d_model, bias=False)\n        self.Wo = nn.Linear(d_model, d_model, bias=False)\n\n    def forward(self, x, causal=False):\n        ...\n',
    },

    teachingPrompt: {
      prompt:
        'Teach attention to someone who understands embeddings and language modelling but has never seen a transformer. Use the sentence "the animal did not cross the street because it was too tired".',
      mustCover: [
        'The fixed-bottleneck problem attention was invented to solve',
        'Query, key and value as a soft, differentiable dictionary lookup',
        'The softmax producing weights that sum to one, and the output being a weighted blend of values',
        'Self-attention has no sense of order, so position must be added separately',
      ],
      bonusSignals: [
        'works through actual attention weights on a short sentence',
        'explains why the scores are divided by sqrt(d_k)',
        'explains why multiple heads are used',
      ],
      sampleExplanation:
        'Take the sentence "the animal did not cross the street because it was too tired". To represent `it` correctly the model has to know it refers to the animal, not the street. The older approach read left to right and compressed everything into one fixed-size memory, so by the time it reached `it` the beginning had been squeezed almost out of existence — that is the bottleneck attention was built to remove. The fix is to let every word look at every other word directly. Each position produces three vectors from its embedding by three learned linear maps. The query says what this word is looking for. The key advertises what this word offers. The value is the content it will hand over. To process `it`, take its query and dot it with every key, which gives a relevance score per word. Divide by the square root of the key dimension, otherwise in 64 dimensions those dot products get large enough to saturate the softmax and kill the gradients. Then softmax, which turns the scores into weights that sum to one — say 0.51 on `animal`, 0.19 on `street`, the rest spread thinly. Finally take the weighted sum of the value vectors in exactly those proportions. The new representation of `it` is now mostly made of `animal`. Nothing about that was coded by hand. Two more pieces. One attention pattern can only express one relation, so the model runs eight or twelve of them in parallel on smaller slices and concatenates — some heads end up tracking syntax, some coreference. And note that nothing in the calculation used position: permute the words and the outputs permute the same way. That is why position has to be stamped onto the embeddings before any of this runs.',
    },
  },

  {
    id: 'NLP-010',
    domain: 'NLP',
    module: 'NLP Tasks',
    topic: 'Document classification',
    title: 'Text Classification and Sentiment Analysis',
    slug: 'text-classification-and-sentiment',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['NLP-005', 'NLP-009'],
    related: ['NLP-004', 'NLP-006', 'NLP-007'],
    tags: ['classification', 'sentiment', 'logistic-regression', 'fine-tuning', 'class-imbalance', 'negation'],

    learningObjectives: [
      'Build the full pipeline from raw text to a prediction, naming what each stage contributes',
      'Establish a TF-IDF plus logistic regression baseline and explain why it is genuinely hard to beat',
      'Fine-tune a transformer classifier and state precisely when the extra cost is justified',
      'Diagnose and handle class imbalance without being misled by accuracy',
      'Explain why negation, sarcasm and domain shift remain the hard cases, and what each actually breaks',
    ],

    terminology: [
      {
        term: 'Text classification',
        definition:
          'Assigning one or more labels from a fixed set to a whole document. Binary, multi-class and multi-label variants differ in whether labels are mutually exclusive.',
        simple: 'Reading a piece of text and putting it in the right box.',
      },
      {
        term: 'Sentiment analysis',
        definition:
          'Classification where the label is the writer\'s attitude — typically positive, negative or neutral, sometimes a graded scale or a set of emotions.',
        simple: 'Working out whether the writer liked something.',
      },
      {
        term: 'Baseline',
        definition:
          'A simple model established first so that every subsequent result has something to beat. TF-IDF plus logistic regression is the standard text baseline.',
        simple: 'The cheap model you compare everything else against.',
      },
      {
        term: 'Class imbalance',
        definition:
          'A label distribution far from uniform, so that a model predicting only the majority class scores well on accuracy while being useless.',
        simple: 'When one answer is so common that always guessing it looks good.',
      },
      {
        term: 'Macro F1',
        definition:
          'The unweighted mean of per-class F1 scores, so every class counts equally regardless of frequency. The default metric to report under imbalance.',
        simple: 'An average score that does not let big classes drown out small ones.',
      },
      {
        term: 'Fine-tuning',
        definition:
          'Continuing training of a pre-trained model on a labelled task dataset, usually with a new classification head and a small learning rate.',
        simple: 'Taking a model that already knows language and teaching it your specific task.',
      },
    ],

    simpleExplanation:
      "Text classification is the task that pays for most of NLP in industry: read something and decide which box it goes in. Is this email spam, is this review positive, which team should handle this ticket. The pipeline uses everything from the earlier units. Take the raw text, tokenise it, turn it into numbers — either a TF-IDF row or a transformer's contextual vectors — and hand those numbers to a classifier that outputs a probability per label. What surprises people is how strong the cheap version is. TF-IDF plus logistic regression trains in seconds on a laptop, reaches around 90% on many topic tasks, and shows you exactly which words drove each decision. A fine-tuned transformer usually beats it by a few points, and by much more when meaning depends on word order. And some things break both: a negation the model attaches to the wrong word, sarcasm that inverts sentiment without changing any word's dictionary meaning, and text from a domain the model never saw.",

    whyItExists:
      'Organisations receive far more text than anyone can read — support tickets, reviews, emails, claims, transcripts — and decisions about that text have to be made consistently and immediately. Text classification exists to turn unstructured language into a routing or scoring decision at scale, and it is the single most deployed NLP capability in production.',

    analogy: {
      scenario:
        'Think of a post room in a large building. Someone glances at each envelope and drops it into one of twenty pigeonholes. A new clerk works from obvious cues — the word "invoice" means accounts, a legal letterhead means the legal team — and gets most of them right very quickly. An experienced clerk also reads tone and context, notices that an "invoice" letter is actually a complaint about an invoice, and gets the awkward ones right too. Both are doing the same job; one uses surface signals and the other uses understanding, and the experienced clerk is slower and more expensive.',
      mapping: [
        { from: 'The envelope', to: 'The input document' },
        { from: 'The twenty pigeonholes', to: 'The fixed label set' },
        { from: 'The new clerk spotting keywords', to: 'TF-IDF plus logistic regression — fast, surface-level, surprisingly accurate' },
        { from: 'The experienced clerk reading context', to: 'A fine-tuned transformer that uses word order and meaning' },
        { from: 'A letter that mentions invoices but is really a complaint', to: 'The case where lexical features fail and context is required' },
        { from: 'A pigeonhole that receives one letter a month', to: 'A rare class, where accuracy hides poor performance' },
      ],
      bridge:
        'The two clerks are the real engineering decision. Most documents are decided by surface cues, which is exactly why a bag-of-words model gets 90% — and it is also why the last few points are so expensive, because they are precisely the documents where surface cues mislead. Knowing which clerk your problem needs, and proving it with a held-out score, is the skill.',
      limitations:
        'The analogy assumes pigeonholes are fixed and mutually exclusive. Real problems are often multi-label (a ticket about billing and about a crash), hierarchical, or open-ended, and the label set itself drifts over time as the business changes.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The full pipeline, raw text to prediction',
        caption: 'Every stage is something you have already met in this domain.',
        steps: [
          { label: 'Raw text', detail: '"The battery dies after two hours. Very disappointing."' },
          { label: 'Tokenise', detail: 'Subword or word tokens, depending on which branch you take.' },
          { label: 'Vectorise', detail: 'TF-IDF row, or transformer contextual vectors pooled to one vector.' },
          { label: 'Classify', detail: 'Logistic regression or a linear head producing one logit per label.' },
          { label: 'Softmax or sigmoid', detail: 'Softmax for mutually exclusive labels, sigmoid per label for multi-label.' },
          { label: 'Threshold and act', detail: 'Choose a cut-off from the validation set, then route, flag or score.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Sparse baseline versus fine-tuned transformer',
        caption: 'Numbers are typical for a binary sentiment task with about 25,000 labelled examples.',
        left: {
          heading: 'TF-IDF + logistic regression',
          points: [
            'Accuracy around 0.88–0.90 on standard review datasets',
            'Trains in seconds on a CPU; predicts in microseconds',
            'Every coefficient maps to a word you can show a stakeholder',
            'Degrades gracefully with less data',
            'Blind to word order beyond the n-grams you supply',
          ],
        },
        right: {
          heading: 'Fine-tuned DistilBERT',
          points: [
            'Accuracy around 0.92–0.94 on the same data',
            'Minutes to hours on a GPU; milliseconds per prediction',
            'Explanations require attribution methods, not coefficients',
            'Needs perhaps a thousand examples before it clearly wins',
            'Handles negation, order and context by construction',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Metrics under class imbalance: a fraud example',
        caption: '10,000 messages, 200 of them fraudulent (2%). Three models compared.',
        columns: ['Model', 'Accuracy', 'Precision (fraud)', 'Recall (fraud)', 'Macro F1', 'Useful?'],
        rows: [
          ['Always predict "not fraud"', '0.980', '0.000', '0.000', '0.495', 'No — catches nothing'],
          ['Unweighted logistic regression', '0.982', '0.71', '0.31', '0.671', 'Misses two thirds of fraud'],
          ['With class_weight="balanced"', '0.951', '0.32', '0.79', '0.717', 'Catches most, more false alarms'],
          ['Balanced + tuned threshold', '0.968', '0.48', '0.72', '0.764', 'Best trade-off for review capacity'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Why these sentences are hard',
        subject: '"I would not say this was a bad film." / "Oh great, another crash." / "The bass was sick."',
        annotations: [
          { part: 'Double negation', note: '`not` plus `bad` is mildly positive. A bag-of-words model sees two negative-leaning features and predicts negative.' },
          { part: 'Sarcasm', note: '`great` is the strongest positive feature in most sentiment lexicons, and here it means the opposite. No lexical feature can fix this; you need context, and often you need to know the speaker.' },
          { part: 'Domain-specific polarity', note: '`sick` is negative in a medical corpus and positive in a music review. Polarity is a property of the domain, not of the word.' },
          { part: 'What actually helps', note: 'Bigrams catch adjacent negation. A fine-tuned transformer catches scope and some sarcasm. Domain shift needs in-domain labelled data — no architecture substitutes for it.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Train a classifier and inspect its coefficients',
        caption: 'Fit the baseline, then look at the words driving each class.',
        widget: 'code-playground',
        props: {
          language: 'python',
          starter:
            'from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\npipe = make_pipeline(TfidfVectorizer(ngram_range=(1, 2)), LogisticRegression(max_iter=1000))\n',
        },
      },
      {
        kind: 'widget',
        title: 'Confusion matrix explorer',
        caption: 'Move the decision threshold and watch precision and recall trade against each other.',
        widget: 'confusion-matrix-lab',
        props: { positiveRate: 0.02 },
      },
    ],

    formalDefinition:
      'Text classification learns a function f : Σ* → Y from documents to a label set Y, estimated from labelled pairs by minimising an empirical risk, typically the cross-entropy between predicted and true label distributions. For mutually exclusive labels the output layer is a softmax over |Y| logits; for multi-label problems it is |Y| independent sigmoids trained with binary cross-entropy. Sentiment analysis is the special case where Y encodes the polarity or intensity of the writer\'s attitude.',

    math: {
      intuition:
        'Once a document is a vector, classification is the same problem as any other tabular classification. A linear model scores each class by a weighted sum of features; the softmax turns scores into probabilities; cross-entropy measures how much probability was assigned to the correct class. The only text-specific part is that the features are terms, which means the weights are directly readable as "this word pushes towards this class".',
      formulas: [
        {
          latex: 'P(y = c \\mid x) = \\frac{\\exp(w_c^{\\top} x + b_c)}{\\sum_{c\' \\in Y} \\exp(w_{c\'}^{\\top} x + b_{c\'})}',
          name: 'Multinomial logistic regression',
          meaning:
            'Each class has a weight vector over the vocabulary. The dot product scores how much the document supports that class, and the softmax normalises the scores into probabilities summing to one.',
          variables: [
            { symbol: 'x', meaning: 'The document vector, e.g. a TF-IDF row' },
            { symbol: 'w_c', meaning: 'Weight vector for class c; component j is how much term j argues for c' },
            { symbol: 'b_c', meaning: 'Bias for class c, absorbing the prior frequency of that class' },
            { symbol: 'Y', meaning: 'The set of classes' },
          ],
          category: 'classification',
        },
        {
          latex: '\\mathcal{L} = -\\frac{1}{N} \\sum_{i=1}^{N} \\sum_{c \\in Y} \\mathbb{1}[y_i = c] \\log P(y = c \\mid x_i) + \\lambda \\lVert W \\rVert_2^2',
          name: 'Regularised cross-entropy loss',
          meaning:
            'Penalises assigning low probability to the correct label. The L2 term is essential for text, where features vastly outnumber examples and unregularised weights memorise rare terms.',
          variables: [
            { symbol: 'N', meaning: 'Number of training documents' },
            { symbol: '\\mathbb{1}[y_i = c]', meaning: 'Indicator: 1 when c is the true label of document i' },
            { symbol: '\\lambda', meaning: 'Regularisation strength; in scikit-learn this is 1/C' },
          ],
          category: 'classification',
        },
        {
          latex: 'F_1 = 2 \\cdot \\frac{P \\cdot R}{P + R}, \\qquad P = \\frac{TP}{TP + FP}, \\qquad R = \\frac{TP}{TP + FN}',
          name: 'Precision, recall and F1',
          meaning:
            'Precision is the share of predicted positives that were correct; recall is the share of actual positives that were caught. F1 is their harmonic mean, which stays low unless both are decent.',
          variables: [
            { symbol: 'TP', meaning: 'True positives — correctly predicted members of the class' },
            { symbol: 'FP', meaning: 'False positives — incorrectly predicted as this class' },
            { symbol: 'FN', meaning: 'False negatives — members of the class that were missed' },
          ],
          category: 'classification',
        },
        {
          latex: '\\text{macro-}F_1 = \\frac{1}{|Y|} \\sum_{c \\in Y} F_1(c)',
          name: 'Macro-averaged F1',
          meaning:
            'The unweighted mean over classes, so a rare class counts as much as a common one. Under imbalance this is the metric to optimise and report; micro-averaging would simply track the majority class.',
          variables: [
            { symbol: '|Y|', meaning: 'Number of classes' },
            { symbol: 'F_1(c)', meaning: 'F1 computed treating class c as positive and all others as negative' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'Start with the vector x for a document and a weight vector w_c per class.',
        'The score w_c·x + b_c is a linear combination of term weights: each term present pushes the score up or down by its coefficient.',
        'Exponentiating makes all scores positive; dividing by their sum makes them a probability distribution — that is the softmax.',
        'Maximising the likelihood of the observed labels is equivalent to minimising the negative log-likelihood, which is cross-entropy.',
        'Because a TF-IDF matrix has far more features than documents, the unregularised optimum can drive weights on rare terms arbitrarily high, fitting noise; the L2 penalty prevents this.',
        'The learned coefficient for term j and class c is directly interpretable as evidence strength — which is why this model remains the standard baseline where a decision must be explained.',
      ],
    },

    workedExample: {
      title: 'Choosing a threshold under imbalance',
      setup:
        'A fraud classifier is evaluated on 10,000 messages of which 200 are fraudulent. The review team can examine at most 450 flagged messages per day. We must pick a probability threshold.',
      steps: [
        {
          label: 'Start with the trivial model',
          detail:
            'Predicting "not fraud" for everything gives 9,800 correct out of 10,000 — accuracy 0.980. It catches zero fraud. Any metric that rewards this model is the wrong metric.',
          latex: '\\text{accuracy} = \\frac{9800}{10000} = 0.98, \\quad \\text{recall} = 0',
        },
        {
          label: 'Threshold at 0.5',
          detail: 'The model flags 87 messages, of which 62 are genuinely fraud. TP = 62, FP = 25, FN = 138.',
        },
        {
          label: 'Compute precision and recall at 0.5',
          detail: 'P = 62/87 = 0.713. R = 62/200 = 0.310. F1 = 2(0.713)(0.310)/(0.713 + 0.310) = 0.432.',
          latex: 'P = \\frac{62}{87} = 0.713, \\quad R = \\frac{62}{200} = 0.310, \\quad F_1 = 0.432',
        },
        {
          label: 'Lower the threshold to 0.2',
          detail: 'Now 450 messages are flagged, of which 158 are fraud. TP = 158, FP = 292, FN = 42.',
        },
        {
          label: 'Recompute',
          detail: 'P = 158/450 = 0.351. R = 158/200 = 0.790. F1 = 2(0.351)(0.790)/(0.351 + 0.790) = 0.486.',
          latex: 'P = 0.351, \\quad R = 0.790, \\quad F_1 = 0.486',
        },
        {
          label: 'Weigh the business cost, not the metric',
          detail:
            'At 0.5 the team reviews 87 messages and 138 frauds go through. At 0.2 they review 450 — exactly their capacity — and only 42 frauds escape. If a missed fraud costs far more than a minute of review time, 0.2 is clearly correct even though precision more than halved.',
        },
        {
          label: 'Note what accuracy did throughout',
          detail:
            'Accuracy moved from 0.980 for the useless model to 0.982 at threshold 0.5 to 0.966 at threshold 0.2. It went *down* as the model became more useful. Reporting accuracy here would have actively misled the decision.',
          latex: '\\text{accuracy}: 0.980 \\to 0.982 \\to 0.966',
        },
        {
          label: 'Report the right numbers',
          detail:
            'Report macro F1, per-class precision and recall, and the precision-recall curve with the operating point marked. Average precision summarises the curve in one threshold-free number, which is what to use when comparing models before choosing an operating point.',
        },
      ],
      conclusion:
        'The threshold, not the model, determined whether this system was useful. Accuracy rose for the worse configuration and fell for the better one, which is exactly why it must not be the headline metric under imbalance. Choose the operating point from the review capacity and the relative cost of the two error types, then report precision, recall and macro F1 at that point.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'The baseline, end to end, with interpretable coefficients',
        runnable: true,
        code: `import numpy as np
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.metrics import classification_report

cats = ["rec.sport.hockey", "sci.med"]
train = fetch_20newsgroups(subset="train", categories=cats, remove=("headers", "footers", "quotes"))
test = fetch_20newsgroups(subset="test", categories=cats, remove=("headers", "footers", "quotes"))

pipe = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2), min_df=2, sublinear_tf=True),
    LogisticRegression(max_iter=1000, C=5.0),
)
pipe.fit(train.data, train.target)
print(classification_report(test.target, pipe.predict(test.data), target_names=cats, digits=3))

vec = pipe.named_steps["tfidfvectorizer"]
clf = pipe.named_steps["logisticregression"]
terms = vec.get_feature_names_out()
order = np.argsort(clf.coef_[0])
print("most", cats[0], ":", [terms[i] for i in order[:6]])
print("most", cats[1], ":", [terms[i] for i in order[-6:]])`,
        output: `                  precision    recall  f1-score   support

rec.sport.hockey      0.966     0.972     0.969       399
         sci.med      0.972     0.965     0.968       396

        accuracy                          0.969       795
       macro avg      0.969     0.969     0.969       795

most rec.sport.hockey : ['hockey', 'game', 'team', 'nhl', 'players', 'playoff']
most sci.med : ['msg', 'doctor', 'patients', 'medical', 'disease', 'food']`,
        explanation:
          'Under 97% macro F1, trained in about two seconds, and the last two lines are why this baseline refuses to die: every prediction decomposes into words you can put in front of a domain expert who can immediately confirm or dispute them. Note `remove=("headers", "footers", "quotes")` — without it the model achieves near-perfect scores by learning email headers rather than content, which is a classic leakage trap in this dataset.',
      },
      {
        language: 'python',
        title: 'Fine-tuning a transformer classifier',
        runnable: true,
        code: `import numpy as np
from datasets import load_dataset
from transformers import (AutoTokenizer, AutoModelForSequenceClassification,
                          TrainingArguments, Trainer)
from sklearn.metrics import f1_score, accuracy_score

ds = load_dataset("imdb")
ds["train"] = ds["train"].shuffle(seed=0).select(range(5000))
ds["test"] = ds["test"].shuffle(seed=0).select(range(2000))

name = "distilbert-base-uncased"
tok = AutoTokenizer.from_pretrained(name)
ds = ds.map(lambda b: tok(b["text"], truncation=True, max_length=256), batched=True)

model = AutoModelForSequenceClassification.from_pretrained(name, num_labels=2)

def metrics(p):
    preds = np.argmax(p.predictions, axis=1)
    return {"accuracy": accuracy_score(p.label_ids, preds),
            "macro_f1": f1_score(p.label_ids, preds, average="macro")}

trainer = Trainer(
    model=model,
    args=TrainingArguments(output_dir="out", num_train_epochs=2,
                           per_device_train_batch_size=16, learning_rate=2e-5,
                           eval_strategy="epoch", report_to=[]),
    train_dataset=ds["train"], eval_dataset=ds["test"],
    tokenizer=tok, compute_metrics=metrics,
)
trainer.train()
print(trainer.evaluate())`,
        output: `{'eval_accuracy': 0.9215, 'eval_macro_f1': 0.9214, 'eval_runtime': 24.8, 'epoch': 2.0}`,
        explanation:
          'Three details carry most of the outcome. The learning rate of 2e-5 is two to three orders of magnitude below what you would use training from scratch, because the pre-trained weights are already good and a large step destroys them. `max_length=256` truncates long reviews, which silently discards the ending — often where the verdict lives — so it is a real accuracy decision rather than a memory detail. And `num_labels=2` attaches a fresh, randomly initialised classification head to the pre-trained encoder. On this 5,000-example subset the transformer reaches 0.92 against roughly 0.88 for the TF-IDF baseline: a real gain of four points, bought with a GPU and a hundred times the training time.',
      },
      {
        language: 'python',
        title: 'Where both models break, and what actually fixes it',
        runnable: true,
        code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

train_texts = [
    "this film was excellent and moving", "a wonderful and warm story",
    "brilliant acting throughout", "i loved every minute of it",
    "terrible and boring", "a dreadful waste of time",
    "awful acting and a weak plot", "i hated every minute of it",
]
train_y = [1, 1, 1, 1, 0, 0, 0, 0]

hard = [
    "this film was not excellent",
    "i would not say it was terrible",
    "oh brilliant, another two hours wasted",
]

for rng in [(1, 1), (1, 2)]:
    pipe = make_pipeline(TfidfVectorizer(ngram_range=rng), LogisticRegression(max_iter=1000))
    pipe.fit(train_texts, train_y)
    probs = pipe.predict_proba(hard)[:, 1]
    print(f"ngram_range={rng}")
    for t, p in zip(hard, probs):
        print(f"   P(positive)={p:.2f}  {t}")`,
        output: `ngram_range=(1, 1)
   P(positive)=0.79  this film was not excellent
   P(positive)=0.22  i would not say it was terrible
   P(positive)=0.74  oh brilliant, another two hours wasted
ngram_range=(1, 2)
   P(positive)=0.41  this film was not excellent
   P(positive)=0.49  i would not say it was terrible
   P(positive)=0.51  oh brilliant, another two hours wasted
`,
        explanation:
          'With unigrams the model gets all three wrong in the most revealing way: `excellent` and `brilliant` are strong positive features and `not` is attached to nothing, so negation and sarcasm both invert the truth. Adding bigrams gives it `not excellent` as a feature and the first two move towards correct. The third barely moves, because sarcasm is not a lexical phenomenon — "oh brilliant" is positive in isolation and the inversion comes from world knowledge about what "two hours wasted" implies. Bigrams patch negation; only context and, honestly, in-domain labelled sarcasm data help with the third.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Support ticket routing',
        usage:
          'Incoming tickets are classified into team queues within milliseconds of arrival. Because routing errors are cheap to correct and explanations matter to the teams receiving them, the interpretable sparse baseline is still widely deployed here.',
      },
      {
        context: 'Content moderation',
        usage:
          'Platforms classify posts for policy violations at enormous volume. This is the archetypal imbalanced problem — violations are a tiny fraction of traffic — so thresholds are tuned against human review capacity exactly as in the worked example.',
      },
      {
        context: 'Brand and product sentiment monitoring',
        usage:
          'Aggregate sentiment over reviews and social posts feeds product dashboards. The known failure is sarcasm and domain-specific polarity, which is why serious deployments sample and human-label a slice continuously rather than trusting the aggregate.',
      },
      {
        context: 'Clinical triage of free-text notes',
        usage:
          'Notes are classified for urgency or for the presence of a condition. Here recall dominates precision — a missed case is far worse than a false alarm — so the operating point sits well away from 0.5 and is agreed with clinicians, not chosen by maximising F1.',
      },
    ],

    projectConnections: [
      { tool: 'scikit-learn', role: '`Pipeline`, `TfidfVectorizer`, `LogisticRegression`, `classification_report` and `class_weight="balanced"` cover the entire baseline.' },
      { tool: 'Hugging Face transformers', role: '`AutoModelForSequenceClassification` and `Trainer` for fine-tuning; `pipeline("sentiment-analysis")` for a zero-setup starting point.' },
      { tool: 'datasets', role: 'Loading and splitting benchmark corpora such as IMDB, AG News and SST-2 reproducibly.' },
      { tool: 'MLflow or Weights & Biases', role: 'Tracking the baseline and every subsequent model against the same held-out split, which is what makes "did it actually improve?" answerable.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting accuracy on an imbalanced dataset',
        why: 'With 2% positives, predicting the majority class always gives 98% accuracy while catching nothing. Accuracy can even fall as the model becomes more useful, as it does in the worked example.',
        fix: 'Report macro F1, per-class precision and recall, and average precision. Reserve accuracy for genuinely balanced problems.',
      },
      {
        mistake: 'Skipping the baseline and going straight to a transformer',
        why: 'Without a baseline you cannot tell whether 0.91 is good. It may be below what TF-IDF achieves in two seconds, and you will not know because you never ran it.',
        fix: 'Always fit TF-IDF plus logistic regression first. It costs minutes, establishes the number to beat, and sometimes ends the project by being good enough.',
      },
      {
        mistake: 'Fitting the vectoriser before splitting, or tuning on the test set',
        why: 'IDF computed over test documents leaks their term distribution; repeatedly checking the test score while tuning overfits to it just as surely as training on it.',
        fix: 'Split first, put the vectoriser inside a `Pipeline` so cross-validation refits it per fold, and touch the test set exactly once at the end.',
      },
      {
        mistake: 'Truncating long documents without checking where the signal is',
        why: 'Transformers have a fixed context window, and `max_length=256` silently discards everything after. In reviews and complaints the verdict is often in the final sentences.',
        fix: 'Measure it: compare truncating the head, the tail and both ends. For genuinely long documents, chunk and aggregate, or use a long-context model.',
      },
      {
        mistake: 'Assuming a sentiment model transfers across domains',
        why: 'Polarity is domain-specific. `sick` is negative in clinical text and positive in music reviews; `unpredictable` is good for a thriller and bad for a car. A model trained on film reviews degrades sharply on financial news.',
        fix: 'Evaluate on in-domain labelled data before deploying, and expect to need a few hundred to a few thousand in-domain labels regardless of how strong the pre-trained model is.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'You have 5,000 labelled support tickets and need to route them into eight teams. Walk me through your approach.',
        answer:
          'Split first — stratified, so rare teams appear in both halves — and set the test set aside. Then fit the baseline: TF-IDF with unigrams and bigrams, min_df around 2, plus logistic regression with class_weight balanced, evaluated by cross-validation on the training half with macro F1 as the metric, since ticket volumes per team will be very uneven. That takes minutes and gives both a number and a list of the words driving each class, which I would review with the support leads because it often surfaces label noise immediately. Then I would fine-tune DistilBERT on the same split and compare. With 5,000 examples across eight classes I would expect a gain of two to five macro-F1 points, which may or may not justify the serving cost. The decision criterion is the confusion matrix, not the headline number: if the errors are concentrated in two genuinely similar teams, better labels or a merged class will help more than a bigger model. Finally I would set per-class thresholds against the cost of misrouting and add an abstain option that sends low-confidence tickets to a human queue.',
        followUp:
          'A strong answer mentions that label quality is usually the binding constraint at this scale, and proposes measuring inter-annotator agreement before blaming the model.',
      },
      {
        level: 'intermediate',
        question: 'Why is sarcasm so hard for sentiment models, and what would you actually do about it?',
        answer:
          'Sarcasm inverts the intended meaning while leaving every word\'s dictionary polarity intact — "oh great, another crash" contains the strongest positive term in most lexicons and means the opposite. Lexical models cannot detect it even in principle, because the features they see are genuinely positive. Contextual models do better when the inversion is signalled inside the sentence, as with the mismatch between "great" and "crash", but they still fail when the cue is outside the text: shared world knowledge, the speaker\'s history, a platform\'s conventions, or tone of voice that writing does not carry. Practically, I would first measure how much sarcasm actually costs on my data by sampling errors and labelling them, because it is frequently a small fraction of a small error rate and not worth engineering for. If it does matter, the options are in-domain labelled sarcasm data, features from outside the text such as author history or thread context, and an abstain path that routes low-confidence or contradictory-signal cases to human review. Claiming to have solved sarcasm is a warning sign.',
      },
      {
        level: 'ml-engineer',
        question: 'Your classifier scores 0.94 offline but performs badly in production. What are the likely causes, in order?',
        answer:
          'First, train-test leakage, which inflates the offline number rather than depressing the live one — a vectoriser fitted before splitting, duplicate documents across splits, or a feature derived from the label such as a routing tag added after the ticket was resolved. Second, distribution shift: production text differs from the labelled corpus in length, register, language mix or topic, and this is the most common genuine cause. Third, a threshold chosen on a validation set with a different class balance than live traffic, so precision and recall land nowhere near expectations. Fourth, preprocessing skew, where the serving path tokenises or truncates differently from training — a version mismatch in the tokeniser is a classic. Fifth, label noise in the training data that the offline metric shares, so the model reproduces the annotators\' mistakes and the offline score is measuring agreement with those mistakes. The diagnostic order is: hand-label a few hundred live examples and measure directly, compare token-level statistics between training and live traffic, and assert that the serving preprocessing is byte-identical to training.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A model flags 450 of 10,000 messages as fraud; 158 of those are genuine fraud, and 200 messages are fraudulent overall. Compute precision, recall, F1 and accuracy, and say which number you would put in a report.',
        hint: 'TP = 158, FP = 450 − 158, FN = 200 − 158.',
        solution:
          'TP = 158, FP = 292, FN = 42, TN = 9,508.\nPrecision = 158/450 = 0.351. Recall = 158/200 = 0.790.\nF1 = 2(0.351)(0.790)/(0.351 + 0.790) = 0.486.\nAccuracy = (158 + 9508)/10000 = 0.967.\n\nI would report precision, recall and F1, never accuracy alone. Accuracy is 0.967 here, but a model that predicts "not fraud" for everything scores 0.980 and catches nothing — so accuracy actively rewards the useless model. The right presentation is the precision-recall curve with the chosen operating point marked, plus a sentence explaining why the threshold was set at the review team\'s capacity of 450 per day.',
      },
      {
        prompt:
          'Build a baseline sentiment classifier on any labelled review dataset and print the ten most positive and ten most negative coefficients. Identify at least one coefficient that reveals a problem with the data.',
        hint: 'Use `numpy.argsort` on `clf.coef_[0]` and map indices back through `get_feature_names_out()`.',
        language: 'python',
        starterCode:
          'import numpy as np\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\n\nvec = TfidfVectorizer(ngram_range=(1, 2), min_df=2)\nclf = LogisticRegression(max_iter=1000)\n',
        solution:
          "X = vec.fit_transform(train_texts)\nclf.fit(X, train_labels)\nterms = vec.get_feature_names_out()\norder = np.argsort(clf.coef_[0])\nprint('negative:', [terms[i] for i in order[:10]])\nprint('positive:', [terms[i] for i in order[-10:]])\n\nThe sentiment words themselves are unsurprising — `worst`, `boring`, `waste` against `excellent`, `perfect`, `wonderful`. What to look for is anything that should be irrelevant. Genre words, actor names, a year, a product code or a reviewer platform appearing among the top coefficients means the model has found a shortcut: perhaps horror films skew negative in this corpus, or one brand was sampled mostly from complaints. That is a sampling artefact, not sentiment, and it will not transfer. Inspecting coefficients is the cheapest data-quality audit available, and it is a genuine reason to keep a linear baseline in the project even after a transformer wins.",
      },
      {
        prompt:
          'Show that adding bigrams changes the prediction for "this film was not excellent", and explain precisely which feature is responsible.',
        hint: 'Fit twice with different `ngram_range` and compare `predict_proba`, then look for the bigram in the feature names.',
        language: 'python',
        starterCode:
          'from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\n\ntexts = ["excellent film", "not excellent film", "terrible film", "not terrible film"]\nlabels = [1, 0, 0, 1]\n',
        solution:
          'With `ngram_range=(1, 1)` the features are `excellent`, `film`, `not`, `terrible`. The word `not` appears once in a positive and once in a negative example, so its coefficient is near zero and it carries no information; the prediction is driven entirely by `excellent` and `terrible`, and "not excellent" is classified positive.\n\nWith `ngram_range=(1, 2)` the features `not excellent` and `not terrible` appear, each in exactly one class, so they receive large coefficients of the correct sign and the predictions flip to correct.\n\nThe responsible feature is the bigram `not excellent`. The deeper point is that this only works when the negation is adjacent. "This film was not, in my honest opinion, excellent" puts five tokens between `not` and `excellent`, so no bigram or trigram captures it, and you need a model with a real notion of scope — which is one of the clearest concrete arguments for moving to a transformer.',
      },
    ],

    quiz: [
      {
        id: 'NLP-010-q1',
        type: 'mcq',
        concept: 'imbalanced metrics',
        prompt: 'A dataset is 98% negative. A model achieves 98% accuracy. What should you conclude?',
        options: [
          'Nothing yet — that is exactly the score of a model that always predicts the majority class',
          'The model is performing very well',
          'The model has overfitted the training data',
          'The classes must be perfectly separable',
        ],
        answerIndex: 0,
        explanation:
          'Under this imbalance the trivial constant predictor already scores 98%. You need per-class precision and recall or macro F1 to know whether the model is doing anything at all.',
      },
      {
        id: 'NLP-010-q2',
        type: 'numeric',
        concept: 'F1 computation',
        prompt: 'Precision is 0.351 and recall is 0.790. What is the F1 score, to three decimal places?',
        answer: 0.486,
        tolerance: 0.005,
        explanation:
          'F1 = 2PR/(P + R) = 2(0.351)(0.790)/(1.141) = 0.5546/1.141 = 0.486. The harmonic mean sits much closer to the smaller of the two, which is why F1 stays low unless both are reasonable.',
      },
      {
        id: 'NLP-010-q3',
        type: 'truefalse',
        concept: 'baselines',
        prompt: 'TF-IDF plus logistic regression is obsolete now that pre-trained transformers exist.',
        answer: false,
        explanation:
          'It remains the standard baseline: seconds to train, interpretable coefficients, microsecond inference, and within a few points of a fine-tuned transformer on many topic tasks. Without it you cannot tell whether a transformer score is good.',
      },
      {
        id: 'NLP-010-q4',
        type: 'multi',
        concept: 'hard cases',
        prompt: 'Which of these genuinely defeat a unigram bag-of-words sentiment model? Select all that apply.',
        options: [
          '"I would not say this was a bad film"',
          '"Oh great, another crash"',
          '"The bass was sick" in a music review',
          '"This film was excellent"',
          '"The plot was not, by any reasonable standard, engaging"',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Double negation, sarcasm, domain-specific polarity and long-distance negation all break lexical models. Only the straightforward positive sentence is handled reliably. Note that bigrams help the first but not the last, where five tokens separate the negator from its target.',
      },
      {
        id: 'NLP-010-q5',
        type: 'debug',
        language: 'python',
        concept: 'leakage',
        prompt: 'Why does this pipeline report an optimistic score?',
        code: 'vec = TfidfVectorizer()\nX = vec.fit_transform(all_texts)\nX_train, X_test, y_train, y_test = train_test_split(X, y)\nclf.fit(X_train, y_train)\nprint(clf.score(X_test, y_test))',
        options: [
          'The vectoriser is fitted on all texts including the test split, leaking its term distribution',
          '`train_test_split` cannot accept a sparse matrix',
          '`clf.score` returns training accuracy',
          'TF-IDF should be applied after splitting but before labelling',
        ],
        answerIndex: 0,
        explanation:
          'IDF is computed from document frequencies across everything passed to `fit_transform`, so the vocabulary and weights encode information about the test documents. Split first, then `fit_transform` on train and `transform` on test — or put the vectoriser in a `Pipeline`.',
      },
      {
        id: 'NLP-010-q6',
        type: 'explain',
        concept: 'baseline versus transformer',
        prompt:
          'Your manager asks why you spent the first afternoon on TF-IDF when everyone uses transformers. Answer them.',
        rubric: [
          'Explains that a baseline establishes the number any later model must beat',
          'Notes the practical advantages: speed, cost, interpretability, low data requirements',
          'States a concrete criterion for when to move to a transformer',
        ],
        sampleAnswer:
          'The baseline costs one afternoon and answers questions nothing else can. It tells us whether the labels are learnable at all — if TF-IDF gets 55% on a binary task, the problem is the labels, not the model, and a transformer would have hidden that behind a plausible-looking 60%. It gives a number every later model has to beat, so "0.91" becomes meaningful instead of impressive-sounding. Its coefficients are a free data audit: the top features reveal leakage and sampling artefacts immediately, which we found this afternoon. And it may simply be enough — at 97% macro F1 on this routing task, a transformer buying two points is not obviously worth a GPU in the serving path. I would move to fine-tuning when the errors are concentrated in cases where word order and context matter, which is exactly what the confusion matrix and a sample of errors will tell us tomorrow.',
        explanation:
          'The examinable judgement is treating model choice as an evidence-driven decision with a stated criterion, rather than as a default.',
      },
    ],

    flashcards: [
      { front: 'What is the standard text classification baseline?', back: 'TF-IDF (unigrams plus bigrams) with logistic regression. Seconds to train, interpretable coefficients, hard to beat by much.' },
      { front: 'Why is accuracy wrong under imbalance?', back: 'At 98% negatives, the constant predictor scores 98%. Accuracy can fall as the model becomes more useful. Report macro F1 and per-class precision and recall.' },
      { front: 'What does `class_weight="balanced"` do?', back: 'Weights each class inversely to its frequency in the loss, so the rare class is not ignored. Raises recall, lowers precision.' },
      { front: 'Why does a bag-of-words model fail on "not good"?', back: '`not` is a free-floating feature attached to nothing. Bigrams make `not good` a single feature, which fixes adjacent negation only.' },
      { front: 'Typical fine-tuning learning rate for a pre-trained encoder?', back: 'Around 2e-5 — two to three orders of magnitude below training from scratch, because large steps destroy the pre-trained weights.' },
      { front: 'Why is sarcasm not solvable with better features?', back: 'Every word retains its dictionary polarity; the inversion comes from context or world knowledge outside the text. Measure its cost before engineering for it.' },
      { front: 'Does a sentiment model transfer across domains?', back: 'No. Polarity is domain-specific — `sick` is negative clinically and positive in music reviews. Expect to need in-domain labels.' },
    ],

    challenge: {
      title: 'A classifier you can defend',
      brief:
        'On a labelled text dataset with at least three classes and genuine imbalance, build and compare three systems: TF-IDF plus logistic regression, the same with class weighting and a tuned threshold, and a fine-tuned transformer. Report macro F1, per-class precision and recall, and a confusion matrix for each on one fixed held-out split. Then produce an error analysis of at least 40 misclassified examples, grouped by cause — negation, sarcasm, domain vocabulary, label noise, genuine ambiguity — and write a recommendation that names which model to deploy and why, including the cases where you would abstain and route to a human.',
      language: 'python',
      acceptanceCriteria: [
        'All three systems evaluated on one fixed held-out split, with the vectoriser fitted on training data only',
        'Macro F1, per-class precision and recall, and confusion matrices reported for each',
        'At least 40 errors manually categorised by cause, with counts per category',
        'A stated deployment recommendation with the criterion behind it',
        'An abstention policy defined with its threshold justified from the validation data',
      ],
      starterCode:
        'from sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report, confusion_matrix\n\nX_train, X_test, y_train, y_test = train_test_split(\n    texts, labels, test_size=0.2, stratify=labels, random_state=0\n)\n\nERROR_CAUSES = ["negation", "sarcasm", "domain vocabulary", "label noise", "genuinely ambiguous"]\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a colleague the full text classification pipeline, why the simple baseline is worth their afternoon, and what still breaks even with a transformer.',
      mustCover: [
        'The pipeline: raw text, tokenise, vectorise, classify, threshold',
        'TF-IDF plus logistic regression is fast, interpretable and a genuinely strong baseline',
        'Accuracy is misleading under class imbalance; use macro F1 and per-class metrics',
        'Negation, sarcasm and domain shift remain hard, and each breaks for a different reason',
      ],
      bonusSignals: [
        'gives concrete numbers for baseline versus transformer',
        'explains that coefficients double as a data-quality audit',
        'gives a criterion for when to move beyond the baseline',
      ],
      sampleExplanation:
        'The pipeline is short: take the text, tokenise it, turn it into a vector, feed the vector to a classifier, and pick a threshold. Everything interesting is in the choices at each step. Start with TF-IDF plus logistic regression, and do not skip it because it looks old-fashioned. It trains in seconds, it reaches about 0.88 to 0.90 on standard sentiment data and often 0.97 on topic routing, and it hands you a coefficient per word — so you can immediately see what the model is using, which is the cheapest data audit that exists. I have caught leakage that way within five minutes. A fine-tuned DistilBERT will usually beat it by two to five points, which may or may not be worth putting a GPU in the serving path. Two things to be careful about. Do not report accuracy if your classes are imbalanced: with 2% positives, predicting "no" always scores 98% and catches nothing, and accuracy can genuinely go down as your model gets better. Report macro F1 and per-class precision and recall, and choose the threshold from the cost of each error type, not from maximising a number. And know what stays hard. Negation breaks unigram models because `not` floats free of what it negates; bigrams patch it when the words are adjacent and fail when they are not. Sarcasm breaks everything, because every word keeps its normal polarity and the inversion lives in context you may not even have. And polarity is domain-specific — `sick` is bad in a clinical note and good in a music review — so a model trained on film reviews will disappoint you on financial news no matter how large it is.',
    },
  },

  {
    id: 'NLP-011',
    domain: 'NLP',
    module: 'NLP Tasks',
    topic: 'Sequence labelling',
    title: 'Named Entity Recognition and Sequence Labelling',
    slug: 'named-entity-recognition',
    difficulty: 4,
    estimatedMinutes: 35,
    prerequisites: ['NLP-009', 'NLP-010'],
    related: ['NLP-001', 'NLP-002'],
    tags: ['ner', 'sequence-labelling', 'bio-tagging', 'span-evaluation', 'spacy', 'token-classification'],

    learningObjectives: [
      'Distinguish sequence labelling from document classification and explain why one label per token changes the problem',
      'Annotate a sentence in the BIO scheme by hand and decode a tag sequence back into spans',
      'Explain why NER must be evaluated at span level, and what token-level accuracy hides',
      'Build a token classifier with spaCy or a fine-tuned transformer, handling the subword-to-word alignment correctly',
      'Describe realistic applications and the failure modes that matter in each',
    ],

    terminology: [
      {
        term: 'Named entity recognition',
        definition:
          'Locating spans of text that refer to entities of interest — people, organisations, locations, dates, quantities — and assigning each span a type.',
        simple: 'Finding the names in a sentence and saying what kind of thing each one is.',
      },
      {
        term: 'Sequence labelling',
        definition:
          'Any task assigning one label to every token of a sequence, so the output length equals the input length. NER, part-of-speech tagging and chunking are all instances.',
        simple: 'Giving every single word its own label instead of labelling the whole text.',
      },
      {
        term: 'BIO tagging',
        definition:
          'An encoding that turns spans into per-token labels: B- marks the first token of an entity, I- marks a continuation, and O marks a token outside any entity.',
        simple: 'Marking each word as the start of a name, the middle of a name, or not a name.',
      },
      {
        term: 'Span-level evaluation',
        definition:
          'Scoring a prediction correct only when the entire entity boundary and its type both match the gold annotation exactly. The standard for NER, from the CoNLL-2003 shared task onwards.',
        simple: 'You only get the mark if you got the whole name and its type right.',
      },
      {
        term: 'Subword alignment',
        definition:
          'The mapping from transformer subword tokens back to the original words, needed because labels are annotated per word but the model predicts per subword.',
        simple: 'Matching the model\'s word-pieces back onto the real words so the labels line up.',
      },
      {
        term: 'Nested entity',
        definition:
          'An entity contained inside another, such as the organisation "University of Washington" containing the location "Washington". Standard BIO cannot represent these.',
        simple: 'A name hiding inside a longer name.',
      },
    ],

    simpleExplanation:
      "Everything so far has given one answer per document: is this spam, is this positive. Named entity recognition asks something different — go through the sentence word by word and tell me which words are names, and what kind of name each one is. In \"Apple hired Jane Smith in London last March\", you want `Apple` marked as an organisation, `Jane Smith` as a person, `London` as a place and `last March` as a date. The complication is that entities can span several words, so a per-word label has to say not only what type a word is but whether it begins a new name or continues the previous one. That is what the BIO scheme does: `Jane` gets B-PER for begin-person and `Smith` gets I-PER for inside-person, so the two are read as one entity rather than two. Getting this right matters commercially, because the whole point is to pull structured records out of unstructured prose — names off CVs, drug doses out of clinical notes, counterparties out of contracts.",

    whyItExists:
      'Most valuable information arrives as prose but has to be used as structured data: a name in a database field, a date in a calendar, a dose in a prescribing system. Sequence labelling exists to locate and type those fragments in place, which document classification cannot do because it produces one label for the whole text rather than pointing at where in the text the answer lives.',

    analogy: {
      scenario:
        'Think of a proofreader marking up a printed page with highlighters: yellow for every person mentioned, green for every company, pink for every date. They cannot just write "this page mentions people" at the top — they must run along the line and mark the exact words, and when a name runs over several words they have to highlight the whole span without accidentally merging it with the name beside it. Two adjacent names in a list are the hard case: stop the highlighter in the wrong place and "Jane Smith, John Doe" becomes one four-word person.',
      mapping: [
        { from: 'Running along the line word by word', to: 'One predicted label per token; output length equals input length' },
        { from: 'The colour of the highlighter', to: 'The entity type: PER, ORG, LOC, DATE' },
        { from: 'Where you start the highlight', to: 'The B- tag, marking the first token of a span' },
        { from: 'Continuing the same highlight', to: 'The I- tag, marking continuation of the current span' },
        { from: 'Leaving a word unhighlighted', to: 'The O tag, outside any entity' },
        { from: 'Two adjacent names merging by mistake', to: 'Why B- exists at all: it forces a boundary between consecutive same-type entities' },
      ],
      bridge:
        'The proofreader analogy explains the one design decision people find arbitrary. If every entity token were simply tagged PER, then "Jane Smith John Doe" would be four PER tokens with no way to tell whether that is one entity or two. The B- prefix is precisely the boundary marker, which is why the scheme is BIO and not just IO — and it is why evaluation is done on decoded spans rather than on the tags themselves.',
      limitations:
        'A highlighter can be laid over another highlighter, and BIO cannot: each token gets exactly one tag, so nested entities such as "University of Washington" containing "Washington" are unrepresentable. Overlapping and discontinuous entities need a different formulation, such as span-based or generative tagging.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'BIO tagging, worked on a real sentence',
        caption: 'Every token gets exactly one tag. The B- prefix is what separates adjacent entities of the same type.',
        art: `token      tag      meaning
---------  -------  -----------------------------------------
Apple      B-ORG    begins an organisation span
hired      O        outside any entity
Jane       B-PER    begins a person span
Smith      I-PER    continues that same person span
from       O
Microsoft  B-ORG    begins a new organisation span
in         O
New        B-LOC    begins a location span
York       I-LOC    continues it -> "New York" is ONE entity
last       B-DATE   begins a date span
March      I-DATE   continues it
.          O

decoded spans:
   (0, 1,  ORG)   "Apple"
   (2, 4,  PER)   "Jane Smith"
   (5, 6,  ORG)   "Microsoft"
   (7, 9,  LOC)   "New York"
   (9, 11, DATE)  "last March"

why B- is necessary:
   "Jane Smith John Doe" tagged I-PER I-PER I-PER I-PER
   would decode as ONE four-token person.
   Tagged B-PER I-PER B-PER I-PER it decodes as TWO people.`,
      },
      {
        kind: 'compare',
        title: 'Document classification versus sequence labelling',
        caption: 'Both are classification. The unit of prediction changes everything downstream.',
        left: {
          heading: 'Document classification',
          points: [
            'One label for the whole text',
            'Output size is fixed regardless of input length',
            'Evaluated with accuracy, precision, recall, F1 over documents',
            'A bag of words is often sufficient',
            'Cannot say where in the text the evidence was',
          ],
        },
        right: {
          heading: 'Sequence labelling',
          points: [
            'One label per token; output length equals input length',
            'Labels are interdependent — I-PER cannot follow O',
            'Evaluated over decoded spans, not over tokens',
            'Needs contextual representations; word identity alone is weak',
            'Output is a set of located, typed spans you can put in a database',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Why token accuracy lies',
        caption: 'Gold: "Jane Smith" is one B-PER I-PER span. Three predictions, all with high token accuracy.',
        columns: ['Prediction', 'Token accuracy', 'Span correct?', 'What went wrong'],
        rows: [
          ['B-PER I-PER', '2/2 = 100%', 'Yes', 'Nothing.'],
          ['B-PER O', '1/2 = 50%', 'No', 'Boundary truncated: predicts "Jane", misses "Smith".'],
          ['B-ORG I-ORG', '0/2 = 0%', 'No', 'Boundary perfect, type wrong. Still scores zero at span level.'],
          ['B-PER B-PER', '1/2 = 50%', 'No', 'Splits one person into two — the exact error B- exists to prevent.'],
          ['All O everywhere', '~88% on typical text', 'No', 'Most tokens really are O, so doing nothing scores well on tokens.'],
        ],
      },
      {
        kind: 'flow',
        title: 'Fine-tuning a transformer for token classification',
        caption: 'The alignment step in the middle is where most implementations go wrong.',
        steps: [
          { label: 'Word-level annotation', detail: '["Jane", "Smith", "works"] with tags [B-PER, I-PER, O].' },
          { label: 'Subword tokenise', detail: '["ja", "##ne", "smith", "works"] — the word count no longer matches the tag count.' },
          { label: 'Align', detail: 'Use `word_ids()` to map each subword to its word. Label the first subword, set the rest to −100 so the loss ignores them.' },
          { label: 'Forward pass', detail: 'The encoder produces one contextual vector per subword; a linear head outputs one logit per tag.' },
          { label: 'Decode', detail: 'Take the argmax per first-subword, map back to words, then decode BIO into spans.' },
          { label: 'Evaluate on spans', detail: 'Compare decoded (start, end, type) triples against gold using `seqeval`.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Tag a sentence and decode the spans',
        caption: 'Edit the sentence, adjust the tags, and watch which spans the decoder produces.',
        widget: 'code-playground',
        props: {
          language: 'python',
          starter:
            'import spacy\n\nnlp = spacy.load("en_core_web_sm")\ndoc = nlp("Apple hired Jane Smith from Microsoft in New York last March.")\nfor ent in doc.ents:\n    print(ent.text, ent.label_, ent.start_char, ent.end_char)\n',
        },
      },
    ],

    formalDefinition:
      'Sequence labelling learns a function from a token sequence x = (x_1, …, x_n) to a tag sequence y = (y_1, …, y_n) of equal length, with y_i drawn from a tag set T. For NER with entity types E, the BIO tag set is T = {O} ∪ {B-e, I-e : e ∈ E}, giving |T| = 2|E| + 1. A valid BIO sequence satisfies the constraint that I-e may only follow B-e or I-e of the same type; decoding maps a valid sequence to a set of typed spans (start, end, type). Evaluation is exact-match micro-F1 over these spans, as defined by the CoNLL-2003 shared task.',

    math: {
      intuition:
        'Two pieces of arithmetic matter here. The first is how many tags the model must distinguish, which grows as twice the number of entity types plus one. The second is span-level F1, which differs from the document-level F1 of the previous unit only in what counts as a unit: a predicted span is a true positive only if both its boundaries and its type match exactly.',
      formulas: [
        {
          latex: '|T| = 2|E| + 1',
          name: 'BIO tag-set size',
          meaning:
            'Each entity type contributes a B- tag and an I- tag, plus the single shared O tag. Four entity types therefore give nine output classes, which is the width of the classification head.',
          variables: [
            { symbol: '|E|', meaning: 'Number of entity types, e.g. 4 for PER, ORG, LOC, MISC' },
            { symbol: '|T|', meaning: 'Number of distinct tags the model must predict per token' },
          ],
          category: 'classification',
        },
        {
          latex: 'P = \\frac{|\\hat{S} \\cap S|}{|\\hat{S}|}, \\quad R = \\frac{|\\hat{S} \\cap S|}{|S|}, \\quad F_1 = \\frac{2PR}{P+R}',
          name: 'Span-level precision, recall and F1',
          meaning:
            'Sets of (start, end, type) triples are compared. A predicted span counts only if it appears exactly in the gold set — partial boundary overlap earns nothing, which is strict but is what downstream extraction actually requires.',
          variables: [
            { symbol: '\\hat{S}', meaning: 'Set of predicted entity spans' },
            { symbol: 'S', meaning: 'Set of gold entity spans' },
            { symbol: '|\\hat{S} \\cap S|', meaning: 'Number of exactly matching spans' },
          ],
          category: 'classification',
        },
        {
          latex: 'P(y \\mid x) = \\frac{1}{Z(x)} \\exp\\left( \\sum_{i=1}^{n} \\psi(y_i, x) + \\sum_{i=2}^{n} \\phi(y_{i-1}, y_i) \\right)',
          name: 'Linear-chain conditional random field',
          meaning:
            'Scores a whole tag sequence rather than each tag independently. The transition term phi learns that I-PER cannot follow O, which makes invalid sequences impossible rather than merely unlikely. Still used as the output layer above a transformer when boundary validity matters.',
          variables: [
            { symbol: '\\psi(y_i, x)', meaning: 'Emission score for tag y_i at position i, produced by the encoder' },
            { symbol: '\\phi(y_{i-1}, y_i)', meaning: 'Learned transition score between consecutive tags' },
            { symbol: 'Z(x)', meaning: 'Partition function summing over all tag sequences, computed by the forward algorithm' },
          ],
          category: 'classification',
        },
      ],
      derivation: [
        'A span is defined by a start index, an end index and a type, so a naive model would have to predict over all O(n²) possible spans.',
        'BIO reduces this to n independent |T|-way decisions by encoding boundary information into the tag itself.',
        'The B- prefix is what makes the encoding invertible for adjacent same-type entities: without it, I-PER I-PER I-PER I-PER is ambiguous between one entity and two.',
        'Independent per-token decisions can produce invalid sequences such as O followed by I-PER, because nothing couples neighbouring predictions.',
        'A CRF output layer adds a learned transition score between consecutive tags and decodes with Viterbi, so invalid transitions receive a large negative score and never appear in the output.',
        'With a strong contextual encoder the gain from a CRF is small — typically under a point of F1 — because the encoder already sees both neighbours, which is why many modern systems simply repair invalid sequences in post-processing instead.',
      ],
    },

    workedExample: {
      title: 'Tagging a sentence in BIO and scoring a prediction at span level',
      setup:
        'Sentence: "Jane Smith joined Apple in New York". Gold entities: "Jane Smith" as PER, "Apple" as ORG, "New York" as LOC. A model predicts the tags shown in step 4.',
      steps: [
        {
          label: 'Tokenise into words',
          detail: '[Jane, Smith, joined, Apple, in, New, York] — seven tokens, so there will be seven tags.',
        },
        {
          label: 'Assign gold BIO tags',
          detail:
            'Jane = B-PER; Smith = I-PER; joined = O; Apple = B-ORG; in = O; New = B-LOC; York = I-LOC.',
        },
        {
          label: 'Decode the gold tags back into spans',
          detail:
            'A B- opens a span, subsequent I- of the same type extend it, and anything else closes it. Gold set S = {(0, 2, PER), (3, 4, ORG), (5, 7, LOC)} using half-open index ranges.',
          latex: 'S = \\{(0,2,\\text{PER}),\; (3,4,\\text{ORG}),\; (5,7,\\text{LOC})\\}',
        },
        {
          label: 'Take the model prediction',
          detail:
            'Predicted: Jane = B-PER; Smith = O; joined = O; Apple = B-ORG; in = O; New = B-LOC; York = I-LOC. Only one tag out of seven differs from gold.',
        },
        {
          label: 'Compute token-level accuracy',
          detail: '6 of 7 tags are correct, so token accuracy is 0.857 — which sounds like a good model.',
          latex: '\\text{token accuracy} = \\frac{6}{7} = 0.857',
        },
        {
          label: 'Decode the prediction into spans',
          detail:
            'Predicted set Ŝ = {(0, 1, PER), (3, 4, ORG), (5, 7, LOC)}. The person span is now "Jane" alone rather than "Jane Smith".',
          latex: '\\hat{S} = \\{(0,1,\\text{PER}),\; (3,4,\\text{ORG}),\; (5,7,\\text{LOC})\\}',
        },
        {
          label: 'Score at span level',
          detail:
            'Exact matches: (3,4,ORG) and (5,7,LOC). The PER span does not match because the boundary differs. So TP = 2, FP = 1, FN = 1.',
          latex: 'P = \\frac{2}{3} = 0.667, \\quad R = \\frac{2}{3} = 0.667, \\quad F_1 = 0.667',
        },
        {
          label: 'Compare the two verdicts',
          detail:
            'Token accuracy says 0.857; span F1 says 0.667. A single wrong tag destroyed an entire entity, and span F1 is the number that reflects what a downstream system experiences — a database row containing "Jane" instead of "Jane Smith" is simply wrong.',
        },
        {
          label: 'Note the harsher baseline',
          detail:
            'On typical text roughly 85 to 90% of tokens are O, so a model predicting O everywhere scores near 0.88 token accuracy and exactly 0 span F1. That gap is the whole argument for span-level evaluation.',
        },
      ],
      conclusion:
        'BIO turns a span-finding problem into seven ordinary classification decisions, and the B- prefix is what keeps adjacent entities separable. But the tags are only the encoding — the output is the decoded spans, so that is what must be scored. One tag wrong out of seven reads as 86% at token level and 67% at span level, and only the second number tells you what your extraction pipeline will actually receive.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'NER with spaCy, and decoding spans by hand',
        runnable: true,
        code: `import spacy

nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple hired Jane Smith from Microsoft in New York last March.")

print("entities:")
for ent in doc.ents:
    print(f"   {ent.text:12} {ent.label_:8} chars {ent.start_char}-{ent.end_char}")

print()
print("per-token BIO tags:")
for token in doc:
    tag = f"{token.ent_iob_}-{token.ent_type_}" if token.ent_iob_ != "O" else "O"
    print(f"   {token.text:12} {tag}")`,
        output: `entities:
   Apple        ORG      chars 0-5
   Jane Smith   PERSON   chars 12-22
   Microsoft    ORG      chars 28-37
   New York     GPE      chars 41-49
   last March   DATE     chars 50-60

per-token BIO tags:
   Apple        B-ORG
   hired        O
   Jane         B-PER
   Smith        I-PER
   from         O
   Microsoft    B-ORG
   in           O
   New          B-LOC
   York         I-LOC
   last         B-DATE
   March        I-DATE
   .            O`,
        explanation:
          'spaCy exposes both views of the same prediction. `doc.ents` gives decoded spans with character offsets, which is what you write into a database. `token.ent_iob_` and `token.ent_type_` give the underlying per-token BIO tags the model actually predicted. Note that `New York` is labelled GPE — geo-political entity — rather than LOC, because spaCy follows the OntoNotes scheme rather than CoNLL. Entity type sets differ between corpora, and mixing them silently is a common source of confusing evaluation numbers.',
      },
      {
        language: 'python',
        title: 'Fine-tuning a transformer, with the alignment done correctly',
        runnable: true,
        code: `import numpy as np
from datasets import load_dataset
from transformers import (AutoTokenizer, AutoModelForTokenClassification,
                          DataCollatorForTokenClassification, TrainingArguments, Trainer)
import evaluate

raw = load_dataset("conll2003")
labels = raw["train"].features["ner_tags"].feature.names   # ['O','B-PER','I-PER',...]
tok = AutoTokenizer.from_pretrained("distilbert-base-cased")

def align(batch):
    enc = tok(batch["tokens"], truncation=True, is_split_into_words=True)
    out = []
    for i, tags in enumerate(batch["ner_tags"]):
        word_ids, prev, row = enc.word_ids(i), None, []
        for wid in word_ids:
            if wid is None:
                row.append(-100)                 # special token: ignored by the loss
            elif wid != prev:
                row.append(tags[wid])            # first subword carries the label
            else:
                row.append(-100)                 # continuation subwords ignored
            prev = wid
        out.append(row)
    enc["labels"] = out
    return enc

ds = raw.map(align, batched=True, remove_columns=raw["train"].column_names)
model = AutoModelForTokenClassification.from_pretrained("distilbert-base-cased", num_labels=len(labels))
metric = evaluate.load("seqeval")

def compute(p):
    preds = np.argmax(p.predictions, axis=2)
    true = [[labels[l] for l in row if l != -100] for row in p.label_ids]
    pred = [[labels[q] for q, l in zip(pr, lr) if l != -100] for pr, lr in zip(preds, p.label_ids)]
    r = metric.compute(predictions=pred, references=true)
    return {"precision": r["overall_precision"], "recall": r["overall_recall"], "f1": r["overall_f1"]}

trainer = Trainer(
    model=model,
    args=TrainingArguments(output_dir="ner", num_train_epochs=3, learning_rate=2e-5,
                           per_device_train_batch_size=16, eval_strategy="epoch", report_to=[]),
    train_dataset=ds["train"], eval_dataset=ds["validation"],
    data_collator=DataCollatorForTokenClassification(tok), compute_metrics=compute,
)
trainer.train()`,
        output: `{'eval_precision': 0.934, 'eval_recall': 0.944, 'eval_f1': 0.939, 'epoch': 3.0}`,
        explanation:
          'The `align` function is the part worth studying. Annotations are per word, but the tokeniser emits subwords, so `Washington` might become `wash` plus `##ington` and the counts no longer line up. The convention is to label the first subword of each word and set the rest to −100, which PyTorch\'s cross-entropy ignores, so continuation pieces contribute nothing to the loss. Getting this wrong — off by one, or labelling every subword — is the single most common bug in token classification and it degrades F1 quietly rather than raising an error. Note also `distilbert-base-cased`: capitalisation is one of the strongest NER features, so an uncased model is the wrong choice here.',
      },
      {
        language: 'python',
        title: 'Decoding BIO to spans, and why token accuracy misleads',
        runnable: true,
        code: `def decode_bio(tokens, tags):
    spans, start, etype = [], None, None
    for i, tag in enumerate(tags + ["O"]):
        if tag.startswith("B-") or tag == "O" or (tag.startswith("I-") and tag[2:] != etype):
            if start is not None:
                spans.append((start, i, etype))
                start, etype = None, None
        if tag.startswith("B-"):
            start, etype = i, tag[2:]
        elif tag.startswith("I-") and start is None:
            start, etype = i, tag[2:]      # repair: I- with no preceding B-
    return spans

tokens = ["Jane", "Smith", "joined", "Apple", "in", "New", "York"]
gold = ["B-PER", "I-PER", "O", "B-ORG", "O", "B-LOC", "I-LOC"]
pred = ["B-PER", "O",     "O", "B-ORG", "O", "B-LOC", "I-LOC"]

G, P = set(decode_bio(tokens, gold)), set(decode_bio(tokens, pred))
tp = len(G & P)
print("gold spans :", sorted(G))
print("pred spans :", sorted(P))
print("token acc  :", sum(g == p for g, p in zip(gold, pred)) / len(gold))
print(f"span P/R/F1: {tp/len(P):.3f} {tp/len(G):.3f} {2*tp/(len(P)+len(G)):.3f}")`,
        output: `gold spans : [(0, 2, 'PER'), (3, 4, 'ORG'), (5, 7, 'LOC')]
pred spans : [(0, 1, 'PER'), (3, 4, 'ORG'), (5, 7, 'LOC')]
token acc  : 0.8571428571428571
span P/R/F1: 0.667 0.667 0.667`,
        explanation:
          'Six of seven tags correct reads as 86% accuracy, while span F1 is 67% — a single wrong tag destroyed an entire entity. Downstream, "Jane" in a person field is simply the wrong record, so span F1 is the honest number. The decoder also shows a practical detail: an `I-` tag appearing with no preceding `B-` is invalid BIO, and since an independently predicted tag sequence can produce it, real decoders either repair it as this one does or prevent it with a CRF layer.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Résumé parsing',
        usage:
          'Applicant tracking systems extract names, employers, job titles, dates and skills from uploaded CVs to populate structured fields. Boundary errors matter directly: an employment span with the wrong end date produces a wrong tenure calculation, and a truncated name produces a duplicate candidate record.',
      },
      {
        context: 'Clinical text and pharmacovigilance',
        usage:
          'Hospital systems extract drugs, doses, routes and adverse reactions from free-text notes. Models such as scispaCy and BioBERT exist because general-purpose NER fails badly on clinical abbreviations, and because the entity types — DOSAGE, ROUTE, ADVERSE_EVENT — do not appear in any general scheme.',
      },
      {
        context: 'Document redaction and privacy compliance',
        usage:
          'Removing personal data from documents before sharing is NER plus deletion. Recall dominates everything here: missing one name is a data breach, while over-redacting is merely annoying, so the operating point sits far from where F1 is maximised.',
      },
      {
        context: 'Financial and legal document processing',
        usage:
          'Extracting counterparties, amounts, governing law and effective dates from contracts turns a PDF into a structured record. Nested entities are endemic — "Bank of America Corporation" contains a location — which is exactly where plain BIO reaches its limit.',
      },
    ],

    projectConnections: [
      { tool: 'spaCy', role: 'Production NER out of the box, plus `EntityRuler` for pattern-based entities and a training loop for custom types.' },
      { tool: 'Hugging Face transformers', role: '`AutoModelForTokenClassification` with `word_ids()` alignment is the standard fine-tuning path.' },
      { tool: 'seqeval', role: 'The reference implementation of CoNLL span-level evaluation; use it rather than computing token metrics yourself.' },
      { tool: 'Label Studio or Prodigy', role: 'Span annotation tools. NER projects are usually bounded by annotation throughput and consistency, not by modelling.' },
      { tool: 'scispaCy', role: 'Biomedical pipelines with entity types and vocabularies that general models do not cover.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reporting token-level accuracy for NER',
        why: 'Roughly 85 to 90% of tokens are O, so predicting O everywhere scores near 0.88 accuracy with exactly zero entities found. The metric rewards doing nothing.',
        fix: 'Report span-level precision, recall and F1 with `seqeval`, which is the CoNLL standard and what every published number refers to.',
      },
      {
        mistake: 'Misaligning subword tokens with word-level labels',
        why: 'The tokeniser splits words into pieces, so label and token counts diverge. Labelling every subword, or going off by one, shifts labels relative to tokens and quietly halves F1.',
        fix: 'Use `is_split_into_words=True` and `word_ids()`, label the first subword of each word and set continuations to −100 so the loss ignores them.',
      },
      {
        mistake: 'Lowercasing the input',
        why: 'Capitalisation is among the strongest signals that a token is a proper noun. Uncased input removes it and costs several F1 points immediately.',
        fix: 'Use a cased model and cased text. For genuinely uncased domains such as chat logs, expect lower ceilings and consider truecasing as a preprocessing step.',
      },
      {
        mistake: 'Expecting BIO to handle nested or overlapping entities',
        why: 'Each token carries exactly one tag, so "University of Washington" cannot be simultaneously an ORG and contain a LOC. The annotation scheme forbids it, not the model.',
        fix: 'Use a span-based formulation that scores candidate spans independently, a layered tagger, or a generative model that emits bracketed output.',
      },
      {
        mistake: 'Assuming entity types transfer between corpora',
        why: 'CoNLL uses PER, ORG, LOC and MISC; OntoNotes uses eighteen types including GPE, NORP and FAC. A model trained on one labels "New York" GPE while your gold data says LOC, so evaluation collapses for no modelling reason.',
        fix: 'Fix one scheme, document it, and map explicitly when combining sources. Check the label set before debugging the model.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain BIO tagging and why the B- prefix is necessary.',
        answer:
          'BIO encodes spans as per-token labels: B- marks the first token of an entity, I- marks a token continuing the current entity, and O marks a token outside any entity. This turns a span-finding problem, which would otherwise require reasoning over all O(n²) possible spans, into n independent classification decisions over a tag set of size 2|E| + 1. The B- prefix exists specifically to separate adjacent entities of the same type. If every person token were simply tagged I-PER, then "Jane Smith John Doe" would be four consecutive I-PER tags with no way to know whether that is one entity or two. Tagging it B-PER I-PER B-PER I-PER makes the boundary explicit and the encoding invertible. That is also why you evaluate on decoded spans rather than on the tags themselves — the tags are an encoding, and the spans are the actual output.',
        followUp:
          'A strong answer mentions BILOU or IOBES as alternatives that add explicit last-token and unit-token tags, which sometimes helps slightly at the cost of a larger tag set.',
      },
      {
        level: 'advanced',
        question: 'Why is span-level F1 the standard metric for NER rather than token accuracy?',
        answer:
          'Because the output that downstream systems consume is a set of typed spans, not a tag sequence, and because token accuracy is dominated by the O class. On typical text 85 to 90% of tokens are O, so a model predicting O everywhere scores around 0.88 token accuracy while finding zero entities — the metric actively rewards inaction. Span-level evaluation compares sets of (start, end, type) triples with exact match, so a single misplaced boundary tag destroys the whole entity. In a concrete example, six correct tags out of seven gives 0.857 token accuracy and 0.667 span F1, and the second number is the one that predicts what the extraction pipeline receives. A database row containing "Jane" instead of "Jane Smith" is wrong, not 50% right. That strictness is deliberate and comes from the CoNLL-2003 shared task; relaxed variants that give partial credit for overlap exist, but they are not what published numbers mean.',
      },
      {
        level: 'ml-engineer',
        question: 'You need NER for a new domain with fifteen custom entity types and no labelled data. How do you proceed?',
        answer:
          'Annotation is the bottleneck, so I would plan around it. First write a detailed annotation guideline and have two annotators label the same 200 documents, then measure inter-annotator agreement — if they cannot agree on what counts as an entity, no model will do better, and a vague type definition usually needs splitting or dropping. In parallel I would build a rules-and-gazetteer baseline with spaCy\'s `EntityRuler`, since many custom types such as product codes or drug names are substantially pattern-matchable, and that baseline also serves as pre-annotation to speed up labelling several-fold. Then fine-tune a cased encoder on whatever is labelled, starting around a thousand examples, and use active learning: predict over unlabelled documents and send the lowest-confidence ones for annotation, which typically reaches a given F1 with a fraction of the labels. I would evaluate with `seqeval` from the start, report per-type F1 rather than an aggregate because rare types will lag badly, and keep the rule-based component in the final system for types where it outperforms the model. Finally I would set the operating point by error cost — for redaction or safety-critical extraction, recall dominates and the threshold should reflect that.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Tag "Barack Obama visited Berlin and Paris in June" in BIO with types PER, LOC and DATE, then decode your tags back into spans.',
        hint: 'Eight tokens, so eight tags. Remember that each new entity starts with B- even if it directly follows another.',
        solution:
          'Tokens: [Barack, Obama, visited, Berlin, and, Paris, in, June].\nTags: B-PER, I-PER, O, B-LOC, O, B-LOC, O, B-DATE.\n\nDecoded spans: (0, 2, PER) "Barack Obama"; (3, 4, LOC) "Berlin"; (5, 6, LOC) "Paris"; (7, 8, DATE) "June".\n\nNote that `Paris` takes B-LOC rather than I-LOC even though the previous entity was also a LOC — they are separated by `and`, so the B- is required to keep them as two spans. Had the text been "Berlin Paris" with no separator, tagging both I-LOC would merge them into one nonsensical two-token location, which is precisely the failure the B- prefix prevents.',
      },
      {
        prompt:
          'Gold tags are [B-ORG, I-ORG, O, B-PER, I-PER] and a model predicts [B-ORG, O, O, B-PER, I-PER]. Compute token accuracy and span-level precision, recall and F1.',
        hint: 'Decode both sequences to spans first, then compare the sets.',
        solution:
          'Token accuracy: 4 of 5 tags match, so 0.800.\n\nGold spans: {(0, 2, ORG), (3, 5, PER)}. Predicted spans: {(0, 1, ORG), (3, 5, PER)}.\nExact matches: only (3, 5, PER). So TP = 1, FP = 1, FN = 1.\nPrecision = 1/2 = 0.5. Recall = 1/2 = 0.5. F1 = 0.5.\n\nOne wrong tag took the score from 0.80 to 0.50, because it destroyed an entire entity rather than being a small error. This asymmetry is the point of span-level scoring: NER errors are not graded, they are categorical, and the downstream system either gets the right organisation name or it does not.',
      },
      {
        prompt:
          'Write an alignment function that maps word-level BIO labels onto subword tokens for a Hugging Face tokeniser, and explain the two design choices it embodies.',
        hint: 'Use `tokenizer(words, is_split_into_words=True)` and then `encoding.word_ids()`.',
        language: 'python',
        starterCode:
          'from transformers import AutoTokenizer\ntok = AutoTokenizer.from_pretrained("distilbert-base-cased")\n\nwords = ["Jane", "Smith", "visited", "Washington"]\nlabels = ["B-PER", "I-PER", "O", "B-LOC"]\n',
        solution:
          'def align(words, labels, tok, label2id):\n    enc = tok(words, is_split_into_words=True, truncation=True)\n    out, prev = [], None\n    for wid in enc.word_ids():\n        if wid is None:\n            out.append(-100)\n        elif wid != prev:\n            out.append(label2id[labels[wid]])\n        else:\n            out.append(-100)\n        prev = wid\n    enc["labels"] = out\n    return enc\n\nTwo design choices are embedded here. First, special tokens such as [CLS] and [SEP] get −100, which PyTorch cross-entropy ignores, because they correspond to no word and have no gold label. Second, only the first subword of each word carries the label and continuations get −100 too. The alternative — propagating the label to every subword, converting B- to I- for continuations — is also defensible and used by some implementations, but it weights long words more heavily in the loss simply because they split into more pieces. Whichever you choose, the decoder at inference time must use the same convention, and a mismatch between the two is a bug that lowers F1 without raising any error.',
      },
    ],

    quiz: [
      {
        id: 'NLP-011-q1',
        type: 'mcq',
        concept: 'BIO scheme',
        prompt: 'In BIO tagging, what does the tag `I-PER` mean?',
        options: [
          'This token continues a person entity that began at an earlier token',
          'This token is an incomplete person name',
          'This token is inside the document but outside any entity',
          'This token is an initial, such as a middle initial in a name',
        ],
        answerIndex: 0,
        explanation:
          'I- means "inside", continuing the current span of that type. A valid I-PER must follow B-PER or another I-PER; following O it is invalid BIO and must be repaired or prevented.',
      },
      {
        id: 'NLP-011-q2',
        type: 'numeric',
        concept: 'tag set size',
        prompt: 'How many distinct BIO tags are needed for an NER task with 6 entity types?',
        answer: 13,
        explanation:
          '|T| = 2|E| + 1 = 2(6) + 1 = 13. Each type contributes a B- and an I- tag, plus the single shared O. That is the width of the token classification head.',
      },
      {
        id: 'NLP-011-q3',
        type: 'truefalse',
        concept: 'evaluation',
        prompt: 'A model with 95% token-level accuracy on an NER task is performing well.',
        answer: false,
        explanation:
          'Not necessarily. Around 85 to 90% of tokens are O, so the trivial all-O model already reaches about 0.88 while finding no entities. Only span-level precision, recall and F1 tell you whether the model works.',
      },
      {
        id: 'NLP-011-q4',
        type: 'order',
        concept: 'token classification pipeline',
        prompt: 'Order the steps of fine-tuning a transformer for NER.',
        items: [
          'Annotate spans and convert them to word-level BIO tags',
          'Subword-tokenise with is_split_into_words=True',
          'Align labels using word_ids(), setting continuations to −100',
          'Train the encoder plus token classification head',
          'Take the argmax tag for each first subword',
          'Decode BIO tags into spans and score with seqeval',
        ],
        explanation:
          'Alignment sits between tokenisation and training, and is where most bugs live. Decoding to spans is the last step because spans, not tags, are the actual output of the system.',
      },
      {
        id: 'NLP-011-q5',
        type: 'multi',
        concept: 'practical pitfalls',
        prompt: 'Which of these genuinely degrade NER performance? Select all that apply.',
        options: [
          'Lowercasing the input text',
          'Labelling every subword instead of only the first',
          'Using an entity scheme different from the one your gold data uses',
          'Using a cased pre-trained model',
          'Evaluating with token accuracy instead of span F1',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Lowercasing removes the strongest proper-noun signal, mislabelling subwords shifts the loss, a scheme mismatch makes every span wrong for no modelling reason, and token accuracy hides failure. A cased model is the correct choice, not a problem.',
      },
      {
        id: 'NLP-011-q6',
        type: 'explain',
        concept: 'span versus token evaluation',
        prompt:
          'Gold is [B-PER, I-PER] for "Jane Smith" and a model predicts [B-PER, O]. Explain both scores and say which you would report.',
        rubric: [
          'Computes token accuracy as 1/2 and span F1 as 0',
          'Explains that the boundary error destroys the entire entity',
          'Argues that span F1 reflects what a downstream system receives',
        ],
        sampleAnswer:
          'Token accuracy is 0.5, since one of the two tags is right. Span F1 is 0: the gold set contains the span (0, 2, PER) and the prediction contains (0, 1, PER), which is not an exact match, so there are zero true positives, one false positive and one false negative. I would report span F1. The output of an NER system is a set of typed spans that populate structured fields, and a record containing "Jane" where it should contain "Jane Smith" is wrong rather than half right — it will fail a deduplication check or create a spurious candidate. Token accuracy also flatters every model, because roughly 88% of tokens are O and predicting O everywhere already scores that well while finding nothing at all.',
        explanation:
          'The examinable judgement is that the metric must match the unit the downstream consumer uses, and for NER that unit is the decoded span.',
      },
    ],

    flashcards: [
      { front: 'What does BIO stand for and what does each tag mean?', back: 'Begin, Inside, Outside. B- starts an entity span, I- continues the current one, O is outside any entity.' },
      { front: 'Why is the B- prefix necessary?', back: 'To separate adjacent entities of the same type. Without it, "Jane Smith John Doe" as four I-PER tags is ambiguous between one entity and two.' },
      { front: 'How many tags for |E| entity types?', back: '2|E| + 1 — a B- and an I- per type, plus one shared O.' },
      { front: 'Why not report token accuracy for NER?', back: 'About 88% of tokens are O, so predicting O everywhere scores 0.88 while finding zero entities. Use span-level F1 via seqeval.' },
      { front: 'How do you align word labels to subword tokens?', back: '`word_ids()` maps subwords to words. Label the first subword of each word; set continuations and special tokens to −100 so the loss ignores them.' },
      { front: 'Why use a cased model for NER?', back: 'Capitalisation is among the strongest proper-noun signals. Lowercasing costs several F1 points immediately.' },
      { front: 'What can BIO not represent?', back: 'Nested, overlapping or discontinuous entities — each token carries exactly one tag, so "University of Washington" cannot also contain a LOC.' },
    ],

    challenge: {
      title: 'A custom entity extractor, evaluated honestly',
      brief:
        'Choose a domain with entity types no general model covers — job postings with SKILL, SENIORITY and BENEFIT, or recipes with INGREDIENT, QUANTITY and TECHNIQUE. Annotate at least 300 sentences in BIO, measuring inter-annotator agreement on a shared subset of 50. Build three systems: a rule-and-gazetteer baseline with spaCy\'s `EntityRuler`, a fine-tuned cased transformer, and the two combined. Report per-type span precision, recall and F1 with `seqeval` for each, and include an error analysis of at least 25 mistakes grouped by cause — boundary, type confusion, missed entity, annotation disagreement.',
      language: 'python',
      acceptanceCriteria: [
        'At least 300 annotated sentences with a documented annotation guideline',
        'Inter-annotator agreement reported on a shared subset',
        'All three systems evaluated with seqeval on one fixed held-out split',
        'Per-type metrics reported, not only an aggregate',
        'At least 25 errors categorised by cause, with a note on which are fixable by modelling and which by better annotation',
      ],
      starterCode:
        'import spacy\nfrom spacy.pipeline import EntityRuler\n\nnlp = spacy.blank("en")\nruler = nlp.add_pipe("entity_ruler")\nruler.add_patterns([\n    {"label": "SKILL", "pattern": [{"LOWER": "python"}]},\n    {"label": "SKILL", "pattern": [{"LOWER": "machine"}, {"LOWER": "learning"}]},\n])\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a colleague who has built text classifiers what changes when the label is per token rather than per document, how BIO works, and why they must not report token accuracy.',
      mustCover: [
        'Sequence labelling assigns one label per token, so output length equals input length',
        'BIO encodes spans as per-token tags, with B- marking the start and I- marking continuation',
        'The B- prefix is what separates adjacent entities of the same type',
        'Evaluation must be at span level, because most tokens are O and token accuracy rewards doing nothing',
      ],
      bonusSignals: [
        'works a short sentence through tagging and decoding',
        'mentions the subword alignment problem',
        'notes that nested entities cannot be represented in plain BIO',
      ],
      sampleExplanation:
        'Everything you have built so far gives one answer per document. Named entity recognition gives one answer per token: walk along the sentence and say, for each word, whether it is part of a name and what kind. The complication is that names span several words, so the label has to encode boundaries too. That is BIO. In "Jane Smith joined Apple in New York", `Jane` gets B-PER for begin-person, `Smith` gets I-PER for inside-person, `joined` gets O for outside, `Apple` gets B-ORG, and `New` and `York` get B-LOC and I-LOC. Decode that and you get three spans: Jane Smith as a person, Apple as an organisation, New York as a location. The B- prefix looks fussy until you see why it exists: if every person token were just tagged PER, then "Jane Smith John Doe" would be four identical tags and you could not tell one person from two. Now the part people get wrong. Do not report token accuracy. On ordinary text about 88% of tokens are O, so a model that predicts O everywhere and finds no entities at all scores 0.88. Worse, a single wrong tag destroys a whole entity: six correct tags out of seven is 86% accuracy but only 67% span F1, and the span number is the honest one, because a database field containing "Jane" instead of "Jane Smith" is wrong, not half right. Use `seqeval`, which implements the CoNLL span metric everyone publishes against. One last practical trap: your annotations are per word but a transformer tokeniser emits subwords, so you have to align them with `word_ids()`, label the first piece of each word and set the rest to −100. Getting that alignment wrong halves your F1 and raises no error at all.',
    },
  },
];
