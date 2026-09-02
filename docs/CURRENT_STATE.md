# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 1 — Visual + technical prototypes (not started)
**Current Subphase:** 1.1 — Reference analysis (next)
**Status:** PHASE 0 COMPLETE — awaiting go-ahead for Phase 1
**Current Branch:** `feat/foundation-docs` (holds all Phase 0 doc/config work; not
yet merged to `main`)

## Last Completed

- **Phase 0 — Foundation, complete.** Scaffold (Next 16 + strict TS + CSS Modules +
  tokens + ESLint/Prettier, pnpm), git workflow (`main` + `feat/*`), full `docs/`
  system, Claude Code config (`CLAUDE.md` + rule + `/continue` skill), and the
  GitHub→Vercel deploy pipeline (`main` = production). See
  `docs/handoffs/PHASE_0_HANDOFF.md`.

## Currently Working On

- Nothing in progress.

## Next Exact Task

- **Phase 1.1 — Reference analysis.** Owner has assets ready (see below). Study them
  and document: composition, colour, depth, lighting, pixel density, monitor
  proportions, interaction opportunities. Output goes into a Phase 1 working doc
  (not yet created). Do NOT write production code, do NOT install `three`/R3F, do
  NOT pick a rendering approach — that is Phase 1.8 / DEC-012.

## Blockers

- None. Reference assets are ready (owner confirmed at end of Phase 0). They need to
  be placed in `references/concept/` and `references/experiments/`.

## Assets available for Phase 1 (references / prototypes — NOT final production assets)

- PC / desk reference images
- Blank-monitor concept
- Desktop-on concept
- Clip 1 — PC power-on animation
- Clip 2 — monitor wake / camera-push animation

## Known Issues

- `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver`
  (pnpm 11 default). Fine for Vercel; revisit in Phase 9 if self-hosting images.

## Important Files

- `docs/` — all project memory. Start here every session.
- `CLAUDE.md` (imports `AGENTS.md`) · `.claude/rules/` · `.claude/skills/continue/`
- `src/app/{layout,page}.tsx`, `src/app/globals.css`, `src/styles/tokens.css`
- `AGENTS.md` — framework-managed (Next 16 "read the bundled docs" warning)
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`
- `docs/handoffs/PHASE_0_HANDOFF.md`

## Verification (Phase 0.8, final)

- `pnpm install --frozen-lockfile` ✅ up to date
- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ (3 static routes) ·
  `pnpm format:check` ✅
- Production URL `https://portfolio-delta-sand-34.vercel.app` ✅ HTTP 200, correct
  title + content
- Dependency audit ✅ only `next`/`react`/`react-dom` + standard dev tooling; **no
  `three`/`@react-three/*`**; only `pnpm-lock.yaml`
- Secrets ✅ no `.env`/`.pem`/key files tracked; `.gitignore` covers them
- Node pin ✅ `.nvmrc` = 22, `engines.node` `>=22`, `engine-strict=true`

## Notes For Next Session

- **A video + HTML/CSS + GSAP hybrid looks promising but is NOT selected.** Phase 1
  must still objectively compare 2.5D · video/pre-rendered · real 3D · hybrid.
  Decision is deferred to Phase 1.8 / DEC-012.
- Rendering architecture deferred — do NOT install `three` / R3F / drei before 1.8.
- The insulation rule (DEC-006): OS/apps are plain DOM in a container; only
  `features/scene/**` touches rendering. Never import scene into os/apps.
- YAGNI on directories — create a folder in the phase that first needs it.
- pnpm only. Node 22. Six apps, not eight. One window component.
- `feat/foundation-docs` still needs to be merged to `main` (owner decides when).
