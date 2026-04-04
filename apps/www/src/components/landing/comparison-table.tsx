'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const FEATURES_LIST = [
  'Multi-app monorepo',
  'Shared UI package',
  'shadcn/ui integration',
  'Custom shadcn presets',
  'Animation libraries (FM, Lenis, GSAP)',
  'Backend (Express + TS)',
  'Shared config packages',
  'GitHub Actions CI',
  'Playwright e2e',
  'Husky + lint-staged',
  'Preferences system',
  'Biome support',
] as const;

interface Tool {
  name: string;
  features: Record<string, boolean>;
}

const TOOLS: Tool[] = [
  {
    name: 'Monoframe',
    features: {
      'Multi-app monorepo': true,
      'Shared UI package': true,
      'shadcn/ui integration': true,
      'Custom shadcn presets': true,
      'Animation libraries (FM, Lenis, GSAP)': true,
      'Backend (Express + TS)': true,
      'Shared config packages': true,
      'GitHub Actions CI': true,
      'Playwright e2e': true,
      'Husky + lint-staged': true,
      'Preferences system': true,
      'Biome support': true,
    },
  },
  {
    name: 'create-turbo',
    features: {
      'Multi-app monorepo': true,
      'Shared UI package': true,
      'shadcn/ui integration': false,
      'Custom shadcn presets': false,
      'Animation libraries (FM, Lenis, GSAP)': false,
      'Backend (Express + TS)': false,
      'Shared config packages': true,
      'GitHub Actions CI': false,
      'Playwright e2e': false,
      'Husky + lint-staged': false,
      'Preferences system': false,
      'Biome support': false,
    },
  },
  {
    name: 'create-next-app',
    features: {
      'Multi-app monorepo': false,
      'Shared UI package': false,
      'shadcn/ui integration': false,
      'Custom shadcn presets': false,
      'Animation libraries (FM, Lenis, GSAP)': false,
      'Backend (Express + TS)': false,
      'Shared config packages': false,
      'GitHub Actions CI': false,
      'Playwright e2e': false,
      'Husky + lint-staged': false,
      'Preferences system': false,
      'Biome support': false,
    },
  },
  {
    name: 'create-t3-app',
    features: {
      'Multi-app monorepo': false,
      'Shared UI package': false,
      'shadcn/ui integration': false,
      'Custom shadcn presets': false,
      'Animation libraries (FM, Lenis, GSAP)': false,
      'Backend (Express + TS)': false,
      'Shared config packages': false,
      'GitHub Actions CI': false,
      'Playwright e2e': false,
      'Husky + lint-staged': false,
      'Preferences system': false,
      'Biome support': false,
    },
  },
];

export function ComparisonTable() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Why <span className="text-highlight">Monoframe</span>?
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            See how Monoframe compares with other scaffolding tools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto rounded-xl border border-stroke"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stroke bg-dusk-deep">
                <th className="px-4 py-3 text-left font-medium text-text-secondary">
                  Feature
                </th>
                {TOOLS.map((tool) => (
                  <th
                    key={tool.name}
                    className={`px-4 py-3 text-center font-semibold ${
                      tool.name === 'Monoframe'
                        ? 'bg-brand-red/10 text-brand-red'
                        : 'text-text-secondary'
                    }`}
                  >
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES_LIST.map((feature, index) => (
                <tr
                  key={feature}
                  className={`border-b border-dusk ${
                    index % 2 === 0 ? 'bg-midnight' : 'bg-dusk-deep/50'
                  }`}
                >
                  <td className="px-4 py-3 text-text-secondary">
                    {feature}
                  </td>
                  {TOOLS.map((tool) => (
                    <td
                      key={`${tool.name}-${feature}`}
                      className={`px-4 py-3 text-center ${
                        tool.name === 'Monoframe' ? 'bg-brand-red/5' : ''
                      }`}
                    >
                      {tool.features[feature] ? (
                        <>
                          <Check
                            aria-hidden="true"
                            className="mx-auto h-4 w-4 text-brand-lime"
                          />
                          <span className="sr-only">Supported</span>
                        </>
                      ) : (
                        <>
                          <X
                            aria-hidden="true"
                            className="mx-auto h-4 w-4 text-text-muted/40"
                          />
                          <span className="sr-only">Not supported</span>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
