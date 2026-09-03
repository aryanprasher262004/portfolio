/**
 * Pure framing math for the scene "camera".
 *
 * Scale-1 stage = fills the viewport WIDTH (height overflows and is cropped).
 * The stage box always has PLATE_ASPECT, so the artwork can never distort.
 * Reframing = scale + translate only.
 */

import {
  DESK_FILL,
  DESK_TOP_CROP_FRAC,
  OS_LOGICAL,
  OS_SCALE,
  PLATE_ASPECT,
  SCREEN_RECT,
  WORK_SCREEN_WIDTH_FRAC,
  WORK_Y_BIAS_VH,
} from "./sceneConfig";

export type FramingMode = "desk" | "monitor";

export interface Framing {
  /** Stage layout size in px (aspect always === PLATE_ASPECT). */
  stageW: number;
  stageH: number;
  /** Transform on the stage (transform-origin: 50% 50%). */
  scale: number;
  x: number;
  y: number;
  /** Scale applied to the OS root so it fills SCREEN_RECT. */
  osScale: number;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

export function computeFraming(
  vw: number,
  vh: number,
  mode: FramingMode,
): Framing {
  const stageW = vw;
  const stageH = vw / PLATE_ASPECT;
  const osScale = (SCREEN_RECT.width * stageW) / OS_LOGICAL.width;

  if (mode === "desk") {
    const scale = DESK_FILL;
    // stage is taller than the viewport → bias the crop toward the bottom so the
    // monitor's top edge is never clipped.
    const overflow = stageH * scale - vh;
    const y = overflow > 0 ? overflow * (0.5 - DESK_TOP_CROP_FRAC) : 0;
    return { stageW, stageH, scale, x: 0, y, osScale };
  }

  // MONITOR/WORK — choose a camera scale for a readable screen, then recentre it.
  const effectiveOsScale = clamp(
    (WORK_SCREEN_WIDTH_FRAC * vw) / OS_LOGICAL.width,
    OS_SCALE.min,
    OS_SCALE.max,
  );
  const cameraScale = effectiveOsScale / osScale;

  const screenCenterFracX = SCREEN_RECT.left + SCREEN_RECT.width / 2 - 0.5;
  const screenCenterFracY = SCREEN_RECT.top + SCREEN_RECT.height / 2 - 0.5;

  return {
    stageW,
    stageH,
    scale: cameraScale,
    x: -screenCenterFracX * stageW * cameraScale,
    y: -screenCenterFracY * stageH * cameraScale + WORK_Y_BIAS_VH * vh,
    osScale,
  };
}
