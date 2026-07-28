import type { Metadata } from "next";
import { meta } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://morpheus-jpinho-projects.vercel.app"),
  title: `${meta.title} – ${meta.tagline}`,
  description: meta.description,
  openGraph: {
    title: `${meta.title} – ${meta.tagline}`,
    description: meta.description,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} – ${meta.tagline}`,
    description: meta.description,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
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
