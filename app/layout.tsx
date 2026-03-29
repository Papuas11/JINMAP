import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jinja Maps",
  description: "Company map powered by Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
