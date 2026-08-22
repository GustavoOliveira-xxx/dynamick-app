/** Componentes de interface reutilizáveis. Todos devolvem nós do DOM. */

import { el, uid, trapFocus } from '../core/dom.js';

/* ---------------------------------------------------------------- Botão */

/**
 * @param {{
 *   label: string, variant?: 'primary'|'secondary'|'ghost'|'danger',
 *   size?: 'sm'|'md'|'lg', type?: string, onClick?: Function,
 *   block?: boolean, disabled?: boolean, icon?: string, name?: string, value?: string,
 *   ariaLabel?: string
 * }} options
 */
export function button(options) {
  const {
    label, variant = 'primary', size = 'md', type = 'button', onClick,
    block, disabled, icon, name, value, ariaLabel,
  } = options;

  const node = el('button', {
    type,
    class: [
      'btn',
      `btn--${variant}`,
      size !== 'md' ? `btn--${size}` : null,
      block ? 'btn--block' : null,
    ].filter(Boolean).join(' '),
    disabled: disabled || undefined,
    name: name || undefined,
    value: value || undefined,
    'aria-label': ariaLabel || undefined,
    onClick: onClick || undefined,
  });

  if (icon) node.append(el('span', { 'aria-hidden': 'true' }, icon));
  node.append(el('span', { class: 'btn__label' }, label));
  return node;
}

/**
 * Coloca o botão em estado de carregando e o DESABILITA de verdade.
 * É isso que impede o envio duplo — não basta trocar o texto.
 */
export function setButtonLoading(node, loading, loadingLabel) {
  const labelNode = node.querySelector('.btn__label');
  if (loading) {
    node.dataset.idleLabel = labelNode?.textContent ?? '';
    node.disabled = true;
    node.setAttribute('aria-busy', 'true');
    if (!node.querySelector('.btn__spinner')) {
      node.prepend(el('span', { class: 'btn__spinner', 'aria-hidden': 'true' }));
    }
    if (labelNode && loadingLabel) labelNode.textContent = loadingLabel;
  } else {
    node.disabled = false;
    node.removeAttribute('aria-busy');
    node.querySelector('.btn__spinner')?.remove();
    if (labelNode && node.dataset.idleLabel) labelNode.textContent = node.dataset.idleLabel;
  }
}

/** Link que se parece com botão — e navega de verdade. */
export function linkButton({ href, label, variant = 'primary', size = 'md', block, icon }) {
  return el(
    'a',
    {
      href,
      class: [
        'btn', `btn--${variant}`,
        size !== 'md' ? `btn--${size}` : null,
        block ? 'btn--block' : null,
      ].filter(Boolean).join(' '),
    },
    icon ? el('span', { 'aria-hidden': 'true' }, icon) : null,
    el('span', { class: 'btn__label' }, label),
  );
}

/* ---------------------------------------------------------------- Cartão */

const ACCENT_COLORS = {
  green: 'var(--ck-green)',
  teal: 'var(--ck-teal)',
  cyan: 'var(--ck-cyan)',
  lime: 'var(--ck-lime)',
  warning: 'var(--ck-warning)',
  danger: 'var(--ck-danger)',
};

export function card(options = {}, ...children) {
  const { interactive, pad = 'md', tag = 'div', as, accent, style, ...rest } = options;
  return el(
    as ?? tag,
    {
      ...rest,
      class: [
        'card',
        pad === 'lg' ? 'card--pad-lg' : pad === 'none' ? null : 'card--pad',
        interactive ? 'card--interactive' : null,
        accent ? 'card--accent' : null,
        rest.class,
      ].filter(Boolean).join(' '),
      style: accent ? { ...style, '--card-accent': ACCENT_COLORS[accent] ?? accent } : style,
    },
    ...children,
  );
}

/* ---------------------------------------------------------------- Selo */

export function badge(label, tone = 'neutral', icon) {
  return el(
    'span',
    { class: tone === 'neutral' ? 'badge' : `badge badge--${tone}` },
    icon ? el('span', { 'aria-hidden': 'true' }, icon) : null,
    label,
  );
}

/* ---------------------------------------------------------------- Progresso */

/** Barra de progresso com rótulo acessível — nunca comunica só por cor. */
export function progress({ value, max = 100, label, tone = 'green', size = 'md' }) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(safeMax, value));
  const pct = Math.round((clamped / safeMax) * 100);

  return el(
    'div',
    {
      class: size === 'sm' ? 'progress progress--sm' : 'progress',
      role: 'progressbar',
      'aria-valuenow': String(clamped),
      'aria-valuemin': '0',
      'aria-valuemax': String(safeMax),
      'aria-label': label,
    },
    el('div', {
      class: tone === 'green' ? 'progress__fill' : `progress__fill progress__fill--${tone}`,
      style: { width: `${pct}%` },
    }),
  );
}

/* ---------------------------------------------------------------- Campo */

/** Campo de texto com rótulo, dica e erro ligados por aria-describedby. */
export function field({ label, name, type = 'text', value = '', hint, error, required, ...rest }) {
  const id = uid('field');
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ');

  const input = el('input', {
    id,
    name,
    type,
    value,
    class: 'input',
    required: required || undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy || undefined,
    ...rest,
  });

  return el(
    'div',
    { class: 'field' },
    el('label', { class: 'field__label', for: id }, label),
    input,
    hint ? el('p', { class: 'field__hint', id: hintId }, hint) : null,
    error ? el('p', { class: 'field__error', id: errorId, role: 'alert' }, error) : null,
  );
}

export function textarea({ label, name, value = '', rows = 4, hint, placeholder, maxlength, onInput }) {
  const id = uid('area');
  const hintId = `${id}-hint`;

  return el(
    'div',
    { class: 'field' },
    el('label', { class: 'field__label', for: id }, label),
    el('textarea', {
      id, name, rows, class: 'textarea',
      placeholder: placeholder || undefined,
      maxlength: maxlength || undefined,
      'aria-describedby': hint ? hintId : undefined,
      // O handler recebe o texto já pronto: nenhuma tela precisa mexer no evento.
      onInput: onInput ? (event) => onInput(event.currentTarget.value, event) : undefined,
    }, value),
    hint ? el('p', { class: 'field__hint', id: hintId }, hint) : null,
  );
}

/**
 * Grupo de escolha com rádio/checkbox REAIS.
 * Isso garante teclado, leitor de tela e semântica correta — nada de div clicável.
 */
export function choiceGroup({ legend, name, options, value, multiple, hint, error, onChange, variant = 'option' }) {
  const groupId = uid('group');
  const selected = new Set(Array.isArray(value) ? value : value ? [value] : []);

  const controls = options.map((option) => {
    const input = el('input', {
      type: multiple ? 'checkbox' : 'radio',
      name,
      value: option.value,
      checked: selected.has(option.value) || undefined,
      onChange: (event) => {
        if (multiple) {
          if (event.target.checked) selected.add(option.value);
          else selected.delete(option.value);
          onChange?.([...selected]);
        } else {
          onChange?.(option.value);
        }
      },
    });

    if (variant === 'chip') {
      return el('label', { class: 'chip' }, input, option.label);
    }

    return el(
      'label',
      { class: 'option' },
      input,
      el(
        'span',
        { class: 'option__body' },
        el('span', { class: 'option__label' }, option.label),
        option.hint ? el('span', { class: 'option__hint small muted' }, option.hint) : null,
        option.support && selected.has(option.value)
          ? el('span', { class: 'option__support small' }, `O que fazemos com isso: ${option.support}`)
          : null,
      ),
    );
  });

  return el(
    'fieldset',
    { class: 'choice-group', 'aria-describedby': error ? `${groupId}-error` : undefined },
    el('legend', { class: 'choice-group__legend' }, legend),
    hint ? el('p', { class: 'field__hint' }, hint) : null,
    error ? el('p', { class: 'field__error', id: `${groupId}-error`, role: 'alert' }, error) : null,
    el('div', { class: variant === 'chip' ? 'row' : 'stack stack--sm' }, controls),
  );
}

/* ---------------------------------------------------------------- Estados */

export function emptyState({ title, description, actionLabel, actionHref, icon = '◇' }) {
  return card(
    { class: 'empty-state', pad: 'none' },
    el('span', { class: 'empty-state__icon', 'aria-hidden': 'true' }, icon),
    el('h3', {}, title),
    el('p', { class: 'secondary reading' }, description),
    actionLabel && actionHref ? linkButton({ href: actionHref, label: actionLabel, size: 'sm' }) : null,
  );
}

export function message(tone, title, ...body) {
  return el(
    'div',
    { class: `message message--${tone}`, role: tone === 'danger' ? 'alert' : 'status' },
    title ? el('p', { class: 'message__title' }, title) : null,
    el('div', {}, ...body),
  );
}

export function loadingState(label = 'Carregando…') {
  return el(
    'div',
    { class: 'stack', role: 'status', 'aria-live': 'polite' },
    el('span', { class: 'sr-only' }, label),
    el('div', { class: 'skeleton', style: { height: '1.2rem', width: '33%' } }),
    el('div', { class: 'skeleton', style: { height: '1rem', width: '75%' } }),
    el('div', { class: 'skeleton', style: { height: '6rem', width: '100%' } }),
  );
}

/** Aviso permanente de que o conteúdo é semente de desenvolvimento. */
export function seedNotice(compact = false) {
  if (compact) {
    return el(
      'p',
      { class: 'xsmall muted' },
      'Conteúdo autoral de desenvolvimento — não representa a cobertura completa do ENEM.',
    );
  }
  return message(
    'info',
    'Sobre este conteúdo',
    el('p', {},
      'Esta é uma base inicial ',
      el('strong', {}, 'autoral'),
      ', criada para desenvolvimento e demonstração. Ela não representa a cobertura completa do ENEM nem substitui uma curadoria editorial final.',
    ),
  );
}

/* ---------------------------------------------------------------- Toast */

let toastRegion = null;

export function toast(text, tone = 'info', timeout = 4500) {
  if (!toastRegion) {
    toastRegion = el('div', { class: 'toast-region', role: 'status', 'aria-live': 'polite' });
    document.body.append(toastRegion);
  }
  const node = el('div', { class: tone === 'info' ? 'toast' : `toast toast--${tone}` }, text);
  toastRegion.append(node);
  setTimeout(() => node.remove(), timeout);
  return node;
}

/* ---------------------------------------------------------------- Modal */

/**
 * Modal acessível: foco preso dentro, Esc fecha, clique no fundo fecha.
 * Devolve { close } — e sempre restaura o foco e a rolagem ao fechar.
 */
export function modal({ title, body, actions }) {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const titleId = uid('modal-title');
  const dialog = el(
    'div',
    { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId },
    el('h2', { id: titleId }, title),
    el('div', { class: 'stack', style: { marginTop: '1rem' } }, body),
    actions ? el('div', { class: 'row', style: { marginTop: '1.5rem' } }, actions) : null,
  );

  const backdrop = el('div', { class: 'modal-backdrop' }, dialog);
  document.body.append(backdrop);
  const releaseFocus = trapFocus(dialog);

  function close() {
    // A rolagem SEMPRE volta — modal que trava o scroll ao fechar é bug conhecido.
    document.body.style.overflow = previousOverflow;
    releaseFocus();
    backdrop.remove();
    document.removeEventListener('keydown', onKey);
  }

  function onKey(event) {
    if (event.key === 'Escape') close();
  }

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) close();
  });
  document.addEventListener('keydown', onKey);

  return { close, dialog };
}

/** Confirmação com texto digitado — para ações destrutivas. */
export function confirmDestructive({ title, description, confirmWord, confirmLabel, onConfirm }) {
  const input = el('input', { class: 'input', placeholder: confirmWord, 'aria-label': `Digite ${confirmWord} para confirmar` });
  const confirm = button({
    label: confirmLabel,
    variant: 'danger',
    disabled: true,
    onClick: () => {
      instance.close();
      onConfirm();
    },
  });

  input.addEventListener('input', () => {
    confirm.disabled = input.value.trim() !== confirmWord;
  });

  const instance = modal({
    title,
    body: [
      el('p', { class: 'secondary' }, description),
      el('p', { class: 'small' }, 'Digite ', el('strong', {}, confirmWord), ' abaixo para confirmar.'),
      input,
    ],
    actions: [confirm, button({ label: 'Cancelar', variant: 'ghost', onClick: () => instance.close() })],
  });

  return instance;
}
