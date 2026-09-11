# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 2 — Art + assets (revised scope, see ROADMAP.md)
**Current:** Phase 2.4 complete
**Next:** Phase 2.5 — production asset optimization/integration
**Status:** 2.1-2.4 COMPLETE (production plate integrated + scene remeasured,
plus the post-2.4 readability/UX fix pass) — checkpoint committed. Asset still
uncompressed (source PNG); the full power-on sequence (button press → LED →
fans start/glow → mini-display boot → keyboard LED → monitor wake → loading)
remains planned, not yet implemented.
**Current Branch:** `feat/monitor-os` (commits `b321692`, `941e4d4`, `74f6996`,
plus this session's checkpoint commit — not pushed; not merged; `main` is at
`a57f673`)

## Last Completed

- **Post-2.4 UX fix pass** (owner hands-on review of the integrated plate).
  Removed `PcState`'s obsolete OFF wash (new plate is already correctly dark);
  `PowerControl` no longer draws its own icon/idle ring — it's an invisible
  hotspot over the plate's real button (hover glow, `:active` press feedback);
  `PcState` gained a persistent "on" glow anchored to `POWER_HOTSPOT_RECT`
  (DEC-018). Monitor-focus camera push made much stronger
  (`WORK_SCREEN_WIDTH_FRAC` 0.82→0.99, `OS_SCALE` `{0.82,1.32}`→`{1.0,1.75}`) —
  screen fills ~full viewport width with no chrome clipped, 15–60% bigger OS
  content across the 4 target viewports (DEC-018). Global `--ui-scale` CSS
  variable added (DEC-016): `iconSize` extended to 4 tiers
  (small/medium/**large**/xlarge, default now large), driving font-size/icon
  dimensions across Desktop, Window, Taskbar, StartMenu/ContextMenu, Login,
  Loading, Settings, and Projects content. Wallpaper is now data-driven
  (DEC-017): `src/data/wallpapers.ts` + 3 real images (Morning/Fantasy/Space),
  replacing the old day/dusk CSS gradient; `settingsStore`'s persisted
  `wallpaperTone` field safely migrates to `wallpaper` (unknown/legacy values
  fall back to Morning). Full Playwright regression at 4 viewports incl.
  Extra-Large tier and Focus↔Restore reversibility — 0 console errors.
- **2.2-2.4 — Production plate integrated + scene remeasured.** Owner approved
  "V3" (`public/assets/scene/desk-off.png`, 1536x1024) as the V1 production
  candidate. Remeasured `SCREEN_RECT`/`SCREEN_SURFACE_RECT`/`PC_RECT`/
  `POWER_HOTSPOT_RECT` via luminance edge-detection + crop verification.
  `OS_LOGICAL` changed to `{1280, 609}` to match the new screen's aspect
  (≈2.10) — no letterboxing/bezel gaps; `OS_H` synced in
  `features/windows/windowStore.ts` only. Full Playwright regression (real
  Chrome, 4 viewports) — 0 console errors, Desk View + Monitor View framing
  both hold, power-on still doesn't auto-zoom (DEC-014 intact). Asset not yet
  compressed — deferred to 2.5.
- **2.1 — Scene concept confirmed + generation brief.** Reused Phase 1.1/1.2
  direction B (blue-grey), no re-exploration. Brief (composition, must-change
  list, copy-paste prompt) in `PHASE_1_REFERENCE_ANALYSIS.md` § Phase 2.1.
- **1.8 — DEC-012 decided: Hybrid 2.5D.** Single plate + GSAP camera
  (scale/translate) + real HTML monitor overlay. **No `three`/R3F** — rejected
  for V1. Video clips optional/decorative only, unused. DEC-015 records the
  scene/OS boundary as a standing post-V1 compatibility constraint (future
  `ThreeScene` swap must not require rebuilding the OS). See `DECISIONS.md`
  and `docs/handoffs/PHASE_1_HANDOFF.md`.
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

- **2.5 — Optimize + integrate asset.** Compress/convert
  `public/assets/scene/desk-off.png` (currently ~1.6MB source PNG) — evaluate
  WebP/AVIF via `next/image`, confirm no visible quality loss at the 4 target
  viewports. Then **2.6** (already effectively re-verified this session, but
  re-run after the compressed asset lands) and **2.7** (final asset approval).
- **Planned power sequence (future work, not started):** button press → LED →
  fans start/glow → mini-display boot → keyboard LED → monitor wake → loading.
  See DEC-018 for the button/glow pieces already in place to build on top of.

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

## Assets

- `public/assets/scene/desk-off.png` — **V1 production plate** ("V3", owner-
  approved, 1536x1024). Contains a small unidentified "mini-display" device on
  the desk between the keyboard and the plant pot (roughly x:0.67-0.73,
  y:0.57-0.64 of the plate, rough eyeball only) — reserved for a future
  animated overlay, not implemented, no `sceneConfig.ts` constant added yet.
- `public/assets/wallpapers/{morning,fantasy,space}.png` — real wallpapers
  (1586x992, cover-fit), data-driven via `src/data/wallpapers.ts` (DEC-017).
- `references/concept/p1.png`, `p2.png` — green-wall direction (dev-only, not
  production)
- `references/concept/p3.jpg`, `p6.png`, `p7.png` — blue-grey direction, earlier
  iterations superseded by `desk-off.png` (dev-only, not production)
- `references/experiments/pcon.mp4` / `monitoron.mp4` — power-on / monitor-wake
  clips (watermarked, unused so far)

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
- `src/stores/{experienceStore,settingsStore}.ts` · `src/data/{projects,wallpapers}.ts`

## Verification (latest: post-2.4 UX fix pass)

- `pnpm lint` ✅ · `pnpm typecheck` ✅ · `pnpm build` ✅ · `pnpm format:check` ✅
- Playwright (real Chrome) at 1366×768 / 1440×900 / 1536×864 / 1920×1080: full
  power → loading → login → desktop flow, **0 console errors** at every size.
  Also verified: monitor-focus framing at all 4 sizes (no chrome clipped),
  Extra-Large UI tier (no layout overlap), Focus↔Restore reversibility, hover/
  press feedback on the power hotspot, persistent on-glow after power-on,
  wallpaper picker (Morning/Fantasy/Space).
- Icon/UI size (**large** default) + wallpaper change and persist to
  `localStorage`; Settings window reflects the same state. Drag tracks the
  cursor 1:1. Minimize hides the window and keeps the taskbar chip; restore
  brings it back focused. Start-menu Restart replays the boot sequence to
  Login; Shut Down returns to the idle desk. Still no `three`/`@react-three/*`.

## Notes For Next Session

- **DEC-012 is DECIDED: Hybrid 2.5D, no real 3D.** Do not install
  `three`/`@react-three/*`. Phase 2 works from this — regenerate/finalize the
  plate art, no scene-architecture surprises expected.
- **DEC-015 (future compatibility, not a V1 requirement):** post-V1 the owner
  may swap `features/scene` for a `ThreeScene`. Keep os/windows/apps/state
  renderer-independent (already true — audited, zero scene imports outside
  `features/scene`). Don't let the 1280×609 OS-canvas-size literal drift across
  `sceneConfig.ts` (`OS_LOGICAL`) / `windowStore.ts` (`OS_H`, kept in sync this
  session) / `Desktop.tsx` (`OS_W` only, unaffected by the height change) —
  centralize it opportunistically, not urgently.
- The insulation rule (DEC-006): OS/apps are plain DOM; only
  `features/scene/**` touches rendering. Never import scene into os/apps/windows.
- **DEC-016 (`--ui-scale`):** global UI scale is one CSS custom property set in
  `OS.tsx` from `settingsStore.iconSize`. Adding a size tier = one `UI_SCALE`
  map entry + one option-list entry (`ContextMenu.tsx`, `SettingsContent.tsx`)
  — no new per-component CSS variant blocks.
- **DEC-017 (wallpapers):** adding a wallpaper = one asset in
  `public/assets/wallpapers/` + one entry in `src/data/wallpapers.ts`.
- YAGNI on directories — create a folder in the phase that first needs it.
- pnpm only. Node 22. Six apps, not eight. One window component.
