import { el, render, uid } from '../core/dom.js';
import { navigate } from '../core/router.js';
import { badge, button, card, field, message, setButtonLoading, toast } from '../ui/components.js';
import { rubikCube } from '../ui/rubik-cube.js';
import { consciousKnowledgeLogo, dynamickLogo } from '../ui/brand.js';
import {
  continueAsGuest,
  createAccount,
  currentAccount,
  listAccounts,
  signIn,
  signOut,
  suportaSenha,
} from '../core/account.js';
import { student } from '../core/student.js';
import {
  codigoValido,
  contaExisteNoServidor,
  entrarComCodigo,
  entrarComSenha,
  formatarCodigo,
  registrarConta,
  syncDisponivel,
  vinculoDaConta,
} from '../core/sync.js';
import { relativeDays } from '../core/format.js';

const TABS = [
  { id: 'entrar', label: 'Entrar' },
  { id: 'criar', label: 'Criar conta' },
  { id: 'codigo', label: 'Tenho um código' },
];

function afterSignIn() {
  const status = student().onboardingStatus;
  navigate(status === 'not_started' ? '/onboarding' : '/inicio', { replace: true });
}

function cartaoContasLocais(accounts) {
  const error = el('div', { class: 'stack', 'aria-live': 'polite' });
  const identifierId = uid('conta');
  let selected = accounts[0].id;

  const passwordField = field({
    label: 'Senha',
    name: 'senha',
    type: 'password',
    autocomplete: 'current-password',
    hint: 'A senha protege esta conta neste navegador.',
  });
  passwordField.hidden = !accounts[0].protegida;

  const list = el(
    'ul',
    { class: 'account-list', role: 'radiogroup', 'aria-labelledby': identifierId },
    accounts.map((account) => {
      const id = uid('acc');
      const input = el('input', {
        type: 'radio',
        name: 'conta',
        id,
        value: account.id,
        checked: account.id === selected || undefined,
        onChange: () => {
          selected = account.id;

          passwordField.hidden = !account.protegida;
        },
      });

      return el(
        'li',
        {},
        el(
          'label',
          { class: 'account-list__item', for: id },
          input,
          el(
            'span',
            { class: 'account-list__body' },
            el('span', { class: 'account-list__name' }, account.name),
            el(
              'span',
              { class: 'xsmall muted' },
              account.email || 'sem e-mail',
              account.lastLoginAt ? ` · último acesso ${relativeDays(account.lastLoginAt)}` : '',
            ),
          ),
          account.protegida ? badge('com senha', 'teal') : badge('sem senha', 'neutral'),
        ),
      );
    }),
  );

  const submit = button({ label: 'Continuar', type: 'submit', variant: 'secondary' });

  const form = el(
    'form',
    {
      class: 'stack',
      novalidate: true,
      onSubmit: async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        render(error);
        setButtonLoading(submit, true, 'Entrando…');

        try {
          const password = form.elements.senha?.value ?? '';
          await signIn({ identifier: selected, password });
          toast('Bem-vindo de volta.', 'success');
          afterSignIn();
        } catch (problem) {
          setButtonLoading(submit, false);
          render(error, message('danger', 'Não foi possível entrar', el('p', {}, problem.message)));
          form.elements.senha?.focus();
        }
      },
    },
    el('p', { class: 'field__label', id: identifierId }, 'Contas guardadas neste aparelho'),
    list,
    passwordField,
    error,
    submit,
  );

  return card(
    {},
    el('h2', {}, 'Continuar sem digitar o e-mail'),
    el(
      'p',
      { class: 'small secondary' },
      'Estas contas já foram usadas neste navegador. Serve como atalho e funciona mesmo sem internet.',
    ),
    el('hr', { class: 'hairline' }),
    form,
  );
}

async function entrarLocalmente(email, senha) {
  try {
    const conta = await signIn({ identifier: email, password: senha });
    if (conta?.email && conta.protegida && syncDisponivel && !vinculoDaConta()) {
      registrarConta({ email: conta.email, senha }).catch(() => {});
    }
    return conta;
  } catch {
    return null;
  }
}

function cartaoEmailSenha() {
  const error = el('div', { 'aria-live': 'polite' });
  const submit = button({ label: 'Entrar', type: 'submit' });

  const form = el(
    'form',
    {
      class: 'stack',
      novalidate: true,
      onSubmit: async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        render(error);

        const dados = new FormData(form);
        const email = String(dados.get('email') ?? '').trim();
        const senha = String(dados.get('senha') ?? '');

        if (!email || !senha) {
          render(
            error,
            message('danger', 'Faltou preencher', el('p', {}, 'Digite o e-mail e a senha da sua conta.')),
          );
          return;
        }

        setButtonLoading(submit, true, 'Entrando…');

        try {
          const resultado = await entrarComSenha({ email, senha });
          toast(`Bem-vindo de volta, ${resultado.nome}. Seu progresso veio junto.`, 'success');
          afterSignIn();
          return;
        } catch (problema) {
          const local = await entrarLocalmente(email, senha);
          if (local) {
            toast('Entrou com a conta guardada neste aparelho.', 'success');
            afterSignIn();
            return;
          }
          setButtonLoading(submit, false);
          render(error, message('danger', 'Não foi possível entrar', el('p', {}, problema.message)));
        }
      },
    },
    field({
      label: 'E-mail',
      name: 'email',
      type: 'email',
      required: true,
      autocomplete: 'email',
      hint: 'O mesmo e-mail que você usou ao criar a conta.',
    }),
    field({
      label: 'Senha',
      name: 'senha',
      type: 'password',
      required: true,
      autocomplete: 'current-password',
    }),
    error,
    submit,
  );

  return card(
    { pad: 'lg' },
    el('h2', {}, 'Entrar'),
    el(
      'p',
      { class: 'small secondary' },
      'Funciona em qualquer aparelho: no computador, no celular ou no tablet. Seu progresso desce junto com a conta.',
    ),
    el('hr', { class: 'hairline' }),
    form,
  );
}

function cartaoPrimeiroAcesso(rerender) {
  return card(
    { pad: 'lg' },
    el('h2', {}, 'Ainda não há contas neste navegador'),
    el(
      'p',
      { class: 'small secondary' },
      'Uma conta do Dynamic CK guarda seu progresso. Crie a sua em menos de um minuto — ou traga o progresso de outro aparelho com um código de sincronização.',
    ),
    el(
      'div',
      { class: 'row', style: { marginTop: '1rem' } },
      button({ label: 'Criar minha conta', onClick: () => rerender('criar') }),
      button({
        label: 'Tenho um código',
        variant: 'secondary',
        onClick: () => rerender('codigo'),
      }),
    ),
  );
}

function signInPanel(accounts, rerender) {
  if (!syncDisponivel && accounts.length === 0) return cartaoPrimeiroAcesso(rerender);

  return el(
    'div',
    { class: 'stack' },
    syncDisponivel ? cartaoEmailSenha() : null,
    accounts.length > 0 ? cartaoContasLocais(accounts) : null,
    card(
      {},
      el(
        'p',
        { class: 'xsmall muted' },
        syncDisponivel
          ? 'Esqueceu a senha? A senha é a chave que abre seu pacote cifrado, e nem nós temos como abri-lo sem ela. Se ainda tiver a sessão aberta em outro aparelho, gere lá um código de sincronização em Perfil › Meus dados e use a aba "Tenho um código".'
          : 'Esta instalação está sem sincronização, então a conta vive só neste navegador. Se esquecer a senha, não temos como redefini-la.',
      ),
    ),
  );
}

function createPanel(rerender) {
  const error = el('div', { 'aria-live': 'polite' });
  const submit = button({ label: 'Criar conta e começar', type: 'submit' });

  const caixaSync = el('input', { type: 'checkbox', name: 'sincronizar', checked: true });

  const opcaoSync = syncDisponivel
    ? el(
        'label',
        { class: 'option' },
        caixaSync,
        el(
          'span',
          { class: 'option__body' },
          el('span', { class: 'option__label' }, 'Quero entrar nesta conta em outros aparelhos'),
          el(
            'span',
            { class: 'option__hint small muted' },
            'Guarda seu progresso cifrado com a sua senha. Precisa de e-mail e senha preenchidos, e depois basta entrar com eles no celular.',
          ),
        ),
      )
    : null;

  const form = el(
    'form',
    {
      class: 'stack',
      novalidate: true,
      onSubmit: async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        render(error);

        const data = new FormData(form);
        const nome = String(data.get('nome') ?? '');
        const email = String(data.get('email') ?? '').trim();
        const password = String(data.get('senha') ?? '');
        const confirm = String(data.get('senha2') ?? '');
        const querSincronizar = Boolean(opcaoSync && caixaSync.checked);

        if (password && password !== confirm) {
          render(error, message('danger', 'As senhas não são iguais', el('p', {}, 'Digite a mesma senha nos dois campos.')));
          return;
        }

        if (querSincronizar && !(email && password)) {
          render(
            error,
            message(
              'warning',
              'Para entrar em outros aparelhos, preencha e-mail e senha',
              el('p', {}, 'São eles que identificam e abrem sua conta no celular. Se preferir uma conta só deste navegador, desmarque a opção.'),
            ),
          );
          return;
        }

        setButtonLoading(submit, true, 'Criando…');

        try {
          if (querSincronizar && (await contaExisteNoServidor({ email, senha: password }))) {
            setButtonLoading(submit, false);
            render(
              error,
              message(
                'warning',
                'Essa conta já existe',
                el('p', {}, 'Já há uma conta salva com esse e-mail e essa senha. Use a aba "Entrar" para trazê-la para este aparelho com todo o progresso.'),
              ),
            );
            return;
          }
        } catch {

          setButtonLoading(submit, true, 'Criando…');
        }

        try {
          await createAccount({ name: nome, email, password });
        } catch (problem) {
          setButtonLoading(submit, false);
          render(error, message('danger', 'Não foi possível criar a conta', el('p', {}, problem.message)));
          return;
        }

        if (querSincronizar) {
          try {
            await registrarConta({ email, senha: password });
            toast('Conta criada. Você já pode entrar com ela no celular.', 'success');
          } catch (problema) {
            toast(
              `Conta criada neste navegador, mas não conseguimos guardá-la para outros aparelhos: ${problema.message}`,
              'warning',
              9000,
            );
          }
        } else {
          toast('Conta criada neste navegador.', 'success');
        }

        navigate('/onboarding', { replace: true });
      },
    },
    field({
      label: 'Como podemos te chamar?',
      name: 'nome',
      required: true,
      autocomplete: 'nickname',
      hint: 'Um apelido serve. Este nome aparece no seu início.',
    }),
    field({
      label: syncDisponivel ? 'E-mail' : 'E-mail (opcional)',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
      hint: syncDisponivel
        ? 'É o seu nome de usuário para entrar em outro aparelho. Não mandamos nada para ele.'
        : 'Serve só para diferenciar contas neste aparelho. Não enviamos nada para ele.',
    }),
    suportaSenha
      ? el(
          'div',
          { class: 'grid-2' },
          field({
            label: syncDisponivel ? 'Senha' : 'Senha (opcional)',
            name: 'senha',
            type: 'password',
            autocomplete: 'new-password',
            hint: 'A partir de 6 caracteres. É ela que abre seu progresso no celular.',
          }),
          field({
            label: 'Repita a senha',
            name: 'senha2',
            type: 'password',
            autocomplete: 'new-password',
          }),
        )
      : message(
          'info',
          'Senha indisponível neste endereço',
          el('p', {}, 'Proteger a senha com segurança exige uma conexão https. A conta funciona sem senha; ninguém fora deste navegador acessa seus dados.'),
        ),
    opcaoSync,
    error,
    submit,
  );

  return card(
    { pad: 'lg' },
    el('h2', {}, 'Criar conta'),
    el(
      'p',
      { class: 'small secondary' },
      'Só pedimos o que é usado. Nada é obrigatório além de um nome.',
    ),
    syncDisponivel
      ? el(
          'div',
          { class: 'account__ja-tenho' },
          el('p', { class: 'small' }, 'Já tem conta e está abrindo neste aparelho pela primeira vez?'),
          el(
            'div',
            { class: 'row', style: { marginTop: '0.5rem' } },
            button({
              label: 'Entrar com e-mail e senha',
              variant: 'secondary',
              size: 'sm',
              onClick: () => rerender('entrar'),
            }),
            button({
              label: 'Tenho um código',
              variant: 'ghost',
              size: 'sm',
              onClick: () => rerender('codigo'),
            }),
          ),
        )
      : null,
    el('hr', { class: 'hairline' }),
    form,
    el('hr', { class: 'hairline' }),
    el(
      'p',
      { class: 'xsmall muted' },
      syncDisponivel
        ? 'O que sobe é um pacote cifrado com a sua senha. Sem ela, nem nós conseguimos abrir o conteúdo.'
        : 'Sua conta e seu progresso ficam neste navegador. Para estudar também no celular, use "Sincronizar" dentro do perfil e leve o código para o outro aparelho.',
    ),
  );
}

function codePanel() {
  if (!syncDisponivel) {
    return card(
      { pad: 'lg' },
      el('h2', {}, 'Sincronização indisponível aqui'),
      el(
        'p',
        { class: 'small secondary' },
        'Esta instalação está publicada sem a parte de servidor que guarda o pacote cifrado, ou o navegador não oferece as funções de criptografia necessárias. Você pode criar uma conta local e estudar normalmente.',
      ),
    );
  }

  const error = el('div', { 'aria-live': 'polite' });
  const submit = button({ label: 'Trazer meu progresso', type: 'submit' });

  const form = el(
    'form',
    {
      class: 'stack',
      novalidate: true,
      onSubmit: async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        render(error);

        const codigo = String(new FormData(form).get('codigo') ?? '');
        if (!codigoValido(codigo)) {
          render(error, message('danger', 'Código incompleto', el('p', {}, 'O código tem 20 caracteres, em cinco grupos de quatro.')));
          return;
        }

        setButtonLoading(submit, true, 'Buscando…');
        try {

          const resultado = await entrarComCodigo(codigo);
          toast(
            resultado.nome
              ? `Bem-vindo de volta, ${resultado.nome}. Seu progresso veio junto.`
              : 'Progresso restaurado neste aparelho.',
            'success',
          );
          afterSignIn();
        } catch (problem) {
          setButtonLoading(submit, false);
          render(error, message('danger', 'Não conseguimos trazer esse progresso', el('p', {}, problem.message)));
        }
      },
    },
    field({
      label: 'Código de sincronização',
      name: 'codigo',
      autocomplete: 'off',
      spellcheck: 'false',
      placeholder: 'XXXX-XXXX-XXXX-XXXX-XXXX',
      hint: 'Gerado no outro aparelho, em Perfil › Meus dados.',
      onInput: (event) => {
        const input = event.currentTarget;
        const cursorAtEnd = input.selectionStart === input.value.length;
        input.value = formatarCodigo(input.value);
        if (cursorAtEnd) input.setSelectionRange(input.value.length, input.value.length);
      },
    }),
    error,
    submit,
  );

  return card(
    { pad: 'lg' },
    el('h2', {}, 'Tenho um código'),
    el(
      'p',
      { class: 'small secondary' },
      'O código é a única chave: o conteúdo sobe cifrado e nem nós conseguimos ler. Digitar o código aqui traz seu estudo para este aparelho.',
    ),
    el('hr', { class: 'hairline' }),
    form,
  );
}

export function renderAccount(root, context) {
  const requested = context?.params?.aba ?? context?.query?.get('aba') ?? null;
  const accounts = listAccounts();
  let active = TABS.some((tab) => tab.id === requested)
    ? requested
    : accounts.length > 0
      ? 'entrar'
      : 'criar';

  const panel = el('div', { class: 'account__panel', id: 'painel-conta' });
  const tablist = el('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Formas de acessar' });

  function paint(next) {
    active = next;
    render(
      tablist,
      TABS.map((tab) =>
        el(
          'button',
          {
            type: 'button',
            role: 'tab',
            class: `tabs__tab${tab.id === active ? ' tabs__tab--active' : ''}`,
            'aria-selected': tab.id === active ? 'true' : 'false',
            'aria-controls': 'painel-conta',
            id: `aba-${tab.id}`,
            tabindex: tab.id === active ? '0' : '-1',
            onClick: () => paint(tab.id),
            onKeydown: (event) => {
              const index = TABS.findIndex((item) => item.id === active);
              if (event.key === 'ArrowRight') paint(TABS[(index + 1) % TABS.length].id);
              if (event.key === 'ArrowLeft') paint(TABS[(index - 1 + TABS.length) % TABS.length].id);
            },
          },
          tab.label,
        ),
      ),
    );

    render(
      panel,
      active === 'entrar'
        ? signInPanel(accounts, paint)
        : active === 'criar'
          ? createPanel(paint)
          : codePanel(),
    );

    panel.setAttribute('aria-labelledby', `aba-${active}`);
    document.getElementById(`aba-${active}`)?.focus({ preventScroll: true });
  }

  const cube = rubikCube({ size: 'sm', autoSpin: true });
  const sessaoAtual = currentAccount();

  const resume = sessaoAtual
    ? card(
        { pad: 'lg', accent: 'green' },
        badge('Sessão aberta neste navegador', 'green'),
        el(
          'h2',
          { style: { marginTop: '0.6rem' } },
          sessaoAtual.guest
            ? 'Você está estudando como convidado'
            : `Continuar como ${sessaoAtual.name}`,
        ),
        el(
          'p',
          { class: 'small secondary' },
          sessaoAtual.guest
            ? 'Seu progresso está salvo neste navegador. Criar uma conta agora leva tudo junto.'
            : 'Seu progresso continua exatamente de onde parou.',
        ),
        el(
          'div',
          { class: 'row', style: { marginTop: '1rem' } },
          button({ label: 'Ir para o meu início', onClick: () => afterSignIn() }),
          button({
            label: 'Entrar com outra conta',
            variant: 'ghost',
            onClick: () => {
              signOut();
              navigate('/entrar', { replace: true });
            },
          }),
        ),
      )
    : null;

  render(
    root,
    el(
      'div',
      { class: 'account' },
      el(
        'div',
        { class: 'account__intro' },
        el('div', { class: 'account__brand' }, dynamickLogo({ variant: 'full', signature: true })),
        el('h1', {}, 'Sua área de estudo'),
        el(
          'p',
          { class: 'secondary' },
          'Entre para continuar de onde parou. Se for a primeira vez, criar a conta leva menos de um minuto — e você pode até estudar sem criar nenhuma.',
        ),
        cube,
        el(
          'p',
          { class: 'xsmall muted' },
          'Cada conta guarda o próprio progresso neste navegador. Duas pessoas podem usar o mesmo computador sem misturar histórico.',
        ),
      ),
      el(
        'div',
        { class: 'account__main' },
        resume,
        el('div', { class: 'account__tabs', role: 'presentation' }, tablist),
        panel,
        card(
          {},
          el('p', { class: 'small' }, 'Quero só experimentar antes de decidir'),
          el(
            'p',
            { class: 'xsmall muted', style: { marginTop: '0.25rem' } },
            'Você estuda como convidado e, se gostar, transforma em conta depois sem perder nada.',
          ),
          el(
            'div',
            { style: { marginTop: '0.75rem' } },
            button({
              label: 'Entrar como convidado',
              variant: 'ghost',
              size: 'sm',
              onClick: () => {
                continueAsGuest();
                afterSignIn();
              },
            }),
          ),
        ),
        el('div', { class: 'account__foot' }, consciousKnowledgeLogo()),
      ),
    ),
  );

  paint(active);

  return () => cube.dispose?.();
}
