import type { CSSProperties } from "react";
import { PC_RECT, POWER_HOTSPOT_RECT } from "./sceneConfig";
import styles from "./PcState.module.css";

const towerStyle: CSSProperties = {
  left: `${PC_RECT.left * 100}%`,
  top: `${PC_RECT.top * 100}%`,
  width: `${PC_RECT.width * 100}%`,
  height: `${PC_RECT.height * 100}%`,
};

const buttonStyle: CSSProperties = {
  left: `${POWER_HOTSPOT_RECT.left * 100}%`,
  top: `${POWER_HOTSPOT_RECT.top * 100}%`,
  width: `${POWER_HOTSPOT_RECT.width * 100}%`,
  height: `${POWER_HOTSPOT_RECT.height * 100}%`,
};

/**
 * Sits over the PC tower. The plate's OFF artwork is already correct/sharp —
 * no wash applied here. On power-on a warm bloom pulses once across the
 * tower, and the physical power button (baked into the plate) gets a
 * persistent soft glow for as long as the PC stays powered.
 */
export function PcState({ powered }: { powered: boolean }) {
  return (
    <div className={styles.pc} data-powered={powered} aria-hidden>
      <div className={styles.bloom} style={towerStyle} />
      <div className={styles.buttonGlow} style={buttonStyle} />
    </div>
  );
}
