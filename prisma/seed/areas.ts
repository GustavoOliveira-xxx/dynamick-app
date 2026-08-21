import type { SeedArea, SeedSubject } from './types';

export const AREAS: SeedArea[] = [
  {
    slug: 'linguagens',
    name: 'Linguagens, Códigos e suas Tecnologias',
    shortName: 'Linguagens',
    summary:
      'Leitura, interpretação, gêneros textuais, variação linguística, argumentação e literatura.',
    accent: 'cyan',
    order: 1,
  },
  {
    slug: 'matematica',
    name: 'Matemática e suas Tecnologias',
    shortName: 'Matemática',
    summary:
      'Proporção, porcentagem, funções, geometria, estatística, probabilidade e leitura de dados.',
    accent: 'green',
    order: 2,
  },
  {
    slug: 'ciencias-humanas',
    name: 'Ciências Humanas e suas Tecnologias',
    shortName: 'Ciências Humanas',
    summary:
      'História, geografia, filosofia e sociologia aplicadas a situações concretas e atuais.',
    accent: 'lime',
    order: 3,
  },
  {
    slug: 'ciencias-natureza',
    name: 'Ciências da Natureza e suas Tecnologias',
    shortName: 'Ciências da Natureza',
    summary: 'Biologia, física e química com foco em fenômenos, energia, matéria e ambiente.',
    accent: 'teal',
    order: 4,
  },
];

export const SUBJECTS: SeedSubject[] = [
  {
    slug: 'lingua-portuguesa',
    name: 'Língua Portuguesa',
    summary: 'Leitura, interpretação, coesão, gêneros e usos da língua.',
    areaSlug: 'linguagens',
    order: 1,
  },
  {
    slug: 'literatura',
    name: 'Literatura',
    summary: 'Literatura brasileira, recursos expressivos e contexto histórico.',
    areaSlug: 'linguagens',
    order: 2,
  },
  {
    slug: 'producao-textual',
    name: 'Produção Textual e Redação',
    summary: 'Tese, argumentação, repertório, coesão e proposta de intervenção.',
    areaSlug: 'linguagens',
    order: 3,
  },
  {
    slug: 'matematica',
    name: 'Matemática',
    summary: 'Proporção, funções, geometria, estatística e matemática financeira.',
    areaSlug: 'matematica',
    order: 1,
  },
  {
    slug: 'historia',
    name: 'História',
    summary: 'Processos históricos do Brasil e do mundo e seus efeitos no presente.',
    areaSlug: 'ciencias-humanas',
    order: 1,
  },
  {
    slug: 'geografia',
    name: 'Geografia',
    summary: 'Espaço, população, urbanização, cartografia e questões ambientais.',
    areaSlug: 'ciencias-humanas',
    order: 2,
  },
  {
    slug: 'filosofia',
    name: 'Filosofia',
    summary: 'Ética, política, conhecimento e argumentação filosófica.',
    areaSlug: 'ciencias-humanas',
    order: 3,
  },
  {
    slug: 'sociologia',
    name: 'Sociologia',
    summary: 'Sociedade, cidadania, trabalho, cultura e desigualdade.',
    areaSlug: 'ciencias-humanas',
    order: 4,
  },
  {
    slug: 'biologia',
    name: 'Biologia',
    summary: 'Ecologia, genética, saúde, células e seres vivos.',
    areaSlug: 'ciencias-natureza',
    order: 1,
  },
  {
    slug: 'fisica',
    name: 'Física',
    summary: 'Mecânica, energia, eletricidade e ondas.',
    areaSlug: 'ciencias-natureza',
    order: 2,
  },
  {
    slug: 'quimica',
    name: 'Química',
    summary: 'Transformações químicas, soluções, estequiometria e química ambiental.',
    areaSlug: 'ciencias-natureza',
    order: 3,
  },
];
