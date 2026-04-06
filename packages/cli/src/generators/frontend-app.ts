import { AppConfig, ProjectConfig } from '../types/config.js';
import { ensureDir, writeJson, writeFile } from '../utils/file-system.js';
import { toDisplayName, buildLayoutTemplate } from '../utils/templates.js';
import path from 'path';
import { LATEST_DEPS } from '../constants/versions.js';

const PAGE_TEMPLATE = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">APP_DISPLAY_NAME</h1>
      <p className="mt-4 text-lg text-gray-500">
        Edit <code className="font-mono font-bold">app/page.tsx</code> to get started.
      </p>
    </main>
  );
}
`;

const GLOBALS_CSS = `@import 'tailwindcss';
`;

const NEXT_CONFIG = `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  turbopack: {
    resolveAlias: {
      // shadcn and tw-animate-css use the "style" export condition which
      // Turbopack does not recognise. Map them to their actual CSS dist files.
      'shadcn/tailwind.css': 'shadcn/dist/tailwind.css',
      'tw-animate-css': 'tw-animate-css/dist/tw-animate.css',
    },
  },
};

export default nextConfig;
`;

function buildTailwindConfig(): string {
  return `import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
`;
}

function buildTsconfig(): object {
  return {
    extends: '@repo/typescript-config/nextjs.json',
    compilerOptions: {
      plugins: [{ name: 'next' }],
      paths: {
        '@/*': ['./*'],
      },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  };
}

function buildPackageJson(app: AppConfig, config: ProjectConfig): object {
  const dependencies: Record<string, string> = {
    next: LATEST_DEPS.next,
    react: LATEST_DEPS.react,
    'react-dom': LATEST_DEPS['react-dom'],
  };

  const devDependencies: Record<string, string> = {
    '@repo/typescript-config': 'workspace:*',
    '@types/node': LATEST_DEPS['@types/node'],
    '@types/react': LATEST_DEPS['@types/react'],
    '@types/react-dom': LATEST_DEPS['@types/react-dom'],
    tailwindcss: LATEST_DEPS.tailwindcss,
  };

  if (config.codeQuality === 'eslint-prettier') {
    devDependencies['@repo/eslint-config'] = 'workspace:*';
    devDependencies.eslint = LATEST_DEPS.eslint;
  } else if (config.codeQuality === 'biome') {
    devDependencies['@biomejs/biome'] = LATEST_DEPS['@biomejs/biome'];
  }

  return {
    name: app.name,
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'next dev --turbopack',
      build: 'next build',
      start: 'next start',
      lint: config.codeQuality === 'biome'
        ? 'biome check .'
        : 'next lint',
    },
    dependencies,
    devDependencies,
  };
}

export async function generateFrontendApps(config: ProjectConfig, targetDir: string) {
  const frontendApps = config.apps.filter((app) => app.type === 'frontend');

  for (const app of frontendApps) {
    const appDir = path.join(targetDir, 'apps', app.name);
    const appSourceDir = path.join(appDir, 'app');

    await ensureDir(appSourceDir);

    const displayName = toDisplayName(app.name);

    // package.json
    await writeJson(path.join(appDir, 'package.json'), buildPackageJson(app, config));

    // tsconfig.json
    await writeJson(path.join(appDir, 'tsconfig.json'), buildTsconfig());

    // next.config.ts
    await writeFile(path.join(appDir, 'next.config.ts'), NEXT_CONFIG);

    // tailwind.config.ts
    await writeFile(path.join(appDir, 'tailwind.config.ts'), buildTailwindConfig());

    // app/layout.tsx
    await writeFile(
      path.join(appSourceDir, 'layout.tsx'),
      buildLayoutTemplate(displayName),
    );

    // app/page.tsx
    await writeFile(
      path.join(appSourceDir, 'page.tsx'),
      PAGE_TEMPLATE.replaceAll('APP_DISPLAY_NAME', displayName),
    );

    // app/globals.css
    await writeFile(path.join(appSourceDir, 'globals.css'), GLOBALS_CSS);
  }
}
