"use client";

import { useState } from "react";
import { useWindowStore } from "@/features/windows/windowStore";
import {
  type IconSize,
  type WallpaperTone,
  useSettingsStore,
} from "@/stores/settingsStore";
import styles from "./menu.module.css";

const SIZES: { id: IconSize; label: string }[] = [
  { id: "small", label: "Small icons" },
  { id: "medium", label: "Medium icons" },
  { id: "large", label: "Large icons" },
];

const TONES: { id: WallpaperTone; label: string }[] = [
  { id: "day", label: "Day" },
  { id: "dusk", label: "Dusk" },
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
  const wallpaperTone = useSettingsStore((s) => s.wallpaperTone);
  const setWallpaperTone = useSettingsStore((s) => s.setWallpaperTone);
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
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={styles.item}
                  data-active={wallpaperTone === t.id}
                  onClick={() => {
                    setWallpaperTone(t.id);
                    onClose();
                  }}
                >
                  {t.label}
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
