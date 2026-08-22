import { describe, it, expect } from './run.mjs';
import { computeMasteryScore, computeMasteryState } from '../js/engine/mastery.js';

function input(overrides = {}) {
  return {
    attemptCount: 0,
    correctCount: 0,
    distinctQuestions: 0,
    distinctSessions: 0,
    recentErrors: 0,
    lowConfidenceAttempts: 0,
    daysSinceLastPractice: null,
    viewedContent: false,
    ...overrides,
  };
}

describe('computeMasteryState', () => {
  it('sem dados é "não iniciado"', () => {
    expect(computeMasteryState(input())).toBe('not_started');
  });

  it('abrir o conteúdo sem praticar é "explorado"', () => {
    expect(computeMasteryState(input({ viewedContent: true }))).toBe('explored');
  });

  it('NUNCA declara domínio com base em uma única questão', () => {
    const state = computeMasteryState(
      input({ attemptCount: 1, correctCount: 1, distinctQuestions: 1, distinctSessions: 1 }),
    );
    expect(state).toBe('explored');
  });

  it('duas questões certas ainda não consolidam', () => {
    expect(computeMasteryState(
      input({ attemptCount: 2, correctCount: 2, distinctQuestions: 2, distinctSessions: 2 }),
    )).toBe('explored');
  });

  it('consolidado exige questões diferentes E mais de uma sessão', () => {
    expect(computeMasteryState(
      input({ attemptCount: 5, correctCount: 5, distinctQuestions: 5, distinctSessions: 1 }),
    )).toBe('practicing');

    expect(computeMasteryState(
      input({ attemptCount: 5, correctCount: 5, distinctQuestions: 5, distinctSessions: 2 }),
    )).toBe('consolidated');
  });

  it('dois erros recentes levam para "precisa revisar"', () => {
    expect(computeMasteryState(
      input({ attemptCount: 8, correctCount: 6, distinctQuestions: 8, distinctSessions: 3, recentErrors: 2 }),
    )).toBe('needs_review');
  });

  it('muita dúvida declarada leva para revisão mesmo com acertos', () => {
    expect(computeMasteryState(
      input({ attemptCount: 6, correctCount: 6, distinctQuestions: 6, distinctSessions: 2, lowConfidenceAttempts: 3 }),
    )).toBe('needs_review');
  });

  it('esquecimento provável devolve tópico antigo para revisão', () => {
    expect(computeMasteryState(
      input({ attemptCount: 10, correctCount: 10, distinctQuestions: 10, distinctSessions: 4, daysSinceLastPractice: 45 }),
    )).toBe('needs_review');
  });

  it('acerto baixo mantém em revisão, não em prática', () => {
    expect(computeMasteryState(
      input({ attemptCount: 10, correctCount: 4, distinctQuestions: 10, distinctSessions: 3 }),
    )).toBe('needs_review');
  });
});

describe('computeMasteryScore', () => {
  it('nunca sai da faixa 0..100', () => {
    const casos = [
      input(),
      input({ attemptCount: 10, correctCount: 10, distinctQuestions: 10, distinctSessions: 5 }),
      input({ attemptCount: 10, correctCount: 0, distinctQuestions: 10, distinctSessions: 5, lowConfidenceAttempts: 10, daysSinceLastPractice: 400 }),
    ];
    for (const caso of casos) {
      const score = computeMasteryScore(caso);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });

  it('mais evidência com o mesmo acerto vale mais', () => {
    expect(computeMasteryScore(input({ attemptCount: 8, correctCount: 8, distinctQuestions: 8, distinctSessions: 3 })))
      .toBeGreaterThan(computeMasteryScore(input({ attemptCount: 2, correctCount: 2, distinctQuestions: 2, distinctSessions: 1 })));
  });

  it('tempo sem praticar reduz a estimativa', () => {
    const base = input({ attemptCount: 8, correctCount: 7, distinctQuestions: 8, distinctSessions: 3 });
    expect(computeMasteryScore({ ...base, daysSinceLastPractice: 60 }))
      .toBeLessThan(computeMasteryScore({ ...base, daysSinceLastPractice: 3 }));
  });
});
