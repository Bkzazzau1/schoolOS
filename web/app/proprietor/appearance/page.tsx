"use client";

import { useState } from "react";
import { schoolThemes, useSchoolTheme, type SchoolThemeId } from "../../../components/school-theme";
import "./appearance.css";

export default function AppearancePage() {
  const { theme, ready, save } = useSchoolTheme();
  const [draft, setDraft] = useState<SchoolThemeId | null>(null);
  const [message, setMessage] = useState("");
  const selected = schoolThemes.find(item => item.id === (draft ?? theme))!;
  function apply() {
    if (save(selected.id)) { setDraft(null); setMessage(`${selected.name} theme saved for BrightGate Academy on this browser.`); }
    else setMessage("Your browser could not save the theme. Allow site storage and try again.");
  }
  return <main className="appearance-page">
    <header><span>SCHOOL SETTINGS</span><h1>Make SchoolOS your own.</h1><p>Choose the colours your school sees across every portal, login and School Life.</p></header>
    <section className="appearance-panel"><h2>School colour theme</h2><p>BrightGate Academy · Managed by the Proprietor</p>
      <div className="theme-options" role="group" aria-label="School colour theme">{schoolThemes.map(item => <button type="button" key={item.id} aria-pressed={selected.id === item.id} onClick={() => { setDraft(item.id); setMessage(""); }}>
        <span className="theme-swatch" style={{ background: item.dark }}><i style={{ background: item.accent }} /></span>
        <strong>{item.name}{theme === item.id ? " · Current" : ""}</strong><small>{item.description}</small>
      </button>)}</div>
      <div className="theme-preview" style={{ borderColor: selected.dark }} aria-label={`${selected.name} theme preview`}>
        <aside style={{ background: selected.dark }}><strong>SchoolOS</strong><span style={{ background: selected.accent, color: selected.dark }}>Overview</span><span>People & classes</span><span>School Life</span></aside>
        <div><small>YOUR SCHOOL, YOUR IDENTITY</small><h2 style={{ color: selected.dark }}>A brighter school day</h2><p>A coordinated look for leadership, teachers and your school community.</p><span className="preview-action" style={{ background: selected.dark }}>Primary action</span></div>
      </div>
      <div className="appearance-actions"><button type="button" disabled={!ready || selected.id === theme} onClick={apply}>Apply school theme</button><button type="button" onClick={() => { setDraft("forest"); setMessage(""); }}>Select default</button><button type="button" disabled={draft === null} onClick={() => { setDraft(null); setMessage(""); }}>Cancel changes</button></div>
      <p role="status" aria-live="polite">{message}</p>
    </section>
    <p className="appearance-note">Prototype: this school preference is saved in this browser and shared across its tabs. School-wide syncing across devices and enforced Proprietor permissions require backend authentication and school settings storage.</p>
  </main>;
}
