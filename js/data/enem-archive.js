export const ENEM_ARCHIVE_SOURCE =
  'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos';

export const ENEM_ARCHIVE = Array.from({ length: 16 }, (_, index) => {
  const year = 2025 - index;
  return {
    year,
    url: `${ENEM_ARCHIVE_SOURCE}/${year}`,
    source: 'Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira — INEP',
    contents: ['Cadernos de questões', 'Gabaritos oficiais'],
  };
});
