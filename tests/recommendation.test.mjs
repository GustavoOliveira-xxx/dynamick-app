import { describe, it, expect } from './run.mjs';
import { PENALTIES, recommendTopics, scoreTopic } from '../js/engine/recommendation.js';

const baseContext = { daysToExam: null, recentAreaIds: [], recentTopicIds: [], subjectsPerWeek: 3 };

function topic(overrides = {}) {
  return {
    topicId: 'topic-1',
    topicName: 'Porcentagem e variação',
    subjectName: 'Matemática',
    areaId: 'area-mat',
    areaName: 'Matemática',
    difficulty: 'intermediate',
    curationWeight: 50,
    masteryState: 'practicing',
    recentErrors: 0,
    repeatedErrors: 0,
    lowConfidenceAttempts: 0,
    attemptCount: 4,
    daysSinceLastPractice: 2,
    availableQuestions: 8,
    studentPriority: false,
    dueReviews: 0,
    ...overrides,
  };
}

describe('scoreTopic — os fatores de prioridade', () => {
  it('erros recentes aumentam a prioridade', () => {
    expect(scoreTopic(topic({ recentErrors: 2 }), baseContext).score)
      .toBeGreaterThan(scoreTopic(topic(), baseContext).score);
  });

  it('erros repetidos pesam além dos recentes', () => {
    const soRecentes = scoreTopic(topic({ recentErrors: 2 }), baseContext).score;
    const tambemRepetidos = scoreTopic(topic({ recentErrors: 2, repeatedErrors: 2 }), baseContext).score;
    expect(tambemRepetidos).toBeGreaterThan(soRecentes);
  });

  it('baixa confiança conta mesmo quando o estudante acertou', () => {
    const result = scoreTopic(topic({ lowConfidenceAttempts: 3 }), baseContext);
    expect(result.factors.some((factor) => factor.key === 'lowConfidence')).toBe(true);
  });

  it('mais tempo sem praticar aumenta a prioridade', () => {
    expect(scoreTopic(topic({ daysSinceLastPractice: 20 }), baseContext).score)
      .toBeGreaterThan(scoreTopic(topic({ daysSinceLastPractice: 1 }), baseContext).score);
  });

  it('a importância da curadoria entra na conta', () => {
    expect(scoreTopic(topic({ curationWeight: 100 }), baseContext).score)
      .toBeGreaterThan(scoreTopic(topic({ curationWeight: 10 }), baseContext).score);
  });

  it('proximidade da prova reforça consolidação, não conteúdo novo', () => {
    const perto = { ...baseContext, daysToExam: 20 };
    const revisando = scoreTopic(topic({ masteryState: 'needs_review' }), perto);
    const novo = scoreTopic(topic({ masteryState: 'not_started', attemptCount: 0 }), perto);
    const pontosRevisao = revisando.factors.find((f) => f.key === 'examProximity')?.points ?? 0;
    const pontosNovo = novo.factors.find((f) => f.key === 'examProximity')?.points ?? 0;
    expect(pontosRevisao).toBeGreaterThan(pontosNovo);
  });

  it('preferência declarada do estudante conta', () => {
    expect(scoreTopic(topic({ studentPriority: true }), baseContext).score)
      .toBeGreaterThan(scoreTopic(topic(), baseContext).score);
  });

  it('revisões vencidas entram como fator', () => {
    const result = scoreTopic(topic({ dueReviews: 2 }), baseContext);
    expect(result.factors.some((factor) => factor.key === 'dueReviews')).toBe(true);
  });

  it('tópico sem questões disponíveis é descartado', () => {
    expect(scoreTopic(topic({ availableQuestions: 0 }), baseContext).score)
      .toBeLessThan(PENALTIES.noQuestions / 2);
  });

  it('tópico praticado nas últimas 48h é penalizado', () => {
    const context = { ...baseContext, recentTopicIds: ['topic-1'] };
    const result = scoreTopic(topic({ recentErrors: 3 }), context);
    expect(result.penalties.some((p) => p.key === 'practicedRecently')).toBe(true);
    expect(result.score).toBeLessThan(scoreTopic(topic({ recentErrors: 3 }), baseContext).score);
  });

  it('tópico consolidado perde prioridade', () => {
    const result = scoreTopic(topic({ masteryState: 'consolidated' }), baseContext);
    expect(result.penalties.some((p) => p.key === 'consolidated')).toBe(true);
  });

  it('sempre produz uma justificativa legível, sem jargão técnico', () => {
    for (const state of ['not_started', 'explored', 'practicing', 'needs_review', 'consolidated']) {
      const result = scoreTopic(topic({ masteryState: state }), baseContext);
      expect(result.reason.length).toBeGreaterThan(20);
      expect(result.reason.toLowerCase()).notToContain('score');
      expect(result.reason.toLowerCase()).notToContain('pontuação');
    }
  });

  it('é determinístico', () => {
    expect(scoreTopic(topic({ recentErrors: 2 }), baseContext))
      .toEqual(scoreTopic(topic({ recentErrors: 2 }), baseContext));
  });
});

describe('buildReason — a justificativa fala do estudante, não do catálogo', () => {
  it('erros recentes vencem a curadoria na justificativa', () => {
    const result = scoreTopic(topic({ curationWeight: 100, recentErrors: 3 }), baseContext);
    expect(result.reason).toContain('errou');
    expect(result.reason).notToContain('próximo passo recomendado');
  });

  it('revisão vencida é o motivo mais forte quando existe', () => {
    const result = scoreTopic(topic({ curationWeight: 100, recentErrors: 2, dueReviews: 3 }), baseContext);
    expect(result.reason).toContain('revisão');
  });

  it('tópico não praticado é dito como tal, não com frase genérica', () => {
    const result = scoreTopic(
      topic({ curationWeight: 90, attemptCount: 0, masteryState: 'not_started', daysSinceLastPractice: null }),
      baseContext,
    );
    expect(result.reason).toContain('ainda não praticou');

    expect(result.reason).notToContain('foi praticado');
  });

  it('sem sinal comportamental, a curadoria tem frase própria', () => {
    const result = scoreTopic(
      topic({
        curationWeight: 80, recentErrors: 0, repeatedErrors: 0, lowConfidenceAttempts: 0,
        dueReviews: 0, daysSinceLastPractice: 1, attemptCount: 4, masteryState: 'practicing',
      }),
      baseContext,
    );
    expect(result.reason).toContain('recorrentes');
  });
});

describe('recommendTopics — variedade e limites', () => {
  const muitos = [
    topic({ topicId: 'mat-1', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'mat-2', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'mat-3', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'ling-1', areaId: 'ling', recentErrors: 1 }),
    topic({ topicId: 'hum-1', areaId: 'hum', recentErrors: 1 }),
    topic({ topicId: 'nat-1', areaId: 'nat', recentErrors: 1 }),
  ];

  it('nenhuma área ocupa mais de dois lugares na seleção', () => {
    const { selection } = recommendTopics(muitos, baseContext, 5);
    expect(selection.filter((item) => item.topicId.startsWith('mat')).length).toBeLessThanOrEqual(2);
  });

  it('respeita o limite de áreas por semana vindo do perfil', () => {
    const { selection } = recommendTopics(muitos, { ...baseContext, subjectsPerWeek: 2 }, 5);
    const areas = new Set(selection.map((item) => item.topicId.split('-')[0]));
    expect(areas.size).toBeLessThanOrEqual(2);
  });

  it('um tópico com muitos erros não monopoliza a rotina', () => {
    const { selection } = recommendTopics(muitos, baseContext, 4);
    expect(new Set(selection.map((i) => i.topicId)).size).toBe(selection.length);
    expect(selection.length).toBeGreaterThan(1);
  });

  it('nunca seleciona tópico sem questões disponíveis', () => {
    const { selection } = recommendTopics(
      [topic({ topicId: 'vazio', availableQuestions: 0, recentErrors: 5 }), topic({ topicId: 'cheio' })],
      baseContext, 3,
    );
    expect(selection.map((item) => item.topicId)).notToContain('vazio');
  });

  it('relaxa a variedade em vez de não recomendar nada', () => {
    const { selection } = recommendTopics(
      [topic({ topicId: 'unico', areaId: 'mat' })],
      { ...baseContext, recentTopicIds: ['unico'], recentAreaIds: ['mat', 'mat'] },
      3,
    );
    expect(selection).toHaveLength(1);
  });

  it('devolve lista vazia quando não há nenhum tópico praticável', () => {
    expect(recommendTopics([topic({ availableQuestions: 0 })], baseContext, 3).selection).toHaveLength(0);
  });

  it('o ranking é estável entre execuções', () => {
    const a = recommendTopics(muitos, baseContext, 5).ranked.map((i) => i.topicId);
    const b = recommendTopics(muitos, baseContext, 5).ranked.map((i) => i.topicId);
    expect(a).toEqual(b);
  });
});
