"use client";

import { useExperienceStore } from "@/stores/experienceStore";
import styles from "./SceneDevControls.module.css";

/**
 * TEMPORARY dev-only panel, shown only when the URL has `?dev=1` (see Scene.tsx).
 * The normal visitor flow (power control + focus toggle) works without it.
 * Remove before V1.
 */
export function SceneDevControls() {
  const devMode = useExperienceStore((s) => s.devMode);
  const phase = useExperienceStore((s) => s.phase);
  const view = useExperienceStore((s) => s.view);
  const powerOn = useExperienceStore((s) => s.powerOn);
  const advancePhase = useExperienceStore((s) => s.advancePhase);
  const toggleView = useExperienceStore((s) => s.toggleView);
  const reset = useExperienceStore((s) => s.reset);

  if (!devMode) return null;

  return (
    <div className={styles.panel}>
      <span className={styles.tag}>
        DEV phase:{phase} view:{view}
      </span>
      <button type="button" onClick={powerOn} disabled={phase !== "idle"}>
        power
      </button>
      <button type="button" onClick={advancePhase}>
        phase →
      </button>
      <button type="button" onClick={toggleView}>
        {view === "desk" ? "focus" : "restore"}
      </button>
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
