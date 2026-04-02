import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="text-[var(--color-fd-primary)] font-bold">Monoframe</span>
    ),
    transparentMode: 'top',
  },
  githubUrl: 'https://github.com/Abubokkor98/monoframe',
  links: [
    {
      text: 'Documentation',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};
