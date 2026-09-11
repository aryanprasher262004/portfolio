/**
 * Central project data. Add/edit an entry here and the Projects window
 * updates automatically — do not hardcode project info in components.
 *
 * Names only are confirmed; everything else is a clearly-marked placeholder
 * until real content is provided (see CLAUDE.md content rule).
 */
export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "pookpit",
    name: "PookPit",
    category: "Placeholder — stack/category TBD",
    description: "Placeholder description. Real content coming soon.",
  },
  {
    id: "moshpit",
    name: "Moshpit",
    category: "Placeholder — stack/category TBD",
    description: "Placeholder description. Real content coming soon.",
  },
  {
    id: "vibecheck",
    name: "VibeCheck",
    category: "Placeholder — stack/category TBD",
    description: "Placeholder description. Real content coming soon.",
  },
  {
    id: "terminal-secrets-app",
    name: "terminal-secrets-app",
    category: "Placeholder — stack/category TBD",
    description: "Placeholder description. Real content coming soon.",
  },
  {
    id: "capstone",
    name: "capstone",
    category: "Placeholder — stack/category TBD",
    description: "Placeholder description. Real content coming soon.",
  },
];
