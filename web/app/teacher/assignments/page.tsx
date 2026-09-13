"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const assignments = [
  { id: "asg-101", title: "Linear Equations Practice", className: "JSS 2A", due: "14 Sep", submissions: 38, total: 42, marked: 24, status: "Open" },
  { id: "asg-102", title: "Word Problems", className: "JSS 2B", due: "15 Sep", submissions: 31, total: 39, marked: 18, status: "Open" },
  { id: "asg-103", title: "Simultaneous Equations", className: "JSS 3A", due: "12 Sep", submissions: 40, total: 41, marked: 40, status: "Closed" },
];

export default function AssignmentsPage() {
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All classes");
  const [draftTitle, setDraftTitle] = useState("Algebra Revision Assignment");
  const [draftInstruction, setDraftInstruction] = useState("Answer all questions. Show your working clearly and submit before the deadline.");
  const [published, setPublished] = useState(false);

  const filtered = useMemo(() => assignments.filter((a) => {
    const matchesClass = selectedClass === "All classes" || a.className === selectedClass;
    const matchesQuery = `${a.title} ${a.className} ${a.status}`.toLowerCase().includes(query.toLowerCase());
    return matchesClass && matchesQuery;
  }), [query, selectedClass]);

  return (
    <main className="module-shell">
      <header className="module-header">
        <div><span className="page-kicker">TEACHER · ASSIGNMENTS</span><h1>Assignments</h1><p>Create, publish, collect and mark classwork and homework.</p></div>
        <div className="module-header-actions"><Link className="ghost-link" href="/teacher/classes">My Classes</Link><Link className="ghost-link" href="/teacher">Dashboard</Link></div>
      </header>

      <section className="module-kpis">
        <div><span>Active assignments</span><strong>2</strong><small>Across assigned classes</small></div>
        <div><span>Pending marking</span><strong>27</strong><small>Student submissions</small></div>
        <div><span>Submission rate</span><strong>91%</strong><small>Current term average</small></div>
        <div><span>Late submissions</span><strong>6</strong><small>Needs follow-up</small></div>
      </section>

      <section className="module-grid-two">
        <article className="module-card">
          <div className="module-card-head"><div><h2>Create assignment</h2><p>Prepare a new assignment for one of your assigned classes.</p></div><span className="soft-chip ai">AI READY</span></div>
          <div className="form-grid">
            <label>Class<select><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option><option>SS 1A</option></select></label>
            <label>Type<select><option>Homework</option><option>Classwork</option><option>Project</option><option>Revision</option></select></label>
            <label className="wide">Title<input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} /></label>
            <label className="wide">Instructions<textarea rows={5} value={draftInstruction} onChange={(e) => setDraftInstruction(e.target.value)} /></label>
            <label>Due date<input type="date" defaultValue="2026-09-15" /></label>
            <label>Maximum score<input type="number" defaultValue="20" /></label>
          </div>
          <div className="inline-actions"><button onClick={() => setDraftInstruction("Solve 10 progressively difficult algebra questions. Show all steps. Include one short reflection explaining which question was most challenging and why.")}>Generate with Teacher AI</button><button className="secondary-btn" onClick={() => setPublished(false)}>Save draft</button><button className="primary-btn" onClick={() => setPublished(true)}>Publish assignment</button></div>
          {published && <div className="success-banner">Assignment published to the selected class.</div>}
        </article>

        <article className="module-card">
          <div className="module-card-head"><div><h2>Marking queue</h2><p>Priority work waiting for feedback.</p></div><span className="soft-chip warn">27 pending</span></div>
          <div className="stack-list">
            <div><strong>Linear Equations Practice</strong><span>JSS 2A · 14 unmarked</span><Link href="/teacher/assignments">Start marking</Link></div>
            <div><strong>Word Problems</strong><span>JSS 2B · 13 unmarked</span><Link href="/teacher/assignments">Start marking</Link></div>
            <div><strong>Simultaneous Equations</strong><span>JSS 3A · marking complete</span><span className="complete-label">Complete</span></div>
          </div>
          <div className="insight-box"><strong>Teacher AI marking support</strong><p>AI can suggest rubric-aligned feedback and flag likely misconceptions, but the teacher confirms every score and comment.</p></div>
        </article>
      </section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>Assignment library</h2><p>Track published work and marking progress.</p></div><div className="toolbar"><input placeholder="Search assignments..." value={query} onChange={(e) => setQuery(e.target.value)} /><select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}><option>All classes</option><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option></select></div></div>
        <div className="module-table">
          <div className="table-head"><span>Assignment</span><span>Class</span><span>Due</span><span>Submissions</span><span>Marked</span><span>Status</span><span>Action</span></div>
          {filtered.map((a) => <div className="table-row" key={a.id}><strong>{a.title}</strong><span>{a.className}</span><span>{a.due}</span><span>{a.submissions}/{a.total}</span><span>{a.marked}/{a.submissions}</span><span><b className={`soft-chip ${a.status === "Open" ? "good" : "neutral"}`}>{a.status}</b></span><span><button className="text-action">Open</button></span></div>)}
        </div>
      </section>
    </main>
  );
}
