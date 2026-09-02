# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 0 — Foundation
**Current Subphase:** 0.7 — Deployment baseline (next)
**Status:** 0.6 COMPLETE — awaiting go-ahead for 0.7
**Current Branch:** `feat/foundation-docs`

## Last Completed

- 0.6 — Claude Code config: root `CLAUDE.md` (93 lines: 9 rules, non-negotiables,
  response format, git rules, docs map); `.claude/rules/docs-maintenance.md`
  (path-scoped to `docs/**` + `CLAUDE.md`); `.claude/skills/continue/SKILL.md`
  (resume-from-state workflow). No agents/hooks/MCP. `.gitignore` +=
  `.claude/settings.local.json`.
- 0.5 — `docs/` system: 6 load-bearing docs + 4 placeholders + `handoffs/README.md`;
  DEC-001…DEC-012 backfilled.
- 0.4 — Git workflow documented; first commit `b85b232` pushed to `origin/main`.

## Currently Working On

- Nothing in progress. `feat/foundation-docs` holds 0.5–0.6 (and will carry 0.7–0.8).

## Next Exact Task

- **0.7 — Deployment baseline.** Owner connects the GitHub repo to Vercel via the
  Vercel dashboard (no CLI login — owner decision 9). Confirm: production deploy of
  `main` succeeds, PR preview deploys work, Node 22 picked up from `.nvmrc`, build
  command `pnpm build`. Add any needed `vercel.json` only if a real need appears.
  Then 0.8 — foundation verification + `docs/handoffs/PHASE_0_HANDOFF.md`.

## Blockers

- None for Phase 0.
- **Phase 1.1 needs the reference images** — owner will provide before Phase 1.
  Drop them in `references/concept/`.

## Known Issues

- `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver`
  (pnpm 11 default). Fine for Vercel; revisit in Phase 9 if self-hosting images.

## Important Files

- `docs/` — all project memory. Start here every session.
- `CLAUDE.md` (imports `AGENTS.md`) · `.claude/rules/` · `.claude/skills/`
- `src/app/{layout,page}.tsx`, `src/app/globals.css`, `src/styles/tokens.css`
- `AGENTS.md` — framework-managed (Next 16 "read the bundled docs" warning)
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`

## Verification

- 0.6 full check: `pnpm format:check` ✅ · `pnpm lint` ✅ · `pnpm typecheck` ✅ ·
  `pnpm build` ✅ (3 static routes, no regression). No runtime code changed.

## Notes For Next Session

- Rendering architecture (real 3D / 2.5D / video / hybrid) is **DEFERRED to Phase
  1.8**. Do NOT install `three` / R3F / drei before then. See `ARCHITECTURE.md`
  § Deferred and `DECISIONS.md` DEC-012.
- The insulation rule (DEC-006): OS/apps are plain DOM in a container; only
  `features/scene/**` touches rendering. Never import scene into os/apps.
- YAGNI on directories — create a folder in the phase that first needs it.
- pnpm only. Node 22. Six apps, not eight. One window component.
