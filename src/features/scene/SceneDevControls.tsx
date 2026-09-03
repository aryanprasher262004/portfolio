"use client";

import { useExperienceStore } from "@/stores/experienceStore";
import styles from "./SceneDevControls.module.css";

/**
 * TEMPORARY dev-only panel. The normal visitor flow (power control + focus
 * toggle) works without it. Remove before V1.
 */
export function SceneDevControls() {
  const phase = useExperienceStore((s) => s.phase);
  const view = useExperienceStore((s) => s.view);
  const powerOn = useExperienceStore((s) => s.powerOn);
  const advancePhase = useExperienceStore((s) => s.advancePhase);
  const toggleView = useExperienceStore((s) => s.toggleView);
  const reset = useExperienceStore((s) => s.reset);

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
