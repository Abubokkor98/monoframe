import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import 'fumadocs-ui/style.css';
import './global.css';

export const metadata = {
  title: 'Mononext CLI',
  description: 'Scaffold production-ready monorepo projects in seconds',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
