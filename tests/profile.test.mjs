import { describe, it, expect } from './run.mjs';
import {
  classifyProfile,
  computeDimensions,
  detectContradictions,
  neutralDimensions,
} from '../js/engine/profile.js';
import { PROFILES } from '../js/engine/profiles.js';
import { ONBOARDING_STEPS, REQUIRED_STEPS } from '../js/data/questionnaire.js';



const perdidoComPoucoTempo = {
  schoolYear: 'em2',
  previousPrep: 'nunca',
  examHistory: 'nenhum',
  horizon: 'enem_2027',
  daysPerWeek: '2',
  sessionMinutes: '10',
  routineStability: 'pouco',
  autonomyStatement: 'perdido',
};

const organizadoComRotina = {
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

const boaBaseErraInterpretacao = {
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

const abandonaSessoesLongas = {
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
    const dimensions = computeDimensions(perdidoComPoucoTempo);
    for (const value of Object.values(dimensions)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
  });

  it('deriva consistência dos dias por semana (30 + dias x 8)', () => {
    expect(computeDimensions({ daysPerWeek: '1' }).consistency).toBe(38);
    expect(computeDimensions({ daysPerWeek: '5' }).consistency).toBe(70);
    expect(computeDimensions({ daysPerWeek: '7' }).consistency).toBe(86);
  });

  it('trata tempo personalizado na mesma escala das opções fixas', () => {
    const fixo = computeDimensions({ sessionMinutes: '10' }).needsShortSessions;
    const custom = computeDimensions({ sessionMinutes: '12' }).needsShortSessions;
    expect(fixo).toBe(80);
    expect(custom).toBeLessThan(fixo);
    expect(custom).toBeGreaterThan(computeDimensions({ sessionMinutes: '30' }).needsShortSessions);
  });

  it('é determinístico: as mesmas respostas geram o mesmo resultado', () => {
    expect(computeDimensions(organizadoComRotina)).toEqual(computeDimensions(organizadoComRotina));
  });

  it('não penaliza quem responde "não sei ainda"', () => {
    expect(computeDimensions({ previousPrep: 'nao_sei' })).toEqual(neutralDimensions());
  });
});

describe('classifyProfile — cenários obrigatórios', () => {
  it('1. perdido com pouco tempo tem perfil Explorador sem rota', () => {
    const result = classifyProfile(perdidoComPoucoTempo);
    expect(result.suggested).toBe('explorador-sem-rota');
    expect(result.confidence).toBe('medium');
    expect(result.signals.length).toBeGreaterThan(0);
  });

  it('2. organizado com rotina própria tem perfil autônomo de alta confiança', () => {
    const result = classifyProfile(organizadoComRotina);
    expect(['praticante-em-ritmo', 'cacador-de-lacunas']).toContain(result.suggested);
    expect(result.confidence).toBe('high');
    expect(result.provisional).toBe(false);
  });

  it('3. boa base com erro de interpretação vira Caçador ou Treinador', () => {
    const result = classifyProfile(boaBaseErraInterpretacao);
    expect(['cacador-de-lacunas', 'treinador-de-desempenho']).toContain(result.suggested);
    expect(result.confidence).toBe('high');
  });

  it('4. quem abandona sessões longas tem perfil de rotina variável', () => {
    expect(classifyProfile(abandonaSessoesLongas).suggested).toBe('rotina-variavel');
  });

  it('7. onboarding pulado gera perfil provisório guiado, confiança baixa', () => {
    const result = classifyProfile({});
    expect(result.suggested).toBe('explorador-sem-rota');
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
    expect(result.suggestsDiagnostic).toBe(true);
    expect(result.missingRequiredSteps).toEqual(REQUIRED_STEPS);
  });

  it('respostas insuficientes nas obrigatórias geram confiança baixa', () => {
    const result = classifyProfile({ schoolYear: 'em1', previousPrep: 'nunca' });
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
    expect(result.missingRequiredSteps).toContain('rotina');
    expect(result.missingRequiredSteps).toContain('autonomia');
  });

  it('marcar "nenhuma dessas" conta como resposta, não como etapa em branco', () => {
    const comLista = classifyProfile({ ...organizadoComRotina, frictions: [] });
    expect(comLista.answeredSteps).toContain('desafios');
  });

  it('sempre oferece de 2 a 3 alternativas para comparação', () => {
    const result = classifyProfile(organizadoComRotina);
    expect(result.alternatives.length).toBeGreaterThanOrEqual(2);
    expect(result.alternatives).notToContain(result.suggested);
  });

  it('o ranking cobre todos os perfis e vem ordenado', () => {
    const result = classifyProfile(perdidoComPoucoTempo);
    expect(result.ranking).toHaveLength(PROFILES.length);
    const scores = result.ranking.map((item) => item.score);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });

  it('a premissa impede sugerir Treinador para quem tem dois anos pela frente', () => {
    const result = classifyProfile(organizadoComRotina);
    expect(result.suggested).notToContain('treinador');
    const treinador = result.ranking.find((item) => item.slug === 'treinador-de-desempenho');
    expect(treinador.eligible).toBe(false);
    expect(treinador.premiseReason.length).toBeGreaterThan(20);
  });

  it('nunca sugere um perfil fora da lista declarada', () => {
    const slugs = PROFILES.map((profile) => profile.slug);
    for (const answers of [
      perdidoComPoucoTempo, organizadoComRotina, boaBaseErraInterpretacao, abandonaSessoesLongas, {},
    ]) {
      expect(slugs).toContain(classifyProfile(answers).suggested);
    }
  });
});

describe('detectContradictions', () => {
  it('5. declara segurança em tudo sem nunca ter se preparado', () => {
    const contradictions = detectContradictions({
      previousPrep: 'nunca',
      selfAssessment: {
        linguagens: 'secure', matematica: 'secure', 'ciencias-humanas': 'secure',
        'ciencias-natureza': 'secure', redacao: 'secure',
      },
    });
    expect(contradictions).toHaveLength(1);
  });

  it('estuda quase todos os dias mas descreve rotina instável', () => {
    expect(detectContradictions({ daysPerWeek: '6', routineStability: 'muito' })).toHaveLength(1);
  });

  it('contradição derruba a confiança e mantém o perfil provisório', () => {
    const result = classifyProfile({ ...organizadoComRotina, daysPerWeek: '6', routineStability: 'muito' });
    expect(result.contradictions.length).toBeGreaterThan(0);
    expect(result.confidence).toBe('low');
    expect(result.provisional).toBe(true);
  });

  it('não inventa contradição onde não existe', () => {
    expect(detectContradictions(organizadoComRotina)).toHaveLength(0);
  });
});

describe('integridade do questionário', () => {
  it('todo id de questão é único', () => {
    const ids = ONBOARDING_STEPS.flatMap((step) => step.questions.map((question) => question.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('toda opção tem rótulo e valor', () => {
    for (const step of ONBOARDING_STEPS) {
      for (const question of step.questions) {
        for (const option of question.options ?? []) {
          expect(option.label.trim().length).toBeGreaterThan(0);
          expect(option.value.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('as etapas obrigatórias são contexto, rotina e autonomia (modo rápido)', () => {
    expect(REQUIRED_STEPS).toEqual(['contexto', 'rotina', 'autonomia']);
  });

  it('todo perfil declara alvo para todas as dimensões e mix somando 100', () => {
    for (const profile of PROFILES) {
      expect(Object.keys(profile.targets).sort()).toEqual(Object.keys(neutralDimensions()).sort());
      const { learn, practice, review } = profile.personalization.mix;
      expect(learn + practice + review).toBe(100);
    }
  });
});
