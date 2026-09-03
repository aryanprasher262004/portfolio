import type { CSSProperties } from "react";
import { POWER_HOTSPOT_RECT } from "./sceneConfig";
import styles from "./PowerControl.module.css";

const rectStyle: CSSProperties = {
  left: `${POWER_HOTSPOT_RECT.left * 100}%`,
  top: `${POWER_HOTSPOT_RECT.top * 100}%`,
  width: `${POWER_HOTSPOT_RECT.width * 100}%`,
  height: `${POWER_HOTSPOT_RECT.height * 100}%`,
};

/**
 * Fake HTML power button positioned over the PC tower's top-front. Discoverable
 * on hover (glow + power glyph + tooltip), then triggers the power sequence.
 */
export function PowerControl({ onPress }: { onPress: () => void }) {
  return (
    <button
      type="button"
      className={styles.hotspot}
      style={rectStyle}
      onClick={onPress}
      aria-label="Power on the computer"
    >
      <span className={styles.glow} aria-hidden />
      <span className={styles.glyph} aria-hidden>
        <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
          <path
            d="M7 2h2v6H7z M4 4h1v1H4z M3 5h1v2H3z M3 7h1v2H3z M4 9h1v2H4z M5 11h2v1H5z M7 12h2v1H7z M9 11h2v1H9z M11 9h1v2h-1z M12 7h1v2h-1z M12 5h1v2h-1z M11 4h1v1h-1z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={styles.tooltip} aria-hidden>
        POWER
      </span>
    </button>
  );
}
