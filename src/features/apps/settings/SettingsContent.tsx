import { WALLPAPERS } from "@/data/wallpapers";
import { type IconSize, useSettingsStore } from "@/stores/settingsStore";
import styles from "./SettingsContent.module.css";

const SIZES: { id: IconSize; label: string }[] = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
  { id: "xlarge", label: "Extra Large" },
];

/**
 * Minimal settings surface — icon/UI size + wallpaper today. Extend here
 * (audio, theme) as those phases land; do not build a settings backend.
 */
export function SettingsContent() {
  const iconSize = useSettingsStore((s) => s.iconSize);
  const setIconSize = useSettingsStore((s) => s.setIconSize);
  const wallpaper = useSettingsStore((s) => s.wallpaper);
  const setWallpaper = useSettingsStore((s) => s.setWallpaper);

  return (
    <div className={styles.root}>
      <section className={styles.group}>
        <h3 className={styles.heading}>View / icon size</h3>
        <div className={styles.options}>
          {SIZES.map((size) => (
            <label key={size.id} className={styles.option}>
              <input
                type="radio"
                name="iconSize"
                checked={iconSize === size.id}
                onChange={() => setIconSize(size.id)}
              />
              {size.label}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.heading}>Wallpaper</h3>
        <div className={styles.options}>
          {WALLPAPERS.map((w) => (
            <label key={w.id} className={styles.option}>
              <input
                type="radio"
                name="wallpaper"
                checked={wallpaper === w.id}
                onChange={() => setWallpaper(w.id)}
              />
              {w.label}
            </label>
          ))}
        </div>
      </section>

      <p className={styles.note}>
        Preferences save automatically to this browser.
      </p>
    </div>
  );
}
