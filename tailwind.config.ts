import type { Config } from 'tailwindcss';

/**
 * Tokens visuais vivem em src/styles/tokens.css (fonte única de verdade — §3.9).
 * Aqui só existem referências a esses tokens: nenhum valor de cor literal.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: 'var(--ck-bg-void)',
        deep: 'var(--ck-bg-deep)',
        panel: 'var(--ck-bg-panel)',
        raised: 'var(--ck-bg-raised)',
        green: {
          primary: 'var(--ck-green-primary)',
          glow: 'var(--ck-green-glow)',
          deep: 'var(--ck-green-deep)',
        },
        teal: 'var(--ck-teal)',
        cyan: 'var(--ck-cyan)',
        lime: 'var(--ck-lime)',
        ink: {
          primary: 'var(--ck-text-primary)',
          secondary: 'var(--ck-text-secondary)',
          muted: 'var(--ck-text-muted)',
        },
        line: 'var(--ck-border)',
        'line-strong': 'var(--ck-border-strong)',
        danger: 'var(--ck-danger)',
        warning: 'var(--ck-warning)',
        success: 'var(--ck-success)',
        info: 'var(--ck-info)',
      },
      borderRadius: {
        sm: 'var(--ck-radius-sm)',
        DEFAULT: 'var(--ck-radius-md)',
        md: 'var(--ck-radius-md)',
        lg: 'var(--ck-radius-lg)',
        xl: 'var(--ck-radius-xl)',
        '2xl': 'var(--ck-radius-2xl)',
        pill: 'var(--ck-radius-pill)',
      },
      boxShadow: {
        depth: 'var(--ck-shadow-depth)',
        raised: 'var(--ck-shadow-raised)',
        glow: 'var(--ck-shadow-glow)',
        'glow-soft': 'var(--ck-shadow-glow-soft)',
      },
      fontFamily: {
        sans: 'var(--ck-font-sans)',
        display: 'var(--ck-font-display)',
        mono: 'var(--ck-font-mono)',
      },
      spacing: {
        gutter: 'var(--ck-space-gutter)',
      },
      transitionDuration: {
        fast: 'var(--ck-dur-fast)',
        base: 'var(--ck-dur-base)',
        slow: 'var(--ck-dur-slow)',
      },
      transitionTimingFunction: {
        entry: 'var(--ck-ease-entry)',
        exit: 'var(--ck-ease-exit)',
        spring: 'var(--ck-ease-spring)',
      },
      maxWidth: {
        reading: '68ch',
        shell: 'var(--ck-shell-max)',
      },
      zIndex: {
        backdrop: 'var(--ck-z-backdrop)',
        content: 'var(--ck-z-content)',
        sticky: 'var(--ck-z-sticky)',
        overlay: 'var(--ck-z-overlay)',
        modal: 'var(--ck-z-modal)',
        toast: 'var(--ck-z-toast)',
      },
    },
  },
  plugins: [],
};

export default config;
