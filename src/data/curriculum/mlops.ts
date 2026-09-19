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
