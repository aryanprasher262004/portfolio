import styles from "./InteractionHint.module.css";

interface InteractionHintProps {
  /** Small leading glyph (emoji or short symbol). */
  icon?: string;
  /** One-line action label, e.g. "POWER ON". */
  title: string;
  /** Optional short instruction, e.g. "Click to start the PC". */
  body?: string;
  /**
   * Element id — set the trigger's `aria-describedby` to this so keyboard /
   * screen-reader users get the same information as hover.
   */
  id?: string;
  /**
   * Positioning + show/hide is owned by the trigger's stylesheet: pass its
   * scoped class here and target it on `:hover` / `:focus-visible`.
   */
  className?: string;
}

/**
 * Reusable contextual hint for non-obvious required interactions, styled to
 * belong to the retro OS. Obvious interactions get NO hint — see docs.
 */
export function InteractionHint({
  icon,
  title,
  body,
  id,
  className,
}: InteractionHintProps) {
  return (
    <span
      id={id}
      role="tooltip"
      className={`${styles.hint} ${className ?? ""}`}
    >
      <span className={styles.head}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {title}
      </span>
      {body && <span className={styles.body}>{body}</span>}
    </span>
  );
}
