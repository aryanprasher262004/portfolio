/**
 * Production scene configuration.
 *
 * Plate: `public/assets/scene/desk-off.png` (V1 production candidate, DEC-012 /
 * Phase 2.3 — may be regenerated/improved later without an architecture change).
 * The plate keeps its native aspect ratio at all times. Reframing is proportional
 * scale + translate only (see `framing.ts`) — the artwork is never distorted.
 */

export const PLATE = {
  src: "/assets/scene/desk-off.png",
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
