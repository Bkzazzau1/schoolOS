import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolOS AI",
  description: "AI-native school operating system for modern private schools",
  applicationName: "SchoolOS AI",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#081827",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
