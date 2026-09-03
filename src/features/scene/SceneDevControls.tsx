"use client";

import { useExperienceStore } from "@/stores/experienceStore";
import styles from "./SceneDevControls.module.css";

/**
 * TEMPORARY dev-only control panel for prototyping the camera / framing.
 * Replaced by the real power interaction in Phase 1.4. Remove before V1.
 */
export function SceneDevControls() {
  const phase = useExperienceStore((s) => s.phase);
  const advance = useExperienceStore((s) => s.advance);
  const reset = useExperienceStore((s) => s.reset);

  return (
    <div className={styles.panel}>
      <span className={styles.tag}>DEV · phase: {phase}</span>
      <button type="button" onClick={advance}>
        advance →
      </button>
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}
