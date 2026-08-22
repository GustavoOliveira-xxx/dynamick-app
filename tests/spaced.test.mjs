import { describe, it, expect } from './run.mjs';
import {
  buildReviewBatch,
  EASE_BOUNDS,
  nextDueDate,
  nextReviewState,
  reconcileRecall,
  REVIEW_INTERVALS,
} from '../js/engine/spaced.js';

const fresh = { interval: 1, ease: 250, repetitions: 0 };

describe('reconcileRecall — declaração x evidência', () => {
  it('dizer "domino" e errar vira "lembro parcialmente"', () => {
    expect(reconcileRecall({ recall: 'mastered', wasCorrect: false })).toBe('partial');
  });

  it('dizer "não lembro" e acertar vira "lembro parcialmente"', () => {
    expect(reconcileRecall({ recall: 'forgot', wasCorrect: true })).toBe('partial');
  });

  it('sem questão de recuperação, a declaração vale', () => {
    expect(reconcileRecall({ recall: 'mastered' })).toBe('mastered');
  });
});

describe('nextReviewState', () => {
  it('"não lembro" reinicia o intervalo e reduz a facilidade', () => {
    const next = nextReviewState({ interval: 30, ease: 250, repetitions: 4 }, { recall: 'forgot' });
    expect(next.interval).toBe(REVIEW_INTERVALS[0]);
    expect(next.ease).toBeLessThan(250);
    expect(next.repetitions).toBe(0);
  });

  it('"domino" aumenta o intervalo', () => {
    const next = nextReviewState({ interval: 3, ease: 250, repetitions: 1 }, { recall: 'mastered' });
    expect(next.interval).toBeGreaterThan(3);
    expect(next.ease).toBeGreaterThan(250);
  });

  it('"lembro parcialmente" avança devagar', () => {
    const next = nextReviewState(fresh, { recall: 'partial' });
    expect(next.interval).toBe(REVIEW_INTERVALS[0]);
    expect(next.repetitions).toBe(1);
  });

  it('a facilidade nunca sai dos limites', () => {
    let baixo = { interval: 1, ease: EASE_BOUNDS.min, repetitions: 0 };
    for (let i = 0; i < 10; i += 1) baixo = nextReviewState(baixo, { recall: 'forgot' });
    expect(baixo.ease).toBeGreaterThanOrEqual(EASE_BOUNDS.min);

    let alto = { interval: 1, ease: EASE_BOUNDS.max, repetitions: 0 };
    for (let i = 0; i < 10; i += 1) alto = nextReviewState(alto, { recall: 'mastered' });
    expect(alto.ease).toBeLessThanOrEqual(EASE_BOUNDS.max);
  });

  it('o intervalo tem teto de 180 dias', () => {
    let state = fresh;
    for (let i = 0; i < 20; i += 1) state = nextReviewState(state, { recall: 'mastered' });
    expect(state.interval).toBeLessThanOrEqual(180);
  });

  it('acertar depois de dizer "domino" é diferente de errar', () => {
    const acertou = nextReviewState({ interval: 7, ease: 250, repetitions: 2 }, { recall: 'mastered', wasCorrect: true });
    const errou = nextReviewState({ interval: 7, ease: 250, repetitions: 2 }, { recall: 'mastered', wasCorrect: false });
    expect(acertou.interval).toBeGreaterThan(errou.interval);
  });
});

describe('nextDueDate', () => {
  it('soma o intervalo em dias a partir da data informada', () => {
    const from = new Date('2026-08-21T15:00:00');
    const due = nextDueDate({ interval: 3, ease: 250, repetitions: 1 }, from);
    expect(due.getDate()).toBe(24);
  });
});

describe('buildReviewBatch — sempre com item novo', () => {
  const candidatos = [
    { id: 'q-nova-1', isRecovery: true },
    { id: 'q-nova-2', isRecovery: true },
  ];

  it('inclui pelo menos um item inédito na frente', () => {
    const batch = buildReviewBatch(['q-antiga'], candidatos, 3);
    expect(batch.hasFreshItem).toBe(true);
    expect(batch.questionIds[0]).toBe('q-nova-1');
  });

  it('mantém a questão original que gerou a revisão', () => {
    expect(buildReviewBatch(['q-antiga'], candidatos, 3).questionIds).toContain('q-antiga');
  });

  it('não repete o mesmo item na mesma leva', () => {
    const batch = buildReviewBatch(['q-antiga', 'q-antiga'], candidatos, 4);
    expect(new Set(batch.questionIds).size).toBe(batch.questionIds.length);
  });

  it('respeita o tamanho pedido', () => {
    expect(buildReviewBatch(['a', 'b', 'c'], candidatos, 2).questionIds).toHaveLength(2);
  });

  it('avisa quando não há item inédito disponível', () => {
    expect(buildReviewBatch(['q-antiga'], [], 3).hasFreshItem).toBe(false);
  });
});
