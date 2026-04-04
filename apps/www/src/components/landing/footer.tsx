import Link from 'next/link';
import { Github } from 'lucide-react';

const LINK_COLUMNS = [
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'CLI Usage', href: '/docs/cli-usage' },
      { label: 'Comparison', href: '/docs/comparison' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: 'https://github.com/Abubokkor98/monoframe' },
      { label: 'npm', href: 'https://www.npmjs.com/package/monoframe' },
      { label: 'Changelog', href: 'https://github.com/Abubokkor98/monoframe/releases' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Issues', href: 'https://github.com/Abubokkor98/monoframe/issues' },
      { label: 'Discussions', href: 'https://github.com/Abubokkor98/monoframe/discussions' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-midnight px-6 pb-12 pt-4 md:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Left — Branding */}
          <div className="shrink-0">
            <p className="text-lg font-bold text-brand-red">Monoframe</p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com/Abubokkor98/monoframe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            {/* <p className="mt-6 text-sm text-text-muted">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/Abubokkor98"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary underline-offset-4 hover:underline"
              >
                Abu Bokkor
              </a>
            </p> */}
          </div>

          {/* Right — Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-16">
            {LINK_COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-text-muted transition-colors hover:text-white"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-text-muted transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
