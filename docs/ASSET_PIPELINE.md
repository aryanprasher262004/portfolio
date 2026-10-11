# Asset Pipeline

> **Status: ESTABLISHED for still images (Phase 2.5).** Video / 3D not used in V1
> (DEC-012: Hybrid 2.5D, no `three`/R3F).

## Layout

| Where                               | What                                                              |
| ----------------------------------- | ----------------------------------------------------------------- |
| `references/source/`                | Lossless PNG masters (local, untracked; also in git at `1979a83`) |
| `public/assets/scene/`              | Shipped scene plate — `desk-off.webp`                             |
| `public/assets/wallpapers/`         | Shipped OS wallpapers — `{morning,fantasy,space}.webp`            |
| `references/concept`, `experiments` | Dev-only concept art / clips — never shipped                      |

## Images — current standard

- **Format:** WebP, lossy, `cwebp -q 95 -m 6 -sharp_yuv -metadata none`.
  Encode from the PNG master, never re-encode a WebP.
- **Why WebP, not AVIF:** universal browser support with a plain `<img>` /
  CSS `background-image` — no `<picture>`/`image-set()` fallback code. AVIF q80
  measured ~30% smaller at equal-or-better PSNR; revisit in Phase 9 if bytes matter.
- **Why not `next/image`:** the plate is a fixed-size art layer scaled by the
  GSAP camera transform (up to full-width monitor zoom), so responsive `srcset`
  downscaling would hurt the zoomed view; wallpapers are CSS backgrounds.
- **Resolution:** keep native (plate 1536×1024 — `sceneConfig.ts` `PLATE` and
  all scene rects are measured against it; wallpapers 1586×992). Changing the
  plate's dimensions requires re-measuring `sceneConfig.ts`.
- **Quality bar (2.5 measurements, PSNR vs master):** plate 45.2 dB, wallpapers
  37.8–40.5 dB; no visible difference at 3× nearest-neighbour zoom or in the
  Monitor View screenshot.

| Asset     | PNG master  | Shipped WebP |
| --------- | ----------- | ------------ |
| desk-off  | 1.61 MB     | 99 KB        |
| morning   | 2.20 MB     | 424 KB       |
| fantasy   | 2.34 MB     | 500 KB       |
| space     | 2.27 MB     | 457 KB       |
| **Total** | **8.41 MB** | **1.48 MB**  |

## Adding / replacing an image

1. Put the lossless master in `references/source/<scene|wallpapers>/`.
2. Encode with the command above into `public/assets/...`.
3. Point `PLATE.src` (`features/scene/sceneConfig.ts`) or the entry in
   `src/data/wallpapers.ts` (DEC-017) at it.

## Rules (binding)

- Nothing in `references/` is imported by `src/` or shipped.
- Architecture must not couple to any specific reference image or asset provider.
- Do not spend days rescuing bad AI geometry — fall back to 2.5D/hybrid (RISK-002).
