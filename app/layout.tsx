import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JINJA MAPS",
  description: "Discover verified companies and key locations across Jinja, Uganda."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
