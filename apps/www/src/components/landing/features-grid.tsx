'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  Palette,
  Sparkles,
  ShieldCheck,
  Server,
  Rocket,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-App Support',
    description:
      'Create up to 5 frontend and backend apps in a single monorepo — all wired together with shared configs.',
  },
  {
    icon: Palette,
    title: 'shadcn/ui Shared',
    description:
      'Monorepo-optimized component library with split aliases for primitives and blocks. One pnpm ui:add for all apps.',
  },
  {
    icon: ShieldCheck,
    title: 'Code Quality',
    description:
      'Choose ESLint + Prettier or Biome. Pre-configured shared configs, git hooks, and lint-staged — zero setup.',
  },
  {
    icon: Sparkles,
    title: 'Animation Libraries',
    description:
      'Framer Motion, Lenis smooth scroll, and GSAP — pre-wired with providers and shared across all frontend apps.',
  },
  {
    icon: Server,
    title: 'Backend Support',
    description:
      'Express + TypeScript backends with hot-reload, shared TypeScript configs, and monorepo-aware paths.',
  },
  {
    icon: Rocket,
    title: 'CI/CD Ready',
    description:
      'GitHub Actions pipelines and Playwright e2e testing configured out of the box. Ship on day one.',
  },
] as const;

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const },
  }),
};

export function FeaturesGrid() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Everything you need.{' '}
            <span className="text-highlight">Nothing you don&apos;t.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Stop copy-pasting configs from old projects. Monoframe gives you a
            production-ready setup with every tool configured correctly.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={CARD_VARIANTS}
              className="card-glow group rounded-xl border border-stroke bg-dusk-deep p-6 transition-colors hover:border-stroke-light"
            >
              <div className="mb-4 inline-flex rounded-lg bg-brand-red/10 p-2.5">
                <feature.icon className="h-5 w-5 text-brand-red" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
