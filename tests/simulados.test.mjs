import { describe, it, expect } from './run.mjs';
import { SIMULATIONS, TOPICS, SUBJECTS, QUESTIONS, getSimulation } from '../js/data/content.js';
import { generateSimulation } from '../js/engine/simulation.js';

const pool = QUESTIONS.map((question) => ({
  id: question.slug,
  areaSlug: question.areaSlug,
  topicSlug: question.topicSlug,
  difficulty: question.difficulty,
  isRecovery: question.isRecovery,
}));
const porSlug = new Map(QUESTIONS.map((question) => [question.slug, question]));

describe('simulados por assunto e por matéria', () => {
  it('existe um simulado para cada assunto do acervo', () => {
    const faltando = TOPICS.filter(
      (topic) => !SIMULATIONS.some((s) => s.kind === 'topic' && s.topicSlug === topic.slug),
    );
    expect(faltando.map((topic) => topic.slug)).toEqual([]);
  });

  it('existe um simulado para cada matéria cadastrada', () => {
    const faltando = SUBJECTS.filter(
      (materia) => !SIMULATIONS.some((s) => s.kind === 'subject' && s.subjectSlug === materia.slug),
    );
    expect(faltando.map((materia) => materia.slug)).toEqual([]);
  });

  it('o simulado de assunto só sorteia questões daquele assunto', () => {
    const problemas = [];
    for (const simulado of SIMULATIONS.filter((s) => s.kind === 'topic')) {
      const { questionIds } = generateSimulation(pool, simulado.blueprint, simulado.questionCount, simulado.slug);
      const fora = questionIds.filter((id) => porSlug.get(id)?.topicSlug !== simulado.topicSlug);
      if (fora.length > 0) problemas.push(simulado.slug);
    }
    expect(problemas).toEqual([]);
  });

  it('o simulado de matéria espalha questões entre os assuntos dela', () => {
    const problemas = [];
    for (const simulado of SIMULATIONS.filter((s) => s.kind === 'subject')) {
      const { questionIds } = generateSimulation(pool, simulado.blueprint, simulado.questionCount, simulado.slug);
      const materias = new Set(questionIds.map((id) => porSlug.get(id)?.subjectSlug));
      const assuntos = new Set(questionIds.map((id) => porSlug.get(id)?.topicSlug));
      const daMateria = TOPICS.filter((t) => t.subjectSlug === simulado.subjectSlug).length;
      if (materias.size !== 1 || !materias.has(simulado.subjectSlug)) problemas.push(`${simulado.slug}: fora da matéria`);
      if (daMateria > 1 && assuntos.size < 2) problemas.push(`${simulado.slug}: concentrou em um assunto`);
    }
    expect(problemas).toEqual([]);
  });

  it('sementes diferentes produzem sorteios diferentes', () => {
    const simulado = getSimulation(SIMULATIONS.find((s) => s.kind === 'topic').slug);
    const sorteios = new Set();
    for (let i = 0; i < 6; i += 1) {
      const { questionIds } = generateSimulation(pool, simulado.blueprint, simulado.questionCount, `semente-${i}`);
      sorteios.add(questionIds.join(','));
    }
    expect(sorteios.size).toBeGreaterThanOrEqual(4);
  });

  it('nenhum sorteio repete questão dentro do mesmo simulado', () => {
    const problemas = [];
    for (const simulado of SIMULATIONS) {
      const { questionIds } = generateSimulation(pool, simulado.blueprint, simulado.questionCount, simulado.slug);
      if (new Set(questionIds).size !== questionIds.length) problemas.push(simulado.slug);
    }
    expect(problemas).toEqual([]);
  });
});
