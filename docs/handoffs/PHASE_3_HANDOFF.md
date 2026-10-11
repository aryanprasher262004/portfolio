# Phase 3 Handoff — Physical power-on

Date: 2026-10-11
Branch: `feat/power-on` (from `feat/monitor-os` @ `5e18279`) — **not merged,
not pushed**. `main` is at `a57f673`.

## Completed

- **3.1** Measured LED / glass panel / front panel / mini-display / keyboard /
  fan rings into `sceneConfig.ts`; `usePowerSequence` GSAP timeline;
  store `completePowerOn()` + 8 s fallback (DEC-019).
- **3.2** Button press + power LED (tint + halo, one flick, steady).
- **3.3** Warm glow (glass interior, fan-rim light, wall spill) + fan motion
  as a masked blade overlay — twitch → spin-up → cruise (DEC-021). Rotating
  the plate crop was tested and rejected.
- **3.4** Mini-display: SYS → SYS OK → READY → visitor's local time.
- **3.5** Keyboard backlight as a soft underglow (no key-mask, by decision).
- **3.6** Monitor flicker-wake into the existing Loading; Focus/Enter Screen
  offered only once Login appears. Power-on never zooms (DEC-014).
- **3.7** Reduced motion, Restart (fans keep turning), Shut Down (lights fade,
  fans coast), interrupted boot → clean idle.
- **3.8** Timing review, 4-viewport regression, perf check. Owner hands-on
  review approved.

## Files changed

- New in `src/features/scene/`: `usePowerSequence.ts` (choreography),
  `fanMotion.ts` (fan spin control), `MiniDisplay`, `KeyboardGlow`.
- Rebuilt: `PcState` (press, LED, glow, fan overlays). Updated: `Scene`
  (wiring + Focus gating), `MonitorScreen` (blackout hook, fade only on
  power-off), `PowerControl`, `sceneConfig` (measurements, `rectStyle`,
  `fanStyle`, `towerPolygon`).
- `src/stores/experienceStore.ts` — timer removed; `completePowerOn()`.
- No changes to `features/os`, `features/windows`, `features/apps`.

## Architecture decisions

- **DEC-019** — choreography owned by `features/scene`; store holds phase only.
- **DEC-020** — Phase 3 re-scoped to the physical power-on experience.
- **DEC-021** — fan motion is a masked overlay; plate art never rotates.

## Verification

- `pnpm lint` / `typecheck` / `build` / `format:check` — green.
- Playwright, prod build, 1366/1440/1536/1920: Loading ~2.2 s, Login ~4.65 s;
  no stage scaling during power-on; Focus never before Login; fan overlays
  ≤0.03 px from measured rings; monitor overlay ≤0.03 px in all views;
  0 console errors / 0 failed requests.
- Restart, Shut Down coast-down, interrupted boot + re-power, reduced motion —
  all verified (details in `CURRENT_STATE.md`).
- Perf (headless Chrome): 60 fps steady (p95 16.8 ms) through boot and cruise,
  0 long tasks, 0 layouts while fans spin, ~5% CPU at cruise.

## Known issues

- Fans keep spinning in Monitor View (tower off-screen) — ~5% CPU; optional
  pause-when-hidden optimisation.
- Keyboard underglow and wall spill are deliberately very subtle.
- Playwright locator `.click()` corrupts stage geometry — tests must use
  coordinate clicks (carried from Phase 2).
- OS canvas size literal still lives in 3 places (DEC-015 note).

## Deferred work

- Keyboard per-key mask — only if the owner later wants a visible backlight.
- Power-on audio → Phase 4.
- Returning-visitor skip-intro → Phase 7.8 (or earlier, see Phase 4 proposal).

## Next phase prerequisites

- Owner approval of the revised Phase 4 scope.
