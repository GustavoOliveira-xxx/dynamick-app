import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/current-user';
import { SignUpForm } from './SignUpForm';

export const metadata: Metadata = { title: 'Criar conta' };

export default async function SignUpPage() {
  if (await getCurrentUser()) redirect('/inicio');

  return (
    <div className="ck-card p-7">
      <h1 className="text-2xl font-semibold">Criar sua conta</h1>
      <p className="mt-2 text-sm text-ink-secondary">
        Pedimos só o necessário para começar. O resto você configura depois, se quiser.
      </p>
      <SignUpForm />
      <p className="mt-5 text-sm text-ink-secondary">
        Já tem conta?{' '}
        <Link href="/entrar" className="underline underline-offset-4 hover:text-ink-primary">
          Entrar
        </Link>
      </p>
    </div>
  );
}
