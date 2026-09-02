# Architecture

> How the system fits together. Foundation-level. Updated as phases land.
> Rendering-approach specifics are **deferred** — see § Deferred at the bottom.

## Stack

| Concern                          | Choice                                             | Notes                                                                                |
| -------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Framework                        | Next.js 16 (App Router)                            | Client-first, **single route** (`/`). SSR/RSC features largely unused by design.     |
| UI                               | React 19                                           |                                                                                      |
| Language                         | TypeScript, `strict` + `noUncheckedIndexedAccess`  |                                                                                      |
| Package manager                  | pnpm (only)                                        | `pnpm-lock.yaml` is the sole lockfile. Never npm/yarn/bun.                           |
| Styling                          | CSS Modules + CSS custom-property design tokens    | No CSS-in-JS runtime. Tokens in `src/styles/tokens.css` (provisional until Phase 3). |
| State                            | Zustand (sliced) + hand-rolled typed state machine | No XState. Added in the phase that needs it.                                         |
| Animation                        | GSAP (+ `@gsap/react`)                             | Single animation library. No Framer Motion. CSS for micro-interactions.              |
| Rendering (desk/monitor visuals) | **UNDECIDED**                                      | Phase 1 compares real 3D / 2.5D / video / hybrid. No 3D deps installed yet.          |
| Deploy                           | Vercel                                             | `main` = production. PR preview deploys.                                             |
| Node                             | 22 (`.nvmrc`); `engines` floor `>=22`              |                                                                                      |

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
- `settingsStore` — audio on/off, reduced-motion override, (future) theme.

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

## Deferred — decided in Phase 1

These are **intentionally unresolved.** Do not pre-empt them.

| Item                                                                              | Resolved in          |
| --------------------------------------------------------------------------------- | -------------------- |
| Rendering architecture: real 3D / 2.5D / video / hybrid (DEC-012)                 | Phase 1.8            |
| Whether `three` / `@react-three/fiber` / `@react-three/drei` are installed at all | Phase 1.8            |
| Asset pipeline: layered PNG/WebP vs merged GLB vs transition video                | Phase 2              |
| Camera / depth "push toward monitor" implementation technique                     | Phase 1.6            |
| Exact on-screen monitor geometry + how logical screen maps into the art           | Phase 1.5 / 3.4      |
| Loader real-progress wiring (staged honest transition until then)                 | Phase 4.8 / 9        |
| Whether a dedicated WebGL-failure fallback tier is needed                         | depends on Phase 1.8 |
