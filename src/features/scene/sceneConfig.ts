import type { CSSProperties } from "react";

/**
 * Production scene configuration.
 *
 * Plate: `public/assets/scene/desk-off.webp` (V1 production candidate, DEC-012 /
 * Phase 2.3 — may be regenerated/improved later without an architecture change).
 * The plate keeps its native aspect ratio at all times. Reframing is proportional
 * scale + translate only (see `framing.ts`) — the artwork is never distorted.
 */

export const PLATE = {
  src: "/assets/scene/desk-off.webp",
  naturalWidth: 1536,
  naturalHeight: 1024,
} as const;

export const PLATE_ASPECT = PLATE.naturalWidth / PLATE.naturalHeight; // 1.5

/**
 * The monitor's usable display area, as a fraction of the plate.
 * Measured from desk-off.png via luminance edge-detection (inner bezel edges):
 * screen region x:[313..1093] y:[174..545] of 1536x1024 (aspect ≈ 2.102).
 * The OS fills this exactly — thin bezel, large screen.
 */
export const SCREEN_RECT = {
  left: 0.2038,
  top: 0.1699,
  width: 0.5078,
  height: 0.3623,
} as const;

/** SCREEN_RECT with a hairline overscan, painted black so no artwork white leaks
 *  (kept inside the monitor's bezel — no black poking above the frame). */
export const SCREEN_SURFACE_RECT = {
  left: 0.202,
  top: 0.1685,
  width: 0.5115,
  height: 0.3675,
} as const;

/** Internal logical resolution of the fake OS (aspect matches SCREEN_RECT). */
export const OS_LOGICAL = { width: 1280, height: 609 } as const;

/**
 * The PC tower's silhouette, as a fraction of the plate — where the fan glow
 * lives. Kept tight to the tower so the "off" wash doesn't spill onto the wall.
 * Measured from desk-off.png: case bounds x:[1220..1487] y:[208..680] of 1536x1024.
 */
export const PC_RECT = {
  left: 0.7943,
  top: 0.2031,
  width: 0.1738,
  height: 0.4609,
} as const;

/** Clickable power hotspot — the top-front panel of the tower.
 *  Measured from desk-off.png: x:[1400..1530] y:[195..295] of 1536x1024. */
export const POWER_HOTSPOT_RECT = {
  left: 0.9115,
  top: 0.1904,
  width: 0.0846,
  height: 0.0977,
} as const;

/* ---- physical power-on features (Phase 3, DEC-019) ---------------------------
 * Measured in plate pixels (1536x1024) from the PNG master via grid-overlay
 * crops, converted to plate fractions so they scale with the stage. */

const W = PLATE.naturalWidth;
const H = PLATE.naturalHeight;
const pxRect = (x: number, y: number, w: number, h: number) =>
  ({ left: x / W, top: y / H, width: w / W, height: h / H }) as const;

/** The power button's round bezel (symbol ring centre ≈ 1451,252). */
export const POWER_LED_RECT = pxRect(1437, 238, 28, 29);

/** Tempered-glass side panel (perspective quad), as a clip-path polygon in
 *  PC_RECT-relative percentages. Plate px: (1234,287) (1335,239) (1335,660)
 *  (1234,642). */
export const GLASS_PANEL_POLY = [
  [1234, 287],
  [1335, 239],
  [1335, 660],
  [1234, 642],
] as const;

/** Front mesh panel behind the three intake fans. x:[1367..1470] y:[305..647]. */
export const FRONT_PANEL_RECT = pxRect(1367, 305, 103, 342);

/** The three front intake fans' outer rings (plate px). They read as ellipses
 *  (~85x98), so the motion overlay is a circle of diameter 2·rx squashed by
 *  `scaleY(ry/rx)` — rotation stays true to the art, no wobble. */
export const FAN_RINGS = [
  { cx: 1410, cy: 367, rx: 42.5, ry: 49 },
  { cx: 1411, cy: 478, rx: 42.5, ry: 49 },
  { cx: 1410, cy: 587, rx: 42.5, ry: 49 },
] as const;

/** Square box (2·rx) centred on a fan ring, squashed vertically to its ellipse. */
export function fanStyle(f: (typeof FAN_RINGS)[number]): CSSProperties {
  return {
    ...rectStyle(pxRect(f.cx - f.rx, f.cy - f.rx, f.rx * 2, f.rx * 2)),
    transform: `scaleY(${(f.ry / f.rx).toFixed(4)})`,
  };
}

/** The small desk device's dark screen (left edge; the right edge sits ~6px
 *  lower — rendered with `MINI_DISPLAY_SKEW_DEG`). x:[1036..1103] y:[620..655]. */
export const MINI_DISPLAY_RECT = pxRect(1036, 620, 67, 35);
export const MINI_DISPLAY_SKEW_DEG = 5;

/** Keyboard body (frame incl. keycaps). x:[346..904] y:[700..796]. */
export const KEYBOARD_RECT = pxRect(346, 700, 558, 96);

type PlateRect = { left: number; top: number; width: number; height: number };

/** Absolute-position style for a plate-fraction rect (stage-relative %). */
export function rectStyle(r: PlateRect): CSSProperties {
  return {
    left: `${r.left * 100}%`,
    top: `${r.top * 100}%`,
    width: `${r.width * 100}%`,
    height: `${r.height * 100}%`,
  };
}

/** PC_RECT-relative clip-path for a plate-px polygon. */
export function towerPolygon(pts: readonly (readonly [number, number])[]) {
  const x0 = PC_RECT.left * W;
  const y0 = PC_RECT.top * H;
  const w = PC_RECT.width * W;
  const h = PC_RECT.height * H;
  return `polygon(${pts
    .map(
      ([x, y]) =>
        `${(((x - x0) / w) * 100).toFixed(2)}% ${(((y - y0) / h) * 100).toFixed(2)}%`,
    )
    .join(", ")})`;
}

/* ---- framing ---------------------------------------------------------------- */

/** DESK/INTRO: exactly fill the viewport width — no horizontal crop, so every
 *  prop (incl. the flower at the far right of the plate) stays on screen. */
export const DESK_FILL = 1;
/** Fraction of the vertical overflow cropped from the TOP (rest from bottom). */
export const DESK_TOP_CROP_FRAC = 0.32;

/** MONITOR/WORK: target monitor-screen width as a fraction of the viewport.
 *  Close to 1 so the screen (not just the bezel) stays fully on-screen —
 *  functional OS chrome like the taskbar must never clip — while most/all of
 *  the physical bezel around it moves out of frame (readability over showing
 *  the whole monitor). */
export const WORK_SCREEN_WIDTH_FRAC = 0.99;
/** Clamp on the effective OS render scale so text stays readable / not huge. */
export const OS_SCALE = { min: 1.0, max: 1.75 } as const;
/** Negative lifts the monitor slightly above centre (more desk visible below). */
export const WORK_Y_BIAS_VH = -0.01;

export const CAMERA_MOVE = { duration: 1.5, ease: "power3.inOut" } as const;

/** Max parallax offset (px) applied to the whole stage on pointer move. */
export const PARALLAX_MAX_PX = 12;
