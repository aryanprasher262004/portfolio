# Roadmap

> Every piece of work belongs to a Phase and Subphase. Check boxes as work lands.
> A future session reads this to find exactly where development stopped, then reads
> `CURRENT_STATE.md` for operational detail.
>
> Legend: `[ ]` not started · `[~]` in progress · `[x]` done.
> Risk register lives in `RISKS.md`.

---

## Phase 0 — Foundation ✅ COMPLETE

- [x] **0.1** Repository inspection — greenfield repo, pnpm/Node present, empty public remote
- [x] **0.2** Product / architecture confirmation — foundation decisions locked; rendering deferred
- [x] **0.3** Project scaffold — Next 16 + strict TS + CSS Modules + tokens + ESLint/Prettier; verified (lint/typecheck/build/dev)
- [x] **0.4** Git structure — `main` + `feat/*` (no `dev`); `docs/GIT_WORKFLOW.md`; first commit pushed
- [x] **0.5** Documentation system — 6 load-bearing docs + 4 placeholders + `handoffs/README.md`; links/format/build verified
- [x] **0.6** Claude Code configuration — concise `CLAUDE.md` (~86 lines), `.claude/rules/docs-maintenance.md` (path-scoped), `.claude/skills/continue/SKILL.md`; no agents/hooks/MCP
- [x] **0.7** Deployment baseline — GitHub→Vercel pipeline live (DEC-013); `main` = production, `portfolio-delta-sand-34.vercel.app` Ready; no `vercel.json`, no add-ons
- [x] **0.8** Foundation verification — install/lint/typecheck/build/format/prod-URL/secrets/deps all pass; `docs/handoffs/PHASE_0_HANDOFF.md`

**Exit:** clean project · docs established · AI-session continuity established · deployment works · no unnecessary 3D architecture.

---

## Phase 1 — Visual + technical prototypes _(revised: build a vertical prototype, then decide DEC-012)_

**Strategy (owner, 2026-09-03):** Phase 1.1 gave enough architectural evidence to
start building. From here, prioritise **implementation speed + visual validation
over planning/documentation**. Goal = a runnable **vertical functional prototype**:
desk → power → PC on → monitor wake / camera push → loading → login → desktop →
click Projects → scrollable Projects window. Reasonably polished; final
assets/content NOT required. Simplest viable **hybrid / 2.5D** (still imagery +
existing clips + HTML/CSS monitor + GSAP). **No Three.js/R3F** — real 3D is an
escape hatch only if the prototype reveals a concrete limitation. Keep doc updates
concise/operational; no new architecture/risk docs unless a genuinely new important
issue appears.

- [x] **1.1** Reference analysis — 5 images + 2 clips analysed; direction B (blue-grey) is the working world; monitor to be enlarged/dominant; `docs/PHASE_1_REFERENCE_ANALYSIS.md`. DEC-012 stays OPEN
- [x] **1.2** Prototype visual specification — decided: p6 base plate, two framing states (DESK/INTRO + MONITOR/WORK), never-distort/aspect-preserved responsive framing, real-HTML monitor at 1280×800 logical, fake camera first / clips optional, `LOADING 6 OF 6`. Spec in `PHASE_1_REFERENCE_ANALYSIS.md` § Phase 1.2.
- [x] **1.3** Vertical prototype foundation — `<Scene>` with aspect-preserving responsive framing (two states: DESK/INTRO whole-scene, MONITOR/WORK dominant+readable), p6 plate, HTML `<MonitorScreen>` overlay tracking the artwork, GSAP camera push (verified smooth at 1440/1366/1920 via Playwright), damped mouse parallax. `zustand` + `gsap` + `@gsap/react` + `playwright-core`(dev) added
- [x] **1.4** Power + monitor prototype — real power hotspot on the PC (hover glyph/glow/tooltip), PC off/on wash + fan bloom, staged monitor wake, **no auto-zoom**; decoupled `phase` vs `view` (DEC-014); user-operated retro `FocusToggle` (FOCUS ⇄ EXIT) drives a reversible GSAP desk⇄monitor move; tighter bezel (screen ≈82% vw in focus); flex-centred framing verified at 1366/1440/1536/1920, no console errors. Clips not used yet.
- [x] **1.5** Monitor OS prototype — `features/os/`: staged `Loading` (`LOADING N OF 6`, honest timed steps), fake `Login` (any input, Enter or click submits), `Desktop` with six icons (About/Projects/Experience+Education/Skills+Achievements/Resume/Contact) + `Taskbar` (Start, live clock), shared CSS `Wallpaper` (day/dusk). `FocusToggle` relocated top-right to clear the taskbar. Verified 1366/1440/1536/1920, reduced-motion path, keyboard login, 0 console errors.
- [x] **1.6** Projects interaction prototype — `features/windows/` (`Window`, `windowStore`, `WindowManager`) + `features/apps/projects/ProjectsContent` (names only, no invented facts). Drag by title bar (pointer capture), focus/z-index, close, scroll, taskbar chip. Verified 1366/1440/1536/1920, 0 console errors.
- [x] **1.7** Prototype review + desktop UX pass (owner hands-on feedback) — settingsStore (icon size + wallpaper tone, localStorage), themed desktop right-click menu (View/Wallpaper/Settings), functional Start menu (Search stub, Settings, Restart, Shut Down — reuse the phase/view machine), taskbar minimize/restore, `src/data/projects.ts` (data-driven Projects), fixed a real drag-tracking bug (screen-px deltas weren't divided by the OS render scale), friendlier login hint. Verified 1366/1440/1536/1920, 0 console errors. Remaining items homed to Phases 5/6/10/12 + RISKS.md RISK-017.
- [ ] **1.8** DEC-012 final rendering decision — only after seeing the working prototype: hybrid sufficient / pure 2.5D better / reduce video / real 3D actually necessary. Record in `DECISIONS.md`. **STOP for owner approval before production implementation.**

---

## Phase 2 — Art + assets

- [ ] **2.1** Final scene concept
- [ ] **2.2** Generate scene artwork
- [ ] **2.3** Generate alternative compositions
- [ ] **2.4** Select final direction
- [ ] **2.5** Separate layers (2.5D) **or** generate 3D model (real 3D)
- [ ] **2.6** Blender cleanup — only if required
- [ ] **2.7** Prepare interactive pieces (screen / power button / fan)
- [ ] **2.8** Optimize assets
- [ ] **2.9** Browser asset test
- [ ] **2.10** Final asset approval

---

## Phase 3 — Environment

- [ ] **3.1** Scene / page container
- [ ] **3.2** Background / environment
- [ ] **3.3** Desk / computer setup
- [ ] **3.4** Perspective / depth
- [ ] **3.5** Lighting treatment
- [ ] **3.6** Cursor response
- [ ] **3.7** Interactive object highlighting
- [ ] **3.8** Responsive framing
- [ ] **3.9** Performance baseline

**Exit:** the computer setup looks excellent before complex interaction is added.

---

## Phase 4 — Power + boot

- [ ] **4.1** Experience state architecture (`IDLE → POWER_READY → POWERED_ON → BOOTING → LOGIN → DESKTOP → APP_OPEN`)
- [ ] **4.2** Initial interaction (cursor → object responds)
- [ ] **4.3** Power interaction
- [ ] **4.4** PC visual response
- [ ] **4.5** Fan movement (if applicable)
- [ ] **4.6** Monitor wake
- [ ] **4.7** Camera / view push
- [ ] **4.8** Loading screen
- [ ] **4.9** Minimal audio (power / boot / click / login)
- [ ] **4.10** Complete boot sequence verification

---

## Phase 5 — Monitor OS

- [ ] **5.1** Screen architecture
- [ ] **5.2** Login — incl. configurable avatar (Phase 1.7 has a static one)
- [ ] **5.3** Login transition
- [ ] **5.4** Desktop
- [ ] **5.5** Wallpaper — secure remote/URL wallpaper support (Phase 1.7 ships 2 local CSS tones only; do not add arbitrary remote image loading without sanitization/allowlisting — see RISKS.md)
- [ ] **5.6** Icons — drag/reposition + persisted layout (Phase 1.7 ships size only, via Settings)
- [ ] **5.7** Taskbar
- [ ] **5.8** Clock
- [ ] **5.9** Window manager
- [ ] **5.10** Dragging
- [ ] **5.11** Focus / z-index
- [ ] **5.12** Scrolling
- [ ] **5.13** Open / close transitions
- [ ] **5.14** Cursor behaviour

**Exit:** the fake OS feels usable and polished.

---

## Phase 6 — Portfolio content

- [ ] **6.1** Content schema — incl. a lightweight searchable index (Start-menu Search is UI-only through Phase 1.7)
- [ ] **6.2** About
- [ ] **6.3** Projects — visual redesign so it reads as a real portfolio app, not an admin list (Phase 1.7 makes it data-driven via src/data/projects.ts; layout polish still pending)
- [ ] **6.4** Experience + Education
- [ ] **6.5** Skills + Achievements
- [ ] **6.6** Resume
- [ ] **6.7** Contact
- [ ] **6.8** Project links
- [ ] **6.9** Content proofreading _(needs real content from owner)_
- [ ] **6.10** Content UX

---

## Phase 7 — Personality + microinteractions _(only after core portfolio works)_

- [ ] **7.1** Desktop personality
- [ ] **7.2** Small files / folders
- [ ] **7.3** Optional terminal
- [ ] **7.4** Hover details
- [ ] **7.5** Easter eggs — only if cheap
- [ ] **7.6** Sound polish
- [ ] **7.7** Animation polish
- [ ] **7.8** Returning-visitor behaviour (`portfolioIntroSeen` + skip intro)

---

## Phase 8 — Mobile + fallback

- [ ] **8.1** Mobile detection / layout
- [ ] **8.2** Simplified experience
- [ ] **8.3** WebGL fallback (if applicable)
- [ ] **8.4** Reduced motion
- [ ] **8.5** Accessibility
- [ ] **8.6** Keyboard navigation where sensible
- [ ] **8.7** Mobile content QA

---

## Phase 9 — Performance

- [ ] **9.1** Image optimization
- [ ] **9.2** Video optimization
- [ ] **9.3** GLB optimization (if applicable)
- [ ] **9.4** Lazy loading
- [ ] **9.5** Bundle inspection
- [ ] **9.6** Render profiling
- [ ] **9.7** Lighthouse
- [ ] **9.8** Real-device tests
- [ ] **9.9** Browser testing
- [ ] **9.10** Correct performance problems

---

## Phase 10 — Production polish

- [ ] **10.1** Animation consistency
- [ ] **10.2** Visual consistency
- [ ] **10.3** Pixel-art consistency
- [ ] **10.4** Typography
- [ ] **10.5** Cursor — custom pixel/retro cursor (deferred from Phase 1.7 priority list; keep native accessibility behaviour)
- [ ] **10.6** Window polish
- [ ] **10.7** Loading polish
- [ ] **10.8** Audio polish
- [ ] **10.9** Final UX review
- [ ] **10.10** Final bug pass

---

## Phase 11 — Deployment

- [ ] **11.1** Production build
- [ ] **11.2** Metadata
- [ ] **11.3** Favicon
- [ ] **11.4** Social preview
- [ ] **11.5** SEO basics
- [ ] **11.6** Vercel production deployment
- [ ] **11.7** Production QA
- [ ] **11.8** External links verification
- [ ] **11.9** Resume verification
- [ ] **11.10** RELEASE V1 — tag `v1.0.0`

---

## Phase 12 — Optional post-V1 _(none of this blocks V1)_

day/night wallpaper · ambient particles · additional props · more advanced 3D ·
achievements · easter eggs · richer audio · additional desktop apps · advanced
terminal · more cinematic sequences.

---

## Process reminders

- **Communication header** on every dev response: `PHASE / SUBPHASE / STATUS`.
- **Four-pass** on substantive subphases: Implement → Specialist review → Verify →
  Correct. Trivial/cosmetic: Implement → Verify.
- Update `CURRENT_STATE.md` after every meaningful subphase; append to `DECISIONS.md`
  when a real decision is made; write a handoff at the end of each major phase.
- Search before creating any component/hook/store/util/type/data file.
