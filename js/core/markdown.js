/**
 * Renderizador de markdown leve — só o subconjunto usado no conteúdo editorial:
 * títulos, listas, tabelas, citação, código, negrito, itálico e código inline.
 *
 * Escrito à mão em vez de trazer uma dependência: o conteúdo é controlado e nada aqui
 * interpreta HTML bruto, o que elimina a superfície de XSS sem sanitizador.
 * Devolve um DocumentFragment, não string.
 */

import { el, frag } from './dom.js';

export function markdown(source) {
  if (!source) return frag();
  const lines = String(source).replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    // Tabela
    if (line.trim().startsWith('|') && (lines[index + 1] ?? '').includes('---')) {
      const header = splitRow(line);
      const rows = [];
      index += 2;
      while (index < lines.length && (lines[index] ?? '').trim().startsWith('|')) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      blocks.push(tableBlock(header, rows));
      continue;
    }

    // Título
    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      blocks.push(el(`h${level}`, { class: 'md-heading' }, inline(heading[2].trim())));
      index += 1;
      continue;
    }

    // Citação
    if (line.startsWith('> ')) {
      blocks.push(el('blockquote', { class: 'md-quote' }, inline(line.slice(2).trim())));
      index += 1;
      continue;
    }

    // Bloco de código
    if (line.startsWith('```')) {
      const code = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? '').startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(el('pre', { class: 'md-code' }, el('code', {}, code.join('\n'))));
      continue;
    }

    // Lista
    if (/^[-*•]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items = [];
      while (index < lines.length) {
        const current = lines[index] ?? '';
        const match = ordered ? /^\d+\.\s+(.*)$/.exec(current) : /^[-*•]\s+(.*)$/.exec(current);
        if (!match) break;
        items.push(el('li', {}, inline(match[1].trim())));
        index += 1;
      }
      blocks.push(el(ordered ? 'ol' : 'ul', { class: 'md-list' }, items));
      continue;
    }

    // Parágrafo: junta linhas consecutivas
    const paragraph = [];
    while (index < lines.length && (lines[index] ?? '').trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length > 0) {
      blocks.push(el('p', {}, inline(paragraph.join(' '))));
    } else {
      index += 1;
    }
  }

  return frag(blocks);
}

function isBlockStart(line) {
  return (
    /^#{2,4}\s/.test(line) ||
    /^[-*•]\s/.test(line) ||
    /^\d+\.\s/.test(line) ||
    line.trim().startsWith('|') ||
    line.startsWith('> ') ||
    line.startsWith('```')
  );
}

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function tableBlock(header, rows) {
  return el(
    'div',
    { class: 'table-wrap' },
    el(
      'table',
      { class: 'table' },
      el('thead', {}, el('tr', {}, header.map((cell) => el('th', {}, inline(cell))))),
      el('tbody', {}, rows.map((row) => el('tr', {}, row.map((cell) => el('td', {}, inline(cell)))))),
    ),
  );
}

/** Formatação inline: **negrito**, *itálico* e `código`. Nada de HTML bruto. */
function inline(text) {
  const nodes = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];

    if (token.startsWith('**')) {
      nodes.push(el('strong', {}, token.slice(2, -2)));
    } else if (token.startsWith('`')) {
      nodes.push(el('code', { class: 'md-inline-code' }, token.slice(1, -1)));
    } else {
      nodes.push(el('em', {}, token.slice(1, -1)));
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
