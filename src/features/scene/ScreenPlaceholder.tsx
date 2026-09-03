import type { Phase } from "@/stores/experienceStore";
import styles from "./ScreenPlaceholder.module.css";

/**
 * Temporary contents of the monitor for Phase 1.3.
 * The real OS (loading / login / desktop / windows) arrives in Phases 1.4–1.6.
 */
export function ScreenPlaceholder({ phase }: { phase: Phase }) {
  return (
    <div className={styles.root}>
      <div className={styles.grid} aria-hidden />
      <div className={styles.label}>
        <span className={styles.dot} />
        MONITOR SURFACE — {phase.toUpperCase()}
      </div>
      <p className={styles.note}>
        1280 × 800 logical · real HTML/CSS · OS lands in 1.4–1.6
      </p>
    </div>
  );
}
