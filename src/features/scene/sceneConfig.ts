/**
 * Prototype scene configuration.
 *
 * Temporary asset: `references/concept/p6.png` copied to `public/prototype/plate.png`.
 * The scene is NEVER stretched — the plate keeps its native aspect ratio at all
 * times. Reframing is proportional scale + translate only (see `framing.ts`).
 */

export const PLATE = {
  src: "/prototype/plate.png",
  naturalWidth: 1448,
  naturalHeight: 1086,
} as const;

export const PLATE_ASPECT = PLATE.naturalWidth / PLATE.naturalHeight; // ~1.333

/**
 * The measured bright screen area of p6 (bbox x:[290..1076] y:[146..600] of
 * 1448x1086, aspect ≈ 1.73), overscanned a few px so no artwork white leaks.
 * Painted solid black — the "screen surface". The OS sits inside it.
 */
export const SCREEN_SURFACE_RECT = {
  left: 0.194,
  top: 0.126,
  width: 0.556,
  height: 0.437,
} as const;

/**
 * Where the 1280x800 OS actually renders — a 1.6-aspect sub-rect of the surface
 * (full height, centred), so the OS fills it exactly with no letterbox or clip.
 * The ~4% on each side is black inner bezel.
 */
export const SCREEN_RECT = {
  left: 0.2208,
  top: 0.1344,
  width: 0.5017,
  height: 0.4181, // (0.5017 * 1448) / (0.4181 * 1086) ≈ 1.60
} as const;

/** Internal logical resolution of the fake OS. */
export const OS_LOGICAL = { width: 1280, height: 800 } as const;

/**
 * MONITOR/WORK framing target: the monitor screen should span roughly this
 * fraction of the viewport width. Not a hard requirement — readability is. The
 * effective OS render scale (≈ target * vw / OS width) is clamped to OS_SCALE.
 */
export const WORK_SCREEN_WIDTH_FRAC = 0.78;
export const OS_SCALE = { min: 0.8, max: 1.3 } as const;

/** DESK/INTRO framing: fit the whole plate, then a gentle zoom to reduce margins. */
export const DESK_ZOOM = 1.2;
/** Positive nudges the framing down (more wall headroom, less under-desk). */
export const DESK_Y_BIAS_VH = 0.03;
/** Negative lifts the monitor slightly above centre so more desk/PC shows below. */
export const WORK_Y_BIAS_VH = -0.02;

export const CAMERA_PUSH = { duration: 2.4, ease: "power2.inOut" } as const;

/** Max parallax offset (px) applied to the whole stage on pointer move. */
export const PARALLAX_MAX_PX = 10;
