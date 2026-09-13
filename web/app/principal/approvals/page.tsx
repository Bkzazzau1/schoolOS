"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ApprovalStatus = "Pending" | "Approved" | "Returned";

type ApprovalItem = {
  id: string;
  type: string;
  title: string;
  teacher: string;
  className: string;
  submitted: string;
  priority: "Normal" | "High";
  status: ApprovalStatus;
  summary: string;
};

const seed: ApprovalItem[] = [
  { id: "APR-101", type: "Lesson Plan", title: "Linear Equations · Week 6", teacher: "Mrs. Amina Yusuf", className: "JSS 2A", submitted: "18 min ago", priority: "Normal", status: "Pending", summary: "Objectives, guided practice, independent task and exit ticket are included." },
  { id: "APR-102", type: "Assessment", title: "Topic Test · Simultaneous Equations", teacher: "Mr. Daniel John", className: "JSS 3A", submitted: "42 min ago", priority: "Normal", status: "Pending", summary: "30-mark topic test with short-answer and structured-response sections." },
  { id: "APR-103", type: "Report Cards", title: "First Term Report Batch", teacher: "Mrs. Fatima Bello", className: "JSS 2B", submitted: "1 hr ago", priority: "High", status: "Pending", summary: "39 student report cards prepared for principal review before release." },
  { id: "APR-104", type: "Score Correction", title: "CA 1 correction request", teacher: "Mr. Peter James", className: "SS 1A", submitted: "2 hrs ago", priority: "High", status: "Pending", summary: "Teacher requests correction to one submitted CA score after rechecking the marked script." },
  { id: "APR-099", type: "Lesson Plan", title: "Functions · Week 5", teacher: "Mr. Peter James", className: "SS 1A", submitted: "Yesterday", priority: "Normal", status: "Approved", summary: "Previously reviewed and approved lesson plan." },
];

export default function PrincipalApprovalsPage() {
  const [items, setItems] = useState(seed);
  const [selectedId, setSelectedId] = useState(seed[0].id);
  const [filter, setFilter] = useState("Pending");
  const [query, setQuery] = useState("");
  const [comment, setComment] = useState("");

  const filtered = useMemo(() => items.filter((item) => {
    const matchesFilter = filter === "All" || item.status === filter;
    const matchesQuery = `${item.type} ${item.title} ${item.teacher} ${item.className}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }), [items, filter, query]);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  function updateStatus(status: ApprovalStatus) {
    setItems((current) => current.map((item) => item.id === selected.id ? { ...item, status } : item));
    setComment("");
  }

  return (
    <main className="principal-module-shell approval-page">
      <header className="principal-module-header">
        <div><span className="page-kicker">PRINCIPAL · APPROVALS</span><h1>Approvals</h1><p>Review teacher work, approve it, or return it with clear comments.</p></div>
        <div className="principal-module-actions"><Link href="/principal">Dashboard</Link><Link href="/principal/teachers">Teachers</Link><Link href="/principal/results">Results & Reports</Link></div>
      </header>

      <section className="approval-kpis">
        <div><span>Pending</span><strong>{items.filter((i) => i.status === "Pending").length}</strong><small>Needs action</small></div>
        <div><span>High priority</span><strong>{items.filter((i) => i.status === "Pending" && i.priority === "High").length}</strong><small>Review first</small></div>
        <div><span>Approved today</span><strong>{items.filter((i) => i.status === "Approved").length}</strong><small>Prototype count</small></div>
        <div><span>Returned</span><strong>{items.filter((i) => i.status === "Returned").length}</strong><small>Needs teacher changes</small></div>
      </section>

      <section className="approval-workspace">
        <article className="approval-list-panel">
          <header><div><h2>Approval queue</h2><p>Teacher work sent to school leadership.</p></div></header>
          <div className="approval-toolbar"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teacher, class or work..." /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>Pending</option><option>Approved</option><option>Returned</option><option>All</option></select></div>
          <div className="approval-items">{filtered.map((item) => <button key={item.id} className={selected.id === item.id ? "selected" : ""} onClick={() => { setSelectedId(item.id); setComment(""); }}><span className={`approval-priority ${item.priority.toLowerCase()}`}>{item.priority}</span><div><strong>{item.type}</strong><b>{item.title}</b><small>{item.teacher} · {item.className} · {item.submitted}</small></div><em className={`approval-state ${item.status.toLowerCase()}`}>{item.status}</em></button>)}</div>
        </article>

        <article className="approval-review-panel">
          <div className="approval-review-head"><div><span>{selected.type}</span><h2>{selected.title}</h2><p>{selected.teacher} · {selected.className} · {selected.id}</p></div><b className={`approval-state ${selected.status.toLowerCase()}`}>{selected.status}</b></div>

          <div className="approval-document-preview">
            <span>SUBMISSION PREVIEW</span>
            <h3>{selected.title}</h3>
            <p>{selected.summary}</p>
            {selected.type === "Lesson Plan" && <div className="approval-detail-grid"><div><span>Learning objectives</span><strong>Clear and measurable</strong></div><div><span>Syllabus alignment</span><strong>Week 6 · Linear Equations</strong></div><div><span>Assessment</span><strong>Exit ticket included</strong></div><div><span>Resources</span><strong>Worksheet + whiteboard</strong></div></div>}
            {selected.type === "Assessment" && <div className="approval-detail-grid"><div><span>Total marks</span><strong>30</strong></div><div><span>Questions</span><strong>12</strong></div><div><span>Coverage</span><strong>3 syllabus objectives</strong></div><div><span>Duration</span><strong>45 minutes</strong></div></div>}
            {selected.type === "Report Cards" && <div className="approval-detail-grid"><div><span>Students</span><strong>39</strong></div><div><span>Scores complete</span><strong>39 / 39</strong></div><div><span>Teacher comments</span><strong>Complete</strong></div><div><span>Release state</span><strong>Waiting for approval</strong></div></div>}
            {selected.type === "Score Correction" && <div className="approval-detail-grid"><div><span>Current score</span><strong>11 / 20</strong></div><div><span>Requested score</span><strong>15 / 20</strong></div><div><span>Reason</span><strong>Marked-script recheck</strong></div><div><span>Evidence</span><strong>Attached</strong></div></div>}
          </div>

          <label className="approval-comment">Principal comment<textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add feedback, approval note, or required changes..." /></label>
          <div className="approval-actions"><button className="return-btn" onClick={() => updateStatus("Returned")}>Return for changes</button><button className="approve-btn" onClick={() => updateStatus("Approved")}>Approve</button></div>
          {selected.status === "Approved" && <div className="approval-result good">Approved. The teacher can now see the principal decision.</div>}
          {selected.status === "Returned" && <div className="approval-result warn">Returned to the teacher for revision.</div>}
        </article>
      </section>

      <section className="principal-module-card approval-rules"><h2>Approval rules</h2><div className="principal-capabilities"><div><span>ACADEMIC CONTROL</span><strong>Teacher submits → Principal reviews → Approve or return</strong></div><div><span>REPORT RELEASE</span><strong>Report cards can be reviewed before school release</strong></div><div><span>AUDITABILITY</span><strong>Decision, reviewer and comments remain part of the workflow</strong></div></div></section>
    </main>
  );
}
