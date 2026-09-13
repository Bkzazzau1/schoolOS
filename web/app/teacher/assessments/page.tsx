"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const assessments = [
  { id: "ca-201", title: "CA 1", className: "JSS 2A", max: 20, entered: 42, total: 42, average: 14.8, status: "Complete" },
  { id: "ca-202", title: "CA 1", className: "JSS 2B", max: 20, entered: 34, total: 39, average: 12.6, status: "In progress" },
  { id: "ca-203", title: "Topic Test", className: "JSS 3A", max: 30, entered: 41, total: 41, average: 22.4, status: "Complete" },
];

const demoScores = [
  { id: "STU-DEMO-001", score: 16 },
  { id: "STU-DEMO-002", score: 12 },
  { id: "STU-DEMO-003", score: 9 },
  { id: "STU-DEMO-004", score: 18 },
  { id: "STU-DEMO-005", score: 14 },
];

export default function AssessmentsPage() {
  const [selectedClass, setSelectedClass] = useState("JSS 2B");
  const [scores, setScores] = useState(demoScores);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const avg = useMemo(() => scores.reduce((sum, s) => sum + s.score, 0) / scores.length, [scores]);

  function updateScore(id: string, score: number) {
    setScores((current) => current.map((s) => s.id === id ? { ...s, score: Math.max(0, Math.min(20, score)) } : s));
    setSaved(false);
    setSubmitted(false);
  }

  return (
    <main className="module-shell">
      <header className="module-header">
        <div><span className="page-kicker">TEACHER · ASSESSMENTS</span><h1>Assessments</h1><p>Create tests, enter CA scores and monitor class performance.</p></div>
        <div className="module-header-actions"><Link className="ghost-link" href="/teacher/classes">My Classes</Link><Link className="ghost-link" href="/teacher">Dashboard</Link></div>
      </header>

      <section className="module-kpis">
        <div><span>CA completion</span><strong>84%</strong><small>Across assigned classes</small></div>
        <div><span>Assessments this term</span><strong>7</strong><small>Tests + continuous assessment</small></div>
        <div><span>Average score</span><strong>68%</strong><small>Across recorded assessments</small></div>
        <div><span>Needs intervention</span><strong>11</strong><small>Demo students below threshold</small></div>
      </section>

      <section className="module-grid-two">
        <article className="module-card">
          <div className="module-card-head"><div><h2>Score entry</h2><p>Enter CA scores for a selected assigned class.</p></div><span className="soft-chip warn">5 demo rows</span></div>
          <div className="form-grid compact-grid">
            <label>Class<select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option><option>SS 1A</option></select></label>
            <label>Assessment<select><option>CA 1 · 20 marks</option><option>CA 2 · 20 marks</option><option>Topic Test · 30 marks</option></select></label>
          </div>
          <div className="score-entry-list">
            {scores.map((row) => <div className="score-entry-row" key={row.id}><span>{row.id}</span><input type="number" min={0} max={20} value={row.score} onChange={(e) => updateScore(row.id, Number(e.target.value))} /><b>/20</b></div>)}
          </div>
          <div className="score-summary"><span>Demo average</span><strong>{avg.toFixed(1)} / 20</strong></div>
          <div className="inline-actions"><button className="secondary-btn" onClick={() => setSaved(true)}>Save progress</button><button className="primary-btn" onClick={() => { setSaved(true); setSubmitted(true); }}>Submit scores</button></div>
          {saved && !submitted && <div className="success-banner">Score-entry progress saved.</div>}
          {submitted && <div className="success-banner">Scores submitted for review/locking according to school policy.</div>}
        </article>

        <article className="module-card">
          <div className="module-card-head"><div><h2>Performance insight</h2><p>Class-level assessment intelligence.</p></div><span className="soft-chip ai">AI ANALYSIS</span></div>
          <div className="performance-big"><strong>63%</strong><span>JSS 2B current average</span></div>
          <div className="metric-bars">
            <Metric label="Concept mastery" value={66} />
            <Metric label="Question completion" value={81} />
            <Metric label="Algebra accuracy" value={59} />
            <Metric label="Improvement vs previous" value={72} />
          </div>
          <div className="insight-box"><strong>Teacher AI observation</strong><p>Errors are concentrated around translating word problems into equations. Consider a short targeted revision activity before the next test.</p><Link href="/teacher/lesson-plans">Create revision lesson</Link></div>
        </article>
      </section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>Assessment register</h2><p>Completion status and class performance.</p></div><button className="primary-btn">+ New assessment</button></div>
        <div className="module-table">
          <div className="table-head assessment-head"><span>Assessment</span><span>Class</span><span>Max</span><span>Scores entered</span><span>Average</span><span>Status</span><span>Action</span></div>
          {assessments.map((a) => <div className="table-row assessment-head" key={a.id}><strong>{a.title}</strong><span>{a.className}</span><span>{a.max}</span><span>{a.entered}/{a.total}</span><span>{a.average}</span><span><b className={`soft-chip ${a.status === "Complete" ? "good" : "warn"}`}>{a.status}</b></span><span><button className="text-action">Open</button></span></div>)}
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="teacher-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
