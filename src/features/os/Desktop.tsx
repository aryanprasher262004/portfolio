"use client";

import { type MouseEvent, useState } from "react";
import { useWindowStore } from "@/features/windows/windowStore";
import { WindowManager } from "@/features/windows/WindowManager";
import { useSettingsStore } from "@/stores/settingsStore";
import { ContextMenu } from "./ContextMenu";
import styles from "./Desktop.module.css";
import {
  IconAbout,
  IconContact,
  IconExperience,
  IconProjects,
  IconResume,
  IconSkills,
} from "./icons";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";
import { Wallpaper } from "./Wallpaper";

/** Logical OS canvas — see the same constants in features/windows/windowStore.ts. */
const OS_W = 1280;

/**
 * Placeholder app list. Only Projects opens a real window (Phase 1.6); the
 * rest select on click and wait for their own content phase.
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
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const openWindow = useWindowStore((s) => s.openWindow);
  const wallpaper = useSettingsStore((s) => s.wallpaper);

  function handleIconClick(id: string) {
    setSelected(id);
    if (id === "projects") openWindow("projects", "Projects", 620, 420);
  }

  function handleContextMenu(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = rect.width / OS_W;
    setMenu({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
  }

  return (
    <div
      className={styles.root}
      onClick={() => setSelected(null)}
      onContextMenu={handleContextMenu}
    >
      <Wallpaper id={wallpaper} />
      <div className={styles.icons}>
        {APPS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={styles.icon}
            data-selected={selected === id}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick(id);
            }}
          >
            <span className={styles.iconGlyph}>
              <Icon />
            </span>
            <span className={styles.iconLabel}>{label}</span>
          </button>
        ))}
      </div>
      <WindowManager />
      {menu && (
        <ContextMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />
      )}
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      <Taskbar onStartClick={() => setStartOpen((v) => !v)} />
    </div>
  );
}
