import { describe, it, expect } from './run.mjs';
import { analyzeEliminations } from '../js/engine/elimination.js';
import { EXAM_ENVIRONMENTS, getExamEnvironment } from '../js/data/exam-environments.js';

describe('método de eliminação', () => {
  const options = [
    { label: 'A', isCorrect: false },
    { label: 'B', isCorrect: true },
    { label: 'C', isCorrect: false },
    { label: 'D', isCorrect: false },
    { label: 'E', isCorrect: false },
  ];

  it('avalia eliminações certas, certezas calibradas e resposta correta eliminada', () => {
    expect(analyzeEliminations([
      { options, eliminations: { A: 'maybe', C: 'sure' } },
      { options, eliminations: { B: 'sure', E: 'maybe' } },
    ])).toEqual({
      marked: 4,
      accurate: 3,
      sure: 2,
      sureAccurate: 1,
      correctOptionsEliminated: 1,
    });
  });

  it('ignora rótulos inexistentes e níveis de certeza inválidos', () => {
    expect(analyzeEliminations([{ options, eliminations: { Z: 'sure', A: 'invalid' } }]).marked).toBe(0);
  });
});

describe('ambientes opcionais de prova', () => {
  it('oferece quatro modos com identificadores únicos', () => {
    expect(EXAM_ENVIRONMENTS).toHaveLength(4);
    expect(new Set(EXAM_ENVIRONMENTS.map((environment) => environment.slug)).size).toBe(4);
  });

  it('mantém pausa no treino e bloqueia pausa nos modos imersivos', () => {
    expect(getExamEnvironment('flexivel').allowPause).toBe(true);
    expect(getExamEnvironment('sala-real').allowPause).toBe(false);
    expect(getExamEnvironment('ritmo-intenso').allowPause).toBe(false);
  });

  it('usa o modo padrão como fallback seguro', () => {
    expect(getExamEnvironment('modo-inexistente').slug).toBe('padrao');
  });
});
