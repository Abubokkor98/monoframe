import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import './global.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const SITE_URL = 'https://monoframe.dev';
const SITE_TITLE = 'Monoframe — Production-Ready Monorepo Generator';
const SITE_DESCRIPTION =
  'One command. A production-ready monorepo. Generate fully configured Turborepo projects with Next.js, shadcn/ui, animations, and CI/CD — in under 60 seconds.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Monoframe',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Monoframe',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <RootProvider
          theme={{
            enabled: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
