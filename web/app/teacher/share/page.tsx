"use client";

import Link from "next/link";
import { useState } from "react";

const workItems: Record<string, string[]> = {
  "Lesson Plan": ["LP-206 · JSS 2A · Linear Equations", "LP-205 · JSS 2B · Linear Equations", "LP-201 · JSS 3A · Simultaneous Equations"],
  Assignment: ["Linear Equations Practice · JSS 2A", "Word Problems · JSS 2B", "Simultaneous Equations · JSS 3A"],
  Assessment: ["CA 1 · JSS 2A", "CA 1 · JSS 2B", "Topic Test · JSS 3A"],
  Report: ["Student Alpha · Full Report Card", "Student Beta · Performance Summary", "Student Gamma · Full Report Card"],
};

const colleagues = ["Principal · Mr. Ibrahim Danladi", "Vice Principal Academics · Mrs. Grace Musa", "Teacher · Mr. Daniel John", "Teacher · Mrs. Fatima Bello"];

export default function TeacherSharePage() {
  const [workType, setWorkType] = useState("Lesson Plan");
  const [workItem, setWorkItem] = useState(workItems["Lesson Plan"][0]);
  const [recipient, setRecipient] = useState(colleagues[0]);
  const [permission, setPermission] = useState("View and comment");
  const [message, setMessage] = useState("Please review this work and share your feedback.");
  const [sent, setSent] = useState(false);

  function changeType(value: string) {
    setWorkType(value);
    setWorkItem(workItems[value][0]);
    setSent(false);
  }

  function sendWork() {
    setSent(true);
  }

  return (
    <main className="module-shell">
      <header className="module-header">
        <div>
          <span className="page-kicker">TEACHER · SHARE WORK</span>
          <h1>Send or Share Work</h1>
          <p>Send teaching work to the principal for review or share it with an authorized teacher colleague.</p>
        </div>
        <div className="module-header-actions">
          <Link className="ghost-link" href="/teacher/lesson-plans">Lesson Plans</Link>
          <Link className="ghost-link" href="/teacher/reports">Reports</Link>
          <Link className="ghost-link" href="/teacher">Dashboard</Link>
        </div>
      </header>

      <section className="module-grid-two">
        <article className="module-card">
          <div className="module-card-head"><div><h2>Choose work</h2><p>Select what you want to send or share.</p></div><span className="soft-chip good">AUTHORIZED SCHOOL USERS ONLY</span></div>
          <div className="form-grid">
            <label>Work type<select value={workType} onChange={(e) => changeType(e.target.value)}>{Object.keys(workItems).map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Work item<select value={workItem} onChange={(e) => setWorkItem(e.target.value)}>{workItems[workType].map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Recipient<select value={recipient} onChange={(e) => setRecipient(e.target.value)}>{colleagues.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Access<select value={permission} onChange={(e) => setPermission(e.target.value)}><option>View and comment</option><option>View only</option><option>Make a copy</option></select></label>
            <label className="wide">Message<textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} /></label>
          </div>
          <div className="inline-actions">
            <button className="secondary-btn" onClick={() => setMessage("Please review this work and let me know if any changes are required.")}>Use review message</button>
            <button className="primary-btn" onClick={sendWork}>Send work</button>
          </div>
          {sent && <div className="success-banner">Shared successfully with {recipient}. Access: {permission}.</div>}
        </article>

        <article className="module-card">
          <div className="module-card-head"><div><h2>Sharing rules</h2><p>Teacher collaboration stays inside the school workspace.</p></div></div>
          <div className="stack-list">
            <div><strong>Principal review</strong><span>Use for lesson plans, assessments, reports or work that needs approval/feedback.</span></div>
            <div><strong>Teacher colleague</strong><span>Share with authorized colleagues in the same school for collaboration or reuse.</span></div>
            <div><strong>No cross-school sharing</strong><span>Teachers cannot expose school/student work to another tenant from this portal.</span></div>
            <div><strong>Student privacy</strong><span>Report cards and student performance should only be shared with authorized school users.</span></div>
          </div>
        </article>
      </section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>Recent sharing activity</h2><p>Prototype activity log.</p></div></div>
        <div className="module-table">
          <div className="table-head"><span>Work</span><span>Type</span><span>Recipient</span><span>Access</span><span>Status</span><span>Date</span><span>Action</span></div>
          <div className="table-row"><strong>LP-201 · Simultaneous Equations</strong><span>Lesson Plan</span><span>Principal</span><span>View + comment</span><span><b className="soft-chip good">Delivered</b></span><span>12 Sep</span><span><button className="text-action">Open</button></span></div>
          <div className="table-row"><strong>Linear Equations Practice</strong><span>Assignment</span><span>Mr. Daniel John</span><span>Make a copy</span><span><b className="soft-chip neutral">Shared</b></span><span>11 Sep</span><span><button className="text-action">Open</button></span></div>
        </div>
      </section>
    </main>
  );
}
