import { describe, expect, it } from 'vitest';
import { classifyProfile, computeDimensions, detectContradictions, neutralDimensions } from './engine';
import type { AnswerMap } from './engine';
import { PROFILES } from './profiles';
import { ONBOARDING_STEPS, REQUIRED_STEPS } from '@/lib/onboarding/questionnaire';

/**
 * Cenários obrigatórios da §9 do ONBOARDING_SPEC.md
 * (seção "Perfis de teste obrigatórios" do prompt mestre).
 */

const lostWithLittleTime: AnswerMap = {
  schoolYear: 'em2',
  previousPrep: 'nunca',
  examHistory: 'nenhum',
  horizon: 'enem_2027',
  daysPerWeek: '2',
  sessionMinutes: '10',
  routineStability: 'pouco',
  autonomyStatement: 'perdido',
};

const organizedOwnRoutine: AnswerMap = {
  schoolYear: 'em3',
  previousPrep: 'cronograma',
  examHistory: 'simulados',
  horizon: 'enem_2027',
  goals: ['desempenho', 'rotina'],
  primaryGoal: 'desempenho',
  daysPerWeek: '5',
  sessionMinutes: '30',
  preferredTimes: ['noite'],
  routineStability: 'regular',
  autonomyStatement: 'cronograma_externo',
  studyPreferences: ['sequencia_questoes', 'revisao_erros'],
  frictions: [],
  selfAssessment: {
    linguagens: 'secure',
    matematica: 'unknown',
    'ciencias-humanas': 'secure',
    'ciencias-natureza': 'insecure',
    redacao: 'unknown',
  },
  theme: 'dark',
};

const goodBaseInterpretationErrors: AnswerMap = {
  schoolYear: 'concluido',
  previousPrep: 'cronograma',
  examHistory: 'enem_1',
  horizon: 'prova_proxima',
  goals: ['desempenho'],
  primaryGoal: 'desempenho',
  daysPerWeek: '4',
  sessionMinutes: '30',
  preferredTimes: ['tarde'],
  routineStability: 'pouco',
  autonomyStatement: 'sei_praticar',
  studyPreferences: ['sequencia_questoes', 'revisao_erros'],
  frictions: ['interpretacao'],
  selfAssessment: {
    linguagens: 'insecure',
    matematica: 'secure',
    'ciencias-humanas': 'secure',
    'ciencias-natureza': 'secure',
    redacao: 'insecure',
  },
  theme: 'dark',
};

const abandonsLongSessions: AnswerMap = {
  schoolYear: 'em2',
  previousPrep: 'por_conta',
  examHistory: 'nenhum',
  horizon: 'enem_2027',
  goals: ['rotina'],
  primaryGoal: 'rotina',
  daysPerWeek: '2',
  sessionMinutes: '10',
  preferredTimes: ['varia'],
  routineStability: 'muito',
  autonomyStatement: 'preciso_plano',
  studyPreferences: ['explicacao_curta'],
  frictions: ['perder_ritmo', 'abandonar_ao_errar'],
  selfAssessment: {
    linguagens: 'unknown',
    matematica: 'insecure',
    'ciencias-humanas': 'unknown',
    'ciencias-natureza': 'unknown',
    redacao: 'unknown',
  },
  theme: 'dark',
};

describe('computeDimensions', () => {
  it('parte de 50 em todas as dimensões quando não há resposta', () => {
    expect(computeDimensions({})).toEqual(neutralDimensions());
  });

  it('mantém todas as dimensões entre 0 e 100', () => {
    const dimensions = computeDimensions(lostWithLittleTime);
    for (const value of Object.values(dimensions)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it('deriva consistência dos dias por semana (30 + dias × 8)', () => {
    expect(computeDimensions({ daysPerWeek: '1' }).consistency).toBe(38);
    expect(computeDimensions({ daysPerWeek: '5' }).consistency).toBe(70);
    expect(computeDimensions({ daysPerWeek: '7' }).consistency).toBe(86);
  });

  it('trata o tempo informado com a mesma escala em respostas personalizadas', () => {
    const fixed = computeDimensions({ sessionMinutes: '10' }).needsShortSessions;
    const custom = computeDimensions({ sessionMinutes: '12' }).needsShortSessions;
    expect(fixed).toBe(80);
    expect(custom).toBeLessThan(fixed);
    expect(custom).toBeGreaterThan(computeDimensions({ sessionMinutes: '30' }).needsShortSessions);
  });

  it('é determinístico: as mesmas respostas geram o mesmo resultado', () => {
    expect(computeDimensions(organizedOwnRoutine)).toEqual(computeDimensions(organizedOwnRoutine));
  });

  it('não penaliza quem responde "não sei ainda"', () => {
    const naoSei = computeDimensions({ previousPrep: 'nao_sei' });
    expect(naoSei).toEqual(neutralDimensions());
  });
});

describe('classifyProfile — cenários obrigatórios', () => {
  it('1. estudante perdido com pouco tempo → Explorador sem rota', () => {
    const result = classifyProfile(lostWithLittleTime);
    expect(result.suggested).toBe('explorador-sem-rota');
    expect(result.confidence).toBe('medium');
    expect(result.signals.length).toBeGreaterThan(0);
  });

  it('2. estudante organizado com rotina própria → perfil autônomo de alta confiança', () => {
    const result = classifyProfile(organizedOwnRoutine);
    expect(['praticante-em-ritmo', 'cacador-de-lacunas']).toContain(result.suggested);
    expect(result.confidence).toBe('high');
    expect(result.provisional).toBe(false);
  });

  it('3. boa base com erro de interpretação → Caçador de lacunas ou Treinador', () => {
    const result = classifyProfile(goodBaseInterpretationErrors);
    expect(['cacador-de-lacunas', 'treinador-de-desempenho']).toContain(result.suggested);
    expect(result.confidence).toBe('high');
  });

  it('4. quem abandona sessões longas → Estudante de rotina variável', () => {
    const result = classifyProfile(abandonsLongSessions);
    expect(result.suggested).toBe('rotina-variavel');
  });

  it('7. onboarding pulado → perfil provisório guiado, confiança baixa', () => {
    const result = classifyProfile({});
    expect(result.suggested).toBe('explorador-sem-rota');
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
    expect(result.suggestsDiagnostic).toBe(true);
    expect(result.missingRequiredSteps).toEqual(REQUIRED_STEPS);
  });

  it('respostas insuficientes nas etapas obrigatórias → confiança baixa e provisório', () => {
    const result = classifyProfile({ schoolYear: 'em1', previousPrep: 'nunca' });
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
    expect(result.missingRequiredSteps).toContain('rotina');
    expect(result.missingRequiredSteps).toContain('autonomia');
  });

  it('sempre oferece de 2 a 3 alternativas para comparação (§19)', () => {
    const result = classifyProfile(organizedOwnRoutine);
    expect(result.alternatives.length).toBeGreaterThanOrEqual(2);
    expect(result.alternatives).not.toContain(result.suggested);
  });

  it('o ranking cobre todos os perfis e é ordenado', () => {
    const result = classifyProfile(lostWithLittleTime);
    expect(result.ranking).toHaveLength(PROFILES.length);
    const scores = result.ranking.map((item) => item.score);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });

  it('nunca sugere um perfil fora da lista declarada', () => {
    const slugs = new Set(PROFILES.map((profile) => profile.slug));
    for (const answers of [lostWithLittleTime, organizedOwnRoutine, goodBaseInterpretationErrors, abandonsLongSessions, {}]) {
      expect(slugs.has(classifyProfile(answers).suggested)).toBe(true);
    }
  });
});

describe('detectContradictions', () => {
  it('5. declara segurança em tudo sem nunca ter se preparado', () => {
    const contradictions = detectContradictions({
      previousPrep: 'nunca',
      selfAssessment: {
        linguagens: 'secure',
        matematica: 'secure',
        'ciencias-humanas': 'secure',
        'ciencias-natureza': 'secure',
        redacao: 'secure',
      },
    });
    expect(contradictions.length).toBe(1);
  });

  it('estuda quase todos os dias mas descreve rotina instável', () => {
    expect(detectContradictions({ daysPerWeek: '6', routineStability: 'muito' })).toHaveLength(1);
  });

  it('contradição derruba a confiança para baixa e mantém o perfil provisório', () => {
    const result = classifyProfile({ ...organizedOwnRoutine, daysPerWeek: '6', routineStability: 'muito' });
    expect(result.contradictions.length).toBeGreaterThan(0);
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
  });

  it('não inventa contradição onde não existe', () => {
    expect(detectContradictions(organizedOwnRoutine)).toHaveLength(0);
  });
});

describe('integridade do questionário', () => {
  it('todo id de questão é único', () => {
    const ids = ONBOARDING_STEPS.flatMap((step) => step.questions.map((question) => question.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('toda opção de escolha única/múltipla tem rótulo em português', () => {
    for (const step of ONBOARDING_STEPS) {
      for (const question of step.questions) {
        for (const option of question.options ?? []) {
          expect(option.label.trim().length).toBeGreaterThan(0);
          expect(option.value.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('as etapas obrigatórias são exatamente contexto, rotina e autonomia (modo rápido)', () => {
    expect(REQUIRED_STEPS).toEqual(['contexto', 'rotina', 'autonomia']);
  });

  it('todo perfil tem alvo declarado para todas as dimensões', () => {
    for (const profile of PROFILES) {
      expect(Object.keys(profile.targets).sort()).toEqual(Object.keys(neutralDimensions()).sort());
      const { learn, practice, review } = profile.personalization.mix;
      expect(learn + practice + review).toBe(100);
    }
  });
});
