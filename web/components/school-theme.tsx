"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const schoolThemes = [
  { id: "forest", name: "Forest", description: "Evergreen and fresh mint", dark: "#153d34", accent: "#c9f28d" },
  { id: "ocean", name: "Ocean", description: "Deep blue and sky", dark: "#152b4d", accent: "#a8d7ff" },
  { id: "violet", name: "Violet", description: "Plum and soft lavender", dark: "#352047", accent: "#e3beff" },
  { id: "rose", name: "Rose", description: "Burgundy and blush", dark: "#48202d", accent: "#ffc5d6" },
  { id: "amber", name: "Amber", description: "Warm brown and gold", dark: "#44301a", accent: "#ffdf9e" },
] as const;
export type SchoolThemeId = typeof schoolThemes[number]["id"];
const storageKey = "schoolos:brightgate:appearance";
const validTheme = (value: string | null): SchoolThemeId => schoolThemes.find(theme => theme.id === value)?.id ?? "forest";
const ThemeContext = createContext({ theme: "forest" as SchoolThemeId, ready: false, save: (_theme: SchoolThemeId): boolean => false });

export function SchoolThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SchoolThemeId>("forest");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setTheme(validTheme(localStorage.getItem(storageKey))); } catch { /* Default theme works without storage. */ }
    setReady(true);
    const sync = (event: StorageEvent) => { if (event.key === storageKey || event.key === null) setTheme(validTheme(event.newValue)); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    const selected = schoolThemes.find(item => item.id === theme)!;
    const root = document.documentElement;
    root.style.setProperty("--school-primary", selected.dark);
    root.style.setProperty("--school-accent", selected.accent);
    root.dataset.schoolTheme = theme;
  }, [theme]);
  function save(next: SchoolThemeId) {
    try { localStorage.setItem(storageKey, next); setTheme(next); return true; } catch { return false; }
  }
  return <ThemeContext.Provider value={{ theme, ready, save }}>{children}</ThemeContext.Provider>;
}

export const useSchoolTheme = () => useContext(ThemeContext);
