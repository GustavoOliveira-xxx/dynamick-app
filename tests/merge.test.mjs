import { describe, it, expect } from './run.mjs';
import { mesclarEstados } from '../js/core/merge.js';

const ANTES = '2026-08-01T10:00:00.000Z';
const DEPOIS = '2026-08-02T10:00:00.000Z';

function retrato(extra = {}) {
  return {
    version: 1,
    createdAt: ANTES,
    updatedAt: ANTES,
    student: {
      name: 'Gustavo',
      onboardingStatus: 'not_started',
      completedSteps: [],
      skippedSteps: [],
      answers: {},
      dimensions: { declared: {}, observed: {} },
    },
    preferences: { theme: 'dark', textScale: '100' },
    profileHistory: [],
    profileConfirmations: [],
    reports: [],
    sessions: {},
    attempts: {},
    mastery: {},
    review: {},
    notes: {},
    plan: null,
    simulationRuns: {},
    essays: {},
    ...extra,
  };
}

describe('fusão entre computador e celular', () => {
  it('mantém as tentativas dos dois aparelhos', () => {
    const computador = retrato({
      updatedAt: DEPOIS,
      attempts: { att_1: { id: 'att_1', isCorrect: true, answeredAt: DEPOIS } },
    });
    const celular = retrato({
      attempts: { att_2: { id: 'att_2', isCorrect: false, answeredAt: ANTES } },
    });

    const juntos = mesclarEstados(computador, celular);
    expect(Object.keys(juntos.attempts).sort()).toEqual(['att_1', 'att_2']);
  });

  it('não deixa o aparelho antigo apagar a resposta mais nova da mesma questão', () => {
    const novo = retrato({
      updatedAt: DEPOIS,
      attempts: { att_1: { id: 'att_1', answer: 'C', answeredAt: DEPOIS } },
    });
    const velho = retrato({
      attempts: { att_1: { id: 'att_1', answer: 'A', answeredAt: ANTES } },
    });

    expect(mesclarEstados(novo, velho).attempts.att_1.answer).toBe('C');
    expect(mesclarEstados(velho, novo).attempts.att_1.answer).toBe('C');
  });

  it('chega ao mesmo resultado independentemente da ordem dos argumentos', () => {
    const a = retrato({
      updatedAt: DEPOIS,
      attempts: { att_1: { id: 'att_1', answeredAt: DEPOIS } },
      notes: { note_1: { id: 'note_1', status: 'open', createdAt: DEPOIS } },
      reports: [{ id: 'rep_1', createdAt: DEPOIS }],
    });
    const b = retrato({
      attempts: { att_2: { id: 'att_2', answeredAt: ANTES } },
      notes: { note_2: { id: 'note_2', status: 'open', createdAt: ANTES } },
      reports: [{ id: 'rep_2', createdAt: ANTES }],
    });

    expect(JSON.stringify(mesclarEstados(a, b))).toBe(JSON.stringify(mesclarEstados(b, a)));
  });

  it('empate de data não faz os aparelhos ficarem trocando versões', () => {
    const a = retrato({ attempts: { att_1: { id: 'att_1', answer: 'A', answeredAt: ANTES } } });
    const b = retrato({ attempts: { att_1: { id: 'att_1', answer: 'B', answeredAt: ANTES } } });

    const primeira = mesclarEstados(a, b);
    const segunda = mesclarEstados(primeira, a);
    const terceira = mesclarEstados(segunda, b);

    expect(JSON.stringify(segunda.attempts)).toBe(JSON.stringify(primeira.attempts));
    expect(JSON.stringify(terceira.attempts)).toBe(JSON.stringify(primeira.attempts));
  });

  it('guarda o domínio do tópico com mais prática', () => {
    const poucas = retrato({
      updatedAt: DEPOIS,
      mastery: { funcoes: { attemptCount: 2, score: 20, lastPracticedAt: DEPOIS } },
    });
    const muitas = retrato({
      mastery: { funcoes: { attemptCount: 9, score: 70, lastPracticedAt: ANTES } },
    });

    expect(mesclarEstados(poucas, muitas).mastery.funcoes.attemptCount).toBe(9);
  });

  it('terminar o onboarding num aparelho não faz o outro pedir tudo de novo', () => {
    const pronto = retrato({
      student: { ...retrato().student, onboardingStatus: 'completed', completedSteps: ['perfil', 'rotina'] },
    });
    const cru = retrato({
      updatedAt: DEPOIS,
      student: { ...retrato().student, onboardingStatus: 'not_started' },
    });

    const juntos = mesclarEstados(cru, pronto);
    expect(juntos.student.onboardingStatus).toBe('completed');
    expect(juntos.student.completedSteps.sort()).toEqual(['perfil', 'rotina']);
  });

  it('une as revisões pendentes sem duplicar a mesma questão', () => {
    const a = retrato({
      updatedAt: DEPOIS,
      review: { rev_q1: { id: 'rev_q1', repetitions: 3, lastReviewedAt: DEPOIS } },
    });
    const b = retrato({
      review: {
        rev_q1: { id: 'rev_q1', repetitions: 1, lastReviewedAt: ANTES },
        rev_q2: { id: 'rev_q2', repetitions: 0, lastReviewedAt: ANTES },
      },
    });

    const juntos = mesclarEstados(a, b);
    expect(Object.keys(juntos.review).sort()).toEqual(['rev_q1', 'rev_q2']);
    expect(juntos.review.rev_q1.repetitions).toBe(3);
  });

  it('não repete entradas de lista já conhecidas', () => {
    const comum = { id: 'conf_1', createdAt: ANTES };
    const a = retrato({ updatedAt: DEPOIS, profileConfirmations: [comum, { id: 'conf_2', createdAt: DEPOIS }] });
    const b = retrato({ profileConfirmations: [comum] });

    expect(mesclarEstados(a, b).profileConfirmations).toHaveLength(2);
  });

  it('bloco do plano concluído no celular continua concluído no computador', () => {
    const semana = '2026-08-31';
    const celular = retrato({
      plan: { weekStart: semana, blocks: [{ id: 'b1', status: 'done' }, { id: 'b2', status: 'todo' }] },
    });
    const computador = retrato({
      updatedAt: DEPOIS,
      plan: { weekStart: semana, blocks: [{ id: 'b1', status: 'todo' }, { id: 'b2', status: 'todo' }] },
    });

    const blocos = mesclarEstados(computador, celular).plan.blocks;
    expect(blocos.find((bloco) => bloco.id === 'b1').status).toBe('done');
    expect(blocos.find((bloco) => bloco.id === 'b2').status).toBe('todo');
  });

  it('mantém a redação mais recente e a que só existe num dos lados', () => {
    const a = retrato({
      updatedAt: DEPOIS,
      essays: { tema1: { promptSlug: 'tema1', text: 'versão nova', updatedAt: DEPOIS } },
    });
    const b = retrato({
      essays: {
        tema1: { promptSlug: 'tema1', text: 'versão velha', updatedAt: ANTES },
        tema2: { promptSlug: 'tema2', text: 'rascunho', updatedAt: ANTES },
      },
    });

    const juntos = mesclarEstados(a, b);
    expect(juntos.essays.tema1.text).toBe('versão nova');
    expect(juntos.essays.tema2.text).toBe('rascunho');
  });

  it('aceita um dos lados ausente', () => {
    const so = retrato();
    expect(mesclarEstados(null, so)).toEqual(so);
    expect(mesclarEstados(so, null)).toEqual(so);
    expect(mesclarEstados(null, null)).toBeNull();
  });

  it('preserva a conta gravada no pacote', () => {
    const comConta = retrato({ conta: { nome: 'Gustavo', email: 'gu@exemplo.com', protegida: true } });
    const sem = retrato({ updatedAt: DEPOIS });

    expect(mesclarEstados(sem, comConta).conta.email).toBe('gu@exemplo.com');
  });

  it('celular recém-logado não apaga o perfil que veio do computador', () => {
    // O aparelho novo tem a data de agora — mais recente que a do servidor —
    // mas nada dentro. Antes desta proteção ele zerava o perfil ao entrar.
    const computador = retrato({
      student: {
        ...retrato().student,
        name: 'Gustavo',
        onboardingStatus: 'completed',
        activeProfile: 'construtor',
        examDate: '2027-11-07',
        daysPerWeek: 5,
      },
      attempts: { att_1: { id: 'att_1', answeredAt: ANTES } },
      mastery: { funcoes: { attemptCount: 6, score: 60, lastPracticedAt: ANTES } },
    });
    const celularZerado = retrato({ updatedAt: new Date().toISOString() });

    const juntos = mesclarEstados(celularZerado, computador);
    expect(juntos.student.name).toBe('Gustavo');
    expect(juntos.student.activeProfile).toBe('construtor');
    expect(juntos.student.examDate).toBe('2027-11-07');
    expect(juntos.student.daysPerWeek).toBe(5);
    expect(juntos.student.onboardingStatus).toBe('completed');
    expect(Object.keys(juntos.attempts)).toHaveLength(1);
    expect(juntos.mastery.funcoes.score).toBe(60);
  });

  it('campo em branco no aparelho mais novo não apaga o que o outro preencheu', () => {
    const comPerfil = retrato({
      student: { ...retrato().student, name: 'Gustavo', activeProfile: 'construtor', examDate: '2027-11-07' },
      attempts: { att_0: { id: 'att_0', answeredAt: ANTES } },
    });
    const semPerfil = retrato({
      updatedAt: DEPOIS,
      student: { ...retrato().student, name: '', activeProfile: null, examDate: null },
      attempts: { att_1: { id: 'att_1', answeredAt: DEPOIS } },
    });

    const juntos = mesclarEstados(semPerfil, comPerfil);
    expect(juntos.student.name).toBe('Gustavo');
    expect(juntos.student.activeProfile).toBe('construtor');
    expect(juntos.student.examDate).toBe('2027-11-07');
  });

  it('pular o diagnóstico vale para a conta, não só para o aparelho', () => {
    const pulou = retrato({
      student: { ...retrato().student, diagnosticStatus: 'skipped' },
      attempts: { att_0: { id: 'att_0', answeredAt: ANTES } },
    });
    const naoPulou = retrato({
      updatedAt: DEPOIS,
      student: { ...retrato().student, diagnosticStatus: 'pending' },
      attempts: { att_1: { id: 'att_1', answeredAt: DEPOIS } },
    });

    expect(mesclarEstados(naoPulou, pulou).student.diagnosticStatus).toBe('skipped');
  });

  it('o resultado continua sendo um retrato válido para importar', () => {
    const juntos = mesclarEstados(retrato({ updatedAt: DEPOIS }), retrato());
    expect(Boolean(juntos.student)).toBe(true);
    expect(Boolean(juntos.preferences)).toBe(true);
    expect(juntos.updatedAt).toBe(DEPOIS);
  });
});
