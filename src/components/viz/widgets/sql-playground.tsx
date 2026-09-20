'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';
import { Readout, WidgetShell } from './shared';

/**
 * A SQL playground with a real, if small, SQL engine.
 *
 * The engine below — tokeniser, recursive-descent parser, evaluator — is
 * written out by hand in TypeScript. That buys three things the curriculum
 * needs: it works offline, it adds no dependency, and every refusal is a
 * sentence a learner can act on rather than a parser stack trace. Anything it
 * cannot do, it says so by name.
 *
 * The clause order of the evaluator is the clause order SQL actually uses —
 * FROM, WHERE, GROUP BY, HAVING, SELECT, DISTINCT, ORDER BY, LIMIT — which is
 * the single most useful thing a beginner can internalise, so the code is
 * arranged to make it visible.
 */

/* ───────────────────────── values ───────────────────────── */

type Val = string | number | null;
/** Evaluation also produces booleans; they become 1/0 on the way out, as in SQL. */
type EVal = Val | boolean;
type Row = Record<string, Val>;

class SqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SqlError';
  }
}

/* ───────────────────────── sample database ───────────────────────── */

type ColType = 'INTEGER' | 'REAL' | 'TEXT' | 'DATE';

interface ColumnDef {
  name: string;
  type: ColType;
  key?: 'PK' | 'FK';
  nullable?: boolean;
}

interface TableDef {
  name: string;
  blurb: string;
  columns: ColumnDef[];
  rows: Val[][];
}

const CUSTOMERS: Val[][] = [
  [1, 'Ana Ferreira', 'Sao Paulo', 'Brazil', '2023-01-15'],
  [2, 'Mia Chen', 'Toronto', 'Canada', '2023-01-28'],
  [3, 'Noah Fischer', 'Berlin', 'Germany', '2023-02-09'],
  [4, 'Priya Raman', 'Bengaluru', 'India', '2023-02-17'],
  [5, 'Tom Whitfield', 'Manchester', 'UK', '2023-03-04'],
  [6, 'Sofia Marino', 'Munich', 'Germany', '2023-03-22'],
  [7, 'Kenji Sato', 'Osaka', 'Japan', '2023-04-06'],
  [8, 'Elena Petrova', 'Toronto', 'Canada', '2023-04-19'],
  [9, 'Marcus Hill', 'Austin', 'USA', '2023-05-02'],
  [10, 'Yuki Tanaka', 'Tokyo', 'Japan', '2023-05-28'],
  [11, 'Hannah Reed', 'London', 'UK', '2023-06-14'],
  [12, 'Diego Alvarez', 'Mexico City', 'Mexico', '2023-07-01'],
];

const PRODUCTS: Val[][] = [
  [1, 'Mechanical Keyboard', 'Electronics', 89.0, 42],
  [2, 'Noise-Cancelling Headphones', 'Electronics', 199.5, 17],
  [3, '27-inch Monitor', 'Electronics', 329.0, 8],
  [4, 'USB-C Hub', 'Electronics', 45.0, 0],
  [5, 'Webcam 1080p', 'Electronics', 62.5, 25],
  [6, 'The Pragmatic Programmer', 'Books', 38.0, 60],
  [7, 'Designing Data-Intensive Applications', 'Books', 52.0, 31],
  [8, 'Clean Code', 'Books', 34.5, 44],
  [9, 'Espresso Machine', 'Kitchen', 249.0, 12],
  [10, 'Pour-Over Kettle', 'Kitchen', 68.0, 30],
  [11, 'Chef Knife 8-inch', 'Kitchen', 95.0, 21],
  [12, 'Cast Iron Skillet', 'Kitchen', 42.0, 18],
  [13, 'Trail Backpack 30L', 'Outdoors', 120.0, 14],
  [14, 'Insulated Bottle 1L', 'Outdoors', 28.0, 75],
  [15, 'Two-Person Tent', 'Outdoors', 310.0, 5],
];

// Customer 12 deliberately has no orders, so LEFT JOIN has something to show.
const ORDERS: Val[][] = [
  [1, 1, '2024-01-08', 'delivered'],
  [2, 3, '2024-01-12', 'delivered'],
  [3, 2, '2024-01-19', 'shipped'],
  [4, 5, '2024-01-26', 'delivered'],
  [5, 1, '2024-02-02', 'cancelled'],
  [6, 7, '2024-02-05', 'delivered'],
  [7, 4, '2024-02-11', 'delivered'],
  [8, 9, '2024-02-14', 'returned'],
  [9, 2, '2024-02-20', 'delivered'],
  [10, 6, '2024-02-28', 'shipped'],
  [11, 10, '2024-03-03', 'delivered'],
  [12, 3, '2024-03-09', 'pending'],
  [13, 8, '2024-03-15', 'delivered'],
  [14, 11, '2024-03-18', 'delivered'],
  [15, 5, '2024-03-24', 'cancelled'],
  [16, 1, '2024-04-01', 'delivered'],
  [17, 7, '2024-04-07', 'shipped'],
  [18, 2, '2024-04-12', 'delivered'],
  [19, 9, '2024-04-18', 'delivered'],
  [20, 4, '2024-04-25', 'pending'],
  [21, 6, '2024-05-02', 'delivered'],
  [22, 10, '2024-05-09', 'returned'],
  [23, 3, '2024-05-14', 'delivered'],
  [24, 11, '2024-05-21', 'shipped'],
  [25, 8, '2024-05-27', 'delivered'],
  [26, 1, '2024-06-04', 'delivered'],
  [27, 5, '2024-06-11', 'delivered'],
  [28, 7, '2024-06-16', 'pending'],
  [29, 2, '2024-06-22', 'delivered'],
  [30, 9, '2024-06-30', 'shipped'],
];

// Two lines per order. unit_price is the price paid, which is not always the
// current catalogue price — a small, honest source of interesting queries.
const ORDER_ITEMS: Val[][] = [
  [1, 1, 1, 1, 89.0], [2, 1, 14, 2, 28.0],
  [3, 2, 6, 1, 38.0], [4, 2, 8, 2, 34.5],
  [5, 3, 2, 1, 199.5], [6, 3, 5, 1, 62.5],
  [7, 4, 9, 1, 249.0], [8, 4, 10, 1, 68.0],
  [9, 5, 3, 1, 329.0], [10, 5, 4, 2, 45.0],
  [11, 6, 11, 1, 95.0], [12, 6, 12, 1, 42.0],
  [13, 7, 7, 1, 52.0], [14, 7, 6, 1, 38.0],
  [15, 8, 13, 1, 120.0], [16, 8, 14, 3, 26.5],
  [17, 9, 1, 2, 84.55], [18, 9, 5, 1, 62.5],
  [19, 10, 15, 1, 310.0], [20, 10, 13, 1, 120.0],
  [21, 11, 2, 1, 189.0], [22, 11, 8, 1, 34.5],
  [23, 12, 9, 1, 249.0], [24, 12, 11, 1, 95.0],
  [25, 13, 6, 2, 38.0], [26, 13, 7, 1, 52.0],
  [27, 14, 10, 2, 68.0], [28, 14, 12, 1, 42.0],
  [29, 15, 3, 1, 329.0], [30, 15, 1, 1, 89.0],
  [31, 16, 14, 4, 28.0], [32, 16, 4, 1, 45.0],
  [33, 17, 5, 2, 62.5], [34, 17, 8, 1, 34.5],
  [35, 18, 13, 1, 120.0], [36, 18, 10, 1, 68.0],
  [37, 19, 7, 1, 52.0], [38, 19, 6, 1, 38.0],
  [39, 20, 2, 1, 199.5], [40, 20, 1, 1, 89.0],
  [41, 21, 12, 2, 42.0], [42, 21, 11, 1, 95.0],
  [43, 22, 15, 1, 295.0], [44, 22, 14, 2, 28.0],
  [45, 23, 9, 1, 249.0], [46, 23, 10, 1, 68.0],
  [47, 24, 3, 1, 329.0], [48, 24, 5, 1, 62.5],
  [49, 25, 8, 3, 34.5], [50, 25, 6, 1, 38.0],
  [51, 26, 1, 1, 89.0], [52, 26, 2, 1, 199.5],
  [53, 27, 13, 2, 120.0], [54, 27, 14, 2, 28.0],
  [55, 28, 11, 1, 95.0], [56, 28, 12, 1, 42.0],
  [57, 29, 7, 2, 52.0], [58, 29, 8, 1, 34.5],
  [59, 30, 4, 2, 45.0], [60, 30, 5, 1, 62.5],
];

// manager_id is NULL for exactly one row — the founder — which is what makes
// LEFT JOIN and IS NULL worth demonstrating. 12 → 5 → 2 → 1 is a four-deep chain.
const EMPLOYEES: Val[][] = [
  [1, 'Rosa Delgado', null, 'Engineering', 195000, '2019-03-04'],
  [2, 'Victor Shaw', 1, 'Engineering', 152000, '2019-08-12'],
  [3, 'Amara Okafor', 1, 'Sales', 148000, '2020-01-20'],
  [4, 'Jonas Weber', 1, 'Support', 121000, '2020-05-11'],
  [5, 'Lena Brandt', 2, 'Engineering', 118000, '2021-02-15'],
  [6, 'Ibrahim Khan', 2, 'Engineering', 109000, '2021-06-30'],
  [7, 'Chloe Dubois', 2, 'Engineering', 96000, '2022-09-05'],
  [8, 'Mateo Rossi', 3, 'Sales', 88000, '2021-11-08'],
  [9, 'Sarah Lindqvist', 3, 'Sales', 82500, '2022-03-14'],
  [10, 'Devon Price', 4, 'Support', 67000, '2022-07-25'],
  [11, 'Aiko Yamada', 4, 'Support', 71500, '2023-01-09'],
  [12, 'Felix Moreau', 5, 'Engineering', 78000, '2023-04-17'],
];

const DB: TableDef[] = [
  {
    name: 'customers',
    blurb: 'One row per person who has signed up.',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'name', type: 'TEXT' },
      { name: 'city', type: 'TEXT' },
      { name: 'country', type: 'TEXT' },
      { name: 'signup_date', type: 'DATE' },
    ],
    rows: CUSTOMERS,
  },
  {
    name: 'products',
    blurb: 'The catalogue, with the current price and stock level.',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'name', type: 'TEXT' },
      { name: 'category', type: 'TEXT' },
      { name: 'price', type: 'REAL' },
      { name: 'stock', type: 'INTEGER' },
    ],
    rows: PRODUCTS,
  },
  {
    name: 'orders',
    blurb: 'One row per order. customer_id points at customers.id.',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'customer_id', type: 'INTEGER', key: 'FK' },
      { name: 'order_date', type: 'DATE' },
      { name: 'status', type: 'TEXT' },
    ],
    rows: ORDERS,
  },
  {
    name: 'order_items',
    blurb: 'The lines of each order. Two per order here.',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'order_id', type: 'INTEGER', key: 'FK' },
      { name: 'product_id', type: 'INTEGER', key: 'FK' },
      { name: 'quantity', type: 'INTEGER' },
      { name: 'unit_price', type: 'REAL' },
    ],
    rows: ORDER_ITEMS,
  },
  {
    name: 'employees',
    blurb: 'manager_id points back at employees.id — a self-join.',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'name', type: 'TEXT' },
      { name: 'manager_id', type: 'INTEGER', key: 'FK', nullable: true },
      { name: 'department', type: 'TEXT' },
      { name: 'salary', type: 'INTEGER' },
      { name: 'hire_date', type: 'DATE' },
    ],
    rows: EMPLOYEES,
  },
];

const TABLE_NAMES = DB.map((t) => t.name).join(', ');

function findTable(name: string): TableDef {
  const found = DB.find((t) => t.name === name.toLowerCase());
  if (!found) {
    throw new SqlError(`There is no table called '${name}'. This database has: ${TABLE_NAMES}.`);
  }
  return found;
}

/* ───────────────────────── tokeniser ───────────────────────── */

interface Tok {
  t: 'word' | 'num' | 'str' | 'op' | 'eof';
  v: string;
  /** Uppercased, for keyword tests. Empty for quoted identifiers. */
  u: string;
  i: number;
  end: number;
}

const OPS2 = ['<=', '>=', '<>', '!=', '||'];
const OPS1 = ['=', '<', '>', '+', '-', '*', '/', '%', '(', ')', ',', '.', ';'];

function tokenize(sql: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (ch === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && sql[i + 1] === '*') {
      const close = sql.indexOf('*/', i + 2);
      if (close < 0) throw new SqlError('A /* comment is opened but never closed with */.');
      i = close + 2;
      continue;
    }
    if (ch === "'") {
      let j = i + 1;
      let v = '';
      let closed = false;
      while (j < sql.length) {
        if (sql[j] === "'") {
          if (sql[j + 1] === "'") {
            v += "'";
            j += 2;
            continue;
          }
          closed = true;
          break;
        }
        v += sql[j];
        j += 1;
      }
      if (!closed) throw new SqlError("A text value is missing its closing quote ('). Text in SQL goes in single quotes.");
      out.push({ t: 'str', v, u: v, i, end: j + 1 });
      i = j + 1;
      continue;
    }
    if (ch === '"') {
      const close = sql.indexOf('"', i + 1);
      if (close < 0) throw new SqlError('A quoted name is missing its closing double quote (").');
      out.push({ t: 'word', v: sql.slice(i + 1, close), u: '', i, end: close + 1 });
      i = close + 1;
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(sql[i + 1] ?? ''))) {
      let j = i;
      while (j < sql.length && /[0-9]/.test(sql[j])) j += 1;
      if (sql[j] === '.') {
        j += 1;
        while (j < sql.length && /[0-9]/.test(sql[j])) j += 1;
      }
      const v = sql.slice(i, j);
      out.push({ t: 'num', v, u: v, i, end: j });
      i = j;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < sql.length && /[A-Za-z0-9_]/.test(sql[j])) j += 1;
      const v = sql.slice(i, j);
      out.push({ t: 'word', v, u: v.toUpperCase(), i, end: j });
      i = j;
      continue;
    }
    const two = sql.slice(i, i + 2);
    if (OPS2.includes(two)) {
      out.push({ t: 'op', v: two, u: two, i, end: i + 2 });
      i += 2;
      continue;
    }
    if (OPS1.includes(ch)) {
      out.push({ t: 'op', v: ch, u: ch, i, end: i + 1 });
      i += 1;
      continue;
    }
    throw new SqlError(`I do not know what to do with the character '${ch}' at position ${i + 1}.`);
  }
  out.push({ t: 'eof', v: '', u: '', i: sql.length, end: sql.length });
  return out;
}

/* ───────────────────────── syntax tree ───────────────────────── */

type AggName = 'COUNT' | 'SUM' | 'AVG' | 'MIN' | 'MAX';

type Expr =
  | { kind: 'literal'; value: EVal }
  | { kind: 'column'; table: string | null; name: string }
  | { kind: 'unary'; op: '-' | '+' | 'NOT'; arg: Expr }
  | { kind: 'binary'; op: string; left: Expr; right: Expr }
  | { kind: 'in'; arg: Expr; list: Expr[]; negated: boolean }
  | { kind: 'between'; arg: Expr; low: Expr; high: Expr; negated: boolean }
  | { kind: 'like'; arg: Expr; pattern: Expr; negated: boolean }
  | { kind: 'isnull'; arg: Expr; negated: boolean }
  | { kind: 'func'; name: string; args: Expr[] }
  | { kind: 'agg'; name: AggName; arg: Expr | null; distinct: boolean };

interface SelectItem {
  star: boolean;
  starTable: string | null;
  expr: Expr | null;
  alias: string | null;
  src: string;
}

interface JoinDef {
  type: 'INNER' | 'LEFT' | 'CROSS';
  table: string;
  alias: string;
  on: Expr | null;
}

interface Query {
  distinct: boolean;
  items: SelectItem[];
  from: { table: string; alias: string } | null;
  joins: JoinDef[];
  where: Expr | null;
  groupBy: Expr[];
  having: Expr | null;
  orderBy: { expr: Expr; dir: 'ASC' | 'DESC' }[];
  limit: number | null;
  offset: number | null;
}

const AGGS = new Set<AggName>(['COUNT', 'SUM', 'AVG', 'MIN', 'MAX']);
const FUNCS = new Set(['COALESCE', 'UPPER', 'LOWER', 'ROUND', 'ABS', 'LENGTH']);
const COMPARISONS = new Set(['=', '!=', '<>', '<', '<=', '>', '>=']);

const RESERVED = new Set([
  'SELECT', 'DISTINCT', 'ALL', 'FROM', 'WHERE', 'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC',
  'LIMIT', 'OFFSET', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'ON', 'USING',
  'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'AS', 'UNION', 'INTERSECT', 'EXCEPT',
  'WITH', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'OVER', 'NATURAL', 'EXISTS', 'VALUES',
]);

const SUPPORTED_SUMMARY =
  'Supported: SELECT (with DISTINCT and AS), FROM with aliases, INNER/LEFT/CROSS JOIN ... ON, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT and OFFSET.';

/* ───────────────────────── parser ───────────────────────── */

class Parser {
  private p = 0;

  constructor(
    private toks: Tok[],
    private src: string,
  ) {}

  private peek(k = 0): Tok {
    return this.toks[Math.min(this.p + k, this.toks.length - 1)];
  }

  private at(word: string): boolean {
    const t = this.peek();
    return t.t === 'word' && t.u === word;
  }

  private atOp(op: string): boolean {
    const t = this.peek();
    return t.t === 'op' && t.v === op;
  }

  private accept(word: string): boolean {
    if (this.at(word)) {
      this.p += 1;
      return true;
    }
    return false;
  }

  private acceptOp(op: string): boolean {
    if (this.atOp(op)) {
      this.p += 1;
      return true;
    }
    return false;
  }

  private take(): Tok {
    const t = this.peek();
    if (t.t !== 'eof') this.p += 1;
    return t;
  }

  private here(): string {
    const t = this.peek();
    return t.t === 'eof' ? 'the end of the query' : `'${t.v}'`;
  }

  private expectOp(op: string, why: string): void {
    if (!this.acceptOp(op)) throw new SqlError(`Expected '${op}' ${why}, but found ${this.here()}.`);
  }

  private expectWord(word: string, why: string): void {
    if (!this.accept(word)) throw new SqlError(`Expected ${word} ${why}, but found ${this.here()}.`);
  }

  private name(what: string): string {
    const t = this.peek();
    if (t.t !== 'word' || (t.u !== '' && RESERVED.has(t.u))) {
      throw new SqlError(`Expected ${what}, but found ${this.here()}.`);
    }
    this.p += 1;
    return t.v;
  }

  private maybeAlias(): string | null {
    if (this.accept('AS')) return this.name('a name after AS');
    const t = this.peek();
    if (t.t === 'word' && !RESERVED.has(t.u)) {
      this.p += 1;
      return t.v;
    }
    return null;
  }

  /* ---- statement ---- */

  parse(): Query {
    if (this.at('WITH')) {
      throw new SqlError('Common table expressions (WITH ... AS) are not supported in this playground. ' + SUPPORTED_SUMMARY);
    }
    if (!this.at('SELECT')) {
      const u = this.peek().u;
      if (['INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'ALTER', 'TRUNCATE', 'PRAGMA', 'EXPLAIN'].includes(u)) {
        throw new SqlError(`${u} is not supported here — this playground reads from a fixed sample database, so only SELECT queries run.`);
      }
      throw new SqlError(`A query has to start with SELECT, but this one starts with ${this.here()}.`);
    }
    this.p += 1;

    const distinct = this.accept('DISTINCT');
    if (!distinct) this.accept('ALL');

    const items: SelectItem[] = [this.selectItem()];
    while (this.acceptOp(',')) items.push(this.selectItem());

    let from: { table: string; alias: string } | null = null;
    const joins: JoinDef[] = [];
    if (this.accept('FROM')) {
      const table = this.name('a table name after FROM');
      const alias = this.maybeAlias() ?? table;
      from = { table, alias };
      for (;;) {
        const join = this.joinClause();
        if (!join) break;
        joins.push(join);
      }
    }

    const where = this.accept('WHERE') ? this.expr() : null;

    const groupBy: Expr[] = [];
    if (this.accept('GROUP')) {
      this.expectWord('BY', 'after GROUP');
      groupBy.push(this.expr());
      while (this.acceptOp(',')) groupBy.push(this.expr());
    }

    const having = this.accept('HAVING') ? this.expr() : null;
    if (having && groupBy.length === 0 && !containsAgg(having)) {
      throw new SqlError('HAVING filters groups, so it needs a GROUP BY clause or an aggregate. To filter individual rows, use WHERE.');
    }

    const orderBy: { expr: Expr; dir: 'ASC' | 'DESC' }[] = [];
    if (this.accept('ORDER')) {
      this.expectWord('BY', 'after ORDER');
      for (;;) {
        const expr = this.expr();
        let dir: 'ASC' | 'DESC' = 'ASC';
        if (this.accept('DESC')) dir = 'DESC';
        else this.accept('ASC');
        orderBy.push({ expr, dir });
        if (!this.acceptOp(',')) break;
      }
    }

    let limit: number | null = null;
    let offset: number | null = null;
    if (this.accept('LIMIT')) {
      limit = this.countLiteral('LIMIT');
      if (this.atOp(',')) {
        throw new SqlError('Write LIMIT n OFFSET m rather than LIMIT m, n — this playground uses the standard form.');
      }
      if (this.accept('OFFSET')) offset = this.countLiteral('OFFSET');
    } else if (this.accept('OFFSET')) {
      offset = this.countLiteral('OFFSET');
    }

    this.acceptOp(';');

    if (this.at('UNION') || this.at('INTERSECT') || this.at('EXCEPT')) {
      throw new SqlError(`Set operations (${this.peek().u}) are not supported in this playground. ` + SUPPORTED_SUMMARY);
    }
    if (this.peek().t !== 'eof') {
      throw new SqlError(`I reached the end of the query but there is still ${this.here()} left over. Check for a missing comma, keyword or bracket.`);
    }

    return { distinct, items, from, joins, where, groupBy, having, orderBy, limit, offset };
  }

  private countLiteral(clause: string): number {
    const t = this.peek();
    if (t.t !== 'num') throw new SqlError(`${clause} expects a whole number, but found ${this.here()}.`);
    this.p += 1;
    const n = Number(t.v);
    if (!Number.isInteger(n) || n < 0) throw new SqlError(`${clause} expects a whole number that is zero or more, not ${t.v}.`);
    return n;
  }

  private joinClause(): JoinDef | null {
    let type: 'INNER' | 'LEFT' | 'CROSS';
    if (this.at('RIGHT') || this.at('FULL')) {
      const kind = this.peek().u;
      throw new SqlError(`${kind} JOIN is not supported in this playground. A ${kind} JOIN can always be written as a LEFT JOIN with the two tables swapped.`);
    }
    if (this.at('NATURAL')) {
      throw new SqlError('NATURAL JOIN is not supported — spell the condition out with ON, which is clearer anyway.');
    }
    if (this.accept('CROSS')) {
      this.expectWord('JOIN', 'after CROSS');
      type = 'CROSS';
    } else if (this.accept('INNER')) {
      this.expectWord('JOIN', 'after INNER');
      type = 'INNER';
    } else if (this.accept('LEFT')) {
      this.accept('OUTER');
      this.expectWord('JOIN', 'after LEFT');
      type = 'LEFT';
    } else if (this.accept('JOIN')) {
      type = 'INNER';
    } else if (this.atOp(',') ) {
      // The old comma-join form. Treat it as CROSS JOIN, which is what it is.
      this.p += 1;
      type = 'CROSS';
    } else {
      return null;
    }

    const table = this.name('a table name after JOIN');
    const alias = this.maybeAlias() ?? table;

    if (this.at('USING')) {
      throw new SqlError('JOIN ... USING is not supported — write the condition as ON a.col = b.col.');
    }

    let on: Expr | null = null;
    if (this.accept('ON')) {
      on = this.expr();
      if (type === 'CROSS') throw new SqlError('CROSS JOIN pairs every row with every row, so it cannot take an ON condition. Use INNER JOIN if you want one.');
    } else if (type !== 'CROSS') {
      throw new SqlError(`This ${type} JOIN has no ON condition, so every row would be paired with every other row. Add ON, or write CROSS JOIN if that is really what you want.`);
    }
    return { type, table, alias, on };
  }

  private selectItem(): SelectItem {
    if (this.atOp('*')) {
      this.p += 1;
      return { star: true, starTable: null, expr: null, alias: null, src: '*' };
    }
    const t = this.peek();
    if (t.t === 'word' && this.peek(1).t === 'op' && this.peek(1).v === '.' && this.peek(2).t === 'op' && this.peek(2).v === '*') {
      this.p += 3;
      return { star: true, starTable: t.v, expr: null, alias: null, src: `${t.v}.*` };
    }
    const start = this.peek().i;
    const expr = this.expr();
    const src = this.src.slice(start, this.toks[this.p - 1].end).trim();
    const alias = this.maybeAlias();
    return { star: false, starTable: null, expr, alias, src };
  }

  /* ---- expressions ---- */

  expr(): Expr {
    return this.orExpr();
  }

  private orExpr(): Expr {
    let left = this.andExpr();
    while (this.accept('OR')) left = { kind: 'binary', op: 'OR', left, right: this.andExpr() };
    return left;
  }

  private andExpr(): Expr {
    let left = this.notExpr();
    while (this.accept('AND')) left = { kind: 'binary', op: 'AND', left, right: this.notExpr() };
    return left;
  }

  private notExpr(): Expr {
    if (this.at('NOT') && !['IN', 'BETWEEN', 'LIKE'].includes(this.peek(1).u)) {
      this.p += 1;
      return { kind: 'unary', op: 'NOT', arg: this.notExpr() };
    }
    return this.predicate();
  }

  private predicate(): Expr {
    let left = this.additive();
    for (;;) {
      const t = this.peek();
      if (t.t === 'op' && COMPARISONS.has(t.v)) {
        this.p += 1;
        left = { kind: 'binary', op: t.v, left, right: this.additive() };
        continue;
      }
      let negated = false;
      if (this.at('NOT') && ['IN', 'BETWEEN', 'LIKE'].includes(this.peek(1).u)) {
        this.p += 1;
        negated = true;
      }
      if (this.accept('IN')) {
        this.expectOp('(', 'to open the IN list');
        if (this.at('SELECT')) throw new SqlError('Subqueries are not supported in this playground, so IN needs a literal list such as IN (1, 2, 3).');
        const list: Expr[] = [this.expr()];
        while (this.acceptOp(',')) list.push(this.expr());
        this.expectOp(')', 'to close the IN list');
        left = { kind: 'in', arg: left, list, negated };
        continue;
      }
      if (this.accept('BETWEEN')) {
        const low = this.additive();
        this.expectWord('AND', 'between the two bounds of BETWEEN');
        const high = this.additive();
        left = { kind: 'between', arg: left, low, high, negated };
        continue;
      }
      if (this.accept('LIKE')) {
        left = { kind: 'like', arg: left, pattern: this.additive(), negated };
        continue;
      }
      if (negated) throw new SqlError(`NOT has to be followed by IN, BETWEEN or LIKE here, but found ${this.here()}.`);
      if (this.accept('IS')) {
        const isNot = this.accept('NOT');
        if (!this.accept('NULL')) {
          throw new SqlError(`IS has to be followed by NULL or NOT NULL, but found ${this.here()}.`);
        }
        left = { kind: 'isnull', arg: left, negated: isNot };
        continue;
      }
      return left;
    }
  }

  private additive(): Expr {
    let left = this.multiplicative();
    for (;;) {
      const t = this.peek();
      if (t.t === 'op' && (t.v === '+' || t.v === '-' || t.v === '||')) {
        this.p += 1;
        left = { kind: 'binary', op: t.v, left, right: this.multiplicative() };
        continue;
      }
      return left;
    }
  }

  private multiplicative(): Expr {
    let left = this.unary();
    for (;;) {
      const t = this.peek();
      if (t.t === 'op' && (t.v === '*' || t.v === '/' || t.v === '%')) {
        this.p += 1;
        left = { kind: 'binary', op: t.v, left, right: this.unary() };
        continue;
      }
      return left;
    }
  }

  private unary(): Expr {
    if (this.atOp('-')) {
      this.p += 1;
      return { kind: 'unary', op: '-', arg: this.unary() };
    }
    if (this.atOp('+')) {
      this.p += 1;
      return this.unary();
    }
    return this.primary();
  }

  private primary(): Expr {
    const t = this.peek();

    if (t.t === 'num') {
      this.p += 1;
      return { kind: 'literal', value: Number(t.v) };
    }
    if (t.t === 'str') {
      this.p += 1;
      return { kind: 'literal', value: t.v };
    }
    if (t.t === 'op' && t.v === '(') {
      this.p += 1;
      if (this.at('SELECT')) throw new SqlError('Subqueries are not supported in this playground. ' + SUPPORTED_SUMMARY);
      const inner = this.expr();
      this.expectOp(')', 'to close the bracket');
      return inner;
    }
    if (t.t === 'op' && t.v === '*') {
      throw new SqlError('* can only be used as a select item (SELECT *) or inside COUNT(*).');
    }

    if (t.t === 'word') {
      if (t.u === 'NULL') {
        this.p += 1;
        return { kind: 'literal', value: null };
      }
      if (t.u === 'TRUE' || t.u === 'FALSE') {
        this.p += 1;
        return { kind: 'literal', value: t.u === 'TRUE' };
      }
      if (t.u === 'CASE') throw new SqlError('CASE expressions are not supported in this playground. COALESCE covers the common "use this when it is NULL" case.');
      if (t.u === 'EXISTS') throw new SqlError('EXISTS needs a subquery, and subqueries are not supported in this playground.');
      if (t.u === 'CAST') throw new SqlError('CAST is not supported in this playground. Values are already numbers or text.');

      const next = this.peek(1);
      if (next.t === 'op' && next.v === '(') return this.call();

      if (next.t === 'op' && next.v === '.') {
        const nameTok = this.peek(2);
        if (nameTok.t !== 'word') throw new SqlError(`Expected a column name after '${t.v}.', but found '${nameTok.v}'.`);
        this.p += 3;
        return { kind: 'column', table: t.v, name: nameTok.v };
      }
      if (t.u !== '' && RESERVED.has(t.u)) {
        throw new SqlError(`${t.u} is a SQL keyword, so it cannot be used as a value here. Check the clause order: SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT.`);
      }
      this.p += 1;
      return { kind: 'column', table: null, name: t.v };
    }

    throw new SqlError(`Expected a value, a column or a function, but found ${this.here()}.`);
  }

  private call(): Expr {
    const nameTok = this.take();
    const upper = nameTok.u;
    this.expectOp('(', `after ${nameTok.v}`);

    if (AGGS.has(upper as AggName)) {
      const name = upper as AggName;
      const distinct = this.accept('DISTINCT');
      let arg: Expr | null = null;
      if (this.atOp('*')) {
        this.p += 1;
        if (name !== 'COUNT') {
          throw new SqlError(`${name}(*) is not valid — only COUNT(*) counts rows. Try ${name}(column).`);
        }
        if (distinct) throw new SqlError('COUNT(DISTINCT *) is not valid. Use COUNT(DISTINCT column).');
      } else {
        arg = this.expr();
        if (containsAgg(arg)) throw new SqlError(`Aggregates cannot be nested — ${name}() already works over a whole group.`);
      }
      this.expectOp(')', `to close ${nameTok.v}(`);
      if (this.at('OVER')) throw new SqlError('Window functions (OVER ...) are not supported in this playground.');
      return { kind: 'agg', name, arg, distinct };
    }

    if (FUNCS.has(upper)) {
      const args: Expr[] = [];
      if (!this.atOp(')')) {
        args.push(this.expr());
        while (this.acceptOp(',')) args.push(this.expr());
      }
      this.expectOp(')', `to close ${nameTok.v}(`);
      return { kind: 'func', name: upper, args };
    }

    throw new SqlError(
      `There is no function called ${nameTok.v}() in this playground. The ones that exist are COUNT, SUM, AVG, MIN, MAX, COALESCE, UPPER, LOWER, ROUND, ABS and LENGTH.`,
    );
  }
}

function parse(sql: string): Query {
  if (!sql.trim()) throw new SqlError('There is no query to run yet. Write a SELECT, or load one of the examples.');
  return new Parser(tokenize(sql), sql).parse();
}

/* ───────────────────────── tree helpers ───────────────────────── */

function children(e: Expr): Expr[] {
  switch (e.kind) {
    case 'literal':
    case 'column':
      return [];
    case 'unary':
      return [e.arg];
    case 'binary':
      return [e.left, e.right];
    case 'in':
      return [e.arg, ...e.list];
    case 'between':
      return [e.arg, e.low, e.high];
    case 'like':
      return [e.arg, e.pattern];
    case 'isnull':
      return [e.arg];
    case 'func':
      return e.args;
    case 'agg':
      return e.arg ? [e.arg] : [];
  }
}

function containsAgg(e: Expr): boolean {
  if (e.kind === 'agg') return true;
  return children(e).some(containsAgg);
}

/** A canonical, lower-case form, used to match SELECT items against GROUP BY keys. */
function render(e: Expr, col: (table: string | null, name: string) => string): string {
  const r = (x: Expr) => render(x, col);
  switch (e.kind) {
    case 'literal':
      return e.value === null ? 'null' : typeof e.value === 'string' ? `'${e.value}'` : String(e.value);
    case 'column':
      return col(e.table, e.name);
    case 'unary':
      return `${e.op.toLowerCase()}(${r(e.arg)})`;
    case 'binary':
      return `(${r(e.left)}${e.op.toLowerCase()}${r(e.right)})`;
    case 'in':
      return `(${r(e.arg)}${e.negated ? ' not' : ''} in(${e.list.map(r).join(',')}))`;
    case 'between':
      return `(${r(e.arg)}${e.negated ? ' not' : ''} between ${r(e.low)} and ${r(e.high)})`;
    case 'like':
      return `(${r(e.arg)}${e.negated ? ' not' : ''} like ${r(e.pattern)})`;
    case 'isnull':
      return `(${r(e.arg)} is${e.negated ? ' not' : ''} null)`;
    case 'func':
      return `${e.name.toLowerCase()}(${e.args.map(r).join(',')})`;
    case 'agg':
      return `${e.name.toLowerCase()}(${e.distinct ? 'distinct ' : ''}${e.arg ? r(e.arg) : '*'})`;
  }
}

/* ───────────────────────── value helpers ───────────────────────── */

function toVal(v: EVal): Val {
  if (typeof v === 'boolean') return v ? 1 : 0;
  return v;
}

function text(v: Val): string {
  return typeof v === 'number' ? String(v) : (v as string);
}

function truth(v: EVal): boolean | null {
  if (v === null) return null;
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v !== 0;
  throw new SqlError(`Expected a true/false condition but found the text '${v}'. Compare it with = or LIKE to make it a condition.`);
}

function num(v: Val, where: string): number {
  if (typeof v === 'number') return v;
  const n = Number(v);
  if (v === '' || !Number.isFinite(n)) {
    throw new SqlError(`Cannot use ${where} on the text value '${v}' — that column holds TEXT, not numbers.`);
  }
  return n;
}

/** Trims binary-floating-point noise so 0.1 + 0.2 reads as 0.3 in the grid. */
function tidy(n: number): number {
  return Number.isInteger(n) ? n : Number(n.toFixed(10));
}

/** Numbers sort before text, as in SQLite. NULL is handled by the caller. */
function compare(a: Val, b: Val): number {
  const an = typeof a === 'number';
  const bn = typeof b === 'number';
  if (an && bn) return (a as number) - (b as number);
  if (an) return -1;
  if (bn) return 1;
  const sa = a as string;
  const sb = b as string;
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}

function compareNullable(a: Val, b: Val): number {
  if (a === null && b === null) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  return compare(a, b);
}

function likeRegex(pattern: string): RegExp {
  const body = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/%/g, '[\\s\\S]*')
    .replace(/_/g, '[\\s\\S]');
  // LIKE ignores case in SQLite, and learners compare against it constantly.
  return new RegExp(`^${body}$`, 'i');
}

/* ───────────────────────── execution ───────────────────────── */

export interface QueryResult {
  columns: string[];
  aligns: ('left' | 'right')[];
  rows: Val[][];
  ms: number;
}

/** A cartesian product big enough to hang the tab is a teaching moment, not a crash. */
const MAX_INTERMEDIATE_ROWS = 200_000;

interface Ctx {
  row: Row | null;
  group: Row[] | null;
  keys: Set<string>;
}

const NO_KEYS: Set<string> = new Set();

function execute(q: Query): QueryResult {
  const started = performance.now();

  /* --- FROM: materialise the tables, then the joins --- */

  const aliasOrder: string[] = [];
  const aliasColumns = new Map<string, ColumnDef[]>();
  const columnKeys: { key: string; name: string }[] = [];
  const byName = new Map<string, string[]>();

  const addSource = (table: TableDef, alias: string) => {
    const a = alias.toLowerCase();
    if (aliasColumns.has(a)) {
      throw new SqlError(`'${alias}' names two different tables in this query. Give one of them its own alias, for example "${alias} AS ${alias.slice(0, 1)}2".`);
    }
    aliasOrder.push(a);
    aliasColumns.set(a, table.columns);
    for (const c of table.columns) {
      const key = `${a}.${c.name}`;
      columnKeys.push({ key, name: c.name });
      const list = byName.get(c.name) ?? [];
      list.push(key);
      byName.set(c.name, list);
    }
  };

  const rowsOf = (table: TableDef, alias: string): Row[] => {
    const a = alias.toLowerCase();
    return table.rows.map((values) => {
      const row: Row = {};
      table.columns.forEach((c, i) => {
        row[`${a}.${c.name}`] = values[i];
      });
      return row;
    });
  };

  const rowCtx = (row: Row | null): Ctx => ({ row, group: null, keys: NO_KEYS });

  /* --- the evaluator --- */

  const canon = (e: Expr): string =>
    render(e, (table, name) => {
      if (table) return `${table.toLowerCase()}.${name.toLowerCase()}`;
      const hits = byName.get(name.toLowerCase());
      return hits && hits.length === 1 ? hits[0] : name.toLowerCase();
    });

  function readColumn(table: string | null, name: string, ctx: Ctx): Val {
    if (ctx.group) {
      const shown = table ? `${table}.${name}` : name;
      throw new SqlError(
        `'${shown}' is not in the GROUP BY clause and is not inside an aggregate, so a group of rows has no single value for it. Add it to GROUP BY, or wrap it in COUNT/SUM/AVG/MIN/MAX.`,
      );
    }
    if (!ctx.row) {
      throw new SqlError(`This query has no FROM clause, so there is no column '${name}' to read.`);
    }
    if (table) {
      const alias = table.toLowerCase();
      const key = `${alias}.${name.toLowerCase()}`;
      if (!(key in ctx.row)) {
        const cols = aliasColumns.get(alias);
        if (!cols) {
          throw new SqlError(`There is no table or alias called '${table}' in this query. The FROM clause brings in: ${aliasOrder.join(', ')}.`);
        }
        throw new SqlError(`'${table}' has no column called '${name}'. Its columns are: ${cols.map((c) => c.name).join(', ')}.`);
      }
      return ctx.row[key];
    }
    const hits = byName.get(name.toLowerCase()) ?? [];
    if (hits.length === 0) {
      throw new SqlError(`There is no column called '${name}' in this query. Available here: ${columnKeys.map((c) => c.key).join(', ')}.`);
    }
    if (hits.length > 1) {
      throw new SqlError(`'${name}' is ambiguous — it exists as ${hits.join(' and ')}. Say which one you mean, for example ${hits[0]}.`);
    }
    return ctx.row[hits[0]];
  }

  function aggregate(e: Extract<Expr, { kind: 'agg' }>, ctx: Ctx): Val {
    if (!ctx.group) {
      throw new SqlError(
        `${e.name}() is an aggregate, and aggregates cannot be used in WHERE or in a JOIN condition — those run before rows are grouped. Filter on an aggregate with HAVING instead.`,
      );
    }
    if (e.name === 'COUNT' && !e.arg) return ctx.group.length;

    const collected: Val[] = [];
    for (const row of ctx.group) {
      const v = toVal(evaluate(e.arg as Expr, rowCtx(row)));
      if (v !== null) collected.push(v);
    }
    const values = e.distinct ? [...new Map(collected.map((v) => [`${typeof v}:${v}`, v])).values()] : collected;

    switch (e.name) {
      case 'COUNT':
        return values.length;
      case 'SUM': {
        if (values.length === 0) return null;
        let total = 0;
        for (const v of values) total += num(v, 'SUM()');
        return tidy(total);
      }
      case 'AVG': {
        if (values.length === 0) return null;
        let total = 0;
        for (const v of values) total += num(v, 'AVG()');
        return tidy(total / values.length);
      }
      case 'MIN':
      case 'MAX': {
        if (values.length === 0) return null;
        let best = values[0];
        for (const v of values) {
          const c = compare(v, best);
          if (e.name === 'MIN' ? c < 0 : c > 0) best = v;
        }
        return best;
      }
    }
  }

  function callFunction(e: Extract<Expr, { kind: 'func' }>, ctx: Ctx): EVal {
    const args = e.args.map((a) => toVal(evaluate(a, ctx)));
    const arity = (min: number, max: number) => {
      if (args.length < min || args.length > max) {
        const want = min === max ? `${min}` : `${min} or ${max}`;
        throw new SqlError(`${e.name}() takes ${want} argument${max === 1 ? '' : 's'}, but ${args.length} were given.`);
      }
    };
    switch (e.name) {
      case 'COALESCE': {
        if (args.length < 2) throw new SqlError('COALESCE() needs at least two arguments: the value, and what to use when it is NULL.');
        for (const a of args) if (a !== null) return a;
        return null;
      }
      case 'UPPER':
        arity(1, 1);
        return args[0] === null ? null : text(args[0]).toUpperCase();
      case 'LOWER':
        arity(1, 1);
        return args[0] === null ? null : text(args[0]).toLowerCase();
      case 'LENGTH':
        arity(1, 1);
        return args[0] === null ? null : text(args[0]).length;
      case 'ABS':
        arity(1, 1);
        return args[0] === null ? null : Math.abs(num(args[0], 'ABS()'));
      case 'ROUND': {
        arity(1, 2);
        if (args[0] === null) return null;
        if (args.length === 2 && args[1] === null) return null;
        const digits = args.length === 2 ? Math.trunc(num(args[1], 'ROUND()')) : 0;
        if (digits < 0 || digits > 10) throw new SqlError('The second argument to ROUND() has to be between 0 and 10.');
        return Number(num(args[0], 'ROUND()').toFixed(digits));
      }
      default:
        throw new SqlError(`There is no function called ${e.name}() in this playground.`);
    }
  }

  function evaluate(e: Expr, ctx: Ctx): EVal {
    // Inside a group, anything that *is* a GROUP BY key has one value per
    // group, so it is read from the group's first row rather than refused.
    if (ctx.group && e.kind !== 'agg' && ctx.keys.has(canon(e))) {
      return evaluate(e, rowCtx(ctx.group[0] ?? null));
    }

    switch (e.kind) {
      case 'literal':
        return e.value;
      case 'column':
        return readColumn(e.table, e.name, ctx);
      case 'agg':
        return aggregate(e, ctx);
      case 'func':
        return callFunction(e, ctx);
      case 'unary': {
        if (e.op === 'NOT') {
          const v = truth(evaluate(e.arg, ctx));
          return v === null ? null : !v;
        }
        const v = toVal(evaluate(e.arg, ctx));
        if (v === null) return null;
        return e.op === '-' ? -num(v, "'-'") : num(v, "'+'");
      }
      case 'binary': {
        if (e.op === 'AND' || e.op === 'OR') {
          const a = truth(evaluate(e.left, ctx));
          if (e.op === 'AND' && a === false) return false;
          if (e.op === 'OR' && a === true) return true;
          const b = truth(evaluate(e.right, ctx));
          if (e.op === 'AND') {
            if (b === false) return false;
            return a === null || b === null ? null : true;
          }
          if (b === true) return true;
          return a === null || b === null ? null : false;
        }

        const left = toVal(evaluate(e.left, ctx));
        const right = toVal(evaluate(e.right, ctx));

        if (e.op === '||') {
          if (left === null || right === null) return null;
          return text(left) + text(right);
        }

        // Three-valued logic: anything compared with NULL is unknown, which is
        // why `col = NULL` never matches and `IS NULL` has to exist.
        if (COMPARISONS.has(e.op)) {
          if (left === null || right === null) return null;
          const c = compare(left, right);
          switch (e.op) {
            case '=':
              return c === 0;
            case '!=':
            case '<>':
              return c !== 0;
            case '<':
              return c < 0;
            case '<=':
              return c <= 0;
            case '>':
              return c > 0;
            default:
              return c >= 0;
          }
        }

        if (left === null || right === null) return null;
        const a = num(left, `'${e.op}'`);
        const b = num(right, `'${e.op}'`);
        switch (e.op) {
          case '+':
            return tidy(a + b);
          case '-':
            return tidy(a - b);
          case '*':
            return tidy(a * b);
          case '/':
            return b === 0 ? null : tidy(a / b);
          case '%':
            return b === 0 ? null : tidy(a % b);
          default:
            throw new SqlError(`The operator '${e.op}' is not supported in this playground.`);
        }
      }
      case 'like': {
        const v = toVal(evaluate(e.arg, ctx));
        const p = toVal(evaluate(e.pattern, ctx));
        if (v === null || p === null) return null;
        const matched = likeRegex(text(p)).test(text(v));
        return e.negated ? !matched : matched;
      }
      case 'in': {
        const v = toVal(evaluate(e.arg, ctx));
        if (v === null) return null;
        let sawNull = false;
        for (const item of e.list) {
          const iv = toVal(evaluate(item, ctx));
          if (iv === null) {
            sawNull = true;
            continue;
          }
          if (compare(v, iv) === 0) return !e.negated;
        }
        if (sawNull) return null;
        return e.negated;
      }
      case 'between': {
        const v = toVal(evaluate(e.arg, ctx));
        const low = toVal(evaluate(e.low, ctx));
        const high = toVal(evaluate(e.high, ctx));
        if (v === null || low === null || high === null) return null;
        const inside = compare(v, low) >= 0 && compare(v, high) <= 0;
        return e.negated ? !inside : inside;
      }
      case 'isnull': {
        const v = toVal(evaluate(e.arg, ctx));
        return e.negated ? v !== null : v === null;
      }
    }
  }

  let rows: Row[] = [{}];
  if (q.from) {
    const first = findTable(q.from.table);
    addSource(first, q.from.alias);
    rows = rowsOf(first, q.from.alias);

    for (const join of q.joins) {
      const table = findTable(join.table);
      addSource(table, join.alias);
      const right = rowsOf(table, join.alias);
      const nulls: Row = {};
      for (const c of table.columns) nulls[`${join.alias.toLowerCase()}.${c.name}`] = null;

      const next: Row[] = [];
      for (const left of rows) {
        let matched = false;
        for (const r of right) {
          const combined = { ...left, ...r };
          if (join.type === 'CROSS') {
            next.push(combined);
            matched = true;
            continue;
          }
          if (truth(evaluate(join.on as Expr, rowCtx(combined))) === true) {
            next.push(combined);
            matched = true;
          }
        }
        if (!matched && join.type === 'LEFT') next.push({ ...left, ...nulls });
        if (next.length > MAX_INTERMEDIATE_ROWS) {
          throw new SqlError(
            `This join makes more than ${MAX_INTERMEDIATE_ROWS.toLocaleString('en-US')} rows before anything is filtered. Add an ON condition that matches keys, or a WHERE clause.`,
          );
        }
      }
      rows = next;
    }
  }

  /* --- WHERE --- */

  if (q.where) {
    if (containsAgg(q.where)) {
      throw new SqlError('WHERE runs before rows are grouped, so it cannot use an aggregate. Use HAVING for that.');
    }
    rows = rows.filter((row) => truth(evaluate(q.where as Expr, rowCtx(row))) === true);
  }

  /* --- GROUP BY --- */

  const hasAgg =
    q.items.some((it) => it.expr !== null && containsAgg(it.expr)) ||
    (q.having !== null && containsAgg(q.having)) ||
    q.orderBy.some((o) => containsAgg(o.expr));
  const grouped = q.groupBy.length > 0 || hasAgg || q.having !== null;

  if (grouped && q.items.some((it) => it.star)) {
    throw new SqlError('SELECT * cannot be combined with GROUP BY or with aggregates — list the grouped columns and the aggregates explicitly.');
  }

  const keys = new Set<string>(q.groupBy.map(canon));
  let units: Ctx[];
  if (!grouped) {
    units = rows.map((row) => rowCtx(row));
  } else if (q.groupBy.length === 0) {
    // No GROUP BY but aggregates present: the whole table is one group, which
    // is why SELECT COUNT(*) on an empty table still returns a row.
    units = [{ row: null, group: rows, keys }];
  } else {
    const buckets = new Map<string, Row[]>();
    for (const row of rows) {
      const values = q.groupBy.map((g) => toVal(evaluate(g, rowCtx(row))));
      const k = JSON.stringify(values.map((v) => (v === null ? ['null'] : [typeof v, v])));
      const bucket = buckets.get(k);
      if (bucket) bucket.push(row);
      else buckets.set(k, [row]);
    }
    units = [...buckets.values()].map((group) => ({ row: null, group, keys }));
  }

  /* --- SELECT list --- */

  const projection: { expr: Expr | null; key: string; name: string }[] = [];
  for (const item of q.items) {
    if (!item.star) {
      projection.push({ expr: item.expr as Expr, key: '', name: item.alias ?? item.src });
      continue;
    }
    if (!q.from) throw new SqlError('SELECT * needs a FROM clause — there are no columns without a table.');
    const wanted = item.starTable
      ? columnKeys.filter((c) => c.key.startsWith(`${item.starTable!.toLowerCase()}.`))
      : columnKeys;
    if (wanted.length === 0) {
      throw new SqlError(`There is no table or alias called '${item.starTable}' in this query. The FROM clause brings in: ${aliasOrder.join(', ')}.`);
    }
    for (const c of wanted) projection.push({ expr: null, key: c.key, name: c.name });
  }

  /* --- HAVING, then the projection itself --- */

  let out: { vals: Val[]; ctx: Ctx }[] = [];
  for (const ctx of units) {
    if (q.having && truth(evaluate(q.having, ctx)) !== true) continue;
    const vals = projection.map((p) => (p.expr ? toVal(evaluate(p.expr, ctx)) : ctx.row ? ctx.row[p.key] : null));
    out.push({ vals, ctx });
  }

  /* --- DISTINCT --- */

  if (q.distinct) {
    const seen = new Set<string>();
    out = out.filter((r) => {
      const k = JSON.stringify(r.vals.map((v) => (v === null ? ['null'] : [typeof v, v])));
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  /* --- ORDER BY: output names first, then expressions --- */

  if (q.orderBy.length > 0) {
    const names = projection.map((p) => p.name.toLowerCase());
    const readers = q.orderBy.map((o) => {
      if (o.expr.kind === 'literal' && typeof o.expr.value === 'number') {
        const position = o.expr.value;
        if (!Number.isInteger(position) || position < 1 || position > projection.length) {
          throw new SqlError(`ORDER BY ${position} points at output column ${position}, but this query selects ${projection.length}.`);
        }
        return (r: { vals: Val[]; ctx: Ctx }) => r.vals[position - 1];
      }
      if (o.expr.kind === 'column' && !o.expr.table) {
        const idx = names.indexOf(o.expr.name.toLowerCase());
        if (idx >= 0) return (r: { vals: Val[]; ctx: Ctx }) => r.vals[idx];
      }
      return (r: { vals: Val[]; ctx: Ctx }) => toVal(evaluate(o.expr, r.ctx));
    });

    out.sort((a, b) => {
      for (let i = 0; i < readers.length; i += 1) {
        let c = compareNullable(readers[i](a), readers[i](b));
        if (q.orderBy[i].dir === 'DESC') c = -c;
        if (c !== 0) return c;
      }
      return 0;
    });
  }

  /* --- OFFSET and LIMIT --- */

  const from = q.offset ?? 0;
  const limited = q.limit === null ? out.slice(from) : out.slice(from, from + q.limit);

  const columns = projection.map((p) => p.name);
  const aligns: ('left' | 'right')[] = columns.map((_, i) => {
    const firstValue = limited.find((r) => r.vals[i] !== null);
    return firstValue && typeof firstValue.vals[i] === 'number' ? 'right' : 'left';
  });

  return {
    columns,
    aligns,
    rows: limited.map((r) => r.vals),
    ms: performance.now() - started,
  };
}

export function runQuery(sql: string): QueryResult {
  return execute(parse(sql));
}

/* ───────────────────────── UI ───────────────────────── */

const DEFAULT_QUERY = `-- Every query starts with SELECT ... FROM.
-- Press Run, or Ctrl+Enter (Cmd+Enter on a Mac).
SELECT name, city, country
FROM customers
WHERE country IN ('Germany', 'Japan', 'UK')
ORDER BY country, name;`;

const EXAMPLES: { label: string; blurb: string; sql: string }[] = [
  {
    label: 'Filter and sort',
    blurb: 'WHERE, BETWEEN, ORDER BY, LIMIT',
    sql: `SELECT name, category, price, stock
FROM products
WHERE price BETWEEN 40 AND 200
  AND stock > 0
ORDER BY price DESC
LIMIT 8;`,
  },
  {
    label: 'Join two tables',
    blurb: 'INNER JOIN with aliases',
    sql: `SELECT c.name, c.country, o.id AS order_id, o.order_date, o.status
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
WHERE o.status <> 'cancelled'
ORDER BY o.order_date DESC
LIMIT 10;`,
  },
  {
    label: 'Group and aggregate',
    blurb: 'GROUP BY, SUM, AVG, HAVING',
    sql: `SELECT p.category,
       COUNT(*) AS lines,
       SUM(oi.quantity) AS units,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
       ROUND(AVG(oi.unit_price), 2) AS avg_price
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.category
HAVING SUM(oi.quantity * oi.unit_price) > 1000
ORDER BY revenue DESC;`,
  },
  {
    label: 'Self-join and NULL',
    blurb: 'LEFT JOIN onto the same table, COALESCE',
    sql: `SELECT e.name AS employee,
       e.department,
       e.salary,
       COALESCE(m.name, 'nobody — top of the tree') AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.salary DESC;`,
  },
];

const MAX_SHOWN_ROWS = 200;

function display(v: Val): string {
  if (v === null) return 'NULL';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(Number(v.toFixed(6)));
  return v;
}

export default function SqlPlayground({ props }: { props?: Record<string, unknown> }) {
  const seed = typeof props?.query === 'string' && props.query.trim() ? (props.query as string) : DEFAULT_QUERY;

  const [query, setQuery] = React.useState(seed);
  const [result, setResult] = React.useState<QueryResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [ran, setRan] = React.useState('');
  const [schemaOpen, setSchemaOpen] = React.useState(false);
  const [openTable, setOpenTable] = React.useState<string | null>('customers');

  // The schema browser earns its space on a wide screen and costs too much on
  // a narrow one, so it starts open only where there is room.
  React.useEffect(() => {
    setSchemaOpen(window.matchMedia('(min-width: 768px)').matches);
  }, []);

  const run = React.useCallback((sql: string) => {
    setRan(sql);
    try {
      setResult(runQuery(sql));
      setError(null);
    } catch (err) {
      setResult(null);
      setError(
        err instanceof SqlError
          ? err.message
          : `That query could not be run: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }, []);

  React.useEffect(() => {
    setQuery(seed);
    run(seed);
  }, [seed, run]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      run(query);
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: end } = el;
      setQuery(`${query.slice(0, s)}  ${query.slice(end)}`);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2;
      });
    }
  };

  const shown = result ? result.rows.slice(0, MAX_SHOWN_ROWS) : [];
  const nullTrap = result !== null && result.rows.length === 0 && /[=!<>]\s*NULL/i.test(ran);

  return (
    <WidgetShell
      takeaway="The clauses run in a fixed order — FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT — not the order you write them. That is why you can filter on a column you never selected, why an aggregate belongs in HAVING rather than WHERE, and why an alias works in ORDER BY but not in WHERE."
      readout={
        <Readout
          items={[
            {
              label: 'Result',
              value: error ? 'error' : result ? `${result.rows.length} row${result.rows.length === 1 ? '' : 's'}` : '—',
              tone: error ? 'bad' : 'default',
            },
            { label: 'Time', value: result ? `${result.ms.toFixed(1)} ms` : '—' },
            { label: 'Engine', value: 'in-browser, no server' },
          ]}
        />
      }
      controls={
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => run(query)}
            className="rounded-md bg-primary px-3 py-1 text-[12px] font-semibold text-on-primary"
          >
            Run
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery(seed);
              run(seed);
            }}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setSchemaOpen((v) => !v)}
            aria-expanded={schemaOpen}
            className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted transition-colors hover:text-ink"
          >
            {schemaOpen ? 'Hide schema' : 'Show schema'}
          </button>
          <span className="ml-auto text-[11px] text-subtle">Ctrl/Cmd + Enter runs</span>
        </div>
      }
    >
      <div className="p-3 sm:p-4">
        <div className={cn('grid gap-3', schemaOpen ? 'md:grid-cols-[13.5rem_minmax(0,1fr)]' : 'md:grid-cols-1')}>
          {schemaOpen && (
            <div className="rounded-md border border-line bg-surface-2 p-2.5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Sample database</p>
              <ul className="space-y-1">
                {DB.map((table) => {
                  const open = openTable === table.name;
                  return (
                    <li key={table.name}>
                      <button
                        type="button"
                        onClick={() => setOpenTable(open ? null : table.name)}
                        aria-expanded={open}
                        className="flex w-full items-baseline justify-between gap-2 rounded px-1 py-0.5 text-left transition-colors hover:bg-surface-3"
                      >
                        <span className="font-mono text-[12px] text-ink">{table.name}</span>
                        <span className="text-[11px] tabular-nums text-subtle">{table.rows.length}</span>
                      </button>
                      {open && (
                        <div className="mb-1 mt-1 border-l border-line pl-2">
                          <p className="mb-1 text-[11px] leading-relaxed text-subtle">{table.blurb}</p>
                          <ul className="space-y-0.5">
                            {table.columns.map((c) => (
                              <li key={c.name} className="flex items-baseline justify-between gap-2">
                                <span className="font-mono text-[11.5px] text-muted">
                                  {c.name}
                                  {c.key && (
                                    <span
                                      className={cn(
                                        'ml-1 rounded px-1 text-[9.5px] font-semibold uppercase tracking-wide',
                                        c.key === 'PK' ? 'bg-primary/15 text-primary-ink' : 'bg-accent/15 text-accent',
                                      )}
                                    >
                                      {c.key}
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10.5px] uppercase tracking-wide text-subtle">
                                  {c.type}
                                  {c.nullable ? ' · null' : ''}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 border-t border-line pt-2 text-[10.5px] leading-relaxed text-subtle">
                Dates are TEXT in ISO form, so they compare and sort correctly. LIKE ignores case, as in SQLite.
              </p>
            </div>
          )}

          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  title={ex.blurb}
                  onClick={() => {
                    setQuery(ex.sql);
                    run(ex.sql);
                  }}
                  className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11.5px] text-muted transition-colors hover:text-ink"
                >
                  {ex.label}
                </button>
              ))}
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="SQL query editor"
              className="h-40 w-full resize-y rounded-md border border-line bg-surface-2 px-2.5 py-2 font-mono text-[12.5px] leading-[1.55] text-ink outline-none focus:border-line-strong"
            />

            {error && (
              <div
                role="alert"
                className="mt-2 rounded-md border border-danger/40 bg-danger/[0.07] px-3 py-2"
              >
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-danger">Query error</p>
                <p className="text-[12px] leading-relaxed text-ink">{error}</p>
              </div>
            )}

            {result && (
              <div className="mt-2">
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">Result</p>
                  <p className="text-[11px] tabular-nums text-subtle">
                    {result.rows.length} row{result.rows.length === 1 ? '' : 's'}
                    {result.rows.length > MAX_SHOWN_ROWS ? ` · showing the first ${MAX_SHOWN_ROWS}` : ''}
                  </p>
                </div>

                {result.rows.length === 0 ? (
                  <p className="rounded-md border border-line bg-surface-2 px-3 py-3 text-[12px] leading-relaxed text-muted">
                    No rows matched.
                    {nullTrap
                      ? ' Comparing a column with NULL using = or <> is never true — not even for rows that are NULL. Use IS NULL or IS NOT NULL.'
                      : ' Loosen the WHERE clause, or check the spelling of a text value — text comparisons are exact.'}
                  </p>
                ) : (
                  <div className="max-h-72 overflow-auto rounded-md border border-line">
                    <table className="w-full border-collapse text-[12px]">
                      <caption className="sr-only">Query result</caption>
                      <thead>
                        <tr className="bg-surface-2">
                          {result.columns.map((c, i) => (
                            <th
                              key={`${c}-${i}`}
                              scope="col"
                              className={cn(
                                'sticky top-0 whitespace-nowrap border-b border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[11.5px] font-semibold text-ink',
                                result.aligns[i] === 'right' ? 'text-right' : 'text-left',
                              )}
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {shown.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((v, ci) => (
                              <td
                                key={ci}
                                className={cn(
                                  'whitespace-nowrap px-2.5 py-1 font-mono text-[11.5px]',
                                  result.aligns[ci] === 'right' ? 'text-right tabular-nums' : 'text-left',
                                  v === null ? 'italic text-subtle' : 'text-muted',
                                )}
                              >
                                {display(v)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
