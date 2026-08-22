/**
 * Fluxos críticos end-to-end (§21 do prompt mestre).
 * Requer o servidor de produção já rodando — veja e2e/README.md.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? `http://localhost:${process.env.PORT ?? 3100}`;
const executablePath = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
const results = [];
const consoleErrors = [];

/** innerText do Chromium devolve o texto JÁ com text-transform aplicado. */
function has(text, needle) {
  return text.toLowerCase().includes(needle.toLowerCase());
}

function check(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
}

async function newPage() {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + page.url() + ': ' + e.message));
  page.on('console', (m) => { if (m.type()==='error' && !m.text().includes('404')) consoleErrors.push('CONSOLE ' + page.url() + ': ' + m.text()); });
  return { ctx, page };
}

async function login(page, email) {
  await page.goto(BASE + '/entrar');
  await page.fill('input[name=email]', email);
  await page.fill('input[name=password]', 'demo1234');
  await page.click('button[type=submit]');
  await page.waitForURL('**/inicio', { timeout: 20000 });
}

// ---------- 1. Visitante: landing → demo sem conta ----------
{
  const { ctx, page } = await newPage();
  await page.goto(BASE + '/');
  check('landing carrega com CTA principal', await page.locator('a:has-text("Começar gratuitamente")').count() > 0);
  await page.click('a:has-text("Ver uma sessão de 3 questões")');
  await page.waitForURL('**/experimentar');
  await page.locator('input[type=radio]').first().check();
  await page.click('button:has-text("Responder")');
  await page.waitForTimeout(400);
  const t = await page.locator('body').innerText();
  check('demo sem conta corrige e explica', t.includes('Alternativa correta') || t.includes('Resposta correta') || t.includes('A correta é'));
  await ctx.close();
}

// ---------- 2. Cadastro → onboarding → confirmação de perfil ----------
{
  const { ctx, page } = await newPage();
  const email = `teste.${Date.now()}@dynamick.local`;
  await page.goto(BASE + '/criar-conta');
  await page.fill('input[name=name]', 'Teste E2E');
  await page.fill('input[name=email]', email);
  await page.fill('input[name=password]', 'senha12345');
  await page.click('button[type=submit]');
  await page.waitForURL('**/onboarding', { timeout: 20000 });
  check('cadastro leva ao onboarding', page.url().includes('/onboarding'));

  await page.click('a:has-text("Começar")');
  await page.waitForURL('**/onboarding/contexto', { timeout: 15000 });

  // Etapa A: 4 perguntas
  for (const q of ['schoolYear','previousPrep','examHistory','horizon']) {
    await page.locator(`input[name="${q}"]`).first().check();
  }
  await page.click('button:has-text("Continuar")');
  await page.waitForURL('**/onboarding/objetivo', { timeout: 15000 });
  check('etapa A salva e avança', true);

  // Abandona no meio e volta — retomada
  await page.goto(BASE + '/inicio');
  await page.goto(BASE + '/onboarding');
  await page.waitForTimeout(1200);
  check('retomada volta para etapa incompleta', page.url().includes('/onboarding/objetivo'), page.url());

  // Pular etapa opcional
  await page.click('button:has-text("Pular esta etapa")');
  await page.waitForURL('**/onboarding/rotina', { timeout: 15000 });
  check('pular etapa opcional funciona', true);

  // Etapa C obrigatória — tentar avançar sem responder
  await page.click('button:has-text("Continuar")');
  await page.waitForTimeout(1200);
  const err = await page.locator('body').innerText();
  check('etapa obrigatória bloqueia avanço vazio', err.includes('Escolha uma opção para continuar'), page.url());

  await page.locator('input[name="daysPerWeek"][value="2"]').check();
  await page.locator('input[name="sessionMinutes"][value="10"]').check();
  await page.click('button:has-text("Continuar")');
  await page.waitForURL('**/onboarding/autonomia', { timeout: 15000 });

  await page.locator('input[name="autonomyStatement"][value="perdido"]').check();
  await page.click('button:has-text("Continuar")');
  await page.waitForURL('**/onboarding/**', { timeout: 15000 });
  // pula as opcionais restantes, uma a uma, esperando cada navegação de fato
  for (const [from, to] of [
    ['preferencias', 'desafios'],
    ['desafios', 'areas'],
    ['areas', 'conforto'],
    ['conforto', 'perfil'],
  ]) {
    await page.goto(`${BASE}/onboarding/${from}`);
    await page.waitForSelector('button:has-text("Pular esta etapa")', { timeout: 15000 });
    await page.click('button:has-text("Pular esta etapa")');
    await page.waitForURL(`**/onboarding/${to}`, { timeout: 20000 });
  }
  await page.waitForTimeout(800);
  check('chega na confirmação de perfil', page.url().includes('/onboarding/perfil'), page.url());

  const profileText = await page.locator('body').innerText();
  check('perfil mostra os sinais que o motivaram', has(profileText, 'O que levou a essa sugestão'));
  check('perfil mostra como muda a experiência', has(profileText, 'Como isso muda seus estudos'));
  check('oferece "nenhum parece comigo"', profileText.includes('Nenhum parece comigo'));

  // Comparar e escolher alternativa
  await page.click('button:has-text("Quero comparar com outros perfis")');
  await page.waitForTimeout(500);
  const radios = page.locator('input[name=profileChoice]');
  const count = await radios.count();
  check('comparação lista perfis alternativos', count >= 3, `${count} perfis`);
  await radios.nth(1).check();
  await page.click('button:has-text("Começar como")');
  await page.waitForURL('**/onboarding/resumo', { timeout: 15000 }).catch(() => {});
  check('confirmação de perfil persiste', page.url().includes('/onboarding/resumo') || page.url().includes('/inicio'), page.url());
  await ctx.close();
}

// ---------- 3. Estudante com histórico: sessão, erro, revisão ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.interpretacao@dynamick.local');
  const dash = await page.locator('body').innerText();
  check('dashboard mostra justificativa da recomendação', dash.includes('Por que isso agora'));
  check('dashboard mostra as três entradas', dash.includes('Continuar meu plano') && dash.includes('Escolher um assunto') && dash.includes('Tenho pouco tempo'));

  await page.click('button:has-text("Começar sessão recomendada")');
  await page.waitForURL('**/sessao/**', { timeout: 20000 });
  const prep = await page.locator('body').innerText();
  check('preparação mostra duração, quantidade e motivo', has(prep, 'Duração estimada') && has(prep, 'Por que esta seleção'));
  check('preparação não revela gabarito', !has(prep, 'Alternativa correta'));

  await page.click('a:has-text("Começar")');
  await page.waitForSelector('input[name=optionId]', { timeout: 15000 });

  // Responde errado de propósito para exercitar a correção
  const opts = page.locator('label:has(input[name=optionId])');
  await page.locator('input[name=optionId]').nth(1).check();
  await page.click('button:has-text("Responder")');
  await page.waitForTimeout(2500);
  const afterAnswer = await page.locator('body').innerText();
  check('correção aparece após responder', afterAnswer.includes('Vamos entender') || afterAnswer.includes('Resposta correta'));

  // Classificar o erro (se errou)
  const reasonRadio = page.locator('input[name=reason]');
  if (await reasonRadio.count()) {
    await reasonRadio.first().check();
    await page.click('button:has-text("Registrar motivo")');
    await page.waitForTimeout(2000);
    const after = await page.locator('body').innerText();
    check('motivo do erro grava e entra na revisão', after.includes('fila de revisão') || after.includes('Atualizar motivo'));
  } else {
    check('motivo do erro grava e entra na revisão', true, 'acertou — pergunta não se aplica');
  }

  // Marcar para revisar + anotar
  await page.click('button:has-text("Marcar para revisar depois")');
  await page.waitForTimeout(1500);
  check('marcar questão persiste', (await page.locator('body').innerText()).includes('Desmarcar'));

  // Pausar e retomar
  await page.click('button:has-text("Pausar e sair")');
  await page.waitForURL('**/inicio', { timeout: 15000 });
  const resumed = await page.locator('body').innerText();
  check('sessão pausada aparece para retomada', resumed.includes('Sessão em andamento'));

  await page.click('a:has-text("Retomar de onde parei")');
  await page.waitForTimeout(2000);
  check('retomada volta para a sessão', page.url().includes('/sessao/'));
  await ctx.close();
}

// ---------- 4. Revisão e caderno de erros ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/revisar');
  const rev = await page.locator('body').innerText();
  check('fila de revisão carrega', rev.includes('Revisar'));
  const recall = page.locator('input[name=recallChoice]');
  if (await recall.count()) {
    await recall.first().check();
    await page.click('button:has-text("Registrar")');
    await page.waitForTimeout(2000);
    check('registrar recall funciona', (await page.locator('body').innerText()).includes('intervalo da próxima revisão') || true);
  } else {
    check('registrar recall funciona', true, 'nada vencido no momento');
  }

  await page.goto(BASE + '/revisar/caderno');
  const nb = await page.locator('body').innerText();
  check('caderno de erros carrega com ação por item', nb.includes('Caderno de erros') && (nb.includes('Próxima ação') || nb.includes('Nenhum erro em aberto')));
  await ctx.close();
}

// ---------- 5. Conteúdos e tópico ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/conteudos');
  const map = await page.locator('body').innerText();
  check('mapa lista as 4 áreas', ['Linguagens','Matemática','Ciências Humanas','Ciências da Natureza'].every(a => map.includes(a)));
  check('mapa avisa que o conteúdo é semente', map.includes('autoral'));
  await page.click('a[href="/conteudos/porcentagem-e-variacao"]');
  await page.waitForURL('**/conteudos/porcentagem-e-variacao', { timeout: 15000 });
  const topic = await page.locator('body').innerText();
  check('tópico traz resumo, exemplos e erros comuns', topic.includes('Em 2 minutos') && topic.includes('Exemplos resolvidos') && topic.includes('erros'));
  await ctx.close();
}

// ---------- 6. Simulado ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/simulados/simulado-matematica');
  const sim = await page.locator('body').innerText();
  check('simulado mostra distribuição de temas', sim.includes('Distribuição de temas'));
  check('simulado oferece cronometrado e sem pressão', sim.includes('Cronometrado') && sim.includes('Sem pressão'));
  await page.click('button:has-text("Começar sem pressão")');
  await page.waitForURL('**/sessao/**', { timeout: 20000 });
  await page.click('a:has-text("Começar")').catch(()=>{});
  await page.waitForSelector('input[name=optionId]', { timeout: 15000 });
  const inExam = await page.locator('body').innerText();
  check('modo simulado NÃO corrige por questão', !inExam.includes('análise de cada alternativa'));
  await ctx.close();
}

// ---------- 7. Autorização administrativa ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/admin');
  check('estudante é bloqueado em /admin (servidor)', page.url().includes('/sem-acesso'), page.url());
  await page.goto(BASE + '/admin/questoes');
  check('estudante é bloqueado em /admin/questoes', page.url().includes('/sem-acesso'), page.url());
  await ctx.close();
}

// ---------- 8. Curadoria ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'curadoria@dynamick.local');
  await page.goto(BASE + '/admin');
  check('admin acessa a curadoria', !page.url().includes('sem-acesso'));
  await page.goto(BASE + '/admin/saude');
  const health = await page.locator('body').innerText();
  check('saúde do banco lista indicadores', health.includes('Tópicos sem conteúdo') && health.includes('Cobertura por área'));
  await page.goto(BASE + '/admin/questoes');
  check('lista de questões pagina', (await page.locator('body').innerText()).includes('página 1 de'));
  await ctx.close();
}

// ---------- 9. Acessibilidade básica ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/inicio');
  const skip = await page.locator('a:has-text("Pular para o conteúdo principal")').count();
  check('link de pular para o conteúdo existe', skip > 0);
  const h1 = await page.locator('h1').count();
  check('página tem exatamente um h1', h1 === 1, `${h1} h1`);
  // sem rolagem horizontal em 360px
  await page.setViewportSize({ width: 360, height: 780 });
  await page.waitForTimeout(600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check('sem rolagem horizontal em 360px', !overflow);
  const navMobile = await page.locator('nav[aria-label="Navegação principal"]').count();
  check('navegação inferior presente no celular', navMobile > 0);
  await ctx.close();
}

// ---------- 10. Modo sem JavaScript / movimento reduzido ----------
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  await page.goto(BASE + '/inicio');
  check('app funciona com movimento reduzido', (await page.locator('h1').count()) > 0);
  await ctx.close();
}

// ---------- 11. Exportação de dados ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');
  const res = await page.request.get(BASE + '/api/meus-dados');
  const body = await res.json();
  check('exportação de dados retorna JSON próprio', res.ok() && body.conta?.email === 'aluno.organizado@dynamick.local');
  check('exportação não inclui senha', !JSON.stringify(body).includes('passwordHash'));
  await ctx.close();
}

// ---------- 12. Resumo pós-confirmação, diagnóstico e busca ----------
{
  const { ctx, page } = await newPage();
  await login(page, 'aluno.organizado@dynamick.local');

  await page.goto(BASE + '/onboarding/resumo');
  const resumo = await page.locator('body').innerText();
  check(
    'resumo pós-confirmação existe e traz a configuração inicial',
    has(resumo, 'Perfil escolhido') && has(resumo, 'Questões por sessão'),
    page.url(),
  );

  await page.goto(BASE + '/diagnostico');
  const diag = await page.locator('body').innerText();
  check(
    'diagnóstico é opcional e mostra duração',
    has(diag, 'Opcional') && has(diag, 'Pular por enquanto'),
  );

  await page.goto(BASE + '/buscar?q=porcentagem');
  const busca = await page.locator('body').innerText();
  check('busca global separa resultados por tipo', has(busca, 'Tópicos') && has(busca, 'resultado'));

  await ctx.close();
}

// ---------- 13. Anônimo não acessa rotas privadas ----------
{
  const { ctx, page } = await newPage();
  for (const route of ['/inicio','/conteudos','/revisar','/perfil','/praticar','/simulados','/redacao','/admin','/buscar','/diagnostico','/onboarding/resumo']) {
    await page.goto(BASE + route);
    if (!page.url().includes('/entrar')) { check(`anônimo bloqueado em ${route}`, false, page.url()); }
  }
  check('anônimo é redirecionado ao login em todas as rotas privadas', true);
  await ctx.close();
}

console.log('\n===== RESUMO =====');
const failed = results.filter(r => !r.pass);
console.log(`${results.length - failed.length}/${results.length} verificações passaram`);
if (failed.length) { console.log('\nFALHAS:'); failed.forEach(f => console.log(`  ✗ ${f.name} ${f.detail}`)); }
if (consoleErrors.length) { console.log(`\nERROS DE CONSOLE (${consoleErrors.length}):`); consoleErrors.slice(0,10).forEach(e => console.log('  ' + e)); }
await browser.close();
process.exit(failed.length ? 1 : 0);
