const USERS: Record<string, { password: string; role: string; name: string }> = {
  sahil: { password: 'alcovia2026', role: 'stakeholder', name: 'Sahil' },
  vibhor: { password: 'ops2026', role: 'ops', name: 'Vibhor' },
  ops: { password: 'opsTeam2026', role: 'ops', name: 'Ops Team' },
};

export function validateCredentials(username: string, password: string) {
  const user = USERS[username.toLowerCase()];
  if (!user || user.password !== password) return null;
  return { username: username.toLowerCase(), role: user.role, name: user.name };
}

export function encodeToken(payload: { username: string; role: string; name: string }): string {
  return Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64');
}

export function decodeToken(token: string): { username: string; role: string; name: string } | null {
  try {
    const data = JSON.parse(Buffer.from(token, 'base64').toString());
    if (data.exp < Date.now()) return null;
    return { username: data.username, role: data.role, name: data.name };
  } catch {
    return null;
  }
}
