'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';
import { TerminalCommand } from './terminal-command';
import {
  CLI_SEQUENCE,
  COMMAND_CHAR_DELAY,
  ANSWER_CHAR_DELAY,
  SUCCESS_CHAR_DELAY,
  LINE_PAUSE,
  BLANK_LINE_PAUSE,
  getLineColor,
  type TerminalLine,
} from './terminal-sequence';

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
};

function getCharDelay(type: TerminalLine['type']): number {
  switch (type) {
    case 'command':
      return COMMAND_CHAR_DELAY;
    case 'success':
      return SUCCESS_CHAR_DELAY;
    default:
      return ANSWER_CHAR_DELAY;
  }
}

function HeroTerminal() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const isDone = currentLineIndex >= CLI_SEQUENCE.length;
  const currentLine = !isDone ? CLI_SEQUENCE[currentLineIndex] : null;

  useEffect(() => {
    if (isDone) return;

    const line = CLI_SEQUENCE[currentLineIndex];

    if (line.type === 'blank') {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText('');
      }, BLANK_LINE_PAUSE);
      return () => clearTimeout(timeout);
    }

    if (currentText.length < line.text.length) {
      const delay = getCharDelay(line.type);
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentText('');
    }, LINE_PAUSE);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentText, isDone]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div className="overflow-hidden rounded-xl border border-stroke bg-[#0a1a24]">
      {/* Traffic light header */}
      <div className="flex items-center gap-2 border-b border-dusk px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-1 text-xs text-text-muted">monoframe — bash</span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        role="log"
        aria-label="CLI demo output"
        aria-live="polite"
        className="terminal-scrollbar h-[380px] overflow-y-auto p-4 font-mono text-xs leading-relaxed md:text-sm"
      >
        {displayedLines.map((line, index) => (
          <div key={index} className={getLineColor(line.type)}>
            {line.text || '\u00A0'}
          </div>
        ))}

        {!isDone && currentLine && currentLine.type !== 'blank' && (
          <div className={getLineColor(currentLine.type)}>
            {currentText}
            <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-brand-lime" />
          </div>
        )}

        {isDone && (
          <div className="mt-1 text-brand-lime">
            <span className="animate-pulse">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left column — Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div custom={0} variants={FADE_UP}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stroke bg-dusk px-4 py-1.5 text-sm text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-brand-red" />
                Now in public beta
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              variants={FADE_UP}
              className="mt-4 text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              One command.{' '}
              <span className="text-brand-red">A production-ready</span>{' '}
              monorepo.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={0.2}
              variants={FADE_UP}
              className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg"
            >
              Generate fully configured Turborepo projects with Next.js,
              shadcn/ui, animations, and CI/CD — in under 60 seconds.
            </motion.p>

            {/* Terminal command */}
            <motion.div custom={0.3} variants={FADE_UP} className="mt-8">
              <TerminalCommand command="npx monoframe init" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={0.4}
              variants={FADE_UP}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-red bg-brand-red/10 px-6 py-3 font-medium text-white transition-colors hover:bg-brand-red/20"
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
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full lg:w-1/2"
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
