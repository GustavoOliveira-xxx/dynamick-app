







const ESC = '[';
const GREEN = `${ESC}32m`;
const RED = `${ESC}31m`;
const DIM = `${ESC}2m`;
const RESET = `${ESC}0m`;

const suites = [];
let currentSuite = null;

export function describe(name, fn) {
  currentSuite = { name, tests: [] };
  suites.push(currentSuite);
  fn();
  currentSuite = null;
}

export function it(name, fn) {
  if (!currentSuite) throw new Error('it() precisa estar dentro de describe()');
  currentSuite.tests.push({ name, fn });
}

function format(value) {
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  return String(value);
}

export function expect(actual) {
  return {
    toBe(expected) {
      if (!Object.is(actual, expected)) {
        throw new Error(`esperava ${format(expected)}, recebeu ${format(actual)}`);
      }
    },
    toEqual(expected) {
      const a = JSON.stringify(actual);
      const b = JSON.stringify(expected);
      if (a !== b) throw new Error(`esperava ${b}, recebeu ${a}`);
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) throw new Error(`esperava > ${expected}, recebeu ${actual}`);
    },
    toBeGreaterThanOrEqual(expected) {
      if (!(actual >= expected)) throw new Error(`esperava >= ${expected}, recebeu ${actual}`);
    },
    toBeLessThan(expected) {
      if (!(actual < expected)) throw new Error(`esperava < ${expected}, recebeu ${actual}`);
    },
    toBeLessThanOrEqual(expected) {
      if (!(actual <= expected)) throw new Error(`esperava <= ${expected}, recebeu ${actual}`);
    },
    toContain(expected) {
      const ok =
        Array.isArray(actual) || typeof actual === 'string' ? actual.includes(expected) : false;
      if (!ok) throw new Error(`esperava que ${format(actual)} contivesse ${format(expected)}`);
    },
    notToContain(expected) {
      const has =
        Array.isArray(actual) || typeof actual === 'string' ? actual.includes(expected) : false;
      if (has) throw new Error(`esperava que ${format(actual)} NAO contivesse ${format(expected)}`);
    },
    toHaveLength(expected) {
      if (actual?.length !== expected) {
        throw new Error(`esperava comprimento ${expected}, recebeu ${actual?.length}`);
      }
    },
    toBeTruthy() {
      if (!actual) throw new Error(`esperava valor verdadeiro, recebeu ${format(actual)}`);
    },
    toBeFalsy() {
      if (actual) throw new Error(`esperava valor falso, recebeu ${format(actual)}`);
    },
    toBeNull() {
      if (actual !== null) throw new Error(`esperava null, recebeu ${format(actual)}`);
    },
  };
}

export async function run(files) {
  for (const file of files) await import(file);

  let passed = 0;
  const failures = [];

  for (const suite of suites) {
    console.log(`\n  ${suite.name}`);
    for (const test of suite.tests) {
      try {
        await test.fn();
        passed += 1;
        console.log(`    ${GREEN}ok${RESET}   ${test.name}`);
      } catch (error) {
        failures.push({ suite: suite.name, test: test.name, error });
        console.log(`    ${RED}FALHA${RESET} ${test.name}`);
        console.log(`         ${RED}${error.message}${RESET}`);
      }
    }
  }

  const total = passed + failures.length;
  console.log(`\n${DIM}${'-'.repeat(58)}${RESET}`);
  if (failures.length === 0) {
    console.log(`${GREEN}${total} testes, todos passando.${RESET}\n`);
  } else {
    console.log(`${RED}${failures.length} de ${total} testes falharam.${RESET}\n`);
  }
  return failures.length;
}
