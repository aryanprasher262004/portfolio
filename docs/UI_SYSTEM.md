# UI System

> **Status: NOT ESTABLISHED.** Placeholder until Phase 5 (window system) with
> groundwork in Phase 1.5 (monitor UI prototype).

## Where the current partial info lives

- Intended shape of the window system: `ARCHITECTURE.md` § Window system.
- Decision + rationale: `DECISIONS.md` DEC-008.

## What this file will contain (Phase 5)

- `<Window>` API contract — props, capabilities, the exact drag/focus/close/scroll
  behaviour, resize status.
- `<WindowManager>` responsibilities — z-order stacking, focus model, spawn cascade,
  viewport clamping.
- `appRegistry` schema and how icons / taskbar / start menu derive from it.
- Desktop shell layout — wallpaper, icon grid, taskbar, clock, start menu.
- Cursor behaviour and hover/focus states.
- Open/close/minimize transition specs (GSAP/CSS).
- Keyboard interaction model.
- The logical-resolution screen container contract (see `ARCHITECTURE.md` DEC-007).

## Rules (already binding)

- **One** window component. Searching before creating is mandatory — no
  `Window.tsx` + `DesktopWindow.tsx` + `DraggableWindow.tsx` + `AppWindow.tsx`.
- App content components are **chrome-free** and render standalone (fallback tier 3).
