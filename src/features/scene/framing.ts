/**
 * Pure framing math for the scene "camera".
 *
 * The stage is a fixed-aspect-ratio box (the plate) that we scale + translate.
 * We never touch its aspect ratio, so the artwork can never distort.
 */

import {
  DESK_Y_BIAS_VH,
  DESK_ZOOM,
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
  /** Transform applied to the stage (transform-origin: 50% 50%). */
  scale: number;
  x: number;
  y: number;
  /** Scale applied to the 1280x800 OS root inside the screen clip. */
  osScale: number;
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

/** Largest box of PLATE_ASPECT that fits entirely inside the viewport ("contain"). */
function containStage(vw: number, vh: number) {
  const w = Math.min(vw, vh * PLATE_ASPECT);
  return { stageW: w, stageH: w / PLATE_ASPECT };
}

/**
 * SCREEN_RECT is exactly the OS aspect, so the 1280×800 root fills it. osScale
 * depends on the stage layout size only (the camera scale then multiplies the
 * whole stage visually), so it stays stable across the push animation.
 */
function osScaleFor(stageW: number) {
  return (SCREEN_RECT.width * stageW) / OS_LOGICAL.width;
}

export function computeFraming(
  vw: number,
  vh: number,
  mode: FramingMode,
): Framing {
  const { stageW, stageH } = containStage(vw, vh);
  const osScale = osScaleFor(stageW);

  if (mode === "desk") {
    return {
      stageW,
      stageH,
      scale: DESK_ZOOM,
      x: 0,
      y: DESK_Y_BIAS_VH * vh,
      osScale,
    };
  }

  // MONITOR/WORK: pick a camera scale so the effective OS render scale
  // (osScale * cameraScale) lands in a readable range, then recentre the screen.
  const desiredEffectiveOsScale =
    (WORK_SCREEN_WIDTH_FRAC * vw) / OS_LOGICAL.width;
  const effectiveOsScale = clamp(
    desiredEffectiveOsScale,
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
