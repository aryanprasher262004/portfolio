"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useExperienceStore } from "@/stores/experienceStore";
import styles from "./Loading.module.css";

const STEPS = [
  "ABOUT",
  "PROJECTS",
  "EXPERIENCE + EDUCATION",
  "SKILLS + ACHIEVEMENTS",
  "RESUME",
  "CONTACT",
] as const;

const STEP_MS = 340;
const HOLD_MS = 450;

/**
 * Staged, honest loader — each step is a timed reveal, not a fake network
 * percentage. Advances phase to "login" on its own when done.
 */
export function Loading() {
  const [stepIndex, setStepIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const setPhase = useExperienceStore((s) => s.setPhase);

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(() => setPhase("login"), 500);
      return () => window.clearTimeout(t);
    }
    const timers = STEPS.map((_, i) =>
      window.setTimeout(() => setStepIndex(i), i * STEP_MS),
    );
    const readyTimer = window.setTimeout(
      () => setReady(true),
      STEPS.length * STEP_MS,
    );
    const doneTimer = window.setTimeout(
      () => setPhase("login"),
      STEPS.length * STEP_MS + HOLD_MS,
    );
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(readyTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduced, setPhase]);

  const progress = ready ? 1 : (stepIndex + 1) / STEPS.length;

  return (
    <div className={styles.root}>
      <p className={styles.count}>
        LOADING {Math.min(stepIndex + 1, STEPS.length)} OF {STEPS.length}
      </p>
      <p className={styles.step}>
        {ready ? "READY." : `INITIALIZING ${STEPS[stepIndex]}…`}
      </p>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
