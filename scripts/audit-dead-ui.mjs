#!/usr/bin/env node
/**
 * Auditoria exigida pela §21 (item 12) e pela §20.1 do prompt mestre.
 *
 * Procura, em todo o código de interface:
 *  - links href="#" ou vazios;
 *  - botões sem onClick, type=submit, form ou action;
 *  - handlers vazios (onClick={() => {}});
 *  - console.log esquecido;
 *  - TODO / FIXME;
 *  - rotas internas referenciadas que não existem no app router;
 *  - componentes nunca importados.
 *
 * Sai com código 1 se encontrar algo que exija correção.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const APP = join(SRC, 'app');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (['.ts', '.tsx'].includes(extname(full))) files.push(full);
  }
  return files;
}

const files = walk(SRC);
const problems = [];
const warnings = [];

function add(list, file, line, message) {
  list.push(`${relative(ROOT, file)}:${line} — ${message}`);
}

// ---- 1. Varredura textual por arquivo ----
/**
 * Remove comentários antes da varredura textual.
 * Sem isso a auditoria acusa a própria documentação — um comentário que menciona
 * href="#" para explicar a regra vira falso positivo.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/.*$/gm, (match, prefix) => prefix + ' '.repeat(Math.max(0, match.length - prefix.length)));
}

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const content = stripComments(raw);
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const number = index + 1;

    if (/href=["']#["']/.test(line)) add(problems, file, number, 'link com href="#" (não navega)');
    if (/href=["']["']/.test(line)) add(problems, file, number, 'link com href vazio');
    if (/onClick=\{\s*\(\s*\)\s*=>\s*\{\s*\}\s*\}/.test(line)) {
      add(problems, file, number, 'handler onClick vazio');
    }
    if (/console\.log\(/.test(line) && !file.includes('scripts')) {
      add(problems, file, number, 'console.log esquecido');
    }
    if (/\b(TODO|FIXME|XXX)\b/.test(line) && !line.includes('audit-dead-ui')) {
      add(warnings, file, number, `marcador pendente: ${line.trim().slice(0, 80)}`);
    }
    if (/catch\s*\(\s*\w*\s*\)\s*\{\s*\}/.test(line)) {
      add(problems, file, number, 'try/catch vazio esconde erro');
    }
  });

  // Botões sem ação: <button> sem type=submit, onClick, form ou name
  const buttonMatches = content.matchAll(/<button\b([^>]*)>/g);
  for (const match of buttonMatches) {
    const attrs = match[1] ?? '';
    const hasAction =
      /type=["']submit["']/.test(attrs) ||
      /onClick=/.test(attrs) ||
      /form=/.test(attrs) ||
      /\{\.\.\.rest\}/.test(attrs) ||
      /\{\.\.\.props\}/.test(attrs);
    if (!hasAction) {
      const line = content.slice(0, match.index).split('\n').length;
      add(problems, file, line, 'elemento <button> sem ação (nem submit, nem onClick, nem form)');
    }
  }
}

// ---- 2. Rotas internas referenciadas x rotas existentes ----
function collectRoutes(dir, prefix = '') {
  const routes = new Set();
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      // Grupos (pasta) não entram na URL
      const segment = entry.startsWith('(') && entry.endsWith(')') ? '' : `/${entry}`;
      for (const route of collectRoutes(full, `${prefix}${segment}`)) routes.add(route);
    } else if (entry === 'page.tsx' || entry === 'route.ts') {
      routes.add(prefix === '' ? '/' : prefix);
    }
  }
  return routes;
}

const routes = [...collectRoutes(APP)];

/** Converte /conteudos/[topico] em regex para casar com /conteudos/qualquer-coisa */
const routeMatchers = routes.map((route) => ({
  route,
  regex: new RegExp(`^${route.replace(/\[[^\]]+\]/g, '[^/]+')}$`),
}));

const referenced = new Set();
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/href=["'](\/[^"'?#]*)/g)) {
    referenced.add(match[1]);
  }
  for (const match of content.matchAll(/redirect\(\s*[`'"](\/[^`'"?#]*)/g)) {
    referenced.add(match[1]);
  }
}

for (const href of referenced) {
  // Ignora caminhos com interpolação de template
  if (href.includes('${')) continue;
  const matched = routeMatchers.some((matcher) => matcher.regex.test(href));
  if (!matched) problems.push(`rota referenciada mas inexistente: ${href}`);
}

// ---- 3. Componentes nunca importados ----
const componentFiles = files.filter((file) => file.includes(`${'/'}components${'/'}`));
for (const file of componentFiles) {
  const base = file.split('/').pop().replace(/\.tsx?$/, '');
  if (base === 'index') continue;
  const imported = files.some(
    (other) => other !== file && readFileSync(other, 'utf8').includes(`/${base}'`),
  );
  if (!imported) warnings.push(`componente possivelmente não utilizado: ${relative(ROOT, file)}`);
}

// ---- 4. Assets de marca ausentes (esperado enquanto as logos não chegam) ----
const brandDir = join(ROOT, 'public', 'assets', 'brand');
if (existsSync(brandDir)) {
  const assetsFile = readFileSync(join(SRC, 'components', 'brand', 'assets.ts'), 'utf8');
  const usingOfficial = /useOfficialAssets\s*=\s*true/.test(assetsFile);
  if (usingOfficial) {
    for (const brand of ['dynamick', 'conscious-knowledge']) {
      const dir = join(brandDir, brand);
      const has = existsSync(dir) && readdirSync(dir).some((file) => /\.(png|svg|webp)$/i.test(file));
      if (!has) problems.push(`useOfficialAssets=true mas não há imagem em public/assets/brand/${brand}/`);
    }
  } else {
    warnings.push('marca em modo fallback: useOfficialAssets=false (esperado até as logos chegarem)');
  }
}

// ---- Relatório ----
console.log(`\nAuditoria de interface — ${files.length} arquivos, ${routes.length} rotas\n`);

if (problems.length === 0) {
  console.log('✓ Nenhum problema bloqueante encontrado.');
} else {
  console.log(`✗ ${problems.length} problema(s):`);
  for (const problem of problems) console.log(`  - ${problem}`);
}

if (warnings.length > 0) {
  console.log(`\n⚠ ${warnings.length} aviso(s):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}

console.log('');
process.exit(problems.length > 0 ? 1 : 0);
