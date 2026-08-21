'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { InlineMessage } from '@/components/ui/States';
import { ONBOARDING_MESSAGES } from '@/lib/onboarding/questionnaire';
import { confirmProfileAction } from '../actions';

type ProfileCard = {
  slug: string;
  name: string;
  description: string;
  trait?: string;
  firstApproach: string;
  premiseReason?: string;
};

type Props = {
  suggested: Omit<ProfileCard, 'trait' | 'premiseReason'>;
  signals: string[];
  effects: string[];
  supports: string[];
  alternatives: ProfileCard[];
  confidence: 'low' | 'medium' | 'high';
  contradictions: string[];
  insufficientMessage?: string;
  contradictionMessage?: string;
};

/**
 * Tela de confirmação do perfil — §19 do prompt mestre.
 * Traz os 8 elementos obrigatórios: nome, descrição, sinais, efeitos, confirmar,
 * "não me identifiquei", comparação com alternativas e editar respostas.
 */
export function ProfileConfirmation({
  suggested,
  signals,
  effects,
  supports,
  alternatives,
  confidence,
  contradictions,
  insufficientMessage,
  contradictionMessage,
}: Props) {
  const [comparing, setComparing] = useState(false);
  const [chosen, setChosen] = useState(suggested.slug);
  const [rejected, setRejected] = useState(false);

  const chosenIsSuggestion = chosen === suggested.slug;
  const chosenProfile =
    alternatives.find((item) => item.slug === chosen) ?? { ...suggested, trait: undefined };

  return (
    <div className="ck-enter space-y-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Última etapa</p>
        <h1 className="mt-2 text-3xl font-semibold">Esse perfil combina com você?</h1>
      </div>

      {insufficientMessage && <InlineMessage tone="info">{insufficientMessage}</InlineMessage>}
      {contradictionMessage && (
        <InlineMessage tone="warning" title="Notamos algo">
          <p>{contradictionMessage}</p>
          <ul className="mt-2 space-y-1">
            {contradictions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </InlineMessage>
      )}

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="green">Perfil sugerido</Badge>
          {confidence !== 'high' && <Badge tone="warning">Provisório</Badge>}
        </div>

        <h2 className="mt-4 text-2xl font-semibold">{suggested.name}</h2>
        <p className="mt-2 text-ink-secondary">
          Pelo que você contou, seu perfil inicial parece ser <strong>{suggested.name}</strong>. Isso
          significa que vamos priorizar: {suggested.firstApproach.toLowerCase()}. Esse perfil não é
          definitivo.
        </p>

        {signals.length > 0 && (
          <section className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              O que levou a essa sugestão
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-secondary">
              {signals.map((signal) => (
                <li key={signal}>• {signal}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Como isso muda seus estudos
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-secondary">
            {effects.map((effect) => (
              <li key={effect}>• {effect}</li>
            ))}
          </ul>
        </section>

        {supports.length > 0 && (
          <section className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Apoios que vamos ativar
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-secondary">
              {supports.map((support) => (
                <li key={support}>• {support}</li>
              ))}
            </ul>
          </section>
        )}
      </Card>

      {rejected && <InlineMessage tone="info">{ONBOARDING_MESSAGES.rejectedProfile}</InlineMessage>}

      {comparing && (
        <section aria-labelledby="comparar" className="space-y-3">
          <h2 id="comparar" className="text-lg font-semibold">
            Escolha o que mais representa sua situação agora
          </h2>

          <fieldset className="space-y-2.5 border-0 p-0">
            <legend className="sr-only">Perfis disponíveis</legend>

            {[{ ...suggested, trait: 'Nossa sugestão a partir das suas respostas' }, ...alternatives].map(
              (profile) => (
                <label
                  key={profile.slug}
                  className="ck-card ck-card-interactive flex cursor-pointer items-start gap-3 p-4"
                  style={{ borderColor: chosen === profile.slug ? 'var(--ck-green-primary)' : undefined }}
                >
                  <input
                    type="radio"
                    name="profileChoice"
                    value={profile.slug}
                    checked={chosen === profile.slug}
                    onChange={() => setChosen(profile.slug)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[color:var(--ck-green-primary)]"
                  />
                  <span className="min-w-0">
                    <span className="block font-medium">{profile.name}</span>
                    <span className="mt-1 block text-sm text-ink-secondary">{profile.description}</span>
                    {'trait' in profile && profile.trait && (
                      <span className="mt-1 block text-xs text-ink-muted">{profile.trait}</span>
                    )}
                    {'premiseReason' in profile && profile.premiseReason && (
                      <span className="mt-2 block text-xs" style={{ color: 'var(--ck-warning)' }}>
                        Não sugerimos automaticamente: {profile.premiseReason} Você ainda pode
                        escolher.
                      </span>
                    )}
                  </span>
                </label>
              ),
            )}
          </fieldset>
        </section>
      )}

      <form action={confirmProfileAction} className="space-y-4">
        <input type="hidden" name="chosenProfile" value={chosen} />
        {!chosenIsSuggestion && (
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium">
              Quer contar por que esse perfil combina mais? (opcional)
            </span>
            <textarea
              name="note"
              rows={2}
              maxLength={500}
              className="w-full rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 text-sm"
              placeholder="Ex.: meu tempo muda toda semana por causa do trabalho."
            />
          </label>
        )}

        <div className="flex flex-wrap gap-3 border-t border-line pt-5">
          <Button type="submit" size="lg">
            {chosenIsSuggestion
              ? 'Sim, começar com este perfil'
              : `Começar como ${chosenProfile.name}`}
          </Button>

          {!comparing && (
            <Button type="button" variant="secondary" onClick={() => setComparing(true)}>
              Quero comparar com outros perfis
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRejected(true);
              setComparing(true);
            }}
          >
            Nenhum parece comigo
          </Button>
        </div>
      </form>

      <p className="text-sm text-ink-secondary">
        Prefere ajustar o que respondeu?{' '}
        <Link href="/onboarding/contexto" className="underline underline-offset-4 hover:text-ink-primary">
          Editar minhas respostas
        </Link>{' '}
        — nada do que você já respondeu será apagado.
      </p>
    </div>
  );
}
