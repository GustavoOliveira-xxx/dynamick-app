import type { Difficulty } from '@/lib/domain';

/**
 * Gerador de simulados com composição controlada (§5.8 e §11.7).
 *
 * Regra de fallback obrigatória: se não houver questões suficientes para a matriz,
 * o gerador informa o que faltou em vez de repetir o mesmo item em excesso.
 */

export type BlueprintQuestion = {
  id: string;
  areaSlug: string;
  topicSlug: string;
  difficulty: Difficulty;
  isRecovery: boolean;
};

export type Blueprint = {
  areas?: Record<string, number>;
  topics?: Record<string, number>;
  difficulty?: Partial<Record<Difficulty, number>>;
};

export type GenerationResult = {
  questionIds: string[];
  /** Aviso legível para a curadoria quando a matriz não pôde ser cumprida. */
  fallbackNote: string | null;
  /** Quanto faltou, por dimensão — usado na tela de saúde do banco. */
  shortfall: { dimension: string; key: string; requested: number; available: number }[];
};

/**
 * Seleção determinística: dado o mesmo conjunto de questões e a mesma matriz,
 * o resultado é sempre igual (importante para reprodutibilidade e testes).
 * A ordem final é embaralhada por uma semente estável derivada do próprio simulado.
 */
export function generateSimulation(
  pool: BlueprintQuestion[],
  blueprint: Blueprint,
  totalRequested: number,
  seed = 'default',
): GenerationResult {
  const available = pool.filter((question) => !question.isRecovery);
  const used = new Set<string>();
  const picked: string[] = [];
  const shortfall: GenerationResult['shortfall'] = [];

  function take(candidates: BlueprintQuestion[], count: number): number {
    let taken = 0;
    for (const candidate of candidates) {
      if (taken >= count) break;
      if (used.has(candidate.id)) continue;
      used.add(candidate.id);
      picked.push(candidate.id);
      taken += 1;
    }
    return taken;
  }

  // 1. Cotas por tópico (mais específicas primeiro).
  for (const [topicSlug, count] of Object.entries(blueprint.topics ?? {})) {
    const candidates = sortStable(available.filter((question) => question.topicSlug === topicSlug));
    const taken = take(candidates, count);
    if (taken < count) {
      shortfall.push({ dimension: 'tópico', key: topicSlug, requested: count, available: taken });
    }
  }

  // 2. Cotas por área, descontando o que já veio dos tópicos.
  for (const [areaSlug, count] of Object.entries(blueprint.areas ?? {})) {
    const alreadyFromArea = picked.filter((id) =>
      available.some((question) => question.id === id && question.areaSlug === areaSlug),
    ).length;
    const missing = count - alreadyFromArea;
    if (missing <= 0) continue;

    const candidates = sortStable(available.filter((question) => question.areaSlug === areaSlug));
    const taken = take(candidates, missing);
    if (taken < missing) {
      shortfall.push({
        dimension: 'área',
        key: areaSlug,
        requested: count,
        available: alreadyFromArea + taken,
      });
    }
  }

  // 3. Completa até o total pedido, sem repetir item.
  if (picked.length < totalRequested) {
    const taken = take(sortStable(available), totalRequested - picked.length);
    if (picked.length < totalRequested) {
      shortfall.push({
        dimension: 'total',
        key: 'questões',
        requested: totalRequested,
        available: picked.length,
      });
      void taken;
    }
  }

  const note =
    shortfall.length > 0
      ? `Não há questões publicadas suficientes para a matriz deste simulado: ${shortfall
          .map((item) => `${item.dimension} "${item.key}" pediu ${item.requested} e havia ${item.available}`)
          .join('; ')}. O simulado foi gerado com o que existe, sem repetir itens.`
      : null;

  return {
    questionIds: shuffleStable(picked.slice(0, totalRequested), seed),
    fallbackNote: note,
    shortfall,
  };
}

/** Ordenação estável por id: garante o mesmo resultado a cada execução. */
function sortStable(items: BlueprintQuestion[]): BlueprintQuestion[] {
  return [...items].sort((a, b) => a.id.localeCompare(b.id));
}

/** Embaralhamento determinístico a partir de uma semente textual. */
function shuffleStable(items: string[], seed: string): string[] {
  const result = [...items];
  let state = 0;
  for (let i = 0; i < seed.length; i += 1) state = (state * 31 + seed.charCodeAt(i)) >>> 0;

  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (state * 1_103_515_245 + 12_345) >>> 0;
    const j = state % (i + 1);
    const a = result[i]!;
    const b = result[j]!;
    result[i] = b;
    result[j] = a;
  }
  return result;
}
