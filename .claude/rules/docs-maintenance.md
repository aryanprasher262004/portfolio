---
paths:
  - "docs/**"
  - "CLAUDE.md"
---

# Documentation maintenance

The repo is self-documenting across sessions and models. Keep it trustworthy.

## CURRENT_STATE.md

- It is **state, not history**. Keep it short. Overwrite stale content — don't append.
- After every meaningful subphase, update: Phase/Subphase/Status/Branch, Last
  Completed (keep ~3 lines), Currently Working On, **Next Exact Task**, Blockers,
  Known Issues.
- "Next Exact Task" must be specific enough that a cold session can act on it.

## DECISIONS.md

- **Append-only.** Never edit or delete a past `DEC-xxx`.
- A reversal or change is a **new** DEC that says which one it supersedes.
- Log a DEC whenever architecture, a dependency choice, or a documented convention
  changes — even mid-phase.

## ROADMAP.md

- Update the checkbox (`[ ]` / `[~]` / `[x]`) as work moves. One line of outcome
  next to a completed subphase.
- Don't silently re-scope a phase; if scope changes, note it and log a DEC.

## Handoffs

- At the end of each **major phase**, add `docs/handoffs/PHASE_<N>_HANDOFF.md`
  using the template in `docs/handoffs/README.md`.
- The handoff records what the phase delivered; it does not replace CURRENT_STATE.

## General

- Update docs in the **same change** as the code they describe — not "later".
- Placeholder docs (`DESIGN_SYSTEM`, `UI_SYSTEM`, `ASSET_PIPELINE`, `PERFORMANCE`)
  get filled when their phase starts; until then keep the "not established" note.
- Prettier formats Markdown — run `pnpm format` before committing docs.
- No invented facts about the owner anywhere in `docs/`.
