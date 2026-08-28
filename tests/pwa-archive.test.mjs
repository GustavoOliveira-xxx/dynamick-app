import { readFile, readdir } from 'node:fs/promises';
import { describe, it, expect } from './run.mjs';
import { ENEM_ARCHIVE, ENEM_ARCHIVE_SOURCE } from '../js/data/enem-archive.js';

describe('arquivo oficial do ENEM', () => {
  it('reúne todas as 16 edições de 2025 a 2010', () => {
    expect(ENEM_ARCHIVE.map((edition) => edition.year)).toEqual([
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018,
      2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
    ]);
  });

  it('cada edição aponta para sua página oficial no INEP', () => {
    const invalidas = ENEM_ARCHIVE.filter(
      (edition) => edition.url !== `${ENEM_ARCHIVE_SOURCE}/${edition.year}`,
    );
    expect(invalidas).toEqual([]);
  });
});

describe('aplicativo instalável', () => {
  it('o manifesto usa modo standalone e possui ícones e atalhos', async () => {
    const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
    expect(manifest.icons.some((icon) => icon.src === 'assets/brand/app-icon-512.png')).toBe(true);
    expect(manifest.shortcuts).toHaveLength(3);
  });

  it('todas as páginas HTML ligam o manifesto e o registro PWA', async () => {
    const root = new URL('../', import.meta.url);
    const names = (await readdir(root)).filter((name) => name.endsWith('.html'));
    const invalidas = [];
    for (const name of names) {
      const html = await readFile(new URL(name, root), 'utf8');
      if (!html.includes('rel="manifest"') || !html.includes('js/pwa.js')) invalidas.push(name);
    }
    expect(names).toHaveLength(21);
    expect(invalidas).toEqual([]);
  });

  it('o service worker inclui o arquivo ENEM e a página offline', async () => {
    const source = await readFile(new URL('../service-worker.js', import.meta.url), 'utf8');
    expect(source).toContain("'./enems.html'");
    expect(source).toContain("'./offline.html'");
    expect(source).toContain("'./assets/brand/app-icon-512.png'");
  });
});
