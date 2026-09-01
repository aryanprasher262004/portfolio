# portfolio

Personal portfolio, presented as an interactive stylized computer setup: a visitor
arrives at a desk, powers on the machine, watches it boot, logs in, and explores the
work through a small custom desktop OS.

Guiding principle: **maximum visual impact with reasonable engineering complexity.**
A convincing faked or hybrid 3D result is acceptable — the illusion matters more than
the implementation.

## Stack

- Next.js (App Router) + React + TypeScript (strict)
- CSS Modules + CSS custom-property design tokens
- Zustand (state), GSAP (animation) — added when their phases begin
- Rendering approach (real 3D / 2.5D / video / hybrid) — **not yet decided**, see Phase 1
- Deploy: Vercel

## Requirements

- Node `22` (see `.nvmrc`; `>=22` enforced)
- pnpm (the only supported package manager — do not use npm/yarn/bun)

## Scripts

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write
```

## Project context & continuity

This repo is self-documenting for work across many sessions. Start here:

1. `docs/CURRENT_STATE.md` — operational source of truth (created in Phase 0.5)
2. `docs/ROADMAP.md` — phased plan and progress
3. `docs/ARCHITECTURE.md` — how the system fits together
4. `CLAUDE.md` — working rules (created in Phase 0.6)

`references/` holds concept/inspiration material only and is never shipped.
