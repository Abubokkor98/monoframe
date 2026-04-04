'use client';

import { motion } from 'framer-motion';

const TECH_STACK = [
  { name: 'Turborepo', icon: '⚡' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'shadcn/ui', icon: '🧩' },
  { name: 'pnpm', icon: '📦' },
  { name: 'ESLint', icon: '🔍' },
  { name: 'Biome', icon: '🌿' },
] as const;

export function TechStackSection() {
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
            Built with <span className="text-highlight">your favorite</span>{' '}
            tools
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Industry-standard technologies, configured correctly from the start.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-stroke bg-dusk-deep/60 px-4 py-6 transition-colors hover:border-brand-red/30 hover:bg-dusk/60"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-sm font-medium text-text-secondary">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
