import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./extras.css";
import PWARegister from "./pwa-register";
import PortalSchoolLifeLauncher from "../components/portal-school-life-launcher";

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
      <body><PWARegister />{children}<PortalSchoolLifeLauncher /></body>
    </html>
  );
}
