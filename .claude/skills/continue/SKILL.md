---
description: Resume work on the portfolio from the documented repo state. Use when the owner says "continue", "resume", or names a phase / subphase number. Reads the operational docs and git state, reports where things stand, then proceeds from the correct incomplete task.
argument-hint: [phase or subphase number, optional]
---

## Git state

- Branch: !`git branch --show-current`
- Status: !`git status -sb`
- Recent commits: !`git log --oneline -8`

## Full operational state

@docs/CURRENT_STATE.md

## Instructions

1. Read the injected `CURRENT_STATE.md` above **in full** — it is short and is the
   operational source of truth.
2. Read the relevant phase section of `docs/ROADMAP.md`, then `docs/ARCHITECTURE.md`,
   then the newest file in `docs/handoffs/` if any exist. Read `CLAUDE.md` if not
   already loaded this session.
3. If the owner named a phase (e.g. "Phase 4") or subphase (e.g. "4.3"):
   - Phase only → find the **earliest incomplete** subphase in that phase.
   - Subphase given → scope work to exactly that subphase unless a dependency forces
     otherwise.
   - Never redo completed (`[x]`) work.
4. Resolve and report, concisely:
   ```
   CURRENT PHASE:
   CURRENT SUBPHASE:
   LAST COMPLETED:
   NEXT TASK:
   BLOCKERS:
   CURRENT BRANCH:
   WORKTREE STATUS:   (clean / N files modified / etc.)
   ```
5. If there is a blocker (e.g. missing assets or content the owner must provide),
   state it and stop for input. Otherwise proceed from the **NEXT TASK** using the
   pragmatic four-pass workflow (Implement → Review → Verify → Correct for
   substantive work; Implement → Verify for cosmetic), opening a `feat/*` branch if
   the current branch isn't already the right place.
6. Follow `CLAUDE.md`. Do not commit or push unless the owner asks.
