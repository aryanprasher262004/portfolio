# Asset Pipeline

> **Status: NOT ESTABLISHED.** Depends on the Phase 1.8 rendering decision (DEC-012).
> Populated in Phase 2.

## Where the current partial info lives

- `references/README.md` — the dev-only concept/inspiration area (never shipped).
- `ARCHITECTURE.md` § Deferred — the open asset questions.
- `RISKS.md` RISK-002 (AI 3D quality), RISK-004 (visual quality vs code), RISK-010
  (binary bloat).

## What this file will contain (Phase 2)

- The chain: generation (Meshy / Kling / image / video AI / Blender) → cleanup →
  optimization → placement in `public/` → load strategy.
- Provider-neutral: no repo structure tied to one AI service.
- Per-type handling:
  - **Images** (2.5D layers, wallpapers, poster): format (WebP/AVIF), resolution
    targets, compression, `image-rendering` for pixel art, responsive sizes.
  - **3D / GLB** (if real 3D): draco/meshopt compression, texture size caps, node
    naming for interactive pieces (screen / powerButton / fan), draw-call budget.
  - **Video** (if cinematic transitions): codec, bitrate, dimensions, poster frames,
    preload strategy, alignment with the interactive handoff.
- Where source vs. shipped assets live: source/exploration in `references/`, optimized
  production assets in `public/`.
- Size budgets (cross-referenced from `PERFORMANCE.md`).
- Whether Git LFS is needed.

## Rules (already binding)

- Nothing in `references/` is imported by `src/` or shipped.
- Architecture must not couple to any specific reference image or asset provider.
- Do not spend days rescuing bad AI geometry — fall back to 2.5D/hybrid (RISK-002).
