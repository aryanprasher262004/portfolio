"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useViewportSize } from "@/lib/useViewportSize";
import { useExperienceStore } from "@/stores/experienceStore";
import { computeFraming } from "./framing";
import { MonitorScreen } from "./MonitorScreen";
import { CAMERA_PUSH, PARALLAX_MAX_PX, PLATE } from "./sceneConfig";
import { SceneDevControls } from "./SceneDevControls";
import { ScreenPlaceholder } from "./ScreenPlaceholder";
import styles from "./Scene.module.css";

gsap.registerPlugin(useGSAP);

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  /** null until the first framing is applied; then tracks the last applied mode. */
  const appliedMode = useRef<boolean | null>(null);

  const { width: vw, height: vh } = useViewportSize();
  const reduced = useReducedMotion();
  const phase = useExperienceStore((s) => s.phase);
  const atMonitor = useExperienceStore((s) => s.atMonitor);
  const setPhase = useExperienceStore((s) => s.setPhase);
  const advance = useExperienceStore((s) => s.advance);

  // Dev/testing helpers via query string:
  //   ?phase=poweredOn  → jump straight to a framing state
  //   ?dev=push         → start on the desk, then trigger the camera push
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get("phase");
    if (
      p === "idle" ||
      p === "poweredOn" ||
      p === "booting" ||
      p === "login" ||
      p === "desktop"
    ) {
      setPhase(p);
    }
    if (q.get("dev") === "push") {
      const t = window.setTimeout(() => advance(), 700);
      return () => window.clearTimeout(t);
    }
  }, [setPhase, advance]);

  const ready = vw > 0 && vh > 0;
  const framing = ready
    ? computeFraming(vw, vh, atMonitor ? "monitor" : "desk")
    : null;

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!framing || !stage) return;

      const target = { scale: framing.scale, x: framing.x, y: framing.y };
      const firstApply = appliedMode.current === null;
      const modeChanged = !firstApply && appliedMode.current !== atMonitor;
      appliedMode.current = atMonitor;

      if (modeChanged && !reduced) {
        gsap.to(stage, {
          ...target,
          duration: CAMERA_PUSH.duration,
          ease: CAMERA_PUSH.ease,
          overwrite: "auto",
        });
      } else {
        // first paint, or a resize within the same framing state → snap
        gsap.set(stage, target);
      }
    },
    {
      scope: containerRef,
      dependencies: [
        framing?.scale,
        framing?.x,
        framing?.y,
        atMonitor,
        reduced,
      ],
    },
  );

  function handlePointerMove(e: ReactPointerEvent) {
    if (reduced || !parallaxRef.current || !ready) return;
    const nx = (e.clientX / vw) * 2 - 1;
    const ny = (e.clientY / vh) * 2 - 1;
    const factor = atMonitor ? 0.25 : 1;
    const dx = -nx * PARALLAX_MAX_PX * factor;
    const dy = -ny * PARALLAX_MAX_PX * factor;
    parallaxRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  }

  function resetParallax() {
    if (parallaxRef.current) parallaxRef.current.style.transform = "";
  }

  return (
    <div
      ref={containerRef}
      className={styles.viewport}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div ref={parallaxRef} className={styles.parallax}>
        {ready && framing && (
          <div
            ref={stageRef}
            className={styles.stage}
            style={{ width: framing.stageW, height: framing.stageH }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size art plate, not content */}
            <img
              className={styles.plate}
              src={PLATE.src}
              alt=""
              draggable={false}
              width={PLATE.naturalWidth}
              height={PLATE.naturalHeight}
            />
            <MonitorScreen osScale={framing.osScale} powered={phase !== "idle"}>
              <ScreenPlaceholder phase={phase} />
            </MonitorScreen>
          </div>
        )}
      </div>

      <SceneDevControls />
    </div>
  );
}
