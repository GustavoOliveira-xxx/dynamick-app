import { DIMENSION_KEYS, type ConfidenceLevel, type Dimensions, type ProfileSlug } from '@/lib/domain';
import { clamp } from '@/lib/util/format';
import {
  AREA_SELF_ASSESSMENT,
  findOption,
  findQuestion,
  ONBOARDING_STEPS,
  REQUIRED_STEPS,
} from '@/lib/onboarding/questionnaire';
import {
  DIMENSION_WEIGHTS,
  getProfile,
  PROFILE_PREMISES,
  PROFILES,
  type PremiseContext,
  type ProfileDefinition,
} from './profiles';

/**
 * Motor de perfil: determinístico e explicável (§4 do ONBOARDING_SPEC.md).
 * O mesmo conjunto de respostas sempre produz o mesmo perfil, a mesma confiança
 * e os mesmos sinais legíveis.
 */

export type AnswerValue = string | string[] | number | Record<string, string>;
export type AnswerMap = Record<string, AnswerValue>;

export type ProfileSignal = {
  /** Texto legível mostrado ao estudante — nunca uma pontuação técnica. */
  text: string;
  questionId: string;
};

export type ProfileResult = {
  suggested: ProfileSlug;
  dimensions: Dimensions;
  confidence: ConfidenceLevel;
  provisional: boolean;
  signals: ProfileSignal[];
  contradictions: string[];
  alternatives: ProfileSlug[];
  suggestsDiagnostic: boolean;
  answeredSteps: string[];
  missingRequiredSteps: string[];
  /** Ranking completo — usado na tela de comparação e nos testes. */
  ranking: { slug: ProfileSlug; score: number; eligible: boolean; premiseReason?: string }[];
};

const NEUTRAL = 50;

export function neutralDimensions(): Dimensions {
  return DIMENSION_KEYS.reduce((acc, key) => {
    acc[key] = NEUTRAL;
    return acc;
  }, {} as Dimensions);
}

function applyEffect(dimensions: Dimensions, effect: Partial<Dimensions> | undefined, factor = 1): void {
  if (!effect) return;
  for (const key of DIMENSION_KEYS) {
    const delta = effect[key];
    if (typeof delta === 'number') dimensions[key] += delta * factor;
  }
}

function toStringValue(value: AnswerValue | undefined): string | null {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return null;
}

function toArrayValue(value: AnswerValue | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value) return [value];
  return [];
}

/**
 * Quais etapas o estudante efetivamente respondeu.
 * Uma lista vazia conta como resposta: marcar "nenhuma dessas" em uma múltipla escolha
 * é uma resposta legítima, não uma etapa em branco. Apenas texto vazio não conta.
 */
export function answeredSteps(answers: AnswerMap): string[] {
  return ONBOARDING_STEPS.filter((step) =>
    step.questions.some((question) => {
      const value = answers[question.id];
      if (value === undefined || value === null) return false;
      if (Array.isArray(value)) return true;
      if (typeof value === 'object') return true;
      return String(value).length > 0;
    }),
  ).map((step) => step.slug);
}

export function computeDimensions(answers: AnswerMap): Dimensions {
  const dimensions = neutralDimensions();

  for (const step of ONBOARDING_STEPS) {
    for (const question of step.questions) {
      const value = answers[question.id];
      if (value === undefined) continue;

      if (question.type === 'single') {
        const selected = toStringValue(value);
        if (!selected) continue;
        const option = findOption(question.id, selected);
        applyEffect(dimensions, option?.effect as Partial<Dimensions>);
      }

      if (question.type === 'multiple') {
        for (const item of toArrayValue(value)) {
          const option = findOption(question.id, item);
          applyEffect(dimensions, option?.effect as Partial<Dimensions>);
        }
      }
    }
  }

  // C1 — consistência é derivada diretamente dos dias por semana.
  const days = Number(toStringValue(answers.daysPerWeek) ?? NaN);
  if (Number.isFinite(days) && days >= 1 && days <= 7) {
    dimensions.consistency = 30 + days * 8;
    // Reaplica os ajustes de consistência que dependem de outras respostas.
    if (toArrayValue(answers.preferredTimes).includes('varia')) dimensions.consistency -= 10;
    const stability = toStringValue(answers.routineStability);
    if (stability === 'regular') dimensions.consistency += 15;
    if (stability === 'muito') dimensions.consistency -= 20;
    if (toArrayValue(answers.goals).includes('rotina')) dimensions.consistency -= 10;
    if (toArrayValue(answers.frictions).includes('perder_ritmo')) dimensions.consistency -= 10;
  }

  // C2 — tempo personalizado interpola a mesma escala das opções fixas.
  const minutes = Number(toStringValue(answers.sessionMinutes) ?? NaN);
  if (Number.isFinite(minutes) && ![10, 20, 30, 45, 60].includes(minutes)) {
    const bounded = clamp(minutes, 5, 180);
    // 10 min → +30 · 30 min → 0 · 60 min → −20 (linear por trechos)
    const effect = bounded <= 30 ? ((30 - bounded) / 20) * 30 : -((bounded - 30) / 30) * 20;
    dimensions.needsShortSessions += Math.round(effect);
  }

  // B2 — objetivo principal tem peso dobrado.
  const primaryGoal = toStringValue(answers.primaryGoal);
  if (primaryGoal) {
    const option = findOption('goals', primaryGoal);
    applyEffect(dimensions, option?.effect as Partial<Dimensions>, 1);
  }

  // G — autopercepção move a base percebida.
  const selfAssessment = answers.selfAssessment;
  if (selfAssessment && typeof selfAssessment === 'object' && !Array.isArray(selfAssessment)) {
    let delta = 0;
    for (const area of AREA_SELF_ASSESSMENT) {
      const value = (selfAssessment as Record<string, string>)[area.slug];
      if (value === 'secure') delta += 8;
      if (value === 'insecure') delta -= 8;
    }
    dimensions.perceivedBase += delta;
  }

  for (const key of DIMENSION_KEYS) {
    dimensions[key] = clamp(Math.round(dimensions[key]), 0, 100);
  }
  return dimensions;
}

function scoreProfile(dimensions: Dimensions, profile: ProfileDefinition): number {
  let weighted = 0;
  let totalWeight = 0;
  for (const key of DIMENSION_KEYS) {
    const weight = DIMENSION_WEIGHTS[key];
    weighted += Math.abs(dimensions[key] - profile.targets[key]) * weight;
    totalWeight += weight;
  }
  return Math.round((100 - weighted / totalWeight) * 100) / 100;
}

/** Sinais legíveis: o estudante vê o que motivou a sugestão, sem número técnico. */
export function buildSignals(answers: AnswerMap): ProfileSignal[] {
  const signals: ProfileSignal[] = [];

  const autonomy = toStringValue(answers.autonomyStatement);
  if (autonomy) {
    const option = findOption('autonomyStatement', autonomy);
    if (option) signals.push({ questionId: 'autonomyStatement', text: `Você disse: "${option.label}"` });
  }

  const days = toStringValue(answers.daysPerWeek);
  if (days) {
    signals.push({
      questionId: 'daysPerWeek',
      text: days === '7' ? 'Você estuda todos os dias' : `Você estuda ${days} dia(s) por semana`,
    });
  }

  const minutes = toStringValue(answers.sessionMinutes);
  if (minutes) {
    signals.push({ questionId: 'sessionMinutes', text: `Você prefere sessões de ${minutes} minutos` });
  }

  const stability = toStringValue(answers.routineStability);
  if (stability === 'muito') {
    signals.push({ questionId: 'routineStability', text: 'Sua rotina muda bastante' });
  }
  if (stability === 'regular') {
    signals.push({ questionId: 'routineStability', text: 'Sua rotina é bem regular' });
  }

  const prep = toStringValue(answers.previousPrep);
  if (prep) {
    const option = findOption('previousPrep', prep);
    if (option) signals.push({ questionId: 'previousPrep', text: `Preparação anterior: ${option.label.toLowerCase()}` });
  }

  const primaryGoal = toStringValue(answers.primaryGoal);
  if (primaryGoal) {
    const option = findOption('goals', primaryGoal);
    if (option) signals.push({ questionId: 'primaryGoal', text: `Seu objetivo principal: ${option.label.toLowerCase()}` });
  }

  const frictions = toArrayValue(answers.frictions);
  for (const friction of frictions.slice(0, 2)) {
    const option = findOption('frictions', friction);
    if (option) signals.push({ questionId: 'frictions', text: `Você marcou "${option.label.toLowerCase()}"` });
  }

  return signals;
}

/** Contradições declaradas na §4.3 da spec. Nunca viram erro de formulário. */
export function detectContradictions(answers: AnswerMap): string[] {
  const found: string[] = [];

  const autonomy = toStringValue(answers.autonomyStatement);
  const preferences = toArrayValue(answers.studyPreferences);
  const frictions = toArrayValue(answers.frictions);

  if (autonomy === 'perdido' && preferences.includes('sequencia_questoes') && !frictions.includes('por_onde_comecar')) {
    found.push('Você pediu direção, mas também disse preferir ir direto para as questões.');
  }

  const selfAssessment = answers.selfAssessment;
  if (selfAssessment && typeof selfAssessment === 'object' && !Array.isArray(selfAssessment)) {
    const values = Object.values(selfAssessment as Record<string, string>);
    const allSecure = values.length >= 4 && values.every((value) => value === 'secure');
    if (allSecure && toStringValue(answers.previousPrep) === 'nunca') {
      found.push('Você se sente seguro em todas as áreas, mas ainda não se preparou para o ENEM.');
    }
  }

  const days = Number(toStringValue(answers.daysPerWeek) ?? NaN);
  if (days >= 6 && toStringValue(answers.routineStability) === 'muito') {
    found.push('Você estuda quase todos os dias, mas descreve uma rotina que muda bastante.');
  }

  return found;
}

export function classifyProfile(answers: AnswerMap): ProfileResult {
  const dimensions = computeDimensions(answers);
  const answered = answeredSteps(answers);
  const missingRequiredSteps = REQUIRED_STEPS.filter((slug) => !answered.includes(slug));
  const contradictions = detectContradictions(answers);

  const premiseContext: PremiseContext = {
    horizon: toStringValue(answers.horizon),
    examHistory: toStringValue(answers.examHistory),
    previousPrep: toStringValue(answers.previousPrep),
  };

  const ranking = PROFILES.map((profile) => {
    const premise = PROFILE_PREMISES[profile.slug];
    const eligible = premise ? premise.isEligible(premiseContext) : true;
    return {
      slug: profile.slug,
      score: scoreProfile(dimensions, profile),
      eligible,
      ...(eligible ? {} : { premiseReason: premise?.reason }),
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return getProfile(a.slug).priority - getProfile(b.slug).priority;
  });

  // A sugestão automática respeita a premissa; a escolha manual continua livre (§19).
  const suggested = (ranking.find((item) => item.eligible) ?? ranking[0])?.slug ?? 'explorador-sem-rota';

  let confidence: ConfidenceLevel;
  if (missingRequiredSteps.length > 0 || contradictions.length > 0) {
    confidence = 'low';
  } else if (answered.length === ONBOARDING_STEPS.length) {
    confidence = 'high';
  } else {
    confidence = 'medium';
  }

  // Onboarding totalmente pulado: perfil provisório guiado, confiança baixa.
  if (answered.length === 0) {
    return {
      suggested: 'explorador-sem-rota',
      dimensions,
      confidence: 'low',
      provisional: true,
      signals: [],
      contradictions,
      alternatives: ranking.filter((item) => item.slug !== 'explorador-sem-rota').slice(0, 3).map((item) => item.slug),
      suggestsDiagnostic: true,
      answeredSteps: answered,
      missingRequiredSteps,
      ranking,
    };
  }

  const suggestsDiagnostic =
    confidence === 'low' ||
    toStringValue(answers.previousPrep) === 'nao_sei' ||
    Object.values((answers.selfAssessment as Record<string, string>) ?? {}).includes('unknown');

  return {
    suggested,
    dimensions,
    confidence,
    provisional: confidence !== 'high',
    signals: buildSignals(answers),
    contradictions,
    alternatives: ranking.filter((item) => item.slug !== suggested).slice(0, 3).map((item) => item.slug),
    suggestsDiagnostic,
    answeredSteps: answered,
    missingRequiredSteps,
    ranking,
  };
}

/** Apoios práticos derivados da etapa F — nunca diagnóstico. */
export function supportsFor(answers: AnswerMap): string[] {
  const frictions = Array.isArray(answers.frictions) ? answers.frictions : [];
  return frictions
    .map((value) => findOption('frictions', value)?.support)
    .filter((value): value is string => Boolean(value));
}

/** Descreve, em linguagem natural, como o perfil muda a experiência. */
export function describePersonalization(slug: string): string[] {
  const profile = getProfile(slug);
  const { personalization: p } = profile;
  return [
    `Sessões de cerca de ${p.baseMinutes} minutos com ${p.questionsPerSession} questões`,
    `Divisão inicial: ${p.mix.learn}% aprender, ${p.mix.practice}% praticar, ${p.mix.review}% revisar`,
    p.dashboardDirection === 'high'
      ? 'Uma recomendação principal bem destacada no seu início'
      : p.dashboardDirection === 'medium'
        ? 'Uma recomendação principal com opções visíveis ao lado'
        : 'Mais controle manual e recomendações discretas',
    `Dificuldade inicial ${p.initialDifficulty === 'intro' ? 'introdutória' : p.initialDifficulty === 'intermediate' ? 'intermediária' : 'desafiadora'}`,
    p.timer === 'timed'
      ? 'Cronômetro ativo nas sessões'
      : p.timer === 'visible'
        ? 'Cronômetro visível, sem contagem regressiva'
        : 'Cronômetro discreto, sem pressão',
  ];
}

/** Verifica se a questão existe — usado pela validação das ações do onboarding. */
export function questionExists(questionId: string): boolean {
  return findQuestion(questionId) !== null;
}
