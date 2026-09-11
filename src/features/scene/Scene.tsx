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
import { OS } from "@/features/os/OS";
import { type Phase, useExperienceStore } from "@/stores/experienceStore";
import { computeFraming } from "./framing";
import { MonitorScreen } from "./MonitorScreen";
import { PcState } from "./PcState";
import { PowerControl } from "./PowerControl";
import { CAMERA_MOVE, PARALLAX_MAX_PX, PLATE } from "./sceneConfig";
import { SceneDevControls } from "./SceneDevControls";
import styles from "./Scene.module.css";

gsap.registerPlugin(useGSAP);

const PHASES: Phase[] = ["idle", "poweringOn", "booting", "login", "desktop"];

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const appliedView = useRef<string | null>(null);

  const { width: vw, height: vh } = useViewportSize();
  const reduced = useReducedMotion();

  const phase = useExperienceStore((s) => s.phase);
  const view = useExperienceStore((s) => s.view);
  const powerOn = useExperienceStore((s) => s.powerOn);
  const setPhase = useExperienceStore((s) => s.setPhase);
  const toggleView = useExperienceStore((s) => s.toggleView);
  const setDevMode = useExperienceStore((s) => s.setDevMode);

  const powered = phase !== "idle";
  // Backlight: PC glows during `poweringOn`, screen wakes as boot begins.
  // No camera movement is tied to any of this — that is user-initiated only.
  const awake = powered && phase !== "poweringOn";

  // Dev/testing query flags: ?dev=1 (control panel), ?phase=booting, ?view=monitor
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("dev") === "1") setDevMode(true);
    const p = q.get("phase");
    if (p && (PHASES as string[]).includes(p)) setPhase(p as Phase);
    if (q.get("view") === "monitor")
      useExperienceStore.getState().enterMonitor();
  }, [setPhase, setDevMode]);

  const ready = vw > 0 && vh > 0;
  const framing = ready ? computeFraming(vw, vh, view) : null;

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!framing || !stage) return;
      const target = { scale: framing.scale, x: framing.x, y: framing.y };
      const firstApply = appliedView.current === null;
      const viewChanged = !firstApply && appliedView.current !== view;
      appliedView.current = view;

      if (viewChanged && !reduced) {
        gsap.to(stage, {
          ...target,
          duration: CAMERA_MOVE.duration,
          ease: CAMERA_MOVE.ease,
          overwrite: "auto",
        });
      } else {
        gsap.set(stage, target);
      }
    },
    {
      scope: containerRef,
      dependencies: [framing?.scale, framing?.x, framing?.y, view, reduced],
    },
  );

  function handlePointerMove(e: ReactPointerEvent) {
    if (reduced || !parallaxRef.current || !ready) return;
    const nx = (e.clientX / vw) * 2 - 1;
    const ny = (e.clientY / vh) * 2 - 1;
    const factor = view === "monitor" ? 0.18 : 1;
    parallaxRef.current.style.transform = `translate3d(${
      -nx * PARALLAX_MAX_PX * factor
    }px, ${-ny * PARALLAX_MAX_PX * factor}px, 0)`;
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
            <PcState powered={powered} />
            <MonitorScreen
              osScale={framing.osScale}
              awake={awake}
              view={powered ? view : null}
              onToggleView={toggleView}
            >
              <OS />
            </MonitorScreen>
            {phase === "idle" && <PowerControl onPress={powerOn} />}
          </div>
        )}
      </div>

      <SceneDevControls />
    </div>
  );
}
