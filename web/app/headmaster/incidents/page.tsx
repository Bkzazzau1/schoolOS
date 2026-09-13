"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CaseType = "Routine Support" | "Behaviour" | "Health & Safety" | "Attendance" | "Safeguarding";
type CaseStatus = "Open" | "Reviewing" | "Monitoring" | "Resolved";
type Priority = "Low" | "Medium" | "High" | "Critical";

type CaseRecord = {
  id: string;
  type: CaseType;
  title: string;
  pupil: string;
  className: string;
  priority: Priority;
  status: CaseStatus;
  owner: string;
  opened: string;
  summary: string;
  restricted: boolean;
  guardian: string;
  nextAction: string;
  timeline: { time: string; title: string; detail: string }[];
};

const initialCases: CaseRecord[] = [
  {
    id: "PRI-WEL-101",
    type: "Routine Support",
    title: "Reading-support follow-up",
    pupil: "Pupil Gamma",
    className: "Primary 3",
    priority: "Medium",
    status: "Monitoring",
    owner: "Mrs. Ruth James",
    opened: "Today · 8:35 AM",
    summary: "Class teacher requested a two-week reading-support cycle and Friday progress review.",
    restricted: false,
    guardian: "Guardian Gamma",
    nextAction: "Review Friday reading progress and update guardian.",
    timeline: [
      { time: "8:35 AM", title: "Support record opened", detail: "Class teacher added the pupil to the reading-support plan." },
      { time: "9:10 AM", title: "Headmistress review", detail: "Support plan accepted for monitoring; no disciplinary action involved." },
      { time: "10:25 AM", title: "Guardian follow-up prepared", detail: "Communication note drafted for the next progress checkpoint." },
    ],
  },
  {
    id: "PRI-WEL-102",
    type: "Behaviour",
    title: "Playground disagreement",
    pupil: "Pupil Beta",
    className: "Primary 2",
    priority: "Low",
    status: "Reviewing",
    owner: "Mrs. Esther Daniel",
    opened: "Today · 10:20 AM",
    summary: "A short disagreement between pupils was recorded for teacher follow-up and restorative conversation.",
    restricted: false,
    guardian: "Guardian Beta",
    nextAction: "Confirm teacher follow-up and close if no further action is needed.",
    timeline: [
      { time: "10:20 AM", title: "Teacher note added", detail: "Event recorded after break-time supervision." },
      { time: "10:42 AM", title: "Pupils spoken with", detail: "Teacher completed a calm restorative conversation with those involved." },
    ],
  },
  {
    id: "PRI-WEL-103",
    type: "Health & Safety",
    title: "Slippery corridor reported",
    pupil: "No individual pupil",
    className: "Primary Block",
    priority: "High",
    status: "Open",
    owner: "Headmistress Office",
    opened: "Today · 11:05 AM",
    summary: "A wet corridor near the Primary block was reported and temporarily restricted pending cleaning and inspection.",
    restricted: false,
    guardian: "Not required",
    nextAction: "Confirm the area is dry, inspect the cause and reopen access safely.",
    timeline: [
      { time: "11:05 AM", title: "Safety issue reported", detail: "Teacher notified the office about a slippery corridor." },
      { time: "11:09 AM", title: "Area restricted", detail: "Pupils were redirected while cleaning was requested." },
    ],
  },
  {
    id: "PRI-WEL-104",
    type: "Attendance",
    title: "Repeated absence follow-up",
    pupil: "Pupil Gamma",
    className: "Primary 3",
    priority: "High",
    status: "Reviewing",
    owner: "Headmistress Office",
    opened: "Yesterday · 2:15 PM",
    summary: "Repeated absence pattern was moved from the attendance queue into coordinated teacher and guardian follow-up.",
    restricted: false,
    guardian: "Guardian Gamma",
    nextAction: "Confirm guardian response and agree the next attendance checkpoint.",
    timeline: [
      { time: "Yesterday · 2:15 PM", title: "Attendance case opened", detail: "Repeated absence threshold triggered a manual leadership review." },
      { time: "Today · 10:28 AM", title: "Guardian replied", detail: "Guardian provided context and agreed to follow up on punctual attendance." },
    ],
  },
  {
    id: "PRI-WEL-105",
    type: "Safeguarding",
    title: "Restricted safeguarding record",
    pupil: "Restricted pupil record",
    className: "Primary School",
    priority: "Critical",
    status: "Open",
    owner: "Designated Safeguarding Lead",
    opened: "Today · Restricted time",
    summary: "Sensitive safeguarding details are hidden from the general incident list. Only authorized safeguarding personnel should access the protected record.",
    restricted: true,
    guardian: "Restricted",
    nextAction: "Follow the school's safeguarding policy and authorized escalation process.",
    timeline: [
      { time: "Restricted", title: "Protected case created", detail: "Timeline detail is intentionally hidden in the general leadership view." },
    ],
  },
  {
    id: "PRI-WEL-106",
    type: "Routine Support",
    title: "Transition-support check-in",
    pupil: "Pupil Zeta",
    className: "Primary 6",
    priority: "Low",
    status: "Resolved",
    owner: "Headmistress Office",
    opened: "2 days ago",
    summary: "Primary 6 transition check-in completed and class-teacher follow-up recorded.",
    restricted: false,
    guardian: "Guardian Zeta",
    nextAction: "No further action unless the class teacher reopens the record.",
    timeline: [
      { time: "2 days ago", title: "Transition check-in", detail: "Pupil transition support was reviewed." },
      { time: "Yesterday", title: "Record resolved", detail: "No additional action required at this time." },
    ],
  },
];

const guidance = [
  { label: "Routine support", text: "Use for learning, attendance and day-to-day pupil support that needs a clear follow-up trail." },
  { label: "Behaviour", text: "Record facts, actions and restorative follow-up without turning one event into a permanent pupil label." },
  { label: "Health & safety", text: "Track the operational event, immediate safety action and closure check. Do not use the UI to make medical diagnoses." },
  { label: "Safeguarding", text: "Keep details restricted, follow policy and limit access to specifically authorized safeguarding personnel." },
];

export default function HeadmasterIncidentsPage() {
  const [cases, setCases] = useState(initialCases);
  const [selectedId, setSelectedId] = useState(initialCases[0].id);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [internalNote, setInternalNote] = useState("");
  const [notice, setNotice] = useState("");
  const [showRestrictedNotice, setShowRestrictedNotice] = useState(false);

  const filtered = useMemo(() => cases.filter((item) => {
    const searchable = item.restricted ? `${item.id} ${item.type} ${item.status} ${item.priority}` : `${item.id} ${item.type} ${item.title} ${item.pupil} ${item.className} ${item.owner} ${item.status}`;
    const matchesQuery = searchable.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "All types" || item.type === typeFilter;
    const matchesStatus = statusFilter === "All statuses" || item.status === statusFilter;
    return matchesQuery && matchesType && matchesStatus;
  }), [cases, query, typeFilter, statusFilter]);

  const selected = cases.find((item) => item.id === selectedId) ?? cases[0];
  const openCount = cases.filter((item) => item.status !== "Resolved").length;
  const highPriority = cases.filter((item) => item.priority === "High" || item.priority === "Critical").length;
  const routineSupport = cases.filter((item) => item.type === "Routine Support" && item.status !== "Resolved").length;
  const restrictedCount = cases.filter((item) => item.restricted && item.status !== "Resolved").length;

  function changeStatus(status: CaseStatus) {
    setCases((current) => current.map((item) => item.id === selected.id ? { ...item, status } : item));
    setNotice(`${selected.id} moved to ${status} in the UI prototype.`);
  }

  function saveNote() {
    if (!internalNote.trim()) return;
    setNotice(`Internal note saved locally for ${selected.id}. No backend record was created.`);
    setInternalNote("");
  }

  function selectCase(id: string) {
    setSelectedId(id);
    setInternalNote("");
    setNotice("");
    setShowRestrictedNotice(false);
  }

  return (
    <main className="headmaster-module-shell primary-incidents-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Welfare & Incidents</h1>
          <p>Coordinate routine pupil support, behaviour follow-up, attendance cases, health & safety events and restricted safeguarding records.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/pupils">Pupils</Link>
          <Link href="/headmaster/communication">Communication</Link>
        </div>
      </header>

      <section className="primary-incident-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>General Primary leadership can coordinate routine cases. Safeguarding details remain separately restricted and are not exposed in the ordinary case list.</p>
      </section>

      <section className="primary-incident-kpis">
        <article><span>Open / active cases</span><strong>{openCount}</strong><small>Includes monitoring</small></article>
        <article><span>High-priority review</span><strong>{highPriority}</strong><small>High + restricted critical</small></article>
        <article><span>Routine support</span><strong>{routineSupport}</strong><small>Learning / transition support</small></article>
        <article><span>Restricted safeguarding</span><strong>{restrictedCount}</strong><small>Protected access</small></article>
        <article><span>Resolved</span><strong>{cases.filter((item) => item.status === "Resolved").length}</strong><small>Prototype records</small></article>
      </section>

      <section className="primary-incident-workspace">
        <article className="headmaster-module-card primary-case-list-card">
          <header>
            <div><h2>Primary case register</h2><p>Review factual records and route each case through the correct support process.</p></div>
            <div className="primary-case-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search case, pupil, class or owner..." />
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option>All types</option><option>Routine Support</option><option>Behaviour</option><option>Health & Safety</option><option>Attendance</option><option>Safeguarding</option></select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Open</option><option>Reviewing</option><option>Monitoring</option><option>Resolved</option></select>
            </div>
          </header>

          <div className="primary-case-table">
            <div className="primary-case-row heading"><span>Case</span><span>Type</span><span>Person / Area</span><span>Priority</span><span>Status</span></div>
            {filtered.map((item) => (
              <button key={item.id} onClick={() => selectCase(item.id)} className={`primary-case-row ${item.id === selected.id ? "selected" : ""} ${item.restricted ? "restricted" : ""}`}>
                <div><strong>{item.restricted ? "Restricted case" : item.title}</strong><small>{item.id} · {item.opened}</small></div>
                <span>{item.type}</span>
                <div><strong>{item.restricted ? "Protected record" : item.pupil}</strong><small>{item.restricted ? "Details hidden" : item.className}</small></div>
                <em className={`primary-case-priority ${item.priority.toLowerCase()}`}>{item.priority}</em>
                <em className={`primary-case-status ${item.status.toLowerCase()}`}>{item.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headmaster-module-card primary-case-detail">
          {selected.restricted ? (
            <>
              <div className="primary-restricted-case-head"><span>R</span><div><small>{selected.id}</small><h2>Restricted safeguarding case</h2><p>Protected record · {selected.status}</p></div></div>
              <div className="primary-restricted-banner"><strong>Restricted details are intentionally hidden</strong><p>The general Headmaster/Headmistress incident view should not expose sensitive safeguarding content. Production access must depend on an explicit safeguarding permission.</p></div>
              <div className="primary-restricted-summary"><span>Assigned owner</span><strong>{selected.owner}</strong></div>
              <div className="primary-restricted-summary"><span>Required process</span><strong>{selected.nextAction}</strong></div>
              <button className="primary-restricted-info" onClick={() => setShowRestrictedNotice(true)}>Request restricted-case access</button>
              {showRestrictedNotice && <p className="primary-restricted-request-note">Prototype only: no access is granted here. In production this action would follow the school's safeguarding authorization and audit process.</p>}
            </>
          ) : (
            <>
              <div className="primary-case-detail-head"><span>{selected.type.slice(0, 1)}</span><div><small>{selected.id}</small><h2>{selected.title}</h2><p>{selected.pupil} · {selected.className}</p></div></div>

              <div className="primary-case-meta-grid">
                <div><span>Type</span><strong>{selected.type}</strong></div>
                <div><span>Priority</span><strong>{selected.priority}</strong></div>
                <div><span>Status</span><strong>{selected.status}</strong></div>
                <div><span>Owner</span><strong>{selected.owner}</strong></div>
              </div>

              <div className="primary-case-summary"><span>CASE SUMMARY</span><p>{selected.summary}</p></div>
              <div className="primary-case-next"><span>NEXT ACTION</span><strong>{selected.nextAction}</strong></div>

              <div className="primary-case-links">
                {selected.pupil !== "No individual pupil" && <Link href="/headmaster/pupils">Open pupil</Link>}
                {selected.guardian !== "Not required" && <Link href="/headmaster/communication">Guardian / contact</Link>}
                {selected.type === "Attendance" && <Link href="/headmaster/attendance">Attendance</Link>}
                {selected.type === "Routine Support" && <Link href="/headmaster/academics">Academics</Link>}
              </div>

              <div className="primary-case-status-actions">
                <span>Case status</span>
                <div><button onClick={() => changeStatus("Open")}>Open</button><button onClick={() => changeStatus("Reviewing")}>Reviewing</button><button onClick={() => changeStatus("Monitoring")}>Monitoring</button><button onClick={() => changeStatus("Resolved")}>Resolve</button></div>
              </div>

              <label className="primary-case-note">Internal leadership note<textarea value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder="Record factual follow-up, action or handoff..." /></label>
              <button className="primary-case-save" onClick={saveNote}>Save internal note</button>
            </>
          )}
        </aside>
      </section>

      {!selected.restricted && (
        <section className="headmaster-module-card primary-case-timeline-card">
          <header><div><h2>Case timeline</h2><p>Chronological actions for {selected.id}.</p></div><span>{selected.status}</span></header>
          <div className="primary-case-timeline">{selected.timeline.map((event, index) => <div key={`${event.time}-${index}`}><span>{index + 1}</span><div><strong>{event.title}</strong><small>{event.time}</small><p>{event.detail}</p></div></div>)}</div>
        </section>
      )}

      <section className="primary-incident-lower-grid">
        <article className="headmaster-module-card primary-welfare-guidance">
          <header><div><h2>Case handling guide</h2><p>Different case types need different handling — not one generic discipline workflow.</p></div></header>
          <div>{guidance.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>)}</div>
        </article>

        <article className="headmaster-module-card primary-incident-ai">
          <span className="page-kicker">HEADMASTER AI · CASE OPERATIONS</span>
          <h2>Use AI for summaries and process gaps — not conclusions</h2>
          <p>For this prototype, AI may summarize open workload, overdue follow-ups and recurring operational themes. It should not determine guilt, punishment, whether abuse occurred, or make medical conclusions.</p>
          <div><span>Open-case pattern</span><strong>Attendance + routine learning support</strong></div>
          <div><span>Operational issue</span><strong>Primary-block safety check</strong></div>
          <div><span>Restricted cases</span><strong>Excluded from ordinary AI context</strong></div>
          <Link href="/headmaster/ai">Ask Headmaster AI</Link>
        </article>
      </section>

      {notice && <div className="primary-case-notice">{notice}</div>}
    </main>
  );
}
