# Project Vision

> Source of truth for **why** this project exists and what "good" means.
> Distilled from the project brief so it does not live only in chat history.

## One sentence

A memorable personal portfolio presented as an interactive, stylized computer setup —
the visitor "enters my computer" and explores my work.

## The core principle

**The visitor's experience is what matters — not whether the 3D is "real" internally.**

If something looks convincingly 3D and feels interactive, that is enough. Complex 3D
engineering must earn its cost with a visible improvement for the visitor. A convincing
fake is acceptable. A hybrid is acceptable. Real 3D is acceptable **only where it pays
for itself.**

> We are NOT building "a Three.js showcase that happens to contain a resume."
> We ARE building "a memorable portfolio presented as an interactive stylized computer."

Permitted techniques (any sensible mix): R3F/Three.js, GLB models, AI-generated 3D,
pre-rendered images, transparent PNG/WebP layers, CSS transforms & perspective, 2.5D
parallax, video, image sequences, GSAP, masks, overlays, lighting tricks, DOM over
imagery, cursor-driven movement, perspective illusions.

Objective: **maximum visual impact with reasonable engineering complexity.**

## The conceptual journey

```
visitor arrives → computer setup / desk → interaction / power on → PC wakes →
monitor wakes → boot / loading → login → desktop → open applications → explore portfolio
```

It should tell a tiny story and feel tactile and satisfying — without physical
simulation, cables, or realistic electrical behavior.

## The monitor is the real product

The desk creates atmosphere. **The monitor contains the portfolio.** Engineering effort
priority:

1. Monitor interaction
2. Desktop experience
3. Portfolio content
4. Transitions
5. Environment polish
6. Decorative interactions

Do not perfect a keyboard while the Projects app is unfinished.

## Success criteria

The portfolio succeeds if a visitor thinks:

> "Whoa, this is a cool way to show a portfolio."

It does **not** need to make them think "this person built an advanced realtime
rendering engine." This distinction guides every technical decision.

It should demonstrate: creativity, frontend ability, interaction design, technical
competence, attention to detail, personality — **without becoming hard to maintain.**

## Art direction

Sits between: stylized 3D + pixel art + voxel influence + retro operating system +
modern interactive portfolio.

- Moderate pixelation. Chunky geometry and pixel-inspired textures, but smooth enough
  silhouettes to look polished and intentionally art-directed.
- **Not**: hyper-realistic, heavily Minecraft-inspired, extremely pixelated, childish,
  a generic Three.js demo, a generic AI portfolio, or a normal portfolio template
  placed inside a monitor.

The reference images are **concept only** — mood, composition, retro feeling, monitor-
centred experience. Final artwork may change entirely. **Do not couple architecture to
any specific reference image.**

## The six applications

Exactly six (not eight): **About · Projects · Experience + Education · Skills +
Achievements · Resume · Contact.** Projects is one of the strongest parts of the
experience.

## Hard constraints

- No physics engine (no cloth, collision, rigid bodies, cable/mouse physics — fake it).
- No animation engine. Prefer GSAP + CSS + simple transforms. `useFrame` only for
  genuinely continuous 3D animation.
- Minimal audio: power / boot / click / login. No background-music system, no spatial
  audio, no audio engine. Optional, respects browser autoplay rules.
- No backend. Fake auth (login screen is part of the experience). Contact = links.
- One reusable window system. No duplicate window components.
- No AI slop: no giant gradients, glowing blobs, generic glassmorphism, meaningless
  cards, "innovative developer" copy, purple SaaS aesthetic, random animations.

## Content rule

**Do not invent facts about the owner** — job history, project descriptions, metrics,
technologies, education, achievements. Use clearly marked placeholders until real
content is provided. Known project _names_ only: PookPit, Moshpit, VibeCheck,
terminal-secrets-app, capstone.

## Time

~4 week window. Extra time goes to experimentation, visual quality, polish, content,
performance, testing, transitions — **not** infrastructure.

## What is stable vs. open

**Stable:** everything above, plus the foundation decisions in `DECISIONS.md`
(DEC-001…DEC-011).

**Open (Phase 1 decides):** the rendering architecture — real 3D vs 2.5D vs
video/pre-rendered vs hybrid (DEC-012). See `ARCHITECTURE.md` § Deferred.
