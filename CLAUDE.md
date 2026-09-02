@AGENTS.md

<!-- Keep this file concise (target < 200 lines). Facts and always-on rules only.
     Procedures go in .claude/skills/, path-scoped guidance in .claude/rules/. -->

# portfolio — working rules

A personal portfolio presented as an interactive stylized computer setup. Full
context lives in `docs/` — this file is the always-on summary.

## Every session — the 9 rules

1. Read **all** of `docs/CURRENT_STATE.md` (short, fully operational).
2. Read the relevant `docs/ROADMAP.md` phase.
3. Read `docs/ARCHITECTURE.md`.
4. Inspect git (status + branch + recent commits).
5. Inspect existing code before creating any file.
6. Never duplicate a component/hook/store/util/type/data file — **search first**.
7. Never silently alter architecture — log a `DEC-xxx` in `docs/DECISIONS.md`.
8. Update `docs/` in the same change as the code it describes.
9. Verify before claiming completion — actually run the checks, report the output.

When the owner says **"continue"**, **"resume"**, or gives a phase number, run
`/continue`.

## Search before you create

Before a new component, hook, store, util, type, animation config, or data file:
grep the repo for it. **One `<Window>` component only** — never `Window` +
`DesktopWindow` + `DraggableWindow` + `AppWindow`.

## Non-negotiables

- **pnpm only** (`pnpm-lock.yaml` is the sole lockfile). Node 22.
- **Six** portfolio apps: About, Projects, Experience+Education, Skills+Achievements,
  Resume, Contact. Not eight.
- **No `three` / `@react-three/fiber` / `@react-three/drei`** until DEC-012 (the
  rendering architecture) is decided in Phase 1.8 and the owner approves.
- GSAP for orchestrated animation. **No Framer Motion.** CSS for micro-interactions.
- No physics engine. No animation engine. No AI slop (no giant gradients, glowing
  blobs, generic glassmorphism, meaningless cards, purple-SaaS hero, marketing copy).
- **The insulation rule (DEC-006):** `features/os/**` and `features/apps/**` are
  plain DOM rendered into a container. Only `features/scene/**` touches rendering.
  OS/app code must never import from `features/scene`.
- **Do not invent facts about the owner** (jobs, projects, metrics, education,
  achievements). Use clearly-marked placeholders until real content is provided.
- YAGNI: create a directory/dependency in the phase that first needs it, not before.
  Justify every new dependency (problem it solves, why, cost, existing alternative).

## Response format

Start development responses with:

```
PHASE: X
SUBPHASE: X.Y
STATUS: PLANNING | IMPLEMENTING | REVIEWING | VERIFYING | BLOCKED | COMPLETE
```

**Four-pass** on substantive subphases: Implement → Specialist review → Verify →
Correct. **Implement → Verify** on trivial/cosmetic work.

Verification commands: `pnpm typecheck` · `pnpm lint` · `pnpm build` ·
`pnpm format:check` (and `pnpm dev` smoke test where relevant).

## Git & commits

- `main` (production) + short-lived `feat/*` (also `fix/*`, `chore/*`, `docs/*`).
  No `dev` branch. Squash-merge PRs, delete the branch. See `docs/GIT_WORKFLOW.md`.
- **No Claude co-author trailer** in commit messages.
- **Never commit or push without the owner explicitly asking.** Never rewrite
  history or force-push `main`. Never commit secrets (`.env*` is gitignored).

## docs/ map

| File                                                             | Holds                                                                  |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `CURRENT_STATE.md`                                               | Operational source of truth — phase, next task, blockers, known issues |
| `ROADMAP.md`                                                     | 12-phase plan with subphase checkboxes                                 |
| `ARCHITECTURE.md`                                                | Stack, layer model, insulation rule, window system, § Deferred         |
| `PROJECT_VISION.md`                                              | Why this exists, success criteria, art direction, constraints          |
| `DECISIONS.md`                                                   | Append-only `DEC-xxx` log (DEC-012 = rendering architecture, OPEN)     |
| `RISKS.md`                                                       | Risk register + feature-evaluation rule                                |
| `GIT_WORKFLOW.md`                                                | Branch model, commit conventions                                       |
| `DESIGN_SYSTEM` · `UI_SYSTEM` · `ASSET_PIPELINE` · `PERFORMANCE` | Placeholders until their phase                                         |
| `handoffs/`                                                      | One `PHASE_N_HANDOFF.md` per completed major phase                     |
