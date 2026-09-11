"use client";

import type { CSSProperties } from "react";
import { useExperienceStore } from "@/stores/experienceStore";
import { UI_SCALE, useSettingsStore } from "@/stores/settingsStore";
import { Desktop } from "./Desktop";
import { Loading } from "./Loading";
import { Login } from "./Login";
import styles from "./OS.module.css";

/**
 * Root of the fake OS. Reads its own phase from the store — knows nothing
 * about the scene/rendering layer (insulation rule, DEC-006).
 *
 * Sets `--ui-scale` here, once, from the user's icon/UI-size preference. Every
 * OS/window/app stylesheet reads this custom property for font-size and icon
 * dimensions — it cascades through the DOM regardless of CSS Module
 * boundaries, so this is the single point of control for global UI scale.
 */
export function OS() {
  const phase = useExperienceStore((s) => s.phase);
  const iconSize = useSettingsStore((s) => s.iconSize);

  let content = null;
  if (phase === "booting") content = <Loading />;
  else if (phase === "login") content = <Login />;
  else if (phase === "desktop") content = <Desktop />;
  // idle / poweringOn — screen is covered by the blackout anyway.
  if (!content) return null;

  const uiScaleStyle = {
    "--ui-scale": UI_SCALE[iconSize],
  } as CSSProperties;

  return (
    <div className={styles.root} style={uiScaleStyle}>
      {content}
    </div>
  );
}
