import { run } from './run.mjs';

const files = [
  './profile.test.mjs',
  './recommendation.test.mjs',
  './mastery.test.mjs',
  './spaced.test.mjs',
  './simulation.test.mjs',
  './elimination.test.mjs',
  './simulados.test.mjs',
  './content.test.mjs',
  './answer-key.test.mjs',
  './pwa-archive.test.mjs',
  './sync.test.mjs',
];

const failures = await run(files.map((file) => new URL(file, import.meta.url).href));
process.exit(failures > 0 ? 1 : 0);
