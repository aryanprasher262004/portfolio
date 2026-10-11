# Decisions

> Append-only log of meaningful decisions. Newest concerns at the bottom.
> Format: Decision / Reason / Alternatives / Rejected because.
> A decision that is later reversed gets a new DEC entry that supersedes it
> (don't edit history).

---

## DEC-001 — Framework: Next.js 16 (App Router)

**Decision:** Next.js 16 App Router, rendered client-first, a single route (`/`).
**Reason:** Vercel-native zero-config deploy; best-in-class metadata/OG for social
preview; `next/image`; an escape hatch (route handler) if ever needed. The immersive
experience renders as a client tree so SSR/hydration never fights animation/WebGL.
**Alternatives:** Vite + React SPA.
**Rejected because:** deploy, metadata, and optional serverless are each slightly more
manual with Vite. Margin was small; Next chosen for the deployment + metadata story.

## DEC-002 — Styling: CSS Modules + CSS custom-property tokens

**Decision:** CSS Modules for components; design tokens as CSS custom properties in one
file. No CSS-in-JS runtime.
**Reason:** The UI is bespoke pixel/bevel retro-OS chrome, not utility-heavy layout.
Scoped, zero-runtime, deliberate CSS matches the "coherent visual language, no slop"
goal. Tokens keep it themeable later.
**Alternatives:** Tailwind; vanilla-extract; Emotion/styled-components.
**Rejected because:** Tailwind arbitrary-value soup fights the art-directed goal and
retro bevels end up as custom CSS anyway; CSS-in-JS adds runtime cost.

## DEC-003 — Package manager: pnpm (only)

**Decision:** pnpm is the sole package manager; `pnpm-lock.yaml` the sole lockfile.
Never introduce `package-lock.json` / `yarn.lock` / `bun.lock`.
**Reason:** Owner decision. Fast, disk-efficient, strict.
**Alternatives:** npm, yarn, bun.
**Rejected because:** owner preference; consistency across docs/CI/instructions.

## DEC-004 — State: Zustand + hand-rolled state machine

**Decision:** Zustand with sliced stores; the boot flow is a hand-rolled typed enum
with guarded transitions.
**Reason:** Tiny, no boilerplate, usable outside React (GSAP callbacks). The boot flow
is near-linear — doesn't need a full FSM library.
**Alternatives:** XState; Redux; React context only.
**Rejected because:** XState is significant concept weight for a linear flow; Redux is
heavy; context alone is awkward for cross-tree window/z-order state.

## DEC-005 — Animation: GSAP as the single library

**Decision:** GSAP (+ `@gsap/react`) for all orchestrated animation. CSS transitions/
animations for micro-interactions. `useFrame` only for continuous 3D motion. No Framer
Motion.
**Reason:** GSAP timelines are the right tool for multi-step boot/camera/loader
choreography. GSAP 3.13 made all plugins free. One animation system avoids overlap.
**Alternatives:** Framer Motion; anime.js; CSS-only.
**Rejected because:** Framer Motion overlaps GSAP and running both bloats bundle and
splits conventions.

## DEC-006 — The OS is rendering-agnostic DOM (insulation rule)

**Decision:** `features/os/**` and `features/apps/**` render into a plain DOM
container and know nothing about how the monitor is drawn. `features/scene/**`
positions/scales/transforms that container. OS code must never import from `scene`.
**Reason:** The rendering approach is deferred to Phase 1. This boundary makes that
decision cheap to make and cheap to change, lets the OS be tested standalone, and
makes the accessible/mobile fallback nearly free.
**Alternatives:** Render UI into a WebGL/canvas texture; couple OS to an R3F scene.
**Rejected because:** canvas-textured UI loses native scrolling/text/inputs/a11y;
coupling makes Phase 1's decision destructive.

## DEC-007 — Screen coordinate model: fixed logical resolution, CSS-scaled

**Decision:** The OS container has a fixed logical resolution (start: 1440×900),
CSS-scaled to fit the box the scene provides. Window rects are px in logical space.
**Reason:** Resolution-independent drag math; crisp pixel art; one scale transform
maps logical → rendered.
**Alternatives:** Viewport-relative units everywhere; %-based layout.
**Rejected because:** viewport-relative makes window math and pixel alignment fragile
across screen sizes.

## DEC-008 — One `<Window>` primitive; resize deferred

**Decision:** A single `<Window>` component (+ `<WindowManager>` + `appRegistry`).
Capabilities: drag, focus, close, scroll. **Resize is deferred** — add only if trivial
and reliable.
**Reason:** Brief mandates one reusable window system and forbids duplicate window
components. Dragging/scrolling/focus/close matter far more than resize.
**Alternatives:** Multiple specialized window components; a windowing library.
**Rejected because:** duplication risk; libraries are heavier than needed.

## DEC-009 — Content: typed TS modules, no CMS

**Decision:** Portfolio content lives in typed modules under `src/data/` with a shared
`types.ts`. Resume = static file link.
**Reason:** Six small datasets. Type-safe, centralized, no infrastructure. Cheap to
change later.
**Alternatives:** MDX; headless CMS; JSON.
**Rejected because:** overkill for the data size; CMS adds a service dependency.

## DEC-010 — Git: `main` + short-lived `feat/*`, no `dev`

**Decision:** `main` is production; short-lived `feat/*` (also `fix/*`, `chore/*`,
`docs/*`) branches merge via squash PR and are deleted. No long-lived `dev` branch.
**Reason:** Solo project; PR preview deploys already provide integration testing; a
`dev` branch adds merge overhead for one developer.
**Alternatives:** main/dev/feature GitFlow.
**Rejected because:** unnecessary ceremony at this team size.

## DEC-011 — Contact V1: links only, no backend

**Decision:** The Contact app shows email (`mailto:`), GitHub, and LinkedIn links. No
form, no serverless function, no email service for V1.
**Reason:** Brief says no backend / fake auth. A working form needs a service; low
value for V1.
**Alternatives:** Vercel route handler + Resend/Formspree.
**Rejected because:** adds a dependency and secret management for marginal benefit;
can be added post-V1.

---

## DEC-012 — Rendering architecture — **OPEN / DEFERRED**

**Status:** NOT DECIDED. Resolved in **Phase 1.8** after prototypes.
**The question:** how much of the desk/monitor is real 3D?
**Candidates:**

- **A — Real 3D:** React Three Fiber scene, GLB(s), lighting, camera, HTML monitor
  overlay.
- **B — Hybrid 2.5D:** pre-rendered/AI scene split into layers; CSS perspective +
  GSAP + parallax + cursor movement; monitor screen = real HTML.
- **C — Video / image transition:** pre-rendered cinematic moments; static → click →
  short animation → interactive monitor.
- **D — Hybrid real + fake:** rendered room/desk image + simple 3D monitor geometry +
  HTML screen + tiny animated fan layer + GSAP camera + image lighting overlays.

**Scoring axes (Phase 1.7):** visual quality · implementation complexity · performance ·
mobile · asset difficulty · maintainability · interaction freedom.

**Constraint:** the decision may only rewrite `features/scene/**` (see DEC-006). Do not
install `three` / `@react-three/fiber` / `@react-three/drei` before this is decided.

**STOP for owner approval before beginning the production implementation.**

**Update (Phase 0.8):** the owner now has reference assets ready for Phase 1 (desk/PC
images, blank-monitor concept, desktop-on concept, Clip 1 = PC power-on, Clip 2 =
monitor wake / camera push). A **video + HTML/CSS + GSAP hybrid** looks promising —
but it is **not selected**. Phase 1 still objectively compares 2.5D · video/pre-rendered
· real 3D · hybrid. Decision stays deferred to Phase 1.8.

---

## DEC-013 — Deployment: Vercel via dashboard Git integration

**Decision:** The GitHub repo is connected to Vercel through the Vercel dashboard Git
integration (not the Vercel CLI). `main` is the production branch. Framework preset
auto-detected as Next.js; build command `pnpm build`; Node from `.nvmrc` (22).
Production: `https://portfolio-delta-sand-34.vercel.app`.
**Reason:** Zero-config, automatic production deploys on push to `main`, automatic
preview deploys per PR. Owner decision 9 (no CLI login).
**Alternatives:** Vercel CLI deploys; Netlify; GitHub Pages; self-host.
**Rejected because:** CLI adds a local auth/token to manage; other hosts lose the
Next.js-native integration.
**Not done (deliberately):** no `vercel.json` (no need yet), no Analytics / Speed
Insights / other Vercel add-ons, no custom domain. Revisit in Phase 11.

---

## DEC-014 — Experience state and view/framing state are decoupled

**Decision:** Two independent state machines in `experienceStore`:
`phase` (`idle | poweringOn | booting | login | desktop`) and `view`
(`desk | monitor`). Powering on never moves the camera; only the user-operated
focus control changes `view`. Any `phase` + `view` combination is valid
(`desktop + desk` and `desktop + monitor` both allowed).
**Reason:** The visitor should power the machine and then _choose_ whether to focus
on the monitor, and freely enter/exit that focus afterwards (owner, Phase 1.4 spec).
Coupling `view` to `phase` would force an unwanted auto-zoom on power-on and make
exit awkward.
**Alternatives:** single state enum where `DESKTOP` implies the monitor framing.
**Rejected because:** removes the visitor's choice; makes "return to desk while the
OS keeps running" impossible without a hack.

---

## DEC-012 — RESOLVED: Hybrid 2.5D (no real 3D)

**Decision:** A single static plate (the desk/PC/room artwork) + a GSAP "camera"
(scale + translate transform on that plate, never a real 3D projection) + a real
HTML/CSS monitor overlay for all OS content + small CSS/GSAP overlays for
lighting/state (PC on/off wash + bloom, screen blackout/glare, focus/restore move).
**No `three` / `@react-three/fiber` / `@react-three/drei`.** Video clips remain
optional/decorative, not load-bearing.

**Evidence (Phases 1.3–1.7, all Playwright-verified at 1366/1440/1536/1920, 0
console errors each time):**

- The desk→monitor "camera push" (DESK ⇄ MONITOR framing) is a plain
  `scale`/`translate` on one image and reads as convincing depth/zoom — no
  parallax-layer separation was even required.
- Power-on (PC glow bloom) and monitor wake (blackout fade) were fully solved with
  CSS/GSAP; the two AI-generated video clips (`pcon.mp4`, `monitoron.mp4`) were
  never wired in and are unused.
- The entire OS (loading, login, desktop, taskbar, context/start menus, draggable
  windows, Settings) is real interactive HTML/CSS/React inside the monitor overlay
  — nothing here needed WebGL.
- Focus/restore must be smoothly **reversible**; pre-rendered video is naturally
  one-directional, while the GSAP transform is trivially reversible — an argument
  against making video load-bearing, not for it.
- No interaction across 7 subphases (power, focus, drag, minimize, menus) revealed
  a visual or functional gap that real 3D would have closed.

**What we build with going forward:**

- **Still images** — the plate is the sole visual backbone of the desk/PC/room
  (regenerated/higher-res in Phase 2, per the art direction already documented).
- **HTML/CSS/React** — 100% of OS content and all interactive chrome. This is
  where all real interactivity lives (unchanged from DEC-006's insulation rule).
- **GSAP** — the camera move and any future timed sequences (boot stagger,
  window transitions). No physics, no 3D animation loop.
- **Video** — optional, decorative only (e.g. a possible cross-fade flourish on
  the one-way power-on beat in a later polish pass). Never required for the core
  loop; the experience must keep working with the clips deleted.

**Three.js/R3F: REJECTED for V1.** Not deferred-as-likely, not required — actively
rejected given the evidence above. `features/scene/**` (DEC-006) stays the only
place that would ever change if a genuinely new need appeared (e.g. free-camera
exploration), but nothing in this project's scope calls for that.

**Alternatives considered:** Option A (real 3D scene), Option C (video as the
primary boot mechanism), Option D (hybrid with real 3D monitor geometry) — see the
original DEC-012 entry above for full candidate descriptions.
**Rejected because:** each adds engineering/asset/perf cost with no corresponding
visitor-facing improvement over what the hybrid 2.5D approach already delivers.

**STOP satisfied: this is the recorded decision, pending owner approval before
Phase 2 production asset work begins.**

---

## DEC-015 — Scene/OS boundary is a long-term compatibility constraint, not just a V1 convenience

**Decision:** The DEC-006 insulation rule (`features/os/**`, `features/windows/**`,
`features/apps/**` never import from `features/scene`) is upgraded from "keeps
Phase 1's rendering decision cheap" to a **standing architecture constraint**:
after V1 ships (Hybrid 2.5D, DEC-012), the owner may experiment with replacing the
physical desk/PC/monitor scene with a Three.js/R3F `ThreeScene`. That swap must
**not** require rebuilding the monitor OS. Concretely, going forward:

- `features/scene/**` owns the physical world: rendering, camera/framing, plate
  or 3D geometry, screen-rect measurement.
- `features/os/**`, `features/windows/**`, `features/apps/**`, and portfolio data
  (`src/data/**`) stay renderer-independent — no plate coordinates, no scene
  imports, ever.
- `experienceStore`/`settingsStore`/`windowStore` expose **semantic** actions and
  state (`powerOn`, `restart`, `shutDown`, `enterMonitor`/`exitMonitor`,
  `iconSize`, window open/close/focus/minimize) — never image/pixel coordinates.
  Verified true today: no scene imports anywhere in os/windows/apps; the stores
  already read this way.
- Monitor content (the whole OS) stays plain reusable React/HTML, rendered into
  whatever container the active scene implementation hands it (today:
  `MonitorScreen`'s `.osRoot`; later: a `ThreeScene`'s HTML-overlay/CSS3DRenderer
  equivalent).
- The future swap should read: `HybridScene → ThreeScene`, while `OS`, the window
  system, apps, Settings, content, state, (future) Search, Login, and Taskbar are
  reused unchanged.

**Known nuance to watch (not fixed now, not a V1 requirement):** the OS's logical
canvas size (1280×740) is currently a plain literal duplicated in
`features/scene/sceneConfig.ts` (`OS_LOGICAL`), `features/windows/windowStore.ts`
(`OS_W`/`OS_H`/`TASKBAR_H`), and `features/os/Desktop.tsx` (`OS_W`) — three places
must agree by hand. This is _not_ a scene import (each file only has a local
number) and is _not_ a plate coordinate, but it is a shared "OS viewport size"
concept split across features. Fine for V1; worth centralizing (e.g. one
`features/os` or `features/windows` constant that `sceneConfig.ts` reads, so the
OS — not the scene — is the source of truth for its own logical resolution)
before or during any future `ThreeScene` work.

**Reason:** Owner wants a clean, low-risk path to experiment with real 3D for the
physical scene post-V1 without a monitor-OS rewrite.
**Alternatives:** couple the OS to scene-provided pixel rects directly (simpler
short-term, but exactly what would force a rebuild on a renderer swap).
**Rejected because:** defeats the stated future-compatibility goal.
**Status:** Future compatibility constraint. **Not a V1 requirement** — Three.js/
R3F remains not installed, not implemented (DEC-012). No V1 code changes required
by this entry; it governs what future scene work must not break.

---

## DEC-016 — Global OS UI scale via a single `--ui-scale` CSS custom property

**Decision:** The owner's UX pass on the Phase 2 production plate (2026-09-12)
required "comfortably readable without browser zoom" text/icons across the
desktop, login, taskbar, menus, and windows, plus a 4-tier icon/UI size setting
(Small/Medium/Large/Extra Large, default Large). Rather than threading a size
prop through every OS/window/app component, `OS.tsx` sets one inline CSS custom
property, `--ui-scale`, on its root element, computed from
`UI_SCALE[iconSize]` (`settingsStore.ts`). Every nested stylesheet (Desktop,
Window, Taskbar, StartMenu/ContextMenu, Login, Loading, SettingsContent,
ProjectsContent) reads `var(--ui-scale, 1)` in `calc()` for font-size and
icon/spacing dimensions. Custom properties inherit through the DOM regardless
of CSS Module boundaries, so this is a single point of control with no prop
drilling and no per-component size-tier duplication (replaces the old
per-component `data-size` variant blocks).

**Consequences:**

- `features/scene` never reads or sets `--ui-scale` — it is entirely an
  `features/os` concern, consistent with DEC-006/DEC-015 (renderer-independent
  OS). The scene's own logical-canvas contract (`OS_LOGICAL` in
  `sceneConfig.ts`) is unchanged by this.
- `features/windows/windowStore.ts` reads the current `iconSize` (via
  `useSettingsStore.getState()`) to keep its taskbar-height assumption
  (`taskbarH()`) in sync with the _visually rendered_ taskbar height for
  window centering/clamping — a store-to-store read, not a scene coupling.
- Extending to a 5th tier later means one `UI_SCALE` map entry plus one
  `SIZES`/option-list entry in `ContextMenu.tsx` and `SettingsContent.tsx` —
  no new CSS variant blocks.

**Alternatives considered:** per-component size props threaded from Desktop
down; separate `data-size` attribute + hardcoded CSS blocks per tier (the
prior desktop-icon-only approach).
**Rejected because:** both duplicate the same scale logic per component and
don't reach outside `Desktop` (login/windows/menus were left small).
**Status:** Decided and implemented, Phase 2 UX pass.

---

## DEC-017 — Data-driven wallpapers (`src/data/wallpapers.ts`)

**Decision:** Replaced the placeholder CSS-gradient day/dusk wallpaper with
three real pixel-art images (owner-provided:
`public/assets/wallpapers/{morning,fantasy,space}.png`), rendered via
`background-image` + `cover`/`center` (never stretched). The list lives in
`src/data/wallpapers.ts` (`WALLPAPERS: WallpaperOption[]`, `DEFAULT_WALLPAPER`,
`isWallpaperId`, `getWallpaper`) per the existing DEC-009 typed-content-module
pattern — adding a future wallpaper requires only an asset + one array entry,
no other code changes. `settingsStore`'s persisted field renamed
`wallpaperTone` (`"day"|"dusk"`) → `wallpaper` (a `WallpaperId`); `loadInitial`
validates the persisted value against `WALLPAPERS` and falls back to
`DEFAULT_WALLPAPER` ("morning") for any unrecognized value, which transparently
migrates old `day`/`dusk` localStorage data with no special-case branch.
**Status:** Decided and implemented, Phase 2 UX pass.

---

## DEC-018 — Stronger monitor-focus camera push; power button is the plate's real button

**Decision:** Two scene-only adjustments from the same UX pass:

1. `WORK_SCREEN_WIDTH_FRAC` (0.82 → 0.99) and `OS_SCALE` (`{0.82,1.32}` →
   `{1.0,1.75}`) in `sceneConfig.ts` make the monitor-focus camera push much
   stronger — the screen (not the bezel) fills essentially the full viewport
   width, so OS content renders 15–60% larger across the four target
   viewports than before, while the full screen (including taskbar text)
   stays on-screen — only the physical bezel/desk crop out. Desk view framing
   (`DESK_FILL`/`DESK_TOP_CROP_FRAC`) is untouched. Purely `features/scene`
   scale/translate math — no new mechanism, still reversible via the existing
   `FocusToggle`.
2. `PowerControl` no longer draws its own power icon or idle-pulsing ring —
   `desk-off.png` already shows a real power button on the PC tower, so the
   component is now an invisible hotspot (positioned via the already-measured
   `POWER_HOTSPOT_RECT`) with a hover-only glow and `:active` press feedback.
   `PcState` (which persists after `PowerControl` unmounts on power-on) lost
   its obsolete OFF multiply-wash — the new plate's fans are already correctly
   rendered off/dark — and gained a persistent soft "on" glow anchored to
   `POWER_HOTSPOT_RECT` for as long as the PC stays powered.

**Status:** Decided and implemented, Phase 2 UX pass.

---

## DEC-019 — Power-on choreography is owned by the scene; the store only holds phase

**Decision:** The physical power-on sequence (button press → LED → interior
glow → mini-display boot → keyboard light → monitor flicker-wake) is one GSAP
timeline in `features/scene/usePowerSequence.ts`. `experienceStore.powerOn()`
/ `restart()` now only set `phase: "poweringOn"`; the scene calls the new
`completePowerOn()` (`poweringOn` → `booting`) at its monitor-wake beat. The
old hard-coded 850 ms `setTimeout` in the store is gone; an 8 s store-side
fallback (`armPowerOnFallback`, re-armed/cancelled per power-on) guarantees the
experience can't stall if no renderer drives it.

Steady on/off appearance stays in CSS (`data-powered` / `data-awake`); the
timeline only animates the transition via `[data-fx]` / `[data-mini]` hooks
and `clearProps` back to CSS. Every layer's CSS "on" opacity is exactly 1
(intensity lives in gradients) so the hand-off never jumps. Reduced motion
skips the timeline (CSS end state, wake after 250 ms). The Focus/Enter-Screen
control is offered only in `login`/`desktop`. Power-on never moves the camera
(DEC-014 unchanged).

**Why:** Choreography is renderer-specific — a future `ThreeScene` (DEC-015)
would drive its own lights/fans and just call `completePowerOn()`; OS/windows/
apps remain untouched and still import nothing from `features/scene`.
**Status:** Decided and implemented, Phase 3.1.

---

## DEC-020 — Phase 3 re-scoped to the physical power-on experience

**Decision:** Owner-approved (2026-10-11). Phase 3 is now "Physical power-on"
(subphases 3.1–3.8 in `ROADMAP.md`). The old Phase 3 "Environment" was largely
delivered by Phases 1–2; its leftovers (cursor response, object highlighting,
performance baseline) move into Phase 4, which becomes "Boot polish + audio"
(old 4.3–4.6 and 4.10 are absorbed by the new Phase 3).
**Status:** Decided.

---

## DEC-021 — Fan motion is a masked overlay; the plate's fan art never rotates

**Decision:** Rotating a crop of the plate's fans was prototyped and rejected:
the hub sits ~4 px off the ring centre and the rim highlight is painted in, so
both visibly orbit. Instead each fan gets a static, ring-masked ellipse
(`FAN_RINGS` + `fanStyle`: a 2·rx circle squashed by `scaleY(ry/rx)`) whose
child layers rotate — faint multiply blade shadows that cross-fade into a soft
motion shade at speed (`fanMotion.ts`). One endless linear GSAP rotation per fan;
spin-up / coast-down tween its `timeScale` (continuous angle, smooth
acceleration); a separate parent layer takes the start-up twitch. Restart keeps
fans turning; Shut Down coasts them to rest (~2.5 s); reduced motion hides the
overlay entirely (no motion, no static blades). No asset, no dependency.
**Status:** Decided and implemented, Phase 3.3 (owner-approved approach).
