import type { CSSProperties, ReactNode } from "react";
import { OS_LOGICAL, SCREEN_RECT, SCREEN_SURFACE_RECT } from "./sceneConfig";
import styles from "./MonitorScreen.module.css";

interface MonitorScreenProps {
  /** Scale applied to the 1280×800 OS root so it fills SCREEN_RECT. */
  osScale: number;
  /** false = screen is dark (backlight off). */
  powered: boolean;
  children: ReactNode;
}

const pct = (r: {
  left: number;
  top: number;
  width: number;
  height: number;
}): CSSProperties => ({
  left: `${r.left * 100}%`,
  top: `${r.top * 100}%`,
  width: `${r.width * 100}%`,
  height: `${r.height * 100}%`,
});

const surfaceStyle = pct(SCREEN_SURFACE_RECT);
const clipStyle = pct(SCREEN_RECT);

/**
 * The real HTML monitor surface, positioned over the plate's screen opening.
 * A child of the transformed stage, so it tracks the artwork through the camera
 * push. The OS renders at a fixed logical resolution and is scaled to fit.
 */
export function MonitorScreen({
  osScale,
  powered,
  children,
}: MonitorScreenProps) {
  return (
    <div className={styles.monitor} data-powered={powered}>
      <div className={styles.surface} style={surfaceStyle} aria-hidden />
      <div className={styles.clip} style={clipStyle}>
        <div
          className={styles.osRoot}
          style={{
            width: OS_LOGICAL.width,
            height: OS_LOGICAL.height,
            transform: `scale(${osScale})`,
          }}
        >
          {children}
        </div>
      </div>
      <div className={styles.blackout} style={surfaceStyle} aria-hidden />
      <div className={styles.glare} style={surfaceStyle} aria-hidden />
    </div>
  );
}
