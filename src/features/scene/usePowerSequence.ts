"use client";

import gsap from "gsap";
import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";
import type { Phase } from "@/stores/experienceStore";
import {
  fanCruise,
  fanHalt,
  fanSpinDown,
  fanSpinUp,
  fanTwitch,
} from "./fanMotion";

/** Seconds. Restrained, physical pacing — tune here only. */
const T = {
  press: 0,
  led: 0.12,
  fanTwitch: 0.35,
  fanSpin: 0.8,
  glow: 0.45,
  mini: 0.9,
  kbd: 1.6,
  wake: 2.1,
} as const;

const FX_PROPS = "opacity";

/**
 * Power-on choreography (DEC-019). The steady on/off look of every physical
 * layer is CSS, keyed off `data-powered` / `data-awake`; this hook only plays
 * the *transition* into "on" by tweening the `[data-fx]` / `[data-mini]`
 * hooks inside `scope`, then clears its inline styles so CSS holds the end
 * state. At the wake beat it calls `onWake` (`completePowerOn`), which moves
 * the store to `booting` and starts the existing Loading sequence.
 *
 * - cold start (idle → poweringOn): press → LED → fans twitch + spin up →
 *   glow → mini-display boot → keyboard → monitor flicker-wake.
 * - restart (powered → poweringOn): the PC stays lit and fans keep turning;
 *   mini-display reboots, monitor flicker-wakes.
 * - shut down (→ idle): lights fade (CSS), fans coast to a stop.
 * - reduced motion: no timeline, no fan motion; CSS states apply instantly,
 *   wake after a beat.
 *
 * Never touches the camera — powering on must not zoom (DEC-014).
 */
export function usePowerSequence(
  scope: RefObject<HTMLElement | null>,
  phase: Phase,
  reduced: boolean,
  onWake: () => void,
) {
  const prevPhase = useRef(phase);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const mounted = useRef(false);

  // Layout effect: the "off" starting values must be applied before the
  // browser paints the freshly-"on" CSS state, or the lights flash.
  useLayoutEffect(() => {
    const root0 = scope.current;
    if (!mounted.current && root0) {
      // Landing already powered (dev jump): fans are simply running.
      mounted.current = true;
      if (phase !== "idle" && !reduced) fanCruise(root0);
    }
    const from = prevPhase.current;
    prevPhase.current = phase;
    if (phase === from) {
      if (reduced && root0) fanHalt(root0);
      return;
    }

    if (phase === "idle") {
      stop(scope.current, tl, timer);
      if (root0) {
        if (reduced) fanHalt(root0);
        else fanSpinDown(root0);
      }
      return;
    }
    if (phase !== "poweringOn") return;

    stop(scope.current, tl, timer);
    const root = scope.current;
    if (reduced || !root) {
      timer.current = window.setTimeout(onWake, reduced ? 250 : 0);
      return;
    }
    tl.current =
      from === "idle" ? coldStart(root, onWake) : restart(root, onWake);
  }, [phase, reduced, onWake, scope]);

  useEffect(() => {
    const root = scope;
    return () => {
      stop(root.current, tl, timer);
      if (root.current) fanHalt(root.current);
    };
  }, [scope]);
}

function stop(
  root: HTMLElement | null,
  tl: RefObject<gsap.core.Timeline | null>,
  timer: RefObject<number | undefined>,
) {
  window.clearTimeout(timer.current);
  tl.current?.kill();
  tl.current = null;
  if (root) {
    gsap.set(root.querySelectorAll("[data-fx], [data-mini]"), {
      clearProps: FX_PROPS,
    });
  }
}

function coldStart(root: HTMLElement, onWake: () => void) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ onComplete: () => release(q) });

  // Everything starts dark (the CSS "on" state is already applied).
  gsap.set(q("[data-fx], [data-mini]"), { opacity: 0 });
  gsap.set(q('[data-fx="blackout"]'), { opacity: 1 });

  // 1. button travels in and springs back
  tl.to(q('[data-fx="press"]'), { opacity: 1, duration: 0.07 }, T.press).to(
    q('[data-fx="press"]'),
    { opacity: 0, duration: 0.22, ease: "power2.out" },
  );

  // 2. fans: a hesitant kick as current arrives, then they wind up
  tl.to(q('[data-fx="fan"]'), { opacity: 1, duration: 0.15 }, T.fanTwitch);
  fanTwitch(tl, root, T.fanTwitch);
  tl.call(() => fanSpinUp(root), [], T.fanSpin);

  // 3. power LED catches — one hesitant flick, then steady
  tl.to(q('[data-fx="led"]'), { opacity: 0.7, duration: 0.04 }, T.led)
    .to(q('[data-fx="led"]'), { opacity: 0.25, duration: 0.06 })
    .to(q('[data-fx="led"]'), {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    });

  // 4. interior lights come up warm and slow; wall spill trails a little
  tl.to(
    q('[data-fx="interior"], [data-fx="front"]'),
    { opacity: 1, duration: 1.4, ease: "power2.inOut", stagger: 0.1 },
    T.glow,
  ).to(
    q('[data-fx="spill"]'),
    { opacity: 1, duration: 1.6, ease: "power1.inOut" },
    T.glow + 0.2,
  );

  // 5. mini-display backlight + boot lines → clock
  tl.to(q('[data-fx="mini"]'), { opacity: 1, duration: 0.25 }, T.mini);
  miniBoot(tl, q, T.mini + 0.05);

  // 6. keyboard backlight
  tl.to(
    q('[data-fx="kbd"]'),
    { opacity: 1, duration: 0.8, ease: "power1.out" },
    T.kbd,
  );

  // 7. monitor wakes
  wake(tl, q, onWake, T.wake);
  return tl;
}

function restart(root: HTMLElement, onWake: () => void) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ onComplete: () => release(q) });
  gsap.set(q("[data-mini]"), { opacity: 0 });
  miniBoot(tl, q, 0.15);
  wake(tl, q, onWake, 1.2);
  return tl;
}

function miniBoot(
  tl: gsap.core.Timeline,
  q: gsap.utils.SelectorFunc,
  at: number,
) {
  const show = (name: string, t: number, hold: number) =>
    tl
      .set(q(`[data-mini="${name}"]`), { opacity: 1 }, t)
      .set(q(`[data-mini="${name}"]`), { opacity: 0 }, t + hold);
  show("sys", at, 0.6);
  show("ok", at + 0.6, 0.45);
  show("ready", at + 1.05, 0.55);
  tl.to(q('[data-mini="clock"]'), { opacity: 1, duration: 0.2 }, at + 1.6);
}

/** Monitor backlight: a couple of uneven flickers, then on. `onWake` fires
 *  first so the OS's Loading screen is what flickers into view. */
function wake(
  tl: gsap.core.Timeline,
  q: gsap.utils.SelectorFunc,
  onWake: () => void,
  at: number,
) {
  const b = q('[data-fx="blackout"]');
  tl.set(b, { opacity: 1 }, at)
    .call(onWake, [], at)
    .to(b, { opacity: 0.35, duration: 0.04 }, at + 0.06)
    .to(b, { opacity: 0.85, duration: 0.06 })
    .to(b, { opacity: 0.2, duration: 0.05 })
    .to(b, { opacity: 0.55, duration: 0.07 })
    .to(b, { opacity: 0, duration: 0.3, ease: "power2.out" });
}

/** Hand every layer back to its CSS steady state. */
function release(q: gsap.utils.SelectorFunc) {
  gsap.set(q("[data-fx], [data-mini]"), { clearProps: FX_PROPS });
}
