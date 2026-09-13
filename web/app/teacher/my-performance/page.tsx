"use client";

import Link from "next/link";
import { useState } from "react";

const metrics = [
  { label: "Attendance completion", value: 98, target: 95, note: "Consistently completed on time" },
  { label: "Lesson-plan compliance", value: 92, target: 90, note: "11 of 12 plans submitted" },
  { label: "Assessment completion", value: 84, target: 90, note: "One CA entry still incomplete" },
  { label: "Syllabus pace", value: 71, target: 75, note: "JSS 2B needs recovery planning" },
];

const classPerformance = [
  { name: "JSS 2A", avg: 74, change: "+3.2%", attendance: 94, pace: 72 },
  { name: "JSS 2B", avg: 68, change: "-1.4%", attendance: 91, pace: 68 },
  { name: "JSS 3A", avg: 79, change: "+6.4%", attendance: 96, pace: 81 },
  { name: "SS 1A", avg: 72, change: "+1.8%", attendance: 93, pace: 64 },
];

export default function MyPerformancePage() {
  const [period, setPeriod] = useState("This term");
  return (
    <main className="module-shell">
      <header className="module-header">
        <div><span className="page-kicker">PRIVATE TEACHER VIEW</span><h1>My Performance</h1><p>Professional-development indicators for your own teaching activity and assigned classes.</p></div>
        <div className="module-header-actions"><select className="performance-period" value={period} onChange={(e) => setPeriod(e.target.value)}><option>This term</option><option>Last 30 days</option><option>Previous term</option></select><Link className="ghost-link" href="/teacher">Dashboard</Link></div>
      </header>

      <section className="performance-overview-grid">
        <article className="module-card performance-hero-card">
          <div className="performance-score-large"><strong>88</strong><span>/100</span></div>
          <div><span className="soft-chip good">Very good</span><h2>Strong consistency with one clear improvement area</h2><p>You are above target for attendance and lesson planning. The main opportunity in this demo view is assessment completion and JSS 2B syllabus pace.</p></div>
        </article>
        <article className="module-card"><div className="module-card-head"><div><h2>Professional focus</h2><p>Suggested next action</p></div></div><div className="insight-box"><strong>Improve JSS 2B curriculum recovery</strong><p>Use the syllabus tracker and a short recovery lesson rather than rushing past an unfinished topic.</p><Link href="/teacher/syllabus">Open syllabus →</Link></div></article>
      </section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>Core teaching indicators</h2><p>These indicators should support coaching and self-improvement, not act as an automatic disciplinary ranking.</p></div><span className="soft-chip neutral">{period}</span></div>
        <div className="performance-metric-list">{metrics.map((m) => <div className="performance-metric-row" key={m.label}><div><strong>{m.label}</strong><span>{m.note}</span></div><div className="metric-value"><b>{m.value}%</b><small>Target {m.target}%</small></div><section><i style={{ width: `${m.value}%` }} /><em style={{ left: `${m.target}%` }} /></section></div>)}</div>
      </section>

      <section className="module-grid-two">
        <article className="module-card">
          <div className="module-card-head"><div><h2>Assigned-class outcomes</h2><p>Context for your teaching—not a claim of sole causation.</p></div></div>
          <div className="class-performance-list">{classPerformance.map((c) => <div key={c.name}><div><strong>{c.name}</strong><span>Class avg {c.avg}% · Attendance {c.attendance}% · Syllabus {c.pace}%</span></div><b className={c.change.startsWith("+") ? "positive-change" : "negative-change"}>{c.change}</b></div>)}</div>
        </article>
        <article className="module-card">
          <div className="module-card-head"><div><h2>My development log</h2><p>Private actions and coaching follow-up.</p></div></div>
          <div className="stack-list"><div><strong>Revision strategy · JSS 2B</strong><span>Planned for Week 7</span></div><div><strong>Assessment marking backlog</strong><span>32 of 41 CA scores entered</span></div><div><strong>Lesson-plan quality</strong><span>Latest plan approved without changes</span></div></div>
          <button className="secondary-btn performance-add-note">+ Add private reflection</button>
        </article>
      </section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>How this score should be used</h2><p>SchoolOS should avoid misleading teacher rankings.</p></div></div>
        <div className="performance-principles"><div><strong>Context matters</strong><span>Student results are affected by attendance, prior learning, class composition and many factors beyond one teacher.</span></div><div><strong>Private by default</strong><span>Your detailed coaching dashboard should not be exposed broadly to colleagues.</span></div><div><strong>Human review</strong><span>AI indicators should support leadership conversations, never automatically punish or reward a teacher.</span></div></div>
      </section>
    </main>
  );
}
