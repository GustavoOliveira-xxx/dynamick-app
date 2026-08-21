import { describe, expect, it } from 'vitest';
import { PENALTIES, recommendTopics, scoreTopic, type RecommendationContext, type TopicSignals } from './engine';

const baseContext: RecommendationContext = {
  daysToExam: null,
  recentAreaIds: [],
  recentTopicIds: [],
  subjectsPerWeek: 3,
};

function topic(overrides: Partial<TopicSignals> = {}): TopicSignals {
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

describe('scoreTopic — os fatores da §5.5', () => {
  it('erros recentes aumentam a prioridade', () => {
    const without = scoreTopic(topic(), baseContext).score;
    const with2 = scoreTopic(topic({ recentErrors: 2 }), baseContext).score;
    expect(with2).toBeGreaterThan(without);
  });

  it('erros repetidos pesam além dos erros recentes', () => {
    const onlyRecent = scoreTopic(topic({ recentErrors: 2 }), baseContext).score;
    const alsoRepeated = scoreTopic(topic({ recentErrors: 2, repeatedErrors: 2 }), baseContext).score;
    expect(alsoRepeated).toBeGreaterThan(onlyRecent);
  });

  it('baixa confiança conta mesmo quando o estudante acertou', () => {
    const result = scoreTopic(topic({ lowConfidenceAttempts: 3 }), baseContext);
    expect(result.factors.some((factor) => factor.key === 'lowConfidence')).toBe(true);
  });

  it('mais tempo sem praticar aumenta a prioridade', () => {
    const recent = scoreTopic(topic({ daysSinceLastPractice: 1 }), baseContext).score;
    const old = scoreTopic(topic({ daysSinceLastPractice: 20 }), baseContext).score;
    expect(old).toBeGreaterThan(recent);
  });

  it('a importância da curadoria entra na conta', () => {
    const low = scoreTopic(topic({ curationWeight: 10 }), baseContext).score;
    const high = scoreTopic(topic({ curationWeight: 100 }), baseContext).score;
    expect(high).toBeGreaterThan(low);
  });

  it('proximidade da prova reforça consolidação, não conteúdo novo', () => {
    const near: RecommendationContext = { ...baseContext, daysToExam: 20 };
    const reviewing = scoreTopic(topic({ masteryState: 'needs_review' }), near);
    const brandNew = scoreTopic(topic({ masteryState: 'not_started', attemptCount: 0 }), near);
    const reviewPoints = reviewing.factors.find((f) => f.key === 'examProximity')?.points ?? 0;
    const newPoints = brandNew.factors.find((f) => f.key === 'examProximity')?.points ?? 0;
    expect(reviewPoints).toBeGreaterThan(newPoints);
  });

  it('preferência declarada do estudante conta', () => {
    const marked = scoreTopic(topic({ studentPriority: true }), baseContext).score;
    expect(marked).toBeGreaterThan(scoreTopic(topic(), baseContext).score);
  });

  it('revisões vencidas entram como fator', () => {
    const result = scoreTopic(topic({ dueReviews: 2 }), baseContext);
    expect(result.factors.some((factor) => factor.key === 'dueReviews')).toBe(true);
  });

  it('tópico sem questões disponíveis é efetivamente descartado', () => {
    const result = scoreTopic(topic({ availableQuestions: 0 }), baseContext);
    expect(result.score).toBeLessThan(PENALTIES.noQuestions / 2);
  });

  it('tópico praticado nas últimas 48h é penalizado', () => {
    const context = { ...baseContext, recentTopicIds: ['topic-1'] };
    const result = scoreTopic(topic({ recentErrors: 3 }), context);
    expect(result.penalties.some((penalty) => penalty.key === 'practicedRecently')).toBe(true);
    expect(result.score).toBeLessThan(scoreTopic(topic({ recentErrors: 3 }), baseContext).score);
  });

  it('tópico consolidado perde prioridade', () => {
    const consolidated = scoreTopic(topic({ masteryState: 'consolidated' }), baseContext);
    expect(consolidated.penalties.some((penalty) => penalty.key === 'consolidated')).toBe(true);
  });

  it('sempre produz uma justificativa legível', () => {
    for (const state of ['not_started', 'explored', 'practicing', 'needs_review', 'consolidated'] as const) {
      const result = scoreTopic(topic({ masteryState: state }), baseContext);
      expect(result.reason.length).toBeGreaterThan(20);
      expect(result.reason).not.toMatch(/\bscore\b|\bpontos\b/i);
    }
  });

  it('é determinístico', () => {
    expect(scoreTopic(topic({ recentErrors: 2 }), baseContext)).toEqual(
      scoreTopic(topic({ recentErrors: 2 }), baseContext),
    );
  });
});

describe('recommendTopics — variedade e limites', () => {
  const many: TopicSignals[] = [
    topic({ topicId: 'mat-1', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'mat-2', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'mat-3', areaId: 'mat', recentErrors: 3 }),
    topic({ topicId: 'ling-1', areaId: 'ling', recentErrors: 1 }),
    topic({ topicId: 'hum-1', areaId: 'hum', recentErrors: 1 }),
    topic({ topicId: 'nat-1', areaId: 'nat', recentErrors: 1 }),
  ];

  it('nenhuma área ocupa mais de dois lugares na seleção', () => {
    const { selection } = recommendTopics(many, baseContext, 5);
    const matCount = selection.filter((item) => item.topicId.startsWith('mat')).length;
    expect(matCount).toBeLessThanOrEqual(2);
  });

  it('respeita o limite de áreas por semana vindo do perfil', () => {
    const { selection } = recommendTopics(many, { ...baseContext, subjectsPerWeek: 2 }, 5);
    const areas = new Set(selection.map((item) => item.topicId.split('-')[0]));
    expect(areas.size).toBeLessThanOrEqual(2);
  });

  it('um tópico com muitos erros não monopoliza a rotina', () => {
    const { selection } = recommendTopics(many, baseContext, 4);
    expect(new Set(selection.map((item) => item.topicId)).size).toBe(selection.length);
    expect(selection.length).toBeGreaterThan(1);
  });

  it('nunca seleciona tópico sem questões disponíveis', () => {
    const { selection } = recommendTopics(
      [topic({ topicId: 'vazio', availableQuestions: 0, recentErrors: 5 }), topic({ topicId: 'cheio' })],
      baseContext,
      3,
    );
    expect(selection.map((item) => item.topicId)).not.toContain('vazio');
  });

  it('relaxa a variedade em vez de não recomendar nada', () => {
    const { selection } = recommendTopics(
      [topic({ topicId: 'unico', areaId: 'mat' })],
      { ...baseContext, recentTopicIds: ['unico'], recentAreaIds: ['mat', 'mat'] },
      3,
    );
    expect(selection).toHaveLength(1);
  });

  it('devolve uma lista vazia quando não há nenhum tópico praticável', () => {
    const { selection } = recommendTopics([topic({ availableQuestions: 0 })], baseContext, 3);
    expect(selection).toHaveLength(0);
  });

  it('o ranking é estável entre execuções', () => {
    const first = recommendTopics(many, baseContext, 5).ranked.map((item) => item.topicId);
    const second = recommendTopics(many, baseContext, 5).ranked.map((item) => item.topicId);
    expect(first).toEqual(second);
  });
});
