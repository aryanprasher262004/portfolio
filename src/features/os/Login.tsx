"use client";

import { type FormEvent, useId } from "react";
import { useExperienceStore } from "@/stores/experienceStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { Wallpaper } from "./Wallpaper";
import styles from "./Login.module.css";

/**
 * Fake login — no backend, no real accounts. Any input (or none) works;
 * submitting moves the experience on to the desktop.
 */
export function Login() {
  const setPhase = useExperienceStore((s) => s.setPhase);
  const wallpaper = useSettingsStore((s) => s.wallpaper);
  const userId = useId();
  const passId = useId();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPhase("desktop");
  }

  return (
    <div className={styles.root}>
      <Wallpaper id={wallpaper} />
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.avatar} aria-hidden>
          <svg viewBox="0 0 16 16" shapeRendering="crispEdges">
            <path
              fill="currentColor"
              d="M5 3h6v1H5z M4 4h1v3H4z M11 4h1v3H11z M5 3h1v1H5z M10 3h1v1H10z M5 7h6v1H5z M4 9h1v1H4z M11 9h1v1H11z M3 10h1v3H3z M12 10h1v3H12z M4 13h8v1H4z M5 8h6v1H5z"
            />
          </svg>
        </div>
        <p className={styles.welcome}>WELCOME BACK</p>
        <label className={styles.label} htmlFor={userId}>
          Username
        </label>
        <input
          id={userId}
          className={styles.input}
          type="text"
          name="username"
          placeholder="guest"
          autoComplete="off"
        />
        <label className={styles.label} htmlFor={passId}>
          Password
        </label>
        <input
          id={passId}
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          autoComplete="off"
        />
        <button type="submit" className={styles.button}>
          LOGIN
        </button>
        <p className={styles.hint}>Hint: the door isn&apos;t very picky.</p>
      </form>
    </div>
  );
}
