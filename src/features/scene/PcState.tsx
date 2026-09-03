import type { CSSProperties } from "react";
import { PC_RECT } from "./sceneConfig";
import styles from "./PcState.module.css";

const rectStyle: CSSProperties = {
  left: `${PC_RECT.left * 100}%`,
  top: `${PC_RECT.top * 100}%`,
  width: `${PC_RECT.width * 100}%`,
  height: `${PC_RECT.height * 100}%`,
};

/**
 * Sits over the PC tower. When off, a dark wash mutes the (baked-in) fan glow.
 * On power-on the wash lifts and a warm bloom pulses.
 */
export function PcState({ powered }: { powered: boolean }) {
  return (
    <div
      className={styles.pc}
      style={rectStyle}
      data-powered={powered}
      aria-hidden
    >
      <div className={styles.off} />
      <div className={styles.bloom} />
    </div>
  );
}
