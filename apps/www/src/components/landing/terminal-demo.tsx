'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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

export function TerminalDemo() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const isDone = currentLineIndex >= CLI_SEQUENCE.length;
  const currentLine = !isDone ? CLI_SEQUENCE[currentLineIndex] : null;

  useEffect(() => {
    if (isDone) return;

    const line = CLI_SEQUENCE[currentLineIndex];

    // Blank lines — just pause and advance
    if (line.type === 'blank') {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText('');
      }, BLANK_LINE_PAUSE);
      return () => clearTimeout(timeout);
    }

    // Character-by-character typing
    if (currentText.length < line.text.length) {
      const delay = getCharDelay(line.type);
      const timeout = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    }

    // Line complete — commit it and advance
    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentText('');
    }, LINE_PAUSE);
    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentText, isDone]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

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
            See it in <span className="text-highlight">action</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            A friendly questionnaire — just like create-next-app. No terminal
            wizardry required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-stroke bg-midnight"
        >
          {/* Terminal header — traffic light dots */}
          <div className="flex items-center gap-2 border-b border-dusk px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-1 text-xs text-text-muted">
              monoframe — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={containerRef}
            role="log"
            aria-label="CLI demo output"
            aria-live="polite"
            className="h-[420px] overflow-y-auto p-4 font-mono text-sm leading-relaxed"
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
        </motion.div>
      </div>
    </section>
  );
}
