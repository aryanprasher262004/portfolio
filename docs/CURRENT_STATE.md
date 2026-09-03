# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 1 — Visual + technical prototypes
**Current Subphase:** 1.5 — Monitor OS prototype (next)
**Status:** 1.4 COMPLETE — awaiting go-ahead for 1.5
**Current Branch:** `feat/foundation-docs` (Phase 0 + Phase 1 docs; not merged)

## Last Completed

- **1.4 — Power + monitor interaction.** Decoupled `phase` (idle→poweringOn→booting→
  login→desktop) and `view` (desk/monitor) in `experienceStore` (DEC-014). Real power
  interaction: `<PowerControl>` hotspot on the PC top-front (hover glyph + glow +
  "POWER" tooltip) → `<PcState>` off-wash lifts + fan bloom → staged monitor wake
  (`awake` derived) → boot. **No camera move on power.** `<FocusToggle>` (retro pixel
  brackets, FOCUS ⇄ EXIT) inside the screen bottom-right drives a reversible GSAP
  desk⇄monitor move; power stays on across it. Bezel tightened (SCREEN_RECT hugs the
  glass, OS = 1280×740; screen ≈82% vw in focus). Framing switched to flex-centring +
  cover-width + crop-bias so the scene uses the viewport. `app/icon.svg` added
  (kills the favicon 404). Playwright-verified full flow at 1366/1440/1536/1920,
  0 console errors, focus/restore stable across repeats.
- **1.3 — Vertical prototype foundation.** `<Scene>` + aspect-preserving stage +
  GSAP camera + `<MonitorScreen>` overlay. Deps: `gsap`, `@gsap/react`, `zustand`,
  `playwright-core` (dev).
- **1.1–1.2 — Reference analysis + prototype spec** (`PHASE_1_REFERENCE_ANALYSIS.md`).

## Currently Working On

- Nothing in progress. `localhost:3000` serves the prototype. Dev helpers:
  `?phase=booting|login|desktop`, `?view=monitor`, plus the temp `<SceneDevControls>`
  panel (bottom-left). Normal flow works without any of them.

## Next Exact Task

- **1.5 — Monitor OS prototype**: loading screen (`LOADING 6 OF 6`), login screen,
  login transition, desktop, six icons, taskbar / basic chrome — all real React in
  the 1280×740 OS root. Note: `<FocusToggle>` currently sits where the taskbar will
  go (bottom-right) — reconcile then.

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
- `src/features/scene/` — `Scene.tsx`, `framing.ts`, `sceneConfig.ts` (all rects +
  tunables), `MonitorScreen.tsx`, `PowerControl.tsx`, `PcState.tsx`,
  `FocusToggle.tsx` (+ temp `ScreenPlaceholder`, `SceneDevControls`)
- `src/stores/experienceStore.ts` — `phase` + `view` (DEC-014)
- `src/lib/{useViewportSize,useReducedMotion}.ts` · `src/app/icon.svg`
- `src/styles/tokens.css` (`--scene-*`) · `public/prototype/` (temp p6 + clips)

## Verification (1.4)

- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm format:check` ✅
- Playwright (real Chrome), full flow at 1366×768 / 1440×900 / 1536×864 / 1920×1080:
  power → PC on → screen wakes with **desk framing unchanged** (scale 1.08 before and
  after); focus → GSAP move to screen ≈82% vw, centred; restore → back to desk;
  power stays on; focus/restore stable over repeat cycles; **0 console errors**.
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
