const LABELS = ['A', 'B', 'C', 'D', 'E'];
const FORMATS = ['concept', 'applied', 'interpretation', 'comparison', 'integration'];
const DIFFICULTIES = ['intro', 'intermediate', 'intermediate', 'challenging', 'challenging'];

export function buildReinforcement(sets) {
  return sets.flatMap((set) =>
    set.items.map(([stem, correct, explanation, itemDistractors], index) => {
      const distractors = itemDistractors ?? set.distractors;
      if (!distractors || distractors.length !== 4) {
        throw new Error(`Reforço ${set.topicSlug} ${index + 1}: são necessários quatro distratores.`);
      }
      const choices = [correct, ...distractors];
      return {
        topicSlug: set.topicSlug,
        slug: `q-${set.topicSlug}-reforco-${index + 1}`,
        stem,
        difficulty: DIFFICULTIES[index],
        cognitiveFormat: FORMATS[index],
        reasoningType: set.reasoning,
        estimatedSeconds: index < 2 ? 100 : index < 4 ? 135 : 165,
        likelyErrors: set.errors ?? [],
        origin: 'AUTORAL_REFORCO_2026_08',
        license: 'Conteúdo autoral de desenvolvimento — Conscious Knowledge',
        status: 'reviewed',
        options: choices.map((text, optionIndex) => ({
          label: LABELS[optionIndex],
          text,
          ...(optionIndex === 0 ? { isCorrect: true } : {}),
          rationale:
            optionIndex === 0
              ? explanation
              : `Essa leitura não resolve o caso apresentado. O critério decisivo é: ${explanation}`,
          ...(optionIndex > 0 ? { errorHint: set.errors?.[(optionIndex - 1) % (set.errors?.length || 1)] ?? 'aplicar um critério inadequado' } : {}),
        })),
        explanation: {
          summary: explanation,
          detailed: explanation,
          strategy: set.strategy,
        },
      };
    }),
  );
}
