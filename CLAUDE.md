# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
- **Language/Framework**: React 19 + Vite 6, TypeScript 5.8, Zustand, Ant Design, Supabase SDK.
- **Key Packages**: `@supabase/supabase-js`, `antd`, `zustand`, `uuid`, `@vitejs/plugin-react`.
- **Structure**: `src/` contains all source code (components, hooks, routes). Build artifacts go to `dist/`.

## Common Commands
- **Development server**: `npm run dev` - launches Vite with hot-module reloading.
- **Production build**: `npm run build` - compiles TypeScript and bundles with Vite.
- **Lint**: `npm run lint` - runs ESLint (React hooks & React-X plugins).
- **Format**: `npm run format` - runs Prettier on the codebase.
- **Database migration**: `npm run db:migrate:hydra` - custom script that syncs data with Supabase.
- **Release**: `npm run release` - triggers Semantic Release for versioning.

## Environment & Secrets
- Supabase keys and other secrets are stored in `.env` (git-ignored). Never commit this file.
- Required env vars for local dev: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- `VITE_SUPABASE_ANON_KEY` is public client-side configuration and is used by `src/lib/supabaseClient.ts`.
- `SUPABASE_SERVICE_ROLE_KEY` is required only for local/server database scripts such as `npm run db:migrate:hydra`.
- Never prefix the service role key with `VITE_`; Vite exposes `VITE_*` variables to the browser bundle.
- The service role key must be the Supabase `service_role` JWT key from Project Settings > API and must not be committed, logged, or used in frontend code.

## Linting & Formatting
- ESLint configuration uses `eslint-plugin-react-hooks` and `eslint-plugin-react-x`. Prefer the stricter `@eslint-client/configs.recommendedTypeChecked` when possible.
- Prettier enforces 2-space indentation and LF line endings.

## Commit & Branch Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.) - Semantic Release relies on these tags.
- Branch names should be kebab-case, prefixed with the type (e.g., `feature/add-chart`, `bugfix/login-error`).

## Testing
- No dedicated test framework detected; consider adding Jest/Vitest for unit tests and Cypress/Playwright for end-to-end tests.

## Gotchas & Tips
- On Windows PowerShell, `npm run ...` may fail because `npm.ps1` is blocked by the execution policy. Use `npm.cmd run ...` instead (for example, `npm.cmd run build`).
- Changing environment variables requires restarting the dev server.
- After running `npm run db:migrate:hydra`, verify Supabase data consistency locally.
- If ESLint reports type-only issues, ensure `tsconfig.json` includes `"noEmit": true` and `"isolatedModules": true`.
- Hydra `DualAxes` charts use responsive slider windows via `useElementWidth`, `getResponsiveVisibleItemsCount`, and `getLastItemsSliderValues`; avoid hard-coding a fixed "last 20" window.
- The current Hydra chart density is intentional: `Math.min(Math.max(Math.floor(containerWidth / 100), 3), 20)` means about one visible point per 100px, minimum 3 on mobile, maximum 20 on desktop.
- AntV charts can desync line/interval layers on resize or theme changes; keep explicit child `xField: 'period'` and remount keys tied to data length, visible item count, width, and theme.
- Footer audio supports mixed local MP3 and YouTube iframe tracks. YouTube live/video entries cannot be played through `<audio>`; add them as `type: 'youtube'` items in `src/layouts/components/Footer/playlist.ts`.
- Keep document-level theme backgrounds in `src/index.css` for `html`, `body`, and `#root`; otherwise mobile Safari may show white gutters around the app during horizontal overscroll.

## Suggested Extensions (optional)
- Add a `.claude/rules/` directory for more granular rule files (e.g., `code-style.md`, `testing.md`).
- Consider installing the GitHub CLI (`gh`) for future skill development.
