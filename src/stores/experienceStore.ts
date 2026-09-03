import { create } from "zustand";

/**
 * The boot/experience state machine.
 * Phases beyond `idle` / `desktop` are wired up in Phases 1.4–1.5.
 */
export type Phase = "idle" | "poweredOn" | "booting" | "login" | "desktop";

/** Ordered — used to decide framing and forward-only transitions. */
const ORDER: Phase[] = ["idle", "poweredOn", "booting", "login", "desktop"];

interface ExperienceState {
  phase: Phase;
  /** true once the camera should sit in MONITOR/WORK framing. */
  atMonitor: boolean;
  setPhase: (phase: Phase) => void;
  advance: () => void;
  reset: () => void;
}

function framingForPhase(phase: Phase): boolean {
  // DESK/INTRO while idle; MONITOR/WORK from power-on onward.
  return phase !== "idle";
}

export const useExperienceStore = create<ExperienceState>()((set, get) => ({
  phase: "idle",
  atMonitor: false,
  setPhase: (phase) => set({ phase, atMonitor: framingForPhase(phase) }),
  advance: () => {
    const i = ORDER.indexOf(get().phase);
    const next = ORDER[Math.min(i + 1, ORDER.length - 1)]!;
    set({ phase: next, atMonitor: framingForPhase(next) });
  },
  reset: () => set({ phase: "idle", atMonitor: false }),
}));
