/**
 * Renderizador de markdown leve — só o subconjunto usado no conteúdo-semente:
 * títulos, listas, tabelas, negrito, itálico, código e parágrafos.
 *
 * Escrito à mão em vez de trazer uma dependência: o conteúdo é editorial e
 * controlado, e nada aqui interpreta HTML bruto — o que elimina a superfície de XSS
 * apontada na §20.5 sem precisar de sanitizador.
 */

type Block =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered: boolean }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string };

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? '';

    if (!line.trim()) {
      index += 1;
      continue;
    }

    // Tabela
    if (line.trim().startsWith('|') && (lines[index + 1] ?? '').includes('---')) {
      const header = splitRow(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && (lines[index] ?? '').trim().startsWith('|')) {
        rows.push(splitRow(lines[index] ?? ''));
        index += 1;
      }
      blocks.push({ type: 'table', header, rows });
      continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1]!.length as 2 | 3 | 4,
        text: heading[2]!.trim(),
      });
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      blocks.push({ type: 'quote', text: line.slice(2).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !(lines[index] ?? '').startsWith('```')) {
        code.push(lines[index] ?? '');
        index += 1;
      }
      index += 1;
      blocks.push({ type: 'code', text: code.join('\n') });
      continue;
    }

    if (/^[-*•]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index] ?? '';
        const match = ordered ? /^\d+\.\s+(.*)$/.exec(current) : /^[-*•]\s+(.*)$/.exec(current);
        if (!match) break;
        items.push(match[1]!.trim());
        index += 1;
      }
      blocks.push({ type: 'list', items, ordered });
      continue;
    }

    // Parágrafo: junta linhas consecutivas
    const paragraph: string[] = [];
    while (index < lines.length && (lines[index] ?? '').trim() && !isBlockStart(lines[index] ?? '')) {
      paragraph.push((lines[index] ?? '').trim());
      index += 1;
    }
    if (paragraph.length > 0) blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
    else index += 1;
  }

  return blocks;
}

function isBlockStart(line: string): boolean {
  return (
    /^#{2,4}\s/.test(line) ||
    /^[-*•]\s/.test(line) ||
    /^\d+\.\s/.test(line) ||
    line.trim().startsWith('|') ||
    line.startsWith('> ') ||
    line.startsWith('```')
  );
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

/** Formatação inline: **negrito**, *itálico* e `código`. Nada de HTML bruto. */
function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${counter++}`;

    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className="rounded-sm bg-[color:var(--ck-bg-raised)] px-1 py-0.5 font-mono text-[0.88em]">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function Markdown({ source }: { source: string }) {
  const blocks = parseBlocks(source);

  return (
    <div className="ck-reading space-y-3">
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === 'heading') {
          const Tag = `h${block.level}` as 'h2' | 'h3' | 'h4';
          const size = block.level === 2 ? 'text-lg' : block.level === 3 ? 'text-base' : 'text-sm';
          return (
            <Tag key={key} className={`mt-5 font-semibold ${size}`}>
              {inline(block.text, key)}
            </Tag>
          );
        }

        if (block.type === 'paragraph') {
          return <p key={key}>{inline(block.text, key)}</p>;
        }

        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag key={key} className={`space-y-1.5 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>
              ))}
            </Tag>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={key}
              className="border-l-2 pl-4 text-ink-secondary"
              style={{ borderColor: 'var(--ck-teal)' }}
            >
              {inline(block.text, key)}
            </blockquote>
          );
        }

        if (block.type === 'code') {
          return (
            <pre
              key={key}
              className="overflow-x-auto rounded-md border border-line bg-[color:var(--ck-bg-raised)] p-3 font-mono text-xs"
            >
              {block.text}
            </pre>
          );
        }

        // Tabelas rolam no próprio contêiner: a página nunca rola na horizontal.
        return (
          <div key={key} className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead>
                <tr>
                  {block.header.map((cell, cellIndex) => (
                    <th
                      key={`${key}-h-${cellIndex}`}
                      className="border-b border-line-strong px-3 py-2 text-left font-semibold"
                    >
                      {inline(cell, `${key}-h-${cellIndex}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={`${key}-r-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${key}-r-${rowIndex}-${cellIndex}`}
                        className="border-b border-line px-3 py-2 align-top text-ink-secondary"
                      >
                        {inline(cell, `${key}-r-${rowIndex}-${cellIndex}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
