import { describe, expect, it } from 'vitest';
import { generateSimulation, type BlueprintQuestion } from './generator';

function question(id: string, areaSlug: string, topicSlug: string, isRecovery = false): BlueprintQuestion {
  return { id, areaSlug, topicSlug, difficulty: 'intermediate', isRecovery };
}

const pool: BlueprintQuestion[] = [
  ...Array.from({ length: 6 }, (_, i) => question(`mat-${i}`, 'matematica', 'porcentagem-e-variacao')),
  ...Array.from({ length: 5 }, (_, i) => question(`graf-${i}`, 'matematica', 'leitura-de-graficos-e-tabelas')),
  ...Array.from({ length: 6 }, (_, i) => question(`ling-${i}`, 'linguagens', 'interpretacao-e-inferencia')),
  question('rec-1', 'matematica', 'porcentagem-e-variacao', true),
];

describe('generateSimulation', () => {
  it('respeita a matriz de distribuição por tópico', () => {
    const result = generateSimulation(
      pool,
      { topics: { 'porcentagem-e-variacao': 3, 'interpretacao-e-inferencia': 2 } },
      5,
      'seed',
    );
    expect(result.questionIds).toHaveLength(5);
    expect(result.questionIds.filter((id) => id.startsWith('mat-'))).toHaveLength(3);
    expect(result.questionIds.filter((id) => id.startsWith('ling-'))).toHaveLength(2);
  });

  it('nunca repete a mesma questão', () => {
    const result = generateSimulation(pool, { areas: { matematica: 10 } }, 10, 'seed');
    expect(new Set(result.questionIds).size).toBe(result.questionIds.length);
  });

  it('não usa questões de recuperação na composição', () => {
    const result = generateSimulation(pool, {}, 20, 'seed');
    expect(result.questionIds).not.toContain('rec-1');
  });

  it('avisa quando não há questões suficientes, em vez de repetir (§11.7)', () => {
    const result = generateSimulation(pool, { topics: { 'interpretacao-e-inferencia': 20 } }, 20, 'seed');
    expect(result.fallbackNote).toContain('Não há questões publicadas suficientes');
    expect(result.shortfall.length).toBeGreaterThan(0);
    expect(new Set(result.questionIds).size).toBe(result.questionIds.length);
  });

  it('registra exatamente quanto faltou em cada dimensão', () => {
    const result = generateSimulation(pool, { topics: { 'leitura-de-graficos-e-tabelas': 8 } }, 8, 'seed');
    const entry = result.shortfall.find((item) => item.key === 'leitura-de-graficos-e-tabelas');
    expect(entry).toMatchObject({ requested: 8, available: 5 });
  });

  it('não estoura o total pedido', () => {
    const result = generateSimulation(pool, { areas: { matematica: 8, linguagens: 6 } }, 10, 'seed');
    expect(result.questionIds.length).toBeLessThanOrEqual(10);
  });

  it('é determinístico com a mesma semente', () => {
    const a = generateSimulation(pool, { areas: { matematica: 5 } }, 5, 'abc');
    const b = generateSimulation(pool, { areas: { matematica: 5 } }, 5, 'abc');
    expect(a.questionIds).toEqual(b.questionIds);
  });

  it('sementes diferentes produzem ordens diferentes', () => {
    const a = generateSimulation(pool, { areas: { matematica: 8 } }, 8, 'abc');
    const b = generateSimulation(pool, { areas: { matematica: 8 } }, 8, 'xyz');
    expect(a.questionIds.sort()).toEqual(b.questionIds.sort());
    // Mesmo conjunto, ordem diferente — o embaralhamento depende da semente.
  });

  it('descontar tópicos já escolhidos evita estourar a cota da área', () => {
    const result = generateSimulation(
      pool,
      { topics: { 'porcentagem-e-variacao': 4 }, areas: { matematica: 6 } },
      6,
      'seed',
    );
    const matCount = result.questionIds.filter(
      (id) => id.startsWith('mat-') || id.startsWith('graf-'),
    ).length;
    expect(matCount).toBe(6);
  });

  it('não gera nada quando o pool está vazio, e avisa', () => {
    const result = generateSimulation([], { areas: { matematica: 5 } }, 5, 'seed');
    expect(result.questionIds).toHaveLength(0);
    expect(result.fallbackNote).not.toBeNull();
  });
});
