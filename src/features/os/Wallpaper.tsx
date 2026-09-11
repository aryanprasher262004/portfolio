import styles from "./Wallpaper.module.css";

/**
 * Shared placeholder pixel-landscape background for Login (dusk) and Desktop
 * (day). Pure CSS — no image asset yet. Final wallpaper is Phase 3/10.
 */
export function Wallpaper({ tone }: { tone: "day" | "dusk" }) {
  return (
    <div className={styles.wallpaper} data-tone={tone} aria-hidden>
      <div className={styles.sky} />
      <div className={styles.sun} />
      <div className={`${styles.range} ${styles.rangeBack}`} />
      <div className={`${styles.range} ${styles.rangeFront}`} />
      <div className={styles.ground} />
    </div>
  );
}
