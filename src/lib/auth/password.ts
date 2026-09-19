import bcrypt from 'bcryptjs';

const ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

/**
 * Password policy. Deliberately length-first rather than a symbol-soup rule:
 * long passphrases are both stronger and likelier to be remembered.
 */
export function validatePassword(password: string): { ok: boolean; message?: string } {
  if (password.length < 10) return { ok: false, message: 'Use at least 10 characters — length matters more than symbols.' };
  if (password.length > 200) return { ok: false, message: 'That is longer than 200 characters.' };
  if (/^(.)\1+$/.test(password)) return { ok: false, message: 'That is a single repeated character.' };
  const common = ['password12', 'qwertyuiop', '1234567890', 'letmeinnow', 'iloveyou12'];
  if (common.includes(password.toLowerCase())) return { ok: false, message: 'That password is too common.' };
  return { ok: true };
}
