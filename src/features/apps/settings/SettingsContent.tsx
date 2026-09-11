import {
  type IconSize,
  type WallpaperTone,
  useSettingsStore,
} from "@/stores/settingsStore";
import styles from "./SettingsContent.module.css";

const SIZES: IconSize[] = ["small", "medium", "large"];
const TONES: WallpaperTone[] = ["day", "dusk"];

/**
 * Minimal settings surface — icon size + wallpaper tone today. Extend here
 * (audio, theme) as those phases land; do not build a settings backend.
 */
export function SettingsContent() {
  const iconSize = useSettingsStore((s) => s.iconSize);
  const setIconSize = useSettingsStore((s) => s.setIconSize);
  const wallpaperTone = useSettingsStore((s) => s.wallpaperTone);
  const setWallpaperTone = useSettingsStore((s) => s.setWallpaperTone);

  return (
    <div className={styles.root}>
      <section className={styles.group}>
        <h3 className={styles.heading}>Desktop icon size</h3>
        <div className={styles.options}>
          {SIZES.map((size) => (
            <label key={size} className={styles.option}>
              <input
                type="radio"
                name="iconSize"
                checked={iconSize === size}
                onChange={() => setIconSize(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h3 className={styles.heading}>Wallpaper</h3>
        <div className={styles.options}>
          {TONES.map((tone) => (
            <label key={tone} className={styles.option}>
              <input
                type="radio"
                name="wallpaperTone"
                checked={wallpaperTone === tone}
                onChange={() => setWallpaperTone(tone)}
              />
              {tone}
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
