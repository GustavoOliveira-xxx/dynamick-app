import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/current-user';
import { SignInForm } from './SignInForm';

export const metadata: Metadata = { title: 'Entrar' };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getCurrentUser()) redirect('/inicio');
  const params = await searchParams;
  const next = params.next && params.next.startsWith('/') && !params.next.startsWith('//') ? params.next : '';

  return (
    <div className="ck-card p-7">
      <h1 className="text-2xl font-semibold">Entrar</h1>
      <p className="mt-2 text-sm text-ink-secondary">Bom te ver de novo.</p>
      <SignInForm next={next} />
      <div className="mt-5 flex flex-col gap-2 text-sm text-ink-secondary">
        <Link href="/recuperar-acesso" className="underline underline-offset-4 hover:text-ink-primary">
          Esqueci minha senha
        </Link>
        <span>
          Ainda não tem conta?{' '}
          <Link href="/criar-conta" className="underline underline-offset-4 hover:text-ink-primary">
            Criar conta
          </Link>
        </span>
      </div>
    </div>
  );
}
