import { useEffect, useState } from "react";

export interface ViewportSize {
  width: number;
  height: number;
}

/** Current viewport size, updated on resize. SSR-safe (starts at 0×0). */
export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
