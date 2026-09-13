"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AcademicStatus = "Strong" | "On track" | "Watch" | "Behind";

type ClassRow = {
  name: string;
  level: string;
  students: number;
  average: number;
  attendance: number;
  syllabus: number;
  assessments: number;
  teachers: number;
  trend: number;
  status: AcademicStatus;
  concern: string;
};

const classes: ClassRow[] = [
  { name: "JSS 1A", level: "JSS 1", students: 44, average: 72, attendance: 94, syllabus: 78, assessments: 91, teachers: 8, trend: 3.2, status: "On track", concern: "No major concern" },
  { name: "JSS 2A", level: "JSS 2", students: 42, average: 76, attendance: 95, syllabus: 74, assessments: 89, teachers: 8, trend: 4.7, status: "Strong", concern: "Good improvement across Mathematics and Science" },
  { name: "JSS 2B", level: "JSS 2", students: 39, average: 61, attendance: 86, syllabus: 63, assessments: 72, teachers: 8, trend: -6.8, status: "Behind", concern: "Mathematics pace and attendance need intervention" },
  { name: "JSS 3A", level: "JSS 3", students: 41, average: 79, attendance: 96, syllabus: 84, assessments: 94, teachers: 9, trend: 6.4, status: "Strong", concern: "Maintaining strong performance" },
  { name: "SS 1A", level: "SS 1", students: 37, average: 68, attendance: 91, syllabus: 69, assessments: 78, teachers: 10, trend: -1.9, status: "Watch", concern: "Physics and Further Mathematics below target" },
  { name: "SS 2A", level: "SS 2", students: 35, average: 74, attendance: 93, syllabus: 77, assessments: 86, teachers: 10, trend: 2.1, status: "On track", concern: "Minor marking backlog in two subjects" },
];

const subjects = [
  { name: "Mathematics", average: 67, target: 70, syllabus: 71, trend: -2.4, status: "Watch" },
  { name: "English Language", average: 75, target: 70, syllabus: 79, trend: 3.1, status: "Strong" },
  { name: "Basic Science", average: 73, target: 70, syllabus: 76, trend: 1.8, status: "On track" },
  { name: "Social Studies", average: 78, target: 70, syllabus: 82, trend: 4.0, status: "Strong" },
  { name: "Computer Studies", average: 81, target: 75, syllabus: 85, trend: 5.6, status: "Strong" },
  { name: "Physics", average: 62, target: 70, syllabus: 66, trend: -4.7, status: "Behind" },
];

const riskItems = [
  { title: "JSS 2B Mathematics", detail: "Average 58% · syllabus 61% · 7 students below intervention threshold", severity: "High" },
  { title: "SS 1A Physics", detail: "Average 60% · assessment completion 68% · two topics behind", severity: "High" },
  { title: "JSS 2B attendance", detail: "Class attendance 86%, below school target of 92%", severity: "Medium" },
  { title: "SS 2A marking backlog", detail: "Two subjects have outstanding CA entries", severity: "Medium" },
];

export default function PrincipalAcademicsPage() {
  const [level, setLevel] = useState("All levels");
  const [status, setStatus] = useState("All statuses");
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState(classes[2]);

  const filteredClasses = useMemo(() => classes.filter((row) => {
    const matchesLevel = level === "All levels" || row.level === level;
    const matchesStatus = status === "All statuses" || row.status === status;
    const matchesQuery = `${row.name} ${row.level} ${row.status} ${row.concern}`.toLowerCase().includes(query.toLowerCase());
    return matchesLevel && matchesStatus && matchesQuery;
  }), [level, status, query]);

  const schoolAverage = Math.round(classes.reduce((sum, row) => sum + row.average, 0) / classes.length);
  const syllabusAverage = Math.round(classes.reduce((sum, row) => sum + row.syllabus, 0) / classes.length);
  const assessmentAverage = Math.round(classes.reduce((sum, row) => sum + row.assessments, 0) / classes.length);

  return (
    <main className="principal-module-shell academics-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · ACADEMICS</span>
          <h1>Academic Command Centre</h1>
          <p>Monitor school-wide learning performance, curriculum pace, assessment completion and academic risk.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal/teachers">Teachers</Link>
          <Link href="/principal/results">Results & Reports</Link>
          <Link href="/principal/approvals">Approvals</Link>
          <Link href="/principal">Dashboard</Link>
        </div>
      </header>

      <section className="academic-kpis">
        <article><span>School average</span><strong>{schoolAverage}%</strong><small>Across monitored classes</small></article>
        <article><span>Syllabus coverage</span><strong>{syllabusAverage}%</strong><small>Current term average</small></article>
        <article><span>Assessment completion</span><strong>{assessmentAverage}%</strong><small>CA/tests entered</small></article>
        <article><span>Classes behind</span><strong>{classes.filter((row) => row.status === "Behind").length}</strong><small>Needs intervention</small></article>
        <article><span>Classes on watch</span><strong>{classes.filter((row) => row.status === "Watch").length}</strong><small>Monitor closely</small></article>
      </section>

      <section className="academic-ai-brief">
        <div className="academic-ai-badge">AI</div>
        <div>
          <div className="academic-ai-head"><strong>Principal AI Academic Brief</strong><span>Prototype analysis</span></div>
          <p>JSS 2B is the clearest intervention priority: academic average is down 6.8%, attendance is below target, and syllabus coverage is only 63%. SS 1A also needs attention in Physics and Further Mathematics. Recommended action: review teacher support, run targeted revision, and monitor the next two assessment cycles before escalating.</p>
          <div className="academic-ai-actions"><Link href="/principal/ai">Ask Principal AI</Link><Link href="/principal/teachers">Review teachers</Link></div>
        </div>
      </section>

      <section className="academic-main-grid">
        <article className="academic-class-panel">
          <header>
            <div><h2>Class academic health</h2><p>Performance, attendance, syllabus pace and assessment completion.</p></div>
            <div className="academic-toolbar">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class or issue..." />
              <select value={level} onChange={(e) => setLevel(e.target.value)}><option>All levels</option><option>JSS 1</option><option>JSS 2</option><option>JSS 3</option><option>SS 1</option><option>SS 2</option></select>
              <select value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Watch</option><option>Behind</option></select>
            </div>
          </header>

          <div className="academic-class-table">
            <div className="academic-class-row academic-class-head"><span>Class</span><span>Average</span><span>Attendance</span><span>Syllabus</span><span>Assessments</span><span>Trend</span><span>Status</span></div>
            {filteredClasses.map((row) => (
              <button key={row.name} className={`academic-class-row ${selectedClass.name === row.name ? "selected" : ""}`} onClick={() => setSelectedClass(row)}>
                <div><strong>{row.name}</strong><small>{row.students} students · {row.teachers} teachers</small></div>
                <b>{row.average}%</b>
                <span>{row.attendance}%</span>
                <span>{row.syllabus}%</span>
                <span>{row.assessments}%</span>
                <span className={row.trend >= 0 ? "trend-up" : "trend-down"}>{row.trend >= 0 ? "+" : ""}{row.trend}%</span>
                <em className={`academic-state ${row.status.toLowerCase().replaceAll(" ", "-")}`}>{row.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="academic-class-detail">
          <span className="academic-detail-kicker">SELECTED CLASS</span>
          <h2>{selectedClass.name}</h2>
          <p>{selectedClass.concern}</p>
          <div className="academic-detail-score"><strong>{selectedClass.average}%</strong><span>Current academic average</span></div>
          <Metric label="Attendance" value={selectedClass.attendance} />
          <Metric label="Syllabus coverage" value={selectedClass.syllabus} />
          <Metric label="Assessment completion" value={selectedClass.assessments} />
          <div className="academic-detail-meta"><div><span>Students</span><strong>{selectedClass.students}</strong></div><div><span>Teachers</span><strong>{selectedClass.teachers}</strong></div><div><span>Trend</span><strong className={selectedClass.trend >= 0 ? "trend-up" : "trend-down"}>{selectedClass.trend >= 0 ? "+" : ""}{selectedClass.trend}%</strong></div></div>
          <div className="academic-detail-actions"><Link href="/principal/results">Open results</Link><Link href="/principal/teachers">Review teachers</Link><Link href="/principal/communication">Send instruction</Link></div>
        </aside>
      </section>

      <section className="academic-lower-grid">
        <article className="academic-panel">
          <header><div><h2>Subject performance</h2><p>School-level subject averages against academic targets.</p></div></header>
          <div className="subject-performance-list">
            {subjects.map((subject) => <div key={subject.name} className="subject-performance-row">
              <div><strong>{subject.name}</strong><small>Target {subject.target}% · syllabus {subject.syllabus}%</small></div>
              <div className="subject-bar"><i style={{ width: `${subject.average}%` }} /></div>
              <b>{subject.average}%</b>
              <span className={subject.trend >= 0 ? "trend-up" : "trend-down"}>{subject.trend >= 0 ? "+" : ""}{subject.trend}%</span>
              <em className={`academic-state ${subject.status.toLowerCase().replaceAll(" ", "-")}`}>{subject.status}</em>
            </div>)}
          </div>
        </article>

        <article className="academic-panel">
          <header><div><h2>Academic risk queue</h2><p>Issues requiring leadership attention.</p></div><Link href="/principal/ai">Analyse with AI</Link></header>
          <div className="academic-risk-list">
            {riskItems.map((item) => <div key={item.title}><span className={`academic-risk-level ${item.severity.toLowerCase()}`}>{item.severity}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div><Link href="/principal/teachers">Review</Link></div>)}
          </div>
        </article>
      </section>

      <section className="academic-bottom-grid">
        <article className="academic-panel"><h2>Curriculum control</h2><p>Principal oversight should focus on whether classes are moving through the approved scheme of work at a healthy pace, not forcing every teacher into identical daily progress.</p><div className="academic-control-grid"><div><span>ON / ABOVE PACE</span><strong>4 classes</strong></div><div><span>WATCH</span><strong>1 class</strong></div><div><span>BEHIND</span><strong>1 class</strong></div></div></article>
        <article className="academic-panel"><h2>Assessment readiness</h2><p>Track whether teachers have created assessments, completed score entry and submitted work early enough for review before reports are released.</p><div className="academic-control-grid"><div><span>COMPLETE</span><strong>84%</strong></div><div><span>PENDING REVIEW</span><strong>7 items</strong></div><div><span>SCORE CORRECTIONS</span><strong>2 requests</strong></div></div></article>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="academic-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
