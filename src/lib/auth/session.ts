import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

const COOKIE_NAME = 'ck_session';
const SESSION_DAYS = 30;

/**
 * Segredo do cookie. Em produção a ausência é erro fatal — nunca há fallback silencioso.
 */
function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (value && value.length >= 16) return value;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET ausente ou curto demais. Configure antes de subir em produção.');
  }
  return 'dev-only-insecure-secret-change-me';
}

function sign(value: string): string {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function serializeToken(sessionId: string): string {
  return `${sessionId}.${sign(sessionId)}`;
}

export function parseToken(token: string | undefined): string | null {
  if (!token) return null;
  const separator = token.lastIndexOf('.');
  if (separator <= 0) return null;
  const id = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!id || !signature) return null;
  return safeEqual(signature, sign(id)) ? id : null;
}

export async function createAuthSession(userId: string, userAgent?: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  const session = await prisma.authSession.create({
    data: { userId, expiresAt, userAgent: userAgent?.slice(0, 250) },
  });
  const store = await cookies();
  store.set(COOKIE_NAME, serializeToken(session.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
}

/** Invalida a sessão no servidor, não apenas o cookie no navegador (§20.5). */
export async function destroyAuthSession(): Promise<void> {
  const store = await cookies();
  const sessionId = parseToken(store.get(COOKIE_NAME)?.value);
  if (sessionId) {
    await prisma.authSession
      .update({ where: { id: sessionId }, data: { revokedAt: new Date() } })
      .catch(() => undefined);
  }
  store.delete(COOKIE_NAME);
}

export async function readSessionUserId(): Promise<string | null> {
  const store = await cookies();
  const sessionId = parseToken(store.get(COOKIE_NAME)?.value);
  if (!sessionId) return null;

  const session = await prisma.authSession.findUnique({ where: { id: sessionId } });
  if (!session || session.revokedAt || session.expiresAt.getTime() < Date.now()) return null;
  return session.userId;
}

export function generateResetToken(): { token: string; hash: string } {
  const token = randomBytes(24).toString('base64url');
  return { token, hash: createHmac('sha256', secret()).update(token).digest('hex') };
}

export function hashResetToken(token: string): string {
  return createHmac('sha256', secret()).update(token).digest('hex');
}
