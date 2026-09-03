import type { View } from "@/stores/experienceStore";
import { InteractionHint } from "./InteractionHint";
import styles from "./FocusToggle.module.css";

/**
 * Retro "enter / exit screen" control, styled to belong to the fake OS rather
 * than being a modern floating glass button. Lives in the monitor's bottom-right.
 */
export function FocusToggle({
  view,
  onToggle,
}: {
  view: View;
  onToggle: () => void;
}) {
  const focused = view === "monitor";
  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onToggle}
      data-focused={focused}
      aria-label={focused ? "Exit monitor focus" : "Focus the monitor"}
      aria-describedby="hint-focus"
    >
      <svg viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden>
        {focused ? (
          <path
            fill="currentColor"
            d="M5 2h1v3h3v1H5z M10 2h1v4h-4V5h3z M5 10h4v1H6v3H5z M10 10h1v4h-4v-1h3z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M2 2h4v1H3v3H2z M10 2h4v4h-1V3h-3z M2 10h1v3h3v1H2z M13 10h1v4h-4v-1h3z"
          />
        )}
      </svg>
      <InteractionHint
        id="hint-focus"
        title={focused ? "Return to desk" : "Enter screen"}
        body={focused ? "Exit monitor focus" : "Focus the monitor"}
        className={styles.hint}
      />
    </button>
  );
}
