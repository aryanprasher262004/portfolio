"use client";

import { useWindowStore } from "@/features/windows/windowStore";
import { useExperienceStore } from "@/stores/experienceStore";
import styles from "./menu.module.css";

/**
 * Start-menu popup. Search is UI-only for now (Phase 6 wires a real index);
 * Restart/Shut Down are simulated OS actions on the existing experience state
 * machine — no real power management, obviously.
 */
export function StartMenu({ onClose }: { onClose: () => void }) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const restart = useExperienceStore((s) => s.restart);
  const shutDown = useExperienceStore((s) => s.shutDown);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.menu}
        style={{ left: 0, bottom: 34, minWidth: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.itemRow}>
          <input
            type="text"
            placeholder="Search — coming soon"
            disabled
            className={styles.item}
            style={{ width: "100%", cursor: "default" }}
          />
        </div>
        <div className={styles.separator} />
        <button
          type="button"
          className={styles.item}
          onClick={() => {
            openWindow("settings", "Settings", 360, 300);
            onClose();
          }}
        >
          Settings
        </button>
        <div className={styles.separator} />
        <button
          type="button"
          className={styles.item}
          onClick={() => {
            restart();
            onClose();
          }}
        >
          Restart
        </button>
        <button
          type="button"
          className={styles.item}
          onClick={() => {
            shutDown();
            onClose();
          }}
        >
          Shut Down
        </button>
      </div>
    </div>
  );
}
