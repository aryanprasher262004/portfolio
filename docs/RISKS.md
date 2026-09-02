# Risk Register

> Reviewed at the start of each phase. Status: OPEN / MITIGATING / CLOSED.

| ID       | Risk                                                   | L×I         | Status     | Mitigation                                                                                                                                                                      |
| -------- | ------------------------------------------------------ | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RISK-001 | Trying to make everything real 3D                      | High × High | MITIGATING | Prototype fake/hybrid first (Phase 1). Rendering decision deferred to 1.8. DEC-006 keeps it swappable.                                                                          |
| RISK-002 | AI-generated 3D model quality is poor                  | High × Med  | OPEN       | Do not get attached to generated geometry. Fallback to 2.5D/hybrid is a first-class option, not a defeat.                                                                       |
| RISK-003 | Monitor UI alignment with the artwork                  | Med × High  | OPEN       | Prototype the monitor + HTML screen extremely early (Phase 1.5). Fixed logical screen resolution (DEC-007).                                                                     |
| RISK-004 | Visual quality depends too heavily on code             | Med × High  | OPEN       | Treat artwork/asset generation as first-class design work (Phase 2). Code should present good assets, not compensate for bad ones.                                              |
| RISK-005 | Over-engineering                                       | Med × High  | MITIGATING | Every technical system must justify a user-visible benefit. Feature-evaluation rule (below). YAGNI on directories/deps.                                                         |
| RISK-006 | Duplicate / divergent architecture across sessions     | Med × Med   | MITIGATING | Search before creating. `ARCHITECTURE.md` + `UI_SYSTEM.md` document the canonical abstractions. One `<Window>` (DEC-008).                                                       |
| RISK-007 | Context loss between AI sessions / models              | High × High | MITIGATING | `CURRENT_STATE.md` + `ROADMAP.md` + `DECISIONS.md` + `handoffs/` + `CLAUDE.md`. Repo is self-documenting; nothing important lives only in chat.                                 |
| RISK-008 | Portfolio is fun but hard to use (esp. recruiters)     | Med × High  | OPEN       | Skip-intro + returning-visitor shortcut (Phase 7.8). Mobile simplified tier (Phase 8). Accessible plain-document fallback (tier 3).                                             |
| RISK-009 | Next.js 16 is newer than model training data           | Med × Med   | MITIGATING | Framework-managed `AGENTS.md` points at `node_modules/next/dist/docs/`. Verify APIs against bundled docs before writing Next code.                                              |
| RISK-010 | Committing large binary assets bloats the repo         | Med × Med   | OPEN       | `ASSET_PIPELINE.md` defines how generated art enters the repo; keep source art in `references/`, ship optimized assets in `public/`. Consider size budgets / Git LFS if needed. |
| RISK-011 | Scope creep in Phase 7 (personality/microinteractions) | Med × Med   | OPEN       | Phase 7 only after core portfolio works. Feature-evaluation rule. Easter eggs only if cheap.                                                                                    |

## Feature-evaluation rule

For any significant proposed feature, score /10 each: **visual value · portfolio value ·
engineering cost · performance cost · maintenance cost.** Then recommend one of:
**BUILD NOW · BUILD LATER · FAKE IT · CUT IT.** Especially required for 3D features.
