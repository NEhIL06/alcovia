import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.SESSION_SECRET || '276bb7344349c3fb477a025c48119e6dae4ce0a079aeec2a5d2fe50b66ccc6d6';
const SESSION_COOKIE = 'alcovia_session';
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'ops';
}

const USERS: Record<string, { password: string; user: User }> = {
  vibhor: {
    password: (process.env.VIBHOR_PASS || '2BcMZxh1SCxNhhC6-KDqsA').trim(),
    user: { id: 'vibhor', name: 'Vibhor', email: 'vibhor.gautam@alcovia.life', role: 'ops' },
  },
  sahil: {
    password: (process.env.SAHIL_PASS || '6oHT8vbX6r8f8CbA1JH6oQ').trim(),
    user: { id: 'sahil', name: 'Sahil', email: 'sahil@alcovia.life', role: 'admin' },
  },
};

function hmac(data: string): string {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SESSION_SECRET);
  const msgData = encoder.encode(data);
  // Simple HMAC using XOR + hash (works in edge runtime without crypto.subtle)
  let hash = 0;
  for (let i = 0; i < msgData.length; i++) {
    hash = ((hash << 5) - hash + (msgData[i] ^ keyData[i % keyData.length])) | 0;
  }
  return Math.abs(hash).toString(36) + '-' + data.length.toString(36);
}

export function createSession(userId: string): string {
  const payload = JSON.stringify({ id: userId, exp: Date.now() + MAX_AGE * 1000 });
  const encoded = Buffer.from(payload).toString('base64url');
  const sig = hmac(encoded);
  return `${sig}.${encoded}`;
}

export function verifySession(token: string): User | null {
  try {
    const [sig, encoded] = token.split('.');
    if (!sig || !encoded) return null;
    if (hmac(encoded) !== sig) return null;
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString());
    if (payload.exp < Date.now()) return null;
    const entry = Object.values(USERS).find(u => u.user.id === payload.id);
    return entry?.user || null;
  } catch {
    return null;
  }
}

export function validateLogin(username: string, password: string): User | null {
  const entry = USERS[username.toLowerCase()];
  if (!entry) return null;
  // Constant-time comparison
  const a = entry.password;
  const b = password;
  if (a.length !== b.length) return null;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0 ? entry.user : null;
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export { SESSION_COOKIE, MAX_AGE };
