import { create } from "zustand";

/**
 * TWO independent state machines (kept deliberately decoupled — see
 * docs/PHASE_1_REFERENCE_ANALYSIS.md § 1.4):
 *
 *   phase  — the experience / boot state
 *   view   — the camera / framing state
 *
 * `desktop + desk` and `desktop + monitor` are both valid. Powering on never
 * moves the camera; only the focus control does.
 */
export type Phase = "idle" | "poweringOn" | "booting" | "login" | "desktop";
export type View = "desk" | "monitor";

const PHASE_ORDER: Phase[] = [
  "idle",
  "poweringOn",
  "booting",
  "login",
  "desktop",
];

interface ExperienceState {
  phase: Phase;
  view: View;
  /** Temporary: shows the dev control panel (enabled via `?dev=1`). */
  devMode: boolean;

  setDevMode: (on: boolean) => void;

  /** true once the machine is on (anything past idle). */
  isPowered: () => boolean;

  /** User action: press the power control. Only valid from idle. */
  powerOn: () => void;
  /** Internal/dev: jump to a specific phase. */
  setPhase: (phase: Phase) => void;
  /** Dev: step to the next phase. */
  advancePhase: () => void;

  enterMonitor: () => void;
  exitMonitor: () => void;
  toggleView: () => void;

  reset: () => void;
}

export const useExperienceStore = create<ExperienceState>()((set, get) => ({
  phase: "idle",
  view: "desk",
  devMode: false,

  setDevMode: (on) => set({ devMode: on }),

  isPowered: () => get().phase !== "idle",

  powerOn: () => {
    if (get().phase !== "idle") return;
    set({ phase: "poweringOn" });
    // PC glow ramps, then the monitor wakes as we enter the boot phase.
    setTimeout(() => {
      if (get().phase === "poweringOn") set({ phase: "booting" });
    }, 850);
  },
  setPhase: (phase) => set({ phase }),
  advancePhase: () => {
    const i = PHASE_ORDER.indexOf(get().phase);
    set({ phase: PHASE_ORDER[Math.min(i + 1, PHASE_ORDER.length - 1)]! });
  },

  enterMonitor: () => set({ view: "monitor" }),
  exitMonitor: () => set({ view: "desk" }),
  toggleView: () => set({ view: get().view === "desk" ? "monitor" : "desk" }),

  reset: () => set({ phase: "idle", view: "desk" }),
}));
