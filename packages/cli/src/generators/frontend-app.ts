import { AppConfig, ProjectConfig } from '../types/config.js';
import { ensureDir, writeJson, writeFile } from '../utils/file-system.js';
import { toDisplayName, buildLayoutTemplate } from '../utils/templates.js';
import { buildLandingPage } from './landing-page.js';
import path from 'path';
import { LATEST_DEPS } from '../constants/versions.js';



const GLOBALS_CSS = `@import 'tailwindcss';

/* Scan shared UI package for Tailwind classes (monorepo) */
@source '../../../packages/ui/src';
`;

const POSTCSS_CONFIG = `const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
`;

const NEXT_CONFIG = `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
`;



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
    '@tailwindcss/postcss': LATEST_DEPS['@tailwindcss/postcss'],
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

    // postcss.config.mjs (required for Tailwind v4)
    await writeFile(path.join(appDir, 'postcss.config.mjs'), POSTCSS_CONFIG);

    // app/layout.tsx
    await writeFile(
      path.join(appSourceDir, 'layout.tsx'),
      buildLayoutTemplate(displayName),
    );

    await writeFile(
      path.join(appSourceDir, 'page.tsx'),
      buildLandingPage(config, displayName),
    );

    // app/globals.css
    await writeFile(path.join(appSourceDir, 'globals.css'), GLOBALS_CSS);
  }
}
