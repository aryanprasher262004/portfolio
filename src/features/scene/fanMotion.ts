import gsap from "gsap";

/**
 * Fan motion for the power-on choreography (DEC-019). The plate's fan artwork
 * never moves; only a faint blade overlay (`[data-fan-spin]`) rotates inside a
 * static, ring-masked ellipse (see `PcState` / `fanStyle`).
 *
 * Each overlay owns one endless linear rotation whose `timeScale` is tweened:
 * 0 → 1 to spin up, 1 → 0 to spin down — so acceleration is smooth and the
 * angle is continuous. `[data-fan-jolt]` (the parent) takes the start-up
 * twitch independently.
 */

/** Seconds per revolution at full speed — slow enough to read as smooth
 *  motion at Desk View size (fast enough would strobe against 60 fps). */
const PERIOD = 0.9;

const spins = new WeakMap<Element, gsap.core.Tween>();

function spinOf(el: Element) {
  let t = spins.get(el);
  if (!t) {
    t = gsap.to(el, {
      rotation: "+=360",
      duration: PERIOD,
      ease: "none",
      repeat: -1,
      paused: true,
    });
    spins.set(el, t);
  }
  return t;
}

const spinEls = (root: Element) => root.querySelectorAll("[data-fan-spin]");
const joltEls = (root: Element) => root.querySelectorAll("[data-fan-jolt]");
const blurEls = (root: Element) => root.querySelectorAll("[data-fan-blur]");
const bladeEls = (root: Element) => root.querySelectorAll("[data-fan-blades]");

/** Blade shadows at cruise — mostly smeared away, just enough to flicker. */
const CRUISE_BLADES = 0.22;

/** Crossfade between visible blades (rest) and the motion sheen (speed). */
function setMotion(
  root: Element,
  speed: number,
  duration: number,
  ease: string,
) {
  const vars = { duration, ease, overwrite: "auto" as const };
  if (duration === 0) {
    gsap.set(blurEls(root), { opacity: speed });
    gsap.set(bladeEls(root), { opacity: 1 - speed * (1 - CRUISE_BLADES) });
    return;
  }
  gsap.to(blurEls(root), { opacity: speed, ...vars });
  gsap.to(bladeEls(root), {
    opacity: 1 - speed * (1 - CRUISE_BLADES),
    ...vars,
  });
}

/** Small hesitant kick, as the motors first get current. */
export function fanTwitch(tl: gsap.core.Timeline, root: Element, at: number) {
  joltEls(root).forEach((el, i) => {
    const t = at + i * 0.05;
    tl.to(el, { rotation: 16, duration: 0.07, ease: "power2.out" }, t)
      .to(el, { rotation: -5, duration: 0.14, ease: "power1.inOut" })
      .to(el, { rotation: 0, duration: 0.2, ease: "power1.out" });
  });
}

/** Accelerate from rest to cruising speed; blades blur into a sheen. */
export function fanSpinUp(root: Element, duration = 2.2) {
  spinEls(root).forEach((el, i) => {
    const t = spinOf(el);
    gsap.killTweensOf(t);
    if (!t.isActive()) t.timeScale(0.001).play();
    gsap.to(t, {
      timeScale: 1,
      duration,
      delay: i * 0.12,
      ease: "sine.inOut",
    });
  });
  setMotion(root, 1, duration, "sine.in");
}

/** Already powered (dev jump / page state) — cruise immediately. */
export function fanCruise(root: Element) {
  spinEls(root).forEach((el) => spinOf(el).timeScale(1).play());
  setMotion(root, 1, 0, "none");
}

/** Coast to a stop, blades re-appearing as the sheen fades. */
export function fanSpinDown(root: Element, duration = 2.8) {
  spinEls(root).forEach((el) => {
    const t = spins.get(el);
    if (!t) return;
    gsap.killTweensOf(t);
    gsap.to(t, {
      timeScale: 0,
      duration,
      ease: "power2.out",
      onComplete: () => {
        t.pause();
      },
    });
  });
  setMotion(root, 0, duration * 0.7, "power1.out");
}

/** Instant stop (reduced motion / teardown). */
export function fanHalt(root: Element) {
  spinEls(root).forEach((el) => {
    const t = spins.get(el);
    if (!t) return;
    gsap.killTweensOf(t);
    t.pause();
  });
  gsap.killTweensOf([...blurEls(root), ...bladeEls(root)]);
  setMotion(root, 0, 0, "none");
}
