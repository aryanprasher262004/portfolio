import type { CSSProperties } from "react";
import { InteractionHint } from "./InteractionHint";
import { POWER_HOTSPOT_RECT } from "./sceneConfig";
import styles from "./PowerControl.module.css";

const rectStyle: CSSProperties = {
  left: `${POWER_HOTSPOT_RECT.left * 100}%`,
  top: `${POWER_HOTSPOT_RECT.top * 100}%`,
  width: `${POWER_HOTSPOT_RECT.width * 100}%`,
  height: `${POWER_HOTSPOT_RECT.height * 100}%`,
};

/**
 * Invisible hotspot over the plate's real, physical power button — no drawn
 * icon of our own (the plate already shows the button). Off = looks exactly
 * like the plate. Hover = subtle themed glow. Click = press feedback. The
 * persistent "on" glow lives in `PcState`, which outlives this component
 * (unmounted once `phase` leaves "idle").
 */
export function PowerControl({ onPress }: { onPress: () => void }) {
  return (
    <button
      type="button"
      className={styles.hotspot}
      style={rectStyle}
      onClick={onPress}
      aria-label="Power on the computer"
      aria-describedby="hint-power"
    >
      <span className={styles.glow} aria-hidden />
      <InteractionHint
        id="hint-power"
        icon="⚡"
        title="Power on"
        body="Click to start the PC"
        className={styles.hint}
      />
    </button>
  );
}
