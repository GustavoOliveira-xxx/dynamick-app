import type { Metadata } from 'next';
import Link from 'next/link';
import { RecoverForm } from './RecoverForm';

export const metadata: Metadata = { title: 'Recuperar acesso' };

export default function RecoverPage() {
  return (
    <div className="ck-card p-7">
      <h1 className="text-2xl font-semibold">Recuperar acesso</h1>
      <p className="mt-2 text-sm text-ink-secondary">
        Informe seu e-mail e enviaremos um link para você criar uma nova senha.
      </p>
      <RecoverForm />
      <p className="mt-5 text-sm text-ink-secondary">
        <Link href="/entrar" className="underline underline-offset-4 hover:text-ink-primary">
          Voltar para entrar
        </Link>
      </p>
    </div>
  );
}
