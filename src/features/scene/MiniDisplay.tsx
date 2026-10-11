"use client";

import { useEffect, useState } from "react";
import {
  MINI_DISPLAY_RECT,
  MINI_DISPLAY_SKEW_DEG,
  rectStyle,
} from "./sceneConfig";
import styles from "./MiniDisplay.module.css";

const displayStyle = {
  ...rectStyle(MINI_DISPLAY_RECT),
  transform: `skewY(${MINI_DISPLAY_SKEW_DEG}deg)`,
};

/** The visitor's local time, split so a 12h day period can render smaller. */
function readTime() {
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date());
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";
  return { hm: `${get("hour")}:${get("minute")}`, period: get("dayPeriod") };
}

function useLocalTime(enabled: boolean) {
  const [time, setTime] = useState<ReturnType<typeof readTime> | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const tick = () => setTime(readTime());
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, [enabled]);
  return time;
}

/**
 * The small desk device's screen. Off with the PC; on power-on the
 * choreography (`usePowerSequence`) steps it through SYS → SYS OK → READY via
 * the `data-mini` layers, and it settles on the visitor's local time. CSS shows
 * the clock directly whenever the PC is on (so reduced motion / dev jumps land
 * in the right state without the sequence).
 */
export function MiniDisplay({ powered }: { powered: boolean }) {
  const time = useLocalTime(powered);
  return (
    <div
      className={styles.display}
      style={displayStyle}
      data-powered={powered}
      data-fx="mini"
      aria-hidden
    >
      <span className={styles.line} data-mini="sys">
        SYS<span className={styles.caret}>_</span>
      </span>
      <span className={styles.line} data-mini="ok">
        SYS OK
      </span>
      <span className={styles.line} data-mini="ready">
        READY
      </span>
      <span className={styles.line} data-mini="clock">
        {time?.hm}
        {time?.period && <small className={styles.period}>{time.period}</small>}
      </span>
    </div>
  );
}
