"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Severity = "Low" | "Medium" | "High" | "Critical";
type CaseStatus = "Open" | "Investigating" | "Monitoring" | "Resolved";
type Category = "Behaviour" | "Safeguarding" | "Attendance" | "Health & Safety" | "Property";

type Incident = {
  id: string;
  title: string;
  category: Category;
  severity: Severity;
  status: CaseStatus;
  person: string;
  context: string;
  reportedBy: string;
  owner: string;
  reportedAt: string;
  location: string;
  guardianContact: "Not required" | "Pending" | "Contacted";
  evidence: number;
  summary: string;
  nextAction: string;
};

const seed: Incident[] = [
  {
    id: "INC-2401",
    title: "Repeated classroom disruption",
    category: "Behaviour",
    severity: "Medium",
    status: "Monitoring",
    person: "Student Beta",
    context: "JSS 2A",
    reportedBy: "Mrs. Amina Yusuf",
    owner: "Vice Principal Academics",
    reportedAt: "Today · 10:18 AM",
    location: "Block B · Room 12",
    guardianContact: "Contacted",
    evidence: 1,
    summary: "Repeated disruption was documented across two lessons. A restorative conversation has been completed and classroom behaviour is being monitored.",
    nextAction: "Review behaviour after the next three school days.",
  },
  {
    id: "INC-2402",
    title: "Student welfare concern",
    category: "Safeguarding",
    severity: "High",
    status: "Investigating",
    person: "Student Gamma",
    context: "JSS 2B",
    reportedBy: "Mrs. Fatima Bello",
    owner: "Principal",
    reportedAt: "Today · 8:42 AM",
    location: "Counselling Office",
    guardianContact: "Pending",
    evidence: 2,
    summary: "A welfare concern was escalated for restricted leadership review. Detailed sensitive notes are intentionally not shown in the general incident list.",
    nextAction: "Complete restricted safeguarding review and document authorized follow-up.",
  },
  {
    id: "INC-2403",
    title: "Repeated late arrival",
    category: "Attendance",
    severity: "Low",
    status: "Open",
    person: "Student Epsilon",
    context: "SS 1A",
    reportedBy: "Attendance Office",
    owner: "Year Coordinator",
    reportedAt: "Yesterday · 1:10 PM",
    location: "Main Gate",
    guardianContact: "Pending",
    evidence: 0,
    summary: "Three late arrivals were recorded within the current week and require a routine attendance follow-up.",
    nextAction: "Contact guardian and agree an arrival-time improvement plan.",
  },
  {
    id: "INC-2399",
    title: "Damaged laboratory equipment",
    category: "Property",
    severity: "Medium",
    status: "Resolved",
    person: "Science Lab Group",
    context: "SS 2A",
    reportedBy: "Mr. Peter James",
    owner: "Principal",
    reportedAt: "11 Sep · 12:25 PM",
    location: "Science Laboratory 2",
    guardianContact: "Not required",
    evidence: 3,
    summary: "Equipment damage was documented, replacement was approved, and the laboratory safety reminder was completed.",
    nextAction: "No further action unless the issue repeats.",
  },
  {
    id: "INC-2398",
    title: "Wet corridor slip hazard",
    category: "Health & Safety",
    severity: "High",
    status: "Resolved",
    person: "Facilities",
    context: "Administration Block",
    reportedBy: "Front Office",
    owner: "Operations Lead",
    reportedAt: "10 Sep · 9:02 AM",
    location: "Administration Block",
    guardianContact: "Not required",
    evidence: 2,
    summary: "A temporary slip hazard was isolated immediately, cleaned, marked and closed after facilities verification.",
    nextAction: "Include the location in the next facilities inspection.",
  },
];

const activity = [
  { time: "10:32 AM", text: "Principal restricted access applied to INC-2402." },
  { time: "10:20 AM", text: "Behaviour follow-up note added to INC-2401." },
  { time: "9:05 AM", text: "Guardian-contact task created for INC-2403." },
  { time: "Yesterday", text: "INC-2399 marked resolved after replacement approval." },
];

export default function PrincipalIncidentsPage() {
  const [items, setItems] = useState(seed);
  const [selectedId, setSelectedId] = useState(seed[1].id);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [severity, setSeverity] = useState("All severities");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => items.filter((item) => {
    const q = `${item.id} ${item.title} ${item.category} ${item.person} ${item.context}`.toLowerCase();
    return q.includes(query.toLowerCase())
      && (category === "All categories" || item.category === category)
      && (status === "All statuses" || item.status === status)
      && (severity === "All severities" || item.severity === severity);
  }), [items, query, category, status, severity]);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const openCases = items.filter((item) => item.status !== "Resolved").length;
  const highPriority = items.filter((item) => item.status !== "Resolved" && (item.severity === "High" || item.severity === "Critical")).length;
  const safeguarding = items.filter((item) => item.category === "Safeguarding" && item.status !== "Resolved").length;
  const awaitingGuardian = items.filter((item) => item.guardianContact === "Pending").length;

  function setCaseStatus(next: CaseStatus) {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status: next } : item));
  }

  return (
    <main className="principal-module-shell principal-incidents-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · INCIDENTS</span>
          <h1>Incidents & Case Management</h1>
          <p>Track behaviour, welfare, safeguarding, safety and operational incidents through resolution.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/students">Students</Link>
          <Link href="/principal/communication">Communication</Link>
        </div>
      </header>

      <section className="incident-kpis">
        <article><span>Open cases</span><strong>{openCases}</strong><small>Across all categories</small></article>
        <article><span>High priority</span><strong>{highPriority}</strong><small>Needs leadership attention</small></article>
        <article><span>Safeguarding</span><strong>{safeguarding}</strong><small>Restricted access</small></article>
        <article><span>Guardian contact</span><strong>{awaitingGuardian}</strong><small>Pending follow-up</small></article>
        <article><span>Resolved this term</span><strong>18</strong><small>Prototype total</small></article>
      </section>

      <section className="incident-workspace">
        <article className="principal-module-card incident-list-card">
          <header className="incident-card-head">
            <div><h2>Case register</h2><p>Search and filter incidents requiring school follow-up.</p></div>
          </header>
          <div className="incident-filters">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search case, student, class..." />
            <select value={category} onChange={(e) => setCategory(e.target.value)}><option>All categories</option><option>Behaviour</option><option>Safeguarding</option><option>Attendance</option><option>Health & Safety</option><option>Property</option></select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option><option>Open</option><option>Investigating</option><option>Monitoring</option><option>Resolved</option></select>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}><option>All severities</option><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select>
          </div>

          <div className="incident-list">
            {filtered.map((item) => (
              <button key={item.id} className={selected.id === item.id ? "selected" : ""} onClick={() => { setSelectedId(item.id); setSaved(false); }}>
                <div className="incident-list-top"><span className="incident-id">{item.id}</span><b className={`incident-severity ${item.severity.toLowerCase()}`}>{item.severity}</b></div>
                <strong>{item.title}</strong>
                <span>{item.person} · {item.context}</span>
                <small>{item.category} · {item.reportedAt}</small>
                <em className={`incident-status ${item.status.toLowerCase()}`}>{item.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="principal-module-card incident-detail-card">
          <div className="incident-detail-heading">
            <div><span>{selected.id} · {selected.category}</span><h2>{selected.title}</h2><p>{selected.person} · {selected.context}</p></div>
            <b className={`incident-severity ${selected.severity.toLowerCase()}`}>{selected.severity}</b>
          </div>

          {selected.category === "Safeguarding" && <div className="incident-restricted"><strong>Restricted safeguarding case</strong><p>Only authorized safeguarding/leadership users should see sensitive case details. General staff views should receive the minimum necessary information.</p></div>}

          <div className="incident-summary"><span>Case summary</span><p>{selected.summary}</p></div>

          <div className="incident-detail-grid">
            <div><span>Status</span><strong>{selected.status}</strong></div>
            <div><span>Case owner</span><strong>{selected.owner}</strong></div>
            <div><span>Reported by</span><strong>{selected.reportedBy}</strong></div>
            <div><span>Location</span><strong>{selected.location}</strong></div>
            <div><span>Guardian contact</span><strong>{selected.guardianContact}</strong></div>
            <div><span>Evidence / files</span><strong>{selected.evidence}</strong></div>
          </div>

          <div className="incident-next-action"><span>Next action</span><strong>{selected.nextAction}</strong></div>

          <label className="incident-note">Principal case note<textarea value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} placeholder="Add an internal action, finding or follow-up note..." /></label>
          <div className="incident-note-actions"><button onClick={() => setSaved(true)}>{saved ? "Note saved" : "Save note"}</button><Link href="/principal/communication">Contact / follow up</Link></div>

          <div className="incident-status-actions">
            <button onClick={() => setCaseStatus("Investigating")}>Investigating</button>
            <button onClick={() => setCaseStatus("Monitoring")}>Monitoring</button>
            <button className="resolve" onClick={() => setCaseStatus("Resolved")}>Resolve case</button>
          </div>
        </aside>
      </section>

      <section className="incident-bottom-grid">
        <article className="principal-module-card">
          <h2>Recent case activity</h2>
          <div className="incident-activity">{activity.map((item) => <div key={`${item.time}-${item.text}`}><span>{item.time}</span><p>{item.text}</p></div>)}</div>
        </article>

        <article className="principal-module-card">
          <h2>Principal AI case insight</h2>
          <p className="incident-ai-copy">Prototype pattern: JSS 2B currently carries both attendance and welfare signals. Treat these as potentially connected indicators for human review, not as an automated conclusion. Sensitive safeguarding decisions must remain with authorized people.</p>
          <div className="incident-ai-links"><Link href="/principal/ai">Ask Principal AI</Link><Link href="/principal/attendance">Review attendance</Link><Link href="/principal/students">Open students</Link></div>
        </article>
      </section>

      <section className="principal-module-card incident-governance">
        <h2>Case governance</h2>
        <div className="principal-capabilities">
          <div><span>CONFIDENTIALITY</span><strong>Restrict sensitive cases to authorized school roles.</strong></div>
          <div><span>AUDIT TRAIL</span><strong>Case changes, notes, evidence and decisions should be attributable.</strong></div>
          <div><span>HUMAN DECISION</span><strong>AI may surface patterns but cannot determine safeguarding or disciplinary outcomes.</strong></div>
        </div>
      </section>
    </main>
  );
}
