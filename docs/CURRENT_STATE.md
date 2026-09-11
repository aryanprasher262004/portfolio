# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 1 — Visual + technical prototypes ✅ COMPLETE
**Current Subphase:** — (Phase 2 not started)
**Status:** 1.8 COMPLETE — awaiting owner approval before Phase 2
**Current Branch:** `feat/monitor-os` (commits `b321692`, `941e4d4`; not merged;
`main` is at `a57f673`)

## Last Completed

- **1.8 — DEC-012 decided: Hybrid 2.5D.** Single plate + GSAP camera
  (scale/translate) + real HTML monitor overlay. **No `three`/R3F** — rejected
  for V1. Video clips optional/decorative only, unused. See `DECISIONS.md`
  DEC-012 and `docs/handoffs/PHASE_1_HANDOFF.md`.
- **1.6–1.7 — Window system + desktop UX pass** (commit `941e4d4`).
  `features/windows/` (`Window`, `windowStore`, `WindowManager`),
  `features/apps/{projects,settings}/`, `src/data/projects.ts` (data-driven),
  desktop right-click menu, functional Start menu, taskbar minimize/restore,
  `settingsStore` (icon size + wallpaper, localStorage). Fixed a real drag
  1:1-cursor-tracking bug.
- **1.5 — Monitor OS prototype** (commit `b321692`). `features/os/` (`OS`,
  `Loading`, `Login`, `Desktop`, `Taskbar`, `Wallpaper`) — insulated from
  `features/scene` (DEC-006).
- **1.1–1.4** — reference analysis, prototype spec, scene foundation, power +
  monitor-focus interaction. See git log / `docs/handoffs/PHASE_0_HANDOFF.md`
  for anything older.

## Currently Working On

- Nothing in progress. Dev helpers: `?phase=booting|login|desktop`,
  `?view=monitor`, `?dev=1` (temp `<SceneDevControls>` panel).

## Next Exact Task

- **Owner approves Phase 1 / DEC-012** (this doc + `docs/handoffs/PHASE_1_HANDOFF.md`).
  Then **Phase 2 — Art + assets**: 2.1 final scene concept, working from
  `docs/DECISIONS.md`; **STOP for owner approval** before any production
  rendering implementation.

## Deferred from 1.7 (homed in ROADMAP.md — not scope creep, just not yet)

- Icon drag/reposition + persisted layout → **5.6**
- Secure remote/URL wallpaper support → **5.5** (RISK-017)
- Configurable login avatar → **5.2**
- Custom pixel/retro cursor → **10.5**
- Projects visual redesign (portfolio-app feel, not admin list) → **6.3**
- Real search index (Start-menu Search is a UI stub) → **6.1**
- PC-tower mini-screen/screensaver → **Phase 12**

## Blockers

- `p4.jpg` / `p5.png` from the p1–p7 set no longer exist on disk (minor).
- `ffmpeg` not installed (owner asked not to install without approval); clip
  frames were extracted via a local Swift/AVFoundation script instead.

## Assets in `references/` (dev-only — NOT final production assets)

- `concept/p1.png`, `p2.png` — green-wall direction (angled hero + UI sheet)
- `concept/p3.jpg`, `p6.png`, `p7.png` — blue-grey direction (blank + desktop-on)
- `experiments/pcon.mp4` / `monitoron.mp4` — power-on / monitor-wake clips
  (watermarked, unused so far)

## Known Issues

- `pnpm-workspace.yaml` disables native builds for `sharp` and `unrs-resolver`
  (pnpm 11 default). Fine for Vercel; revisit in Phase 9 if self-hosting images.

## Important Files

- `docs/` — all project memory. Start here every session.
- `docs/PHASE_1_REFERENCE_ANALYSIS.md` — 1.1 findings + 1.2 spec
- `src/features/scene/` — camera/framing/monitor-overlay (`Scene`, `framing`,
  `sceneConfig`, `MonitorScreen`, `PowerControl`, `PcState`, `FocusToggle`,
  `InteractionHint` + temp `SceneDevControls`)
- `src/features/os/` — `OS`, `Loading`, `Login`, `Desktop`, `Taskbar`,
  `Wallpaper`, `ContextMenu`, `StartMenu`, `icons` (insulated from `scene`)
- `src/features/windows/` — `Window`, `windowStore`, `WindowManager`
- `src/features/apps/{projects,settings}/` — chrome-free app content
- `src/stores/{experienceStore,settingsStore}.ts` · `src/data/projects.ts`

## Verification (1.7)

- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm format:check` ✅
- Playwright (real Chrome) at 1366×768 / 1440×900 / 1536×864 / 1920×1080: full
  power → loading → login → desktop flow, **0 console errors** at every size.
- Icon size (medium default, larger than the old fixed size) + wallpaper tone
  change and persist to `localStorage`; Settings window reflects the same
  state. Drag now tracks the cursor 1:1 (was off by the render-scale factor).
  Minimize hides the window and keeps the taskbar chip; restore brings it back
  focused. Start-menu Restart replays the boot sequence to Login; Shut Down
  returns to the idle desk. Still no `three`/`@react-three/*`.

## Notes For Next Session

- **DEC-012 is DECIDED: Hybrid 2.5D, no real 3D.** Do not install
  `three`/`@react-three/*`. Phase 2 works from this — regenerate/finalize the
  plate art, no scene-architecture surprises expected.
- **DEC-015 (future compatibility, not a V1 requirement):** post-V1 the owner
  may swap `features/scene` for a `ThreeScene`. Keep os/windows/apps/state
  renderer-independent (already true — audited, zero scene imports outside
  `features/scene`). Don't let the 1280×740 OS-canvas-size literal drift across
  `sceneConfig.ts`/`windowStore.ts`/`Desktop.tsx` — centralize it opportunistically,
  not urgently.
- The insulation rule (DEC-006): OS/apps are plain DOM; only
  `features/scene/**` touches rendering. Never import scene into os/apps/windows.
- YAGNI on directories — create a folder in the phase that first needs it.
- pnpm only. Node 22. Six apps, not eight. One window component.
