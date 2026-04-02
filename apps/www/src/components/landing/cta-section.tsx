'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section
      className="px-6 py-16 md:py-20"
      style={{
        background:
          'radial-gradient(ellipse 200% 150% at 50% 0%, #163341 0%, #091a23 60%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl text-center"
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Get started
        </h2>
        <p className="mt-4 text-lg text-text-secondary">
          Start scaffolding your production-ready monorepo in under 60 seconds.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-red bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-brand-red/10"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/Abubokkor98/monoframe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stroke bg-dusk px-6 py-3 font-medium text-white transition-colors hover:bg-dusk-light"
          >
            View on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
