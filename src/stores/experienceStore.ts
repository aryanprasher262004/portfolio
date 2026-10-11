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
  /** Called by the scene's power-on choreography at its monitor-wake beat
   *  (DEC-019): `poweringOn` → `booting`. No-op from any other phase. */
  completePowerOn: () => void;
  /** Simulated OS action: replay the boot sequence (Start menu → Restart). */
  restart: () => void;
  /** Simulated OS action: power off (Start menu → Shut Down). Same as reset(). */
  shutDown: () => void;
  /** Internal/dev: jump to a specific phase. */
  setPhase: (phase: Phase) => void;
  /** Dev: step to the next phase. */
  advancePhase: () => void;

  enterMonitor: () => void;
  exitMonitor: () => void;
  toggleView: () => void;

  reset: () => void;
}

/**
 * The power-on choreography lives in the renderer (`features/scene`, DEC-019)
 * and calls `completePowerOn()` itself. This is only a safety net so the
 * experience can never get stuck in `poweringOn` if no scene drives it.
 */
const POWER_ON_FALLBACK_MS = 8000;
let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
function armPowerOnFallback(get: () => ExperienceState) {
  clearTimeout(fallbackTimer);
  fallbackTimer = setTimeout(
    () => get().completePowerOn(),
    POWER_ON_FALLBACK_MS,
  );
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
    armPowerOnFallback(get);
  },
  completePowerOn: () => {
    if (get().phase === "poweringOn") set({ phase: "booting" });
  },
  restart: () => {
    set({ phase: "poweringOn", view: "desk" });
    armPowerOnFallback(get);
  },
  shutDown: () => set({ phase: "idle", view: "desk" }),

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
