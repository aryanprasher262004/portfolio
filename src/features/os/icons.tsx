/**
 * Small pixel glyphs for the desktop icons. Same crispEdges-SVG convention as
 * the scene's PowerControl / FocusToggle glyphs, 16x16 logical grid.
 */
import type { SVGProps } from "react";

function Glyph(props: SVGProps<SVGSVGElement> & { d: string }) {
  const { d, ...rest } = props;
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden {...rest}>
      <path fill="currentColor" d={d} />
    </svg>
  );
}

export const IconAbout = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M6 2h4v1H6z M5 3h1v1H5z M10 3h1v1H10z M5 4h1v3H5z M10 4h1v3H10z M6 7h4v1H6z M4 9h1v1H4z M11 9h1v1H11z M3 10h1v4H3z M12 10h1v4H12z M4 13h1v1H4z M11 13h1v1H11z M5 8h6v1H5z M4 12h8v1H4z"
  />
);

export const IconProjects = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M2 4h5v1H2z M2 5h1v8H2z M13 5h1v8H13z M2 12h12v1H2z M2 4h1v1H2z M7 4h1v1H7z M7 5h6v1H7z M13 4h1v1h-1z M3 6h10v6H3z"
  />
);

export const IconExperience = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M6 3h4v1H6z M6 3h1v2H6z M9 3h1v2H9z M2 6h12v1H2z M2 6h1v7H2z M13 6h1v7H13z M2 12h12v1H2z M6 8h4v3H6z"
  />
);

export const IconSkills = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M8 2h1v2H8z M7 2h1v2H7z M5 5h1v1H5z M10 5h1v1H10z M4 4h1v2H4z M11 4h1v2H11z M3 8h1v3H3z M12 8h1v3H12z M4 11h1v1H4z M11 11h1v1H11z M6 5h4v6H6z M5 6h1v4H5z M10 6h1v4H10z"
  />
);

export const IconResume = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M4 2h6v1H4z M4 2h1v12H4z M11 4h1v10H11z M4 13h8v1H4z M9 2h1v2H9z M9 3h2v1H9z M6 5h4v1H6z M6 7h4v1H6z M6 9h4v1H6z M6 11h3v1H6z"
  />
);

export const IconContact = (p: SVGProps<SVGSVGElement>) => (
  <Glyph
    {...p}
    d="M2 4h12v8H2z M2 4h1v1H2z M13 4h1v1h-1z M3 5h1v1H3z M12 5h1v1h-1z M4 6h1v1H4z M11 6h1v1H11z M7 7h2v1H7z M4 6h8v1H4z M2 11h12v1H2z"
  />
);
