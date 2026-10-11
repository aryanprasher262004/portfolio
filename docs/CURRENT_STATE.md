# Current State

> Operational source of truth. Keep this CURRENT, not a history book.
> Update at the end of every meaningful subphase.

**Current Phase:** 3 — Physical power-on — **COMPLETE** (owner approved
2026-10-11, `handoffs/PHASE_3_HANDOFF.md`)
**Next:** Phase 4 — revised scope **proposed, awaiting owner approval**; do
not start before approval
**Status:** COMPLETE — committed on `feat/power-on`, not pushed
**Current Branch:** `feat/power-on` (from `feat/monitor-os` @ `5e18279`;
nothing pushed/merged; `main` is at `a57f673`)

## Last Completed

- **Phase 3** — physical power-on: press → LED → fans twitch/spin (DEC-021) →
  warm glow → mini-display SYS/OK/READY → local clock → keyboard underglow →
  monitor flicker-wake → Loading; Focus only at Login; never zooms. Choreography
  in `features/scene/usePowerSequence.ts` (DEC-019).
- **Phase 2** — `handoffs/PHASE_2_HANDOFF.md`.

## Currently Working On

- Nothing. Dev helpers: `?phase=booting|login|desktop`, `?view=monitor`,
  `?dev=1`.

## Next Exact Task

- Owner to approve the revised Phase 4 proposal; then rewrite `ROADMAP.md`
  Phase 4 (log a DEC for the re-scope) and start 4.1.
- No visual changes to the Phase 3 sequence (owner-approved as-is).

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

- `public/assets/scene/desk-off.webp` — **V1 production plate** ("V3", owner-
  approved, 1536x1024). Contains a small unidentified "mini-display" device on
  the desk — now measured (`MINI_DISPLAY_RECT`) and animated (`MiniDisplay`).
- `public/assets/wallpapers/{morning,fantasy,space}.webp` — real wallpapers
  (1586x992, cover-fit), data-driven via `src/data/wallpapers.ts` (DEC-017).
- `references/source/` — lossless PNG masters of the above (re-encode from
  these; see `ASSET_PIPELINE.md`).
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
  `InteractionHint` + temp `SceneDevControls`) and the power-on layer
  (`usePowerSequence`, `MiniDisplay`, `KeyboardGlow`)
- `src/features/os/` — `OS`, `Loading`, `Login`, `Desktop`, `Taskbar`,
  `Wallpaper`, `ContextMenu`, `StartMenu`, `icons` (insulated from `scene`)
- `src/features/windows/` — `Window`, `windowStore`, `WindowManager`
- `src/features/apps/{projects,settings}/` — chrome-free app content
- `src/stores/{experienceStore,settingsStore}.ts` · `src/data/{projects,wallpapers}.ts`

## Verification (latest: Phase 3.8)

- `pnpm lint` ✅ · `typecheck` ✅ · `build` ✅ · `format:check` ✅ · insulation
  intact (no os/windows/apps/stores imports of `features/scene`).
- Playwright, prod build (`pnpm start`), 1366/1440/1536/1920: Loading ~2.16 s,
  Login ~4.65 s after click; stage scale unchanged through the whole sequence
  (no auto-zoom); Focus never shown before Login; fan overlays ≤0.03 px from
  measured ring centres; all 3 fans turning; mini shows local time; monitor
  overlay ↔ plate ≤0.03 px in Desk / Monitor / after Restore; Monitor View 99%
  width; 0 console errors, 0 4xx/5xx.
- 1440 lifecycle: Restart (fans keep turning, mini reboots to SYS, Focus at
  Login); Shut Down (fan step/450 ms 142°→82°→39°→15°→4°→0, all lights 0);
  interrupted boot → fans stopped, no inline residue, re-power works.
- Reduced motion: Login at ~0.84 s, lights on instantly, fan overlay
  `display:none`, shut-down instant.
- Perf (headless Chrome): boot + cruise frames p50/p95/max 16.7/16.8/16.8 ms,
  0 long tasks, cruise ~5% CPU, 0 layouts (60 style recalcs/s from the 3 fan
  transforms).

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
