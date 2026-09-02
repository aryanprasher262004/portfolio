# Phase 0 Handoff — Foundation

Date: 2026-09-02
Branch: `feat/foundation-docs` (commits `b85b232`, `39226e9`, `f7993db`, + this
doc commit) — **not yet merged to `main`**. First commit `b85b232` is already on
`origin/main` and is what production currently serves.

## Completed

- **0.1** Repo inspection — greenfield, pnpm 11 / Node 24 local, empty public remote.
- **0.2** Product/architecture confirmation — foundation decisions locked; rendering
  approach deliberately deferred.
- **0.3** Scaffold — Next.js 16 App Router, React 19, strict TypeScript (with
  `noUncheckedIndexedAccess`), CSS Modules with provisional design tokens, flat
  ESLint config, Prettier, pnpm. Verified: lint / typecheck / build / dev.
- **0.4** Git structure — `main` + short-lived `feat/*` (no `dev`);
  `docs/GIT_WORKFLOW.md`; first commit pushed.
- **0.5** Documentation system — 6 load-bearing docs written + 4 phase-deferred
  placeholders + `handoffs/` template. DEC-001…DEC-012 backfilled.
- **0.6** Claude Code config — concise `CLAUDE.md` (86 lines, imports `AGENTS.md`),
  path-scoped `.claude/rules/docs-maintenance.md`, `.claude/skills/continue/SKILL.md`.
  No agents/hooks/MCP.
- **0.7** Deployment baseline — GitHub→Vercel dashboard integration; `main` =
  production; `https://portfolio-delta-sand-34.vercel.app` Ready. No `vercel.json`,
  no Analytics/Speed Insights/add-ons (DEC-013).
- **0.8** Foundation verification — all checks green (below).

## Files changed / created

**Scaffold & config:** `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`,
`tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.prettierrc.json`,
`.prettierignore`, `.editorconfig`, `.nvmrc` (22), `.npmrc` (`engine-strict`),
`.gitignore`.

**App:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/page.module.css`,
`src/app/globals.css`, `src/styles/tokens.css` (provisional).

**Docs:** `docs/PROJECT_VISION.md`, `ARCHITECTURE.md`, `ROADMAP.md`,
`CURRENT_STATE.md`, `DECISIONS.md`, `RISKS.md`, `GIT_WORKFLOW.md`; placeholders
`DESIGN_SYSTEM.md`, `UI_SYSTEM.md`, `ASSET_PIPELINE.md`, `PERFORMANCE.md`;
`handoffs/README.md`, `handoffs/PHASE_0_HANDOFF.md`.

**Claude Code:** `CLAUDE.md`, `.claude/rules/docs-maintenance.md`,
`.claude/skills/continue/SKILL.md`.

**Dev-only:** `references/README.md`, `references/concept/`, `references/experiments/`.

**Framework-managed:** `AGENTS.md` (Next 16 auto-maintains its block), `CLAUDE.md`
imports it.

## Architecture decisions (see `docs/DECISIONS.md` for full rationale)

- **DEC-001** Next.js 16 App Router (client-first, single route) over Vite.
- **DEC-002** CSS Modules + CSS custom-property tokens over Tailwind.
- **DEC-003** pnpm only; `pnpm-lock.yaml` sole lockfile.
- **DEC-004** Zustand + hand-rolled state machine; no XState.
- **DEC-005** GSAP as the single animation library; no Framer Motion.
- **DEC-006** The insulation rule — OS/apps are rendering-agnostic DOM; only
  `features/scene/**` touches rendering; OS never imports scene.
- **DEC-007** Fixed logical screen resolution (start 1440×900), CSS-scaled.
- **DEC-008** One `<Window>` primitive (+ `WindowManager` + `appRegistry`); resize
  deferred.
- **DEC-009** Content as typed TS modules in `src/data/`; no CMS.
- **DEC-010** `main` + short-lived `feat/*`; no `dev`.
- **DEC-011** Contact V1 = links + `mailto:`; no backend.
- **DEC-012** Rendering architecture — **OPEN / DEFERRED to Phase 1.8.**
- **DEC-013** Deployment — Vercel dashboard Git integration; `main` = production.

## Verification results (0.8)

| Check                                   | Result                                                                                          |
| --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `git status`                            | clean, on `feat/foundation-docs`                                                                |
| `pnpm install --frozen-lockfile`        | ✅ already up to date                                                                           |
| `pnpm lint`                             | ✅ clean                                                                                        |
| `pnpm typecheck`                        | ✅ clean                                                                                        |
| `pnpm build`                            | ✅ compiled, 3 static routes (`/`, `/_not-found`)                                               |
| `pnpm format:check`                     | ✅ all files conform                                                                            |
| Production URL                          | ✅ HTTP 200, `<title>` + "Under construction" content correct                                   |
| Dependencies                            | ✅ `next`, `react`, `react-dom` + standard dev tooling only                                     |
| Three.js / R3F                          | ✅ **absent** from `package.json` and `pnpm-lock.yaml`                                          |
| Lockfiles                               | ✅ `pnpm-lock.yaml` only                                                                        |
| Secrets / env files                     | ✅ none tracked; `.gitignore` covers `.env*`, `*.pem`, `.vercel`, `.claude/settings.local.json` |
| Node pin                                | ✅ `.nvmrc` = 22, `engines.node` `>=22`, `engine-strict=true`                                   |
| Docs consistency                        | ✅ internal links resolve; `CURRENT_STATE` / `ROADMAP` reflect reality                          |
| `CLAUDE.md` / rules / `/continue` skill | ✅ valid frontmatter, load paths correct                                                        |

## Deployment status

- Provider: **Vercel** (dashboard Git integration)
- Production branch: **`main`**
- Production URL: **https://portfolio-delta-sand-34.vercel.app** — status **Ready**
- Deployed commit at handoff: `b85b232` (scaffold)
- Preview deploys: automatic per PR
- No `vercel.json`, no Analytics / Speed Insights / custom domain (deferred to Phase 11)

## Deferred decisions

- **Rendering architecture** (DEC-012): 2.5D vs video/pre-rendered vs real 3D vs
  hybrid — decided in **Phase 1.8** after prototypes, with owner approval.
- Asset pipeline specifics, camera-push technique, on-screen monitor geometry,
  loader real-progress wiring, WebGL fallback tier — all depend on DEC-012.
- Merge of `feat/foundation-docs` → `main` — owner decides timing.

## Prerequisites for Phase 1

- ✅ Reference assets ready (owner confirmed): desk/PC images, blank-monitor concept,
  desktop-on concept, Clip 1 (PC power-on), Clip 2 (monitor wake / camera push).
  **To do:** place them under `references/concept/` and `references/experiments/`.
- A promising candidate has emerged (**video + HTML/CSS + GSAP hybrid**) but Phase 1
  must still compare all four approaches objectively. Not selected.
- Phase 1 stays experimental: prototypes in `references/experiments/` or a scratch
  route, no production `src/features/scene/**` implementation until 1.8 is approved.

## Next phase

**Phase 1.1 — Reference Analysis.**
