# Performance

> **Status: NOT ESTABLISHED.** Baseline set in Phase 3.9; full pass in Phase 9.

## Where the current partial info lives

- `ARCHITECTURE.md` § Deferred — DPR/shadow/postprocessing decisions wait on Phase 1.
- Scaffold build output (Phase 0.3): `/` and `/_not-found` prerendered static, no
  runtime deps beyond Next/React.

## What this file will contain (Phase 3.9 / Phase 9)

- Budgets: JS bundle size, image weight per view, video weight, GLB size, texture
  memory, draw calls, target DPR, target FPS (desktop + mid mobile).
- Measurements over time (Lighthouse, Web Vitals, real-device runs, render profiling).
- Decisions log for expensive rendering features — each must have visual justification
  (ties to the feature-evaluation rule in `RISKS.md`).
- Lazy-loading strategy (scene assets, per-app content, audio).
- Known regressions and their fixes.

## Principles (already binding)

- Performance is part of the design, not an afterthought.
- Do not introduce expensive rendering features (shadows, postprocessing, high DPR,
  many lights) without a visible reason.
- Watch: image sizes, video sizes, GLB sizes, texture sizes, draw calls, DPR, shadows,
  lights, postprocessing, JS bundle, loading behaviour.
