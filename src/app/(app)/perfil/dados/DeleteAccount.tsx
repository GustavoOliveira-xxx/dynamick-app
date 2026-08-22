'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { deleteAccountAction } from '@/lib/auth/actions';

/** Exclusão exige confirmação explícita digitada — não é um clique acidental. */
export function DeleteAccount() {
  const [confirming, setConfirming] = useState(false);
  const [text, setText] = useState('');
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <Button variant="danger" className="mt-4" onClick={() => setConfirming(true)}>
        Quero excluir minha conta
      </Button>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <InlineMessage tone="danger" title="Confirmação necessária">
        Digite <strong>EXCLUIR</strong> abaixo para confirmar.
      </InlineMessage>

      <label htmlFor="confirmar-exclusao" className="sr-only">
        Digite EXCLUIR para confirmar
      </label>
      <input
        id="confirmar-exclusao"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="min-h-[46px] w-full max-w-xs rounded-md border border-line bg-[color:var(--ck-bg-raised)] px-3 text-sm"
        placeholder="EXCLUIR"
      />

      <div className="flex gap-2">
        <Button
          variant="danger"
          disabled={text !== 'EXCLUIR'}
          loading={pending}
          onClick={() => startTransition(async () => { await deleteAccountAction(); })}
        >
          Excluir definitivamente
        </Button>
        <Button variant="ghost" onClick={() => { setConfirming(false); setText(''); }}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
