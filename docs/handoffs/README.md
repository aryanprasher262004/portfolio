# Handoffs

One file per completed **major phase**: `PHASE_<N>_HANDOFF.md`.

A handoff is a durable snapshot for whoever (which person or model) picks up next. It
is not a substitute for `CURRENT_STATE.md` (operational, always-current) — it is the
record of what a phase delivered.

## Template

```markdown
# Phase <N> Handoff — <phase name>

Date: YYYY-MM-DD
Branch merged: <branch> → main (<commit/PR>)

## Completed

- Subphase-by-subphase, one line each, with outcome.

## Files changed

- Grouped by area. Note new canonical abstractions.

## Architecture decisions

- New DEC-XXX entries made this phase (link to DECISIONS.md).

## Verification

- Exactly what was run and the result (lint / typecheck / build / tests / browser /
  deploy / device). No claim without evidence.

## Known issues

- Carried forward. Cross-reference RISKS.md / CURRENT_STATE.md.

## Deferred work

- Explicitly punted, with the phase it belongs to.

## Next phase prerequisites

- What must be true / provided before Phase <N+1> can start (e.g. assets, content,
  approvals).
```

Do not duplicate `CURRENT_STATE.md` content beyond what the template needs.
