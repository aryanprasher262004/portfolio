# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 1 — Visual + technical prototypes
**Current Subphase:** 1.4 — Power + monitor prototype (next)
**Status:** 1.3 COMPLETE — awaiting go-ahead for 1.4
**Current Branch:** `feat/foundation-docs` (Phase 0 + Phase 1 docs; not merged)

## Last Completed

- **1.3 — Vertical prototype foundation.** `src/features/scene/`: `<Scene>` (client)
  = aspect-preserving stage (never distorts) plus a GSAP camera between two framings
  (`framing.ts`: DESK/INTRO contain+zoom, MONITOR/WORK screen ≈78% vw + readable OS).
  `<MonitorScreen>` real-HTML overlay tracks the artwork (a black screen-surface rect
  with the 1.6 OS rect inside). `<ScreenPlaceholder>` and `<SceneDevControls>` are
  temporary. `experienceStore` (zustand). Verified: build/lint/typecheck/format green;
  Playwright confirmed the push is smooth + monotonic at 1440/1366/1920; end-state
  screenshots readable at all four target viewports. Deps: `gsap`, `@gsap/react`,
  `zustand`, `playwright-core` (dev).
- **1.2 — Prototype visual spec.** `PHASE_1_REFERENCE_ANALYSIS.md` § Phase 1.2.
- **1.1 — Reference analysis.** Direction B (blue-grey); blank screen + HTML UI; six apps.

## Currently Working On

- Nothing in progress. `localhost:3000` serves the prototype; `?dev=push` triggers
  the camera push, `?phase=poweredOn|booting|login|desktop` jumps to a framing state.

## Next Exact Task

- **1.4 — Power + monitor prototype**: power hotspot on the PC/monitor, PC power
  state (fan glow), monitor wake (blackout fade), sequence power → wake → camera
  push, handoff into the HTML monitor overlay; then test Clip 1 / Clip 2 vs the
  faked version and keep a clip only if it clearly wins. Replace `<SceneDevControls>`
  with the real interaction.

## Blockers

- `p4.jpg` / `p5.png` from the p1–p7 set no longer exist on disk (minor — confirm
  with owner whether to recover).
- `ffmpeg` not installed (owner asked not to install without approval). Clip frames
  were extracted with a local Swift/AVFoundation script instead — works fine.

## Assets in `references/` (references / prototypes — NOT final production assets)

- `concept/p1.png`, `p2.png` — green-wall direction (angled hero + UI sheet)
- `concept/p3.jpg`, `p6.png`, `p7.png` — blue-grey direction (blank + desktop-on)
- `experiments/pcon.mp4` — Clip 1, PC power-on (1080p, 5.0s, has watermark)
- `experiments/monitoron.mp4` — Clip 2, monitor wake / camera push (720p, 4.0s, watermark)

## Known Issues

- `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver`
  (pnpm 11 default). Fine for Vercel; revisit in Phase 9 if self-hosting images.

## Important Files

- `docs/` — all project memory. Start here every session.
- `docs/PHASE_1_REFERENCE_ANALYSIS.md` — 1.1 findings + 1.2 spec
- `src/features/scene/` — `Scene.tsx`, `framing.ts`, `sceneConfig.ts`,
  `MonitorScreen.tsx` (+ temp `ScreenPlaceholder`, `SceneDevControls`)
- `src/stores/experienceStore.ts` · `src/lib/{useViewportSize,useReducedMotion}.ts`
- `src/styles/tokens.css` (added `--scene-*`) · `public/prototype/` (temp p6 + clips)
- `CLAUDE.md` · `.claude/rules/` · `.claude/skills/continue/`
- `references/concept/` + `references/experiments/` — concept assets

## Verification (1.3)

- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm format:check` ✅
- Playwright (real Chrome): camera push scale ramps 1.2 → ~1.87–2.07 monotonically,
  eased, settles ~2.4s; no jump. Verified 1440×900 / 1366×768 / 1920×1080.
- Screenshots (true-viewport headless): DESK + MONITOR framings readable and
  correctly composited at 1440×900 / 1366×768 / 1536×864 / 1920×1080.
- Still **no `three`/`@react-three/*`**; pnpm-only; Node 22 pin intact.

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
