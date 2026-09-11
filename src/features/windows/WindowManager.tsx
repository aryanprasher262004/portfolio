"use client";

import type { ReactNode } from "react";
import { ProjectsContent } from "@/features/apps/projects/ProjectsContent";
import { SettingsContent } from "@/features/apps/settings/SettingsContent";
import { Window } from "./Window";
import { useWindowStore } from "./windowStore";

/** Content-only registry — title/position/size/state live in windowStore. */
const CONTENT: Record<string, () => ReactNode> = {
  projects: () => <ProjectsContent />,
  settings: () => <SettingsContent />,
};

/**
 * Renders every open, non-minimized window from windowStore. Single source of
 * truth for z-order/focus — see docs/ARCHITECTURE.md § Window system.
 */
export function WindowManager() {
  const windows = useWindowStore((s) => s.windows);
  const focusedId = useWindowStore((s) => s.focusedId);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const moveWindow = useWindowStore((s) => s.moveWindow);

  return (
    <>
      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const render = CONTENT[w.id];
          if (!render) return null;
          return (
            <Window
              key={w.id}
              title={w.title}
              x={w.x}
              y={w.y}
              z={w.z}
              width={w.width}
              height={w.height}
              focused={w.id === focusedId}
              onClose={() => closeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
              onMove={(x, y) => moveWindow(w.id, x, y)}
            >
              {render()}
            </Window>
          );
        })}
    </>
  );
}
