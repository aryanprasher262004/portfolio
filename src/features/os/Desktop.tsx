"use client";

import { useState } from "react";
import {
  IconAbout,
  IconContact,
  IconExperience,
  IconProjects,
  IconResume,
  IconSkills,
} from "./icons";
import { Taskbar } from "./Taskbar";
import { Wallpaper } from "./Wallpaper";
import styles from "./Desktop.module.css";

/**
 * Placeholder app list. Opening real windows (reusable <Window>, Projects
 * content) is Phase 1.6 — icons select on click but do not open anything yet.
 */
const APPS = [
  { id: "about", label: "About", Icon: IconAbout },
  { id: "projects", label: "Projects", Icon: IconProjects },
  { id: "experience", label: "Experience +\nEducation", Icon: IconExperience },
  { id: "skills", label: "Skills +\nAchievements", Icon: IconSkills },
  { id: "resume", label: "Resume", Icon: IconResume },
  { id: "contact", label: "Contact", Icon: IconContact },
] as const;

export function Desktop() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.root} onClick={() => setSelected(null)}>
      <Wallpaper tone="day" />
      <div className={styles.icons}>
        {APPS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={styles.icon}
            data-selected={selected === id}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(id);
            }}
          >
            <span className={styles.iconGlyph}>
              <Icon />
            </span>
            <span className={styles.iconLabel}>{label}</span>
          </button>
        ))}
      </div>
      <Taskbar />
    </div>
  );
}
