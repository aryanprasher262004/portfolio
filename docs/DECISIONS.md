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
