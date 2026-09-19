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
