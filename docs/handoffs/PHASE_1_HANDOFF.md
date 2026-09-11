# Phase 1 Handoff — Visual + Technical Prototypes

Date: 2026-09-12
Branch: `feat/monitor-os` (commits `b321692`, `941e4d4`) — **not merged, not
pushed**. Built on top of `main` (`a57f673`), which already has Phase 0 +
1.1–1.4 merged.

## Completed

- **1.1** Reference analysis — plate + 2 video clips analysed; direction B
  (blue-grey) chosen as the working world (`PHASE_1_REFERENCE_ANALYSIS.md`).
- **1.2** Prototype visual spec — two framing states, never-distort rule, real
  HTML monitor.
- **1.3** Vertical prototype foundation — `<Scene>`, aspect-preserving stage,
  GSAP camera, `<MonitorScreen>` overlay.
- **1.4** Power + monitor interaction — `phase`/`view` decoupled (DEC-014),
  `PowerControl`, `PcState`, `FocusToggle`.
- **1.5** Monitor OS prototype — `features/os/`: `Loading`, `Login`,
  `Desktop`, `Taskbar`, `Wallpaper`.
- **1.6** Projects window — `features/windows/` (`Window`, `windowStore`,
  `WindowManager`) + `features/apps/projects/`.
- **1.7** Desktop UX pass (owner hands-on review) — `settingsStore`, desktop
  right-click menu, functional Start menu, taskbar minimize/restore,
  data-driven Projects, drag-tracking bug fix.
- **1.8** DEC-012 decided: **Hybrid 2.5D**, no real 3D (below).

## Files changed (cumulative, Phase 1)

- `src/features/scene/` — `Scene`, `framing`, `sceneConfig`, `MonitorScreen`,
  `PowerControl`, `PcState`, `FocusToggle`, `InteractionHint`, temp
  `SceneDevControls`
- `src/features/os/` — `OS`, `Loading`, `Login`, `Desktop`, `Taskbar`,
  `Wallpaper`, `ContextMenu`, `StartMenu`, `icons`, `menu.module.css`
- `src/features/windows/` — `Window`, `windowStore`, `WindowManager`
- `src/features/apps/{projects,settings}/` — chrome-free app content
- `src/stores/{experienceStore,settingsStore}.ts` · `src/data/projects.ts`
- `public/prototype/plate.png` (+ unused `clip1.mp4`/`clip2.mp4`)

## Architecture decisions this phase

- **DEC-012 (resolved)** — Hybrid 2.5D: single plate + GSAP camera
  (scale/translate) + real HTML monitor + CSS/GSAP micro-interactions. No
  `three`/`@react-three/*` — rejected for V1. Video optional/decorative only.
- **DEC-014** — Experience `phase` and camera `view` are decoupled state
  machines.

## Verification

- `pnpm lint` / `typecheck` / `build` / `format:check` — green throughout.
- Playwright (real Chrome) at 1366×768 / 1440×900 / 1536×864 / 1920×1080 for
  every subphase's full interaction flow — **0 console errors** at every size,
  every time.
- No stretching/distortion (plate always exactly its own aspect ratio); no
  black bars (wall-color fill instead).
- Manual: reduced-motion path, keyboard login (Enter), keyboard focus on
  controls (`aria-describedby` hints).

## Known issues

- `p4.jpg`/`p5.png` (early reference iterations) no longer exist on disk —
  minor, not blocking.
- `pnpm-workspace.yaml` disables native builds for `sharp`/`unrs-resolver` —
  fine for Vercel, revisit in Phase 9 only if self-hosting images.
- See `docs/RISKS.md` RISK-017 for the wallpaper-URL security note (nothing to
  fix now — no URL input exists).

## Deferred work (homed, not scope creep)

- Icon drag/reposition + persisted layout → **5.6**
- Secure remote/URL wallpaper support → **5.5**
- Configurable login avatar → **5.2**
- Custom pixel/retro cursor → **10.5**
- Projects visual redesign (portfolio-app feel) → **6.3**
- Real search index → **6.1**
- PC-tower mini-screen/screensaver → **Phase 12**

## Next phase prerequisites

- **Owner approval of DEC-012** (this handoff + `docs/DECISIONS.md`) before
  Phase 2 art/asset work begins.
- Phase 2 works from the plate-based hybrid: no scene-architecture rework
  expected, just better/final artwork and optimized assets.
