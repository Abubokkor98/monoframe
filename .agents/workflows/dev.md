---
description: How to build, run, and test the CLI locally during development
---

// turbo-all

## Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm i -g pnpm`)
- Nx installed globally (`pnpm add -g nx`) or use `npx nx`

## Dev Loop

### 1. Build the CLI
```bash
nx build cli
```

### 2. Test the CLI interactively
```bash
node packages/cli/dist/index.js init
```
This runs the full interactive prompt flow and generates a project in the current directory.

### 3. Test with --yes flag (skip prompts, use defaults)
```bash
node packages/cli/dist/index.js init --yes
```

### 4. Verify the generated project works
```bash
cd <generated-project-name>
pnpm install
pnpm dev        # Should start all apps
pnpm build      # Should build all apps
pnpm lint       # Should pass linting
```

### 5. Run unit tests
```bash
nx test cli
```

### 6. Run linting
```bash
nx lint cli
```

### 7. Clean up test output
```bash
Remove-Item -Recurse -Force <generated-project-name>
```

## Quick Validation (all in one)
```bash
nx build cli && node packages/cli/dist/index.js init --yes && cd test-output && pnpm install && pnpm build && cd .. && Remove-Item -Recurse -Force test-output
```

## Before Committing
1. Run `nx test cli` — all tests pass
2. Run `nx lint cli` — no lint errors
3. Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
