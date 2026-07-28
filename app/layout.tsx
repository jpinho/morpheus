import type { Metadata } from "next";
import { meta } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${meta.title} — ${meta.tagline}`,
  description: meta.description,
  openGraph: {
    title: `${meta.title} — ${meta.tagline}`,
    description: meta.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} — ${meta.tagline}`,
    description: meta.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
