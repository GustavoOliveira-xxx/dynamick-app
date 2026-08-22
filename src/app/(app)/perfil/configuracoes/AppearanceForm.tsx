'use client';

import { useActionState, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InlineMessage } from '@/components/ui/States';
import { updateAppearanceAction, type ProfileActionState } from '@/lib/profile/actions';

const INITIAL: ProfileActionState = {};

type Settings = {
  theme: string;
  textScale: string;
  reducedMotion: string;
  highContrast: boolean;
  visualIntensity: string;
  correctionMode: string;
  showTimer: boolean;
  confidencePrompt: boolean;
  hintsBeforeAnswer: boolean;
};

/**
 * Preferências de interface (etapa H do onboarding, editáveis depois).
 * A pré-visualização é aplicada ao <html> na hora, para o usuário ver o efeito
 * antes de salvar — e o valor persistido reassume no recarregamento.
 */
export function AppearanceForm({ initial }: { initial: Settings }) {
  const [state, formAction, pending] = useActionState(updateAppearanceAction, INITIAL);
  const [local, setLocal] = useState(initial);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = local.theme;
    root.dataset.textScale = local.textScale;
    if (local.highContrast) root.dataset.contrast = 'high';
    else delete root.dataset.contrast;
    if (local.reducedMotion === 'always') root.dataset.motion = 'reduced';
    else delete root.dataset.motion;
    if (local.visualIntensity === 'reduced') root.dataset.visual = 'reduced';
    else delete root.dataset.visual;
  }, [local]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setLocal((current) => ({ ...current, [key]: value }));
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <InlineMessage tone="danger">{state.error}</InlineMessage>}
      {state.success && <InlineMessage tone="success">{state.success}</InlineMessage>}

      <Card className="space-y-5 p-6">
        <h2 className="text-lg font-semibold">Aparência</h2>

        <Radio
          legend="Tema"
          name="theme"
          value={local.theme}
          onChange={(value) => update('theme', value)}
          options={[
            { value: 'dark', label: 'Escuro' },
            { value: 'light', label: 'Claro' },
          ]}
        />

        <Radio
          legend="Tamanho do texto"
          name="textScale"
          value={local.textScale}
          onChange={(value) => update('textScale', value)}
          options={[
            { value: '100', label: 'Padrão' },
            { value: '112', label: 'Maior' },
            { value: '125', label: 'Bem maior' },
          ]}
        />

        <Radio
          legend="Contraste"
          name="highContrast"
          value={String(local.highContrast)}
          onChange={(value) => update('highContrast', value === 'true')}
          options={[
            { value: 'false', label: 'Padrão' },
            { value: 'true', label: 'Alto contraste' },
          ]}
        />

        <Radio
          legend="Animações"
          name="reducedMotion"
          value={local.reducedMotion}
          onChange={(value) => update('reducedMotion', value)}
          options={[
            { value: 'auto', label: 'Seguir meu sistema' },
            { value: 'always', label: 'Sempre reduzidas' },
          ]}
          hint="Com animações reduzidas, transições viram fades simples e o movimento contínuo é desligado."
        />

        <Radio
          legend="Fundo animado"
          name="visualIntensity"
          value={local.visualIntensity}
          onChange={(value) => update('visualIntensity', value)}
          options={[
            { value: 'full', label: 'Completo' },
            { value: 'reduced', label: 'Modo visual reduzido' },
          ]}
          hint="O modo reduzido desliga o fundo em movimento. Útil em aparelhos mais lentos."
        />
      </Card>

      <Card className="space-y-5 p-6">
        <h2 className="text-lg font-semibold">Como você prefere praticar</h2>

        <Radio
          legend="Correção"
          name="correctionMode"
          value={local.correctionMode}
          onChange={(value) => update('correctionMode', value)}
          options={[
            { value: 'learning', label: 'Depois de cada questão' },
            { value: 'exam', label: 'Só no final da sessão' },
          ]}
        />

        <Radio
          legend="Cronômetro"
          name="showTimer"
          value={String(local.showTimer)}
          onChange={(value) => update('showTimer', value === 'true')}
          options={[
            { value: 'true', label: 'Mostrar' },
            { value: 'false', label: 'Esconder' },
          ]}
          hint="Escondido, o tempo continua sendo registrado — você só não o vê durante a questão."
        />

        <Radio
          legend="Perguntar minha confiança antes de responder"
          name="confidencePrompt"
          value={String(local.confidencePrompt)}
          onChange={(value) => update('confidencePrompt', value === 'true')}
          options={[
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' },
          ]}
        />

        <Radio
          legend="Dicas antes da resposta"
          name="hintsBeforeAnswer"
          value={String(local.hintsBeforeAnswer)}
          onChange={(value) => update('hintsBeforeAnswer', value === 'true')}
          options={[
            { value: 'false', label: 'Não' },
            { value: 'true', label: 'Sim' },
          ]}
        />
      </Card>

      <Button type="submit" loading={pending}>
        {pending ? 'Salvando…' : 'Salvar preferências'}
      </Button>
    </form>
  );
}

function Radio({
  legend,
  name,
  value,
  onChange,
  options,
  hint,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-sm font-medium">{legend}</legend>
      {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm"
            style={{ borderColor: value === option.value ? 'var(--ck-green-primary)' : 'var(--ck-border)' }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
