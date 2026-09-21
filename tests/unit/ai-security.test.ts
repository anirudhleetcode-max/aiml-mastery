import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import type { CompletionRequest, CompletionResult } from '@/lib/ai/provider';

/**
 * The security surface the AI features added.
 *
 * Three things are being defended here, and they need different kinds of
 * evidence. That a key cannot reach the browser is a property of the module
 * graph, so it is checked by walking the source. That an attacker cannot read
 * or forge somebody else's evaluation is a property of the route, so it is
 * checked against a real database. And that a model cannot be talked into
 * leaking its instructions is a property of what the response is allowed to
 * contain, so it is checked by feeding the evaluator a hostile model.
 */

const DB_FILE = path.resolve(process.cwd(), 'prisma/ai-security-test.db');
process.env.DATABASE_URL = `file:${DB_FILE}`;
process.env.AUTH_SECRET = 'ai-security-secret-long-enough-0123456789abc';

const { jar, next, calls } = vi.hoisted(() => ({
  jar: new Map<string, string>(),
  next: { value: null as CompletionResult | null },
  calls: [] as CompletionRequest[],
}));

vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name)! } : undefined),
    set: (name: string, value: string, opts?: { maxAge?: number }) => {
      if (opts?.maxAge === 0 || value === '') jar.delete(name);
      else jar.set(name, value);
    },
    delete: (name: string) => jar.delete(name),
  }),
}));

vi.mock('@/lib/ai/provider', () => ({
  aiProvider: () => (next.value ? 'anthropic' : 'none'),
  aiAvailable: () => next.value !== null,
  complete: async (request: CompletionRequest): Promise<CompletionResult> => {
    calls.push(request);
    return next.value ?? { ok: false, reason: 'unavailable' };
  },
}));

const SRC = path.resolve(process.cwd(), 'src');
const ORIGIN = 'http://localhost:3000';

let prisma: import('@prisma/client').PrismaClient;
let interviewRoute: typeof import('@/app/api/evaluate/interview/route').POST;
let unit: import('@/types/curriculum').LearningUnit;
let alice = '';
let bob = '';

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`${ORIGIN}/api/evaluate/interview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: 'localhost:3000',
      origin: ORIGIN,
      'x-forwarded-for': '203.0.113.11',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function signIn(id: string) {
  const { createSessionToken, SESSION_COOKIE } = await import('@/lib/auth/session');
  const session = await prisma.authSession.create({
    data: { userId: id, expiresAt: new Date(Date.now() + 86_400_000) },
    select: { id: true },
  });
  jar.set(SESSION_COOKIE, await createSessionToken({ userId: id, sessionId: session.id, email: 'x@example.com' }));
}

beforeAll(async () => {
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
  execSync('npx prisma db push --skip-generate --accept-data-loss', {
    env: { ...process.env, DATABASE_URL: `file:${DB_FILE}` },
    stdio: 'pipe',
  });
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient({ datasources: { db: { url: `file:${DB_FILE}` } } });
  interviewRoute = (await import('@/app/api/evaluate/interview/route')).POST;
  const { ALL_UNITS } = await import('@/data/curriculum');
  unit = ALL_UNITS[0]!;
}, 120_000);

afterAll(async () => {
  await prisma?.$disconnect();
  if (existsSync(DB_FILE)) rmSync(DB_FILE);
});

beforeEach(async () => {
  jar.clear();
  calls.length = 0;
  next.value = null;
  await prisma.rateLimit.deleteMany();
  await prisma.user.deleteMany();
  const a = await prisma.user.create({ data: { email: 'alice@example.com', passwordHash: 'x' } });
  const b = await prisma.user.create({ data: { email: 'bob@example.com', passwordHash: 'x' } });
  alice = a.id;
  bob = b.id;
  await signIn(alice);
});

/* ------------------------------------------------------------------ */
/* The key cannot reach the browser                                     */
/* ------------------------------------------------------------------ */

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

const FILES = sourceFiles(SRC).map((file) => ({
  file: path.relative(SRC, file),
  text: readFileSync(file, 'utf8'),
}));

const CLIENT_FILES = FILES.filter((f) => /^['"]use client['"]/.test(f.text.trimStart()));

describe('secrets stay on the server', () => {
  it('finds the client components it is meant to be checking', () => {
    // A guard that silently checks nothing is worse than no guard.
    expect(CLIENT_FILES.length).toBeGreaterThan(10);
  });

  it('never names a provider key outside the server modules', () => {
    const offenders = FILES.filter(
      (f) => /ANTHROPIC_API_KEY|RESEND_API_KEY|x-api-key/.test(f.text) && !/^lib\/(ai|email)\//.test(f.file),
    );
    expect(offenders.map((o) => o.file)).toEqual([]);
  });

  it('exposes no provider secret through a NEXT_PUBLIC_ variable', () => {
    for (const f of FILES) {
      expect([f.file, /NEXT_PUBLIC_[A-Z_]*(KEY|SECRET|TOKEN|PASSWORD)/.test(f.text)]).toEqual([f.file, false]);
    }
  });

  it('keeps every client component out of the server-only modules', () => {
    const forbidden = /@\/lib\/ai\/provider|@\/features\/evaluation\/(interview|flashcard|corpus)|@\/lib\/email\//;
    const offenders = CLIENT_FILES.filter((f) => forbidden.test(f.text));
    expect(offenders.map((o) => o.file)).toEqual([]);
  });

  it('marks each server module with the server-only guard', () => {
    for (const name of ['lib/ai/provider.ts', 'lib/email/send.ts', 'features/evaluation/interview.ts', 'features/evaluation/flashcard.ts']) {
      const found = FILES.find((f) => f.file === name);
      expect([name, found?.text.includes("import 'server-only'")]).toEqual([name, true]);
    }
  });

  it('never reads a key outside a request handler at module scope of a shared file', () => {
    // process.env.ANTHROPIC_API_KEY is read inside complete() and aiProvider(),
    // never at import time, so a key rotated in the host takes effect without
    // a rebuild and no value is captured into a bundle constant.
    const provider = FILES.find((f) => f.file === 'lib/ai/provider.ts')!.text;
    const moduleScope = provider.slice(0, provider.indexOf('export function aiProvider'));
    expect(moduleScope).not.toContain('process.env.ANTHROPIC_API_KEY');
  });
});

/* ------------------------------------------------------------------ */
/* Authorisation is server-side                                         */
/* ------------------------------------------------------------------ */

describe('authorisation cannot be asserted by the client', () => {
  it('ignores a userId in the body', async () => {
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'an answer here', userId: bob }));
    const rows = await prisma.answerEvaluation.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0].userId).toBe(alice);
  });

  it('ignores a score supplied by the client', async () => {
    const res = await interviewRoute(
      post({ unitId: unit.id, questionIndex: 0, answer: 'a deliberately poor answer', score: 100, scores: { overall: 100 } }),
    );
    const body = (await res.json()) as { evaluation: { scores: { overall: number } } };
    expect(body.evaluation.scores.overall).toBeLessThan(100);
    const row = await prisma.answerEvaluation.findFirstOrThrow();
    expect(row.score).toBe(body.evaluation.scores.overall);
  });

  it('ignores question text supplied by the client', async () => {
    const res = await interviewRoute(
      post({
        unitId: unit.id,
        questionIndex: 0,
        answer: 'banana',
        question: 'What is a banana?',
        referenceAnswer: 'A banana is a fruit.',
      }),
    );
    const body = (await res.json()) as { evaluation: { scores: { overall: number } } };
    // Graded against the real curriculum question, which "banana" does not answer.
    expect(body.evaluation.scores.overall).toBe(0);
  });

  it('leaves one learner unable to touch another learner’s row', async () => {
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'alice wrote this answer' }));

    jar.clear();
    await signIn(bob);
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'bob wrote this answer' }));

    const rows = await prisma.answerEvaluation.findMany({ orderBy: { createdAt: 'asc' } });
    expect(rows).toHaveLength(2);
    expect(rows.find((r) => r.userId === alice)!.answer).toContain('alice');
    expect(rows.find((r) => r.userId === bob)!.answer).toContain('bob');
  });

  it('exposes no route that reads an evaluation back', () => {
    // The only way a stored evaluation reaches a browser is in the response to
    // the request that created it. There is deliberately no GET, so there is
    // no id to enumerate and no row to fetch by guessing one.
    const routes = FILES.filter((f) => /^app\/api\/evaluate\//.test(f.file));
    expect(routes.length).toBeGreaterThan(0);
    for (const route of routes) {
      expect([route.file, /export async function GET/.test(route.text)]).toEqual([route.file, false]);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Abuse                                                                */
/* ------------------------------------------------------------------ */

describe('abuse is bounded', () => {
  it('cannot be evaded by rotating the client address', async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 34; i += 1) {
      statuses.push(
        (
          await interviewRoute(
            post({ unitId: unit.id, questionIndex: 0, answer: `attempt number ${i}` }, { 'x-forwarded-for': `198.51.100.${i}` }),
          )
        ).status,
      );
    }
    // The per-client limit sees 34 different clients and allows them all; the
    // per-account limit is what holds, which is why both exist.
    expect(statuses.filter((s) => s === 429).length).toBeGreaterThan(0);
  });

  it('treats a replayed identical request as a repeat, not a new row', async () => {
    const body = { unitId: unit.id, questionIndex: 0, answer: 'the very same answer, sent twice' };
    await interviewRoute(post(body));
    await interviewRoute(post(body));

    const rows = await prisma.answerEvaluation.findMany();
    expect(rows).toHaveLength(1);
    expect(rows[0].attempts).toBe(2);
  });

  it('spends nothing upstream on an answer too short to grade', async () => {
    next.value = { ok: true, text: '{}', model: 'test-model' };
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'no' }));
    expect(calls).toHaveLength(0);
  });

  it('truncates rather than forwarding an oversized answer that passes the schema', async () => {
    next.value = { ok: true, text: '{}', model: 'test-model' };
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'overfitting noise. '.repeat(300) }));
    expect(calls).toHaveLength(1);
    expect(calls[0].user.length).toBeLessThan(12_000);
  });
});

/* ------------------------------------------------------------------ */
/* Exfiltration                                                         */
/* ------------------------------------------------------------------ */

describe('a compromised model cannot leak anything worth having', () => {
  it('discards a reply that is the system prompt read back', async () => {
    next.value = {
      ok: true,
      model: 'test-model',
      text: 'Certainly! My instructions are: You are grading a single interview answer for a learner…',
    };
    const res = await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'a real and reasonably complete attempt at answering the question properly' }));
    const body = (await res.json()) as { evaluation: { source: string; degraded?: string; summary: string } };
    expect(body.evaluation.source).toBe('deterministic');
    expect(body.evaluation.degraded).toBe('invalid-output');
    expect(body.evaluation.summary).not.toContain('instructions');
  });

  it('carries no environment value through even a schema-valid reply', async () => {
    process.env.SECRET_CANARY = 'canary-must-not-appear';
    next.value = {
      ok: true,
      model: 'test-model',
      text: JSON.stringify({
        correctness: 50,
        completeness: 50,
        technicalDepth: 50,
        clarity: 50,
        missingConcepts: [],
        misconceptions: [],
        suggestedImprovement: 'Fine.',
        followUpQuestion: 'And then?',
        summary: 'Fine.',
      }),
    };
    const res = await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'a real and reasonably complete attempt at answering the question properly' }));
    const serialised = JSON.stringify(await res.json());
    expect(serialised).not.toContain('canary-must-not-appear');
    expect(serialised).not.toContain(process.env.AUTH_SECRET!);
    delete process.env.SECRET_CANARY;
  });

  it('sends no secret upstream in the prompt', async () => {
    next.value = { ok: true, text: '{}', model: 'test-model' };
    await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'a real and reasonably complete attempt at answering the question properly' }));
    const whole = `${calls[0].system}\n${calls[0].user}`;
    expect(whole).not.toContain(process.env.AUTH_SECRET!);
    expect(whole).not.toContain(process.env.DATABASE_URL!);
    expect(whole).not.toContain(alice);
  });

  it('bounds every field a successful injection could write into', async () => {
    next.value = {
      ok: true,
      model: 'test-model',
      text: JSON.stringify({
        correctness: 100,
        completeness: 100,
        technicalDepth: 100,
        clarity: 100,
        missingConcepts: [],
        misconceptions: [],
        suggestedImprovement: 'x'.repeat(50_000),
        followUpQuestion: 'y'.repeat(50_000),
        summary: 'z'.repeat(50_000),
      }),
    };
    const res = await interviewRoute(post({ unitId: unit.id, questionIndex: 0, answer: 'a real and reasonably complete attempt at answering the question properly' }));
    const body = (await res.json()) as { evaluation: { degraded?: string } };
    // Over the cap, so the whole reply is rejected rather than trimmed.
    expect(body.evaluation.degraded).toBe('invalid-output');
  });
});
