#!/usr/bin/env node
/**
 * Verificador de imports.
 *
 * Em módulos ES, importar um nome que não existe é erro de LINK: a página inteira
 * deixa de carregar, sem mensagem útil na interface. Esta checagem pega isso antes
 * de chegar ao navegador — é o equivalente prático do typecheck que o projeto não tem.
 *
 * Também aponta imports não utilizados, que costumam indicar código morto.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve, extname } from 'node:path';

const ROOT = process.cwd();
const JS_DIR = join(ROOT, 'js');

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (extname(full) === '.js') files.push(full);
  }
  return files;
}

const files = walk(JS_DIR);
const problems = [];
const warnings = [];

/** Nomes exportados por um arquivo. */
function exportsOf(file) {
  const source = readFileSync(file, 'utf8');
  const names = new Set();

  for (const match of source.matchAll(/^export\s+(?:async\s+)?function\s+(\w+)/gm)) names.add(match[1]);
  for (const match of source.matchAll(/^export\s+(?:const|let|var)\s+(\w+)/gm)) names.add(match[1]);
  for (const match of source.matchAll(/^export\s+class\s+(\w+)/gm)) names.add(match[1]);
  for (const match of source.matchAll(/^export\s*\{([^}]+)\}/gm)) {
    for (const part of match[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name) names.add(name);
    }
  }
  if (/^export\s+default/m.test(source)) names.add('default');

  return names;
}

const exportCache = new Map();
function cachedExports(file) {
  if (!exportCache.has(file)) exportCache.set(file, exportsOf(file));
  return exportCache.get(file);
}

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);

  // import { a, b } from './x.js'
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const specifier = match[2];
    if (!specifier.startsWith('.')) continue;

    const target = resolve(dirname(file), specifier);
    if (!existsSync(target)) {
      problems.push(`${rel}: importa de "${specifier}", que não existe`);
      continue;
    }

    const available = cachedExports(target);
    for (const raw of match[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/)[0].trim();
      if (!name) continue;
      if (!available.has(name)) {
        problems.push(
          `${rel}: importa "${name}" de ${relative(ROOT, target)}, que não exporta esse nome`,
        );
      }
    }
  }

  // import x from './y.js' (default)
  for (const match of source.matchAll(/import\s+(\w+)\s+from\s*['"](\.[^'"]+)['"]/g)) {
    const target = resolve(dirname(file), match[2]);
    if (!existsSync(target)) {
      problems.push(`${rel}: importa de "${match[2]}", que não existe`);
      continue;
    }
    if (!cachedExports(target).has('default')) {
      problems.push(`${rel}: importa default de ${relative(ROOT, target)}, que não tem export default`);
    }
  }

  // Imports declarados e nunca usados
  for (const match of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][^'"]+['"]/g)) {
    for (const raw of match[1].split(',')) {
      const name = raw.trim().split(/\s+as\s+/).pop().trim();
      if (!name) continue;
      const body = source.slice(source.indexOf('\n', match.index + match[0].length));
      const used = new RegExp(`\\b${name}\\b`).test(body);
      if (!used) warnings.push(`${rel}: importa "${name}" e não usa`);
    }
  }
}

console.log(`\nVerificação de imports — ${files.length} módulos\n`);

if (problems.length === 0) {
  console.log('  Nenhum import quebrado.');
} else {
  console.log(`  ${problems.length} problema(s):`);
  for (const problem of problems) console.log(`   - ${problem}`);
}

if (warnings.length > 0) {
  console.log(`\n  ${warnings.length} aviso(s):`);
  for (const warning of warnings) console.log(`   - ${warning}`);
}

console.log('');
process.exit(problems.length > 0 ? 1 : 0);
