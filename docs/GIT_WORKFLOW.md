# Git Workflow

## Branch model

```
main ← feat/<short-name>   (short-lived, one focused change, merged via PR, then deleted)
```

- **`main`** — always deployable. Vercel production tracks it.
- **`feat/*`** — short-lived working branches. One phase/subphase or one focused
  change each. Open a PR into `main`, review, merge (squash), delete the branch.
- **No long-lived `dev` branch.** PR preview deploys provide integration testing.

Branch naming: `feat/<area>-<short-desc>` — e.g. `feat/visual-spike`,
`feat/desktop-window-system`, `feat/projects-window`. Use `fix/*`, `chore/*`,
`docs/*` prefixes where they fit better than `feat/*`.

## Standard cycle

```bash
git switch main && git pull
git switch -c feat/xyz
# ... work, committing in logical steps ...
git push -u origin feat/xyz
gh pr create --base main --fill
# ... review / verify ...
gh pr merge --squash --delete-branch
```

## Commit messages

- Imperative summary line, ≤ ~72 chars: `add reusable DesktopWindow primitive`.
- Body when it helps: what changed and why, not how.
- Reference the roadmap phase when relevant: `Phase 5.9 — window manager`.
- Commit in coherent units. Don't mix unrelated changes.

## Hard rules (never without explicit owner approval)

- No force-push to `main`.
- No history rewrite on shared branches.
- No branch deletion other than merged `feat/*` branches.
- **Never commit secrets.** `.env*` is gitignored; keep it that way.
- No committing large binaries casually — see `docs/ASSET_PIPELINE.md` for how
  generated artwork enters the repo.

## Identity

Repo uses the machine's global Git identity:
`aryanprasher262004 <aryanprasher262004@gmail.com>` (email confirmed associated
with the `aryanprasher262004` GitHub account). If this ever needs to change, use
**repo-local** config only: `git config --local user.email "..."`. Do not modify
global config.

## Branch protection (recommended, optional)

For `main`: require a PR before merging, require the Vercel check to pass, disallow
force-push. Enable via GitHub repo settings or `gh api`. Kept optional so solo
hotfixes stay fast — enable once the project has a stable baseline.

## Releases

`main` is continuously deployed. Tag milestone releases (`v1.0.0` at Phase 11.10).
