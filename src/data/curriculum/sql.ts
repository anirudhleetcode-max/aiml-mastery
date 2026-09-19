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
