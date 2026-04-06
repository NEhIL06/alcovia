import { NextRequest, NextResponse } from 'next/server';
import { validateLogin, createSession, SESSION_COOKIE, MAX_AGE } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
  }

  const user = validateLogin(username, password);
  if (!user) {
    // Deliberate delay to slow brute force
    await new Promise(r => setTimeout(r, 1000));
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createSession(user.id);
  const res = NextResponse.json({ user: { name: user.name, role: user.role } });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return res;
}
