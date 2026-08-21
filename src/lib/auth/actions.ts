'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { hashPassword, verifyPassword } from './passwords';
import { createAuthSession, destroyAuthSession, generateResetToken, hashResetToken } from './session';
import { forgotPasswordSchema, resetPasswordSchema, signInSchema, signUpSchema } from './schemas';
import { rateLimit } from './rate-limit';
import { getCurrentUser } from './current-user';

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: string;
  /** Só em desenvolvimento: o link de redefinição, já que não há envio de e-mail. */
  devResetToken?: string;
};

async function clientKey(prefix: string): Promise<string> {
  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerList.get('x-real-ip') ??
    'local';
  return `${prefix}:${ip}`;
}

function zodFieldErrors(error: { issues: { path: (string | number)[]; message: string }[] }) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

/** Cria conta com os dados mínimos (§5.1: solicite apenas o necessário). */
export async function signUpAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const limit = rateLimit(await clientKey('signup'), 8, 60_000);
  if (!limit.ok) {
    return { error: `Muitas tentativas seguidas. Tente de novo em ${limit.retryAfterSeconds} segundos.` };
  }

  const parsed = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error) };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { fieldErrors: { email: 'Já existe uma conta com esse e-mail. Tente entrar.' } };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
      studyProfile: { create: {} },
      personalization: { create: {} },
      notificationPreference: { create: {} },
    },
  });

  const headerList = await headers();
  await createAuthSession(user.id, headerList.get('user-agent') ?? undefined);
  redirect('/onboarding');
}

export async function signInAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const limit = rateLimit(await clientKey('signin'), 10, 60_000);
  if (!limit.ok) {
    return { error: `Muitas tentativas seguidas. Tente de novo em ${limit.retryAfterSeconds} segundos.` };
  }

  const parsed = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error) };

  const user = await prisma.user.findFirst({
    where: { email: parsed.data.email, deletedAt: null },
  });

  // Mensagem idêntica para e-mail inexistente e senha errada: não revela quem tem conta.
  const valid = user ? await verifyPassword(parsed.data.password, user.passwordHash) : false;
  if (!user || !valid) {
    return { error: 'E-mail ou senha não conferem. Confira e tente de novo.' };
  }

  const headerList = await headers();
  await createAuthSession(user.id, headerList.get('user-agent') ?? undefined);
  await prisma.user.update({ where: { id: user.id }, data: { lastSeenAt: new Date() } });

  const rawNext = formData.get('next');
  // Só aceita caminho interno: bloqueia redirecionamento aberto para outro site.
  const next =
    typeof rawNext === 'string' && rawNext.startsWith('/') && !rawNext.startsWith('//')
      ? rawNext
      : '/inicio';
  redirect(next);
}

export async function signOutAction(): Promise<void> {
  await destroyAuthSession();
  redirect('/');
}

export async function forgotPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const limit = rateLimit(await clientKey('forgot'), 5, 300_000);
  if (!limit.ok) {
    return { error: `Muitas tentativas seguidas. Tente de novo em ${limit.retryAfterSeconds} segundos.` };
  }

  const parsed = forgotPasswordSchema.safeParse({ email: formData.get('email') });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error) };

  const user = await prisma.user.findFirst({ where: { email: parsed.data.email, deletedAt: null } });

  // Resposta idêntica exista ou não a conta — não confirma cadastro para terceiros.
  const genericSuccess =
    'Se existir uma conta com esse e-mail, o link de redefinição já está a caminho.';

  if (!user) return { success: genericSuccess };

  const { token, hash } = generateResetToken();
  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash: hash, expiresAt: new Date(Date.now() + 3_600_000) },
  });

  // LIMITAÇÃO CONHECIDA (PROJECT_AUDIT.md §7): não há envio de e-mail nesta versão.
  // Em desenvolvimento o token aparece na tela, claramente identificado.
  if (process.env.NODE_ENV !== 'production') {
    return { success: genericSuccess, devResetToken: token };
  }
  return { success: genericSuccess };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get('token'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { fieldErrors: zodFieldErrors(parsed.error) };

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(parsed.data.token) },
  });

  if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
    return { error: 'Esse código expirou ou já foi usado. Peça um novo link.' };
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash: await hashPassword(parsed.data.password) },
    }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    // Redefinir a senha derruba todas as sessões abertas.
    prisma.authSession.updateMany({
      where: { userId: record.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  return { success: 'Senha atualizada. Você já pode entrar com a nova senha.' };
}

/** Exclusão de conta (§5.1). Exclusão lógica + remoção dos dados pessoais. */
export async function deleteAccountAction(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect('/entrar');

  await prisma.$transaction([
    prisma.authSession.updateMany({ where: { userId: user.id }, data: { revokedAt: new Date() } }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        deletedAt: new Date(),
        // Nenhum dado pessoal permanece legível após a exclusão.
        email: `apagado+${user.id}@dynamick.local`,
        name: 'Conta removida',
        passwordHash: 'conta-removida',
      },
    }),
  ]);

  await destroyAuthSession();
  redirect('/');
}
