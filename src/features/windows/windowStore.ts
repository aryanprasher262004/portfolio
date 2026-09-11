import { create } from "zustand";
import { UI_SCALE, useSettingsStore } from "@/stores/settingsStore";

/** Logical OS canvas — matches OS_LOGICAL in features/scene/sceneConfig.ts. */
const OS_W = 1280;
const OS_H = 609;
/** Base (unscaled) taskbar height; the rendered bar grows with --ui-scale
 *  (Taskbar.module.css), so clamping/centering reads the same live scale. */
const TASKBAR_H_BASE = 34;
function taskbarH() {
  return TASKBAR_H_BASE * UI_SCALE[useSettingsStore.getState().iconSize];
}

export interface OpenWindow {
  id: string;
  title: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  minimized: boolean;
}

interface WindowStoreState {
  windows: OpenWindow[];
  nextZ: number;
  focusedId: string | null;
  /** Opens (or focuses/restores, if already open — single-instance). */
  openWindow: (
    id: string,
    title: string,
    width: number,
    height: number,
  ) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  /** Taskbar-chip click: restore if minimized, minimize if focused, else focus. */
  toggleFromTaskbar: (id: string) => void;
}

function clampPosition(x: number, y: number, width: number) {
  const minX = -(width - 80);
  const maxX = OS_W - 80;
  const maxY = OS_H - taskbarH() - 30;
  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, 0), maxY),
  };
}

export const useWindowStore = create<WindowStoreState>()((set, get) => ({
  windows: [],
  nextZ: 10,
  focusedId: null,

  openWindow: (id, title, width, height) => {
    if (get().windows.some((w) => w.id === id)) {
      get().focusWindow(id);
      return;
    }
    const z = get().nextZ;
    const x = Math.round((OS_W - width) / 2);
    const y = Math.round((OS_H - taskbarH() - height) / 2);
    set((s) => ({
      windows: [
        ...s.windows,
        { id, title, x, y, z, width, height, minimized: false },
      ],
      nextZ: z + 1,
      focusedId: id,
    }));
  },

  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      focusedId: s.focusedId === id ? null : s.focusedId,
    })),

  focusWindow: (id) => {
    const z = get().nextZ;
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, z, minimized: false } : w,
      ),
      nextZ: z + 1,
      focusedId: id,
    }));
  },

  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, ...clampPosition(x, y, w.width) } : w,
      ),
    })),

  toggleFromTaskbar: (id) => {
    const w = get().windows.find((win) => win.id === id);
    if (!w) return;
    if (w.minimized) {
      get().focusWindow(id);
      return;
    }
    if (get().focusedId === id) {
      set((s) => ({
        windows: s.windows.map((win) =>
          win.id === id ? { ...win, minimized: true } : win,
        ),
        focusedId: null,
      }));
      return;
    }
    get().focusWindow(id);
  },
}));
