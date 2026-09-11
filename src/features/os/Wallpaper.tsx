import { getWallpaper, type WallpaperId } from "@/data/wallpapers";
import styles from "./Wallpaper.module.css";

/** Renders the selected wallpaper image, cover-fit, never stretched. */
export function Wallpaper({ id }: { id: WallpaperId }) {
  const wallpaper = getWallpaper(id);
  return (
    <div
      className={styles.wallpaper}
      aria-hidden
      style={{ backgroundImage: `url(${wallpaper.src})` }}
    />
  );
}
