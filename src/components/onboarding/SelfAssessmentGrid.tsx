'use client';

import { AREA_SELF_ASSESSMENT, SELF_ASSESSMENT_OPTIONS } from '@/lib/onboarding/questionnaire';

/** Etapa G — uma linha por área, três opções reais de rádio por linha. */
export function SelfAssessmentGrid({
  questionId,
  defaultValue = {},
}: {
  questionId: string;
  defaultValue?: Record<string, string>;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-1 text-lg font-semibold">Como você se sente em cada área hoje?</legend>
      <p className="mb-4 text-sm text-ink-secondary">
        Não precisa acertar. Isso é só um ponto de partida.
      </p>

      <div className="space-y-2.5">
        {AREA_SELF_ASSESSMENT.map((area) => (
          <fieldset key={area.slug} className="ck-card border p-4">
            <legend className="px-1 text-[0.95rem] font-medium">{area.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SELF_ASSESSMENT_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm transition-colors duration-fast"
                  style={{
                    borderColor:
                      defaultValue[area.slug] === option.value
                        ? 'var(--ck-green-primary)'
                        : 'var(--ck-border)',
                  }}
                >
                  <input
                    type="radio"
                    name={`${questionId}:${area.slug}`}
                    value={option.value}
                    defaultChecked={defaultValue[area.slug] === option.value}
                    className="h-4 w-4 accent-[color:var(--ck-green-primary)]"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </fieldset>
  );
}
