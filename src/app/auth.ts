export interface UserSession {
  username: string;
  displayName: string;
  token: string;
  createdAt: string;
}

const SESSION_KEY = 'seros.session';
const SHARED_PASSWORD = 'seros';

const USER_DIRECTORY: Record<string, string> = {
  adriana: 'Adriana',
  valentina: 'Valentina',
  jose: 'Jose',
};

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function normalizeUsername(username: string) {
  return username
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function loadSession(): UserSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<UserSession>;
    if (!parsed?.username || !parsed?.displayName || !parsed?.token) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }

    return parsed as UserSession;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: UserSession) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
}

export async function login(username: string, password: string): Promise<UserSession> {
  const normalizedUsername = normalizeUsername(username);
  const startedAt = Date.now();

  await sleep(150);

  const displayName = USER_DIRECTORY[normalizedUsername];
  const isValid = Boolean(displayName) && password === SHARED_PASSWORD;
  const elapsed = Date.now() - startedAt;

  if (elapsed < 700) {
    await sleep(700 - elapsed);
  }

  if (!isValid || !displayName) {
    throw new Error('Usuario o contrasena invalidos');
  }

  const session: UserSession = {
    username: normalizedUsername,
    displayName,
    token:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  saveSession(session);
  return session;
}
