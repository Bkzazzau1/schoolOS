"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ClassPerformance = {
  className: string;
  pupils: number;
  literacy: number;
  numeracy: number;
  attendance: number;
  curriculum: number;
  reportReadiness: number;
  trend: number;
  status: "Strong" | "On track" | "Watch" | "Needs attention";
};

type Target = {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: "%" | "classes";
  owner: string;
  href: string;
};

const classes: ClassPerformance[] = [
  { className: "Primary 1", pupils: 38, literacy: 78, numeracy: 75, attendance: 96, curriculum: 81, reportReadiness: 100, trend: 4.2, status: "Strong" },
  { className: "Primary 2", pupils: 40, literacy: 73, numeracy: 71, attendance: 94, curriculum: 77, reportReadiness: 92, trend: 2.1, status: "On track" },
  { className: "Primary 3", pupils: 42, literacy: 66, numeracy: 68, attendance: 89, curriculum: 64, reportReadiness: 74, trend: -5.8, status: "Needs attention" },
  { className: "Primary 4", pupils: 39, literacy: 74, numeracy: 76, attendance: 93, curriculum: 75, reportReadiness: 97, trend: 3.4, status: "On track" },
  { className: "Primary 5", pupils: 36, literacy: 80, numeracy: 79, attendance: 95, curriculum: 82, reportReadiness: 100, trend: 5.1, status: "Strong" },
  { className: "Primary 6", pupils: 34, literacy: 82, numeracy: 77, attendance: 92, curriculum: 79, reportReadiness: 88, trend: 1.8, status: "On track" },
];

const termTrend = [
  { term: "1T 25/26", literacy: 70, numeracy: 69, attendance: 92, curriculum: 72 },
  { term: "2T 25/26", literacy: 72, numeracy: 71, attendance: 93, curriculum: 75 },
  { term: "3T 25/26", literacy: 71, numeracy: 70, attendance: 92, curriculum: 73 },
  { term: "1T 26/27", literacy: 75, numeracy: 74, attendance: 93, curriculum: 76 },
];

const teacherSignals = [
  { label: "Planning completion", value: 90, note: "Primary teaching team average", state: "On track", href: "/headmaster/teachers" },
  { label: "Staff attendance", value: 96, note: "Current section average", state: "Strong", href: "/headmaster/attendance" },
  { label: "Heavy workload", value: 2, note: "Teachers at or above current planning target", state: "Review", href: "/headmaster/timetable" },
  { label: "Class-teacher coverage", value: 5, note: "5 of 6 Primary classes assigned", state: "Gap", href: "/headmaster/assignments" },
];

const initialTargets: Target[] = [
  { id: "T-01", label: "Primary literacy average", current: 75, target: 78, unit: "%", owner: "Headmistress + Teachers", href: "/headmaster/academics" },
  { id: "T-02", label: "Primary numeracy average", current: 74, target: 77, unit: "%", owner: "Headmistress + Teachers", href: "/headmaster/academics" },
  { id: "T-03", label: "Pupil attendance", current: 93, target: 95, unit: "%", owner: "Class Teachers", href: "/headmaster/attendance" },
  { id: "T-04", label: "Curriculum coverage", current: 76, target: 82, unit: "%", owner: "Primary Academic Team", href: "/headmaster/academics" },
  { id: "T-05", label: "Report-ready classes", current: 3, target: 6, unit: "classes", owner: "Headmistress + Class Teachers", href: "/headmaster/results" },
];

const priorities = [
  { title: "Primary 3 recovery", metric: "Attendance + literacy + curriculum", detail: "Coordinate the class-teacher plan, guardian follow-up and two-week academic review.", level: "High", href: "/headmaster/academics" },
  { title: "Primary 6 class-teacher gap", metric: "Leadership coverage", detail: "Complete the remaining class-teacher responsibility before the next timetable revision.", level: "High", href: "/headmaster/assignments" },
  { title: "Teacher load balancing", metric: "2 workload signals", detail: "Review timetable and assignments before adding more periods to heavily loaded staff.", level: "Medium", href: "/headmaster/timetable" },
  { title: "Report completion", metric: "3 of 6 classes at 95%+", detail: "Move incomplete class batches through teacher review before release.", level: "Medium", href: "/headmaster/results" },
];

export default function HeadmasterPerformancePage() {
  const [period, setPeriod] = useState("Current term");
  const [selectedClass, setSelectedClass] = useState("Primary 3");
  const [targets, setTargets] = useState(initialTargets);
  const [editingTarget, setEditingTarget] = useState<string | null>(null);
  const [draftTarget, setDraftTarget] = useState(0);
  const [notice, setNotice] = useState("");

  const selected = classes.find((item) => item.className === selectedClass) ?? classes[0];
  const averages = useMemo(() => ({
    literacy: Math.round(classes.reduce((sum, item) => sum + item.literacy, 0) / classes.length),
    numeracy: Math.round(classes.reduce((sum, item) => sum + item.numeracy, 0) / classes.length),
    attendance: Math.round(classes.reduce((sum, item) => sum + item.attendance, 0) / classes.length),
    curriculum: Math.round(classes.reduce((sum, item) => sum + item.curriculum, 0) / classes.length),
    reports: Math.round(classes.reduce((sum, item) => sum + item.reportReadiness, 0) / classes.length),
  }), []);

  const classesOnTrack = classes.filter((item) => item.status === "Strong" || item.status === "On track").length;

  function beginTarget(target: Target) {
    setEditingTarget(target.id);
    setDraftTarget(target.target);
    setNotice("");
  }

  function saveTarget(id: string) {
    setTargets((current) => current.map((item) => item.id === id ? { ...item, target: Math.max(1, draftTarget) } : item));
    setEditingTarget(null);
    setNotice("Performance target updated locally in the UI prototype.");
  }

  return (
    <main className="headmaster-module-shell primary-performance-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Primary Performance</h1>
          <p>Track section-wide academic, attendance, teaching, reporting and operational progress without exposing Nursery or Secondary data.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/ai">Headmaster AI</Link>
          <Link href="/headmaster/academics">Academics</Link>
        </div>
      </header>

      <section className="primary-performance-scope">
        <div><span>ACTIVE SCORECARD</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <div className="primary-performance-period"><span>View</span><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Current term</option><option>Previous term</option><option>Academic year</option></select></div>
      </section>

      <section className="primary-performance-kpis">
        <article><span>Literacy</span><strong>{averages.literacy}%</strong><small>Primary section average</small><i style={{ width: `${averages.literacy}%` }} /></article>
        <article><span>Numeracy</span><strong>{averages.numeracy}%</strong><small>Primary section average</small><i style={{ width: `${averages.numeracy}%` }} /></article>
        <article><span>Attendance</span><strong>{averages.attendance}%</strong><small>Current class average</small><i style={{ width: `${averages.attendance}%` }} /></article>
        <article><span>Curriculum</span><strong>{averages.curriculum}%</strong><small>Coverage against term pace</small><i style={{ width: `${averages.curriculum}%` }} /></article>
        <article><span>Report readiness</span><strong>{averages.reports}%</strong><small>Across Primary classes</small><i style={{ width: `${averages.reports}%` }} /></article>
        <article><span>Classes on track</span><strong>{classesOnTrack}/6</strong><small>Strong or on-track status</small><i style={{ width: `${Math.round((classesOnTrack / 6) * 100)}%` }} /></article>
      </section>

      <section className="primary-performance-hero-grid">
        <article className="headmaster-module-card primary-performance-ai-brief">
          <span className="page-kicker">HEADMASTER AI · PERFORMANCE BRIEF</span>
          <h2>Primary performance is generally stable, with one concentrated class-level gap</h2>
          <p>The prototype shows positive section-wide literacy and numeracy movement, while Primary 3 remains behind across attendance, literacy and curriculum coverage. Leadership should concentrate support there instead of applying a broad intervention to all six classes.</p>
          <div className="primary-performance-ai-grid">
            <div><span>Strongest class</span><strong>Primary 5</strong><small>Balanced academic + attendance indicators</small></div>
            <div><span>Priority class</span><strong>Primary 3</strong><small>Combined support signal</small></div>
            <div><span>Operational gap</span><strong>Primary 6</strong><small>Class-teacher responsibility incomplete</small></div>
          </div>
          <Link href="/headmaster/ai">Ask Headmaster AI</Link>
        </article>

        <article className="headmaster-module-card primary-performance-pulse">
          <header><div><h2>Leadership pulse</h2><p>Current Primary operating signals.</p></div></header>
          <div><span>Teacher planning</span><strong>90%</strong><em>On track</em></div>
          <div><span>Staff attendance</span><strong>96%</strong><em>Strong</em></div>
          <div><span>Open attendance follow-ups</span><strong>4</strong><em>Review</em></div>
          <div><span>Timetable exceptions</span><strong>3</strong><em>Action</em></div>
          <div><span>Restricted safeguarding cases</span><strong>1</strong><em>Protected</em></div>
        </article>
      </section>

      <section className="primary-performance-workspace">
        <article className="headmaster-module-card primary-performance-class-table">
          <header><div><h2>Class performance matrix</h2><p>Select a class to inspect its combined Primary performance context.</p></div></header>
          <div className="primary-performance-table">
            <div className="primary-performance-row heading"><span>Class</span><span>Literacy</span><span>Numeracy</span><span>Attendance</span><span>Curriculum</span><span>Reports</span><span>Status</span></div>
            {classes.map((item) => <button key={item.className} className={`primary-performance-row ${selectedClass === item.className ? "selected" : ""}`} onClick={() => setSelectedClass(item.className)}><div><strong>{item.className}</strong><small>{item.pupils} pupils · <b className={item.trend >= 0 ? "positive" : "negative"}>{item.trend >= 0 ? "+" : ""}{item.trend}%</b></small></div><b>{item.literacy}%</b><b>{item.numeracy}%</b><b>{item.attendance}%</b><b>{item.curriculum}%</b><b>{item.reportReadiness}%</b><em className={`primary-performance-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</em></button>)}
          </div>
        </article>

        <aside className="headmaster-module-card primary-performance-class-detail">
          <span className="page-kicker">SELECTED CLASS</span>
          <h2>{selected.className}</h2>
          <p>{selected.pupils} pupils · {selected.status}</p>
          <Metric label="Literacy" value={selected.literacy} />
          <Metric label="Numeracy" value={selected.numeracy} />
          <Metric label="Attendance" value={selected.attendance} />
          <Metric label="Curriculum" value={selected.curriculum} />
          <Metric label="Report readiness" value={selected.reportReadiness} />
          <div className="primary-performance-trend"><span>Term movement</span><strong className={selected.trend >= 0 ? "positive" : "negative"}>{selected.trend >= 0 ? "+" : ""}{selected.trend}%</strong></div>
          <div className="primary-performance-detail-links"><Link href="/headmaster/academics">Academics</Link><Link href="/headmaster/attendance">Attendance</Link><Link href="/headmaster/results">Reports</Link></div>
        </aside>
      </section>

      <section className="primary-performance-lower-grid">
        <article className="headmaster-module-card primary-performance-trend-card">
          <header><div><h2>Section trend</h2><p>Recent Primary literacy, numeracy, attendance and curriculum movement.</p></div></header>
          <div className="primary-performance-trend-head"><span>Term</span><span>Literacy</span><span>Numeracy</span><span>Attendance</span><span>Curriculum</span></div>
          {termTrend.map((row) => <div className="primary-performance-trend-row" key={row.term}><strong>{row.term}</strong><span>{row.literacy}%</span><span>{row.numeracy}%</span><span>{row.attendance}%</span><span>{row.curriculum}%</span></div>)}
        </article>

        <article className="headmaster-module-card primary-performance-teacher-card">
          <header><div><h2>Teaching health</h2><p>Support signals, not staff ranking.</p></div><Link href="/headmaster/teachers">Teacher directory</Link></header>
          <div>{teacherSignals.map((item) => <Link href={item.href} key={item.label}><div><strong>{item.label}</strong><small>{item.note}</small></div><span>{item.value}{item.label.includes("Heavy") || item.label.includes("coverage") ? "" : "%"}</span><em className={item.state.toLowerCase().replaceAll(" ", "-")}>{item.state}</em></Link>)}</div>
          <p className="primary-performance-teacher-note">Teacher indicators are used to identify where support, workload review or follow-up may be useful. They are not an employment or disciplinary score.</p>
        </article>
      </section>

      <section className="primary-performance-lower-grid">
        <article className="headmaster-module-card primary-performance-targets">
          <header><div><h2>Primary targets</h2><p>Leadership goals for the current prototype period.</p></div></header>
          <div>{targets.map((target) => {
            const progress = target.unit === "%" ? Math.min(100, Math.round((target.current / target.target) * 100)) : Math.min(100, Math.round((target.current / target.target) * 100));
            return <div className="primary-target-row" key={target.id}><div><strong>{target.label}</strong><small>{target.owner}</small></div><div className="primary-target-progress"><section><i style={{ width: `${progress}%` }} /></section><span>{target.current}{target.unit === "%" ? "%" : ""} / {target.target}{target.unit === "%" ? "%" : " classes"}</span></div>{editingTarget === target.id ? <div className="primary-target-editor"><input type="number" min={1} value={draftTarget} onChange={(e) => setDraftTarget(Number(e.target.value))} /><button onClick={() => saveTarget(target.id)}>Save</button><button onClick={() => setEditingTarget(null)}>Cancel</button></div> : <div className="primary-target-actions"><Link href={target.href}>Open source</Link><button onClick={() => beginTarget(target)}>Edit target</button></div>}</div>;
          })}</div>
        </article>

        <article className="headmaster-module-card primary-performance-priorities">
          <header><div><h2>Leadership priorities</h2><p>Concrete follow-ups from the current scorecard.</p></div></header>
          <div>{priorities.map((item) => <div key={item.title}><span className={`primary-performance-priority ${item.level.toLowerCase()}`}>{item.level}</span><div><strong>{item.title}</strong><small>{item.metric}</small><p>{item.detail}</p></div><Link href={item.href}>Review</Link></div>)}</div>
        </article>
      </section>

      {notice && <div className="primary-performance-notice">{notice}</div>}

      <section className="headmaster-module-card primary-performance-boundary">
        <span className="page-kicker">PERFORMANCE GOVERNANCE</span>
        <h2>Measure the Primary section without collapsing people into one score</h2>
        <p>This scorecard combines operational indicators for leadership review, but it keeps academic outcomes, attendance, teacher support, workload and reporting as separate dimensions. The prototype should not automatically punish pupils or rank, discipline, promote, dismiss or pay staff from these indicators.</p>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="primary-performance-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
