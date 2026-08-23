






import { clamp } from '../core/format.js';

export const FACTOR_WEIGHTS = {
  recentErrors: 9,
  repeatedErrors: 7,
  lowConfidence: 5,
  timeSinceReview: 6,






  curation: 0.12,
  examProximity: 12,
  studentPriority: 8,
  dueReviews: 10,
  neverPracticed: 14,
};

export const PENALTIES = {

  practicedRecently: -28,
  sameAreaRepeated: -14,
  consolidated: -22,
  noQuestions: -1000,
};

function timeDecayPoints(days) {
  if (days === null || days === undefined) return 0;
  if (days <= 1) return 0;
  if (days <= 3) return 0.3;
  if (days <= 7) return 0.7;
  if (days <= 14) return 1;
  return 1.2;
}





function examProximityFactor(daysToExam) {
  if (daysToExam === null || daysToExam === undefined) return 0;
  if (daysToExam > 180) return 0.1;
  if (daysToExam > 90) return 0.35;
  if (daysToExam > 30) return 0.65;
  return 1;
}

export function scoreTopic(signals, context) {
  const factors = [];
  const penalties = [];

  const add = (key, label, points) => {
    if (points > 0) factors.push({ key, label, points: Math.round(points * 10) / 10 });
  };
  const penalize = (key, label, points) => {
    if (points < 0) penalties.push({ key, label, points: Math.round(points * 10) / 10 });
  };

  add('recentErrors', `${signals.recentErrors} erro(s) recente(s)`,
    Math.min(3, signals.recentErrors) * FACTOR_WEIGHTS.recentErrors);
  add('repeatedErrors', 'erros que se repetiram em sessões diferentes',
    Math.min(3, signals.repeatedErrors) * FACTOR_WEIGHTS.repeatedErrors);
  add('lowConfidence', 'respostas marcadas como dúvida ou chute',
    Math.min(3, signals.lowConfidenceAttempts) * FACTOR_WEIGHTS.lowConfidence);
  add('timeSinceReview', 'tempo desde a última prática',
    timeDecayPoints(signals.daysSinceLastPractice) * FACTOR_WEIGHTS.timeSinceReview);
  add('curation', 'importância definida pela curadoria',
    signals.curationWeight * FACTOR_WEIGHTS.curation);
  add('examProximity', 'proximidade da prova',
    examProximityFactor(context.daysToExam) * FACTOR_WEIGHTS.examProximity *
      (signals.masteryState === 'needs_review' || signals.masteryState === 'practicing' ? 1 : 0.4));

  if (signals.studentPriority) {
    add('studentPriority', 'você marcou esta área como prioridade', FACTOR_WEIGHTS.studentPriority);
  }
  add('dueReviews', 'revisões pendentes',
    Math.min(3, signals.dueReviews) * FACTOR_WEIGHTS.dueReviews);

  if (signals.attemptCount === 0 && signals.masteryState === 'not_started') {
    add('neverPracticed', 'tópico ainda não praticado', FACTOR_WEIGHTS.neverPracticed);
  }


  if (signals.availableQuestions <= 0) {
    penalize('noQuestions', 'sem questões publicadas disponíveis', PENALTIES.noQuestions);
  }
  if (context.recentTopicIds.includes(signals.topicId)) {
    penalize('practicedRecently', 'praticado nas últimas 48 horas', PENALTIES.practicedRecently);
  }
  const areaRepeats = context.recentAreaIds.filter((id) => id === signals.areaId).length;
  if (areaRepeats >= 2) {
    penalize('sameAreaRepeated', 'esta área apareceu nas últimas sessões',
      PENALTIES.sameAreaRepeated * Math.min(2, areaRepeats - 1));
  }
  if (signals.masteryState === 'consolidated') {
    penalize('consolidated', 'tópico já consolidado', PENALTIES.consolidated);
  }

  const score =
    factors.reduce((total, factor) => total + factor.points, 0) +
    penalties.reduce((total, penalty) => total + penalty.points, 0);

  return {
    topicId: signals.topicId,
    score: Math.round(score * 10) / 10,
    factors,
    penalties,
    reason: buildReason(signals, factors),
  };
}






const EXPLANATORY_FACTORS = [
  'dueReviews',
  'repeatedErrors',
  'recentErrors',
  'lowConfidence',
  'timeSinceReview',
  'studentPriority',
  'neverPracticed',
  'examProximity',
];


export function buildReason(signals, factors) {
  const ranked = [...factors].sort((a, b) => b.points - a.points);
  const explanatory = ranked.filter((factor) => EXPLANATORY_FACTORS.includes(factor.key));
  const top = explanatory[0] ?? ranked[0];

  if (!top) return `${signals.topicName} é um bom ponto de partida em ${signals.subjectName}.`;

  switch (top.key) {
    case 'recentErrors':
      return `Você errou ${signals.recentErrors} questão(ões) de ${signals.topicName} recentemente. Vale voltar nesse tema enquanto ele está fresco.`;
    case 'repeatedErrors':
      return `${signals.topicName} apareceu como dificuldade em mais de uma sessão. Vamos atacar esse padrão com questões diferentes.`;
    case 'lowConfidence':
      return `Você acertou parte de ${signals.topicName}, mas marcou dúvida em várias questões. Um reforço curto ajuda a firmar.`;
    case 'dueReviews':
      return `Sua revisão de ${signals.topicName} está no ponto: revisar agora vale mais do que revisar depois.`;
    case 'timeSinceReview':
      return `Faz ${signals.daysSinceLastPractice} dias desde a última prática de ${signals.topicName}. É um bom momento para retomar.`;
    case 'neverPracticed':

      return `Você ainda não praticou ${signals.topicName}, um dos temas centrais de ${signals.subjectName}.`;
    case 'examProximity':
      return `Com a prova se aproximando, consolidar ${signals.topicName} tem mais efeito do que começar um tópico novo.`;
    case 'studentPriority':
      return `Você indicou ${signals.areaName} como uma área de atenção. ${signals.topicName} é um bom lugar para começar.`;
    case 'curation':
      return signals.attemptCount > 0
        ? `${signals.topicName} é um dos temas mais recorrentes de ${signals.subjectName} e você já começou a praticá-lo.`
        : `${signals.topicName} é um dos temas mais recorrentes de ${signals.subjectName} — um bom lugar para começar.`;
    default:
      return `${signals.topicName} é o próximo passo recomendado em ${signals.subjectName}.`;
  }
}





export function recommendTopics(signals, context, limit = 5) {
  const ranked = signals
    .map((signal) => scoreTopic(signal, context))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.topicId.localeCompare(b.topicId);
    });

  const byTopic = new Map(signals.map((signal) => [signal.topicId, signal]));
  const perArea = new Map();
  const selection = [];

  for (const candidate of ranked) {
    if (selection.length >= limit) break;
    const signal = byTopic.get(candidate.topicId);
    if (!signal || signal.availableQuestions <= 0) continue;

    const areaCount = perArea.get(signal.areaId) ?? 0;
    if (areaCount >= 2) continue;
    if (perArea.size >= clamp(context.subjectsPerWeek, 1, 5) && areaCount === 0) continue;

    perArea.set(signal.areaId, areaCount + 1);
    selection.push(candidate);
  }


  if (selection.length === 0) {
    for (const candidate of ranked) {
      const signal = byTopic.get(candidate.topicId);
      if (signal && signal.availableQuestions > 0) {
        selection.push(candidate);
        break;
      }
    }
  }

  return { ranked, selection };
}
