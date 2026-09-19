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
