"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Metric = {
  label: string;
  current: number;
  previous: number;
  target: number;
  suffix: string;
  href: string;
};

const metrics: Metric[] = [
  { label: "Academic average", current: 72, previous: 69, target: 75, suffix: "%", href: "/principal/academics" },
  { label: "Student attendance", current: 92, previous: 90, target: 95, suffix: "%", href: "/principal/attendance" },
  { label: "Teacher attendance", current: 94, previous: 92, target: 96, suffix: "%", href: "/principal/teachers" },
  { label: "Lesson-plan compliance", current: 89, previous: 84, target: 95, suffix: "%", href: "/principal/teachers" },
  { label: "Syllabus coverage", current: 75, previous: 70, target: 82, suffix: "%", href: "/principal/academics" },
  { label: "Assessment completion", current: 86, previous: 80, target: 95, suffix: "%", href: "/principal/results" },
  { label: "Guardian response", current: 84, previous: 77, target: 90, suffix: "%", href: "/principal/communication" },
  { label: "Resolved incidents", current: 81, previous: 74, target: 90, suffix: "%", href: "/principal/incidents" },
];

const termTrend = [
  { term: "3rd Term 2024/25", academics: 67, attendance: 89, teacher: 88, operations: 76 },
  { term: "1st Term 2025/26", academics: 69, attendance: 90, teacher: 90, operations: 79 },
  { term: "2nd Term 2025/26", academics: 71, attendance: 91, teacher: 92, operations: 82 },
  { term: "3rd Term 2025/26", academics: 69, attendance: 90, teacher: 91, operations: 81 },
  { term: "1st Term 2026/27", academics: 72, attendance: 92, teacher: 94, operations: 85 },
];

const classHealth = [
  { className: "JSS 2A", score: 89, trend: 5, status: "Strong" },
  { className: "JSS 3A", score: 91, trend: 7, status: "Strong" },
  { className: "SS 2A", score: 83, trend: 2, status: "On track" },
  { className: "JSS 1A", score: 81, trend: 3, status: "On track" },
  { className: "SS 1A", score: 72, trend: -2, status: "Watch" },
  { className: "JSS 2B", score: 64, trend: -7, status: "Needs attention" },
];

const priorities = [
  { title: "JSS 2B intervention", area: "Academics + Attendance", detail: "Average, attendance and syllabus pace are declining together.", href: "/principal/academics", severity: "High" },
  { title: "Science staffing continuity", area: "Teachers + Timetable", detail: "Recent staff absence is creating coverage pressure in Science.", href: "/principal/timetable", severity: "High" },
  { title: "Report release backlog", area: "Results", detail: "One monitored class still has report cards awaiting principal approval.", href: "/principal/results", severity: "Medium" },
  { title: "Guardian engagement", area: "Communication", detail: "Response rate improved but remains below the school target.", href: "/principal/communication", severity: "Medium" },
];

export default function PrincipalPerformancePage() {
  const [period, setPeriod] = useState("1st Term 2026/27");
  const [comparison, setComparison] = useState("Previous term");

  const overall = useMemo(() => Math.round(metrics.reduce((sum, metric) => sum + Math.min(100, (metric.current / metric.target) * 100), 0) / metrics.length), []);
  const improving = metrics.filter((metric) => metric.current > metric.previous).length;
  const belowTarget = metrics.filter((metric) => metric.current < metric.target).length;

  return (
    <main className="principal-module-shell principal-performance-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · SCHOOL PERFORMANCE</span>
          <h1>School Performance</h1>
          <p>Executive academic and operational scorecard across the current school term.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/ai">Principal AI</Link>
          <Link href="/principal/results">Results & Reports</Link>
        </div>
      </header>

      <section className="performance-control-card">
        <div><span>Reporting period</span><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>1st Term 2026/27</option><option>3rd Term 2025/26</option><option>2nd Term 2025/26</option></select></div>
        <div><span>Compare with</span><select value={comparison} onChange={(e) => setComparison(e.target.value)}><option>Previous term</option><option>Same term last year</option><option>School target</option></select></div>
        <div className="performance-period-note"><strong>{period}</strong><small>Prototype term analytics · current campus</small></div>
      </section>

      <section className="performance-hero-grid">
        <article className="performance-score-card">
          <span>Overall school health</span>
          <strong>{overall}</strong>
          <b>Good · improving</b>
          <p>Most monitored indicators are moving positively, but targeted intervention is still required in a small number of classes and operational areas.</p>
        </article>
        <article className="performance-summary-card"><span>Improving indicators</span><strong>{improving} / {metrics.length}</strong><small>Compared with previous term</small></article>
        <article className="performance-summary-card"><span>Below target</span><strong>{belowTarget}</strong><small>Indicators not yet at school target</small></article>
        <article className="performance-summary-card"><span>Priority issues</span><strong>{priorities.length}</strong><small>Requires principal follow-up</small></article>
      </section>

      <section className="principal-module-card performance-metrics-card">
        <header className="performance-section-head"><div><h2>Core performance indicators</h2><p>Current term versus previous term and school target.</p></div></header>
        <div className="performance-metric-grid">
          {metrics.map((metric) => {
            const delta = metric.current - metric.previous;
            const targetPct = Math.min(100, Math.round((metric.current / metric.target) * 100));
            return (
              <Link href={metric.href} className="performance-metric" key={metric.label}>
                <div className="performance-metric-head"><span>{metric.label}</span><b className={delta >= 0 ? "positive" : "negative"}>{delta >= 0 ? "+" : ""}{delta}{metric.suffix}</b></div>
                <strong>{metric.current}{metric.suffix}</strong>
                <small>Previous {metric.previous}{metric.suffix} · Target {metric.target}{metric.suffix}</small>
                <div className="performance-progress"><i style={{ width: `${targetPct}%` }} /></div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="performance-two-column">
        <article className="principal-module-card">
          <div className="performance-section-head"><div><h2>Term trend</h2><p>How the school has moved across recent terms.</p></div></div>
          <div className="term-trend-table">
            <div className="term-trend-head"><span>Term</span><span>Academics</span><span>Attendance</span><span>Teachers</span><span>Operations</span></div>
            {termTrend.map((row) => <div className="term-trend-row" key={row.term}><strong>{row.term}</strong><span>{row.academics}%</span><span>{row.attendance}%</span><span>{row.teacher}%</span><span>{row.operations}%</span></div>)}
          </div>
        </article>

        <article className="principal-module-card">
          <div className="performance-section-head"><div><h2>Class health ranking</h2><p>Combined academic, attendance and delivery indicators.</p></div><Link href="/principal/academics">Open academics</Link></div>
          <div className="class-health-list">
            {classHealth.map((row) => <div key={row.className}><div><strong>{row.className}</strong><small>{row.status}</small></div><span>{row.score}</span><b className={row.trend >= 0 ? "positive" : "negative"}>{row.trend >= 0 ? "+" : ""}{row.trend}</b></div>)}
          </div>
        </article>
      </section>

      <section className="performance-two-column">
        <article className="principal-module-card">
          <div className="performance-section-head"><div><h2>Principal priorities</h2><p>Areas requiring human review or intervention.</p></div></div>
          <div className="performance-priority-list">
            {priorities.map((item) => <div key={item.title}><span className={`performance-severity ${item.severity.toLowerCase()}`}>{item.severity}</span><div><strong>{item.title}</strong><small>{item.area}</small><p>{item.detail}</p></div><Link href={item.href}>Review</Link></div>)}
          </div>
        </article>

        <article className="principal-module-card performance-ai-card">
          <span className="page-kicker">PRINCIPAL AI SUMMARY</span>
          <h2>What the scorecard means</h2>
          <p>The school is improving overall, especially in teacher compliance, attendance and operational follow-through. However, the average hides concentrated weakness in JSS 2B and some Science delivery pressure. The recommended management approach is targeted intervention rather than a school-wide policy change.</p>
          <div className="performance-ai-evidence"><div><span>Strongest improvement</span><strong>Lesson-plan compliance +5 pts</strong></div><div><span>Most urgent weakness</span><strong>JSS 2B combined health</strong></div><div><span>Management posture</span><strong>Targeted support</strong></div></div>
          <Link href="/principal/ai">Ask Principal AI about this scorecard</Link>
        </article>
      </section>

      <section className="performance-report-actions principal-module-card">
        <div><h2>Management reporting</h2><p>Use these views for principal review meetings and later proprietor-level reporting.</p></div>
        <div><Link href="/principal/results">Academic reports</Link><Link href="/principal/attendance">Attendance report</Link><Link href="/principal/teachers">Teacher overview</Link><button onClick={() => window.print()}>Print scorecard</button></div>
      </section>
    </main>
  );
}
