import type { ReactNode } from "react";
import type { View } from "@/stores/experienceStore";
import { FocusToggle } from "./FocusToggle";
import {
  OS_LOGICAL,
  rectStyle,
  SCREEN_RECT,
  SCREEN_SURFACE_RECT,
} from "./sceneConfig";
import styles from "./MonitorScreen.module.css";

interface MonitorScreenProps {
  /** Scale applied to the OS root so it fills SCREEN_RECT. */
  osScale: number;
  /** false = screen is dark (backlight off). */
  awake: boolean;
  /** null hides the focus control (PC not powered yet). */
  view: View | null;
  onToggleView: () => void;
  children: ReactNode;
}

const surfaceStyle = rectStyle(SCREEN_SURFACE_RECT);
const clipStyle = rectStyle(SCREEN_RECT);

/**
 * The real HTML monitor surface over the plate's screen opening. A child of the
 * transformed stage, so it tracks the artwork through the camera move.
 */
export function MonitorScreen({
  osScale,
  awake,
  view,
  onToggleView,
  children,
}: MonitorScreenProps) {
  return (
    <div className={styles.monitor} data-awake={awake}>
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
        {view && <FocusToggle view={view} onToggle={onToggleView} />}
      </div>
      <div
        className={styles.blackout}
        style={surfaceStyle}
        data-fx="blackout"
        aria-hidden
      />
      <div className={styles.glare} style={surfaceStyle} aria-hidden />
    </div>
  );
}
