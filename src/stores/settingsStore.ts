import { create } from "zustand";
import {
  DEFAULT_WALLPAPER,
  isWallpaperId,
  type WallpaperId,
} from "@/data/wallpapers";

/**
 * User preferences — deliberately small (UI/icon size, wallpaper). Extend
 * here as needed (audio, theme); do not build a settings backend. Persisted
 * to localStorage; contains no private data.
 */
export type IconSize = "small" | "medium" | "large" | "xlarge";
export type { WallpaperId };

export const ICON_SIZES: IconSize[] = ["small", "medium", "large", "xlarge"];

/** Global OS UI scale multiplier per size tier — drives `--ui-scale`, which
 *  every OS/window/app stylesheet reads for font-size and icon dimensions. */
export const UI_SCALE: Record<IconSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.2,
  xlarge: 1.4,
};

interface Persisted {
  iconSize: IconSize;
  wallpaper: WallpaperId;
}

interface SettingsState extends Persisted {
  setIconSize: (size: IconSize) => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
}

const STORAGE_KEY = "portfolio:settings";
const DEFAULTS: Persisted = { iconSize: "large", wallpaper: DEFAULT_WALLPAPER };

function loadInitial(): Persisted {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Persisted> & {
      /** legacy field from the old day/dusk wallpaper system — migrate away */
      wallpaperTone?: string;
    };
    return {
      iconSize: ICON_SIZES.includes(parsed.iconSize as IconSize)
        ? (parsed.iconSize as IconSize)
        : DEFAULTS.iconSize,
      // any legacy value (old "day"/"dusk", or unknown) safely falls back
      wallpaper: isWallpaperId(parsed.wallpaper)
        ? parsed.wallpaper
        : DEFAULT_WALLPAPER,
    };
  } catch {
    return DEFAULTS;
  }
}

function persist(state: Persisted) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // private browsing / storage disabled — settings just won't persist
  }
}

export const useSettingsStore = create<SettingsState>()((set, get) => ({
  ...loadInitial(),
  setIconSize: (iconSize) => {
    set({ iconSize });
    persist({ iconSize, wallpaper: get().wallpaper });
  },
  setWallpaper: (wallpaper) => {
    set({ wallpaper });
    persist({ iconSize: get().iconSize, wallpaper });
  },
}));
