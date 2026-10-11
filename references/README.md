# references/

**Development-only.** Concept and inspiration material. **Not production assets.**

- `concept/` — art-direction references (mood, composition, retro-computer feeling,
  monitor proportions, pixel influence). These communicate intent, not final artwork.
- `experiments/` — throwaway prototypes, spike outputs, and scratch assets used while
  comparing rendering approaches in Phase 1.
- `source/` — lossless masters of shipped images (`scene/desk-off.png`,
  `wallpapers/*.png`). Re-encode from these, never from the shipped WebP. Local
  only (binaries here are untracked); also recoverable from git at `1979a83`.

## Rules

- Nothing in this directory is shipped. Do not import from `references/` in `src/`.
- Final website assets live under `public/` once approved (see Phase 2 / `docs/ASSET_PIPELINE.md`).
- The application architecture must not be coupled to any specific reference image —
  final artwork may change entirely.
