import { ProjectConfig } from '../types/config.js';

/**
 * Build the landing page (app/page.tsx) for a generated frontend app.
 *
 * The page adapts based on the user's config:
 * - shadcn enabled → uses shadcn design tokens (bg-background, text-foreground, etc.)
 * - shadcn disabled → uses plain Tailwind classes
 * - framer-motion → hero fade-in, staggered card animations
 * - gsap → scroll-triggered section animations via useGSAP + ScrollTrigger
 * - lenis → smooth scroll is automatic (SmoothScrollProvider in layout)
 *
 * Uses 'use client' only when framer-motion or gsap requires it.
 */
export function buildLandingPage(
  config: ProjectConfig,
  displayName: string,
): string {
  const hasFramerMotion = config.animations.includes('framer-motion');
  const hasGsap = config.animations.includes('gsap');
  const hasLenis = config.animations.includes('lenis');
  const hasShadcn = config.shadcn.enabled;
  const needsClientDirective = hasFramerMotion || hasGsap;
  const hasAnyAnimation = config.animations.length > 0;

  const imports = buildImports({ hasFramerMotion, hasGsap });
  const styles = buildStyleTokens(hasShadcn);

  const heroSection = buildHeroSection(displayName, styles, hasFramerMotion);
  const techStackSection = buildTechStackSection(config, styles, hasFramerMotion, hasGsap);
  const structureSection = buildStructureSection(config, styles);
  const gettingStartedSection = buildGettingStartedSection(config, styles);
  const animationDemoNote = buildAnimationDemoNote(styles, {
    hasFramerMotion,
    hasGsap,
    hasLenis,
    hasAnyAnimation,
  });

  const sections = [
    heroSection,
    techStackSection,
    animationDemoNote,
    structureSection,
    gettingStartedSection,
  ]
    .filter(Boolean)
    .join('\n\n');

  return `${needsClientDirective ? "'use client';\n\n" : ''}${imports}
export default function Home() {${hasGsap ? buildGsapSetup() : ''}
  return (
    <main className="${styles.mainBg} min-h-screen">
${sections}
    </main>
  );
}
`;
}

// ---------- Style tokens ----------

interface StyleTokens {
  mainBg: string;
  heroBg: string;
  heading: string;
  subheading: string;
  muted: string;
  cardBg: string;
  cardBorder: string;
  codeBg: string;
  codeText: string;
  badgeBg: string;
  badgeText: string;
  accentText: string;
  divider: string;
  sectionBg: string;
}

function buildStyleTokens(hasShadcn: boolean): StyleTokens {
  if (hasShadcn) {
    return {
      mainBg: 'bg-background text-foreground',
      heroBg: 'bg-background',
      heading: 'text-foreground',
      subheading: 'text-foreground/80',
      muted: 'text-muted-foreground',
      cardBg: 'bg-card border border-border',
      cardBorder: 'border-border',
      codeBg: 'bg-muted',
      codeText: 'text-foreground font-mono',
      badgeBg: 'bg-primary/10 text-primary',
      badgeText: 'text-primary',
      accentText: 'text-primary',
      divider: 'border-border',
      sectionBg: 'bg-muted/30',
    };
  }

  return {
    mainBg: 'bg-white text-gray-900',
    heroBg: 'bg-white',
    heading: 'text-gray-900',
    subheading: 'text-gray-700',
    muted: 'text-gray-500',
    cardBg: 'bg-white border border-gray-200',
    cardBorder: 'border-gray-200',
    codeBg: 'bg-gray-100',
    codeText: 'text-gray-800 font-mono',
    badgeBg: 'bg-blue-50 text-blue-700',
    badgeText: 'text-blue-700',
    accentText: 'text-blue-600',
    divider: 'border-gray-200',
    sectionBg: 'bg-gray-50',
  };
}

// ---------- Imports ----------

interface ImportFlags {
  hasFramerMotion: boolean;
  hasGsap: boolean;
}

function buildImports(flags: ImportFlags): string {
  const lines: string[] = [];

  if (flags.hasFramerMotion) {
    lines.push("import { motion } from 'framer-motion';");
  }

  if (flags.hasGsap) {
    lines.push("import { useRef } from 'react';");
    lines.push("import { useGSAP } from '@gsap/react';");
    lines.push("import { gsap } from 'gsap';");
    lines.push("import { ScrollTrigger } from 'gsap/ScrollTrigger';");
  }

  if (lines.length > 0) {
    return lines.join('\n') + '\n\n';
  }

  return '';
}

// ---------- GSAP setup inside component ----------

function buildGsapSetup(): string {
  return `
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll('[data-gsap-card]');
    if (!cards) return;

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }, { scope: sectionRef });
`;
}

// ---------- Hero Section ----------

function buildHeroSection(
  displayName: string,
  styles: StyleTokens,
  hasFramerMotion: boolean,
): string {
  const badge = `<span className="inline-block px-3 py-1 text-xs font-medium rounded-full ${styles.badgeBg} mb-6">
            Built with Monoframe
          </span>`;

  const title = `<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight ${styles.heading}">
            ${displayName}
          </h1>`;

  const subtitle = `<p className="mt-6 text-lg sm:text-xl ${styles.muted} max-w-2xl mx-auto leading-relaxed">
            Your production-ready monorepo is set up and ready to go. Start building your next big thing.
          </p>`;

  const commands = `<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <code className="${styles.codeBg} px-6 py-3 rounded-lg text-sm ${styles.codeText}">
              pnpm dev
            </code>
          </div>`;

  const content = `${badge}\n${title}\n${subtitle}\n${commands}`;

  if (hasFramerMotion) {
    return `      {/* Hero */}
      <section className="${styles.heroBg} relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            ${content}
          </motion.div>
        </div>
      </section>`;
  }

  return `      {/* Hero */}
      <section className="${styles.heroBg} relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
          ${content}
        </div>
      </section>`;
}

// ---------- Tech Stack Section ----------

interface TechStackItem {
  name: string;
  description: string;
  icon: string;
}

function getTechStackItems(config: ProjectConfig): TechStackItem[] {
  const items: TechStackItem[] = [
    {
      name: 'Next.js',
      description: 'React framework with App Router and Turbopack for blazing-fast development.',
      icon: '▲',
    },
    {
      name: 'Turborepo',
      description: 'High-performance monorepo build system with intelligent caching.',
      icon: '⚡',
    },
    {
      name: 'TypeScript',
      description: 'End-to-end type safety with shared configuration across all packages.',
      icon: '🔷',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid, consistent styling.',
      icon: '🎨',
    },
  ];

  if (config.shadcn.enabled) {
    items.push({
      name: 'shadcn/ui',
      description: 'Beautiful, accessible components built on Radix UI primitives.',
      icon: '🧩',
    });
  }

  if (config.animations.includes('framer-motion')) {
    items.push({
      name: 'Framer Motion',
      description: 'Production-ready animations for React. This hero fades in using it.',
      icon: '✨',
    });
  }

  if (config.animations.includes('lenis')) {
    items.push({
      name: 'Lenis',
      description: 'Smooth scroll experience. Scroll this page — feel the difference.',
      icon: '🧈',
    });
  }

  if (config.animations.includes('gsap')) {
    items.push({
      name: 'GSAP',
      description: 'Scroll-triggered animations via ScrollTrigger. Watch the cards below.',
      icon: '🎬',
    });
  }

  if (config.codeQuality === 'eslint-prettier') {
    items.push({
      name: 'ESLint + Prettier',
      description: 'Consistent code style and automatic formatting across the monorepo.',
      icon: '✅',
    });
  } else if (config.codeQuality === 'biome') {
    items.push({
      name: 'Biome',
      description: 'Fast linter and formatter — a single tool replacing ESLint + Prettier.',
      icon: '✅',
    });
  }

  return items;
}

function buildTechStackSection(
  config: ProjectConfig,
  styles: StyleTokens,
  hasFramerMotion: boolean,
  hasGsap: boolean,
): string {
  const items = getTechStackItems(config);

  const renderCard = (item: TechStackItem, index: number): string => {
    const gsapAttr = hasGsap ? ' data-gsap-card' : '';
    const card = `<div${gsapAttr} className="${styles.cardBg} rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">${item.icon}</div>
              <h3 className="font-semibold text-lg ${styles.heading}">${item.name}</h3>
              <p className="mt-2 text-sm ${styles.muted}">${item.description}</p>
            </div>`;

    if (hasFramerMotion && !hasGsap) {
      return `<motion.div
              key="${item.name}"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ${index} * 0.1 }}
            >
              ${card}
            </motion.div>`;
    }

    return card;
  };

  const cards = items.map((item, i) => renderCard(item, i)).join('\n            ');

  const refAttr = hasGsap ? ' ref={sectionRef}' : '';

  return `      {/* Tech Stack */}
      <section className="${styles.sectionBg} py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6"${refAttr}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center ${styles.heading} mb-4">
            What&apos;s Inside
          </h2>
          <p className="text-center ${styles.muted} mb-12 max-w-2xl mx-auto">
            Everything you need to build, ship, and scale — pre-configured and ready to use.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${cards}
          </div>
        </div>
      </section>`;
}

// ---------- Animation Demo Note ----------

function buildAnimationDemoNote(
  styles: StyleTokens,
  flags: {
    hasFramerMotion: boolean;
    hasGsap: boolean;
    hasLenis: boolean;
    hasAnyAnimation: boolean;
  },
): string {
  if (!flags.hasAnyAnimation) {
    return '';
  }

  const notes: { prefix: string; highlight: string; suffix: string }[] = [];

  if (flags.hasFramerMotion) {
    notes.push({ prefix: 'The hero above fades in using ', highlight: 'Framer Motion', suffix: '.' });
  }

  if (flags.hasLenis) {
    notes.push({ prefix: 'Smooth scrolling is powered by ', highlight: 'Lenis', suffix: ' \u2014 scroll to feel the difference.' });
  }

  if (flags.hasGsap) {
    notes.push({ prefix: 'The tech stack cards animate in using ', highlight: 'GSAP ScrollTrigger', suffix: '.' });
  }

  const noteItems = notes
    .map((note) => `<span className="inline-flex items-center gap-2 text-sm ${styles.muted}">
              ${note.prefix}<strong>${note.highlight}</strong>${note.suffix}
            </span>`)
    .join('\n              ');

  return `      {/* Animation Demo Note */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wider ${styles.accentText} mb-4">
            Live Demo
          </p>
          <div className="flex flex-col items-center gap-3">
              ${noteItems}
          </div>
        </div>
      </section>`;
}

// ---------- Structure Section ----------

function buildStructureSection(
  config: ProjectConfig,
  styles: StyleTokens,
): string {
  const frontendApps = config.apps.filter((app) => app.type === 'frontend');
  const backendApps = config.apps.filter((app) => app.type === 'backend');

  const appLines: string[] = [];
  for (const app of frontendApps) {
    appLines.push(`├── ${app.name}/          # Next.js app`);
  }
  for (const app of backendApps) {
    appLines.push(`├── ${app.name}/          # Express API`);
  }

  const packageLines: string[] = [
    '│   ├── ui/               # Shared UI components',
    '│   ├── typescript-config/ # Shared TS config',
    '│   └── eslint-config/    # Shared lint rules',
  ];

  const tree = `├── apps/
${appLines.map((line) => `│   ${line}`).join('\n')}
├── packages/
${packageLines.join('\n')}
├── turbo.json
└── package.json`;

  return `      {/* Monorepo Structure */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center ${styles.heading} mb-4">
            Monorepo Structure
          </h2>
          <p className="text-center ${styles.muted} mb-12 max-w-2xl mx-auto">
            A clean, scalable architecture shared across all your apps.
          </p>
          <div className="${styles.codeBg} rounded-xl p-6 sm:p-8 overflow-x-auto">
            <pre className="text-sm ${styles.codeText} leading-relaxed">{\`${tree}\`}</pre>
          </div>
        </div>
      </section>`;
}

// ---------- Getting Started Section ----------

function buildGettingStartedSection(
  config: ProjectConfig,
  styles: StyleTokens,
): string {
  const commands: { label: string; command: string }[] = [
    { label: 'Start development', command: 'pnpm dev' },
    { label: 'Build for production', command: 'pnpm build' },
    { label: 'Run linting', command: 'pnpm lint' },
  ];

  if (config.shadcn.enabled) {
    commands.push({
      label: 'Add a shadcn component',
      command: 'npx shadcn@latest add button',
    });
  }

  if (config.features.playwright) {
    commands.push({ label: 'Run e2e tests', command: 'pnpm test:e2e' });
  }

  const commandCards = commands
    .map(
      (cmd) => `<div className="${styles.cardBg} rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm ${styles.muted}">${cmd.label}</span>
              <code className="${styles.codeBg} px-3 py-1.5 rounded text-sm ${styles.codeText}">${cmd.command}</code>
            </div>`,
    )
    .join('\n            ');

  return `      {/* Getting Started */}
      <section className="${styles.sectionBg} py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center ${styles.heading} mb-4">
            Get Started
          </h2>
          <p className="text-center ${styles.muted} mb-12">
            Your monorepo is ready. Here are the commands you&apos;ll use most.
          </p>
          <div className="space-y-3">
            ${commandCards}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t ${styles.divider}">
        <p className="text-sm ${styles.muted}">
          Built with{' '}
          <a
            href="https://github.com/Abubokkor98/monoframe"
            className="${styles.accentText} hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Monoframe
          </a>
        </p>
      </footer>`;
}
