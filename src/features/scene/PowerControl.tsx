import { InteractionHint } from "./InteractionHint";
import { POWER_HOTSPOT_RECT, rectStyle } from "./sceneConfig";
import styles from "./PowerControl.module.css";

const hotspotStyle = rectStyle(POWER_HOTSPOT_RECT);

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
      style={hotspotStyle}
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
