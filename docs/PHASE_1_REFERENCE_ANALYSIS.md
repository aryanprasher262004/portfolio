# Phase 1.1 — Reference Analysis

> Analysis of the concept assets in `references/`. These are **references /
> prototypes, not final production assets.** The rendering architecture (DEC-012)
> stays **OPEN** until Phase 1.8. Feeds Phase 1.2.

## Assets reviewed

| Asset                       | Dims            | What it is                                                                             |
| --------------------------- | --------------- | -------------------------------------------------------------------------------------- |
| `concept/p1.png`            | 1536×1024       | Green-wall room, 3/4 angled hero, **desktop ON** — 8-icon grid, taskbar, day wallpaper |
| `concept/p2.png`            | 1536×1024       | 2×2 UI exploration sheet — angled desk + PROJECTS window (×2) + LOGIN screen           |
| `concept/p3.jpg`            | 1344×768        | Blue-wall room, frontal, **blank monitor**, wide framing (low-quality JPG)             |
| `concept/p6.png`            | 1448×1086       | Blue-wall room, frontal, **blank monitor**, tighter — monitor already fairly dominant  |
| `concept/p7.png`            | 1659×948        | Blue-wall room, frontal, **desktop ON** — sunset wallpaper, 8-icon grid, taskbar       |
| `experiments/pcon.mp4`      | 1920×1080, 5.0s | **Clip 1** — PC power-on (fan spin-up + RGB ramp) + slow camera push                   |
| `experiments/monitoron.mp4` | 1280×720, 4.0s  | **Clip 2** — monitor backlight wake (black→grey→warm white) + camera push              |

Clip frames were extracted with a local AVFoundation/Swift script (no ffmpeg) to
`scratchpad/clip_frames/` for inspection — not committed.

**Gap:** `p4.jpg` and `p5.png` (listed in the p1–p7 set) no longer exist on disk —
not in `references/`, not in `~/Downloads`, nowhere. Timestamps place them between
p3 (20:00) and p6 (20:13), i.e. intermediate blue-wall desk iterations. Analysis
proceeds on the 5 images that exist; ask the owner if p4/p5 are worth recovering.

## Two art directions in the set

- **A — green wall / warm / saturated** (p1, p2): cozy, higher contrast, 3/4 angle,
  cactus prop, blue-purple PC RGB.
- **B — blue-grey wall / cool / muted** (p3, p6, p7): calmer, desaturated "modern
  render" look, frontal, purple-flower prop, **orange** PC RGB, creeper mousepad,
  post lamp.

**Both video clips commit to direction B.** Treat B as the working direction;
green-wall is an alternate at most.

## Image analysis (direction B is the reference world)

**Overall composition** — near-frontal, slight downward tilt, roughly symmetric:
monitor centered, lamp left, PC tower + plant right, keyboard + mousepad + mouse on
the desk. p3 wastes space (big empty wall above, big empty desk in front); p6 is
tight and clean; p7 is tight with the screen on.

**Monitor size & placement** — centered, on a low stand, base just above desk
surface. Frame share: p3 ≈ 40% width, p6 ≈ 55%, p7 ≈ 62%. Owner wants it **25–35%
larger and clearly dominant** → target is beyond p7: push camera in and/or scale the
monitor, trim wall headroom and desk foreground.

**Monitor screen geometry** — near front-parallel quad, only slight keystone (top
edge marginally wider). Aspect looks ~16:10. Inner bezel opening is a clean
rectangle. **Ideal for an HTML overlay** — needs only a degree or two of CSS
`perspective`/`rotateX`, not a real 3D projection. Exact corner coordinates must be
measured on the final plate + Clip 2 end-frame (Phase 1.5).

**Desk composition** — warm mid-brown chunky-plank wood, thick slab, simple legs.
Generous flat surface. Foreground depth is available for a near parallax layer
(keyboard/mousepad) or can be cropped out.

**PC placement** — right of monitor, tall tower, glass side panel facing camera-left,
3 orange ring fans + front intake glow. Reads as the obvious "power" object. **No
visible power button** in any render — must be added/defined on the front face for
the "click to power on" interaction.

**Lamp / keyboard / mouse / plant** — post-mounted cube lamp (emissive, left);
low-profile black keyboard; black mouse on a **creeper-face green mousepad**; small
purple flower in a terracotta pot (right). Lamp is a cheap toggleable light prop.
Keyboard/mouse/plant are decorative — low value to make interactive.

**Colour palette** — room: desaturated blue-grey wall (#5b7a92-ish), warm brown desk,
matte near-black hardware, single orange accent (PC RGB) + warm yellow (lamp), green
mousepad, purple flower. Screen contents deliberately **brighter and more saturated**
pixel-art than the room — the screen pops. Preserve this contrast.

**Lighting** — soft, even, ambient; almost no hard shadows; gentle vignette in clips.
Three emissive sources: lamp, PC fans, screen (when on). Flat and stylised, not
realistic. The monitor should read as the focal point even when off — consider a
touch more rim/contrast on the bezel.

**Voxel / pixel intensity** — moderate. Geometry is chunky/low-poly with **beveled,
readable silhouettes** (not cube-world). Textures are low-res pixel. Screen UI is
true pixel-art at a moderate, mostly-legible resolution. This matches the brief's
"moderate pixelation, polished silhouettes."

**Perspective** — B renders: near-frontal, camera ≈ monitor-centre height, mild
downward tilt, shallow vanishing. Very overlay-friendly. (p1/p2 angled 3/4 view is a
different camera — not the production view.)

**Visual hierarchy** — p6/p7 get it right (monitor dominant). p3 does not (monitor
competes with dead space). Target framing = p7-plus.

**Empty / dead space** — p3: large (wall top, desk front). p6: small margins. p7:
minimal. Foreground desk in all shots is currently unused flat wood — either exploit
as a parallax layer or crop.

**Suitability for interactive overlays**

- Screen quad: excellent (clean near-rectangle).
- PC fans: strong independent hover/animate target (already emissive).
- Lamp: cheap on/off interactive prop.
- Power button: **missing** — needs to be designed onto the tower.
- Keyboard / mouse / plant / mousepad: decorative only.
- Bezel: static frame.

### Preserve

Direction-B room (wall colour, wood desk, black hardware, orange RGB, creeper
mousepad, post lamp, flower); near-frontal slightly-tilted camera; moderate voxel
level with beveled silhouettes; three emissive light sources; bright saturated
pixel-art **inside** the screen vs. muted room; the two clip beats (fan spin-up +
RGB ramp; backlight wake + camera push).

### Change for the next asset-generation iteration

1. **Monitor 25–35% larger and dominant** — regenerate the base scene at p7-plus
   framing: bigger monitor, camera pushed in, less wall headroom, less desk
   foreground.
2. **Render the base scene with a BLANK screen** — all UI (wallpaper, icons,
   taskbar, windows, login) is real HTML, never baked into the art.
3. **Remove the Kling/AI watermarks** (bottom-right of both clips) — crop or
   regenerate clean; design production framing so the watermark strip is croppable.
4. **Fix all garbled text** — reference UI shows "EXPLORERCE", "EXCERDACE",
   "CRAFTOS", etc. Real labels only, and only **six** apps (About · Projects ·
   Experience & Education · Skills & Achievements · Resume · Contact), not the
   eight-icon grid in p1/p7.
5. **Add a visible power button / affordance** on the PC tower front face.
6. **Commit to the blue-grey wall**; drop or de-prioritise the green-wall variant.
7. **Lock the monitor aspect + inner-bezel rectangle** and keep screen perspective
   minimal and identical between the blank plate and the Clip 2 end-frame, so one
   HTML overlay geometry fits both (ties to DEC-007 logical resolution).
8. **High-res plate** — p3 is a compressed JPG; the production still must be a
   high-res PNG/WebP.
9. Decide deliberately whether to keep foreground desk depth (for parallax) or crop
   it.
10. Optional: slightly stronger rim light / contrast on the monitor so it reads as
    the focal point when off.

## Clip 1 — `pcon.mp4` (PC power-on)

- **Power-on effect:** fans dark → orange glow ramps up over ~1.5–2s (front intake +
  3 ring fans), subtle spill onto desk. Convincing "spin-up."
- **Geometry consistency:** fully stable — no morphing, props fixed; only emissive +
  camera change. Consistent with Clip 2 and the p3/p6 scene.
- **Lighting changes:** PC fans/interior emissive ramp on; rest of scene static;
  lamp already on.
- **Camera movement:** slow straight **dolly-in** (~8–12% over 5s), no pan/orbit;
  ends slightly tighter, monitor a little larger.
- **Production transition viability:** **Yes** for the "PC wakes" beat, with caveats:
  watermark; 1920×1080 / ~4.7 MB needs trim + compression + downscale; the screen is
  **white, not off** at t=0 — for a clean narrative it should start black/off and
  pair with Clip 2's wake; the push here overlaps Clip 2's push (decide: one
  continuous push across both, or two segments). Also fully **fake-able** (fan =
  looping CSS/sprite glow, push = CSS scale on a still).

## Clip 2 — `monitoron.mp4` (monitor wake / camera push)

- **Monitor wake:** black → backlight kick → uniform dark grey → mid grey → warm
  off-white/cream **flat fill**. No boot logo or content — ends blank and lit
  (~2–3s).
- **Camera push:** continuous slow **dolly-in** across the full 4s, stronger than
  Clip 1. Ends with the monitor ≈ 55–60% frame width, side props cropped to the
  edges, desk foreground mostly gone. This **is** the brief's "slow 2–3s push toward
  the monitor."
- **Final monitor framing:** centered, large, screen plane near front-parallel with a
  very slight keystone; thin wall margin above, sliver of desk below. Stable frame to
  freeze on.
- **Geometry consistency:** consistent with Clip 1 and p3/p6. Fans already lit at
  t=0, so chronologically Clip 2 follows Clip 1.
- **Transition suitability:** **Strong.** Freeze the last frame → cut/crossfade to the
  HTML monitor overlay on the measured screen rectangle → play boot/login HTML.
- **Handoff to a real HTML monitor UI:** **Very good.** End screen is an even flat
  fill with no content and negligible perspective. An absolutely-positioned HTML
  layer with ~1–2° `rotateX`/`perspective` over the frozen frame aligns cleanly. The
  HTML desktop's initial background should match / fade from the warm-white end tint.
  Needs exact screen-corner measurement (Phase 1.5).

## Architectural implications (DEC-012 stays OPEN — no selection)

### 1. 2.5D (layered stills + CSS/GSAP/parallax)

Assets support it well. The frontal near-symmetric B composition separates cleanly
into: back wall / desk + PC + props / foreground props / bezel frame / **HTML
screen**. Cursor parallax on 3–5 layers gives convincing depth. The camera push is a
straight dolly (Clip 2) → faked with a GSAP `scale` + `transform-origin` on the layer
stack plus slight parallax spread — visually near-identical. Fan = small looping
composited element. **Limits:** single viewpoint (fine — brief wants minimal camera
movement), no object rotation, the angled p1 view can't be the production view. Cost
low, art control high, perf excellent.

### 2. Pre-rendered / video

We **already have** the two hero clips at the target cinematic quality. Path: idle
still → (power click) → Clip 1 → Clip 2 → freeze → HTML desktop. **Strengths:** the
power-on and camera-push moments are done; zero realtime rendering. **Weaknesses:**
watermarks; file size / mobile decode; pixel-accurate alignment of Clip 2's end-frame
to the HTML overlay; **no interactivity during playback** — the idle/hover state and
any "skip intro" path need a separate non-video state; re-generating a variant means
re-running AI video (variance risk). Good for the one-way boot narrative; not for the
persistent idle state or post-boot desk interaction.

### 3. Real 3D (R3F)

Would uniquely enable: free camera, object rotation, genuine parallax, relightable
scene, continuous re-targetable camera push, in-engine iteration on monitor
size/position. **But** nothing in the references needs orbiting, object rotation, or
multi-angle viewing, and the brief says camera movement is minimal and the monitor
(HTML) is the product. The one motion 3D is "for" here — a straight dolly — is
trivially faked. Cost is high (model/clean a GLB, match the soft flat lighting and
voxel texture style, mobile perf, WebGL fallback). **Not justified by these
references.** The only real pull is a _workflow_ benefit (iterate framing without
re-rendering), not a visitor benefit.

### 4. Hybrid

Strongest fit for what exists. Candidate shape (for prototyping, **not selected**):
boot cinematics = the two clips (or still + faked push); post-freeze = high-res
blank-screen plate with 2–3 parallax layers for idle depth; **screen = real HTML/CSS
(the whole OS)** on the measured rectangle with ~1–2° CSS perspective; fan / lamp /
power-button = small independent CSS/sprite layers, no engine. Real 3D only if a
specific later beat demands it (none identified). Matches the "video + HTML/CSS +
GSAP hybrid" the owner floated — still to be validated against 2.5D-only in
1.3–1.6.

## Depth / interactivity achievable WITHOUT real 3D

- Multi-layer **cursor parallax** (wall / desk+PC / foreground props / screen), 3–5
  layers, offset ∝ pointer, different factors — sells "real space."
- **Fake camera push** = GSAP `scale` + `transform-origin` on the layer stack (+
  parallax spread). Clip 2 confirms the target motion is a plain dolly.
- **Screen glow / specular overlays** (additive gradient, slow-moving highlight) —
  sells "real panel."
- **Emissive loops** for lamp + PC fans as small composited elements; **lamp toggle**
  on click.
- **Idle "breathing"** — tiny continuous sine on parallax layers + fan flicker.
- **Faked depth-of-field** — blurred foreground prop layer.
- Contact shadows / AO **baked into the plate**.
- **Hover highlight** on interactive props = CSS filter/outline on a masked cut-out,
  no raycasting.

## Where real 3D would genuinely be worth the complexity

Honest list — **none are in the Phase 1–6 scope:**

- Visitor **orbits / drags the camera** around the desk to view props from multiple
  angles.
- **Many physically-consistent interactive 3D objects** (pick up the mouse, tilt the
  monitor).
- **Scroll-scrubbed / interruptible / reversible** camera push with perfect parallax
  (a real camera does this for free; faking scrub-friendly multi-layer parallax gets
  fiddly).
- Frequent **framing / monitor-size iteration** where re-rendering video/stills is
  the bottleneck (workflow benefit).
- **Dynamic lighting** — day/night wallpaper spilling coloured light into the room
  (Phase 12); real lights do this, faking needs pre-rendered variants.

Keep option D (hybrid) open in case 1.3/1.6 shows the faked push looks cheap.

## Risks surfaced (see also `RISKS.md`)

- **Watermarks** on both clips — must remove (crop/regenerate) before any production
  use.
- **Two art directions** (green vs blue wall) — pick one now (recommend blue) or
  asset work forks.
- **Garbled AI text + 8-icon grid** baked into screen art — production base render
  must have a **blank screen**; all UI is HTML; six apps not eight.
- **Clip weight** (4.7 MB / 1.9 MB, 1080p) — mobile decode/perf risk; need
  compression, downscale, trims, poster frames, and a non-video fallback state.
- **Screen-rectangle alignment** between the clip end-frame and the responsive HTML
  overlay must be pixel-accurate (RISK-003) — prototype in 1.5.
- **Video-heavy corner** — idle/hover and "skip intro" need a non-video state; don't
  design that out.
- **p3 is a low-res JPG** — not a production plate; need a fresh high-res
  blank-screen render at final framing.
- **AI re-generation variance** — "same scene, bigger monitor, no watermark, blank
  screen" may not reproduce palette/props exactly; expect several attempts or manual
  compositing (RISK-002 / RISK-004).
- **`p4`/`p5` lost** — minor; confirm whether to recover.

## Recommendation into Phase 1.2

Explore the final visual concept around **direction B, monitor enlarged and
dominant, blank screen, no watermark**, and list the exact assets to generate: (a) a
high-res blank-screen hero plate at final framing, (b) separable layers or masks for
parallax, (c) clean (watermark-free) power-on and monitor-wake clips or their fake
equivalents, (d) a power-button design on the tower. Do **not** commit to 2.5D vs
video vs hybrid — that is Phase 1.7–1.8.

---

# Phase 1.2 — Prototype Visual Spec (COMPLETE)

> Decisions for the vertical prototype (Phases 1.3–1.7). Priority:
> **functionality + readability + responsive framing first.** Temp assets only —
> do not wait for better artwork; polish/regenerate after the flow feels good.

**Base plate:** `references/concept/p6.png` → `public/prototype/plate.png` (1448×1086,
~4:3, blank screen). Clips → `public/prototype/clip1.mp4` (`pcon`), `clip2.mp4`
(`monitoron`) for later experimentation — **do not architect around the clips.**
Establish a controllable scene with p6 + HTML/CSS + GSAP first; the prototype must
still work if the clips are removed.

**Never distort the source art.** Aspect ratio is preserved at all times. Reframing
is proportional **scale + translate + transform-origin** only — never
non-uniform scale / stretch of the plate.

**Two intentional framing states:**

1. **DESK / INTRO** — whole setup understandable: monitor, PC tower, lamp, keyboard,
   mouse, flower, enough desk/room for context. Monitor need not fill the viewport.
   Plate fit ≈ `cover` (fill viewport, crop only nonessential outer wall/desk-front;
   never crop interaction targets). Atmospheric + interactive state.
2. **MONITOR / WORK** — after power-on / monitor-wake, GSAP smoothly reframes toward
   the monitor: screen ≈ **70–80% of useful viewport width where practical**, screen
   content readable **without browser zoom**, bezel still visible, some
   PC/environment ideally still visible ("computer inside a world"). The % is not a
   hard rule — **readability is the requirement.**

**Responsive:** desktop/laptop is the Phase 1 priority (mobile = Phase 8). Do not
assume 16:10. Test at least **1440×900, 1366×768, 1536×864, 1920×1080**. The scene
may crop nonessential outer environment per viewport aspect. It must NOT: distort
the monitor, stretch the desk, crop important intro interaction targets, make the
monitor UI too small to use, or show obvious black bars (fill unused space with a
tasteful wall-color continuation, `--scene-wall`). Use breakpoint/framing rules
rather than forcing one transform onto every viewport.

**Monitor screen = real HTML/CSS** container positioned over the plate at the p6
screen rect (~`top 13% · left 19% · width 55% · height 44%`, exact corners measured
in 1.3; child of the transformed stage so it tracks the artwork). Logical OS
resolution **1280×800**, scaled to fit the screen's layout box (stable during the
camera animation). Loading / login / desktop / icons / windows / Projects are all
real React — the desktop UI in the reference imagery is **not** production UI.

**Fake the power/camera beats first** (scale/translate, PC glow, screen
blackout→wake overlay). **Then** try Clip 1 / Clip 2 and keep a clip only if it
visibly improves the experience without harming responsive framing, continuity,
monitor alignment, performance, or interaction timing.

**Loading:** `LOADING 6 OF 6` (six portfolio apps). Staged, honest, GSAP-timed.

**Polish deferred:** final colors/wallpaper/fonts/textures/audio/microanimations
come after the full flow works. Prototype must still look coherent and intentional,
not unstyled.

**Success criterion:** open localhost → attractive desk → clear what's interactive →
power on → smooth controlled transition toward monitor → monitor large + readable →
loading → login → desktop → six icons → Projects opens → scrolls → closes → scene
still usable across normal laptop aspect ratios.

---

# Phase 2.1 — Scene Concept Confirmation + Generation Brief

> Confirmed 2026-09-12. No re-exploration of rejected directions (green wall,
> angled 3/4 view). This is the brief for owner-run image generation (Phase 2.2).
> The selected result is the **V1 production candidate**, not an irreversible
> final asset — later polish may regenerate it without an architecture change.

## Confirmed direction (reused, not re-decided)

Direction **B** (blue-grey room) from Phase 1.1/1.2: desaturated blue-grey wall,
warm brown wood desk, near-black matte hardware, orange PC accent, warm-yellow
lamp. Frontal camera, slight downward tilt (not the angled p1/p2 3/4 view).
Moderate pixelation — chunky, voxel-influenced, polished silhouettes; not
hyper-real, not Minecraft, not flat pixel art.

## What must change vs. the current plate (`p6.png`)

1. **Monitor bigger/more dominant** — target screen ≈ 65–70% of frame width
   (current plate ≈ 54%), same near-frontal geometry.
2. **Screen perfectly blank** — flat neutral light fill, no reflections/UI/logo.
3. **Thin, believable bezel** — large usable screen, not a thick black frame.
4. **PC power area clearly usable** — add one distinct small power
   button/LED on the tower's **top-front edge** (there isn't one today; our
   HTML power hotspot currently has no matching visual anchor).
5. **Enough desk/environment preserved** — lamp (left), PC tower with 3
   glowable circular fans (right), keyboard + mouse + small plant accent,
   warm wood desk. Don't crop these out of the composition itself (our scene
   code crops per-viewport, not the art).
6. **Composition must survive our viewport crop** — keep the monitor + PC +
   lamp within the horizontal-center ~90% of frame (our framing fills viewport
   width and crops top/bottom, never sides, so nothing essential should sit at
   the extreme left/right edge).
7. **High resolution, no watermark, no text, no compression artifacts.**

## Three.js-compatibility note (does not change the brief)

This stays a single flat 2D image (never a 3D model/file) — that's what keeps
`features/scene` swappable later per DEC-015. Nothing about the art itself
needs to anticipate a future 3D scene.

## Copy-paste generation prompt

> A stylized 3D-rendered desk computer setup, voxel-influenced but polished —
> moderate pixelation, chunky geometry, smooth clean silhouettes. Not
> Minecraft-style, not flat pixel art, not photorealistic. Frontal camera
> angle, slight downward tilt, symmetric composition. Desaturated blue-grey
> wall background, warm medium-brown wood-plank desk. Center: a large
> flat-screen monitor on a low stand, dominant in the frame (roughly two-thirds
> of the image width), completely blank screen with a flat neutral
> light-grey/off-white fill (no reflections, no UI, no logos), thin dark
> bezel. Left of the monitor: a small warm-yellow glowing cube-shaped desk
> lamp on a slim post. Right of the monitor: a matte black PC tower with a
> glass side panel showing three circular fans capable of glowing orange, and
> one small, clearly visible power button or LED indicator on the top-front
> edge of the case. On the desk in front: a low-profile black keyboard, a
> mouse on a small mousepad, and one small potted plant accent near the PC.
> Soft ambient lighting, minimal hard shadows, gentle emissive glow from the
> lamp and PC fans only. Clean, high resolution, no watermark, no text, no
> logos. Aspect ratio approximately 4:3 to 16:10.

## Technical spec

- Format: PNG (or lossless), high resolution (≥ 2400 px wide preferred).
- Aspect: ~4:3–16:10 (exact ratio doesn't matter — Phase 2.4 re-measures rects
  against whatever is delivered; the scene code is aspect-agnostic).
- No baked-in wallpaper/icons/taskbar/text inside the screen — it must be
  a flat blank fill, always.
- Deliver 1 primary composition; 1–2 close variants optional for comparison.

## What Phase 2.2–2.4 do with the result (for continuity, not owner action)

2.2 generation happens outside this session. 2.3 = owner picks one. 2.4 =
re-measure `SCREEN_RECT`/`SCREEN_SURFACE_RECT`/`PC_RECT`/`POWER_HOTSPOT_RECT`
in `features/scene/sceneConfig.ts` against the chosen plate (same measurement
method as Phase 1.1: a local Swift/AVFoundation script, no ffmpeg) and decide
only the masks/crops actually used.
