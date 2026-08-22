import type { Difficulty, MasteryState } from '@/lib/domain';
import { clamp } from '@/lib/util/format';

/**
 * Motor de recomendação — §5.5 do prompt mestre.
 *
 * Regras determinísticas e explicáveis. Nenhum modelo de machine learning:
 * cada ponto de prioridade tem um nome, um peso declarado e uma frase legível
 * que o estudante consegue ler no dashboard (§7 regra 9).
 */

export type TopicSignals = {
  topicId: string;
  topicName: string;
  subjectName: string;
  areaId: string;
  areaName: string;
  difficulty: Difficulty;
  /** Importância editorial definida pela curadoria (0..100). */
  curationWeight: number;
  masteryState: MasteryState;
  /** Erros nas últimas duas semanas. */
  recentErrors: number;
  /** Erros no mesmo tópico em sessões diferentes. */
  repeatedErrors: number;
  /** Tentativas marcadas como "estou em dúvida" ou "vou chutar". */
  lowConfidenceAttempts: number;
  attemptCount: number;
  daysSinceLastPractice: number | null;
  /** Quantas questões publicadas estão disponíveis para praticar agora. */
  availableQuestions: number;
  /** O estudante marcou a área como prioritária ou insegura. */
  studentPriority: boolean;
  /** Revisões vencidas ligadas ao tópico. */
  dueReviews: number;
};

export type RecommendationContext = {
  /** Dias até a prova; null quando não há data definida. */
  daysToExam: number | null;
  /** Áreas já usadas nas últimas sessões — alimenta o limite anti-monopólio. */
  recentAreaIds: string[];
  /** Tópicos praticados nas últimas 48h. */
  recentTopicIds: string[];
  /** Quantidade máxima de matérias por semana, vinda do perfil. */
  subjectsPerWeek: number;
};

export type ScoredTopic = {
  topicId: string;
  score: number;
  /** Contribuições nomeadas — usadas na explicação e nos testes. */
  factors: { key: string; label: string; points: number }[];
  /** Frase única mostrada ao estudante. */
  reason: string;
  penalties: { key: string; label: string; points: number }[];
};

export const FACTOR_WEIGHTS = {
  recentErrors: 9,
  repeatedErrors: 7,
  lowConfidence: 5,
  timeSinceReview: 6,
  /*
   * A curadoria é uma LINHA DE BASE, não o fator dominante.
   * Com peso alto (0,35 → até 35 pontos) ela superava três erros recentes (27) em
   * qualquer tópico bem avaliado, e o estudante recebia sempre a mesma justificativa
   * genérica. Aqui ela desempata entre tópicos parecidos, sem apagar o comportamento.
   */
  curation: 0.12,
  examProximity: 12,
  studentPriority: 8,
  dueReviews: 10,
  neverPracticed: 14,
} as const;

export const PENALTIES = {
  /** Impede que um tópico com muitos erros monopolize a rotina inteira. */
  practicedRecently: -28,
  sameAreaRepeated: -14,
  consolidated: -22,
  noQuestions: -1000,
} as const;

function timeDecayPoints(days: number | null): number {
  if (days === null) return 0; // nunca praticado é tratado por outro fator
  if (days <= 1) return 0;
  if (days <= 3) return 0.3;
  if (days <= 7) return 0.7;
  if (days <= 14) return 1;
  return 1.2;
}

/**
 * Proximidade da prova aumenta o peso de revisão e consolidação, nunca o de
 * "conteúdo novo e difícil" (Etapa 13: não abandonar fundamentos).
 */
function examProximityFactor(daysToExam: number | null): number {
  if (daysToExam === null) return 0;
  if (daysToExam > 180) return 0.1;
  if (daysToExam > 90) return 0.35;
  if (daysToExam > 30) return 0.65;
  return 1;
}

export function scoreTopic(signals: TopicSignals, context: RecommendationContext): ScoredTopic {
  const factors: ScoredTopic['factors'] = [];
  const penalties: ScoredTopic['penalties'] = [];

  function add(key: string, label: string, points: number) {
    if (points > 0) factors.push({ key, label, points: Math.round(points * 10) / 10 });
  }
  function penalize(key: string, label: string, points: number) {
    if (points < 0) penalties.push({ key, label, points: Math.round(points * 10) / 10 });
  }

  add(
    'recentErrors',
    `${signals.recentErrors} erro(s) recente(s)`,
    Math.min(3, signals.recentErrors) * FACTOR_WEIGHTS.recentErrors,
  );
  add(
    'repeatedErrors',
    'erros que se repetiram em sessões diferentes',
    Math.min(3, signals.repeatedErrors) * FACTOR_WEIGHTS.repeatedErrors,
  );
  add(
    'lowConfidence',
    'respostas marcadas como dúvida ou chute',
    Math.min(3, signals.lowConfidenceAttempts) * FACTOR_WEIGHTS.lowConfidence,
  );
  add(
    'timeSinceReview',
    'tempo desde a última prática',
    timeDecayPoints(signals.daysSinceLastPractice) * FACTOR_WEIGHTS.timeSinceReview,
  );
  add('curation', 'importância definida pela curadoria', signals.curationWeight * FACTOR_WEIGHTS.curation);
  add(
    'examProximity',
    'proximidade da prova',
    examProximityFactor(context.daysToExam) *
      FACTOR_WEIGHTS.examProximity *
      (signals.masteryState === 'needs_review' || signals.masteryState === 'practicing' ? 1 : 0.4),
  );
  if (signals.studentPriority) {
    add('studentPriority', 'você marcou esta área como prioridade', FACTOR_WEIGHTS.studentPriority);
  }
  add('dueReviews', 'revisões pendentes', Math.min(3, signals.dueReviews) * FACTOR_WEIGHTS.dueReviews);

  if (signals.attemptCount === 0 && signals.masteryState === 'not_started') {
    add('neverPracticed', 'tópico ainda não praticado', FACTOR_WEIGHTS.neverPracticed);
  }

  // ---- Limites e penalidades ----
  if (signals.availableQuestions <= 0) {
    penalize('noQuestions', 'sem questões publicadas disponíveis', PENALTIES.noQuestions);
  }
  if (context.recentTopicIds.includes(signals.topicId)) {
    penalize('practicedRecently', 'praticado nas últimas 48 horas', PENALTIES.practicedRecently);
  }
  const areaRepeats = context.recentAreaIds.filter((id) => id === signals.areaId).length;
  if (areaRepeats >= 2) {
    penalize(
      'sameAreaRepeated',
      'esta área apareceu nas últimas sessões',
      PENALTIES.sameAreaRepeated * Math.min(2, areaRepeats - 1),
    );
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

/**
 * Fatores que explicam algo sobre o ESTUDANTE.
 * A justificativa prefere sempre um destes: dizer "este tópico é importante" é
 * verdadeiro, mas não é o que faz a recomendação parecer feita para a pessoa.
 */
const EXPLANATORY_FACTORS = [
  'dueReviews',
  'repeatedErrors',
  'recentErrors',
  'lowConfidence',
  'timeSinceReview',
  'studentPriority',
  'neverPracticed',
  'examProximity',
] as const;

/** Justificativa legível — sempre existe, nunca expõe pontuação técnica. */
export function buildReason(signals: TopicSignals, factors: ScoredTopic['factors']): string {
  const ranked = [...factors].sort((a, b) => b.points - a.points);
  const explanatory = ranked.filter((factor) =>
    (EXPLANATORY_FACTORS as readonly string[]).includes(factor.key),
  );
  const top = explanatory[0] ?? ranked[0];

  if (!top) {
    return `${signals.topicName} é um bom ponto de partida em ${signals.subjectName}.`;
  }

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
      return `${signals.topicName} ainda não foi praticado e é um tópico importante de ${signals.subjectName}.`;
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

export type RecommendationPlan = {
  ranked: ScoredTopic[];
  /** Seleção final já com variedade garantida entre áreas. */
  selection: ScoredTopic[];
};

/**
 * Ordena os tópicos e monta a seleção final preservando variedade:
 * no máximo 2 tópicos por área e no máximo `subjectsPerWeek` áreas distintas.
 */
export function recommendTopics(
  signals: TopicSignals[],
  context: RecommendationContext,
  limit = 5,
): RecommendationPlan {
  const ranked = signals
    .map((signal) => scoreTopic(signal, context))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.topicId.localeCompare(b.topicId); // desempate estável
    });

  const byTopic = new Map(signals.map((signal) => [signal.topicId, signal]));
  const perArea = new Map<string, number>();
  const selection: ScoredTopic[] = [];

  for (const candidate of ranked) {
    if (selection.length >= limit) break;
    const signal = byTopic.get(candidate.topicId);
    if (!signal || signal.availableQuestions <= 0) continue;

    const areaCount = perArea.get(signal.areaId) ?? 0;
    if (areaCount >= 2) continue; // nenhuma área ocupa a rotina inteira
    if (perArea.size >= clamp(context.subjectsPerWeek, 1, 5) && areaCount === 0) continue;

    perArea.set(signal.areaId, areaCount + 1);
    selection.push(candidate);
  }

  // Se os limites deixaram a seleção vazia, relaxa a variedade em vez de não recomendar nada.
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
