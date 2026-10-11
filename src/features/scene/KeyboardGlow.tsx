import { KEYBOARD_RECT, rectStyle } from "./sceneConfig";
import styles from "./KeyboardGlow.module.css";

const keyboardStyle = rectStyle(KEYBOARD_RECT);

/**
 * Keyboard backlight as a soft underglow on the desk around the keyboard's
 * frame (an outer box-shadow never paints over the keyboard itself). If this
 * reads fake, the fallback is a per-key alpha mask (owner-approved asset only).
 */
export function KeyboardGlow({ powered }: { powered: boolean }) {
  return (
    <div
      className={styles.glow}
      style={keyboardStyle}
      data-powered={powered}
      data-fx="kbd"
      aria-hidden
    />
  );
}
