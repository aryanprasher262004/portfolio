"use client";

import { useState } from "react";
import { useWindowStore } from "@/features/windows/windowStore";
import { WALLPAPERS } from "@/data/wallpapers";
import { type IconSize, useSettingsStore } from "@/stores/settingsStore";
import styles from "./menu.module.css";

const SIZES: { id: IconSize; label: string }[] = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
  { id: "xlarge", label: "Extra Large" },
];

/** Desktop right-click menu: View (icon size), Wallpaper, Settings. */
export function ContextMenu({
  x,
  y,
  onClose,
}: {
  x: number;
  y: number;
  onClose: () => void;
}) {
  const [sub, setSub] = useState<"view" | "wallpaper" | null>(null);
  const iconSize = useSettingsStore((s) => s.iconSize);
  const setIconSize = useSettingsStore((s) => s.setIconSize);
  const wallpaper = useSettingsStore((s) => s.wallpaper);
  const setWallpaper = useSettingsStore((s) => s.setWallpaper);
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div
        className={styles.menu}
        style={{ left: x, top: y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.itemRow}
          onMouseEnter={() => setSub("view")}
          onMouseLeave={() => setSub((s) => (s === "view" ? null : s))}
        >
          <button type="button" className={styles.item}>
            View <span aria-hidden>›</span>
          </button>
          {sub === "view" && (
            <div className={`${styles.menu} ${styles.submenu}`}>
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.item}
                  data-active={iconSize === s.id}
                  onClick={() => {
                    setIconSize(s.id);
                    onClose();
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className={styles.itemRow}
          onMouseEnter={() => setSub("wallpaper")}
          onMouseLeave={() => setSub((s) => (s === "wallpaper" ? null : s))}
        >
          <button type="button" className={styles.item}>
            Wallpaper <span aria-hidden>›</span>
          </button>
          {sub === "wallpaper" && (
            <div className={`${styles.menu} ${styles.submenu}`}>
              {WALLPAPERS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className={styles.item}
                  data-active={wallpaper === w.id}
                  onClick={() => {
                    setWallpaper(w.id);
                    onClose();
                  }}
                >
                  {w.label}
                </button>
              ))}
            </div>
          )}
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
      </div>
    </div>
  );
}
