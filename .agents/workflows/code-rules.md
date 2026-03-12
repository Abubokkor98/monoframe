---
description: Project-specific coding rules for the MonoNext CLI (Node.js CLI tool, not React)
---

# MonoNext CLI — Project Rules

## Architecture Rules

1. **Generators are pure file writers.** Each generator function receives `ProjectConfig` and writes files to disk. No return values, no side effects at import time.

2. **Template files are static.** Files in `src/templates/` are copied as-is. Never import from `src/` inside templates. Use programmatic modification (e.g. writing `package.json` with `writeJson`) instead of template engines.

3. **One generator per feature.** Each generator file handles one concern: `turborepo.ts`, `frontend-app.ts`, `backend-app.ts`, `shadcn-setup.ts`, etc. If a generator exceeds ~150 lines, split it.

4. **Prompts are separate from generators.** Prompt modules collect and validate user input. Generators receive the validated `ProjectConfig` — they never ask questions.

5. **All config flows through `ProjectConfig`.** No global state, no singletons, no reading env vars inside generators. Everything comes from the typed config object.

## Code Rules

6. **Wrap every generator in try/catch.** Use `handleError()` from `utils/handle-error.ts`. Never let a generator crash without a user-friendly message.

7. **Use the logger.** All console output goes through `utils/logger.ts` (picocolors + ora). Never use raw `console.log` in generators or prompts.

8. **Versions live in constants.** All dependency versions are in `src/constants/versions.ts`. Never hardcode a version string in a generator or template.

9. **Use `fs-extra` over `fs`.** Always import from `fs-extra` for file operations (copy, ensureDir, outputFile, writeJson).

10. **Use `execa` for subprocesses.** Never use `child_process` directly. Always use `execa` for running `pnpm install`, `git init`, `npx shadcn@latest init`, etc.

## Git Rules

11. **Conventional commits required.** Format: `type(scope): message`
    - `feat(prompts): add multi-app selection`
    - `fix(generator): correct tsconfig path alias`
    - `chore(deps): update commander to v14`
    - `docs(readme): add installation section`

12. **One feature per PR.** Keep PRs focused. A generator + its tests + its templates = one PR.

## Testing Rules

13. **Test generators with snapshot-like assertions.** Verify that generators create the expected file structure with the expected content for a given `ProjectConfig`.

14. **Test prompts by mocking stdin.** Use vitest mocks to simulate user input and verify the resulting `ProjectConfig` object.

15. **No tests that depend on network.** Mock `execa` calls for `pnpm install`, `git init`, `npx shadcn`. Tests must run offline.
