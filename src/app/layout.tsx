import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aryan Prasher — Portfolio",
  description:
    "Personal portfolio, presented as an interactive computer setup.",
  // TEMPORARY — prototype is on production. Remove in Phase 11 (RELEASE V1).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
