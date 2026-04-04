'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TerminalCommandProps {
  command: string;
}

export function TerminalCommand({ command }: TerminalCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-stroke bg-midnight px-5 py-3 font-mono text-sm md:text-base">
      <span className="text-text-muted">$</span>
      <span className="text-white">{command}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="ml-2 text-text-muted transition-colors hover:text-white"
        aria-label="Copy command"
      >
        {copied ? (
          <Check className="h-4 w-4 text-brand-lime" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
