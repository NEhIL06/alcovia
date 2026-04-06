import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, encodeToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = validateCredentials(username, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = encodeToken(user);
  const res = NextResponse.json({ user, token });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 86400,
    path: '/',
  });
  return res;
}
