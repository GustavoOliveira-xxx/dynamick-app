/**
 * Motor de perfil: determinístico e explicável.
 *
 * O mesmo conjunto de respostas sempre produz o mesmo perfil, a mesma confiança e os
 * mesmos sinais legíveis. Nenhuma pontuação técnica é mostrada ao estudante.
 */

import { DIMENSION_KEYS } from './domain.js';
import { clamp } from '../core/format.js';
import {
  AREA_SELF_ASSESSMENT,
  ONBOARDING_STEPS,
  REQUIRED_STEPS,
  findOption,
} from '../data/questionnaire.js';
import { DIMENSION_WEIGHTS, PROFILES, PROFILE_PREMISES, getProfile } from './profiles.js';

const NEUTRAL = 50;

export function neutralDimensions() {
  return DIMENSION_KEYS.reduce((acc, key) => {
    acc[key] = NEUTRAL;
    return acc;
  }, {});
}

function applyEffect(dimensions, effect, factor = 1) {
  if (!effect) return;
  for (const key of DIMENSION_KEYS) {
    if (typeof effect[key] === 'number') dimensions[key] += effect[key] * factor;
  }
}

function asString(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return null;
}

function asList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value) return [value];
  return [];
}

/**
 * Quais etapas o estudante efetivamente respondeu.
 * Uma lista vazia CONTA como resposta: marcar "nenhuma dessas" é uma resposta
 * legítima, não uma etapa em branco. Só texto vazio não conta.
 */
export function answeredSteps(answers) {
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

export function computeDimensions(answers) {
  const dimensions = neutralDimensions();

  for (const step of ONBOARDING_STEPS) {
    for (const question of step.questions) {
      const value = answers[question.id];
      if (value === undefined) continue;

      if (question.type === 'single') {
        const selected = asString(value);
        if (selected) applyEffect(dimensions, findOption(question.id, selected)?.effect);
      }

      if (question.type === 'multiple') {
        for (const item of asList(value)) {
          applyEffect(dimensions, findOption(question.id, item)?.effect);
        }
      }
    }
  }

  // Consistência é derivada diretamente dos dias por semana.
  const days = Number(asString(answers.daysPerWeek) ?? NaN);
  if (Number.isFinite(days) && days >= 1 && days <= 7) {
    dimensions.consistency = 30 + days * 8;
    if (asList(answers.preferredTimes).includes('varia')) dimensions.consistency -= 10;
    const stability = asString(answers.routineStability);
    if (stability === 'regular') dimensions.consistency += 15;
    if (stability === 'muito') dimensions.consistency -= 20;
    if (asList(answers.goals).includes('rotina')) dimensions.consistency -= 10;
    if (asList(answers.frictions).includes('perder_ritmo')) dimensions.consistency -= 10;
  }

  // Tempo personalizado interpola a mesma escala das opções fixas.
  const minutes = Number(asString(answers.sessionMinutes) ?? NaN);
  if (Number.isFinite(minutes) && ![10, 20, 30, 45, 60].includes(minutes)) {
    const bounded = clamp(minutes, 5, 180);
    const effect = bounded <= 30 ? ((30 - bounded) / 20) * 30 : -((bounded - 30) / 30) * 20;
    dimensions.needsShortSessions += Math.round(effect);
  }

  // Objetivo principal tem peso dobrado (o efeito já foi aplicado uma vez em `goals`).
  const primaryGoal = asString(answers.primaryGoal);
  if (primaryGoal) applyEffect(dimensions, findOption('goals', primaryGoal)?.effect);

  // Autopercepção move a base percebida.
  const selfAssessment = answers.selfAssessment;
  if (selfAssessment && typeof selfAssessment === 'object' && !Array.isArray(selfAssessment)) {
    let delta = 0;
    for (const area of AREA_SELF_ASSESSMENT) {
      const value = selfAssessment[area.slug];
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

function scoreProfile(dimensions, profile) {
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
export function buildSignals(answers) {
  const signals = [];

  const autonomy = asString(answers.autonomyStatement);
  if (autonomy) {
    const option = findOption('autonomyStatement', autonomy);
    if (option) signals.push(`Você disse: "${option.label}"`);
  }

  const days = asString(answers.daysPerWeek);
  if (days) {
    signals.push(days === '7' ? 'Você estuda todos os dias' : `Você estuda ${days} dia(s) por semana`);
  }

  const minutes = asString(answers.sessionMinutes);
  if (minutes) signals.push(`Você prefere sessões de ${minutes} minutos`);

  const stability = asString(answers.routineStability);
  if (stability === 'muito') signals.push('Sua rotina muda bastante');
  if (stability === 'regular') signals.push('Sua rotina é bem regular');

  const prep = asString(answers.previousPrep);
  if (prep) {
    const option = findOption('previousPrep', prep);
    if (option) signals.push(`Preparação anterior: ${option.label.toLowerCase()}`);
  }

  const primaryGoal = asString(answers.primaryGoal);
  if (primaryGoal) {
    const option = findOption('goals', primaryGoal);
    if (option) signals.push(`Seu objetivo principal: ${option.label.toLowerCase()}`);
  }

  for (const friction of asList(answers.frictions).slice(0, 2)) {
    const option = findOption('frictions', friction);
    if (option) signals.push(`Você marcou "${option.label.toLowerCase()}"`);
  }

  return signals;
}

/** Contradições declaradas. Nunca viram erro de formulário. */
export function detectContradictions(answers) {
  const found = [];

  const autonomy = asString(answers.autonomyStatement);
  const preferences = asList(answers.studyPreferences);
  const frictions = asList(answers.frictions);

  if (autonomy === 'perdido' && preferences.includes('sequencia_questoes') && !frictions.includes('por_onde_comecar')) {
    found.push('Você pediu direção, mas também disse preferir ir direto para as questões.');
  }

  const selfAssessment = answers.selfAssessment;
  if (selfAssessment && typeof selfAssessment === 'object' && !Array.isArray(selfAssessment)) {
    const values = Object.values(selfAssessment);
    const allSecure = values.length >= 4 && values.every((value) => value === 'secure');
    if (allSecure && asString(answers.previousPrep) === 'nunca') {
      found.push('Você se sente seguro em todas as áreas, mas ainda não se preparou para o ENEM.');
    }
  }

  const days = Number(asString(answers.daysPerWeek) ?? NaN);
  if (days >= 6 && asString(answers.routineStability) === 'muito') {
    found.push('Você estuda quase todos os dias, mas descreve uma rotina que muda bastante.');
  }

  return found;
}

export function classifyProfile(answers) {
  const dimensions = computeDimensions(answers);
  const answered = answeredSteps(answers);
  const missingRequiredSteps = REQUIRED_STEPS.filter((slug) => !answered.includes(slug));
  const contradictions = detectContradictions(answers);

  const premiseContext = {
    horizon: asString(answers.horizon),
    examHistory: asString(answers.examHistory),
    previousPrep: asString(answers.previousPrep),
  };

  const ranking = PROFILES.map((profile) => {
    const premise = PROFILE_PREMISES[profile.slug];
    const eligible = premise ? premise.isEligible(premiseContext) : true;
    return {
      slug: profile.slug,
      score: scoreProfile(dimensions, profile),
      eligible,
      premiseReason: eligible ? undefined : premise?.reason,
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return getProfile(a.slug).priority - getProfile(b.slug).priority;
  });

  // A sugestão automática respeita a premissa; a escolha manual continua livre.
  const suggested = (ranking.find((item) => item.eligible) ?? ranking[0])?.slug ?? 'explorador-sem-rota';

  let confidence;
  if (missingRequiredSteps.length > 0 || contradictions.length > 0) confidence = 'low';
  else if (answered.length === ONBOARDING_STEPS.length) confidence = 'high';
  else confidence = 'medium';

  // Onboarding totalmente pulado: perfil provisório guiado, confiança baixa.
  if (answered.length === 0) {
    return {
      suggested: 'explorador-sem-rota',
      dimensions,
      confidence: 'low',
      provisional: true,
      signals: [],
      contradictions,
      alternatives: ranking.filter((i) => i.slug !== 'explorador-sem-rota').slice(0, 3).map((i) => i.slug),
      suggestsDiagnostic: true,
      answeredSteps: answered,
      missingRequiredSteps,
      ranking,
    };
  }

  const suggestsDiagnostic =
    confidence === 'low' ||
    asString(answers.previousPrep) === 'nao_sei' ||
    Object.values(answers.selfAssessment ?? {}).includes('unknown');

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
export function supportsFor(answers) {
  return asList(answers.frictions)
    .map((value) => findOption('frictions', value)?.support)
    .filter(Boolean);
}

/** Descreve, em linguagem natural, como o perfil muda a experiência. */
export function describePersonalization(slug) {
  const p = getProfile(slug).personalization;
  return [
    `Sessões de cerca de ${p.baseMinutes} minutos com ${p.questionsPerSession} questões`,
    `Divisão inicial: ${p.mix.learn}% aprender, ${p.mix.practice}% praticar, ${p.mix.review}% revisar`,
    p.dashboardDirection === 'high'
      ? 'Uma recomendação principal bem destacada no seu início'
      : p.dashboardDirection === 'medium'
        ? 'Uma recomendação principal com opções visíveis ao lado'
        : 'Mais controle manual e recomendações discretas',
    `Dificuldade inicial ${
      p.initialDifficulty === 'intro' ? 'introdutória' : p.initialDifficulty === 'intermediate' ? 'intermediária' : 'desafiadora'
    }`,
    p.timer === 'timed'
      ? 'Cronômetro ativo nas sessões'
      : p.timer === 'visible'
        ? 'Cronômetro visível, sem contagem regressiva'
        : 'Cronômetro discreto, sem pressão',
  ];
}
