# Phase 2 Handoff — Art + assets

Date: 2026-10-11
Branch: `feat/monitor-os` (Phase 2 commits `1979a83`, `4606766`, + this docs
commit) — **not merged, not pushed**. `main` is at `a57f673`.

## Completed

- **2.1** Scene concept confirmed — reused Phase 1.1/1.2 direction B
  (blue-grey); generation brief in `PHASE_1_REFERENCE_ANALYSIS.md` § Phase 2.1.
- **2.2** Production plate generated (owner-run) — `desk-off`, 1536×1024.
- **2.3** "V3" approved as the V1 production plate (replaceable later without
  an architecture change).
- **2.4** Scene remeasured — `SCREEN_RECT` / `SCREEN_SURFACE_RECT` / `PC_RECT` /
  `POWER_HOTSPOT_RECT`; `OS_LOGICAL` → 1280×609. Post-2.4 UX pass: real-button
  power hotspot + on-glow, stronger monitor push, `--ui-scale`, data-driven
  wallpapers (DEC-016/017/018).
- **2.5** Asset optimization — plate + 3 wallpapers → WebP q95 at native
  resolution (8.41 MB → 1.48 MB); PNG masters → `references/source/`; unused
  `public/prototype/` removed; standard in `ASSET_PIPELINE.md`.
- **2.6** Full-flow regression — no code change needed (see Verification).
- **2.7** Owner visual approval of plate + wallpapers in Desk/Monitor View.

## Files changed

- `public/assets/scene/desk-off.webp`, `public/assets/wallpapers/*.webp`
  (canonical shipped assets); `public/prototype/` deleted.
- `src/features/scene/sceneConfig.ts` (rects, framing, `PLATE.src`),
  `PcState`, `PowerControl`; `src/features/windows/windowStore.ts` (`OS_H`).
- `src/data/wallpapers.ts` (new, DEC-017); `src/stores/settingsStore.ts`
  (`iconSize` tiers, `wallpaper` + legacy migration); `OS.tsx` (`--ui-scale`).
- Docs: `ASSET_PIPELINE.md` (now established), `references/README.md`.

## Architecture decisions

- **DEC-016** — global `--ui-scale` CSS custom property.
- **DEC-017** — data-driven wallpapers.
- **DEC-018** — stronger monitor-focus push; power button = the plate's real
  button (invisible hotspot + glow).
- No change to DEC-006 / DEC-012 / DEC-014 / DEC-015.

## Verification

- `pnpm lint` / `typecheck` / `build` / `format:check` — green.
- Playwright (real Chrome, prod build) at 1366/1440/1536/1920: full flow,
  0 console errors, 0 4xx/5xx; only the 4 WebPs requested; overlay ↔ plate
  error ≤0.03px in every view state; Monitor View 99% width, nothing clipped;
  power-on never auto-zooms; full OS feature pass (see `CURRENT_STATE.md`).
- Encoding fidelity: PSNR 45 dB (plate), 38–40 dB (wallpapers), no visible
  difference at 3× zoom.

## Known issues

- `references/source/` masters are local-only (untracked, like all
  `references/` binaries) — also recoverable from git at `1979a83`.
- The 1280×609 OS size literal lives in 3 places (DEC-015 note) — centralize
  opportunistically.
- Playwright locator `.click()` scrolls the transformed stage's
  `overflow:hidden` ancestors — tests must use coordinate clicks.
- `sharp`/`unrs-resolver` native builds disabled (revisit Phase 9).

## Deferred work

- Physical power-on sequence → next phase (proposal pending owner approval).
- Mini-display device on the plate (≈x 0.67–0.73, y 0.57–0.64) — not yet
  measured into `sceneConfig.ts`.
- AVIF (~30% smaller) → Phase 9 if bytes matter.
- Items deferred from 1.7 remain homed in `ROADMAP.md` (5.2, 5.5, 5.6, 6.1,
  6.3, 10.5, 12).

## Next phase prerequisites

- Owner approval of the revised Phase 3 (physical power-on) scope.
