import { describe, it, expect } from './run.mjs';
import { generateSimulation } from '../js/engine/simulation.js';

function question(id, areaSlug, topicSlug, isRecovery = false) {
  return { id, areaSlug, topicSlug, difficulty: 'intermediate', isRecovery };
}

const pool = [
  ...Array.from({ length: 6 }, (_, i) => question(`mat-${i}`, 'matematica', 'porcentagem-e-variacao')),
  ...Array.from({ length: 5 }, (_, i) => question(`graf-${i}`, 'matematica', 'leitura-de-graficos-e-tabelas')),
  ...Array.from({ length: 6 }, (_, i) => question(`ling-${i}`, 'linguagens', 'interpretacao-e-inferencia')),
  question('rec-1', 'matematica', 'porcentagem-e-variacao', true),
];

describe('generateSimulation', () => {
  it('respeita a matriz de distribuição por tópico', () => {
    const result = generateSimulation(
      pool, { topics: { 'porcentagem-e-variacao': 3, 'interpretacao-e-inferencia': 2 } }, 5, 'seed',
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
    expect(generateSimulation(pool, {}, 20, 'seed').questionIds).notToContain('rec-1');
  });

  it('avisa quando faltam questões, em vez de repetir', () => {
    const result = generateSimulation(pool, { topics: { 'interpretacao-e-inferencia': 20 } }, 20, 'seed');
    expect(result.fallbackNote).toContain('Não há questões publicadas suficientes');
    expect(result.shortfall.length).toBeGreaterThan(0);
    expect(new Set(result.questionIds).size).toBe(result.questionIds.length);
  });

  it('registra exatamente quanto faltou em cada dimensão', () => {
    const result = generateSimulation(pool, { topics: { 'leitura-de-graficos-e-tabelas': 8 } }, 8, 'seed');
    const entry = result.shortfall.find((item) => item.key === 'leitura-de-graficos-e-tabelas');
    expect(entry.requested).toBe(8);
    expect(entry.available).toBe(5);
  });

  it('não estoura o total pedido', () => {
    const result = generateSimulation(pool, { areas: { matematica: 8, linguagens: 6 } }, 10, 'seed');
    expect(result.questionIds.length).toBeLessThanOrEqual(10);
  });

  it('é determinístico com a mesma semente', () => {
    expect(generateSimulation(pool, { areas: { matematica: 5 } }, 5, 'abc').questionIds)
      .toEqual(generateSimulation(pool, { areas: { matematica: 5 } }, 5, 'abc').questionIds);
  });

  it('descontar tópicos já escolhidos evita estourar a cota da área', () => {
    const result = generateSimulation(
      pool, { topics: { 'porcentagem-e-variacao': 4 }, areas: { matematica: 6 } }, 6, 'seed',
    );
    const mat = result.questionIds.filter((id) => id.startsWith('mat-') || id.startsWith('graf-'));
    expect(mat).toHaveLength(6);
  });

  it('não gera nada com pool vazio, e avisa', () => {
    const result = generateSimulation([], { areas: { matematica: 5 } }, 5, 'seed');
    expect(result.questionIds).toHaveLength(0);
    expect(result.fallbackNote).toBeTruthy();
  });
});
