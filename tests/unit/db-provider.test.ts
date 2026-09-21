import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

/**
 * These cover a defect that reached production: the build script chose the
 * Prisma datasource provider from DATABASE_PROVIDER alone, and `vercel build`
 * runs `npm run build` in an environment where that variable is not
 * necessarily present. It fell through to sqlite, generated a SQLite client
 * against a postgresql:// DATABASE_URL, and the deployment then served every
 * page that avoided the database while failing every read and write with a
 * 500. Nothing caught it because nothing exercised the resolution rules.
 */

const SCRIPT = path.resolve('scripts/db-provider.mjs');

const SCHEMA = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id String @id
}
`;

const workspaces: string[] = [];

/** A throwaway project directory, since the script resolves paths from cwd. */
function workspace(provider = 'sqlite') {
  const dir = mkdtempSync(path.join(tmpdir(), 'db-provider-'));
  workspaces.push(dir);
  mkdirSync(path.join(dir, 'prisma'));
  writeFileSync(
    path.join(dir, 'prisma/schema.prisma'),
    SCHEMA.replace('provider = "sqlite"', `provider = "${provider}"`),
  );
  return dir;
}

function run(dir: string, { args = [] as string[], env = {} as Record<string, string> } = {}) {
  // The parent process has its own DATABASE_URL; strip it so each case states
  // exactly the environment it means to test.
  const base = { ...process.env };
  delete base.DATABASE_URL;
  delete base.DATABASE_PROVIDER;
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT, ...args], {
      cwd: dir,
      env: { ...base, ...env },
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { code: 0, stdout, stderr: '' };
  } catch (error) {
    const failure = error as { status: number; stdout: string; stderr: string };
    return { code: failure.status, stdout: failure.stdout, stderr: failure.stderr };
  }
}

function providerIn(dir: string) {
  const schema = readFileSync(path.join(dir, 'prisma/schema.prisma'), 'utf8');
  return /datasource[\s\S]+?provider\s*=\s*"([a-z]+)"/.exec(schema)?.[1];
}

afterEach(() => {
  while (workspaces.length) rmSync(workspaces.pop()!, { recursive: true, force: true });
});

describe('db-provider', () => {
  it('derives postgresql from the connection string when nothing states it', () => {
    // The exact shape of the production failure.
    const dir = workspace('sqlite');
    const result = run(dir, { env: { DATABASE_URL: 'postgresql://u:p@host:5432/db' } });

    expect(result.code).toBe(0);
    expect(providerIn(dir)).toBe('postgresql');
  });

  it('accepts the postgres:// spelling too', () => {
    const dir = workspace('sqlite');
    run(dir, { env: { DATABASE_URL: 'postgres://u:p@host:5432/db' } });

    expect(providerIn(dir)).toBe('postgresql');
  });

  it('leaves a file: URL on sqlite, so local development is untouched', () => {
    const dir = workspace('postgresql');
    const result = run(dir, { env: { DATABASE_URL: 'file:./dev.db' } });

    expect(result.code).toBe(0);
    expect(providerIn(dir)).toBe('sqlite');
  });

  it('defaults to sqlite when there is no URL and no variable', () => {
    const dir = workspace('postgresql');

    expect(run(dir).code).toBe(0);
    expect(providerIn(dir)).toBe('sqlite');
  });

  it('honours an explicit argument', () => {
    const dir = workspace('sqlite');
    run(dir, { args: ['postgresql'] });

    expect(providerIn(dir)).toBe('postgresql');
  });

  it('honours DATABASE_PROVIDER', () => {
    const dir = workspace('sqlite');
    run(dir, { env: { DATABASE_PROVIDER: 'postgresql' } });

    expect(providerIn(dir)).toBe('postgresql');
  });

  it('refuses to build a client that cannot talk to the stated URL', () => {
    // Generating a SQLite client against a Postgres URL is never right, so it
    // has to stop the build rather than produce a deployment that 500s.
    const dir = workspace('sqlite');
    const result = run(dir, {
      args: ['sqlite'],
      env: { DATABASE_URL: 'postgresql://u:p@host:5432/db' },
    });

    expect(result.code).toBe(1);
    expect(result.stderr).toMatch(/postgresql connection string/);
  });

  it('rejects a provider it cannot generate for', () => {
    const dir = workspace('sqlite');
    const result = run(dir, { args: ['mysql'] });

    expect(result.code).toBe(1);
    expect(providerIn(dir)).toBe('sqlite');
  });
});
