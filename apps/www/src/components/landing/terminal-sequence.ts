export interface TerminalLine {
  text: string;
  type: 'command' | 'prompt' | 'answer' | 'info' | 'success' | 'blank';
}

/**
 * Accurate representation of `npx monoframe init` output.
 * Uses the `prompts` library format: ✔ question … answer
 */
export const CLI_SEQUENCE: TerminalLine[] = [
  { text: '$ npx monoframe init', type: 'command' },
  { text: '', type: 'blank' },
  { text: '✔ What is your project name? … my-saas', type: 'answer' },
  { text: '✔ Which monorepo tool? › Turborepo (recommended)', type: 'answer' },
  { text: '✔ Which frontend framework? › Next.js', type: 'answer' },
  { text: '✔ Code quality tooling? › ESLint + Prettier', type: 'answer' },
  { text: '', type: 'blank' },
  { text: '✔ How many apps? … 2', type: 'answer' },
  { text: '✔ App 1 — Name: … web', type: 'answer' },
  { text: '✔ App 1 — Type: › Frontend', type: 'answer' },
  { text: '✔ App 2 — Name: … api', type: 'answer' },
  { text: '✔ App 2 — Type: › Backend (Node.js + Express)', type: 'answer' },
  { text: '', type: 'blank' },
  { text: '✔ Include shadcn/ui components? … yes', type: 'answer' },
  { text: '✔ Component library base? › Radix (most popular)', type: 'answer' },
  { text: '✔ shadcn design preset? › Nova (Lucide / Geist)', type: 'answer' },
  { text: '', type: 'blank' },
  { text: '✔ Animation libraries: › Framer Motion, Lenis (smooth scroll)', type: 'answer' },
  { text: '✔ Extra features: › Husky + lint-staged, GitHub Actions CI', type: 'answer' },
  { text: '', type: 'blank' },
  { text: 'Scaffolding project in ./my-saas...', type: 'info' },
  { text: '', type: 'blank' },
  { text: '✓ Turborepo workspace created', type: 'success' },
  { text: '✓ Shared packages configured', type: 'success' },
  { text: '✓ Frontend app (web) scaffolded', type: 'success' },
  { text: '✓ Backend app (api) scaffolded', type: 'success' },
  { text: '✓ shadcn/ui installed with Nova preset', type: 'success' },
  { text: '✓ Framer Motion + Lenis configured', type: 'success' },
  { text: '✓ Husky + lint-staged ready', type: 'success' },
  { text: '✓ GitHub Actions CI pipeline created', type: 'success' },
  { text: '✓ Git initialized', type: 'success' },
  { text: '', type: 'blank' },
  { text: '✓ Project generated successfully!', type: 'success' },
];

export const COMMAND_CHAR_DELAY = 45;
export const ANSWER_CHAR_DELAY = 18;
export const SUCCESS_CHAR_DELAY = 12;
export const LINE_PAUSE = 100;
export const BLANK_LINE_PAUSE = 80;

export function getLineColor(type: TerminalLine['type']): string {
  switch (type) {
    case 'command':
      return 'text-white';
    case 'prompt':
      return 'text-text-muted';
    case 'answer':
      return 'text-brand-lime';
    case 'info':
      return 'text-[#67d4e8]';
    case 'success':
      return 'text-brand-lime';
    case 'blank':
      return '';
  }
}
