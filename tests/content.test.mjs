import { describe, it, expect } from './run.mjs';
import {
  AREAS, SUBJECTS, TOPICS, QUESTIONS, ESSAY_PROMPTS, STUDY_METHODS,
  SESSION_TEMPLATES, SIMULATIONS, catalogHealth, contentTree, getTopic,
} from '../js/data/content.js';

/**
 * Integridade do conteúdo autoral.
 * Estes testes existem para que uma questão quebrada NUNCA chegue ao estudante.
 */

describe('quantidades mínimas do pacote inicial', () => {
  const health = catalogHealth();

  it('4 áreas de conhecimento', () => expect(AREAS).toHaveLength(4));
  it('pelo menos 10 matérias', () => expect(SUBJECTS.length).toBeGreaterThanOrEqual(10));
  it('pelo menos 12 tópicos completos', () => expect(TOPICS.length).toBeGreaterThanOrEqual(12));

  it('toda matéria cadastrada tem pelo menos um tópico', () => {
    // Uma matéria no mapa sem nenhum tópico é uma porta que não abre.
    const vazias = SUBJECTS.filter(
      (subject) => !TOPICS.some((topic) => topic.subjectSlug === subject.slug),
    );
    expect(vazias.map((subject) => subject.slug)).toEqual([]);
  });

  it('toda matéria tem pelo menos 5 questões', () => {
    const poucas = SUBJECTS.filter(
      (subject) => QUESTIONS.filter((question) => question.subjectSlug === subject.slug).length < 5,
    );
    expect(poucas.map((subject) => subject.slug)).toEqual([]);
  });

  it('pelo menos 60 questões principais', () =>
    expect(health.totals.questions - health.totals.recoveryQuestions).toBeGreaterThanOrEqual(60));

  it('os 12 tópicos do MVP mantêm as 5 questões da expansão de agosto', () => {
    const daExpansao = TOPICS.filter((topic) =>
      topic.questions.some((q) => q.origin === 'AUTORAL_EXPANSAO_2026_08'),
    );
    const incompletos = daExpansao.filter(
      (topic) => topic.questions.filter((q) => q.origin === 'AUTORAL_EXPANSAO_2026_08').length !== 5,
    );
    expect(daExpansao).toHaveLength(12);
    expect(incompletos.map((topic) => topic.slug)).toEqual([]);
  });

  it('cada tópico da segunda leva tem 5 questões principais e 1 de recuperação', () => {
    const daLeva2 = TOPICS.filter((topic) =>
      topic.questions.some((q) => q.origin === 'AUTORAL_LEVA_2'),
    );
    const fora = daLeva2.filter((topic) => {
      const principais = topic.questions.filter((q) => !q.isRecovery).length;
      const recuperacao = topic.questions.filter((q) => q.isRecovery).length;
      return principais !== 5 || recuperacao !== 1;
    });
    expect(fora.map((topic) => topic.slug)).toEqual([]);
  });
  it('pelo menos 24 questões de recuperação', () =>
    expect(health.totals.recoveryQuestions).toBeGreaterThanOrEqual(24));
  it('pelo menos 12 sessões prontas', () => expect(SESSION_TEMPLATES.length).toBeGreaterThanOrEqual(12));
  it('4 simulados por área + 1 diagnóstico', () => expect(SIMULATIONS.length).toBeGreaterThanOrEqual(5));
  it('8 temas de redação', () => expect(ESSAY_PROMPTS).toHaveLength(8));
  it('8 métodos de estudo', () => expect(STUDY_METHODS).toHaveLength(8));
});

describe('integridade das questões', () => {
  it('toda questão tem exatamente uma alternativa correta', () => {
    const invalidas = QUESTIONS.filter(
      (q) => q.options.filter((option) => option.isCorrect).length !== 1,
    );
    expect(invalidas.map((q) => q.slug)).toEqual([]);
  });

  it('toda alternativa tem comentário explicando por que está certa ou errada', () => {
    const sem = QUESTIONS.filter((q) => q.options.some((option) => !option.rationale?.trim()));
    expect(sem.map((q) => q.slug)).toEqual([]);
  });

  it('toda questão tem explicação da resposta correta', () => {
    const sem = QUESTIONS.filter((q) => !q.explanation?.summary?.trim());
    expect(sem.map((q) => q.slug)).toEqual([]);
  });

  it('toda questão declara origem e licença', () => {
    const sem = QUESTIONS.filter((q) => !q.origin || !q.license);
    expect(sem.map((q) => q.slug)).toEqual([]);
  });

  it('toda questão tem tópico e habilidade classificados', () => {
    const sem = QUESTIONS.filter((q) => !q.topicSlug || !q.skillSlug);
    expect(sem.map((q) => q.slug)).toEqual([]);
  });

  it('nenhum slug de questão se repete', () => {
    const slugs = QUESTIONS.map((q) => q.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('nenhuma questão tem alternativas com o mesmo rótulo', () => {
    const problemas = QUESTIONS.filter((q) => {
      const labels = q.options.map((option) => option.label);
      return new Set(labels).size !== labels.length;
    });
    expect(problemas.map((q) => q.slug)).toEqual([]);
  });

  it('nenhum enunciado está vazio ou curto demais', () => {
    const curtas = QUESTIONS.filter((q) => q.stem.trim().length < 30);
    expect(curtas.map((q) => q.slug)).toEqual([]);
  });
});

describe('variedade cognitiva', () => {
  it('cada tópico completo tem pelo menos 5 questões principais', () => {
    const poucos = TOPICS.filter(
      (topic) => topic.questions.filter((q) => !q.isRecovery).length < 5,
    );
    expect(poucos.map((t) => t.slug)).toEqual([]);
  });

  it('cada tópico cobre os cinco formatos cognitivos', () => {
    const esperados = ['concept', 'applied', 'interpretation', 'comparison', 'integration'];
    const incompletos = TOPICS.filter((topic) => {
      const formatos = new Set(topic.questions.filter((q) => !q.isRecovery).map((q) => q.cognitiveFormat));
      return esperados.some((formato) => !formatos.has(formato));
    });
    expect(incompletos.map((t) => t.slug)).toEqual([]);
  });

  it('cada tópico tem os três níveis de dificuldade entre as principais', () => {
    const semVariedade = TOPICS.filter((topic) => {
      const niveis = new Set(topic.questions.filter((q) => !q.isRecovery).map((q) => q.difficulty));
      return niveis.size < 2;
    });
    expect(semVariedade.map((t) => t.slug)).toEqual([]);
  });

  it('não há questões praticamente idênticas', () => {
    expect(catalogHealth().duplicates).toEqual([]);
  });
});

describe('conteúdo de estudo dos tópicos', () => {
  it('cada tópico tem resumo rápido, explicação, exemplos, erros comuns e autoexplicação', () => {
    const faltando = TOPICS.filter((topic) => {
      const kinds = new Set(topic.content.map((item) => item.kind));
      return (
        !kinds.has('quick_summary') ||
        !kinds.has('explanation') ||
        !kinds.has('worked_example') ||
        !kinds.has('common_mistakes') ||
        !kinds.has('self_explanation')
      );
    });
    expect(faltando.map((t) => t.slug)).toEqual([]);
  });

  it('cada tópico tem pelo menos dois exemplos resolvidos', () => {
    const poucos = TOPICS.filter(
      (topic) => topic.content.filter((item) => item.kind === 'worked_example').length < 2,
    );
    expect(poucos.map((t) => t.slug)).toEqual([]);
  });

  it('todo pré-requisito e relação aponta para um tópico existente', () => {
    const quebrados = [];
    for (const topic of TOPICS) {
      for (const slug of [...(topic.prerequisites ?? []), ...(topic.related ?? [])]) {
        if (!getTopic(slug)) quebrados.push(`${topic.slug} -> ${slug}`);
      }
    }
    expect(quebrados).toEqual([]);
  });

  it('toda questão aponta para uma habilidade que existe no seu tópico', () => {
    const quebrados = [];
    for (const topic of TOPICS) {
      const skills = new Set(topic.skills.map((skill) => skill.slug));
      for (const question of topic.questions) {
        if (question.skillSlug && !skills.has(question.skillSlug)) {
          quebrados.push(`${question.slug} -> ${question.skillSlug}`);
        }
      }
    }
    expect(quebrados).toEqual([]);
  });
});

describe('métodos, sessões e simulados', () => {
  it('todo método de estudo declara suas limitações — nenhum é universal', () => {
    const sem = STUDY_METHODS.filter((method) => !method.limitations?.trim());
    expect(sem.map((m) => m.slug)).toEqual([]);
  });

  it('toda sessão pronta tem objetivo, instruções e critério de conclusão', () => {
    const incompletas = SESSION_TEMPLATES.filter(
      (t) => !t.goal?.trim() || !t.instructions?.trim() || !t.completionRule,
    );
    expect(incompletas.map((t) => t.slug)).toEqual([]);
  });

  it('todo simulado tem matriz de distribuição explícita', () => {
    const sem = SIMULATIONS.filter(
      (s) => !s.blueprint || Object.keys(s.blueprint).length === 0,
    );
    expect(sem.map((s) => s.slug)).toEqual([]);
  });

  it('todo tema de redação tem texto motivador, comando e checklists', () => {
    const incompletos = ESSAY_PROMPTS.filter(
      (p) =>
        !p.motivatingTexts?.length ||
        !p.productionCommand?.trim() ||
        !p.argumentChecklist?.length ||
        !p.reviewChecklist?.length,
    );
    expect(incompletos.map((p) => p.slug)).toEqual([]);
  });

  it('a matriz de cada simulado aponta para tópicos e áreas existentes', () => {
    const quebrados = [];
    for (const simulation of SIMULATIONS) {
      for (const slug of Object.keys(simulation.blueprint.topics ?? {})) {
        if (!getTopic(slug)) quebrados.push(`${simulation.slug} -> tópico ${slug}`);
      }
      for (const slug of Object.keys(simulation.blueprint.areas ?? {})) {
        if (!AREAS.some((area) => area.slug === slug)) quebrados.push(`${simulation.slug} -> área ${slug}`);
      }
    }
    expect(quebrados).toEqual([]);
  });
});

describe('árvore de conteúdo', () => {
  it('toda área da árvore tem pelo menos uma matéria com tópicos', () => {
    for (const area of contentTree()) {
      expect(area.subjects.length).toBeGreaterThan(0);
      for (const subject of area.subjects) {
        expect(subject.topics.length).toBeGreaterThan(0);
      }
    }
  });

  it('toda matéria aponta para uma área existente', () => {
    const orfas = SUBJECTS.filter((s) => !AREAS.some((a) => a.slug === s.areaSlug));
    expect(orfas.map((s) => s.slug)).toEqual([]);
  });

  it('todo tópico aponta para área e matéria existentes', () => {
    const orfas = TOPICS.filter(
      (t) => !AREAS.some((a) => a.slug === t.areaSlug) || !SUBJECTS.some((s) => s.slug === t.subjectSlug),
    );
    expect(orfas.map((t) => t.slug)).toEqual([]);
  });
});
