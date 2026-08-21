import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { getCurrentUser } from '@/lib/auth/current-user';
import { AppearanceScript } from '@/components/visual/AppearanceScript';
import { BRAND } from '@/components/brand/assets';

export const metadata: Metadata = {
  title: {
    default: `${BRAND.product} — preparação para o ENEM 2027`,
    template: `%s · ${BRAND.product}`,
  },
  description: BRAND.tagline,
  applicationName: BRAND.product,
  authors: [{ name: BRAND.company }],
  publisher: BRAND.company,
  openGraph: {
    title: `${BRAND.product} ${BRAND.signature}`,
    description: BRAND.tagline,
    siteName: BRAND.product,
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#020504',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Preferências de interface aplicadas no servidor: sem flash de tema errado.
  const user = await getCurrentUser();
  const preference = user?.personalization;

  return (
    <html
      lang="pt-BR"
      data-theme={preference?.theme ?? 'dark'}
      data-text-scale={preference?.textScale ?? '100'}
      data-contrast={preference?.highContrast ? 'high' : undefined}
      data-motion={preference?.reducedMotion === 'always' ? 'reduced' : undefined}
      data-visual={preference?.visualIntensity === 'reduced' ? 'reduced' : undefined}
      suppressHydrationWarning
    >
      <head>
        <AppearanceScript
          theme={preference?.theme ?? 'dark'}
          textScale={preference?.textScale ?? '100'}
          highContrast={preference?.highContrast ?? false}
          reducedMotion={preference?.reducedMotion ?? 'auto'}
          visualIntensity={preference?.visualIntensity ?? 'full'}
        />
      </head>
      <body>
        <a
          href="#conteudo-principal"
          className="sr-only rounded-md bg-[color:var(--ck-green-primary)] px-4 py-2 font-medium text-[color:var(--ck-bg-void)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
