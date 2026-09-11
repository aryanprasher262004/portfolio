# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 1 — Visual + technical prototypes
**Current Subphase:** 1.6 — Projects interaction prototype (next)
**Status:** 1.5 COMPLETE — awaiting go-ahead for 1.6
**Current Branch:** `feat/monitor-os` (not merged; `main` is at `a57f673`)

## Last Completed

- **Merges** — `feat/foundation-docs` → `main` (`066e8bf`) and `feat/interaction-hints`
  → `main` (`a57f673`), both pushed. Production redeployed and verified after each.
- **InteractionHint** — reusable retro-themed hint component (hover + keyboard
  focus via `aria-describedby`); `PowerControl` glyph now visible at idle with a
  gentle glow pulse (stops on power-on); `FocusToggle` uses the same hint.
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

- **1.5 — Monitor OS prototype.** `src/features/os/` (new, insulated from
  `features/scene` per DEC-006): `OS.tsx` switches on store `phase`; `Loading`
  (staged `LOADING N OF 6`, real timers, reduced-motion fallback); `Login` (fake
  auth — any input, submit via click or Enter — `setPhase("desktop")`);
  `Desktop` (six-icon grid, click-to-select only, no windows yet) + `Taskbar`
  (Start button, live clock); shared `Wallpaper` (CSS-only day/dusk). Deleted
  the now-superseded `ScreenPlaceholder`. `FocusToggle` moved to top-right so it
  no longer overlaps the taskbar.

## Currently Working On

- Nothing in progress. Dev helpers: `?phase=booting|login|desktop`,
  `?view=monitor`, `?dev=1` (temp `<SceneDevControls>` panel).

## Next Exact Task

- **1.6 — Projects interaction prototype**: reusable `<Window>` primitive,
  Projects icon opens it, close/focus/scroll, placeholder project content
  clearly marked as placeholder.

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
  `FocusToggle.tsx`, `InteractionHint.tsx` (+ temp `SceneDevControls`)
- `src/features/os/` — `OS.tsx`, `Loading.tsx`, `Login.tsx`, `Desktop.tsx`,
  `Taskbar.tsx`, `Wallpaper.tsx`, `icons.tsx` (insulated from `features/scene`)
- `src/stores/experienceStore.ts` — `phase` + `view` (DEC-014)
- `src/lib/{useViewportSize,useReducedMotion}.ts` · `src/app/icon.svg`
- `src/styles/tokens.css` (`--scene-*`) · `public/prototype/` (temp p6 + clips)

## Verification (1.5)

- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm format:check` ✅
- Playwright (real Chrome) at 1366×768 / 1440×900 / 1536×864 / 1920×1080: full
  power → loading → login → desktop → focus → restore flow, **0 console errors**
  at every size.
- Reduced-motion: loading shortcuts to login (~500ms), no errors.
- Login accepts Enter-key submit (not just click); desktop icon click sets
  visual selection (no window yet — that's 1.6).
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
