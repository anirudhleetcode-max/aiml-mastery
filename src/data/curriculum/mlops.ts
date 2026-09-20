import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'OPS-001',
    domain: 'OPS',
    module: 'Version Control',
    topic: 'Git',
    title: 'Git Fundamentals',
    slug: 'git-fundamentals',
    difficulty: 2,
    estimatedMinutes: 40,
    prerequisites: [],
    tags: ['git', 'commit', 'staging', 'gitignore', 'version control', 'reset', 'revert'],

    learningObjectives: [
      'Explain the three areas Git moves changes between: working tree, staging area and repository',
      'Initialise a repository and record work with `git init`, `git add`, `git commit`, `git status`, `git log` and `git diff`',
      'Describe what a commit actually contains — a full snapshot, a parent pointer, an author and a message',
      'Write a `.gitignore` that keeps virtual environments, datasets and model weights out of history',
      'Choose correctly between `git restore`, `git revert` and `git reset` when undoing work, and say which one destroys data',
    ],

    terminology: [
      {
        term: 'Repository',
        definition:
          'A project directory plus a hidden `.git` folder that stores every commit, branch and object ever recorded. Deleting `.git` deletes the entire history and leaves only the current files.',
        simple: 'The project folder plus a complete diary of everything that has ever happened to it.',
      },
      {
        term: 'Working tree',
        definition:
          'The ordinary files you can see and edit on disk. Git compares this against the last commit to tell you what has changed.',
        simple: 'The files as they are right now, the ones your editor opens.',
      },
      {
        term: 'Staging area (index)',
        definition:
          'A holding area where you assemble exactly the changes that will go into the next commit. `git add` moves changes here; `git commit` turns whatever is here into a commit.',
        simple: 'A tray where you put the things you want to save together before you actually save them.',
      },
      {
        term: 'Commit',
        definition:
          'An immutable object containing a snapshot of every tracked file, the id of its parent commit, an author, a timestamp and a message. Its name is the SHA-1 hash of that content, which is why commit ids look like `a3f91c4`.',
        simple: 'A saved photograph of the whole project, labelled with who took it, when, and why.',
      },
      {
        term: 'Tracked vs untracked',
        definition:
          'A file is tracked once it has been `git add`ed at least once; Git then watches it for changes. Untracked files are invisible to Git until you add them or ignore them.',
        simple: 'Git only watches files you have told it to watch.',
      },
      {
        term: '`.gitignore`',
        definition:
          'A plain text file of path patterns Git must never track. Matching untracked files stop appearing in `git status` and can never be committed by accident.',
        simple: 'A list of things Git should pretend it cannot see.',
      },
    ],

    simpleExplanation:
      "Imagine you are writing an essay and every so often you save a copy called essay_v2, essay_v2_final, essay_v2_final_REALLY. It works until you have forty copies and no idea which one had the good paragraph about penguins. Git is the grown-up version of that. It keeps one folder of files, and alongside it a complete diary of every version that folder has ever been in. Each diary entry, called a commit, is a full photograph of the project at a moment you chose, with your name, the time and a note saying why you took it. Because every photograph is kept, you can go back to any moment, compare any two moments, and see exactly which lines changed between them. The part that surprises people is that saving in Git happens in two steps, not one: first you choose which changes belong together, then you take the photograph. That extra step is what lets you record one clean idea at a time instead of a jumble.",

    whyItExists:
      'Before version control, teams shared code as zip files and dated folders, and the only record of why a line existed was somebody\'s memory. There was no reliable way to find when a bug was introduced, to work on two ideas at once, or to undo a change from last Tuesday without undoing everything since. Git exists so that history is a queryable, complete, tamper-evident record rather than a pile of copies, and so that several people can change the same project without overwriting each other.',

    analogy: {
      scenario:
        "Think of a photographer documenting a building site. The site itself is the live thing — scaffolding moves, walls go up, mistakes get knocked down. Before taking a shot, the photographer walks around and decides what to include in the frame: this wall yes, that pile of rubble no. Then the shutter clicks and the photograph is permanent. Every photograph is filed with the date, the photographer's name, a one-line caption, and crucially a note saying which photograph came immediately before it, so the whole set can be laid out as an unbroken sequence.",
      mapping: [
        { from: 'The building site as it stands today', to: 'The working tree — your files on disk' },
        { from: 'Choosing what to include in the frame', to: '`git add` — staging specific changes' },
        { from: 'The shutter clicking', to: '`git commit` — writing an immutable snapshot' },
        { from: 'The caption on the back of the photo', to: 'The commit message' },
        { from: '"the previous photo was number 41"', to: 'The parent pointer that chains commits into a history' },
        { from: 'A skip you never photograph', to: '`.gitignore` — paths Git refuses to track' },
      ],
      bridge:
        'The analogy is exact in the one place beginners get wrong: the photograph is a snapshot of the whole visible site, not a list of what changed since yesterday. Git stores complete trees, and the familiar `+`/`-` diff you see in `git diff` or on GitHub is computed by comparing two snapshots on demand, not stored. That is why checking out an old commit is instant and reliable — Git does not have to replay a chain of edits, it simply lays out the tree it already has.',
      limitations:
        'Photographs are expensive to store; Git snapshots are not, because identical files are stored once and referenced by hash. Also, a photographer cannot rearrange the past, whereas Git deliberately lets you rewrite unpublished history with `rebase` and `commit --amend` — a power that is safe locally and rude after you have pushed.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The journey of one change',
        caption: 'Every commit you ever make follows exactly this path.',
        steps: [
          { label: 'Edit a file', detail: 'The change exists only in the working tree. `git status` shows it in red as "not staged for commit".' },
          { label: '`git add train.py`', detail: 'The change is copied into the staging area. `git status` now shows it in green.' },
          { label: '`git commit -m "..."`', detail: 'Git writes a snapshot object, points it at the current commit as its parent, and moves the branch forward.' },
          { label: '`git log`', detail: 'The new commit appears at the top of history with its hash, author, date and message.' },
          { label: '`git diff HEAD~1`', detail: 'Git compares the two snapshots and computes the line-level difference for you.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Three ways to undo, and what each one costs',
        caption: 'Pick by asking: has this change been shared with anyone yet?',
        left: {
          heading: 'Safe in public — `git revert <hash>`',
          points: [
            'Creates a NEW commit that reverses an old one',
            'History is preserved; nothing disappears',
            'The correct choice for anything already pushed',
            'Leaves an honest record that a mistake was made and fixed',
          ],
        },
        right: {
          heading: 'Dangerous — `git reset --hard <hash>`',
          points: [
            'Moves the branch pointer backwards and deletes working-tree changes',
            'Uncommitted work is gone with no undo',
            'Rewrites local history, so a shared branch needs a force push',
            'Fine on your own unpushed commits, hostile on a shared branch',
          ],
        },
      },
      {
        kind: 'table',
        title: 'What belongs in Git and what does not',
        columns: ['Item', 'In Git?', 'Why'],
        rows: [
          ['`train.py`, `Dockerfile`, `requirements.txt`', 'Yes', 'Small, text, diffable, and the thing you actually reason about.'],
          ['`.venv/`, `__pycache__/`, `node_modules/`', 'No', 'Regenerable from a lockfile; huge; machine-specific.'],
          ['`data/raw/events.parquet` (4 GB)', 'No', 'Git stores every version forever, so the clone would grow without bound. Use DVC or object storage.'],
          ['`models/resnet50.pt` (98 MB)', 'No', 'Binary, unmergeable, re-created by a training run. Use a model registry or Git LFS.'],
          ['`.env` with an API key', 'Never', 'Secrets in history stay in history on every clone, even after you delete the file.'],
          ['`notebooks/eda.ipynb`', 'With care', 'Outputs make diffs unreadable; strip them with `nbstripout` before committing.'],
        ],
      },
    ],

    formalDefinition:
      'Git is a distributed, content-addressable version control system. It stores a project as a directed acyclic graph of immutable commit objects; each commit references a tree object representing the complete state of the tracked file hierarchy, zero or more parent commits, and author/committer metadata. Object names are cryptographic hashes of their content, so any change anywhere in history changes every descendant hash, making history tamper-evident.',

    codeExamples: [
      {
        language: 'bash',
        title: 'From empty folder to first commit',
        code: `mkdir churn-model && cd churn-model
git init                          # creates the hidden .git directory

# Tell Git who you are (once per machine)
git config --global user.name "Anirudh"
git config --global user.email "anirudh@example.com"

echo "print('training')" > train.py
git status                        # train.py is listed as untracked

git add train.py                  # stage it
git status                        # now "Changes to be committed"

git commit -m "Add training entry point"
git log --oneline                 # 7a1c93f Add training entry point`,
        explanation:
          'The two-step `add` then `commit` is the whole mental model. `git status` is the command you should run constantly — it tells you which of the three areas each change currently sits in, and it almost always suggests the command you need next. Note that `git init` only creates `.git`; nothing is under version control until you add it.',
      },
      {
        language: 'bash',
        title: 'Reading history and differences',
        code: `git log --oneline --graph --decorate -5
# 7a1c93f (HEAD -> main) Add early stopping to the training loop
# 2f0be11 Lower default learning rate to 3e-4
# 91d4a07 Add training entry point

git show 2f0be11                  # full patch for one commit
git diff                          # working tree vs staging area
git diff --staged                 # staging area vs last commit
git diff 91d4a07 7a1c93f -- train.py   # one file, across two commits

git log -S "learning_rate" --oneline   # commits that added or removed that string
git log -p -- train.py                 # full history of one file`,
        explanation:
          'These four `diff` forms answer four genuinely different questions, and confusing them is the most common early frustration: bare `git diff` shows what you have not staged yet, so it prints nothing after you `git add` even though you clearly changed something. `git log -S` is the underused gem — it finds the commit where a particular string entered or left the codebase, which is how you answer "who set this threshold to 0.5 and why".',
      },
      {
        language: 'text',
        title: 'A `.gitignore` for a machine learning project',
        code: `# Environments — regenerable from requirements.txt / uv.lock
.venv/
env/
__pycache__/
*.py[cod]

# Data — versioned with DVC or stored in object storage, never in Git
data/raw/
data/interim/
*.csv
*.parquet

# Models and checkpoints — go to a model registry, not to history
models/
*.pt
*.pkl
*.onnx

# Secrets — never, under any circumstances
.env
*.pem
credentials.json

# Notebook noise
.ipynb_checkpoints/

# Local tooling
.DS_Store
.mypy_cache/
.pytest_cache/`,
        explanation:
          'Two rules make this file work. First, `.gitignore` only affects *untracked* files: if you already committed `data/raw/events.csv`, adding the pattern changes nothing and you must run `git rm --cached data/raw/events.csv` as well. Second, ignoring is about regenerability and size — code and configuration are small, text and irreplaceable, so they go in; environments, data and weights are large, binary and reproducible, so they stay out.',
      },
      {
        language: 'bash',
        title: 'Undoing things without losing your work',
        code: `# 1. Discard changes to a file you have not staged (destructive, no undo)
git restore train.py

# 2. Unstage something you added by mistake (keeps your edits)
git restore --staged secrets.env

# 3. Fix the message or contents of the very last commit (only if unpushed)
git commit --amend -m "Add early stopping with patience=5"

# 4. Undo a commit that is already on GitHub — the safe option
git revert 2f0be11        # writes a new commit that reverses 2f0be11

# 5. Throw away the last two local commits, keeping their changes staged
git reset --soft HEAD~2

# 6. Throw away the last two local commits AND their changes (irreversible)
git reset --hard HEAD~2

# Rescue hatch: every commit HEAD has pointed at, for ~90 days
git reflog`,
        explanation:
          'Order matters here: `restore` works on files, `revert` adds history, `reset` moves the branch pointer. `--soft` keeps your changes staged, `--mixed` (the default) keeps them in the working tree, and `--hard` deletes them. The single sentence worth memorising is: revert is safe on shared branches because it adds; reset is unsafe there because it rewrites. And when you do make a mess, `git reflog` almost always has the commit hash you thought you had destroyed.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Bisecting a model regression',
        usage:
          'A team notices validation AUC dropped from 0.91 to 0.86 sometime in the last three weeks. Because every change is a commit, they run `git bisect` between the known-good and known-bad commits, and in about five training runs Git isolates the exact commit — a feature normalisation change — that caused it. Without commit-level history the only option is guesswork.',
      },
      {
        context: 'A leaked cloud key',
        usage:
          'An intern commits `.env` containing an AWS key, notices, deletes the file and commits again. The key is still in history and is scraped by a bot within minutes. The real remedy is to rotate the key immediately and rewrite history with `git filter-repo`, which is exactly why the key should have been in `.gitignore` from the first commit.',
      },
      {
        context: 'A repository nobody can clone',
        usage:
          'A research repo that committed 200 MB of checkpoints every week reaches 40 GB. Because Git keeps every version forever, deleting the files does not shrink it, and new joiners wait an hour to clone. The fix — move weights to a registry and rewrite history — is a week of work that a six-line `.gitignore` would have prevented.',
      },
    ],

    projectConnections: [
      { tool: 'git', role: 'The substrate everything else in this domain sits on: CI triggers on commits, Docker images are tagged with commit hashes, experiments are tracked by commit.' },
      { tool: 'pre-commit', role: 'Runs formatters, linters and `nbstripout` automatically at commit time so bad content never enters history.' },
      { tool: 'DVC', role: 'Stores large data and model files outside Git while committing a small pointer file, giving you Git-style versioning for gigabytes.' },
      { tool: 'nbstripout', role: 'Removes notebook outputs before commit so `.ipynb` diffs stay readable rather than being walls of base64 image data.' },
    ],

    commonMistakes: [
      {
        mistake: 'Committing the virtual environment, the dataset or the model weights',
        why: 'Git keeps every version of every file forever. A 100 MB checkpoint committed weekly makes the repository permanently enormous, and deleting the file later does not reclaim the space because the old blobs remain reachable from history.',
        fix: 'Write `.gitignore` before the first commit. If something slipped in, `git rm --cached <path>`, add the pattern, and commit. For history that is already polluted, use `git filter-repo` and warn everyone, because it rewrites hashes.',
      },
      {
        mistake: 'Using `git reset --hard` to "clean up" a branch other people have pulled',
        why: '`reset` moves the branch pointer and discards commits. On a shared branch this rewrites published history, so everyone else\'s clone disagrees with the remote and pushing requires `--force`, which can destroy a colleague\'s work.',
        fix: 'On anything already pushed, use `git revert`, which records a new commit that undoes the old one. Keep `reset --hard` for local commits nobody has seen.',
      },
      {
        mistake: 'Commit messages like "fix", "update" or "wip"',
        why: 'The message is the only human-readable explanation of why a change exists. In six months the diff will still be there and the reasoning will not, which makes archaeology on a regression far slower than it needs to be.',
        fix: 'Write a short imperative subject line saying what the commit does and, when the reason is not obvious, a body saying why: "Lower learning rate to 3e-4 — 1e-3 diverged on the new feature set".',
      },
      {
        mistake: 'One enormous commit at the end of the day',
        why: 'A commit touching thirty files across four unrelated ideas cannot be reviewed properly, cannot be reverted selectively, and defeats `git bisect` because the culprit is buried among unrelated changes.',
        fix: 'Commit one coherent idea at a time. Use `git add -p` to stage selected hunks when your working tree has drifted into containing two ideas at once.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is actually stored in a Git commit — the changes you made, or something else?',
        answer:
          'A commit stores a complete snapshot, not a diff. It points at a tree object describing the full state of every tracked file, plus the hash of its parent commit, author and committer metadata, and a message. Unchanged files are not duplicated: identical content has the same hash and is stored once, so snapshots are cheap. The diffs you see in `git show` or on a pull request are computed on demand by comparing two snapshots. This is why checking out an old commit is fast and cannot drift — Git materialises a tree it already has rather than replaying a chain of patches.',
        followUp:
          'A strong answer mentions content addressing: the commit id is the hash of its content, so changing anything in history changes every descendant hash, which is what makes Git history tamper-evident and why rewriting pushed history is disruptive.',
      },
      {
        level: 'internship',
        question: 'You have pushed a commit that broke production. Walk me through `revert` versus `reset` and which you choose.',
        answer:
          '`git revert <hash>` creates a new commit whose content is the inverse of the bad one, so history moves forward and everyone else\'s clone stays consistent — they just pull. `git reset --hard <hash>` moves the branch pointer backwards and discards the commits after it, which rewrites published history and forces everyone to recover their local branches by hand. For anything already pushed I use `revert`, because it is non-destructive, leaves an auditable record that the change happened and was undone, and can itself be reverted if the original change turns out to be fine after a real fix. I keep `reset` for tidying local commits that nobody has seen.',
        followUp:
          'Strong candidates add that reverting a merge commit needs `-m 1` to say which parent is the mainline, and that a reverted feature branch cannot simply be re-merged later — you revert the revert.',
      },
      {
        level: 'ml-engineer',
        question: 'Why is versioning code with Git insufficient to reproduce a machine learning result?',
        answer:
          'A model is a function of code, data, hyperparameters, environment and random seed. Git pins only the first, and usually the third if the configuration is committed. The training data typically lives outside the repository and may change under you; library versions drift unless pinned by a lockfile; GPU non-determinism and unseeded shuffling change results run to run. So the same commit can produce materially different models on two days. Reproducibility needs Git plus a data-versioning layer such as DVC, a pinned environment, a recorded seed, and an experiment tracker that stores the metrics and artifacts alongside the commit hash that produced them.',
        followUp:
          'This is the through-line of the whole domain, and it is the motivation for the versioning, containerisation and tracking units that follow.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You have edited `train.py` and `config.yaml`, but only the `train.py` change is finished. Record just that change as a commit, leaving the config edit untouched in your working tree. Then prove it worked.',
        hint: 'Staging is per-path. What does `git status` show after you add one file but not the other?',
        language: 'bash',
        solution:
          'git add train.py\ngit commit -m "Add early stopping with patience of 5"\ngit status\n\n`git status` now reports `config.yaml` as modified but not staged, and `git log --oneline -1` shows only the training change. This is the entire point of the staging area: the unit of history is an idea you chose, not whatever happened to be on disk when you got tired. If your edits to one file contain two ideas, `git add -p` lets you stage individual hunks.',
      },
      {
        prompt:
          'You accidentally ran `git add .` and staged `.env`, which contains a live API key. It has not been committed. Fix it so that it can never be committed again.',
        hint: 'Two problems: get it out of the staging area, and stop Git from ever offering it.',
        language: 'bash',
        solution:
          'git restore --staged .env        # unstage; the file itself is untouched\necho ".env" >> .gitignore\ngit add .gitignore\ngit commit -m "Ignore local environment files"\n\n`git restore --staged` removes it from the index without touching your disk copy. Adding the pattern means it will never appear in `git status` again. Had it already been committed and pushed, unstaging would not be enough: the key is in history on every clone, so you would rotate the key immediately and only then rewrite history with `git filter-repo`.',
      },
      {
        prompt:
          'Validation accuracy silently dropped and you suspect a change to the feature code in the last twenty commits. Without reading all twenty diffs, find every commit that touched the string `normalize`.',
        hint: 'There is a `git log` flag that searches the content of changes rather than commit messages.',
        language: 'bash',
        solution:
          'git log -S "normalize" --oneline -- src/features/\n\n`-S` (the "pickaxe") lists only commits where the number of occurrences of that string changed, which is exactly "where did this get introduced or removed". Follow it with `git show <hash>` on each candidate. For a suspected behavioural regression with a cheap test, `git bisect start`, `git bisect bad HEAD`, `git bisect good <old-hash>` will binary-search the history and find the offending commit in about log2(n) steps.',
      },
    ],

    quiz: [
      {
        id: 'OPS-001-q1',
        type: 'mcq',
        concept: 'commit contents',
        prompt: 'What does a Git commit object contain?',
        options: [
          'A snapshot of all tracked files, a parent pointer, author metadata and a message',
          'Only the lines that changed since the previous commit',
          'A compressed copy of the previous commit plus a patch file',
          'A list of file names and their sizes',
        ],
        answerIndex: 0,
        explanation:
          'Git stores complete snapshots, deduplicated by content hash, plus a pointer to the parent commit. Diffs are computed when you ask for them, which is why checking out an old commit is fast and never has to replay a chain of patches.',
      },
      {
        id: 'OPS-001-q2',
        type: 'order',
        concept: 'the three areas',
        prompt: 'Put these in the order a change travels through Git.',
        items: [
          'Edit the file in the working tree',
          'Stage the change with `git add`',
          'Write the snapshot with `git commit`',
          'Inspect the recorded history with `git log`',
        ],
        explanation:
          'Working tree, then staging area, then repository. The staging step is what lets you commit one coherent idea rather than everything that happens to be on disk at that moment.',
      },
      {
        id: 'OPS-001-q3',
        type: 'truefalse',
        concept: 'gitignore semantics',
        prompt: 'Adding `data/*.csv` to `.gitignore` removes the already-committed `data/train.csv` from your repository history.',
        answer: false,
        explanation:
          '`.gitignore` only affects untracked files. An already-tracked file keeps being tracked until you run `git rm --cached`, and even then every previous version stays in history until the history itself is rewritten.',
      },
      {
        id: 'OPS-001-q4',
        type: 'mcq',
        concept: 'undoing safely',
        prompt: 'You pushed a broken commit an hour ago and three colleagues have already pulled. Which command do you reach for?',
        options: [
          '`git revert <hash>`',
          '`git reset --hard <hash>` followed by a force push',
          '`git restore <file>`',
          '`git commit --amend`',
        ],
        answerIndex: 0,
        explanation:
          'Revert adds a new commit that undoes the old one, so published history is never rewritten and colleagues only need to pull. Both `reset --hard` and `--amend` rewrite history, which breaks every clone that already has the old commits.',
      },
      {
        id: 'OPS-001-q5',
        type: 'fill',
        concept: 'inspecting changes',
        prompt: 'Which command shows the difference between the staging area and the last commit?',
        answers: ['git diff --staged', 'git diff --cached', 'diff --staged', '--staged'],
        explanation:
          'Bare `git diff` compares the working tree against the staging area, so it prints nothing once you have staged everything. `git diff --staged` (or `--cached`) answers "what exactly am I about to commit?".',
      },
      {
        id: 'OPS-001-q6',
        type: 'explain',
        concept: 'why not commit models',
        prompt: 'A teammate wants to commit a 120 MB model checkpoint "so we do not lose it". Explain why that is a bad idea and what to do instead.',
        rubric: [
          'States that Git retains every version of every file forever, so the repository grows without bound',
          'Notes that binaries cannot be meaningfully diffed or merged',
          'Proposes a concrete alternative such as a model registry, object storage, Git LFS or DVC',
        ],
        sampleAnswer:
          'Git is built for small text files it can diff and deduplicate. A 120 MB binary is stored in full on every commit that changes it, and because old objects stay reachable from history, deleting the file later does not shrink the clone. Within a few months everyone waits ten minutes to clone. Checkpoints are also regenerable: they are the output of a training run, not a source of truth. The better pattern is to push the artifact to object storage or an MLflow model registry, and commit only a small text pointer — a URI, a hash and the run id — so the repository stays light while the checkpoint remains findable and tied to the exact commit that produced it.',
        explanation:
          'The examinable idea is the distinction between source (small, text, irreplaceable) and artifacts (large, binary, regenerable). Git is for the first; registries and object storage are for the second.',
      },
    ],

    flashcards: [
      { front: 'The three areas Git moves changes between?', back: 'Working tree (files on disk), staging area/index (what the next commit will contain), repository (immutable commit history in `.git`).' },
      { front: 'Does a commit store a diff or a snapshot?', back: 'A snapshot of the whole tracked tree, deduplicated by content hash. Diffs are computed on demand by comparing two snapshots.' },
      { front: '`git revert` vs `git reset --hard`', back: 'Revert adds a new commit undoing an old one — safe on shared branches. Reset moves the branch pointer and can destroy work — local only.' },
      { front: 'Why not commit model weights or datasets?', back: 'Git keeps every version forever, binaries do not diff or merge, and both are regenerable. Use a model registry, object storage or DVC and commit a pointer.' },
      { front: 'You deleted commits with `reset --hard` — are they gone?', back: 'Usually not. `git reflog` lists every commit HEAD has pointed at for about 90 days; `git reset --hard <hash>` from there brings them back.' },
      { front: 'Fastest way to find which commit introduced a string?', back: '`git log -S "the_string" --oneline` — the pickaxe search, which lists commits where the occurrence count of that string changed.' },
    ],

    challenge: {
      title: 'A clean history from an unclean folder',
      brief:
        'Take any folder of experiments you have lying around — notebooks, a script, a CSV, maybe a saved model. Turn it into a proper repository: write `.gitignore` before anything else, then build a history of at least five commits where each one records a single coherent idea with a message that explains why. Finish by deliberately making a mistake, pushing nothing, and recovering from it twice — once with `git restore` and once with `git revert` — writing down which areas each command touched.',
      language: 'bash',
      acceptanceCriteria: [
        '`git status` is clean and no data, environment or model files are tracked',
        'At least five commits, each touching a single coherent change',
        'Every commit message has an imperative subject line under about 60 characters',
        '`git log -S` is used at least once to locate a change by content',
        'A written note explains which of the three areas `restore`, `revert` and `reset` each affect',
      ],
      starterCode: '# Start here, before you add anything at all\ngit init\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who currently saves their work as project_final_v3 what Git is, why saving happens in two steps, and what they should never put in it.',
      mustCover: [
        'A commit is a snapshot of the whole project with a parent, an author and a message',
        'The staging area exists so you can choose what goes into one commit',
        'History is a chain: every commit points at the one before it',
        'Large, regenerable or secret files belong outside Git',
      ],
      bonusSignals: ['mentions that diffs are computed, not stored', 'distinguishes revert from reset', 'gives a concrete `.gitignore` entry'],
      sampleExplanation:
        'Git keeps your project folder as it is now, and next to it a complete diary of every version it has ever been. Each diary entry is a photograph of the whole project, stamped with who took it, when, why, and which photograph came before it — so the entries form an unbroken chain you can walk backwards. Saving takes two steps on purpose. First you say which changes belong together, which is `git add`; then you take the photograph, which is `git commit`. That separation is what lets one entry mean one idea instead of "whatever I happened to have open". The things you keep out are the things that are enormous, regenerable, or secret: virtual environments, datasets, model weights and API keys. Git never forgets, so anything you commit once is in every clone forever, which is wonderful for code and a disaster for a leaked key.',
    },
  },

  {
    id: 'OPS-002',
    domain: 'OPS',
    module: 'Version Control',
    topic: 'Collaboration',
    title: 'GitHub, Branches and Collaboration',
    slug: 'github-and-branches',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['OPS-001'],
    tags: ['github', 'branch', 'merge', 'pull request', 'remote', 'code review', 'conflict'],

    learningObjectives: [
      'Explain what a remote is and how `push`, `fetch` and `pull` move commits between clones',
      'Create, switch and merge branches, and describe a branch as nothing more than a movable pointer to a commit',
      'Resolve a merge conflict by hand, including reading the conflict markers and verifying the result',
      'Open a pull request that a reviewer can actually review, and give a useful review on somebody else\'s',
      'Describe a branching workflow appropriate to a small team and say why long-lived branches hurt',
    ],

    terminology: [
      {
        term: 'Remote',
        definition:
          'A named URL pointing at another copy of the repository, conventionally called `origin`. Git is distributed: every clone holds the full history, and a remote is simply the copy you have agreed to synchronise through.',
        simple: 'The shared copy of the project that everyone syncs with, usually on GitHub.',
      },
      {
        term: 'Branch',
        definition:
          'A movable pointer to a commit, stored as a single line of text in `.git/refs/heads/`. Committing moves the pointer forward. This is why creating a branch is instantaneous regardless of repository size.',
        simple: 'A bookmark marking which version you are currently building on.',
      },
      {
        term: 'HEAD',
        definition:
          'A pointer to the branch you currently have checked out (or directly to a commit, which is "detached HEAD"). `HEAD~1` means the commit before it.',
        simple: 'Git\'s "you are here" marker.',
      },
      {
        term: 'Merge commit',
        definition:
          'A commit with two parents, produced when two divergent branches are combined. If one branch is a direct ancestor of the other, Git skips it and does a fast-forward instead.',
        simple: 'The commit where two lines of work rejoin.',
      },
      {
        term: 'Pull request',
        definition:
          'A GitHub construct — not a Git one — proposing that one branch be merged into another, carrying discussion, review, automated checks and a record of the decision.',
        simple: 'A formal request saying "please look at my work and let it into the main branch".',
      },
      {
        term: 'Merge conflict',
        definition:
          'The state Git enters when two branches changed overlapping lines and it cannot decide which to keep. It writes both versions into the file between marker lines and stops, waiting for a human.',
        simple: 'Git saying "you two both edited this line, you decide".',
      },
    ],

    simpleExplanation:
      "Once more than one person works on a project, or even one person works on two ideas at once, you need a way to keep the lines of work apart until they are ready. A branch does that. It sounds heavy but it is almost nothing: a branch is a bookmark pointing at one commit, and when you commit, the bookmark slides forward. Making a new branch just writes a new bookmark, which is why it costs nothing and why professionals make them constantly. GitHub then adds the social half. It hosts one shared copy of the repository that everybody synchronises with, so you push your branch up, and instead of shoving it straight into the main line you open a pull request: a page that shows exactly what you changed, runs the automated tests, and lets a colleague read it and ask questions before it becomes everyone's problem. When two branches touched the same lines, Git refuses to guess and marks the clash in the file for you to settle by hand.",

    whyItExists:
      'Sharing code by email or zip meant the last person to send a file silently overwrote everyone else, and reviewing work meant reading a whole folder rather than a change. Branches let several efforts proceed in parallel against a stable main line, remotes let independent clones exchange commits without a central lock, and pull requests turn "trust me" into a reviewable, testable, recorded decision that new joiners can read months later.',

    analogy: {
      scenario:
        "Think of a shared cookbook in a professional kitchen. The master copy sits on a stand and everybody cooks from it. When a chef wants to change the risotto recipe, she does not scribble on the master. She photocopies the current page, works on her copy for a week, then pins her revised page on the noticeboard next to the original with a note saying what she changed and why. Colleagues read it, someone points out that the new timing conflicts with the stock recipe, she adjusts, and only then does the head chef replace the page in the master copy.",
      mapping: [
        { from: 'The master copy on the stand', to: 'The `main` branch on `origin`' },
        { from: 'Photocopying the current page', to: '`git switch -c feature/new-risotto`' },
        { from: 'Pinning the revised page on the noticeboard', to: 'Pushing the branch and opening a pull request' },
        { from: 'Colleagues reading and commenting', to: 'Code review' },
        { from: 'Two chefs revising the same page in the same week', to: 'A merge conflict' },
        { from: 'The head chef swapping the page in', to: 'Merging the pull request into `main`' },
      ],
      bridge:
        'The analogy holds because of what a branch physically is: a pointer, i.e. a photocopy that costs nothing to make. Where it breaks is that a photocopy goes stale silently, whereas Git knows precisely which commit your branch diverged from and can replay the difference. That is also why the fix for a stale branch is not "start again" but `git merge main` or `git rebase main` — you are updating your copy with everything that happened to the master since you took it.',
      limitations:
        'A cookbook page is edited by one chef at a time; Git genuinely allows simultaneous edits and only complains when the same lines overlap. And unlike a noticeboard, a pull request can run tests on your revised page before anyone reads it.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The feature-branch loop',
        caption: 'The cycle a professional repeats several times a week.',
        steps: [
          { label: '`git switch -c feat/drift-alerts`', detail: 'Branch from an up-to-date `main`. Small scope, one idea.' },
          { label: 'Commit locally', detail: 'Several small commits, each a coherent step.' },
          { label: '`git push -u origin feat/drift-alerts`', detail: 'Publishes the branch and sets its upstream so later pushes are bare `git push`.' },
          { label: 'Open a pull request', detail: 'Describe what and why. CI runs lint, types and tests automatically.' },
          { label: 'Review and revise', detail: 'A colleague comments; you push follow-up commits to the same branch.' },
          { label: 'Merge and delete', detail: 'Squash or merge into `main`, delete the branch, pull `main` locally, start again.' },
        ],
      },
      {
        kind: 'annotated',
        title: 'Reading a merge conflict',
        caption: 'Git writes both versions into the file and stops. Nothing is lost.',
        subject: '<<<<<<< HEAD\nlearning_rate = 0.001\n=======\nlearning_rate = 3e-4\n>>>>>>> feat/lr-sweep',
        annotations: [
          { part: '<<<<<<< HEAD', note: 'Everything below this line, up to the ======= , is the version on the branch you are currently on.' },
          { part: '=======', note: 'The divider. It is not part of your code and must be deleted.' },
          { part: '>>>>>>> feat/lr-sweep', note: 'Everything above this, back to the divider, is the version from the branch being merged in.' },
          { part: 'The resolution', note: 'Delete all three marker lines and leave the code you actually want — which may be either side, or a combination of both, or something new.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Merge versus rebase',
        caption: 'Both integrate `main` into your branch. They differ in the history they leave behind.',
        left: {
          heading: '`git merge main`',
          points: [
            'Creates a merge commit with two parents',
            'History shows exactly what happened, including the messy bits',
            'Never rewrites existing commits, so it is safe on shared branches',
            'Graph becomes braided and harder to read at a glance',
          ],
        },
        right: {
          heading: '`git rebase main`',
          points: [
            'Replays your commits on top of the latest `main`',
            'Produces a clean, linear history',
            'Rewrites your commit hashes, so never rebase a branch others have pulled',
            'Conflicts may need resolving once per replayed commit',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Pulling, fetching and pushing',
        columns: ['Command', 'What it does', 'When you want it'],
        rows: [
          ['`git fetch origin`', 'Downloads new commits and updates `origin/main`. Your working tree is untouched.', 'You want to see what changed before deciding anything.'],
          ['`git pull`', '`fetch` plus `merge` into your current branch.', 'You are ready to take upstream changes now.'],
          ['`git pull --rebase`', '`fetch` plus replay your local commits on top.', 'You have local commits and want linear history without a merge commit.'],
          ['`git push`', 'Uploads your branch commits to the remote.', 'Your work is ready to be seen, or you want it backed up.'],
          ['`git push --force-with-lease`', 'Overwrites the remote branch, but refuses if someone else pushed since you fetched.', 'After an intentional rebase of your own branch. Never on `main`.'],
        ],
      },
    ],

    formalDefinition:
      'A branch is a mutable reference to a commit; because commits form a directed acyclic graph through parent pointers, a branch name identifies an entire reachable history. Merging two branches computes their lowest common ancestor (the merge base), performs a three-way merge of the two tips against that base, and records a commit with both tips as parents. A pull request is a platform-level proposal to perform such a merge, gated by review and automated checks.',

    codeExamples: [
      {
        language: 'bash',
        title: 'Clone, branch, push, and open a pull request',
        code: `git clone https://github.com/acme/churn-model.git
cd churn-model
git remote -v                     # origin  https://github.com/acme/churn-model.git (fetch/push)

git switch main && git pull       # always branch from an up-to-date main
git switch -c feat/add-drift-check

# ... edit files ...
git add src/monitoring/drift.py
git commit -m "Add PSI drift check on the age feature"

git push -u origin feat/add-drift-check
# remote: Create a pull request for 'feat/add-drift-check' on GitHub by visiting:
# remote:   https://github.com/acme/churn-model/pull/new/feat/add-drift-check

gh pr create --title "Add PSI drift check" --body "Flags features whose PSI exceeds 0.2."`,
        explanation:
          'The `-u` on the first push sets the upstream, so every later push and pull on this branch needs no arguments. Branching from a freshly pulled `main` is the habit that prevents most painful conflicts: the further your branch base drifts from reality, the more overlapping edits accumulate. `gh` is GitHub\'s official CLI and does the same thing the web button does.',
      },
      {
        language: 'bash',
        title: 'Resolving a merge conflict from start to finish',
        code: `git switch feat/add-drift-check
git merge main
# Auto-merging src/config.py
# CONFLICT (content): Merge conflict in src/config.py
# Automatic merge failed; fix conflicts and then commit the result.

git status                        # lists "both modified: src/config.py"

# Open src/config.py. You will see:
#   <<<<<<< HEAD
#   DRIFT_THRESHOLD = 0.2
#   =======
#   DRIFT_THRESHOLD = 0.25
#   >>>>>>> main
# Delete the three marker lines, keep the value you actually want.

pytest -q                         # verify the merged code still works
git add src/config.py
git commit                        # Git pre-fills a sensible merge message

# Changed your mind halfway through?
git merge --abort                 # returns you to exactly where you started`,
        explanation:
          'Three things make conflicts unscary. First, nothing is lost — both versions are sitting in the file. Second, `git merge --abort` always exists, so you can back out cleanly. Third, resolving is a thinking task, not a mechanical one: the correct result is sometimes neither side but a combination, so you must run the tests afterwards. Accepting "theirs" wholesale without reading is how a colleague\'s work silently disappears.',
      },
      {
        language: 'bash',
        title: 'Keeping a branch current, and cleaning up after a merge',
        code: `# Option A — merge main in (safe on a branch others have pulled)
git switch feat/add-drift-check
git fetch origin
git merge origin/main

# Option B — rebase onto main (linear history, your branch only)
git fetch origin
git rebase origin/main
git push --force-with-lease       # required: rebasing rewrote your hashes

# After the pull request is merged
git switch main
git pull
git branch -d feat/add-drift-check        # deletes the local branch
git push origin --delete feat/add-drift-check`,
        explanation:
          '`--force-with-lease` rather than `--force` is the professional habit: it refuses the push if the remote moved since you last fetched, so you cannot silently clobber a colleague who pushed to your branch. The golden rule underneath all of this is that rewriting history is fine on commits only you have, and destructive on commits other people already have.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Code review catching a data leak',
        usage:
          'A pull request computes the scaler on the full dataset before splitting into train and test. A reviewer spots it in the diff in thirty seconds. Without review, the model ships with an inflated offline metric and quietly underperforms in production — the single most common serious bug in applied machine learning.',
      },
      {
        context: 'Parallel experimentation',
        usage:
          'Three researchers each try a different architecture on `exp/gbdt`, `exp/transformer` and `exp/ensemble`, all branching from the same commit of the data-preparation code. Because the branches are independent pointers, nobody blocks anybody, and the losing branches are deleted without trace while the winner is merged.',
      },
      {
        context: 'The six-week branch nobody can merge',
        usage:
          'A refactor branch is kept alive for six weeks. By merge time it conflicts with forty files, the conflicts are resolved hastily, and two bugs are introduced during resolution. This is why teams insist on small, short-lived branches merged at least weekly.',
      },
    ],

    projectConnections: [
      { tool: 'GitHub', role: 'Hosts the shared remote, runs pull-request checks, and stores the review record that becomes your team\'s documentation of why things are the way they are.' },
      { tool: 'GitHub Actions', role: 'Runs lint, type checks and tests automatically on every pull request, which is what makes review about design rather than typos.' },
      { tool: 'CODEOWNERS', role: 'Automatically requests review from the right people when particular paths change — for example the on-call engineer for anything under `serving/`.' },
      { tool: 'gh CLI', role: 'Creates, reviews and merges pull requests from the terminal without leaving your editor.' },
    ],

    commonMistakes: [
      {
        mistake: 'Committing directly to `main`',
        why: 'It bypasses review and automated checks entirely, so a broken change reaches everyone immediately, and there is no artifact recording why the change was made.',
        fix: 'Protect `main` on GitHub: require a pull request, at least one approval and passing checks. Then the rule enforces itself rather than relying on discipline.',
      },
      {
        mistake: 'Resolving a conflict by accepting one side without reading the other',
        why: 'Git is telling you two people changed the same lines. Taking one side wholesale silently deletes the other person\'s intent, and because the merge commit looks clean, nobody notices until the behaviour is wrong.',
        fix: 'Read both sides, decide what the code should do, and run the tests before committing the merge. If you genuinely cannot tell, ask the other author — it takes two minutes.',
      },
      {
        mistake: 'A 4,000-line pull request titled "refactor"',
        why: 'Reviewers cannot hold that much in their head, so they skim and approve. Large pull requests measurably receive less useful review than small ones, and they are also far harder to revert if something goes wrong.',
        fix: 'Keep pull requests to roughly one idea and a few hundred lines. Split mechanical changes (renames, formatting) into their own pull request so the substantive one stays readable.',
      },
      {
        mistake: 'Rebasing or force-pushing a branch a colleague has already pulled',
        why: 'Rebasing rewrites commit hashes. Their clone still has the old commits, so their next pull produces a tangled duplicate history and they may lose work recovering from it.',
        fix: 'Rebase only branches that are yours alone. On shared branches, merge instead, and use `--force-with-lease` rather than `--force` so an unexpected remote change aborts the push.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `git fetch` and `git pull`?',
        answer:
          '`fetch` downloads new commits from the remote and updates your remote-tracking references such as `origin/main`, but it does not touch your working tree or your local branch. `pull` is `fetch` followed by an integration step — a merge by default, or a rebase with `--rebase`. So fetch is a read-only "show me what has happened", which is safe to run at any time, while pull actually changes your branch and can produce a merge commit or a conflict. When I have uncommitted work in progress I fetch first, look at `git log main..origin/main`, and decide how to integrate.',
        followUp:
          'A good follow-up answer notes that `git pull` with unstaged changes that overlap incoming edits will refuse to run, which is Git protecting you rather than misbehaving.',
      },
      {
        level: 'internship',
        question: 'Two people edited the same function on different branches. Explain exactly what Git does and how you resolve it.',
        answer:
          'Git finds the merge base — the most recent common ancestor of both branch tips — and performs a three-way merge, comparing each side against that base. Changes in disjoint regions combine automatically. Where both sides changed the same region, Git cannot know which intent should win, so it writes both versions into the file between `<<<<<<<`, `=======` and `>>>>>>>` markers, leaves the file unmerged in the index and stops. I resolve it by opening the file, deciding what the code should actually do — which is sometimes a combination rather than either side — deleting the marker lines, running the test suite, then `git add` and `git commit`. If it looks worse than expected, `git merge --abort` puts me back exactly where I started.',
        followUp:
          'Strong candidates mention that a merge that succeeds textually can still be semantically broken — one branch renames a function, the other adds a call to the old name — which is why tests after a conflict resolution are non-negotiable.',
      },
      {
        level: 'ml-engineer',
        question: 'Describe a branching and review workflow you would set up for a four-person ML team, and defend the trade-offs.',
        answer:
          'Trunk-based development with short-lived feature branches: `main` is always deployable and protected, everyone branches off it, branches live at most a couple of days, and every change enters through a pull request with one approval plus green CI. Releases are tagged from `main`, and anything risky ships behind a feature flag or a canary rather than a long-lived release branch. The trade-off versus something like Git Flow is that we give up formal release branches, which matter when you ship versioned software to customers who upgrade on their own schedule; for a service we deploy ourselves several times a week they mostly add merge pain. For ML specifically I keep experiment branches out of this flow — they are cheap, disposable and often never merged — and require that anything touching training or serving code has a test and a recorded evaluation on a fixed holdout before merge.',
        followUp:
          'The signal here is naming a concrete trade-off rather than reciting a diagram: long-lived branches accumulate conflicts superlinearly, so the cost of integration is the thing the workflow is optimising.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'You are on `main` with two uncommitted file changes when you realise this work should have been on a branch. Move it onto a new branch without losing anything.',
        hint: 'A branch is just a pointer. Creating one does not touch your working tree.',
        language: 'bash',
        solution:
          'git switch -c feat/drift-alerts\ngit add -A\ngit commit -m "Add drift alerting thresholds"\n\nSwitching to a new branch carries uncommitted changes with you, because the working tree is not part of the branch pointer. If you had already committed to `main` locally and not pushed, the fix is `git switch -c feat/drift-alerts` followed by `git switch main && git reset --hard origin/main` to rewind `main` to the remote state — the commits survive on the new branch.',
      },
      {
        prompt:
          'Your branch is five days old and `main` has moved on by thirty commits. You want a clean linear history and nobody else has touched your branch. Bring it up to date and publish it.',
        hint: 'Two commands, and the second one needs a flag because the first rewrote your commit hashes.',
        language: 'bash',
        solution:
          'git fetch origin\ngit rebase origin/main\n# resolve any conflicts, then: git rebase --continue\ngit push --force-with-lease\n\nRebase replays your commits on top of the new `main`, so the history reads as though you started today. Because the replayed commits are new objects with new hashes, the remote branch must be overwritten; `--force-with-lease` does that but aborts if anybody else pushed since your fetch. If colleagues had pulled your branch, the correct choice would be `git merge origin/main` instead.',
      },
      {
        prompt:
          'Write the description for a pull request that adds a `/predict` endpoint to a model service. What must it contain for a reviewer to review it well?',
        hint: 'A reviewer needs to know what changed, why, how you know it works, and what could go wrong.',
        solution:
          'A useful description has four parts. What: "Adds POST /predict returning a calibrated churn probability." Why: the ticket or the business reason, since the diff shows what but never why. How it was verified: the tests added, a sample request and response, and the p95 latency you measured locally. Risk and rollback: what happens if it misbehaves and how to turn it off. Add a screenshot or a curl transcript when behaviour is visible. Keep the branch small enough that the diff fits on two screens, because review quality falls off a cliff beyond that.',
      },
    ],

    quiz: [
      {
        id: 'OPS-002-q1',
        type: 'mcq',
        concept: 'what a branch is',
        prompt: 'What is a Git branch, physically?',
        options: [
          'A movable pointer to a commit',
          'A full copy of the project directory',
          'A compressed archive of the differences from `main`',
          'A folder inside `.git` containing duplicated files',
        ],
        answerIndex: 0,
        explanation:
          'A branch is a file containing one commit hash. That is why creating a branch is instant even in a repository with a million commits, and why deleting a merged branch loses nothing.',
      },
      {
        id: 'OPS-002-q2',
        type: 'truefalse',
        concept: 'fetch vs pull',
        prompt: '`git fetch` changes the files in your working tree.',
        answer: false,
        explanation:
          'Fetch only updates remote-tracking references such as `origin/main`. Your branch and working tree are untouched until you merge or rebase, which is exactly what `git pull` does for you in one step.',
      },
      {
        id: 'OPS-002-q3',
        type: 'debug',
        language: 'text',
        concept: 'conflict resolution',
        prompt: 'A colleague committed this file after resolving a conflict. What went wrong?',
        code: '<<<<<<< HEAD\nDRIFT_THRESHOLD = 0.2\n=======\nDRIFT_THRESHOLD = 0.25\n>>>>>>> main\nMODEL_PATH = "models/churn.pkl"',
        options: [
          'The conflict markers were never removed, so the file is not valid Python',
          'The threshold should always be 0.25',
          '`MODEL_PATH` must come before the threshold',
          'Nothing is wrong; Git strips the markers on commit',
        ],
        answerIndex: 0,
        explanation:
          'Git writes the markers as plain text into the file and never removes them for you. Committing them produces a syntax error at import time — which is why running the tests before committing a merge catches this immediately.',
      },
      {
        id: 'OPS-002-q4',
        type: 'match',
        concept: 'collaboration commands',
        prompt: 'Match each command to what it does.',
        pairs: [
          { left: '`git fetch origin`', right: 'Download new commits without changing your branch' },
          { left: '`git merge main`', right: 'Combine another branch into yours, creating a merge commit if they diverged' },
          { left: '`git rebase main`', right: 'Replay your commits on top of another branch, rewriting their hashes' },
          { left: '`git push --force-with-lease`', right: 'Overwrite the remote branch, but only if nobody else pushed since your last fetch' },
          { left: '`git merge --abort`', right: 'Cancel an in-progress merge and return to the pre-merge state' },
        ],
        explanation:
          'The dividing line is whether a command rewrites existing commits. Fetch and merge never do, so they are always safe on shared branches; rebase and force pushes do, so they belong only on branches that are yours alone.',
      },
      {
        id: 'OPS-002-q5',
        type: 'multi',
        concept: 'pull request quality',
        prompt: 'Which of these genuinely improve the odds of a useful code review? Select all that apply.',
        options: [
          'Keeping the diff to roughly one idea and a few hundred lines',
          'Explaining why the change is needed, not only what it does',
          'Splitting a mass rename into a separate pull request',
          'Bundling unrelated fixes together to save reviewer time',
          'Letting CI run lint and tests before a human looks',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Bundling unrelated changes is the one that backfires: it inflates the diff, hides the substantive change among mechanical noise, and makes the whole thing hard to revert. Everything else reduces the cognitive load on the reviewer.',
      },
      {
        id: 'OPS-002-q6',
        type: 'explain',
        concept: 'workflow design',
        prompt: 'Explain why a team insists that feature branches live at most a few days.',
        rubric: [
          'Notes that conflicts accumulate as the branch base drifts from `main`',
          'Notes that unreviewed, unintegrated work is unverified work',
          'Mentions that small changes are easier to review and to revert',
        ],
        sampleAnswer:
          'Every commit that lands on `main` while your branch is open is a chance for your branch to conflict with it, and the risk compounds — a two-day branch usually merges cleanly, a six-week branch turns into a day of conflict resolution during which real bugs get introduced. There is a second, subtler cost: work sitting on a branch has not been reviewed, has not run against the full CI suite and has not been exercised by anybody else, so the team has no idea whether it works. Small, frequently merged branches keep integration cheap, keep review meaningful, and mean that if something does go wrong the offending change is small enough to revert cleanly.',
        explanation:
          'The core idea is that integration cost grows superlinearly with divergence, so the cheapest strategy is to integrate constantly rather than heroically.',
      },
    ],

    flashcards: [
      { front: 'What is a branch physically?', back: 'A file containing one commit hash — a movable pointer. Committing moves it forward; creating one is instant.' },
      { front: '`git fetch` vs `git pull`', back: 'Fetch downloads and updates `origin/*` only. Pull is fetch plus merge (or rebase) into your current branch.' },
      { front: 'What do `<<<<<<<`, `=======` and `>>>>>>>` mean?', back: 'A conflict. Above the divider is your current branch, below it is the incoming branch. Delete all three markers and keep the code you actually want.' },
      { front: 'When is rebase unsafe?', back: 'On any branch others have pulled — it rewrites commit hashes, so their history diverges from yours.' },
      { front: 'Why `--force-with-lease` instead of `--force`?', back: 'It aborts the push if the remote moved since your last fetch, so you cannot silently overwrite a colleague\'s commits.' },
      { front: 'What does a pull request add that a plain merge does not?', back: 'Review, automated checks, discussion and a permanent record of why the change was accepted.' },
    ],

    challenge: {
      title: 'Manufacture a conflict, then resolve it properly',
      brief:
        'Create a repository with a `config.py` containing three settings. Make two branches that each change the same setting differently, and a third branch that changes a different setting. Merge all three into `main`, noting which merges were automatic and which conflicted. Resolve the conflict so that the final file is correct rather than simply one side, then write four sentences explaining what the merge base was and why Git could combine two of the branches without asking you anything.',
      language: 'bash',
      acceptanceCriteria: [
        'At least one merge completes automatically and at least one conflicts',
        'The resolved file contains no conflict markers and is valid Python',
        '`git log --graph --oneline --all` shows the branch structure and the merge commits',
        'A written note identifies the merge base and explains three-way merging',
        '`git merge --abort` is demonstrated at least once',
      ],
      starterCode: 'git init conflict-lab && cd conflict-lab\nprintf "THRESHOLD = 0.2\\nSEED = 42\\nMODEL = \\"churn\\"\\n" > config.py\n',
    },

    teachingPrompt: {
      prompt:
        'Teach a new intern how a team of four works on one codebase without overwriting each other. Cover branches, remotes, pull requests and what to do when Git says "CONFLICT".',
      mustCover: [
        'A branch is a cheap pointer that lets lines of work proceed in parallel',
        'A remote is a shared copy; push and pull move commits between clones',
        'A pull request adds review and automated checks before work reaches `main`',
        'A conflict means two branches changed the same lines and a human must decide',
      ],
      bonusSignals: ['explains that nothing is lost during a conflict', 'mentions keeping branches short-lived', 'distinguishes merge from rebase'],
      sampleExplanation:
        'Everyone clones the same repository from GitHub, so each person has a complete copy. Before starting a piece of work you make a branch, which is just a bookmark saying "I am building on this commit" — it costs nothing and it means your half-finished work cannot break anyone else. You commit to your branch as you go and push it up, then open a pull request: a page showing precisely what you changed, where the test suite runs automatically and a colleague can ask questions before anything reaches the main line. When you merge, Git combines the two histories. If you and somebody else changed the same lines, Git refuses to guess: it writes both versions into the file between marker lines and stops. Nothing is lost at that point — you open the file, decide what the code should actually do, delete the markers, run the tests, and commit. The habit that keeps this painless is finishing and merging branches within a couple of days, because the longer a branch lives the more the rest of the project moves underneath it.',
    },
  },

  {
    id: 'OPS-003',
    domain: 'OPS',
    module: 'Serving Models',
    topic: 'Environments',
    title: 'Environments and Dependency Management',
    slug: 'environments-and-dependencies',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['OPS-001'],
    related: ['OPS-002'],
    tags: ['venv', 'conda', 'pip', 'requirements', 'pyproject', 'lockfile', 'reproducibility'],

    learningObjectives: [
      'Explain why installing packages globally eventually breaks unrelated projects',
      'Create, activate and use a virtual environment with `venv`, and say when `conda` is the better tool',
      'Distinguish `requirements.txt` from `pyproject.toml` and a lockfile, and know which one pins what',
      'Pin dependencies so that an install six months from now produces the same environment',
      'Diagnose the classic failures: wrong interpreter, unpinned transitive dependency, missing system library',
    ],

    terminology: [
      {
        term: 'Virtual environment',
        definition:
          'A self-contained directory holding its own Python interpreter link and its own `site-packages`. Activating it puts that interpreter first on `PATH`, so `pip install` writes into the project rather than the system.',
        simple: 'A private toolbox for one project, so its tools cannot clash with another project\'s.',
      },
      {
        term: 'Direct vs transitive dependency',
        definition:
          'A direct dependency is one you asked for, such as `scikit-learn`. A transitive dependency is one your direct dependencies pulled in, such as `joblib` and `threadpoolctl`. Transitive versions change silently unless you lock them.',
        simple: 'The things you asked for, and the things they quietly brought along.',
      },
      {
        term: 'Version specifier',
        definition:
          'A constraint on acceptable versions: `==1.5.2` is exact, `>=1.5,<2.0` is a range, `~=1.5.2` allows patch upgrades. Libraries should use ranges; applications should pin.',
        simple: 'The rule saying which versions of a package are allowed.',
      },
      {
        term: 'Lockfile',
        definition:
          'A machine-generated file recording the exact resolved version — and usually the hash — of every package in the dependency tree, direct and transitive. `uv.lock`, `poetry.lock` and `conda-lock.yml` are examples.',
        simple: 'The precise shopping receipt, so the next person buys exactly the same items.',
      },
      {
        term: '`pyproject.toml`',
        definition:
          'The standard Python project manifest (PEP 518/621). It declares project metadata, the dependency constraints a human wrote, the build backend and tool configuration, replacing the old scatter of `setup.py`, `requirements.txt` and `setup.cfg`.',
        simple: 'One file describing what the project is and what it needs.',
      },
    ],

    simpleExplanation:
      "Python installs libraries into one shared folder per interpreter. If project A needs NumPy 1.24 because an old model was pickled against it, and project B needs NumPy 2.1 for a new feature, then installing one breaks the other, because there is only one shelf and only one version fits on it. A virtual environment fixes this by giving every project its own shelf: a small folder containing its own copy of the package directory and a link to an interpreter. When you activate it, `python` and `pip` refer to that folder instead of the system one, so installs are private to the project and deleting the folder undoes everything cleanly. The second half of the problem is remembering what was on the shelf. Writing down \"we use scikit-learn\" is not enough, because scikit-learn depends on other things whose versions change under you. A lockfile records the exact version of every package in the tree, which is what makes an install today and an install next March produce the same environment.",

    whyItExists:
      'Without isolation, every `pip install` mutates one global shelf shared by every project on the machine, so upgrading a package for today\'s work silently breaks last month\'s. Without pinning, the same `pip install -r requirements.txt` produces different package versions on different days, which means a model that trained fine in June fails to load in September with an obscure attribute error. Environments and lockfiles exist so that "it works on my machine" becomes a reproducible statement instead of an apology.',

    analogy: {
      scenario:
        "Picture a shared workshop where every craftsman uses the same wall of tools. Someone sharpening the plane for fine cabinetwork ruins it for rough framing; someone replacing the 10 mm bit with a 10.5 mm one breaks a joint that three other people rely on. The fix is to give each project its own rolling toolchest, stocked from the store at the start of the job. And because \"a chisel, a saw, some screws\" is not enough to restock identically, each chest carries a full itemised list with brand and model number.",
      mapping: [
        { from: 'The shared wall of tools', to: 'The system Python installation' },
        { from: 'A project\'s own rolling toolchest', to: 'A virtual environment' },
        { from: 'Wheeling the chest into place before you start', to: '`source .venv/bin/activate`' },
        { from: 'The vague list "a chisel, a saw"', to: '`requirements.txt` with unpinned names' },
        { from: 'The itemised list with model numbers', to: 'A lockfile with exact versions and hashes' },
      ],
      bridge:
        'The mapping is tight because the failure modes match exactly: a shared tool wall fails when two jobs need incompatible settings, and a global `site-packages` fails when two projects need incompatible versions. Where it stops being a metaphor is that tools are physical and packages are not — you can have a hundred environments on one laptop for the cost of disk space, which is why the correct number of virtual environments is "one per project", always, with no exceptions worth arguing about.',
      limitations:
        'A toolchest cannot bring its own workshop. Virtual environments isolate Python packages but not system libraries such as CUDA, `libgomp` or a specific `glibc`, which is exactly the gap that containers close in the Docker unit.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Starting a project the way you will wish you had',
        caption: 'Five commands, once, that prevent a class of problems entirely.',
        steps: [
          { label: '`python -m venv .venv`', detail: 'Creates an isolated environment folder in the project.' },
          { label: '`source .venv/bin/activate`', detail: 'Puts the environment\'s interpreter first on PATH. Your prompt shows `(.venv)`.' },
          { label: '`echo ".venv/" >> .gitignore`', detail: 'The environment is regenerable; it never belongs in Git.' },
          { label: '`pip install scikit-learn fastapi`', detail: 'Installs into `.venv/lib/python3.11/site-packages`, not the system.' },
          { label: '`pip freeze > requirements.txt`', detail: 'Records exact versions of everything resolved, including transitive dependencies.' },
          { label: 'Commit the manifest, not the environment', detail: 'A colleague recreates it with one command from the committed file.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which file does what',
        columns: ['File', 'Written by', 'Pins transitive deps?', 'Use it for'],
        rows: [
          ['`requirements.txt` (hand-written)', 'A human', 'No', 'A quick script; stating intent such as `pandas>=2.0`.'],
          ['`requirements.txt` (`pip freeze`)', 'pip', 'Yes, but no hashes and no direct/transitive distinction', 'Pinning an application environment when you have no better tool.'],
          ['`pyproject.toml`', 'A human', 'No — it holds constraints', 'Declaring what the project is and what it needs, for any installable project.'],
          ['`uv.lock` / `poetry.lock`', 'The tool', 'Yes, with hashes', 'Guaranteeing the same environment on every machine and in CI.'],
          ['`environment.yml` (conda)', 'A human', 'No unless exported', 'Projects needing non-Python libraries such as CUDA, GDAL or MKL.'],
        ],
      },
      {
        kind: 'compare',
        title: 'venv + pip versus conda',
        caption: 'They solve overlapping but different problems.',
        left: {
          heading: 'venv + pip (or uv)',
          points: [
            'Ships with Python; nothing extra to install',
            'Installs Python packages from PyPI only',
            'Cannot install a C library, a compiler or CUDA for you',
            'Fast, small, and the default for web services and most production images',
          ],
        },
        right: {
          heading: 'conda / mamba',
          points: [
            'Installs Python itself, plus binary system libraries',
            'Handles CUDA, MKL, GDAL and other non-Python dependencies',
            'Solves environments across all of that, which can be slow',
            'Common in research and geospatial work where system libraries dominate',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Try the commands',
        caption: 'Experiment with creating and inspecting an environment.',
        widget: 'code-playground',
      },
    ],

    formalDefinition:
      'A virtual environment is a directory containing a `pyvenv.cfg`, a `bin`/`Scripts` directory with an interpreter entry point, and an isolated `site-packages`. Activating it prepends that `bin` directory to `PATH`, so module resolution and installation target the environment rather than the base installation. Dependency management is the separate problem of resolving a set of version constraints into a single concrete assignment of versions, and of recording that assignment — the lockfile — so the resolution is repeatable rather than recomputed.',

    codeExamples: [
      {
        language: 'bash',
        title: 'Create, activate, install, reproduce',
        code: `cd churn-model
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\\Scripts\\activate

which python                        # /home/you/churn-model/.venv/bin/python
python -c "import sys; print(sys.prefix)"

pip install --upgrade pip
pip install "scikit-learn==1.5.2" "fastapi==0.115.0" "uvicorn[standard]==0.30.6"

pip freeze > requirements.txt
cat requirements.txt | head -5
# annotated-types==0.7.0
# anyio==4.4.0
# fastapi==0.115.0
# joblib==1.4.2
# numpy==2.0.1

deactivate                          # back to the system interpreter`,
        explanation:
          '`which python` is the diagnostic that settles most confusion: if it does not point inside `.venv`, the environment is not active and your installs are going somewhere you did not intend. Note that `pip freeze` captured `joblib` and `numpy`, which you never asked for — they are transitive dependencies of scikit-learn, and pinning them is precisely what stops a future `pip install` from silently resolving a different NumPy.',
      },
      {
        language: 'text',
        title: 'A `pyproject.toml` for a model service',
        code: `[project]
name = "churn-service"
version = "0.3.0"
requires-python = ">=3.11,<3.13"
dependencies = [
  "fastapi>=0.115,<0.116",
  "uvicorn[standard]>=0.30,<0.31",
  "scikit-learn==1.5.2",
  "pydantic>=2.8,<3",
  "numpy>=2.0,<3",
]

[project.optional-dependencies]
dev = ["pytest>=8.3", "ruff>=0.6", "mypy>=1.11", "httpx>=0.27"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.ruff]
line-length = 100

[tool.pytest.ini_options]
addopts = "-q"`,
        explanation:
          'The constraints here express intent rather than exact versions: any FastAPI in the 0.115 line is acceptable, but scikit-learn is pinned exactly because a model pickled with one minor version can fail to unpickle with another. `requires-python` matters more than people expect — it is what stops a colleague on Python 3.9 spending an afternoon on a confusing install failure. The resolved versions then go into a lockfile, which is what CI and the production image install from.',
      },
      {
        language: 'bash',
        title: 'Locking properly with uv, and the conda alternative',
        code: `# uv: a fast resolver that writes a real lockfile with hashes
pip install uv
uv lock                     # resolves pyproject.toml -> uv.lock
uv sync                     # creates .venv and installs EXACTLY what uv.lock says
git add pyproject.toml uv.lock && git commit -m "Lock dependencies"

# In CI or a Dockerfile, install from the lock, never re-resolve:
uv sync --frozen --no-dev

# conda, when you need non-Python libraries such as CUDA
conda create -n churn python=3.11
conda activate churn
conda install -c conda-forge scikit-learn=1.5.2 pytorch-cuda=12.1
conda env export --no-builds > environment.yml`,
        explanation:
          'The distinction worth internalising: `pyproject.toml` is what a human wrote, the lockfile is what the resolver decided, and production installs from the lockfile. `uv sync --frozen` fails loudly if the lock does not match the manifest, which turns "someone added a dependency and forgot to lock it" from a mystery outage into a red CI run. Conda earns its place when the dependency is not a Python package at all — a CUDA runtime or a geospatial C library — which pip simply cannot install.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The unpicklable model',
        usage:
          'A model saved with scikit-learn 1.3 is loaded in an environment that resolved to 1.5 and raises `AttributeError: Can\'t get attribute \'_RemainderColsList\'`. Nothing in the code changed; an unpinned transitive upgrade did. Pinning scikit-learn exactly and serving from a lockfile removes this entire failure class.',
      },
      {
        context: 'CI passes, production fails',
        usage:
          'CI installed `pandas>=2.0` in March and got 2.2.0; the deployment image built in May and got 2.3.0, where a deprecated argument was removed. The build was green and the service still crashed on start. Installing from a committed lockfile in both places makes the two environments identical by construction.',
      },
      {
        context: 'A new joiner productive in ten minutes',
        usage:
          'A repository with a committed `pyproject.toml` and `uv.lock` lets a new engineer run two commands and have a byte-identical environment. The same repository without them costs a day of "try installing this, no, try downgrading that".',
      },
    ],

    projectConnections: [
      { tool: 'uv / poetry', role: 'Resolve constraints into a lockfile and install from it, making environments reproducible rather than approximately similar.' },
      { tool: 'Docker', role: 'Takes reproducibility one level further by capturing the operating system and system libraries the virtual environment cannot.' },
      { tool: 'pip-audit / safety', role: 'Scan the locked dependency set for known vulnerabilities, which is only possible because the set is exactly known.' },
      { tool: 'Dependabot / Renovate', role: 'Opens pull requests that bump the lockfile, so upgrades are deliberate, reviewed and tested rather than accidental.' },
    ],

    commonMistakes: [
      {
        mistake: '`pip install` without an active environment, then wondering why the import fails',
        why: 'The package went into the system interpreter while your editor or notebook is running a different one. Python does not warn you; it simply reports `ModuleNotFoundError` for something you watched install successfully.',
        fix: 'Run `which python` and `pip -V` before installing, and prefer `python -m pip install` so the pip you run always matches the interpreter you mean.',
      },
      {
        mistake: 'Committing `.venv/` to Git',
        why: 'It contains thousands of files and platform-specific compiled binaries that are useless on any other machine, and it inflates the repository permanently.',
        fix: 'Ignore `.venv/` and commit the manifest and lockfile instead. The environment should always be regenerable from those two files in one command.',
      },
      {
        mistake: 'Listing only direct dependencies with no versions',
        why: 'The resolver picks whatever is newest on the day of install, so two installs of the same `requirements.txt` produce different environments. Transitive packages drift most, because nobody is watching them.',
        fix: 'Pin the whole resolved tree with a lockfile, or at minimum `pip freeze` for applications. Keep loose ranges only for libraries you publish, where over-pinning makes your package impossible to co-install.',
      },
      {
        mistake: 'Assuming a virtual environment guarantees reproducibility',
        why: 'It isolates Python packages only. The CUDA driver, the C++ runtime, the system `glibc` and even the Python patch version live outside it, and all of them can change behaviour or break a binary wheel.',
        fix: 'Pin `requires-python`, prefer lockfiles with hashes, and when the system layer matters — GPU inference especially — capture it in a container image.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What problem does a virtual environment solve, and what does it not solve?',
        answer:
          'It solves per-project isolation of Python packages. Without it, every install mutates one shared `site-packages`, so two projects needing different versions of the same library cannot coexist and upgrading for one silently breaks the other. A virtual environment gives each project its own `site-packages` and interpreter link, so installs are private and removing the folder cleanly undoes them. What it does not solve is anything below Python: system shared libraries, compilers, CUDA drivers and the Python patch version itself all still come from the host. That residual gap is the reason production services ship as container images rather than as an activated virtual environment on a shared box.',
        followUp:
          'A strong answer adds that a virtual environment also does not pin versions by itself — isolation and reproducibility are two separate problems, solved by venv and by a lockfile respectively.',
      },
      {
        level: 'intermediate',
        question: 'Your `requirements.txt` says `scikit-learn>=1.3`. Why might the same file produce a working environment in June and a broken one in September?',
        answer:
          'Because a range is resolved at install time against whatever is currently on PyPI. In June it resolved to 1.3.2; in September it resolves to 1.6.0, along with different versions of every transitive dependency such as NumPy, joblib and threadpoolctl. Models are particularly sensitive to this: a pickle is essentially a reference to class paths and attributes in the library that created it, so a minor-version change can make it unloadable, and numerical changes in a dependency can shift predictions without any error at all. The fix is to install from a lockfile that pins the entire resolved tree with hashes, and to treat dependency upgrades as deliberate, reviewed, tested changes rather than a side effect of rebuilding.',
        followUp:
          'Mentioning that model artifacts should record the training environment alongside the weights shows the candidate has actually debugged this in anger.',
      },
      {
        level: 'ml-engineer',
        question: 'When would you choose conda over pip for an ML project, and what does that cost you?',
        answer:
          'Conda when the hard dependencies are not Python packages: a specific CUDA toolkit and cuDNN pairing, MKL-linked numerical libraries, GDAL and PROJ for geospatial work, or a build toolchain that must match. Conda installs those as managed binary packages, and it also manages the Python interpreter itself, so the whole stack is described in one environment file. The costs are real: resolution can be slow, mixing conda-forge with pip installs in the same environment produces subtly broken dependency graphs, images are large, and licensing on the default channel needs checking for commercial use. In practice I keep conda for research environments where system libraries dominate, and use uv or pip inside a slim container image for services, where the base image already fixes the system layer.',
        followUp:
          'The signal is knowing that conda and pip solve different layers, and that mixing them carelessly in one environment is the source of most conda horror stories.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A colleague reports `ModuleNotFoundError: No module named \'fastapi\'` immediately after watching `pip install fastapi` succeed. Diagnose it in three commands.',
        hint: 'The question is never "did it install" but "into which interpreter".',
        language: 'bash',
        solution:
          'which python && which pip\npython -c "import sys; print(sys.executable, sys.prefix)"\npython -m pip list | grep -i fastapi\n\nAlmost always the environment is not active, or pip belongs to a different interpreter than the `python` on PATH, or the editor is running its own configured interpreter. Using `python -m pip install` rather than bare `pip` removes the mismatch by construction, because the pip that runs is the one belonging to that exact interpreter.',
      },
      {
        prompt:
          'Write the three files a small model service needs so that any colleague can reproduce your environment exactly, and say which of them are committed.',
        hint: 'One says what you want, one says what the resolver decided, one says what Git should ignore.',
        solution:
          '`pyproject.toml` holds human-written constraints and project metadata; `uv.lock` (or `poetry.lock`) holds the exact resolved versions and hashes of every package including transitive ones; `.gitignore` contains `.venv/`. The first two are committed, the environment folder never is. A colleague then runs `uv sync --frozen` and gets a byte-identical set of packages. If you cannot adopt a lock tool, the minimum viable version is a `pip freeze`-generated `requirements.txt`, which pins everything but records no hashes and loses the distinction between what you asked for and what came along.',
      },
      {
        prompt:
          'Your team pins `numpy==1.26.4`. A new library you want requires `numpy>=2`. Describe how you would work out whether the upgrade is safe, in order.',
        hint: 'Change one thing at a time, and check the artifacts that were produced under the old version.',
        solution:
          'Create a throwaway branch and environment with NumPy 2 and run the full test suite; read the NumPy 2 migration notes for the APIs your code uses, since several were removed. Then check the artifacts: re-load every pickled model and scaler under the new environment, and re-run evaluation on a fixed holdout comparing predictions element-wise against the old environment rather than just comparing aggregate metrics, because a small numerical shift can hide inside a rounded AUC. If predictions move, retrain and re-validate rather than shipping a model whose training and serving environments disagree. Finally update the lockfile in its own pull request so the change is reviewable and revertible on its own.',
      },
    ],

    quiz: [
      {
        id: 'OPS-003-q1',
        type: 'mcq',
        concept: 'isolation',
        prompt: 'What does activating a virtual environment actually change?',
        options: [
          'It prepends the environment\'s `bin` directory to `PATH`, so `python` and `pip` resolve to that environment',
          'It downloads a fresh copy of Python from the internet',
          'It changes which operating system libraries are available',
          'It automatically pins every package version',
        ],
        answerIndex: 0,
        explanation:
          'Activation is little more than a `PATH` manipulation plus setting `VIRTUAL_ENV`. That is why `which python` is the definitive check, and why nothing outside Python packages — system libraries, drivers — is isolated.',
      },
      {
        id: 'OPS-003-q2',
        type: 'truefalse',
        concept: 'lockfiles',
        prompt: 'A `requirements.txt` containing `pandas>=2.0` guarantees that two colleagues get the same pandas version.',
        answer: false,
        explanation:
          'A range is resolved at install time against the current package index, so installs on different days give different versions — and different transitive dependencies too. Only a lockfile, or exact `==` pins across the whole tree, gives that guarantee.',
      },
      {
        id: 'OPS-003-q3',
        type: 'match',
        concept: 'tooling',
        prompt: 'Match each file to its role.',
        pairs: [
          { left: '`pyproject.toml`', right: 'Human-written constraints and project metadata' },
          { left: '`uv.lock`', right: 'Machine-generated exact versions and hashes for the whole tree' },
          { left: '`.gitignore`', right: 'Keeps the environment folder out of version control' },
          { left: '`environment.yml`', right: 'Conda environment including non-Python system libraries' },
        ],
        explanation:
          'Manifest, lock, ignore and conda environment answer four different questions. Confusing the manifest with the lock is the usual cause of environments that are "nearly" the same.',
      },
      {
        id: 'OPS-003-q4',
        type: 'debug',
        language: 'bash',
        concept: 'interpreter mismatch',
        prompt: 'This sequence installs into the system Python despite the environment existing. Why?',
        code: 'python3 -m venv .venv\npip install fastapi\npython -c "import fastapi"',
        options: [
          'The environment was never activated, so `pip` is still the system pip',
          '`venv` requires the `--system-site-packages` flag to work',
          'FastAPI cannot be installed into a virtual environment',
          'The environment folder must be called `venv`, not `.venv`',
        ],
        answerIndex: 0,
        explanation:
          'Creating an environment does not activate it. Without `source .venv/bin/activate` (or calling `.venv/bin/pip` directly), `pip` resolves from the unchanged `PATH` and installs system-wide.',
      },
      {
        id: 'OPS-003-q5',
        type: 'fill',
        concept: 'diagnosis',
        prompt: 'Which single command tells you whether the interpreter you are about to use is the one inside your virtual environment?',
        answers: ['which python', 'which python3', 'where python', 'command -v python'],
        explanation:
          'If the path does not start with your project\'s `.venv`, the environment is not active and every subsequent install or import will surprise you. This one command resolves the majority of "it installed but it will not import" reports.',
      },
      {
        id: 'OPS-003-q6',
        type: 'explain',
        concept: 'reproducibility layers',
        prompt: 'Explain why a virtual environment plus a lockfile still does not guarantee that a GPU training run reproduces on another machine.',
        rubric: [
          'Notes that system libraries, drivers and the OS are outside the environment',
          'Mentions a concrete example such as CUDA or glibc version differences',
          'Points to containers, and ideally to seeds and data versioning, as the remaining pieces',
        ],
        sampleAnswer:
          'A lockfile fixes the Python layer precisely, but a training run also depends on everything underneath it: the CUDA runtime and driver version, cuDNN, the BLAS implementation a wheel was linked against, and the base operating system. Two machines with identical `uv.lock` files but different drivers can produce different numerics, and some binary wheels will not even import. A container image closes that gap by fixing the operating system and system libraries as well. Even then, reproducibility is not complete: results also depend on the data version, the random seed, and whether GPU kernels were run in a deterministic mode, because many cuDNN algorithms are non-deterministic by default. Full reproducibility therefore needs four things pinned together — code, environment down to the OS, data, and seed.',
        explanation:
          'The point is that reproducibility is layered, and each layer needs its own mechanism: venv and lockfile, then container, then data versioning, then seeds.',
      },
    ],

    flashcards: [
      { front: 'What does a virtual environment isolate?', back: 'Python packages and the interpreter link only. System libraries, drivers and the OS are shared with the host.' },
      { front: 'Manifest vs lockfile', back: 'The manifest (`pyproject.toml`) holds constraints a human wrote; the lockfile holds the exact versions the resolver chose, including transitive ones.' },
      { front: 'Why never commit `.venv/`?', back: 'It is thousands of platform-specific files, regenerable in one command from the committed manifest and lock.' },
      { front: 'When is conda the right choice?', back: 'When non-Python dependencies dominate — CUDA, MKL, GDAL — because pip cannot install system libraries.' },
      { front: 'First command when an import fails after a successful install?', back: '`which python` — the package almost always went into a different interpreter than the one you are running.' },
      { front: 'Why pin scikit-learn exactly in a serving image?', back: 'A pickle references class paths and attributes of the library that created it, so a minor-version change can make the model unloadable.' },
    ],

    challenge: {
      title: 'Make an environment reproducible on purpose',
      brief:
        'Take an existing script of yours with at least three third-party imports. Create a fresh virtual environment, install only what it needs, and produce both a `pyproject.toml` with deliberate constraints and a lockfile. Then prove reproducibility: delete the environment entirely, recreate it from the committed files alone, and run the script. Finally, break it deliberately — loosen one pin to `>=` and install the newest version — and record what changed in the resolved tree.',
      language: 'bash',
      acceptanceCriteria: [
        'A `pyproject.toml` declares `requires-python` and constraints with a stated reason for each exact pin',
        'A lockfile is committed and the environment folder is ignored',
        'The environment is deleted and rebuilt from committed files alone, and the script still runs',
        'A written note lists at least three transitive dependencies you never asked for',
        'The loosened-pin experiment records which versions changed',
      ],
      starterCode: 'python3 -m venv .venv && source .venv/bin/activate\n',
    },

    teachingPrompt: {
      prompt:
        'A teammate asks why they cannot just `pip install` everything globally like they have been doing for a year. Explain the problem and the two separate things that fix it.',
      mustCover: [
        'Global installs share one `site-packages`, so projects with different version needs collide',
        'A virtual environment gives each project its own package directory',
        'Isolation and reproducibility are different problems: venv solves the first, a lockfile the second',
        'Some dependencies live below Python and need conda or a container',
      ],
      bonusSignals: ['mentions transitive dependencies drifting', 'gives a concrete failure such as an unloadable pickle', 'notes that `.venv` is disposable and must not be committed'],
      sampleExplanation:
        'Python keeps installed libraries in one folder per interpreter, so if everything is global there is exactly one version of NumPy on your machine. The moment an old project needs 1.26 and a new one needs 2.1, installing for one breaks the other, and the breakage shows up later as a confusing error in code you did not touch. A virtual environment solves that by giving each project its own package folder; activating it just points `python` and `pip` at that folder, and deleting the folder undoes everything. That handles isolation but not repeatability. If your requirements file only says "scikit-learn", then installing today and installing in March give different versions, and so do all the packages scikit-learn quietly depends on. A lockfile records the exact version of every package in the tree, so an install is a replay rather than a fresh decision. And if the project depends on things below Python — a CUDA runtime, a C library — then even that is not enough, which is the argument for containers.',
    },
  },

  {
    id: 'OPS-004',
    domain: 'OPS',
    module: 'Serving Models',
    topic: 'HTTP and APIs',
    title: 'APIs and HTTP for ML',
    slug: 'apis-and-http-for-ml',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['OPS-003'],
    related: ['OPS-001'],
    tags: ['http', 'rest', 'api', 'json', 'status codes', 'latency', 'contract'],

    learningObjectives: [
      'Describe the request/response cycle and name the parts of an HTTP request and response',
      'Choose the right method and status code for an operation, and explain why 200, 4xx and 5xx mean different things to a caller',
      'Design a JSON request and response schema for a prediction endpoint that will survive a model change',
      'Explain why putting a model behind an API decouples it from every consumer',
      'Reason about latency and payload size: batching, p95 versus mean, timeouts and keep-alive',
    ],

    terminology: [
      {
        term: 'HTTP request',
        definition:
          'A method, a path, headers and an optional body sent to a server. `POST /predict HTTP/1.1` with `Content-Type: application/json` and a JSON body is the shape almost every model service uses.',
        simple: 'A structured message asking a server to do something.',
      },
      {
        term: 'Status code',
        definition:
          'A three-digit result code. 2xx means it worked, 4xx means the caller sent something wrong, 5xx means the server failed. The class matters more than the exact number because clients and monitoring branch on it.',
        simple: 'A number telling the caller whether it worked, and whose fault it was if not.',
      },
      {
        term: 'REST',
        definition:
          'An architectural style where URLs name resources, HTTP methods name operations on them, and the server keeps no client session state between requests. Most "REST APIs" in practice follow the conventions rather than the full constraints.',
        simple: 'A common set of conventions for laying out an API so others can guess how it works.',
      },
      {
        term: 'Idempotent',
        definition:
          'An operation that can be repeated without changing the result beyond the first application. GET, PUT and DELETE are expected to be idempotent; POST is not, which is why retrying a POST needs care.',
        simple: 'Safe to do twice by accident.',
      },
      {
        term: 'API contract',
        definition:
          'The agreed shape of requests and responses — field names, types, required fields, error format — that both sides code against. Changing it in a breaking way requires a new version, not a quiet edit.',
        simple: 'The written promise about what you can send and what you will get back.',
      },
      {
        term: 'p95 latency',
        definition:
          'The response time that 95% of requests come in under. It is reported alongside the mean because averages hide the slow tail that users actually notice.',
        simple: 'How slow the unlucky one-in-twenty request is.',
      },
    ],

    simpleExplanation:
      "An API is the doorway through which one program asks another program for something. On the web that conversation follows a very simple pattern: the caller sends a request saying which method it wants (GET to read, POST to send data), which path it is addressing, some headers describing the message, and usually a body of JSON. The server does its work and sends back a status code and a body. That is the whole protocol, and it is deliberately dull, because dullness is what lets a mobile app written in Swift, a website written in TypeScript and a nightly job written in Java all talk to your Python model without any of them knowing that Python exists. This is the real reason models are served behind APIs. The moment prediction is a URL rather than a function call, you can retrain the model, rewrite it in a different framework, move it to a different machine, or run three versions side by side, and the callers do not change a single line — as long as the shape of the request and response stays the same.",

    whyItExists:
      'A model embedded directly in an application ties every consumer to your Python version, your library versions and your deployment schedule, and it must be re-embedded in every consumer that wants predictions. Exposing it over HTTP replaces that coupling with a contract: callers depend only on the shape of the request and response, so the model, its framework and its hardware can change underneath without any consumer being rebuilt or redeployed.',

    analogy: {
      scenario:
        "Think of ordering at the counter of a busy kitchen. You do not walk in and use the stove. You write your order on a standard slip — dish, quantity, any allergies — hand it over, and shortly afterwards you get either the food or a slip back saying what went wrong: 'we do not serve that' if you asked for something off-menu, or 'the oven has broken' if the kitchen failed. You never learn whether the chef changed, whether they swapped the oven, or whether tonight there are three cooks instead of one.",
      mapping: [
        { from: 'The order slip with fixed fields', to: 'The JSON request body and its schema' },
        { from: 'The counter itself', to: 'The HTTP endpoint, e.g. `POST /predict`' },
        { from: '"we do not serve that"', to: 'A 4xx status — the caller\'s request was invalid' },
        { from: '"the oven has broken"', to: 'A 5xx status — the server failed' },
        { from: 'The kitchen swapping chefs mid-service', to: 'Deploying a new model version behind the same endpoint' },
        { from: 'Three cooks on the same counter', to: 'Horizontal scaling behind a load balancer' },
      ],
      bridge:
        'The decoupling is the whole point, and it is literal: because the only thing the customer depends on is the order slip format, the kitchen can change everything else. In an ML service the "order slip" is the request schema and the "food" is the response schema; keep those stable and you can replace a logistic regression with a gradient-boosted tree with a transformer, on CPU or GPU, without a single consumer redeploying. Break the slip format and every consumer breaks at once, which is why breaking changes get a new version rather than a quiet edit.',
      limitations:
        'A counter hides everything; an API cannot hide latency. Calling a model over the network adds serialisation, transport and queueing time that an in-process function call does not have, which is why very low-latency paths sometimes embed the model after all.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The life of one prediction request',
        caption: 'Every millisecond in here shows up in your p95.',
        steps: [
          { label: 'Client builds JSON', detail: 'Serialises the feature payload and opens (or reuses) a connection.' },
          { label: 'Network to the load balancer', detail: 'TLS handshake if the connection is new; reused connections skip it.' },
          { label: 'Routed to an instance', detail: 'The load balancer picks a healthy replica, using the `/health` endpoint to know which ones those are.' },
          { label: 'Validate and deserialise', detail: 'The server rejects malformed input with 422 before touching the model.' },
          { label: 'Featurise and infer', detail: 'The model, already in memory, produces a score. This is often not the slowest step.' },
          { label: 'Serialise and respond', detail: 'JSON body plus a status code travels back. The client parses it.' },
        ],
      },
      {
        kind: 'table',
        title: 'Status codes a model service actually uses',
        columns: ['Code', 'Meaning', 'When your service returns it'],
        rows: [
          ['200 OK', 'Success', 'A prediction was produced and is in the body.'],
          ['400 Bad Request', 'Malformed request', 'The body was not valid JSON at all.'],
          ['401 / 403', 'Unauthenticated / forbidden', 'Missing or insufficient API key.'],
          ['404 Not Found', 'No such resource', 'A request for `/models/v9` that does not exist.'],
          ['422 Unprocessable Entity', 'Well-formed but semantically invalid', 'JSON parsed, but `age` was a string or a required feature was missing.'],
          ['429 Too Many Requests', 'Rate limited', 'The caller exceeded its quota; include a `Retry-After` header.'],
          ['500 Internal Server Error', 'Unhandled server fault', 'An exception escaped your handler. Never leak the stack trace to the caller.'],
          ['503 Service Unavailable', 'Temporarily unable', 'The model has not finished loading, or a dependency is down.'],
        ],
      },
      {
        kind: 'compare',
        title: 'Model in-process versus model behind an API',
        caption: 'The trade is coupling for latency.',
        left: {
          heading: 'Imported directly into the app',
          points: [
            'No network hop; microseconds, not milliseconds',
            'Every consumer must run your Python and your dependency versions',
            'Updating the model means redeploying every consumer',
            'Cannot scale inference independently of the application',
          ],
        },
        right: {
          heading: 'Served over HTTP',
          points: [
            'Any language, any platform, one shared contract',
            'Model, framework and hardware change without touching consumers',
            'Inference scales, versions and rolls back on its own schedule',
            'Costs a network round trip, serialisation and a new failure mode',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a prediction request',
        subject: 'POST /v1/predict HTTP/1.1\nHost: churn.internal\nContent-Type: application/json\nAuthorization: Bearer sk_live_...\n\n{"customer_id": "c_9182", "features": {"tenure_months": 14, "monthly_charges": 79.35}}',
        annotations: [
          { part: 'POST', note: 'The method. POST because we are sending a body and the call is not naturally cacheable or idempotent.' },
          { part: '/v1/predict', note: 'The path, versioned. `v1` is what lets you ship a breaking schema change later without breaking existing callers.' },
          { part: 'Content-Type: application/json', note: 'Tells the server how to parse the body. Getting this wrong is the usual cause of a confusing 422.' },
          { part: 'Authorization: Bearer ...', note: 'Credentials travel in a header, never in the URL, because URLs end up in logs and browser history.' },
          { part: 'The JSON body', note: 'The features. Named fields rather than a bare positional array, so column-order mistakes are impossible.' },
        ],
      },
    ],

    formalDefinition:
      'HTTP is a stateless, request-response application protocol in which a client sends a method, a target URI, headers and an optional body, and the server returns a status line, headers and an optional body. A REST-style API models application state as addressable resources manipulated through a uniform set of methods, with each request carrying all the context needed to process it. An ML inference API is a specialisation in which a resource-like endpoint accepts a feature payload and returns a scored response under a versioned, explicitly typed contract.',

    codeExamples: [
      {
        language: 'bash',
        title: 'Talking to an inference API with curl',
        code: `# A successful prediction
curl -i -X POST https://churn.internal/v1/predict \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{"customer_id":"c_9182","features":{"tenure_months":14,"monthly_charges":79.35}}'

# HTTP/1.1 200 OK
# content-type: application/json
# x-model-version: churn-2024-09-02
# {"customer_id":"c_9182","churn_probability":0.8123,"label":"at_risk"}

# The same call with a missing required feature
curl -s -o /dev/null -w "%{http_code}\\n" -X POST https://churn.internal/v1/predict \\
  -H "Content-Type: application/json" -d '{"customer_id":"c_9182","features":{}}'
# 422

# How slow is it really?
curl -s -o /dev/null -w "connect=%{time_connect} total=%{time_total}\\n" \\
  https://churn.internal/health`,
        explanation:
          '`curl -i` prints the response headers, which is where the interesting operational information lives — here an `x-model-version` header that tells you exactly which model produced the score, which is invaluable when debugging a prediction after the fact. The second call shows the distinction that matters: the JSON parsed fine, so this is 422 rather than 400. The `-w` format string is the quickest honest latency measurement you can take without installing anything.',
      },
      {
        language: 'python',
        title: 'A well-behaved client: timeouts, retries and connection reuse',
        code: `import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

# One client, reused: keeps connections alive and skips repeated TLS handshakes.
client = httpx.Client(
    base_url="https://churn.internal",
    timeout=httpx.Timeout(connect=1.0, read=2.0, write=2.0, pool=2.0),
    headers={"Authorization": f"Bearer {API_KEY}"},
)

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.2, max=2))
def predict(customer_id: str, features: dict) -> dict:
    r = client.post("/v1/predict", json={"customer_id": customer_id, "features": features})
    if r.status_code == 422:
        raise ValueError(f"bad payload: {r.json()}")   # do NOT retry a 4xx
    r.raise_for_status()                                # retry 5xx and timeouts
    return r.json()

# Batch 64 rows in one request instead of 64 requests.
batch = client.post("/v1/predict:batch", json={"rows": rows[:64]}).json()`,
        explanation:
          'Three habits separate a client that survives production from one that causes an incident. First, always set an explicit timeout — the default in several HTTP libraries is "wait forever", which turns one slow model instance into a pile-up across every caller. Second, retry 5xx and timeouts with exponential backoff, but never retry a 4xx: the request is wrong and will be wrong again. Third, reuse the client so connections stay alive; on a short request the TLS handshake can cost more than the inference itself.',
      },
      {
        language: 'json',
        title: 'A request and response contract worth keeping',
        code: `// Request
{
  "request_id": "req_7f3a",
  "rows": [
    {"customer_id": "c_9182", "tenure_months": 14, "monthly_charges": 79.35, "contract": "month-to-month"},
    {"customer_id": "c_2210", "tenure_months": 61, "monthly_charges": 24.10, "contract": "two-year"}
  ]
}

// Response
{
  "request_id": "req_7f3a",
  "model_version": "churn-2024-09-02",
  "predictions": [
    {"customer_id": "c_9182", "churn_probability": 0.8123, "label": "at_risk"},
    {"customer_id": "c_2210", "churn_probability": 0.0412, "label": "safe"}
  ]
}

// Error, in the same shape every time
{
  "request_id": "req_7f3a",
  "error": {
    "type": "validation_error",
    "message": "rows.0.tenure_months must be an integer >= 0",
    "field": "rows.0.tenure_months"
  }
}`,
        explanation:
          'Four design decisions are doing the work. Named fields rather than a positional array make column-order bugs impossible. Echoing `request_id` lets you join a client-side log line to a server-side one when something goes wrong. Returning `model_version` means a prediction recorded today can still be explained in six months. And a single consistent error shape means every caller writes one error handler instead of guessing.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Fraud scoring inside a payment flow',
        usage:
          'The checkout service calls a scoring endpoint with a strict 50 ms timeout and a documented fallback: if the model does not answer in time, the transaction is scored by a simple rule instead. The model team can redeploy hourly without the payments team being involved, precisely because the contract is the only shared surface.',
      },
      {
        context: 'One model, four consumers',
        usage:
          'A recommendation model is called by an iOS app, an Android app, the website and a nightly email job, written in four different languages. None of them contains a line of Python. Adding a fifth consumer costs an API key, not a rewrite.',
      },
      {
        context: 'The silent version mismatch',
        usage:
          'A client sends `{"tenure": 14}` while the server expects `tenure_months`. Without validation the field arrives as a missing value, the model imputes a default, and predictions are quietly wrong for weeks. With a typed schema the call fails loudly with 422 on the very first request.',
      },
    ],

    projectConnections: [
      { tool: 'FastAPI', role: 'Turns a typed Python function into an HTTP endpoint with validation and generated documentation, which is the next unit.' },
      { tool: 'OpenAPI', role: 'A machine-readable description of the contract, from which clients, mocks and documentation are generated.' },
      { tool: 'httpx / requests', role: 'The client side: timeouts, retries, connection pooling and the discipline that keeps a caller from amplifying an outage.' },
      { tool: 'Postman / Bruno', role: 'Saved request collections so the team can exercise an endpoint the same way every time.' },
    ],

    commonMistakes: [
      {
        mistake: 'Returning 200 with `{"error": "..."}` in the body',
        why: 'Every load balancer, retry policy, alert and dashboard branches on the status code. A 200 that contains an error is invisible to all of them, so a completely broken service shows a perfect success rate.',
        fix: 'Use the status code to carry the outcome: 422 for invalid input, 5xx for server faults, and keep the body for detail. This is the single most consequential convention in the unit.',
      },
      {
        mistake: 'Sending features as a bare positional array',
        why: '`[14, 79.35, 1, 0]` depends on column order that only the training code knows. Insert a feature in the middle and every caller silently sends the wrong values into the wrong columns, with no error anywhere.',
        fix: 'Use named fields and validate them server-side. If you must accept arrays for payload-size reasons, send the column names alongside and verify them.',
      },
      {
        mistake: 'No timeout on the client',
        why: 'Several HTTP libraries default to waiting indefinitely. One slow model replica then holds every caller\'s connection open, threads pile up, and the outage spreads upstream to services that have nothing to do with the model.',
        fix: 'Always set connect and read timeouts, retry idempotent calls with exponential backoff and jitter, and define what the caller does when the model is unavailable.',
      },
      {
        mistake: 'Making a breaking schema change in place',
        why: 'Renaming a field or changing a type breaks every deployed consumer at the moment you deploy, including ones you do not know about, and rolling back the model does not roll back their code.',
        fix: 'Add fields, never rename them; make new fields optional; and when a genuinely breaking change is needed, publish `/v2` and run both until callers migrate.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a 400, a 422 and a 500, and why does the distinction matter operationally?',
        answer:
          '400 means the request was malformed at the protocol or parsing level — the body was not valid JSON at all. 422 means the request parsed fine but was semantically invalid: a required feature was missing or a field had the wrong type. 500 means the server itself failed while processing an otherwise acceptable request. The distinction matters because everything downstream keys off the class: 4xx tells the caller that retrying unchanged is pointless and that the bug is on their side, 5xx tells them a retry with backoff may well succeed, and monitoring should page on a 5xx spike but usually not on a 4xx spike, which normally means a client deployed a bad change. Collapsing all of them into 200 or into 500 destroys that signal.',
        followUp:
          'A strong answer adds that 503 is worth distinguishing during startup: returning 503 until the model is loaded lets the load balancer keep traffic away instead of serving errors.',
      },
      {
        level: 'intermediate',
        question: 'Why serve a model behind an API rather than importing it directly into the application?',
        answer:
          'Because it replaces code coupling with a contract. Importing the model forces every consumer to run a compatible Python and dependency set, to redeploy whenever the model changes, and to size its own hardware for inference. Behind an API, consumers depend only on the request and response shape, so the model can be retrained, reframeworked, moved to GPU, canaried or rolled back without any of them changing. It also lets inference scale independently, centralises logging of what was predicted for whom, and makes A/B or shadow deployment a routing decision rather than a code change. The cost is a network hop with its own latency and failure modes, which is why ultra-low-latency paths — sub-millisecond ranking inside a request the service is already handling — sometimes embed the model anyway.',
        followUp:
          'Naming the trade-off explicitly, rather than treating "always use an API" as doctrine, is what distinguishes a considered answer.',
      },
      {
        level: 'ml-engineer',
        question: 'Your p50 latency is 20 ms and your p99 is 900 ms. What do you investigate, and why do you not trust the mean?',
        answer:
          'The mean is dominated by the bulk of fast requests, so a small tail of very slow ones barely moves it while being exactly what users and upstream timeouts experience. A 45x gap between p50 and p99 points at something intermittent rather than the model being slow: garbage collection or Python GIL contention, cold connections paying a TLS handshake, a thread pool saturating so requests queue, an occasional cache miss that hits a feature store or database, or a small number of unusually large payloads. I would start by splitting latency into its phases — queue time, featurisation, inference, serialisation — and emitting a histogram per phase rather than an average, then check whether the slow requests correlate with a particular instance, payload size, or moment just after a deploy. Batching, connection reuse, capping input size and pre-warming the model after startup are the usual remedies.',
        followUp:
          'Mentioning that averaging percentiles across instances is statistically invalid, and that you need histograms rather than pre-computed p99s, signals real operational experience.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Design the request and response JSON for an endpoint that scores up to 100 transactions for fraud in one call. State two decisions you made and why.',
        hint: 'Think about how a caller matches each score back to the transaction it sent, and what they will need in six months.',
        solution:
          'Request: `{"request_id": "...", "transactions": [{"transaction_id": "t_1", "amount": 42.10, "merchant_category": "grocery", "hours_since_last": 3.5}, ...]}`. Response: `{"request_id": "...", "model_version": "fraud-2024-11-03", "results": [{"transaction_id": "t_1", "fraud_score": 0.02, "decision": "allow"}]}`. Two decisions: every result carries the caller\'s own `transaction_id` rather than relying on array position, so a partial failure or a reordering cannot silently misattribute scores; and `model_version` is returned so a decision logged today can be explained later against the exact model that made it. I would also cap the batch explicitly and return 422 rather than silently truncating.',
      },
      {
        prompt:
          'A caller complains your service "returns errors". Your dashboard shows a 100% success rate. What is almost certainly happening and how do you confirm it?',
        hint: 'What status code does your service return when something goes wrong?',
        solution:
          'The service is returning 200 with an error object in the body, so every status-code-based dashboard, alert and load-balancer health check believes everything is fine. Confirm it with `curl -i` on a deliberately invalid payload and look at the status line rather than the body. The fix is to map failure modes onto status codes — 422 for validation, 503 while the model is loading, 500 for unhandled exceptions — and then add a dashboard panel for error rate by status class. Until that is done, the monitoring is measuring whether the web server is alive, not whether the service works.',
      },
      {
        prompt:
          'You need to add a `device_type` feature to your model. Design the rollout so no existing caller breaks.',
        hint: 'Additive changes are safe; required changes are not.',
        solution:
          'Add `device_type` as an optional field with a documented default that matches what the model was trained to expect for unknown values, and deploy the new model able to handle its absence. Callers adopt it at their own pace, and you track adoption by logging how often the field is present. Only once every known caller sends it do you consider making it required — and making it required is a breaking change, so it belongs in `/v2` with the old version kept alive during migration. Never rename an existing field in place; add the new one, dual-write for a period, and remove the old one only after the metrics show nobody is sending it.',
      },
    ],

    quiz: [
      {
        id: 'OPS-004-q1',
        type: 'mcq',
        concept: 'status codes',
        prompt: 'A client sends valid JSON but omits a required feature. What should the service return?',
        options: ['422 Unprocessable Entity', '200 OK with an error message in the body', '500 Internal Server Error', '404 Not Found'],
        answerIndex: 0,
        explanation:
          'The body parsed, so it is not 400; the server did not fail, so it is not 5xx. 422 tells the caller the problem is theirs and that retrying the identical request is pointless, and keeps your error-rate dashboards honest.',
      },
      {
        id: 'OPS-004-q2',
        type: 'truefalse',
        concept: 'retry semantics',
        prompt: 'A client should retry a request that returned 422, in case it succeeds the second time.',
        answer: false,
        explanation:
          '4xx means the request itself is wrong, so an identical retry will fail identically while adding load. Retries with exponential backoff belong to 5xx responses, timeouts and connection failures.',
      },
      {
        id: 'OPS-004-q3',
        type: 'multi',
        concept: 'API design for ML',
        prompt: 'Which of these make a prediction API more resilient to change? Select all that apply.',
        options: [
          'Versioning the path, for example `/v1/predict`',
          'Returning the model version in the response',
          'Sending features as a positional array to reduce payload size',
          'Adding new fields as optional rather than required',
          'Echoing a caller-supplied request id',
        ],
        answerIndices: [0, 1, 3, 4],
        explanation:
          'Positional arrays are the fragile option: they encode column order implicitly, so inserting a feature silently shifts every value into the wrong column with no error raised anywhere.',
      },
      {
        id: 'OPS-004-q4',
        type: 'match',
        concept: 'HTTP parts',
        prompt: 'Match each part of an HTTP exchange to its job.',
        pairs: [
          { left: 'Method (POST)', right: 'What kind of operation is being requested' },
          { left: 'Path (`/v1/predict`)', right: 'Which resource or operation is addressed' },
          { left: 'Headers', right: 'Metadata: content type, credentials, tracing ids' },
          { left: 'Body', right: 'The payload — the features being scored' },
          { left: 'Status code', right: 'Whether it worked and whose fault it was if not' },
        ],
        explanation:
          'Keeping these roles separate is what makes an API predictable: credentials belong in headers not the URL, payload belongs in the body not the query string, and outcome belongs in the status code not the body.',
      },
      {
        id: 'OPS-004-q5',
        type: 'mcq',
        concept: 'latency',
        prompt: 'Mean latency is 25 ms, p95 is 60 ms, p99 is 1,200 ms. What is the most useful first hypothesis?',
        options: [
          'Something intermittent — queueing, garbage collection, a cold connection or a cache miss — affects a small fraction of requests',
          'The model is uniformly slow and needs a smaller architecture',
          'The mean is wrong and should be recomputed',
          'The network is saturated for all requests',
        ],
        answerIndex: 0,
        explanation:
          'A tight p50 and p95 with an enormous p99 is the signature of an occasional event rather than a systematically slow model. Uniform slowness would raise all three percentiles together.',
      },
      {
        id: 'OPS-004-q6',
        type: 'explain',
        concept: 'decoupling',
        prompt: 'Explain to a backend engineer who has never deployed a model why the ML team insists on serving it over HTTP rather than shipping them a pickle file to import.',
        rubric: [
          'Explains that importing couples the consumer to the ML dependency stack and release cycle',
          'Explains that an API contract lets the model change without consumers redeploying',
          'Acknowledges the cost: network latency and an extra failure mode',
        ],
        sampleAnswer:
          'If you import the model, your service now needs our exact Python version, our scikit-learn version and our feature code, and every time we retrain you have to redeploy. Two models cannot run side by side for a comparison, and if we move to GPU inference you inherit that too. Behind an HTTP endpoint, the only thing you depend on is the shape of the request and response. We can retrain daily, canary a new version to 5% of traffic, or roll back in seconds, and nothing on your side changes. You also get centralised logging of what was predicted for whom, which is what makes debugging and drift monitoring possible at all. The honest cost is a network round trip of a few milliseconds and a new failure mode, so you need a timeout and a defined fallback for when we are unavailable — which is a smaller price than being coupled to our release cycle.',
        explanation:
          'The examinable idea is that an API converts hard code coupling into a versioned contract, at the price of latency and a network dependency.',
      },
    ],

    flashcards: [
      { front: '400 vs 422', back: '400 means the body could not be parsed at all; 422 means it parsed but was semantically invalid, such as a missing or mistyped feature.' },
      { front: 'Why never return 200 with an error body?', back: 'Load balancers, retry policies, alerts and dashboards all branch on the status code, so a broken service would show a perfect success rate.' },
      { front: 'Which responses should a client retry?', back: '5xx, timeouts and connection failures, with exponential backoff and jitter. Never 4xx — the request itself is wrong.' },
      { front: 'Why report p95/p99 rather than mean latency?', back: 'The mean is dominated by fast requests and hides the slow tail that users and upstream timeouts actually experience.' },
      { front: 'Why return `model_version` in the response?', back: 'So any logged prediction can later be attributed to the exact model that produced it — essential for debugging, audit and drift analysis.' },
      { front: 'Safe way to evolve a prediction schema?', back: 'Add optional fields, never rename or retype in place; publish `/v2` for genuinely breaking changes and run both during migration.' },
    ],

    challenge: {
      title: 'Write the contract before the code',
      brief:
        'Pick a model you have trained. Before writing any server code, write the full API contract as a document: the endpoint path and version, the request schema with types and required fields, the success response, every error case with its status code, the rate limit, and the latency budget you are promising. Then write a `curl` transcript showing one success and three distinct failure cases. Have someone else read only the contract and tell you what they would send — every ambiguity they hit is a bug you have just fixed for free.',
      language: 'json',
      acceptanceCriteria: [
        'The path is versioned and every field has a declared type and required/optional status',
        'At least four distinct error cases are specified with status codes and a consistent error body',
        'A latency budget and a maximum batch size are stated explicitly',
        'The response includes a model version identifier and echoes a request id',
        'A curl transcript demonstrates one success and three failures',
      ],
      starterCode: '{\n  "endpoint": "POST /v1/predict",\n  "request": {},\n  "responses": {}\n}\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone who has only ever called a model as a Python function what an HTTP API is, what the parts of a request are, and why the status code matters so much.',
      mustCover: [
        'A request has a method, a path, headers and a body; a response has a status code and a body',
        '2xx, 4xx and 5xx mean success, caller error and server error respectively',
        'The contract is what consumers depend on, which is what decouples them from the model',
        'Latency and payload size are part of the design, not an afterthought',
      ],
      bonusSignals: ['mentions versioning the path', 'explains why 200-with-an-error-body breaks monitoring', 'mentions timeouts on the client side'],
      sampleExplanation:
        'Calling a model over HTTP is the same idea as calling a function, except the arguments travel as text over a network. The caller sends a request with four parts: a method saying what kind of operation this is, usually POST for prediction; a path saying what is being addressed, such as `/v1/predict`; headers carrying metadata like the content type and the API key; and a body carrying the features as JSON. The server answers with a status code and a body. The status code is where beginners under-invest and it matters enormously, because the load balancer, the client\'s retry logic, the alerting and every dashboard all read it and nothing else. 2xx means it worked, 4xx means the caller sent something wrong and should not simply retry, 5xx means the server broke and a retry might help. If you return 200 with an error message inside the body, every one of those systems believes the service is perfectly healthy while it is failing every request. The reason to do any of this instead of importing the model is decoupling: consumers depend only on the shape of the request and response, so you can retrain, reframework or rehardware the model without anyone else changing a line.',
    },
  },

  {
    id: 'OPS-005',
    domain: 'OPS',
    module: 'Serving Models',
    topic: 'FastAPI',
    title: 'Serving a Model with FastAPI',
    slug: 'serving-with-fastapi',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['OPS-003', 'OPS-004'],
    related: ['OPS-001'],
    tags: ['fastapi', 'pydantic', 'uvicorn', 'lifespan', 'health check', 'inference', 'openapi'],

    learningObjectives: [
      'Build a working prediction service with FastAPI, from an empty file to a documented running endpoint',
      'Load the model exactly once at startup using a lifespan handler, and explain why loading per request is catastrophic',
      'Define Pydantic request and response models so invalid input is rejected before it reaches the model',
      'Handle errors deliberately, returning the right status code and never leaking a stack trace',
      'Add liveness and readiness health checks and explain what an orchestrator does with each',
      'Run the service with uvicorn and use the auto-generated OpenAPI documentation to exercise it',
    ],

    terminology: [
      {
        term: 'ASGI',
        definition:
          'The asynchronous server interface FastAPI speaks. An ASGI server such as uvicorn accepts connections and hands each request to your application, allowing concurrency without one thread per request.',
        simple: 'The standard plug between the web server and your Python app.',
      },
      {
        term: 'Lifespan handler',
        definition:
          'An async context manager registered on the application that runs setup code before the server accepts traffic and teardown code as it shuts down. The correct place to load a model.',
        simple: 'Code that runs once when the service starts and once when it stops.',
      },
      {
        term: 'Pydantic model',
        definition:
          'A Python class declaring field names, types and constraints. FastAPI uses it to parse and validate the request body, to serialise the response, and to generate the OpenAPI schema automatically.',
        simple: 'A typed form the incoming JSON must fill in correctly.',
      },
      {
        term: 'Liveness vs readiness',
        definition:
          'Liveness asks "is this process alive, or should it be restarted?". Readiness asks "should traffic be sent here right now?". A service that is alive but still loading a model is live and not ready.',
        simple: 'One check decides whether to restart you; the other decides whether to send you work.',
      },
      {
        term: 'OpenAPI',
        definition:
          'A machine-readable JSON description of every endpoint, its parameters and its schemas. FastAPI generates it from your type hints and serves interactive documentation at `/docs`.',
        simple: 'Documentation the framework writes for you, and that other tools can read.',
      },
      {
        term: 'Worker',
        definition:
          'One process running your application. CPU-bound inference in Python needs several worker processes to use several cores, because threads within one process contend for the interpreter lock.',
        simple: 'One copy of your app; more copies means more requests at once.',
      },
    ],

    simpleExplanation:
      "A trained model is a file and a function: given some numbers, return a score. Serving it means wrapping that function in a small web program so anyone can reach it over the network. FastAPI makes this unusually pleasant because it reads your ordinary Python type hints and does four jobs from them at once: it parses the incoming JSON, it checks every field is present and of the right type, it turns your return value back into JSON, and it writes interactive documentation you can click through in a browser. The one thing you must get right is where the model is loaded. Reading a model file takes hundreds of milliseconds or more, so if you load it inside the request handler, every single caller pays that cost and the service falls over under any real load. You load it once when the process starts, keep it in memory, and let every request reuse it. Add a health endpoint so the platform can tell whether you are ready for traffic, decide what happens when input is bad, and you have a real service.",

    whyItExists:
      'Before typed web frameworks, exposing a model meant hand-writing JSON parsing, hand-checking every field, hand-writing documentation that drifted from reality within a week, and discovering type errors deep inside the model instead of at the boundary. FastAPI removes that entire class of work by deriving validation, serialisation and documentation from the type hints you would have written anyway, so the contract in the code and the contract in the documentation cannot disagree.',

    analogy: {
      scenario:
        "Think of a pharmacy counter. The pharmacist does not re-read the entire pharmacology textbook for each customer; she studied once, before opening, and now the knowledge is simply in her head. At the counter there is a printed form with named boxes: patient age, weight, allergy. A prescription with a missing age is handed straight back before any medicine is touched, because dispensing on a guess is worse than refusing. And there is a light above the door: off while she is still unlocking and setting up, on when she is genuinely ready to serve.",
      mapping: [
        { from: 'Studying once before opening', to: 'Loading the model in the lifespan handler at startup' },
        { from: 'The form with named, mandatory boxes', to: 'The Pydantic request model' },
        { from: 'Handing back an incomplete prescription', to: 'Returning 422 before invoking the model' },
        { from: 'The light above the door', to: 'The readiness probe, `/ready`' },
        { from: 'A second pharmacist at a second counter', to: 'An additional uvicorn worker process' },
      ],
      bridge:
        'The pharmacist analogy pins the single most important design decision in this unit. Studying per customer is absurd for exactly the reason that loading the model per request is absurd: it is expensive, identical every time, and has nothing to do with the individual request. Everything else follows from the same principle — do expensive, request-independent work once at startup, and keep the per-request path as short as possible.',
      limitations:
        'A pharmacist can hold one conversation at a time; a Python process can interleave many requests but still executes Python bytecode on one core at a time, which is why real deployments run several worker processes rather than relying on async alone for CPU-bound inference.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Startup, then every request',
        caption: 'The expensive work happens once, on the left of the line.',
        steps: [
          { label: 'Process starts', detail: 'uvicorn imports your module and runs the lifespan startup block.' },
          { label: 'Model loaded into memory', detail: 'One `joblib.load` or `torch.load`, taking anywhere from 200 ms to 30 s.' },
          { label: '`/ready` starts returning 200', detail: 'Only now does the load balancer begin sending traffic to this instance.' },
          { label: 'Request arrives', detail: 'Pydantic parses and validates the body; invalid input is rejected with 422.' },
          { label: 'Inference', detail: 'The in-memory model scores the request. No file I/O on this path.' },
          { label: 'Response serialised', detail: 'The typed response model becomes JSON, with the model version attached.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Load per request versus load at startup',
        caption: 'The difference between a demo and a service.',
        left: {
          heading: 'Inside the handler (wrong)',
          points: [
            'Every caller pays the full load time, often 100x the inference time',
            'Memory churns as copies are loaded and garbage collected',
            'Throughput collapses under concurrency; disk becomes the bottleneck',
            'A corrupt model file is discovered by a user, not by the deploy',
          ],
        },
        right: {
          heading: 'In the lifespan handler (right)',
          points: [
            'Loaded once per process; requests touch only memory',
            'A failure to load stops the deploy before traffic arrives',
            'Readiness can gate traffic until loading finishes',
            'Predictable, flat latency under load',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Endpoints a production model service should expose',
        columns: ['Path', 'Method', 'Purpose'],
        rows: [
          ['`/predict`', 'POST', 'Score one payload. Validated, versioned, logged.'],
          ['`/predict:batch`', 'POST', 'Score many rows in one call, with an explicit maximum size.'],
          ['`/health`', 'GET', 'Liveness: the process is running. Must not touch the model or a database.'],
          ['`/ready`', 'GET', 'Readiness: the model is loaded and dependencies are reachable. Gates traffic.'],
          ['`/metrics`', 'GET', 'Prometheus-format counters and histograms for latency, errors and prediction distribution.'],
          ['`/docs`', 'GET', 'Interactive OpenAPI documentation, generated from your type hints.'],
        ],
      },
      {
        kind: 'widget',
        title: 'Run the service mentally, step by step',
        caption: 'Trace what happens to a request as it passes through validation and inference.',
        widget: 'ml-pipeline-flow',
      },
    ],

    formalDefinition:
      'A FastAPI inference service is an ASGI application whose lifespan scope performs one-time initialisation — deserialising the model and any preprocessing artifacts into process memory — and whose request scope applies a declared Pydantic schema to the request body, invokes the in-memory estimator, and serialises a declared response schema. Validation failures are surfaced as 422 responses generated by the framework before the handler executes, and readiness is exposed separately from liveness so that an orchestrator can gate traffic independently of restart decisions.',

    codeExamples: [
      {
        language: 'python',
        title: 'A complete, production-shaped prediction service',
        code: `from contextlib import asynccontextmanager
import logging, os, time

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

log = logging.getLogger("churn")
MODEL_PATH = os.environ.get("MODEL_PATH", "models/churn.joblib")
MODEL_VERSION = os.environ.get("MODEL_VERSION", "unknown")

state: dict = {"model": None}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Runs ONCE before the server accepts traffic.
    t0 = time.perf_counter()
    state["model"] = joblib.load(MODEL_PATH)
    log.info("model loaded path=%s version=%s ms=%.0f",
             MODEL_PATH, MODEL_VERSION, (time.perf_counter() - t0) * 1000)
    yield
    state["model"] = None          # teardown on shutdown


app = FastAPI(title="Churn scoring", version="1.0.0", lifespan=lifespan)


class PredictRequest(BaseModel):
    customer_id: str = Field(min_length=1, max_length=64)
    tenure_months: int = Field(ge=0, le=600)
    monthly_charges: float = Field(ge=0)
    contract: str = Field(pattern="^(month-to-month|one-year|two-year)$")


class PredictResponse(BaseModel):
    customer_id: str
    churn_probability: float
    label: str
    model_version: str


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    model = state["model"]
    if model is None:
        raise HTTPException(status_code=503, detail="model not loaded")

    contract_code = {"month-to-month": 0, "one-year": 1, "two-year": 2}[req.contract]
    x = np.array([[req.tenure_months, req.monthly_charges, contract_code]], dtype=float)

    try:
        p = float(model.predict_proba(x)[0, 1])
    except Exception:
        log.exception("inference failed customer_id=%s", req.customer_id)
        raise HTTPException(status_code=500, detail="inference failed")

    log.info("prediction customer_id=%s p=%.4f version=%s", req.customer_id, p, MODEL_VERSION)
    return PredictResponse(
        customer_id=req.customer_id,
        churn_probability=round(p, 4),
        label="at_risk" if p >= 0.5 else "safe",
        model_version=MODEL_VERSION,
    )


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}                    # liveness: cheap, no dependencies


@app.get("/ready")
def ready() -> JSONResponse:
    loaded = state["model"] is not None
    return JSONResponse({"ready": loaded}, status_code=200 if loaded else 503)


@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception) -> JSONResponse:
    log.exception("unhandled error path=%s", request.url.path)
    return JSONResponse({"error": {"type": "internal_error"}}, status_code=500)`,
        explanation:
          'Read this as five decisions rather than as boilerplate. The model loads in `lifespan`, so it is deserialised once per process and every request touches memory only. The Pydantic models put constraints at the boundary, so `tenure_months: -3` never reaches the estimator — FastAPI returns 422 with a field-level message before your function runs. Errors map onto status codes deliberately: 503 while unloaded, 500 for a genuine inference failure, and the catch-all handler logs the traceback server-side while returning a body that leaks nothing. Liveness and readiness are separate endpoints, and the response carries `model_version` so any logged prediction can be attributed later.',
      },
      {
        language: 'bash',
        title: 'Running it, exercising it and measuring it',
        code: `pip install "fastapi==0.115.0" "uvicorn[standard]==0.30.6" scikit-learn joblib

# Development: reload on file change, single worker
uvicorn app.main:app --reload --port 8000

# Production: several worker processes, no reload, bounded request line
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4 --no-server-header

curl -s localhost:8000/ready
# {"ready":true}

curl -s -X POST localhost:8000/predict -H "Content-Type: application/json" \\
  -d '{"customer_id":"c_9182","tenure_months":14,"monthly_charges":79.35,"contract":"month-to-month"}'
# {"customer_id":"c_9182","churn_probability":0.8123,"label":"at_risk","model_version":"churn-2024-09-02"}

# Validation rejects bad input before the model is touched
curl -s -X POST localhost:8000/predict -H "Content-Type: application/json" \\
  -d '{"customer_id":"c_9182","tenure_months":-3,"monthly_charges":79.35,"contract":"weekly"}' | head -c 200
# {"detail":[{"type":"greater_than_equal","loc":["body","tenure_months"], ...

# Open http://localhost:8000/docs for the generated interactive documentation`,
        explanation:
          'The two uvicorn invocations differ in ways that matter. `--reload` watches the filesystem and restarts on change, which is wonderful locally and disastrous in production because it reloads the model constantly. `--workers 4` forks four processes, each with its own copy of the model in memory — so four workers with a 2 GB model needs 8 GB, which is the calculation people forget when a container starts being killed for exceeding its memory limit.',
      },
      {
        language: 'python',
        title: 'Batching, and a test that actually tests the contract',
        code: `from fastapi.testclient import TestClient
from pydantic import conlist

class BatchRequest(BaseModel):
    rows: conlist(PredictRequest, min_length=1, max_length=500)

@app.post("/predict:batch")
def predict_batch(req: BatchRequest) -> dict:
    model = state["model"]
    codes = {"month-to-month": 0, "one-year": 1, "two-year": 2}
    X = np.array([[r.tenure_months, r.monthly_charges, codes[r.contract]] for r in req.rows])
    probs = model.predict_proba(X)[:, 1]          # ONE vectorised call, not 500
    return {
        "model_version": MODEL_VERSION,
        "predictions": [
            {"customer_id": r.customer_id, "churn_probability": round(float(p), 4)}
            for r, p in zip(req.rows, probs)
        ],
    }


def test_predict_contract():
    with TestClient(app) as client:              # 'with' runs the lifespan, loading the model
        r = client.post("/predict", json={
            "customer_id": "c_1", "tenure_months": 14,
            "monthly_charges": 79.35, "contract": "month-to-month",
        })
        assert r.status_code == 200
        body = r.json()
        assert 0.0 <= body["churn_probability"] <= 1.0
        assert body["model_version"]

def test_rejects_negative_tenure():
    with TestClient(app) as client:
        r = client.post("/predict", json={
            "customer_id": "c_1", "tenure_months": -3,
            "monthly_charges": 79.35, "contract": "month-to-month",
        })
        assert r.status_code == 422`,
        explanation:
          'Batching matters because framework overhead and per-call model overhead are paid once instead of five hundred times; a vectorised `predict_proba` on a 500-row matrix is typically an order of magnitude faster than 500 single-row calls. The `max_length=500` cap is not decoration — without it a caller can send a million rows and exhaust your memory. In the tests, note the `with` block: `TestClient` only runs the lifespan handler when used as a context manager, and forgetting that is why people see `model is None` in tests that work fine in the running service.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The demo that died at launch',
        usage:
          'A service loaded a 400 MB transformer inside the handler. It was perfect in a demo with one user and collapsed at ten concurrent requests, with p99 latency above 20 seconds and the container repeatedly killed for memory. Moving the load into the lifespan handler took four lines and fixed it entirely.',
      },
      {
        context: 'Readiness preventing a bad deploy',
        usage:
          'A new image shipped with the model path wrong. Because `/ready` returned 503, the orchestrator never routed traffic to the new pods and the rollout halted automatically. Without a readiness probe the same mistake would have served 500s to every user for the length of the rollout.',
      },
      {
        context: 'Validation catching a client bug on day one',
        usage:
          'A mobile client started sending `"tenure_months": "14"` as a string after a refactor. A typed schema returned 422 with the exact field, and the client team fixed it in an hour. Without validation the value would have been coerced or imputed and predictions would have been quietly wrong.',
      },
    ],

    projectConnections: [
      { tool: 'FastAPI', role: 'The application framework: routing, validation, serialisation and generated documentation from type hints.' },
      { tool: 'Pydantic', role: 'Defines and enforces the request and response contract, and produces the field-level error messages callers rely on.' },
      { tool: 'uvicorn / gunicorn', role: 'The ASGI server and process manager that actually accepts connections and runs your workers.' },
      { tool: 'pytest + TestClient', role: 'Exercises the real application in-process, so contract tests run in CI on every pull request.' },
    ],

    commonMistakes: [
      {
        mistake: 'Loading the model inside the request handler',
        why: 'Deserialising a model costs from hundreds of milliseconds to tens of seconds. Paying it per request makes latency dominated by file I/O, causes memory to churn, and turns a load failure into a user-visible error rather than a failed deploy.',
        fix: 'Load once in the lifespan handler and store it in module state. Verify with a log line showing the load happened exactly once per process start.',
      },
      {
        mistake: 'Declaring a synchronous, CPU-bound handler as `async def`',
        why: 'A plain `def` handler is run by FastAPI in a thread pool, but an `async def` handler runs directly on the event loop. Blocking CPU work inside it stalls the loop, so every other in-flight request waits, and concurrency silently collapses to one.',
        fix: 'Use `def` for synchronous inference and let FastAPI offload it, or keep `async def` strictly for awaiting I/O. If you must do heavy work in async code, push it to `run_in_executor`.',
      },
      {
        mistake: 'Returning the exception text to the caller',
        why: 'Tracebacks leak file paths, library versions and sometimes data values, which is both an information disclosure risk and useless to the caller, who cannot act on it.',
        fix: 'Log the traceback server-side with `log.exception`, return a stable error shape with a generic message and a correlation id, and let the caller quote that id in a bug report.',
      },
      {
        mistake: 'One health endpoint used for both liveness and readiness',
        why: 'If the single check touches the model or a database, a transient dependency failure makes the orchestrator restart healthy processes, turning a small problem into a restart storm. If it checks nothing, traffic is routed to instances still loading.',
        fix: 'Keep `/health` trivial and dependency-free for liveness; make `/ready` assert that the model is loaded and dependencies are reachable, and wire that one to traffic gating.',
      },
      {
        mistake: 'No limit on batch size or payload size',
        why: 'An unbounded `rows` list lets one caller allocate gigabytes in your process, and the resulting out-of-memory kill takes down every other in-flight request on that worker.',
        fix: 'Cap the list with `conlist(..., max_length=N)`, set a request body size limit at the proxy, and return 422 rather than truncating silently.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Where should a model be loaded in a FastAPI service, and what goes wrong if you get it wrong?',
        answer:
          'In the lifespan startup block, once per process, stored in module-level state that handlers read. Loading inside the handler means every request pays the deserialisation cost, which for a real model is often a hundred times the inference cost, so latency is dominated by disk I/O and throughput collapses under concurrency; memory also churns as copies are created and collected. There is a second, less obvious benefit: loading at startup makes a bad model path or a corrupt artifact fail the deploy rather than fail a user, and combined with a readiness probe that returns 503 until loading completes, the orchestrator simply never routes traffic to a broken instance. The cost to remember is that each worker process holds its own copy, so memory scales with worker count.',
        followUp:
          'A strong candidate mentions that module-level global loading at import time also works but makes testing and multiple-worker startup harder to reason about, and that lifespan gives you a matching teardown hook.',
      },
      {
        level: 'ml-engineer',
        question: 'A colleague writes `async def predict(...)` around a scikit-learn call to "make it faster". What do you tell them?',
        answer:
          'It will make it slower under load, not faster. `async def` handlers execute on the event loop itself; any blocking CPU work inside one holds the loop and prevents every other request from progressing, so effective concurrency drops to one. FastAPI already handles this correctly for synchronous handlers: a plain `def` endpoint is dispatched to a thread pool, so the loop stays free to accept and dispatch other requests. Async is the right tool when the handler awaits I/O — a feature store lookup, another HTTP call — because then the loop can do useful work during the wait. For CPU-bound inference the real levers are batching, a faster runtime such as ONNX Runtime, and running multiple worker processes, since the global interpreter lock means threads alone will not use multiple cores for Python-level work.',
        followUp:
          'The signal is understanding that async solves I/O concurrency, not CPU parallelism, and that process count is the lever for the latter.',
      },
      {
        level: 'ml-engineer',
        question: 'What is the difference between liveness and readiness, and how would you configure them for a service with a 30-second model load?',
        answer:
          'Liveness answers "should this process be killed and restarted?"; readiness answers "should traffic be routed here right now?". They must be separate, because a service that is alive but still loading needs traffic withheld, not a restart. For a 30-second load I make `/health` trivial — return 200 as soon as the process serves HTTP, touching nothing — and give the liveness probe a generous initial delay and failure threshold so the slow start never triggers a restart loop. `/ready` returns 503 until the model object exists and any critical dependency responds, and is polled frequently so the instance joins the pool promptly once loading finishes. That combination means a rollout with a bad artifact stalls with zero user-visible errors, because unready instances never receive requests.',
        followUp:
          'Mentioning startup probes as the cleaner way to express "do not judge me for the first N seconds" shows familiarity with real orchestrator configuration.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Take the service above and add a `/predict` field `promo_code` that is optional and may be absent for existing callers. Show the schema change and say why it is not a breaking change.',
        hint: 'What does Pydantic do with a field that has a default?',
        language: 'python',
        solution:
          'Add `promo_code: str | None = Field(default=None, max_length=32)` to `PredictRequest`. Because it has a default, requests that omit it still validate, so every existing caller continues to work unchanged — the change is additive. Inside the handler, map `None` to whatever value the model was trained to treat as "no promotion". Making it required instead would immediately 422 every existing caller at the moment of deploy, which is why a required new field belongs behind a new version of the path.',
      },
      {
        prompt:
          'Your service returns 200 for everything, including when the model file is missing at startup. Rewrite the startup and health behaviour so a missing model cannot reach users.',
        hint: 'Two mechanisms: fail loudly at startup, and gate traffic on readiness.',
        language: 'python',
        solution:
          'In the lifespan handler, let `joblib.load` raise rather than catching it — an exception during startup stops uvicorn and fails the deploy, which is exactly what you want. If you prefer the process to stay up for diagnostics, catch it, log with `log.exception`, leave `state["model"] = None`, and make `/ready` return 503 while it is None. The orchestrator then never routes traffic to that instance and the rollout halts. The wrong answer is catching the error and continuing to serve, because then `/predict` fails at request time and users see 500s that the deployment system believes are healthy.',
      },
      {
        prompt:
          'Measure whether batching helps your model. Describe the experiment and what you expect to see.',
        hint: 'Compare per-row cost, not total time.',
        solution:
          'Score 1,000 rows two ways: 1,000 single-row POSTs and 20 batched POSTs of 50 rows, both against a warm service, and record total wall time and p95 per request. Divide by rows to get cost per row. Expect the batched path to be several times cheaper per row for tree models and often an order of magnitude cheaper for neural networks, because HTTP overhead, validation overhead and per-call framework overhead are amortised and the underlying library computes on a matrix rather than a vector. Plot per-row cost against batch size and you will see it fall steeply and then flatten; the flattening point, balanced against how long a caller will wait to fill a batch, is the batch size to choose.',
      },
    ],

    quiz: [
      {
        id: 'OPS-005-q1',
        type: 'mcq',
        concept: 'model loading',
        prompt: 'Where should a model be deserialised in a FastAPI service?',
        options: [
          'Once in the lifespan startup handler, stored in process memory',
          'At the top of each request handler so it is always fresh',
          'Inside a Pydantic validator',
          'In a background thread on every request',
        ],
        answerIndex: 0,
        explanation:
          'Loading is expensive and request-independent, so it belongs at startup. That also turns a bad artifact into a failed deploy rather than a user-visible error, especially when paired with a readiness probe.',
      },
      {
        id: 'OPS-005-q2',
        type: 'truefalse',
        concept: 'async semantics',
        prompt: 'Marking a CPU-bound inference handler `async def` increases the number of requests the service can process concurrently.',
        answer: false,
        explanation:
          'It decreases it. An `async def` handler runs on the event loop, so blocking CPU work stalls every other in-flight request. A plain `def` handler is dispatched to a thread pool and leaves the loop free.',
      },
      {
        id: 'OPS-005-q3',
        type: 'code-output',
        language: 'bash',
        concept: 'validation',
        prompt: 'Given the `PredictRequest` schema above, what status does this request produce?',
        code: 'curl -s -o /dev/null -w "%{http_code}" -X POST localhost:8000/predict \\\n  -H "Content-Type: application/json" \\\n  -d \'{"customer_id":"c_1","tenure_months":14,"monthly_charges":79.35,"contract":"weekly"}\'',
        options: ['422', '200', '400', '500'],
        answerIndex: 0,
        explanation:
          'The JSON parses, so it is not 400, but `contract` fails the pattern constraint, so FastAPI rejects it with 422 and a field-level message before the handler runs. The model is never touched.',
      },
      {
        id: 'OPS-005-q4',
        type: 'match',
        concept: 'service anatomy',
        prompt: 'Match each component to its responsibility.',
        pairs: [
          { left: 'Lifespan handler', right: 'One-time startup and shutdown work, such as loading the model' },
          { left: 'Pydantic model', right: 'Parsing, validating and documenting the request and response shape' },
          { left: '`/ready`', right: 'Tells the load balancer whether to send traffic to this instance' },
          { left: '`/health`', right: 'Tells the orchestrator whether the process should be restarted' },
          { left: 'uvicorn `--workers`', right: 'How many processes, and therefore cores, serve requests' },
        ],
        explanation:
          'Each of these exists because a different actor needs a different answer: the framework, the caller, the load balancer, the orchestrator and the operating system scheduler.',
      },
      {
        id: 'OPS-005-q5',
        type: 'multi',
        concept: 'production readiness',
        prompt: 'Which of these belong in a production model service? Select all that apply.',
        options: [
          'A maximum batch size enforced by the schema',
          'The model version in every response',
          '`--reload` enabled so new models are picked up automatically',
          'A catch-all exception handler that logs the traceback and returns a generic body',
          'Separate liveness and readiness endpoints',
        ],
        answerIndices: [0, 1, 3, 4],
        explanation:
          '`--reload` watches the filesystem and restarts the process on change. It is a development convenience that in production causes repeated model reloads and unpredictable restarts.',
      },
      {
        id: 'OPS-005-q6',
        type: 'explain',
        concept: 'validation at the boundary',
        prompt: 'Explain why rejecting bad input at the API boundary is better than letting the model handle it.',
        rubric: [
          'Notes that models do not raise on out-of-range input; they return a confident wrong answer',
          'Notes that the caller gets an actionable, field-level error instead of a mysterious number',
          'Mentions that the error is cheap, fast and keeps error metrics honest',
        ],
        sampleAnswer:
          'A model given nonsense does not complain. Pass a negative tenure or a string where a number belongs and, if it is coerced at all, the estimator returns a perfectly confident probability computed from a value that never existed. Nobody upstream can tell the difference between that and a real prediction, so the bug survives for weeks. Validating at the boundary converts a silent data-quality problem into a loud, immediate, field-level 422 that tells the caller exactly which field was wrong and why. It is also cheap — the request is rejected before any inference happens — and it keeps monitoring honest, because bad requests land in the 4xx bucket where they belong rather than being counted as successful predictions.',
        explanation:
          'The key insight is that machine learning models fail silently, so the type system at the boundary is doing safety work the model cannot do for itself.',
      },
    ],

    flashcards: [
      { front: 'Where does the model get loaded in FastAPI?', back: 'In the lifespan startup handler, once per process, stored in module state. Never inside the request handler.' },
      { front: 'Liveness vs readiness', back: 'Liveness decides whether to restart the process; readiness decides whether to route traffic. A loading service is live but not ready.' },
      { front: 'Why is `async def` wrong for CPU-bound inference?', back: 'It runs on the event loop, so blocking work stalls every other request. Plain `def` handlers are dispatched to a thread pool instead.' },
      { front: 'What does a Pydantic request model buy you?', back: 'Parsing, type and range validation, automatic 422 responses with field-level detail, response serialisation and OpenAPI documentation.' },
      { front: 'What does `uvicorn --workers 4` cost in memory?', back: 'Four independent processes, each holding its own copy of the model — four times the model memory.' },
      { front: 'Why cap batch size in the schema?', back: 'An unbounded list lets one caller allocate gigabytes and trigger an out-of-memory kill that takes down every other in-flight request.' },
    ],

    challenge: {
      title: 'Ship a model service you would be willing to be paged for',
      brief:
        'Take any model you have trained and build a FastAPI service around it with: lifespan loading, typed request and response models with real constraints, a single and a batch endpoint with a size cap, separate `/health` and `/ready`, structured log lines for every prediction including the model version, and a catch-all handler that never leaks a traceback. Write pytest contract tests covering a success, a validation failure and the not-ready case. Finally, measure p50 and p95 latency at batch sizes 1, 8 and 64 and write down the numbers.',
      language: 'python',
      acceptanceCriteria: [
        'The model is deserialised exactly once per process, proven by a startup log line',
        'Invalid input returns 422 with a field-level message and never reaches the model',
        '`/ready` returns 503 until the model is loaded; `/health` touches no dependencies',
        'Batch endpoint enforces a maximum size and uses one vectorised inference call',
        'Tests cover success, validation failure and the unready state, and pass in CI',
        'Measured p50 and p95 latency for three batch sizes are recorded',
      ],
      starterCode: 'from contextlib import asynccontextmanager\nfrom fastapi import FastAPI\n\nstate: dict = {"model": None}\n',
    },

    teachingPrompt: {
      prompt:
        'Walk a colleague through turning a trained model into a running HTTP service. Explain the startup/request split, validation, error handling and health checks, and why each one exists.',
      mustCover: [
        'The model is loaded once at startup, not per request, because loading is expensive and request-independent',
        'Typed request and response models validate input before inference and generate documentation',
        'Errors map onto status codes deliberately, and tracebacks stay server-side',
        'Liveness and readiness answer different questions for different systems',
      ],
      bonusSignals: ['mentions worker processes and memory per worker', 'mentions batching', 'explains why async is not a speed-up for CPU-bound work'],
      sampleExplanation:
        'Serving a model is mostly about deciding what happens once and what happens per request. Reading the model file is expensive and identical every time, so it belongs in the startup hook: the process loads it, keeps it in memory, and only then starts telling the load balancer it is ready. Each request then does the minimum — parse the JSON, check it against a typed schema, run inference on the in-memory model, return a typed response. The schema is doing more work than it looks: it rejects a negative tenure or a misspelled category with a 422 and a field-level message before the model can quietly produce a confident wrong answer, and FastAPI turns the same type hints into interactive documentation, so the docs cannot drift from the code. Errors are mapped on purpose — 503 while loading, 422 for bad input, 500 for a genuine fault — with the traceback logged server-side and never returned. Two health endpoints exist because two different systems are asking different questions: the orchestrator wants to know whether to restart you, and the load balancer wants to know whether to send you traffic. And when you scale up with worker processes, remember each one holds its own copy of the model, so memory multiplies.',
    },
  },

  {
    id: 'OPS-006',
    domain: 'OPS',
    module: 'Serving Models',
    topic: 'Demos',
    title: 'Streamlit and Quick Demos',
    slug: 'streamlit-demos',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['OPS-003'],
    related: ['OPS-005'],
    tags: ['streamlit', 'demo', 'caching', 'widgets', 'prototype', 'stakeholders'],

    learningObjectives: [
      'Decide when a demo app is the right tool and when it is the wrong one',
      'Explain Streamlit\'s rerun-on-interaction execution model and predict what it does to expensive code',
      'Use `st.cache_data` and `st.cache_resource` correctly, and say which one a model goes in',
      'Build a small interactive app with inputs, a prediction and an explanation of the result',
      'Recognise the point at which a demo should graduate to an API plus a real frontend',
    ],

    terminology: [
      {
        term: 'Rerun model',
        definition:
          'Streamlit executes the entire script from the first line on every interaction. There is no callback graph and no component tree to update; state that must survive lives in `st.session_state` or in a cache.',
        simple: 'Touch any control and the whole script runs again from the top.',
      },
      {
        term: '`st.cache_resource`',
        definition:
          'Caches a single shared object across reruns, sessions and users — a loaded model, a database connection. The object is not copied, so it must be safe to share.',
        simple: 'Load the heavy thing once and let everyone share it.',
      },
      {
        term: '`st.cache_data`',
        definition:
          'Caches the return value of a function keyed by its arguments, returning a copy each time. Intended for data: query results, loaded frames, computed aggregates.',
        simple: 'Remember the answer for these particular inputs.',
      },
      {
        term: '`st.session_state`',
        definition:
          'A per-browser-session dictionary that survives reruns. The only correct place for values that must persist across interactions, such as a running conversation or a counter.',
        simple: 'A memory that belongs to one user\'s tab.',
      },
      {
        term: 'Demo debt',
        definition:
          'The accumulated cost of a prototype that quietly became load-bearing: no tests, no auth, no versioning, no scaling story, and a growing set of stakeholders who depend on it.',
        simple: 'What you owe when a throwaway app stops being throwaway.',
      },
    ],

    simpleExplanation:
      "Most of the value of a model is invisible until somebody can poke at it. A notebook full of metrics convinces almost nobody, whereas a small web page where a product manager types in a customer and sees a prediction change produces real questions within minutes. Streamlit exists for exactly that: you write an ordinary Python script, use a few functions to put a slider or a text box on the page, and it becomes a web app without any HTML, JavaScript or routing. The one idea you must understand is how it runs. There is no event system. Every time a user moves a slider, Streamlit reruns your entire script from line one, with the widget now returning its new value. That model is beautifully simple and also a trap: if line three loads a 500 MB model, it reloads on every keystroke. The fix is caching — you mark the expensive loading function so its result is kept between runs. Understand rerun plus cache and you understand Streamlit.",

    whyItExists:
      'Getting feedback on a model used to require a frontend engineer, an API and a sprint, which meant most models were evaluated only by the person who built them. Streamlit collapses that to an afternoon by letting a data scientist write a script and get a shareable interface, so the expensive conversation with domain experts happens while the model can still be changed cheaply.',

    analogy: {
      scenario:
        "Think of a whiteboard mock-up of a shop counter used to test a new checkout flow. You can move the card reader, redraw the queue line, and ask three customers to walk through it before anything is built in wood and steel. It is deliberately cheap and deliberately temporary. Nobody bolts the whiteboard to the floor and starts taking real payments through it — but that is exactly what happens to demos that quietly become the way the team does their job.",
      mapping: [
        { from: 'The whiteboard mock-up', to: 'The Streamlit app' },
        { from: 'Walking three customers through it', to: 'Showing stakeholders a live model and collecting reactions' },
        { from: 'Redrawing a line in thirty seconds', to: 'Editing a Python script and hitting save' },
        { from: 'Bolting the whiteboard to the floor', to: 'Letting a demo become the production interface' },
        { from: 'The actual counter built afterwards', to: 'A FastAPI service plus a proper frontend' },
      ],
      bridge:
        'The analogy carries because the value of both is speed of iteration, and the danger of both is durability they were never designed for. Concretely: Streamlit reruns your script per interaction, keeps no request-level concurrency story beyond a process per user session, and has no built-in authentication or contract. Those are perfectly good trade-offs for a mock-up and unacceptable ones for a system other teams depend on, which is why "graduate the demo" is a real engineering decision with a real trigger.',
      limitations:
        'A whiteboard is obviously temporary; a Streamlit app looks like a finished product to a stakeholder, which is precisely why it accumulates dependants faster than a mock-up ever would.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'What happens when a user moves a slider',
        caption: 'There is no partial update. The script runs again, top to bottom.',
        steps: [
          { label: 'User changes a widget', detail: 'The browser sends the new value to the Streamlit server.' },
          { label: 'The whole script reruns', detail: 'From line one. Every statement executes again.' },
          { label: 'Cached calls return instantly', detail: '`st.cache_resource` hands back the already-loaded model without re-executing the function body.' },
          { label: 'Widgets return their current values', detail: '`st.slider(...)` now returns the value the user chose, not the default.' },
          { label: 'The page is re-rendered', detail: 'Streamlit diffs the produced elements against the previous run and updates the browser.' },
        ],
      },
      {
        kind: 'compare',
        title: 'The two caches, and how to choose',
        caption: 'Picking the wrong one is the most common Streamlit bug.',
        left: {
          heading: '`st.cache_resource`',
          points: [
            'One shared object for the whole server',
            'Returns the same instance, not a copy',
            'For models, tokenisers, database connections, HTTP clients',
            'The object must be safe to share between users',
          ],
        },
        right: {
          heading: '`st.cache_data`',
          points: [
            'Keyed by the function arguments',
            'Returns a copy, so mutating the result cannot corrupt the cache',
            'For query results, DataFrames, computed aggregates',
            'Use `ttl=` when the underlying data changes',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Demo or service?',
        columns: ['Signal', 'Streamlit is fine', 'Time to build a real service'],
        rows: [
          ['Audience', 'A handful of colleagues', 'External users, or another system calling it'],
          ['Access', 'Anyone with the link, on the internal network', 'Per-user authentication and authorisation required'],
          ['Consumers', 'Humans clicking', 'Programs needing a stable contract'],
          ['Load', 'A few concurrent sessions', 'Sustained concurrency or strict latency budgets'],
          ['Consequences', 'A wrong number prompts a conversation', 'A wrong number changes a customer\'s bill'],
          ['Lifetime', 'Weeks, then deleted', 'Owned, versioned and on-call for years'],
        ],
      },
    ],

    formalDefinition:
      'Streamlit is a Python framework in which the user interface is expressed as the side effect of executing a script top to bottom. Each client interaction triggers a complete re-execution of the script within a per-session context; widget functions return the current client-side value on each run, memoisation decorators short-circuit expensive computation across runs, and `st.session_state` provides the only mutable per-session persistence. The framework diffs the produced element tree between runs and patches the browser accordingly.',

    codeExamples: [
      {
        language: 'python',
        title: 'A churn demo with correct caching',
        code: `import joblib
import pandas as pd
import streamlit as st

st.set_page_config(page_title="Churn explorer", layout="wide")


@st.cache_resource          # one shared model for the whole server
def load_model():
    return joblib.load("models/churn.joblib")


@st.cache_data(ttl=600)     # keyed by arguments, refreshed every 10 minutes
def load_customers(segment: str) -> pd.DataFrame:
    return pd.read_parquet(f"data/customers_{segment}.parquet")


model = load_model()

st.title("Churn risk explorer")
st.caption("Prototype. Numbers are indicative, not a system of record.")

with st.sidebar:
    segment = st.selectbox("Segment", ["retail", "business"])
    tenure = st.slider("Tenure (months)", 0, 72, 14)
    charges = st.number_input("Monthly charges", 0.0, 500.0, 79.35, step=0.05)
    contract = st.radio("Contract", ["month-to-month", "one-year", "two-year"])

codes = {"month-to-month": 0, "one-year": 1, "two-year": 2}
prob = float(model.predict_proba([[tenure, charges, codes[contract]]])[0, 1])

left, right = st.columns(2)
left.metric("Churn probability", f"{prob:.1%}")
right.metric("Decision", "At risk" if prob >= 0.5 else "Safe")
st.progress(min(prob, 1.0))

st.subheader("Comparable customers")
st.dataframe(load_customers(segment).head(20), use_container_width=True)`,
        explanation:
          'Every line here runs again each time the slider moves — which is fine, because the two expensive lines are behind caches. `load_model` uses `cache_resource` because a model is a single shared object that nobody should copy per user; `load_customers` uses `cache_data` because the result is data keyed by an argument and each caller should get its own copy to mutate safely. Swap the two decorators and you get either a model reloaded per segment or a DataFrame shared and quietly mutated across users.',
      },
      {
        language: 'python',
        title: 'Session state, and calling a real API instead of importing the model',
        code: `import httpx
import streamlit as st

if "history" not in st.session_state:
    st.session_state.history = []          # survives reruns; per browser session


@st.cache_resource
def client() -> httpx.Client:
    return httpx.Client(base_url="https://churn.internal", timeout=5.0)


customer_id = st.text_input("Customer id")

if st.button("Score") and customer_id:
    try:
        r = client().post("/v1/predict", json={"customer_id": customer_id,
                                               "tenure_months": 14,
                                               "monthly_charges": 79.35,
                                               "contract": "month-to-month"})
        r.raise_for_status()
        st.session_state.history.append(r.json())
    except httpx.HTTPStatusError as e:
        st.error(f"Service returned {e.response.status_code}")
    except httpx.TimeoutException:
        st.warning("Scoring service timed out; try again")

for row in reversed(st.session_state.history[-10:]):
    st.write(f"{row['customer_id']}: {row['churn_probability']:.2%} "
             f"(model {row['model_version']})")`,
        explanation:
          'Two patterns worth copying. The history list lives in `st.session_state` because an ordinary Python list would be recreated empty on every rerun — this is the single most common beginner confusion. And the app calls the FastAPI service rather than importing the model: the demo and production then share one model version, one preprocessing path and one set of logs, so a number a stakeholder sees in the demo is genuinely the number the system would produce.',
      },
      {
        language: 'bash',
        title: 'Running and sharing it',
        code: `pip install "streamlit==1.38.0"
streamlit run app.py                    # opens on http://localhost:8501

# Bind for colleagues on the same network, no auto-open, no telemetry prompt
streamlit run app.py \\
  --server.address 0.0.0.0 \\
  --server.port 8501 \\
  --server.headless true \\
  --browser.gatherUsageStats false

# Clear caches without restarting when the model file changes
# (or press "C" in the running app, then Rerun)`,
        explanation:
          'Note what is missing: there is no authentication flag, because Streamlit has no built-in per-user auth. Anything sensitive must sit behind a reverse proxy or an identity-aware proxy, and that absence is one of the clearest signals that the app has outgrown the tool. Clearing the cache matters too — a cached model does not notice that you replaced the file on disk.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A demo that changed the model spec',
        usage:
          'A fraud team showed an analyst a Streamlit page for twenty minutes. She immediately said the model was flagging legitimate seasonal spikes, which no offline metric had revealed because the evaluation set was sampled uniformly. That single conversation reshaped the feature set — and it required an interface, not a notebook.',
      },
      {
        context: 'The demo that became load-bearing',
        usage:
          'An internal "quick tool" for scoring uploaded spreadsheets ended up used daily by fifteen people in operations, with no auth, no audit trail and no owner. Migrating it after the fact cost far more than building an API would have, which is why teams now agree a graduation trigger in advance.',
      },
      {
        context: 'Demo and service sharing one model',
        usage:
          'A team pointed their Streamlit app at the same `/v1/predict` endpoint the product uses. When a stakeholder disputed a number, it could be traced to a specific `model_version` in the service logs rather than to a possibly stale copy of the model sitting next to the demo.',
      },
    ],

    projectConnections: [
      { tool: 'Streamlit', role: 'Turns a script into a shareable interface in an afternoon, which is how model feedback gets collected early.' },
      { tool: 'Gradio', role: 'A close alternative, especially strong for single-model input/output demos and for embedding in model hubs.' },
      { tool: 'FastAPI', role: 'The service the demo should call, so that the demo and the product cannot disagree about which model is live.' },
      { tool: 'Docker', role: 'Packages the demo so colleagues run it without recreating your environment.' },
    ],

    commonMistakes: [
      {
        mistake: 'Loading the model at the top of the script without a cache',
        why: 'The script reruns on every interaction, so a 500 MB model is deserialised each time a slider moves. The app feels broken and the machine runs out of memory under two users.',
        fix: 'Put the load behind `@st.cache_resource`. Confirm it worked by printing inside the function — you should see the message exactly once.',
      },
      {
        mistake: 'Using `st.cache_data` for a model or a database connection',
        why: '`cache_data` returns a copy of the cached value, so a large model is duplicated per call and unpicklable objects such as connections fail outright.',
        fix: 'Use `cache_resource` for singletons and `cache_data` for data keyed by arguments. The question to ask is "should everyone share one instance, or should each caller get its own copy?".',
      },
      {
        mistake: 'Keeping state in an ordinary variable',
        why: 'Every rerun re-executes the assignment, so `history = []` resets on every interaction and the value the user just added disappears immediately.',
        fix: 'Initialise once with `if "history" not in st.session_state` and mutate `st.session_state.history` thereafter.',
      },
      {
        mistake: 'Letting a demo become the production interface',
        why: 'There is no authentication, no request contract, no tests, no rollback and no scaling story. Every one of those gaps becomes an incident once people depend on it.',
        fix: 'Agree a graduation trigger in advance — an external user, a second calling system, or any consequence beyond a conversation — and at that point move the model behind an API and build a proper frontend.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain Streamlit\'s execution model and one bug it causes for newcomers.',
        answer:
          'Streamlit reruns the entire script from the top on every interaction; widget calls simply return their current values on the new run. There is no callback or component tree, which is what makes the code read like a plain script. The bug this causes constantly is state that resets: writing `history = []` at the top means it is reinitialised on every rerun, so anything appended vanishes the moment the user touches another control. The fix is `st.session_state`, which persists for the browser session. The same model explains the performance trap: expensive work at the top of the script executes on every interaction unless it is memoised with `st.cache_resource` or `st.cache_data`.',
        followUp:
          'A strong answer notes that the rerun model is a deliberate trade — it removes an entire class of state-synchronisation bugs that component frameworks have, at the cost of needing explicit caching.',
      },
      {
        level: 'intermediate',
        question: 'When would you refuse to build something in Streamlit?',
        answer:
          'When the consumer is a program rather than a person, because they need a stable versioned contract, not a rendered page. When per-user authentication and authorisation are required, since there is nothing built in and bolting on a proxy is weaker than designing for it. When latency or concurrency matter, because the model is a session per user rather than a tuned request pipeline. And when a wrong number has consequences beyond prompting a conversation — anything that touches billing, eligibility or a customer-facing decision needs tests, audit and rollback that a demo script does not have. In those cases I would put the model behind a service and, if humans still need an interface, build a small frontend against the same endpoint so the demo and the product cannot diverge.',
        followUp:
          'Naming a concrete graduation trigger agreed in advance is the answer of someone who has watched a prototype become load-bearing.',
      },
      {
        level: 'ml-engineer',
        question: 'Your Streamlit demo and the production API give different predictions for the same customer. How do you find out why?',
        answer:
          'Almost always they are not running the same thing. I would first compare model identity rather than model behaviour: log the artifact hash or registry version in both, since the demo usually holds a local copy of the model that is weeks behind the deployed one, or a cached object from before the file was replaced. If the versions match, the difference is in preprocessing — the demo typically re-implements featurisation inline, so a different category encoding, a different imputation default or a different column order produces a different input vector from the same user input. The structural fix is to stop duplicating: have the demo call the production endpoint, so there is exactly one model and one featurisation path, and the demo becomes a thin client whose only job is to render.',
        followUp:
          'This is a small instance of training-serving skew, and candidates who name it and connect it to shared feature code are signalling real system-design instinct.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A colleague\'s app takes eight seconds to respond to every slider move. The script loads a model, reads a 200 MB parquet file, and runs inference. Fix it and predict the new behaviour.',
        hint: 'Two different caches, chosen by whether the thing should be shared or copied.',
        language: 'python',
        solution:
          'Wrap the model load in `@st.cache_resource` and the parquet read in `@st.cache_data`. After the first run, both return immediately from the cache, so a slider move re-executes only the cheap inference and the rendering — typically tens of milliseconds. Verify by printing inside each cached function: you should see each message exactly once per server start rather than once per interaction. If the data changes periodically, add `ttl=600` to the data cache rather than clearing it by hand.',
      },
      {
        prompt:
          'Add a feature where the user scores several customers in a row and sees the last five results. Explain why the obvious implementation fails.',
        hint: 'What happens to a normal Python list when the script reruns?',
        language: 'python',
        solution:
          'The obvious version, `results = []` followed by `results.append(...)`, fails because the script reruns from the top on every interaction, so the list is recreated empty each time and the user only ever sees the current result. The working version initialises once — `if "results" not in st.session_state: st.session_state.results = []` — and appends to `st.session_state.results`, which persists for the browser session. Display with `st.session_state.results[-5:]`. Note the state is per session: a second user gets their own, and nothing survives a server restart.',
      },
      {
        prompt:
          'Write the three criteria your team will use to decide that a demo must be rebuilt as a service. Justify each.',
        hint: 'Think about who depends on it, what it is allowed to affect, and who is called when it breaks.',
        solution:
          'One: a non-human consumer. The moment another system wants the output, it needs a versioned contract and an SLA, which a rendered page cannot provide. Two: any consequence beyond a conversation — if the output changes a bill, an eligibility decision or a customer communication, it needs tests, audit logging, review and rollback. Three: an identifiable set of dependants outside the team, or any requirement for per-user access control, because at that point availability and authorisation become somebody\'s responsibility and Streamlit gives neither. Agreeing these in advance converts an awkward political conversation into a pre-committed engineering decision.',
      },
    ],

    quiz: [
      {
        id: 'OPS-006-q1',
        type: 'mcq',
        concept: 'execution model',
        prompt: 'What happens when a user changes a Streamlit slider?',
        options: [
          'The entire script reruns from the top, with the widget returning its new value',
          'Only the components downstream of the slider are re-rendered',
          'A callback registered on the slider fires and nothing else runs',
          'The server pushes a patch without executing Python',
        ],
        answerIndex: 0,
        explanation:
          'Streamlit has no component graph. Every interaction re-executes the script, which is why caching is not an optimisation but a requirement for anything expensive.',
      },
      {
        id: 'OPS-006-q2',
        type: 'mcq',
        concept: 'caching',
        prompt: 'Which decorator belongs on a function that loads a 400 MB model?',
        options: ['`@st.cache_resource`', '`@st.cache_data`', '`@st.session_state`', '`@st.experimental_memo` on the inference call instead'],
        answerIndex: 0,
        explanation:
          '`cache_resource` stores one shared instance without copying, which is exactly what a model needs. `cache_data` returns a copy per call and would duplicate the model in memory.',
      },
      {
        id: 'OPS-006-q3',
        type: 'debug',
        language: 'python',
        concept: 'session state',
        prompt: 'The user clicks Add three times but the list never grows beyond one item. Why?',
        code: 'import streamlit as st\n\nitems = []\nif st.button("Add"):\n    items.append(st.text_input("Item"))\nst.write(items)',
        options: [
          '`items` is recreated on every rerun; it must live in `st.session_state`',
          '`st.button` can only be clicked once per session',
          '`st.write` cannot render a list',
          'The text input must come before the button',
        ],
        answerIndex: 0,
        explanation:
          'Each interaction reruns the script, so `items = []` executes again and discards everything. Values that must survive reruns belong in `st.session_state`, initialised once behind a membership check.',
      },
      {
        id: 'OPS-006-q4',
        type: 'multi',
        concept: 'when to graduate',
        prompt: 'Which signals mean a Streamlit demo should become a proper service? Select all that apply.',
        options: [
          'Another system wants to consume the output programmatically',
          'The output now affects a customer-facing decision',
          'Per-user authentication is required',
          'A colleague asked for a different colour scheme',
          'Fifteen people outside the team use it daily',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Cosmetic requests are just demo work. The other four each introduce a requirement — a contract, auditability, authorisation, availability — that the tool does not provide.',
      },
      {
        id: 'OPS-006-q5',
        type: 'truefalse',
        concept: 'cache invalidation',
        prompt: 'Replacing `models/churn.joblib` on disk automatically causes a `@st.cache_resource` function to reload it.',
        answer: false,
        explanation:
          'The cache is keyed by the function and its arguments, not by file contents or modification time. You must clear the cache or restart the app — which is exactly why demos silently serve a stale model.',
      },
      {
        id: 'OPS-006-q6',
        type: 'explain',
        concept: 'demo value and risk',
        prompt: 'Argue both sides: why a demo app is worth building early, and what it costs you if it survives too long.',
        rubric: [
          'Explains that an interface surfaces feedback a notebook cannot',
          'Names concrete gaps: no auth, no contract, no tests, no rollback',
          'Proposes an explicit graduation trigger rather than a vague intention',
        ],
        sampleAnswer:
          'Building the demo early is worth it because domain experts cannot review a metric but they can immediately react to a prediction they disagree with, and that reaction usually arrives in the first twenty minutes — while the model is still cheap to change. The cost appears if the app survives past that conversation. It has no authentication, no request contract, no tests, no versioning and no rollback, and it holds its own copy of the model, so it quietly drifts away from whatever the product is serving. Once a group of people outside the team depend on it daily, all of those gaps become somebody\'s incident. The way to get the benefit without the debt is to agree the graduation trigger before building it — a non-human consumer, a real-world consequence, or an access-control requirement — and to point the demo at the production endpoint so that there is only ever one model.',
        explanation:
          'The examinable idea is that prototypes are valuable precisely because they omit production concerns, so the discipline is knowing when those omissions stop being acceptable.',
      },
    ],

    flashcards: [
      { front: 'How does Streamlit respond to an interaction?', back: 'It reruns the whole script from the top; widget functions return their current values on the new run.' },
      { front: '`st.cache_resource` vs `st.cache_data`', back: 'Resource caches one shared instance (models, connections) without copying. Data caches a return value keyed by arguments and returns a copy.' },
      { front: 'Where does state that must survive interactions live?', back: '`st.session_state`, initialised once behind an `if "key" not in st.session_state` check. Ordinary variables reset on every rerun.' },
      { front: 'Why should a demo call the API rather than import the model?', back: 'So the demo and the product cannot disagree about model version or preprocessing, and every number is traceable to a served `model_version`.' },
      { front: 'Three triggers to graduate a demo', back: 'A non-human consumer, a real-world consequence such as billing or eligibility, or a requirement for per-user authentication.' },
    ],

    challenge: {
      title: 'A demo that cannot drift from production',
      brief:
        'Build a Streamlit app for a model you have already served behind FastAPI. The app must call the API rather than importing the model, display the returned `model_version` prominently, keep a session history of the last ten scorings, handle a timeout and a 422 gracefully with a message a non-engineer can act on, and cache its HTTP client. Finish by writing the graduation criteria for this specific app: who would have to use it, or what would have to depend on it, before you rebuilt it properly.',
      language: 'python',
      acceptanceCriteria: [
        'No model is loaded in the app; all predictions come from the API',
        'The served `model_version` is visible on screen for every result',
        'A session history of the last ten results persists across interactions',
        'Timeout and validation errors produce clear, non-technical messages',
        'The HTTP client is created once behind `st.cache_resource`',
        'Written graduation criteria name at least three concrete triggers',
      ],
      starterCode: 'import streamlit as st\nimport httpx\n\nst.set_page_config(page_title="Model explorer")\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a data scientist who lives in notebooks what Streamlit is, how its execution model differs from what they expect, and when they should stop using it.',
      mustCover: [
        'The script reruns from the top on every interaction; there are no callbacks',
        'Expensive work must be cached, with `cache_resource` for shared objects and `cache_data` for values',
        'Persistent state lives in `st.session_state`, not in ordinary variables',
        'A demo lacks auth, contract, tests and rollback, so it must graduate once people depend on it',
      ],
      bonusSignals: ['mentions pointing the demo at the production API', 'gives a concrete graduation trigger', 'notes that a cached model does not notice a changed file'],
      sampleExplanation:
        'Streamlit turns a plain Python script into a web page: you call a function to put a slider on the screen and it hands you back whatever the user chose. The part that surprises people is what happens on interaction — there is no callback and no partial update, the whole script simply runs again from line one. That makes the code delightfully linear, and it means anything expensive at the top runs on every keystroke unless you cache it. Use `st.cache_resource` for things everyone should share, like a loaded model or an HTTP client, and `st.cache_data` for values keyed by arguments, like a query result. Anything that has to survive between interactions — a history list, a counter — belongs in `st.session_state`, because an ordinary variable is recreated on every rerun. All of this is superb for getting a model in front of a domain expert in an afternoon, which is the fastest way to learn what is actually wrong with it. What it does not give you is authentication, a stable contract, tests or a rollback story, so the moment another system wants to call it, or its output starts affecting a real decision, it has stopped being a demo and needs to become a service.',
    },
  },

  {
    id: 'OPS-007',
    domain: 'OPS',
    module: 'Packaging & Delivery',
    topic: 'Containers',
    title: 'Docker and Containers',
    slug: 'docker-and-containers',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['OPS-003', 'OPS-005'],
    related: ['OPS-001'],
    tags: ['docker', 'container', 'image', 'dockerfile', 'layers', 'compose', 'volumes'],

    learningObjectives: [
      'Explain the difference between an image and a container, and why a container is not a virtual machine',
      'Read and write a Dockerfile for an ML service, line by line, knowing what each instruction costs',
      'Exploit layer caching by ordering instructions so dependency installs are not repeated on every code change',
      'Keep images small with slim base images, multi-stage builds and a `.dockerignore`',
      'Run and inspect containers with `docker build`, `run`, `logs`, `exec` and `compose`, and use volumes for data',
      'Supply configuration and secrets at run time instead of baking them into the image',
    ],

    terminology: [
      {
        term: 'Image',
        definition:
          'A read-only, layered filesystem plus metadata describing the default command, environment and exposed ports. Images are built once and are immutable; they are identified by a digest and usually tagged.',
        simple: 'The frozen template a container is started from.',
      },
      {
        term: 'Container',
        definition:
          'A running process (or process tree) started from an image, isolated by kernel namespaces and constrained by cgroups, with a thin writable layer on top of the image\'s read-only layers.',
        simple: 'A running copy of the template, with its own view of the filesystem and network.',
      },
      {
        term: 'Layer',
        definition:
          'The filesystem delta produced by one Dockerfile instruction. Layers are content-addressed and cached: if an instruction and all its inputs are unchanged, the builder reuses the existing layer instead of re-running it.',
        simple: 'One step of the build, saved so it does not have to be repeated.',
      },
      {
        term: 'Build context',
        definition:
          'The directory sent to the builder when you run `docker build .`. Everything in it is uploaded unless excluded by `.dockerignore`, which is why a stray `data/` folder makes builds crawl.',
        simple: 'The folder you hand to the builder.',
      },
      {
        term: 'Multi-stage build',
        definition:
          'A Dockerfile with several `FROM` stages where later stages copy only the artifacts they need from earlier ones, leaving compilers and build dependencies out of the final image.',
        simple: 'Build in a big workshop, ship only the finished product.',
      },
      {
        term: 'Volume / bind mount',
        definition:
          'A mechanism for attaching storage from outside the container so data survives the container being replaced. A bind mount maps a host path; a named volume is managed by Docker.',
        simple: 'A door into the container for data that must outlive it.',
      },
    ],

    simpleExplanation:
      "\"It works on my machine\" is usually true and usually useless, because your machine has a particular operating system, a particular set of C libraries, a particular Python and a particular pile of packages you installed months ago and forgot. A container fixes this by shipping the answer instead of the instructions. You write a short recipe called a Dockerfile that says which base system to start from, what to install and what command to run. Building it produces an image: a frozen, layered filesystem containing everything your program needs except the kernel. Anyone with that image runs exactly the same bytes you did, on their laptop, in the test system and in production. The distinction worth getting straight early is image versus container: the image is the template, immutable and shareable, and a container is one running instance of it. Starting ten containers from one image is normal, and throwing a container away loses nothing, because anything you needed to keep should have been written to a mounted volume or an external store.",

    whyItExists:
      'Virtual environments pin Python packages but not the operating system, system libraries, compilers or CUDA runtime, so a service that runs on a developer laptop can still fail on a server with a different glibc or driver. Containers exist to make the entire userspace an artifact that is built once, versioned, and run identically everywhere, which turns deployment from re-creating an environment into copying one.',

    analogy: {
      scenario:
        "Think of shipping containers, the steel kind. Before them, cargo was loaded piece by piece and every port, crane and lorry had to cope with barrels, crates and sacks of different shapes. The container did not make cargo smaller; it made it uniform. Now a crane does not care whether it is lifting bananas or car parts, and a box packed in Shenzhen arrives in Rotterdam without being unpacked. The packing list stays on the outside, and nothing about the ship needs to know what is inside.",
      mapping: [
        { from: 'The steel box', to: 'The container image' },
        { from: 'Whatever is packed inside', to: 'Your application, its dependencies and its system libraries' },
        { from: 'The standard corner fittings every crane understands', to: 'The container runtime interface every platform supports' },
        { from: 'The ship, the lorry, the crane', to: 'A laptop, a CI runner, a Kubernetes node' },
        { from: 'The manifest taped to the door', to: 'Image metadata: entrypoint, exposed port, environment' },
        { from: 'Refrigerated cargo plugged into ship power', to: 'A volume mounted at run time for data that must outlive the container' },
      ],
      bridge:
        'The uniformity is the whole point and it maps precisely: because every platform understands the same image format, the same artifact runs on a laptop, in CI and in production without translation. Where the analogy misleads is weight. A steel container is heavy; a container image shares the host kernel and starts in milliseconds, which is why running one per request-handling process is ordinary rather than extravagant. It is emphatically not a virtual machine — there is no guest operating system booting inside it.',
      limitations:
        'A shipping container protects its contents completely; a Linux container shares the host kernel, so it is an isolation boundary for dependencies, not a hard security boundary against a determined attacker, and it cannot run a different kernel than the host provides.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'Container versus virtual machine',
        caption: 'Both isolate. Only one boots an operating system.',
        left: {
          heading: 'Container',
          points: [
            'Shares the host kernel; isolated by namespaces and cgroups',
            'Starts in milliseconds; image measured in tens or hundreds of MB',
            'Packages userspace only — libraries, runtime, your code',
            'Dozens can run comfortably on one machine',
          ],
        },
        right: {
          heading: 'Virtual machine',
          points: [
            'Boots its own guest kernel on a hypervisor',
            'Starts in tens of seconds; image measured in GB',
            'Packages a whole operating system',
            'Stronger isolation boundary, correspondingly heavier',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'How layer caching decides what rebuilds',
        caption: 'Change a line of source and watch which layers survive.',
        widget: 'docker-layers',
      },
      {
        kind: 'flow',
        title: 'From Dockerfile to running service',
        caption: 'Build once, run anywhere that speaks the same image format.',
        steps: [
          { label: '`docker build -t churn:1.4.0 .`', detail: 'The build context is uploaded, each instruction produces a layer, cached layers are reused.' },
          { label: 'Image stored locally', detail: 'Immutable, identified by a digest, tagged `churn:1.4.0`.' },
          { label: '`docker push registry/churn:1.4.0`', detail: 'Only layers the registry lacks are uploaded.' },
          { label: '`docker run -p 8000:8000 --env-file .env churn:1.4.0`', detail: 'A container starts; configuration arrives at run time, not build time.' },
          { label: 'Orchestrator pulls the same digest', detail: 'Staging and production run the identical bytes that were tested.' },
        ],
      },
      {
        kind: 'table',
        title: 'Why instruction order changes your build time',
        columns: ['Dockerfile order', 'What happens when you edit `app/main.py`', 'Rebuild cost'],
        rows: [
          ['COPY . . then pip install', 'The COPY layer changes, so every layer after it is invalidated, including pip install', 'Full dependency reinstall, minutes'],
          ['COPY requirements.txt, pip install, then COPY . .', 'Only the final COPY layer changes', 'Seconds'],
          ['Multi-stage: build wheels, then copy them in', 'Only the final small stage rebuilds', 'Seconds, and a much smaller image'],
        ],
      },
    ],

    formalDefinition:
      'A container image is an ordered set of content-addressed filesystem layers plus a configuration object specifying entrypoint, command, environment, working directory and exposed ports. A container is an operating-system process executed against a union mount of those layers with a writable upper layer, isolated using kernel namespaces for process, mount, network, user and IPC views, and resource-constrained using cgroups. Because the kernel is shared, containers provide dependency and namespace isolation with near-native start-up latency, unlike hardware virtualisation which emulates a machine and boots a guest kernel.',

    codeExamples: [
      {
        language: 'text',
        title: 'An annotated Dockerfile for a FastAPI model service',
        code: `# --- Stage 1: build the dependency set --------------------------------
FROM python:3.11-slim AS builder

# System packages needed only to COMPILE wheels. They never reach the final image.
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy ONLY the dependency manifest first. This layer changes rarely,
# so the expensive install below stays cached when you edit source code.
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# --- Stage 2: the runtime image ---------------------------------------
FROM python:3.11-slim

# Never run as root. A compromised process should not own the container.
RUN useradd --create-home --uid 10001 appuser
WORKDIR /app

# Take only the installed packages from the builder; leave the compiler behind.
COPY --from=builder /install /usr/local

# Source last: editing it invalidates only this one small layer.
COPY --chown=appuser:appuser app/ ./app/
COPY --chown=appuser:appuser models/churn.joblib ./models/churn.joblib

ENV PYTHONUNBUFFERED=1 \\
    PYTHONDONTWRITEBYTECODE=1 \\
    MODEL_PATH=/app/models/churn.joblib

USER appuser
EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\
  CMD python -c "import urllib.request;urllib.request.urlopen('http://localhost:8000/health')"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]`,
        explanation:
          'Four decisions carry most of the value. The dependency manifest is copied before the source, so editing `main.py` does not reinstall scikit-learn — this single reordering is often the difference between a four-minute and a six-second rebuild. The multi-stage split means `build-essential` compiles wheels and is then discarded, which can halve the image. `USER appuser` drops root, because a container is not a security boundary you should lean on. And `PYTHONUNBUFFERED=1` matters more than it looks: without it Python buffers stdout, so your logs appear minutes late or not at all when the container is killed.',
      },
      {
        language: 'bash',
        title: 'Build, run, inspect, debug',
        code: `# .dockerignore first — otherwise the whole data directory is uploaded as build context
printf '.git\\n.venv\\ndata/\\nnotebooks/\\n*.parquet\\n.pytest_cache\\n__pycache__\\n' > .dockerignore

docker build -t churn:1.4.0 .
docker images churn                    # REPOSITORY  TAG     SIZE
                                       # churn       1.4.0   412MB

# Run it. Config and secrets arrive at run time, never baked into the image.
docker run --rm -p 8000:8000 \\
  -e MODEL_VERSION=churn-2024-09-02 \\
  --env-file .env.local \\
  --memory=2g --cpus=2 \\
  --name churn-svc churn:1.4.0

curl -s localhost:8000/ready

docker ps                              # what is running
docker logs -f churn-svc               # stream stdout/stderr
docker exec -it churn-svc /bin/bash    # a shell inside the running container
docker stats churn-svc                 # live memory and CPU against the limits

# Where did the size come from?
docker history churn:1.4.0 --human --format '{{.Size}}\\t{{.CreatedBy}}' | head`,
        explanation:
          '`.dockerignore` is written first for a reason: without it, `docker build .` uploads every byte of your `data/` directory to the builder before the first instruction runs, which routinely turns a ten-second build into a ten-minute one. `--memory` and `--cpus` are worth setting locally because they reproduce the constraints the orchestrator will impose — a service that is fine unconstrained and gets killed in production is almost always discovering its memory limit for the first time. `docker history` tells you which instruction is responsible for an oversized image.',
      },
      {
        language: 'yaml',
        title: 'docker-compose for the service plus its dependencies',
        code: `services:
  api:
    build: .
    image: churn:1.4.0
    ports:
      - "8000:8000"
    environment:
      MODEL_PATH: /app/models/churn.joblib
      FEATURE_DB_URL: postgresql://churn:secret@db:5432/features
    env_file:
      - .env.local            # git-ignored; never committed
    volumes:
      - ./models:/app/models:ro     # read-only: swap a model without rebuilding
      - predictions:/var/log/preds  # named volume survives container replacement
    depends_on:
      db:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 2g

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: churn
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: features
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U churn"]
      interval: 5s
      retries: 10
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  predictions:
  pgdata:`,
        explanation:
          'Compose is how you run a service and its dependencies together with one command, which makes local development and integration tests match production topology. Two details repay attention. The `models` bind mount is read-only, so you can drop in a new artifact and restart without rebuilding the image, while the container cannot corrupt your local copy. And `depends_on` with `condition: service_healthy` waits for Postgres to actually accept connections rather than merely to have started, which removes the classic flaky "connection refused" on the first run.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The CUDA mismatch',
        usage:
          'A training job runs on a laptop with CUDA 12.1 and fails on a cluster node with 11.8, because the PyTorch wheel was built against the newer runtime. Pinning the base image to `pytorch/pytorch:2.4.0-cuda12.1-cudnn9-runtime` makes the runtime part of the artifact, and the mismatch disappears.',
      },
      {
        context: 'A build that went from four minutes to eight seconds',
        usage:
          'A team had `COPY . .` before `pip install`, so every one-line code change reinstalled the entire dependency set. Moving the requirements copy above the install, and adding a `.dockerignore`, cut the inner development loop by two orders of magnitude.',
      },
      {
        context: 'A secret baked into a layer',
        usage:
          'An engineer added `ENV AWS_SECRET_ACCESS_KEY=...` to a Dockerfile, then removed it in a later commit. The key remained in the earlier layer of every pushed image and was recoverable with `docker history`. Secrets must arrive at run time through the environment or a secret manager.',
      },
    ],

    projectConnections: [
      { tool: 'Docker', role: 'Builds and runs the image that becomes the deployment artifact for every environment.' },
      { tool: 'docker compose', role: 'Runs the service alongside its database, cache and mock dependencies for local development and integration tests.' },
      { tool: 'GitHub Actions', role: 'Builds the image on every merge, tags it with the commit SHA, and pushes it to a registry — the subject of the CI/CD unit.' },
      { tool: 'Kubernetes / ECS', role: 'Schedules containers, restarts unhealthy ones and uses your readiness probe to decide where traffic goes.' },
      { tool: 'Trivy / Grype', role: 'Scans the built image for known vulnerable packages before it is allowed to ship.' },
    ],

    commonMistakes: [
      {
        mistake: 'Copying the whole source tree before installing dependencies',
        why: 'A layer invalidates every layer after it. With `COPY . .` first, editing one line of Python changes that layer and forces the dependency install to run again from scratch on every single build.',
        fix: 'Copy the manifest, install, then copy the source. Order instructions from least to most frequently changing, which is the general principle behind every Dockerfile optimisation.',
      },
      {
        mistake: 'Baking secrets into the image with `ENV` or `COPY .env`',
        why: 'Layers are immutable and independently inspectable. Anyone who can pull the image can read the value with `docker history` or by extracting the layer, even if a later instruction deletes the file.',
        fix: 'Pass configuration at run time with `-e`, `--env-file` or an orchestrator secret. For build-time credentials, use BuildKit secret mounts, which are never persisted into a layer.',
      },
      {
        mistake: 'Using `FROM python:3.11` and wondering why the image is 1.2 GB',
        why: 'The full image carries a complete build toolchain and documentation nobody needs at run time. Size costs pull time on every deploy and every node, and enlarges the vulnerability surface that scanners report.',
        fix: 'Start from `-slim`, use a multi-stage build so compilers stay in the builder stage, and check the result with `docker history` to find the instruction responsible for the bulk.',
      },
      {
        mistake: 'Writing important data inside the container filesystem',
        why: 'The writable layer dies with the container. Predictions, logs or uploaded files written to `/app/output` vanish the moment the orchestrator replaces the instance, which it does routinely.',
        fix: 'Mount a volume for anything that must outlive the container, or better, write to an external store or a log pipeline. Treat container filesystems as strictly ephemeral.',
      },
      {
        mistake: 'Running as root because it "just works"',
        why: 'If the process is compromised, the attacker is root inside a container that shares the host kernel, which materially widens what an escape or a mounted-volume write can reach.',
        fix: 'Create an unprivileged user in the Dockerfile and switch to it with `USER` before the `CMD`, giving it ownership only of the paths it genuinely needs.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between an image and a container, and how is a container different from a virtual machine?',
        answer:
          'An image is an immutable, layered filesystem plus metadata such as the default command and exposed ports; a container is a running process started from that image with a thin writable layer on top. One image can back any number of containers, and destroying a container loses only what was written to its writable layer. Against a virtual machine the key difference is the kernel: a VM boots its own guest kernel on a hypervisor and packages an entire operating system, so it starts in tens of seconds and is measured in gigabytes, whereas a container shares the host kernel and is isolated by namespaces and cgroups, so it starts in milliseconds and packages only userspace. That also bounds what containers can do — you cannot run a different kernel, and the isolation is weaker than a hypervisor boundary.',
        followUp:
          'A strong answer notes the practical consequence: because the kernel is shared, a Linux container cannot run natively on a machine with a different kernel, which is why Docker on macOS quietly runs a Linux virtual machine underneath.',
      },
      {
        level: 'intermediate',
        question: 'Why are requirements copied into the image before the application source?',
        answer:
          'Because of layer caching. Each instruction produces a content-addressed layer, and changing one layer invalidates every layer after it. Dependencies change rarely and source changes constantly, so copying the manifest and installing before copying the source means a code edit invalidates only the final small COPY layer while the expensive install stays cached. Put `COPY . .` first and every one-character change reinstalls the entire dependency set, which on an ML image with PyTorch is minutes per build, repeated on every commit in CI. The general rule is to order instructions from least frequently changing to most frequently changing, and to pair it with a `.dockerignore` so the build context does not needlessly change either.',
        followUp:
          'Mentioning BuildKit cache mounts for the pip or uv cache, which persist across builds even when the layer is invalidated, shows a level beyond the textbook answer.',
      },
      {
        level: 'ml-engineer',
        question: 'Your ML serving image is 6 GB and deploys are slow. Walk me through reducing it.',
        answer:
          'First I would measure rather than guess: `docker history` attributes size to instructions, and usually two or three dominate. The typical culprits are a full base image instead of slim, build tools left in the final stage, the CUDA development image where the runtime image would do, apt lists and pip caches not cleaned in the same layer that created them, and training data or notebooks copied in by an over-broad `COPY .` with no `.dockerignore`. The fixes in order of payoff: a multi-stage build so compilers and dev headers never reach the runtime stage, a `-slim` or `-runtime` base, `--no-cache-dir` for pip and `rm -rf /var/lib/apt/lists/*` in the same `RUN`, and a strict `.dockerignore`. For a large model artifact I would also question baking it in at all — mounting it from object storage or a volume at start-up keeps the image small and lets the same image serve several model versions. Finally, sharing a common base layer across services means nodes pull the heavy part once.',
        followUp:
          'The instinct being tested is measure-then-optimise, plus the architectural question of whether the model belongs inside the image at all, which trades deploy simplicity against image size and start-up time.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Given a Dockerfile whose first instruction after `WORKDIR` is `COPY . .`, followed by `RUN pip install -r requirements.txt`, explain what happens on a one-line code change and rewrite the relevant lines.',
        hint: 'Which layer changed, and what does that do to the layers after it?',
        language: 'text',
        solution:
          'The `COPY . .` layer includes the edited file, so its hash changes and every subsequent layer is invalidated — including the pip install, which re-runs in full. Rewrite as:\n\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY app/ ./app/\n\nNow a code edit changes only the final COPY. Add a `.dockerignore` containing `.git`, `.venv`, `data/` and `notebooks/` as well, because otherwise unrelated files in the build context can invalidate the copy layer and every build uploads gigabytes before it even starts.',
      },
      {
        prompt:
          'Your container writes prediction logs to `/app/logs/preds.jsonl`. After a deploy they are gone. Explain and fix, giving two options.',
        hint: 'What happens to the writable layer when a container is replaced?',
        language: 'bash',
        solution:
          'The writable layer is part of the container, not the image, so replacing the container discards it — and orchestrators replace containers on every deploy, scale event and health failure. Option one, minimal: mount storage, `docker run -v preds:/app/logs ...` with a named volume, or a bind mount in development. Option two, better for production: do not write files at all. Log structured JSON to stdout and let the platform collect it, or write predictions to a database or object store. The general rule is that container filesystems are ephemeral by design, so anything that must survive belongs outside the container.',
      },
      {
        prompt:
          'You need a Hugging Face token during `docker build` to download a model. Show the wrong way and the right way.',
        hint: 'Anything in a layer can be extracted from the image, regardless of what later layers do.',
        language: 'bash',
        solution:
          'Wrong: `ARG HF_TOKEN` plus `ENV HF_TOKEN=$HF_TOKEN`, or `COPY .env .` followed by a later `RUN rm .env`. Both persist the value in a layer that anyone who can pull the image may extract, and `docker history` often shows it outright. Right: a BuildKit secret mount, which exposes the value only for the duration of one `RUN` and never writes it into a layer:\n\nRUN --mount=type=secret,id=hf \\\n    HF_TOKEN=$(cat /run/secrets/hf) python download_model.py\n\ninvoked as `docker build --secret id=hf,env=HF_TOKEN .`. For run-time credentials, pass them with `--env-file` or an orchestrator secret rather than putting them in the image at all.',
      },
    ],

    quiz: [
      {
        id: 'OPS-007-q1',
        type: 'mcq',
        concept: 'image vs container',
        prompt: 'Which statement is correct?',
        options: [
          'An image is an immutable template; a container is a running instance of it with a writable layer',
          'An image is a running process; a container is the file it was built from',
          'Each container needs its own image, built separately',
          'Containers and virtual machines both boot their own kernel',
        ],
        answerIndex: 0,
        explanation:
          'One image can back many containers. Containers share the host kernel and are isolated by namespaces and cgroups, which is precisely what makes them start in milliseconds rather than tens of seconds.',
      },
      {
        id: 'OPS-007-q2',
        type: 'order',
        concept: 'layer caching',
        prompt: 'Order these Dockerfile instructions to maximise cache reuse during development.',
        items: [
          'FROM python:3.11-slim',
          'RUN apt-get install system libraries',
          'COPY requirements.txt .',
          'RUN pip install -r requirements.txt',
          'COPY app/ ./app/',
        ],
        explanation:
          'Least frequently changing first. System packages and dependencies change rarely; source changes constantly, so it goes last and a code edit invalidates only that final small layer.',
      },
      {
        id: 'OPS-007-q3',
        type: 'truefalse',
        concept: 'secrets in layers',
        prompt: 'Adding `RUN rm /app/.env` after copying a secrets file removes the secret from the image.',
        answer: false,
        explanation:
          'Layers are immutable and stacked. The earlier layer still contains the file and can be extracted from the image, so the secret is recoverable. Use BuildKit secret mounts at build time and run-time environment variables otherwise.',
      },
      {
        id: 'OPS-007-q4',
        type: 'multi',
        concept: 'image size',
        prompt: 'Which of these genuinely reduce the size of an ML serving image? Select all that apply.',
        options: [
          'A multi-stage build that leaves compilers in the builder stage',
          'A `-slim` or `-runtime` base image instead of the full one',
          '`pip install --no-cache-dir` and cleaning apt lists in the same RUN',
          'Deleting files in a later RUN instruction',
          'A `.dockerignore` that excludes `data/` and `notebooks/`',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Deleting in a later layer hides files from the running container but keeps them in the image, so the download is no smaller. Cleanup only helps when it happens in the same instruction that created the files.',
      },
      {
        id: 'OPS-007-q5',
        type: 'debug',
        language: 'yaml',
        concept: 'ephemeral filesystem',
        prompt: 'Predictions written by this service disappear on every deploy. Which line is the problem?',
        code: 'services:\n  api:\n    image: churn:1.4.0\n    environment:\n      OUTPUT_PATH: /app/output/preds.jsonl\n    ports:\n      - "8000:8000"',
        options: [
          'There is no volume mounted at `/app/output`, so the data lives in the container\'s writable layer',
          'The port mapping is wrong',
          '`OUTPUT_PATH` must be an absolute URL',
          'The image tag must be `latest`',
        ],
        answerIndex: 0,
        explanation:
          'Anything written inside the container dies with it. Mount a named volume at `/app/output`, or better, stop writing files and send predictions to a datastore or to stdout for the platform to collect.',
      },
      {
        id: 'OPS-007-q6',
        type: 'explain',
        concept: 'why containers for ML',
        prompt: 'A colleague says a virtual environment plus a pinned `requirements.txt` is enough and containers are overkill. Respond.',
        rubric: [
          'Identifies what a virtual environment does not capture: OS, system libraries, drivers, Python build',
          'Gives a concrete ML failure such as a CUDA or glibc mismatch',
          'Notes the operational benefits: one artifact across environments, easy rollback, orchestrator integration',
        ],
        sampleAnswer:
          'A lockfile fixes the Python layer precisely, and for a pure-Python script on a uniform fleet that is often genuinely enough. It stops being enough the moment anything below Python matters, which in machine learning is most of the time: the CUDA runtime and driver pairing, cuDNN, the BLAS library a wheel was linked against, the glibc version, even the Python patch build. A container captures all of that as one immutable artifact, so the bytes tested in CI are the bytes running in production rather than an environment reconstructed on a hopefully-similar machine. It also buys operational properties that are hard to get otherwise: a rollback is repointing at a previous digest, scaling is starting another copy, and orchestrators can restart and health-check it without knowing anything about Python. The cost is a build step, some image-size discipline and a new set of things to learn, which is a fair trade once more than one machine runs your code.',
        explanation:
          'The examinable idea is that reproducibility is layered and containers close the layer that virtual environments cannot reach, while also giving you a deployable, rollbackable unit.',
      },
    ],

    flashcards: [
      { front: 'Image vs container', back: 'The image is the immutable layered template; a container is one running instance of it with a thin writable layer that dies with it.' },
      { front: 'Why copy requirements before source?', back: 'Changing a layer invalidates every later layer. Source changes constantly, dependencies rarely — so installing first keeps the expensive layer cached.' },
      { front: 'Why is `RUN rm secret.env` not a fix?', back: 'The earlier layer still holds the file and can be extracted from the image. Use BuildKit secret mounts or run-time environment variables.' },
      { front: 'What does `.dockerignore` prevent?', back: 'Uploading the whole directory as build context and letting unrelated files invalidate the COPY layer. Exclude `.git`, `.venv`, `data/`, notebooks.' },
      { front: 'Where should data that must survive go?', back: 'A mounted volume or an external store. The container filesystem is ephemeral and is discarded on every replacement.' },
      { front: 'Container vs virtual machine, in one line', back: 'A container shares the host kernel and isolates userspace (milliseconds, hundreds of MB); a VM boots a guest kernel (seconds, gigabytes).' },
    ],

    challenge: {
      title: 'Containerise your model service properly',
      brief:
        'Take the FastAPI service you built earlier and containerise it. Write a `.dockerignore` first, then a multi-stage Dockerfile with slim bases, a non-root user, a healthcheck and no secrets. Measure three things and write them down: the image size before and after the multi-stage split, the rebuild time when you change one line of source versus one line of `requirements.txt`, and the container memory used under a small load test. Finish with a `docker compose` file that runs the service with its model mounted read-only.',
      language: 'text',
      acceptanceCriteria: [
        'The image builds, runs, and answers `/ready` with 200',
        'Multi-stage build with a slim runtime base; final image under about 600 MB for a scikit-learn service',
        'The container runs as a non-root user and contains no secrets in any layer',
        'A one-line source change rebuilds in seconds, proving the dependency layer stayed cached',
        'Compose runs the service with the model bind-mounted read-only and memory limited',
        'Measured image size, rebuild times and memory usage are recorded',
      ],
      starterCode: '# syntax=docker/dockerfile:1\nFROM python:3.11-slim AS builder\n',
    },

    teachingPrompt: {
      prompt:
        'Explain containers to someone who already uses virtual environments and does not see the point. Cover images versus containers, layers and caching, and what must never go into an image.',
      mustCover: [
        'A container packages the whole userspace, which a virtual environment cannot',
        'An image is an immutable template; a container is a disposable running instance',
        'Layers are cached, so instruction order determines build time',
        'Secrets and data must arrive at run time, never be baked into layers',
      ],
      bonusSignals: ['contrasts containers with virtual machines correctly', 'mentions running as non-root', 'mentions that container filesystems are ephemeral'],
      sampleExplanation:
        'A virtual environment pins your Python packages, which solves a real problem, but it says nothing about the operating system, the C libraries those packages were compiled against, or the CUDA runtime a GPU wheel expects. That is exactly the layer where machine learning breaks between a laptop and a server. A container captures all of it. You write a short recipe, build it once, and the result is an image: an immutable stack of filesystem layers plus the command to run. A container is one running instance of that image, and it is meant to be disposable — anything written inside it disappears when it is replaced, which is why data and logs go to a mounted volume or an external store. The layers matter for a practical reason: each instruction produces one, they are cached, and changing one invalidates everything after it. So you copy the requirements file and install dependencies before copying your source, because then editing a line of Python rebuilds one tiny layer instead of reinstalling PyTorch. Two things must never go in: secrets, because a layer can be extracted even if a later instruction deletes the file, and anything huge that you could mount instead.',
    },
  },

  {
    id: 'OPS-008',
    domain: 'OPS',
    module: 'Packaging & Delivery',
    topic: 'CI/CD',
    title: 'CI/CD for Machine Learning',
    slug: 'ci-cd-for-ml',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['OPS-002', 'OPS-007'],
    related: ['OPS-005'],
    tags: ['ci', 'cd', 'github actions', 'testing', 'canary', 'blue-green', 'shadow', 'model gate'],

    learningObjectives: [
      'Explain what continuous integration buys a team and why it must run on every pull request',
      'Write a GitHub Actions workflow that lints, type-checks, tests and builds an image',
      'Name the tests that are specific to ML: data validation, training smoke tests, and model performance gates',
      'Explain why the training pipeline is a separate pipeline from the deployment pipeline',
      'Compare blue-green, canary and shadow deployment, and choose the right one for a model change',
    ],

    terminology: [
      {
        term: 'Continuous integration (CI)',
        definition:
          'Automatically building and testing every change as it is proposed, so that defects are found within minutes of being written rather than at integration time.',
        simple: 'A robot that checks every change before a human merges it.',
      },
      {
        term: 'Continuous delivery / deployment (CD)',
        definition:
          'Delivery keeps `main` always releasable and makes shipping a one-click decision; deployment goes further and releases every passing change automatically.',
        simple: 'Getting the tested change out to users, safely and repeatably.',
      },
      {
        term: 'Model performance gate',
        definition:
          'A CI check that fails the pipeline when a candidate model scores worse than the current production model, or worse than a fixed floor, on a held-out evaluation set.',
        simple: 'A rule that refuses to ship a model that got worse.',
      },
      {
        term: 'Blue-green deployment',
        definition:
          'Two complete environments. The new version is deployed to the idle one, verified, then all traffic is switched at once; rollback is switching back.',
        simple: 'Set up the new one next door, then flip everyone over at once.',
      },
      {
        term: 'Canary deployment',
        definition:
          'The new version receives a small slice of live traffic — 1%, then 5%, then 25% — with automated metrics checks at each step and an automatic rollback on regression.',
        simple: 'Let a few real users try it first and watch closely.',
      },
      {
        term: 'Shadow deployment',
        definition:
          'The new model receives a copy of live traffic and its predictions are logged but never returned to users, so it can be compared against production on real data with zero user risk.',
        simple: 'Let the new model answer silently and grade it afterwards.',
      },
    ],

    simpleExplanation:
      "Continuous integration is a robot that checks every proposed change the moment it is proposed. Somebody opens a pull request; within a couple of minutes the robot has installed the dependencies, run the formatter and linter, checked the types, run the tests and built the container image, and it reports back in the pull request itself. That short feedback loop is the whole value: a mistake caught two minutes after you wrote it costs a minute to fix, and the same mistake found three weeks later in production costs a day and a customer apology. Continuous delivery is the second half — because every change on the main branch has been verified, releasing becomes a routine, boring action rather than an event. Machine learning adds a twist that ordinary software does not have. Your code can be perfectly correct and the system still be broken, because the data changed or the retrained model is simply worse. So an ML pipeline tests more than code: it validates incoming data, it checks that a candidate model beats the one currently in production on a fixed evaluation set, and it treats training and deployment as two separate pipelines that run on different triggers.",

    whyItExists:
      'When integration and testing are manual, they happen late, inconsistently and under time pressure, so defects are discovered by users and releases become risky events that teams avoid. Automating build, test and deployment makes verification uniform and immediate, which is what lets a team ship small changes often instead of large changes rarely. In machine learning it also closes a gap unique to the field: correct code can still produce a worse model, so the pipeline must gate on measured model quality, not only on tests passing.',

    analogy: {
      scenario:
        "Think of a commercial kitchen preparing a new dish for the menu. Nothing goes out on the strength of the chef's confidence. Every plate is tasted before it leaves the pass, the new dish is compared against the version already on the menu rather than merely declared good, and on the first night it is offered to a handful of tables while the head chef watches what comes back. If plates return untouched, the dish is pulled immediately and last week's version is back within minutes because the old recipe and ingredients were never thrown away.",
      mapping: [
        { from: 'Tasting every plate at the pass', to: 'CI running lint, types and tests on every pull request' },
        { from: 'Comparing against the dish already on the menu', to: 'A model performance gate against the production model' },
        { from: 'Offering it to a handful of tables first', to: 'A canary deployment on a small traffic slice' },
        { from: 'Cooking it but not serving it, to check timings', to: 'Shadow deployment: predictions logged, never returned' },
        { from: 'Keeping last week\'s recipe ready', to: 'A previous image digest and model version available for instant rollback' },
      ],
      bridge:
        'The comparison against the existing dish is the part that makes this an ML analogy rather than a general software one. A unit test asks "did the code do what I said?", which a new model can pass while being worse at its actual job. The performance gate asks the question tests cannot: "is this candidate better than what we already have, measured the same way on the same held-out data?" That is why an ML pipeline has an evaluation stage between training and deployment, and why promotion is a decision about metrics rather than a decision about a green tick.',
      limitations:
        'A chef can taste a dish instantly; model quality in production is often only measurable weeks later, once labels arrive. That delay is why shadow and canary deployments exist, and why offline metrics are never the whole story.',
    },

    visuals: [
      {
        kind: 'widget',
        title: 'The pipeline end to end',
        caption: 'Commit, check, build, gate, deploy — and what happens when a stage fails.',
        widget: 'ci-cd-flow',
      },
      {
        kind: 'flow',
        title: 'What runs on a pull request',
        caption: 'Fast checks first, so the cheapest failure is discovered first.',
        steps: [
          { label: 'Checkout and restore cache', detail: 'Dependencies come from cache keyed on the lockfile hash, so most runs skip installation.' },
          { label: 'Lint and format check', detail: '`ruff check` and `ruff format --check`. Seconds, and catches the noisiest review comments.' },
          { label: 'Type check', detail: '`mypy src/`. Catches an entire class of contract mismatches before any test runs.' },
          { label: 'Unit and contract tests', detail: '`pytest`, including API contract tests against the real application.' },
          { label: 'Data validation tests', detail: 'Schema, ranges and null rates on a sample. Specific to ML, and the stage that catches upstream breakage.' },
          { label: 'Build the image', detail: 'Tagged with the commit SHA so the artifact is traceable to the exact source.' },
        ],
      },
      {
        kind: 'compare',
        title: 'Two pipelines, not one',
        caption: 'Conflating them is the most common ML delivery mistake.',
        left: {
          heading: 'Training pipeline',
          points: [
            'Triggered by new data, a schedule or a deliberate experiment',
            'Runs for hours on expensive hardware',
            'Produces a candidate model and an evaluation report',
            'Ends by registering the model, not by deploying it',
          ],
        },
        right: {
          heading: 'Deployment pipeline',
          points: [
            'Triggered by a merge to `main` or a model promotion',
            'Runs in minutes on ordinary runners',
            'Produces an image and rolls it out progressively',
            'Can roll back in seconds without retraining anything',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Choosing a release strategy',
        columns: ['Strategy', 'User risk', 'Cost', 'Use it when'],
        rows: [
          ['Blue-green', 'All users at once, but rollback is instant', 'Two full environments', 'The change is verified offline and you want a clean, fast switch and revert.'],
          ['Canary', 'A small percentage, briefly', 'Traffic splitting and automated metric checks', 'A model change whose real-world effect you cannot fully predict offline.'],
          ['Shadow', 'None — predictions are never returned', 'Double inference cost, and a logging path', 'A major model or architecture change you want to validate on live traffic first.'],
          ['Rolling', 'Mixed versions serve simultaneously', 'Cheapest; the orchestrator default', 'Backwards-compatible changes where version mixing is harmless.'],
        ],
      },
    ],

    formalDefinition:
      'Continuous integration is the practice of automatically building and verifying every proposed change against the shared mainline, with a defined set of checks whose failure blocks merge. Continuous delivery extends this by keeping the mainline in a permanently releasable state and automating promotion through environments. In machine learning the verified artifact set is extended beyond code to include data (schema and distribution assertions), the trained model (evaluation against a fixed holdout and against the incumbent), and the serving image, and the training and deployment pipelines are separated because they have different triggers, durations, hardware requirements and failure modes.',

    codeExamples: [
      {
        language: 'yaml',
        title: 'A real GitHub Actions workflow for a model service',
        code: `name: ci

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true          # a new push supersedes the running job

jobs:
  quality:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip
          cache-dependency-path: requirements-dev.txt

      - name: Install
        run: pip install -r requirements-dev.txt

      - name: Lint
        run: ruff check . && ruff format --check .

      - name: Type check
        run: mypy src/

      - name: Unit and contract tests
        run: pytest -q --cov=src --cov-report=term-missing --cov-fail-under=80

      - name: Validate data schema on a sample
        run: python -m src.data.validate --sample data/sample.parquet

  image:
    needs: quality
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: \${{ github.event_name == 'push' }}
          tags: ghcr.io/acme/churn:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
        explanation:
          'Four details separate this from a toy workflow. `concurrency` with `cancel-in-progress` stops five queued runs piling up when somebody pushes five times in a minute. The dependency cache is keyed on the lockfile, so a run that changes no dependencies skips installation entirely. The image is tagged with `github.sha`, never `latest`, so every deployed artifact is traceable to one exact commit and rollback is unambiguous. And the image job `needs: quality`, so a lint failure costs seconds rather than a full container build.',
      },
      {
        language: 'python',
        title: 'The tests that are specific to machine learning',
        code: `import pandas as pd
import pytest
from sklearn.metrics import roc_auc_score

from src.data.schema import validate_frame
from src.model import load_candidate, load_production


def test_input_schema_and_ranges():
    """Data tests: upstream can break you without a single code change."""
    df = pd.read_parquet("data/sample.parquet")
    validate_frame(df)                                   # types and required columns
    assert df["age"].between(18, 120).all()
    assert df["monthly_charges"].ge(0).all()
    assert df["tenure_months"].isna().mean() < 0.01      # null rate guard
    assert df["customer_id"].is_unique


def test_training_smoke_runs_end_to_end(tmp_path):
    """Two epochs on 500 rows. Proves the pipeline runs, not that it is good."""
    from src.train import train
    metrics = train(rows=500, epochs=2, out_dir=tmp_path)
    assert (tmp_path / "model.joblib").exists()
    assert 0.0 <= metrics["auc"] <= 1.0


def test_candidate_does_not_regress_against_production():
    """The gate. A green test suite does not mean a better model."""
    eval_df = pd.read_parquet("data/holdout.parquet")     # fixed, versioned, never trained on
    y = eval_df.pop("churned")

    candidate_auc = roc_auc_score(y, load_candidate().predict_proba(eval_df)[:, 1])
    production_auc = roc_auc_score(y, load_production().predict_proba(eval_df)[:, 1])

    assert candidate_auc >= production_auc - 0.005, (
        f"candidate {candidate_auc:.4f} < production {production_auc:.4f}"
    )
    assert candidate_auc >= 0.78, "absolute floor breached"


@pytest.mark.parametrize("segment", ["retail", "business", "under_25", "over_65"])
def test_no_segment_regresses_badly(segment):
    """Aggregate metrics hide harm to small groups."""
    df = pd.read_parquet(f"data/holdout_{segment}.parquet")
    y = df.pop("churned")
    auc = roc_auc_score(y, load_candidate().predict_proba(df)[:, 1])
    assert auc >= 0.70, f"{segment} regressed to {auc:.3f}"`,
        explanation:
          'These four tests cover the failure modes ordinary software tests cannot see. The data test catches an upstream schema change that would otherwise poison training silently. The smoke test proves the training code still runs end to end without spending GPU hours. The regression gate is the crucial one: it compares candidate against incumbent on a fixed holdout, with a small tolerance so noise does not block every release, plus an absolute floor. The per-segment test exists because a model can improve overall while getting materially worse for a subgroup, which an aggregate AUC will never reveal.',
      },
      {
        language: 'yaml',
        title: 'Deployment: build once, promote with a canary',
        code: `name: cd

on:
  workflow_run:
    workflows: [ci]
    types: [completed]
    branches: [main]

jobs:
  deploy:
    if: \${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: production          # requires a human approval in repo settings
    steps:
      - name: Deploy canary at 5%
        run: |
          ./scripts/deploy.sh --image ghcr.io/acme/churn:\${{ github.sha }} \\
                              --weight 5

      - name: Watch canary metrics for 10 minutes
        run: |
          ./scripts/check_canary.py \\
            --max-error-rate 0.01 \\
            --max-p95-ms 250 \\
            --max-psi 0.2 \\
            --window 10m

      - name: Promote to 100%
        run: ./scripts/deploy.sh --image ghcr.io/acme/churn:\${{ github.sha }} --weight 100

      - name: Roll back on failure
        if: failure()
        run: ./scripts/deploy.sh --rollback`,
        explanation:
          'The artifact is built once in CI and only promoted here — never rebuilt — so the bytes that were tested are the bytes that ship. The canary step is where ML-specific judgement lives: it checks error rate and latency like any service, and also the PSI of the prediction distribution, because a model can be fast, healthy and returning 200 for every request while its outputs have shifted into nonsense. The `if: failure()` rollback matters more than the happy path; a deployment strategy without an automatic revert is just optimism.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A retraining job that silently shipped a worse model',
        usage:
          'A weekly retraining pipeline deployed automatically on completion. An upstream change made a key feature all-null, AUC fell from 0.91 to 0.74, every test passed because the code was fine, and the regression was found eleven days later in a business review. A performance gate comparing against the incumbent would have failed the run in minutes.',
      },
      {
        context: 'Shadow mode before a framework migration',
        usage:
          'A team rewrote a ranking model from XGBoost to a neural network. They ran it in shadow for two weeks, comparing predictions on identical live traffic, and discovered a feature-scaling bug that affected only the long tail of session lengths — invisible in offline evaluation because the holdout under-represented long sessions.',
      },
      {
        context: 'CI as the thing that makes review useful',
        usage:
          'Before CI, reviews were full of formatting and typo comments. After adding `ruff` and `mypy` to the pull-request checks, the same reviewers started commenting on data leakage and error handling, because the machine had already taken the mechanical work off their plate.',
      },
    ],

    projectConnections: [
      { tool: 'GitHub Actions', role: 'Runs the checks on every pull request and builds the tagged image on every merge.' },
      { tool: 'ruff / mypy / pytest', role: 'The three fast gates: style, types, behaviour. Ordered cheapest-first so failures arrive quickly.' },
      { tool: 'Great Expectations / pandera', role: 'Expresses data assertions as testable rules so upstream breakage fails the pipeline rather than the model.' },
      { tool: 'MLflow model registry', role: 'Holds candidate and production models so a gate can load both and compare them on the same holdout.' },
      { tool: 'Argo Rollouts / Flagger', role: 'Implements canary and blue-green traffic shifting with automated metric analysis and rollback.' },
    ],

    commonMistakes: [
      {
        mistake: 'Deploying a retrained model automatically because the pipeline succeeded',
        why: 'Pipeline success means the code ran, not that the model is good. Data drift, a broken feature or a bad sample can produce a materially worse model while every stage reports green.',
        fix: 'Insert an evaluation gate between training and promotion: candidate must match or beat the incumbent on a fixed, versioned holdout, plus an absolute floor and per-segment checks.',
      },
      {
        mistake: 'Rebuilding the image in the deployment pipeline',
        why: 'A rebuild can resolve different dependency versions or pick up a different base image, so what ships is not what was tested. It also wastes minutes on every deploy.',
        fix: 'Build once in CI, tag with the commit SHA, push, and have every later environment promote that exact digest.',
      },
      {
        mistake: 'Evaluating the candidate on a holdout that changes each run',
        why: 'If the evaluation set is resampled every time, a metric difference between candidate and incumbent confounds model change with data change, so the gate measures noise.',
        fix: 'Version the holdout, keep it fixed between comparisons, and change it deliberately as its own reviewed event. Report confidence intervals so tiny differences are not treated as signal.',
      },
      {
        mistake: 'Tagging images `latest`',
        why: 'The tag is mutable, so "which version is running?" has no reliable answer and a rollback has nothing specific to roll back to. Two nodes pulling `latest` an hour apart can run different code.',
        fix: 'Tag with the immutable commit SHA and deploy by digest. Keep `latest` as a convenience alias at most, never as a deployment target.',
      },
      {
        mistake: 'A CI suite that takes forty minutes',
        why: 'Developers stop waiting for it, start merging on a hopeful glance, and the feedback loop the whole practice depends on disappears.',
        fix: 'Order checks cheapest-first, cache dependencies on the lockfile hash, parallelise test jobs, and move anything genuinely long — full training, large integration suites — to a nightly or on-demand workflow.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is different about CI for a machine learning project compared with ordinary software?',
        answer:
          'The artifact set is bigger. Ordinary CI verifies code; ML CI must also verify data and the model, because both can break with the code untouched. So alongside lint, types and unit tests I add data validation — schema, ranges, null rates, cardinality of categoricals, unexpected new categories — and a training smoke test that runs the pipeline on a tiny sample to prove it still executes. The stage with no software equivalent is the model performance gate: the candidate is evaluated on a fixed, versioned holdout and must match or beat the current production model, with an absolute floor and per-segment checks so improvements in aggregate cannot hide regressions for a subgroup. The other structural difference is that training and deployment are separate pipelines with different triggers, durations and hardware, and a training run ends by registering a candidate rather than by deploying it.',
        followUp:
          'A strong answer mentions that ML CI also needs determinism work — pinned seeds, fixed data snapshots — otherwise the gate flaps and the team learns to ignore it.',
      },
      {
        level: 'ml-engineer',
        question: 'Compare blue-green, canary and shadow deployment for shipping a new model, and say which you would choose.',
        answer:
          'Blue-green stands up a complete second environment, verifies it, then switches all traffic at once; rollback is a switch back, so recovery is fast, but every user is exposed simultaneously to whatever you failed to catch. Canary routes a small percentage — 1%, then 5%, then 25% — with automated checks on error rate, latency and prediction distribution at each step and an automatic revert on regression, so blast radius is bounded and you learn from real traffic. Shadow sends a copy of live traffic to the new model and logs its predictions without ever returning them, so user risk is zero, at the cost of doubled inference and no signal about downstream business effect. For a routine retrain of an existing architecture I use a canary, because the offline gate has already covered the predictable failures and I mainly want a bounded real-traffic check. For a rewrite or an architecture change I run shadow first for a week to compare prediction distributions and latency on real data, then canary the winner. Whichever I choose, the non-negotiable parts are an immutable artifact, an automated rollback trigger, and a metric that would actually detect the failure.',
        followUp:
          'The strongest answers add that for models the canary metric must include prediction distribution and not just HTTP health, because a broken model returns 200s all day.',
      },
      {
        level: 'ml-engineer',
        question: 'Why should the training pipeline be separate from the deployment pipeline?',
        answer:
          'Because they differ in every operational dimension. Training is triggered by new data, a schedule or an experiment; deployment is triggered by a merge or a promotion decision. Training runs for hours on expensive, often GPU, hardware; deployment runs for minutes on cheap runners. Training failures mean "we have no new candidate", which is usually tolerable; deployment failures mean "users are affected", which is not. Keeping them separate lets you deploy a code fix to the serving layer without retraining, retrain without deploying, and roll back the served model in seconds by repointing at a previous registered version rather than by rerunning a six-hour job. It also makes the promotion decision explicit: training ends by registering a candidate with its evaluation report, and a separate gated pipeline decides whether that candidate becomes production.',
        followUp:
          'Mentioning that this separation is what makes model rollback independent of code rollback shows the candidate has thought about incident response, not just happy-path architecture.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Write the failing condition for a model performance gate that will not block releases because of ordinary noise, and justify each number.',
        hint: 'You need a comparison, a tolerance, a floor, and something about subgroups.',
        language: 'python',
        solution:
          'Fail if `candidate_auc < production_auc - 0.005`, or if `candidate_auc < 0.78`, or if any monitored segment\'s AUC drops below 0.70. The tolerance exists because evaluating two models on a finite holdout has sampling noise; 0.005 should be chosen from the observed run-to-run standard deviation on your holdout rather than picked from the air, and ideally you would compare confidence intervals instead. The absolute floor catches the case where production has already degraded, so "no worse than production" is no longer a sufficient bar. The per-segment check exists because an aggregate improvement can hide a serious regression for a minority group. Add a guard that the holdout hash is unchanged, otherwise the comparison is meaningless.',
      },
      {
        prompt:
          'Your CI takes 38 minutes and people have started merging without waiting. List, in order of payoff, what you would change.',
        hint: 'Think about what runs, in what order, and how often it needs to run at all.',
        solution:
          'One: reorder so the cheapest checks run first and fail fast — lint and type check in under a minute before anything heavy starts. Two: cache dependencies keyed on the lockfile hash, and cache Docker layers with the GitHub Actions cache backend, which usually removes most of the install and build time. Three: parallelise into separate jobs that run concurrently rather than one long sequential job, and shard the test suite. Four: move genuinely long work off the pull-request path — full training runs, large integration suites, nightly performance benchmarks — to scheduled workflows, keeping only a smoke-sized version in CI. Five: add `concurrency` with `cancel-in-progress` so superseded runs stop consuming runners. The target is under ten minutes for the pull-request path, because that is roughly the limit of a developer\'s patience.',
      },
      {
        prompt:
          'Design the canary check for a fraud model: which three signals would you monitor over the first ten minutes at 5% traffic, and what threshold aborts the rollout?',
        hint: 'One signal is about the service, one about the predictions, one about the business.',
        solution:
          'Service health: 5xx rate on the canary against the baseline — abort if it exceeds 1% or doubles relative to the stable version. Prediction behaviour: the distribution of fraud scores compared with the stable version over the same window, using PSI with an abort above 0.2, plus the alert rate — abort if the fraction flagged moves by more than, say, 30% relative, because a model that suddenly flags five times as many transactions will swamp the review queue regardless of whether it is technically better. Business proxy: the downstream approval rate or the manual-review queue depth, which reacts within minutes even though true fraud labels take weeks. The label delay is precisely why the canary cannot gate on model accuracy and must gate on distributions and proxies instead.',
      },
    ],

    quiz: [
      {
        id: 'OPS-008-q1',
        type: 'mcq',
        concept: 'ML-specific CI',
        prompt: 'Which check exists in an ML pipeline but has no equivalent in ordinary software CI?',
        options: [
          'A gate comparing the candidate model against the production model on a fixed holdout',
          'Running unit tests on every pull request',
          'Type checking the source',
          'Building a container image tagged with the commit SHA',
        ],
        answerIndex: 0,
        explanation:
          'Code tests answer "does it do what I said?". Only an evaluation gate answers "is this model better than the one we already have?", which is the question that actually determines whether shipping is safe.',
      },
      {
        id: 'OPS-008-q2',
        type: 'truefalse',
        concept: 'artifact immutability',
        prompt: 'It is good practice for the deployment pipeline to rebuild the image from source before releasing.',
        answer: false,
        explanation:
          'A rebuild can resolve different dependencies or a different base image, so what ships is not what was tested. Build once in CI, tag with the commit SHA, and promote that exact digest through every environment.',
      },
      {
        id: 'OPS-008-q3',
        type: 'match',
        concept: 'release strategies',
        prompt: 'Match each deployment strategy to its defining property.',
        pairs: [
          { left: 'Blue-green', right: 'Two full environments; all traffic switches at once, rollback is a switch back' },
          { left: 'Canary', right: 'A small traffic percentage first, with automated checks and progressive promotion' },
          { left: 'Shadow', right: 'Real traffic is duplicated to the new model but its predictions are never returned' },
          { left: 'Rolling', right: 'Instances are replaced gradually, so both versions serve simultaneously' },
        ],
        explanation:
          'They trade blast radius against cost and against how much real-world signal you get before full exposure. Shadow gives the most signal with zero user risk but doubles inference cost and tells you nothing about downstream effects.',
      },
      {
        id: 'OPS-008-q4',
        type: 'order',
        concept: 'pipeline ordering',
        prompt: 'Order these CI stages so the cheapest failure is discovered first.',
        items: [
          'Lint and format check',
          'Type check',
          'Unit and contract tests',
          'Data validation on a sample',
          'Build and push the container image',
        ],
        explanation:
          'Fail fast. A lint failure should cost seconds, not the minutes a container build takes. Ordering cheapest-first is the single easiest way to shorten the average feedback loop.',
      },
      {
        id: 'OPS-008-q5',
        type: 'multi',
        concept: 'canary metrics for models',
        prompt: 'Which signals should abort a model canary? Select all that apply.',
        options: [
          'A jump in the 5xx error rate',
          'p95 latency exceeding the budget',
          'Prediction distribution PSI above 0.2 against the stable version',
          'A large relative change in the fraction of positive predictions',
          'Offline AUC measured on last quarter\'s holdout',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'The offline metric was already checked before the rollout and does not change during it. Canary checks must be live signals, and for a model that means prediction distribution as well as service health — a broken model returns 200 for every request.',
      },
      {
        id: 'OPS-008-q6',
        type: 'explain',
        concept: 'separation of pipelines',
        prompt: 'Explain why a successful training run should not deploy the model automatically.',
        rubric: [
          'Distinguishes "the code ran" from "the model is good"',
          'Names a concrete way a green pipeline produces a worse model',
          'Describes the gate or promotion step that should sit in between',
        ],
        sampleAnswer:
          'A training pipeline reports success when the code executed without raising, which says nothing about quality. If an upstream change made a feature all-null, or the sampling window caught an anomalous week, or a join silently dropped half the positive examples, the run still completes and produces a model that is materially worse. Deploying on completion therefore ships regressions automatically and quietly, and because model quality in production is often only measurable once labels arrive, nobody notices for weeks. The fix is to make the training pipeline end by registering a candidate together with its evaluation report, and to put a separate gated promotion step in between: the candidate must match or beat the incumbent on a fixed, versioned holdout, clear an absolute floor, and not regress on monitored segments. Only then does the deployment pipeline roll it out, progressively, with an automatic rollback.',
        explanation:
          'The core idea is that pipeline success and model quality are different claims, and only an explicit evaluation gate connects them.',
      },
    ],

    flashcards: [
      { front: 'What does CI check that ordinary tests do not, in ML?', back: 'Data validity (schema, ranges, null rates) and model quality against the incumbent on a fixed holdout — code can be correct while the model is worse.' },
      { front: 'Why tag images with the commit SHA rather than `latest`?', back: '`latest` is mutable, so nothing identifies what is running and a rollback has no specific target. The SHA makes the artifact traceable and immutable.' },
      { front: 'Blue-green vs canary vs shadow', back: 'Blue-green: switch everyone at once, revert instantly. Canary: small traffic slice with automated checks. Shadow: duplicate traffic, predictions logged but never returned.' },
      { front: 'Why separate training and deployment pipelines?', back: 'Different triggers, durations, hardware and failure consequences — and it lets you roll the model back in seconds without rerunning a six-hour job.' },
      { front: 'What should a model performance gate assert?', back: 'Candidate at least matches the incumbent on a fixed versioned holdout within a noise tolerance, clears an absolute floor, and does not regress on monitored segments.' },
      { front: 'Why does a model canary need distribution checks?', back: 'Because a broken model keeps returning HTTP 200. Error rate and latency look perfect while the predictions have shifted into nonsense.' },
    ],

    challenge: {
      title: 'A pipeline that refuses a worse model',
      brief:
        'Add a complete CI workflow to a model repository: lint, type check, tests with a coverage floor, data validation on a sample, and an image build tagged with the commit SHA. Then add the ML gate — a test that loads a candidate and the current production model, evaluates both on a fixed, version-controlled holdout, and fails when the candidate regresses beyond a tolerance you justify in a comment. Prove it works by deliberately training a worse model and showing the pipeline goes red, then by showing that an equal-or-better model passes.',
      language: 'yaml',
      acceptanceCriteria: [
        'The workflow runs on every pull request and completes in under ten minutes',
        'Checks are ordered cheapest-first and dependencies are cached on the lockfile hash',
        'A data validation step asserts schema, ranges and null rates',
        'A performance gate compares candidate against production on a fixed holdout with a justified tolerance and an absolute floor',
        'A deliberately degraded model makes the pipeline fail, demonstrated in the run log',
        'The image is tagged with the commit SHA and never with `latest`',
      ],
      starterCode: 'name: ci\n\non:\n  pull_request:\n  push:\n    branches: [main]\n\njobs:\n',
    },

    teachingPrompt: {
      prompt:
        'Explain CI/CD to a data scientist who currently trains models in a notebook and emails the pickle file. Cover what the robot checks, what is different for ML, and how a model gets safely into production.',
      mustCover: [
        'CI runs automatically on every proposed change and blocks merge on failure',
        'ML adds data validation, training smoke tests and a model performance gate',
        'Training and deployment are separate pipelines with different triggers and durations',
        'Progressive rollout with an automatic rollback bounds the damage of a bad model',
      ],
      bonusSignals: ['mentions building the artifact once and promoting the same digest', 'mentions that a broken model still returns 200', 'mentions per-segment evaluation'],
      sampleExplanation:
        'CI is a robot that runs on every proposed change: it installs the dependencies, checks formatting and types, runs the tests and builds the container image, and it reports in the pull request before a human merges anything. The value is the speed of the loop — a mistake found two minutes after you make it is trivial, and the same mistake found in production three weeks later is a day of work and an apology. Machine learning needs two extra things on top. First, the data has to be tested, because upstream can break you without a single line of your code changing: schema, value ranges, null rates, unexpected new categories. Second, and this has no equivalent in ordinary software, a candidate model has to be compared against the model currently in production on a fixed evaluation set, with a floor and per-segment checks, because code tests can all pass while the new model is simply worse. That is why training and deployment are two pipelines: training runs for hours when new data arrives and ends by registering a candidate, while deployment takes an already-tested image and rolls it out in minutes. And the rollout itself is progressive — send 5% of traffic to the new version, watch the error rate, the latency and the shape of the prediction distribution, promote if all three hold and revert automatically if they do not.',
    },
  },

  {
    id: 'OPS-009',
    domain: 'OPS',
    module: 'Packaging & Delivery',
    topic: 'Cloud',
    title: 'Deployment and Cloud Concepts',
    slug: 'deployment-and-cloud',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['OPS-007'],
    related: ['OPS-005', 'OPS-008'],
    tags: ['cloud', 'serverless', 'kubernetes', 'batch', 'edge', 'gpu', 'autoscaling', 'cost'],

    learningObjectives: [
      'List the five places a model can run — server, container platform, serverless, batch, edge — and the trade-offs of each',
      'Reason about the cost, latency and scale triangle rather than reaching for a default',
      'Explain cold starts, autoscaling and why a GPU instance is usually the wrong first choice',
      'Describe what a managed inference endpoint gives you and what it takes away',
      'Recognise the cloud vocabulary an intern is expected to understand in a design discussion',
    ],

    terminology: [
      {
        term: 'Serverless',
        definition:
          'A model where you supply a function or container and the provider handles provisioning, scaling and idle capacity, billing per request and per unit of compute time. Instances are created on demand, which causes cold starts.',
        simple: 'You give them the code; they worry about the machines, and you pay only when it runs.',
      },
      {
        term: 'Cold start',
        definition:
          'The latency penalty when a request arrives with no warm instance available: the platform must start a container, import the runtime and load the model before serving. For large ML images this is seconds, not milliseconds.',
        simple: 'The wait while a new copy of your service wakes up.',
      },
      {
        term: 'Horizontal vs vertical scaling',
        definition:
          'Horizontal scaling adds more instances; vertical scaling makes one instance bigger. Stateless services scale horizontally almost without limit, which is why keeping a service stateless matters.',
        simple: 'More machines, versus a bigger machine.',
      },
      {
        term: 'Batch inference',
        definition:
          'Scoring a large set of records on a schedule and writing results to a store that applications read. Latency is measured in minutes or hours and cost per prediction is far lower than online serving.',
        simple: 'Score everyone overnight and look up the answer during the day.',
      },
      {
        term: 'Managed inference endpoint',
        definition:
          'A provider service — SageMaker Endpoints, Vertex AI Endpoints, Azure ML Online Endpoints — that hosts a model artifact behind an autoscaling HTTPS endpoint with built-in versioning, traffic splitting and monitoring hooks.',
        simple: 'A hosted box you hand a model to, which gives you back a URL.',
      },
      {
        term: 'Edge deployment',
        definition:
          'Running the model on the device that generates the data — phone, browser, camera, vehicle — so inference needs no network round trip and data need not leave the device.',
        simple: 'The model runs on the thing in your hand instead of in a data centre.',
      },
    ],

    simpleExplanation:
      "Once your model is in a container, the question becomes where to run it, and there is no single right answer. Five options cover almost everything. A plain virtual machine is the simplest: you rent a computer, run the container and manage it yourself, which is cheap and predictable and entirely your problem when it falls over. A container platform such as Kubernetes or ECS runs many containers across many machines, restarts unhealthy ones and scales them, at the cost of real operational complexity. Serverless runs your container only when a request arrives and charges you nothing while idle, which is wonderful for spiky low-volume traffic and awkward for a two-gigabyte model that takes fifteen seconds to load. Batch does not serve requests at all: it scores everything on a schedule and stores the answers for applications to look up, which is by far the cheapest option when a prediction does not have to be fresh. And edge puts the model on the device itself, so there is no network at all. The choice is driven by three things in tension — how fast the answer must come back, how much traffic there is, and what you are willing to pay.",

    whyItExists:
      'A model in a container still has to run somewhere, and the options differ by orders of magnitude in cost, latency and operational burden. Cloud platforms exist so that capacity can be rented by the minute and scaled with demand instead of bought in advance, and the various deployment shapes exist because a fraud check needed in 40 milliseconds and a churn score needed once a week are completely different engineering problems that only look similar on a whiteboard.',

    analogy: {
      scenario:
        "Think about how a city feeds people. A restaurant with a permanent kitchen and staff is always ready and expensive even when empty. A food truck appears only where there is demand and packs up when there is none, but takes time to set up each morning. A central commissary cooks ten thousand meals overnight and distributes them to shops, so the food is cheap per portion but was made hours ago. And a home kitchen serves exactly one household instantly with no delivery at all.",
      mapping: [
        { from: 'The permanent restaurant', to: 'An always-on server or container platform deployment' },
        { from: 'The food truck that packs up when idle', to: 'Serverless, with a cold start as the set-up time' },
        { from: 'The overnight commissary', to: 'Batch inference, cheap per prediction and hours stale' },
        { from: 'The home kitchen', to: 'Edge inference on the user\'s device' },
        { from: 'Opening a second restaurant at rush hour', to: 'Horizontal autoscaling' },
      ],
      bridge:
        'The mapping holds because each option trades the same three quantities: readiness, cost per unit, and freshness. Concretely, an always-on deployment gives you 20 ms p99 and a bill that arrives whether or not anyone called you; serverless inverts that, giving you a near-zero idle bill and a multi-second first request; batch drives cost per prediction down by orders of magnitude and gives you an answer computed last night. The engineering skill is not knowing which is best — none is — but stating the latency, volume and freshness requirements precisely enough that the choice becomes obvious.',
      limitations:
        'Food gets cold in ways predictions do not, and a commissary cannot serve a dish that depends on what the customer just said. That last point is the real constraint on batch: it only works when the features are known in advance.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Where a model can run',
        columns: ['Option', 'Latency', 'Cost shape', 'Operational burden', 'Good for'],
        rows: [
          ['Virtual machine', 'Low and predictable', 'Pay for the machine, idle or not', 'You patch, restart and scale it', 'One service, steady traffic, a small team'],
          ['Container platform (K8s, ECS)', 'Low', 'Pay for the cluster', 'High: nodes, autoscaling, networking', 'Many services, real scale, a platform team'],
          ['Serverless (Lambda, Cloud Run)', 'Low when warm, seconds when cold', 'Per request; near zero when idle', 'Low', 'Spiky or low-volume traffic, small models'],
          ['Managed endpoint (SageMaker, Vertex)', 'Low', 'Per instance-hour, usually at a premium', 'Low to medium', 'Teams wanting versioning and traffic splitting without building it'],
          ['Batch job', 'Minutes to hours', 'Lowest per prediction by far', 'Low', 'Predictions that do not have to be fresh'],
          ['Edge / on-device', 'No network at all', 'Free at inference time', 'Distribution and update problems', 'Privacy, offline use, camera and phone workloads'],
        ],
      },
      {
        kind: 'flow',
        title: 'Choosing where to deploy',
        caption: 'Answer these in order and the choice usually makes itself.',
        branching: true,
        steps: [
          { label: 'Must the prediction reflect what just happened?', detail: 'If not, batch score on a schedule and serve from a lookup. This is the cheapest correct answer and is skipped far too often.' },
          { label: 'Is the traffic spiky or low volume?', detail: 'If yes and the model is small, serverless removes idle cost — provided a cold start of seconds is acceptable.' },
          { label: 'Does the data have to stay on the device?', detail: 'Privacy, offline operation or per-frame video argue for edge inference with a quantised model.' },
          { label: 'Is sustained traffic high and latency tight?', detail: 'Then always-on instances behind a load balancer, on a VM, a container platform or a managed endpoint.' },
          { label: 'Do you genuinely need a GPU?', detail: 'Measure on CPU first. Most tabular and small-model workloads are cheaper and simpler on CPU.' },
        ],
      },
      {
        kind: 'compare',
        title: 'GPU versus CPU inference',
        caption: 'The default should be CPU until measurement says otherwise.',
        left: {
          heading: 'CPU inference',
          points: [
            'Cheap, abundant, no driver or CUDA compatibility problems',
            'Ideal for tree models, linear models and small networks',
            'Scales horizontally with trivially cheap instances',
            'Often faster end-to-end for small batches, since GPU transfer costs dominate',
          ],
        },
        right: {
          heading: 'GPU inference',
          points: [
            'Wins on large neural networks and large batches',
            'Ten to thirty times the hourly cost of a comparable CPU instance',
            'Needs batching to be utilised; a single request wastes most of the device',
            'Adds driver, CUDA and image-size complexity to every deploy',
          ],
        },
      },
      {
        kind: 'annotated',
        title: 'Cloud vocabulary you are expected to recognise',
        subject: 'region · availability zone · VPC · load balancer · autoscaling group · object storage · IAM role · managed database',
        annotations: [
          { part: 'Region / availability zone', note: 'A geographic location, subdivided into independent data centres. Spreading instances across zones survives one going down.' },
          { part: 'VPC', note: 'Your private network inside the cloud. Services that should not face the internet live here with no public address.' },
          { part: 'Load balancer', note: 'Distributes requests across healthy instances, using your readiness probe to decide which ones count.' },
          { part: 'Autoscaling group', note: 'Adds and removes instances against a target metric such as CPU utilisation or requests per instance.' },
          { part: 'Object storage (S3, GCS)', note: 'Cheap durable blob storage. Where model artifacts, datasets and prediction logs actually belong.' },
          { part: 'IAM role', note: 'Identity granting scoped permissions to a service. The correct alternative to putting long-lived keys in environment variables.' },
        ],
      },
    ],

    formalDefinition:
      'Model deployment is the selection and operation of an execution substrate that satisfies a workload\'s latency, throughput, freshness, privacy and cost constraints. Substrates differ along three axes: provisioning model (always-on capacity versus on-demand instantiation), locality (centralised versus on-device), and invocation pattern (synchronous request-response versus scheduled bulk scoring). Autoscaling policies map an observed load signal to instance count, subject to a start-up latency that bounds how quickly capacity can respond to a change in demand.',

    codeExamples: [
      {
        language: 'bash',
        title: 'The same image on three substrates',
        code: `# 1. A plain virtual machine: you own the lifecycle
ssh deploy@api-1.internal
docker pull ghcr.io/acme/churn:9f2c1a7
docker run -d --restart=always -p 8000:8000 --memory=2g ghcr.io/acme/churn:9f2c1a7

# 2. Serverless containers (Cloud Run): scales to zero, pay per request
gcloud run deploy churn \\
  --image ghcr.io/acme/churn:9f2c1a7 \\
  --region europe-west1 \\
  --cpu 2 --memory 2Gi \\
  --min-instances 1 \\          # 1, not 0: keeps one warm, removes the cold start
  --max-instances 50 \\
  --concurrency 8 \\            # requests per instance before a new one starts
  --allow-unauthenticated

# 3. A managed inference endpoint (SageMaker), with traffic split for a canary
aws sagemaker create-endpoint-config \\
  --endpoint-config-name churn-2024-09 \\
  --production-variants \\
    VariantName=stable,ModelName=churn-2024-08,InitialInstanceCount=2,InstanceType=ml.m5.large,InitialVariantWeight=95 \\
    VariantName=canary,ModelName=churn-2024-09,InitialInstanceCount=1,InstanceType=ml.m5.large,InitialVariantWeight=5`,
        explanation:
          'One image, three substrates, three very different bills and operational stories. The single most consequential flag here is `--min-instances 1`: scaling to zero is what makes serverless cheap, and it is also what produces a ten-second first request while a 400 MB model is loaded. Keeping one instance warm costs a few pounds a month and removes the worst-case latency entirely, which is almost always the right trade for a user-facing endpoint.',
      },
      {
        language: 'python',
        title: 'Batch inference: the option people forget',
        code: `"""Nightly scoring job. Runs for 12 minutes, costs pennies, serves all day."""
import pandas as pd, joblib
from datetime import date

model = joblib.load("models/churn.joblib")

customers = pd.read_parquet("s3://acme-lake/customers/current/")     # 4.2M rows
features = customers[["tenure_months", "monthly_charges", "contract_code"]]

# One vectorised call over the whole table, not 4.2M HTTP requests.
customers["churn_probability"] = model.predict_proba(features)[:, 1]
customers["scored_on"] = date.today().isoformat()
customers["model_version"] = "churn-2024-09-02"

customers[["customer_id", "churn_probability", "scored_on", "model_version"]].to_parquet(
    f"s3://acme-lake/scores/churn/dt={date.today():%Y-%m-%d}/", index=False
)
# Applications now read a score with a key lookup: sub-millisecond and free.`,
        explanation:
          'Scoring 4.2 million customers here costs roughly what a single hour of a small always-on endpoint costs, and every application read afterwards is a key lookup rather than an inference. The question that decides whether this is legitimate is freshness: if the features only change daily — tenure, plan, last month\'s usage — then a nightly score is exactly as good as an online one and hundreds of times cheaper. If the features include what the user did four seconds ago, batch cannot work and you need online serving.',
      },
      {
        language: 'yaml',
        title: 'Autoscaling that accounts for model start-up time',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: churn
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: ghcr.io/acme/churn:9f2c1a7
          resources:
            requests: { cpu: "1", memory: "1Gi" }     # what the scheduler reserves
            limits:   { cpu: "2", memory: "2Gi" }     # exceeding memory gets you killed
          readinessProbe:
            httpGet: { path: /ready, port: 8000 }
            periodSeconds: 5
          startupProbe:                                # model takes ~30s to load
            httpGet: { path: /health, port: 8000 }
            failureThreshold: 30
            periodSeconds: 2
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: churn
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: churn }
  minReplicas: 3
  maxReplicas: 30
  metrics:
    - type: Pods
      pods:
        metric: { name: requests_per_second }
        target: { type: AverageValue, averageValue: "40" }
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 30        # react quickly to a traffic spike
    scaleDown:
      stabilizationWindowSeconds: 300       # shrink slowly, to avoid flapping`,
        explanation:
          'Three ML-specific details. The `startupProbe` exists because a 30-second model load would otherwise trip the liveness probe and restart the pod forever. The memory limit is a hard kill, so it must account for the model plus per-worker copies, which is the usual cause of a container being terminated mysteriously under load. And the asymmetric scaling behaviour reflects reality: scaling up late means dropped requests, while scaling down late merely costs a little money, so you make it eager to grow and reluctant to shrink.',
      },
    ],

    realWorldExamples: [
      {
        context: 'A GPU endpoint at 3% utilisation',
        usage:
          'A team deployed a gradient-boosted tree model on a GPU instance "because it is machine learning". The model ran faster on two CPU cores, the GPU sat idle, and the bill was about fifteen times higher. Measuring CPU latency first would have taken an afternoon and saved the annual cost of an engineer.',
      },
      {
        context: 'Cold starts breaking an SLA',
        usage:
          'A serverless endpoint holding a 1.2 GB transformer scaled to zero overnight. The first request each morning took eleven seconds and blew the 500 ms budget. Setting a minimum of one warm instance fixed it for a few pounds a month.',
      },
      {
        context: 'Batch replacing a real-time service',
        usage:
          'A recommendation endpoint served 300 requests per second from always-on instances. Because the recommendations only used features that changed daily, the team switched to overnight batch scoring into a key-value store; latency fell to a lookup, and the monthly compute bill dropped by more than 90%.',
      },
    ],

    projectConnections: [
      { tool: 'Cloud Run / AWS Lambda', role: 'Serverless container hosting, where scale-to-zero and cold starts are the central trade.' },
      { tool: 'Kubernetes', role: 'Scheduling, health checking, autoscaling and progressive rollout for services that justify the complexity.' },
      { tool: 'SageMaker / Vertex AI endpoints', role: 'Managed hosting with built-in model versioning, traffic splitting and capture of request and response payloads.' },
      { tool: 'S3 / GCS', role: 'Where model artifacts, datasets and prediction logs live, because object storage is cheap, durable and versioned.' },
      { tool: 'ONNX Runtime / Triton', role: 'Faster inference from the same trained model, often removing the need for a GPU entirely.' },
    ],

    commonMistakes: [
      {
        mistake: 'Reaching for a GPU before measuring CPU latency',
        why: 'GPUs help on large neural networks with large batches. For tree models, linear models and small networks the data-transfer overhead often makes them slower end to end, while costing ten to thirty times as much per hour.',
        fix: 'Benchmark on CPU with realistic batch sizes first. Try ONNX Runtime or quantisation before changing hardware, and move to GPU only when a measurement — not an intuition — demands it.',
      },
      {
        mistake: 'Choosing serverless for a large model and being surprised by latency',
        why: 'Scale-to-zero means the first request after idleness pays container start plus runtime import plus model load, which for a multi-gigabyte artifact is many seconds.',
        fix: 'Keep a minimum number of warm instances, shrink the image and the model, load lazily from a mounted cache, or use an always-on substrate if the latency budget is tight.',
      },
      {
        mistake: 'Building a real-time endpoint for predictions nobody needs in real time',
        why: 'Online serving is the most expensive and most operationally demanding option. If the features only change daily, an always-on endpoint buys nothing over a nightly batch job and a lookup.',
        fix: 'Ask what the freshest input feature actually is. If none of them changes within the request, batch score on a schedule and serve results from a key-value store.',
      },
      {
        mistake: 'Ignoring the memory limit when setting worker count',
        why: 'Each uvicorn worker loads its own copy of the model, so four workers with a 1.5 GB model need 6 GB plus overhead. Exceeding a container memory limit is a hard kill with no graceful shutdown.',
        fix: 'Compute memory as workers times model size plus headroom, set the limit accordingly, and load-test at the limit rather than on an unconstrained laptop.',
      },
      {
        mistake: 'Putting long-lived cloud keys in environment variables',
        why: 'They leak through logs, images and error reports, they rarely get rotated, and they usually carry far more permission than the service needs.',
        fix: 'Use workload identity or an instance role so credentials are short-lived and issued automatically, scoped to exactly the buckets and queues the service touches.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'A product manager asks for "real-time recommendations". What do you ask before choosing a deployment?',
        answer:
          'I would find out what real-time actually means here, because the word covers four orders of magnitude. Specifically: what is the latency budget end to end, and what happens if we exceed it? What is the request volume, at peak as well as on average? And the decisive question — which input features change within the request? If the recommendation depends only on things known this morning, such as purchase history and profile, then batch scoring overnight into a key-value store gives a sub-millisecond lookup at a fraction of the cost, and nobody can tell the difference. If it depends on the last three clicks in this session, batch cannot work and we need online serving, possibly with a feature store for the session features. I would also ask about freshness of the model itself versus freshness of the features, since they are different questions that often get conflated.',
        followUp:
          'The signal is refusing to pick a substrate before the requirements exist. Candidates who immediately say "Kubernetes" have skipped the only part of the problem that matters.',
      },
      {
        level: 'ml-engineer',
        question: 'Explain cold starts and three ways to mitigate them for an ML endpoint.',
        answer:
          'A cold start is the latency paid when a request arrives with no warm instance: the platform must schedule and start a container, import the Python runtime and libraries, and deserialise the model before any inference happens. For ML the model load usually dominates, so multi-gigabyte artifacts produce start-ups measured in seconds to tens of seconds. Three mitigations, in the order I would try them. First, keep a floor of warm instances, which turns a latency problem into a small fixed cost and is usually the right answer for anything user-facing. Second, shrink what has to load: a slim image, lazy imports, a quantised or distilled model, or a faster format such as ONNX, which can cut load time dramatically. Third, decouple the artifact from the image, pulling weights from a cached mount or a local volume so the container itself is small and start-up does not include a large download. Beyond those, provisioned concurrency and pre-warming on a predictable traffic curve help, and if none of it gets under budget that is strong evidence the workload belongs on always-on capacity.',
        followUp:
          'A good answer notes that cold starts also appear during autoscaling, so a slow-starting service is slow to respond to a traffic spike even when it never scales to zero.',
      },
      {
        level: 'ml-engineer',
        question: 'When is a managed inference endpoint worth the premium over running your own containers?',
        answer:
          'When the team is small and the features it provides would otherwise be built by hand. A managed endpoint gives you autoscaling, model versioning, traffic splitting for canaries, request and response capture for monitoring, and integration with the provider\'s model registry and IAM, all without a platform engineer. For a two-person ML team with three models, that is easily worth the two-to-three times premium on instance hours, because the alternative is spending months building a worse version. It stops being worth it at scale, where the premium becomes a large absolute number, and where you want control the platform does not give you — custom routing, unusual hardware, batching and caching layers, or running inference next to services you already operate. It is also a lock-in decision: the packaging format, the deployment API and the monitoring are provider-specific, so migrating later is real work. I would start managed, measure the bill, and move only when the numbers justify the engineering.',
        followUp:
          'The mature framing is that you are buying engineering time, so the answer depends on the cost of that time relative to the premium, not on an abstract preference.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A churn model scores 5 million customers. Business users look at the scores in a weekly dashboard. Choose a deployment and justify it with numbers.',
        hint: 'What is the freshest feature, and how often is the answer actually read?',
        language: 'bash',
        solution:
          'Batch. The features — tenure, plan, last month\'s charges — change at most daily, and the consumer reads a dashboard once a week, so an online endpoint would spend 168 hours a week idle to serve a handful of reads. A nightly job scoring 5 million rows with one vectorised call takes minutes on a single machine and writes to object storage or a warehouse table; the dashboard then queries the table. Cost is a few pence per run against hundreds of pounds a month for always-on instances, and there is no service to keep alive, patch or page anyone about. Revisit the decision only if someone needs a score for a customer who signed up an hour ago.',
      },
      {
        prompt:
          'Your serverless endpoint has a p50 of 60 ms and a p99 of 9 seconds. Explain the shape and give the cheapest fix.',
        hint: 'What is different about the requests in that top 1%?',
        solution:
          'That bimodal profile is the signature of cold starts: most requests hit a warm instance and are fast, while a small fraction arrive when no instance is available and pay container start plus imports plus model load. It correlates with idle gaps and with traffic spikes that force new instances. The cheapest fix is a minimum instance count of one or two, which typically costs a few pounds a month and removes the tail entirely for steady traffic. If spikes rather than idleness are the cause, also raise the per-instance concurrency so a burst does not immediately require new instances, and shrink the image and model so that any instance that does start comes up in a second rather than nine.',
      },
      {
        prompt:
          'Write the three questions you would put to a team that has asked for GPU inference, and say what answer would change your mind.',
        hint: 'Model size, batch size, and what has already been measured.',
        solution:
          'One: what is the measured CPU latency at your real batch size? If nobody has measured it, that is the first task, since tabular and small-model workloads are usually faster and far cheaper on CPU. Two: how large is the model and can requests be batched? A GPU is only well utilised with substantial batches; single small requests leave most of the device idle while you pay for all of it. Three: have you tried ONNX Runtime, quantisation or distillation? These routinely deliver two to five times on CPU and remove the driver, image size and cost complexity entirely. What would change my mind: a large transformer or vision model where measured CPU p95 exceeds the budget, with batching available and a throughput requirement high enough to keep the device busy — at which point GPU is not a preference but the only option that meets the requirement.',
      },
    ],

    quiz: [
      {
        id: 'OPS-009-q1',
        type: 'mcq',
        concept: 'deployment choice',
        prompt: 'Predictions are needed once a day and depend only on features that change daily. What is the most appropriate deployment?',
        options: [
          'A scheduled batch job writing scores to a store applications read',
          'An always-on autoscaling endpoint',
          'A serverless endpoint with provisioned concurrency',
          'On-device inference',
        ],
        answerIndex: 0,
        explanation:
          'Nothing in the requirement needs an answer computed at request time. Batch is orders of magnitude cheaper per prediction and leaves no service to operate, and reads become key lookups.',
      },
      {
        id: 'OPS-009-q2',
        type: 'truefalse',
        concept: 'GPU defaults',
        prompt: 'Inference for a gradient-boosted tree model should normally run on a GPU because it is a machine learning workload.',
        answer: false,
        explanation:
          'Tree models are not the workload GPUs accelerate. They typically run faster on CPU for realistic batch sizes once transfer overhead is counted, at a fraction of the hourly cost and with none of the driver complexity.',
      },
      {
        id: 'OPS-009-q3',
        type: 'match',
        concept: 'cloud vocabulary',
        prompt: 'Match each term to what it means.',
        pairs: [
          { left: 'Availability zone', right: 'An independent data centre within a region; spreading instances across zones survives one failing' },
          { left: 'VPC', right: 'A private network where services can run with no public address' },
          { left: 'Object storage', right: 'Cheap durable blob storage for artifacts, datasets and logs' },
          { left: 'IAM role', right: 'Scoped, short-lived identity for a service, instead of long-lived keys' },
          { left: 'Autoscaling group', right: 'Adds and removes instances against a target load metric' },
        ],
        explanation:
          'These five terms cover most of what an intern needs to follow a design discussion. The IAM one matters most in practice, because it is the correct alternative to putting credentials in environment variables.',
      },
      {
        id: 'OPS-009-q4',
        type: 'mcq',
        concept: 'cold starts',
        prompt: 'A serverless ML endpoint shows p50 of 50 ms and p99 of 8 seconds. What is the most likely cause?',
        options: [
          'Cold starts: some requests arrive with no warm instance and pay container start plus model load',
          'The model is uniformly slow and needs a GPU',
          'The client is not reusing connections',
          'The load balancer is misconfigured',
        ],
        answerIndex: 0,
        explanation:
          'A bimodal latency profile with a fast bulk and a multi-second tail is the classic cold-start signature. A minimum warm instance count usually removes it for a few pounds a month.',
      },
      {
        id: 'OPS-009-q5',
        type: 'multi',
        concept: 'managed endpoints',
        prompt: 'What does a managed inference endpoint typically give you out of the box? Select all that apply.',
        options: [
          'Autoscaling and health management',
          'Model versioning and traffic splitting between variants',
          'Request and response capture for monitoring',
          'Freedom from provider-specific packaging and lock-in',
          'Integration with the provider\'s identity and access management',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Lock-in is precisely what you accept in exchange. The packaging format, deployment API and monitoring integration are provider-specific, so migrating later is genuine engineering work.',
      },
      {
        id: 'OPS-009-q6',
        type: 'explain',
        concept: 'cost, latency and scale',
        prompt: 'A team wants the lowest possible latency, the lowest possible cost and unlimited scale. Explain why they must choose.',
        rubric: [
          'Explains that low latency requires warm capacity, which costs money while idle',
          'Explains that cheap-per-prediction options are batch or scale-to-zero, both of which sacrifice freshness or first-request latency',
          'Notes that the requirement, not the preference, should drive the choice',
        ],
        sampleAnswer:
          'Low latency means capacity that is already warm with the model already in memory when the request arrives, and warm capacity costs money whether or not anyone calls it. The cheap options achieve their price by removing exactly that: batch scoring computes answers in bulk ahead of time, so the per-prediction cost collapses but the answer is hours old and cannot depend on anything that happened since; serverless scale-to-zero removes idle cost but makes the first request after a quiet period pay container start and model load. Unlimited scale is available on all of them, but it is bought with instances, so it is a cost question rather than a free property. The way out is not cleverness but specification: state the latency budget, the peak volume and how stale the freshest feature may be, and usually only one option satisfies all three. Frequently the honest answer is that most predictions can be batched and only a small subset genuinely needs online serving.',
        explanation:
          'The examinable idea is that latency, cost and freshness form a genuine trade-off, so the engineering work is eliciting the constraint rather than picking a favourite technology.',
      },
    ],

    flashcards: [
      { front: 'Five places a model can run', back: 'A virtual machine, a container platform, serverless, a scheduled batch job, or on-device at the edge.' },
      { front: 'What is a cold start?', back: 'Latency paid when no warm instance exists: container start plus runtime import plus model load. Seconds for large ML artifacts.' },
      { front: 'When is batch inference the right answer?', back: 'When no input feature changes within the request window. It is orders of magnitude cheaper and reads become key lookups.' },
      { front: 'Default hardware for inference?', back: 'CPU, until a measurement says otherwise. GPUs win on large neural networks with large batches, and cost ten to thirty times more per hour.' },
      { front: 'What does a managed endpoint buy and cost?', back: 'Buys autoscaling, versioning, traffic splitting and payload capture without a platform team; costs an instance-hour premium and provider lock-in.' },
      { front: 'Why not put cloud keys in environment variables?', back: 'They leak through logs and images, are rarely rotated and are usually over-permissioned. Use workload identity or an instance role instead.' },
    ],

    challenge: {
      title: 'Cost out three deployments for one model',
      brief:
        'Take a model you have containerised and cost three deployments properly: an always-on instance, a serverless deployment with scale-to-zero, and a nightly batch job. For each, work out the monthly bill at 10 requests per minute and again at 1,000 requests per minute, measure or estimate p50 and p99 latency including cold starts, and note the operational burden. Then write a one-page recommendation naming the requirement that decides it — and state what evidence would change your mind.',
      language: 'text',
      acceptanceCriteria: [
        'Three deployments costed at two traffic levels using real provider prices',
        'Latency measured or estimated for each, with cold starts accounted for explicitly',
        'Memory per worker and per instance computed from the actual model size',
        'A recommendation that names the deciding requirement rather than a technology preference',
        'A stated condition under which the recommendation would change',
      ],
      starterCode: '# Workload\n# requests/min:\n# latency budget (p95):\n# freshest feature changes every:\n# model size on disk:\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a junior engineer the options for where a model can run, and how to choose between them without simply naming a favourite technology.',
      mustCover: [
        'The five substrates: virtual machine, container platform, serverless, batch, edge',
        'The trade-off triangle of latency, cost and freshness',
        'Cold starts and why they hurt large models in particular',
        'That CPU should be the default until measurement justifies a GPU',
      ],
      bonusSignals: ['asks which feature is freshest before choosing', 'mentions warm instance floors', 'mentions memory per worker against the container limit'],
      sampleExplanation:
        'There are really five places a model can run, and the decision is driven by requirements rather than preference. A plain virtual machine is a computer you rent and manage; cheap and predictable and entirely yours when it breaks. A container platform runs many services across many machines with health checking and autoscaling, which is powerful and operationally heavy. Serverless starts an instance only when a request arrives, so the idle bill is near zero, at the cost of a cold start — the first request after a quiet period waits for the container to start and the model to load, which for a large model is seconds. Batch does not serve requests at all: it scores everything on a schedule and applications read the result from a table, which is by far the cheapest option and is completely legitimate whenever no feature changes within the request. And edge runs the model on the device, which removes the network and keeps data local. The question I would ask first is which input feature is freshest, because if the answer is "nothing since this morning" then batch is almost certainly correct and everything else is overengineering. After that, state the latency budget and the peak volume, and the choice usually narrows to one. And default to CPU: most models people want to put on a GPU run faster and vastly cheaper without one.',
    },
  },

  {
    id: 'OPS-010',
    domain: 'OPS',
    module: 'Tracking & Reproducibility',
    topic: 'Versioning',
    title: 'Experiment, Model and Data Versioning',
    slug: 'experiment-and-data-versioning',
    difficulty: 3,
    estimatedMinutes: 40,
    prerequisites: ['OPS-001', 'OPS-003'],
    related: ['OPS-008'],
    tags: ['mlflow', 'dvc', 'model registry', 'experiment tracking', 'reproducibility', 'lineage', 'dataset card'],

    learningObjectives: [
      'Explain why a model is a function of code, data, hyperparameters, environment and seed, so versioning code alone cannot reproduce it',
      'Track parameters, metrics and artifacts for every run so experiments can be compared months later',
      'Use a model registry with stages, and explain what promotion means operationally',
      'Version datasets with DVC-style pointer files and say why the data itself stays out of Git',
      'Write a dataset card that records provenance, licence, known biases and intended use',
    ],

    terminology: [
      {
        term: 'Run',
        definition:
          'One execution of a training script, recorded with its parameters, metrics, artifacts, source commit and environment. The atom of experiment tracking.',
        simple: 'One attempt at training a model, with everything about it written down.',
      },
      {
        term: 'Experiment tracking',
        definition:
          'Systematically recording the inputs and outputs of every run to a queryable store, so that runs can be compared, ranked and reproduced rather than remembered.',
        simple: 'A lab notebook that fills itself in.',
      },
      {
        term: 'Model registry',
        definition:
          'A catalogue of registered models with versions and stages (for example None, Staging, Production, Archived), holding the artifact, the run that produced it and its evaluation metrics.',
        simple: 'The shelf where finished models live, labelled with which one is live.',
      },
      {
        term: 'Lineage',
        definition:
          'The recorded chain from a deployed prediction back to the model version, the run, the code commit, the data version and the environment that produced it.',
        simple: 'The paper trail from an answer back to everything that made it.',
      },
      {
        term: 'DVC pointer file',
        definition:
          'A small text file committed to Git containing the content hash, size and path of a large file stored elsewhere. Checking out an old commit and running `dvc checkout` restores exactly the data that commit used.',
        simple: 'A receipt in Git that tells you which version of the data to fetch.',
      },
      {
        term: 'Dataset card',
        definition:
          'A short document describing a dataset\'s provenance, collection method, licence, schema, known biases, and the uses it is and is not suitable for.',
        simple: 'The label on the tin, saying what is inside and where it came from.',
      },
    ],

    simpleExplanation:
      "Suppose a model you trained three months ago is performing badly and you want to reproduce it to investigate. You have the code in Git, so you check out the commit and run it again, and you get a different model. That is not a bug. A trained model is the output of at least five inputs: the code, the exact data it saw, the hyperparameters you chose, the library versions, and the random seed. Git versions one of them. Everything else was in your shell history, in a dataframe you filtered by hand, in a package that has since been upgraded, or in an unseeded shuffle. Experiment tracking fixes this by recording all five automatically for every run, together with the metrics and the resulting artifact, so a run is a permanent, queryable record rather than a memory. A model registry is the next step: the promising runs produce registered model versions with stages, so there is one authoritative answer to \"which model is in production and what produced it\". And because data cannot live in Git, you commit a small pointer file with its hash instead.",

    whyItExists:
      'Comparing models from memory, spreadsheets and filenames such as `model_v3_final_lr001.pkl` fails within weeks: nobody can say which data a model saw, which hyperparameters produced the good number, or whether a metric was computed on the same split. Tracking exists so that every run is a durable record, and registries and data versioning exist so that a deployed prediction can be traced back to an exact model, an exact commit and an exact dataset — which is what auditability, debugging and genuine reproducibility require.',

    analogy: {
      scenario:
        "Think of a laboratory notebook in a chemistry group. Every experiment gets an entry: the reagents and their batch numbers, the exact quantities, the temperature, who ran it, what came out and what was measured. The notebook is not bureaucracy — it is what makes it possible, eight months later, to repeat the one reaction that worked, and to notice that the failures all used reagent batch 44B. Samples themselves are not glued into the notebook; they are stored in a freezer, and the notebook records the shelf and the barcode.",
      mapping: [
        { from: 'A notebook entry per experiment', to: 'A tracked run with parameters, metrics and artifacts' },
        { from: 'Reagent batch numbers', to: 'The dataset version hash and the library versions' },
        { from: 'Measured yield and purity', to: 'Logged metrics such as AUC, calibration and latency' },
        { from: 'The freezer, with barcodes in the notebook', to: 'Object storage for data and models, with pointer files in Git' },
        { from: 'The shelf of approved compounds', to: 'The model registry, with a version marked Production' },
      ],
      bridge:
        'The batch numbers carry the load in this analogy. A chemist who records quantities but not which batch of reagent was used cannot explain why the reaction stopped working, and an ML engineer who versions code but not data is in exactly the same position — the experiment is not reproducible and the failure is not diagnosable. That is why the unit of versioning is not the script but the tuple of code commit, data hash, parameters, environment and seed, and why the tracking system records all of them automatically rather than hoping you remember.',
      limitations:
        'Chemical reactions are largely deterministic given the same inputs; GPU training often is not, because many cuDNN kernels are non-deterministic by default. Reproducibility in ML therefore sometimes means "statistically equivalent" rather than "bit-identical", and saying which you achieved is part of the record.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'What a model is actually a function of',
        caption: 'Version one of these and you have reproduced nothing.',
        subject: 'model = f(code, data, hyperparameters, environment, seed)',
        annotations: [
          { part: 'code', note: 'Versioned by Git. The only one most teams handle well.' },
          { part: 'data', note: 'The exact rows, filters and split. Versioned by a content hash recorded in a pointer file.' },
          { part: 'hyperparameters', note: 'Learning rate, depth, class weights, early-stopping patience. Logged per run, never retyped from memory.' },
          { part: 'environment', note: 'Library versions, CUDA, the base image digest. Pinned by a lockfile and captured by the image.' },
          { part: 'seed', note: 'The random state for shuffling, initialisation and sampling. Unseeded runs cannot be compared to each other.' },
        ],
      },
      {
        kind: 'flow',
        title: 'From a run to production, traceably',
        caption: 'Every arrow here is a recorded link you can follow backwards.',
        steps: [
          { label: 'Run starts', detail: 'The tracker records the Git commit, the data hash, the parameters and the environment.' },
          { label: 'Training', detail: 'Metrics are logged per epoch, so curves are comparable across runs rather than screenshotted.' },
          { label: 'Artifacts logged', detail: 'Model file, preprocessing objects, evaluation plots and the holdout hash.' },
          { label: 'Register a version', detail: 'A promising run becomes `churn v7`, carrying a link back to the run that produced it.' },
          { label: 'Promote to Production', detail: 'A deliberate, recorded transition after the evaluation gate passes.' },
          { label: 'Serve and log', detail: 'Every prediction carries the model version, closing the loop from an answer back to its inputs.' },
        ],
      },
      {
        kind: 'table',
        title: 'What to log on every run, and why',
        columns: ['Logged item', 'Example', 'The question it answers later'],
        rows: [
          ['Parameters', 'learning_rate=3e-4, max_depth=8', 'Which settings produced the good number?'],
          ['Metrics', 'val_auc=0.912, ece=0.031, p95_ms=41', 'Was this actually better, and on which axis?'],
          ['Source commit', 'git sha 9f2c1a7 and a clean/dirty flag', 'Which code ran? Was the tree uncommitted?'],
          ['Data version', 'dvc hash of train.parquet, row count, date range', 'Which rows did it see?'],
          ['Environment', 'lockfile hash, image digest, CUDA version', 'Can this be re-created byte for byte?'],
          ['Seed', 'seed=42, deterministic=True', 'Is a difference between runs real or noise?'],
          ['Artifacts', 'model.joblib, scaler.joblib, ROC plot', 'Can I load exactly this model again?'],
        ],
      },
      {
        kind: 'compare',
        title: 'Git versus DVC for a 4 GB dataset',
        caption: 'Same workflow, different storage.',
        left: {
          heading: 'Committing the data to Git',
          points: [
            'Every version stored forever in every clone',
            'No meaningful diff; binary blobs bloat history permanently',
            'Clone time grows without bound',
            'Deleting the file later does not reclaim the space',
          ],
        },
        right: {
          heading: 'DVC pointer in Git, data in object storage',
          points: [
            'A 100-byte `.dvc` file with a content hash is committed',
            'Data lives in S3 or GCS, deduplicated by hash',
            '`git checkout` plus `dvc checkout` restores the exact pair',
            'History stays small and clones stay fast',
          ],
        },
      },
    ],

    formalDefinition:
      'Experiment tracking is the systematic persistence of the inputs, outputs and context of each training execution — parameters, metrics, artifacts, source revision, data revision and environment specification — into a queryable store keyed by run identifier. A model registry adds a naming and lifecycle layer above runs, mapping a model name to an ordered set of versions each annotated with a stage and a reference to its originating run. Data versioning attains the same property for large artifacts by committing content-addressed pointers to the source repository while storing the content itself in an external object store, preserving the invariant that a repository revision determines the entire input set of a run.',

    codeExamples: [
      {
        language: 'python',
        title: 'Tracking a run so it can be reproduced and compared',
        code: `import hashlib, json, random, subprocess

import mlflow
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_auc_score, brier_score_loss

SEED = 42
random.seed(SEED); np.random.seed(SEED)

def git_sha() -> str:
    sha = subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip()
    dirty = subprocess.check_output(["git", "status", "--porcelain"]).decode().strip()
    return sha + ("-dirty" if dirty else "")

def file_hash(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()[:16]

mlflow.set_experiment("churn")

with mlflow.start_run(run_name="gbdt-depth8") as run:
    params = {"max_depth": 8, "learning_rate": 0.05, "n_estimators": 400, "seed": SEED}
    mlflow.log_params(params)

    # Context that makes the run reproducible rather than merely recorded
    mlflow.set_tags({
        "git_sha": git_sha(),
        "train_data_sha": file_hash("data/train.parquet"),
        "holdout_sha": file_hash("data/holdout.parquet"),
        "lockfile_sha": file_hash("uv.lock"),
    })

    model = GradientBoostingClassifier(**{k: v for k, v in params.items() if k != "seed"},
                                       random_state=SEED).fit(X_train, y_train)

    p = model.predict_proba(X_val)[:, 1]
    mlflow.log_metrics({
        "val_auc": roc_auc_score(y_val, p),
        "val_brier": brier_score_loss(y_val, p),     # calibration, not just ranking
        "positive_rate": float((p >= 0.5).mean()),
    })

    mlflow.sklearn.log_model(model, artifact_path="model",
                             registered_model_name="churn")
    mlflow.log_artifact("reports/roc.png")
    print(run.info.run_id)`,
        explanation:
          'The tags are what turn a logged run into a reproducible one. `git_sha` with a dirty flag tells you honestly whether the tree was committed — an uncommitted run is not reproducible and should say so. Hashing the data files means you can prove two runs saw the same rows, which is the single most common hidden difference between an experiment that worked and one that did not. Logging Brier score alongside AUC matters because AUC only measures ranking: a model can rank perfectly and still produce probabilities that are badly calibrated, which breaks any downstream threshold.',
      },
      {
        language: 'python',
        title: 'Registry stages and promoting a version deliberately',
        code: `from mlflow import MlflowClient

client = MlflowClient()

# Compare candidates rather than trusting a remembered number
runs = client.search_runs(
    experiment_ids=[client.get_experiment_by_name("churn").experiment_id],
    filter_string="metrics.val_auc > 0.90 and tags.git_sha NOT LIKE '%-dirty'",
    order_by=["metrics.val_auc DESC"],
    max_results=5,
)
for r in runs:
    print(r.data.tags["git_sha"][:8], r.data.params["max_depth"],
          round(r.data.metrics["val_auc"], 4), r.data.tags["train_data_sha"])

# Promote a specific version. This is a recorded, reversible decision.
client.set_registered_model_alias(name="churn", alias="production", version="7")
client.set_model_version_tag("churn", "7", "approved_by", "ml-review")
client.set_model_version_tag("churn", "7", "holdout_sha", "6b21f0c9ad4e1177")

# Serving loads by alias, never by file path
import mlflow.pyfunc
model = mlflow.pyfunc.load_model("models:/churn@production")

# Rollback is one call, with no retraining
client.set_registered_model_alias(name="churn", alias="production", version="6")`,
        explanation:
          'Two properties emerge from this that filenames can never give you. First, the service loads `models:/churn@production` rather than a path, so promoting a new model and rolling back are registry operations taking seconds, entirely independent of deploying code. Second, the query filters out runs from a dirty working tree, which is exactly the discipline that stops an unreproducible experiment becoming the production model. The `approved_by` tag turns promotion into an auditable event rather than a silent file copy.',
      },
      {
        language: 'bash',
        title: 'Versioning data with DVC',
        code: `pip install "dvc[s3]"
dvc init
dvc remote add -d storage s3://acme-ml/dvc

# Track a large file: DVC moves it to cache and writes a small pointer
dvc add data/train.parquet
cat data/train.parquet.dvc
# outs:
# - md5: 8c1f2b3d4e5a6789abcdef0123456789
#   size: 4183920640
#   path: train.parquet

git add data/train.parquet.dvc data/.gitignore
git commit -m "Track training snapshot 2024-09-02"
dvc push                     # uploads the content to S3, not to Git

# Six months later, reproduce an old experiment exactly
git checkout 9f2c1a7         # the code AND the pointer file from that commit
dvc checkout                 # restores the exact data that commit referenced
python train.py              # same code, same data

# A pipeline whose stages re-run only when their inputs change
dvc stage add -n featurize -d src/features.py -d data/raw -o data/train.parquet \\
  python src/features.py
dvc repro`,
        explanation:
          'The pointer file is the whole trick: Git holds a hundred bytes describing four gigabytes, so history stays small while `git checkout` plus `dvc checkout` restores a matched pair of code and data. `dvc repro` adds a second property — a dependency graph, so changing the feature script re-runs featurisation and training but nothing upstream. That turns "which of these files is stale?" from a memory exercise into a computed answer.',
      },
      {
        language: 'yaml',
        title: 'A dataset card that a future colleague will thank you for',
        code: `name: churn-training-snapshot
version: "2024-09-02"
content_hash: 8c1f2b3d4e5a6789
rows: 4183921
date_range: "2022-01-01 to 2024-08-31"

provenance:
  source: warehouse.analytics.customer_monthly
  extracted_by: pipelines/extract_churn.sql
  extracted_on: "2024-09-02"
  licence: internal-only

schema:
  customer_id: {type: string, unique: true, pii: pseudonymised}
  tenure_months: {type: int, range: [0, 600], null_rate: 0.002}
  monthly_charges: {type: float, range: [0, 500], null_rate: 0.0}
  churned: {type: bool, positive_rate: 0.168}

known_issues:
  - "Customers acquired through the 2023 partner channel lack contract history; the field is imputed as month-to-month."
  - "Under-18 accounts are excluded by policy, so the model must not be used for that segment."
  - "A billing migration in March 2023 changed how monthly_charges is computed; values before and after are not directly comparable."

intended_use: "Training and evaluating monthly churn propensity models for retail customers."
not_suitable_for: "Pricing decisions, credit assessment, or any individual-level adverse action."`,
        explanation:
          'Everything in `known_issues` is knowledge that otherwise lives in one person\'s head and leaves with them. The billing migration note in particular is the kind of detail that explains an inexplicable feature drift eighteen months later. `not_suitable_for` is not legal decoration either: it is the record that makes it possible to challenge a proposed reuse of the dataset before rather than after a harmful deployment.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The unreproducible best model',
        usage:
          'A team\'s best AUC came from a run whose script had been edited afterwards. There was no commit, no data hash and no seed, so the result could never be recovered and three weeks were spent trying. Tracking that records a dirty-tree flag would have made the problem visible on day one.',
      },
      {
        context: 'A regulator asking about one decision',
        usage:
          'A lender had to explain a specific credit decision from fourteen months earlier. Because every prediction logged its model version, and the version linked to a run with a data hash and a commit, the exact model was reloaded and the decision reconstructed. Without that chain the answer would have been "we cannot say".',
      },
      {
        context: 'Rollback without retraining',
        usage:
          'A promoted model caused a spike in false positives. Because serving loaded the model by registry alias, reverting was a single registry call that took effect in seconds, with no rebuild, no redeploy and no six-hour training run.',
      },
    ],

    projectConnections: [
      { tool: 'MLflow', role: 'Tracks runs and hosts a model registry with versions, aliases and stages that serving loads from.' },
      { tool: 'Weights & Biases', role: 'An alternative tracker, strong on live training curves, artifact lineage and team-facing reports.' },
      { tool: 'DVC', role: 'Content-addressed versioning for data and pipeline stages, with pointers committed alongside the code.' },
      { tool: 'Git', role: 'Versions the code and the pointer files, which is what makes a single commit identify the whole input set.' },
      { tool: 'Feature store', role: 'Versions feature definitions and their computed values, which extends this same discipline to the serving path.' },
    ],

    commonMistakes: [
      {
        mistake: 'Recording metrics in a spreadsheet or a filename',
        why: 'Filenames such as `model_lr001_v3_final.pkl` record one parameter and lose the data version, the commit, the environment and the seed, so nothing can be reproduced or meaningfully compared.',
        fix: 'Log parameters, metrics, tags and artifacts programmatically in the training script, so recording is automatic rather than something to remember at the end of a long day.',
      },
      {
        mistake: 'Training from a working-tree state that was never committed',
        why: 'The run cannot be reproduced, and if it becomes the production model there is no source of truth for what it actually does.',
        fix: 'Capture the commit SHA with a dirty flag on every run, and refuse to promote a model whose run was dirty. Make it a registry-promotion check, not a convention.',
      },
      {
        mistake: 'Comparing two runs that used different data without noticing',
        why: 'A metric difference then confounds the model change with the data change, so you may adopt a worse model because the newer snapshot happened to be easier.',
        fix: 'Hash and log the training and evaluation files, and make the comparison assert that the evaluation hash matches before it reports a winner.',
      },
      {
        mistake: 'Serving a model from a file path instead of a registry reference',
        why: 'Nobody can say which version is live, promotion means copying a file, and rollback requires knowing which file was there before — usually discovered during the incident.',
        fix: 'Load by registry alias, for example `models:/churn@production`, so promotion and rollback are recorded operations that take seconds.',
      },
      {
        mistake: 'Treating reproducibility as done once seeds are set',
        why: 'Many GPU kernels are non-deterministic by default, and library upgrades change numerics, so bit-identical results are often unattainable even with a fixed seed.',
        fix: 'Pin the environment as well as the seed, enable deterministic modes where the cost is acceptable, and record honestly whether a run is bit-reproducible or only statistically equivalent.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Why is versioning code insufficient to reproduce a model?',
        answer:
          'Because a trained model is a function of at least five inputs and Git captures one. The data matters most: the same script over a snapshot taken two weeks later sees different rows, a different class balance and possibly a different schema, and nothing in the repository records which snapshot was used. Hyperparameters are frequently passed on the command line and lost. The environment matters because library upgrades change numerics and sometimes behaviour, so the same code on a newer scikit-learn is not the same computation. And the random seed governs shuffling, initialisation and sampling, so unseeded runs differ from each other. Reproducibility therefore means pinning the tuple — commit, data content hash, parameters, lockfile or image digest, and seed — and recording all of it automatically on every run, which is exactly what an experiment tracker does.',
        followUp:
          'A strong answer adds that GPU non-determinism means the honest goal is often statistical equivalence rather than bit-identity, and that saying which you achieved is part of the record.',
      },
      {
        level: 'ml-engineer',
        question: 'Design the traceability you would need to answer "why did this customer get declined in March?" fourteen months later.',
        answer:
          'Work backwards from the prediction. Every served response logs a request id, the input feature values or a hash of them, the output, and the model version — that last field is the hinge. The model version resolves in the registry to the run that produced it, and the run carries the source commit, the hyperparameters, the environment lockfile or image digest, the seed, and content hashes for the training and evaluation data. The data hashes resolve through DVC or a warehouse snapshot to the exact rows. With that chain I can reload the exact model, replay the exact input and reproduce the exact score, and I can also say what the model was trained on and how it was evaluated. Two practical constraints: prediction logs must be retained long enough and be queryable, which usually means object storage partitioned by date rather than an application database, and personal data in those logs needs a retention and access policy agreed in advance.',
        followUp:
          'The signal is realising that the whole chain hangs on the model version being present in the prediction log, and that retention policy is part of the design rather than an afterthought.',
      },
      {
        level: 'ml-engineer',
        question: 'What is a model registry for, given that you could just put the file in S3?',
        answer:
          'Object storage gives you the bytes; a registry gives you identity, lifecycle and lineage. It provides a stable name with ordered versions, stages or aliases so there is exactly one authoritative answer to "what is in production", a link from each version back to the run that produced it and therefore to the code, data and metrics, and metadata such as who approved a promotion and against which holdout. Operationally the payoff is that serving loads by alias rather than path, which decouples model promotion from code deployment entirely: shipping a new model is a registry transition, rollback is the reverse transition, and neither requires a rebuild or a retrain. You can approximate some of this with conventions on top of S3, but you will end up reimplementing a registry badly, and the part you will get wrong is the audit trail.',
        followUp:
          'Mentioning that this separation is what allows a model to be rolled back independently of a code rollback shows incident-response thinking.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Two runs of the same script three weeks apart report AUC 0.91 and 0.87. List, in order, what you would check to find out whether the model got worse.',
        hint: 'Eliminate the things that are not the model first.',
        solution:
          'One: is the evaluation set identical? Compare the holdout content hashes; if they differ, the numbers are simply not comparable and everything else is speculation. Two: is the training data the same snapshot, and did its row count, date range or class balance change? Three: was the code the same commit, and was either tree dirty? Four: were the hyperparameters identical — check the logged parameters rather than memory. Five: did the environment change, comparing lockfile hashes, since a library upgrade can shift numerics. Six: was the seed set, and what is the run-to-run standard deviation, because a 0.04 gap may be within noise for a small holdout. Only after all six are ruled out is "the model got worse" the explanation, and every one of those checks is a lookup rather than an investigation if the run was tracked.',
      },
      {
        prompt:
          'Your repository is 12 GB because three parquet snapshots were committed. Describe the migration to DVC and what it does and does not fix.',
        hint: 'Removing a file from the current commit does not remove it from history.',
        language: 'bash',
        solution:
          '`git rm --cached data/*.parquet`, add the paths to `.gitignore`, then `dvc add data/train.parquet` for each, commit the `.dvc` pointer files, configure a remote and `dvc push`. From now on Git holds hundred-byte pointers and `git checkout` plus `dvc checkout` restores a matched code-and-data pair. What this does not fix is history: the old blobs remain reachable from previous commits, so the clone is still 12 GB. Shrinking it requires rewriting history with `git filter-repo`, which changes every commit hash and must be coordinated with everyone who has a clone, so plan it as an announced event rather than a quiet cleanup.',
      },
      {
        prompt:
          'Write the promotion checklist your team must satisfy before a model version moves to Production.',
        hint: 'Think about what you would need if the model caused an incident next week.',
        solution:
          'One: the run is from a clean, committed tree, with the commit SHA recorded. Two: the evaluation used the registered holdout, verified by hash, and the candidate matches or beats the incumbent within the agreed tolerance plus an absolute floor. Three: per-segment metrics show no material regression for monitored groups. Four: calibration is checked, not just ranking, because thresholds downstream depend on it. Five: the artifact loads in the serving image and passes contract tests at the expected latency. Six: the promotion is tagged with who approved it and against which holdout hash. Seven: the previous production version stays registered so rollback is one call. The checklist is worth automating as a promotion gate, because a checklist that depends on someone remembering it on a Friday afternoon is not a control.',
      },
    ],

    quiz: [
      {
        id: 'OPS-010-q1',
        type: 'multi',
        concept: 'inputs to a model',
        prompt: 'Which of these must be pinned to reproduce a trained model? Select all that apply.',
        options: [
          'The source code commit',
          'The exact training data version',
          'The hyperparameters',
          'The library and runtime versions',
          'The random seed',
        ],
        answerIndices: [0, 1, 2, 3, 4],
        explanation:
          'All five. Git captures only the first, which is why "we have the code" is never an answer to "can you reproduce it", and why trackers record the other four automatically.',
      },
      {
        id: 'OPS-010-q2',
        type: 'truefalse',
        concept: 'data in Git',
        prompt: 'DVC works by committing the dataset into Git in a compressed form.',
        answer: false,
        explanation:
          'DVC commits a small pointer file containing a content hash while the data itself lives in object storage. That is what keeps history small while still letting a commit determine exactly which data a run used.',
      },
      {
        id: 'OPS-010-q3',
        type: 'mcq',
        concept: 'registry value',
        prompt: 'What does a model registry give you that a file in object storage does not?',
        options: [
          'Named versions with stages and a recorded link back to the producing run',
          'Cheaper storage for large artifacts',
          'Faster model loading at inference time',
          'Automatic hyperparameter tuning',
        ],
        answerIndex: 0,
        explanation:
          'It supplies identity, lifecycle and lineage. That is what lets serving load by alias and makes promotion and rollback recorded operations independent of code deployment.',
      },
      {
        id: 'OPS-010-q4',
        type: 'match',
        concept: 'tooling roles',
        prompt: 'Match each tool to what it versions.',
        pairs: [
          { left: 'Git', right: 'Source code and small text pointer files' },
          { left: 'DVC', right: 'Large data and model files, by content hash, stored externally' },
          { left: 'MLflow tracking', right: 'Runs: parameters, metrics, artifacts and context' },
          { left: 'Model registry', right: 'Named model versions with stages and lineage to runs' },
          { left: 'Lockfile / image digest', right: 'The environment the run executed in' },
        ],
        explanation:
          'Each layer versions something the others cannot. Reproducibility is the conjunction of all of them, which is why no single tool advertises itself as the complete answer.',
      },
      {
        id: 'OPS-010-q5',
        type: 'fill',
        concept: 'lineage',
        prompt: 'Which single field must appear in every prediction log for a served decision to be traceable back to its training data?',
        answers: ['model_version', 'model version', 'the model version', 'version'],
        explanation:
          'The model version is the hinge of the whole chain: it resolves in the registry to a run, and the run carries the commit, the data hashes, the parameters and the environment.',
      },
      {
        id: 'OPS-010-q6',
        type: 'explain',
        concept: 'dataset cards',
        prompt: 'Explain what a dataset card is for and name three things it should contain that a schema does not.',
        rubric: [
          'Explains that it records context and provenance that code cannot express',
          'Names at least three: collection method, licence, known biases, intended and unsuitable uses, breaking changes in history',
          'Connects it to a concrete risk such as misuse or an unexplained drift',
        ],
        sampleAnswer:
          'A schema tells you the columns and types; a dataset card tells you what the data means, where it came from and what it cannot be used for. It should record provenance — which query, which system, extracted when — because that is what lets someone re-derive or debug it later. It should record known issues and biases, such as a segment whose history is imputed or a billing migration that makes a column non-comparable across a date, because those explain otherwise inexplicable model behaviour years later. And it should state intended use and unsuitable use, along with licence and any personal-data handling, so that a proposed reuse can be challenged before the model is built rather than after it has caused harm. All of this is knowledge that otherwise lives in one person\'s head and leaves the company when they do.',
        explanation:
          'The examinable idea is that datasets carry context that no schema captures, and writing it down is what makes the data reusable and its limitations enforceable.',
      },
    ],

    flashcards: [
      { front: 'A model is a function of what?', back: 'Code, data, hyperparameters, environment and seed. Git versions only the first, which is why code versioning alone cannot reproduce a model.' },
      { front: 'What does a DVC pointer file contain?', back: 'A content hash, size and path. It is committed to Git while the data itself lives in object storage, so history stays small.' },
      { front: 'Why load a model by registry alias rather than file path?', back: 'Promotion and rollback become recorded registry operations taking seconds, entirely independent of deploying code.' },
      { front: 'What single field makes a prediction traceable?', back: 'The model version in the prediction log — it resolves to the run, and the run to the commit, data hashes and environment.' },
      { front: 'What belongs in a dataset card?', back: 'Provenance, licence, schema, known issues and biases, breaking changes in history, and intended and unsuitable uses.' },
      { front: 'Why record a dirty-tree flag on a run?', back: 'A run trained from uncommitted code cannot be reproduced, so it should never be promoted to production.' },
    ],

    challenge: {
      title: 'Make one old experiment reproducible',
      brief:
        'Choose a model you trained at least a month ago and try to reproduce it exactly. Write down every input you could not recover. Then instrument the project so it could not happen again: log parameters, metrics and artifacts to a tracker; tag each run with the commit SHA and dirty flag, the content hashes of the training and evaluation data, and the lockfile hash; put the data under DVC with a remote; register the resulting model and have your serving code load it by alias. Finish by writing the dataset card for the training snapshot.',
      language: 'python',
      acceptanceCriteria: [
        'A written list of inputs that could not be recovered from the original run',
        'Every new run logs parameters, metrics, artifacts, commit SHA with dirty flag, data hashes and lockfile hash',
        'The dataset is tracked by DVC with a configured remote, and `git checkout` plus `dvc checkout` restores a matched pair',
        'The model is registered and loaded by alias rather than by file path',
        'Two runs with the same seed and data produce the same metric to a stated tolerance',
        'A dataset card records provenance, schema, known issues and unsuitable uses',
      ],
      starterCode: 'import mlflow\n\nmlflow.set_experiment("reproducibility-audit")\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague who keeps models in a folder called `experiments/` why that stops working, and what experiment tracking, a registry and data versioning each solve.',
      mustCover: [
        'A model depends on code, data, hyperparameters, environment and seed',
        'Tracking records all of those automatically per run, making comparison and reproduction possible',
        'A registry gives named versions, stages and lineage so serving can load by alias',
        'Data is versioned by committing a content-hash pointer while the bytes live elsewhere',
      ],
      bonusSignals: ['mentions dirty working trees', 'mentions comparing runs that used different holdouts', 'mentions rollback without retraining'],
      sampleExplanation:
        'A folder of files answers only one question — which files exist — and the questions you will actually have are different. Which data did this model see? Which commit produced it? Was the evaluation set the same as the one used for the model it is being compared against? A filename cannot carry that, and memory stops working after about three weeks. Experiment tracking records it automatically: every run logs its parameters, its metrics, the artifacts it produced, and crucially the context — the commit SHA with a flag saying whether the tree was dirty, content hashes for the training and evaluation data, the lockfile hash and the seed. Then comparing two runs becomes a query rather than an argument. A registry sits above that and gives models names, versions and stages, with a link from each version back to the run that made it, so there is one authoritative answer to what is in production and the serving code can load by alias instead of a path. That last detail is what makes rollback a five-second registry call rather than a retraining job. And because the data cannot go into Git, you commit a small pointer file containing its hash while the bytes live in object storage, so checking out an old commit and running one more command restores exactly the data that run used.',
    },
  },

  {
    id: 'OPS-011',
    domain: 'OPS',
    module: 'Monitoring',
    topic: 'Observability',
    title: 'Logging, Monitoring and Observability',
    slug: 'logging-and-monitoring',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['OPS-005'],
    related: ['OPS-009', 'OPS-010'],
    tags: ['logging', 'metrics', 'observability', 'alerting', 'prometheus', 'slo', 'dashboards'],

    learningObjectives: [
      'Replace print statements with structured logging, and choose log levels that mean something',
      'Decide what an ML service should log for every prediction, and what it must not log',
      'Name the metrics that matter — latency, throughput, error rate, prediction distribution, feature distribution — and why each is there',
      'Build an alert that fires on user-visible harm rather than on noise, and set a threshold you can defend',
      'Explain the central point: a broken model keeps returning HTTP 200, so service health is not model health',
    ],

    terminology: [
      {
        term: 'Structured logging',
        definition:
          'Emitting log lines as machine-parseable records — usually one JSON object per line — with consistent field names, so logs can be filtered, aggregated and joined rather than only read.',
        simple: 'Logs written as data instead of as sentences.',
      },
      {
        term: 'Log level',
        definition:
          'A severity tag — DEBUG, INFO, WARNING, ERROR, CRITICAL — that lets the same code produce a firehose in development and a trickle in production without editing it.',
        simple: 'How loud this message is, so you can turn the volume down.',
      },
      {
        term: 'Metric',
        definition:
          'A numeric time series such as a counter, gauge or histogram, aggregated across requests and cheap to store for a long time. Metrics answer "how much" and "how often"; logs answer "what exactly happened".',
        simple: 'A number tracked over time.',
      },
      {
        term: 'The three pillars',
        definition:
          'Logs (discrete events), metrics (aggregated numbers over time) and traces (the path of one request across services). Together they let you ask questions you did not anticipate.',
        simple: 'Events, numbers and journeys.',
      },
      {
        term: 'SLI / SLO',
        definition:
          'A service level indicator is a measured quantity such as the fraction of requests served under 200 ms; a service level objective is the target for it, such as 99.5% over 30 days. Alerts are derived from the objective.',
        simple: 'What you measure, and the promise you make about it.',
      },
      {
        term: 'Cardinality',
        definition:
          'The number of distinct label combinations on a metric. A label such as `customer_id` creates one time series per customer and will overwhelm a metrics system.',
        simple: 'How many separate lines your chart secretly has.',
      },
    ],

    simpleExplanation:
      "When a normal web service breaks, it tells you: requests fail, the error count spikes, someone gets paged. A machine learning service is more dangerous, because the most common way it breaks is completely silent. The code runs, the model loads, every request returns HTTP 200 in forty milliseconds, and the predictions are nonsense — because an upstream team renamed a column and every value now arrives as null, so the model happily scores a row of zeros. No exception, no error rate, no alert. This is why monitoring an ML system means watching two different things. The service layer is the familiar part: latency, throughput and error rate. The model layer is the part people forget: what the inputs look like, what the outputs look like, and how both compare with what you saw during training and last week. Logging is what makes any of this possible. Not print statements, which are unfiltered, untimestamped and unsearchable, but structured log lines with consistent fields, so that when something looks odd on a dashboard you can find the exact requests behind it.",

    whyItExists:
      'Systems fail in ways nobody predicted, and in machine learning they fail without raising an error at all, so the only way to notice is to have been measuring the right things beforehand. Observability exists to turn a live system from an opaque box into something you can ask new questions of after the fact, and monitoring exists so that the questions you already know matter are answered automatically and loudly enough to wake someone.',

    analogy: {
      scenario:
        "Think about the instrumentation of an aircraft. Some instruments report the machine: engine temperature, fuel flow, hydraulic pressure. A different set reports the situation: altitude, airspeed, heading. An engine can be running perfectly within every limit while the aircraft is 3,000 feet below where it should be, which is why an altimeter exists at all. Crews are not asked to watch every dial continuously either; a small number of conditions trigger an audible warning, and everything else is available to be consulted when something needs diagnosing.",
      mapping: [
        { from: 'Engine instruments', to: 'Service metrics: latency, throughput, error rate, memory' },
        { from: 'Altitude and airspeed', to: 'Model metrics: prediction distribution, feature distribution, alert rate' },
        { from: 'An engine fine while the aircraft is off course', to: 'HTTP 200 on every request while the model has degraded' },
        { from: 'The small set of audible warnings', to: 'Alerts, tied to user-visible harm rather than to every anomaly' },
        { from: 'The flight data recorder', to: 'Structured prediction logs, for the investigation afterwards' },
      ],
      bridge:
        'The altimeter is the crux. Engine instruments cannot detect the failure mode that matters most, and service metrics cannot detect model degradation, because degradation is not an error — it is a correct-looking response containing a wrong number. That is why an ML dashboard must show output and input distributions next to latency and error rate, and why the prediction log is the recorder you will be extremely glad to have when somebody asks what the model was doing last Tuesday.',
      limitations:
        'A pilot gets altitude instantly; a model\'s true accuracy usually waits for labels that arrive days or weeks later. Live model monitoring is therefore mostly proxies and distributions, with the real accuracy arriving too late to be an alarm.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'The two layers you must monitor',
        caption: 'A green service dashboard says nothing about model quality.',
        left: {
          heading: 'Service health',
          points: [
            'Request rate, error rate by status class',
            'Latency percentiles, p50 / p95 / p99',
            'CPU, memory against the container limit, restarts',
            'Saturation: queue depth, in-flight requests',
          ],
        },
        right: {
          heading: 'Model health',
          points: [
            'Prediction distribution: mean score, positive rate, histogram',
            'Input feature distributions and null rates',
            'Share of requests hitting default or imputed values',
            'Delayed accuracy once labels arrive, plus calibration',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Log levels, used the way they were designed',
        columns: ['Level', 'Meaning', 'Example in a model service'],
        rows: [
          ['DEBUG', 'Detail for diagnosing, off in production', 'The full feature vector for one request during an investigation.'],
          ['INFO', 'Normal, noteworthy events', 'Model loaded at startup; one line per prediction with id, score and version.'],
          ['WARNING', 'Something is wrong but was handled', 'A feature was missing and an imputed default was used.'],
          ['ERROR', 'An operation failed', 'Inference raised; the request was answered with a 500.'],
          ['CRITICAL', 'The service cannot function', 'The model failed to load and readiness will never pass.'],
        ],
      },
      {
        kind: 'flow',
        title: 'From a symptom to a cause',
        caption: 'Metrics tell you that something changed; logs and traces tell you what.',
        steps: [
          { label: 'Alert fires', detail: 'The positive-prediction rate has doubled over a one-hour window.' },
          { label: 'Dashboard', detail: 'Latency and error rate are normal — so this is a model problem, not a service problem.' },
          { label: 'Feature panel', detail: 'The null rate for `tenure_months` jumped from 0.2% to 96% at 02:15.' },
          { label: 'Query the logs', detail: 'Filter structured prediction logs for that window and read the actual payloads.' },
          { label: 'Trace upstream', detail: 'The request id joins to the caller and to the feature pipeline run that changed.' },
          { label: 'Act', detail: 'Fail over to the previous model version or reject the affected requests while upstream is fixed.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Watch a distribution move',
        caption: 'See how a prediction distribution shifts while error rate and latency stay perfectly healthy.',
        widget: 'drift-monitor',
      },
    ],

    formalDefinition:
      'Monitoring is the collection and evaluation of predefined signals against thresholds, producing alerts; observability is the property of a system that allows arbitrary questions about its internal state to be answered from its external outputs. A production ML system requires instrumentation at two layers: the service layer, characterised by request rate, error rate and latency distribution, and the model layer, characterised by the empirical distributions of input features and output predictions, their divergence from a reference window, and — once ground truth becomes available — realised predictive performance and calibration.',

    codeExamples: [
      {
        language: 'python',
        title: 'Structured logging that you can actually query',
        code: `import json, logging, sys, time, uuid
from contextvars import ContextVar

request_id: ContextVar[str] = ContextVar("request_id", default="-")


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            "ts": time.strftime("%Y-%m-%dT%H:%M:%S", time.gmtime(record.created)),
            "level": record.levelname,
            "logger": record.name,
            "msg": record.getMessage(),
            "request_id": request_id.get(),
        }
        payload.update(getattr(record, "extra_fields", {}))
        if record.exc_info:
            payload["exc"] = self.formatException(record.exc_info)
        return json.dumps(payload)


handler = logging.StreamHandler(sys.stdout)     # stdout: the platform collects it
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
log = logging.getLogger("churn")


def log_prediction(customer_id: str, prob: float, version: str, latency_ms: float,
                   imputed: list[str]) -> None:
    log.info("prediction", extra={"extra_fields": {
        "customer_id_hash": hash_id(customer_id),   # pseudonymised, never raw PII
        "churn_probability": round(prob, 4),
        "model_version": version,
        "latency_ms": round(latency_ms, 2),
        "imputed_features": imputed,                 # silent degradation, made visible
    }})

# {"ts":"2024-09-02T11:04:19","level":"INFO","logger":"churn","msg":"prediction",
#  "request_id":"req_7f3a","customer_id_hash":"9c1e...","churn_probability":0.8123,
#  "model_version":"churn-2024-09-02","latency_ms":38.4,"imputed_features":["contract"]}`,
        explanation:
          'Every field here earns its place. `request_id` lets you join a client complaint to the exact server-side line. `model_version` is what makes the log useful six months later. `imputed_features` is the ML-specific one and the most valuable: it records that the model scored a row where a feature was missing, which is exactly the silent degradation that never shows up as an error. Note that the identifier is hashed — prediction logs are long-lived and widely readable, so raw personal data must not go into them.',
      },
      {
        language: 'python',
        title: 'Metrics: what to export and how not to blow up the store',
        code: `from prometheus_client import Counter, Histogram, Gauge, make_asgi_app

REQUESTS = Counter("predictions_total", "Predictions served",
                   ["model_version", "status"])            # low cardinality labels only
LATENCY = Histogram("prediction_latency_seconds", "End-to-end latency",
                    buckets=[.005, .01, .025, .05, .1, .25, .5, 1, 2.5])
SCORE = Histogram("prediction_score", "Distribution of predicted probabilities",
                  buckets=[0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1])
IMPUTED = Counter("feature_imputed_total", "Requests where a feature was missing",
                  ["feature"])
POSITIVE_RATE = Gauge("prediction_positive_rate", "Rolling share of scores above threshold")

app.mount("/metrics", make_asgi_app())

@app.post("/predict")
def predict(req: PredictRequest):
    with LATENCY.time():
        prob = score(req)
    SCORE.observe(prob)                       # the ML-specific series
    REQUESTS.labels(MODEL_VERSION, "200").inc()
    return {"churn_probability": prob}

# NEVER do this: one time series per customer will kill the metrics backend.
# REQUESTS.labels(customer_id, "200").inc()`,
        explanation:
          'Histograms rather than pre-computed averages, because percentiles cannot be averaged across instances and a mean hides the tail entirely. `prediction_score` as a histogram is the panel that catches silent model failure: plotted over time it shows the output distribution moving while latency and error rate stay flat. The commented-out line is the mistake that takes down monitoring systems — every distinct label value creates a separate time series, so identifiers belong in logs, never in metric labels.',
      },
      {
        language: 'yaml',
        title: 'Alerts that are worth waking someone for',
        code: `groups:
  - name: churn-service
    rules:
      # Service health: user-visible failure
      - alert: HighErrorRate
        expr: |
          sum(rate(predictions_total{status=~"5.."}[5m]))
            / sum(rate(predictions_total[5m])) > 0.02
        for: 10m
        labels: {severity: page}
        annotations:
          summary: "5xx rate above 2% for 10 minutes"
          runbook: "https://wiki.internal/runbooks/churn-5xx"

      - alert: LatencyBudgetBurn
        expr: histogram_quantile(0.95, sum(rate(prediction_latency_seconds_bucket[5m])) by (le)) > 0.25
        for: 15m
        labels: {severity: page}

      # Model health: no errors at all, and still broken
      - alert: PredictionDistributionShift
        expr: |
          abs(
            avg_over_time(prediction_positive_rate[1h])
            - avg_over_time(prediction_positive_rate[7d] offset 1h)
          ) > 0.10
        for: 30m
        labels: {severity: ticket}
        annotations:
          summary: "Positive-prediction rate moved by more than 10 points versus last week"

      - alert: FeatureSuddenlyMissing
        expr: rate(feature_imputed_total[10m]) / rate(predictions_total[10m]) > 0.20
        for: 10m
        labels: {severity: page}
        annotations:
          summary: "Over 20% of requests are missing a feature — upstream is probably broken"`,
        explanation:
          'Three design choices make these alerts survivable. Each has a `for` duration, so a thirty-second blip does not page anyone. Severities differ: a distribution shift creates a ticket for working hours because it needs investigation rather than heroics, while a feature vanishing pages immediately because it means the model is scoring garbage right now. And every page has a runbook link, because an alert that wakes someone without telling them what to do is a half-finished alert.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The all-null feature',
        usage:
          'An upstream rename made `tenure_months` null on every request. The service returned 200 at normal latency for eleven days. The only signal that existed was the imputation counter, which nobody had built yet; after the incident it became the first panel on the dashboard and a paging alert.',
      },
      {
        context: 'p99 hidden by an average',
        usage:
          'A dashboard showed a comfortable 30 ms mean latency while one in a hundred requests took four seconds and blew a partner\'s timeout. Switching from averages to histogram-derived percentiles made the problem visible in a single panel, and it turned out to be garbage collection on one instance.',
      },
      {
        context: 'An alert everyone learned to ignore',
        usage:
          'A prediction-drift alert with no `for` clause fired fifteen times a day on ordinary hourly seasonality. Within two weeks it was muted, and it was still muted when a genuine drift event happened. Thresholds derived from a measured baseline, plus a duration, would have kept it credible.',
      },
    ],

    projectConnections: [
      { tool: 'structlog / python-json-logger', role: 'Emits structured JSON log lines with consistent fields so logs are queryable rather than merely readable.' },
      { tool: 'Prometheus + Grafana', role: 'Scrapes and stores metric time series, and renders the dashboards where distribution shifts become visible.' },
      { tool: 'OpenTelemetry', role: 'Propagates a trace id across services so one prediction can be followed from the caller through the feature store to the model.' },
      { tool: 'Sentry', role: 'Aggregates exceptions with stack traces and context, which complements metrics that only tell you an error rate rose.' },
      { tool: 'Evidently / whylogs', role: 'Computes data and prediction drift reports on logged payloads, feeding the model-health half of the dashboard.' },
    ],

    commonMistakes: [
      {
        mistake: 'Monitoring only service health and declaring the model fine',
        why: 'A degraded model returns 200 at normal latency. Error rate and p95 are entirely blind to a feature that has gone null or a distribution that has shifted, which are the most common real failures.',
        fix: 'Put prediction distribution, feature null rates and imputation share on the same dashboard as latency and errors, and alert on them.',
      },
      {
        mistake: 'Using `print` instead of logging',
        why: '`print` has no level, no timestamp, no module, no structure and cannot be turned down. In a container it is also buffered by default, so output can be lost entirely when the process is killed.',
        fix: 'Use the `logging` module with a JSON formatter writing to stdout, and set `PYTHONUNBUFFERED=1` in the image so lines are not lost.',
      },
      {
        mistake: 'Logging raw personal data or full feature vectors at INFO',
        why: 'Prediction logs are retained for months, replicated into log aggregators and readable by many people, so they become the largest uncontrolled store of personal data in the system.',
        fix: 'Log pseudonymised identifiers and aggregate statistics at INFO; keep full payloads behind DEBUG or a sampled, access-controlled store with an explicit retention policy.',
      },
      {
        mistake: 'High-cardinality metric labels',
        why: 'Each distinct label combination is a separate time series, so a `customer_id` label creates millions of them and will exhaust the metrics backend\'s memory.',
        fix: 'Keep labels to small, bounded sets such as model version, endpoint and status class. Per-entity detail belongs in logs or a data warehouse.',
      },
      {
        mistake: 'Alerting on every anomaly',
        why: 'Alert fatigue is a real failure mode: once people mute a channel, the genuine incident goes unnoticed too, so a noisy alert is worse than no alert.',
        fix: 'Alert on symptoms of user-visible harm, derive thresholds from measured baselines, add a `for` duration, route non-urgent findings to tickets, and attach a runbook to anything that pages.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What would you monitor for a deployed model that you would not monitor for an ordinary web service?',
        answer:
          'Everything about the inputs and outputs, because those are where ML-specific failure shows up and the service layer is blind to it. Concretely: the distribution of predictions over time — mean score, positive rate, a histogram — since a shift there is often the first sign of trouble; the distributions and null rates of key input features, compared against a training reference window; the share of requests where a feature was missing and a default was imputed, which catches upstream breakage directly; and once labels arrive, realised accuracy and calibration, accepting that this signal is delayed by days or weeks. I would also monitor per-segment volumes, because a change in who is calling can shift metrics without anything being wrong with the model. The underlying reason is that a degraded model keeps returning 200 quickly, so error rate and latency cannot detect it.',
        followUp:
          'A strong candidate notes that most live model monitoring is necessarily proxies, because ground truth arrives too late to be an alarm, and connects this to the label-delay problem.',
      },
      {
        level: 'ml-engineer',
        question: 'Design the alerting for a model service. What pages someone at 3 a.m. and what does not?',
        answer:
          'Page on user-visible harm that needs action now: a 5xx rate above a threshold derived from the baseline sustained for ten minutes; p95 latency breaching the budget sustained for fifteen; readiness failing across a majority of instances; and one ML-specific case — a sudden spike in imputed or null features, because that means the model is scoring garbage right now and the right action is to fail over or shed those requests. Do not page on a gradual distribution shift, a small accuracy decline once labels arrive, or a single instance restarting; those become tickets for working hours, because the response is investigation and possibly retraining rather than an immediate fix. Every paging alert needs a duration clause so blips do not fire, a threshold justified by measured baseline variability rather than a round number, and a runbook naming the first three things to check. If an alert fires more than a couple of times a month without action being taken, it should be demoted rather than muted.',
        followUp:
          'The mark of experience is explicitly separating "needs a human now" from "needs a human eventually", and treating alert fatigue as a failure mode with its own remedy.',
      },
      {
        level: 'ml-engineer',
        question: 'Your model service has been returning 200 for every request for two weeks and business metrics have quietly worsened. How do you investigate, and what should have existed?',
        answer:
          'I would start with the output distribution: plot mean predicted score and positive rate over the period and look for a step change or a drift, and compare against the same window a year and a week earlier to rule out seasonality. If the outputs moved, I look at the inputs — null rates, imputation counters, category cardinality, and the distribution of each top feature against its training reference — because a step change in one feature at a specific timestamp usually identifies an upstream deploy. If inputs and outputs both look stable, the world changed rather than the pipeline, so I check realised performance on whatever labels have arrived and compare segment mixes. What should have existed is the model-health half of the dashboard with alerts on it: prediction distribution, feature null and imputation rates, and a scheduled drift report, plus prediction logs carrying the model version so the whole period can be replayed. The deeper lesson is that two weeks of silence was not luck; it was the absence of any signal that could have spoken.',
        followUp:
          'Mentioning that prediction logs must retain the model version and enough input detail to recompute distributions afterwards shows the candidate has run this investigation before.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Design the log line your prediction endpoint emits. List the fields and justify each, including one you deliberately leave out.',
        hint: 'Think about the questions you will ask during an incident and six months later.',
        language: 'python',
        solution:
          'Fields: `ts`; `level`; `request_id` to join client and server views; `customer_id_hash` rather than the raw identifier; the prediction value; `model_version` so the decision is attributable later; `latency_ms` split into featurisation and inference if you can; `imputed_features` as a list, which is the single most valuable ML-specific field because it exposes silent degradation; and `status`. Deliberately left out: the full raw feature vector at INFO level. Prediction logs are retained for months and widely readable, so they become the largest uncontrolled store of personal data in the system; keep full payloads behind DEBUG, or sample them into an access-controlled store with an explicit retention policy.',
      },
      {
        prompt:
          'Your team\'s only alert is "error rate above 5%". Name three failure modes it cannot detect and give the signal that would.',
        hint: 'What does a broken model return?',
        solution:
          'One: an upstream rename makes a feature null on every request — the model imputes and scores happily at 200. Signal: imputation or null-rate counter per feature, paging above a few percent. Two: the input population changes, for example a marketing campaign brings a new customer segment — errors are zero but the model is extrapolating. Signal: feature distribution divergence against a training reference, as a ticket. Three: latency degrades for a tail of requests while the mean and the error rate look fine, breaking a partner\'s timeout. Signal: p95 and p99 from a histogram, with an alert tied to the latency budget. The common thread is that all three are invisible to status codes, which is the central point of monitoring an ML system.',
      },
      {
        prompt:
          'Pick a threshold for a prediction-positive-rate alert and defend it. Explain why a round number is not a defence.',
        hint: 'Measure the baseline before you choose.',
        solution:
          'Take four to eight weeks of history for the positive rate at the same granularity the alert will use, and measure its variability including weekly seasonality — for example a mean of 16.8% with an hour-to-hour standard deviation of 1.2% and a clear weekend dip. Set the threshold at roughly three to four standard deviations from the seasonally adjusted expectation, so around 5 percentage points, and require the deviation to persist for thirty minutes so a single unusual hour does not fire. Then check the choice against history: replay the rule over the past two months and count how many times it would have fired and whether any of those were real. A round number such as "alert at 25%" has no relationship to your data\'s natural variability, so it either fires constantly or never fires at all, and both outcomes end with the alert being ignored.',
      },
    ],

    quiz: [
      {
        id: 'OPS-011-q1',
        type: 'truefalse',
        concept: 'silent failure',
        prompt: 'If a model service shows a 0% error rate and normal latency, the model is working correctly.',
        answer: false,
        explanation:
          'A degraded model returns 200 quickly with a wrong number. Status codes and latency measure the service, not the predictions, which is why input and output distributions must be monitored separately.',
      },
      {
        id: 'OPS-011-q2',
        type: 'multi',
        concept: 'what to log',
        prompt: 'Which fields belong in a per-prediction log line? Select all that apply.',
        options: [
          'The model version',
          'A request id that the caller also has',
          'Which features were missing and imputed',
          'The customer\'s full name and address',
          'End-to-end latency in milliseconds',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Raw personal data does not belong in long-lived, widely readable logs. Pseudonymise identifiers and keep full payloads behind DEBUG or in an access-controlled, retention-limited store.',
      },
      {
        id: 'OPS-011-q3',
        type: 'mcq',
        concept: 'metric cardinality',
        prompt: 'Why should `customer_id` never be a Prometheus metric label?',
        options: [
          'Each distinct label value creates a separate time series, so millions of customers exhaust the backend',
          'Prometheus cannot store string labels',
          'It would make the dashboard colours inconsistent',
          'Labels are only allowed on counters, not histograms',
        ],
        answerIndex: 0,
        explanation:
          'Cardinality explosion is one of the classic ways to take down a metrics system. Keep labels bounded — model version, endpoint, status class — and put per-entity detail in logs or a warehouse.',
      },
      {
        id: 'OPS-011-q4',
        type: 'match',
        concept: 'log levels',
        prompt: 'Match each event to the level it should be logged at.',
        pairs: [
          { left: 'Model loaded successfully at startup', right: 'INFO' },
          { left: 'A feature was missing and a default was imputed', right: 'WARNING' },
          { left: 'Inference raised and the request returned 500', right: 'ERROR' },
          { left: 'The model file could not be loaded at all', right: 'CRITICAL' },
          { left: 'The full feature vector during an investigation', right: 'DEBUG' },
        ],
        explanation:
          'Levels exist so the same code can be verbose in development and quiet in production. Using them consistently is what makes filtering possible during an incident.',
      },
      {
        id: 'OPS-011-q5',
        type: 'mcq',
        concept: 'alert design',
        prompt: 'Which alert is most likely to be muted within a month, and why?',
        options: [
          'Prediction positive rate deviates by any amount from yesterday, no duration clause, paging severity',
          '5xx rate above 2% sustained for 10 minutes, paging, with a runbook link',
          'p95 latency above the budget sustained for 15 minutes, paging',
          'Over 20% of requests missing a feature for 10 minutes, paging',
        ],
        answerIndex: 0,
        explanation:
          'No duration, no baseline-derived threshold and a paging severity for something that needs investigation rather than immediate action. It will fire on ordinary seasonality and be muted, which also silences it for the real event.',
      },
      {
        id: 'OPS-011-q6',
        type: 'explain',
        concept: 'observability for ML',
        prompt: 'Explain to a backend engineer why the dashboards they built for the API are not sufficient for the model.',
        rubric: [
          'States that model degradation produces successful-looking responses',
          'Names concrete model-layer signals: prediction distribution, feature distributions, imputation rate',
          'Acknowledges that true accuracy is delayed and therefore cannot be the primary alarm',
        ],
        sampleAnswer:
          'Your dashboards answer whether the service is up, fast and returning successes, and they answer it well. The problem is that the most common way a model fails produces exactly those readings: the code runs, the response is a valid JSON body with a number in it, the status is 200 and the latency is 40 ms — and the number is wrong, because a feature went null upstream or the population being scored has shifted away from what the model was trained on. Nothing in the service layer can see that. So we need a second set of panels beside yours: the distribution of predictions over time, the distributions and null rates of the important input features against a training reference, and the share of requests where a value was missing and we imputed a default. Those are the signals that move when the model degrades. The one thing we cannot put on a live dashboard is actual accuracy, because the labels arrive days or weeks later, which is precisely why the proxies matter so much.',
        explanation:
          'The examinable idea is that ML systems have a second failure surface which is invisible to status codes, and that monitoring it means watching distributions rather than errors.',
      },
    ],

    flashcards: [
      { front: 'Why is a 0% error rate not evidence that a model works?', back: 'A degraded model returns HTTP 200 quickly with a wrong number. Status codes measure the service, not the predictions.' },
      { front: 'Logs vs metrics vs traces', back: 'Logs are discrete events (what happened), metrics are aggregated numbers over time (how much, how often), traces follow one request across services.' },
      { front: 'Most valuable ML-specific log field?', back: '`imputed_features` — which values were missing and defaulted. It exposes silent degradation that no status code will ever show.' },
      { front: 'Why histograms rather than average latency?', back: 'Percentiles cannot be averaged across instances, and the mean hides the tail that users and upstream timeouts actually experience.' },
      { front: 'Why never label a metric with `customer_id`?', back: 'Every distinct label value is a separate time series; high cardinality exhausts the metrics backend. Per-entity detail belongs in logs.' },
      { front: 'Three properties of an alert worth paging on', back: 'It reflects user-visible harm, it has a duration clause and a baseline-derived threshold, and it links to a runbook.' },
    ],

    challenge: {
      title: 'Instrument a service so a silent failure cannot hide',
      brief:
        'Take your model service and instrument both layers. Emit structured JSON logs to stdout with request id, model version, latency and imputed features, pseudonymising any identifier. Export metrics for request count by status, a latency histogram, a prediction-score histogram and an imputation counter. Build a dashboard with the service panels on the left and the model panels on the right. Then prove it works: deliberately break a feature so it arrives null on every request, confirm the error rate stays at zero, and show which panel and which alert catch it.',
      language: 'python',
      acceptanceCriteria: [
        'Logs are one JSON object per line on stdout with consistent field names and no raw personal data',
        'Metrics include a latency histogram and a prediction-score histogram, with bounded label cardinality',
        'A dashboard shows service health and model health side by side',
        'At least one alert has a duration clause, a baseline-derived threshold and a runbook link',
        'A simulated null-feature failure leaves the error rate at zero and is caught by a model-layer signal',
        'A written note states which alerts page and which create tickets, and why',
      ],
      starterCode: 'import logging, json, sys\n\nhandler = logging.StreamHandler(sys.stdout)\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to someone who has only monitored web services what changes when the service contains a model, and what they should build first.',
      mustCover: [
        'Structured logging replaces print: levels, consistent fields, stdout, queryable',
        'Service metrics — latency percentiles, throughput, error rate — are necessary but not sufficient',
        'Model metrics — prediction distribution, feature distributions, imputation rate — catch silent failure',
        'A broken model keeps returning HTTP 200, so alerts must cover both layers',
      ],
      bonusSignals: ['mentions cardinality', 'mentions label delay meaning accuracy cannot be the primary alarm', 'mentions alert fatigue and runbooks'],
      sampleExplanation:
        'Most of what you already do carries over: structured logs instead of print, with levels and consistent field names written as JSON to stdout so the platform can collect and index them; latency as a histogram so you can read p95 and p99 rather than an average that hides the tail; request and error rates by status class. What changes is that those signals cannot see the failure that matters most. When a model breaks, it usually does not throw — an upstream column gets renamed, every value arrives null, the model imputes defaults and returns a perfectly formatted probability with a 200 status in forty milliseconds. Your dashboard stays green for a fortnight. So you build a second set of panels next to the first: the distribution of predictions over time, the null and imputation rate per feature, and the distributions of the important inputs against the window the model was trained on. Those are the ones that move. Alert on the fast, unambiguous ones — a feature suddenly missing from a fifth of requests should page — and send gradual distribution shifts to a ticket queue, because the response there is investigation and retraining rather than a 3 a.m. fix. And accept that real accuracy is not available live, because the labels arrive weeks later, which is exactly why the proxies have to be good.',
    },
  },

  {
    id: 'OPS-012',
    domain: 'OPS',
    module: 'Monitoring',
    topic: 'Drift',
    title: 'Model Drift and Data Drift',
    slug: 'model-and-data-drift',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['OPS-011'],
    related: ['OPS-008', 'OPS-010'],
    tags: ['drift', 'psi', 'ks test', 'concept drift', 'retraining', 'label delay', 'monitoring'],

    learningObjectives: [
      'Distinguish data drift, concept drift and label drift, with a concrete example of each',
      'Detect distribution change with the population stability index and the Kolmogorov-Smirnov test, and read the numbers honestly',
      'Explain why prediction-distribution monitoring is the first line of defence when labels are delayed',
      'Describe the label-delay problem and what you can measure before ground truth arrives',
      'Design a retraining trigger and pipeline, and say when retraining is the wrong response',
    ],

    terminology: [
      {
        term: 'Data drift (covariate shift)',
        definition:
          'The input distribution P(X) changes while the relationship P(Y|X) stays the same. The model is still correct about the world but is being asked about a population it saw less of during training.',
        simple: 'The kind of customers changed, but what makes them churn did not.',
      },
      {
        term: 'Concept drift',
        definition:
          'The relationship P(Y|X) itself changes: the same inputs now imply a different outcome. No amount of input monitoring detects this directly, because the inputs may look identical.',
        simple: 'The rules of the world changed under the model.',
      },
      {
        term: 'Label drift (prior shift)',
        definition:
          'The marginal distribution of the target P(Y) changes, for example the base rate of fraud rising from 0.4% to 1.1%, which affects thresholds and calibration even when P(Y|X) is stable.',
        simple: 'The outcome became more or less common overall.',
      },
      {
        term: 'Population stability index (PSI)',
        definition:
          'A binned symmetric measure of divergence between a reference distribution and a current one. Conventional readings: below 0.1 stable, 0.1 to 0.2 worth watching, above 0.2 a material shift.',
        simple: 'One number saying how far this month\'s distribution has moved from the reference.',
      },
      {
        term: 'Kolmogorov-Smirnov statistic',
        definition:
          'The maximum absolute difference between two empirical cumulative distribution functions. Non-parametric, bin-free and suitable for continuous features; its p-value becomes uselessly small at large sample sizes.',
        simple: 'The biggest gap between two cumulative curves.',
      },
      {
        term: 'Label delay',
        definition:
          'The lag between making a prediction and learning whether it was right — weeks for churn, months for credit default, sometimes never for the outcomes of actions the model itself prevented.',
        simple: 'You find out how good the prediction was long after you made it.',
      },
    ],

    simpleExplanation:
      "A model learns a relationship between inputs and outcomes from data collected in one period, and then it is asked about a world that keeps moving. There are three distinct ways that can go wrong and they need different responses. Sometimes the inputs change while the underlying relationship holds — your customers are suddenly younger because a campaign worked, but young customers still churn for the same reasons. Sometimes the relationship itself changes — a competitor launches a cheaper plan and the same customer profile that was safe last month is now at risk. And sometimes the outcome simply becomes more or less common, which quietly breaks whatever threshold you chose. The cruel part is timing. You usually cannot measure whether the model got worse, because the labels arrive weeks or months later, and by then the damage is done. So drift monitoring is the art of watching what you can see now — the distributions of the inputs and of the predictions — and treating a change in those as an early warning that something you cannot yet measure may have moved.",

    whyItExists:
      'Models are trained on a snapshot of a world that then keeps changing, so performance decays silently and no error is ever raised. Drift detection exists to provide an early signal from quantities observable today — input and prediction distributions — because the direct measure of quality depends on labels that arrive too late to prevent harm, and without such a signal degradation is discovered by the business rather than by the team.',

    analogy: {
      scenario:
        "Think of a doctor who trained twenty years ago in one city and now practises in another. Sometimes the patients are simply different — younger, or from a different occupational background — but the diseases behave as they always did, so the training is still valid, just applied to a population it saw less of. Sometimes the diseases themselves change: a pathogen mutates, a new drug interaction appears, and the pattern that reliably meant one thing now means another. The doctor does not notice either change from the consultations themselves; they notice when outcomes come back weeks later, which is precisely too late.",
      mapping: [
        { from: 'A different patient population, same diseases', to: 'Data drift: P(X) moves, P(Y|X) stable' },
        { from: 'The diseases themselves behaving differently', to: 'Concept drift: P(Y|X) changes' },
        { from: 'A condition becoming more prevalent overall', to: 'Label drift: P(Y) changes' },
        { from: 'Outcomes arriving weeks later', to: 'Label delay' },
        { from: 'Noticing the waiting room looks different', to: 'Input-distribution monitoring as an early warning' },
      ],
      bridge:
        'The doctor analogy makes the asymmetry precise: you can see the waiting room today and you cannot see the outcomes until later, so the only early signal available is the change in who walks in and what you are prescribing. That maps exactly onto monitoring input and prediction distributions rather than accuracy. It also explains why input monitoring alone is insufficient — concept drift can leave the waiting room looking identical while the correct treatment has changed, which is why delayed accuracy measurement remains mandatory even when the distributions look calm.',
      limitations:
        'A doctor can ask a patient how they feel; a model gets no feedback at all on cases where its own decision prevented the outcome from being observed, which is the feedback-loop problem that makes drift analysis genuinely hard in fraud and credit.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Three kinds of drift, and what to do about each',
        columns: ['Type', 'What changes', 'Concrete example', 'Detected by', 'Response'],
        rows: [
          ['Data drift', 'P(X)', 'A campaign brings in customers 15 years younger than the training population', 'PSI or KS on input features', 'Often retrain; sometimes nothing, if P(Y|X) holds and coverage is adequate'],
          ['Concept drift', 'P(Y|X)', 'A competitor cuts prices; the same profile now churns at twice the rate', 'Delayed accuracy and calibration; inputs may look unchanged', 'Retrain on recent data; possibly rethink features'],
          ['Label drift', 'P(Y)', 'Fraud base rate rises from 0.4% to 1.1% after a new attack', 'Positive rate in arriving labels; calibration error', 'Recalibrate and re-tune thresholds before retraining'],
          ['Upstream breakage', 'Nothing conceptual — a pipeline broke', 'A rename makes a feature null on every request', 'Null and imputation rates; a step change at a timestamp', 'Fix the pipeline. Retraining on broken data makes it permanent'],
        ],
      },
      {
        kind: 'widget',
        title: 'Watch drift accumulate',
        caption: 'Move the current window and see PSI and the KS statistic respond.',
        widget: 'drift-monitor',
      },
      {
        kind: 'flow',
        title: 'From a drift signal to a decision',
        caption: 'Retraining is one possible response, and often not the first one.',
        branching: true,
        steps: [
          { label: 'A monitor fires', detail: 'PSI on a feature exceeds 0.2, or the prediction positive rate moves sharply.' },
          { label: 'Is it a pipeline break?', detail: 'Check null and imputation rates and look for a step change at an exact timestamp. If so, fix upstream — do not retrain on broken data.' },
          { label: 'Is it seasonal?', detail: 'Compare against the same window last year, not only last month. December is not drift.' },
          { label: 'Is performance actually affected?', detail: 'Check whatever labels have arrived, and check calibration on the recent slice.' },
          { label: 'Choose the response', detail: 'Recalibrate for a base-rate move, retrain for a genuine relationship change, or accept and document if the model still meets its objective.' },
          { label: 'Gate the retrained model', detail: 'A candidate still has to beat the incumbent on a fixed holdout before it is promoted.' },
        ],
      },
      {
        kind: 'compare',
        title: 'What you can measure now versus what you must wait for',
        caption: 'Drift monitoring exists because of this gap.',
        left: {
          heading: 'Available immediately',
          points: [
            'Input feature distributions and null rates',
            'Prediction distribution and positive rate',
            'Share of inputs outside the training range',
            'Fast business proxies: click-through, queue depth, approval rate',
          ],
        },
        right: {
          heading: 'Available only later',
          points: [
            'Accuracy, AUC and calibration against true labels',
            'Per-segment realised performance',
            'The cost of false positives and false negatives',
            'Outcomes for cases the model\'s own decision prevented',
          ],
        },
      },
    ],

    formalDefinition:
      'Let a model be fitted on a joint distribution P_train(X, Y). Data drift (covariate shift) is a change in the marginal P(X) with P(Y|X) unchanged; concept drift is a change in the conditional P(Y|X); prior or label drift is a change in the marginal P(Y). Drift detection estimates a divergence between a reference sample and a current window, either feature-wise using binned divergence measures such as the population stability index or bin-free statistics such as the two-sample Kolmogorov-Smirnov statistic, or jointly using a domain classifier whose achievable discrimination between the two samples quantifies the shift.',

    math: {
      intuition:
        'Both measures answer the same question — how far has this distribution moved? — in two different ways. PSI chops the reference distribution into bins, compares the share of mass in each bin now against then, and adds up the disagreement, weighting it so that a bin which both gained proportion and differs in log terms contributes more. The Kolmogorov-Smirnov statistic skips bins entirely: it stacks both samples into cumulative curves and reports the widest vertical gap between them. PSI is the practitioner\'s tool because it is stable, interpretable and has conventional thresholds; KS is the statistician\'s, because it needs no binning choice — but its p-value is almost useless at production sample sizes, where a millionth of a percent of difference is "significant". Read the effect size, never the p-value.',
      formulas: [
        {
          latex: 'PSI = \\sum_{i=1}^{B} (a_i - e_i)\\,\\ln\\!\\left(\\frac{a_i}{e_i}\\right)',
          name: 'Population stability index',
          meaning: 'Total divergence between the current (actual) and reference (expected) distributions across B bins. Symmetric, and zero only when the two are identical.',
          variables: [
            { symbol: 'B', meaning: 'Number of bins, typically 10 deciles taken from the reference distribution' },
            { symbol: 'a_i', meaning: 'Proportion of the current sample falling in bin i' },
            { symbol: 'e_i', meaning: 'Proportion of the reference sample in bin i' },
            { symbol: '\\ln(a_i/e_i)', meaning: 'Log ratio, which makes proportional rather than absolute changes the unit of measurement' },
          ],
          category: 'statistics',
        },
        {
          latex: 'D_{n,m} = \\sup_{x} \\left| F_n(x) - G_m(x) \\right|',
          name: 'Two-sample Kolmogorov-Smirnov statistic',
          meaning: 'The largest vertical distance between the two empirical cumulative distribution functions. It ranges from 0 (identical) to 1 (disjoint supports).',
          variables: [
            { symbol: 'F_n(x)', meaning: 'Empirical CDF of the reference sample of size n' },
            { symbol: 'G_m(x)', meaning: 'Empirical CDF of the current sample of size m' },
            { symbol: '\\sup_x', meaning: 'The supremum over all values of x — in practice the maximum over the pooled sample points' },
          ],
          category: 'statistics',
        },
        {
          latex: 'PSI \\approx KL(a\\,\\|\\,e) + KL(e\\,\\|\\,a)',
          name: 'PSI as symmetrised Kullback-Leibler divergence',
          meaning: 'PSI equals the sum of the two directed KL divergences between the binned distributions, which is why it is symmetric and why it grows quickly when a bin nearly empties.',
          variables: [
            { symbol: 'a', meaning: 'The current binned distribution' },
            { symbol: 'e', meaning: 'The reference binned distribution' },
            { symbol: 'KL', meaning: 'Kullback-Leibler divergence, the expected log ratio of one distribution to another' },
          ],
          category: 'information-theory',
        },
      ],
      derivation: [
        'Start from the directed divergence of the current distribution from the reference: KL(a || e) = sum over i of a_i ln(a_i / e_i).',
        'Take the divergence in the other direction: KL(e || a) = sum over i of e_i ln(e_i / a_i), which equals minus the sum of e_i ln(a_i / e_i).',
        'Add the two: KL(a || e) + KL(e || a) = sum over i of (a_i - e_i) ln(a_i / e_i), which is exactly PSI.',
        'Symmetry follows immediately, since swapping a and e leaves both the difference term and the log term jointly unchanged in sign.',
        'The practical consequence is that an empty bin sends the log term to infinity, so implementations add a small epsilon to every bin — and if a bin is genuinely empty the honest conclusion is that the sample is too small for that bin, not that drift is infinite.',
      ],
    },

    workedExample: {
      title: 'Computing PSI on a tenure feature by hand',
      setup:
        'The reference distribution comes from the training snapshot, binned into five buckets of customer tenure. The current window is last week of live traffic. We want one number describing how far the population has moved, and a decision about whether to act.',
      steps: [
        {
          label: 'Bin the reference and the current sample',
          detail: 'Reference proportions e = [0.20, 0.20, 0.20, 0.20, 0.20] by construction (quintiles). Current proportions a = [0.32, 0.24, 0.18, 0.15, 0.11]. The population has shifted towards shorter tenure.',
        },
        {
          label: 'Compute each bin contribution',
          detail: 'Bin 1: (0.32 - 0.20) x ln(0.32/0.20) = 0.12 x 0.4700 = 0.0564.',
          latex: '(a_1 - e_1)\\ln(a_1/e_1) = 0.12 \\times \\ln(1.6) = 0.0564',
        },
        {
          label: 'Repeat for the remaining bins',
          detail: 'Bin 2: 0.04 x ln(1.2) = 0.0073. Bin 3: -0.02 x ln(0.9) = 0.0021. Bin 4: -0.05 x ln(0.75) = 0.0144. Bin 5: -0.09 x ln(0.55) = 0.0538. Note that every term is positive, because the difference and the log ratio always share a sign.',
        },
        {
          label: 'Sum',
          detail: 'PSI = 0.0564 + 0.0073 + 0.0021 + 0.0144 + 0.0538 = 0.134.',
          latex: 'PSI = 0.134',
        },
        {
          label: 'Interpret against the conventions',
          detail: 'Between 0.1 and 0.2 means a moderate shift: worth investigating, not an emergency. The direction is informative — the mass moved to shorter tenure, which is consistent with a successful acquisition campaign rather than with a broken pipeline.',
        },
        {
          label: 'Decide',
          detail: 'Check whether tenure is an important feature for this model, whether the new short-tenure region was well represented in training, and whether calibration on recently labelled short-tenure customers has degraded. If coverage is good and calibration holds, document and continue monitoring rather than retraining reflexively.',
        },
      ],
      conclusion:
        'PSI of 0.134 is a signal, not a verdict. It says the input population moved materially in a specific direction; it says nothing about whether the model is worse. The conventional thresholds — 0.1 and 0.2 — are rules of thumb from credit scoring, not laws, and a team should calibrate its own thresholds by measuring what PSI values historically preceded a real performance drop.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'PSI and KS, implemented and read correctly',
        code: `import numpy as np
from scipy.stats import ks_2samp


def psi(reference: np.ndarray, current: np.ndarray, bins: int = 10, eps: float = 1e-6) -> float:
    """Population stability index using quantile bins from the REFERENCE sample."""
    edges = np.quantile(reference, np.linspace(0, 1, bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf          # catch values outside training range

    e = np.histogram(reference, bins=edges)[0] / len(reference)
    a = np.histogram(current, bins=edges)[0] / len(current)
    e, a = np.clip(e, eps, None), np.clip(a, eps, None)

    return float(np.sum((a - e) * np.log(a / e)))


ref = np.random.default_rng(0).normal(36, 12, 50_000)       # training tenure
cur = np.random.default_rng(1).normal(29, 14, 8_000)        # last week

print(f"PSI  = {psi(ref, cur):.3f}")                 # PSI  = 0.147
stat, p = ks_2samp(ref, cur)
print(f"KS   = {stat:.3f}  p = {p:.2e}")             # KS   = 0.238  p = 1.4e-97

# The p-value is meaningless here: with 58,000 samples any difference is 'significant'.
# Read the effect size (0.238) and PSI (0.147), and compare against YOUR baseline.`,
        explanation:
          'Three implementation details decide whether this is useful or misleading. Bin edges come from the reference sample and are then frozen, because re-binning on the current data would hide exactly the shift you are looking for. The outer edges are set to infinity so values outside the training range land somewhere instead of being silently dropped — those out-of-range values are often the most interesting signal. And the epsilon clip prevents an empty bin sending the log term to infinity, though an empty bin usually means your window is too small rather than that drift is infinite.',
      },
      {
        language: 'python',
        title: 'A scheduled drift report over every feature and the predictions',
        code: `import pandas as pd

REFERENCE = pd.read_parquet("data/train_snapshot.parquet")    # the model's training data
MONITORED = ["tenure_months", "monthly_charges", "usage_gb", "support_calls"]


def drift_report(window: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for col in MONITORED:
        rows.append({
            "feature": col,
            "psi": psi(REFERENCE[col].to_numpy(), window[col].dropna().to_numpy()),
            "ks": ks_2samp(REFERENCE[col], window[col].dropna()).statistic,
            "null_rate_now": float(window[col].isna().mean()),
            "null_rate_ref": float(REFERENCE[col].isna().mean()),
            "out_of_range": float(((window[col] < REFERENCE[col].min())
                                   | (window[col] > REFERENCE[col].max())).mean()),
        })

    # The prediction distribution is the single most valuable series to watch.
    rows.append({
        "feature": "__prediction__",
        "psi": psi(REFERENCE["train_score"].to_numpy(), window["score"].to_numpy()),
        "ks": ks_2samp(REFERENCE["train_score"], window["score"]).statistic,
        "null_rate_now": 0.0, "null_rate_ref": 0.0, "out_of_range": 0.0,
    })

    out = pd.DataFrame(rows).sort_values("psi", ascending=False)
    out["status"] = pd.cut(out["psi"], [-1, 0.1, 0.2, 99],
                           labels=["stable", "watch", "investigate"])
    return out


report = drift_report(pd.read_parquet("logs/predictions/dt=2024-09-02/"))
print(report.to_string(index=False))
#          feature    psi    ks  null_rate_now  null_rate_ref  out_of_range      status
#  __prediction__  0.412 0.311          0.000          0.000         0.000 investigate
#   support_calls  0.386 0.290          0.941          0.002         0.000 investigate
#   tenure_months  0.147 0.238          0.001          0.002         0.031       watch`,
        explanation:
          'The report is deliberately ordered by PSI, because the top row is usually the story. Here it tells a specific one: the prediction distribution has shifted a lot, and `support_calls` has a null rate of 94% against 0.2% in training. That combination is not drift at all — it is a broken upstream pipeline, and retraining on this window would bake the breakage into the model permanently. The `out_of_range` column is the underrated one, since a feature whose values have moved outside the training range means the model is extrapolating, which no PSI threshold captures on its own.',
      },
      {
        language: 'python',
        title: 'A retraining trigger with the guards that stop it misfiring',
        code: `from dataclasses import dataclass

@dataclass
class RetrainDecision:
    should_retrain: bool
    reason: str


def decide(report, labelled_recent, days_since_train: int, label_coverage: float) -> RetrainDecision:
    # 1. A broken pipeline is NOT drift. Never retrain on corrupted inputs.
    broken = report[(report.null_rate_now > 0.2) & (report.null_rate_ref < 0.02)]
    if not broken.empty:
        return RetrainDecision(False, f"upstream broken: {list(broken.feature)} — fix the pipeline")

    # 2. Never retrain on too few labels; you will fit noise and pass the gate by luck.
    if label_coverage < 0.6 or len(labelled_recent) < 5_000:
        return RetrainDecision(False, "insufficient labelled data in the recent window")

    # 3. Measured performance drop is the strongest trigger available.
    if labelled_recent.auc < labelled_recent.baseline_auc - 0.02:
        return RetrainDecision(True, f"AUC {labelled_recent.auc:.3f} below baseline by more than 0.02")

    # 4. Calibration can fail while ranking is fine — recalibrate rather than retrain.
    if labelled_recent.ece > 0.05:
        return RetrainDecision(False, "ranking intact, calibration degraded — refit the calibrator")

    # 5. Input drift alone is a weak trigger. Require it to be large and persistent.
    severe = report[(report.feature != "__prediction__") & (report.psi > 0.25)]
    if len(severe) >= 2 and days_since_train > 30:
        return RetrainDecision(True, f"sustained drift on {list(severe.feature)}")

    # 6. Scheduled refresh keeps the model close to the present even without a signal.
    if days_since_train > 90:
        return RetrainDecision(True, "scheduled quarterly refresh")

    return RetrainDecision(False, "within tolerance")`,
        explanation:
          'The order of these checks is the lesson. The first two guards exist because the most common cause of a drift alert is a broken pipeline and the most common cause of a bad retrain is too few labels — retraining in either case makes things permanently worse. Only then do measured performance and calibration get consulted, and note that a calibration failure with intact ranking is answered by refitting a calibrator, which takes minutes, rather than by retraining, which takes hours. Input drift alone is deliberately the weakest trigger, because P(X) moving does not imply P(Y|X) moved.',
      },
    ],

    realWorldExamples: [
      {
        context: 'The pandemic breaking every demand model',
        usage:
          'In March 2020 essentially every retail and travel forecasting model failed at once. This was concept drift in its purest form: the inputs were still well within training ranges, but what they implied about behaviour had changed completely, so no input-distribution monitor could have raised the alarm before outcomes arrived.',
      },
      {
        context: 'Fraud attackers as an adversary',
        usage:
          'Fraud patterns drift because a human opponent is deliberately probing the model. Feature distributions move within weeks and the base rate shifts, so fraud teams retrain frequently, monitor alert rates as a fast proxy, and treat a sudden change in the flagged-transaction rate as a paging signal.',
      },
      {
        context: 'A drift alert that was really a rename',
        usage:
          'A team retrained after a large PSI on `support_calls`, and the new model was worse. The cause was an upstream rename that made the field null; the retrain had fitted a model on a feature that no longer existed. The guard that now sits first in their pipeline is a null-rate check that blocks retraining outright.',
      },
    ],

    projectConnections: [
      { tool: 'Evidently', role: 'Generates drift reports per feature and per prediction with tests and dashboards, from logged payloads.' },
      { tool: 'whylogs / WhyLabs', role: 'Computes compact statistical profiles of each batch so distributions can be compared without storing raw data.' },
      { tool: 'Prometheus + Grafana', role: 'Hosts the fast signals — prediction positive rate, null and imputation rates — that catch abrupt breakage within minutes.' },
      { tool: 'Airflow / Prefect', role: 'Schedules the drift report and the retraining pipeline, and carries the decision logic between them.' },
      { tool: 'MLflow registry', role: 'Holds the retrained candidate so it can be gated against the incumbent before any promotion.' },
    ],

    commonMistakes: [
      {
        mistake: 'Treating a PSI threshold as a decision rather than a signal',
        why: 'PSI above 0.2 says the input population moved; it says nothing about whether the model got worse. Retraining reflexively costs money, introduces risk, and may fit a worse model on a window that merely looks different.',
        fix: 'Use drift as a trigger to investigate. Confirm with delayed performance and calibration where labels exist, and gate any retrained candidate against the incumbent before promotion.',
      },
      {
        mistake: 'Mistaking a broken pipeline for drift',
        why: 'An upstream rename or a failed join produces an enormous distribution change that looks exactly like severe drift. Retraining on that window teaches the model that the feature is genuinely absent, making the damage permanent.',
        fix: 'Check null rates, cardinality and whether the change is a step at an exact timestamp before anything else. A step change at 02:15 is a deploy, not the world moving.',
      },
      {
        mistake: 'Comparing the current window against the previous week only',
        why: 'Seasonality then reads as drift every December and every Monday morning, and slow year-long drift becomes invisible because each week resembles the one before it.',
        fix: 'Keep a fixed reference — the training distribution — and compare against it, adding same-period-last-year comparisons for seasonal features.',
      },
      {
        mistake: 'Relying on KS p-values at production sample sizes',
        why: 'With hundreds of thousands of rows, the p-value is astronomically small for differences far too small to matter, so every feature is permanently "significantly drifted" and the signal is useless.',
        fix: 'Report effect sizes — the KS statistic itself, PSI, or a shift in mean expressed in reference standard deviations — and set thresholds from historical values that preceded real degradation.',
      },
      {
        mistake: 'Retraining automatically on a fixed schedule with no gate',
        why: 'A scheduled retrain on a bad window ships a worse model with nothing standing in its way, and because ML failure is silent it can persist for weeks.',
        fix: 'Always place an evaluation gate between training and promotion: the candidate must beat the incumbent on a fixed holdout, clear an absolute floor, and not regress per segment.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'Explain the difference between data drift and concept drift, with an example of each, and say which is more dangerous.',
        answer:
          'Data drift is a change in P(X): the input population moves while the relationship between inputs and outcome holds. A marketing campaign brings in customers fifteen years younger, but young customers still churn for the same reasons — the model is being asked about a region it saw less of, so performance may degrade through poor coverage rather than through being wrong about the world. Concept drift is a change in P(Y|X): the same inputs now imply a different outcome. A competitor launches a cheaper plan and the profile that was safe last month now churns at twice the rate, with the input distribution possibly unchanged. Concept drift is more dangerous precisely because it is invisible to input monitoring: every feature can look perfectly stable while the model is increasingly wrong, and you only find out when labels arrive. That is why input drift monitoring is an early-warning system rather than a complete one, and why delayed performance measurement remains mandatory.',
        followUp:
          'A strong answer adds label drift as a third case — the base rate moving — and notes that it breaks calibration and thresholds even when P(Y|X) is stable, and is fixed by recalibration rather than retraining.',
      },
      {
        level: 'ml-engineer',
        question: 'Labels for your churn model arrive 60 days after the prediction. How do you know today whether the model is working?',
        answer:
          'You cannot know directly, so you build a layered set of proxies and accept the uncertainty honestly. Immediately available: the prediction distribution — mean score, positive rate, full histogram — compared against a fixed reference, since a sharp move there is the earliest sign of anything; the input feature distributions and, more urgently, null and imputation rates, which catch pipeline breakage within minutes; and the fraction of inputs falling outside the training range, which indicates extrapolation. Within days: fast business proxies that correlate with the outcome, such as engagement with a retention offer or the volume entering a review queue. At 60 days: the real thing — AUC, calibration and per-segment performance on the labelled cohort, which I would compute on a rolling basis so degradation is measured even though it is measured late. I would also run a small holdout of untreated customers where feasible, because if the model\'s own interventions change outcomes, the labels you get back are not the labels the model was predicting.',
        followUp:
          'The last point is the deep one: acting on predictions contaminates the feedback, which is why fraud and credit teams keep a small random control group even at a cost.',
      },
      {
        level: 'ml-engineer',
        question: 'Design a retraining strategy for a model whose inputs drift steadily. What triggers it, what guards it, and when do you refuse?',
        answer:
          'I would use a hybrid of scheduled and triggered retraining. A scheduled refresh — monthly or quarterly depending on how fast the domain moves — keeps the model close to the present even without a signal, and it exercises the pipeline so it does not rot. On top of that, triggers: a measured performance drop on the labelled cohort is the strongest; sustained large drift on at least two important features over a month is a weaker one; and a base-rate change triggers recalibration rather than retraining. The guards matter as much as the triggers. Refuse to retrain when null or imputation rates indicate a broken pipeline, because you would make the breakage permanent. Refuse when the labelled window is too small or label coverage too low, because the candidate will fit noise and may pass the gate by luck. Refuse when ranking is intact and only calibration has drifted, since refitting a calibrator takes minutes instead of hours. And whatever triggers it, the retrained candidate goes through the same evaluation gate as any other: beat the incumbent on a fixed versioned holdout, clear an absolute floor, no per-segment regression, then a canary rollout.',
        followUp:
          'Mentioning that the retraining window length is itself a hyperparameter — too short and you fit noise, too long and you dilute the recent regime — shows the candidate has actually tuned one.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'A feature shows PSI 0.41 and its null rate went from 0.1% to 88% overnight. What is your first action, and what must you not do?',
        hint: 'Does the world change overnight, at an exact timestamp?',
        solution:
          'First action: treat it as an upstream breakage, not drift. Find the exact timestamp of the step change and correlate it with deploys and pipeline runs on the producing side; a distribution that moves discontinuously at 02:15 is a code change, whereas genuine drift is gradual. Then decide whether to fail over to a previous model, reject affected requests, or serve with a documented degradation while it is fixed. What you must not do is retrain on this window: the model would learn that the feature is absent, which bakes the outage into the weights and makes recovery require another retrain after the pipeline is fixed. Add a guard that blocks retraining whenever a monitored feature\'s null rate exceeds a threshold far above its reference.',
      },
      {
        prompt:
          'Your KS test reports p = 3e-140 for every feature every week. Explain why and propose what to report instead.',
        hint: 'What happens to a hypothesis test as n grows?',
        solution:
          'With hundreds of thousands of rows, a two-sample test has enormous power, so it detects differences far too small to matter and the p-value collapses towards zero for any non-identical distributions. The test is answering "are these exactly the same?" — to which the answer is always no — rather than "have they moved enough to care?". Report effect sizes instead: the KS statistic itself, PSI, or the shift in mean expressed in reference standard deviations, alongside the raw shift in a unit a human understands such as "median tenure fell from 36 to 29 months". Then set thresholds empirically by looking back at what values historically preceded a genuine performance drop for this model, rather than adopting a convention from somebody else\'s domain.',
      },
      {
        prompt:
          'Design the drift monitoring for a fraud model, where the base rate is 0.5%, labels take 45 days and an adversary is actively adapting.',
        hint: 'Which signals move within hours, and what does adversarial adaptation do to the reference?',
        solution:
          'Fast layer, minutes: alert rate — the fraction of transactions flagged — against a seasonal baseline, since an attack or a broken feature moves it immediately and it is the number the review team feels first; the score distribution as a histogram; and null and imputation rates per feature. Medium layer, daily: PSI and out-of-range rates on key features against the training reference, plus cardinality checks on categoricals, because new merchant categories or device types appearing is a classic adversarial signal. Slow layer, 45 days: realised precision and recall on the labelled cohort, per segment, plus calibration. Two fraud-specific points: keep a small random unblocked control group if policy allows, because blocked transactions never reveal whether they were fraudulent, so your labels are censored by your own actions; and treat the reference distribution as needing periodic deliberate refresh, since with an adaptive adversary the training distribution becomes stale faster than in most domains.',
      },
    ],

    quiz: [
      {
        id: 'OPS-012-q1',
        type: 'mcq',
        concept: 'types of drift',
        prompt: 'A competitor cuts prices and customers who previously stayed now churn, although the input feature distributions are unchanged. What is this?',
        options: ['Concept drift', 'Data drift', 'Label drift', 'An upstream pipeline break'],
        answerIndex: 0,
        explanation:
          'P(Y|X) changed while P(X) did not: the same inputs now imply a different outcome. This is exactly the case no input-distribution monitor can detect, which is why delayed performance measurement stays mandatory.',
      },
      {
        id: 'OPS-012-q2',
        type: 'numeric',
        concept: 'PSI calculation',
        prompt: 'A single bin holds 30% of the current sample and 20% of the reference. What is that bin\'s contribution to PSI? Give three decimal places.',
        answer: 0.041,
        tolerance: 0.003,
        explanation:
          '(0.30 - 0.20) x ln(0.30/0.20) = 0.10 x 0.4055 = 0.0405. Every bin contributes a non-negative amount because the difference and the log ratio always share a sign, which is why PSI is a sum of positive terms.',
      },
      {
        id: 'OPS-012-q3',
        type: 'truefalse',
        concept: 'drift and action',
        prompt: 'A PSI above 0.2 on an input feature means the model has degraded and should be retrained.',
        answer: false,
        explanation:
          'It means the input distribution moved. Whether the model got worse depends on whether P(Y|X) changed and whether the new region was covered in training. Confirm with delayed performance before retraining, and rule out a broken pipeline first.',
      },
      {
        id: 'OPS-012-q4',
        type: 'multi',
        concept: 'what to check first',
        prompt: 'A drift alert fires. Which checks come before any decision to retrain? Select all that apply.',
        options: [
          'Null and imputation rates, to rule out a broken upstream pipeline',
          'Whether the change is a step at an exact timestamp rather than gradual',
          'Comparison against the same period last year, for seasonality',
          'Whether enough recent labels exist to train and evaluate honestly',
          'Whether the drift number exceeds 0.2',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'The threshold is what triggered the investigation; it is not itself a check. The other four each identify a situation where retraining would be useless or actively harmful.',
      },
      {
        id: 'OPS-012-q5',
        type: 'mcq',
        concept: 'label delay',
        prompt: 'Labels arrive 60 days after prediction. What is the most useful signal available today?',
        options: [
          'The prediction distribution compared against a fixed reference',
          'AUC on the last 60 days of predictions',
          'The training-set accuracy',
          'The number of requests served',
        ],
        answerIndex: 0,
        explanation:
          'Accuracy is unavailable by construction, and training accuracy says nothing about now. The output distribution is observable immediately and moves early when either inputs or the pipeline change.',
      },
      {
        id: 'OPS-012-q6',
        type: 'explain',
        concept: 'retraining judgement',
        prompt: 'Your monitoring shows clear input drift. Give three situations in which retraining would be the wrong response, and say what to do instead.',
        rubric: [
          'Names a broken pipeline as drift-shaped but requiring a fix, not a retrain',
          'Names insufficient or biased labels in the recent window',
          'Names a calibration-only failure, or drift with no measured performance impact',
        ],
        sampleAnswer:
          'First, when the apparent drift is an upstream breakage — a rename or a failed join making a feature null. Retraining then teaches the model that the feature does not exist, which makes the outage permanent and requires a second retrain after the fix. The action is to fix the pipeline and, meanwhile, fail over or shed the affected requests. Second, when there are too few recent labels, or the labels are biased by the model\'s own actions, because a candidate fitted on a thin or censored window will fit noise and may pass the gate by luck; the action is to wait, or to weight older data, or to obtain unbiased labels through a small control group. Third, when ranking is intact and only calibration has moved because the base rate changed: refitting a calibrator on recent labelled data takes minutes and fixes the thresholds, whereas a full retrain is hours of risk for the same outcome. A fourth honest case is drift with no measured performance impact at all, where the correct action is to document it and keep watching.',
        explanation:
          'The examinable judgement is that drift is a signal to investigate, and that the right response depends on which of several very different underlying causes produced it.',
      },
    ],

    flashcards: [
      { front: 'Data drift vs concept drift vs label drift', back: 'P(X) changes; P(Y|X) changes; P(Y) changes. Only the first is visible in input distributions, which is why concept drift is the dangerous one.' },
      { front: 'PSI thresholds, conventionally', back: 'Below 0.1 stable, 0.1 to 0.2 watch, above 0.2 material shift. They are rules of thumb from credit scoring, not laws — calibrate to your own history.' },
      { front: 'Why not use the KS p-value in production?', back: 'At large n any difference is significant, so the p-value is always tiny. Read the effect size — the KS statistic or PSI — instead.' },
      { front: 'What is the label-delay problem?', back: 'Ground truth arrives weeks or months after the prediction, so accuracy cannot be a live alarm. You monitor input and prediction distributions as proxies.' },
      { front: 'First check when a drift alert fires?', back: 'Null and imputation rates, and whether the change is a step at an exact timestamp. A broken pipeline looks exactly like severe drift.' },
      { front: 'When does calibration, not retraining, fix the problem?', back: 'When ranking is intact but the base rate moved. Refit a calibrator on recent labelled data — minutes rather than hours, with far less risk.' },
    ],

    challenge: {
      title: 'Build a drift monitor and make it lie to you',
      brief:
        'Take a dataset with a time column. Train a model on the first period and hold out the rest as a simulated live stream. Build a weekly drift report computing PSI, the KS statistic, null rate and out-of-range rate for every feature and for the predictions. Then inject three faults into the stream: a gradual covariate shift, an abrupt null-feature break, and a concept change where you flip the relationship for one segment. Show which faults your monitor catches, which it misses, and how long each takes to detect — then write the retraining rule you would actually deploy, including the guards.',
      language: 'python',
      acceptanceCriteria: [
        'A weekly report with PSI, KS, null rate and out-of-range rate per feature and for the prediction',
        'Bin edges are taken from the fixed reference distribution and never recomputed on the current window',
        'All three injected faults are analysed with the detection delay measured for each',
        'A written explanation of why the concept-drift fault is hardest to detect from inputs alone',
        'A retraining rule with explicit guards for broken pipelines and insufficient labels',
        'Thresholds justified from observed baseline variability rather than copied conventions',
      ],
      starterCode: 'import numpy as np\nimport pandas as pd\n\ndef psi(reference, current, bins=10, eps=1e-6):\n    ...\n',
    },

    teachingPrompt: {
      prompt:
        'Explain to a colleague why a model that was excellent at launch can be quietly mediocre six months later, how you would notice, and what you would do about it.',
      mustCover: [
        'Three kinds of drift: inputs changing, the relationship changing, the base rate changing',
        'Detection with PSI and KS on inputs and predictions, read as effect sizes',
        'The label-delay problem and why prediction distributions are the first line of defence',
        'Retraining is one response among several, and requires guards and a gate',
      ],
      bonusSignals: ['distinguishes a broken pipeline from drift', 'mentions seasonality versus drift', 'mentions recalibration as a cheaper fix'],
      sampleExplanation:
        'A model learns a relationship from one period of data and is then asked about a world that keeps moving, and there are three distinct ways that hurts. The inputs can change while the relationship holds — a campaign brings in younger customers, who still churn for the same reasons. The relationship itself can change — a competitor cuts prices, and a profile that was safe now is not, with the inputs looking identical. Or the outcome can simply become more or less common, which breaks whatever threshold you set. You would love to detect this by watching accuracy, but you usually cannot, because the labels arrive weeks or months later. So you watch what is observable today: the distributions of the inputs and of the predictions, compared against a fixed reference taken from the training data, using PSI or the KS statistic — and reading the effect size rather than a p-value, which is meaningless at production sample sizes. When something moves, the first question is not "should we retrain" but "is this even real": check the null rates and look for a step change at an exact timestamp, because a broken upstream pipeline looks exactly like catastrophic drift and retraining on it makes the damage permanent. Then check seasonality against last year. Only when it is genuine do you choose a response, and retraining is only one of them — a base-rate shift is often fixed by recalibration in minutes, and whatever you train still has to beat the current model on a fixed holdout before it is allowed near production.',
    },
  },

  {
    id: 'OPS-013',
    domain: 'OPS',
    module: 'ML System Design',
    topic: 'System design',
    title: 'Designing an ML System End to End',
    slug: 'ml-system-design',
    difficulty: 5,
    estimatedMinutes: 50,
    prerequisites: ['OPS-004', 'OPS-005', 'OPS-008', 'OPS-009', 'OPS-011', 'OPS-012'],
    related: ['OPS-007', 'OPS-010'],
    tags: ['system design', 'interview', 'feature store', 'architecture', 'feedback loop', 'recommendation', 'fraud'],

    learningObjectives: [
      'Run a repeatable framework for an ML system design interview, from clarifying the problem to closing the feedback loop',
      'Translate a vague business request into an ML framing with an explicit objective and success metrics',
      'Choose offline and online metrics, and explain why they disagree',
      'Design the data path: sources, labelling, features, a feature store, and training-serving consistency',
      'Design the serving path: batch versus real time, caching, queues, storage and scaling',
      'Close the loop with monitoring, retraining and an honest account of failure modes and feedback effects',
    ],

    terminology: [
      {
        term: 'ML framing',
        definition:
          'The translation of a business goal into a learnable task: what is predicted, at what granularity, over what horizon, and what decision the prediction drives. Most weak designs fail here rather than in the modelling.',
        simple: 'Turning "reduce fraud" into a precise question a model can answer.',
      },
      {
        term: 'Offline vs online metric',
        definition:
          'An offline metric is computed on historical held-out data (AUC, precision at k, NDCG). An online metric is measured on live traffic (click-through rate, revenue, chargeback rate). They frequently disagree, and the online one is what matters.',
        simple: 'The lab score versus what actually happened with real users.',
      },
      {
        term: 'Feature store',
        definition:
          'A system holding feature definitions with both an offline store for training and a low-latency online store for serving, computed by shared code so that training and serving cannot silently diverge.',
        simple: 'One place features are defined, so training and serving use the same numbers.',
      },
      {
        term: 'Training-serving skew',
        definition:
          'Any difference between how a feature is computed during training and at inference — a different default, a different time window, a different join. It degrades models silently and is among the most common production ML bugs.',
        simple: 'The model was taught with one recipe and fed with another.',
      },
      {
        term: 'Feedback loop',
        definition:
          'The effect of a model\'s own outputs on the data it later trains on: shown items get clicked, blocked transactions never reveal their outcome, so the training distribution becomes a consequence of past predictions.',
        simple: 'The model changes the world it later learns from.',
      },
      {
        term: 'Candidate generation and ranking',
        definition:
          'A two-stage retrieval pattern: a cheap approximate stage narrows millions of items to a few hundred, then an expensive model ranks only those. It is how recommendation meets a latency budget at all.',
        simple: 'Shortlist quickly, then score the shortlist carefully.',
      },
    ],

    simpleExplanation:
      "An ML system design question sounds impossibly open — \"design a fraud detection system\" — and the mistake almost everyone makes is to start talking about models. The model is perhaps a tenth of the work and rarely the part that decides whether the system succeeds. What makes an answer strong is a repeatable order. First clarify what is actually being asked: who uses it, what decision it drives, how fast the answer must come, how much traffic there is, and what a mistake costs in each direction. Then state the ML framing precisely, because \"reduce fraud\" is not a task and \"predict the probability that a transaction will be charged back within 60 days\" is. Then define how you will know it worked, offline and online, and accept that those two will disagree. Then walk the data path — where labels come from, how features are computed, and how you stop training and serving from diverging. Then the serving path, deciding between batch and real time, and what to cache, queue and store. Then scale, monitoring and retraining. Then, last and most revealing, talk about how the system\'s own decisions contaminate the data it will learn from next.",

    whyItExists:
      'A model that is excellent in a notebook routinely fails as a product because the hard parts live elsewhere: an unclear objective, labels that do not exist, features that cannot be computed at serving time within the latency budget, and a feedback loop that poisons the next training set. A design framework exists so those failure modes are surfaced before the work is done, and it is an interview round precisely because the ability to see them is what distinguishes an engineer who can ship from one who can only train.',

    analogy: {
      scenario:
        "Think of designing a hospital rather than hiring a surgeon. The surgeon matters, but the building fails or succeeds on triage rules that decide who is seen first, on how records reach the right room, on what happens when the ambulance bay is full at 2 a.m., on which measurements are taken and written down, and on the review process that catches mistakes weeks later. A brilliant surgeon in a hospital with no triage and no records produces worse outcomes than a competent one in a well-designed building.",
      mapping: [
        { from: 'The surgeon', to: 'The model itself — necessary, and a small share of the design' },
        { from: 'Triage rules at the door', to: 'The ML framing and the decision policy the prediction drives' },
        { from: 'Records reaching the right room in time', to: 'The feature pipeline and the online feature store, within the latency budget' },
        { from: 'The ambulance bay at capacity', to: 'Load shedding, queueing, caching and fallbacks under peak traffic' },
        { from: 'Measurements written down every time', to: 'Prediction logging with model version, which enables everything afterwards' },
        { from: 'The weekly mortality and morbidity review', to: 'Monitoring, delayed evaluation and the retraining decision' },
      ],
      bridge:
        'The analogy earns its place because it reorders your attention correctly: in a real system the model is one component among many, and the components around it determine whether its accuracy ever reaches a user. Concretely, a model with 0.94 AUC that needs a feature unavailable at serving time has an effective AUC of zero, and a model whose predictions are never logged with their version cannot be debugged or improved at all. Where the analogy stops is the feedback loop — a hospital does not change which patients get ill, whereas a deployed model absolutely changes the data it will next be trained on.',
      limitations:
        'Hospitals have decades of established protocol; ML systems are usually being designed for the first time, so the framework is a checklist for thinking rather than a set of known-correct answers.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'The framework, in the order you should say it',
        caption: 'Spending the first five minutes here is what separates a strong answer from a model-first one.',
        steps: [
          { label: '1. Clarify', detail: 'Users, the decision the output drives, latency budget, traffic, cost of a false positive versus a false negative, constraints such as privacy or regulation.' },
          { label: '2. Frame as ML', detail: 'What exactly is predicted, at what granularity and horizon. Ask whether a heuristic would do — sometimes the honest answer is that it would.' },
          { label: '3. Define success', detail: 'One primary online metric, supporting offline metrics, and explicit guardrail metrics that must not regress.' },
          { label: '4. Data and labels', detail: 'Sources, volume, how labels arise, their delay and bias, and how you will evaluate honestly.' },
          { label: '5. Features', detail: 'What is computable at serving time within the budget, and how training and serving share one definition.' },
          { label: '6. Model', detail: 'Start with a baseline. Justify complexity against latency, interpretability and the cost of being wrong.' },
          { label: '7. Serving', detail: 'Batch, real time or a hybrid; candidate generation then ranking; caching, queues, storage, fallbacks.' },
          { label: '8. Scale', detail: 'Peak QPS, replicas, autoscaling, cost per thousand predictions, degradation strategy under overload.' },
          { label: '9. Monitor and retrain', detail: 'Service and model dashboards, drift, delayed evaluation, retraining triggers and the promotion gate.' },
          { label: '10. Feedback and risk', detail: 'How the model changes its own training data, fairness across segments, abuse and the failure modes you accept.' },
        ],
      },
      {
        kind: 'widget',
        title: 'The full pipeline as one picture',
        caption: 'Data sources through features, training, registry, serving and back again.',
        widget: 'ml-pipeline-flow',
      },
      {
        kind: 'compare',
        title: 'Batch versus real-time serving, decided properly',
        caption: 'Most systems are a hybrid, and saying so is a strong answer.',
        left: {
          heading: 'Batch, precomputed',
          points: [
            'Score on a schedule, serve from a key-value store',
            'Lookup latency, negligible cost per prediction',
            'Only works when no feature changes within the request',
            'Cannot handle a new user or a new item',
          ],
        },
        right: {
          heading: 'Real-time inference',
          points: [
            'Scores at request time with fresh session features',
            'Tens of milliseconds, and real infrastructure to run',
            'Handles cold start and in-session behaviour',
            'Needs an online feature store with a strict latency budget',
          ],
        },
      },
      {
        kind: 'table',
        title: 'Two worked framings',
        columns: ['Question', 'Recommendation feed', 'Card fraud detection'],
        rows: [
          ['Prediction target', 'P(user engages with item | context)', 'P(transaction is charged back within 60 days)'],
          ['Latency budget', '150 ms for the whole feed', '40 ms, inline in the authorisation path'],
          ['Label source', 'Implicit: clicks, watches, skips. Biased by what was shown', 'Chargebacks and confirmed fraud reports, delayed 30 to 60 days'],
          ['Class balance', 'Roughly balanced after negative sampling', 'Extremely imbalanced, around 0.1 to 0.5% positive'],
          ['Primary online metric', 'Long-session rate or day-7 retention, not raw click-through', 'Fraud loss in currency at a fixed false-positive budget'],
          ['Architecture', 'Candidate generation then ranking then business rules', 'Single low-latency model plus rules, with a review queue'],
          ['Dominant risk', 'Feedback loop and popularity collapse', 'Adversarial adaptation and censored labels from blocked transactions'],
        ],
      },
    ],

    formalDefinition:
      'An end-to-end machine learning system is the composition of a data path and a serving path around a learned decision function. The data path acquires observations and labels, transforms them into features under a single definition shared by training and inference, and produces versioned models gated on held-out evaluation. The serving path binds a feature retrieval mechanism, an inference runtime and a decision policy within a latency and cost budget, and emits instrumented outcomes. The design is correct only if the joint distribution assumed at training time is reproduced at inference time, and if the effect of the system\'s own decisions on subsequent observations is accounted for in evaluation.',

    workedExample: {
      title: 'Designing a card fraud detection system in ten minutes',
      setup:
        'The prompt is "design a system to detect fraudulent card transactions for a payments company processing 5,000 transactions per second at peak". Nothing else is given, which is deliberate. What follows is the order in which to speak, with the reasoning that makes each step defensible.',
      steps: [
        {
          label: '1. Clarify before designing',
          detail: 'Where does this sit — inline in authorisation, so we must answer before the transaction completes, or asynchronously for review? Assume inline, which fixes a budget around 40 ms end to end. What is the cost asymmetry? A blocked legitimate transaction costs a furious customer and possibly the relationship; a missed fraud costs the chargeback amount. That asymmetry, not accuracy, drives the threshold. Any regulatory constraint on explainability for declines? Assume yes, which favours a model we can attribute.',
        },
        {
          label: '2. Frame it as a prediction task',
          detail: 'Predict P(chargeback within 60 days | transaction, card history, merchant, device) at the moment of authorisation. Not "is this fraud", which is unobservable, but the operationally defined event we can actually label. The output feeds a policy with three actions — approve, challenge with step-up authentication, decline — so the model produces a probability and the policy owns the thresholds.',
        },
        {
          label: '3. Define success on both axes',
          detail: 'Online primary: fraud loss in currency per million transactions, at a false-positive budget expressed as a maximum decline rate on legitimate transactions — say 0.1%. Offline: precision and recall at that operating point, and PR-AUC rather than ROC-AUC because positives are around 0.2%. Guardrails that must not regress: authorisation latency p99, overall approval rate, and decline rate per customer segment, because a fairness regression here is a serious harm.',
        },
        {
          label: '4. Data and labels, including the uncomfortable parts',
          detail: 'Sources: the transaction stream, card and account history, merchant reputation, device and IP signals. Labels come from chargebacks and confirmed reports, arriving 30 to 60 days later — so today\'s model is evaluated on spring\'s labels. Two biases must be stated: blocked transactions never produce an outcome, so labels are censored by our own decisions, and the adversary adapts, so old fraud patterns under-represent current ones. Mitigation: keep a small randomly approved control slice where the loss is affordable, and weight recent data more heavily.',
        },
        {
          label: '5. Features, constrained by the latency budget',
          detail: 'Three tiers. Transaction-local, free: amount, merchant category, hour, cross-border flag. Aggregates over the card, requiring an online store: count and sum in the last 1, 24 and 168 hours, distinct merchants today, time since previous transaction. Entity reputation: merchant and device fraud rates, precomputed in batch. All aggregates are defined once and computed by shared code, materialised to an offline store for training and an online key-value store for serving, because a window computed as "last 24 hours" in training and "since midnight" in serving is a classic training-serving skew that will quietly cost accuracy.',
        },
        {
          label: '6. Model, starting deliberately simple',
          detail: 'Baseline: existing rules plus logistic regression on the tier-one features, which establishes what the complexity has to beat. Then gradient-boosted trees, which handle tabular data with mixed types well, train in minutes, score in well under a millisecond and support attribution for the explainability requirement. Consider a sequence model over the card\'s recent transactions only if the boosted trees plateau and the latency budget allows it. Keep the rules engine alongside the model rather than replacing it, since some patterns are known with certainty and do not need learning.',
        },
        {
          label: '7. Serving architecture',
          detail: 'Real time, no choice, because the decision is inline. Path: authorisation request arrives, fetch card aggregates from the online store with a hard 10 ms timeout, assemble features, score, apply the policy thresholds, return. Fallback when the feature store times out: score on tier-one features with a model trained for that degraded case, or fall back to rules — never block the payment path waiting. Publish every decision to a queue for logging, review-queue routing and later evaluation, so logging is asynchronous and never on the critical path.',
        },
        {
          label: '8. Scale and cost',
          detail: '5,000 per second at peak. With sub-millisecond inference, the binding constraint is the feature store and the network, not the model. Size replicas from a measured per-instance throughput with substantial headroom, spread across availability zones, and autoscale on requests per instance rather than CPU. Under overload, shed to the rules path rather than queueing, because a slow decline is worse than a fast approximate one. Cost per million predictions should be computed and stated, since it is a real constraint at this volume.',
        },
        {
          label: '9. Monitoring and retraining',
          detail: 'Minutes: decline rate and challenge rate against a seasonal baseline, score distribution, feature null and staleness rates, p99 latency. Days: PSI on key features and on the score. Weeks: realised precision and recall on the labelled cohort, per segment, plus calibration. Retrain weekly given an adaptive adversary, gate every candidate against the incumbent on a fixed holdout with a per-segment check, and roll out as a canary watching the decline rate, because that is the number customers feel first.',
        },
        {
          label: '10. Feedback, fairness and what can go wrong',
          detail: 'The censored-label problem is the deepest issue: the model prevents the outcomes it is judged on, so naive retraining teaches it that whatever it blocked was correct to block. The control slice partly answers this. Fairness: monitor decline rates by segment, because a model optimising aggregate loss can concentrate false positives on a group. Abuse: an adversary can probe the boundary with small transactions, so rate-limit and monitor for probing patterns. And state the accepted failure mode plainly — during a feature-store outage we degrade to rules and accept higher losses for the duration rather than declining everyone.',
        },
      ],
      conclusion:
        'Notice how little of that was about the model. The defensible parts of the answer were the framing, the label definition and its delay, the feature-freshness constraint, the fallback behaviour, and the honest account of censored labels. That proportion is the point: an interviewer is testing whether you can see the system around the model, and a candidate who reaches gradient-boosted trees in the first minute and spends nine minutes on architecture search has answered a different, easier question.',
    },

    codeExamples: [
      {
        language: 'python',
        title: 'One feature definition, used by both training and serving',
        code: `"""Training-serving skew is prevented by construction: one function, two callers."""
from dataclasses import dataclass
from datetime import datetime, timedelta


@dataclass(frozen=True)
class CardAggregates:
    txn_count_1h: int
    txn_count_24h: int
    amount_sum_24h: float
    distinct_merchants_24h: int
    seconds_since_previous: float


def compute_card_aggregates(history, as_of: datetime) -> CardAggregates:
    """The ONLY definition. Point-in-time correct: nothing after as_of is visible."""
    past = [t for t in history if t.ts < as_of]              # no leakage from the future
    last_1h = [t for t in past if t.ts >= as_of - timedelta(hours=1)]
    last_24h = [t for t in past if t.ts >= as_of - timedelta(hours=24)]
    return CardAggregates(
        txn_count_1h=len(last_1h),
        txn_count_24h=len(last_24h),
        amount_sum_24h=sum(t.amount for t in last_24h),
        distinct_merchants_24h=len({t.merchant_id for t in last_24h}),
        seconds_since_previous=(as_of - past[-1].ts).total_seconds() if past else -1.0,
    )


# Training: as_of is the historical transaction time, so the label cannot leak backwards.
def build_training_row(txn, history):
    return compute_card_aggregates(history, as_of=txn.ts), txn.charged_back


# Serving: as_of is now, and history comes from the online store.
def build_serving_row(txn, online_store):
    history = online_store.recent_transactions(txn.card_id, hours=24)
    return compute_card_aggregates(history, as_of=txn.ts)`,
        explanation:
          'Two properties are being enforced here at once. Sharing a single function means a window definition can never drift between training and serving, which is the most common silent accuracy killer in production ML. And the `as_of` parameter with a strict `t.ts < as_of` filter enforces point-in-time correctness: during training the features must reflect only what was knowable at the moment of the transaction, because including anything later is label leakage that produces a wonderful offline metric and a useless model.',
      },
      {
        language: 'python',
        title: 'The serving path with a budget, a fallback and asynchronous logging',
        code: `import asyncio, time

FEATURE_TIMEOUT_S = 0.010          # hard budget: never block the payment path
DECLINE_THRESHOLD = 0.85
CHALLENGE_THRESHOLD = 0.35


async def authorise(txn) -> dict:
    t0 = time.perf_counter()
    degraded = False

    try:
        aggs = await asyncio.wait_for(online_store.get(txn.card_id), FEATURE_TIMEOUT_S)
        score = float(full_model.predict_proba(vectorise(txn, aggs))[0, 1])
    except (asyncio.TimeoutError, StoreUnavailable):
        # Degrade, do not fail. A slow decline is worse than a fast approximation.
        degraded = True
        score = float(lite_model.predict_proba(vectorise_local(txn))[0, 1])

    if score >= DECLINE_THRESHOLD:
        action = "decline"
    elif score >= CHALLENGE_THRESHOLD:
        action = "challenge"
    else:
        action = "approve"

    # Logging is fire-and-forget: it must never be on the critical path.
    asyncio.create_task(event_bus.publish({
        "request_id": txn.request_id,
        "card_id_hash": hash_id(txn.card_id),
        "score": round(score, 6),
        "action": action,
        "degraded": degraded,
        "model_version": MODEL_VERSION,
        "latency_ms": round((time.perf_counter() - t0) * 1000, 2),
    }))

    return {"action": action, "score": score}`,
        explanation:
          'Three decisions here would each be worth a minute of interview time. The feature fetch has a hard timeout and a degraded model trained specifically on transaction-local features, so a feature-store incident reduces accuracy instead of taking down payments. The thresholds live in the policy, not the model, so risk appetite can be tuned without retraining. And the `degraded` flag in the log is what lets you later measure how much accuracy that fallback actually cost, rather than guessing.',
      },
      {
        language: 'text',
        title: 'The answer skeleton, as notes you can write on a whiteboard',
        code: `1  CLARIFY      users · decision driven · latency budget · QPS peak
                 cost(FP) vs cost(FN) · privacy/regulatory constraints
2  FRAME        predict WHAT, at what granularity, over what horizon
                 would a heuristic do? what is the baseline to beat?
3  METRICS      online primary (business) · offline proxies
                 guardrails that must not regress (latency, fairness, coverage)
4  DATA         sources · volume · label source, delay and bias
                 evaluation split: time-based, never random, for temporal data
5  FEATURES     computable at serving time? freshness? one shared definition
                 point-in-time correctness · feature store: offline + online
6  MODEL        baseline first · justify complexity vs latency and interpretability
7  SERVING      batch / real time / hybrid · candidate gen then rank
                 cache · queue · datastore · fallback when a dependency fails
8  SCALE        replicas from measured throughput · autoscaling signal
                 cost per 1M predictions · degradation under overload
9  MONITOR      service metrics · model metrics · drift · delayed evaluation
                 retraining trigger · promotion gate · canary rollout
10 LOOP & RISK  how outputs contaminate future training data
                 fairness per segment · abuse · accepted failure modes`,
        explanation:
          'Write this down at the start and work through it out loud. Two habits make the difference in practice: state your assumptions explicitly whenever the interviewer leaves something open, so the design is auditable rather than lucky, and finish with the risk section rather than running out of time before it — candidates who volunteer feedback loops and fairness are demonstrating exactly the judgement the round is designed to test.',
      },
    ],

    realWorldExamples: [
      {
        context: 'Recommendation feedback collapse',
        usage:
          'A feed model trained on clicks from items it previously showed narrowed to a handful of popular items within weeks, because unshown items generated no positive signal. The fix was an explicit exploration budget and inverse-propensity weighting of the training data, which is a data-path change rather than a modelling one.',
      },
      {
        context: 'The feature that did not exist at serving time',
        usage:
          'A team shipped a model using "average order value over the last 30 days", computed in the warehouse. At serving time the value was up to 24 hours stale, and for new customers absent entirely. Offline AUC 0.93, online performance barely better than the rules it replaced.',
      },
      {
        context: 'Optimising the wrong metric',
        usage:
          'A video platform optimised click-through rate and watch time rose while day-30 retention fell, because the model learned to promote clickbait. Changing the objective to a long-session definition, with retention as a guardrail, cost click-through and improved the business — a framing decision no amount of modelling could have rescued.',
      },
    ],

    projectConnections: [
      { tool: 'Feast / Tecton', role: 'Feature stores providing matched offline and online views from one definition, which is the standard defence against training-serving skew.' },
      { tool: 'Kafka / Kinesis', role: 'Carries the event stream that feeds real-time aggregates and takes prediction logs off the critical path.' },
      { tool: 'Redis / DynamoDB', role: 'The online store that must answer feature lookups within single-digit milliseconds.' },
      { tool: 'FAISS / ScaNN', role: 'Approximate nearest-neighbour retrieval for the candidate-generation stage of large-scale recommendation.' },
      { tool: 'Airflow / Dagster', role: 'Orchestrates the training pipeline, the drift report and the retraining trigger as scheduled, observable jobs.' },
    ],

    commonMistakes: [
      {
        mistake: 'Starting with the model architecture',
        why: 'The model is a small part of the system and almost never the reason it fails. Diving into architecture signals that the candidate has not shipped one, and it consumes the minutes that should establish the framing.',
        fix: 'Spend the first quarter of the time on clarification, framing and metrics. Name a simple baseline and make the interviewer tell you it is insufficient before adding complexity.',
      },
      {
        mistake: 'Proposing features that cannot be computed at serving time',
        why: 'A warehouse aggregate may be hours stale or unavailable for a new entity, so an offline metric computed with it is fiction. This is the single most common gap between a strong offline result and a disappointing online one.',
        fix: 'For every feature, state where it comes from at inference, how fresh it is and what happens when it is missing. If it cannot be served, it cannot be used in training either.',
      },
      {
        mistake: 'Evaluating temporal data with a random split',
        why: 'A random split lets the model see the future: rows from after the prediction moment leak into training, inflating the offline metric by an amount that vanishes in production.',
        fix: 'Split by time, train on the past and evaluate on the following period, and enforce point-in-time correctness in feature computation so nothing after `as_of` is visible.',
      },
      {
        mistake: 'Ignoring the feedback loop',
        why: 'A deployed model changes the data it will next be trained on — shown items get clicked, blocked transactions never reveal outcomes — so naive retraining amplifies the model\'s own past decisions and narrows the system over time.',
        fix: 'Reserve an exploration or control slice, log propensities so the data can be reweighted, and evaluate on the unbiased slice rather than on logged outcomes alone.',
      },
      {
        mistake: 'No fallback when a dependency fails',
        why: 'If the feature store, the model server or the network is down, an unprepared system either blocks the critical path or fails every request, converting a degradation into an outage.',
        fix: 'Define the degraded mode explicitly — a lite model on local features, cached predictions, or rules — with a hard timeout, and log when it is used so you can measure what it costs.',
      },
      {
        mistake: 'Confusing an offline metric with success',
        why: 'AUC is not money. A model can improve ranking while worsening the business outcome, for example by optimising click-through into clickbait or by concentrating declines on one segment.',
        fix: 'Name one primary online metric tied to the business decision, keep offline metrics as proxies, and define guardrails — latency, fairness, coverage — that a release must not regress.',
      },
    ],

    interviewQuestions: [
      {
        level: 'ml-engineer',
        question: 'Design a system that recommends videos on a home feed for 50 million daily users with a 150 ms budget.',
        answer:
          'I would clarify first: is the objective engagement now or retention over weeks, is the catalogue millions of items, how fresh must new uploads be, and what must never regress. Assume retention, a large catalogue and a requirement that new items are reachable within an hour. Framing: predict P(long engagement | user, item, context) at the user-item level, where "long" is defined operationally rather than as a raw click, because click-through as an objective reliably produces clickbait. Architecture is two-stage out of necessity, since scoring millions of items in 150 ms is impossible: candidate generation retrieves a few hundred items using approximate nearest neighbours over embeddings plus simple sources such as recent subscriptions and trending, then a heavier ranking model scores only those with richer features, then business rules apply diversity and policy constraints. Data path: implicit feedback with explicit negative sampling, logged with the propensity of each impression so the training data can be reweighted. Features come from a feature store with one definition for training and serving; user history is precomputed in batch while in-session signals come from the online store. Serving: cache the candidate set per user for a short window, degrade to a popularity-plus-subscriptions feed if ranking times out. Monitoring: latency, coverage of the catalogue, diversity, prediction distribution, and the retention guardrail. The dominant risk is the feedback loop, so I would hold an exploration budget of a small percentage of slots and evaluate on that unbiased slice.',
        followUp:
          'The strongest signal is naming two-stage retrieval unprompted as a consequence of the latency budget, and naming the feedback loop as the dominant risk rather than as an afterthought.',
      },
      {
        level: 'ml-engineer',
        question: 'Your offline AUC improved from 0.88 to 0.92 but the online A/B test showed no improvement. What are the likely explanations?',
        answer:
          'Roughly in order of likelihood. First, training-serving skew: a feature is computed differently at inference — a different window, a different default, stale data from the warehouse — so the model in production is not the model that was evaluated. Second, leakage in the offline evaluation: a random split on temporal data, or a feature that encodes the future such as an aggregate computed after the prediction moment, which inflates AUC by an amount that simply does not exist online. Third, metric mismatch: AUC measures ranking across the whole distribution, while the business only experiences the top of the ranking or a single threshold, so a gain in the middle is invisible. Fourth, the system around the model dominates — business rules, caching, deduplication or a diversity layer may reshuffle whatever the model produces. Fifth, the test itself: insufficient power, contaminated assignment, or novelty effects. I would diagnose by logging production feature vectors and replaying them through the offline pipeline to compare values row by row, which usually finds skew within an hour, and by recomputing the offline metric on the production-logged features rather than on the training pipeline.',
        followUp:
          'Naming the replay diagnostic — compare logged serving features against recomputed training features for the same entity and timestamp — is the answer of someone who has actually chased this bug.',
      },
      {
        level: 'ml-engineer',
        question: 'Where does the system\'s own behaviour contaminate its training data, and what do you do about it?',
        answer:
          'Everywhere a decision determines what is observed. In recommendation, only shown items can be clicked, so the training set is a sample chosen by the previous model and naive retraining amplifies its preferences until the system narrows. In fraud and credit, blocked applications never reveal their outcome, so labels are censored precisely on the cases the model was most confident about. In ranking, position bias means the top slot gets clicks partly because it is the top slot. The mitigations are all data-path rather than model changes: log the propensity of each decision so outcomes can be inverse-propensity weighted; reserve an exploration or randomised control slice, even a small one, to obtain unbiased labels; use position as an explicit feature during training and fix it at serving time to debias; and evaluate on the unbiased slice rather than on logged outcomes. The cost of the control slice is real and should be stated openly — some fraud will be let through, some poor recommendations shown — and it is usually far cheaper than discovering in a year that the model has been learning from its own shadow.',
        followUp:
          'This question separates candidates who have operated a system from those who have trained one; volunteering the cost of the control slice rather than pretending it is free is a mark of seriousness.',
      },
    ],

    practiceQuestions: [
      {
        prompt:
          'Take the prompt "design a system to detect toxic comments" and write only the clarification questions — at least six — plus the assumption you would state for each if the interviewer declines to answer.',
        hint: 'Who acts on the output, how fast, what does each kind of mistake cost, and who is harmed?',
        solution:
          'Where does it sit — blocking before publication, or flagging for review afterwards? Assume pre-publication for high-confidence cases and a review queue otherwise, giving a budget around 100 ms. What is the volume at peak? Assume 2,000 comments per second. What is the cost asymmetry — a false positive silences a legitimate user, a false negative exposes readers to abuse; assume false positives are expensive enough to require a challengeable appeal path. Which languages and locales, since toxicity is deeply culture- and language-specific? Assume top five languages at launch. Who defines toxicity, and is there a written policy with labelled examples, since without one there is no learnable target? Assume a policy exists with a labelled sample. Is there a human review capacity constraint, since the model\'s threshold is really a function of how many items reviewers can process per hour? Assume a fixed daily capacity, which turns the threshold into a budget problem. And what regulatory or appeals obligations apply to automated removal decisions?',
      },
      {
        prompt:
          'For a churn model, decide between batch and real-time serving and defend it with the deciding question. Then describe the hybrid.',
        hint: 'What is the freshest feature the model needs, and is there any case where it changes within the request?',
        solution:
          'The deciding question is whether any input feature changes within the request. For churn, the features are tenure, plan, billing and last month\'s usage, none of which changes in the seconds before someone views a dashboard — so batch scoring nightly into a key-value store is correct, and it is orders of magnitude cheaper with lookup latency. The hybrid becomes necessary at the edges: a customer who signed up this morning has no batch score, and a customer who just started a cancellation flow has session signals the batch score cannot see. So serve the precomputed score by default, and fall back to a real-time path for entities missing from the batch table or for the small set of moments where in-session context genuinely matters. Stating that hybrid explicitly is a stronger answer than picking one, because it shows the choice is driven by feature freshness rather than by preference.',
      },
      {
        prompt:
          'Write the monitoring plan for a system whose labels arrive 90 days later. Split it into what you watch in minutes, days and months, and say what each catches.',
        hint: 'Three time horizons, three different questions.',
        solution:
          'Minutes: service health — error rate by status class, p95 and p99 latency, saturation — plus the fast model signals of prediction distribution, positive rate, and feature null and imputation rates. This layer catches outages and broken pipelines, and pages. Days: PSI and out-of-range rates on key features and on the score against a fixed training reference, segment mix, and fast business proxies that correlate with the eventual outcome such as engagement with an intervention. This layer catches drift and population change, and creates tickets rather than pages. Months: realised performance on the labelled cohort — AUC or precision at the operating point — calibration, and per-segment breakdowns, computed on a rolling basis so that degradation is at least measured even though it is measured late. State plainly that between the fast proxies and the 90-day truth there is a genuine blind spot, and that the mitigation is a stable reference, an exploration slice where labels can be obtained faster, and a scheduled refresh so the model never drifts unboundedly far from the present.',
      },
    ],

    quiz: [
      {
        id: 'OPS-013-q1',
        type: 'order',
        concept: 'design framework',
        prompt: 'Order the first five steps of an ML system design answer.',
        items: [
          'Clarify users, the decision, latency, volume and the cost of each kind of error',
          'Frame the problem as a specific prediction task',
          'Define online and offline metrics plus guardrails',
          'Design the data path: sources, labels and their delay',
          'Design features and how training and serving share one definition',
        ],
        explanation:
          'Requirements, then framing, then how success is measured, then data, then features. Reaching for a model architecture before these is the most common way to lose the round.',
      },
      {
        id: 'OPS-013-q2',
        type: 'mcq',
        concept: 'training-serving skew',
        prompt: 'Offline AUC is 0.93 and online performance is barely better than the previous rules. What is the most likely single cause?',
        options: [
          'Training-serving skew or leakage — features computed differently, or with information unavailable at prediction time',
          'The model is too small',
          'The learning rate was too high',
          'The online traffic is simply harder',
        ],
        answerIndex: 0,
        explanation:
          'A large offline-online gap almost always means the offline evaluation saw something production cannot: a future-looking aggregate, a random split on temporal data, or a feature computed with a different window at serving time.',
      },
      {
        id: 'OPS-013-q3',
        type: 'truefalse',
        concept: 'evaluation splits',
        prompt: 'For a fraud model trained on two years of transactions, a random train/test split is an acceptable evaluation.',
        answer: false,
        explanation:
          'It lets the model see the future, since test rows precede training rows in time and card-level aggregates leak across the boundary. Temporal problems need a time-based split with point-in-time-correct features.',
      },
      {
        id: 'OPS-013-q4',
        type: 'mcq',
        concept: 'two-stage retrieval',
        prompt: 'Why does a large-scale recommender use candidate generation before ranking?',
        options: [
          'Scoring millions of items with the ranking model cannot fit the latency budget, so a cheap stage narrows the set first',
          'Candidate generation is more accurate than ranking',
          'It removes the need for a feature store',
          'It eliminates the feedback loop',
        ],
        answerIndex: 0,
        explanation:
          'The two-stage pattern exists purely because of the latency and cost budget: approximate retrieval reduces millions of items to a few hundred, and only those are scored by the expensive model.',
      },
      {
        id: 'OPS-013-q5',
        type: 'multi',
        concept: 'feedback loops',
        prompt: 'Which of these are genuine feedback-loop problems? Select all that apply.',
        options: [
          'Only items the model showed can be clicked, so unshown items generate no positive signal',
          'Blocked transactions never reveal whether they were fraudulent',
          'The top-ranked slot gets more clicks partly because it is the top slot',
          'The model file is too large to fit in the container image',
          'Customers who received a retention offer behave differently from those who did not',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Image size is an engineering constraint, not a feedback effect. The other four are all cases where the system\'s own decisions determine which outcomes are observable, which biases the next training set.',
      },
      {
        id: 'OPS-013-q6',
        type: 'explain',
        concept: 'end-to-end judgement',
        prompt: 'An interviewer says "design a system to predict delivery times". Give the first four things you say and why each matters.',
        rubric: [
          'Clarifies users, the decision the estimate drives, and the latency and volume constraints',
          'States the cost asymmetry between over- and under-estimating',
          'Frames a precise prediction target with granularity and horizon',
          'Names a primary online metric and at least one guardrail',
        ],
        sampleAnswer:
          'First, who sees this and what does it change? A quoted window at checkout influences whether someone orders, whereas an internal estimate for dispatch planning is a different problem with a different budget; assume the customer-facing quote, so we answer inline in well under 200 ms. Second, what does being wrong cost in each direction? Under-promising loses orders, over-promising produces late deliveries and refunds, and the asymmetry is usually strong enough that we should predict a quantile rather than the mean — a p80 arrival time, not the expected one. Third, the precise target: predict the distribution of minutes from order confirmation to handover, at the order level, conditioned on store, courier supply, basket size, time of day and weather. Fourth, how we measure success: online, the proportion of deliveries arriving within the quoted window, with guardrails on the quoted window length so the model cannot trivially win by quoting three hours, and on conversion at checkout. Only after those would I discuss data, features that are actually available at quote time such as current courier availability, and the model itself.',
        explanation:
          'The examinable behaviour is establishing requirements, cost asymmetry, a precise target and a measurable definition of success before any modelling — and noticing that an asymmetric cost implies quantile rather than mean prediction.',
      },
    ],

    flashcards: [
      { front: 'The ten steps of an ML system design answer', back: 'Clarify, frame, metrics, data and labels, features, model, serving, scale, monitoring and retraining, feedback and risk.' },
      { front: 'Offline metric improves, online does not — first suspect?', back: 'Training-serving skew or leakage: a feature computed differently at inference, or an evaluation that saw information unavailable at prediction time.' },
      { front: 'What does a feature store actually prevent?', back: 'Training-serving skew, by serving one feature definition into both an offline store for training and a low-latency online store for inference.' },
      { front: 'Why two-stage retrieval in recommendation?', back: 'Scoring millions of items with a heavy model cannot meet the latency budget; cheap approximate retrieval narrows to hundreds, then ranking scores those.' },
      { front: 'What is the feedback loop problem?', back: 'The model\'s own decisions determine which outcomes are observed, so the next training set reflects past predictions. Mitigate with exploration slices and propensity weighting.' },
      { front: 'Why split temporal data by time, not randomly?', back: 'A random split leaks the future into training and inflates offline metrics by an amount that does not exist in production.' },
      { front: 'What does an asymmetric error cost imply about the target?', back: 'Often predict a quantile rather than a mean, and put the thresholds in the decision policy rather than in the model.' },
    ],

    challenge: {
      title: 'A full design document, defended',
      brief:
        'Choose a real system — a fraud detector, a recommendation feed, a delivery-time estimator or a document triage service — and write the complete design following the ten-step framework. Every section must contain a decision and its justification, not a list of technologies. Include a latency budget broken down by component, an explicit statement of what happens when each dependency fails, the evaluation split and why, and a section on feedback effects and fairness. Then have someone play the interviewer and attack three choices; revise the document with the counterarguments recorded rather than silently deleted.',
      language: 'text',
      acceptanceCriteria: [
        'All ten framework sections are present with decisions and justifications, not technology lists',
        'A latency budget is broken down by component and sums to the stated requirement',
        'Every feature is annotated with its serving-time source, freshness and missing-value behaviour',
        'The evaluation split is time-based where the data is temporal, with point-in-time correctness stated',
        'A degraded mode is defined for each external dependency, with the accuracy cost acknowledged',
        'Feedback effects and per-segment fairness are addressed explicitly, with mitigations and their costs',
        'Three challenged decisions are recorded with the counterargument and the resolution',
      ],
      starterCode: '# System: \n# 1. Clarify\n#    users:\n#    decision driven by the output:\n#    latency budget (p95):\n#    peak QPS:\n#    cost of a false positive / false negative:\n',
    },

    teachingPrompt: {
      prompt:
        'Teach someone preparing for an ML system design interview the framework, and explain why the model is the least interesting part of the answer.',
      mustCover: [
        'Clarify requirements and framing before any modelling',
        'Define online and offline metrics, plus guardrails, and expect them to disagree',
        'Design the data path — labels, delay, features, training-serving consistency — before the serving path',
        'Close with monitoring, retraining and the feedback loop the system creates',
      ],
      bonusSignals: ['mentions point-in-time correctness', 'mentions degraded modes and fallbacks', 'mentions that a heuristic baseline may be the honest answer'],
      sampleExplanation:
        'The question is open on purpose, and the discipline is to answer it in a fixed order rather than to be clever early. Start by clarifying: who uses this, what decision does the output drive, how fast must it come back, how much traffic is there, and what does each kind of mistake cost? That last one usually determines more of the design than the model does, because a strongly asymmetric cost means you should be predicting a quantile and putting the thresholds in a policy layer. Then frame it as a precise prediction task — not "reduce fraud" but "probability of a chargeback within 60 days at authorisation time" — and say what the baseline is, because sometimes a heuristic is genuinely good enough and saying so is a strong answer. Then define success on two axes: one primary online metric tied to the business, offline metrics as proxies, and guardrails such as latency and per-segment fairness that must not regress. Only then the data: where labels come from, how delayed and how biased they are, and how you will split for evaluation, which for anything temporal must be by time. Then features, and here the question to ask about every single one is whether it can be computed at serving time, how fresh it will be, and what happens when it is missing — a feature that only exists in the warehouse cannot be used, no matter how predictive it looks offline. Then the model, briefly, starting simple. Then serving, scaling, monitoring and retraining. And finish with the part that most candidates never reach: your system changes the data it will next learn from, because only shown items get clicked and blocked transactions never reveal their outcome, so you need an exploration slice and propensity logging or the model will slowly learn from its own shadow. The model is the least interesting part because it is the part most easily swapped; everything around it is what determines whether its accuracy ever reaches a user at all.',
    },
  },
];
