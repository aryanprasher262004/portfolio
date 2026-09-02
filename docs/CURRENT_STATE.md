# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 0 — Foundation
**Current Subphase:** 0.6 — Claude Code configuration (next)
**Status:** 0.5 COMPLETE — awaiting go-ahead for 0.6
**Current Branch:** `feat/foundation-docs`

## Last Completed

- 0.5 — `docs/` system: 6 load-bearing docs (PROJECT_VISION, ARCHITECTURE, ROADMAP,
  CURRENT_STATE, DECISIONS, RISKS) fully written; 4 placeholders (DESIGN_SYSTEM,
  UI_SYSTEM, ASSET_PIPELINE, PERFORMANCE); `handoffs/README.md` with template.
  DEC-001…DEC-012 backfilled. Internal links / prettier / build all verified.
- 0.4 — Git workflow documented; first commit `b85b232` pushed to `origin/main`.
- 0.3 — Next 16 App Router scaffold; lint / typecheck / build / dev all green.

## Currently Working On

- Nothing in progress. `feat/foundation-docs` holds 0.5 (and will carry 0.6).

## Next Exact Task

- **0.6 — Claude Code configuration.** Research CURRENT Claude Code best practice
  (CLAUDE.md, skills, agents, commands, hooks, MCP) via web/docs. Then write a
  concise real `CLAUDE.md` + minimal "search-before-create / session-start /
  handoff" rules. **Do NOT add agents/hooks/MCP without a concrete need** (owner
  decision 7). The framework-generated `AGENTS.md` stays; our `CLAUDE.md` replaces
  the `@AGENTS.md` stub and can reference it.

## Blockers

- None for Phase 0.
- **Phase 1.1 needs the reference images** — owner will provide before Phase 1.
  Drop them in `references/concept/`.

## Known Issues

- `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver`
  (pnpm 11 default). Fine for Vercel; revisit in Phase 9 if self-hosting images.
- `CLAUDE.md` is currently the framework-generated stub (`@AGENTS.md`). Real one
  written in 0.6.

## Important Files

- `docs/` — all project memory. Start here every session.
- `src/app/{layout,page}.tsx`, `src/app/globals.css`, `src/styles/tokens.css`
- `AGENTS.md` — framework-managed (Next 16 "read the bundled docs" warning)
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`

## Verification

- Last full check (0.3): `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅
  (3 static routes) · `pnpm dev` ✅ (HTTP 200).
- 0.5 touches no code; re-run build once to confirm nothing regressed.

## Notes For Next Session

- Rendering architecture (real 3D / 2.5D / video / hybrid) is **DEFERRED to Phase
  1.8**. Do NOT install `three` / R3F / drei before then. See `ARCHITECTURE.md`
  § Deferred and `DECISIONS.md` DEC-012.
- The insulation rule (DEC-006): OS/apps are plain DOM in a container; only
  `features/scene/**` touches rendering. Never import scene into os/apps.
- YAGNI on directories — create a folder in the phase that first needs it.
- pnpm only. Node 22. Six apps, not eight. One window component.
