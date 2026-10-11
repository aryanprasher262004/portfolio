export type WallpaperId = "morning" | "fantasy" | "space";

export interface WallpaperOption {
  id: WallpaperId;
  label: string;
  src: string;
}

/**
 * Data-driven wallpaper list. Adding a new one requires only an asset in
 * `public/assets/wallpapers/` and an entry here — no other code changes.
 */
export const WALLPAPERS: WallpaperOption[] = [
  { id: "morning", label: "Morning", src: "/assets/wallpapers/morning.webp" },
  { id: "fantasy", label: "Fantasy", src: "/assets/wallpapers/fantasy.webp" },
  { id: "space", label: "Space", src: "/assets/wallpapers/space.webp" },
];

export const DEFAULT_WALLPAPER: WallpaperId = "morning";

export function isWallpaperId(value: unknown): value is WallpaperId {
  return WALLPAPERS.some((w) => w.id === value);
}

/** WALLPAPERS is a non-empty literal, so the fallback always resolves. */
export function getWallpaper(id: WallpaperId): WallpaperOption {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]!;
}
