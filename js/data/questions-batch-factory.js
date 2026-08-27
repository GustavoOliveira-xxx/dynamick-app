import { expandedQuestion } from './questions-expansion-factory.js';

export const QUESTIONS_PER_UPDATE = 5;

const FORMATS = ['concept', 'applied', 'interpretation', 'comparison', 'integration'];
const DIFFICULTIES = ['intro', 'intermediate', 'intermediate', 'challenging', 'challenging'];

export function buildQuestionBatch({ batch, origin, support, sets }) {
  const seen = new Set();

  return sets.flatMap((set) => {
    if (!set.topicSlug || !set.skillSlug || !set.reasoning) {
      throw new Error(`Leva ${batch}: metadados incompletos em ${set.topicSlug ?? 'tópico sem slug'}.`);
    }
    if (set.items.length !== QUESTIONS_PER_UPDATE) {
      throw new Error(
        `Leva ${batch}: ${set.topicSlug} precisa de ${QUESTIONS_PER_UPDATE} questões; recebeu ${set.items.length}.`,
      );
    }
    if (seen.has(set.topicSlug)) throw new Error(`Leva ${batch}: tópico repetido ${set.topicSlug}.`);
    seen.add(set.topicSlug);

    return set.items.map(([stem, correct, distractors, explanation], index) => {
      if (!Array.isArray(distractors) || distractors.length !== 4) {
        throw new Error(`Leva ${batch}: ${set.topicSlug} questão ${index + 1} precisa de quatro distratores.`);
      }

      return expandedQuestion({
        topicSlug: set.topicSlug,
        slug: `q${batch}-${set.topicSlug}-${index + 1}`,
        stem,
        support: set.support ?? support,
        difficulty: DIFFICULTIES[index],
        cognitiveFormat: FORMATS[index],
        reasoningType: set.reasoning,
        estimatedSeconds: index < 2 ? 105 : index < 4 ? 135 : 165,
        skillSlug: set.skillSlug,
        likelyErrors: set.errors ?? [],
        correct: 0,
        options: [
          [correct, explanation],
          ...distractors.map((text) => [
            text,
            `Essa leitura não resolve o caso apresentado. O critério decisivo é: ${explanation}`,
            set.errors?.[0] ?? 'aplicar um critério inadequado',
          ]),
        ],
        explanation,
        strategy: set.strategy,
        origin,
      });
    });
  });
}
