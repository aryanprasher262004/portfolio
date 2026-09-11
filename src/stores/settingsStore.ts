import { create } from "zustand";

/**
 * User preferences — deliberately small (icon size, wallpaper tone). Extend
 * here as needed (audio, theme); do not build a settings backend. Persisted
 * to localStorage; contains no private data.
 */
export type IconSize = "small" | "medium" | "large";
export type WallpaperTone = "day" | "dusk";

interface Persisted {
  iconSize: IconSize;
  wallpaperTone: WallpaperTone;
}

interface SettingsState extends Persisted {
  setIconSize: (size: IconSize) => void;
  setWallpaperTone: (tone: WallpaperTone) => void;
}

const STORAGE_KEY = "portfolio:settings";
const DEFAULTS: Persisted = { iconSize: "medium", wallpaperTone: "day" };

function loadInitial(): Persisted {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      iconSize:
        parsed.iconSize === "small" || parsed.iconSize === "large"
          ? parsed.iconSize
          : "medium",
      wallpaperTone: parsed.wallpaperTone === "dusk" ? "dusk" : "day",
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
    persist({ iconSize, wallpaperTone: get().wallpaperTone });
  },
  setWallpaperTone: (wallpaperTone) => {
    set({ wallpaperTone });
    persist({ iconSize: get().iconSize, wallpaperTone });
  },
}));
