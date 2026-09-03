import type { Phase } from "@/stores/experienceStore";
import styles from "./ScreenPlaceholder.module.css";

const LABEL: Record<Phase, string> = {
  idle: "",
  poweringOn: "",
  booting: "BOOTING",
  login: "LOGIN",
  desktop: "DESKTOP",
};

/**
 * Temporary monitor contents. The real OS (loading / login / desktop / windows)
 * arrives in Phases 1.5–1.6.
 */
export function ScreenPlaceholder({ phase }: { phase: Phase }) {
  return (
    <div className={styles.root}>
      <div className={styles.grid} aria-hidden />
      <div className={styles.center}>
        <p className={styles.title}>
          <span className={styles.dot} />
          {LABEL[phase] || "MONITOR SURFACE"}
        </p>
        <p className={styles.note}>
          {OS_NOTE[phase] ?? "real HTML/CSS · 1280 × 740 logical"}
        </p>
      </div>
    </div>
  );
}

const OS_NOTE: Partial<Record<Phase, string>> = {
  booting: "loading screen lands in 1.5",
  login: "login screen lands in 1.5",
  desktop: "desktop + windows land in 1.5–1.6",
};
