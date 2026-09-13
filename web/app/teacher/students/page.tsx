"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const students = [
  { id: "STU-J2A-001", name: "Student Alpha", className: "JSS 2A", avg: 86, attendance: 96, trend: "+4.2%", risk: "Strong", intervention: "None" },
  { id: "STU-J2A-002", name: "Student Beta", className: "JSS 2A", avg: 61, attendance: 88, trend: "-3.1%", risk: "Watch", intervention: "Revision support" },
  { id: "STU-J2B-001", name: "Student Gamma", className: "JSS 2B", avg: 48, attendance: 79, trend: "-8.4%", risk: "At risk", intervention: "Parent + academic follow-up" },
  { id: "STU-J3A-001", name: "Student Delta", className: "JSS 3A", avg: 91, attendance: 98, trend: "+6.0%", risk: "Strong", intervention: "None" },
  { id: "STU-S1A-001", name: "Student Epsilon", className: "SS 1A", avg: 68, attendance: 91, trend: "-1.9%", risk: "Stable", intervention: "Subject-level review" },
];

export default function TeacherStudentsPage() {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [riskFilter, setRiskFilter] = useState("All statuses");
  const [selected, setSelected] = useState(students[0]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => students.filter((student) => {
    const matchesQuery = `${student.name} ${student.id} ${student.className}`.toLowerCase().includes(query.toLowerCase());
    const matchesClass = classFilter === "All classes" || student.className === classFilter;
    const matchesRisk = riskFilter === "All statuses" || student.risk === riskFilter;
    return matchesQuery && matchesClass && matchesRisk;
  }), [query, classFilter, riskFilter]);

  return (
    <main className="teacher-module-shell">
      <header className="teacher-module-topbar">
        <div>
          <span className="page-kicker">TEACHER PORTAL · ASSIGNED STUDENTS ONLY</span>
          <h1>Students</h1>
          <p>Academic, attendance and intervention view limited to your assigned classes.</p>
        </div>
        <div className="module-top-actions">
          <Link href="/teacher/classes">My Classes</Link>
          <Link href="/teacher/assessments">Assessments</Link>
          <Link href="/teacher/reports">Reports / PDF</Link>
          <Link href="/teacher/messages">Message</Link>
        </div>
      </header>

      <section className="module-stats">
        <article><span>Assigned students</span><strong>150</strong><small>Across 4 classes</small></article>
        <article><span>Strong / stable</span><strong>128</strong><small>Within expected range</small></article>
        <article><span>Watch list</span><strong>14</strong><small>Needs closer monitoring</small></article>
        <article><span>At risk</span><strong>8</strong><small>Academic or attendance concern</small></article>
      </section>

      <section className="module-panel student-directory-panel">
        <header>
          <div><h2>My student roster</h2><p>Only students linked to your current teaching assignments are visible. Open a full profile for deeper context.</p></div>
          <div className="student-filter-bar">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student or ID..." />
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <option>All classes</option><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option><option>SS 1A</option>
            </select>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
              <option>All statuses</option><option>Strong</option><option>Stable</option><option>Watch</option><option>At risk</option>
            </select>
          </div>
        </header>

        <div className="student-directory-grid">
          <div className="student-roster-list">
            {filtered.map((student) => (
              <div key={student.id} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 8, alignItems: "stretch" }}>
                <button className={`student-roster-row ${selected.id === student.id ? "selected" : ""}`} onClick={() => { setSelected(student); setSaved(false); }}>
                  <span className="student-id-badge">{student.id}</span>
                  <div><strong>{student.name}</strong><small>{student.className} · Avg {student.avg}% · Attendance {student.attendance}%</small></div>
                  <span className={`risk-chip ${student.risk.toLowerCase().replace(" ", "-")}`}>{student.risk}</span>
                </button>
                <Link href={`/teacher/students/${student.id}`} style={{ display: "grid", placeItems: "center", padding: "0 12px", border: "1px solid #dfe7ed", borderRadius: 10, background: "#fff", color: "#2e6078", textDecoration: "none", fontSize: 10, fontWeight: 800 }}>Profile</Link>
              </div>
            ))}
          </div>

          <aside className="student-profile-card">
            <span className="student-id-badge">{selected.id}</span>
            <h3>{selected.name}</h3>
            <p>{selected.className} · Mathematics</p>
            <div className="student-mini-kpis">
              <div><span>Average</span><strong>{selected.avg}%</strong></div>
              <div><span>Attendance</span><strong>{selected.attendance}%</strong></div>
              <div><span>Trend</span><strong>{selected.trend}</strong></div>
            </div>
            <div className="student-intervention-box">
              <span>Current intervention</span>
              <strong>{selected.intervention}</strong>
            </div>
            <div className="student-profile-actions">
              <Link href={`/teacher/students/${selected.id}`}>Open full student profile</Link>
              <Link href="/teacher/assessments">Assessment history</Link>
              <Link href="/teacher/attendance">Attendance history</Link>
              <Link href="/teacher/reports">Print performance / report card</Link>
              <Link href="/teacher/messages">Contact channel</Link>
            </div>
            <label className="student-note-field">Teacher note<textarea value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} placeholder="Add a professional teaching/intervention note..." /></label>
            <button className="primary-action" onClick={() => setSaved(true)}>{saved ? "Note saved" : "Save note"}</button>
          </aside>
        </div>
      </section>

      <section className="syllabus-bottom-grid">
        <article className="module-panel"><h2>Teacher AI student insight</h2><p className="module-copy">Student Gamma shows the strongest combined risk signal in this demo: attendance is below 80% and recent assessment performance is declining. Suggested action: short diagnostic revision, then controlled parent follow-up through SchoolOS messaging.</p><Link className="inline-link" href="/teacher/ai">Ask Teacher AI</Link></article>
        <article className="module-panel"><h2>Privacy boundary</h2><p className="module-copy">Teachers can only access students assigned to their authorized classes. Finance, unrelated classes, confidential administrative records and other schools remain outside this portal.</p></article>
      </section>
    </main>
  );
}
