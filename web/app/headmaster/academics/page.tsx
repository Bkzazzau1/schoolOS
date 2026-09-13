"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ClassHealth = {
  className: string;
  pupils: number;
  literacy: number;
  numeracy: number;
  attendance: number;
  curriculum: number;
  assessment: number;
  trend: number;
  status: "Strong" | "On track" | "Watch" | "Needs attention";
  focus: string;
};

type SubjectHealth = {
  subject: string;
  average: number;
  target: number;
  curriculum: number;
  assessment: number;
  status: "Strong" | "On track" | "Watch";
};

const classes: ClassHealth[] = [
  { className: "Primary 1", pupils: 38, literacy: 78, numeracy: 75, attendance: 96, curriculum: 81, assessment: 92, trend: 4.2, status: "Strong", focus: "Maintain early-reading fluency and number-sense practice." },
  { className: "Primary 2", pupils: 40, literacy: 73, numeracy: 71, attendance: 94, curriculum: 77, assessment: 88, trend: 2.1, status: "On track", focus: "Continue numeracy reinforcement and guided reading." },
  { className: "Primary 3", pupils: 42, literacy: 66, numeracy: 68, attendance: 89, curriculum: 64, assessment: 74, trend: -5.8, status: "Needs attention", focus: "Attendance, literacy and curriculum pace need coordinated teacher follow-up." },
  { className: "Primary 4", pupils: 39, literacy: 74, numeracy: 76, attendance: 93, curriculum: 75, assessment: 86, trend: 3.4, status: "On track", focus: "Good numeracy trend; keep reading-comprehension practice consistent." },
  { className: "Primary 5", pupils: 36, literacy: 80, numeracy: 79, attendance: 95, curriculum: 82, assessment: 91, trend: 5.1, status: "Strong", focus: "Strong academic health across literacy, numeracy and curriculum delivery." },
  { className: "Primary 6", pupils: 34, literacy: 82, numeracy: 77, attendance: 92, curriculum: 79, assessment: 84, trend: 1.8, status: "On track", focus: "Prepare transition support while keeping Mathematics revision steady." },
];

const subjects: SubjectHealth[] = [
  { subject: "English", average: 74, target: 75, curriculum: 76, assessment: 88, status: "On track" },
  { subject: "Mathematics", average: 73, target: 75, curriculum: 72, assessment: 84, status: "Watch" },
  { subject: "Basic Science", average: 76, target: 72, curriculum: 81, assessment: 90, status: "Strong" },
  { subject: "Social Studies", average: 79, target: 72, curriculum: 84, assessment: 91, status: "Strong" },
  { subject: "Computer Studies", average: 75, target: 72, curriculum: 78, assessment: 82, status: "On track" },
  { subject: "Civic Education", average: 81, target: 72, curriculum: 85, assessment: 93, status: "Strong" },
];

const priorities = [
  { title: "Primary 3 recovery plan", area: "Literacy + Attendance", detail: "Lower attendance and slower literacy progress are occurring together.", priority: "High", href: "/headmaster/pupils" },
  { title: "Primary 3 curriculum pace", area: "Curriculum", detail: "Coverage is behind the Primary section expectation for this point in term.", priority: "High", href: "/headmaster/teachers" },
  { title: "Mathematics support", area: "Subject Performance", detail: "Section average is close to target but uneven across classes.", priority: "Medium", href: "/headmaster/assignments" },
  { title: "Primary 6 transition readiness", area: "Progression", detail: "Maintain revision and reporting ahead of transition to Secondary.", priority: "Medium", href: "/headmaster/results" },
];

const termTrend = [
  { term: "3rd Term 2024/25", literacy: 68, numeracy: 67, curriculum: 70 },
  { term: "1st Term 2025/26", literacy: 70, numeracy: 69, curriculum: 72 },
  { term: "2nd Term 2025/26", literacy: 72, numeracy: 71, curriculum: 75 },
  { term: "3rd Term 2025/26", literacy: 71, numeracy: 70, curriculum: 73 },
  { term: "1st Term 2026/27", literacy: 75, numeracy: 74, curriculum: 76 },
];

export default function HeadmasterAcademicsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedClassName, setSelectedClassName] = useState("Primary 3");

  const filteredClasses = useMemo(() => classes.filter((item) => {
    const matchesQuery = `${item.className} ${item.status} ${item.focus}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All statuses" || item.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, statusFilter]);

  const selected = classes.find((item) => item.className === selectedClassName) ?? classes[0];
  const literacyAverage = Math.round(classes.reduce((sum, item) => sum + item.literacy, 0) / classes.length);
  const numeracyAverage = Math.round(classes.reduce((sum, item) => sum + item.numeracy, 0) / classes.length);
  const curriculumAverage = Math.round(classes.reduce((sum, item) => sum + item.curriculum, 0) / classes.length);
  const assessmentAverage = Math.round(classes.reduce((sum, item) => sum + item.assessment, 0) / classes.length);
  const attentionCount = classes.filter((item) => item.status === "Watch" || item.status === "Needs attention").length;

  return (
    <main className="headmaster-module-shell primary-academics-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Academics</h1>
          <p>Track literacy, numeracy, curriculum progress, assessment readiness and class-level academic health across Primary 1–6.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/pupils">Pupils</Link>
          <Link href="/headmaster/teachers">Teachers</Link>
        </div>
      </header>

      <section className="primary-academic-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>Academic indicators shown here belong to the Primary section only. Nursery and Secondary remain separate leadership workspaces.</p>
      </section>

      <section className="primary-academic-kpis">
        <article><span>Literacy average</span><strong>{literacyAverage}%</strong><small>Primary section</small></article>
        <article><span>Numeracy average</span><strong>{numeracyAverage}%</strong><small>Primary section</small></article>
        <article><span>Curriculum coverage</span><strong>{curriculumAverage}%</strong><small>Expected pace</small></article>
        <article><span>Assessment readiness</span><strong>{assessmentAverage}%</strong><small>Submitted / complete</small></article>
        <article><span>Classes needing attention</span><strong>{attentionCount}</strong><small>Support-oriented review</small></article>
      </section>

      <section className="primary-academic-hero-grid">
        <article className="headmaster-module-card primary-academic-ai-card">
          <span className="page-kicker">HEADMASTER AI · ACADEMIC BRIEF</span>
          <h2>Primary 3 is the clearest academic priority</h2>
          <p>Literacy, attendance and curriculum coverage are all below the Primary section pattern. The useful response is coordinated class-teacher support, attendance follow-up and a focused literacy plan rather than a broad school-wide intervention.</p>
          <div className="primary-academic-ai-evidence">
            <div><span>Literacy</span><strong>66%</strong></div>
            <div><span>Attendance</span><strong>89%</strong></div>
            <div><span>Curriculum</span><strong>64%</strong></div>
          </div>
          <Link href="/headmaster/ai">Ask Headmaster AI</Link>
        </article>

        <article className="headmaster-module-card primary-readiness-card">
          <header><div><h2>Assessment readiness</h2><p>Current Primary assessment preparation.</p></div></header>
          <div><span>Score entry readiness</span><strong>86%</strong></div>
          <div><span>Class records complete</span><strong>5 / 6</strong></div>
          <div><span>Teacher submissions pending</span><strong>4</strong></div>
          <div><span>Report-card preparation</span><strong>78%</strong></div>
          <Link href="/headmaster/results">Open assessments & reports</Link>
        </article>
      </section>

      <section className="primary-academic-workspace">
        <article className="headmaster-module-card primary-class-academic-table">
          <header>
            <div><h2>Class academic health</h2><p>Compare learning, attendance, curriculum and assessment indicators by class.</p></div>
            <div className="primary-academic-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class or issue..." />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Watch</option><option>Needs attention</option></select>
            </div>
          </header>

          <div className="primary-academic-table-wrap">
            <div className="primary-academic-table-head"><span>Class</span><span>Literacy</span><span>Numeracy</span><span>Attendance</span><span>Curriculum</span><span>Assessment</span><span>Status</span></div>
            {filteredClasses.map((item) => (
              <button key={item.className} className={`primary-academic-row ${item.className === selected.className ? "selected" : ""}`} onClick={() => setSelectedClassName(item.className)}>
                <div><strong>{item.className}</strong><small>{item.pupils} pupils</small></div>
                <b>{item.literacy}%</b>
                <b>{item.numeracy}%</b>
                <b>{item.attendance}%</b>
                <b>{item.curriculum}%</b>
                <b>{item.assessment}%</b>
                <em className={`primary-academic-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headmaster-module-card primary-class-academic-detail">
          <div className="primary-academic-detail-head"><span>{selected.className.replace("Primary ", "P")}</span><div><small>SELECTED CLASS</small><h2>{selected.className}</h2><p>{selected.pupils} pupils · {selected.status}</p></div></div>
          <div className="primary-academic-detail-grid">
            <Metric label="Literacy" value={selected.literacy} />
            <Metric label="Numeracy" value={selected.numeracy} />
            <Metric label="Attendance" value={selected.attendance} />
            <Metric label="Curriculum" value={selected.curriculum} />
            <Metric label="Assessment" value={selected.assessment} />
          </div>
          <div className="primary-academic-trend"><span>Current trend</span><strong className={selected.trend >= 0 ? "positive" : "negative"}>{selected.trend >= 0 ? "+" : ""}{selected.trend}%</strong></div>
          <div className="primary-academic-focus"><span>HEADMISTRESS FOCUS</span><p>{selected.focus}</p></div>
          <div className="primary-academic-actions"><Link href="/headmaster/pupils">Review pupils</Link><Link href="/headmaster/teachers">Review teacher</Link><Link href="/headmaster/attendance">Attendance</Link></div>
        </aside>
      </section>

      <section className="primary-academic-lower-grid">
        <article className="headmaster-module-card primary-subject-health-card">
          <header><div><h2>Subject performance</h2><p>Primary-wide averages, targets and curriculum pace.</p></div></header>
          <div className="primary-subject-health-list">
            {subjects.map((subject) => {
              const delta = subject.average - subject.target;
              return <div key={subject.subject}><div><strong>{subject.subject}</strong><small>Target {subject.target}%</small></div><span><small>Average</small><b>{subject.average}%</b></span><span><small>Curriculum</small><b>{subject.curriculum}%</b></span><span><small>Assessment</small><b>{subject.assessment}%</b></span><em className={`primary-subject-status ${subject.status.toLowerCase().replaceAll(" ", "-")}`}>{subject.status}</em><b className={delta >= 0 ? "positive" : "negative"}>{delta >= 0 ? "+" : ""}{delta}</b></div>;
            })}
          </div>
        </article>

        <article className="headmaster-module-card primary-academic-priorities">
          <header><div><h2>Academic priorities</h2><p>Current leadership follow-up items.</p></div></header>
          <div>{priorities.map((item) => <div key={item.title}><span className={`primary-academic-priority ${item.priority.toLowerCase()}`}>{item.priority}</span><div><strong>{item.title}</strong><small>{item.area}</small><p>{item.detail}</p></div><Link href={item.href}>Review</Link></div>)}</div>
        </article>
      </section>

      <section className="headmaster-module-card primary-term-trend-card">
        <header><div><h2>Primary academic trend</h2><p>Recent literacy, numeracy and curriculum movement across terms.</p></div></header>
        <div className="primary-term-trend-head"><span>Term</span><span>Literacy</span><span>Numeracy</span><span>Curriculum</span></div>
        {termTrend.map((row) => <div className="primary-term-trend-row" key={row.term}><strong>{row.term}</strong><span>{row.literacy}%</span><span>{row.numeracy}%</span><span>{row.curriculum}%</span></div>)}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="primary-academic-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
