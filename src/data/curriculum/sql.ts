import type { LearningUnit } from '@/types/curriculum';

export const UNITS: LearningUnit[] = [
  {
    id: 'SQL-001',
    domain: 'SQL',
    module: 'Relational Foundations',
    topic: 'What a database is',
    title: 'What a Database Is',
    slug: 'what-a-database-is',
    difficulty: 1,
    estimatedMinutes: 25,
    prerequisites: [],
    related: ['SQL-002'],
    tags: ['database', 'rdbms', 'sql', 'durability', 'concurrency', 'integrity'],

    learningObjectives: [
      'Explain what a database management system does that a folder full of CSV files cannot',
      'Describe the four pressures — durability, concurrency, integrity and query performance — that make databases necessary',
      'Distinguish the database (the stored data) from the DBMS (the software) from SQL (the language you ask questions in)',
      'Run a first query against a real relational database and read the result set',
      'Say why almost every machine-learning dataset begins life inside a database',
    ],

    terminology: [
      {
        term: 'Database',
        definition:
          'An organised, persistent collection of related data, stored so that it can be queried, updated and protected as a unit.',
        simple: 'All of an organisation’s facts, kept in one carefully organised place.',
      },
      {
        term: 'DBMS (Database Management System)',
        definition:
          'The software that stores the data on disk, enforces its rules, answers queries and coordinates simultaneous users. SQLite, PostgreSQL, MySQL and DuckDB are all DBMSs.',
        simple: 'The program that guards the data and answers questions about it.',
      },
      {
        term: 'Relational model',
        definition:
          'Codd’s 1970 model in which all data is represented as relations — tables of rows with named, typed columns — and queries are expressed as operations on whole sets of rows.',
        simple: 'The idea that every fact can be written as a row in a table.',
      },
      {
        term: 'SQL',
        definition:
          'Structured Query Language: a declarative language in which you describe the result you want rather than the steps to compute it. The engine chooses the steps.',
        simple: 'The language you use to ask the database questions.',
      },
      {
        term: 'Query engine / optimiser',
        definition:
          'The part of the DBMS that turns a declarative SQL statement into an execution plan — which tables to scan, which indexes to use, in what order to join them.',
        simple: 'The part that works out the fastest way to actually get your answer.',
      },
    ],

    simpleExplanation:
      "Imagine a shop that writes every sale on a sheet of paper and keeps the sheets in a drawer. That works for a week. Then two people want to write at the same time, and one sheet gets lost, and someone writes a customer’s name three different ways, and answering “how much did we sell in March” means reading two thousand sheets by hand. A database is what you build once the drawer stops working. It is a program whose entire job is to hold your facts safely and answer questions about them. It writes to disk in a way that survives the power being cut halfway through. It lets fifty people read and write at once without them stepping on each other. It refuses to store an order for a customer who does not exist. And when you ask it something, you describe what you want — not how to find it — and it works out a fast way to get there, even across millions of rows.",

    whyItExists:
      'Files are fine until data becomes shared, valuable and large. The moment several programs write to the same data, a crash can leave it half-written; the moment several people type into it, spellings and duplicates diverge; and the moment it outgrows memory, scanning it end to end for every question becomes unaffordable. A DBMS exists to solve those four problems once, correctly, so that every application on top of it does not have to solve them again badly.',

    analogy: {
      scenario:
        'Compare a shoebox of loose receipts with a bank. Anyone can add to the shoebox, but nothing stops two receipts contradicting each other, nothing stops a receipt going missing, and answering “how much did I spend on groceries last quarter” means tipping the box out on the floor. A bank, by contrast, records every transaction in a ledger, will not let a transfer half-happen, will not accept a payment to an account number that does not exist, and can answer a question about any date range in seconds.',
      mapping: [
        { from: 'The shoebox of receipts', to: 'A folder of CSV files' },
        { from: 'The bank’s ledger and its rules', to: 'The database and its constraints' },
        { from: 'A transfer that cannot half-happen', to: 'A transaction — all of it commits, or none of it does' },
        { from: 'Rejecting a payment to a non-existent account', to: 'Referential integrity enforced by a foreign key' },
        { from: 'The teller answering a question in seconds', to: 'The query engine using an index instead of a full scan' },
        { from: 'Many customers at many windows at once', to: 'Concurrent connections, isolated from one another' },
      ],
      bridge:
        'The bank is not being fussy for its own sake: every one of its rules exists because someone once lost money without it. A database is the same — durability, transactions, constraints and indexes are each a direct answer to a specific way that a pile of files fails. When you later meet ACID in SQL-013, you are meeting the bank’s rulebook written down formally.',
      limitations:
        'The analogy overstates one thing: a bank is deliberately slow and conservative, whereas a database is engineered to be fast. And unlike a bank, a database will happily let you delete everything in one statement if you have permission — the safety is about consistency, not about protecting you from yourself.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'A folder of CSVs versus a database',
        caption: 'Each row on the right is a problem the left-hand column cannot solve.',
        left: {
          heading: 'CSV files on disk',
          points: [
            'A crash mid-write leaves a truncated, unreadable file',
            'Two writers at once silently overwrite each other',
            'Nothing prevents an order referring to a deleted customer',
            'Every column is text until something parses it',
            'Any question means reading the whole file',
            'No permissions: whoever can open the folder can do anything',
          ],
        },
        right: {
          heading: 'A relational database',
          points: [
            'Writes are transactional: they complete fully or not at all',
            'Concurrent readers and writers are isolated from each other',
            'Foreign keys reject rows that break referential integrity',
            'Columns are typed and checked on insert',
            'Indexes turn a full scan into a targeted lookup',
            'Per-user, per-table privileges are enforced by the engine',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'What happens when you run a query',
        caption: 'You write the what; the engine decides the how.',
        steps: [
          { label: 'You write SQL', detail: 'A declarative description of the rows you want, not the steps to find them.' },
          { label: 'Parse and validate', detail: 'The engine checks the grammar and that every table and column you named exists.' },
          { label: 'Plan', detail: 'The optimiser compares strategies — scan the table, or use an index; join A to B, or B to A — and picks one.' },
          { label: 'Execute', detail: 'The chosen plan runs, reading pages from disk or cache.' },
          { label: 'Return a result set', detail: 'You get back a table of rows. Even a single number comes back as a one-row, one-column table.' },
        ],
      },
      {
        kind: 'widget',
        title: 'The sample database, live',
        caption: 'Every query in this domain runs against these five tables. Try the example below and change it.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'A relational database is a set of named relations (tables), each a set of tuples (rows) over a fixed, typed schema of attributes (columns), managed by a DBMS that guarantees persistence, enforces declared integrity constraints, isolates concurrent transactions, and evaluates declarative SQL queries via a cost-based execution plan.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Your first query',
        runnable: true,
        code: `SELECT name, city, country
FROM customers;`,
        explanation:
          'Read it as a sentence: from the customers table, give me the name, city and country of every row. You never said how to find them — whether to read the file front to back, or use an index — and that is the entire point of a declarative language. The result comes back as a table, which is why SQL composes so well: the output of a query has the same shape as its input.',
        output: `name           city        country
-------------  ----------  --------
Ada Okafor     Lagos       Nigeria
Ben Torres     Madrid      Spain
Chen Wei       Shanghai    China
...`,
      },
      {
        language: 'sql',
        title: 'A question that would be painful over CSVs',
        runnable: true,
        code: `SELECT c.country, COUNT(*) AS order_count
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country
ORDER BY order_count DESC;`,
        explanation:
          'This is four lines of SQL and it does three things a spreadsheet struggles with at scale: it matches every order to its customer, collapses the matched rows into one row per country, and sorts the summary. You will learn each piece properly in SQL-007 and SQL-009 — for now, notice that the query says what the answer looks like and never says how to compute it.',
        output: `country     order_count
----------  -----------
Nigeria     14
Spain       11
China       9
...`,
      },
      {
        language: 'sql',
        title: 'Constraints are checked by the engine, not by your code',
        code: `-- customers has no row with id = 9999
INSERT INTO orders (id, customer_id, order_date, status)
VALUES (500, 9999, '2024-06-01', 'pending');`,
        explanation:
          'With foreign keys enabled the engine refuses this insert outright, because no customer 9999 exists. That rule lives in the schema, so it protects the data no matter which application, script or intern is writing. In a folder of CSVs the equivalent check exists only if every program that touches the data remembers to perform it.',
        output: `Error: FOREIGN KEY constraint failed`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Assembling a training set',
        usage:
          'Before a model sees anything, somebody writes a SQL query that joins users to events to labels and materialises a table. In most companies the dataset does not exist as a file until a query creates it, which is why data scientists write more SQL than they expect to.',
      },
      {
        context: 'A recommendation system’s feature store',
        usage:
          'Counts such as "purchases in the last 30 days" or "distinct categories viewed" are aggregate queries run on a schedule against the production database or its warehouse copy, then served to the model at prediction time.',
      },
      {
        context: 'An e-commerce checkout',
        usage:
          'Taking payment, decrementing stock and creating an order must all happen or none of them must. That is a transaction, and it is the reason the shop runs on PostgreSQL rather than on files.',
      },
      {
        context: 'Analytics dashboards',
        usage:
          'Tools such as Metabase, Looker and Tableau are, underneath, SQL generators. Every chart an executive looks at is a query someone wrote or a query a tool wrote for them.',
      },
    ],

    projectConnections: [
      { tool: 'SQLite', role: 'A whole database in a single file, embedded in your process. It is what this curriculum’s playground runs, and what ships inside phones and browsers.' },
      { tool: 'PostgreSQL', role: 'The default choice for production applications, and the dialect most job descriptions mean when they say "SQL".' },
      { tool: 'pandas', role: '`pd.read_sql(query, conn)` is the usual bridge from a database into a DataFrame — filter and aggregate in SQL, analyse in pandas.' },
      { tool: 'BigQuery / Snowflake / DuckDB', role: 'Analytical engines that speak almost the same SQL over vastly larger data. The language you learn here transfers directly.' },
    ],

    commonMistakes: [
      {
        mistake: 'Treating SQL as a procedural language and asking "in what order does it run?"',
        why: 'SQL describes a result, not an algorithm. The optimiser is free to reorder joins, push filters down and choose indexes, so the physical order rarely matches the written order.',
        fix: 'Learn the *logical* clause order (FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT) for reasoning about meaning, and read the query plan when you care about physical execution.',
      },
      {
        mistake: 'Confusing the database with the DBMS, or either with SQL',
        why: 'The three words get used interchangeably in conversation, which makes sentences like "PostgreSQL is a database" ambiguous and blocks understanding of what is actually doing the work.',
        fix: 'The database is the data; the DBMS is the software managing it; SQL is the language you address it in. One PostgreSQL server manages many databases.',
      },
      {
        mistake: 'Pulling an entire table into pandas and filtering there',
        why: '`SELECT *` over ten million rows moves all of them across the network and into memory to throw most away. The engine could have used an index and returned a thousand.',
        fix: 'Filter and aggregate as close to the data as possible. Push WHERE and GROUP BY into SQL; bring back only what you will actually analyse.',
      },
      {
        mistake: 'Assuming a database is only worth it at large scale',
        why: 'Durability, typed columns and referential integrity are valuable on a thousand rows as much as on a billion. The commonest small-project bug is inconsistent data, not slow data.',
        fix: 'Use SQLite from the first day of a project. It is one file, needs no server, and gives you constraints and transactions for free.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why would a team use a relational database instead of just storing CSV files?',
        answer:
          'Four reasons, and it is worth naming all four. Durability: a database commits transactions so a crash cannot leave data half-written. Concurrency: many readers and writers are isolated from one another, whereas two processes appending to a CSV corrupt it. Integrity: types, NOT NULL, unique and foreign-key constraints are enforced centrally, so bad data cannot get in from any client. Query performance: indexes and a cost-based optimiser answer selective questions without reading everything. CSVs are excellent for interchange and for small, single-owner, read-only data; they are not a system of record.',
        followUp:
          'A strong answer adds that the constraints being *in the schema* is the key architectural point: correctness does not depend on every application remembering to check.',
      },
      {
        level: 'beginner',
        question: 'What does it mean to say SQL is declarative?',
        answer:
          'You state the properties of the result you want — which tables it comes from, which rows qualify, how they are grouped and ordered — and the engine decides the physical strategy. Two syntactically different queries with the same meaning can produce the same plan, and the same query can produce different plans as the data grows or an index is added. The practical consequence is that tuning SQL is usually about giving the optimiser better information (indexes, statistics, a more selective predicate) rather than rewriting it into a better "algorithm".',
      },
      {
        level: 'internship',
        question: 'You are given read access to a production database and asked to build a training set. What do you do first, and what do you avoid?',
        answer:
          'First, read the schema — tables, keys and constraints — because the foreign keys tell you how entities actually relate, which is information no data dictionary will give you as reliably. Then write exploratory queries with a LIMIT and check row counts and null rates before joining anything. Avoid running unbounded `SELECT *` against large tables on the primary, avoid joins whose cardinality you have not checked (a many-to-many join silently multiplies rows and inflates every aggregate), and prefer a read replica or warehouse copy so your analysis cannot slow down the application. Finally, pin the extraction to a date range so the dataset is reproducible.',
        followUp:
          'Mentioning reproducibility — the same query on a live table returns different rows tomorrow — separates candidates who have shipped a model from those who have not.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Using the sample schema, write a query that returns every product’s name, category and price.',
        hint: 'You need only SELECT and FROM. Name the three columns you want, separated by commas.',
        language: 'sql',
        starterCode: '-- Return name, category and price for every product.\n',
        solution:
          'SELECT name, category, price\nFROM products;\n\nThe result is a table with three columns and one row per product. Note that you asked for three of the five columns — choosing a subset of columns is called projection, and it is the subject of SQL-004.',
      },
      {
        prompt: 'A colleague keeps orders in `orders.csv` and customers in `customers.csv`, and says a database would be over-engineering for 40,000 rows. Give three concrete failures they are likely to hit.',
        hint: 'Think about what happens when two people edit at once, when a customer is deleted, and when a date is typed as 01/02/2024.',
        solution:
          'One: two people open the file in a spreadsheet and the second save silently discards the first person’s edits, with no error and no record. Two: a customer row is deleted while orders still reference it, so every later join drops those orders and the revenue total quietly falls — a foreign key would have refused the delete. Three: dates and numbers are text, so 01/02/2024 is ambiguous and "1,299" sorts before "9" as a string; typed columns prevent both. Scale was never the argument — shared, mutable, valuable data is.',
      },
      {
        prompt: 'Explain in your own words what the optimiser does, and why that means a slow query is not always a badly written query.',
        hint: 'Think about the same question being answered by reading everything versus by looking something up.',
        solution:
          'The optimiser turns your declarative statement into a physical plan: which tables to read, in which order, using which access method (full scan or index lookup), and which join algorithm. Because it makes that choice using statistics about the data, the same SQL can be fast on Monday and slow on Friday if the table grew, the statistics went stale, or an index was dropped. So a slow query may be perfectly written and simply be missing an index, or be running against a predicate the optimiser cannot estimate well — which is why the first diagnostic step is always to read the plan (`EXPLAIN QUERY PLAN` in SQLite, `EXPLAIN ANALYZE` in PostgreSQL), not to rewrite the SQL.',
      },
    ],

    quiz: [
      {
        id: 'SQL-001-q1',
        type: 'mcq',
        concept: 'declarative languages',
        prompt: 'What does it mean that SQL is a declarative language?',
        options: [
          'You describe the result you want and the engine decides how to compute it',
          'You must declare every variable before using it',
          'Queries run in exactly the order the clauses are written',
          'It can only read data, never modify it',
        ],
        answerIndex: 0,
        explanation:
          'Declarative means you specify the what, not the how. The optimiser chooses scan order, join order and index usage, which is why the same query can be executed differently as the data changes.',
      },
      {
        id: 'SQL-001-q2',
        type: 'multi',
        concept: 'why databases exist',
        prompt: 'Which of these does a relational DBMS give you that a folder of CSV files does not? Select all that apply.',
        options: [
          'Transactions, so a crash cannot leave a half-finished write',
          'Constraints that reject invalid rows regardless of which client inserts them',
          'Indexes that answer selective queries without reading every row',
          'Automatic machine-learning model training',
          'Isolation between concurrent readers and writers',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Durability, integrity, query performance and concurrency are the four classic pressures that produce databases. Training models is not among them — the database supplies the data, not the model.',
      },
      {
        id: 'SQL-001-q3',
        type: 'truefalse',
        concept: 'DBMS vs database',
        prompt: 'PostgreSQL is a database.',
        answer: false,
        explanation:
          'PostgreSQL is a DBMS — the software. A single PostgreSQL server manages many databases, each a separate collection of tables. The distinction matters as soon as you read connection strings or grant privileges.',
      },
      {
        id: 'SQL-001-q4',
        type: 'fill',
        concept: 'referential integrity',
        prompt: 'Which kind of constraint stops you inserting an order whose customer_id matches no customer?',
        answers: ['foreign key', 'foreign-key', 'a foreign key', 'FOREIGN KEY', 'fk'],
        explanation:
          'A foreign key declares that orders.customer_id must match some customers.id. The engine enforces it on insert, update and delete, which is what the phrase referential integrity means.',
      },
      {
        id: 'SQL-001-q5',
        type: 'order',
        concept: 'query lifecycle',
        prompt: 'Put the stages of running a query in order, from what you do to what you get back.',
        items: [
          'You submit a SQL statement',
          'The engine parses it and checks the tables and columns exist',
          'The optimiser chooses an execution plan',
          'The plan executes, reading data from disk or cache',
          'A result set is returned to you as rows and columns',
        ],
        explanation:
          'Parsing catches typos and missing tables; planning chooses the physical strategy; execution does the reading. Knowing these are separate stages explains why a syntax error costs nothing and a bad plan costs everything.',
      },
      {
        id: 'SQL-001-q6',
        type: 'explain',
        concept: 'databases vs files',
        prompt: 'A teammate wants to keep your project’s data in CSV files "because it is simpler". In three or four sentences, explain when they are right and when they are wrong.',
        rubric: [
          'Acknowledges CSVs are genuinely good for interchange, small and read-only data',
          'Names at least two of durability, concurrency, integrity and query performance',
          'Connects the choice to whether the data is shared and mutable rather than merely to its size',
        ],
        sampleAnswer:
          'They are right when the data is small, owned by one person, written once and mostly passed to someone else — CSVs are the best interchange format there is. They are wrong as soon as the data is shared and mutable: two writers corrupt a file, a crash truncates it, nothing stops contradictory or dangling rows, and every question requires a full scan. The deciding question is not how many rows there are but whether the data is a system of record that several people and programs will change over time. SQLite gives you transactions and constraints in a single file, so choosing a database costs almost nothing.',
        explanation:
          'The examinable idea is that the trade-off is about shared mutability, not scale. A candidate who says "use a database when it gets big" has missed the reason databases exist.',
      },
    ],

    flashcards: [
      { front: 'What are the four pressures that make databases necessary?', back: 'Durability (survive crashes), concurrency (many writers safely), integrity (reject invalid data) and query performance (indexes instead of full scans).' },
      { front: 'Database vs DBMS vs SQL', back: 'The database is the stored data; the DBMS (PostgreSQL, SQLite) is the software managing it; SQL is the declarative language you query it with.' },
      { front: 'What does "declarative" mean for SQL?', back: 'You describe the result you want; the optimiser chooses the physical plan — scan order, index use and join strategy.' },
      { front: 'What shape is the result of a SQL query?', back: 'Always a table of rows and columns, even when it is a single value. That closure is why queries can be nested inside queries.' },
      { front: 'Why filter in SQL rather than in pandas?', back: 'The engine can use indexes and return only the rows you need, instead of moving the whole table over the network into memory to discard most of it.' },
    ],

    challenge: {
      title: 'Interrogate an unfamiliar schema',
      brief:
        'You have been handed the sample database with no documentation. Using only queries, produce a short written brief for a new teammate: how many rows are in each of the five tables, what distinct values appear in `orders.status` and `products.category`, what date range `orders.order_date` covers, and which two tables you believe are the busiest join. Justify the last point from the row counts and the foreign keys rather than from intuition.',
      language: 'sql',
      acceptanceCriteria: [
        'A row count is reported for all five tables',
        'The distinct values of at least two text columns are listed, obtained with DISTINCT rather than by eye',
        'The minimum and maximum order_date are reported',
        'The claim about the busiest join cites row counts and the foreign-key relationships',
      ],
      starterCode: "SELECT 'customers' AS table_name, COUNT(*) AS rows FROM customers;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine years old and I keep all my club’s information in a notebook. Teach me what a database is and why my club might need one.',
      mustCover: [
        'A database is an organised, permanent store of related facts, managed by a program',
        'It protects data from being lost or half-written when something goes wrong',
        'It stops two people changing the same thing at once from making a mess',
        'It refuses to store facts that contradict each other, such as an order for a customer who does not exist',
        'It can answer questions over huge amounts of data quickly, because you say what you want and it works out how',
      ],
      bonusSignals: ['uses a concrete everyday analogy', 'distinguishes the data from the software from the query language', 'mentions that the rules live with the data, not in each program'],
      sampleExplanation:
        'A database is a very well organised notebook that has its own librarian. The librarian is a program, and looking after the facts is its only job. If the power goes out while you are writing, the librarian makes sure your sentence is either completely written or not written at all — never half. If two of you want to write on the same page at the same moment, the librarian takes turns for you so nothing gets scribbled over. The librarian also knows the club’s rules, so if you try to sign someone up for a trip who is not a member, it simply says no. And because the librarian keeps an index at the back, when you ask "who joined in March?" it does not read every page — it looks the answer up. The clever part is that you never tell it how to search. You just say what you want, in a language called SQL, and it works out the quickest way itself.',
    },
  },

  {
    id: 'SQL-002',
    domain: 'SQL',
    module: 'Relational Foundations',
    topic: 'Tables, rows, columns and types',
    title: 'Tables, Rows, Columns and Types',
    slug: 'tables-rows-columns',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ['SQL-001'],
    related: ['SQL-001', 'SQL-003'],
    tags: ['schema', 'types', 'null', 'ddl', 'create-table', 'constraints'],

    learningObjectives: [
      'Describe a table as a set of rows over a fixed schema of named, typed columns',
      'Choose an appropriate column type and explain what the type buys you',
      'Explain NULL as "unknown", not as zero or empty string, and predict how it behaves in expressions',
      'Read and write a CREATE TABLE statement with NOT NULL, DEFAULT and CHECK constraints',
      'Explain how SQLite’s type affinity differs from PostgreSQL’s strict typing',
    ],

    terminology: [
      {
        term: 'Table (relation)',
        definition:
          'A named collection of rows, all sharing the same ordered list of typed columns. Mathematically a set: the relational model attaches no meaning to row order.',
        simple: 'A grid of facts where every row has the same headings.',
      },
      {
        term: 'Row (tuple / record)',
        definition: 'One complete fact about one entity — one customer, one order line — with a value in every column.',
        simple: 'One line of the grid, describing one thing.',
      },
      {
        term: 'Column (attribute / field)',
        definition: 'A named, typed property that every row in the table has, such as `price REAL` or `signup_date TEXT`.',
        simple: 'One heading of the grid, the same for every row.',
      },
      {
        term: 'Schema',
        definition:
          'The structural definition of the tables: their names, their columns, those columns’ types, and the constraints that rows must satisfy. Enforced by the engine on every write.',
        simple: 'The rulebook describing what the tables look like and what counts as a valid row.',
      },
      {
        term: 'NULL',
        definition:
          'A marker meaning "no value is recorded here". It is not zero, not an empty string and not false; it is the absence of information, and it propagates through expressions.',
        simple: 'A blank that means "we do not know", not "nothing" and not "zero".',
      },
      {
        term: 'Type affinity',
        definition:
          'SQLite’s relaxed typing rule: a column has a preferred type and converts values towards it where it can, but will store a value of another type rather than reject it. PostgreSQL instead rejects the row.',
        simple: 'SQLite prefers a type rather than insisting on one.',
      },
    ],

    simpleExplanation:
      "A table is a grid with headings. Every row down the grid describes one thing — one customer, one product, one order — and every column across it is one property that all of those things have. The headings are fixed in advance and each one carries a type, so the `price` column holds numbers and will not quietly accept the word “free”. That is the whole shape of relational data, and it is deliberately boring: because every row has the same columns, the engine can check, index and combine them mechanically. The one genuinely subtle part is the blank. A blank cell in SQL is called NULL, and it does not mean zero and it does not mean empty text. It means nobody recorded a value. That distinction sounds pedantic until you realise that a customer with zero orders and a customer whose order count was never measured are different facts, and SQL keeps them different on purpose.",

    whyItExists:
      'Before the relational model, applications navigated data by following pointers through hierarchies and networks, so changing the storage layout broke every program that used it. Fixing all data into uniform, typed tables means queries describe data by value rather than by physical path, the engine can validate every row against one rulebook, and storage can be reorganised beneath an unchanged query.',

    analogy: {
      scenario:
        'Think of a paper form that a clinic gives every patient: the same boxes, in the same order, printed on every copy. Name goes in the name box, date of birth in the date box, and the receptionist rejects a form where the date box contains "yes". A filing cabinet full of those completed forms is a table: one form per patient, identical boxes on each. Crucially, a box left empty on a form does not mean the patient has no name — it means nobody wrote one down.',
      mapping: [
        { from: 'The blank printed form', to: 'The table schema — column names and types' },
        { from: 'One completed form', to: 'One row' },
        { from: 'One printed box, e.g. "Date of birth"', to: 'One column, with its declared type' },
        { from: 'The receptionist refusing "yes" in a date box', to: 'Type checking and CHECK constraints on insert' },
        { from: 'A box that must never be left empty', to: 'A NOT NULL constraint' },
        { from: 'An empty box meaning "not recorded"', to: 'NULL — unknown, not zero and not empty text' },
      ],
      bridge:
        'The form is the schema and the cabinet is the table: the reason every form is identical is exactly the reason a table’s columns are fixed — uniformity is what lets anything be checked or searched mechanically. And the empty box is the precise intuition for NULL: it records that information is missing, which is why SQL refuses to guess and makes arithmetic on NULL give NULL.',
      limitations:
        'The cabinet suggests the forms sit in an order, and it is tempting to think of "the first row". A table is a set: unless you write ORDER BY, the order rows come back in is not defined and can change when the data or the plan changes.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The sample schema, column by column',
        caption: 'Five tables. Every query in this domain uses some combination of these.',
        columns: ['Table', 'Columns', 'One row means'],
        rows: [
          ['customers', 'id, name, city, country, signup_date', 'One person who has registered'],
          ['products', 'id, name, category, price, stock', 'One item we sell'],
          ['orders', 'id, customer_id, order_date, status', 'One order placed by one customer'],
          ['order_items', 'id, order_id, product_id, quantity, unit_price', 'One product line within one order'],
          ['employees', 'id, name, manager_id, department, salary, hire_date', 'One member of staff, who may report to another'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of a column definition',
        subject: 'price REAL NOT NULL DEFAULT 0 CHECK (price >= 0)',
        annotations: [
          { part: 'price', note: 'The column name. Lower case with underscores is the convention that survives every dialect.' },
          { part: 'REAL', note: 'The declared type — a floating-point number. Use a decimal type for money in production; REAL is fine for learning.' },
          { part: 'NOT NULL', note: 'A constraint: this column may never be unknown. The insert fails rather than storing a blank.' },
          { part: 'DEFAULT 0', note: 'What to store when an INSERT does not mention this column at all. It does not apply when you explicitly insert NULL.' },
          { part: 'CHECK (price >= 0)', note: 'A rule the engine evaluates on every insert and update. Negative prices become impossible rather than merely unlikely.' },
        ],
      },
      {
        kind: 'compare',
        title: 'NULL is not zero and not an empty string',
        caption: 'Three different facts that beginners collapse into one.',
        left: {
          heading: 'NULL — unknown',
          points: [
            'Means: no value was recorded',
            '`stock = NULL` is never true, not even for NULL',
            '`5 + NULL` is NULL — unknown propagates',
            'Skipped by COUNT(col), SUM and AVG',
            'Tested only with `IS NULL` / `IS NOT NULL`',
          ],
        },
        right: {
          heading: '0 or ’’ — known values',
          points: [
            'Means: we measured it, and it was zero or empty',
            '`stock = 0` is true for zero',
            '`5 + 0` is 5 — ordinary arithmetic',
            'Counted and averaged like any other value',
            'Tested with ordinary `=` comparison',
          ],
        },
      },
    ],

    formalDefinition:
      'A table is a named relation: a finite multiset of tuples over a schema of attributes, each attribute having a name and a declared domain (type). Constraints — NOT NULL, CHECK, UNIQUE, PRIMARY KEY, FOREIGN KEY — are predicates the DBMS evaluates on every modification, rejecting any change that would leave the relation violating them. NULL is a distinguished marker outside every domain, denoting an unknown or inapplicable value.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Creating a table with real constraints',
        runnable: true,
        code: `CREATE TABLE suppliers (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  country     TEXT,
  rating      REAL    CHECK (rating BETWEEN 0 AND 5),
  active      INTEGER NOT NULL DEFAULT 1
);

INSERT INTO suppliers (id, name, country, rating)
VALUES (1, 'Northwind Foods', 'Ireland', 4.5);

SELECT * FROM suppliers;`,
        explanation:
          'Every clause here is enforcement, not documentation. `NOT NULL` on name means a nameless supplier cannot be stored by any client. `CHECK` makes a rating of 9 impossible. `DEFAULT 1` fills `active` because the insert never mentioned it, while `country` was also unmentioned and so became NULL — the difference is that `country` has no default. SQLite has no boolean type, so a flag is stored as INTEGER 0 or 1; PostgreSQL has a real BOOLEAN.',
        output: `id  name             country  rating  active
--  ---------------  -------  ------  ------
1   Northwind Foods  Ireland  4.5     1`,
      },
      {
        language: 'sql',
        title: 'NULL propagates, and never equals anything',
        runnable: true,
        code: `SELECT
  NULL = NULL        AS null_equals_null,
  NULL IS NULL       AS null_is_null,
  10 + NULL          AS arithmetic,
  'abc' || NULL      AS concatenation,
  COALESCE(NULL, 0)  AS coalesced;`,
        explanation:
          'The first column comes back NULL rather than 1: comparing two unknowns cannot yield true, because the answer is itself unknown. Only `IS NULL` can test for absence, and it returns a real boolean. Arithmetic and string concatenation both propagate the unknown. `COALESCE` is the escape hatch — it returns its first non-NULL argument, which is how you say "treat missing as zero" deliberately rather than by accident.',
        output: `null_equals_null  null_is_null  arithmetic  concatenation  coalesced
----------------  ------------  ----------  -------------  ---------
                  1                                        0`,
      },
      {
        language: 'sql',
        title: 'Reading the schema of a table you did not write',
        runnable: true,
        code: `-- SQLite: describe a table\nPRAGMA table_info(orders);

-- The portable version, if you just want a feel for the data
SELECT * FROM orders LIMIT 5;`,
        explanation:
          'The first statement lists each column with its declared type, whether it is NOT NULL, its default, and whether it is part of the primary key — the fastest way to orient yourself in an unfamiliar database. In PostgreSQL the equivalents are `\\d orders` in psql or a query against `information_schema.columns`. The second statement is the other half of orientation: types tell you what is allowed, five sample rows tell you what is actually there.',
        output: `cid  name         type     notnull  dflt_value  pk
---  -----------  -------  -------  ----------  --
0    id           INTEGER  0                    1
1    customer_id  INTEGER  0                    0
2    order_date   TEXT     0                    0
3    status       TEXT     0                    0`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Missing values in a training set',
        usage:
          'A NULL in `signup_date` and a date of 1970-01-01 are different problems. Loading a table into pandas turns NULL into `NaN` or `None`, and deciding whether to impute, drop or encode the missingness is a modelling decision that starts with knowing the value was never recorded.',
      },
      {
        context: 'Money stored as a float',
        usage:
          'Storing prices as REAL means 0.1 + 0.2 is not exactly 0.3, and totals drift by fractions of a cent across millions of rows. Production systems use NUMERIC/DECIMAL, or store integer minor units — pence rather than pounds.',
      },
      {
        context: 'Dates as text in SQLite',
        usage:
          'SQLite has no date type, so the convention is ISO-8601 text (`2024-03-07`), which sorts and compares correctly as a string. Any other format — `07/03/2024` — sorts wrongly and cannot be compared with BETWEEN.',
      },
      {
        context: 'Schema migrations',
        usage:
          'Adding a NOT NULL column to a populated table fails unless you supply a default, because existing rows would violate it. Tools such as Alembic and Flyway exist to apply these changes in a controlled, reversible order.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.dtypes` is the DataFrame equivalent of a schema, and `NaN` is how a SQL NULL arrives after `read_sql`.' },
      { tool: 'SQLAlchemy', role: 'Declares the same column types and constraints in Python, then emits the CREATE TABLE statements for you.' },
      { tool: 'Pydantic', role: 'Applies the same idea — typed, validated fields — at the API boundary instead of the storage boundary.' },
      { tool: 'Great Expectations', role: 'Data-quality checks that re-assert schema expectations (types, null rates, ranges) on data already in the warehouse.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `WHERE status = NULL`',
        why: 'Any comparison with NULL evaluates to unknown, never to true, so the predicate filters out every row and the query returns nothing — with no error to warn you.',
        fix: 'Use `WHERE status IS NULL` or `IS NOT NULL`. This is the single most common NULL bug and it fails silently.',
      },
      {
        mistake: 'Treating NULL as zero in aggregates',
        why: 'AVG ignores NULLs rather than counting them as zero, so the average of 10, 20 and NULL is 15, not 10. Two defensible answers exist and the engine picks one.',
        fix: 'Decide explicitly: `AVG(col)` to average the known values, or `AVG(COALESCE(col, 0))` to treat missing as zero. Say which you mean in the query.',
      },
      {
        mistake: 'Storing dates in a local format such as 07/03/2024',
        why: 'SQLite compares text lexicographically, so `07/03/2024` and `07/04/2023` sort by day first, and BETWEEN over a date range returns nonsense.',
        fix: 'Always store ISO-8601 (`YYYY-MM-DD`) text in SQLite, where lexicographic order equals chronological order. In PostgreSQL use a real `date` or `timestamptz` column.',
      },
      {
        mistake: 'Relying on the order rows come back in',
        why: 'A table is a set. Without ORDER BY the engine may return rows in insertion order today and in index order tomorrow, once a plan changes.',
        fix: 'If order matters, write ORDER BY. If you need a stable tiebreak, add a unique column such as `id` as the final sort key.',
      },
      {
        mistake: 'Assuming SQLite will reject a wrongly typed value',
        why: 'SQLite uses type affinity: inserting the text "cheap" into a REAL column stores the text rather than raising an error, so bad data enters silently.',
        fix: 'Add CHECK constraints (`CHECK (typeof(price) = ’real’)`) where it matters, and remember that PostgreSQL would have refused the row outright.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between NULL, 0 and an empty string?',
        answer:
          'NULL means no value was recorded — the information is unknown or inapplicable. Zero and the empty string are recorded values that happen to be zero or empty. The difference shows up in three places: comparisons (`x = NULL` is never true, so you need `IS NULL`), arithmetic and concatenation (anything combined with NULL yields NULL), and aggregation (`COUNT(col)` and `AVG(col)` skip NULLs, while they count zeros). Conflating them corrupts analysis: a customer with zero orders and a customer whose order count was never measured are genuinely different facts.',
        followUp:
          'A strong answer notes that Oracle famously treats the empty string as NULL, which is a dialect trap worth knowing when porting queries.',
      },
      {
        level: 'intermediate',
        question: 'Why does `SELECT COUNT(*) FROM t` differ from `SELECT COUNT(city) FROM t`?',
        answer:
          '`COUNT(*)` counts rows, full stop — it never looks at values, so nothing can be skipped. `COUNT(city)` counts rows where `city` is not NULL, because aggregate functions ignore NULL inputs. On a table of 100 rows where 12 have no city recorded, the first returns 100 and the second returns 88. The difference is a quick, cheap null audit: comparing the two per column tells you the missingness rate of every column, which is exactly what you want to know before building a training set.',
      },
      {
        level: 'internship',
        question: 'How would you decide the type for a column holding a monetary amount?',
        answer:
          'Not a float. Binary floating point cannot represent 0.10 exactly, so sums drift and equality comparisons fail in ways that are impossible to debug after the fact. In PostgreSQL use `NUMERIC(12, 2)`, which is exact decimal arithmetic; in systems without it, store integer minor units — amount in pence — and format on display. SQLite has only INTEGER, REAL, TEXT, BLOB and NULL, so the integer-minor-units approach is the usual choice there. The general principle is to pick the narrowest type that represents every legal value exactly, then add a CHECK constraint for the range.',
        followUp:
          'Mentioning that currency itself needs a column, because an amount without a currency is not a monetary value, distinguishes a candidate who has built a payments system.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a CREATE TABLE statement for a `reviews` table: an integer id, the product it refers to, a rating from 1 to 5 that must be present, optional free-text body, and a creation date that defaults to today.',
        hint: 'You need PRIMARY KEY, NOT NULL, CHECK and DEFAULT. In SQLite, `DATE(’now’)` gives today as ISO text.',
        language: 'sql',
        starterCode: 'CREATE TABLE reviews (\n  id INTEGER PRIMARY KEY,\n  -- add the rest\n);\n',
        solution:
          "CREATE TABLE reviews (\n  id         INTEGER PRIMARY KEY,\n  product_id INTEGER NOT NULL REFERENCES products(id),\n  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),\n  body       TEXT,\n  created_at TEXT    NOT NULL DEFAULT (DATE('now'))\n);\n\nNotice which columns are nullable and why: `body` is optional because a rating without a comment is a perfectly valid review, while `rating` is required because a review with no rating is not. That judgement — which facts may legitimately be unknown — is the real work of schema design.",
      },
      {
        prompt: 'The sample `products` table has a `stock` column. Write one query that reports, for every product, the name, the stock, and a `stock_label` that reads "unknown" when stock is NULL and the number as text otherwise.',
        hint: 'COALESCE returns its first non-NULL argument. CAST turns a number into text.',
        language: 'sql',
        starterCode: '-- name, stock, and a human-readable stock_label\n',
        solution:
          "SELECT\n  name,\n  stock,\n  COALESCE(CAST(stock AS TEXT), 'unknown') AS stock_label\nFROM products;\n\nThe CAST has to happen inside COALESCE so both branches are text; otherwise SQLite must reconcile an integer with a string. The wider lesson is that turning NULL into a displayable value is a presentation decision you make at the edge, and you should never do it by storing a sentinel such as -1 in the column itself — sentinels get included in averages.",
      },
      {
        prompt: 'For every column of `customers`, work out how many rows have a value recorded. Return one row with five counts.',
        hint: 'COUNT(*) counts rows; COUNT(col) counts non-NULL values in that column. Put them side by side.',
        language: 'sql',
        solution:
          'SELECT\n  COUNT(*)           AS total_rows,\n  COUNT(name)        AS has_name,\n  COUNT(city)        AS has_city,\n  COUNT(country)     AS has_country,\n  COUNT(signup_date) AS has_signup_date\nFROM customers;\n\nEach count below `total_rows` reveals missing data in that column. This three-line query is the first thing worth running against any unfamiliar table, because it tells you immediately which columns you can trust in a model and which will need imputing or excluding.',
      },
    ],

    quiz: [
      {
        id: 'SQL-002-q1',
        type: 'mcq',
        concept: 'null semantics',
        prompt: 'What does `WHERE city = NULL` return?',
        options: [
          'No rows at all, because comparing with NULL is never true',
          'Every row where the city is missing',
          'Every row where the city is an empty string',
          'A syntax error',
        ],
        answerIndex: 0,
        explanation:
          'NULL is unknown, so `city = NULL` evaluates to unknown, which WHERE treats as not-true. The query is legal and silently returns nothing. `WHERE city IS NULL` is the correct form.',
      },
      {
        id: 'SQL-002-q2',
        type: 'code-output',
        language: 'sql',
        concept: 'null propagation',
        prompt: 'What does this return?',
        code: "SELECT 100 + NULL AS a, COALESCE(NULL, NULL, 7) AS b;",
        options: [
          'a is NULL, b is 7',
          'a is 100, b is 7',
          'a is NULL, b is NULL',
          'a is 100, b is NULL',
        ],
        answerIndex: 0,
        explanation:
          'Arithmetic with an unknown operand is unknown, so `100 + NULL` is NULL. COALESCE scans left to right and returns the first argument that is not NULL, which is 7.',
      },
      {
        id: 'SQL-002-q3',
        type: 'truefalse',
        concept: 'row order',
        prompt: 'Without an ORDER BY clause, a table’s rows are guaranteed to come back in the order they were inserted.',
        answer: false,
        explanation:
          'A table is a set, and row order is unspecified without ORDER BY. It may happen to match insertion order today and change tomorrow when an index is added or the plan changes.',
      },
      {
        id: 'SQL-002-q4',
        type: 'match',
        concept: 'constraints',
        prompt: 'Match each constraint to what it prevents.',
        pairs: [
          { left: 'NOT NULL', right: 'A row where this column has no recorded value' },
          { left: 'CHECK (price >= 0)', right: 'A row whose value falls outside an allowed range' },
          { left: 'UNIQUE', right: 'Two rows sharing the same value in this column' },
          { left: 'DEFAULT 1', right: 'A column being left unset when the INSERT omits it' },
        ],
        explanation:
          'Constraints are predicates the engine evaluates on every write. Because they live in the schema rather than in application code, they hold no matter which client inserts the row.',
      },
      {
        id: 'SQL-002-q5',
        type: 'multi',
        concept: 'nulls and aggregates',
        prompt: 'A column `stock` has values 10, 20 and NULL. Which statements are true? Select all that apply.',
        options: [
          '`COUNT(*)` returns 3',
          '`COUNT(stock)` returns 2',
          '`AVG(stock)` returns 15',
          '`AVG(stock)` returns 10',
          '`SUM(stock)` returns 30',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Aggregates skip NULL inputs. COUNT(*) counts rows so it sees 3; COUNT(stock) and AVG(stock) see only the two known values, giving 2 and 15; SUM adds the two known values to 30.',
      },
      {
        id: 'SQL-002-q6',
        type: 'explain',
        concept: 'null as unknown',
        prompt: 'A teammate proposes replacing every NULL in the database with 0 or an empty string "so the queries are simpler". Explain what this costs.',
        rubric: [
          'States that NULL records the absence of information, which 0 and ’’ do not',
          'Gives a concrete case where the two are analytically different, such as an average or a count',
          'Notes that the replacement is irreversible once the original information is gone',
        ],
        sampleAnswer:
          'It destroys the distinction between "we measured it and it was zero" and "we never measured it". Concretely, averaging a stock column with real zeros gives a different and wrong answer from averaging only the known values, and a model trained on the result learns from fabricated data. It also removes the ability to audit missingness, which is how you discover that one upstream system stopped sending a field last Tuesday. And it is irreversible: once the NULLs are overwritten there is no way to recover which rows were originally unknown. The right move is to keep NULL in storage and decide how to handle it explicitly at the point of use, with COALESCE or an imputation step you can describe.',
        explanation:
          'The examinable idea is that NULL carries information — the fact of absence — and collapsing it into a value is a lossy, one-way transformation dressed up as a convenience.',
      },
    ],

    flashcards: [
      { front: 'What is a table, formally?', back: 'A named relation: a set of rows over a fixed schema of named, typed columns. Row order is not part of the definition.' },
      { front: 'What does NULL mean?', back: 'No value recorded — unknown or inapplicable. Not zero, not empty string, not false.' },
      { front: 'How do you test for NULL?', back: '`IS NULL` / `IS NOT NULL`. Never `= NULL`, which evaluates to unknown and matches nothing.' },
      { front: 'COUNT(*) vs COUNT(col)', back: 'COUNT(*) counts rows; COUNT(col) counts rows where col is not NULL. Comparing them gives you a column’s missingness rate.' },
      { front: 'What does COALESCE do?', back: 'Returns its first non-NULL argument, e.g. `COALESCE(stock, 0)` — the deliberate way to treat missing as a specific value.' },
      { front: 'Why store dates as YYYY-MM-DD in SQLite?', back: 'SQLite has no date type, and ISO-8601 is the only common format whose lexicographic order matches chronological order.' },
    ],

    challenge: {
      title: 'Design a schema and defend every nullable column',
      brief:
        'Design and create three tables for a small library: `books`, `members` and `loans` (a loan links one book to one member, with a loan date and an optional return date). Choose types deliberately, add NOT NULL, DEFAULT and CHECK constraints where they earn their place, and insert at least three rows into each. Then write a short justification for every column you left nullable: what real-world fact does the missing value represent?',
      language: 'sql',
      acceptanceCriteria: [
        'All three tables are created with explicit types and a primary key each',
        'At least one CHECK constraint and at least one DEFAULT appear',
        'Every nullable column is justified by a real situation where the value is genuinely unknown',
        'At least one column is deliberately NOT NULL with an explanation of why the fact can never be missing',
        'Sample rows are inserted and a SELECT shows them back',
      ],
      starterCode: 'CREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL\n);\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me what a table is in a database, and then explain why a blank cell is not the same as a zero.',
      mustCover: [
        'A table is a grid where every row is one thing and every column is one property of that thing',
        'Every column has a type, which the database checks so bad values cannot get in',
        'The schema — the column names, types and rules — is fixed in advance for the whole table',
        'NULL means "we do not know", which is different from zero or from empty text',
        'Because NULL is unknown, comparing it with = never gives true; you must use IS NULL',
      ],
      bonusSignals: ['uses a form or spreadsheet analogy', 'gives an example where zero and unknown lead to different answers', 'mentions that rows have no guaranteed order'],
      sampleExplanation:
        'A table is like a printed form that everyone fills in. The form has the same boxes on every copy — name, city, the date you joined — and each box will only accept a certain kind of thing, so you cannot write "Tuesday" in the box that wants a number. One filled-in form is one row, and the pile of forms is the table. Now, the interesting part: if a box is left empty, that does not mean the answer is zero. It means nobody wrote anything down. A shop with zero cans of beans on the shelf is different from a shop where nobody has counted the beans. The database keeps those two apart by using a special mark called NULL for the second one. Because NULL means "unknown", you cannot ask "is this box equal to unknown?" — that question has no sensible answer. You have to ask a different question: "is this box empty?", which in SQL is written IS NULL.',
    },
  },

  {
    id: 'SQL-003',
    domain: 'SQL',
    module: 'Relational Foundations',
    topic: 'Keys and relationships',
    title: 'Primary and Foreign Keys',
    slug: 'primary-and-foreign-keys',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['SQL-002'],
    related: ['SQL-001', 'SQL-002'],
    tags: ['primary-key', 'foreign-key', 'referential-integrity', 'junction-table', 'cardinality'],

    learningObjectives: [
      'Explain what a primary key guarantees and why every table should have one',
      'Declare a foreign key and describe exactly what referential integrity prevents',
      'Model a one-to-many relationship by placing the foreign key on the many side',
      'Model a many-to-many relationship with a junction table, and say why no other option works',
      'Choose between ON DELETE CASCADE, RESTRICT and SET NULL for a given relationship',
    ],

    terminology: [
      {
        term: 'Primary key',
        definition:
          'The column (or set of columns) chosen to identify each row uniquely. It is implicitly UNIQUE and NOT NULL, and at most one may exist per table.',
        simple: 'The column whose value picks out exactly one row, every time.',
      },
      {
        term: 'Foreign key',
        definition:
          'A column whose values must match an existing primary-key value in another table (or be NULL). Declaring one asks the engine to enforce that rule on every insert, update and delete.',
        simple: 'A column that points at a row in another table, and is checked.',
      },
      {
        term: 'Referential integrity',
        definition:
          'The guarantee that every foreign-key value references a row that actually exists — no orphans, no dangling references.',
        simple: 'The promise that nothing points at something that is not there.',
      },
      {
        term: 'Surrogate vs natural key',
        definition:
          'A surrogate key is a meaningless generated identifier (an auto-incrementing integer, a UUID). A natural key is real-world data that happens to be unique, such as an ISBN or an email address.',
        simple: 'A made-up id, versus using a real piece of information as the id.',
      },
      {
        term: 'Cardinality',
        definition:
          'How many rows on each side of a relationship can be associated: one-to-one, one-to-many, or many-to-many. It dictates where the foreign key goes.',
        simple: 'How many of this go with how many of that.',
      },
      {
        term: 'Junction table',
        definition:
          'A table whose purpose is to represent a many-to-many relationship, holding one row per pairing with foreign keys to both sides. Also called a bridge, link or associative table.',
        simple: 'A table of pairings, used when both sides can have many of the other.',
      },
    ],

    simpleExplanation:
      "Data is only useful when you can say which thing you mean and how things connect. A primary key is the column that answers “which one?” — it is unique, it is never blank, and pointing at it picks out exactly one row. In the sample database, `customers.id` does that job. A foreign key answers “connects to what?”. The `orders` table has a `customer_id` column, and by declaring it a foreign key you are telling the database: this number must be a real customer id, and I want you to refuse anything else. That refusal is the whole point. Without it, nothing stops an order arriving for customer 9999 who has never existed, and the orphan sits there silently making every revenue-by-country report slightly wrong. Relationships come in shapes. One customer has many orders, so the pointer lives on the order. But one order contains many products and one product appears in many orders, and no single column can hold many values, so you need a third table — `order_items` — whose only job is to record the pairings.",

    whyItExists:
      'Without keys, rows cannot be identified and therefore cannot be reliably updated, deleted or referred to from elsewhere; a duplicate row is indistinguishable from the original. Without foreign keys, every application that writes to the database has to remember to check that the thing it points at still exists — and one that forgets leaves orphaned data that silently distorts every later join and aggregate.',

    analogy: {
      scenario:
        'Think of a school. Every pupil has a unique admission number printed on their record, and two pupils named Sarah Khan are still two different numbers. When the library lends a book, it does not write "Sarah Khan" on the loan slip — it writes the admission number. Now suppose a pupil leaves and the office deletes their record while a loan slip still carries their number. The librarian is holding a slip pointing at a pupil who no longer exists: the book is lost from the system, and the annual "books on loan" count is wrong for ever.',
      mapping: [
        { from: 'The unique admission number', to: 'The primary key — unique and never blank' },
        { from: 'The pupil’s name, which two people can share', to: 'An ordinary column: useful, but not an identifier' },
        { from: 'The admission number written on a loan slip', to: 'A foreign key referencing the pupils table' },
        { from: 'The office refusing to delete a pupil with books out', to: 'ON DELETE RESTRICT' },
        { from: 'Automatically shredding the slips when a pupil leaves', to: 'ON DELETE CASCADE' },
        { from: 'A slip pointing at a pupil who no longer exists', to: 'An orphaned row — a referential integrity violation' },
      ],
      bridge:
        'The reason the library writes a number rather than a name is exactly why databases use keys: names are not unique and they change, while an identifier is stable and unambiguous. And the office’s dilemma when a pupil leaves is precisely the choice you make when declaring a foreign key — refuse the delete (RESTRICT), delete the dependants too (CASCADE), or keep them but forget who they belonged to (SET NULL).',
      limitations:
        'A school can bend its rules in an emergency; a foreign key cannot be bent for one row. That rigidity is a feature, but it means you sometimes have to model exceptions explicitly rather than quietly breaking the rule once.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'The sample schema as a diagram',
        caption: 'Arrows point from the foreign key to the primary key it must match. Crow’s feet mark the many side.',
        art: `  customers                      products
  +-----------+                  +------------+
  | id  (PK)  |<--+          +-->| id   (PK)  |
  | name      |   |          |   | name       |
  | city      |   |          |   | category   |
  | country   |   |          |   | price      |
  +-----------+   |          |   | stock      |
                  |          |   +------------+
                  |          |
      orders      |          |      order_items
  +--------------+|          |  +---------------+
  | id      (PK) |<-------+  |  | id       (PK) |
  | customer_id  |--------|--+--| order_id  (FK)|
  | order_date   |  (FK)  +-----| product_id(FK)|
  | status       |              | quantity      |
  +--------------+              | unit_price    |
                                +---------------+

  one customer  ---<  many orders  ---<  many order_items  >---  one product

  employees  (self-reference)
  +-------------+
  | id     (PK) |<--+
  | name        |   |
  | manager_id  |---+   a manager is just another employee
  | department  |
  | salary      |
  +-------------+`,
      },
      {
        kind: 'table',
        title: 'Three cardinalities and where the key goes',
        columns: ['Relationship', 'Example in the sample schema', 'Where the foreign key lives'],
        rows: [
          ['One-to-many', 'One customer has many orders', 'On the many side: `orders.customer_id`'],
          ['Many-to-many', 'An order contains many products; a product appears in many orders', 'In a junction table: `order_items(order_id, product_id)`'],
          ['One-to-one', 'An employee has one payroll record', 'Either side, with a UNIQUE constraint on the foreign key'],
          ['Self-referencing', 'An employee reports to another employee', 'On the same table: `employees.manager_id` → `employees.id`'],
        ],
      },
      {
        kind: 'flow',
        title: 'What the engine does when you insert an order',
        caption: 'The foreign-key check happens inside the database, on every write, from every client.',
        steps: [
          { label: 'INSERT arrives', detail: 'A new row for `orders` with `customer_id = 42`.' },
          { label: 'Type and NOT NULL checks', detail: 'Is 42 an integer, and are all required columns present?' },
          { label: 'Foreign-key lookup', detail: 'Does a row with `customers.id = 42` exist right now, in this transaction’s view?' },
          { label: 'Decision', detail: 'If yes, the row is written. If no, the statement fails with a FOREIGN KEY constraint error and nothing is written.' },
          { label: 'Guarantee', detail: 'Because the check is in the engine, no application — or careless script — can bypass it.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Follow a key across tables',
        caption: 'Pick a customer id, then find their orders, then the items on those orders. The key is the thread.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'A primary key is a minimal set of attributes whose values functionally determine every row of a relation and are constrained UNIQUE and NOT NULL. A foreign key is a set of attributes in a referencing relation constrained so that each non-null value combination matches the primary or unique key of some tuple in the referenced relation; the DBMS enforces this invariant on insert, update and delete, applying a declared referential action (NO ACTION, RESTRICT, CASCADE, SET NULL or SET DEFAULT) when the referenced tuple changes.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Declaring keys, and watching a foreign key do its job',
        runnable: true,
        code: `PRAGMA foreign_keys = ON;   -- SQLite requires this per connection

CREATE TABLE authors (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE books (
  id        INTEGER PRIMARY KEY,
  title     TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE RESTRICT
);

INSERT INTO authors VALUES (1, 'Ursula K. Le Guin');
INSERT INTO books   VALUES (1, 'A Wizard of Earthsea', 1);   -- fine
INSERT INTO books   VALUES (2, 'An Orphan Title', 99);       -- rejected`,
        explanation:
          'The last insert fails because no author 99 exists, and that failure is the feature: the bad row never enters the database, so no later query has to cope with it. The `PRAGMA` line matters — SQLite parses foreign keys but does not enforce them unless you switch enforcement on for the connection, which catches out many people migrating from PostgreSQL, where enforcement is always on.',
        output: `Error: FOREIGN KEY constraint failed`,
      },
      {
        language: 'sql',
        title: 'Walking a one-to-many relationship',
        runnable: true,
        code: `-- One customer, many orders: the key lives on the many side.
SELECT c.name, o.id AS order_id, o.order_date, o.status
FROM customers AS c
JOIN orders    AS o ON o.customer_id = c.id
WHERE c.name = 'Ada Okafor'
ORDER BY o.order_date;`,
        explanation:
          'The join condition `o.customer_id = c.id` is the foreign key being followed in the direction of the arrow. Because one customer can have many orders, this query can return several rows for a single customer — that row multiplication is a direct consequence of the cardinality, and understanding it here prevents the double-counting bugs that appear in SQL-010.',
        output: `name        order_id  order_date  status
----------  --------  ----------  ---------
Ada Okafor  3         2024-01-14  shipped
Ada Okafor  17        2024-02-02  pending`,
      },
      {
        language: 'sql',
        title: 'Many-to-many: why order_items has to exist',
        runnable: true,
        code: `-- An order has many products; a product is on many orders.
-- Neither table can hold the other's id, so a junction table does.
SELECT o.id        AS order_id,
       p.name      AS product,
       oi.quantity,
       oi.unit_price,
       oi.quantity * oi.unit_price AS line_total
FROM orders      AS o
JOIN order_items AS oi ON oi.order_id   = o.id
JOIN products    AS p  ON p.id          = oi.product_id
WHERE o.id = 3;`,
        explanation:
          'Each row of `order_items` is one pairing of an order with a product, plus the facts that belong to the pairing rather than to either side — how many, and at what price on that day. That last point is why `unit_price` is stored here and not read from `products`: the price of the product changes over time, but the price actually charged on order 3 must never change. Junction tables routinely carry such relationship attributes.',
        output: `order_id  product           quantity  unit_price  line_total
--------  ----------------  --------  ----------  ----------
3         Mechanical Keys   1         89.0        89.0
3         USB-C Cable       2         12.5        25.0`,
      },
      {
        language: 'sql',
        title: 'Finding orphans in a database with no enforced keys',
        runnable: true,
        code: `-- Orders whose customer_id matches no customer at all.
SELECT o.id, o.customer_id
FROM orders AS o
LEFT JOIN customers AS c ON c.id = o.customer_id
WHERE c.id IS NULL;`,
        explanation:
          'This is the audit query you run when inheriting a database where foreign keys were never declared. The LEFT JOIN keeps every order whether or not a customer matched, and `WHERE c.id IS NULL` keeps only the ones where nothing matched. If it returns rows, your revenue-by-country report has been quietly dropping orders. The LEFT-JOIN-plus-IS-NULL pattern is taught fully in SQL-009; it is worth meeting early because this is its most important use.',
        output: `id   customer_id
---  -----------
(0 rows — referential integrity intact)`,
      },
    ],

    realWorldExamples: [
      {
        context: 'A user-deletion request under GDPR',
        usage:
          'Deleting a user row forces a decision about every table referencing it. Orders usually cannot simply vanish (accounting), so the foreign key is SET NULL or the user row is anonymised in place — a design choice made when the key was declared, long before the legal request arrived.',
      },
      {
        context: 'Joining features to labels for a model',
        usage:
          'Every training set is a join on keys: user features to user labels, event log to session id. When the key is not unique on the side you assumed, the join multiplies rows and the model trains on duplicated examples without anyone noticing.',
      },
      {
        context: 'A tagging system',
        usage:
          'Posts have many tags and tags apply to many posts, so `post_tags(post_id, tag_id)` exists in essentially every content platform. The alternative — a comma-separated `tags` column — cannot be indexed, joined or constrained.',
      },
      {
        context: 'Org charts and category trees',
        usage:
          'A self-referencing key (`employees.manager_id`, `categories.parent_id`) models a hierarchy of unknown depth in one table. Querying it end to end is what recursive CTEs, in SQL-011, are for.',
      },
    ],

    projectConnections: [
      { tool: 'SQLAlchemy', role: '`ForeignKey("customers.id")` and `relationship()` mirror exactly these declarations, and generate the joins for you.' },
      { tool: 'Django ORM', role: '`ForeignKey`, `OneToOneField` and `ManyToManyField` are the three cardinalities of this unit, with the junction table created automatically.' },
      { tool: 'dbt', role: 'Relationship and uniqueness tests re-assert key constraints in warehouses such as BigQuery, which do not enforce them at write time.' },
      { tool: 'pandas', role: '`df.merge(other, on="customer_id", validate="one_to_many")` checks the cardinality you believe in, and raises if it is wrong.' },
    ],

    commonMistakes: [
      {
        mistake: 'Forgetting `PRAGMA foreign_keys = ON` in SQLite',
        why: 'SQLite accepts foreign-key syntax but does not enforce it by default, and the setting is per connection. Constraints appear to exist while silently doing nothing.',
        fix: 'Execute the pragma immediately after opening every connection, and verify with `PRAGMA foreign_keys;` which returns 1 when enforcement is on.',
      },
      {
        mistake: 'Using a natural key such as an email address as the primary key',
        why: 'Natural keys change. When someone updates their email you must cascade that change through every referencing table, and any external system holding the old value breaks.',
        fix: 'Use a surrogate integer or UUID primary key, and put a separate UNIQUE constraint on the email. Identity and contact details are different concerns.',
      },
      {
        mistake: 'Storing a list of ids in one column, e.g. `product_ids = ’1,5,9’`',
        why: 'It violates first normal form: the value is not atomic, so it cannot be joined, indexed, constrained or counted without string surgery, and referential integrity is impossible.',
        fix: 'Create a junction table with one row per pairing. This is the only correct representation of many-to-many in a relational model.',
      },
      {
        mistake: 'Reaching for ON DELETE CASCADE by default',
        why: 'Cascade makes one DELETE silently remove rows from tables you were not thinking about, including financial records. It is an irreversible convenience.',
        fix: 'Default to RESTRICT so the engine makes you handle dependants deliberately. Reserve CASCADE for genuinely owned children, such as order_items belonging to an order.',
      },
      {
        mistake: 'Assuming a foreign key creates an index',
        why: 'PostgreSQL and SQLite index the referenced primary key but not the referencing column, so joins and cascading deletes on a large child table can require a full scan.',
        fix: 'Create an index on every foreign-key column you join or delete through: `CREATE INDEX idx_orders_customer ON orders(customer_id);`. MySQL/InnoDB does this for you, which is why the habit is easy to lose.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between a primary key and a unique constraint?',
        answer:
          'Both guarantee that no two rows share a value, but a primary key additionally forbids NULL and there can be only one per table, because it is the table’s designated identity. A unique constraint may allow NULLs (in PostgreSQL and SQLite, multiple NULLs are permitted since they are unknown and so cannot be shown to be duplicates) and a table can have several. In practice the primary key is the stable surrogate id other tables reference, while unique constraints express business rules such as "one account per email address".',
        followUp:
          'A strong answer mentions that foreign keys can reference any unique key, not only the primary key, though referencing the primary key is the convention.',
      },
      {
        level: 'intermediate',
        question: 'How do you model a many-to-many relationship, and why can it not be done with a single foreign key?',
        answer:
          'With a junction table holding one row per pairing and a foreign key to each side — `order_items(order_id, product_id)` — usually with a composite primary key or unique constraint on the pair to prevent duplicates. A single foreign-key column cannot do it because a column holds one atomic value per row: to record that an order contains three products you would need three values in one cell, which breaks first normal form and makes joining, indexing and constraining impossible. The junction table also gives you somewhere to put attributes of the relationship itself, such as quantity and the unit price charged at the time.',
      },
      {
        level: 'internship',
        question: 'A data scientist joins `orders` to `order_items` and reports that total revenue has tripled. What happened?',
        answer:
          'The join multiplied rows. Each order has several item rows, so joining produces one row per item, and any aggregate taken over an order-level column — for instance summing an `order_total` stored on `orders`, or counting `orders.id` — now counts that order once per item. The fix depends on the question: aggregate the item rows to order level first (in a CTE or subquery) and then join, or aggregate the correct column, `SUM(oi.quantity * oi.unit_price)`, which is genuinely per item. The general discipline is to know the grain of every table before joining, and to check that the result’s row count matches the grain you intended.',
        followUp:
          'Mentioning `COUNT(DISTINCT o.id)` as a quick diagnostic, and the word "grain", signals someone who has debugged this in production rather than read about it.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'In the sample schema, which column makes `orders` the "many" side of its relationship with `customers`, and what would go wrong if it were not declared as a foreign key?',
        hint: 'Look for the column in one table that stores another table’s id.',
        solution:
          '`orders.customer_id` holds a `customers.id`, so the pointer lives on the order, which is what makes one customer able to have many orders. Without a foreign-key declaration nothing prevents an order with `customer_id = 9999`, or the deletion of a customer who still has orders. The result is orphaned rows: an INNER JOIN to customers silently drops them, so revenue reports come out low, and the discrepancy is extremely hard to notice because no error is ever raised.',
      },
      {
        prompt: 'Design the tables needed to record which employees have which skills, where an employee can have many skills and a skill is held by many employees. Include the proficiency level for each pairing.',
        hint: 'Two entity tables and one junction table. The proficiency belongs to the pairing, not to either side.',
        language: 'sql',
        starterCode: 'CREATE TABLE skills (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE\n);\n',
        solution:
          "CREATE TABLE skills (\n  id   INTEGER PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE\n);\n\nCREATE TABLE employee_skills (\n  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,\n  skill_id    INTEGER NOT NULL REFERENCES skills(id)    ON DELETE RESTRICT,\n  proficiency INTEGER NOT NULL CHECK (proficiency BETWEEN 1 AND 5),\n  PRIMARY KEY (employee_id, skill_id)\n);\n\nThe composite primary key on the pair does two jobs at once: it identifies the row and it prevents the same employee being recorded twice against the same skill. `proficiency` sits in the junction table because it is a fact about the pairing — it makes no sense on `employees` or on `skills` alone. CASCADE on the employee side is right because the pairings are meaningless once the employee is gone; RESTRICT on the skill side stops someone deleting a skill that people still hold.",
      },
      {
        prompt: 'Write a query that lists every employee alongside their manager’s name, including employees who have no manager.',
        hint: 'Join `employees` to itself with two aliases, and use a LEFT JOIN so the people at the top are not dropped.',
        language: 'sql',
        solution:
          "SELECT e.name AS employee, m.name AS manager\nFROM employees AS e\nLEFT JOIN employees AS m ON m.id = e.manager_id\nORDER BY manager, employee;\n\nThe same table appears twice with different aliases, so `e` is the report and `m` is the manager. The LEFT JOIN matters: the chief executive has `manager_id` NULL, and an INNER JOIN would silently drop exactly the person at the top of the tree — a classic off-by-one-row bug in org-chart reports. The manager column comes back NULL for them, which is correct, because they genuinely have no manager.",
      },
    ],

    quiz: [
      {
        id: 'SQL-003-q1',
        type: 'mcq',
        concept: 'cardinality',
        prompt: 'One customer places many orders. Where does the foreign key go?',
        options: [
          'On `orders`, as `customer_id`',
          'On `customers`, as `order_id`',
          'In a junction table linking the two',
          'On both tables, pointing at each other',
        ],
        answerIndex: 0,
        explanation:
          'The key always goes on the many side, because a column holds one value per row. Putting an `order_id` on `customers` would allow only one order each.',
      },
      {
        id: 'SQL-003-q2',
        type: 'truefalse',
        concept: 'primary keys',
        prompt: 'A primary key column may contain NULL as long as the values that are present are unique.',
        answer: false,
        explanation:
          'A primary key is implicitly NOT NULL as well as UNIQUE. An unknown identifier could not identify a row, so the constraint would be meaningless.',
      },
      {
        id: 'SQL-003-q3',
        type: 'multi',
        concept: 'many-to-many',
        prompt: 'Which statements about `order_items` are true? Select all that apply.',
        options: [
          'It resolves a many-to-many relationship between orders and products',
          'It holds a foreign key to `orders` and a foreign key to `products`',
          'It can hold attributes that belong to the pairing, such as quantity',
          'It is only needed because SQLite lacks array columns',
          'Its grain is one row per product per order',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'A junction table is the relational way to express many-to-many regardless of dialect — array columns exist in PostgreSQL and are still the wrong tool, because they cannot be constrained by a foreign key or joined efficiently.',
      },
      {
        id: 'SQL-003-q4',
        type: 'debug',
        language: 'sql',
        concept: 'referential integrity',
        prompt: 'This INSERT fails with "FOREIGN KEY constraint failed". What is the cause?',
        code: "INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)\nVALUES (900, 4041, 12, 2, 19.99);",
        options: [
          'No row with id 4041 exists in `orders`',
          '`quantity` must be 1',
          '`unit_price` must match `products.price` exactly',
          'The `id` column cannot be supplied explicitly',
        ],
        answerIndex: 0,
        explanation:
          'The message names the constraint type, not the column, so you check every foreign key in the row. Here `order_id = 4041` references an order that does not exist; the engine refuses rather than creating an orphan.',
      },
      {
        id: 'SQL-003-q5',
        type: 'match',
        concept: 'referential actions',
        prompt: 'Match each ON DELETE action to what happens when the referenced parent row is deleted.',
        pairs: [
          { left: 'RESTRICT', right: 'The delete fails while any child row still references it' },
          { left: 'CASCADE', right: 'The child rows are deleted too, automatically' },
          { left: 'SET NULL', right: 'The child rows survive but their foreign key becomes unknown' },
          { left: 'NO ACTION (deferred)', right: 'The check is postponed to the end of the transaction, then behaves like RESTRICT' },
        ],
        explanation:
          'The choice encodes ownership. CASCADE says the child cannot exist without the parent; SET NULL says it can, but loses the link; RESTRICT says a human must decide.',
      },
      {
        id: 'SQL-003-q6',
        type: 'fill',
        concept: 'junction tables',
        prompt: 'What is the name for a table that exists to represent a many-to-many relationship between two other tables?',
        answers: ['junction table', 'junction', 'bridge table', 'link table', 'associative table', 'join table'],
        explanation:
          'Junction, bridge, link and associative all name the same idea: one row per pairing, with a foreign key to each side and often attributes describing the pairing itself.',
      },
      {
        id: 'SQL-003-q7',
        type: 'explain',
        concept: 'surrogate keys',
        prompt: 'Argue for or against using a customer’s email address as the primary key of the `customers` table.',
        rubric: [
          'Notes that email is unique in practice, so it is a candidate key',
          'Explains that natural keys change, and a primary key that changes must cascade everywhere',
          'Recommends a surrogate key plus a UNIQUE constraint on email',
        ],
        sampleAnswer:
          'Email is a candidate key because it is unique, so the proposal is not absurd. It is still the wrong choice, because primary keys should be stable and email addresses are not: when a customer changes theirs, every referencing row in every table must be updated in lockstep, and any external system or log holding the old value now points at nothing. Identity should not depend on a contact detail. The right design is a surrogate integer or UUID primary key that never changes, plus `UNIQUE NOT NULL` on the email column to enforce the business rule. That way "one account per email" is still guaranteed, but changing an email is a single-row update.',
        explanation:
          'The examinable idea is stability: a primary key is an identity, and identity must not change when an attribute of the thing changes.',
      },
    ],

    flashcards: [
      { front: 'What does a primary key guarantee?', back: 'Uniqueness and non-nullness — one value picks out exactly one row. At most one per table, and it is what other tables reference.' },
      { front: 'Where does the foreign key go in a one-to-many relationship?', back: 'On the many side. One customer, many orders ⇒ `orders.customer_id`, because a column holds one value per row.' },
      { front: 'How do you model many-to-many?', back: 'A junction table with one row per pairing and a foreign key to each side, e.g. `order_items(order_id, product_id)`.' },
      { front: 'Surrogate vs natural key', back: 'Surrogate is a meaningless generated id (stable); natural is real data that happens to be unique (changes). Prefer surrogate PK plus UNIQUE on the natural key.' },
      { front: 'What does `PRAGMA foreign_keys = ON` do?', back: 'Switches on foreign-key enforcement in SQLite for that connection. Without it the constraints are parsed but never checked.' },
      { front: 'How do you find orphaned rows?', back: 'LEFT JOIN to the parent table and keep rows where the parent key IS NULL — those referenced nothing.' },
    ],

    challenge: {
      title: 'Audit the integrity of the sample database',
      brief:
        'Write a set of queries that prove or disprove the integrity of the sample data. Check that every `orders.customer_id` matches a customer, every `order_items.order_id` matches an order, every `order_items.product_id` matches a product, and every non-null `employees.manager_id` matches an employee. Then find any customer with no orders and any product never ordered, and explain why those two results are not integrity violations.',
      language: 'sql',
      acceptanceCriteria: [
        'Four orphan checks are written, each using LEFT JOIN plus IS NULL',
        'Customers with no orders and never-ordered products are both found',
        'The write-up explains that an absent child row is legitimate while a dangling pointer is not',
        'The self-referencing employees check correctly excludes the top-level employee whose manager_id is NULL',
      ],
      starterCode: "-- Orphan check 1: orders pointing at no customer\nSELECT o.id, o.customer_id\nFROM orders o\nLEFT JOIN customers c ON c.id = o.customer_id\nWHERE c.id IS NULL;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me why each row in a table needs its own id, and how two tables get connected to each other.',
      mustCover: [
        'A primary key is a unique, never-blank value that identifies exactly one row',
        'A foreign key is a column holding another table’s key, so rows can point at each other',
        'Referential integrity means the database refuses to let a pointer aim at something that does not exist',
        'One-to-many puts the pointer on the many side',
        'Many-to-many needs a third table of pairings, because one cell cannot hold many values',
      ],
      bonusSignals: ['uses a concrete everyday example such as school numbers or library cards', 'explains why names make bad ids', 'mentions what happens when a parent row is deleted'],
      sampleExplanation:
        'Imagine a class where two children are both called Sam. If the teacher writes "Sam" on a permission slip, nobody knows which Sam it is. So the school gives every child a number that belongs only to them and never changes. That number is the primary key. Now the library wants to record who borrowed a book. Instead of writing the name, it writes the number — that borrowed-by number is a foreign key, because it belongs to a different list. The clever part is that the school office checks it: if you try to write down a number that belongs to no child, it refuses, so you can never end up with a book lent to nobody. One child can borrow many books, so the child’s number goes on the book slip, not the other way round. But some things go both ways — a club can have many children and a child can join many clubs — and then you need a third list that simply writes down the pairs: this child, that club, one line each.',
    },
  },

  {
    id: 'SQL-004',
    domain: 'SQL',
    module: 'Querying',
    topic: 'SELECT and projection',
    title: 'SELECT and Projection',
    slug: 'select-and-projection',
    difficulty: 1,
    estimatedMinutes: 30,
    prerequisites: ['SQL-002'],
    related: ['SQL-002', 'SQL-003'],
    tags: ['select', 'projection', 'alias', 'expression', 'distinct', 'case'],

    learningObjectives: [
      'Write a SELECT that returns a chosen subset of columns from a table',
      'Compute derived columns with expressions, string functions and CASE',
      'Name result columns with AS, and explain when an alias is available to other clauses',
      'Use DISTINCT correctly, and explain why it applies to the whole row rather than one column',
      'Say why `SELECT *` is convenient in exploration and a liability in production code',
    ],

    terminology: [
      {
        term: 'Projection',
        definition:
          'The relational operation that chooses which columns appear in the result. `SELECT name, city` projects `customers` onto two of its five attributes.',
        simple: 'Picking which columns you want to see.',
      },
      {
        term: 'Result set',
        definition:
          'The table a query returns. It is itself a relation, which is why a query can appear wherever a table can — in a subquery, a CTE or a view.',
        simple: 'The grid of rows and columns you get back.',
      },
      {
        term: 'Alias',
        definition:
          'A name given to a column or table in the query with `AS`, used to label output or to refer to a table briefly. Column aliases are assigned at SELECT time, which limits where they can be used.',
        simple: 'A nickname for a column or table, just for this query.',
      },
      {
        term: 'Expression',
        definition:
          'Any computation producing a value per row: arithmetic, string concatenation, a function call, or a CASE. SELECT evaluates expressions row by row.',
        simple: 'A little calculation done for each row.',
      },
      {
        term: 'DISTINCT',
        definition:
          'A modifier that removes duplicate rows from the result. It applies to the entire projected row, not to an individual column, and is evaluated after the columns are computed.',
        simple: 'Collapse identical result rows into one.',
      },
      {
        term: 'CASE expression',
        definition:
          'SQL’s conditional: `CASE WHEN condition THEN value ... ELSE value END`. It returns a value per row and can appear anywhere an expression can.',
        simple: 'An if/else you can put inside a query.',
      },
    ],

    simpleExplanation:
      "SELECT is how you ask for columns. `SELECT name, city FROM customers` means: go to the customers table, and for every row give me just those two fields. That narrowing is called projection, and it is half of what querying is — the other half, choosing which rows, comes next. But SELECT does more than pick existing columns: it can compute new ones. You can multiply quantity by price to get a line total, glue a city and a country together into one label, or use CASE to turn a number into a readable band like “cheap”, “mid” and “premium”. Those computed columns do not exist in the table; they exist only in the answer. You give them names with AS, because a column called `quantity * unit_price` is unpleasant to work with. And when the same row comes back several times, DISTINCT collapses the duplicates — with one catch that surprises everybody: it looks at the whole row you asked for, not just the first column.",

    whyItExists:
      'Tables are wide and applications rarely need every column, so moving all of them wastes network, memory and time — and code that depends on a table’s full shape breaks the moment someone adds a column. Projection lets a query state exactly the fields it needs, and expressions let the shaping of data happen once, in the engine, rather than in every program that consumes the result.',

    analogy: {
      scenario:
        'Think of a restaurant kitchen that keeps a huge ingredients store. When an order comes in, the chef does not wheel the whole store out to the table. She takes exactly the ingredients the dish needs — that is choosing columns — and she does not simply hand them over raw: she combines and cooks them into something the diner actually wants, then writes a name on the menu so the diner can order it again without listing the ingredients.',
      mapping: [
        { from: 'The full ingredients store', to: 'The table, with all its columns' },
        { from: 'Taking only the ingredients this dish needs', to: 'Projection — naming columns in SELECT' },
        { from: 'Combining and cooking them', to: 'An expression such as `quantity * unit_price`' },
        { from: 'The name written on the menu', to: 'A column alias created with AS' },
        { from: 'Serving one plate when two orders were identical', to: 'DISTINCT collapsing duplicate rows' },
        { from: 'Wheeling out the entire store just in case', to: '`SELECT *` — easy, wasteful, and fragile when the store is reorganised' },
      ],
      bridge:
        'The chef’s discipline is exactly a query’s: take only what is needed, transform it where the transformation belongs, and label the output so the consumer does not have to reconstruct what it is. And the reason she does not wheel out the whole store is the reason `SELECT *` is discouraged in production — not only the waste, but that the dish silently changes whenever someone reorganises the store.',
      limitations:
        'The kitchen analogy implies the chef works on one order at a time. SQL evaluates the expression for every row of the input at once, and thinking in whole columns rather than single rows is the mental shift that makes the rest of this domain easy.',
    },

    visuals: [
      {
        kind: 'annotated',
        title: 'Anatomy of a SELECT',
        subject: "SELECT DISTINCT c.country AS nation FROM customers AS c",
        annotations: [
          { part: 'SELECT', note: 'Begins the projection: which columns or expressions the result will have.' },
          { part: 'DISTINCT', note: 'Applied after the columns are computed, removing duplicate result rows. Not a function; there are no brackets.' },
          { part: 'c.country', note: 'A qualified column reference. The `c.` prefix is optional with one table and essential once you join.' },
          { part: 'AS nation', note: 'The output column name. AS is optional in most dialects but omitting it makes typos look like intentional aliases.' },
          { part: 'FROM customers', note: 'The source relation. Logically this is evaluated first, before anything in SELECT.' },
          { part: 'AS c', note: 'A table alias, used to keep qualified references short.' },
        ],
      },
      {
        kind: 'table',
        title: 'Projection changes shape, not content',
        caption: 'Same four rows, three different projections.',
        columns: ['Query', 'Rows returned', 'Columns returned'],
        rows: [
          ['`SELECT * FROM customers`', 'All of them', 'All five'],
          ['`SELECT name, city FROM customers`', 'All of them', 'Two'],
          ['`SELECT DISTINCT country FROM customers`', 'One per distinct country', 'One'],
          ['`SELECT name || ’ (’ || city || ’)’ AS label FROM customers`', 'All of them', 'One computed column'],
        ],
      },
      {
        kind: 'widget',
        title: 'Try projecting the sample tables',
        caption: 'Start with `SELECT * FROM products;`, then narrow to three columns, then add a computed one.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'SELECT specifies the projection of a query: an ordered list of expressions evaluated once per row of the input relation, each optionally bound to an output name. The result is a new relation whose degree is the number of expressions. DISTINCT applies set semantics to the projected tuples, eliminating duplicates after evaluation. Column aliases are introduced in the SELECT clause and are therefore not visible to FROM, WHERE, GROUP BY or HAVING under standard scoping, though most engines permit them in ORDER BY.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Projection, expressions and aliases',
        runnable: true,
        code: `SELECT
  name,
  category,
  price,
  ROUND(price * 0.8, 2)        AS sale_price,
  price - ROUND(price * 0.8, 2) AS you_save
FROM products;`,
        explanation:
          'Three columns come straight from the table and two are computed per row. The alias is what makes the result usable — without `AS sale_price` the column would be named after the expression itself, which every client library then has to quote awkwardly. ROUND takes a second argument for decimal places in both SQLite and PostgreSQL, though PostgreSQL requires a numeric rather than a float for the two-argument form, so you may need `ROUND(price::numeric, 2)` there.',
        output: `name             category     price  sale_price  you_save
---------------  -----------  -----  ----------  --------
Mechanical Keys  peripherals  89.0   71.2        17.8
USB-C Cable      cables       12.5   10.0        2.5`,
      },
      {
        language: 'sql',
        title: 'CASE: an if/else inside the projection',
        runnable: true,
        code: `SELECT
  name,
  price,
  CASE
    WHEN price < 20  THEN 'budget'
    WHEN price < 100 THEN 'mid-range'
    ELSE                  'premium'
  END AS price_band,
  CASE WHEN stock = 0 THEN 'out of stock' ELSE 'available' END AS availability
FROM products
ORDER BY price;`,
        explanation:
          'CASE is evaluated top to bottom and stops at the first matching WHEN, so the branches must be written from most specific to least — swapping the first two lines here would label everything under 100 as mid-range. Without ELSE, unmatched rows get NULL, which is a common source of unexpected blanks. Banding a continuous variable like this is exactly the feature-engineering step you would otherwise do in pandas, and doing it in SQL means every consumer of the query sees the same definition.',
        output: `name             price  price_band  availability
---------------  -----  ----------  ------------
USB-C Cable      12.5   budget      available
Mechanical Keys  89.0   mid-range   available
4K Monitor       349.0  premium     out of stock`,
      },
      {
        language: 'sql',
        title: 'DISTINCT applies to the whole row',
        runnable: true,
        code: `-- One row per country
SELECT DISTINCT country FROM customers;

-- One row per country/city pair - NOT one per country
SELECT DISTINCT country, city FROM customers;

-- How many different countries are represented?
SELECT COUNT(DISTINCT country) AS country_count FROM customers;`,
        explanation:
          'The second query surprises people: adding `city` does not give "the city for each country", it gives every distinct combination, so Spain appears once per city. DISTINCT is a property of the result row, not of a column. The third query shows the other form — `COUNT(DISTINCT col)` — which counts distinct values within one column and is what you usually want when auditing a dataset’s cardinality.',
        output: `country
--------
Nigeria
Spain
China

country  city
-------  --------
Nigeria  Lagos
Spain    Madrid
Spain    Seville
China    Shanghai

country_count
-------------
3`,
      },
      {
        language: 'sql',
        title: 'Why an alias cannot be reused in the same SELECT',
        code: `-- Fails in PostgreSQL: sale_price is not defined yet
SELECT price * 0.8 AS sale_price,
       sale_price * 0.2 AS vat
FROM products;

-- Portable fix: repeat the expression, or wrap in a subquery
SELECT sale_price, sale_price * 0.2 AS vat
FROM (SELECT price * 0.8 AS sale_price FROM products);`,
        explanation:
          'Aliases are created by the SELECT clause, so within that same clause they do not yet exist — the error in PostgreSQL is `column "sale_price" does not exist`. SQLite is more permissive and often allows it, which makes this a portability trap rather than an immediate failure. Wrapping the first projection in a subquery (or, better, a CTE as in SQL-011) creates a real intermediate relation whose columns the outer query can use freely.',
        output: `ERROR:  column "sale_price" does not exist
LINE 2:        sale_price * 0.2 AS vat`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Building a feature table for a model',
        usage:
          'Features are almost always expressions: `price / NULLIF(list_price, 0) AS discount_ratio`, or a CASE that buckets a continuous value. Writing them in SQL means the training pipeline and the serving pipeline compute them from one definition.',
      },
      {
        context: 'An API endpoint that must not leak columns',
        usage:
          '`SELECT *` on a users table will happily return `password_hash` and `internal_notes` the day someone adds them. Explicit projection is a security boundary, not merely a style preference.',
      },
      {
        context: 'Cutting query cost in a warehouse',
        usage:
          'BigQuery and Snowflake bill by bytes scanned, and both store data by column. Projecting four columns instead of forty is a direct and often tenfold reduction in the cost of a dashboard.',
      },
      {
        context: 'Producing a display label',
        usage:
          '`name || ’, ’ || city` builds a label once in the query rather than in every front-end that renders it, which keeps the formatting consistent across web, mobile and exports.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df[["name", "city"]]` is projection; `df.assign(total=...)` is a computed column; `np.select` is CASE.' },
      { tool: 'SQLAlchemy', role: '`select(Customer.name, Customer.city)` builds the same projection while keeping the column list explicit and typed.' },
      { tool: 'dbt', role: 'Models are SELECT statements. Naming and banding columns in a dbt model is how a business definition becomes shared and version-controlled.' },
      { tool: 'Parquet / columnar storage', role: 'Column-oriented files make projection cheap: unread columns are never touched on disk, which is why narrow SELECTs matter so much in analytics.' },
    ],

    commonMistakes: [
      {
        mistake: 'Believing `SELECT DISTINCT a, b` gives one row per distinct `a`',
        why: 'DISTINCT deduplicates the whole projected row, so every distinct pair survives. Adding a column can only increase the number of rows returned.',
        fix: 'Use `GROUP BY a` with an aggregate for `b` when you want one row per `a`, or `COUNT(DISTINCT a)` when you want the cardinality of a single column.',
      },
      {
        mistake: 'Using `SELECT *` in application code',
        why: 'The result silently changes shape when a column is added, dropped or reordered, breaking positional access and leaking new columns to clients that should not see them.',
        fix: 'List columns explicitly everywhere except interactive exploration. It also documents, in the query, exactly what the code depends on.',
      },
      {
        mistake: 'Reusing a SELECT alias elsewhere in the same SELECT or in WHERE',
        why: 'Logically, WHERE is evaluated before SELECT, so the alias does not exist yet. PostgreSQL raises "column does not exist"; SQLite sometimes allows it, which hides the bug until you port the query.',
        fix: 'Repeat the expression, or lift it into a CTE or subquery so it becomes a genuine column of an intermediate relation.',
      },
      {
        mistake: 'Reaching for DISTINCT to fix unexpected duplicates after a join',
        why: 'The duplicates are usually a symptom of a join at the wrong grain, and DISTINCT hides the symptom while leaving any SUM or AVG over those rows wrong.',
        fix: 'Find out why rows multiplied — typically a one-to-many join — and aggregate at the right grain instead. See SQL-010.',
      },
      {
        mistake: 'Forgetting that string concatenation with NULL yields NULL',
        why: '`name || ’, ’ || city` becomes NULL for every customer with no city, so the whole label vanishes rather than degrading gracefully.',
        fix: "Wrap nullable parts: `name || COALESCE(', ' || city, '')`. PostgreSQL also offers `CONCAT()`, which treats NULL as an empty string.",
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between `SELECT DISTINCT country, city` and `SELECT DISTINCT country`?',
        answer:
          'The first returns every distinct combination of country and city, so a country with four cities appears four times. The second returns one row per country. DISTINCT operates on the entire projected tuple after the expressions are evaluated, so adding a column can only ever increase the row count, never decrease it. If the intent is "one row per country with some city", DISTINCT is the wrong tool and GROUP BY with an aggregate such as `MIN(city)` is the right one, because it makes the choice of which city explicit.',
      },
      {
        level: 'beginner',
        question: 'Why is `SELECT *` discouraged in production code?',
        answer:
          'Four reasons. It moves data you do not need, which costs network and memory and, in a columnar warehouse, real money per query. It makes the result shape depend on the table definition, so adding or reordering a column can break positional access in client code. It can expose columns that should not leave the database, such as password hashes added later. And it obscures intent: a reader cannot tell what the query actually depends on. It remains perfectly reasonable interactively, when you are exploring a table you do not know, and inside `EXISTS (SELECT * ...)`, where the projection is never evaluated.',
        followUp:
          'A strong answer distinguishes exploration from production rather than declaring `SELECT *` universally wrong.',
      },
      {
        level: 'internship',
        question: 'Write a query that labels each product as budget, mid-range or premium, and explain where you would put that logic in a real pipeline.',
        answer:
          'The query is a CASE expression in the projection: `CASE WHEN price < 20 THEN ’budget’ WHEN price < 100 THEN ’mid-range’ ELSE ’premium’ END AS price_band`, remembering that branches evaluate in order so the thresholds must ascend. Where it belongs depends on who needs to agree on it. If the banding is a business definition used by several dashboards and a model, it belongs in one place — a view or a dbt model — so everyone gets the same thresholds; duplicating the CASE in five notebooks guarantees they diverge. If it is a modelling choice specific to one experiment, keeping it in the feature pipeline alongside the other transformations is more honest, because it will be tuned.',
        followUp:
          'Mentioning that the thresholds should be data-driven (quantiles) rather than round numbers, and that a hard-coded band is a source of train/serve skew, shows engineering maturity.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Return every product with a column `label` formatted as "Name (category) — £price", using string concatenation.',
        hint: 'SQLite concatenates with `||`. Numbers need CAST to text before concatenating.',
        language: 'sql',
        starterCode: '-- Build a single display label per product\n',
        solution:
          "SELECT\n  name || ' (' || category || ') — £' || CAST(price AS TEXT) AS label\nFROM products\nORDER BY name;\n\nThe CAST is required because concatenating a REAL with text is not guaranteed to format the way you want. In PostgreSQL the same query works with `||` too, but `CONCAT(name, ' (', category, ')')` is safer there because CONCAT treats NULL as empty rather than poisoning the whole expression — with `||`, a single NULL category would make the entire label NULL.",
      },
      {
        prompt: 'How many distinct countries do the customers come from, and how many distinct city/country pairs are there? Return both numbers in one row, then explain why they differ.',
        hint: 'COUNT(DISTINCT col) counts within a column. For a pair you need to count distinct concatenated values or use a subquery.',
        language: 'sql',
        solution:
          "SELECT\n  COUNT(DISTINCT country) AS countries,\n  COUNT(DISTINCT country || '|' || city) AS city_country_pairs\nFROM customers;\n\nThe second is at least as large as the first, because each country contributes one row per city it contains. The separator matters: concatenating without one would make ('ab','c') and ('a','bc') collide. In PostgreSQL you can write the cleaner `COUNT(DISTINCT (country, city))` using a row constructor. The practical use of this pair of numbers is checking the grain of a table before you join it — if distinct keys are fewer than rows, the key is not unique.",
      },
      {
        prompt: 'The finance team wants every order line with its total value. Return order_id, product_id, quantity, unit_price and the line total, plus a flag `is_bulk` that is 1 when quantity is 10 or more and 0 otherwise.',
        hint: 'One arithmetic expression and one CASE. SQLite has no boolean type, so use integers.',
        language: 'sql',
        solution:
          'SELECT\n  order_id,\n  product_id,\n  quantity,\n  unit_price,\n  quantity * unit_price AS line_total,\n  CASE WHEN quantity >= 10 THEN 1 ELSE 0 END AS is_bulk\nFROM order_items;\n\nNote that `line_total` is computed from the stored `unit_price` rather than from `products.price`. That is deliberate: the junction table records the price actually charged, so historical order values stay correct even after a price change. Flagging with 1/0 rather than text keeps the column usable as a numeric feature — `AVG(is_bulk)` then gives the bulk-order rate directly.',
      },
    ],

    quiz: [
      {
        id: 'SQL-004-q1',
        type: 'mcq',
        concept: 'distinct semantics',
        prompt: '`customers` holds 40 rows across 3 countries and 12 cities. How many rows does `SELECT DISTINCT country, city FROM customers` return?',
        options: ['12 — one per distinct city/country pair', '3 — one per country', '40 — one per customer', '15 — the countries plus the cities'],
        answerIndex: 0,
        explanation:
          'DISTINCT deduplicates the whole projected row, so the answer is the number of distinct pairs. Since each city belongs to one country, that is 12.',
      },
      {
        id: 'SQL-004-q2',
        type: 'code-output',
        language: 'sql',
        concept: 'case ordering',
        prompt: 'A product costs 15. What does `price_band` contain?',
        code: "SELECT CASE\n         WHEN price < 100 THEN 'mid-range'\n         WHEN price < 20  THEN 'budget'\n         ELSE 'premium'\n       END AS price_band\nFROM products WHERE price = 15;",
        options: ["'mid-range'", "'budget'", "'premium'", 'NULL'],
        answerIndex: 0,
        explanation:
          'CASE stops at the first WHEN that is true. 15 < 100 matches first, so the budget branch is unreachable. Conditions must be ordered from most specific to least.',
      },
      {
        id: 'SQL-004-q3',
        type: 'truefalse',
        concept: 'alias scope',
        prompt: 'A column alias created in SELECT can be used in the WHERE clause of the same query.',
        answer: false,
        explanation:
          'WHERE is evaluated before SELECT logically, so the alias does not exist yet. Repeat the expression or wrap it in a subquery or CTE. Most engines do allow aliases in ORDER BY, which runs after SELECT.',
      },
      {
        id: 'SQL-004-q4',
        type: 'fill',
        concept: 'projection',
        prompt: 'What is the relational-algebra name for the operation of choosing which columns appear in the result?',
        answers: ['projection', 'project', 'projecting'],
        explanation:
          'Projection chooses columns; selection chooses rows. Confusingly, SQL’s keyword SELECT performs projection, while row selection is done by WHERE.',
      },
      {
        id: 'SQL-004-q5',
        type: 'multi',
        concept: 'select star',
        prompt: 'When is `SELECT *` a reasonable choice? Select all that apply.',
        options: [
          'Interactively exploring a table you have never seen',
          'Inside `EXISTS (SELECT * FROM ...)`, where the projection is never evaluated',
          'In an API endpoint returning a user record to the browser',
          'In a dbt model that downstream models depend on',
          'In a quick `LIMIT 5` sanity check of data you just loaded',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'Exploration and EXISTS are fine. Anything another program or query depends on should name its columns, so the contract cannot change silently and no new column leaks out.',
      },
      {
        id: 'SQL-004-q6',
        type: 'debug',
        language: 'sql',
        concept: 'null in expressions',
        prompt: 'Some customers come back with a NULL `label` even though their `name` is present. Why?',
        code: "SELECT name || ', ' || city AS label FROM customers;",
        options: [
          'Their `city` is NULL, and concatenation with NULL yields NULL',
          '`||` is not a valid operator in SQLite',
          'The alias `label` collides with a reserved word',
          'Their `name` contains a comma',
        ],
        answerIndex: 0,
        explanation:
          'NULL propagates through `||`, so one missing part nullifies the whole string. `name || COALESCE(’, ’ || city, ’’)` degrades gracefully instead.',
      },
    ],

    flashcards: [
      { front: 'What is projection?', back: 'Choosing which columns appear in the result. In SQL it is done by the SELECT clause; choosing rows is done by WHERE.' },
      { front: 'Does DISTINCT apply to one column or the whole row?', back: 'The whole projected row. Adding a column to a DISTINCT SELECT can only increase the number of rows returned.' },
      { front: 'Why can WHERE not use a SELECT alias?', back: 'WHERE is evaluated logically before SELECT, so the alias does not exist yet. ORDER BY, which runs after SELECT, usually can.' },
      { front: 'What does CASE do when nothing matches and there is no ELSE?', back: 'It returns NULL — a frequent cause of unexpected blank columns in banded or mapped output.' },
      { front: 'Why avoid `SELECT *` in production?', back: 'It wastes I/O, makes the result shape depend on the schema, can leak newly added columns, and hides what the code actually depends on.' },
      { front: 'What happens to `a || b` when b is NULL?', back: 'The whole expression is NULL. Use COALESCE around the nullable part, or PostgreSQL’s CONCAT, which ignores NULLs.' },
    ],

    challenge: {
      title: 'Build a product catalogue view',
      brief:
        'Write one query that produces a catalogue-ready row for every product: a display label combining name and category, the price, a price band computed with CASE, a stock status of "out of stock", "low" (under 10) or "in stock", and a `discounted_price` at 15% off rounded to two decimals. Every output column must be aliased, nothing may be NULL in the label even when a source column is missing, and the result must be sorted so premium products appear first.',
      language: 'sql',
      acceptanceCriteria: [
        'At least three computed columns, each with a meaningful alias',
        'A CASE with three branches and an explicit ELSE',
        'COALESCE or equivalent protects the label from NULL source columns',
        'Rounding is applied to the discounted price',
        'The result is ordered deliberately, with the ordering explained in a comment',
      ],
      starterCode: '-- One row per product, ready for a catalogue page\nSELECT\n  name,\n  price\nFROM products;\n',
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me what SELECT does, and how a query can show me a column that is not actually stored in the table.',
      mustCover: [
        'SELECT chooses which columns come back — this is called projection',
        'The result is itself a table of rows and columns',
        'Expressions compute a new value for each row, so a column can be calculated rather than stored',
        'AS gives the new column a name you choose',
        'DISTINCT removes duplicate rows, looking at the whole row you asked for',
      ],
      bonusSignals: ['gives a concrete computed column such as quantity times price', 'mentions that computed columns exist only in the answer', 'explains why naming the columns beats asking for everything'],
      sampleExplanation:
        'A table is a big grid, and usually you do not want the whole thing. SELECT is how you say which headings you want: "just the name and the city, please". That is all a basic query is — the grid, narrowed. The fun part is that you can also ask for a column that nobody ever wrote down. If the table stores how many items were bought and the price of each, you can ask for "how many times the price", and the database works that out for every row and gives you a new column of answers. That column does not exist in the table; it exists only in your answer, and it disappears when you are done. Because a column called "how many times the price" is awkward, you give it a name using the word AS — for example AS total. And if the same answer row comes back several times and you only want to see each one once, you write DISTINCT, which throws away the repeats.',
    },
  },

  {
    id: 'SQL-005',
    domain: 'SQL',
    module: 'Querying',
    topic: 'Filtering rows',
    title: 'WHERE: Filtering Rows',
    slug: 'where-filtering-rows',
    difficulty: 2,
    estimatedMinutes: 35,
    prerequisites: ['SQL-004'],
    related: ['SQL-002', 'SQL-004'],
    tags: ['where', 'predicate', 'between', 'in', 'like', 'three-valued-logic', 'null'],

    learningObjectives: [
      'Filter rows with comparison operators and combine predicates using AND, OR and NOT',
      'Use BETWEEN, IN and LIKE correctly, including their inclusivity and wildcard rules',
      'Explain SQL’s three-valued logic and why `= NULL` never matches anything',
      'Predict how NULL behaves inside NOT IN, and avoid the trap it creates',
      'Write predicates that remain sargable, so an index can still be used',
    ],

    terminology: [
      {
        term: 'Predicate',
        definition:
          'A boolean-valued expression evaluated once per row. WHERE keeps a row only when its predicate evaluates to TRUE — not to FALSE, and not to UNKNOWN.',
        simple: 'A test each row has to pass.',
      },
      {
        term: 'Three-valued logic',
        definition:
          'SQL’s logic has TRUE, FALSE and UNKNOWN. Any comparison involving NULL yields UNKNOWN, which propagates through AND, OR and NOT according to a defined truth table.',
        simple: 'Yes, no, and "cannot tell" — and "cannot tell" is not the same as no.',
      },
      {
        term: 'BETWEEN',
        definition:
          '`x BETWEEN a AND b` is shorthand for `x >= a AND x <= b`. Both endpoints are inclusive, which makes it hazardous for timestamps.',
        simple: 'Within a range, endpoints included.',
      },
      {
        term: 'LIKE',
        definition:
          'Pattern matching on text, where `%` matches any sequence of characters and `_` matches exactly one. Case sensitivity is dialect-dependent.',
        simple: 'Matching text with wildcards.',
      },
      {
        term: 'Sargable predicate',
        definition:
          'A predicate the engine can satisfy with an index seek because the indexed column appears bare on one side, rather than wrapped in a function.',
        simple: 'A filter written so the database can look it up instead of reading everything.',
      },
      {
        term: 'Short-circuit (non-)guarantee',
        definition:
          'SQL does not promise to evaluate AND/OR operands left to right or to stop early, since the optimiser may reorder them freely. Guards written as `a IS NOT NULL AND f(a)` are therefore not guaranteed protection.',
        simple: 'You cannot rely on the order your conditions are checked in.',
      },
    ],

    simpleExplanation:
      "If SELECT chooses columns, WHERE chooses rows. You write a test — `price > 100`, `country = 'Spain'`, `order_date >= '2024-01-01'` — and the engine keeps only the rows that pass. You can combine tests with AND (both must pass) and OR (either will do), and there are convenient shorthands: BETWEEN for ranges, IN for a list of allowed values, LIKE for text patterns with wildcards. All of that is straightforward. What is not straightforward, and what catches out everyone at least once, is what happens when a value is missing. SQL does not have two answers to a test, it has three: true, false, and “I cannot tell”. Comparing anything to NULL gives “I cannot tell”, because comparing a known value to an unknown one genuinely has no answer. WHERE only keeps rows whose test came out true, so “cannot tell” rows are dropped — which is why `WHERE city = NULL` returns nothing at all, silently, with no error to tell you that you asked the wrong question.",

    whyItExists:
      'Tables contain everything that ever happened, but almost every question concerns a slice: one country, one date range, one status. Filtering at the engine means only the matching rows are read, materialised and transmitted, so the work is proportional to the answer rather than to the archive — and, with an index, often far smaller than either.',

    analogy: {
      scenario:
        'Picture airport security. Everyone joins the queue, and each person is checked against a rule: boarding pass for today’s flights only. Pass, and you walk through. Fail, and you are turned back. Now imagine someone whose boarding pass is smudged and unreadable. The officer cannot say the pass is valid and cannot say it is invalid — the answer is genuinely unknown. The rule is "let through those who pass the check", so the smudged passenger does not get through. Not because they failed, but because they did not pass.',
      mapping: [
        { from: 'Every passenger joining the queue', to: 'Every row the FROM clause produces' },
        { from: 'The security rule being applied', to: 'The predicate in WHERE' },
        { from: 'Passengers who pass the check', to: 'Rows where the predicate is TRUE' },
        { from: 'The smudged, unreadable pass', to: 'NULL — an unknown value' },
        { from: '"Cannot tell" not counting as a pass', to: 'UNKNOWN is not TRUE, so WHERE discards the row' },
        { from: 'A rule saying "anyone not on the no-fly list"', to: '`NOT IN`, which also fails on unknowns — and silently returns nobody' },
      ],
      bridge:
        'The officer’s three possible verdicts — valid, invalid, unreadable — are exactly SQL’s TRUE, FALSE and UNKNOWN, and the rule "only let through a definite pass" is exactly why WHERE keeps only TRUE. That single sentence explains both `= NULL` returning nothing and the notorious NOT IN trap, which are otherwise two unrelated mysteries.',
      limitations:
        'A real officer would investigate the smudged pass. SQL never investigates: it applies the truth table and moves on, which is why silent empty results are so common and why you must test for NULL explicitly.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'The three-valued truth table',
        caption: 'U is UNKNOWN, the result of any comparison involving NULL.',
        columns: ['p', 'q', 'p AND q', 'p OR q', 'NOT p'],
        rows: [
          ['TRUE', 'TRUE', 'TRUE', 'TRUE', 'FALSE'],
          ['TRUE', 'FALSE', 'FALSE', 'TRUE', 'FALSE'],
          ['TRUE', 'UNKNOWN', 'UNKNOWN', 'TRUE', 'FALSE'],
          ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'TRUE'],
          ['FALSE', 'UNKNOWN', 'FALSE', 'UNKNOWN', 'TRUE'],
          ['UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN'],
        ],
      },
      {
        kind: 'table',
        title: 'Filtering operators at a glance',
        columns: ['Operator', 'Example', 'Meaning and the thing that catches people out'],
        rows: [
          ['= <> < > <= >=', "`status <> 'cancelled'`", 'Rows where status is NULL are dropped, because NULL <> anything is UNKNOWN'],
          ['BETWEEN', '`price BETWEEN 10 AND 50`', 'Both endpoints included. For timestamps prefer `>= start AND < next_start`'],
          ['IN', "`country IN ('Spain','Chile')`", 'A tidy OR chain. Safe with NULLs in the list; NOT IN is not'],
          ['LIKE', "`name LIKE 'A%'`", '`%` = any run of characters, `_` = exactly one. Leading `%` prevents an index seek'],
          ['IS NULL / IS NOT NULL', '`city IS NULL`', 'The only correct way to test for missing values'],
          ['NOT IN', "`id NOT IN (SELECT ...)`", 'Returns no rows at all if the subquery yields a single NULL. Prefer NOT EXISTS'],
        ],
      },
      {
        kind: 'flow',
        title: 'How WHERE decides',
        caption: 'Only a definite TRUE survives.',
        steps: [
          { label: 'FROM produces candidate rows', detail: 'Every row of the table (or the join result) is offered to the filter.' },
          { label: 'Evaluate the predicate per row', detail: 'The expression is computed using that row’s values.' },
          { label: 'Classify the result', detail: 'TRUE, FALSE, or UNKNOWN — the last whenever a NULL took part in a comparison.' },
          { label: 'Keep only TRUE', detail: 'FALSE and UNKNOWN rows are both discarded, indistinguishably.' },
          { label: 'Pass survivors onward', detail: 'GROUP BY, then SELECT, then ORDER BY see only the rows that survived.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Experiment with predicates',
        caption: 'Try `SELECT * FROM products WHERE price BETWEEN 10 AND 50;` then swap BETWEEN for explicit comparisons and confirm they agree.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'WHERE applies a predicate to each tuple produced by the FROM clause and retains exactly those for which the predicate evaluates to TRUE under SQL’s three-valued logic; tuples yielding FALSE or UNKNOWN are eliminated. Comparison operators return UNKNOWN whenever an operand is NULL, so NULL-awareness requires the dedicated IS NULL predicate. WHERE is evaluated after FROM and before GROUP BY, and therefore cannot reference aggregate results or SELECT-clause aliases.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Comparison, AND/OR and precedence',
        runnable: true,
        code: `-- Products that are affordable AND in stock
SELECT name, category, price, stock
FROM products
WHERE price < 100 AND stock > 0;

-- Parentheses matter: AND binds tighter than OR
SELECT name, category, price
FROM products
WHERE (category = 'cables' OR category = 'peripherals')
  AND price < 50;`,
        explanation:
          'The second query is the one worth memorising. Without the parentheses, `category = ’cables’ OR category = ’peripherals’ AND price < 50` would parse as cables at any price, or cheap peripherals — because AND binds more tightly than OR, exactly as multiplication binds more tightly than addition. This is a silent logic bug: the query runs and returns a plausible number of rows, and only a careful count reveals it is wrong.',
        output: `name             category     price  stock
---------------  -----------  -----  -----
USB-C Cable      cables       12.5   240
Mechanical Keys  peripherals  89.0   31

name           category  price
-------------  --------  -----
USB-C Cable    cables    12.5
Mouse Pad      cables    8.0`,
      },
      {
        language: 'sql',
        title: 'BETWEEN, IN and LIKE',
        runnable: true,
        code: `SELECT name, price FROM products
WHERE price BETWEEN 10 AND 50;          -- inclusive at BOTH ends

SELECT name, country FROM customers
WHERE country IN ('Spain', 'Nigeria', 'Chile');

SELECT name FROM customers
WHERE name LIKE 'A%';                   -- starts with A

SELECT name FROM customers
WHERE name LIKE '_a%';                  -- second letter is a

SELECT id, order_date FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01';`,
        explanation:
          'The last query deliberately avoids `BETWEEN ’2024-01-01’ AND ’2024-01-31’`. With plain dates the two agree, but the moment the column holds a timestamp, BETWEEN silently excludes everything after midnight on the 31st — a whole day of data, lost with no error. The half-open pattern `>= start AND < next_start` is correct for dates and timestamps alike, which is why experienced authors use it by default.',
        output: `name         price
-----------  -----
USB-C Cable  12.5
Mouse Pad    8.0

name        country
----------  -------
Ben Torres  Spain
Ada Okafor  Nigeria

name
----------
Ada Okafor

name
----------
Ada Okafor`,
      },
      {
        language: 'sql',
        title: 'The two NULL traps, side by side',
        runnable: true,
        code: `-- Trap 1: silently returns zero rows
SELECT COUNT(*) AS wrong FROM customers WHERE city = NULL;

-- Correct
SELECT COUNT(*) AS right_way FROM customers WHERE city IS NULL;

-- Trap 2: "all statuses except cancelled" also drops NULL statuses
SELECT COUNT(*) AS excludes_nulls_too
FROM orders WHERE status <> 'cancelled';

-- What you almost certainly meant
SELECT COUNT(*) AS keeps_unknown_status
FROM orders WHERE status <> 'cancelled' OR status IS NULL;`,
        explanation:
          'Both traps have the same root: UNKNOWN is not TRUE. In the second pair, an order whose status was never recorded is neither known to be cancelled nor known not to be, so `status <> ’cancelled’` is UNKNOWN and the row disappears from a query the author believed was inclusive. Whenever you write a negative filter on a nullable column, decide explicitly what should happen to the unknowns and say so.',
        output: `wrong
-----
0

right_way
---------
4

excludes_nulls_too
------------------
36

keeps_unknown_status
--------------------
40`,
      },
      {
        language: 'sql',
        title: 'NOT IN versus NOT EXISTS when NULLs are possible',
        runnable: true,
        code: `-- If ANY customer_id in orders is NULL, this returns no rows at all.
SELECT id, name FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);

-- Robust: unaffected by NULLs
SELECT c.id, c.name FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o WHERE o.customer_id = c.id
);`,
        explanation:
          '`x NOT IN (a, b, NULL)` expands to `x <> a AND x <> b AND x <> NULL`, and that last conjunct is UNKNOWN, so the whole expression can never be TRUE — the query returns the empty set for every row, no matter what the data says. NOT EXISTS asks a different question ("does a matching row exist?") which has a definite yes/no answer even with NULLs present. This is the single most expensive NULL bug in practice, because an empty result looks like a legitimate answer.',
        output: `-- NOT IN version
(0 rows)

-- NOT EXISTS version
id  name
--  -----------
7   Priya Nair
19  Tom Halloran`,
      },
      {
        language: 'sql',
        title: 'Sargability: why a function on the column costs you the index',
        runnable: true,
        code: `-- Not sargable: the engine must compute UPPER(name) for every row
SELECT * FROM customers WHERE UPPER(name) = 'ADA OKAFOR';

-- Sargable: the column is bare, so an index on name can be seeked
SELECT * FROM customers WHERE name = 'Ada Okafor';

-- Not sargable
SELECT * FROM orders WHERE SUBSTR(order_date, 1, 4) = '2024';

-- Sargable equivalent
SELECT * FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';`,
        explanation:
          'An index stores the column’s values in order, so it can find `name = ’Ada Okafor’` directly. It stores nothing about `UPPER(name)`, so that predicate forces a full scan of the table no matter how selective it is. Rewriting a filter to leave the column bare on one side is the cheapest performance win in SQL, and the reason date filters should be written as half-open ranges rather than by extracting the year. PostgreSQL offers a third option — an expression index, `CREATE INDEX ON customers (UPPER(name))` — which makes the first form fast again.',
        output: `-- EXPLAIN QUERY PLAN, first query
SCAN customers

-- EXPLAIN QUERY PLAN, second query
SEARCH customers USING INDEX idx_customers_name (name=?)`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Extracting a reproducible training window',
        usage:
          'Every dataset extraction pins a date range in WHERE. Getting the boundary wrong by using inclusive BETWEEN on a timestamp column loses the final day, which shifts label distributions and is almost impossible to spot downstream.',
      },
      {
        context: 'Cohort definitions',
        usage:
          '"Customers who signed up in Q1 and are not in the internal test list" is a WHERE clause, and it is exactly where NOT IN against a nullable column silently returns an empty cohort.',
      },
      {
        context: 'Search boxes',
        usage:
          '`WHERE name LIKE ’%’ || :q || ’%’` powers countless internal admin screens and cannot use a B-tree index because of the leading wildcard. At scale this is replaced by a full-text or trigram index.',
      },
      {
        context: 'Soft deletes',
        usage:
          'Tables with a nullable `deleted_at` column rely on `WHERE deleted_at IS NULL` to mean "still active". Writing `deleted_at = NULL` instead makes the application appear to have no data at all.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df[df.price < 100]` is a WHERE, and `df.isna()` is `IS NULL`. Pandas also drops NaN from comparisons, mirroring three-valued logic loosely.' },
      { tool: 'SQLAlchemy', role: '`.where(Product.price < 100)` builds the same predicate, and `.is_(None)` exists precisely because `== None` would be wrong.' },
      { tool: 'PostgreSQL pg_trgm', role: 'A trigram index makes leading-wildcard LIKE searches fast, which a standard B-tree cannot do.' },
      { tool: 'Query planners', role: '`EXPLAIN QUERY PLAN` (SQLite) and `EXPLAIN ANALYZE` (PostgreSQL) are how you confirm a predicate is actually sargable.' },
    ],

    commonMistakes: [
      {
        mistake: 'Writing `= NULL` or `<> NULL`',
        why: 'Comparisons with NULL yield UNKNOWN, which WHERE treats as a failure, so the query returns nothing and raises no error.',
        fix: 'Use `IS NULL` and `IS NOT NULL`, the only predicates that can inspect absence and return a definite answer.',
      },
      {
        mistake: 'Assuming a negative filter includes rows with NULL',
        why: '`status <> ’cancelled’` is UNKNOWN when status is NULL, so unknown-status rows vanish from a filter the author believed was permissive.',
        fix: 'Be explicit: `status <> ’cancelled’ OR status IS NULL`, or use `COALESCE(status, ’unknown’) <> ’cancelled’`.',
      },
      {
        mistake: 'Using NOT IN against a subquery that can produce NULL',
        why: 'One NULL in the list makes the whole predicate UNKNOWN for every row, so the result is empty — which looks like a valid answer rather than a bug.',
        fix: 'Use NOT EXISTS, which is NULL-safe, or add `WHERE col IS NOT NULL` inside the subquery.',
      },
      {
        mistake: 'Mixing AND and OR without parentheses',
        why: 'AND binds more tightly, so `a OR b AND c` means `a OR (b AND c)`. The query still runs and returns a believable number of rows.',
        fix: 'Parenthesise every mixed expression, even when the default precedence happens to be what you want. It costs two characters and removes a class of silent bug.',
      },
      {
        mistake: 'Wrapping an indexed column in a function',
        why: 'The index stores the raw column values, not the function’s output, so `YEAR(order_date) = 2024` or `UPPER(name) = ...` forces a full table scan.',
        fix: 'Rewrite so the column stands alone: a half-open date range, or a case-normalised column, or an expression index in PostgreSQL.',
      },
      {
        mistake: 'Using BETWEEN on a timestamp column',
        why: 'BETWEEN is inclusive at both ends, so `BETWEEN ’2024-01-01’ AND ’2024-01-31’` excludes everything after midnight on the 31st.',
        fix: 'Use the half-open form `>= ’2024-01-01’ AND < ’2024-02-01’`, which is correct for both dates and timestamps and composes cleanly across months.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why does `SELECT * FROM t WHERE col = NULL` return nothing?',
        answer:
          'Because SQL uses three-valued logic. Any comparison with NULL evaluates to UNKNOWN rather than TRUE or FALSE, since comparing a known value to an unknown one has no defined answer. WHERE retains a row only when the predicate is TRUE, so every row yields UNKNOWN and every row is discarded. The query is syntactically valid, so no error is raised — which is what makes it dangerous. The correct form is `WHERE col IS NULL`, a dedicated predicate that inspects absence and returns a genuine boolean.',
      },
      {
        level: 'intermediate',
        question: 'What is the difference between NOT IN and NOT EXISTS, and when does it matter?',
        answer:
          'They usually agree, and diverge exactly when the subquery can return NULL. `x NOT IN (SELECT y FROM t)` expands conceptually to `x <> y1 AND x <> y2 AND ...`, so a single NULL y makes one conjunct UNKNOWN and the whole predicate can never be TRUE — the query returns zero rows regardless of the data. NOT EXISTS instead asks whether any correlated row exists, which is always a definite yes or no, so NULLs in the subquery are harmless. There is also a planning difference: NOT EXISTS is typically executed as an anti-join and is often faster on large inputs. The habit worth forming is to default to NOT EXISTS unless you know the column is NOT NULL.',
        followUp:
          'A strong answer mentions `LEFT JOIN ... WHERE right.key IS NULL` as the third equivalent formulation, and that all three should produce the same plan in a modern optimiser.',
      },
      {
        level: 'internship',
        question: 'A query filtering on `WHERE DATE(created_at) = ’2024-06-01’` is slow on a 50-million-row table that has an index on `created_at`. What do you change and why?',
        answer:
          'Rewrite it as a half-open range: `WHERE created_at >= ’2024-06-01’ AND created_at < ’2024-06-02’`. The original wraps the indexed column in a function, so the index — which stores raw `created_at` values in sorted order — cannot be used to locate matching rows, and the engine scans all 50 million. The rewritten predicate leaves the column bare on one side, so the index supports a range seek and only the relevant leaf pages are read. The half-open form also avoids the off-by-one-day error that BETWEEN introduces on timestamps. If the function form were genuinely needed, PostgreSQL could support it with an expression index on `DATE(created_at)`, at the cost of extra write overhead.',
        followUp:
          'Verifying with EXPLAIN before and after, and quoting the change in rows examined, turns a plausible answer into a demonstrated one.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Find every order placed in January 2024 whose status is not "cancelled", including orders whose status was never recorded.',
        hint: 'Use a half-open date range, and remember what `<>` does to NULL.',
        language: 'sql',
        starterCode: "SELECT id, order_date, status\nFROM orders\nWHERE -- your predicate here\n",
        solution:
          "SELECT id, order_date, status\nFROM orders\nWHERE order_date >= '2024-01-01'\n  AND order_date <  '2024-02-01'\n  AND (status <> 'cancelled' OR status IS NULL)\nORDER BY order_date;\n\nTwo deliberate choices. The date range is half-open, so it stays correct if `order_date` ever becomes a timestamp. The status test is parenthesised and explicitly readmits NULLs, because `status <> 'cancelled'` alone evaluates to UNKNOWN for unrecorded statuses and would drop exactly the rows the question asks to keep.",
      },
      {
        prompt: 'Return all customers whose name begins with a vowel, using a single LIKE-based predicate, and explain why an index on `name` may not help.',
        hint: 'Five patterns joined by OR, or a character-class trick. Think about what the index is sorted by.',
        language: 'sql',
        solution:
          "SELECT id, name FROM customers\nWHERE name LIKE 'A%' OR name LIKE 'E%' OR name LIKE 'I%'\n   OR name LIKE 'O%' OR name LIKE 'U%';\n\nEach individual pattern is sargable — a prefix match with no leading wildcard can use a B-tree range seek — so a good optimiser may run five cheap seeks and union the results. It may equally decide that five ranges covering a large share of the alphabet are not worth the bookkeeping and scan instead; with only five distinct starting letters out of 26, selectivity is marginal. The point to internalise is that sargability makes an index *usable*, while selectivity decides whether it is *worth using*, and the optimiser weighs both.",
      },
      {
        prompt: 'Find products that have never been ordered. Write it twice — once with NOT EXISTS and once with NOT IN — and say which you would ship.',
        hint: 'The junction table is `order_items`. Ask what happens if `product_id` there could ever be NULL.',
        language: 'sql',
        solution:
          "-- Robust version\nSELECT p.id, p.name\nFROM products AS p\nWHERE NOT EXISTS (\n  SELECT 1 FROM order_items AS oi WHERE oi.product_id = p.id\n);\n\n-- Fragile version\nSELECT id, name FROM products\nWHERE id NOT IN (SELECT product_id FROM order_items);\n\nShip the NOT EXISTS version. If `order_items.product_id` is ever NULL — which a missing foreign-key constraint or a bad import makes possible — the NOT IN version returns zero rows for every product, and an empty result looks exactly like the legitimate answer \"every product has been ordered\". NOT EXISTS gives the right answer either way and is usually planned as an anti-join, which is at least as fast.",
      },
    ],

    quiz: [
      {
        id: 'SQL-005-q1',
        type: 'mcq',
        concept: 'three-valued logic',
        prompt: 'Which rows does WHERE keep?',
        options: [
          'Only rows where the predicate evaluates to TRUE',
          'Rows where the predicate is TRUE or UNKNOWN',
          'Rows where the predicate is not FALSE',
          'All rows, reordering the TRUE ones first',
        ],
        answerIndex: 0,
        explanation:
          'Only a definite TRUE survives. FALSE and UNKNOWN are discarded identically, which is why a NULL-comparison bug produces an empty result rather than an error.',
      },
      {
        id: 'SQL-005-q2',
        type: 'code-output',
        language: 'sql',
        concept: 'not in with null',
        prompt: 'The subquery returns the values 1, 2 and NULL. How many rows does the outer query return?',
        code: 'SELECT id FROM customers WHERE id NOT IN (1, 2, NULL);',
        options: ['Zero rows', 'Every customer except 1 and 2', 'Every customer', 'An error about NULL in a list'],
        answerIndex: 0,
        explanation:
          'It expands to `id <> 1 AND id <> 2 AND id <> NULL`. The last conjunct is UNKNOWN, so the conjunction is never TRUE and no row qualifies. NOT EXISTS avoids this entirely.',
      },
      {
        id: 'SQL-005-q3',
        type: 'truefalse',
        concept: 'between',
        prompt: '`price BETWEEN 10 AND 50` excludes products priced at exactly 50.',
        answer: false,
        explanation:
          'BETWEEN is inclusive at both endpoints, equivalent to `>= 10 AND <= 50`. The inclusivity becomes a hazard on timestamps, where the upper bound cuts the final day off at midnight.',
      },
      {
        id: 'SQL-005-q4',
        type: 'multi',
        concept: 'sargability',
        prompt: 'Which predicates can use a plain B-tree index on the named column? Select all that apply.',
        options: [
          "`name = 'Ada Okafor'`",
          "`name LIKE 'Ada%'`",
          "`UPPER(name) = 'ADA OKAFOR'`",
          "`name LIKE '%Okafor'`",
          '`order_date >= ’2024-01-01’ AND order_date < ’2024-02-01’`',
        ],
        answerIndices: [0, 1, 4],
        explanation:
          'Equality, prefix matching and range comparisons all work on a sorted index. Wrapping the column in a function, or starting a pattern with a wildcard, gives the index nothing to seek on.',
      },
      {
        id: 'SQL-005-q5',
        type: 'debug',
        language: 'sql',
        concept: 'operator precedence',
        prompt: 'This is meant to return cheap cables and cheap peripherals, but it returns expensive cables too. Why?',
        code: "SELECT name FROM products\nWHERE category = 'cables' OR category = 'peripherals' AND price < 50;",
        options: [
          'AND binds tighter than OR, so it reads as cables at any price, or cheap peripherals',
          'OR is not allowed with two equality tests on the same column',
          '`price < 50` should be `price <= 50`',
          'The category values need to be in an IN list',
        ],
        answerIndex: 0,
        explanation:
          'Precedence groups the AND first. Parenthesising the OR — `(category = ’cables’ OR category = ’peripherals’) AND price < 50` — fixes it, and `category IN (...)` reads better still.',
      },
      {
        id: 'SQL-005-q6',
        type: 'fill',
        concept: 'null testing',
        prompt: 'Complete the predicate that keeps only customers with no recorded city: `WHERE city ____`',
        answers: ['IS NULL', 'is null', 'IS  NULL'],
        explanation:
          'IS NULL is the only predicate that can test for absence and return a definite boolean. Every comparison operator returns UNKNOWN against NULL and therefore filters the row out.',
      },
      {
        id: 'SQL-005-q7',
        type: 'explain',
        concept: 'null-aware filtering',
        prompt: 'A report of "orders not cancelled" shows 36 orders, but the table has 40 and only 2 are cancelled. Diagnose it and propose a fix.',
        rubric: [
          'Identifies that some rows have a NULL status',
          'Explains that `status <> ’cancelled’` is UNKNOWN for those rows and so drops them',
          'Proposes an explicit fix such as `OR status IS NULL` or COALESCE',
        ],
        sampleAnswer:
          'Four rows are missing, and only two are cancelled, so two orders must have a status that is neither — almost certainly NULL. The predicate `status <> ’cancelled’` evaluates to UNKNOWN for those rows because comparing an unknown value to a known one has no answer, and WHERE keeps only TRUE, so they are silently dropped alongside the genuinely cancelled ones. The fix is to state what should happen to unknowns: `WHERE status <> ’cancelled’ OR status IS NULL` keeps them, or `WHERE COALESCE(status, ’unknown’) <> ’cancelled’` does the same more compactly. The deeper fix is to ask why status is nullable at all — if every order must have a status, NOT NULL with a default belongs in the schema.',
        explanation:
          'The examinable skill is noticing that the row counts do not reconcile and connecting the gap to UNKNOWN, rather than assuming the data is simply wrong.',
      },
    ],

    flashcards: [
      { front: 'Which rows does WHERE keep?', back: 'Only those whose predicate evaluates to TRUE. FALSE and UNKNOWN are both discarded, indistinguishably.' },
      { front: 'Why does `col = NULL` match nothing?', back: 'Comparing anything to NULL gives UNKNOWN, not TRUE. Use `IS NULL`.' },
      { front: 'Why is NOT IN dangerous?', back: 'A single NULL in the list makes the predicate UNKNOWN for every row, so the query returns zero rows. Use NOT EXISTS.' },
      { front: 'Is BETWEEN inclusive?', back: 'Yes, at both ends. On timestamps use the half-open form `>= start AND < next_start` to avoid losing the last day.' },
      { front: 'What makes a predicate sargable?', back: 'The indexed column appears bare on one side. Wrapping it in a function, or a leading `%` in LIKE, forces a full scan.' },
      { front: 'AND or OR — which binds tighter?', back: 'AND. `a OR b AND c` means `a OR (b AND c)`, so parenthesise every mixed expression.' },
    ],

    challenge: {
      title: 'A null-safe cohort definition',
      brief:
        'Define a "lapsed high-value customer" cohort using only WHERE: customers who signed up before 2024, are based outside Spain, and have placed no order since 2024-01-01. Write it so that customers with a missing country and customers with a missing signup date are handled deliberately rather than accidentally, state in comments which rows you chose to include and why, and make every date predicate half-open. Then prove your handling by reporting the cohort size with and without the NULL-handling clauses.',
      language: 'sql',
      acceptanceCriteria: [
        'Uses NOT EXISTS rather than NOT IN for the "no recent order" condition',
        'Every nullable column tested has an explicit decision about NULLs, stated in a comment',
        'All date filters use half-open ranges',
        'Two counts are produced, showing how many rows the NULL handling changes',
        'Mixed AND/OR conditions are parenthesised',
      ],
      starterCode: "SELECT c.id, c.name, c.country, c.signup_date\nFROM customers AS c\nWHERE c.signup_date < '2024-01-01'\n  -- continue\n;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me how a database picks out just the rows I want, and then explain why asking "which rows have a blank city?" needs a special kind of question.',
      mustCover: [
        'WHERE applies a test to every row and keeps the ones that pass',
        'Tests can be combined with AND and OR, and the order of combination matters',
        'SQL has three answers to a test: true, false, and unknown',
        'Anything compared with a blank gives unknown, and unknown does not count as passing',
        'IS NULL is the special question that can actually detect a blank',
      ],
      bonusSignals: ['uses a concrete gatekeeper analogy', 'gives an example where a query silently returns nothing', 'mentions that no error is raised, which is what makes it dangerous'],
      sampleExplanation:
        'Imagine everybody in a queue and one rule at the door: "you may come in if you are over ten". The doorman asks each person, and only those who definitely answer yes get in. That is what WHERE does — it asks a question of every row and keeps the ones that say yes. You can make the rule fussier by joining two questions with AND, meaning both must be yes, or with OR, meaning either will do. Now the strange bit. Sometimes a row has a blank where the answer should be, and the database writes that blank as NULL, which means "nobody knows". If the doorman asks "are you over ten?" and the person genuinely does not know their age, the answer is not yes and it is not no — it is "cannot tell". The rule says let in the definite yeses, so "cannot tell" stays outside. That is why asking "is your city equal to blank?" never works: comparing anything to a blank gives "cannot tell", so nobody ever gets in. You have to ask a different question altogether, which in SQL is written IS NULL.',
    },
  },

  {
    id: 'SQL-006',
    domain: 'SQL',
    module: 'Querying',
    topic: 'Sorting and limiting',
    title: 'ORDER BY, LIMIT and NULL Handling',
    slug: 'order-by-limit-nulls',
    difficulty: 2,
    estimatedMinutes: 30,
    prerequisites: ['SQL-005'],
    related: ['SQL-004', 'SQL-005'],
    tags: ['order-by', 'limit', 'offset', 'pagination', 'coalesce', 'nulls-last'],

    learningObjectives: [
      'Sort a result by one or more columns, ascending or descending, with a deterministic tiebreak',
      'Use LIMIT and OFFSET to page through results, and explain why deep OFFSET is slow',
      'Predict and control where NULLs appear in a sorted result across dialects',
      'Use COALESCE and NULLIF to shape values for display and for sorting',
      'Explain why a query without ORDER BY has no guaranteed row order at all',
    ],

    terminology: [
      {
        term: 'ORDER BY',
        definition:
          'The clause that imposes an order on the result. It is evaluated after SELECT, so it may reference output aliases as well as source columns.',
        simple: 'The instruction that decides what comes first.',
      },
      {
        term: 'LIMIT / OFFSET',
        definition:
          'LIMIT caps the number of rows returned; OFFSET discards that many rows first. Applied last, after ordering, so their meaning depends entirely on ORDER BY.',
        simple: 'Take only this many rows, optionally skipping some.',
      },
      {
        term: 'Deterministic ordering',
        definition:
          'An ordering in which no two rows compare equal on all sort keys, so the result is reproducible. Achieved by appending a unique column such as the primary key.',
        simple: 'A sort where ties cannot shuffle between runs.',
      },
      {
        term: 'NULLS FIRST / NULLS LAST',
        definition:
          'Standard SQL modifiers controlling where NULLs are placed in a sorted result. PostgreSQL supports them; SQLite supports them from version 3.30, and older versions need a CASE expression.',
        simple: 'Say whether blanks go at the top or the bottom.',
      },
      {
        term: 'COALESCE',
        definition:
          'Returns its first non-NULL argument. Used to supply a display value, or a sort value, in place of a missing one.',
        simple: 'Use this value if the real one is missing.',
      },
      {
        term: 'Keyset pagination',
        definition:
          'Paging by remembering the last row’s sort key and filtering `WHERE key > :last` instead of using OFFSET, so each page costs the same regardless of depth.',
        simple: 'Carry on from where you left off, instead of counting from the start every time.',
      },
    ],

    simpleExplanation:
      "A table is a set, which means it has no order of its own. If you want rows in a particular sequence you must ask, and ORDER BY is how: by price descending, by date ascending, by country then by name. Once the rows are in order, LIMIT lets you take just the first handful — the ten most expensive products, the five most recent orders — and OFFSET lets you skip ahead, which is how page two of a listing gets built. Two things bite people here. The first is ties: if you sort by category alone, all the rows sharing a category can come back in any order, and that order can change between runs, so “the top 3” is not a stable answer unless you add a unique tiebreak. The second is blanks. NULL is unknown, so where should it sort — before everything or after? Different databases answer differently, which means a query that looks right on SQLite can put the blanks at the wrong end on PostgreSQL. You fix that by saying what you want explicitly.",

    whyItExists:
      'Relations are unordered by definition, yet almost every human-facing answer needs a sequence and a cut-off: the latest ten, the highest five, page three. ORDER BY and LIMIT let the engine produce exactly that, often using an index to avoid sorting the whole table just to return the top few rows.',

    analogy: {
      scenario:
        'Think of a race with a finishing straight. Everyone crosses the line, and without a timing system all you have is a crowd of finishers with no defined positions — the order they happen to be standing in tells you nothing. ORDER BY is the timing system. LIMIT 3 is the podium. And if two runners finish in exactly the same recorded time, the podium order between them is arbitrary unless you have a second rule, such as bib number, to break the tie.',
      mapping: [
        { from: 'The unordered crowd of finishers', to: 'A result set with no ORDER BY' },
        { from: 'The timing system ranking them', to: 'ORDER BY' },
        { from: 'Taking only the top three', to: 'LIMIT 3' },
        { from: 'Skipping to positions 11–20', to: 'LIMIT 10 OFFSET 10' },
        { from: 'A tie on the clock', to: 'Rows equal on every sort key — their relative order is undefined' },
        { from: 'Bib number as the tiebreak', to: 'Appending a unique column such as `id` to ORDER BY' },
        { from: 'A runner whose chip failed to record', to: 'A NULL sort key — you must say where it belongs' },
      ],
      bridge:
        'The crucial transfer is that the crowd has no order until someone imposes one. Databases are the same: whatever order rows happen to come back in without ORDER BY is an accident of the current plan, and it will change when the table grows or an index is added. And the tie rule is not pedantry — without a unique final sort key, paging through results can show you the same row twice and skip another entirely.',
      limitations:
        'A race ranks every runner before announcing anyone. A database with the right index does not: it can walk the index and stop after three rows, which is why `ORDER BY price DESC LIMIT 3` can be far cheaper than sorting the whole table.',
    },

    visuals: [
      {
        kind: 'flow',
        title: 'Where ORDER BY and LIMIT sit in the logical order',
        caption: 'They come last, which is why LIMIT without ORDER BY is meaningless.',
        steps: [
          { label: 'FROM', detail: 'Produce the source rows.' },
          { label: 'WHERE', detail: 'Keep rows whose predicate is TRUE.' },
          { label: 'GROUP BY / HAVING', detail: 'Collapse into groups and filter the groups.' },
          { label: 'SELECT', detail: 'Evaluate the projection, creating output columns and aliases.' },
          { label: 'ORDER BY', detail: 'Sort the result. Aliases from SELECT are available here.' },
          { label: 'LIMIT / OFFSET', detail: 'Discard and cap. Only now is "the top 10" defined.' },
        ],
      },
      {
        kind: 'table',
        title: 'Where do NULLs sort?',
        caption: 'The defaults differ, which is why explicit control matters in portable SQL.',
        columns: ['Engine', 'ORDER BY col ASC', 'ORDER BY col DESC', 'Explicit control'],
        rows: [
          ['SQLite', 'NULLs first', 'NULLs last', 'NULLS FIRST / NULLS LAST (3.30+)'],
          ['PostgreSQL', 'NULLs last', 'NULLs first', 'NULLS FIRST / NULLS LAST'],
          ['MySQL', 'NULLs first', 'NULLs last', 'No modifier; sort on `col IS NULL` first'],
          ['Portable everywhere', '—', '—', '`ORDER BY (col IS NULL), col` puts NULLs last'],
        ],
      },
      {
        kind: 'compare',
        title: 'OFFSET pagination versus keyset pagination',
        caption: 'Both show page N. Only one stays fast and stable.',
        left: {
          heading: 'OFFSET 100000 LIMIT 20',
          points: [
            'The engine must produce and discard 100,000 rows first',
            'Cost grows linearly with page depth',
            'A row inserted mid-scroll shifts every later page',
            'Users can jump directly to page 5,000',
            'Trivial to write',
          ],
        },
        right: {
          heading: 'WHERE (id) > :last_id LIMIT 20',
          points: [
            'The index seeks straight to the resume point',
            'Every page costs the same',
            'Stable under concurrent inserts and deletes',
            'Only next/previous navigation is possible',
            'Requires a unique, ordered key to page on',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Sort and page the sample data',
        caption: 'Run `SELECT name, price FROM products ORDER BY price DESC LIMIT 5;` then add OFFSET 5 and confirm the pages do not overlap.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'ORDER BY imposes a total or partial order on the result relation using a list of sort keys, each with a direction (ASC/DESC) and, where supported, a null-placement rule. It is evaluated after SELECT, so output aliases are in scope. LIMIT and OFFSET are applied last, selecting a contiguous window of the ordered result; when the sort keys do not uniquely determine an order, the rows within a tie group are unspecified and may differ between executions, making any LIMIT over a non-deterministic ordering non-reproducible.',

    codeExamples: [
      {
        language: 'sql',
        title: 'Sorting on several keys, with a deterministic tiebreak',
        runnable: true,
        code: `SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC, id ASC
LIMIT 10;`,
        explanation:
          'Sort keys are applied left to right: group by category alphabetically, then within each category put the dearest first. The final `id ASC` is the part beginners omit and professionals never do — without it, two products in the same category at the same price can swap places between runs, so any LIMIT or pagination over this query is not reproducible. A unique final key costs nothing and makes the result a function of the data rather than of the plan.',
        output: `name           category     price
-------------  -----------  -----
USB-C Cable    cables       12.5
Mouse Pad      cables       8.0
4K Monitor     displays     349.0
Mechanical Ke  peripherals  89.0`,
      },
      {
        language: 'sql',
        title: 'Controlling where NULLs land',
        runnable: true,
        code: `-- Engine-dependent: SQLite puts NULLs first ascending, PostgreSQL last
SELECT name, city FROM customers ORDER BY city;

-- Explicit and portable to every engine
SELECT name, city FROM customers
ORDER BY (city IS NULL), city;

-- Explicit, modern SQLite (3.30+) and PostgreSQL
SELECT name, city FROM customers
ORDER BY city NULLS LAST;

-- Sort missing cities as if they were the string 'zzz'
SELECT name, COALESCE(city, '(unknown)') AS city_label
FROM customers
ORDER BY COALESCE(city, 'zzzzzz');`,
        explanation:
          'The trick in the second query is that `city IS NULL` yields 0 or 1, and sorting by that integer first pushes the NULLs to the bottom in any dialect. The fourth shows a different intent: COALESCE in the ORDER BY changes the sort value, while COALESCE in the SELECT changes only the display. Keeping those two uses separate is what lets you show "(unknown)" but sort it wherever you actually want it.',
        output: `name          city
------------  --------
Priya Nair
Ada Okafor    Lagos
Ben Torres    Madrid

name          city
------------  --------
Ada Okafor    Lagos
Ben Torres    Madrid
Priya Nair`,
      },
      {
        language: 'sql',
        title: 'Pagination: OFFSET, and the keyset alternative',
        runnable: true,
        code: `-- Page 1 and page 2 of a product listing
SELECT id, name, price FROM products
ORDER BY price DESC, id ASC
LIMIT 20;

SELECT id, name, price FROM products
ORDER BY price DESC, id ASC
LIMIT 20 OFFSET 20;

-- Keyset: resume after the last row of the previous page
-- (previous page ended at price = 89.0, id = 14)
SELECT id, name, price FROM products
WHERE (price, id) < (89.0, 14)
ORDER BY price DESC, id ASC
LIMIT 20;`,
        explanation:
          'The OFFSET form is easy but the engine still produces and throws away every skipped row, so page 5,000 costs 5,000 pages of work. The keyset form uses a row-value comparison — supported in SQLite and PostgreSQL — to seek directly to the resume point, so every page costs the same. Keyset paging is also stable: with OFFSET, a product inserted while a user is reading page 3 pushes one row from page 3 onto page 4, so they see it twice, and another row is skipped entirely.',
        output: `id  name           price
--  -------------  -----
9   4K Monitor     349.0
14  Mechanical Ke  89.0
...`,
      },
      {
        language: 'sql',
        title: 'COALESCE and NULLIF in practice',
        runnable: true,
        code: `SELECT
  name,
  COALESCE(city, country, 'unknown location') AS best_location,
  price,
  -- Guard against division by zero by turning 0 into NULL
  ROUND(stock / NULLIF(price, 0), 2) AS units_per_currency
FROM products
JOIN customers ON 1 = 1
LIMIT 5;`,
        explanation:
          'COALESCE walks its arguments left to right and returns the first that is not NULL, so it expresses a fallback chain: city if we have it, otherwise country, otherwise a literal. NULLIF does the reverse — `NULLIF(price, 0)` returns NULL when price is zero — which converts a would-be division-by-zero into a NULL result instead of an error. That pairing is the standard idiom for safe ratios, and it is worth remembering that SQLite returns NULL for division by zero anyway while PostgreSQL raises `division by zero`, so the guard is what makes the query portable.',
        output: `name         best_location  price  units_per_currency
-----------  -------------  -----  ------------------
USB-C Cable  Lagos          12.5   19.2
Mouse Pad    Lagos          8.0    41.25`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Leaderboards and "top N" dashboards',
        usage:
          'Every "best-selling products this month" panel is ORDER BY plus LIMIT. Without a unique tiebreak the list reshuffles between refreshes, and users report it as a bug because it is one.',
      },
      {
        context: 'Infinite scroll in a mobile app',
        usage:
          'Apps that scroll through millions of items use keyset pagination, sending the last seen id and timestamp back to the server, precisely because deep OFFSET would make each successive page slower.',
      },
      {
        context: 'Sampling for a quick look at data',
        usage:
          '`ORDER BY RANDOM() LIMIT 1000` gives a random sample in SQLite and PostgreSQL, though it sorts the whole table; on large tables `TABLESAMPLE` (PostgreSQL) is the scalable alternative.',
      },
      {
        context: 'Ranking with missing values',
        usage:
          'Sorting suppliers by rating where some have never been rated is a business decision, not a technical one: unrated at the top looks like a recommendation, unrated at the bottom looks like a penalty. NULLS LAST makes the decision explicit.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.sort_values("price", ascending=False, na_position="last").head(10)` is the same three operations, with the NULL placement spelled out.' },
      { tool: 'Django / SQLAlchemy', role: 'Their paginators emit LIMIT/OFFSET by default; production systems replace them with cursor-based paging for exactly the reasons in this unit.' },
      { tool: 'B-tree indexes', role: 'An index on the sort key lets the engine return the top N by walking the index, skipping the sort entirely — the subject of SQL-013.' },
      { tool: 'Recommender evaluation', role: 'Metrics such as precision@k and NDCG@k are defined over an ordered, truncated list — conceptually ORDER BY score DESC LIMIT k.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using LIMIT without ORDER BY',
        why: '"The first 10 rows" is undefined without an order, so the engine may return different rows after an index is added or the table grows.',
        fix: 'Always pair LIMIT with ORDER BY. The only exception is a quick `LIMIT 5` to eyeball a table’s shape, where you do not care which rows you get.',
      },
      {
        mistake: 'Sorting on a non-unique key and then paginating',
        why: 'Rows tied on the sort key have an undefined relative order, so the same row can appear on two consecutive pages while another never appears at all.',
        fix: 'Append a unique column: `ORDER BY price DESC, id ASC`. This makes the ordering total and pagination reproducible.',
      },
      {
        mistake: 'Assuming NULLs sort the same way everywhere',
        why: 'SQLite treats NULL as smaller than everything (so first ascending); PostgreSQL places NULLs last ascending. A query ported between them silently reverses the blanks.',
        fix: 'Write `NULLS LAST` / `NULLS FIRST` explicitly, or use the portable `ORDER BY (col IS NULL), col`.',
      },
      {
        mistake: 'Deep OFFSET for pagination on a large table',
        why: 'The engine must generate and discard every skipped row, so page depth translates directly into query time, and the last pages time out.',
        fix: 'Use keyset pagination: remember the last row’s sort key and filter with a row-value comparison. Cost then stays constant per page.',
      },
      {
        mistake: 'Sorting by a column that is not in the SELECT list and expecting to see it',
        why: 'ORDER BY can reference source columns that are not projected, which is legal and useful, but the consumer then cannot verify the order from the output alone.',
        fix: 'Project the sort key when a human or a test will check the ordering. Keep it hidden only when it is genuinely internal.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Why might `SELECT * FROM t LIMIT 10` return different rows on two consecutive runs?',
        answer:
          'Because a table is a set and a query with no ORDER BY has no defined row order. The rows you get are whatever the chosen plan produces first, which depends on the access method — a sequential scan, an index scan, a parallel scan — and that can change when statistics are refreshed, an index is created, or the table is rewritten by a vacuum. Nothing is broken; the query simply never promised an order. Adding ORDER BY with a unique tiebreak makes the result a function of the data alone.',
      },
      {
        level: 'intermediate',
        question: 'Your listing endpoint uses LIMIT 20 OFFSET 200000 and times out. What do you change?',
        answer:
          'Switch to keyset pagination. OFFSET requires the engine to produce and discard all 200,000 preceding rows, so cost grows with depth; keyset paging instead carries the last row’s sort key from the previous page and filters `WHERE (sort_key, id) < (:last_key, :last_id)` with the same ORDER BY and LIMIT. With an index on the sort key the engine seeks straight to that position, making every page the same cost. It also fixes a correctness problem people rarely notice: with OFFSET, rows inserted or deleted while a user pages cause duplicates and skips, whereas keyset paging is stable under concurrent writes. The trade-off is losing the ability to jump to an arbitrary page number, which most infinite-scroll interfaces do not need.',
        followUp:
          'A strong candidate notes that the sort key must be unique, or made unique by appending the primary key, for the row-value comparison to be correct.',
      },
      {
        level: 'internship',
        question: 'How do you make sure NULL ratings do not distort a "top rated suppliers" list?',
        answer:
          'Decide explicitly what a missing rating means and encode that decision. If unrated suppliers should not be ranked at all, exclude them with `WHERE rating IS NOT NULL`. If they should appear but at the bottom, use `ORDER BY rating DESC NULLS LAST`, or the portable `ORDER BY (rating IS NULL), rating DESC`. What you should not do is let the engine default decide, because SQLite and PostgreSQL disagree and the list silently inverts when the service is ported or the query is copied into a warehouse. A further refinement is that a 5.0 from one review is not comparable with a 4.6 from four hundred, so a serious ranking uses a smoothed score such as a Bayesian average rather than the raw mean — the NULL question and the small-sample question are the same question in different clothes.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Return the five most expensive products, cheapest of those five first, with a stable order that cannot change between runs.',
        hint: 'You need to take the top five by one ordering and present them in another. A subquery is the clean way.',
        language: 'sql',
        starterCode: '-- Top 5 by price, displayed ascending\n',
        solution:
          'SELECT id, name, price\nFROM (\n  SELECT id, name, price\n  FROM products\n  ORDER BY price DESC, id ASC\n  LIMIT 5\n)\nORDER BY price ASC, id ASC;\n\nThe inner query picks the five dearest with a unique tiebreak so the membership of the set is deterministic; the outer query reorders those five for display. Doing it in one pass is impossible because ORDER BY and LIMIT interact: you cannot take the top five by descending price while sorting ascending. The `id ASC` in both places is what stops two equally priced products swapping in or out of the five between runs.',
      },
      {
        prompt: 'List all customers sorted by city, with customers who have no recorded city appearing last and displayed as "(no city)". Make it work identically on SQLite and PostgreSQL.',
        hint: 'Separate the display value from the sort value. `col IS NULL` evaluates to 0 or 1.',
        language: 'sql',
        solution:
          "SELECT\n  name,\n  COALESCE(city, '(no city)') AS city_label\nFROM customers\nORDER BY (city IS NULL) ASC, city ASC, name ASC;\n\nThe first sort key is a 0/1 flag, so every row with a real city (0) sorts before every row without one (1), in both engines. Only then does the alphabetical sort apply. Note that COALESCE appears in SELECT but not in ORDER BY — if you sorted by the coalesced value instead, '(no city)' would sort under bracket or under N and land somewhere arbitrary in the middle, which is exactly the bug this formulation avoids.",
      },
      {
        prompt: 'Write the second page of a 25-row-per-page order listing, newest first, twice: once with OFFSET and once with keyset paging. Assume page one ended at `order_date = ’2024-03-11’, id = 812`.',
        hint: 'Keyset paging compares the tuple `(order_date, id)` against the last row of the previous page, in the same direction as the sort.',
        language: 'sql',
        solution:
          "-- OFFSET version\nSELECT id, order_date, status FROM orders\nORDER BY order_date DESC, id DESC\nLIMIT 25 OFFSET 25;\n\n-- Keyset version\nSELECT id, order_date, status FROM orders\nWHERE (order_date, id) < ('2024-03-11', 812)\nORDER BY order_date DESC, id DESC\nLIMIT 25;\n\nBoth return page two now, but they diverge under load and at depth. The keyset version seeks directly into the index on `(order_date, id)` and costs the same on page 2 as on page 2,000, and because it anchors to a specific row rather than to a count, an order inserted between the two requests cannot cause a duplicate or a skip. The row-value comparison `(a, b) < (x, y)` is the concise way to express \"strictly before this point in the sort order\"; writing it out by hand needs `a < x OR (a = x AND b < y)`.",
      },
    ],

    quiz: [
      {
        id: 'SQL-006-q1',
        type: 'truefalse',
        concept: 'row order',
        prompt: 'A query with LIMIT but no ORDER BY is guaranteed to return the same rows every time.',
        answer: false,
        explanation:
          'Without ORDER BY the row order is unspecified, so which rows the LIMIT keeps can change when the plan changes — after an index is added, statistics refresh, or the table grows.',
      },
      {
        id: 'SQL-006-q2',
        type: 'order',
        concept: 'logical clause order',
        prompt: 'Put these clauses in the order the engine logically evaluates them.',
        items: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'],
        explanation:
          'This order explains why WHERE cannot see a SELECT alias (SELECT has not run) while ORDER BY can (it runs after), and why LIMIT is meaningless without ORDER BY.',
      },
      {
        id: 'SQL-006-q3',
        type: 'mcq',
        concept: 'deterministic sorting',
        prompt: 'Why append `id ASC` to `ORDER BY price DESC`?',
        options: [
          'To make the order total, so tied prices cannot shuffle between runs',
          'Because ORDER BY requires at least two keys',
          'To make the query use an index',
          'To exclude rows with duplicate prices',
        ],
        answerIndex: 0,
        explanation:
          'Rows tied on every sort key have undefined relative order. A unique final key makes the result reproducible, which pagination and automated tests both depend on.',
      },
      {
        id: 'SQL-006-q4',
        type: 'code-output',
        language: 'sql',
        concept: 'coalesce',
        prompt: 'Two customers have city NULL and country ’Spain’. What appears in `loc` for them?',
        code: "SELECT COALESCE(city, country, 'unknown') AS loc FROM customers;",
        options: ["'Spain'", 'NULL', "'unknown'", "An empty string"],
        answerIndex: 0,
        explanation:
          'COALESCE returns the first argument that is not NULL, scanning left to right. City is NULL, so it falls through to country and stops there without reaching the literal.',
      },
      {
        id: 'SQL-006-q5',
        type: 'multi',
        concept: 'pagination',
        prompt: 'Which are genuine problems with `LIMIT 20 OFFSET 100000`? Select all that apply.',
        options: [
          'The engine must produce and discard 100,000 rows',
          'Rows inserted between requests cause duplicates and skips across pages',
          'Cost per page grows with how deep the user has scrolled',
          'It cannot be combined with ORDER BY',
          'It returns the wrong number of columns',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'OFFSET is correct but not scalable or stable. It works fine with ORDER BY and does not affect the projection; the problems are cost and concurrent-write instability.',
      },
      {
        id: 'SQL-006-q6',
        type: 'fill',
        concept: 'null ordering',
        prompt: 'Complete a portable ORDER BY that puts rows with a missing `rating` last: `ORDER BY (rating ____), rating DESC`',
        answers: ['IS NULL', 'is null'],
        explanation:
          '`rating IS NULL` evaluates to 0 for present values and 1 for missing ones, so sorting by it ascending places all the known ratings before all the unknown ones in every dialect.',
      },
      {
        id: 'SQL-006-q7',
        type: 'explain',
        concept: 'ordering and limits',
        prompt: 'A colleague says "the top 10 customers query returns a different tenth customer every time, so the database is broken". Explain what is actually happening and how to fix it.',
        rubric: [
          'Explains that rows tied on the sort key have undefined relative order',
          'Notes that the engine is behaving correctly — the query never specified a total order',
          'Proposes adding a unique tiebreak column to ORDER BY',
        ],
        sampleAnswer:
          'The database is not broken; the query is underspecified. If several customers tie on whatever the ranking column is — order count, say — then SQL makes no promise about their relative order, so which one lands in tenth place is decided by the execution plan and can change between runs. The fix is to make the ordering total by appending a unique column: `ORDER BY order_count DESC, customer_id ASC`. Now every pair of rows has a definite order, the tenth row is a function of the data alone, and both pagination and any automated test over the result become reproducible. It is also worth asking whether the tie is meaningful: if ten customers all have four orders, presenting a precise top ten may be misleading regardless of how the tie is broken.',
        explanation:
          'The examinable idea is that non-determinism here is a specification gap rather than a defect, and that unique tiebreaks are the standard remedy.',
      },
    ],

    flashcards: [
      { front: 'Does a table have an inherent row order?', back: 'No. A relation is a set. Any order you observe without ORDER BY is an accident of the plan and can change.' },
      { front: 'Why add a unique column to ORDER BY?', back: 'To make the ordering total, so tied rows cannot shuffle between runs. Pagination and reproducible tests both depend on it.' },
      { front: 'Where do NULLs sort?', back: 'Dialect-dependent: SQLite puts them first ascending, PostgreSQL last. Use NULLS LAST/FIRST or `ORDER BY (col IS NULL), col`.' },
      { front: 'Why is deep OFFSET slow?', back: 'The engine generates and discards every skipped row, so cost grows with page depth. Keyset pagination keeps it constant.' },
      { front: 'What does COALESCE do?', back: 'Returns its first non-NULL argument — a fallback chain, e.g. `COALESCE(city, country, ’unknown’)`.' },
      { front: 'What does NULLIF(x, 0) do?', back: 'Returns NULL when x is 0, otherwise x. The standard guard against division by zero in a ratio.' },
    ],

    challenge: {
      title: 'A stable, paginated product listing',
      brief:
        'Build the query behind a product listing page: 12 products per page, sorted by price descending with products of unknown price last, showing a display label that never contains NULL. Produce page 1 and page 3 using OFFSET, then rewrite page 3 using keyset pagination anchored on the last row of page 2. Finish with a short note comparing the two approaches on cost and on behaviour when a product is inserted between requests.',
      language: 'sql',
      acceptanceCriteria: [
        'ORDER BY includes a unique tiebreak so the ordering is total',
        'NULL prices are placed deliberately and portably, not left to the engine default',
        'Both an OFFSET version and a keyset version of the same page are shown',
        'COALESCE is used for display without disturbing the sort order',
        'The written note names both the cost difference and the duplicate/skip behaviour',
      ],
      starterCode: "SELECT id, name, price\nFROM products\nORDER BY price DESC, id ASC\nLIMIT 12;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me how a database decides what order to show things in, and why "give me the top three" can give a different answer each time.',
      mustCover: [
        'Rows have no order of their own; ORDER BY is how you ask for one',
        'You can sort by several things, applied left to right',
        'LIMIT takes only the first few rows, so it only makes sense once things are sorted',
        'When two rows are equal on everything you sorted by, their order is undecided and can change',
        'Adding a unique tiebreak such as the id fixes it',
      ],
      bonusSignals: ['uses a race or queue analogy', 'mentions that blanks need a decision about where they go', 'explains why this matters for page two of a list'],
      sampleExplanation:
        'Think of everyone finishing a race and then standing about in a field. They finished, but nobody has put them in order, so if you ask "who are the first three?" the question has no real answer — you would just grab whoever is nearest. That is what a database does without ORDER BY: it hands you rows in whatever order was convenient, and that can be different tomorrow. ORDER BY is the timekeeper. You say "fastest first", and now first, second and third mean something, and LIMIT 3 gives you the podium. But here is the catch: if two runners finished in exactly the same time, who goes ahead of whom? The rules you gave do not say, so the database picks one, and it might pick differently next time. That is why people add a second rule as a tiebreak — "and if the times are equal, lower bib number first". Once every pair of rows has a definite order, the top three is the same every single time.',
    },
  },

  {
    id: 'SQL-007',
    domain: 'SQL',
    module: 'Aggregation',
    topic: 'Aggregation and grouping',
    title: 'Aggregate Functions and GROUP BY',
    slug: 'aggregate-functions-group-by',
    difficulty: 2,
    estimatedMinutes: 40,
    prerequisites: ['SQL-006'],
    related: ['SQL-004', 'SQL-005', 'SQL-006'],
    tags: ['group-by', 'count', 'sum', 'avg', 'aggregate', 'logical-order', 'grain'],

    learningObjectives: [
      'Use COUNT, SUM, AVG, MIN and MAX, and explain how each treats NULL',
      'Distinguish COUNT(*), COUNT(col) and COUNT(DISTINCT col) precisely',
      'Explain GROUP BY as collapsing rows into one row per distinct key combination',
      'State the logical order of clause evaluation and use it to predict what each clause can see',
      'Recognise which columns may legally appear in SELECT alongside an aggregate, and why',
    ],

    terminology: [
      {
        term: 'Aggregate function',
        definition:
          'A function that consumes many rows and produces a single value: COUNT, SUM, AVG, MIN, MAX and, in most dialects, string and statistical aggregates too.',
        simple: 'A function that turns a column of values into one number.',
      },
      {
        term: 'GROUP BY',
        definition:
          'Partitions the rows surviving WHERE into groups sharing the same values in the grouping columns, then evaluates each aggregate once per group, emitting one row per group.',
        simple: 'Collapse the rows into one row per category.',
      },
      {
        term: 'Grain',
        definition:
          'What one row of a result represents — one order, one customer-month, one product. GROUP BY is how you deliberately change grain.',
        simple: 'What one row of the answer means.',
      },
      {
        term: 'Logical clause order',
        definition:
          'The order in which clauses are conceptually evaluated — FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT — which determines what each clause can refer to, regardless of the physical plan.',
        simple: 'The order SQL thinks in, which is not the order you type.',
      },
      {
        term: 'Bare column',
        definition:
          'A column in SELECT that is neither aggregated nor listed in GROUP BY. Standard SQL and PostgreSQL reject it; SQLite and older MySQL silently pick an arbitrary row’s value.',
        simple: 'A column you asked for without saying which row of the group it should come from.',
      },
      {
        term: 'Functional dependency',
        definition:
          'When grouping by a primary key, every other column of that table is uniquely determined, so PostgreSQL permits those columns bare in SELECT.',
        simple: 'If you group by the id, the name is already decided.',
      },
    ],

    simpleExplanation:
      "So far every query has returned one row per row of the table. Aggregation changes that. An aggregate function takes a whole column of values and squeezes it into one: COUNT how many, SUM them, take the AVG, the MIN, the MAX. On its own, `SELECT COUNT(*) FROM orders` gives a single number for the entire table. GROUP BY is what makes that genuinely powerful: it says “do not collapse everything into one number — first sort the rows into piles by country, or by status, or by month, and then give me one number per pile”. The output has one row per distinct pile, which means the meaning of a row has changed. Before, a row was an order; afterwards, a row is a country. That shift is called changing the grain, and keeping track of it is most of what makes complicated SQL comprehensible. The one rule to internalise is that once you group, every column in SELECT must either be one of the things you grouped by, or be wrapped in an aggregate — because anything else has many possible values and no way to choose.",

    whyItExists:
      'Raw rows answer questions about individuals; almost every business or scientific question is about populations — how many, how much on average, what is the maximum per category. Doing that reduction inside the engine means only the summary crosses the network, and the engine can compute it while scanning, rather than materialising millions of rows for a client to loop over.',

    analogy: {
      scenario:
        'Imagine a teacher with a pile of two hundred marked exam papers. To answer "what was the average mark?" she adds every score and divides — one number from two hundred papers. To answer "what was the average mark in each class?" she first sorts the papers into piles, one per class, and then works out an average within each pile. She ends up with one figure per pile, and the individual papers are gone from the summary. If someone then asks "and what was the name on the paper?", the question is unanswerable: which of the thirty names in that pile did they mean?',
      mapping: [
        { from: 'The pile of two hundred papers', to: 'The rows surviving WHERE' },
        { from: 'Sorting into piles by class', to: 'GROUP BY class' },
        { from: 'One average per pile', to: 'An aggregate evaluated once per group' },
        { from: 'The single sheet of results, one line per class', to: 'The result set, one row per group' },
        { from: '"Which name?" having no answer', to: 'The bare-column error: a non-grouped, non-aggregated column' },
        { from: 'Discarding papers with no mark before averaging', to: 'Aggregates ignoring NULL inputs' },
      ],
      bridge:
        'The teacher’s piles are literally what GROUP BY builds, and her summary sheet is the result set with its new grain: a line is now a class, not a pupil. The unanswerable name question is exactly the error PostgreSQL raises — "column must appear in the GROUP BY clause or be used in an aggregate function" — and once you have pictured the piles, that message stops being cryptic.',
      limitations:
        'The teacher physically makes piles; the engine usually does not. It may sort, or hash, or read a pre-sorted index and aggregate on the fly, and it may do it in parallel. The piles are a model of the meaning, not a description of the mechanism.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'GROUP BY, drawn',
        caption: 'Eight order rows become three country rows. The grain changes from "one order" to "one country".',
        art: `INPUT (after WHERE)                     GROUPED                 OUTPUT

customer_id  country  amount          Nigeria                country  orders  revenue
-----------  -------  ------          -------                -------  ------  -------
    1        Nigeria    120    -->    120, 40, 85     -->    Nigeria    3       245
    2        Spain       55           = 3 rows               Spain      2        95
    1        Nigeria     40
    3        China       70           Spain                  China      3       260
    2        Spain       40           55, 40
    4        China      120           = 2 rows
    1        Nigeria     85
    5        China       70           China
                                      70, 120, 70
                                      = 3 rows

SELECT country,
       COUNT(*)    AS orders,      <- one value per pile
       SUM(amount) AS revenue      <- one value per pile
FROM   ...
GROUP BY country;                  <- what defines a pile`,
      },
      {
        kind: 'table',
        title: 'The counting family',
        caption: 'Three functions that look similar and answer different questions.',
        columns: ['Expression', 'Counts', 'On a column with values 5, 5, NULL'],
        rows: [
          ['`COUNT(*)`', 'Rows in the group, regardless of values', '3'],
          ['`COUNT(col)`', 'Rows where col is not NULL', '2'],
          ['`COUNT(DISTINCT col)`', 'Distinct non-NULL values of col', '1'],
          ['`SUM(col)`', 'Total of non-NULL values; NULL if all are NULL', '10'],
          ['`AVG(col)`', 'SUM of non-NULL divided by COUNT of non-NULL', '5.0, not 3.33'],
        ],
      },
      {
        kind: 'flow',
        title: 'Logical order of evaluation',
        caption: 'Not the order you write. This is what each clause can and cannot see.',
        steps: [
          { label: 'FROM / JOIN', detail: 'Assemble the source rows. Table aliases become available.' },
          { label: 'WHERE', detail: 'Filter individual rows. Cannot see aggregates — they do not exist yet.' },
          { label: 'GROUP BY', detail: 'Partition surviving rows into groups. The grain changes here.' },
          { label: 'HAVING', detail: 'Filter whole groups. Can see aggregates, because groups now exist.' },
          { label: 'SELECT', detail: 'Evaluate the projection and create column aliases.' },
          { label: 'ORDER BY', detail: 'Sort. Can use SELECT aliases, since SELECT has run.' },
          { label: 'LIMIT / OFFSET', detail: 'Cap the result. Meaningless without ORDER BY.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Change the grain yourself',
        caption: 'Run `SELECT country, COUNT(*) FROM customers GROUP BY country;` then add a second grouping column and watch the row count grow.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'An aggregate function maps a multiset of input values to a single value, ignoring NULL inputs except for COUNT(*). GROUP BY partitions the rows produced by FROM and WHERE into equivalence classes by the values of its grouping expressions, and the query emits exactly one tuple per class. Within a grouped query every SELECT expression must be either a grouping expression, an aggregate over the group, or functionally dependent on the grouping expressions; standard SQL rejects anything else.',

    math: {
      intuition:
        'An aggregate is a reduction: it folds a list of values into one using an associative operation, which is why databases can compute it while streaming rows and can split the work across threads or machines. Counting and summing are trivially parallel — partial results simply add — while an average is not stored as a single accumulator but derived from two, because you cannot correctly average partial averages of unequal group sizes.',
      formulas: [
        {
          latex: '\\mathrm{COUNT}(x) = \\sum_{i=1}^{n} \\mathbb{1}[x_i \\neq \\mathrm{NULL}]',
          name: 'COUNT of a column',
          meaning: 'Counts how many rows in the group have a recorded value, which is why COUNT(col) can be smaller than COUNT(*).',
          variables: [
            { symbol: 'n', meaning: 'Number of rows in the group' },
            { symbol: 'x_i', meaning: 'The value of the column in row i' },
            { symbol: '\\mathbb{1}[\\cdot]', meaning: 'Indicator: 1 when the condition holds, 0 otherwise' },
          ],
        },
        {
          latex: '\\mathrm{AVG}(x) = \\frac{\\sum_{i : x_i \\neq \\mathrm{NULL}} x_i}{\\sum_{i=1}^{n} \\mathbb{1}[x_i \\neq \\mathrm{NULL}]}',
          name: 'AVG ignores NULLs in both numerator and denominator',
          meaning: 'The mean of the recorded values only. Treating missing values as zero would instead divide by n, giving a different and usually smaller number.',
          variables: [
            { symbol: 'x_i', meaning: 'The value in row i' },
            { symbol: 'n', meaning: 'Rows in the group, including those with NULL' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\mathrm{AVG}(x) \\neq \\frac{1}{k}\\sum_{g=1}^{k} \\mathrm{AVG}(x_g) \\quad \\text{unless all } |x_g| \\text{ are equal}',
          name: 'Averages do not average',
          meaning: 'The mean of group means equals the overall mean only when the groups are the same size. This is why re-aggregating a summary table silently produces wrong numbers.',
          variables: [
            { symbol: 'k', meaning: 'Number of groups' },
            { symbol: 'x_g', meaning: 'The values belonging to group g' },
            { symbol: '|x_g|', meaning: 'The number of rows in group g' },
          ],
          category: 'statistics',
        },
      ],
      derivation: [
        'Suppose two groups: group A has values 10 and 10 (mean 10, n = 2); group B has the single value 100 (mean 100, n = 1).',
        'The mean of the group means is (10 + 100) / 2 = 55.',
        'The true overall mean is (10 + 10 + 100) / 3 = 40.',
        'They differ because the naive average weights each group equally, while the true mean weights each row equally.',
        'To recombine correctly you need the counts: sum of (mean x count) divided by sum of counts, giving (20 + 100) / 3 = 40.',
        'The practical rule: a summary table must carry the counts, or its averages can never be safely rolled up.',
      ],
    },

    workedExample: {
      title: 'Revenue per country, step by step',
      setup:
        'We want one row per country with the number of orders and the total revenue. Revenue lives on `order_items` as quantity times unit price, orders belong to customers, and customers carry the country. We also want to exclude cancelled orders.',
      steps: [
        {
          label: 'FROM: assemble the rows',
          detail:
            'Join customers to orders to order_items. The grain of this intermediate result is one row per order item — already three tables deep and no longer one row per order. Naming the grain now is what prevents double counting later.',
        },
        {
          label: 'WHERE: filter individual rows',
          detail:
            "`WHERE o.status <> 'cancelled'` removes cancelled orders before any grouping. Filtering here rather than later is both correct and cheaper, because fewer rows reach the aggregation.",
        },
        {
          label: 'GROUP BY: choose the grain of the answer',
          detail:
            '`GROUP BY c.country` collapses all remaining item rows into one pile per country. From this point on, a row means a country and individual order items are no longer addressable.',
        },
        {
          label: 'Aggregate: one value per pile',
          detail:
            '`SUM(oi.quantity * oi.unit_price)` totals revenue correctly because it sums an item-level quantity. `COUNT(*)` would count item rows, not orders — so to count orders we need `COUNT(DISTINCT o.id)`.',
          latex: '\\text{revenue}_c = \\sum_{i \\in \\text{items}(c)} q_i \\cdot p_i',
        },
        {
          label: 'SELECT: project the group row',
          detail:
            'Only `c.country` and the aggregates may appear. Adding `c.name` would be a bare column — there are many names per country and no rule for choosing one — and PostgreSQL rejects it.',
        },
        {
          label: 'ORDER BY and LIMIT',
          detail:
            '`ORDER BY revenue DESC, country ASC` sorts the summary, with a unique tiebreak so the ranking is reproducible, and LIMIT takes the leaders.',
        },
      ],
      conclusion:
        'The query is six lines, but the thinking is one question repeated: what does one row mean at this point? One order item after the joins, one country after the GROUP BY. The only genuinely subtle step is COUNT(DISTINCT o.id) rather than COUNT(*), and that subtlety exists entirely because the join multiplied orders into items.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'The five core aggregates, ungrouped',
        runnable: true,
        code: `SELECT
  COUNT(*)              AS product_rows,
  COUNT(stock)          AS products_with_stock_recorded,
  COUNT(DISTINCT category) AS categories,
  SUM(stock)            AS total_units,
  ROUND(AVG(price), 2)  AS mean_price,
  MIN(price)            AS cheapest,
  MAX(price)            AS dearest
FROM products;`,
        explanation:
          'With no GROUP BY the whole table is one group, so you get exactly one row back. The first two columns are the null audit from SQL-002 in aggregate form: any gap between them is missing data. Note that AVG divides by the count of non-NULL prices, not by the number of rows — if you want missing prices treated as zero you must say so with `AVG(COALESCE(price, 0))`, and the two answers are genuinely different.',
        output: `product_rows  products_with_stock_recorded  categories  total_units  mean_price  cheapest  dearest
------------  ----------------------------  ----------  -----------  ----------  --------  -------
24            22                            6           4831         76.42       4.5       349.0`,
      },
      {
        language: 'sql',
        title: 'GROUP BY: one row per category',
        runnable: true,
        code: `SELECT
  category,
  COUNT(*)             AS n_products,
  ROUND(AVG(price), 2) AS avg_price,
  MIN(price)           AS cheapest,
  MAX(price)           AS dearest,
  SUM(stock)           AS units_in_stock
FROM products
GROUP BY category
ORDER BY avg_price DESC, category ASC;`,
        explanation:
          'The grain of the result is one row per category, and every selected column respects that: `category` is the grouping key, everything else is an aggregate. Try adding a bare `name` to the SELECT — SQLite will quietly return an arbitrary product’s name for each category, while PostgreSQL raises "column products.name must appear in the GROUP BY clause or be used in an aggregate function". The PostgreSQL behaviour is the correct one, and relying on SQLite’s leniency produces queries that mean something different on different engines.',
        output: `category     n_products  avg_price  cheapest  dearest  units_in_stock
-----------  ----------  ---------  --------  -------  --------------
displays     3           289.33     199.0     349.0    142
peripherals  6           64.50      18.0      89.0     883
cables       5           11.30      4.5       19.0     2104`,
      },
      {
        language: 'sql',
        title: 'Grouping by more than one column, and by an expression',
        runnable: true,
        code: `-- Two grouping keys: one row per country/status pair
SELECT c.country, o.status, COUNT(*) AS orders
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country, o.status
ORDER BY c.country, o.status;

-- Grouping by a derived value: orders per month
SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS orders
FROM orders
GROUP BY SUBSTR(order_date, 1, 7)
ORDER BY month;`,
        explanation:
          'Adding a grouping column subdivides the piles, so the row count goes up, never down — the opposite of what people expect from a word like "grouping". The second query groups by an expression, which is how monthly rollups are written when dates are stored as ISO text: `SUBSTR(order_date, 1, 7)` yields `2024-03`. PostgreSQL would use `DATE_TRUNC(’month’, order_date)` on a real date column, and the substring trick works in SQLite precisely because ISO-8601 text sorts and truncates correctly.',
        output: `country  status     orders
-------  ---------  ------
China    pending    3
China    shipped    6
Nigeria  cancelled  1
Nigeria  shipped    13

month    orders
-------  ------
2024-01  9
2024-02  14
2024-03  17`,
      },
      {
        language: 'sql',
        title: 'Counting the right thing after a join',
        runnable: true,
        code: `SELECT
  c.country,
  COUNT(*)                            AS item_rows,
  COUNT(DISTINCT o.id)                AS orders,
  COUNT(DISTINCT c.id)                AS customers,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM customers   AS c
JOIN orders      AS o  ON o.customer_id = c.id
JOIN order_items AS oi ON oi.order_id   = o.id
WHERE o.status <> 'cancelled'
GROUP BY c.country
ORDER BY revenue DESC, c.country;`,
        explanation:
          'Four counts of the same group, all different, all correct for different questions. `COUNT(*)` counts item rows because that is the grain after two joins; `COUNT(DISTINCT o.id)` recovers the number of orders; `COUNT(DISTINCT c.id)` the number of customers. Revenue is safe to SUM because `quantity * unit_price` is genuinely an item-level fact — had `orders` carried an `order_total` column, summing it here would multiply each order’s total by its number of items. This single example contains the most common analytics bug in the industry.',
        output: `country  item_rows  orders  customers  revenue
-------  ---------  ------  ---------  --------
Nigeria  31         13      4          4820.50
China    22         9       5          3115.00
Spain    17         8       3          1944.75`,
      },
      {
        language: 'sql',
        title: 'Conditional aggregation: pivoting without a PIVOT clause',
        runnable: true,
        code: `SELECT
  c.country,
  COUNT(*)                                                AS total_orders,
  SUM(CASE WHEN o.status = 'shipped'   THEN 1 ELSE 0 END) AS shipped,
  SUM(CASE WHEN o.status = 'pending'   THEN 1 ELSE 0 END) AS pending,
  SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
  ROUND(AVG(CASE WHEN o.status = 'cancelled' THEN 1.0 ELSE 0.0 END), 3) AS cancel_rate
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country
ORDER BY cancel_rate DESC;`,
        explanation:
          'Putting a CASE inside an aggregate is how you turn rows into columns, and it is one of the highest-value patterns in analytical SQL. Each SUM counts only the rows matching its condition, so one pass over the data produces a whole cross-tabulation. The final column exploits the same trick to get a rate rather than a count: averaging a 1/0 indicator gives the proportion directly. You could also write `COUNT(CASE WHEN ... THEN 1 END)` without an ELSE, relying on COUNT ignoring the NULLs.',
        output: `country  total_orders  shipped  pending  cancelled  cancel_rate
-------  ------------  -------  -------  ---------  -----------
Spain    9             6        2        1          0.111
China    9             6        3        0          0.000
Nigeria  14            13       1        0          0.000`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Feature engineering for churn models',
        usage:
          'Features such as "orders in the last 90 days", "mean basket value" and "distinct categories purchased" are exactly GROUP BY over a filtered window, keyed by customer. The aggregate query is the feature definition.',
      },
      {
        context: 'Funnel and conversion reporting',
        usage:
          'Conditional aggregation over an events table — one SUM(CASE ...) per funnel step — produces the whole funnel in one scan, which is why it is the standard pattern in product analytics.',
      },
      {
        context: 'Data-quality monitoring',
        usage:
          'A nightly job compares COUNT(*) with COUNT(col) per column to track null rates, and alerts when one moves. Most upstream breakages show up as a sudden jump in missingness before they show up anywhere else.',
      },
      {
        context: 'Class balance before training',
        usage:
          '`SELECT label, COUNT(*) FROM training_set GROUP BY label` is the first query anyone should run on a labelled dataset. A 99:1 imbalance changes the metric, the sampling and sometimes the whole approach.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.groupby("country").agg(orders=("id", "count"), revenue=("total", "sum"))` is the same operation; `nunique()` is COUNT(DISTINCT).' },
      { tool: 'dbt', role: 'Aggregate models are where business metrics get defined once. A metric duplicated across dashboards is a metric that will eventually disagree with itself.' },
      { tool: 'scikit-learn', role: 'Aggregated per-entity features from SQL are typically the input matrix; the GROUP BY key becomes the row index of the training set.' },
      { tool: 'Spark SQL / BigQuery', role: 'The same GROUP BY runs distributed, with partial aggregates computed per node and merged — which works precisely because COUNT and SUM are associative.' },
    ],

    commonMistakes: [
      {
        mistake: 'Selecting a bare column alongside an aggregate',
        why: 'The column has many values within the group and no rule selects one. PostgreSQL errors; SQLite returns an arbitrary value, so the query appears to work and quietly means something else.',
        fix: 'Add the column to GROUP BY if it defines the grain, or wrap it in an aggregate such as MIN/MAX if you genuinely want any one value. Never rely on SQLite’s leniency.',
      },
      {
        mistake: 'Using COUNT(*) after a one-to-many join and calling it the number of orders',
        why: 'The join has already multiplied each order into one row per item, so COUNT(*) counts items. The number is plausible, just wrong, which is the worst kind of wrong.',
        fix: 'Use `COUNT(DISTINCT o.id)`, or aggregate the child table to the parent grain in a subquery before joining.',
      },
      {
        mistake: 'Assuming AVG treats NULL as zero',
        why: 'AVG divides the sum of known values by the count of known values, so 10, 20 and NULL average to 15, not 10. Both answers are defensible; only one is what the engine does.',
        fix: 'Be explicit: `AVG(col)` for the mean of recorded values, `AVG(COALESCE(col, 0))` to treat missing as zero. State the choice in a comment.',
      },
      {
        mistake: 'Averaging an average from a summary table',
        why: 'The mean of group means equals the true mean only when groups are equal in size. Re-aggregating a pre-aggregated table silently reweights the data.',
        fix: 'Carry counts alongside means in any summary table, then recombine as SUM(mean * count) / SUM(count) — or re-aggregate from the raw rows.',
      },
      {
        mistake: 'Trying to filter on an aggregate in WHERE',
        why: 'WHERE is evaluated before GROUP BY, so no aggregate exists yet. PostgreSQL reports "aggregate functions are not allowed in WHERE".',
        fix: 'Filter groups in HAVING, which runs after grouping. The distinction is the whole subject of SQL-008.',
      },
      {
        mistake: 'Expecting more grouping columns to mean fewer rows',
        why: 'Each extra grouping column subdivides the existing piles, so the result grows. "Grouping" suggests consolidation, but the row count moves the other way.',
        fix: 'Decide the grain of the answer first — one row per what? — and let that dictate the GROUP BY list exactly.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'Explain the difference between COUNT(*), COUNT(col) and COUNT(DISTINCT col).',
        answer:
          'COUNT(*) counts rows in the group and never inspects values, so nothing can be skipped. COUNT(col) counts rows where col is not NULL, because aggregates ignore NULL inputs — the gap between the two is precisely the number of missing values, which makes the pair a cheap data-quality check. COUNT(DISTINCT col) counts distinct non-NULL values, so it answers "how many different customers" rather than "how many rows". A practical consequence is that after a one-to-many join, COUNT(*) counts the child rows while COUNT(DISTINCT parent.id) recovers the parent count, and confusing the two is the standard cause of inflated dashboards.',
      },
      {
        level: 'intermediate',
        question: 'What is the logical order of clause evaluation in a SELECT statement, and why does it matter?',
        answer:
          'FROM and JOIN, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY, then LIMIT. It matters because it determines visibility rather than performance. WHERE runs before grouping, so it cannot reference aggregates and can only filter individual rows. SELECT runs after grouping, so aliases created there do not exist in WHERE, GROUP BY or HAVING — but ORDER BY, which runs last, can use them. HAVING can reference aggregates because groups exist by then. The physical plan may differ entirely, pushing filters down and reordering joins, but it must produce the result this logical order defines.',
        followUp:
          'A strong answer adds that window functions are evaluated after HAVING and before ORDER BY, which is why a window function cannot appear in WHERE and needs a subquery to be filtered on.',
      },
      {
        level: 'internship',
        question: 'A dashboard reports average order value by country by joining orders to order_items and taking AVG(order_items.unit_price). What is wrong with it?',
        answer:
          'Several things, and they compound. First, the grain: after the join, one row is an order item, so the average is over item prices, not order values — an order for one expensive item and an order for ten cheap ones contribute one and ten observations respectively, so the number is weighted by basket size rather than by order. Second, `unit_price` ignores quantity entirely, so it is not even an item value. The correct computation aggregates to order level first — in a CTE, `SELECT order_id, SUM(quantity * unit_price) AS order_total FROM order_items GROUP BY order_id` — and then takes AVG(order_total) grouped by country. The general lesson is to state the grain of every intermediate result, and to be suspicious of any AVG taken directly over a joined table.',
        followUp:
          'Mentioning that the median is usually a better summary of order value than the mean, because basket values are right-skewed, is the answer that gets remembered.',
      },
      {
        level: 'internship',
        question: 'Write a query to find, for each month, the number of orders and the number of distinct customers who ordered.',
        answer:
          "`SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS orders, COUNT(DISTINCT customer_id) AS customers FROM orders GROUP BY SUBSTR(order_date, 1, 7) ORDER BY month;`. Grouping by the truncated ISO date works because `YYYY-MM-DD` text truncates cleanly to `YYYY-MM` and still sorts chronologically; in PostgreSQL the same idea is `DATE_TRUNC('month', order_date)`. COUNT(*) is correct for orders here because the grain of `orders` is already one row per order — no join has multiplied anything — while COUNT(DISTINCT customer_id) is required because a customer may order several times in a month. The ratio of the two is orders per active customer, which is usually the metric anyone actually wanted.",
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For each order status, report the number of orders and the number of distinct customers who have an order with that status.',
        hint: 'One GROUP BY key and two different counts. The `orders` table alone is enough.',
        language: 'sql',
        starterCode: '-- one row per status\n',
        solution:
          'SELECT\n  status,\n  COUNT(*)                   AS orders,\n  COUNT(DISTINCT customer_id) AS customers\nFROM orders\nGROUP BY status\nORDER BY orders DESC, status ASC;\n\nCOUNT(*) is right for orders because the grain of `orders` is one row per order. COUNT(DISTINCT customer_id) is needed for customers because one customer can hold several orders of the same status. If `status` can be NULL, those rows form their own group — GROUP BY treats all NULLs as a single group, which is the one place in SQL where two NULLs are considered equal.',
      },
      {
        prompt: 'Compute, for each product category, the total revenue it has generated and the number of distinct orders it appeared in.',
        hint: 'Revenue lives in `order_items` as quantity times unit_price; the category lives in `products`.',
        language: 'sql',
        solution:
          "SELECT\n  p.category,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,\n  COUNT(DISTINCT oi.order_id)                AS orders_containing,\n  SUM(oi.quantity)                           AS units_sold\nFROM order_items AS oi\nJOIN products    AS p ON p.id = oi.product_id\nGROUP BY p.category\nORDER BY revenue DESC;\n\nThe grain after the join is one row per order item, which is exactly the grain revenue is defined at, so SUM is safe. `COUNT(DISTINCT oi.order_id)` is necessary because a single order can contain several items from the same category and would otherwise be counted more than once. Using `oi.unit_price` rather than `p.price` keeps historical revenue correct after a price change.",
      },
      {
        prompt: 'Produce a monthly summary of orders: month, total orders, shipped orders, cancelled orders, and the cancellation rate as a decimal.',
        hint: 'Group by the first seven characters of the date; use SUM(CASE ...) for the conditional counts.',
        language: 'sql',
        solution:
          "SELECT\n  SUBSTR(order_date, 1, 7) AS month,\n  COUNT(*)                 AS orders,\n  SUM(CASE WHEN status = 'shipped'   THEN 1 ELSE 0 END) AS shipped,\n  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,\n  ROUND(AVG(CASE WHEN status = 'cancelled' THEN 1.0 ELSE 0.0 END), 4) AS cancel_rate\nFROM orders\nGROUP BY SUBSTR(order_date, 1, 7)\nORDER BY month;\n\nConditional aggregation gives the whole cross-tabulation in one scan. The rate uses AVG over a 1.0/0.0 indicator rather than dividing two counts, which avoids integer division entirely — in SQLite `cancelled / orders` with two integers truncates to 0, a bug that produces a column of zeroes and looks like clean data.",
      },
      {
        prompt: 'A summary table holds one row per country with `avg_order_value` and `orders`. A colleague computes the global average as AVG(avg_order_value). Show why this is wrong and give the correct expression.',
        hint: 'Consider two countries, one with 100 orders averaging 10 and one with 1 order of 1000.',
        solution:
          'With 100 orders averaging 10 and 1 order of 1000, AVG(avg_order_value) gives (10 + 1000) / 2 = 505, while the true average is (100 x 10 + 1 x 1000) / 101 = 19.8. The naive version weights each country equally instead of each order equally. The correct expression is the count-weighted mean: `SUM(avg_order_value * orders) / SUM(orders)`. The general rule is that sums and counts recombine freely because they are additive, while means, medians and distinct counts do not — which is why any summary table intended for further aggregation must carry its counts, and why distinct counts usually have to be recomputed from raw rows.',
      },
    ],

    quiz: [
      {
        id: 'SQL-007-q1',
        type: 'mcq',
        concept: 'count variants',
        prompt: 'A group has the values 7, 7 and NULL in column `x`. What do COUNT(*), COUNT(x) and COUNT(DISTINCT x) return?',
        options: ['3, 2, 1', '3, 3, 2', '2, 2, 1', '3, 2, 2'],
        answerIndex: 0,
        explanation:
          'COUNT(*) counts rows (3). COUNT(x) skips the NULL (2). COUNT(DISTINCT x) counts distinct non-NULL values, and both sevens are the same value (1).',
      },
      {
        id: 'SQL-007-q2',
        type: 'order',
        concept: 'logical clause order',
        prompt: 'Order these clauses as SQL logically evaluates them.',
        items: ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY', 'LIMIT'],
        explanation:
          'This order explains visibility: WHERE cannot see aggregates because grouping has not happened; ORDER BY can use SELECT aliases because SELECT has already run.',
      },
      {
        id: 'SQL-007-q3',
        type: 'code-output',
        language: 'sql',
        concept: 'avg and nulls',
        prompt: 'A column holds 10, 20 and NULL. What does AVG return?',
        code: 'SELECT AVG(v) AS mean FROM (SELECT 10 AS v UNION ALL SELECT 20 UNION ALL SELECT NULL);',
        options: ['15.0', '10.0', 'NULL', '30.0'],
        answerIndex: 0,
        explanation:
          'AVG ignores NULL in both the sum and the divisor, giving 30/2 = 15. Treating the NULL as zero would give 10, which is why the choice must be made explicitly with COALESCE.',
      },
      {
        id: 'SQL-007-q4',
        type: 'debug',
        language: 'sql',
        concept: 'bare columns',
        prompt: 'PostgreSQL rejects this query. Why, and what does SQLite do instead?',
        code: 'SELECT category, name, AVG(price)\nFROM products\nGROUP BY category;',
        options: [
          '`name` is neither grouped nor aggregated, so no single value is defined per group; SQLite silently returns an arbitrary one',
          'AVG cannot be used without an alias',
          'GROUP BY must list every column in the table',
          'The query needs a HAVING clause',
        ],
        answerIndex: 0,
        explanation:
          'A group has many names and nothing chooses between them. PostgreSQL raises an error; SQLite picks an arbitrary row’s value, which makes the query mean different things on different engines.',
      },
      {
        id: 'SQL-007-q5',
        type: 'truefalse',
        concept: 'grouping granularity',
        prompt: 'Adding a second column to GROUP BY can only reduce the number of rows in the result.',
        answer: false,
        explanation:
          'It subdivides each existing group, so the row count can only stay the same or increase. Grouping by more columns produces a finer grain, not a coarser one.',
      },
      {
        id: 'SQL-007-q6',
        type: 'multi',
        concept: 'join grain and aggregation',
        prompt: 'After joining `orders` to `order_items`, which statements are true? Select all that apply.',
        options: [
          'COUNT(*) counts order items, not orders',
          'COUNT(DISTINCT orders.id) recovers the number of orders',
          'SUM(order_items.quantity * order_items.unit_price) is a valid revenue total',
          'Summing a column stored on `orders` would multiply it by the number of items per order',
          'AVG over the joined rows is automatically weighted per order',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'The join sets the grain to one row per item. Item-level facts aggregate correctly; order-level facts get duplicated, and any AVG is implicitly weighted by basket size rather than per order.',
      },
      {
        id: 'SQL-007-q7',
        type: 'explain',
        concept: 'group by as grain change',
        prompt: 'Explain GROUP BY to someone who understands spreadsheets but has never written SQL, and say what happens to columns you did not group by.',
        rubric: [
          'Describes grouping as sorting rows into piles by a key and producing one row per pile',
          'States that aggregates are computed once per pile',
          'Explains that a column not grouped and not aggregated has no single value, hence the error',
        ],
        sampleAnswer:
          'GROUP BY is a pivot table written as a sentence. You name the column that defines the piles — say country — and the database sorts every row into the pile matching its country. Then, for each pile, it works out whatever summaries you asked for: how many rows, the total, the average. The answer has one line per pile, so a row no longer means an order, it means a country. The important consequence is that the individual rows are gone. If you ask for the customer’s name as well, the database has thirty names in that pile and no rule for picking one, so PostgreSQL refuses the query and tells you the column must be grouped or aggregated. SQLite will hand you an arbitrary name instead, which is worse, because the query looks like it worked.',
        explanation:
          'The examinable idea is that grouping changes what a row means, and that the bare-column error follows directly from that change rather than being an arbitrary restriction.',
      },
    ],

    flashcards: [
      { front: 'What does GROUP BY do?', back: 'Partitions rows into groups sharing the grouping key, then emits one row per group with aggregates computed per group. It changes the grain of the result.' },
      { front: 'COUNT(*) vs COUNT(col)', back: 'COUNT(*) counts rows; COUNT(col) counts non-NULL values. The gap between them is the column’s missingness.' },
      { front: 'What is the logical clause order?', back: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. It governs what each clause can reference.' },
      { front: 'Why can WHERE not filter on COUNT(*)?', back: 'WHERE runs before GROUP BY, so no groups and no aggregates exist yet. Use HAVING.' },
      { front: 'Does AVG treat NULL as zero?', back: 'No. It sums and counts only non-NULL values, so 10, 20, NULL averages to 15. Use AVG(COALESCE(col, 0)) for the other meaning.' },
      { front: 'Why is AVG of AVGs wrong?', back: 'It weights each group equally instead of each row. Recombine with SUM(mean * count) / SUM(count), which is why summary tables must carry counts.' },
      { front: 'What is conditional aggregation?', back: 'An aggregate wrapped around a CASE, e.g. SUM(CASE WHEN status = ’shipped’ THEN 1 ELSE 0 END) — the standard way to pivot rows into columns.' },
    ],

    challenge: {
      title: 'A country performance report',
      brief:
        'Produce a single query giving one row per country with: number of customers, number of distinct orders, number of order items, total revenue, average order value (correctly computed at order grain, not item grain), the share of orders that were cancelled, and the date of the most recent order. Every count must be verifiably counting the right entity, and you should include a comment above each aggregate stating the grain it operates on.',
      language: 'sql',
      acceptanceCriteria: [
        'Average order value is computed from order totals, not from item prices',
        'COUNT(DISTINCT ...) is used wherever a join has multiplied rows',
        'The cancellation share is computed without integer division',
        'Every aggregate is annotated with the grain it operates on',
        'The result is ordered by revenue with a deterministic tiebreak',
      ],
      starterCode: "-- Aggregate order_items to order grain first, then join.\nWITH order_totals AS (\n  SELECT order_id, SUM(quantity * unit_price) AS order_total\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT 1;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine. Teach me what it means to group rows in a database, and why after grouping I cannot ask for someone’s name any more.',
      mustCover: [
        'An aggregate squeezes many values into one number',
        'GROUP BY sorts the rows into piles by whatever column you name',
        'You get one row of answer per pile, so a row now means a pile, not an original record',
        'Columns you did not group by have many values in the pile, so asking for them has no single answer',
        'COUNT(*) counts rows while COUNT(column) skips the blanks',
      ],
      bonusSignals: ['uses a sorting-into-piles analogy', 'gives a concrete example of a wrong count after joining', 'mentions that more grouping columns means more rows, not fewer'],
      sampleExplanation:
        'Imagine you have two hundred exam papers on a table. If I ask "what was the average mark?", you add up every mark and divide by how many there were — two hundred papers become one number. That squeezing is what an aggregate does. Now if I ask "what was the average in each class?", you first sort the papers into piles, one pile per class, and then do the same squeezing inside each pile. That sorting into piles is GROUP BY, and you end up with one line of answer per class. Here is the part that trips people up: once you have made the piles and written down the averages, the individual papers are no longer part of the answer. So if I then ask "and whose name was on the paper?", there is no answer — there were thirty names in that pile and nothing tells you which one I meant. That is why the database refuses: any column you want to see must either be the thing you made the piles by, or be squeezed into one value like the average was.',
    },
  },

  {
    id: 'SQL-008',
    domain: 'SQL',
    module: 'Aggregation',
    topic: 'Filtering groups',
    title: 'HAVING vs WHERE',
    slug: 'having-vs-where',
    difficulty: 3,
    estimatedMinutes: 25,
    prerequisites: ['SQL-007'],
    related: ['SQL-005', 'SQL-007'],
    tags: ['having', 'where', 'aggregation', 'filter', 'logical-order', 'performance'],

    learningObjectives: [
      'State precisely when a filter belongs in WHERE and when it belongs in HAVING',
      'Explain why WHERE cannot reference an aggregate and HAVING can',
      'Predict how moving a condition between the two clauses changes the result, not just the speed',
      'Write filters that use conditional aggregation to combine both kinds of condition',
      'Recognise when a HAVING clause is doing work that WHERE should be doing, and fix it',
    ],

    terminology: [
      {
        term: 'HAVING',
        definition:
          'A predicate applied to whole groups after GROUP BY has formed them. It may reference aggregates and the grouping columns, but not individual non-grouped columns.',
        simple: 'A filter on the summary rows, not on the original rows.',
      },
      {
        term: 'Row-level predicate',
        definition:
          'A condition that can be decided by looking at a single row, such as `status <> ’cancelled’`. It belongs in WHERE.',
        simple: 'A test one row can answer by itself.',
      },
      {
        term: 'Group-level predicate',
        definition:
          'A condition that can only be decided once a whole group exists, such as `COUNT(*) >= 3`. It belongs in HAVING.',
        simple: 'A test that needs the whole pile before it can be answered.',
      },
      {
        term: 'Predicate pushdown',
        definition:
          'The optimiser moving a filter as early in the plan as it can. Row-level filters written in WHERE are pushed below the aggregation, so fewer rows are aggregated.',
        simple: 'Filtering early so there is less work to do later.',
      },
      {
        term: 'Conditional aggregation filter',
        definition:
          'Using an aggregate over a CASE inside HAVING, e.g. `HAVING SUM(CASE WHEN status = ’cancelled’ THEN 1 ELSE 0 END) = 0`, to express "no row in this group satisfies X" without removing rows first.',
        simple: 'Asking a question about part of the pile while keeping the whole pile.',
      },
    ],

    simpleExplanation:
      "WHERE and HAVING both throw rows away, and the difference is entirely about when. WHERE runs before grouping, so it sees the original rows one at a time: it can ask “is this order cancelled?” but it cannot ask “does this customer have more than five orders?”, because at that moment there is no such thing as a customer’s group — only individual orders. HAVING runs after grouping, so it sees the finished piles: it can ask about COUNT(*), SUM(amount) or AVG(price), because those values now exist. That is the whole rule. What makes it worth a unit of its own is that moving a condition between the two clauses can change the answer rather than just the speed. “Countries with at least three orders, ignoring cancelled ones” and “countries with at least three orders, of which none were cancelled” are different questions, and which clause you put the cancellation test in decides which one you asked.",

    whyItExists:
      'Aggregates do not exist until groups are formed, so a language with only one filtering clause could never express conditions on a summary — you could not ask for customers with more than five orders without computing every customer first and filtering outside the database. HAVING exists to make group-level predicates expressible in the same statement, evaluated in the right place.',

    analogy: {
      scenario:
        'A sports league is deciding which teams qualify for a play-off. Two different rules are at work. The first applies to individual matches: friendlies do not count towards the table, so they are struck out before anything is added up. The second applies to whole teams: only teams with at least ten competitive wins qualify. You cannot apply the second rule to a single match — a match has no idea how many wins its team has — and you cannot apply the first rule to a team, because a team is not a friendly.',
      mapping: [
        { from: 'Striking out friendly matches', to: 'WHERE — a row-level filter, applied before grouping' },
        { from: 'Adding up each team’s results', to: 'GROUP BY plus aggregate functions' },
        { from: 'Requiring at least ten wins to qualify', to: 'HAVING — a group-level filter on the totals' },
        { from: 'A match not knowing its team’s total', to: 'Why WHERE cannot reference an aggregate' },
        { from: 'Deciding whether friendlies count before or after totalling', to: 'The choice that changes the answer, not just the speed' },
        { from: '"Teams who never lost" as a rule about the whole record', to: 'A HAVING clause using conditional aggregation' },
      ],
      bridge:
        'The league has to strike out friendlies first because the totals depend on which matches count — that is exactly predicate pushdown, and exactly why a row-level filter belongs in WHERE. And the qualification rule can only be checked once the totals exist, which is precisely the constraint that forces it into HAVING. The reason the distinction is not merely stylistic is visible in the analogy: if you struck out the friendlies after totalling, the totals would already be wrong.',
      limitations:
        'The league applies its rules in a fixed sequence by hand. A database is free to reorder physically — it may push a HAVING condition down when it can prove the result is identical — so the logical order describes meaning, not the plan.',
    },

    visuals: [
      {
        kind: 'compare',
        title: 'WHERE versus HAVING',
        caption: 'The same word "filter", two different objects being filtered.',
        left: {
          heading: 'WHERE — filters rows',
          points: [
            'Runs before GROUP BY',
            'Sees one original row at a time',
            'Cannot reference COUNT, SUM, AVG',
            'Reduces how many rows get aggregated',
            'Can use an index to avoid reading rows at all',
            'Changes what goes into the totals',
          ],
        },
        right: {
          heading: 'HAVING — filters groups',
          points: [
            'Runs after GROUP BY',
            'Sees one finished group at a time',
            'Exists precisely to reference aggregates',
            'Discards whole summary rows',
            'Cannot use an index — the groups must be built first',
            'Changes which totals survive',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'Where each filter takes effect',
        caption: 'Follow 40 order rows through the pipeline.',
        steps: [
          { label: '40 order rows leave FROM', detail: 'Every order, joined to its customer.' },
          { label: 'WHERE removes 4', detail: "`status <> 'cancelled'` is decidable per row. 36 rows continue." },
          { label: 'GROUP BY forms 3 groups', detail: 'One pile per country. Aggregates are computed over the 36 surviving rows.' },
          { label: 'HAVING removes 1 group', detail: '`HAVING COUNT(*) >= 5` discards the country with only 2 orders. 2 rows remain.' },
          { label: 'SELECT projects 2 rows', detail: 'The result has one row per surviving country.' },
        ],
      },
      {
        kind: 'table',
        title: 'Which clause does this condition belong in?',
        columns: ['Condition', 'Clause', 'Why'],
        rows: [
          ["`status <> 'cancelled'`", 'WHERE', 'Decidable from one row; filtering early also shrinks the aggregation'],
          ['`COUNT(*) >= 5`', 'HAVING', 'Needs the whole group to exist'],
          ['`SUM(quantity * unit_price) > 1000`', 'HAVING', 'An aggregate over the group'],
          ["`country IN ('Spain', 'Chile')`", 'WHERE', 'Row-level, even though country is also the grouping key'],
          ['`AVG(price) > (SELECT AVG(price) FROM products)`', 'HAVING', 'Compares a group aggregate with a scalar subquery'],
          ['`SUM(CASE WHEN status = ’cancelled’ THEN 1 ELSE 0 END) = 0`', 'HAVING', 'A property of the whole group: it contains no cancelled order'],
        ],
      },
      {
        kind: 'widget',
        title: 'Move the filter and watch the answer change',
        caption: "Run the two contrasted queries below and compare the numbers, not just the row counts.",
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'HAVING applies a predicate to each group produced by GROUP BY, retaining only groups for which it evaluates to TRUE under three-valued logic. Its predicate may reference grouping expressions, aggregate functions over the group, and outer references, but not ungrouped column values, since those are not single-valued within a group. WHERE applies its predicate to individual tuples before grouping and may therefore not reference aggregates. In the absence of GROUP BY, HAVING treats the entire result as one group.',

    workedExample: {
      title: 'The same words, two different questions',
      setup:
        'Business request: "show me countries with at least three orders, excluding cancelled ones." That sentence is ambiguous, and the ambiguity maps exactly onto WHERE versus HAVING. Assume Nigeria has 5 orders of which 1 is cancelled, Spain has 3 of which 1 is cancelled, and China has 3, none cancelled.',
      steps: [
        {
          label: 'Reading A: exclude cancelled orders, then count',
          detail:
            "`WHERE status <> 'cancelled'` removes the cancelled rows before grouping, so the counts become Nigeria 4, Spain 2, China 3. `HAVING COUNT(*) >= 3` then keeps Nigeria and China. Spain is dropped because it has only two non-cancelled orders.",
        },
        {
          label: 'Reading B: count all orders, then require none cancelled',
          detail:
            "No WHERE. Counts are Nigeria 5, Spain 3, China 3. `HAVING COUNT(*) >= 3 AND SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) = 0` keeps only China, because Nigeria and Spain each contain a cancelled order.",
        },
        {
          label: 'Reading C: the mistake — filtering in HAVING as if it were WHERE',
          detail:
            "Writing `HAVING status <> 'cancelled'` is either an error (PostgreSQL: column must appear in the GROUP BY clause) or, in SQLite, silently evaluates against an arbitrary row of each group, producing a result that is neither A nor B and is not reproducible.",
          latex: '\\text{result} \\ne A, \\quad \\text{result} \\ne B',
        },
        {
          label: 'Diagnose which reading was meant',
          detail:
            'Ask: is the cancellation a property of an individual order (exclude it from the tally) or a property of the country’s record (disqualify the country)? A is the usual intent; B is what auditors and quality gates usually mean.',
        },
        {
          label: 'Note the performance difference',
          detail:
            'In reading A the cancelled rows never reach the aggregator, and an index on status could reduce the rows read. In reading B they must be aggregated, because the group-level test depends on them. The performance difference is real but secondary — the two queries answer different questions.',
        },
      ],
      conclusion:
        'WHERE and HAVING are not two ways to write the same filter with different efficiency. Reading A returns two countries and reading B returns one, from the same data and the same English sentence. Choosing the clause is choosing the question, and the right first move on any ambiguous request is to ask which reading the requester meant.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'The basic contrast',
        runnable: true,
        code: `-- Row-level filter: which orders count
SELECT c.country, COUNT(*) AS orders
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
WHERE o.status <> 'cancelled'
GROUP BY c.country;

-- Group-level filter: which countries survive
SELECT c.country, COUNT(*) AS orders
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country
HAVING COUNT(*) >= 5;

-- Both, in the order they logically run
SELECT c.country, COUNT(*) AS orders
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
WHERE o.status <> 'cancelled'
GROUP BY c.country
HAVING COUNT(*) >= 5
ORDER BY orders DESC, c.country;`,
        explanation:
          'The third query is the canonical shape and reads in logical order once you know to read it that way: take these rows, drop the cancelled ones, pile them by country, keep piles of five or more, sort what is left. Note that HAVING repeats `COUNT(*)` rather than using the alias `orders` — aliases are created in SELECT, which runs after HAVING, so PostgreSQL rejects the alias here even though SQLite and MySQL accept it.',
        output: `country  orders
-------  ------
Nigeria  13
China    9`,
      },
      {
        language: 'sql',
        title: 'Moving a condition changes the answer',
        runnable: true,
        code: `-- A: exclude cancelled orders, then require 3+ remaining
SELECT c.country, COUNT(*) AS non_cancelled_orders
FROM orders AS o JOIN customers AS c ON c.id = o.customer_id
WHERE o.status <> 'cancelled'
GROUP BY c.country
HAVING COUNT(*) >= 3;

-- B: count all orders, require 3+ AND require none cancelled
SELECT c.country,
       COUNT(*) AS all_orders,
       SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled
FROM orders AS o JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country
HAVING COUNT(*) >= 3
   AND SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) = 0;`,
        explanation:
          'These are not two spellings of one query. A asks "which countries placed at least three orders that were not cancelled"; B asks "which countries placed at least three orders and never had one cancelled". A country with four orders, one cancelled, appears in A and not in B. The conditional aggregation inside HAVING is the general technique for expressing "no row in this group satisfies X" without removing those rows from the counts — removing them in WHERE would make the test vacuously true.',
        output: `-- A
country  non_cancelled_orders
-------  --------------------
Nigeria  13
China    9
Spain    8

-- B
country  all_orders  cancelled
-------  ----------  ---------
China    9           0`,
      },
      {
        language: 'sql',
        title: 'HAVING with a scalar subquery, and HAVING without GROUP BY',
        runnable: true,
        code: `-- Categories whose average price beats the overall average
SELECT category, ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > (SELECT AVG(price) FROM products)
ORDER BY avg_price DESC;

-- HAVING with no GROUP BY treats the whole table as one group
SELECT COUNT(*) AS n
FROM orders
HAVING COUNT(*) > 100;`,
        explanation:
          'The first query compares a per-group aggregate with a scalar computed over the whole table — a pattern that appears constantly in "above average" questions and that needs HAVING because both sides are aggregates. The second is a curiosity worth knowing: with no GROUP BY the entire result is a single implicit group, so this returns one row if the table has more than 100 orders and zero rows otherwise. It is occasionally useful as an assertion in a data-quality check.',
        output: `category  avg_price
--------  ---------
displays  289.33`,
      },
      {
        language: 'sql',
        title: 'The classic mistake, and what each engine does with it',
        code: `-- Wrong: a row-level condition placed in HAVING
SELECT c.country, COUNT(*) AS orders
FROM orders AS o JOIN customers AS c ON c.id = o.customer_id
GROUP BY c.country
HAVING o.status <> 'cancelled';`,
        explanation:
          'PostgreSQL rejects this with `column "o.status" must appear in the GROUP BY clause or be used in an aggregate function`, which is the helpful outcome. SQLite accepts it and evaluates `o.status` against an arbitrary row from each group, so a country is kept or dropped depending on which row the engine happened to keep — a result that is neither reading A nor reading B and can change between runs. Whenever a condition mentions a column that is neither grouped nor aggregated, it belongs in WHERE.',
        output: `ERROR:  column "o.status" must appear in the GROUP BY clause
        or be used in an aggregate function`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Finding duplicates',
        usage:
          '`GROUP BY email HAVING COUNT(*) > 1` is the standard duplicate-detection query, and it is the archetypal HAVING: the condition is a property of the group, not of any row.',
      },
      {
        context: 'Cohort minimum-size rules',
        usage:
          'Analytics and privacy policies often require a group to contain at least k members before it is reported. That threshold is a HAVING clause, applied after the cohort is formed.',
      },
      {
        context: 'Data-quality gates in a pipeline',
        usage:
          'A dbt or Great Expectations test such as "no customer may have more than one active subscription" compiles to a GROUP BY with HAVING COUNT(*) > 1, failing the build if any row comes back.',
      },
      {
        context: 'Filtering rare classes out of a training set',
        usage:
          'Keeping only labels with at least 50 examples is `GROUP BY label HAVING COUNT(*) >= 50`, and doing it in SQL means the model never sees classes too rare to learn.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.groupby("k").filter(lambda g: len(g) >= 5)` is HAVING; `df[df.status != "cancelled"]` before the groupby is WHERE.' },
      { tool: 'dbt tests', role: 'Uniqueness and relationship tests compile to GROUP BY / HAVING queries that must return zero rows to pass.' },
      { tool: 'SQLAlchemy', role: '`.group_by(...).having(func.count() >= 5)` exposes the two clauses separately for exactly this reason.' },
      { tool: 'Query planners', role: 'EXPLAIN shows a row-level filter applied at the scan and a HAVING applied above the aggregate node, making the pipeline visible.' },
    ],

    commonMistakes: [
      {
        mistake: 'Putting a row-level condition in HAVING',
        why: 'PostgreSQL rejects it; SQLite evaluates it against an arbitrary row of each group, giving a non-reproducible result that resembles neither intended reading.',
        fix: 'If the condition can be decided from one row, it belongs in WHERE. If it mentions a column that is neither grouped nor aggregated, that is the tell.',
      },
      {
        mistake: 'Trying to use an aggregate in WHERE',
        why: 'WHERE runs before grouping, so no aggregate has been computed. PostgreSQL reports "aggregate functions are not allowed in WHERE".',
        fix: 'Move it to HAVING, or compute the aggregate in a subquery or CTE and filter the result of that.',
      },
      {
        mistake: 'Referencing a SELECT alias in HAVING',
        why: 'HAVING is evaluated before SELECT, so the alias does not exist yet. SQLite and MySQL allow it; PostgreSQL does not, so the query breaks on porting.',
        fix: 'Repeat the aggregate expression in HAVING, or wrap the aggregation in a CTE and filter the CTE in an outer WHERE.',
      },
      {
        mistake: 'Assuming WHERE and HAVING are interchangeable when both would "work"',
        why: 'For a row-level condition they can give different results, because filtering before grouping changes the totals that the group-level test then examines.',
        fix: 'Decide what the question means first: does the condition disqualify individual rows, or disqualify whole groups? The clause follows from the answer.',
      },
      {
        mistake: 'Expressing "groups containing no X" by filtering out X in WHERE',
        why: 'Removing the X rows makes the group look clean, so every group passes. The information needed to disqualify the group has been deleted before the test.',
        fix: 'Keep the rows and test with conditional aggregation: `HAVING SUM(CASE WHEN x THEN 1 ELSE 0 END) = 0`.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between WHERE and HAVING?',
        answer:
          'WHERE filters individual rows before grouping; HAVING filters whole groups after grouping. The consequence is that WHERE cannot reference an aggregate — none exists yet — while HAVING exists precisely to do so. The practical rule is to ask whether the condition can be decided by looking at one row. "Is this order cancelled?" can, so it goes in WHERE. "Does this customer have more than five orders?" cannot, so it goes in HAVING. Putting a row-level condition in HAVING is either an error in PostgreSQL or, worse, silently evaluated against an arbitrary row in SQLite.',
        followUp:
          'A strong answer adds that a row-level filter in WHERE also reduces the rows reaching the aggregator and may use an index, which HAVING can never do.',
      },
      {
        level: 'intermediate',
        question: 'Does moving a condition from WHERE to HAVING ever change the result, or only the performance?',
        answer:
          'It can change the result, and that is the more important point. Consider "countries with at least three orders, excluding cancelled ones". Filtering cancelled orders in WHERE removes them before the count, so a country with four orders of which two are cancelled fails the threshold. Leaving them in and testing the group instead — `HAVING COUNT(*) >= 3 AND SUM(CASE WHEN status = ’cancelled’ THEN 1 ELSE 0 END) = 0` — asks a genuinely different question: at least three orders and a clean record. These return different sets of countries from the same data. So the clause choice is a modelling decision first and a performance decision second; when both readings are valid, the right move is to ask which one the requester meant.',
      },
      {
        level: 'internship',
        question: 'Find all customers who have placed more than three orders but have never had one cancelled. Write the query and explain each clause.',
        answer:
          "`SELECT c.id, c.name, COUNT(*) AS orders FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name HAVING COUNT(*) > 3 AND SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) = 0 ORDER BY orders DESC, c.id;`. There is deliberately no WHERE: excluding cancelled orders up front would delete the very evidence the second condition needs, and every customer would then trivially pass. Both conditions are group-level, so both belong in HAVING. Grouping by `c.id, c.name` rather than by name alone keeps two customers with the same name distinct, and including `c.name` in the GROUP BY is what allows it in SELECT — PostgreSQL would also accept `c.name` bare here because it is functionally dependent on the primary key.",
        followUp:
          'Mentioning that this pattern generalises to "groups containing no row satisfying X", and that NOT EXISTS is the alternative formulation, shows the candidate sees the shape rather than the instance.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Find every product category that contains more than four products and whose average price exceeds 50.',
        hint: 'Both conditions concern the whole category, so both go in the same clause.',
        language: 'sql',
        starterCode: 'SELECT category, COUNT(*) AS n, ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY category\n-- add the filter\n',
        solution:
          'SELECT category, COUNT(*) AS n, ROUND(AVG(price), 2) AS avg_price\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 4 AND AVG(price) > 50\nORDER BY avg_price DESC, category;\n\nBoth predicates are aggregates, so neither could be evaluated before the groups exist. Note that HAVING repeats the raw expressions rather than the aliases `n` and `avg_price`: HAVING runs before SELECT, so the aliases do not yet exist, and although SQLite tolerates them PostgreSQL does not.',
      },
      {
        prompt: 'Find customers whose non-cancelled orders total more than 500 in revenue, counting only orders placed in 2024.',
        hint: 'Two row-level conditions and one group-level one. Revenue lives on order_items.',
        language: 'sql',
        solution:
          "SELECT c.id, c.name,\n       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue\nFROM customers   AS c\nJOIN orders      AS o  ON o.customer_id = c.id\nJOIN order_items AS oi ON oi.order_id   = o.id\nWHERE o.status <> 'cancelled'\n  AND o.order_date >= '2024-01-01'\n  AND o.order_date <  '2025-01-01'\nGROUP BY c.id, c.name\nHAVING SUM(oi.quantity * oi.unit_price) > 500\nORDER BY revenue DESC, c.id;\n\nThe status and date tests are decidable per row, so they belong in WHERE, where they also shrink the input to the aggregation and can use an index on `order_date`. The revenue threshold needs the whole group, so it belongs in HAVING. Grouping by `c.id, c.name` keeps same-named customers apart.",
      },
      {
        prompt: 'Find duplicate customer names — names shared by more than one customer — and show how many customers share each.',
        hint: 'This is the archetypal HAVING query. Group by the column you suspect is not unique.',
        language: 'sql',
        solution:
          "SELECT name, COUNT(*) AS occurrences, MIN(id) AS keep_id, MAX(id) AS other_id\nFROM customers\nGROUP BY name\nHAVING COUNT(*) > 1\nORDER BY occurrences DESC, name;\n\nThe MIN and MAX are a practical touch: when deduplicating, you usually want to keep the earliest record and merge the rest, and having the ids in the same result saves a second query. This pattern generalises to any uniqueness check — group by the columns that should form a key, and any row returned is a violation. It is exactly what a dbt uniqueness test compiles to, and running it before adding a UNIQUE constraint tells you whether the constraint will succeed.",
      },
    ],

    quiz: [
      {
        id: 'SQL-008-q1',
        type: 'mcq',
        concept: 'clause selection',
        prompt: 'Which condition belongs in HAVING rather than WHERE?',
        options: [
          '`COUNT(*) > 3`',
          "`status = 'shipped'`",
          "`order_date >= '2024-01-01'`",
          "`country IN ('Spain', 'Chile')`",
        ],
        answerIndex: 0,
        explanation:
          'Only the first needs a whole group to evaluate. The other three are decidable from a single row and belong in WHERE, where they also reduce the rows that must be aggregated.',
      },
      {
        id: 'SQL-008-q2',
        type: 'truefalse',
        concept: 'result equivalence',
        prompt: 'Moving a row-level condition from WHERE to HAVING changes only performance, never the result.',
        answer: false,
        explanation:
          'Filtering before grouping changes the totals the group-level test then examines, so the two placements can return different sets of groups. The clause choice is a modelling decision.',
      },
      {
        id: 'SQL-008-q3',
        type: 'debug',
        language: 'sql',
        concept: 'aggregates in where',
        prompt: 'PostgreSQL reports "aggregate functions are not allowed in WHERE". What is the fix?',
        code: "SELECT customer_id, COUNT(*) AS orders\nFROM orders\nWHERE COUNT(*) > 3\nGROUP BY customer_id;",
        options: [
          'Move `COUNT(*) > 3` into a HAVING clause after GROUP BY',
          'Add an alias to COUNT(*) and reference it in WHERE',
          'Add `customer_id` to the WHERE clause',
          'Replace COUNT(*) with COUNT(customer_id)',
        ],
        answerIndex: 0,
        explanation:
          'WHERE runs before GROUP BY, so no aggregate has been computed yet. HAVING runs after the groups are formed, which is why it may reference aggregates.',
      },
      {
        id: 'SQL-008-q4',
        type: 'order',
        concept: 'evaluation pipeline',
        prompt: 'Order the stages a grouped, filtered, sorted query passes through.',
        items: [
          'FROM and JOIN assemble the rows',
          'WHERE discards individual rows',
          'GROUP BY forms the groups',
          'HAVING discards whole groups',
          'SELECT projects the surviving groups',
          'ORDER BY sorts the result',
        ],
        explanation:
          'This sequence explains every visibility rule in the unit: aggregates do not exist until stage 3, and SELECT aliases do not exist until stage 5.',
      },
      {
        id: 'SQL-008-q5',
        type: 'multi',
        concept: 'having capabilities',
        prompt: 'What may a HAVING clause legally reference? Select all that apply.',
        options: [
          'Aggregate functions over the group',
          'Columns listed in GROUP BY',
          'A scalar subquery',
          'A column that is neither grouped nor aggregated',
          'An alias created in the SELECT clause, portably',
        ],
        answerIndices: [0, 1, 2],
        explanation:
          'Ungrouped, unaggregated columns have no single value per group. SELECT aliases are created after HAVING runs, so relying on them is a portability trap even where SQLite allows it.',
      },
      {
        id: 'SQL-008-q6',
        type: 'code-output',
        language: 'sql',
        concept: 'conditional aggregation in having',
        prompt: 'Nigeria has 5 orders (1 cancelled), Spain 3 (1 cancelled), China 3 (0 cancelled). Which countries does this return?',
        code: "SELECT c.country, COUNT(*) AS n\nFROM orders o JOIN customers c ON c.id = o.customer_id\nGROUP BY c.country\nHAVING COUNT(*) >= 3\n   AND SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) = 0;",
        options: ['China only', 'Nigeria and China', 'All three', 'Nigeria, Spain and China with adjusted counts'],
        answerIndex: 0,
        explanation:
          'All three meet the count threshold, but Nigeria and Spain each contain a cancelled order, so the conditional sum is non-zero and they are disqualified. Only China has a clean record.',
      },
      {
        id: 'SQL-008-q7',
        type: 'explain',
        concept: 'where vs having as question design',
        prompt: 'A stakeholder asks for "regions with at least 10 sales, not counting returns". Explain why you would ask a clarifying question before writing the query.',
        rubric: [
          'Identifies that "not counting returns" could filter rows before the count or disqualify the region',
          'Explains that WHERE and HAVING implement the two readings and give different results',
          'Proposes a concrete clarifying question or shows both results',
        ],
        sampleAnswer:
          'The phrase "not counting returns" is ambiguous in exactly the way WHERE and HAVING are different. One reading is that returned sales should be excluded from the tally, so a region with twelve sales of which three were returned has nine and misses the threshold — that is a WHERE filter before grouping. The other reading is that the threshold applies to all sales, and returns are a separate matter. A third possible intent, which stakeholders sometimes mean, is that any region with returns should be excluded entirely, which needs conditional aggregation in HAVING. These give materially different region lists from the same data, so I would either ask which is meant or, faster in practice, produce both columns — total sales and non-returned sales — and let the stakeholder point at the one they meant.',
        explanation:
          'The examinable skill is recognising that clause choice encodes the question, so ambiguity in the request is ambiguity in the SQL and must be resolved before coding.',
      },
    ],

    flashcards: [
      { front: 'WHERE vs HAVING in one sentence', back: 'WHERE filters rows before grouping; HAVING filters groups after grouping. That is why only HAVING may reference aggregates.' },
      { front: 'Why can WHERE not use COUNT(*)?', back: 'WHERE is evaluated before GROUP BY, so no groups and therefore no aggregates exist yet.' },
      { front: 'Can HAVING use a SELECT alias?', back: 'Not portably. HAVING runs before SELECT, so PostgreSQL rejects the alias even though SQLite and MySQL accept it. Repeat the expression.' },
      { front: 'How do you find duplicates?', back: '`GROUP BY key HAVING COUNT(*) > 1` — the archetypal group-level predicate, and what a uniqueness test compiles to.' },
      { front: 'How do you say "this group contains no cancelled row"?', back: '`HAVING SUM(CASE WHEN status = ’cancelled’ THEN 1 ELSE 0 END) = 0`. Filtering them out in WHERE would make the test vacuous.' },
      { front: 'Does clause choice affect correctness or only speed?', back: 'Correctness. Filtering before grouping changes the totals the group test examines, so the two placements can return different groups.' },
    ],

    challenge: {
      title: 'Disambiguate a real request',
      brief:
        'A stakeholder asks: "Which customers are our best repeat buyers? I mean people who have bought from us at least three times, ignoring anything cancelled." Write three queries implementing three defensible readings of that sentence: (1) at least three non-cancelled orders; (2) at least three orders in total, none cancelled; (3) at least three non-cancelled orders AND a cancellation rate below 20%. Report the row count of each, and write two sentences recommending which one you would put in front of the stakeholder and why.',
      language: 'sql',
      acceptanceCriteria: [
        'Three distinct queries, each producing a different customer set',
        'Reading 1 uses WHERE for the cancellation filter; reading 2 uses conditional aggregation in HAVING',
        'Reading 3 combines a WHERE filter with a rate computed by conditional aggregation, avoiding integer division',
        'Row counts for all three are reported side by side',
        'The recommendation names the business meaning, not just the SQL difference',
      ],
      starterCode: "-- Reading 1: at least three non-cancelled orders\nSELECT c.id, c.name, COUNT(*) AS orders\nFROM customers c JOIN orders o ON o.customer_id = c.id\nWHERE o.status <> 'cancelled'\nGROUP BY c.id, c.name\nHAVING COUNT(*) >= 3;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine and I understand that GROUP BY makes piles. Teach me the difference between throwing away cards before I make the piles and throwing away whole piles afterwards.',
      mustCover: [
        'WHERE throws away individual rows before the piles are made',
        'HAVING throws away whole piles after they are made and counted',
        'Only HAVING can talk about counts and totals, because those do not exist until the piles do',
        'Choosing the wrong one can change the answer, not just the speed',
        'A condition about one row belongs in WHERE; a condition about a whole pile belongs in HAVING',
      ],
      bonusSignals: ['gives a worked contrast where the two give different answers', 'mentions that filtering early also means less work', 'notes what happens if you put a row condition in HAVING'],
      sampleExplanation:
        'Imagine a big stack of cards, one per order, and you are going to sort them into piles by country and then count each pile. There are two different moments when you can throw something away. The first is before you sort: you go through the stack and bin every cancelled order, so those cards never reach a pile at all. That is WHERE. The second is after you have sorted and counted: you look at the finished piles and bin any pile with fewer than five cards in it. That is HAVING. The reason you cannot swap them is that a single card has no idea how big its pile is — you simply cannot ask "is this pile big?" while holding one card. And the reason it matters beyond tidiness is that the two give different answers. If you bin the cancelled cards first, a country with six orders and two cancelled is counted as four. If you keep them and judge the pile instead, it is counted as six but might be disqualified for having any cancelled at all. Same words, different question, so you have to decide which one you actually meant.',
    },
  },

  {
    id: 'SQL-009',
    domain: 'SQL',
    module: 'Joins',
    topic: 'Combining tables',
    title: 'INNER and LEFT JOIN',
    slug: 'inner-and-left-join',
    difficulty: 3,
    estimatedMinutes: 45,
    prerequisites: ['SQL-008'],
    related: ['SQL-003', 'SQL-005', 'SQL-007'],
    tags: ['join', 'inner-join', 'left-join', 'anti-join', 'null', 'on-clause'],

    learningObjectives: [
      'Explain a join as matching rows from two tables on a condition, producing a combined row per match',
      'Predict exactly which rows an INNER JOIN keeps and which it silently drops',
      'Use a LEFT JOIN to preserve every row of the left table, and read the NULLs it produces',
      'Use LEFT JOIN plus IS NULL to find rows with no match — the anti-join pattern',
      'Explain why a filter on the right table belongs in ON rather than WHERE in a LEFT JOIN',
    ],

    terminology: [
      {
        term: 'Join',
        definition:
          'An operation that combines rows from two relations according to a predicate, producing rows containing columns from both.',
        simple: 'Sticking two tables together where they match.',
      },
      {
        term: 'INNER JOIN',
        definition:
          'Keeps only the combinations where the ON condition is TRUE. Rows on either side with no match are excluded entirely.',
        simple: 'Keep only the pairs that matched.',
      },
      {
        term: 'LEFT OUTER JOIN',
        definition:
          'Keeps every row of the left relation. Where no right-hand row satisfies the ON condition, the right-hand columns are filled with NULL.',
        simple: 'Keep everything on the left; pad with blanks where there is no partner.',
      },
      {
        term: 'ON clause',
        definition:
          'The join predicate. In an outer join it decides what counts as a match before padding happens, which is why it is not interchangeable with WHERE.',
        simple: 'The rule that says which rows go together.',
      },
      {
        term: 'Anti-join',
        definition:
          'A query returning rows from one table that have no match in another, classically written as LEFT JOIN plus `WHERE right.key IS NULL`, or as NOT EXISTS.',
        simple: 'Find the ones with no partner.',
      },
      {
        term: 'Join cardinality',
        definition:
          'How many right-hand rows match each left-hand row. One-to-one preserves the row count; one-to-many multiplies it, which changes the grain of the result.',
        simple: 'How many partners each row finds — and therefore how many rows come out.',
      },
    ],

    simpleExplanation:
      "Data is deliberately split across tables: customers in one, orders in another, with the order holding the customer’s id. A join is how you put them back together for a question that needs both. You name the two tables and the rule for matching them — `ON orders.customer_id = customers.id` — and the engine produces a combined row for every pair that satisfies it. The choice you then have to make is what to do with rows that find no partner. An INNER JOIN drops them, on both sides: a customer with no orders vanishes, and so would an order with no customer. That is often what you want, and it is also the source of a great many quietly wrong reports, because the rows disappear without any indication that they existed. A LEFT JOIN instead keeps every row of the left table and, where no partner was found, fills the right-hand columns with NULL. That NULL is not a nuisance — it is information. Filtering for it is how you answer “which customers have never ordered?”, which is one of the most useful queries there is.",

    whyItExists:
      'Normalisation splits facts across tables so that each is recorded once and cannot contradict itself, but almost every real question spans several of them. The join is the operation that reassembles those facts on demand, so the storage can stay non-redundant while queries still see whole entities.',

    analogy: {
      scenario:
        'Think of two lists at a conference: a list of attendees with their badge numbers, and a list of talk sign-ups with the badge number of whoever signed up. To print name badges for each talk, someone sits with both lists and matches sign-ups to attendees by badge number. The interesting decisions are at the edges: an attendee who signed up for nothing, and a sign-up whose badge number does not appear on the attendee list at all.',
      mapping: [
        { from: 'The attendee list', to: 'The left table, e.g. `customers`' },
        { from: 'The sign-up list', to: 'The right table, e.g. `orders`' },
        { from: 'Matching on badge number', to: 'The ON condition' },
        { from: 'Only printing badges for matched pairs', to: 'INNER JOIN' },
        { from: 'Listing every attendee, marking "no talks" where there are none', to: 'LEFT JOIN, with NULLs where there is no match' },
        { from: 'Pulling out the attendees marked "no talks"', to: 'The anti-join: LEFT JOIN plus IS NULL' },
        { from: 'An attendee who signed up for three talks appearing three times', to: 'Row multiplication from a one-to-many join' },
      ],
      bridge:
        'The person with the two lists faces exactly the join decision: match-only, or keep-everyone-and-mark-the-gaps. And the reason the gaps matter is the same in both settings — "which attendees signed up for nothing" is often the question you actually care about, and an INNER JOIN has already thrown those people away before you can ask.',
      limitations:
        'A human matcher would notice a badge number that appears on no attendee list and raise it. A join simply drops it, silently, which is why the orphan-detection query from SQL-003 is a deliberate check rather than something the engine warns you about.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'INNER versus LEFT, on four customers and three orders',
        caption: 'Follow customer 3 (no orders) and customer 1 (two orders) through both joins.',
        art: `customers                  orders
id  name                   id  customer_id
--  ------                 --  -----------
1   Ada                    10      1
2   Ben                    11      1
3   Chen                   12      2
4   Dee                              (none for 3 or 4)

INNER JOIN customers c ON o.customer_id = c.id
  -> only matched pairs survive
  id  name  order_id
  --  ----  --------
  1   Ada   10
  1   Ada   11        <- Ada appears TWICE: one row per order
  2   Ben   12
  (Chen and Dee are gone, with no warning)

LEFT JOIN orders o ON o.customer_id = c.id
  -> every customer survives
  id  name  order_id
  --  ----  --------
  1   Ada   10
  1   Ada   11
  2   Ben   12
  3   Chen  NULL      <- padded, because nothing matched
  4   Dee   NULL      <- padded

ANTI-JOIN: ... LEFT JOIN ... WHERE o.id IS NULL
  id  name  order_id
  --  ----  --------
  3   Chen  NULL
  4   Dee   NULL      <- exactly the customers who never ordered`,
      },
      {
        kind: 'table',
        title: 'What each join keeps',
        columns: ['Join', 'Left rows with no match', 'Right rows with no match', 'Typical question'],
        rows: [
          ['INNER JOIN', 'Dropped', 'Dropped', '"Orders with their customer details"'],
          ['LEFT JOIN', 'Kept, right columns NULL', 'Dropped', '"Every customer, with their orders if any"'],
          ['LEFT JOIN + right IS NULL', 'Kept (only these)', 'Dropped', '"Customers who have never ordered"'],
          ['RIGHT JOIN', 'Dropped', 'Kept, left columns NULL', 'The mirror image; usually rewritten as a LEFT JOIN'],
          ['FULL OUTER JOIN', 'Kept, padded', 'Kept, padded', '"Reconcile two lists and show what only appears in each"'],
        ],
      },
      {
        kind: 'compare',
        title: 'Filtering the right table: ON versus WHERE',
        caption: 'The single most consequential subtlety of outer joins.',
        left: {
          heading: "LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'shipped'",
          points: [
            'The status test is part of what counts as a match',
            'Every customer is still returned',
            'A customer with only cancelled orders gets NULL order columns',
            'Answers: "each customer and their shipped orders, if any"',
            'Row count >= number of customers',
          ],
        },
        right: {
          heading: "LEFT JOIN orders o ON o.customer_id = c.id WHERE o.status = 'shipped'",
          points: [
            'The status test runs after padding',
            'Padded rows have status NULL, and NULL = ’shipped’ is UNKNOWN',
            'So every unmatched customer is filtered out again',
            'The LEFT JOIN has silently become an INNER JOIN',
            'Answers: "customers who have a shipped order"',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How a LEFT JOIN is evaluated',
        caption: 'The padding step is what makes ON and WHERE behave differently.',
        steps: [
          { label: 'Take each left row', detail: 'Every row of `customers`, one at a time.' },
          { label: 'Find right rows satisfying ON', detail: 'All orders whose `customer_id` matches, and which satisfy any other ON conditions.' },
          { label: 'Emit one combined row per match', detail: 'A customer with three matching orders produces three rows.' },
          { label: 'If no match, pad with NULL', detail: 'Emit one row with the right-hand columns all NULL. This is what makes it a LEFT join.' },
          { label: 'Then apply WHERE', detail: 'WHERE runs on the padded result, so a condition on a right-hand column will eliminate the padded rows.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Run both joins side by side',
        caption: 'Count the rows from `customers INNER JOIN orders` and `customers LEFT JOIN orders`. The difference is the customers who have never ordered.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'An inner join of relations R and S on predicate θ is the subset of the Cartesian product R × S for which θ evaluates to TRUE. A left outer join additionally includes, for every tuple r of R having no s in S with θ(r, s) TRUE, one tuple consisting of r extended with NULL in every attribute of S. Because the padding occurs during the join, predicates placed in ON participate in match determination, whereas predicates in WHERE are applied to the already-padded result and therefore can eliminate padded tuples.',

    workedExample: {
      title: 'Turning a LEFT JOIN into an INNER JOIN by accident',
      setup:
        'We want a report of every customer with the number of shipped orders they have, including customers with none, who should show zero. There are 4 customers: Ada has 2 shipped, Ben has 1 cancelled and 0 shipped, Chen has 1 shipped, Dee has no orders at all.',
      steps: [
        {
          label: 'Attempt 1: filter in WHERE',
          detail:
            "`FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.status = 'shipped' GROUP BY c.id`. The join produces Ada x2, Ben x1 (cancelled), Chen x1, Dee x1 padded with NULLs. Then WHERE tests `o.status = 'shipped'`: Ben's cancelled row is FALSE, and Dee's padded row has status NULL so the test is UNKNOWN. Both are removed.",
        },
        {
          label: 'Result of attempt 1',
          detail:
            'Two rows: Ada 2, Chen 1. Ben and Dee have vanished from a report that was specifically meant to include them. The LEFT JOIN has been silently converted into an INNER JOIN by the WHERE clause.',
        },
        {
          label: 'Attempt 2: move the filter into ON',
          detail:
            "`LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'shipped'`. Now the status test decides what counts as a match. Ada matches twice, Chen once, Ben matches nothing so is padded, Dee matches nothing so is padded.",
        },
        {
          label: 'Aggregate correctly',
          detail:
            '`COUNT(*)` would give Ben and Dee a count of 1, because the padded row is still a row. `COUNT(o.id)` gives 0, because COUNT of a column skips NULLs. This is the second half of the trap, and it catches people who fixed the first half.',
          latex: '\\mathrm{COUNT}(o.id) = \\sum_i \\mathbb{1}[o.id_i \\neq \\mathrm{NULL}]',
        },
        {
          label: 'Result of attempt 2',
          detail: 'Four rows: Ada 2, Ben 0, Chen 1, Dee 0. Every customer is present and the zeros are genuine zeros.',
        },
      ],
      conclusion:
        'Two rules come out of this, and they always travel together. Conditions on the right-hand table of a LEFT JOIN belong in ON, not WHERE. And when counting through an outer join, count a non-nullable column from the right table, never `*`, or the padded rows will be counted as one instead of zero.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'INNER JOIN: only matched pairs',
        runnable: true,
        code: `SELECT
  o.id          AS order_id,
  o.order_date,
  o.status,
  c.name        AS customer,
  c.country
FROM orders    AS o
JOIN customers AS c ON c.id = o.customer_id
ORDER BY o.order_date DESC, o.id DESC
LIMIT 10;`,
        explanation:
          'The bare keyword JOIN means INNER JOIN in every dialect, and this is the workhorse query of relational databases: take a fact table and decorate it with attributes from a dimension table. Because `orders.customer_id` has a foreign key and is NOT NULL, no orders can be lost here — but that safety depends entirely on the constraint existing. In a database without enforced foreign keys, this same query silently drops every orphaned order, which is why the orphan audit from SQL-003 is worth running before trusting any report built this way.',
        output: `order_id  order_date  status   customer    country
--------  ----------  -------  ----------  -------
42        2024-03-28  pending  Chen Wei    China
41        2024-03-27  shipped  Ada Okafor  Nigeria`,
      },
      {
        language: 'sql',
        title: 'LEFT JOIN: keep every customer, even those with no orders',
        runnable: true,
        code: `SELECT
  c.id,
  c.name,
  COUNT(o.id)                      AS order_count,
  COALESCE(MAX(o.order_date), 'never') AS last_order
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY order_count DESC, c.id;`,
        explanation:
          '`COUNT(o.id)` rather than `COUNT(*)` is the detail that makes this correct. A customer with no orders still produces one row — padded with NULLs — so `COUNT(*)` would report 1 order for someone who has none. `COUNT(o.id)` skips the NULL and correctly reports 0. The COALESCE turns the NULL `MAX(order_date)` into a readable label; without it the column is blank and a reader cannot tell "never ordered" from "date missing".',
        output: `id  name          order_count  last_order
--  ------------  -----------  ----------
1   Ada Okafor    6            2024-03-27
3   Chen Wei      4            2024-03-28
7   Priya Nair    0            never`,
      },
      {
        language: 'sql',
        title: 'The anti-join: rows with no match',
        runnable: true,
        code: `-- Customers who have never placed an order
SELECT c.id, c.name, c.country
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;

-- Products that have never been ordered
SELECT p.id, p.name, p.category
FROM products AS p
LEFT JOIN order_items AS oi ON oi.product_id = p.id
WHERE oi.id IS NULL;

-- The same thing with NOT EXISTS, which many find clearer
SELECT p.id, p.name
FROM products AS p
WHERE NOT EXISTS (SELECT 1 FROM order_items AS oi WHERE oi.product_id = p.id);`,
        explanation:
          'The pattern is always the same: LEFT JOIN so unmatched rows survive, then keep exactly those unmatched rows by testing a right-hand column for NULL. The column you test must be one that can never be NULL in a genuine match — the primary key is the safe choice, since testing a nullable column would also match rows that did join but happened to have a NULL there. All three formulations — LEFT JOIN plus IS NULL, NOT EXISTS, and NOT IN — express the same idea, but NOT IN is unsafe with NULLs as SQL-005 showed, and a modern optimiser usually produces the same anti-join plan for the other two.',
        output: `id  name          country
--  ------------  -------
7   Priya Nair    India
19  Tom Halloran  Ireland

id  name           category
--  -------------  -----------
22  Laptop Stand   peripherals`,
      },
      {
        language: 'sql',
        title: 'ON versus WHERE, demonstrated',
        runnable: true,
        code: `-- CORRECT: every customer, counting only their shipped orders
SELECT c.name, COUNT(o.id) AS shipped_orders
FROM customers AS c
LEFT JOIN orders AS o
       ON o.customer_id = c.id
      AND o.status = 'shipped'
GROUP BY c.id, c.name
ORDER BY shipped_orders DESC, c.name;

-- WRONG: the WHERE turns this back into an INNER JOIN
SELECT c.name, COUNT(o.id) AS shipped_orders
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.status = 'shipped'
GROUP BY c.id, c.name;`,
        explanation:
          'In the first query the status test participates in matching, so a customer with no shipped orders is padded and counted as zero. In the second the padding happens first and then WHERE examines `o.status`, which is NULL on every padded row; `NULL = ’shipped’` is UNKNOWN, so those rows are discarded and the customers disappear. The tell-tale symptom in a report is that the number of rows equals the number of customers who have the thing, rather than the total number of customers — a discrepancy nobody notices unless they check.',
        output: `-- correct
name          shipped_orders
------------  --------------
Ada Okafor    5
Priya Nair    0

-- wrong (Priya has vanished)
name          shipped_orders
------------  --------------
Ada Okafor    5`,
      },
      {
        language: 'sql',
        title: 'A three-table join with correct aggregation',
        runnable: true,
        code: `SELECT
  c.name,
  COUNT(DISTINCT o.id)                       AS orders,
  COUNT(oi.id)                               AS items,
  ROUND(COALESCE(SUM(oi.quantity * oi.unit_price), 0), 2) AS revenue
FROM customers        AS c
LEFT JOIN orders      AS o  ON o.customer_id = c.id AND o.status <> 'cancelled'
LEFT JOIN order_items AS oi ON oi.order_id   = o.id
GROUP BY c.id, c.name
ORDER BY revenue DESC, c.name;`,
        explanation:
          'Two LEFT JOINs chained: the second joins to the result of the first, so a customer with no orders still survives both and ends with NULLs from both. Three details make it correct. The cancellation filter is in ON, so it does not undo the outer join. `COUNT(DISTINCT o.id)` counts orders even though the grain is now one row per item. And COALESCE wraps the SUM, because SUM over an empty set is NULL rather than 0 — a customer with no orders would otherwise show a blank revenue where a zero is what the reader expects.',
        output: `name          orders  items  revenue
------------  ------  -----  -------
Ada Okafor    6       14     2104.50
Chen Wei      4       9      1330.00
Priya Nair    0       0      0.00`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Assembling a labelled training set',
        usage:
          'Features live in one table and labels in another. An INNER JOIN silently drops every unlabelled example, which is usually right; a LEFT JOIN keeps them and reveals how many examples have no label, which is usually worth knowing first.',
      },
      {
        context: 'Churn and re-engagement lists',
        usage:
          'The anti-join is the query behind "customers who have not ordered in 90 days" and "users who signed up but never activated". These lists drive marketing campaigns and are produced by LEFT JOIN plus IS NULL.',
      },
      {
        context: 'Reconciling two systems',
        usage:
          'Comparing a payments provider’s export with internal orders means finding rows present in one and absent from the other — two anti-joins, or one FULL OUTER JOIN. The rows that appear are precisely the discrepancies to investigate.',
      },
      {
        context: 'Dashboards that must show zeros',
        usage:
          'A sales-by-region chart built on an INNER JOIN omits regions with no sales entirely, so a region that collapsed to zero looks identical to a region that does not exist. A LEFT JOIN from a region dimension keeps the zero visible.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`df.merge(other, how="inner"|"left", on="customer_id")` is the same operation, and `indicator=True` reveals which side each row came from — a built-in anti-join helper.' },
      { tool: 'SQLAlchemy', role: '`.join()` and `.outerjoin()` map directly onto INNER and LEFT, with the ON condition passed explicitly.' },
      { tool: 'dbt', role: 'Staging models join raw tables into entity-level models; a mis-specified join there propagates wrong numbers to every downstream dashboard at once.' },
      { tool: 'Spark', role: 'Broadcast joins and shuffle joins are physical strategies for the same logical operation, chosen by size — the semantics taught here are unchanged.' },
    ],

    commonMistakes: [
      {
        mistake: 'Putting a right-table filter in WHERE on a LEFT JOIN',
        why: 'WHERE runs after padding, and the padded rows have NULL in that column, so the test is UNKNOWN and they are discarded. The outer join degenerates into an inner join with no error.',
        fix: 'Move the condition into the ON clause, where it participates in match determination instead of filtering the padded result.',
      },
      {
        mistake: 'Using COUNT(*) after a LEFT JOIN',
        why: 'A padded row is still a row, so an unmatched left row is counted as 1 instead of 0. Every "customers with no orders" figure comes out as one order.',
        fix: 'Count a column from the right table that cannot be NULL in a real match, normally its primary key: `COUNT(o.id)`.',
      },
      {
        mistake: 'Forgetting that SUM over no rows is NULL, not zero',
        why: 'Aggregates return NULL for an empty group, so a customer with no orders shows a blank revenue rather than 0.00, and any arithmetic on it propagates the NULL.',
        fix: 'Wrap it: `COALESCE(SUM(...), 0)`. Decide once whether your report shows blanks or zeros and be consistent.',
      },
      {
        mistake: 'Assuming an INNER JOIN preserves the row count of the left table',
        why: 'It preserves nothing. A one-to-many join multiplies rows, and unmatched rows disappear, so the output row count can be larger or smaller than either input.',
        fix: 'Check: compare `COUNT(*)` before and after, and use `COUNT(DISTINCT left.id)` to confirm no entities were lost or duplicated.',
      },
      {
        mistake: 'Testing a nullable right-hand column for the anti-join',
        why: '`WHERE o.status IS NULL` matches both unmatched rows and genuinely matched rows whose status happens to be NULL, so the result quietly includes rows that did join.',
        fix: 'Always test the right table’s primary key, which is NOT NULL by definition and therefore NULL only when padding occurred.',
      },
      {
        mistake: 'Writing the join condition in WHERE with a comma-separated FROM',
        why: 'The old `FROM a, b WHERE a.id = b.a_id` syntax works but makes it easy to omit the condition, producing a silent Cartesian product, and it cannot express outer joins at all.',
        fix: 'Always use explicit `JOIN ... ON`. The join condition then sits next to the join it belongs to and cannot go missing.',
      },
    ],

    interviewQuestions: [
      {
        level: 'beginner',
        question: 'What is the difference between an INNER JOIN and a LEFT JOIN?',
        answer:
          'An INNER JOIN returns only the row combinations where the ON condition is TRUE, so rows on either side with no match are excluded. A LEFT JOIN returns every row of the left table regardless, filling the right-hand columns with NULL where nothing matched. The practical significance is that an INNER JOIN loses data silently: a customer with no orders simply does not appear, with no error and no indication. If your question is about orders, INNER is usually right; if it is about customers and their orders, LEFT is the honest choice, because it lets zero be visible rather than absent.',
      },
      {
        level: 'intermediate',
        question: 'How do you find rows in table A that have no corresponding row in table B?',
        answer:
          'Three equivalent formulations. The classic anti-join is `SELECT a.* FROM a LEFT JOIN b ON b.a_id = a.id WHERE b.id IS NULL` — LEFT JOIN keeps unmatched rows, and testing B’s primary key for NULL keeps exactly those. `NOT EXISTS (SELECT 1 FROM b WHERE b.a_id = a.id)` expresses the same thing and many find it more readable, since it says what it means. `NOT IN` also works but is unsafe: a single NULL in the subquery makes the predicate UNKNOWN for every row and returns nothing. The first two are typically compiled to the same anti-join plan, so the choice is about clarity, not speed. The column tested for NULL must be non-nullable in a real match, which is why you test the key rather than an arbitrary column.',
        followUp:
          'A strong answer notes that this is the query behind churn lists, orphan audits and reconciliation between two systems — it is not an exotic pattern.',
      },
      {
        level: 'internship',
        question: 'A report of "every customer and their shipped order count" is missing customers who have no shipped orders, even though it uses a LEFT JOIN. Diagnose it.',
        answer:
          "Almost certainly the status filter is in WHERE rather than in ON. A LEFT JOIN pads unmatched customers with NULLs in every orders column, and then `WHERE o.status = 'shipped'` evaluates NULL against 'shipped', which is UNKNOWN, so WHERE drops those padded rows. The outer join has effectively become an inner join. Moving the condition into the ON clause — `LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'shipped'` — makes the status part of what counts as a match, so unmatched customers survive with NULLs. There is a second bug that usually accompanies this one: the count must be `COUNT(o.id)` rather than `COUNT(*)`, because a padded row is still a row and would be counted as one order rather than zero.",
        followUp:
          'Describing how you would verify — compare the result’s row count against `SELECT COUNT(*) FROM customers` — turns the diagnosis into a repeatable check.',
      },
      {
        level: 'ml-engineer',
        question: 'You join a features table to a labels table and the row count increases. What do you check?',
        answer:
          'The join key is not unique on the labels side, so one feature row is matching several label rows and the examples are being duplicated. I would check immediately with `SELECT key, COUNT(*) FROM labels GROUP BY key HAVING COUNT(*) > 1` to see the duplicates and how many there are. The cause is usually one of three things: the labels table has genuine duplicates from a re-run of an upstream job; the intended key is composite and I joined on only part of it, for example on user id when the real grain is user and date; or the labels table is event-level while the features are entity-level, in which case an aggregation is needed before joining. Duplicated training examples are not harmless — they reweight the loss towards whichever rows duplicated, and if the same entity lands in both train and test the evaluation is leaked and optimistic.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'List every product together with the total quantity ever ordered, including products that have never been ordered, which should show 0.',
        hint: 'LEFT JOIN from products, and remember what SUM returns over an empty set.',
        language: 'sql',
        starterCode: 'SELECT p.id, p.name\nFROM products AS p\n-- join to order_items and aggregate\n',
        solution:
          'SELECT\n  p.id,\n  p.name,\n  COALESCE(SUM(oi.quantity), 0) AS units_ordered,\n  COUNT(oi.id)                  AS times_ordered\nFROM products AS p\nLEFT JOIN order_items AS oi ON oi.product_id = p.id\nGROUP BY p.id, p.name\nORDER BY units_ordered DESC, p.name;\n\nTwo outer-join details do the work. COALESCE turns the NULL that SUM returns over an empty group into 0, so never-ordered products read as zero rather than blank. And `COUNT(oi.id)` rather than `COUNT(*)` gives 0 instead of 1 for those products, because the padded row is still a row but its `oi.id` is NULL.',
      },
      {
        prompt: 'Find every customer who has placed at least one order but has never ordered anything from the "displays" category.',
        hint: 'Two conditions: one requires existence, the other requires absence. NOT EXISTS is the cleanest way to say the second.',
        language: 'sql',
        solution:
          "SELECT c.id, c.name\nFROM customers AS c\nWHERE EXISTS (\n        SELECT 1 FROM orders AS o WHERE o.customer_id = c.id\n      )\n  AND NOT EXISTS (\n        SELECT 1\n        FROM orders      AS o\n        JOIN order_items AS oi ON oi.order_id = o.id\n        JOIN products    AS p  ON p.id = oi.product_id\n        WHERE o.customer_id = c.id AND p.category = 'displays'\n      )\nORDER BY c.id;\n\nThe temptation is to write a single join with `WHERE p.category <> 'displays'`, which is wrong: that returns customers who ordered anything that is not a display, including customers who also ordered displays. \"Never ordered X\" is a statement about the absence of any matching row, so it needs NOT EXISTS (or an anti-join), not a negated comparison on one row.",
      },
      {
        prompt: 'Produce a report of every customer with their order count and revenue, counting only orders from 2024 and excluding cancelled ones, with customers who qualify for nothing showing zeros.',
        hint: 'All three filters concern the right-hand tables of an outer join. Where must they go?',
        language: 'sql',
        solution:
          "SELECT\n  c.id,\n  c.name,\n  COUNT(DISTINCT o.id) AS orders_2024,\n  ROUND(COALESCE(SUM(oi.quantity * oi.unit_price), 0), 2) AS revenue_2024\nFROM customers AS c\nLEFT JOIN orders AS o\n       ON o.customer_id = c.id\n      AND o.status <> 'cancelled'\n      AND o.order_date >= '2024-01-01'\n      AND o.order_date <  '2025-01-01'\nLEFT JOIN order_items AS oi ON oi.order_id = o.id\nGROUP BY c.id, c.name\nORDER BY revenue_2024 DESC, c.id;\n\nAll three conditions sit in the ON clause of the first LEFT JOIN. Moving any one of them into WHERE would eliminate the padded rows and drop exactly the customers the report is meant to show as zero. `COUNT(DISTINCT o.id)` is required because the second join multiplies each order into one row per item, and COALESCE around SUM converts the empty-group NULL into 0.00.",
      },
    ],

    quiz: [
      {
        id: 'SQL-009-q1',
        type: 'mcq',
        concept: 'join semantics',
        prompt: '`customers` has 40 rows; 7 of them have no orders. How many rows does `SELECT c.id FROM customers c LEFT JOIN orders o ON o.customer_id = c.id` return if the other 33 customers have 120 orders between them?',
        options: ['127', '120', '40', '33'],
        answerIndex: 0,
        explanation:
          'Matched customers contribute one row per order (120), and each of the 7 unmatched customers contributes one padded row, giving 127. A LEFT JOIN preserves every left row but does not preserve the left row count.',
      },
      {
        id: 'SQL-009-q2',
        type: 'debug',
        language: 'sql',
        concept: 'on vs where',
        prompt: 'This is meant to show all customers with their shipped-order counts, but customers with no shipped orders are missing. What is wrong?',
        code: "SELECT c.name, COUNT(o.id) AS shipped\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.status = 'shipped'\nGROUP BY c.id, c.name;",
        options: [
          "The status filter must move into the ON clause, or WHERE discards the padded rows",
          'COUNT(o.id) should be COUNT(*)',
          'The GROUP BY should list only c.name',
          'LEFT JOIN should be RIGHT JOIN',
        ],
        answerIndex: 0,
        explanation:
          'Padded rows have `o.status` NULL, and `NULL = ’shipped’` is UNKNOWN, so WHERE removes them and the outer join collapses to an inner join.',
      },
      {
        id: 'SQL-009-q3',
        type: 'truefalse',
        concept: 'counting through outer joins',
        prompt: 'After a LEFT JOIN, `COUNT(*)` correctly reports 0 for left rows that found no match.',
        answer: false,
        explanation:
          'A padded row is still a row, so COUNT(*) reports 1. Count a non-nullable right-hand column instead, normally its primary key: COUNT(o.id).',
      },
      {
        id: 'SQL-009-q4',
        type: 'fill',
        concept: 'anti-join',
        prompt: 'Complete the anti-join that finds customers who have never ordered: `... LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id ____`',
        answers: ['IS NULL', 'is null'],
        explanation:
          'Only unmatched left rows have NULL in the right table’s primary key, so testing it isolates exactly the rows with no match. Testing a nullable column instead would also catch genuine matches.',
      },
      {
        id: 'SQL-009-q5',
        type: 'multi',
        concept: 'join pitfalls',
        prompt: 'Which statements about joins are true? Select all that apply.',
        options: [
          'An INNER JOIN can return fewer rows than either input table',
          'An INNER JOIN can return more rows than either input table',
          'A LEFT JOIN guarantees at least one output row per left row',
          'A LEFT JOIN guarantees exactly one output row per left row',
          'SUM over a group containing only padded rows returns NULL, not 0',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Unmatched rows are dropped (fewer) and one-to-many matches multiply rows (more). LEFT guarantees at least one row per left row, not exactly one, and aggregates over empty sets return NULL.',
      },
      {
        id: 'SQL-009-q6',
        type: 'match',
        concept: 'choosing a join',
        prompt: 'Match each question to the join that answers it.',
        pairs: [
          { left: 'Orders with the customer’s country attached', right: 'INNER JOIN' },
          { left: 'Every customer, with order counts including zeros', right: 'LEFT JOIN with COUNT(o.id)' },
          { left: 'Customers who have never ordered', right: 'LEFT JOIN plus WHERE o.id IS NULL' },
          { left: 'Every customer with only their shipped orders counted', right: 'LEFT JOIN with the status condition in ON' },
        ],
        explanation:
          'The join type follows from which side must be preserved and whether the condition on the other side should determine matching or filter the result.',
      },
      {
        id: 'SQL-009-q7',
        type: 'explain',
        concept: 'inner join data loss',
        prompt: 'Why is an INNER JOIN sometimes described as a silent data-loss operation, and how would you detect it?',
        rubric: [
          'Explains that unmatched rows on both sides are dropped with no error or warning',
          'Gives a concrete consequence, such as a report undercounting or a zero disappearing',
          'Proposes a check, such as comparing row counts or using a LEFT JOIN with IS NULL to see what was dropped',
        ],
        sampleAnswer:
          'An INNER JOIN keeps only matched pairs, and it discards everything else without raising anything. If some orders reference a customer that no longer exists — which is possible whenever foreign keys were not enforced — those orders vanish from every revenue report built on the join, and the total is simply lower than reality with nothing to indicate why. The same happens in the other direction: regions with no sales disappear from a sales-by-region chart, so a region that collapsed to zero is indistinguishable from a region that was never in the data. To detect it I would compare `COUNT(*)` on the base table with `COUNT(DISTINCT base.id)` on the joined result, and run the LEFT JOIN plus IS NULL anti-join to list exactly which rows failed to match. If the answer is non-empty, I would find out why before trusting any aggregate over that join.',
        explanation:
          'The examinable idea is that absence of error is not evidence of correctness, and that joins need an explicit reconciliation check rather than trust.',
      },
    ],

    flashcards: [
      { front: 'INNER JOIN vs LEFT JOIN', back: 'INNER keeps only matched pairs; LEFT keeps every left row, padding right columns with NULL when nothing matched.' },
      { front: 'How do you find rows with no match?', back: 'LEFT JOIN then `WHERE right.primary_key IS NULL` — the anti-join. Equivalently NOT EXISTS. Never NOT IN if NULLs are possible.' },
      { front: 'Why put a right-table filter in ON, not WHERE, for a LEFT JOIN?', back: 'WHERE runs after padding and tests NULL columns, discarding the padded rows and turning the outer join into an inner join.' },
      { front: 'Why COUNT(o.id) not COUNT(*) after a LEFT JOIN?', back: 'A padded row is still a row, so COUNT(*) reports 1 for a left row with no matches. COUNT of a column skips the NULL and reports 0.' },
      { front: 'What does SUM return over an empty group?', back: 'NULL, not 0. Wrap it in COALESCE when a report should show zeros.' },
      { front: 'Does a join preserve row counts?', back: 'No. Unmatched rows are dropped and one-to-many matches multiply rows, so the output can be smaller or larger than either input.' },
    ],

    challenge: {
      title: 'A customer report that shows the zeros',
      brief:
        'Build a single report with one row per customer — every customer, including those who have never ordered — containing: total orders, total non-cancelled orders, total revenue, the date of their first and most recent order, and a `segment` computed with CASE as "never ordered", "one-off", or "repeat". Every numeric column must show 0 rather than blank where appropriate, every date column must show a readable label rather than a bare NULL, and the row count of your result must equal `SELECT COUNT(*) FROM customers`. Prove that last point with a second query.',
      language: 'sql',
      acceptanceCriteria: [
        'Result row count equals the number of customers, verified by a query',
        'All right-table filters appear in ON, not WHERE',
        'COUNT uses a right-table key rather than *, and SUM is wrapped in COALESCE',
        'The segment CASE correctly distinguishes zero orders from one order',
        'Dates are presented with an explicit label for customers who have never ordered',
      ],
      starterCode: "SELECT\n  c.id,\n  c.name,\n  COUNT(o.id) AS orders\nFROM customers AS c\nLEFT JOIN orders AS o ON o.customer_id = c.id\nGROUP BY c.id, c.name;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I am nine and I have two lists: children, and the clubs they signed up for. Teach me what a join is, and what happens to a child who signed up for nothing.',
      mustCover: [
        'A join matches rows from two tables using a rule, producing combined rows',
        'An INNER JOIN keeps only the pairs that matched, so unmatched rows disappear entirely',
        'A LEFT JOIN keeps every row of the first table and puts blanks where there was no match',
        'Those blanks are useful: filtering for them finds the rows with no match',
        'A row that matches several times comes out several times',
      ],
      bonusSignals: ['uses two concrete lists', 'points out that the disappearing rows vanish with no warning', 'mentions counting the blanks incorrectly as one instead of zero'],
      sampleExplanation:
        'You have two lists. One has every child in the school with their number. The other has club sign-ups, and each sign-up just says a number and a club. On their own neither list is much use, so you match them up: for every sign-up, find the child with that number and write the name next to it. That matching is a join. Now, what about Maya, who did not sign up for anything? If you only write down the matched pairs, Maya never appears — she has silently dropped out of the list, and nobody looking at the result would know she existed. That is an inner join, and it is fine when you only care about sign-ups. But if you wanted "every child and what they signed up for", you use a left join instead: you go through the children’s list one by one and write each name down no matter what, leaving the club column blank when there is nothing to put there. The blank is the useful bit. If you now keep only the lines with a blank club, you have exactly the children who signed up for nothing — which was probably the list the teacher wanted all along. One last thing: Tom signed up for three clubs, so his name appears three times. Matching does not keep one line per child; it keeps one line per match.',
    },
  },

  {
    id: 'SQL-010',
    domain: 'SQL',
    module: 'Joins',
    topic: 'Join varieties and pitfalls',
    title: 'Other Joins and Join Pitfalls',
    slug: 'other-joins-and-pitfalls',
    difficulty: 3,
    estimatedMinutes: 35,
    prerequisites: ['SQL-009'],
    related: ['SQL-003', 'SQL-007', 'SQL-009'],
    tags: ['right-join', 'full-outer-join', 'cross-join', 'self-join', 'fan-out', 'cartesian-product'],

    learningObjectives: [
      'Describe RIGHT, FULL OUTER, CROSS and SELF joins and when each is the natural tool',
      'Emulate a FULL OUTER JOIN in SQLite, which lacked it before version 3.39',
      'Diagnose row multiplication (fan-out) when joining two one-to-many tables and fix it by pre-aggregating',
      'Recognise an accidental Cartesian product and its symptoms',
      'Explain why filtering the right table in WHERE converts a LEFT JOIN into an INNER JOIN',
    ],

    terminology: [
      {
        term: 'RIGHT OUTER JOIN',
        definition:
          'The mirror of LEFT: every row of the right relation is preserved, padding the left columns with NULL. Semantically redundant, since swapping the table order turns it into a LEFT JOIN.',
        simple: 'Keep everything on the right instead of the left.',
      },
      {
        term: 'FULL OUTER JOIN',
        definition:
          'Preserves unmatched rows from both relations, padding whichever side is missing. The natural tool for reconciling two lists.',
        simple: 'Keep everything from both sides, blanks where there is no partner.',
      },
      {
        term: 'CROSS JOIN',
        definition:
          'The Cartesian product: every row of one relation paired with every row of the other, with no condition. Produces m × n rows.',
        simple: 'Every possible pairing.',
      },
      {
        term: 'SELF JOIN',
        definition:
          'A join of a table to itself using two aliases, used for hierarchies (employee to manager) and for comparing rows within one table.',
        simple: 'Joining a table to a second copy of itself.',
      },
      {
        term: 'Fan-out',
        definition:
          'Row multiplication caused by joining one parent to two or more independent one-to-many children, so the output row count is the product of the child counts rather than their sum.',
        simple: 'Rows exploding because two lists both multiplied.',
      },
      {
        term: 'Accidental Cartesian product',
        definition:
          'A join whose ON condition is missing, incomplete or always true, so every row pairs with every row. Symptoms are an enormous row count and a query that never finishes.',
        simple: 'Forgetting the matching rule, so everything pairs with everything.',
      },
    ],

    simpleExplanation:
      "Beyond INNER and LEFT there are a few more join shapes, and then there is the part that actually costs people their afternoons. The extra shapes are easy: RIGHT JOIN is LEFT JOIN with the tables the other way round, FULL OUTER JOIN keeps unmatched rows from both sides, CROSS JOIN pairs everything with everything, and a SELF JOIN is just a table joined to a second copy of itself — which is how you connect an employee to their manager when both live in the same table. The dangerous part is what happens to row counts. If one order has three items, joining orders to items gives you three rows for that order, and any sum of an order-level number is now tripled. Worse, if you join an order to its items *and* to its payments in the same query, you get three items times two payments equals six rows, and both totals are wrong in different ways. Nothing errors. The numbers just come out too big, and they look completely plausible. Learning to ask “what does one row of this result mean?” after every join is the single habit that prevents it.",

    whyItExists:
      'Real questions need more than the two common join shapes: reconciling two systems needs unmatched rows from both sides, generating a complete grid of date-by-category combinations needs a deliberate Cartesian product, and hierarchies stored in one table need that table joined to itself. Knowing the full set also means recognising when you have produced one by accident.',

    analogy: {
      scenario:
        'Imagine matching two guest lists for a wedding — the bride’s and the groom’s — to build a seating plan. Keeping only people on both lists is an inner join. Keeping everyone on the bride’s list is a left join. Keeping everyone from both lists, marking who is on only one, is a full outer join. Pairing every guest with every table to consider all seating options is a cross join. And now the expensive mistake: if you separately match each guest to their dietary requirements and to their travel bookings, a guest with two dietary notes and three travel legs appears six times, and if you then count guests you conclude the wedding has six times as many people as it does.',
      mapping: [
        { from: 'People on both lists', to: 'INNER JOIN' },
        { from: 'Everyone from both lists, marked where they appear only once', to: 'FULL OUTER JOIN' },
        { from: 'Every guest paired with every table', to: 'CROSS JOIN — deliberate m × n' },
        { from: 'Matching guests to other guests, e.g. who is whose plus-one', to: 'SELF JOIN with two aliases' },
        { from: 'Two dietary notes times three travel legs giving six lines', to: 'Fan-out from joining two independent one-to-many children' },
        { from: 'Concluding there are six times as many guests', to: 'Aggregating over a fanned-out result without DISTINCT' },
      ],
      bridge:
        'The seating plan makes the fan-out concrete: the six lines are not wrong as lines — each really is a valid dietary-and-travel combination — they are wrong as guests. That is exactly the situation in SQL: the joined rows are individually correct, and the aggregate over them answers a question nobody asked. The fix in both settings is the same: count the dietary notes and the travel legs separately, then bring the two summaries together.',
      limitations:
        'A wedding planner would notice six copies of one guest immediately. A database will not, and neither will a dashboard, because the inflated number is usually just large rather than absurd. The detection has to be deliberate.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'Fan-out: why two one-to-many joins multiply',
        caption: 'Order 7 has 3 items and 2 payments. The join produces 6 rows, and both totals are wrong.',
        art: `orders            order_items (3)        payments (2)
id=7              A  30.00                 P1  50.00
                  B  40.00                 P2  50.00
                  C  30.00

SELECT SUM(oi.amount), SUM(p.amount)
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
JOIN payments    p  ON p.order_id  = o.id;

RESULT OF THE JOIN: 3 x 2 = 6 rows
  item  item_amt   payment  pay_amt
  ----  --------   -------  -------
   A      30.00      P1      50.00
   A      30.00      P2      50.00
   B      40.00      P1      50.00
   B      40.00      P2      50.00
   C      30.00      P1      50.00
   C      30.00      P2      50.00

SUM(item_amt)  = 200.00   but the true item total is 100.00  (x2)
SUM(pay_amt)   = 300.00   but the true payment total is 100.00 (x3)

Each side was multiplied by the OTHER side's row count.

FIX: aggregate each child to order grain FIRST, then join the summaries.`,
      },
      {
        kind: 'table',
        title: 'The full join family',
        columns: ['Join', 'Rows kept', 'Rows produced', 'When you actually want it'],
        rows: [
          ['INNER', 'Matched pairs only', '≤ m × n', 'Decorating facts with dimension attributes'],
          ['LEFT OUTER', 'All left, padded', '≥ m', 'Reports that must show zeros'],
          ['RIGHT OUTER', 'All right, padded', '≥ n', 'Rarely — swap the tables and use LEFT instead'],
          ['FULL OUTER', 'All from both, padded', '≥ max(m, n)', 'Reconciling two systems; finding what is only in one'],
          ['CROSS', 'Every pairing', 'exactly m × n', 'Generating a complete grid, e.g. every month × every category'],
          ['SELF', 'Depends on the join used', 'Varies', 'Hierarchies, and comparing rows within one table'],
        ],
      },
      {
        kind: 'flow',
        title: 'Diagnosing a suspicious join result',
        caption: 'Run this checklist whenever a number looks too big.',
        branching: true,
        steps: [
          { label: 'Compare row counts', detail: 'Is `COUNT(*)` of the joined result larger than `COUNT(*)` of the base table? If so, something multiplied.' },
          { label: 'Compare distinct keys', detail: '`COUNT(*)` versus `COUNT(DISTINCT base.id)`. A gap means each base row appears more than once.' },
          { label: 'Identify the fanning table', detail: 'Group by the join key on each child and look for `HAVING COUNT(*) > 1`.' },
          { label: 'Decide the target grain', detail: 'What should one row of the answer mean? Usually one order, one customer, or one customer-month.' },
          { label: 'Pre-aggregate the children', detail: 'Summarise each one-to-many table to the target grain in its own CTE, then join the summaries.' },
          { label: 'Re-verify', detail: 'Row count of the result should now equal the number of entities at the target grain.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Reproduce a fan-out',
        caption: 'Join orders to order_items, then compare `COUNT(*)` with `COUNT(DISTINCT orders.id)`. The gap is the multiplication.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'A right outer join is the left outer join with operands exchanged; a full outer join is the union of both, preserving unmatched tuples from each relation padded with NULLs. A cross join is the unconstrained Cartesian product R × S of cardinality |R| · |S|. A self join is any join whose operands are the same relation under distinct aliases. When a relation R is joined to two relations S and T that are each in one-to-many relationship with it, the cardinality of the result for a given r is |S_r| · |T_r| rather than |S_r| + |T_r|, so aggregates over either child are scaled by the cardinality of the other.',

    math: {
      intuition:
        'Fan-out is multiplication, not addition, and that is the whole reason it is so destructive. Joining a parent to one child with k matching rows repeats the parent k times; joining to a second independent child with j matching rows repeats each of those k rows j times. The parent, and every column belonging to it, now appears k·j times, and any SUM of a parent-level value is inflated by exactly that factor.',
      formulas: [
        {
          latex: '|R \\bowtie_{\\theta} S| = \\sum_{r \\in R} |\\{s \\in S : \\theta(r,s)\\}|',
          name: 'Join cardinality',
          meaning: 'The number of rows a join produces is the total number of matches, not the size of either table. It can be larger or smaller than both.',
          variables: [
            { symbol: 'R, S', meaning: 'The two relations being joined' },
            { symbol: '\\theta', meaning: 'The join predicate in the ON clause' },
            { symbol: '|\\cdot|', meaning: 'Cardinality: the number of rows' },
          ],
          category: 'complexity',
        },
        {
          latex: '|R \\bowtie S \\bowtie T| = \\sum_{r \\in R} |S_r| \\cdot |T_r|',
          name: 'Fan-out with two independent children',
          meaning: 'Joining a parent to two one-to-many children multiplies their match counts. Three items and two payments give six rows, not five.',
          variables: [
            { symbol: 'S_r', meaning: 'Rows of S matching parent row r' },
            { symbol: 'T_r', meaning: 'Rows of T matching parent row r' },
          ],
          category: 'complexity',
        },
        {
          latex: '\\mathrm{SUM}_{\\text{joined}}(s) = |T_r| \\cdot \\mathrm{SUM}_{\\text{true}}(s)',
          name: 'The inflation factor',
          meaning: 'A sum over child S computed on the fanned-out result is exactly the true sum multiplied by the number of rows in the other child. The error is systematic, not random, which is why it is invisible.',
          variables: [
            { symbol: 's', meaning: 'A value from the first child table' },
            { symbol: '|T_r|', meaning: 'Number of rows in the second child for that parent' },
          ],
        },
      ],
      derivation: [
        'Take one order with items totalling 100 across 3 rows, and payments totalling 100 across 2 rows.',
        'The inner join emits one row for each (item, payment) pair, so 3 x 2 = 6 rows.',
        'Each item amount appears in 2 of those rows, once per payment, so SUM(item_amount) = 2 x 100 = 200.',
        'Each payment amount appears in 3 of those rows, once per item, so SUM(payment_amount) = 3 x 100 = 300.',
        'Both are exactly the true total multiplied by the other side’s row count — a clean, systematic error.',
        'Therefore no amount of DISTINCT on the final sum can repair it: the correct fix is to aggregate each child to order grain before joining.',
      ],
    },

    workedExample: {
      title: 'Repairing a fanned-out revenue report',
      setup:
        'A report joins customers to orders and to order_items to show, per customer, the number of orders and the total revenue. It reports 3x too many orders for customers with large baskets, and the revenue looks right. We need to understand both halves.',
      steps: [
        {
          label: 'Establish the grain of the join',
          detail:
            'customers → orders is one-to-many, and orders → order_items is one-to-many again. After both joins, one row is one order item. That is the grain, and every aggregate must be interpreted against it.',
        },
        {
          label: 'Why the order count is wrong',
          detail:
            '`COUNT(*)` counts item rows, so an order with 3 items contributes 3. `COUNT(o.id)` does not help — it also counts 3, because `o.id` is repeated, not NULL. Only `COUNT(DISTINCT o.id)` recovers the order count.',
        },
        {
          label: 'Why the revenue happens to be right',
          detail:
            '`SUM(oi.quantity * oi.unit_price)` sums an item-level value at item grain, which is correct. It is right by luck of alignment: had the report summed an order-level `order_total` column, it would have been multiplied by the item count.',
          latex: '\\mathrm{SUM}(q_i p_i) \\text{ is correct at item grain}',
        },
        {
          label: 'Add a second child and it breaks entirely',
          detail:
            'Adding a payments table to the same query makes each item row repeat once per payment. Revenue is now multiplied by the payment count, and payments are multiplied by the item count. Neither COUNT(DISTINCT) nor any other single-column fix rescues both.',
        },
        {
          label: 'The general repair: pre-aggregate to a common grain',
          detail:
            'Summarise each child in its own CTE at order grain — `SELECT order_id, SUM(quantity * unit_price) AS order_total FROM order_items GROUP BY order_id` and likewise for payments — then LEFT JOIN both summaries to orders. Each join is now one-to-one, so nothing multiplies.',
        },
        {
          label: 'Verify',
          detail:
            'The final result should have exactly one row per order (or per customer after a further GROUP BY). Compare `COUNT(*)` with `COUNT(DISTINCT o.id)`: equality is the proof that no fan-out remains.',
        },
      ],
      conclusion:
        'Pre-aggregating each one-to-many child to a shared grain before joining is the general solution, and it is worth reaching for by default rather than after a bug. COUNT(DISTINCT) patches a single symptom; restructuring to one-to-one joins removes the whole class of error and makes the query easier to read besides.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'RIGHT JOIN, and why you rarely need it',
        runnable: true,
        code: `-- These two are exactly equivalent
SELECT c.name, o.id
FROM orders AS o
RIGHT JOIN customers AS c ON c.id = o.customer_id;

SELECT c.name, o.id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;`,
        explanation:
          'RIGHT JOIN preserves the right-hand table instead of the left, so swapping the operand order converts one into the other. Most style guides pick LEFT and stay there, because a reader scanning a long FROM clause builds a mental model of "the table I started from is preserved" and a RIGHT join halfway down breaks it. SQLite only gained RIGHT JOIN in version 3.39; PostgreSQL and MySQL have always had it.',
        output: `name          id
------------  ----
Ada Okafor    10
Ada Okafor    11
Priya Nair    NULL`,
      },
      {
        language: 'sql',
        title: 'FULL OUTER JOIN, and emulating it where it is missing',
        runnable: true,
        code: `-- Modern SQLite (3.39+) and PostgreSQL
SELECT c.id AS customer_id, o.id AS order_id
FROM customers AS c
FULL OUTER JOIN orders AS o ON o.customer_id = c.id;

-- Portable emulation: LEFT union the anti-join of the other side
SELECT c.id AS customer_id, o.id AS order_id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
UNION ALL
SELECT NULL AS customer_id, o.id AS order_id
FROM orders AS o
LEFT JOIN customers AS c ON c.id = o.customer_id
WHERE c.id IS NULL;`,
        explanation:
          'A full outer join is a left join plus the right-hand rows that matched nothing, which is exactly what the emulation writes out. UNION ALL rather than UNION matters: UNION would deduplicate the whole result, which is both slower and wrong if legitimate duplicate rows exist. The classic use is reconciliation — running a full outer join between two systems’ tables and inspecting rows where either side’s key is NULL shows you precisely what is missing from each.',
        output: `customer_id  order_id
-----------  --------
1            10
1            11
7            NULL
NULL         99`,
      },
      {
        language: 'sql',
        title: 'CROSS JOIN on purpose: a complete grid with no gaps',
        runnable: true,
        code: `-- Every category x every month, with zero where there were no sales
WITH months AS (
  SELECT DISTINCT SUBSTR(order_date, 1, 7) AS month FROM orders
),
cats AS (
  SELECT DISTINCT category FROM products
),
sales AS (
  SELECT SUBSTR(o.order_date, 1, 7) AS month,
         p.category,
         SUM(oi.quantity * oi.unit_price) AS revenue
  FROM orders      AS o
  JOIN order_items AS oi ON oi.order_id = o.id
  JOIN products    AS p  ON p.id = oi.product_id
  GROUP BY 1, 2
)
SELECT g.month, g.category, COALESCE(s.revenue, 0) AS revenue
FROM (SELECT m.month, c.category FROM months AS m CROSS JOIN cats AS c) AS g
LEFT JOIN sales AS s ON s.month = g.month AND s.category = g.category
ORDER BY g.month, g.category;`,
        explanation:
          'This is the legitimate Cartesian product: building a dense grid so that a month with no sales in a category shows an explicit zero rather than being absent. Charts and time-series models both need this, because a missing row and a zero row look identical in a table but behave completely differently in a line chart or a lag calculation. Note `GROUP BY 1, 2`, which groups by the first two selected expressions — convenient in SQLite and PostgreSQL, though naming the expressions is clearer in code that others will maintain.',
        output: `month    category     revenue
-------  -----------  -------
2024-01  cables       210.00
2024-01  displays     0.00
2024-01  peripherals  890.00
2024-02  cables       142.50`,
      },
      {
        language: 'sql',
        title: 'SELF JOIN: hierarchies and within-table comparisons',
        runnable: true,
        code: `-- Each employee with their manager (LEFT so the CEO survives)
SELECT e.name AS employee, e.department, m.name AS manager
FROM employees AS e
LEFT JOIN employees AS m ON m.id = e.manager_id
ORDER BY m.name, e.name;

-- Employees who earn more than their manager
SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary
FROM employees AS e
JOIN employees AS m ON m.id = e.manager_id
WHERE e.salary > m.salary;

-- Pairs of colleagues in the same department (each pair once, not twice)
SELECT a.name AS employee_a, b.name AS employee_b, a.department
FROM employees AS a
JOIN employees AS b ON b.department = a.department AND b.id > a.id
ORDER BY a.department, a.name;`,
        explanation:
          'A self join needs two aliases so the engine can tell the two copies apart, and after that it behaves like any other join. The third query shows the standard trick for pair generation: `b.id > a.id` rather than `b.id <> a.id` yields each unordered pair exactly once and automatically excludes self-pairing, where `<>` would give every pair twice in both orders. The second query — employees earning more than their manager — is a perennial interview question and is nothing more than a self join with a comparison in WHERE.',
        output: `employee     department   manager
-----------  -----------  ----------
Dana Ortiz   sales        NULL
Ivan Petrov  sales        Dana Ortiz

employee     salary  manager      manager_salary
-----------  ------  -----------  --------------
Ivan Petrov  95000   Dana Ortiz   88000`,
      },
      {
        language: 'sql',
        title: 'Fan-out: the wrong query and the right one',
        runnable: true,
        code: `-- WRONG: orders are counted once per item
SELECT c.name,
       COUNT(*)        AS looks_like_orders,   -- actually item rows
       COUNT(o.id)     AS also_wrong,          -- o.id repeats, not NULL
       COUNT(DISTINCT o.id) AS actually_orders
FROM customers        AS c
JOIN orders           AS o  ON o.customer_id = c.id
JOIN order_items      AS oi ON oi.order_id   = o.id
GROUP BY c.id, c.name;

-- RIGHT: pre-aggregate the child to order grain, then join one-to-one
WITH order_totals AS (
  SELECT order_id,
         SUM(quantity * unit_price) AS order_total,
         COUNT(*)                   AS item_count
  FROM order_items
  GROUP BY order_id
)
SELECT c.name,
       COUNT(o.id)                       AS orders,
       COALESCE(SUM(t.order_total), 0)   AS revenue,
       COALESCE(SUM(t.item_count), 0)    AS items
FROM customers AS c
LEFT JOIN orders       AS o ON o.customer_id = c.id
LEFT JOIN order_totals AS t ON t.order_id    = o.id
GROUP BY c.id, c.name
ORDER BY revenue DESC, c.name;`,
        explanation:
          'In the first query all three counts differ and only the third is the number of orders — note particularly that `COUNT(o.id)` does not save you, because `o.id` is duplicated rather than NULL. The second query eliminates the problem rather than patching it: `order_totals` has exactly one row per order, so joining it to orders is one-to-one and nothing multiplies. Once every join in a query is one-to-one or many-to-one, ordinary COUNT and SUM are safe again, which is why pre-aggregation is worth doing by default rather than only after a bug appears.',
        output: `-- wrong
name        looks_like_orders  also_wrong  actually_orders
----------  -----------------  ----------  ---------------
Ada Okafor  14                 14          6

-- right
name        orders  revenue   items
----------  ------  --------  -----
Ada Okafor  6       2104.50   14`,
      },
      {
        language: 'sql',
        title: 'The accidental Cartesian product',
        code: `-- Missing join condition: every order paired with every customer
SELECT o.id, c.name
FROM orders AS o, customers AS c;

-- Incomplete condition on a composite key: only half the key matched
SELECT *
FROM daily_stats AS d
JOIN targets AS t ON t.region = d.region;   -- forgot AND t.month = d.month

-- Explicit and intentional
SELECT o.id, c.name
FROM orders AS o
CROSS JOIN customers AS c;`,
        explanation:
          'The first form is the old comma syntax with the condition forgotten, and it is why explicit `JOIN ... ON` is now standard practice: the condition sits next to the join and cannot silently go missing. The second is more insidious — the join looks complete but matches on only part of a composite key, so each daily row pairs with every month’s target. The symptoms are the same: a row count that is a suspiciously round multiple of what you expected, and a query that suddenly takes minutes. If you genuinely want a Cartesian product, write CROSS JOIN, so the next reader knows it was deliberate.',
        output: `-- 42 orders x 40 customers
1680 rows returned`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Reconciling a payment provider export',
        usage:
          'A FULL OUTER JOIN between internal orders and the provider’s settlement file, filtered to rows where either key is NULL, lists exactly the transactions missing from one side — the standard month-end finance query.',
      },
      {
        context: 'Inflated dashboard metrics',
        usage:
          'The most common analytics incident is a metric that doubles after someone adds a join to a new table. The cause is fan-out, and the fix is pre-aggregation, which is why mature warehouses build one model per grain.',
      },
      {
        context: 'Dense time series for forecasting',
        usage:
          'Models that use lags need a row for every period, including empty ones. A CROSS JOIN of a date spine with the entity list, left-joined to the facts, produces the gap-free grid a lag or rolling window requires.',
      },
      {
        context: 'Org charts and approval chains',
        usage:
          'Self joins answer "who reports to whom" one level at a time. Arbitrary depth needs a recursive CTE, which is the subject of SQL-011, but the single-level self join is the building block.',
      },
      {
        context: 'Deduplication and near-duplicate detection',
        usage:
          'A self join with `b.id > a.id` and a similarity condition generates candidate duplicate pairs exactly once each, which is the first step of most record-linkage pipelines.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`merge(how="outer")` is FULL OUTER, and `validate="one_to_one"` raises when the join would fan out — a guard SQL has no direct equivalent of.' },
      { tool: 'dbt', role: 'The `unique` test on a model’s key is how teams catch fan-out automatically: if the grain broke, the test fails before anyone sees the dashboard.' },
      { tool: 'Great Expectations', role: 'Row-count and uniqueness expectations on intermediate tables detect accidental multiplication in a pipeline before it reaches a metric.' },
      { tool: 'Spark', role: 'An accidental Cartesian product is fatal at scale; Spark can be configured to refuse cross joins unless `CROSS JOIN` is written explicitly.' },
    ],

    commonMistakes: [
      {
        mistake: 'Joining a parent to two one-to-many children in one query',
        why: 'The result has |S| × |T| rows per parent, so every sum over either child is multiplied by the other child’s row count. Both numbers are wrong, in different ways, and neither errors.',
        fix: 'Aggregate each child to the parent grain in its own CTE, then join the one-row-per-parent summaries. Every join is then one-to-one.',
      },
      {
        mistake: 'Reaching for SELECT DISTINCT to fix inflated row counts',
        why: 'DISTINCT removes duplicate output rows but cannot undo an inflated SUM, and it hides the structural problem so the next person reintroduces it.',
        fix: 'Find the fanning join and restructure. Use `COUNT(DISTINCT id)` as a diagnostic, not as the fix.',
      },
      {
        mistake: 'Filtering the right table of a LEFT JOIN in WHERE',
        why: 'The padded rows have NULL in that column, the comparison is UNKNOWN, and they are discarded — converting the outer join to an inner join with no error.',
        fix: 'Move the condition into ON. If you genuinely want only matched rows, write INNER JOIN so the intent is visible.',
      },
      {
        mistake: 'Joining on only part of a composite key',
        why: 'Matching region but not month pairs every daily row with every month’s target, producing a silent partial Cartesian product that looks like a normal join.',
        fix: 'List every column of the key in ON, and verify the result’s row count against the expected grain before using it.',
      },
      {
        mistake: 'Using `<>` instead of `<` when generating pairs in a self join',
        why: '`a.id <> b.id` produces each unordered pair twice, once in each order, so any count of pairs is doubled.',
        fix: 'Use `b.id > a.id`, which yields each pair exactly once and excludes self-pairing without a second condition.',
      },
      {
        mistake: 'Forgetting that SQLite before 3.39 has no RIGHT or FULL OUTER JOIN',
        why: 'The query fails with a syntax error on older builds, and the embedded SQLite inside a phone, browser or older library is frequently older than you assume.',
        fix: 'Rewrite RIGHT as LEFT with swapped operands, and emulate FULL OUTER with a LEFT JOIN unioned to the opposite anti-join.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is a Cartesian product, and how would you produce one by accident?',
        answer:
          'A Cartesian product pairs every row of one table with every row of another, giving m × n rows. You produce one deliberately with CROSS JOIN and accidentally in two main ways: using the comma syntax `FROM a, b` and forgetting the WHERE condition that was meant to join them, or writing an ON clause that matches on only part of a composite key, so each row on one side matches a whole group on the other. The symptoms are a row count that is a suspiciously round multiple of the expected one and a query that becomes dramatically slower. Legitimate uses exist — crossing a date spine with an entity list to build a dense grid with explicit zeros is the standard one — and writing CROSS JOIN explicitly is how you signal that it was intended.',
      },
      {
        level: 'intermediate',
        question: 'Why does adding a WHERE condition on the right table turn a LEFT JOIN into an INNER JOIN?',
        answer:
          'Because of the order of operations. The LEFT JOIN first produces matched rows and then pads unmatched left rows with NULL in every right-hand column. WHERE runs after that padding, so a condition such as `o.status = ’shipped’` is evaluated against NULL for every padded row, giving UNKNOWN, and WHERE keeps only TRUE — so every padded row is discarded and the only rows left are ones that matched. The join type is now indistinguishable from INNER. If the condition is meant to restrict what counts as a match, it belongs in ON, where it is applied before padding. The one exception is `WHERE right.key IS NULL`, which is deliberately selecting the padded rows — the anti-join.',
      },
      {
        level: 'ml-engineer',
        question: 'A revenue figure doubled after a colleague added a join to a shipments table. Explain what happened and how you would fix it properly.',
        answer:
          'The shipments table is one-to-many with orders, so each order that shipped in two parcels now appears twice, and every order-level or item-level amount in the query is summed twice. Revenue has not changed in the source data; the join changed the grain of the rows being summed. The wrong fixes are SELECT DISTINCT, which cannot repair an inflated SUM, and COUNT(DISTINCT), which patches counts but not sums. The right fix is to aggregate shipments to order grain first — a CTE with `SELECT order_id, COUNT(*) AS parcels, MAX(shipped_at) AS last_shipped FROM shipments GROUP BY order_id` — and join that one-row-per-order summary. To stop it recurring I would add an assertion to the pipeline that the model’s key is unique, which is what a dbt `unique` test does, so the next person who breaks the grain finds out from a failing build rather than from a stakeholder.',
        followUp:
          'A strong candidate states the general principle: every join in an analytical query should be one-to-one or many-to-one, and any one-to-many relationship should be aggregated before it is joined.',
      },
      {
        level: 'internship',
        question: 'Write a query to find all employees who earn more than their manager.',
        answer:
          '`SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary FROM employees e JOIN employees m ON m.id = e.manager_id WHERE e.salary > m.salary;`. It is a self join: the table appears twice under two aliases, `e` for the report and `m` for the manager, matched through `manager_id`. INNER JOIN is correct here rather than LEFT, because an employee with no manager cannot satisfy the comparison anyway — `NULL > salary` is UNKNOWN and would be filtered out regardless, so the outer join would only add cost. If the question were "list every employee and flag those earning more than their manager", the LEFT JOIN would be required so the top of the hierarchy still appears.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Write a query producing one row per order with the item count, the order total and the customer name, and prove it has not fanned out.',
        hint: 'Aggregate order_items to order grain in a CTE first. Then compare COUNT(*) with COUNT(DISTINCT id).',
        language: 'sql',
        starterCode: 'WITH order_totals AS (\n  SELECT order_id, COUNT(*) AS items, SUM(quantity * unit_price) AS total\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT 1;\n',
        solution:
          "WITH order_totals AS (\n  SELECT order_id,\n         COUNT(*)                   AS items,\n         SUM(quantity * unit_price) AS total\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT o.id, o.order_date, c.name AS customer,\n       COALESCE(t.items, 0) AS items,\n       ROUND(COALESCE(t.total, 0), 2) AS order_total\nFROM orders         AS o\nJOIN customers      AS c ON c.id = o.customer_id\nLEFT JOIN order_totals AS t ON t.order_id = o.id\nORDER BY o.id;\n\n-- Proof: these two numbers must be equal\nSELECT COUNT(*) AS rows, COUNT(DISTINCT id) AS distinct_orders FROM (\n  /* the query above */ SELECT o.id FROM orders o\n  LEFT JOIN order_totals t ON t.order_id = o.id\n);\n\nThe CTE collapses order_items to exactly one row per order, so the join to it is one-to-one and cannot multiply. The LEFT JOIN keeps orders that contain no items, and COALESCE turns their NULLs into zeros. The proof query is the habit worth forming: if the row count exceeds the distinct key count, something fanned out.",
      },
      {
        prompt: 'For every department, produce a row for every month in the orders data, showing 0 where no employee was hired. Use a deliberate CROSS JOIN.',
        hint: 'Build a months CTE and a departments CTE, cross join them, then LEFT JOIN the hire counts.',
        language: 'sql',
        solution:
          "WITH months AS (\n  SELECT DISTINCT SUBSTR(order_date, 1, 7) AS month FROM orders\n),\ndepts AS (\n  SELECT DISTINCT department FROM employees\n),\nhires AS (\n  SELECT department, SUBSTR(hire_date, 1, 7) AS month, COUNT(*) AS n\n  FROM employees\n  GROUP BY department, SUBSTR(hire_date, 1, 7)\n)\nSELECT d.department, m.month, COALESCE(h.n, 0) AS hires\nFROM depts AS d\nCROSS JOIN months AS m\nLEFT JOIN hires AS h ON h.department = d.department AND h.month = m.month\nORDER BY d.department, m.month;\n\nThe CROSS JOIN is the point: it manufactures every department-month combination whether or not any data exists for it, and the LEFT JOIN then attaches the counts that do exist. Without the cross join, months with no hires in a department are simply absent, which breaks line charts and any lag or moving-average calculation that assumes consecutive periods.",
      },
      {
        prompt: 'Find all pairs of products in the same category whose prices differ by less than 5, listing each pair only once.',
        hint: 'Self join on category, and use an id comparison rather than inequality to avoid duplicate pairs.',
        language: 'sql',
        solution:
          "SELECT a.name AS product_a, b.name AS product_b, a.category,\n       ROUND(ABS(a.price - b.price), 2) AS price_gap\nFROM products AS a\nJOIN products AS b\n  ON b.category = a.category\n AND b.id > a.id\n AND ABS(a.price - b.price) < 5\nORDER BY a.category, price_gap;\n\n`b.id > a.id` does two jobs: it stops a product pairing with itself, and it yields each unordered pair exactly once rather than twice in both orders. Writing `b.id <> a.id` instead would double every row, which is the standard mistake in pair-generation queries — and the doubling is easy to miss because the output still looks sensible.",
      },
      {
        prompt: 'Reconcile two views of the data: list every order id that appears in `orders` but has no rows in `order_items`, and every `order_items.order_id` that matches no order. Return one combined result with a column saying which problem it is.',
        hint: 'Two anti-joins, combined with UNION ALL. This is the portable form of a FULL OUTER JOIN reconciliation.',
        language: 'sql',
        solution:
          "SELECT 'order with no items' AS issue, o.id AS key\nFROM orders AS o\nLEFT JOIN order_items AS oi ON oi.order_id = o.id\nWHERE oi.id IS NULL\n\nUNION ALL\n\nSELECT 'item referencing a missing order' AS issue, oi.order_id AS key\nFROM order_items AS oi\nLEFT JOIN orders AS o ON o.id = oi.order_id\nWHERE o.id IS NULL\n\nORDER BY issue, key;\n\nThis is a full outer join written as two anti-joins, which is both portable and clearer about intent than a FULL OUTER JOIN with a double IS NULL filter. The first branch finds empty orders, which may be legitimate (an order created but never filled). The second finds genuine referential-integrity violations, which should be impossible if the foreign key is declared and enforced — any rows here mean enforcement is off, and in SQLite that usually means `PRAGMA foreign_keys` was never switched on.",
      },
    ],

    quiz: [
      {
        id: 'SQL-010-q1',
        type: 'mcq',
        concept: 'fan-out',
        prompt: 'An order has 3 items and 2 payments. Joining orders to both children in one query produces how many rows for that order?',
        options: ['6', '5', '3', '1'],
        answerIndex: 0,
        explanation:
          'The children multiply rather than add: every item pairs with every payment, giving 3 x 2 = 6. Any sum over either child is inflated by the other child’s row count.',
      },
      {
        id: 'SQL-010-q2',
        type: 'truefalse',
        concept: 'distinct as a fix',
        prompt: 'Adding SELECT DISTINCT repairs a SUM that was inflated by a fan-out.',
        answer: false,
        explanation:
          'DISTINCT deduplicates output rows, but the aggregate has already consumed the duplicated rows. Only restructuring the query — pre-aggregating each child — fixes the sum.',
      },
      {
        id: 'SQL-010-q3',
        type: 'code-output',
        language: 'sql',
        concept: 'left join filtered in where',
        prompt: '`customers` has 40 rows, 33 of which have at least one shipped order. How many rows does this return?',
        code: "SELECT DISTINCT c.id\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.status = 'shipped';",
        options: ['33', '40', '7', '0'],
        answerIndex: 0,
        explanation:
          'The WHERE clause discards the padded rows, because NULL = ’shipped’ is UNKNOWN, so the LEFT JOIN behaves as an INNER JOIN and only customers with a shipped order survive.',
      },
      {
        id: 'SQL-010-q4',
        type: 'match',
        concept: 'join varieties',
        prompt: 'Match each join to the task it fits best.',
        pairs: [
          { left: 'FULL OUTER JOIN', right: 'Reconciling two systems and seeing what is only in each' },
          { left: 'CROSS JOIN', right: 'Building a dense month-by-category grid with explicit zeros' },
          { left: 'SELF JOIN', right: 'Attaching each employee to their manager from one table' },
          { left: 'LEFT JOIN plus IS NULL', right: 'Listing customers who have never ordered' },
        ],
        explanation:
          'Each shape exists because a class of question needs it. Choosing the right one is usually easier than debugging the wrong one after the numbers look odd.',
      },
      {
        id: 'SQL-010-q5',
        type: 'debug',
        language: 'sql',
        concept: 'self join pairs',
        prompt: 'This returns every colleague pair twice. What is the minimal fix?',
        code: "SELECT a.name, b.name\nFROM employees a\nJOIN employees b ON b.department = a.department AND b.id <> a.id;",
        options: [
          'Change `b.id <> a.id` to `b.id > a.id`',
          'Add SELECT DISTINCT',
          'Change the JOIN to a LEFT JOIN',
          'Add `ORDER BY a.id, b.id`',
        ],
        answerIndex: 0,
        explanation:
          '`<>` admits both (a, b) and (b, a). An ordering comparison keeps exactly one of each unordered pair and still excludes self-pairing, with no deduplication cost.',
      },
      {
        id: 'SQL-010-q6',
        type: 'multi',
        concept: 'diagnosing joins',
        prompt: 'Which checks would reveal an unintended fan-out? Select all that apply.',
        options: [
          'Comparing COUNT(*) with COUNT(DISTINCT base_table.id) on the joined result',
          'Comparing the joined row count against the base table’s row count',
          'Grouping the child table by the join key and looking for counts above 1',
          'Checking that every column in SELECT has an alias',
          'Asserting that the result’s intended key is unique',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'All the useful checks compare an actual row count with the grain you intended. Aliasing is a readability concern and says nothing about cardinality.',
      },
      {
        id: 'SQL-010-q7',
        type: 'explain',
        concept: 'grain discipline',
        prompt: 'Explain why "aggregate each one-to-many child before joining" is a better default than fixing counts with COUNT(DISTINCT).',
        rubric: [
          'Notes that COUNT(DISTINCT) fixes counts but not sums or averages',
          'Explains that pre-aggregation makes every join one-to-one, removing the whole class of error',
          'Mentions that the resulting query is also easier to reason about and to test',
        ],
        sampleAnswer:
          'COUNT(DISTINCT) treats one symptom. It recovers the number of orders from a fanned-out result, but it does nothing for a SUM, an AVG or a median over the same rows, and those are silently inflated by exactly the other child’s row count. Pre-aggregating each one-to-many child into a CTE at the parent grain removes the cause: every remaining join is one-to-one or many-to-one, so ordinary COUNT and SUM are correct again and no future reader has to remember which columns need DISTINCT. It is also easier to test, because each CTE has a stated grain you can assert on — one row per order — and a broken grain then fails a uniqueness check rather than quietly changing a number on a dashboard. The general discipline is to know and state what one row means at every stage of the query.',
        explanation:
          'The examinable idea is preferring a structural fix that eliminates a class of bug over a local patch that addresses one instance of it.',
      },
    ],

    flashcards: [
      { front: 'What is fan-out?', back: 'Row multiplication from joining a parent to two one-to-many children: 3 items x 2 payments = 6 rows, and both sums are inflated.' },
      { front: 'How do you fix fan-out properly?', back: 'Pre-aggregate each child to the parent grain in its own CTE, then join the one-row-per-parent summaries so every join is one-to-one.' },
      { front: 'Why is RIGHT JOIN rarely used?', back: 'Swapping the operand order turns it into a LEFT JOIN, and keeping one direction throughout makes long FROM clauses readable.' },
      { front: 'How do you emulate FULL OUTER JOIN?', back: 'LEFT JOIN, UNION ALL, then the opposite anti-join (right LEFT JOIN left WHERE left.key IS NULL).' },
      { front: 'When is a CROSS JOIN correct?', back: 'When you deliberately need every combination — typically a date spine crossed with entities to produce a dense grid with explicit zeros.' },
      { front: 'Why `b.id > a.id` in a self join?', back: 'It yields each unordered pair exactly once and excludes self-pairing. `<>` would return every pair twice.' },
      { front: 'What turns a LEFT JOIN into an INNER JOIN?', back: 'A condition on the right table placed in WHERE: the padded rows have NULL there, the test is UNKNOWN, and they are discarded.' },
    ],

    challenge: {
      title: 'Find and fix a fan-out',
      brief:
        'Write a deliberately broken query that joins customers to orders and to order_items and reports order counts and revenue per customer. Demonstrate that it is wrong by comparing it against correct figures computed separately. Then rewrite it using pre-aggregated CTEs so that every join is one-to-one, and finish with an assertion query that returns zero rows when the grain is correct — the kind of check you would put in a pipeline.',
      language: 'sql',
      acceptanceCriteria: [
        'The broken query and the correct query are both shown, with their differing outputs',
        'The inflation factor is explained in terms of the other child’s row count',
        'The fixed version aggregates each one-to-many child to a common grain before joining',
        'An assertion query returns zero rows when the result key is unique, and is explained',
        'A comment states the grain of every CTE',
      ],
      starterCode: "-- Broken: two one-to-many joins in one query\nSELECT c.name, COUNT(*) AS orders, SUM(oi.quantity * oi.unit_price) AS revenue\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nGROUP BY c.id, c.name;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I understand INNER and LEFT joins. Teach me why joining one table to two other tables at once can silently double my numbers.',
      mustCover: [
        'A one-to-many join repeats the parent row once per child',
        'Joining two independent children multiplies rather than adds their counts',
        'Every parent-level value is then summed once per combination, inflating totals',
        'DISTINCT cannot undo an inflated SUM, because the aggregate already consumed the extra rows',
        'The fix is to aggregate each child to the parent grain first, so every join is one-to-one',
      ],
      bonusSignals: ['works through a small concrete example with numbers', 'names the inflation factor explicitly', 'mentions checking COUNT(*) against COUNT(DISTINCT key)'],
      sampleExplanation:
        'Take one order. It has three items and, separately, two payments. When you join the order to its items you get three lines, which is already a change: the order row is now repeated three times. Now join that result to the payments as well. Each of those three lines has to pair with each of the two payments, so you end up with six lines. Look at what that does to the money. The three item amounts each appear twice, so adding up the item column gives you double the true item total. The two payment amounts each appear three times, so the payment column gives you triple. Neither number is randomly wrong — each is multiplied by exactly how many rows the other side had, which is why the result looks entirely believable. Adding DISTINCT does not rescue it, because by the time you deduplicate, the sum has already added the extra copies. The fix is to stop the multiplication happening at all: total the items on their own, giving one line per order, total the payments on their own, giving one line per order, and then attach both summaries to the order. Now every join matches one row to one row, and the totals are simply the totals.',
    },
  },

  {
    id: 'SQL-011',
    domain: 'SQL',
    module: 'Advanced SQL',
    topic: 'Subqueries and CTEs',
    title: 'Subqueries and CTEs',
    slug: 'subqueries-and-ctes',
    difficulty: 4,
    estimatedMinutes: 40,
    prerequisites: ['SQL-010'],
    related: ['SQL-005', 'SQL-007', 'SQL-008', 'SQL-009'],
    tags: ['subquery', 'cte', 'with', 'exists', 'correlated', 'recursive', 'hierarchy'],

    learningObjectives: [
      'Distinguish scalar, IN-list, EXISTS and correlated subqueries and choose the right one',
      'Rewrite a nested query as a CTE and explain what readability and reuse you gain',
      'Explain how a correlated subquery is evaluated and when it is worth rewriting as a join',
      'Write a recursive CTE to walk a hierarchy such as an employee reporting chain',
      'Recognise when a derived table, a CTE and a window function each solve the problem better',
    ],

    terminology: [
      {
        term: 'Subquery',
        definition:
          'A SELECT nested inside another statement. It may appear in SELECT (scalar), in FROM (a derived table), or in WHERE (as a scalar, an IN list or an EXISTS test).',
        simple: 'A query inside a query.',
      },
      {
        term: 'Scalar subquery',
        definition:
          'A subquery guaranteed to return at most one row and one column, usable anywhere a single value is expected. Returning more than one row is a runtime error in PostgreSQL.',
        simple: 'A little query that produces exactly one value.',
      },
      {
        term: 'Correlated subquery',
        definition:
          'A subquery that references a column from the outer query, so it must be conceptually re-evaluated for each outer row rather than computed once.',
        simple: 'An inner query that depends on the row the outer query is currently looking at.',
      },
      {
        term: 'Derived table',
        definition:
          'A subquery in the FROM clause, treated as an anonymous table for the duration of the statement. Must be aliased in most dialects.',
        simple: 'A temporary table made on the fly inside FROM.',
      },
      {
        term: 'CTE (Common Table Expression)',
        definition:
          'A named subquery declared in a WITH clause at the top of a statement, referenceable by name one or more times in the query that follows.',
        simple: 'A named step you define first and use below.',
      },
      {
        term: 'Recursive CTE',
        definition:
          'A CTE that references itself: an anchor query provides the starting rows and a recursive query repeatedly joins back to the accumulated result until it produces nothing new.',
        simple: 'A CTE that keeps going one level deeper until there is nothing left.',
      },
      {
        term: 'EXISTS',
        definition:
          'A predicate that is TRUE when its correlated subquery returns at least one row. It never evaluates the projection, so `SELECT 1` and `SELECT *` are equivalent inside it.',
        simple: 'Asks only whether any matching row exists.',
      },
    ],

    simpleExplanation:
      "Every query returns a table, which means a query can go anywhere a table can go — and that one fact gives you subqueries. You can put a query in WHERE to compare against something computed elsewhere (“products priced above the overall average”), in FROM to build an intermediate table and query that (“first total each order, then average those totals”), or in SELECT to fetch one related value per row. Some subqueries refer back to the outer row they are being evaluated for — those are called correlated, and conceptually they run once per outer row, which is both powerful and a performance trap. The problem with all of this is readability: nest three subqueries and nobody, including you next month, can follow it. A CTE fixes that. Writing `WITH order_totals AS (...)` at the top gives the intermediate result a name, so the query below reads as a sequence of named steps instead of an onion. The same syntax, with the word RECURSIVE, also lets a query call itself — which is how you walk a chain of managers or a tree of categories of unknown depth.",

    whyItExists:
      'Many questions are layered: they need a value computed from the whole table before individual rows can be judged, or they need an intermediate result at a different grain. Without nesting you would have to run several queries and stitch them together in application code, losing the ability to filter, join and aggregate the intermediate result inside the engine.',

    analogy: {
      scenario:
        'Think about how a recipe is written. A bad recipe is one long sentence: "combine the thing you get by whisking the eggs you separated from the whites you beat until stiff with the mixture you made by melting the chocolate you chopped". A good recipe names its intermediate results first — "1. Make the meringue. 2. Make the ganache. 3. Fold the meringue into the ganache" — and each named step can be referred to later, or even used twice.',
      mapping: [
        { from: 'The single impenetrable sentence', to: 'Deeply nested subqueries' },
        { from: 'A named preparatory step, e.g. "the meringue"', to: 'A CTE declared in WITH' },
        { from: 'Using the meringue twice in the same dish', to: 'Referencing one CTE from two places in the query' },
        { from: 'A step that says "taste and adjust for this particular batch"', to: 'A correlated subquery, re-evaluated per outer row' },
        { from: 'A step that says "reduce until it coats the spoon", repeating until a condition', to: 'A recursive CTE, iterating until no new rows appear' },
        { from: 'The finished dish', to: 'The final SELECT that consumes the named steps' },
      ],
      bridge:
        'Naming intermediate results is not decoration in either setting — it is what makes a complex thing checkable. You can taste the meringue on its own, and you can run a CTE on its own to confirm its row count and grain before the rest of the query depends on it. That debuggability is the main practical argument for CTEs over nesting, ahead of any question of performance.',
      limitations:
        'A recipe’s steps happen in the written order. A CTE is not necessarily materialised or executed in order — most engines inline it into the surrounding query and optimise the whole thing together, so a CTE is a naming device, not a scheduling instruction.',
    },

    visuals: [
      {
        kind: 'table',
        title: 'Where a subquery can appear, and what it must return',
        columns: ['Position', 'Example', 'Must return', 'Typical use'],
        rows: [
          ['SELECT (scalar)', '`(SELECT AVG(price) FROM products)`', 'One row, one column', 'A constant to compare every row against'],
          ['FROM (derived table)', '`FROM (SELECT ... ) AS t`', 'Any table', 'Changing grain before aggregating again'],
          ['WHERE with IN', '`WHERE id IN (SELECT ...)`', 'One column, any rows', 'Membership — unsafe with NULLs when negated'],
          ['WHERE with EXISTS', '`WHERE EXISTS (SELECT 1 ...)`', 'Anything; only existence matters', 'Semi-join and anti-join; NULL-safe'],
          ['WHERE comparison', '`WHERE price > (SELECT AVG(price) ...)`', 'Exactly one value', 'Above/below an aggregate'],
          ['WITH (CTE)', '`WITH t AS (SELECT ...)`', 'Any table, named', 'Naming steps, reuse, recursion'],
        ],
      },
      {
        kind: 'compare',
        title: 'Nested subqueries versus CTEs',
        caption: 'Usually the same plan. Very different to read and to debug.',
        left: {
          heading: 'Nested subqueries',
          points: [
            'Read inside-out, which is not how anyone reads',
            'The same subquery must be repeated if needed twice',
            'Hard to test a middle layer in isolation',
            'Deep nesting quickly exceeds what a reviewer will check',
            'No recursion',
          ],
        },
        right: {
          heading: 'CTEs with WITH',
          points: [
            'Read top to bottom as named steps',
            'Defined once, referenced many times',
            'Each CTE can be run alone to check its grain and row count',
            'Reviewable: each step has a name stating its intent',
            'RECURSIVE enables hierarchy traversal',
          ],
        },
      },
      {
        kind: 'flow',
        title: 'How a recursive CTE runs',
        caption: 'Walking an employee reporting chain downwards from the top.',
        steps: [
          { label: 'Anchor query', detail: 'Select the starting rows — employees with no manager — and label them level 1.' },
          { label: 'Recursive query', detail: 'Join `employees` to the rows produced on the previous pass, matching manager_id to the previous level’s id.' },
          { label: 'Accumulate', detail: 'The new rows are added to the result and become the input for the next pass.' },
          { label: 'Repeat', detail: 'Each pass descends one level, incrementing the level counter.' },
          { label: 'Terminate', detail: 'When a pass produces no new rows, recursion stops and the accumulated result is returned.' },
          { label: 'Guard', detail: 'A cycle in the data would never terminate, so production queries add a depth limit or track the visited path.' },
        ],
      },
      {
        kind: 'widget',
        title: 'Build a query in named steps',
        caption: 'Write a CTE that totals each order, then run just the CTE with a SELECT to check its row count before using it.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'A subquery is a SELECT expression nested within another SQL statement, evaluated as a relation. An uncorrelated subquery references no outer columns and may be evaluated once; a correlated subquery references at least one outer column and is semantically evaluated once per candidate outer tuple, though optimisers commonly rewrite it as a semi-join or anti-join. A common table expression is a named subquery bound in a WITH clause and visible to the statement that follows; a recursive CTE consists of an anchor term unioned with a recursive term that references the CTE itself, evaluated to a fixed point.',

    workedExample: {
      title: 'Second-highest salary, four ways',
      setup:
        'The archetypal interview question: find the second-highest salary in `employees`. It looks trivial and it is a genuinely good question, because every approach exposes a different edge case — ties, fewer than two distinct salaries, and NULLs.',
      steps: [
        {
          label: 'Approach 1: ORDER BY with OFFSET',
          detail:
            '`SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1`. DISTINCT is essential: without it, two people on the top salary would make the "second" row still the top salary. Returns no rows at all when there is only one distinct salary, which may or may not be what the caller wants.',
        },
        {
          label: 'Approach 2: the maximum below the maximum',
          detail:
            '`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)`. An uncorrelated scalar subquery computed once. This returns NULL rather than no rows when there is no second salary, which is often preferable because the caller always gets exactly one row.',
          latex: 's_{(2)} = \\max\\{s : s < \\max(s)\\}',
        },
        {
          label: 'Approach 3: a correlated count',
          detail:
            '`SELECT DISTINCT salary FROM employees e WHERE 1 = (SELECT COUNT(DISTINCT salary) FROM employees x WHERE x.salary > e.salary)`. This generalises to Nth highest by changing 1 to N-1, but it is conceptually O(n²) and the worst performer of the four.',
        },
        {
          label: 'Approach 4: a window function',
          detail:
            '`WITH r AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk FROM employees) SELECT DISTINCT salary FROM r WHERE rk = 2`. DENSE_RANK treats tied salaries as one rank, which matches what "second-highest salary" normally means. Window functions are the subject of SQL-012.',
        },
        {
          label: 'Decide which to ship',
          detail:
            'Approach 2 for a one-off answer: shortest, clearest, one row guaranteed. Approach 4 when the requirement will generalise to "top N per department", because only the window version extends cleanly. Approach 3 is worth knowing to explain in an interview and worth avoiding in production.',
        },
      ],
      conclusion:
        'The real content of this question is not the SQL but the edge cases: are ties one salary or two, what should happen when there is no second salary, and does NULL count. A candidate who asks those questions before writing anything is demonstrating exactly the judgement the question is designed to test.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'Scalar and IN subqueries',
        runnable: true,
        code: `-- Scalar: compare each row against a value computed over the whole table
SELECT name, category, price,
       ROUND(price - (SELECT AVG(price) FROM products), 2) AS vs_average
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price DESC;

-- IN: membership in a set computed by another query
SELECT id, name, country
FROM customers
WHERE id IN (
  SELECT customer_id FROM orders WHERE status = 'cancelled'
);`,
        explanation:
          'The scalar subquery is uncorrelated — it references nothing from the outer query — so the engine evaluates it once and reuses the value, which is why it is cheap despite appearing inside a per-row comparison. The IN form is a semi-join: it keeps an outer row if at least one inner row matches, and it never duplicates the outer row even when several inner rows match, which is precisely the difference between IN and an INNER JOIN on the same condition.',
        output: `name        category  price  vs_average
----------  --------  -----  ----------
4K Monitor  displays  349.0  272.58

id  name        country
--  ----------  -------
2   Ben Torres  Spain`,
      },
      {
        language: 'sql',
        title: 'EXISTS and NOT EXISTS: correlated existence tests',
        runnable: true,
        code: `-- Customers with at least one shipped order
SELECT c.id, c.name
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.id AND o.status = 'shipped'
);

-- Customers who have never ordered anything (NULL-safe anti-join)
SELECT c.id, c.name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o WHERE o.customer_id = c.id
);`,
        explanation:
          'The `o.customer_id = c.id` reference makes these correlated: the inner query depends on the outer row. EXISTS stops at the first matching row rather than counting them all, which makes it the right way to express "has at least one" — `COUNT(*) > 0` would count every match unnecessarily. The projection inside is irrelevant, so `SELECT 1` is conventional. NOT EXISTS is the robust anti-join: unlike NOT IN, a NULL anywhere in the inner query cannot poison the predicate.',
        output: `id  name
--  ----------
1   Ada Okafor
3   Chen Wei

id  name
--  ------------
7   Priya Nair
19  Tom Halloran`,
      },
      {
        language: 'sql',
        title: 'Derived table versus CTE: the same query twice',
        runnable: true,
        code: `-- Derived table: read it inside-out
SELECT ROUND(AVG(order_total), 2) AS avg_order_value
FROM (
  SELECT order_id, SUM(quantity * unit_price) AS order_total
  FROM order_items
  GROUP BY order_id
) AS t;

-- CTE: read it top to bottom
WITH order_totals AS (
  SELECT order_id, SUM(quantity * unit_price) AS order_total
  FROM order_items
  GROUP BY order_id
)
SELECT ROUND(AVG(order_total), 2) AS avg_order_value
FROM order_totals;`,
        explanation:
          'Both compute the average order value correctly, by first collapsing items to one row per order and only then averaging — averaging `unit_price` directly would weight by basket size instead of by order, which is the mistake from SQL-007. The CTE version is identical in meaning and usually identical in plan, but it can be developed incrementally: run `SELECT * FROM order_totals LIMIT 5` first, confirm the grain is one row per order, and only then write the outer query.',
        output: `avg_order_value
---------------
187.34`,
      },
      {
        language: 'sql',
        title: 'Multiple CTEs, one referencing another',
        runnable: true,
        code: `WITH order_totals AS (
  SELECT order_id, SUM(quantity * unit_price) AS order_total
  FROM order_items
  GROUP BY order_id
),
customer_stats AS (
  SELECT o.customer_id,
         COUNT(*)              AS orders,
         SUM(t.order_total)    AS revenue,
         AVG(t.order_total)    AS avg_order,
         MAX(o.order_date)     AS last_order
  FROM orders AS o
  JOIN order_totals AS t ON t.order_id = o.id
  WHERE o.status <> 'cancelled'
  GROUP BY o.customer_id
)
SELECT c.name, c.country,
       COALESCE(s.orders, 0)             AS orders,
       ROUND(COALESCE(s.revenue, 0), 2)  AS revenue,
       ROUND(s.avg_order, 2)             AS avg_order,
       COALESCE(s.last_order, 'never')   AS last_order
FROM customers AS c
LEFT JOIN customer_stats AS s ON s.customer_id = c.id
ORDER BY revenue DESC, c.name;`,
        explanation:
          'Each CTE has a stated grain: `order_totals` is one row per order, `customer_stats` is one row per customer who has a non-cancelled order. Because both are already collapsed, the final LEFT JOIN is one-to-one and cannot fan out — the structural fix from SQL-010, expressed readably. The LEFT JOIN plus COALESCE keeps customers with no qualifying orders in the report showing zeros, which an INNER JOIN would have removed silently.',
        output: `name        country  orders  revenue   avg_order  last_order
----------  -------  ------  --------  ---------  ----------
Ada Okafor  Nigeria  6       2104.50   350.75     2024-03-27
Priya Nair  India    0       0.00                 never`,
      },
      {
        language: 'sql',
        title: 'Recursive CTE: walking the reporting hierarchy',
        runnable: true,
        code: `WITH RECURSIVE chain AS (
  -- Anchor: everyone with no manager is at level 1
  SELECT id, name, manager_id, department, 1 AS level, name AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive step: attach each employee to the level above
  SELECT e.id, e.name, e.manager_id, e.department,
         c.level + 1,
         c.path || ' > ' || e.name
  FROM employees AS e
  JOIN chain AS c ON e.manager_id = c.id
  WHERE c.level < 20            -- guard against a cycle in the data
)
SELECT level, name, department, path
FROM chain
ORDER BY path;`,
        explanation:
          'The anchor supplies the starting rows and the recursive term joins the table back to whatever the previous pass produced, descending one level per pass until a pass returns nothing. The accumulated `path` string is what turns the result into a readable org chart, and `level` gives you depth for indentation or filtering. The depth guard matters: if the data ever contains a cycle — two employees managing each other, which no foreign key prevents — the recursion never terminates, and a bounded level is the simplest defence. PostgreSQL uses the same syntax; note that in PostgreSQL `WITH RECURSIVE` is required while SQLite accepts it and also tolerates plain WITH for recursive queries.',
        output: `level  name          department  path
-----  ------------  ----------  --------------------------------
1      Dana Ortiz    sales       Dana Ortiz
2      Ivan Petrov   sales       Dana Ortiz > Ivan Petrov
3      Mei Tanaka    sales       Dana Ortiz > Ivan Petrov > Mei Tanaka`,
      },
      {
        language: 'sql',
        title: 'Recursive CTE as a generator: a gap-free date spine',
        runnable: true,
        code: `WITH RECURSIVE months(month) AS (
  SELECT '2024-01'
  UNION ALL
  SELECT CASE
           WHEN SUBSTR(month, 6, 2) = '12'
           THEN CAST(CAST(SUBSTR(month, 1, 4) AS INTEGER) + 1 AS TEXT) || '-01'
           ELSE SUBSTR(month, 1, 5) ||
                SUBSTR('0' || CAST(CAST(SUBSTR(month, 6, 2) AS INTEGER) + 1 AS TEXT), -2)
         END
  FROM months
  WHERE month < '2024-12'
)
SELECT m.month, COALESCE(COUNT(o.id), 0) AS orders
FROM months AS m
LEFT JOIN orders AS o ON SUBSTR(o.order_date, 1, 7) = m.month
GROUP BY m.month
ORDER BY m.month;`,
        explanation:
          'Recursion is not only for hierarchies — it generates sequences too. Here it manufactures every month of 2024 so that months with no orders appear with a count of zero rather than being absent, which is exactly the dense-grid requirement from SQL-010, built without a separate calendar table. In PostgreSQL this is far simpler: `generate_series(’2024-01-01’::date, ’2024-12-01’::date, ’1 month’)` does it in one call, and the recursive version is the portable fallback for engines without a series generator.',
        output: `month    orders
-------  ------
2024-01  9
2024-02  14
2024-03  17
2024-04  0`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Multi-step feature pipelines',
        usage:
          'A feature query typically stacks CTEs: filter the event window, aggregate per user, join to labels, then filter again. Each step is a named CTE that can be unit-tested by running it alone.',
      },
      {
        context: 'Category and org hierarchies',
        usage:
          'E-commerce category trees and staff reporting lines are stored with a parent id and traversed with recursive CTEs — "all descendants of Electronics" is a single query rather than a loop in application code.',
      },
      {
        context: 'Cohort and funnel analysis',
        usage:
          'Defining a cohort in one CTE and their subsequent behaviour in another, then joining, is the standard shape. Trying to express it with nested subqueries produces something no reviewer can check.',
      },
      {
        context: 'Graph and path queries',
        usage:
          'Recursive CTEs handle friend-of-a-friend traversal, bill-of-materials explosion and dependency resolution — anything with an unbounded chain — without leaving the database.',
      },
    ],

    projectConnections: [
      { tool: 'dbt', role: 'A dbt model is essentially a named CTE promoted to a table or view, with the same argument for it: naming intermediate steps makes them testable.' },
      { tool: 'pandas', role: 'Chained assignments and `.pipe()` play the CTE role; an intermediate DataFrame you can inspect is the same debugging affordance.' },
      { tool: 'SQLAlchemy', role: '`select(...).cte("order_totals")` builds a real CTE, and `.exists()` builds an EXISTS predicate with correct correlation.' },
      { tool: 'PostgreSQL 12+', role: 'CTEs are inlined by default rather than always materialised; `MATERIALIZED` and `NOT MATERIALIZED` let you override the optimiser when it matters.' },
    ],

    commonMistakes: [
      {
        mistake: 'Using a scalar subquery that can return more than one row',
        why: 'PostgreSQL raises "more than one row returned by a subquery used as an expression". SQLite silently takes the first row, so the query returns a plausible wrong answer.',
        fix: 'Guarantee singularity with an aggregate, a LIMIT 1 plus a deterministic ORDER BY, or by restructuring as a join.',
      },
      {
        mistake: 'Using NOT IN with a subquery that can produce NULL',
        why: 'One NULL makes the predicate UNKNOWN for every row, so the query returns nothing and an empty result looks like a legitimate answer.',
        fix: 'Use NOT EXISTS, which is NULL-safe, or add `WHERE col IS NOT NULL` inside the subquery.',
      },
      {
        mistake: 'Writing a correlated subquery in SELECT that runs for every row',
        why: 'A per-row lookup against a large table can be orders of magnitude slower than one join, particularly without an index on the correlation column.',
        fix: 'Rewrite as a join to a pre-aggregated CTE, or as a window function. Check the plan; modern optimisers decorrelate some of these but not all.',
      },
      {
        mistake: 'Assuming a CTE is materialised and therefore computed once',
        why: 'Most engines inline a CTE into the surrounding query, so a CTE referenced twice may be executed twice, and a CTE is not a barrier to predicate pushdown.',
        fix: 'Do not rely on materialisation for performance. In PostgreSQL use `MATERIALIZED` explicitly if you need it; otherwise write to a temporary table when reuse is genuinely expensive.',
      },
      {
        mistake: 'Writing a recursive CTE with no termination guard',
        why: 'A cycle in the data — two employees managing each other — makes the recursion run for ever, or until the engine’s limit is hit and the query fails after consuming a great deal of memory.',
        fix: 'Bound the depth with `WHERE level < n`, or track the visited path and exclude rows already on it. Treat any hierarchy as potentially cyclic unless a constraint prevents it.',
      },
      {
        mistake: 'Forgetting to alias a derived table',
        why: 'PostgreSQL requires an alias for a subquery in FROM and reports "subquery in FROM must have an alias", which stops the query outright.',
        fix: 'Always alias: `FROM (SELECT ...) AS t`. SQLite does not require it, which makes this another portability trap.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between a correlated and an uncorrelated subquery?',
        answer:
          'An uncorrelated subquery references nothing from the outer query, so it can be evaluated once and its result reused for every outer row — `(SELECT AVG(price) FROM products)` is the classic case. A correlated subquery references an outer column, so semantically it must be re-evaluated for each candidate outer row: `EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)` cannot be computed without knowing which customer is being considered. The performance implication is that a correlated subquery is conceptually a nested loop, though modern optimisers frequently rewrite EXISTS and IN forms into semi-joins or hash joins, so the naive O(n²) reading is often pessimistic. The way to know is to read the plan rather than to guess.',
      },
      {
        level: 'intermediate',
        question: 'When would you use a CTE rather than a subquery, and does it make the query faster?',
        answer:
          'Use a CTE when the query has more than one logical step, when an intermediate result is needed twice, or when recursion is required. The main benefit is readability and debuggability: named steps read top to bottom, each can be run in isolation to verify its grain and row count, and a reviewer can follow it. It generally does not make the query faster. In PostgreSQL before version 12, CTEs were always materialised, which acted as an optimisation fence and sometimes helped and sometimes hurt; from 12 onwards they are inlined by default, with `MATERIALIZED` available to force the old behaviour. SQLite has always inlined them where it can. So a CTE is a naming construct, and treating it as a performance hint is a mistake in both directions.',
        followUp:
          'A strong answer mentions that the inlining change in PostgreSQL 12 broke some queries that had relied on CTEs as an optimisation fence, which is a good illustration of why undocumented performance assumptions are fragile.',
      },
      {
        level: 'internship',
        question: 'Find the second-highest salary in the employees table.',
        answer:
          'The compact version is `SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)`: the inner scalar subquery finds the top salary and the outer takes the largest strictly below it. It returns NULL rather than no rows when there is no second distinct salary, which is usually the better behaviour because the caller always gets one row. The alternative `SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1` is equally valid, and DISTINCT is essential there — without it, two employees sharing the top salary would make row two the top salary again. Before writing either I would ask what "second-highest" means when there are ties, since that decides between DENSE_RANK and ROW_NUMBER semantics, and whether NULL salaries can occur.',
        followUp:
          'Asking about ties before writing code is the signal interviewers are actually looking for; jumping straight to LIMIT 1 OFFSET 1 without DISTINCT is the commonest failure.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you find all employees beneath a given manager, at any depth?',
        answer:
          'A recursive CTE. The anchor selects the manager’s direct reports (or the manager themselves, depending on whether they should be included), and the recursive term joins `employees` to the rows produced on the previous pass, matching `manager_id` to the previous level’s `id`. Each pass descends one level and recursion stops when a pass adds no new rows. Two practical points: carry a `level` column so you can report depth or limit it, and add a termination guard, because a cycle in the data would otherwise loop for ever and no foreign key prevents two employees managing each other. If this query runs constantly — for permission checks, say — the alternative is to denormalise the hierarchy into a closure table storing every ancestor-descendant pair, trading write cost for constant-time reads.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Find every product whose price is above the average price of its own category.',
        hint: 'The comparison value differs per row, so the subquery must reference the outer row — or you can pre-aggregate per category in a CTE.',
        language: 'sql',
        starterCode: '-- Two approaches: a correlated subquery, and a CTE join\n',
        solution:
          'WITH category_avg AS (\n  SELECT category, AVG(price) AS avg_price\n  FROM products\n  GROUP BY category\n)\nSELECT p.name, p.category, p.price, ROUND(a.avg_price, 2) AS category_avg\nFROM products AS p\nJOIN category_avg AS a ON a.category = p.category\nWHERE p.price > a.avg_price\nORDER BY p.category, p.price DESC;\n\n-- Correlated equivalent\nSELECT name, category, price\nFROM products AS p\nWHERE price > (SELECT AVG(price) FROM products AS x WHERE x.category = p.category);\n\nBoth are correct. The CTE version computes each category average once and joins, which scales better and lets you display the average alongside the price; the correlated version is shorter but conceptually recomputes the average per row, and only a good optimiser saves it. In SQL-012 you will see a third form using a window function, `AVG(price) OVER (PARTITION BY category)`, which needs no join at all.',
      },
      {
        prompt: 'Find customers who have ordered from every product category. Explain the shape of the solution before writing it.',
        hint: '"For all X" is usually expressed as "there is no X for which not...". Two nested NOT EXISTS.',
        language: 'sql',
        solution:
          "SELECT c.id, c.name\nFROM customers AS c\nWHERE NOT EXISTS (\n  SELECT 1 FROM (SELECT DISTINCT category FROM products) AS cat\n  WHERE NOT EXISTS (\n    SELECT 1\n    FROM orders      AS o\n    JOIN order_items AS oi ON oi.order_id = o.id\n    JOIN products    AS p  ON p.id = oi.product_id\n    WHERE o.customer_id = c.id AND p.category = cat.category\n  )\n);\n\nSQL has no FOR ALL quantifier, so universal statements are expressed by double negation: a customer qualifies if there is no category that they have not ordered from. This is called relational division, and it is worth recognising by shape because the alternative formulation — `GROUP BY c.id HAVING COUNT(DISTINCT p.category) = (SELECT COUNT(DISTINCT category) FROM products)` — is shorter, usually faster, and easier to read. Knowing both, and knowing why they agree, is what the question is really testing.",
      },
      {
        prompt: 'Using a recursive CTE, list every employee with their depth in the reporting hierarchy and the full chain of names from the top down.',
        hint: 'Anchor on employees with no manager; accumulate a path string and a level counter in the recursive term.',
        language: 'sql',
        solution:
          "WITH RECURSIVE chain AS (\n  SELECT id, name, manager_id, 1 AS level, name AS path\n  FROM employees\n  WHERE manager_id IS NULL\n  UNION ALL\n  SELECT e.id, e.name, e.manager_id, c.level + 1, c.path || ' > ' || e.name\n  FROM employees AS e\n  JOIN chain AS c ON e.manager_id = c.id\n  WHERE c.level < 20\n)\nSELECT level, name, path FROM chain ORDER BY path;\n\nThe anchor establishes the roots, the recursive term descends one level per pass, and the query stops when a pass adds nothing. Two details earn their place: `path` makes the output readable and sortable into tree order, and the `level < 20` guard prevents an infinite loop if the data ever contains a cycle. Note that any employee whose manager_id points to a non-existent id will never be reached by the recursion and will silently be missing from the result — worth checking with an anti-join before trusting the output.",
      },
      {
        prompt: 'Compute month-over-month order growth as a percentage, using CTEs and a self join.',
        hint: 'Aggregate per month in one CTE, then join that CTE to itself offset by one month. A window function would be cleaner — note why.',
        language: 'sql',
        solution:
          "WITH monthly AS (\n  SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS orders\n  FROM orders\n  GROUP BY SUBSTR(order_date, 1, 7)\n),\nnumbered AS (\n  SELECT month, orders,\n         ROW_NUMBER() OVER (ORDER BY month) AS rn\n  FROM monthly\n)\nSELECT curr.month,\n       curr.orders,\n       prev.orders AS prev_orders,\n       ROUND(100.0 * (curr.orders - prev.orders) / prev.orders, 1) AS pct_change\nFROM numbered AS curr\nLEFT JOIN numbered AS prev ON prev.rn = curr.rn - 1\nORDER BY curr.month;\n\nThe self join on a row number is the pre-window-function way to reach the previous row, and it is worth writing once to understand what LAG does. Two details: `100.0 *` forces floating-point arithmetic, because integer division would truncate every percentage to zero, and the LEFT JOIN keeps the first month with a NULL change rather than dropping it. In SQL-012 this whole query collapses to `LAG(orders) OVER (ORDER BY month)`, which is both shorter and immune to gaps in the month sequence.",
      },
    ],

    quiz: [
      {
        id: 'SQL-011-q1',
        type: 'mcq',
        concept: 'correlation',
        prompt: 'Which subquery is correlated?',
        options: [
          '`SELECT 1 FROM orders o WHERE o.customer_id = c.id`',
          '`SELECT AVG(price) FROM products`',
          '`SELECT customer_id FROM orders WHERE status = ’shipped’`',
          '`SELECT MAX(salary) FROM employees`',
        ],
        answerIndex: 0,
        explanation:
          'It references `c.id` from the outer query, so it cannot be evaluated without knowing the current outer row. The others depend on nothing outside themselves and can be computed once.',
      },
      {
        id: 'SQL-011-q2',
        type: 'truefalse',
        concept: 'cte performance',
        prompt: 'Wrapping part of a query in a CTE guarantees it will be computed only once.',
        answer: false,
        explanation:
          'Most engines inline CTEs into the surrounding query, so one referenced twice may be executed twice. PostgreSQL 12+ inlines by default and offers MATERIALIZED to force the older behaviour.',
      },
      {
        id: 'SQL-011-q3',
        type: 'order',
        concept: 'recursive cte',
        prompt: 'Order the steps by which a recursive CTE is evaluated.',
        items: [
          'The anchor query produces the initial rows',
          'The recursive term joins the table to the rows from the previous pass',
          'New rows are added to the accumulated result',
          'The new rows become the input to the next pass',
          'A pass produces no new rows and recursion stops',
        ],
        explanation:
          'Each pass descends one level. Because termination depends on a pass producing nothing new, a cycle in the data loops for ever unless a depth guard is written.',
      },
      {
        id: 'SQL-011-q4',
        type: 'code-output',
        language: 'sql',
        concept: 'scalar subqueries',
        prompt: 'In PostgreSQL, what happens when the subquery returns three rows?',
        code: 'SELECT name, (SELECT id FROM orders WHERE customer_id = customers.id) AS an_order\nFROM customers;',
        options: [
          'An error: more than one row returned by a subquery used as an expression',
          'The three ids are returned as a list',
          'The first id is returned silently',
          'The query returns no rows',
        ],
        answerIndex: 0,
        explanation:
          'A scalar subquery must return at most one row. PostgreSQL raises an error; SQLite silently takes one row, which produces a plausible but arbitrary answer — the more dangerous behaviour.',
      },
      {
        id: 'SQL-011-q5',
        type: 'multi',
        concept: 'choosing a construct',
        prompt: 'When is a CTE clearly the right choice over a nested subquery? Select all that apply.',
        options: [
          'The intermediate result is needed in two places',
          'The query has several logical steps you want named',
          'You need recursion to walk a hierarchy',
          'You want to guarantee the step is computed only once',
          'You want to check the intermediate grain by running the step alone',
        ],
        answerIndices: [0, 1, 2, 4],
        explanation:
          'Reuse, readability, recursion and testability are all genuine. Guaranteed single evaluation is not — that depends on the engine’s inlining behaviour.',
      },
      {
        id: 'SQL-011-q6',
        type: 'debug',
        language: 'sql',
        concept: 'not in with nulls',
        prompt: 'This returns no rows even though several products have never been ordered. Why?',
        code: 'SELECT id, name FROM products\nWHERE id NOT IN (SELECT product_id FROM order_items);',
        options: [
          'Some `order_items.product_id` values are NULL, making the predicate UNKNOWN for every row',
          'NOT IN cannot be used with a subquery',
          'The subquery needs a GROUP BY',
          '`products.id` must be cast to match the subquery type',
        ],
        answerIndex: 0,
        explanation:
          'NOT IN expands into a chain of `<>` comparisons, and a NULL makes one of them UNKNOWN, so the conjunction can never be TRUE. NOT EXISTS is the NULL-safe alternative.',
      },
      {
        id: 'SQL-011-q7',
        type: 'explain',
        concept: 'structuring complex queries',
        prompt: 'A colleague sends you a query with four levels of nested subqueries and asks you to review it. Explain how you would restructure it and why that helps.',
        rubric: [
          'Proposes converting the nesting into sequential named CTEs',
          'Explains that each CTE can be run alone to verify grain and row count',
          'Notes that naming the steps documents intent for the reviewer and for future readers',
        ],
        sampleAnswer:
          'I would rewrite it as a chain of CTEs, one per logical step, each with a name stating what it produces — `filtered_orders`, `order_totals`, `customer_stats` — so the query reads top to bottom instead of inside out. That is not cosmetic. Each CTE can be executed on its own, so I can check that `order_totals` really has one row per order before anything downstream depends on it, and if a number is wrong I can bisect the query rather than reason about the whole thing at once. It also makes review possible: a reviewer can check each step against its stated intent, whereas four levels of nesting force them to hold the entire structure in their head. Performance is usually unchanged, because engines inline CTEs, so this is a readability and correctness argument rather than a speed one — though queries you can understand do tend to be the ones whose bugs get found.',
        explanation:
          'The examinable idea is that naming intermediate results makes a query testable and reviewable, which matters more than the micro-optimisation people usually ask about first.',
      },
    ],

    flashcards: [
      { front: 'What makes a subquery correlated?', back: 'It references a column from the outer query, so it must be evaluated per outer row rather than once.' },
      { front: 'Why prefer NOT EXISTS over NOT IN?', back: 'NOT IN returns nothing at all if the subquery yields a single NULL. NOT EXISTS gives a definite answer regardless.' },
      { front: 'What is a CTE for?', back: 'Naming an intermediate result so a query reads as steps, can be reused, can be tested alone, and can recurse.' },
      { front: 'Does a CTE make a query faster?', back: 'Generally no. Engines usually inline them. PostgreSQL 12+ inlines by default with MATERIALIZED available to override.' },
      { front: 'What are the two parts of a recursive CTE?', back: 'An anchor query producing the starting rows, and a recursive term that joins back to the previous pass, unioned with UNION ALL.' },
      { front: 'Why guard a recursive CTE with a depth limit?', back: 'A cycle in the data makes recursion non-terminating, and no foreign key prevents two rows referencing each other.' },
      { front: 'Second-highest salary in one line?', back: '`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)` — returns NULL rather than no rows when there is no second.' },
    ],

    challenge: {
      title: 'A customer lifetime-value model in named steps',
      brief:
        'Build a single query, structured entirely as CTEs, producing one row per customer with: total non-cancelled orders, lifetime revenue, average order value computed at order grain, days between first and last order, and a `tier` of bronze, silver or gold based on revenue quantiles you compute rather than hard-code. Every customer must appear, including those with no orders. Each CTE must carry a comment stating its grain, and you must include a final assertion query proving the result has exactly one row per customer.',
      language: 'sql',
      acceptanceCriteria: [
        'The query uses at least three CTEs, each with its grain documented in a comment',
        'Average order value is computed from order totals, not from item prices',
        'Tier thresholds are derived from the data rather than hard-coded numbers',
        'Customers with no orders appear with zeros rather than being dropped',
        'An assertion query demonstrates that COUNT(*) equals COUNT(DISTINCT customer_id)',
      ],
      starterCode: "-- grain: one row per order\nWITH order_totals AS (\n  SELECT order_id, SUM(quantity * unit_price) AS order_total\n  FROM order_items\n  GROUP BY order_id\n)\nSELECT 1;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I can write basic SELECT, WHERE and GROUP BY. Teach me what a subquery is, and why people write WITH at the top of big queries.',
      mustCover: [
        'Every query returns a table, so a query can be used wherever a table or a value can',
        'A subquery can supply a value to compare against, a set to test membership in, or a whole intermediate table',
        'A correlated subquery refers to the current outer row and is evaluated per row',
        'A CTE gives an intermediate result a name so the query reads as steps and can be tested piece by piece',
        'A recursive CTE repeats itself to walk a chain of unknown length',
      ],
      bonusSignals: ['gives a concrete two-step example such as total each order then average the totals', 'mentions running a CTE alone to check it', 'explains that CTEs are about clarity rather than speed'],
      sampleExplanation:
        'The key fact is that a query always hands back a table. Once you notice that, you can put a query anywhere a table would go. Need to compare every product against the average price? Put a little query in the middle of your condition that works out the average, and compare against that. Need to answer a question in two stages — first total up each order, then take the average of those totals — put the first stage in the FROM clause and treat its result as if it were a table. That is a subquery. The problem is that after three of these, the query reads from the inside out and nobody can follow it, including whoever wrote it. So instead you put the steps at the top with names: WITH order_totals AS (...), and then the rest of the query just says order_totals as though it were a real table. Same result, but now it reads downwards like a recipe, and you can run each step on its own to check it produced what you expected before building on it. And if you add the word RECURSIVE, the named step is allowed to refer to itself, which is how you follow a chain — this person’s manager, and their manager, and theirs — without knowing in advance how long the chain is.',
    },
  },

  {
    id: 'SQL-012',
    domain: 'SQL',
    module: 'Advanced SQL',
    topic: 'Window functions',
    title: 'Window Functions',
    slug: 'window-functions',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['SQL-011'],
    related: ['SQL-006', 'SQL-007', 'SQL-011'],
    tags: ['window-function', 'over', 'partition-by', 'row-number', 'rank', 'lag', 'running-total', 'moving-average'],

    learningObjectives: [
      'Explain how a window function differs from GROUP BY: it adds a column without collapsing rows',
      'Use OVER with PARTITION BY and ORDER BY, and say what each part controls',
      'Distinguish ROW_NUMBER, RANK and DENSE_RANK by their behaviour on ties',
      'Use LAG and LEAD for period-over-period comparisons without a self join',
      'Write running totals and moving averages with an explicit frame clause',
      'Solve top-N-per-group by ranking in a CTE and filtering in the outer query',
    ],

    terminology: [
      {
        term: 'Window function',
        definition:
          'A function computed over a set of rows related to the current row — its window — returning one value per input row rather than one per group. Written with an OVER clause.',
        simple: 'A calculation over nearby rows that adds a column instead of squashing rows together.',
      },
      {
        term: 'OVER clause',
        definition:
          'Defines the window: `PARTITION BY` splits rows into independent groups, `ORDER BY` orders rows within each, and the frame clause bounds which rows around the current one are included.',
        simple: 'The instruction saying which rows count as "nearby".',
      },
      {
        term: 'PARTITION BY',
        definition:
          'Divides the rows into partitions processed independently, so the function restarts for each. Analogous to GROUP BY except that rows are preserved.',
        simple: 'Restart the calculation for each category.',
      },
      {
        term: 'Frame clause',
        definition:
          '`ROWS BETWEEN ... AND ...` or `RANGE BETWEEN ...` bounds the window relative to the current row. Defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` when ORDER BY is present.',
        simple: 'How far back and forward the window reaches.',
      },
      {
        term: 'ROW_NUMBER / RANK / DENSE_RANK',
        definition:
          'Ranking functions. ROW_NUMBER is always 1, 2, 3 with arbitrary tie-breaking; RANK gives ties the same number and skips the next (1, 1, 3); DENSE_RANK gives ties the same number without skipping (1, 1, 2).',
        simple: 'Three ways of numbering rows, differing in what happens to ties.',
      },
      {
        term: 'LAG / LEAD',
        definition:
          'Return a value from a row a given number of positions before or after the current row within the partition, with an optional default when there is no such row.',
        simple: 'Look at the previous or next row directly.',
      },
      {
        term: 'ROWS vs RANGE',
        definition:
          'ROWS counts physical rows; RANGE groups rows with equal ORDER BY values as peers and includes them all. With duplicate sort keys the two give different answers.',
        simple: 'Count rows, or count everything that ties with this row too.',
      },
    ],

    simpleExplanation:
      "GROUP BY answers questions about groups by destroying the rows: twenty orders become one row per country, and the individual orders are gone. Very often that is not what you want. You want each order to stay exactly where it is, with an extra column next to it saying “this order is 12% of its country’s total”, or “this is the third order this customer placed”, or “the previous month had 40 orders”. That is what a window function does: it computes over a set of related rows — the window — and returns one value per row, adding a column instead of collapsing anything. You write it with OVER. Inside the OVER you say PARTITION BY to restart the calculation for each customer or each category, ORDER BY to give the rows within a partition a sequence, and optionally a frame to say how far the window reaches — all rows so far for a running total, the last three rows for a moving average. Once this clicks, a whole class of queries that used to need self joins or correlated subqueries becomes two lines, and running totals, rankings and period-over-period growth all stop being hard.",

    whyItExists:
      'Before window functions, any calculation relating a row to its neighbours — rank within a group, running total, change since last month — required a correlated subquery or a self join, which were slow, hard to read and easy to get subtly wrong. The SQL:2003 window clause expresses these directly, computed in a single pass over ordered data.',

    analogy: {
      scenario:
        'Think of a marathon results sheet. Each runner keeps their own line — nothing is summarised away — but the sheet carries extra columns computed by looking at other runners: overall position, position within age category, gap to the runner ahead, and cumulative number of finishers at that point. Every one of those columns needs information from other rows, yet the sheet still has one line per runner.',
      mapping: [
        { from: 'One line per runner, preserved', to: 'A window function returns one value per row — no collapsing' },
        { from: 'Overall position', to: 'RANK() OVER (ORDER BY time)' },
        { from: 'Position within the 40–49 age category', to: 'RANK() OVER (PARTITION BY age_group ORDER BY time)' },
        { from: 'Gap to the runner ahead', to: 'time - LAG(time) OVER (ORDER BY time)' },
        { from: 'Cumulative finishers so far', to: 'COUNT(*) OVER (ORDER BY time ROWS UNBOUNDED PRECEDING)' },
        { from: 'A summary sheet with only category winners', to: 'GROUP BY — rows are gone' },
      ],
      bridge:
        'The results sheet is exactly the distinction: both the sheet and a GROUP BY summary consult the whole field, but the sheet keeps every runner and annotates them, while the summary replaces them. PARTITION BY is literally "work out the positions separately within each age category", and the frame clause is "how much of the field to look at" — everyone so far for a cumulative count, the person immediately ahead for a gap.',
      limitations:
        'On a results sheet a tie is resolved by a judge. SQL has three different conventions — ROW_NUMBER, RANK and DENSE_RANK — and choosing the wrong one silently changes the answer, so the analogy hides a decision you have to make deliberately.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'GROUP BY collapses; OVER annotates',
        caption: 'Same input, same totals, completely different output shape.',
        art: `INPUT                       GROUP BY country               OVER (PARTITION BY country)
id  country  amount           country  total                 id country amount total  share
--  -------  ------           -------  -----                 -- ------- ------ -----  -----
 1  NG        120             NG        245                   1 NG       120    245    0.49
 2  ES         55       -->   ES         95        vs.        2 ES        55     95    0.58
 3  NG         40             CN        190                   3 NG        40    245    0.16
 4  CN        120                                             4 CN       120    190    0.63
 5  ES         40             3 rows out                      5 ES        40     95    0.42
 6  NG         85             (rows destroyed)                6 NG        85    245    0.35
 7  CN         70                                             7 CN        70    190    0.37

                                                              7 rows out - every row kept,
                                                              with group facts attached

RANKING FUNCTIONS ON TIED VALUES

 value  ROW_NUMBER  RANK  DENSE_RANK
 -----  ----------  ----  ----------
  100        1        1        1
   90        2        2        2
   90        3        2        2      <- tie
   80        4        4        3      <- RANK skips 3, DENSE_RANK does not
   70        5        5        4`,
      },
      {
        kind: 'table',
        title: 'The window function toolkit',
        columns: ['Function', 'Returns', 'Typical use'],
        rows: [
          ['`ROW_NUMBER()`', 'A unique sequential number, ties broken arbitrarily', 'Deduplication; picking exactly one row per group'],
          ['`RANK()`', 'Ties share a rank, the next rank is skipped', 'Competition rankings where position reflects how many beat you'],
          ['`DENSE_RANK()`', 'Ties share a rank, no gaps', '"Second-highest salary" where tied salaries count once'],
          ['`LAG(x, n, default)`', 'x from n rows earlier in the partition', 'Change since last period, without a self join'],
          ['`LEAD(x, n, default)`', 'x from n rows later', 'Time to next event; gap analysis'],
          ['`SUM(x) OVER (ORDER BY ...)`', 'Running total up to the current row', 'Cumulative revenue, inventory balance'],
          ['`AVG(x) OVER (... ROWS 2 PRECEDING)`', 'Moving average over a fixed window', 'Smoothing a noisy daily series'],
          ['`NTILE(4)`', 'Bucket number from 1 to n', 'Quartiles, deciles, customer value tiers'],
          ['`FIRST_VALUE` / `LAST_VALUE`', 'The first/last value in the frame', 'Comparing every row to the partition’s best'],
        ],
      },
      {
        kind: 'annotated',
        title: 'Anatomy of an OVER clause',
        subject: 'SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)',
        annotations: [
          { part: 'SUM(amount)', note: 'The aggregate being computed — but over a window, so it returns a value per row instead of per group.' },
          { part: 'OVER', note: 'The keyword that turns an aggregate into a window function. Its presence is the whole difference.' },
          { part: 'PARTITION BY customer_id', note: 'Restart the calculation for each customer. Omit it and the whole result is one partition.' },
          { part: 'ORDER BY order_date', note: 'Gives rows a sequence within the partition. Required for anything cumulative, and for LAG/LEAD.' },
          { part: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW', note: 'The frame: this row and the two before it — a three-row moving window. Without it, ORDER BY implies everything up to the current row.' },
        ],
      },
      {
        kind: 'compare',
        title: 'GROUP BY versus window functions',
        caption: 'They are not competitors; they answer different shapes of question.',
        left: {
          heading: 'GROUP BY',
          points: [
            'Collapses rows: one output row per group',
            'Individual rows are no longer addressable',
            'Non-grouped columns are illegal in SELECT',
            'Answers "what is the total per country?"',
            'Evaluated before SELECT',
          ],
        },
        right: {
          heading: 'Window function',
          points: [
            'Preserves rows: one output row per input row',
            'Every original column remains available',
            'Any column may appear alongside it',
            'Answers "what share of its country is this order?"',
            'Evaluated after HAVING, before ORDER BY — so not usable in WHERE',
          ],
        },
      },
      {
        kind: 'widget',
        title: 'Experiment with a window',
        caption: 'Run a query with `SUM(price) OVER (PARTITION BY category)` and compare the row count with the same query using GROUP BY.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'A window function computes a value for each row of a partition of the result set, over a frame of rows defined relative to the current row. The OVER clause specifies an optional PARTITION BY (partitioning the rows into independent sets), an optional ORDER BY (imposing an order within each partition) and an optional frame specification bounding the rows contributing to the computation. Window functions are evaluated logically after FROM, WHERE, GROUP BY and HAVING but before ORDER BY and LIMIT, which is why they may not appear in WHERE or HAVING and must be filtered via a subquery or CTE.',

    math: {
      intuition:
        'A window function is a mapping from each row to a value computed over a subset of rows determined by that row’s position. Where an aggregate is a many-to-one reduction, a window function is a many-to-many transformation: the same reduction is applied once per row, over a frame that moves with the row. A running total is the prefix sum of the ordered partition; a moving average is that same idea with both ends of the frame sliding.',
      formulas: [
        {
          latex: 'w_i = f\\big(\\{x_j : j \\in F(i)\\}\\big)',
          name: 'General form of a window function',
          meaning: 'The value for row i is an aggregate f applied to the rows in that row’s frame F(i). The frame depends on i, which is what distinguishes a window function from a plain aggregate.',
          variables: [
            { symbol: 'w_i', meaning: 'The window function’s output for row i' },
            { symbol: 'f', meaning: 'The aggregate: SUM, AVG, COUNT, MIN, MAX' },
            { symbol: 'F(i)', meaning: 'The set of row indices in row i’s frame' },
          ],
        },
        {
          latex: 'R_i = \\sum_{j=1}^{i} x_j \\quad \\text{(running total: } F(i) = \\{1, \\dots, i\\}\\text{)}',
          name: 'Running total as a prefix sum',
          meaning: 'With `ORDER BY` and the default frame, the frame is everything from the start of the partition to the current row, so SUM becomes a cumulative sum.',
          variables: [
            { symbol: 'R_i', meaning: 'The running total at row i' },
            { symbol: 'x_j', meaning: 'The value in row j of the ordered partition' },
          ],
        },
        {
          latex: 'M_i = \\frac{1}{k}\\sum_{j=i-k+1}^{i} x_j \\quad \\text{(k-row moving average)}',
          name: 'Moving average with a sliding frame',
          meaning: '`ROWS BETWEEN k-1 PRECEDING AND CURRENT ROW` gives a window of fixed width that slides with the row. The first k-1 rows average over fewer values unless you exclude them deliberately.',
          variables: [
            { symbol: 'M_i', meaning: 'The moving average at row i' },
            { symbol: 'k', meaning: 'The window width in rows' },
          ],
          category: 'statistics',
        },
        {
          latex: '\\text{RANK}(i) = 1 + |\\{j : x_j > x_i\\}| \\quad\\text{vs}\\quad \\text{DENSE\\_RANK}(i) = 1 + |\\{\\text{distinct } x_j > x_i\\}|',
          name: 'RANK versus DENSE_RANK',
          meaning: 'RANK counts how many rows beat you, so ties create gaps. DENSE_RANK counts how many distinct values beat you, so there are no gaps.',
          variables: [
            { symbol: 'x_i', meaning: 'The ordering value for row i' },
            { symbol: '|\\cdot|', meaning: 'The number of elements in the set' },
          ],
        },
      ],
      derivation: [
        'Take salaries 100, 90, 90, 80 in descending order.',
        'For the 80: rows strictly greater are 100, 90, 90 — three of them — so RANK = 1 + 3 = 4.',
        'Distinct values strictly greater are 100 and 90 — two — so DENSE_RANK = 1 + 2 = 3.',
        'ROW_NUMBER ignores values entirely and simply counts position, giving 4, with the two 90s ordered arbitrarily.',
        'Hence "the second-highest salary" means DENSE_RANK = 2: tied salaries are one salary, and the next distinct value is second.',
        'Using ROW_NUMBER = 2 would return one of the tied 90s, which is right by accident here and wrong whenever the top salary is tied.',
      ],
    },

    workedExample: {
      title: 'Top 2 products per category by revenue',
      setup:
        'A perennial interview question and a genuinely common reporting task. We need, for each product category, the two products that generated the most revenue. The trap is that LIMIT applies to the whole result, not per group, so there is no way to do this with ORDER BY and LIMIT alone.',
      steps: [
        {
          label: 'Aggregate to the right grain first',
          detail:
            'Revenue lives at item grain, so a CTE computes `SUM(oi.quantity * oi.unit_price)` grouped by product. Its grain is one row per product, with the category carried along.',
        },
        {
          label: 'Rank within each category',
          detail:
            '`ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC, product_id)` restarts the numbering for every category. The secondary sort key makes the ranking deterministic when two products tie on revenue.',
          latex: 'r_p = \\text{position of } p \\text{ within its category}',
        },
        {
          label: 'Choose the ranking function deliberately',
          detail:
            'ROW_NUMBER returns exactly two rows per category even under ties, which is what "top 2" usually means operationally. RANK would return three if two products tied for second, and DENSE_RANK would return every product sharing the top two revenue values. All three are defensible; the requirement decides.',
        },
        {
          label: 'Filter in an outer query',
          detail:
            'A window function cannot appear in WHERE, because WHERE is evaluated before windows. So the ranking goes in a CTE and the filter `WHERE rn <= 2` goes in the query that selects from it. This two-step shape is the signature of every top-N-per-group query.',
        },
        {
          label: 'Order the output for humans',
          detail:
            '`ORDER BY category, rn` groups the pairs together and puts the winner first within each category.',
        },
      ],
      conclusion:
        'The pattern is: aggregate to grain, rank with a window in a CTE, filter on the rank outside. It generalises immediately — top 3 per customer, latest order per customer (rank by date descending, keep rank 1), first touchpoint per session. Recognising that "per group, take the best N" always has this shape is worth more than memorising any single query.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'The core distinction: OVER adds a column, GROUP BY removes rows',
        runnable: true,
        code: `-- GROUP BY: 6 rows out, one per category
SELECT category, SUM(price) AS category_total
FROM products
GROUP BY category;

-- OVER: 24 rows out, every product kept, totals attached
SELECT
  name,
  category,
  price,
  SUM(price)   OVER (PARTITION BY category) AS category_total,
  COUNT(*)     OVER (PARTITION BY category) AS products_in_category,
  ROUND(100.0 * price / SUM(price) OVER (PARTITION BY category), 1) AS pct_of_category
FROM products
ORDER BY category, price DESC;`,
        explanation:
          'The second query is the one that is hard to express any other way: each product keeps its own row while gaining facts about its category. Achieving the same with GROUP BY would require aggregating to category level and then joining back to products — two passes and a join, where the window does it in one. The percentage column shows the real payoff: a row-level value divided by a group-level value, side by side, which is precisely what a window function makes trivial.',
        output: `name             category     price  category_total  products_in_category  pct_of_category
---------------  -----------  -----  --------------  --------------------  ---------------
4K Monitor       displays     349.0  868.0           3                     40.2
27" Monitor      displays     319.0  868.0           3                     36.8
Mechanical Keys  peripherals  89.0   387.0           6                     23.0`,
      },
      {
        language: 'sql',
        title: 'ROW_NUMBER, RANK and DENSE_RANK on the same data',
        runnable: true,
        code: `SELECT
  name,
  department,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC)                     AS row_num,
  RANK()       OVER (ORDER BY salary DESC)                     AS rank_,
  DENSE_RANK() OVER (ORDER BY salary DESC)                     AS dense_rank_,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees
ORDER BY salary DESC;`,
        explanation:
          'Put side by side, the difference is unmissable. Where two employees earn the same, ROW_NUMBER gives them 3 and 4 arbitrarily, RANK gives both 3 and then jumps to 5, and DENSE_RANK gives both 3 and continues at 4. The last column shows PARTITION BY: the ranking restarts inside each department, which is how "top earner in each team" is expressed. Choose ROW_NUMBER when you need exactly one row per group, RANK when position should reflect how many people beat you, and DENSE_RANK when you are counting distinct values, as in "the second-highest salary".',
        output: `name          department  salary  row_num  rank_  dense_rank_  rank_in_dept
------------  ----------  ------  -------  -----  -----------  ------------
Ivan Petrov   sales       95000   1        1      1            1
Dana Ortiz    sales       88000   2        2      2            2
Mei Tanaka    support     72000   3        3      3            1
Omar Haddad   support     72000   4        3      3            1
Lia Fernandes support     65000   5        5      4            3`,
      },
      {
        language: 'sql',
        title: 'LAG and LEAD: period-over-period without a self join',
        runnable: true,
        code: `WITH monthly AS (
  SELECT SUBSTR(order_date, 1, 7) AS month, COUNT(*) AS orders
  FROM orders
  GROUP BY SUBSTR(order_date, 1, 7)
)
SELECT
  month,
  orders,
  LAG(orders)  OVER (ORDER BY month) AS prev_month,
  orders - LAG(orders) OVER (ORDER BY month) AS change,
  ROUND(100.0 * (orders - LAG(orders) OVER (ORDER BY month))
        / NULLIF(LAG(orders) OVER (ORDER BY month), 0), 1) AS pct_growth,
  LEAD(orders) OVER (ORDER BY month) AS next_month
FROM monthly
ORDER BY month;`,
        explanation:
          'This replaces the self join from SQL-011 with one clause, and it is both shorter and more robust. Three details matter. `100.0 *` forces float arithmetic, without which integer division truncates every growth figure to zero. NULLIF guards against a division by zero when the previous month had no orders. And the first row has no predecessor, so LAG returns NULL and the growth column is correctly blank rather than fabricated — you can supply a third argument, `LAG(orders, 1, 0)`, if a zero default suits the report better.',
        output: `month    orders  prev_month  change  pct_growth  next_month
-------  ------  ----------  ------  ----------  ----------
2024-01  9                                       14
2024-02  14      9           5       55.6        17
2024-03  17      14          3       21.4`,
      },
      {
        language: 'sql',
        title: 'Running totals and moving averages with explicit frames',
        runnable: true,
        code: `WITH daily AS (
  SELECT o.order_date AS day,
         SUM(oi.quantity * oi.unit_price) AS revenue
  FROM orders      AS o
  JOIN order_items AS oi ON oi.order_id = o.id
  GROUP BY o.order_date
)
SELECT
  day,
  ROUND(revenue, 2) AS revenue,
  ROUND(SUM(revenue) OVER (
          ORDER BY day
          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS running_total,
  ROUND(AVG(revenue) OVER (
          ORDER BY day
          ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2)        AS moving_avg_7d,
  ROUND(MAX(revenue) OVER (
          ORDER BY day
          ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW), 2) AS best_day_so_far
FROM daily
ORDER BY day;`,
        explanation:
          'The frame clause is what turns SUM into a running total and AVG into a moving average — same function, different window. `UNBOUNDED PRECEDING AND CURRENT ROW` is actually the default once ORDER BY is present, but writing it out is worth the characters because the default is a frequent source of confusion. ROWS rather than RANGE matters here: with RANGE, all rows sharing the same date would be treated as peers and included together, which changes the answer whenever there are duplicate dates. Note also that the first six rows of the moving average are computed over fewer than seven days, so an honest chart either marks them or excludes them.',
        output: `day         revenue  running_total  moving_avg_7d  best_day_so_far
----------  -------  -------------  -------------  ---------------
2024-01-04  210.00   210.00         210.00         210.00
2024-01-09  145.50   355.50         177.75         210.00
2024-01-15  390.00   745.50         248.50         390.00`,
      },
      {
        language: 'sql',
        title: 'Top N per group, and the latest row per group',
        runnable: true,
        code: `-- Top 2 products per category by revenue
WITH product_revenue AS (
  SELECT p.id, p.name, p.category,
         SUM(oi.quantity * oi.unit_price) AS revenue
  FROM products    AS p
  JOIN order_items AS oi ON oi.product_id = p.id
  GROUP BY p.id, p.name, p.category
),
ranked AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC, id) AS rn
  FROM product_revenue
)
SELECT category, name, ROUND(revenue, 2) AS revenue, rn
FROM ranked
WHERE rn <= 2
ORDER BY category, rn;

-- The most recent order for each customer
WITH ranked_orders AS (
  SELECT o.*,
         ROW_NUMBER() OVER (PARTITION BY customer_id
                            ORDER BY order_date DESC, id DESC) AS rn
  FROM orders AS o
)
SELECT customer_id, id AS order_id, order_date, status
FROM ranked_orders
WHERE rn = 1
ORDER BY customer_id;`,
        explanation:
          'Both queries share one shape: rank inside a CTE, filter on the rank outside. The filter must be outside because window functions are evaluated after WHERE, so `WHERE rn <= 2` in the same SELECT would fail with "window functions are not allowed in WHERE". The secondary sort keys (`id`, `id DESC`) are not decoration — without them, two products with identical revenue or two orders on the same date could swap between runs, making the result non-reproducible. "Latest row per group" is the single most reused query in analytics, appearing wherever you need the current state of an entity from an append-only history table.',
        output: `category     name             revenue  rn
-----------  ---------------  -------  --
cables       USB-C Cable      612.50   1
cables       HDMI Cable       288.00   2
displays     4K Monitor       2094.00  1
displays     27" Monitor      957.00   2`,
      },
      {
        language: 'sql',
        title: 'Deduplication and bucketing',
        runnable: true,
        code: `-- Keep one row per duplicate name, the lowest id
WITH numbered AS (
  SELECT id, name, country,
         ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS rn
  FROM customers
)
SELECT id, name, country FROM numbered WHERE rn = 1;

-- Which rows WOULD be deleted as duplicates
SELECT id, name FROM (
  SELECT id, name, ROW_NUMBER() OVER (PARTITION BY name ORDER BY id) AS rn
  FROM customers
) WHERE rn > 1;

-- Customer value quartiles
WITH spend AS (
  SELECT o.customer_id, SUM(oi.quantity * oi.unit_price) AS total
  FROM orders      AS o
  JOIN order_items AS oi ON oi.order_id = o.id
  GROUP BY o.customer_id
)
SELECT customer_id, ROUND(total, 2) AS total,
       NTILE(4) OVER (ORDER BY total DESC) AS value_quartile
FROM spend
ORDER BY total DESC;`,
        explanation:
          'ROW_NUMBER partitioned by the duplicate key is the standard deduplication tool: rank 1 is the row to keep and everything above 1 is a duplicate, and running the second query first is how you inspect what a delete would remove before running it. NTILE divides an ordered partition into roughly equal buckets, which is how value tiers and deciles are built without hard-coding thresholds — and, importantly, it adapts as the data changes, where a fixed threshold silently goes stale.',
        output: `id  name        country
--  ----------  -------
1   Ada Okafor  Nigeria

customer_id  total    value_quartile
-----------  -------  --------------
1            2104.50  1
3            1330.00  1
5            820.00   2`,
      },
    ],

    realWorldExamples: [
      {
        context: 'Deduplicating an ingested table',
        usage:
          'Pipelines that re-run produce duplicate rows. `ROW_NUMBER() OVER (PARTITION BY natural_key ORDER BY ingested_at DESC)` keeping rank 1 is the standard deduplication step in virtually every warehouse.',
      },
      {
        context: 'Sessionisation of event logs',
        usage:
          'LAG on the event timestamp gives the gap since the previous event; a running SUM of "gap > 30 minutes" flags new sessions, producing session ids in two window functions without any procedural code.',
      },
      {
        context: 'Time-series features for models',
        usage:
          'Lagged values, rolling means and cumulative counts are the standard feature set for forecasting and churn. Computing them in SQL with windows keeps the training and serving definitions identical.',
      },
      {
        context: 'Leaderboards and cohort reporting',
        usage:
          'Rank within segment, percentage of segment total and movement since last period are all one-line window expressions, where the pre-2003 equivalents were correlated subqueries that did not scale.',
      },
      {
        context: 'Detecting data gaps',
        usage:
          'LEAD on a date column compared against the current date exposes missing periods in a series, which is how monitoring jobs notice that an upstream feed stopped delivering.',
      },
    ],

    projectConnections: [
      { tool: 'pandas', role: '`groupby().rank()`, `.shift()`, `.rolling()` and `.expanding()` are the direct counterparts of RANK, LAG, moving frames and running totals.' },
      { tool: 'dbt', role: 'Deduplication and latest-record-per-key models are almost always ROW_NUMBER windows; dbt snapshots encode the same idea as a materialisation.' },
      { tool: 'Feature stores', role: 'Point-in-time correct features are windows bounded by the prediction timestamp — getting the frame wrong is precisely how label leakage happens.' },
      { tool: 'DuckDB / BigQuery', role: 'Both implement the full window standard including RANGE frames and named windows, so complex analytics ports from PostgreSQL with little change.' },
    ],

    commonMistakes: [
      {
        mistake: 'Putting a window function in WHERE or HAVING',
        why: 'Windows are evaluated after WHERE, GROUP BY and HAVING, so the value does not exist yet. PostgreSQL reports "window functions are not allowed in WHERE".',
        fix: 'Compute the window in a CTE or subquery and filter in the outer query. This is the mandatory shape for every top-N-per-group problem.',
      },
      {
        mistake: 'Using ROW_NUMBER when the question implies ties should share a position',
        why: 'ROW_NUMBER breaks ties arbitrarily, so "the second-highest salary" returns one of two tied employees and may return the top salary again when the top is tied.',
        fix: 'Use DENSE_RANK for "second-highest distinct value", RANK for competition position, and ROW_NUMBER only when you genuinely want exactly one row per group.',
      },
      {
        mistake: 'Forgetting a deterministic tiebreak in the window ORDER BY',
        why: 'Rows tied on the ordering column have undefined relative order, so which row gets rank 1 can change between runs and any "latest per group" result becomes non-reproducible.',
        fix: 'Always append a unique column: `ORDER BY order_date DESC, id DESC`.',
      },
      {
        mistake: 'Relying on the default frame without knowing what it is',
        why: 'With ORDER BY present the default is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, so `AVG(x) OVER (ORDER BY d)` is a running average, not the partition average that many expect.',
        fix: 'Write the frame explicitly when it matters, and omit ORDER BY entirely when you want the whole-partition aggregate.',
      },
      {
        mistake: 'Using RANGE where ROWS is meant',
        why: 'RANGE treats rows with equal ORDER BY values as peers and includes all of them, so with duplicate dates a "3 preceding rows" moving average silently includes more rows than three.',
        fix: 'Use ROWS for physical row counts. Reserve RANGE for genuine value-based frames, such as an interval of time.',
      },
      {
        mistake: 'Mixing a window function with GROUP BY and expecting it to see the raw rows',
        why: 'Windows are evaluated after grouping, so a window in a grouped query operates on the group rows, not the original ones. `SUM(SUM(x)) OVER ()` is legal and often surprising.',
        fix: 'Be explicit about the order: aggregate in a CTE, then apply windows to the aggregated result, so the input to the window is unambiguous.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'What is the difference between a window function and GROUP BY?',
        answer:
          'GROUP BY collapses rows: each group becomes a single output row, and the individual rows are no longer available, which is why non-grouped columns are illegal in SELECT. A window function computes over a related set of rows but returns a value for every input row, so nothing is collapsed and every original column remains available. That makes them complementary rather than competing: GROUP BY answers "what is the total per country", while a window answers "what share of its country’s total is this order". A practical consequence is that a query needing both a row and its group’s aggregate needs either a window function or a self join back to an aggregated CTE — and the window is one pass instead of two.',
      },
      {
        level: 'intermediate',
        question: 'Explain ROW_NUMBER, RANK and DENSE_RANK with an example.',
        answer:
          'Take salaries 100, 90, 90, 80. ROW_NUMBER gives 1, 2, 3, 4 — always distinct, with the tie broken arbitrarily unless you add a tiebreak column. RANK gives 1, 2, 2, 4: the tied rows share a rank and the next rank skips, because rank counts how many rows beat you. DENSE_RANK gives 1, 2, 2, 3: ties share a rank and no numbers are skipped, because it counts how many distinct values beat you. The choice follows the requirement. "Second-highest salary" means DENSE_RANK = 2, since tied salaries are one salary. "Who finished third in the race" means RANK. "Give me exactly one row per customer" means ROW_NUMBER, because it is the only one guaranteed to produce a single row per partition.',
        followUp:
          'A strong candidate adds that ROW_NUMBER without a deterministic tiebreak makes the result non-reproducible between runs, which matters for pagination and for tests.',
      },
      {
        level: 'internship',
        question: 'Write a query to find the top 3 highest-paid employees in each department.',
        answer:
          '`WITH ranked AS (SELECT name, department, salary, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rk FROM employees) SELECT department, name, salary, rk FROM ranked WHERE rk <= 3 ORDER BY department, rk, name;`. PARTITION BY restarts the ranking for each department and the filter must live in an outer query because window functions cannot appear in WHERE. I chose DENSE_RANK deliberately: if two people tie for third, both are genuinely in the top three by salary and it would be arbitrary to drop one. If the requirement is instead exactly three rows per department — say, for a fixed-size report — ROW_NUMBER with a tiebreak column is the right choice. That is the question I would ask before writing it.',
        followUp:
          'Naming the tie behaviour as a requirements question rather than a detail is what separates a strong answer here.',
      },
      {
        level: 'ml-engineer',
        question: 'How would you compute a 7-day moving average of daily revenue, and what should you watch out for?',
        answer:
          '`AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` over a daily-aggregated CTE. Three cautions. First, ROWS counts rows, not days, so if a day with no revenue is simply absent from the table, the window silently spans more than seven calendar days — the fix is a date spine cross-joined and left-joined so every day has a row, even a zero one. Second, the first six rows average over fewer than seven values, so a chart should either exclude or mark them rather than present a warm-up artefact as data. Third, for a model this window must not include the current or future rows relative to the prediction point, or you have leaked the label; a feature window should generally end at `1 PRECEDING`. The equivalent `RANGE BETWEEN INTERVAL ’6 days’ PRECEDING AND CURRENT ROW` in PostgreSQL handles gaps natively and is the better choice where available.',
      },
      {
        level: 'internship',
        question: 'How do you find duplicate rows and keep only one of each?',
        answer:
          '`WITH numbered AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY natural_key ORDER BY updated_at DESC, id) AS rn FROM t) SELECT * FROM numbered WHERE rn = 1;`. PARTITION BY the columns that should have been unique, order within each partition by whatever decides which copy wins — most recent, lowest id — and keep rank 1. Selecting `WHERE rn > 1` instead lists exactly the rows a delete would remove, and running that first is a habit worth keeping before any destructive operation. ROW_NUMBER is the right function here rather than RANK, because it guarantees exactly one row per partition even when the ordering column ties; with RANK, tied rows would both get rank 1 and both survive.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'For every order, show the customer, the order total, and that order’s rank among that customer’s orders by value.',
        hint: 'Aggregate to order grain first, then PARTITION BY customer_id in the window.',
        language: 'sql',
        starterCode: 'WITH order_totals AS (\n  SELECT o.id, o.customer_id, o.order_date,\n         SUM(oi.quantity * oi.unit_price) AS total\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id, o.order_date\n)\nSELECT 1;\n',
        solution:
          'WITH order_totals AS (\n  SELECT o.id, o.customer_id, o.order_date,\n         SUM(oi.quantity * oi.unit_price) AS total\n  FROM orders AS o\n  JOIN order_items AS oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id, o.order_date\n)\nSELECT c.name, t.id AS order_id, t.order_date, ROUND(t.total, 2) AS total,\n       RANK() OVER (PARTITION BY t.customer_id ORDER BY t.total DESC) AS rank_for_customer,\n       ROUND(100.0 * t.total / SUM(t.total) OVER (PARTITION BY t.customer_id), 1) AS pct_of_customer\nFROM order_totals AS t\nJOIN customers AS c ON c.id = t.customer_id\nORDER BY c.name, rank_for_customer;\n\nTwo windows over the same partition: one ranks, one totals. Neither collapses the rows, so each order keeps its own line with both facts attached. Note that the second window has no ORDER BY, which is deliberate — adding one would turn it into a running total rather than the partition total, because of the default frame.',
      },
      {
        prompt: 'Find the second-highest salary in each department. State which ranking function you chose and why.',
        hint: 'Ties matter. Decide whether two people on the top salary should make the second-highest the same value or the next one down.',
        language: 'sql',
        solution:
          "WITH ranked AS (\n  SELECT department, salary,\n         DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rk\n  FROM employees\n)\nSELECT DISTINCT department, salary AS second_highest\nFROM ranked\nWHERE rk = 2\nORDER BY department;\n\nDENSE_RANK is the right choice because \"second-highest salary\" is a statement about distinct salary values: if two people both earn the top salary, the second-highest salary is the next value down, not the other top earner. ROW_NUMBER would return one of the tied top earners and be wrong; RANK would skip rank 2 entirely in that case and return nothing. DISTINCT is needed because several employees may share the second-highest salary and the question asks for the salary, not the people. A department with only one distinct salary correctly returns no row.",
      },
      {
        prompt: 'Compute month-over-month percentage growth in revenue, handling the first month and any zero months safely.',
        hint: 'LAG for the previous value, NULLIF to guard the division, and 100.0 to force float arithmetic.',
        language: 'sql',
        solution:
          "WITH monthly AS (\n  SELECT SUBSTR(o.order_date, 1, 7) AS month,\n         SUM(oi.quantity * oi.unit_price) AS revenue\n  FROM orders AS o\n  JOIN order_items AS oi ON oi.order_id = o.id\n  GROUP BY SUBSTR(o.order_date, 1, 7)\n)\nSELECT month,\n       ROUND(revenue, 2) AS revenue,\n       ROUND(LAG(revenue) OVER (ORDER BY month), 2) AS prev_revenue,\n       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))\n             / NULLIF(LAG(revenue) OVER (ORDER BY month), 0), 1) AS pct_growth\nFROM monthly\nORDER BY month;\n\nThree guards earn their place. `100.0 *` prevents integer truncation, which would silently render every growth figure as 0. NULLIF turns a zero denominator into NULL rather than an error in PostgreSQL. And the first month has no LAG, so its growth is correctly NULL — reporting 0% there would assert a fact that is not in the data. One structural caveat: if a month has no orders it is absent from `monthly` entirely, so LAG reaches back to the previous month present rather than the previous calendar month; a date spine fixes that.",
      },
      {
        prompt: 'Identify each customer’s first and most recent order date, and the number of days between them, using window functions rather than GROUP BY.',
        hint: 'FIRST_VALUE and LAST_VALUE, watching the default frame carefully. In SQLite, JULIANDAY converts dates for subtraction.',
        language: 'sql',
        solution:
          "SELECT DISTINCT\n  customer_id,\n  FIRST_VALUE(order_date) OVER w AS first_order,\n  LAST_VALUE(order_date)  OVER w AS last_order,\n  CAST(JULIANDAY(LAST_VALUE(order_date) OVER w)\n     - JULIANDAY(FIRST_VALUE(order_date) OVER w) AS INTEGER) AS days_active\nFROM orders\nWINDOW w AS (\n  PARTITION BY customer_id ORDER BY order_date\n  ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n)\nORDER BY customer_id;\n\nThe explicit frame is essential here and is the classic LAST_VALUE trap: with the default frame of UNBOUNDED PRECEDING to CURRENT ROW, LAST_VALUE returns the current row’s own value on every row rather than the partition’s last. Widening the frame to UNBOUNDED FOLLOWING fixes it. The named WINDOW clause avoids repeating the same specification four times. In practice `MIN(order_date), MAX(order_date)` with GROUP BY is simpler for this particular question — the window version is worth writing once to internalise the frame behaviour.",
      },
    ],

    quiz: [
      {
        id: 'SQL-012-q1',
        type: 'mcq',
        concept: 'windows vs group by',
        prompt: 'A table has 24 products in 6 categories. How many rows does `SELECT name, SUM(price) OVER (PARTITION BY category) FROM products` return?',
        options: ['24', '6', '1', '144'],
        answerIndex: 0,
        explanation:
          'A window function returns one value per input row without collapsing anything, so all 24 products come back, each carrying its category total. GROUP BY would have returned 6.',
      },
      {
        id: 'SQL-012-q2',
        type: 'code-output',
        language: 'sql',
        concept: 'ranking functions',
        prompt: 'Salaries are 100, 90, 90, 80. What does DENSE_RANK give for the salary of 80?',
        code: 'SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees;',
        options: ['3', '4', '2', '5'],
        answerIndex: 0,
        explanation:
          'DENSE_RANK counts distinct values above: 100 and 90, so 1 + 2 = 3. RANK would give 4 because three rows beat it, and ROW_NUMBER would also give 4.',
      },
      {
        id: 'SQL-012-q3',
        type: 'truefalse',
        concept: 'evaluation order',
        prompt: 'You can filter on a window function directly in the WHERE clause of the same SELECT.',
        answer: false,
        explanation:
          'Window functions are evaluated after WHERE, GROUP BY and HAVING, so the value does not exist yet. Compute it in a CTE or subquery and filter in the outer query.',
      },
      {
        id: 'SQL-012-q4',
        type: 'match',
        concept: 'choosing a window function',
        prompt: 'Match each task to the window function that fits.',
        pairs: [
          { left: 'Keep exactly one row per duplicate key', right: 'ROW_NUMBER()' },
          { left: 'Second-highest distinct salary', right: 'DENSE_RANK()' },
          { left: 'Change since the previous month', right: 'LAG()' },
          { left: 'Cumulative revenue to date', right: 'SUM() OVER (ORDER BY day)' },
          { left: 'Split customers into four value tiers', right: 'NTILE(4)' },
        ],
        explanation:
          'Each task implies a different tie behaviour or frame. Picking by what the question means about ties and about which rows count is the whole skill.',
      },
      {
        id: 'SQL-012-q5',
        type: 'fill',
        concept: 'partitioning',
        prompt: 'Complete the clause that restarts a ranking for each department: `RANK() OVER (________ department ORDER BY salary DESC)`',
        answers: ['PARTITION BY', 'partition by'],
        explanation:
          'PARTITION BY divides the rows into independent sets so the function restarts in each. It is the window equivalent of GROUP BY, except that rows are preserved.',
      },
      {
        id: 'SQL-012-q6',
        type: 'multi',
        concept: 'frames',
        prompt: 'Which statements about window frames are true? Select all that apply.',
        options: [
          'With ORDER BY and no frame clause, the default frame runs from the start of the partition to the current row',
          '`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` gives a seven-row moving window',
          'ROWS counts physical rows while RANGE includes all rows tied on the ORDER BY value',
          'Omitting ORDER BY entirely makes the frame the whole partition',
          'The frame clause is required whenever PARTITION BY is used',
        ],
        answerIndices: [0, 1, 2, 3],
        explanation:
          'The frame defaults sensibly but surprisingly, which is why writing it explicitly is good practice. It is never required; PARTITION BY alone with no ORDER BY gives a whole-partition aggregate.',
      },
      {
        id: 'SQL-012-q7',
        type: 'debug',
        language: 'sql',
        concept: 'last_value frame trap',
        prompt: 'This returns each row’s own date instead of the partition’s last date. Why?',
        code: 'SELECT customer_id, order_date,\n       LAST_VALUE(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS last_order\nFROM orders;',
        options: [
          'The default frame ends at the current row, so the last value in the frame is the current row',
          'LAST_VALUE requires DISTINCT',
          'PARTITION BY and ORDER BY cannot be combined',
          'order_date must be cast to a date type first',
        ],
        answerIndex: 0,
        explanation:
          'With ORDER BY present the frame defaults to UNBOUNDED PRECEDING to CURRENT ROW. Adding `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` makes LAST_VALUE see the whole partition.',
      },
      {
        id: 'SQL-012-q8',
        type: 'explain',
        concept: 'top n per group',
        prompt: 'Explain the general shape of a "top N per group" query and why it cannot be written with ORDER BY and LIMIT alone.',
        rubric: [
          'States that LIMIT applies to the whole result, not per group',
          'Describes ranking with a window function partitioned by the group',
          'Explains that the rank filter must go in an outer query because windows run after WHERE',
        ],
        sampleAnswer:
          'ORDER BY and LIMIT operate on the final result as a whole, so `LIMIT 3` gives three rows overall rather than three per category — there is no per-group form of LIMIT in standard SQL. The shape that works is to rank within each group using a window function partitioned by the grouping column and ordered by the ranking measure, then filter on that rank. The filter has to live in an outer query or a CTE, because window functions are evaluated after WHERE and so cannot be referenced there. Two choices remain: which ranking function, since ROW_NUMBER returns exactly N rows while RANK and DENSE_RANK may return more when there are ties, and what the tiebreak column is, without which the result is not reproducible between runs. The same shape solves "the latest row per entity", which is the most reused query in analytics.',
        explanation:
          'The examinable idea is the rank-then-filter pattern and the reason for its two-step structure, which follows directly from where window functions sit in the evaluation order.',
      },
    ],

    flashcards: [
      { front: 'Window function vs GROUP BY', back: 'GROUP BY collapses rows into one per group. A window function returns a value per row, adding a column while keeping every row.' },
      { front: 'What do PARTITION BY and ORDER BY do inside OVER?', back: 'PARTITION BY restarts the calculation for each group; ORDER BY sequences rows within a partition and enables cumulative frames, LAG and LEAD.' },
      { front: 'ROW_NUMBER vs RANK vs DENSE_RANK on 100, 90, 90, 80', back: 'ROW_NUMBER: 1,2,3,4. RANK: 1,2,2,4 (skips). DENSE_RANK: 1,2,2,3 (no gaps).' },
      { front: 'Why can you not filter on a window function in WHERE?', back: 'Windows are evaluated after WHERE, GROUP BY and HAVING. Compute in a CTE and filter in the outer query.' },
      { front: 'How do you write a running total?', back: '`SUM(x) OVER (ORDER BY d ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` — which is also the default frame when ORDER BY is present.' },
      { front: 'Why does LAST_VALUE usually return the current row?', back: 'The default frame ends at the current row. Widen it with `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.' },
      { front: 'What is the top-N-per-group pattern?', back: 'Rank with `ROW_NUMBER()/DENSE_RANK() OVER (PARTITION BY g ORDER BY m DESC)` in a CTE, then `WHERE rn <= N` outside.' },
      { front: 'ROWS vs RANGE', back: 'ROWS counts physical rows; RANGE includes every row tied on the ORDER BY value. They differ whenever the sort key has duplicates.' },
    ],

    challenge: {
      title: 'A cohort retention and growth report',
      brief:
        'Using only window functions and CTEs, build a report over the sample data containing, for each customer: their order sequence number, days since their previous order, running lifetime revenue after each order, their rank among all customers by lifetime revenue, and a value quartile. Then produce a second result showing month-over-month revenue growth with a three-month moving average. Every ranking must be deterministic, every division must be guarded, and the first row of each series must be handled honestly rather than defaulted to zero.',
      language: 'sql',
      acceptanceCriteria: [
        'Order sequence uses ROW_NUMBER partitioned by customer with a deterministic tiebreak',
        'Days since previous order uses LAG and is NULL for a customer’s first order',
        'Running revenue uses an explicit frame rather than relying on the default',
        'The moving average uses ROWS, and the warm-up rows are identified rather than presented as complete',
        'Every percentage uses float arithmetic and NULLIF guards the denominator',
      ],
      starterCode: "WITH order_totals AS (\n  SELECT o.id, o.customer_id, o.order_date,\n         SUM(oi.quantity * oi.unit_price) AS total\n  FROM orders o JOIN order_items oi ON oi.order_id = o.id\n  GROUP BY o.id, o.customer_id, o.order_date\n)\nSELECT customer_id, order_date,\n       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, id) AS seq\nFROM order_totals;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I understand GROUP BY well. Teach me what a window function is and why I would use one instead.',
      mustCover: [
        'A window function computes over related rows but returns a value per row, so nothing is collapsed',
        'PARTITION BY restarts the calculation per group; ORDER BY sequences rows within a partition',
        'The frame decides how many rows around the current one are included, which is how running totals and moving averages work',
        'Ranking functions differ in how they handle ties: ROW_NUMBER, RANK, DENSE_RANK',
        'Windows run after WHERE, so filtering on one needs a CTE and an outer query',
      ],
      bonusSignals: ['gives a concrete example such as each order’s share of its country total', 'mentions top-N-per-group as the canonical pattern', 'notes that LAG replaces a self join'],
      sampleExplanation:
        'GROUP BY answers questions about groups by throwing the rows away: twenty orders become one line per country. That is often exactly wrong, because what you wanted was to keep every order and write something extra beside it — "this order is 12% of its country’s total", "this is Ada’s third order", "last month had 40". A window function does that. You write a normal aggregate but follow it with OVER, and instead of collapsing the rows it computes a value for each one and adds it as a column. Inside the OVER you describe which rows count as the window: PARTITION BY country means start the calculation again for each country, ORDER BY date puts the rows of each partition in sequence, and a frame clause says how far the window reaches — everything so far gives a running total, the last seven rows gives a moving average. Once you have the sequence, LAG hands you the previous row’s value directly, so month-over-month growth stops needing a self join. The one rule to remember is that all of this happens after WHERE, so you cannot filter on a window result in the same query. Rank in a CTE, filter outside — and that two-step shape is how every "top three per category" query is written.',
    },
  },

  {
    id: 'SQL-013',
    domain: 'SQL',
    module: 'Design & Performance',
    topic: 'Indexes, normalisation and transactions',
    title: 'Indexes, Normalisation and Transactions',
    slug: 'indexes-normalisation-transactions',
    difficulty: 4,
    estimatedMinutes: 45,
    prerequisites: ['SQL-012'],
    related: ['SQL-003', 'SQL-005', 'SQL-009'],
    tags: ['index', 'b-tree', 'normalisation', 'acid', 'transaction', 'isolation', 'query-plan'],

    learningObjectives: [
      'Explain a B-tree index as a sorted structure that turns a scan into a seek, and reason about when one will be used',
      'Describe the write cost of an index and decide when not to add one',
      'Apply 1NF, 2NF and 3NF to a badly designed table, and argue for deliberate denormalisation',
      'State the four ACID properties and what each one actually guarantees',
      'Describe the standard isolation levels and the read anomalies they prevent',
      'Read a query plan well enough to tell a scan from an index seek',
    ],

    terminology: [
      {
        term: 'Index',
        definition:
          'An auxiliary data structure, typically a B-tree, holding column values in sorted order with pointers back to their rows, so the engine can locate matching rows without scanning the table.',
        simple: 'A sorted lookup table that saves reading everything.',
      },
      {
        term: 'B-tree',
        definition:
          'A balanced, high-fanout tree keeping keys sorted, with all leaves at the same depth. Lookup, range scan and insert are all O(log n) in the number of rows.',
        simple: 'A tree that stays shallow and sorted no matter how much you add.',
      },
      {
        term: 'Composite index',
        definition:
          'An index over several columns in a defined order. It can serve queries filtering on a leading prefix of those columns, but not ones that skip the first column.',
        simple: 'An index on several columns, usable left to right.',
      },
      {
        term: 'Covering index',
        definition:
          'An index containing every column a query needs, so the engine can answer entirely from the index without visiting the table. Also called an index-only scan.',
        simple: 'An index that already has everything the query asked for.',
      },
      {
        term: 'Normalisation',
        definition:
          'Organising tables so each fact is stored once, eliminating update anomalies. 1NF requires atomic values, 2NF removes partial dependencies on a composite key, 3NF removes transitive dependencies on non-key columns.',
        simple: 'Storing each fact in exactly one place.',
      },
      {
        term: 'Denormalisation',
        definition:
          'Deliberately duplicating data to avoid joins or to preserve a historical value. Correct when the duplication is a different fact (a price at time of sale) or a measured performance need.',
        simple: 'Repeating data on purpose, for speed or for history.',
      },
      {
        term: 'Transaction',
        definition:
          'A unit of work that either commits entirely or is rolled back entirely, with ACID guarantees: atomicity, consistency, isolation, durability.',
        simple: 'A group of changes that all happen or none do.',
      },
      {
        term: 'Isolation level',
        definition:
          'How much concurrent transactions may see of each other’s uncommitted or in-flight work. Read committed, repeatable read and serializable each forbid successively more anomalies at successively higher cost.',
        simple: 'How much other people’s half-finished work you are allowed to see.',
      },
    ],

    simpleExplanation:
      "This unit is about the three things that decide whether a database stays fast and stays correct. Indexes are the speed part. Without one, finding the rows where `country = 'Spain'` means reading every row; with one, the engine consults a sorted structure and goes straight there — the difference between reading a book cover to cover and using its index. The catch is that every index must be updated on every insert, update and delete, so indexes are not free and a table with fifteen of them writes slowly. Normalisation is the correctness part. If a customer's city is written on every one of their orders, then changing their city means changing hundreds of rows, and missing one leaves the database disagreeing with itself. Normalising means storing each fact once and joining when you need it. And transactions are the safety part: they let you group several changes so that either all of them happen or none do, which is why money cannot be taken from one account without arriving in the other, even if the power fails between the two statements.",

    whyItExists:
      'A database that is merely correct becomes unusable once it is large, and one that is merely fast becomes untrustworthy once it is shared. Indexes buy read speed at a write cost, normalisation buys consistency at a join cost, and transactions buy correctness under concurrency and failure at a coordination cost — and every real schema is a set of deliberate positions on those three trade-offs.',

    analogy: {
      scenario:
        'Picture a large reference library. The index at the back of each book lets you jump to page 412 rather than reading everything, but every time a page is edited the index must be corrected too. The library keeps one authoritative card per author rather than repeating the author’s address inside every book, so a change of address is one edit rather than four hundred. And when a book is transferred between branches, the removal from one catalogue and the addition to the other must both happen — a book recorded nowhere, or in two places at once, is worse than one that never moved.',
      mapping: [
        { from: 'The index at the back of a book', to: 'A B-tree index: sorted keys pointing at locations' },
        { from: 'Re-editing the index after every change to the text', to: 'Index maintenance cost on every write' },
        { from: 'One authoritative card per author', to: 'Normalisation: each fact stored once' },
        { from: 'The address repeated inside four hundred books', to: 'An update anomaly from denormalised data' },
        { from: 'A transfer that must remove and add together', to: 'A transaction: atomic, all or nothing' },
        { from: 'A book recorded in two branches at once', to: 'A consistency violation the transaction prevents' },
        { from: 'Two librarians editing the same card simultaneously', to: 'Concurrency, handled by the isolation level' },
      ],
      bridge:
        'Each library practice maps onto a database mechanism and, crucially, onto its cost. The book index really does have to be rebuilt when the text changes, which is exactly why you do not index every column. The single author card really does make a change of address trivial and a lookup slightly slower, which is exactly the normalisation trade-off. And the transfer really must be atomic, which is exactly what a transaction gives you.',
      limitations:
        'A library is mostly read and rarely written, which flatters indexes. A high-volume transactional system writes constantly, so the index cost is far more visible there, and the right number of indexes depends on the read/write ratio rather than on any universal rule.',
    },

    visuals: [
      {
        kind: 'ascii',
        title: 'A B-tree index, and what it saves',
        caption: 'Finding country = "Spain" among a million rows: three page reads instead of a million.',
        art: `WITHOUT AN INDEX                     WITH A B-TREE INDEX ON country

read row 1   ... no                            [ M ]              <- root
read row 2   ... no                           /     \\
read row 3   ... YES                    [ C | G ]  [ R | T ]      <- internal
    ...                                  /   |  \\    /   |  \\
read row 999,999 ... no           Chile ..  France  Nigeria  Spain ...
read row 1,000,000 ... no              (leaves, in sorted order,
                                        each pointing at its rows)
1,000,000 reads
                                   root -> internal -> leaf = 3 reads
                                   then follow the pointers to the rows

WHY IT WORKS                       WHAT IT COSTS
- leaves are kept sorted           - every INSERT/UPDATE/DELETE must
- fanout is high (hundreds of        also update every affected index
  keys per page), so depth is      - the index consumes disk space
  3-4 even for billions of rows    - the optimiser may still ignore it
- ranges are contiguous, so          if the predicate matches most rows
  BETWEEN and ORDER BY work too      (a scan is cheaper than many seeks)`,
      },
      {
        kind: 'table',
        title: 'Will this predicate use an index on the column?',
        columns: ['Predicate', 'Index usable?', 'Why'],
        rows: [
          ["`country = 'Spain'`", 'Yes', 'Equality on a bare column: a direct seek'],
          ["`price BETWEEN 10 AND 50`", 'Yes', 'A range over sorted keys is a contiguous scan of leaves'],
          ["`name LIKE 'Ada%'`", 'Yes', 'A prefix is a range; the index is sorted lexicographically'],
          ["`name LIKE '%Okafor'`", 'No', 'A leading wildcard has no starting point in the sort order'],
          ["`UPPER(name) = 'ADA'`", 'No', 'The index stores name, not UPPER(name); use an expression index'],
          ['`status <> ’shipped’`', 'Rarely', 'Matches most rows, so a full scan is usually cheaper'],
          ['`(a, b)` index, filter on `b` only', 'No', 'A composite index is usable only on a leading prefix'],
        ],
      },
      {
        kind: 'flow',
        title: 'Normalising a spreadsheet-shaped table',
        caption: 'Each step removes a specific class of anomaly.',
        steps: [
          { label: 'Unnormalised', detail: 'One wide row per order holding `product_names = ’keyboard, cable, monitor’` and the customer’s city repeated on every row.' },
          { label: '1NF — atomic values', detail: 'No repeating groups or lists in a cell. The product list becomes one row per product in `order_items`.' },
          { label: '2NF — no partial dependencies', detail: 'With a composite key (order_id, product_id), `product_name` depends on product_id alone, so it moves to `products`.' },
          { label: '3NF — no transitive dependencies', detail: '`customer_city` depends on customer_id, not on the order, so it moves to `customers`. Changing a city is now one update.' },
          { label: 'Deliberate denormalisation', detail: '`order_items.unit_price` stays, because the price charged then is a different fact from the price now. This is history, not redundancy.' },
        ],
      },
      {
        kind: 'table',
        title: 'ACID, and what each letter actually promises',
        columns: ['Property', 'Guarantee', 'What breaks without it'],
        rows: [
          ['Atomicity', 'All statements in the transaction commit, or none do', 'Money leaves one account and never arrives in the other'],
          ['Consistency', 'Constraints hold before and after; invalid states are rejected', 'An order exists for a deleted customer; a negative stock level'],
          ['Isolation', 'Concurrent transactions do not observe each other’s partial work', 'Two buyers both purchase the last item in stock'],
          ['Durability', 'Once committed, the change survives a crash or power loss', 'A confirmed order disappears when the server reboots'],
        ],
      },
      {
        kind: 'table',
        title: 'Isolation levels and the anomalies they prevent',
        caption: 'Higher levels forbid more, at the cost of more blocking or more retries.',
        columns: ['Level', 'Dirty read', 'Non-repeatable read', 'Phantom read'],
        rows: [
          ['Read uncommitted', 'Possible', 'Possible', 'Possible'],
          ['Read committed (PostgreSQL default)', 'Prevented', 'Possible', 'Possible'],
          ['Repeatable read', 'Prevented', 'Prevented', 'Possible in theory; prevented in PostgreSQL'],
          ['Serializable (SQLite default)', 'Prevented', 'Prevented', 'Prevented'],
        ],
      },
      {
        kind: 'widget',
        title: 'Look at a query plan',
        caption: 'Run `EXPLAIN QUERY PLAN SELECT * FROM customers WHERE country = ’Spain’;` before and after creating an index on country.',
        widget: 'sql-playground',
      },
    ],

    formalDefinition:
      'An index is a persistent auxiliary structure mapping key values to row locators, maintained transactionally with the base table, enabling the optimiser to substitute a logarithmic-cost seek or a bounded range scan for a linear table scan when the predicate is sargable and sufficiently selective. A relation is in third normal form when it is in first normal form (all attribute values atomic), second normal form (no non-prime attribute is functionally dependent on a proper subset of any candidate key), and no non-prime attribute is transitively dependent on a candidate key. A transaction is a sequence of operations executed with atomicity, consistency, isolation and durability, where the isolation level defines which concurrency anomalies — dirty reads, non-repeatable reads and phantoms — are permitted.',

    math: {
      intuition:
        'The reason an index is transformative is that logarithmic growth is almost flat. Doubling the size of a table adds one level to a binary structure, and because a B-tree page holds hundreds of keys rather than two, doubling the table barely changes the depth at all. A table of a thousand rows and a table of a billion are typically three and four page reads away from any given key.',
      formulas: [
        {
          latex: 'T_{\\text{scan}} = O(n) \\qquad T_{\\text{index}} = O(\\log_f n) + O(k)',
          name: 'Scan versus index lookup',
          meaning: 'A scan reads every row. An index descends the tree once and then reads the k matching rows, so it wins dramatically when k is small relative to n and not at all when k approaches n.',
          variables: [
            { symbol: 'n', meaning: 'Rows in the table' },
            { symbol: 'f', meaning: 'Fanout — keys per index page, typically in the hundreds' },
            { symbol: 'k', meaning: 'Rows actually matching the predicate' },
          ],
          category: 'complexity',
        },
        {
          latex: 'd = \\lceil \\log_f n \\rceil',
          name: 'B-tree depth',
          meaning: 'With a fanout of 200, a billion rows gives a depth of four. This is why index lookups feel constant-time in practice even though they are logarithmic.',
          variables: [
            { symbol: 'd', meaning: 'Depth: page reads to reach a leaf' },
            { symbol: 'f', meaning: 'Fanout per page' },
            { symbol: 'n', meaning: 'Number of indexed keys' },
          ],
          category: 'complexity',
        },
        {
          latex: 's = \\frac{k}{n}',
          name: 'Selectivity',
          meaning: 'The fraction of rows a predicate matches. Roughly, an index is worth using below a few per cent; above that the random row fetches cost more than a sequential scan, which is why the optimiser sometimes ignores a perfectly good index.',
          variables: [
            { symbol: 's', meaning: 'Selectivity: lower is more selective' },
            { symbol: 'k', meaning: 'Matching rows' },
            { symbol: 'n', meaning: 'Total rows' },
          ],
        },
        {
          latex: 'C_{\\text{write}} \\approx C_{\\text{table}} + \\sum_{i=1}^{m} C_{\\text{index}_i}',
          name: 'The write cost of indexes',
          meaning: 'Every insert, update of an indexed column, and delete must maintain every affected index, so write cost grows roughly linearly in the number of indexes.',
          variables: [
            { symbol: 'm', meaning: 'Number of indexes on the table' },
            { symbol: 'C_{\\text{index}_i}', meaning: 'Maintenance cost of index i' },
          ],
        },
      ],
      derivation: [
        'Take a table of one billion rows with an index fanout of 200 keys per page.',
        'Depth is ceil(log_200 of 10^9) = ceil(9 / log10(200)) = ceil(9 / 2.3) = 4.',
        'So any single key is found in about four page reads, versus roughly 10^9 row reads for a full scan.',
        'Now double the table to two billion rows: log_200 of 2x10^9 is about 4.04, so the depth is still 4.',
        'Doubling the data did not measurably change lookup cost — that flatness is the whole value of the structure.',
        'But if the predicate matches 400 million rows, the index requires 400 million random row fetches, which is slower than one sequential scan — hence selectivity, not merely sargability, decides whether the index is used.',
      ],
    },

    workedExample: {
      title: 'Diagnosing a slow query end to end',
      setup:
        'A dashboard query that lists a customer’s recent orders has degraded from 20 ms to 4 seconds as the orders table grew to 20 million rows. The query is `SELECT * FROM orders WHERE customer_id = 4812 AND order_date >= ’2024-01-01’ ORDER BY order_date DESC LIMIT 20`.',
      steps: [
        {
          label: 'Read the plan before changing anything',
          detail:
            '`EXPLAIN QUERY PLAN` in SQLite, `EXPLAIN (ANALYZE, BUFFERS)` in PostgreSQL. It reports `SCAN orders`, meaning every one of the 20 million rows is being read and 19,999,980 of them discarded.',
        },
        {
          label: 'Check whether the predicate is sargable',
          detail:
            'Both conditions leave the column bare, so an index is usable. Had the query written `WHERE strftime(’%Y’, order_date) = ’2024’`, no index on order_date could help and the rewrite would come first.',
        },
        {
          label: 'Choose the index columns and their order',
          detail:
            '`CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date DESC)`. The equality column goes first so the seek lands on a contiguous block; the range column second so the block can be scanned in order. Reversing them would force a scan of every customer within the date range.',
          latex: 'k \\approx 20 \\text{ of } n = 2\\times10^7 \\Rightarrow s = 10^{-6}',
        },
        {
          label: 'Note the second win: the sort disappears',
          detail:
            'Because the index stores order_date descending within each customer, the ORDER BY is satisfied by reading the index in order, and the LIMIT stops after 20 rows. The engine never sorts and never touches the other rows at all.',
        },
        {
          label: 'Measure the write cost',
          detail:
            'One more index on a high-write table means every insert updates one more B-tree. On an orders table taking a few hundred inserts per second this is negligible; on an events table taking fifty thousand it may not be, and the honest answer is to measure rather than assume.',
        },
        {
          label: 'Re-read the plan to confirm',
          detail:
            'It should now show `SEARCH orders USING INDEX idx_orders_cust_date (customer_id=? AND order_date>?)`. If it still says SCAN, the optimiser judged the index unhelpful — usually stale statistics (run ANALYZE) or a predicate less selective than you believed.',
        },
      ],
      conclusion:
        'The discipline is plan, diagnose, change one thing, re-plan. Column order in a composite index follows the shape of the predicate — equality columns first, then ranges, then columns needed only for ordering — and the biggest single win is often not the seek but the sort you no longer have to perform.',
    },

    codeExamples: [
      {
        language: 'sql',
        title: 'Creating indexes and reading the plan',
        runnable: true,
        code: `-- Before: a full scan
EXPLAIN QUERY PLAN
SELECT * FROM customers WHERE country = 'Spain';

CREATE INDEX idx_customers_country ON customers(country);

-- After: a seek
EXPLAIN QUERY PLAN
SELECT * FROM customers WHERE country = 'Spain';

-- Composite index: equality column first, range column second
CREATE INDEX idx_orders_cust_date ON orders(customer_id, order_date);

-- Unique index doubles as a constraint
CREATE UNIQUE INDEX idx_products_name ON products(name);

-- Partial index: smaller and cheaper when you only query a subset
CREATE INDEX idx_orders_pending ON orders(order_date) WHERE status = 'pending';`,
        explanation:
          'Reading the plan is the only reliable way to know what the engine is doing; timings alone confound caching with algorithmic change. The composite index serves `WHERE customer_id = ?`, `WHERE customer_id = ? AND order_date > ?` and ordering by date within a customer, but not `WHERE order_date > ?` alone — a composite index is usable only on a leading prefix. The partial index is a genuinely underused tool: if 95% of orders are shipped and you only ever query pending ones, an index over just those rows is a twentieth of the size and is maintained only when a pending row changes.',
        output: `-- before
SCAN customers

-- after
SEARCH customers USING INDEX idx_customers_country (country=?)`,
      },
      {
        language: 'sql',
        title: 'Normalising an unnormalised table',
        runnable: true,
        code: `-- Unnormalised: repeating groups and redundant facts
CREATE TABLE bad_orders (
  order_id      INTEGER,
  customer_name TEXT,
  customer_city TEXT,      -- repeated on every order of that customer
  product_names TEXT,      -- 'keyboard, cable, monitor' - not atomic
  total         REAL
);

-- 3NF: each fact lives in exactly one place
CREATE TABLE customers_n (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT
);
CREATE TABLE products_n (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0)
);
CREATE TABLE orders_n (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers_n(id),
  order_date  TEXT NOT NULL
);
CREATE TABLE order_items_n (
  order_id   INTEGER NOT NULL REFERENCES orders_n(id)   ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products_n(id),
  quantity   INTEGER NOT NULL CHECK (quantity > 0),
  unit_price REAL    NOT NULL,   -- deliberate: the price charged THEN
  PRIMARY KEY (order_id, product_id)
);`,
        explanation:
          'Three anomalies disappear. The update anomaly: a customer moving city was previously hundreds of edits and is now one. The insertion anomaly: a product can now exist before anyone has ordered it, which the wide table made impossible. The deletion anomaly: deleting the last order for a customer no longer erases the customer’s city. Note the one deliberate exception — `unit_price` is kept on the item even though `products_n.price` exists, because the price charged on a past order is a genuinely different fact from the current price, and re-deriving it by join would silently rewrite history every time a price changed.',
        output: `-- the wide table's update anomaly
UPDATE bad_orders SET customer_city = 'Bilbao' WHERE customer_name = 'Ben Torres';
-- 412 rows affected; miss one and the database contradicts itself

-- the normalised equivalent
UPDATE customers_n SET city = 'Bilbao' WHERE id = 2;
-- 1 row affected`,
      },
      {
        language: 'sql',
        title: 'Transactions: all or nothing',
        runnable: true,
        code: `BEGIN TRANSACTION;

  -- Take the last unit of stock
  UPDATE products SET stock = stock - 1 WHERE id = 14 AND stock >= 1;

  -- Record the order
  INSERT INTO orders (id, customer_id, order_date, status)
  VALUES (500, 1, '2024-06-01', 'pending');

  INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
  VALUES (900, 500, 14, 1, 89.0);

COMMIT;

-- If anything failed, ROLLBACK undoes every statement above.

-- A savepoint allows partial rollback inside a larger transaction
BEGIN;
  INSERT INTO customers (id, name, country) VALUES (99, 'Test User', 'Ireland');
  SAVEPOINT before_risky;
  UPDATE products SET price = price * 10;   -- oops
  ROLLBACK TO before_risky;                 -- undo only the update
COMMIT;                                     -- the customer insert survives`,
        explanation:
          'Without the transaction, a failure between the stock decrement and the order insert would leave stock reduced for an order that does not exist — inventory quietly disappearing. Atomicity makes the three statements one unit. Note the `AND stock >= 1` guard on the update: it prevents stock going negative even under concurrency, because the condition is evaluated against the row as locked by this transaction. Savepoints give partial rollback within a transaction, which is how ORMs implement nested transactions, since true nesting is not supported.',
        output: `-- with the guard, if another session already took the last unit:
0 rows updated  -> application detects this and rolls back the whole order`,
      },
      {
        language: 'sql',
        title: 'The lost update, and two ways to prevent it',
        code: `-- DANGEROUS: read, compute in the application, write back
-- Session A                          Session B
SELECT stock FROM products            SELECT stock FROM products
WHERE id = 14;        -- 1            WHERE id = 14;        -- 1
-- app computes 1 - 1 = 0             -- app computes 1 - 1 = 0
UPDATE products SET stock = 0         UPDATE products SET stock = 0
WHERE id = 14;                        WHERE id = 14;
-- two sales, one unit of stock sold twice

-- FIX 1: let the database do the arithmetic (atomic read-modify-write)
UPDATE products SET stock = stock - 1 WHERE id = 14 AND stock >= 1;

-- FIX 2: optimistic concurrency with a version column
UPDATE products SET stock = 0, version = version + 1
WHERE id = 14 AND version = 7;   -- 0 rows updated means someone beat you`,
        explanation:
          'The lost update is the most common concurrency bug in application code, and it is invisible in testing because it needs two sessions to interleave. Fix 1 works because the whole read-modify-write happens inside one statement, which the engine executes atomically against a locked row; the `stock >= 1` guard then turns a race into a clean zero-rows-updated that the application can detect. Fix 2 generalises to cases where the new value cannot be expressed as an increment: the version check fails if anyone changed the row since you read it, and your application retries. Raising the isolation level to serializable is a third option, and PostgreSQL will then abort one of the transactions with a serialization failure that you must be prepared to retry.',
        output: `-- Fix 1, when another session already took the unit
0 rows updated

-- Fix 2, when the version has moved on
0 rows updated  -> reload and retry`,
      },
      {
        language: 'sql',
        title: 'When denormalisation is the right call',
        runnable: true,
        code: `-- Fully normalised: correct, but this join runs on every page view
SELECT c.name, COUNT(o.id) AS lifetime_orders
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.name;

-- Denormalised: a maintained counter, read in O(1)
ALTER TABLE customers ADD COLUMN lifetime_orders INTEGER NOT NULL DEFAULT 0;

-- Maintained inside the same transaction that creates the order
BEGIN;
  INSERT INTO orders (id, customer_id, order_date, status)
  VALUES (501, 1, '2024-06-02', 'pending');
  UPDATE customers SET lifetime_orders = lifetime_orders + 1 WHERE id = 1;
COMMIT;`,
        explanation:
          'This is a legitimate denormalisation and also a cautionary one. It is legitimate because an aggregate recomputed on every page view is real, measurable cost, and the counter turns it into a single column read. It is cautionary because the counter is now a second copy of a derived fact, and the only thing keeping it true is that every write path remembers to maintain it inside the same transaction. A bulk import that bypasses the application, or a delete that forgets the decrement, silently desynchronises it. If you denormalise, you owe the system a reconciliation job that recomputes the truth and reports drift — otherwise the optimisation becomes a slowly accumulating lie.',
        output: `-- reconciliation query you should run on a schedule
SELECT c.id, c.lifetime_orders AS stored, COUNT(o.id) AS actual
FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.lifetime_orders
HAVING c.lifetime_orders <> COUNT(o.id);`,
      },
    ],

    realWorldExamples: [
      {
        context: 'A slow endpoint traced to a missing index',
        usage:
          'The single most common production performance fix is adding an index on a foreign key that is joined or filtered constantly. PostgreSQL does not create one automatically for the referencing side, so it is a routine oversight.',
      },
      {
        context: 'Analytical warehouses that denormalise on purpose',
        usage:
          'Star schemas flatten dimensions into fact tables because analytical queries are read-mostly and joins dominate cost. The normalisation rules are not abandoned — they are traded away knowingly, with the source of truth still normalised upstream.',
      },
      {
        context: 'Double-booking in a reservation system',
        usage:
          'Two users seeing the last seat available and both booking it is the lost-update anomaly. It is prevented by a conditional update, a unique constraint on the seat, or serializable isolation with retry — not by checking availability first.',
      },
      {
        context: 'Training-data snapshots',
        usage:
          'Extracting a dataset inside a transaction, or from a point-in-time snapshot, is what makes the extraction reproducible. Without it, a long-running query sees rows written mid-scan and the dataset cannot be regenerated.',
      },
      {
        context: 'Over-indexed write-heavy tables',
        usage:
          'Event and log tables with a dozen indexes added over years become insert-bound. Auditing index usage — `pg_stat_user_indexes` in PostgreSQL — and dropping unused ones is a standard and often dramatic win.',
      },
    ],

    projectConnections: [
      { tool: 'PostgreSQL EXPLAIN ANALYZE', role: 'Shows the chosen plan with actual row counts and timings; a large gap between estimated and actual rows usually means stale statistics.' },
      { tool: 'Alembic / Flyway', role: 'Apply schema and index changes in versioned, reversible steps, so a normalisation change can be rolled forward across environments safely.' },
      { tool: 'SQLAlchemy', role: 'Its session is a transaction; understanding commit, rollback and the lost-update problem is what stops ORM code corrupting data under load.' },
      { tool: 'dbt', role: 'Analytical models are deliberately denormalised, with tests standing in for the constraints a warehouse does not enforce.' },
      { tool: 'pgbench / EXPLAIN (BUFFERS)', role: 'Measure before and after rather than reasoning about index benefit in the abstract; selectivity is an empirical property of your data.' },
    ],

    commonMistakes: [
      {
        mistake: 'Indexing every column "just in case"',
        why: 'Each index must be maintained on every insert, update of that column, and delete, so writes slow roughly linearly in the number of indexes, and unused indexes consume space and cache for nothing.',
        fix: 'Index what you actually filter, join and sort on, verify with the plan, and audit usage periodically to drop indexes nothing reads.',
      },
      {
        mistake: 'Getting composite index column order wrong',
        why: 'An index on `(order_date, customer_id)` cannot serve `WHERE customer_id = ?` alone, because a composite index is only usable on a leading prefix.',
        fix: 'Put equality columns first, then range columns, then columns needed only for ordering. Match the order to the predicate shape.',
      },
      {
        mistake: 'Assuming an index will always be used because it exists',
        why: 'If the predicate matches a large fraction of rows, random fetches through the index cost more than a sequential scan, so the optimiser correctly ignores it.',
        fix: 'Read the plan. If the index should be used and is not, check selectivity and refresh statistics with ANALYZE before blaming the optimiser.',
      },
      {
        mistake: 'Normalising to the point of unusability, or not at all',
        why: 'Over-normalising produces queries joining eight tables for one screen; under-normalising produces update anomalies where the same fact disagrees with itself in different rows.',
        fix: 'Normalise to 3NF by default in a transactional system, then denormalise specific, measured hot paths — and write a reconciliation check for anything you duplicate.',
      },
      {
        mistake: 'Read-modify-write in application code without a guard',
        why: 'Two sessions can both read the old value and both write back, so one update is silently lost. It never reproduces in single-user testing.',
        fix: 'Do the arithmetic in SQL (`SET stock = stock - 1 WHERE stock >= 1`), or use a version column, or use serializable isolation with retry logic.',
      },
      {
        mistake: 'Holding a transaction open while doing slow work',
        why: 'Locks are held for the transaction’s whole duration, so waiting on an HTTP call inside a transaction blocks other writers and can exhaust the connection pool.',
        fix: 'Keep transactions short and purely about the database. Do external calls before BEGIN or after COMMIT, and design for the possibility of retry.',
      },
      {
        mistake: 'Expecting a foreign key to create an index on the referencing column',
        why: 'PostgreSQL and SQLite index the referenced key but not the referencing one, so joins and cascading deletes on the child table can scan it entirely.',
        fix: 'Create the index explicitly on every foreign-key column you join or delete through. MySQL/InnoDB does it automatically, which is why the habit is easy to lose.',
      },
    ],

    interviewQuestions: [
      {
        level: 'intermediate',
        question: 'How does an index make a query faster, and what does it cost?',
        answer:
          'A B-tree index stores the indexed column’s values in sorted order with pointers back to the rows, so instead of scanning every row the engine descends the tree — typically three or four page reads even for a billion rows — and then reads only the matching rows. Because the leaves are sorted, the same structure also serves range predicates and can satisfy an ORDER BY without a sort, which is frequently the larger win. The costs are real: every insert, delete and update of an indexed column must maintain every affected index, so write throughput falls roughly linearly in the number of indexes; the index occupies disk and competes for cache; and it only helps when the predicate is sargable and selective, since matching a large fraction of rows makes a sequential scan cheaper than many random fetches.',
        followUp:
          'A strong answer mentions covering indexes, where the index contains every column the query needs so the table is never visited at all.',
      },
      {
        level: 'intermediate',
        question: 'Explain 1NF, 2NF and 3NF, and when you would deliberately break them.',
        answer:
          '1NF: every value is atomic — no lists or repeating groups in a cell — so a comma-separated product list becomes separate rows. 2NF: in 1NF and no non-key column depends on only part of a composite key; with a key of (order_id, product_id), a product name depends on product_id alone and belongs in a products table. 3NF: in 2NF and no non-key column depends on another non-key column; a customer’s city depends on the customer, not the order, so it belongs in customers. The purpose throughout is to store each fact once, so an update is one row and the database cannot contradict itself. You break it deliberately in two situations: when the duplicate is actually a different fact, such as the unit price charged on a past order, which must not change when the catalogue price does; and when a measured hot path needs a maintained aggregate or a flattened dimension, as in an analytical star schema. Both cases require a reconciliation check, because a duplicate with no owner drifts.',
      },
      {
        level: 'ml-engineer',
        question: 'What does ACID mean, and which property fails when two users buy the last item in stock?',
        answer:
          'Atomicity: a transaction commits entirely or not at all. Consistency: declared constraints hold before and after, so invalid states are rejected. Isolation: concurrent transactions do not observe each other’s partial work. Durability: once committed, the change survives a crash. The double-sale is an isolation failure, specifically a lost update: both sessions read stock = 1, both compute 0, and both write it, so one sale is silently lost from the inventory. Atomicity does not help, because each transaction is individually complete. The fixes are to make the read-modify-write atomic in one statement — `UPDATE products SET stock = stock - 1 WHERE id = ? AND stock >= 1` — which turns the race into a detectable zero-rows-updated, or to use optimistic concurrency with a version column, or to run at serializable isolation and retry on a serialization failure. Adding a CHECK constraint that stock must be non-negative is worth having as well, since it converts a silent corruption into a loud error.',
        followUp:
          'Noting that this bug never appears in single-user testing, and therefore needs a concurrency test or a constraint to catch, is what distinguishes experience here.',
      },
      {
        level: 'internship',
        question: 'A query that was fast last month now takes 30 seconds. Walk me through your diagnosis.',
        answer:
          'First, get the plan with EXPLAIN ANALYZE rather than guessing, and compare estimated with actual row counts — a large divergence points at stale statistics, fixed by ANALYZE. If the plan shows a sequential scan where a seek is expected, check whether the predicate is still sargable: a recent change wrapping a column in a function, or a leading wildcard in a LIKE, disables the index. If the predicate is fine and the index exists, the table may simply have grown past the point where the optimiser thinks the index is worthwhile, which is a selectivity question. I would also check whether the shape of the query changed — a new join to a one-to-many table both multiplies rows and changes the plan — and whether an index was dropped during a migration. Then change exactly one thing and re-read the plan, because changing several at once tells you nothing about which helped.',
      },
      {
        level: 'ai-engineer',
        question: 'Why does index column order matter in a composite index?',
        answer:
          'A composite index sorts by the first column, then the second within equal values of the first, and so on — like a phone book sorted by surname then forename. That means it can serve any query filtering on a leading prefix of the columns, and cannot serve one that skips the first. An index on `(customer_id, order_date)` supports filtering by customer, by customer and date range, and ordering by date within a customer; it does not support filtering by date alone, exactly as a phone book is useless for finding everyone called James. The practical rule is equality columns first, then the range column, then any column needed only to satisfy the ORDER BY — because an equality on the leading column lands on a contiguous block of the index that the range can then scan in order.',
      },
    ],

    practiceQuestions: [
      {
        prompt: 'Given `SELECT * FROM orders WHERE customer_id = ? AND status = ’pending’ ORDER BY order_date DESC LIMIT 20`, design the best index and justify the column order.',
        hint: 'Two equality predicates, then an ordering column. Which order lets the index satisfy all three jobs?',
        language: 'sql',
        solution:
          "CREATE INDEX idx_orders_cust_status_date\n  ON orders(customer_id, status, order_date DESC);\n\nThe two equality columns come first, so a seek lands on the contiguous block of rows for that customer with that status. Within that block the index is already sorted by order_date descending, so the ORDER BY needs no sort and the LIMIT stops after twenty entries — the query touches twenty index entries and twenty rows, regardless of table size. Putting order_date first would be much worse: the engine would have to scan every order in date order, filtering on customer and status as it went. If pending orders are a small minority, a partial index is better still: `CREATE INDEX ... ON orders(customer_id, order_date DESC) WHERE status = 'pending'`, which is smaller and is maintained only when pending rows change.",
      },
      {
        prompt: 'This table violates 2NF and 3NF. Identify each violation and rewrite it: `enrolments(student_id, course_id, student_name, student_email, course_title, instructor_name, instructor_email, grade)` with primary key (student_id, course_id).',
        hint: 'Ask of each column: does it depend on the whole key, part of the key, or on another non-key column?',
        language: 'sql',
        solution:
          "The 2NF violations are partial dependencies on half the composite key: `student_name` and `student_email` depend on student_id alone, and `course_title` and `instructor_name` depend on course_id alone. The 3NF violation is transitive: `instructor_email` depends on `instructor_name`, a non-key column, not on the key at all. Only `grade` genuinely depends on the whole key.\n\nCREATE TABLE students (\n  id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE\n);\nCREATE TABLE instructors (\n  id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE\n);\nCREATE TABLE courses (\n  id INTEGER PRIMARY KEY, title TEXT NOT NULL,\n  instructor_id INTEGER NOT NULL REFERENCES instructors(id)\n);\nCREATE TABLE enrolments (\n  student_id INTEGER NOT NULL REFERENCES students(id),\n  course_id  INTEGER NOT NULL REFERENCES courses(id),\n  grade      TEXT,\n  PRIMARY KEY (student_id, course_id)\n);\n\nChanging an instructor's email is now one update rather than one per enrolment they teach, and a course can exist before anyone enrols — the insertion anomaly the original design made impossible.",
      },
      {
        prompt: 'Write the transaction that transfers 100 units of stock from product 3 to product 7, and explain what protects it from going wrong.',
        hint: 'Two updates that must both succeed. Guard the decrement so stock cannot go negative.',
        language: 'sql',
        solution:
          "BEGIN TRANSACTION;\n  UPDATE products SET stock = stock - 100 WHERE id = 3 AND stock >= 100;\n  -- application checks that exactly 1 row was updated; if 0, ROLLBACK\n  UPDATE products SET stock = stock + 100 WHERE id = 7;\nCOMMIT;\n\nThree mechanisms are doing work. Atomicity means a crash between the two updates cannot leave the stock destroyed — on restart the whole transaction is rolled back. The `stock >= 100` guard makes the decrement conditional and evaluated atomically against the locked row, so two concurrent transfers cannot both succeed against insufficient stock; the second gets zero rows updated, which the application must check and act on. Isolation means no other session sees the intermediate state where the stock exists in neither product. A `CHECK (stock >= 0)` constraint on the table is worth adding too, as a last line of defence that turns any path bypassing the guard into a loud error rather than silent corruption.",
      },
      {
        prompt: 'A colleague proposes adding a `total_spent` column to `customers`, maintained by the application, to avoid a join. Argue both sides and state what you would require before agreeing.',
        hint: 'Think about read frequency, write paths, and what happens when the two copies disagree.',
        solution:
          'In favour: if the lifetime-spend figure is read on every page load and computing it requires joining orders to order_items and aggregating, that is genuine repeated cost, and a single column read is O(1). Denormalisation of a derived aggregate is a standard and legitimate optimisation. Against: the column becomes a second copy of a fact that is already derivable, and it is only true for as long as every write path remembers to maintain it — a bulk import, a manual correction, a refund path someone forgets, and it silently drifts. Wrong data that looks authoritative is worse than a slow query. What I would require before agreeing: evidence that the join is actually a bottleneck rather than an assumption; every maintenance update performed inside the same transaction as the change that causes it, so it cannot be half-applied; and a scheduled reconciliation query that recomputes the true value and alerts on any mismatch. With those three, it is an engineering trade-off; without them, it is a bug with a schedule.',
      },
    ],

    quiz: [
      {
        id: 'SQL-013-q1',
        type: 'mcq',
        concept: 'index cost',
        prompt: 'What is the main cost of adding an index to a table?',
        options: [
          'Every insert, delete and update of the indexed column must also maintain the index',
          'Queries on other columns become incorrect',
          'The table can no longer be joined',
          'Existing rows must be rewritten on every read',
        ],
        answerIndex: 0,
        explanation:
          'Indexes are maintained transactionally with the table, so write cost grows roughly linearly with the number of indexes. They also consume disk and cache.',
      },
      {
        id: 'SQL-013-q2',
        type: 'multi',
        concept: 'sargability and selectivity',
        prompt: 'Which conditions would prevent an index on `orders(order_date)` from being used? Select all that apply.',
        options: [
          "The predicate is `strftime('%Y', order_date) = '2024'`",
          'The predicate matches 80% of the rows',
          'The predicate is `order_date >= ’2024-01-01’`',
          'The statistics are stale and badly misestimate the row count',
          'The query also selects columns not in the index',
        ],
        answerIndices: [0, 1, 3],
        explanation:
          'Wrapping the column in a function destroys sargability; poor selectivity makes a scan cheaper; stale statistics mislead the optimiser. A bare range is ideal, and selecting extra columns only costs an extra table fetch.',
      },
      {
        id: 'SQL-013-q3',
        type: 'match',
        concept: 'acid',
        prompt: 'Match each ACID property to the failure it prevents.',
        pairs: [
          { left: 'Atomicity', right: 'Money leaves one account and never arrives in the other' },
          { left: 'Consistency', right: 'An order exists referencing a customer that was deleted' },
          { left: 'Isolation', right: 'Two buyers both purchase the last item in stock' },
          { left: 'Durability', right: 'A confirmed order vanishes after the server reboots' },
        ],
        explanation:
          'Each letter answers a specific way that concurrent, failure-prone systems corrupt data. Naming which one is at fault is usually the first step in fixing a data bug.',
      },
      {
        id: 'SQL-013-q4',
        type: 'truefalse',
        concept: 'composite indexes',
        prompt: 'An index on `(customer_id, order_date)` can efficiently serve a query filtering only on `order_date`.',
        answer: false,
        explanation:
          'A composite index is sorted by its first column, so it is usable only on a leading prefix. Filtering on the second column alone requires scanning the whole index or the table.',
      },
      {
        id: 'SQL-013-q5',
        type: 'order',
        concept: 'normalisation',
        prompt: 'Order the normalisation steps as they are applied to a wide, spreadsheet-shaped table.',
        items: [
          'Make every value atomic — no lists or repeating groups (1NF)',
          'Remove columns depending on only part of a composite key (2NF)',
          'Remove columns depending on another non-key column (3NF)',
          'Denormalise specific hot paths deliberately, with reconciliation',
        ],
        explanation:
          'Each normal form assumes the previous one. Denormalisation comes last and only with measurement, because it trades away a guarantee you have to replace with a check.',
      },
      {
        id: 'SQL-013-q6',
        type: 'debug',
        language: 'sql',
        concept: 'lost update',
        prompt: 'Two sessions run this concurrently and one unit of stock gets sold twice. What is the minimal fix?',
        code: "-- application reads stock, computes new value, writes it back\nSELECT stock FROM products WHERE id = 14;   -- both read 1\nUPDATE products SET stock = 0 WHERE id = 14; -- both write 0",
        options: [
          "Do the arithmetic in SQL: `UPDATE products SET stock = stock - 1 WHERE id = 14 AND stock >= 1`",
          'Add an index on products(stock)',
          'Wrap the SELECT in a transaction and leave the UPDATE as it is',
          'Change stock to a REAL column',
        ],
        answerIndex: 0,
        explanation:
          'Making the read-modify-write a single statement executes it atomically against a locked row, and the guard turns a race into a detectable zero-rows-updated. Wrapping the read alone changes nothing.',
      },
      {
        id: 'SQL-013-q7',
        type: 'numeric',
        concept: 'b-tree depth',
        prompt: 'With a fanout of 100 keys per page, roughly how many page reads does it take to find a key among 100 million rows? (log base 100 of 10^8)',
        answer: 4,
        tolerance: 0.5,
        explanation:
          'log base 100 of 10^8 is 4, so about four page reads — versus 100 million row reads for a scan. The flatness of the logarithm is why index lookups feel constant-time.',
      },
      {
        id: 'SQL-013-q8',
        type: 'explain',
        concept: 'design trade-offs',
        prompt: 'A teammate wants to denormalise a frequently joined table to speed up a dashboard. Explain what you would want to establish first, and what you would require alongside the change.',
        rubric: [
          'Asks for evidence that the join is genuinely the bottleneck, from a plan or a measurement',
          'Notes that duplicated data can drift and that every write path must maintain it',
          'Requires a reconciliation check and maintenance inside the same transaction',
        ],
        sampleAnswer:
          'First I would want the plan and a measurement, because "the join is slow" is usually an assumption and the actual cost is often a missing index on a foreign key, which is a far cheaper fix with no correctness cost. If the join really is the bottleneck, denormalisation is a legitimate tool — analytical schemas do it deliberately. But duplicating a derived value creates a second source of truth that is correct only while every write path maintains it, and the paths that forget are exactly the unusual ones: bulk imports, manual corrections, refund flows. So I would require two things alongside the change. The maintenance must happen in the same transaction as the change that causes it, so it cannot be half-applied. And there must be a scheduled reconciliation query that recomputes the true value, compares it, and alerts on drift. With those, it is an engineering trade-off with a safety net; without them, it is a data-quality incident waiting for a quiet week.',
        explanation:
          'The examinable judgement is that denormalisation trades an enforced guarantee for a maintained convention, and a maintained convention needs an owner and a check.',
      },
    ],

    flashcards: [
      { front: 'What does a B-tree index do?', back: 'Stores column values sorted with pointers to rows, so a lookup is 3–4 page reads instead of a full scan. Ranges and ORDER BY benefit too.' },
      { front: 'What does an index cost?', back: 'Maintenance on every insert, delete and update of the indexed column, plus disk and cache. Write cost grows roughly linearly in index count.' },
      { front: 'Why might the optimiser ignore an index?', back: 'Poor selectivity — if the predicate matches most rows, a sequential scan beats many random fetches. Or stale statistics; run ANALYZE.' },
      { front: 'Composite index column order rule', back: 'Equality columns first, then the range column, then ordering columns. Usable only on a leading prefix.' },
      { front: '1NF, 2NF, 3NF in one line each', back: '1NF: atomic values. 2NF: no dependency on part of a composite key. 3NF: no dependency on another non-key column.' },
      { front: 'When is denormalisation correct?', back: 'When the duplicate is a different fact (price charged then), or a measured hot path needs it — and only with transactional maintenance plus a reconciliation check.' },
      { front: 'What are the four ACID properties?', back: 'Atomicity (all or nothing), Consistency (constraints hold), Isolation (no partial work visible), Durability (survives a crash).' },
      { front: 'What is a lost update and how do you prevent it?', back: 'Two sessions read the same value and both write back, losing one change. Fix with atomic `SET x = x - 1 WHERE ...`, a version column, or serializable isolation with retry.' },
      { front: 'How do you know what a query is actually doing?', back: '`EXPLAIN QUERY PLAN` in SQLite, `EXPLAIN ANALYZE` in PostgreSQL. SCAN means full table; SEARCH USING INDEX means a seek.' },
    ],

    challenge: {
      title: 'Audit and improve a schema',
      brief:
        'Take the sample schema and produce a written design review with evidence. Identify every foreign-key column lacking an index and create the ones a real workload would need, showing the plan before and after for a representative query. Identify at least one place where the schema is deliberately denormalised and explain why it is correct there. Propose one denormalisation that would speed up a plausible dashboard, together with the transaction that maintains it and the reconciliation query that would detect drift. Finally, write a transaction that places an order and decrements stock safely, and explain which ACID property protects against which specific failure.',
      language: 'sql',
      acceptanceCriteria: [
        'Every foreign-key column is checked for an index, with the missing ones created',
        'EXPLAIN QUERY PLAN output is shown before and after at least one index change',
        'The existing deliberate denormalisation is identified and justified as a distinct fact rather than redundancy',
        'The proposed denormalisation comes with both a maintaining transaction and a reconciliation query',
        'The order-placement transaction guards against negative stock and the guard is explained',
        'Each ACID property is tied to a specific failure it prevents in this schema',
      ],
      starterCode: "-- Which foreign-key columns have no index?\nSELECT name FROM sqlite_master WHERE type = 'index';\nEXPLAIN QUERY PLAN\nSELECT * FROM orders WHERE customer_id = 1;\n",
    },

    teachingPrompt: {
      prompt:
        'Imagine I can write good queries but have never designed a database. Teach me the three things that keep a database fast and correct as it grows.',
      mustCover: [
        'An index is a sorted structure that turns reading everything into jumping straight there',
        'Indexes cost write time and space, so you index what you actually filter, join and sort on',
        'Normalisation means storing each fact once, so an update is one row and the data cannot contradict itself',
        'Denormalisation is sometimes correct, but it needs maintenance and a check because duplicates drift',
        'A transaction groups changes so they all happen or none do, which is what ACID formalises',
      ],
      bonusSignals: ['uses a book-index analogy', 'gives a concrete update anomaly', 'mentions the lost-update problem under concurrency'],
      sampleExplanation:
        'Three things, and each is a trade. The first is indexes. Without one, finding the Spanish customers means reading every customer; with one, the database consults a sorted structure and jumps straight to them, the way you would use the index at the back of a book instead of reading it cover to cover. It is dramatic — three or four lookups instead of a million — but it is not free, because every time you add or change a row the index has to be brought up to date too. So you index the columns you genuinely search, join and sort on, not everything. The second is normalisation, which just means writing each fact down once. If a customer’s city is copied onto every one of their orders, then when they move you have to change four hundred rows, and the day you miss one the database starts disagreeing with itself. Put the city on the customer, refer to the customer from the order, and the move becomes a single edit. The third is transactions. Some changes only make sense together: take the stock, create the order. A transaction wraps them so either both happen or neither does, even if the power fails in between — and it also stops two people at once both selling the last item, which is a bug you will never see in testing because it needs two things happening at the same moment.',
    },
  },
];
