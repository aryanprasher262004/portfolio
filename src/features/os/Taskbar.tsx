"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/features/windows/windowStore";
import styles from "./Taskbar.module.css";

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Start button (opens the Start menu), a chip per open window — click
 * restores/focuses it, or minimizes it if already focused — and a live clock.
 */
export function Taskbar({ onStartClick }: { onStartClick: () => void }) {
  // Lazy initial state — this subtree only ever mounts client-side (inside
  // the scene's `ready` gate), so there is no SSR/client mismatch to worry
  // about, and it keeps us clear of the set-state-in-effect-body rule.
  const [now, setNow] = useState(() => new Date());
  const windows = useWindowStore((s) => s.windows);
  const focusedId = useWindowStore((s) => s.focusedId);
  const toggleFromTaskbar = useWindowStore((s) => s.toggleFromTaskbar);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.start}
        aria-label="Start menu"
        onClick={onStartClick}
      >
        <span className={styles.startDot} aria-hidden />
        START
      </button>
      <div className={styles.tasks}>
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            className={styles.task}
            data-active={w.id === focusedId}
            data-minimized={w.minimized}
            onClick={() => toggleFromTaskbar(w.id)}
          >
            {w.title}
          </button>
        ))}
      </div>
      <div className={styles.clock}>{formatTime(now)}</div>
    </div>
  );
}
