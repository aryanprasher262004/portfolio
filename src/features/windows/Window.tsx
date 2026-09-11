"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useRef,
} from "react";
import styles from "./Window.module.css";

interface WindowProps {
  title: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  focused: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
}

/**
 * The one reusable window primitive. Drag by title bar (pointer capture, no
 * global listeners), click-to-focus, close. Resizing is intentionally out of
 * scope — see docs/DECISIONS.md DEC-008.
 */
export function Window({
  title,
  x,
  y,
  z,
  width,
  height,
  focused,
  onClose,
  onFocus,
  onMove,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    /** rendered-px -> logical-px, since the whole OS is itself CSS-scaled. */
    scale: number;
  } | null>(null);

  function handleTitlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    onFocus();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = windowRef.current?.getBoundingClientRect();
    const scale = rect && width > 0 ? rect.width / width : 1;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: x,
      originY: y,
      scale,
    };
  }

  function handleTitlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    onMove(
      d.originX + (e.clientX - d.startX) / d.scale,
      d.originY + (e.clientY - d.startY) / d.scale,
    );
  }

  function handleTitlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    drag.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      ref={windowRef}
      className={styles.window}
      style={{ left: x, top: y, width, height, zIndex: z }}
      data-focused={focused}
      onPointerDown={onFocus}
    >
      <div
        className={styles.titlebar}
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
      >
        <span className={styles.titleText}>{title}</span>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={`Close ${title}`}
        >
          <svg viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden>
            <path
              fill="currentColor"
              d="M0 0h1v1H0z M1 1h1v1H1z M2 2h1v1H2z M3 3h1v1H3z M4 4h1v1H4z M5 5h1v1H5z M6 6h1v1H6z M7 7h1v1H7z M7 0h1v1H7z M6 1h1v1H6z M5 2h1v1H5z M4 3h1v1H4z M3 4h1v1H3z M2 5h1v1H2z M1 6h1v1H1z M0 7h1v1H0z"
            />
          </svg>
        </button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
