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
import { codigoValido, entrarComCodigo, formatarCodigo, syncDisponivel } from '../core/sync.js';
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

function signInPanel(accounts, rerender) {
  if (accounts.length === 0) {
    return card(
      { pad: 'lg' },
      el('h2', {}, 'Ainda não há contas neste navegador'),
      el(
        'p',
        { class: 'small secondary' },
        'Uma conta do Dynamic CK guarda seu progresso aqui, neste aparelho. Crie a sua em menos de um minuto — ou traga o progresso de outro aparelho com um código de sincronização.',
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

  const error = el('div', { class: 'stack', 'aria-live': 'polite' });
  const identifierId = uid('conta');
  let selected = accounts[0].id;

  const passwordField = field({
    label: 'Senha',
    name: 'senha',
    type: 'password',
    autocomplete: 'current-password',
    hint: 'A senha protege esta conta apenas neste navegador.',
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

  const submit = button({ label: 'Entrar e continuar', type: 'submit' });

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
    el('p', { class: 'field__label', id: identifierId }, 'Quem está estudando?'),
    list,
    passwordField,
    error,
    submit,
  );

  return card(
    { pad: 'lg' },
    el('h2', {}, 'Entrar'),
    el(
      'p',
      { class: 'small secondary' },
      'Escolha a sua conta para voltar de onde parou. Nada aqui é enviado para um servidor.',
    ),
    el('hr', { class: 'hairline' }),
    form,
    el('hr', { class: 'hairline' }),
    el(
      'p',
      { class: 'xsmall muted' },
      'Esqueceu a senha? Como a conta é local e nada sai deste navegador, não temos como redefini-la. Você pode criar outra conta ou trazer seu progresso por um código de sincronização.',
    ),
  );
}

function createPanel() {
  const error = el('div', { 'aria-live': 'polite' });
  const submit = button({ label: 'Criar conta e começar', type: 'submit' });

  const form = el(
    'form',
    {
      class: 'stack',
      novalidate: true,
      onSubmit: async (event) => {
        event.preventDefault();
        if (submit.disabled) return;
        render(error);
        setButtonLoading(submit, true, 'Criando…');

        const data = new FormData(form);
        const password = String(data.get('senha') ?? '');
        const confirm = String(data.get('senha2') ?? '');

        if (password && password !== confirm) {
          setButtonLoading(submit, false);
          render(error, message('danger', 'As senhas não são iguais', el('p', {}, 'Digite a mesma senha nos dois campos.')));
          return;
        }

        try {
          await createAccount({
            name: String(data.get('nome') ?? ''),
            email: String(data.get('email') ?? ''),
            password,
          });
          toast('Conta criada neste navegador.', 'success');
          navigate('/onboarding', { replace: true });
        } catch (problem) {
          setButtonLoading(submit, false);
          render(error, message('danger', 'Não foi possível criar a conta', el('p', {}, problem.message)));
        }
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
      label: 'E-mail (opcional)',
      name: 'email',
      type: 'email',
      autocomplete: 'email',
      hint: 'Serve só para diferenciar contas neste aparelho. Não enviamos nada para ele.',
    }),
    suportaSenha
      ? el(
          'div',
          { class: 'grid-2' },
          field({
            label: 'Senha (opcional)',
            name: 'senha',
            type: 'password',
            autocomplete: 'new-password',
            hint: 'A partir de 6 caracteres. Guardada como hash, nunca em texto.',
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
    el('hr', { class: 'hairline' }),
    form,
    el('hr', { class: 'hairline' }),
    el(
      'p',
      { class: 'xsmall muted' },
      'Sua conta e seu progresso ficam neste navegador. Para estudar também no celular, use "Sincronizar" dentro do perfil e traga o código para o outro aparelho.',
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
          ? createPanel()
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
