"use client";

import { useExperienceStore } from "@/stores/experienceStore";
import { Desktop } from "./Desktop";
import { Loading } from "./Loading";
import { Login } from "./Login";

/**
 * Root of the fake OS. Reads its own phase from the store — knows nothing
 * about the scene/rendering layer (insulation rule, DEC-006).
 */
export function OS() {
  const phase = useExperienceStore((s) => s.phase);

  if (phase === "booting") return <Loading />;
  if (phase === "login") return <Login />;
  if (phase === "desktop") return <Desktop />;
  // idle / poweringOn — screen is covered by the blackout anyway.
  return null;
}
