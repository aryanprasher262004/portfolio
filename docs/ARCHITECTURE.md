# Architecture

> How the system fits together. Foundation-level. Updated as phases land.
> Rendering approach is **decided** (DEC-012, Phase 1.8) — hybrid 2.5D, no real 3D.

## Stack

| Concern                          | Choice                                             | Notes                                                                                                   |
| -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Framework                        | Next.js 16 (App Router)                            | Client-first, **single route** (`/`). SSR/RSC features largely unused by design.                        |
| UI                               | React 19                                           |                                                                                                         |
| Language                         | TypeScript, `strict` + `noUncheckedIndexedAccess`  |                                                                                                         |
| Package manager                  | pnpm (only)                                        | `pnpm-lock.yaml` is the sole lockfile. Never npm/yarn/bun.                                              |
| Styling                          | CSS Modules + CSS custom-property design tokens    | No CSS-in-JS runtime. Tokens in `src/styles/tokens.css` (provisional until Phase 3).                    |
| State                            | Zustand (sliced) + hand-rolled typed state machine | No XState. Added in the phase that needs it.                                                            |
| Animation                        | GSAP (+ `@gsap/react`)                             | Single animation library. No Framer Motion. CSS for micro-interactions.                                 |
| Rendering (desk/monitor visuals) | Hybrid 2.5D — single plate + GSAP camera (DEC-012) | Static plate, GSAP scale/translate camera, real HTML monitor overlay. No 3D.                            |
| Deploy                           | Vercel (dashboard Git integration, DEC-013)        | `main` = production: `portfolio-delta-sand-34.vercel.app`. PR previews. No `vercel.json` / add-ons yet. |
| Node                             | 22 (`.nvmrc`); `engines` floor `>=22`              |                                                                                                         |

Rationale for each is logged in `DECISIONS.md`.

## The layer model

```
┌─────────────────────────────────────────────────────────┐
│ features/scene/   — desk + monitor VISUALS               │
│   (rendering approach TBD; the ONLY place Phase 1's      │
│    decision touches. Exposes a "screen slot": a plain    │
│    DOM box, positioned/scaled/perspective-transformed    │
│    by whatever technique wins.)                          │
│                                                          │
│   ┌───────────────────────────────────────────────┐      │
│   │ features/os/  — desktop shell                  │      │
│   │   wallpaper · icon grid · taskbar · clock ·    │      │
│   │   start menu · <WindowManager>                 │      │
│   │                                               │      │
│   │   features/windows/  — <Window> primitive +    │      │
│   │     <WindowManager> (drag, focus, z-order,     │      │
│   │     close, scroll; resize deferred)            │      │
│   │                                               │      │
│   │   features/apps/{about,projects,experience,    │      │
│   │     skills,resume,contact}/                    │      │
│   │       each exports a chrome-free content       │      │
│   │       component + registers in appRegistry     │      │
│   └───────────────────────────────────────────────┘      │
│                                                          │
│ features/boot/  — power → boot → login choreography +    │
│                   loading screen (GSAP timelines)        │
└─────────────────────────────────────────────────────────┘
```

### The insulation rule (critical — DEC-006)

`features/os/**` and `features/apps/**` **know nothing about how the monitor is
rendered.** They render into a normal DOM container. `features/scene/**` positions,
scales, and (if needed) perspective-transforms that container.

**Consequences:**

- Phase 1's rendering decision only rewrites `features/scene/**`.
- The OS can be developed and tested standalone (a dev flag / route renders the screen
  container full-viewport with no scene).
- The accessible / mobile fallback = render the six app **content** components stacked,
  with zero rework, because they never depended on window chrome.
- **Post-V1 (DEC-015):** this boundary is a standing constraint, not just a
  Phase-1 convenience — it's what would let a future `ThreeScene` replace
  `features/scene`'s Hybrid 2.5D implementation (DEC-012) without touching the
  OS, window system, apps, settings, content, or state. `experienceStore` /
  `settingsStore` / `windowStore` expose semantic actions/state, never plate
  coordinates — verified true as of Phase 1.8. One known nuance: the OS's
  logical canvas size (1280×740) is duplicated as a literal in `sceneConfig.ts`,
  `windowStore.ts`, and `Desktop.tsx` — not a scene import, but worth
  centralizing under `features/os`/`features/windows` before any future
  `ThreeScene` work (see DEC-015).

If OS code ever imports from `features/scene`, that is an architecture violation.

## Screen coordinate model (DEC-007)

The OS lives in a container with a **fixed logical resolution** (starting point:
1440×900). That container is CSS-scaled to fit whatever box the scene hands it.

- Window positions/sizes are px in **logical space** → drag math is resolution-
  independent; pixel art stays crisp.
- One `scale` + `transform-origin` on the container maps logical → rendered.
- Exact logical resolution may be tuned once real art exists; the _model_ is fixed.

## Window system

- **One `<Window>` primitive.** Props: `id, title, icon, initialRect, minSize,
children`. Capabilities: title-bar drag, focus-on-pointer-down (raises z), close,
  scrollable content region. **Resize deferred** (add only if trivial + reliable).
- **`<WindowManager>`** — single source of truth: renders open windows from
  `windowStore`, owns z-index stacking, focus, spawn cascade, viewport clamping.
- **`appRegistry`** — `appId → { title, icon, Component, defaultRect, singleInstance }`.
  Desktop icons, taskbar buttons, start menu all derive from this one registry.

## State (Zustand slices — created when needed)

- `experienceStore` — phase enum (`IDLE | POWER_READY | POWERED_ON | BOOTING | LOGIN |
DESKTOP`), guarded transitions, `introSeen` (localStorage-backed, Phase 7).
- `windowStore` — open windows, z-order stack, focused id, rects.
- `settingsStore` — `iconSize` (small/medium/large/xlarge, default large) and
  `wallpaper` (id from `src/data/wallpapers.ts`), localStorage-backed. Drives
  the global `--ui-scale` CSS variable set once at the OS root (`OS.tsx`) —
  every OS/window/app stylesheet reads it for font-size/icon dimensions
  (cascades through the DOM across CSS Module boundaries).

State is readable/writable outside React (GSAP callbacks).

## Content / data (DEC-009)

Typed TS modules in `src/data/`: `projects.ts`, `experience.ts`, `skills.ts`,
`about.ts`, `contact.ts` + `types.ts`. Resume is a static file link. No CMS/MDX.
All content is clearly-marked placeholder until the owner provides real content.

## Responsive / fallback — three tiers

1. **Full** — pointer + adequate viewport + motion allowed: complete experience.
2. **Compact / touch** — keep the aesthetic; drop draggable windows for stacked
   full-screen apps; content fully usable.
3. **Accessible / reduced-motion / no-WebGL / crawler** — static poster + the six
   content components as a plain scrollable document. Always reachable via a low-key
   "view as page" / "skip intro" affordance.

Detection + implementation = Phase 8. The decoupling that makes tier 3 cheap = now.

## Animation strategy

- GSAP timelines: boot choreography, camera/depth push, loader stages, window
  open/close.
- CSS transitions/animations: hover, focus, spinners, small micro-interactions.
- `useFrame` (if real 3D): only genuinely continuous 3D motion (e.g. fan rotation).
- One central `prefersReducedMotion` helper every timeline consults.

## Directory map (target — folders created per-phase, not upfront)

```
src/
  app/                 layout, page, globals, metadata (thin)
  features/
    scene/             desk + monitor visuals (Phase 1 decides implementation)
    boot/              power / boot / login / loader
    os/                desktop shell
    windows/           <Window> + <WindowManager>
    apps/{about,projects,experience,skills,resume,contact}/
  components/          shared primitives (Button, Bevel, PixelIcon, Screen)
  stores/             zustand slices
  data/               typed content modules
  lib/                utils, audio, analytics, localStorage, motion helper
  hooks/
  styles/             tokens.css, (globals live in app/)
```

Per **YAGNI**: a directory is created in the phase that first needs it, not now.

## Build / tooling

- ESLint flat config (`next/core-web-vitals` + `next/typescript` + `prettier`).
- Prettier for all formatting incl. Markdown.
- Scripts: `dev build start lint lint:fix typecheck format format:check`.
- No git hooks yet (solo repo; revisit if useful).

---

## Resolved in Phase 1 (was: Deferred)

- **Rendering architecture** — Hybrid 2.5D. **DEC-012**, decided Phase 1.8.
- **`three` / `@react-three/fiber` / `@react-three/drei`** — **not installed**;
  rejected for V1 (DEC-012). `features/scene/**` (DEC-006) stays the seam if a
  concrete future need ever appears.
- **Camera / depth "push toward monitor"** — GSAP `scale`+`translate` on the plate
  (`features/scene/framing.ts`), decided Phase 1.3–1.4.
- **On-screen monitor geometry** — `SCREEN_RECT`/`SCREEN_SURFACE_RECT` in
  `features/scene/sceneConfig.ts`, measured from the plate, decided Phase 1.4–1.5.
- **WebGL fallback tier** — not needed; nothing in the stack uses WebGL.

## Still deferred

| Item                                                                | Resolved in                           |
| ------------------------------------------------------------------- | ------------------------------------- |
| Asset pipeline: how the regenerated plate/layers enter the repo     | Phase 2                               |
| Loader real-progress wiring (staged honest transition until then)   | Phase 4.8 / 9                         |
| Whether video clips are ever composited in as a decorative flourish | later polish pass, optional (DEC-012) |
