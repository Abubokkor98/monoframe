<!-- cSpell:words monoframe monorepo monorepos turborepo shadcn OKLCH turbopack Biome Lenis GSAP pnpm Husky Figtree Hugeicons Phosphor Geist Lucide Lyra Maia Mira Vega useGSAP ScrollTrigger MotionWrapper SmoothScrollProvider -->

# Monoframe

**One command. A production-ready monorepo. Zero config headaches.**

> **Early Beta** - Monoframe is under active development (`v0.0.1-beta`). No stable version has been released yet. APIs, generated output, and features may change between releases. Feel free to try it out and [report issues](https://github.com/Abubokkor98/monoframe/issues), but expect rough edges.

[![npm version](https://img.shields.io/npm/v/monoframe?color=blue&label=npm)](https://www.npmjs.com/package/monoframe)
[![license](https://img.shields.io/npm/l/monoframe)](./LICENSE)
[![feedback welcome](https://img.shields.io/badge/feedback-welcome-brightgreen)](https://github.com/Abubokkor98/monoframe/issues)

## Try the beta

```bash
npx monoframe@latest init
```

That's it. No install needed. Answer the prompts and your project is ready.

---

## The Problem

Every developer building a modern web project with **multiple apps sharing code** faces the same nightmare:

1. **Hours of config** - wiring up Turborepo, TypeScript paths, shared ESLint rules, Tailwind across packages
2. **Copy-paste from old projects** - every new monorepo starts by hunting through previous repos for config files
3. **No animation setup** - want Framer Motion or GSAP? Figure out the provider wrappers yourself
4. **Broken linting** - ESLint configs conflict across packages, Prettier fights with everything

Existing tools like `create-turbo` or `create-next-app` give you a **starting point**, but not a **production-ready setup**.

## The Solution

```bash
npx monoframe init
```

Answer a few questions. Get a fully configured, production-ready monorepo in under 60 seconds.

---

## How It Works

A friendly interactive CLI - just like `create-next-app` and `shadcn`:

```text
┌  Monoframe
│
◆  What is your project name?
│  my-saas
│
◆  Which monorepo tool?
│  ● Turborepo (recommended)
│  ○ Nx (coming in v1.1)
│
◆  Which frontend framework?
│  ● Next.js
│  ○ React (coming soon)
│
◆  Code quality tooling?
│  ● ESLint + Prettier
│  ○ Biome (faster alternative)
│
◆  Configure your apps (frontend + backend, up to 5)
│
◆  Include shadcn/ui components?
│  Yes → pick a design preset (Nova, Vega, Maia, Lyra, Mira, or Custom)
│
◆  Animation libraries?
│  ☐ Framer Motion  ☐ Lenis (smooth scroll)  ☐ GSAP
│
◆  Extra features?
│  ☐ Husky + lint-staged  ☐ Playwright  ☐ GitHub Actions CI
│
└  ✓ Project generated successfully!
```

### Skip Prompts

```bash
npx monoframe init --yes              # scaffold with saved/default preferences
npx monoframe init --reset-preferences # clear saved choices and start fresh
```

---

## What You Get

```text
my-saas/
├── apps/
│   ├── web/                  # Next.js (App Router + Turbopack)
│   └── api/                  # Express + TypeScript (optional)
├── packages/
│   ├── ui/                   # Shared UI library
│   │   ├── src/components/   # shadcn primitives (button, card, input)
│   │   ├── src/blocks/       # shadcn blocks (login, dashboard)
│   │   ├── src/providers/    # Animation providers (motion, scroll)
│   │   └── lib/utils.ts      # cn() utility
│   ├── typescript-config/    # Shared TypeScript config
│   └── eslint-config/        # Shared ESLint rules (or biome config)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**TypeScript, Tailwind CSS v4, and pnpm are always included.** Everything else is your choice.

---

## Features

### Multi-App Support

Create **multiple apps in a single command** - no other CLI does this:

- Up to 5 apps per project, each named by you
- **Frontend** (Next.js with App Router) or **Backend** (Express + TypeScript)
- All frontend apps share `@repo/ui` components
- Run all apps: `pnpm dev` - or target one: `pnpm dev --filter=web`

### shadcn/ui - Monorepo-Optimized

Monoframe runs `shadcn@latest init` programmatically, so you always get the **latest design tokens, fonts, and OKLCH colors** from the shadcn registry.

| Preset | Icon Library | Font |
| -------- | ------------- | ------ |
| Nova | Lucide | Geist |
| Vega | Lucide | Inter |
| Maia | Hugeicons | Figtree |
| Lyra | Phosphor | JetBrains Mono |
| Mira | Hugeicons | Inter |
| Custom | From [ui.shadcn.com/create](https://ui.shadcn.com/create) | Your choice |

Add components from root — zero `cd`:

```bash
pnpm ui:add button       # → packages/ui/src/components/
pnpm ui:add login-01     # → packages/ui/src/blocks/
```

### Animation Libraries

| Library | What Gets Set Up |
| --------- | ----------------- |
| Framer Motion | `MotionWrapper` component with fade-in, slide-up, reduced-motion support |
| Lenis | `SmoothScrollProvider` for smooth scrolling site-wide |
| GSAP | `gsap-register.ts` with ScrollTrigger and `useGSAP` hook |

Ready-to-use provider components in `packages/ui/src/providers/` - not just `npm install`.

### Code Quality

Choose **ESLint + Prettier** or **Biome** (10-25x faster). Either way, config is shared across all apps via a single config package - change one rule, every app updates.

### Backend Apps

Clean, minimal Express + TypeScript with CORS, hot reload via `tsx`, and shared config. No database, no ORM, no auth - those are your choices to make.

### Extras

| Feature | What You Get |
| --------- | ------------- |
| Husky + lint-staged | Auto-lint and format on every commit |
| Playwright | Pre-configured e2e testing setup |
| GitHub Actions CI | Lint, type-check, build, and test pipeline |

---

## Comparison with create-turbo

| Feature | create-turbo | Monoframe |
| --------- | ------------- | ----------- |
| Basic monorepo scaffold | Yes | Yes |
| Multi-app at init (up to 5) | No (1 app only) | Yes |
| Backend app scaffold | No | Yes |
| Tailwind CSS v4 pre-configured | No | Yes |
| shadcn/ui shared across apps | No | Yes |
| ESLint or Biome choice | No | Yes |
| Animation library setup | No | Yes |
| Husky + lint-staged | No | Yes |
| GitHub Actions CI | No | Yes |
| Playwright e2e stubs | No | Yes |

Monoframe sits between "too basic" (`create-turbo`) and "too complex" (Nx generators).

---

## Roadmap

| Version | Focus | Status |
| --------- | ------- | -------- |
| v1.0 | Turborepo + Next.js + shadcn + animations + CI | Building (current) |
| v1.1 | Nx as alternative monorepo tool | Planned |
| v2.0 | React (Vite) framework + `monoframe add app` command | Planned |
| v3.0 | Plugin system + presets (SaaS, Marketing, Dashboard) | Future |

---

## Requirements

- **Node.js** 18 or higher
- **pnpm** - Monoframe generates pnpm workspaces

## Feedback

This project is in early beta and your feedback matters. If something breaks, feels wrong, or could be better:

- [Open an issue](https://github.com/Abubokkor98/monoframe/issues) for bugs or suggestions
- [Start a discussion](https://github.com/Abubokkor98/monoframe/discussions) for questions or ideas

Every report helps shape what Monoframe becomes.

## Contributing

Contributions are welcome. The project is still stabilizing, but bug reports and suggestions are valuable. See [open issues](https://github.com/Abubokkor98/monoframe/issues).

## License

[MIT](./LICENSE)
