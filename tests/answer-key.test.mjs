/**
 * O gabarito não pode ser previsível.
 *
 * O material foi escrito com a resposta correta quase sempre na primeira posição.
 * Se isso voltar, quem marca sempre a letra A acerta a maioria sem ler — e todo o
 * resto do sistema (domínio, motivo do erro, recomendação) passa a medir ruído.
 * Estes testes travam a correção feita na montagem do catálogo.
 */

import { describe, it, expect } from './run.mjs';
import { QUESTIONS, TOPICS, getQuestion } from '../js/data/content.js';

const letra = (question) => question.options.find((option) => option.isCorrect).label;

describe('distribuição do gabarito', () => {
  it('nenhuma posição concentra mais de 30% das respostas corretas', () => {
    const contagem = {};
    for (const question of QUESTIONS) contagem[letra(question)] = (contagem[letra(question)] ?? 0) + 1;

    const maior = Math.max(...Object.values(contagem));
    const proporcao = maior / QUESTIONS.length;
    if (proporcao > 0.3) {
      throw new Error(
        `uma posição concentra ${Math.round(proporcao * 100)}% dos gabaritos: ${JSON.stringify(contagem)}`,
      );
    }
  });

  it('todas as cinco posições são usadas como gabarito', () => {
    const usadas = new Set(QUESTIONS.map(letra));
    expect([...usadas].sort().join('')).toBe('ABCDE');
  });

  it('nenhum tópico tem gabarito único', () => {
    const iguais = TOPICS.filter((topic) => {
      const letras = new Set(topic.questions.map((question) => letra(getQuestion(question.slug))));
      return topic.questions.length > 2 && letras.size === 1;
    });
    expect(iguais.map((topic) => topic.slug)).toEqual([]);
  });

  it('nenhum tópico repete a mesma posição quatro vezes seguidas', () => {
    const problemas = [];
    for (const topic of TOPICS) {
      const letras = topic.questions.map((question) => letra(getQuestion(question.slug)));
      let sequencia = 1;
      for (let i = 1; i < letras.length; i += 1) {
        sequencia = letras[i] === letras[i - 1] ? sequencia + 1 : 1;
        if (sequencia >= 4) problemas.push(`${topic.slug}: ${letras.join('')}`);
      }
    }
    expect(problemas).toEqual([]);
  });

  it('tópicos diferentes não repetem a mesma sequência de gabaritos', () => {
    const sequencias = new Map();
    for (const topic of TOPICS) {
      const chave = topic.questions.map((question) => letra(getQuestion(question.slug))).join('');
      const anterior = sequencias.get(chave);
      // Duas repetições são aceitáveis com poucos tópicos; três já vira padrão perceptível.
      sequencias.set(chave, (anterior ?? 0) + 1);
    }
    const repetidas = [...sequencias.entries()].filter(([, total]) => total >= 3);
    expect(repetidas.map(([chave]) => chave)).toEqual([]);
  });
});

describe('integridade após o rebalanceamento', () => {
  it('cada questão continua com exatamente uma alternativa correta', () => {
    const invalidas = QUESTIONS.filter(
      (question) => question.options.filter((option) => option.isCorrect).length !== 1,
    );
    expect(invalidas.map((question) => question.slug)).toEqual([]);
  });

  it('as etiquetas continuam em ordem e sem repetição', () => {
    const problemas = QUESTIONS.filter((question) => {
      const etiquetas = question.options.map((option) => option.label);
      const esperado = ['A', 'B', 'C', 'D', 'E'].slice(0, etiquetas.length);
      return etiquetas.join('') !== esperado.join('');
    });
    expect(problemas.map((question) => question.slug)).toEqual([]);
  });

  it('nenhum texto de alternativa se perdeu ou duplicou', () => {
    const problemas = QUESTIONS.filter((question) => {
      const textos = new Set(question.options.map((option) => option.text));
      return textos.size !== question.options.length;
    });
    expect(problemas.map((question) => question.slug)).toEqual([]);
  });

  it('cada texto continua com a justificativa que foi escrita para ele', () => {
    // A rotação move texto e justificativa juntos: um par quebrado é erro grave.
    const problemas = QUESTIONS.filter((question) =>
      question.options.some((option) => !option.text?.trim() || !option.rationale?.trim()),
    );
    expect(problemas.map((question) => question.slug)).toEqual([]);
  });

  it('a posição do gabarito é estável entre carregamentos', async () => {
    // Um gabarito que muda de posição quebraria revisão e caderno de erros.
    const outraCarga = await import(`../js/data/content.js?recarga=${Date.now()}`);
    const diferentes = QUESTIONS.filter(
      (question) => letra(question) !== letra(outraCarga.getQuestion(question.slug)),
    );
    expect(diferentes.map((question) => question.slug)).toEqual([]);
  });
});

describe('nenhum texto cita alternativa por letra', () => {
  it('explicações e justificativas não dependem da posição', () => {
    const padrao = /\b(alternativa|letra|opção)\s+[A-E]\b/i;
    const problemas = [];

    for (const question of QUESTIONS) {
      const textos = [
        question.stem,
        question.explanation?.summary,
        question.explanation?.detailed,
        question.explanation?.strategy,
        question.explanation?.conceptRecap,
        ...question.options.map((option) => option.rationale),
        ...question.options.map((option) => option.errorHint ?? ''),
      ];
      if (textos.some((texto) => texto && padrao.test(texto))) problemas.push(question.slug);
    }

    expect(problemas).toEqual([]);
  });
});
