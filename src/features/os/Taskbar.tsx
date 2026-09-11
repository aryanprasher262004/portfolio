"use client";

import { useEffect, useState } from "react";
import styles from "./Taskbar.module.css";

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Prototype-grade taskbar: Start button (inert — start menu is a later
 * phase), empty running-app area (reserved for Phase 1.6+ windows), live clock.
 */
export function Taskbar() {
  // Lazy initial state — this subtree only ever mounts client-side (inside
  // the scene's `ready` gate), so there is no SSR/client mismatch to worry
  // about, and it keeps us clear of the set-state-in-effect-body rule.
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.bar}>
      <button type="button" className={styles.start} aria-label="Start menu">
        <span className={styles.startDot} aria-hidden />
        START
      </button>
      <div className={styles.tasks} />
      <div className={styles.clock}>{formatTime(now)}</div>
    </div>
  );
}
