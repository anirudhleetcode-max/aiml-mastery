import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'aiml_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface SessionPayload {
  userId: string;
  sessionId: string;
  email: string;
}

function secret(): Uint8Array {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    // Failing loudly beats silently signing with a weak key.
    throw new Error(
      'AUTH_SECRET is missing or too short. Set a value of at least 32 characters (see .env.example).',
    );
  }
  return new TextEncoder().encode(value);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('aiml-mastery')
    .setAudience('aiml-mastery')
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: 'aiml-mastery',
      audience: 'aiml-mastery',
      algorithms: ['HS256'],
    });
    if (typeof payload.userId !== 'string' || typeof payload.sessionId !== 'string') return null;
    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
      email: typeof payload.email === 'string' ? payload.email : '',
    };
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  // Lax still sends the cookie on top-level navigation but not on
  // cross-site POSTs, which is the CSRF property we need.
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE_SECONDS,
} as const;

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions);
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { ...cookieOptions, maxAge: 0 });
}

export async function readSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}
