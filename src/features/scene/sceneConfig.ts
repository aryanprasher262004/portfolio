/**
 * Prototype scene configuration.
 *
 * Temporary asset: `references/concept/p6.png` -> `public/prototype/plate.png`.
 * The plate keeps its native aspect ratio at all times. Reframing is proportional
 * scale + translate only (see `framing.ts`) — the artwork is never distorted.
 */

export const PLATE = {
  src: "/prototype/plate.png",
  naturalWidth: 1448,
  naturalHeight: 1086,
} as const;

export const PLATE_ASPECT = PLATE.naturalWidth / PLATE.naturalHeight; // ~1.333

/**
 * The monitor's usable display area, as a fraction of the plate.
 * Measured from p6: bright screen region x:[290..1076] y:[146..600] of 1448x1086
 * (aspect ≈ 1.731). The OS fills this exactly — thin bezel, large screen.
 */
export const SCREEN_RECT = {
  left: 0.2003,
  top: 0.1344,
  width: 0.5428,
  height: 0.4185,
} as const;

/** SCREEN_RECT with a hairline overscan, painted black so no artwork white leaks
 *  (kept inside the monitor's bezel — no black poking above the frame). */
export const SCREEN_SURFACE_RECT = {
  left: 0.1985,
  top: 0.1332,
  width: 0.546,
  height: 0.4235,
} as const;

/** Internal logical resolution of the fake OS (aspect matches SCREEN_RECT). */
export const OS_LOGICAL = { width: 1280, height: 740 } as const;

/**
 * The PC tower's glass front, as a fraction of the plate — where the fan glow
 * lives. Kept tight to the tower so the "off" wash doesn't spill onto the wall.
 */
export const PC_RECT = {
  left: 0.775,
  top: 0.33,
  width: 0.16,
  height: 0.34,
} as const;

/** Clickable power hotspot — the top-front of the tower. */
export const POWER_HOTSPOT_RECT = {
  left: 0.775,
  top: 0.315,
  width: 0.11,
  height: 0.08,
} as const;

/* ---- framing ---------------------------------------------------------------- */

/** DESK/INTRO: exactly fill the viewport width — no horizontal crop, so every
 *  prop (incl. the flower at the far right of the plate) stays on screen. */
export const DESK_FILL = 1;
/** Fraction of the vertical overflow cropped from the TOP (rest from bottom). */
export const DESK_TOP_CROP_FRAC = 0.32;

/** MONITOR/WORK: target monitor-screen width as a fraction of the viewport. */
export const WORK_SCREEN_WIDTH_FRAC = 0.82;
/** Clamp on the effective OS render scale so text stays readable / not huge. */
export const OS_SCALE = { min: 0.82, max: 1.32 } as const;
/** Negative lifts the monitor slightly above centre (more desk visible below). */
export const WORK_Y_BIAS_VH = -0.01;

export const CAMERA_MOVE = { duration: 1.5, ease: "power3.inOut" } as const;

/** Max parallax offset (px) applied to the whole stage on pointer move. */
export const PARALLAX_MAX_PX = 12;
