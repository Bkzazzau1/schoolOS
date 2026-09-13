"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GroupSignal = "Strong" | "On track" | "Review";
type GroupPerformance = {
  group: string;
  children: number;
  attendance: number;
  observations: number;
  routines: number;
  planning: number;
  guardianEngagement: number;
  reportReadiness: number;
  evidenceQuality: number;
  signal: GroupSignal;
};

type TargetKey = "attendance" | "observations" | "routines" | "planning" | "guardians";

const groups: GroupPerformance[] = [
  { group: "Nursery 1", children: 28, attendance: 96, observations: 96, routines: 97, planning: 96, guardianEngagement: 94, reportReadiness: 96, evidenceQuality: 93, signal: "Strong" },
  { group: "Nursery 2", children: 30, attendance: 93, observations: 90, routines: 93, planning: 88, guardianEngagement: 90, reportReadiness: 88, evidenceQuality: 86, signal: "On track" },
  { group: "Reception A", children: 26, attendance: 90, observations: 81, routines: 88, planning: 82, guardianEngagement: 86, reportReadiness: 78, evidenceQuality: 80, signal: "Review" },
];

const termTrend = [
  { week: "W1", attendance: 94, observations: 78, routines: 90, planning: 82 },
  { week: "W2", attendance: 95, observations: 81, routines: 92, planning: 85 },
  { week: "W3", attendance: 94, observations: 84, routines: 91, planning: 87 },
  { week: "W4", attendance: 93, observations: 86, routines: 92, planning: 89 },
  { week: "W5", attendance: 93, observations: 87, routines: 93, planning: 89 },
  { week: "W6", attendance: 93, observations: 89, routines: 93, planning: 89 },
];

const developmentalEvidence = [
  { area: "Language & Communication", coverage: 86, alignment: 92, note: "Good activity coverage; Reception A evidence still needs completion." },
  { area: "Early Numeracy", coverage: 85, alignment: 91, note: "Provision is broad; evidence quality is more important than increasing activity count." },
  { area: "Physical Development", coverage: 89, alignment: 94, note: "Stable across all groups with consistent outdoor and fine-motor opportunities." },
  { area: "Personal & Social", coverage: 85, alignment: 90, note: "Continue reviewing routines and transitions alongside observations." },
  { area: "Creative Exploration", coverage: 83, alignment: 89, note: "Nursery 2 and Reception A need stronger observation capture during creative work." },
];

const priorities = [
  { title: "Complete Reception A observation cycle", detail: "Observation coverage remains the clearest evidence-quality gap before interpreting developmental patterns.", href: "/headteacher/observations" },
  { title: "Stabilize Reception A transitions", detail: "Arrival and departure routine friction should be reviewed alongside attendance and educator workload.", href: "/headteacher/routines" },
  { title: "Protect documentation time", detail: "Planning is stronger than observation completion in Nursery 2 and Reception A; rebalance workflow before adding more activities.", href: "/headteacher/educators" },
  { title: "Close guardian follow-ups", detail: "Attendance and settling-in conversations already exist and should be completed before drawing wider conclusions.", href: "/headteacher/guardians" },
];

export default function HeadTeacherPerformancePage() {
  const [selectedGroup, setSelectedGroup] = useState("Reception A");
  const [targets, setTargets] = useState<Record<TargetKey, number>>({ attendance: 95, observations: 90, routines: 94, planning: 92, guardians: 92 });
  const [saved, setSaved] = useState(false);

  const selected = useMemo(() => groups.find((item) => item.group === selectedGroup) ?? groups[0], [selectedGroup]);
  const section = useMemo(() => ({
    attendance: Math.round(groups.reduce((s, g) => s + g.attendance, 0) / groups.length),
    observations: Math.round(groups.reduce((s, g) => s + g.observations, 0) / groups.length),
    routines: Math.round(groups.reduce((s, g) => s + g.routines, 0) / groups.length),
    planning: Math.round(groups.reduce((s, g) => s + g.planning, 0) / groups.length),
    guardian: Math.round(groups.reduce((s, g) => s + g.guardianEngagement, 0) / groups.length),
    reports: Math.round(groups.reduce((s, g) => s + g.reportReadiness, 0) / groups.length),
  }), []);

  const targetRows: { key: TargetKey; label: string; current: number }[] = [
    { key: "attendance", label: "Attendance", current: section.attendance },
    { key: "observations", label: "Observation coverage", current: section.observations },
    { key: "routines", label: "Routine stability", current: section.routines },
    { key: "planning", label: "Planning readiness", current: section.planning },
    { key: "guardians", label: "Guardian engagement", current: section.guardian },
  ];

  return (
    <main className="headteacher-main early-performance-page" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Early Years Performance</h1>
          <p>See section health across attendance, observations, routines, planning, family engagement and evidence quality without ranking children.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/development">Development</Link>
          <Link href="/headteacher/ai">Head Teacher AI</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>This scorecard combines operational signals for leadership review. It does not produce a child ranking, educator ranking or one opaque Early Years score.</p>
      </section>

      <section className="early-performance-kpis">
        <article><span>Attendance</span><strong>{section.attendance}%</strong><small>Across three groups</small></article>
        <article><span>Observation coverage</span><strong>{section.observations}%</strong><small>Current-cycle group average</small></article>
        <article><span>Routine stability</span><strong>{section.routines}%</strong><small>Daily operating rhythm</small></article>
        <article><span>Planning readiness</span><strong>{section.planning}%</strong><small>Weekly activities</small></article>
        <article><span>Guardian engagement</span><strong>{section.guardian}%</strong><small>Read / reply / follow-up</small></article>
        <article><span>Report readiness</span><strong>{section.reports}%</strong><small>Developmental reports</small></article>
      </section>

      <section className="early-performance-grid">
        <article className="headteacher-card early-performance-matrix">
          <header className="headteacher-section-head"><div><h3>Group performance matrix</h3><p>Compare operational and evidence signals while keeping each measure separate.</p></div></header>
          <div className="early-performance-table-wrap">
            <div className="early-performance-row heading"><span>Group</span><span>Attendance</span><span>Observations</span><span>Routines</span><span>Planning</span><span>Guardians</span><span>Reports</span><span>Signal</span></div>
            {groups.map((group) => (
              <button key={group.group} className={`early-performance-row ${selected.group === group.group ? "selected" : ""}`} onClick={() => setSelectedGroup(group.group)}>
                <div><strong>{group.group}</strong><small>{group.children} children</small></div>
                <b>{group.attendance}%</b><b>{group.observations}%</b><b>{group.routines}%</b><b>{group.planning}%</b><b>{group.guardianEngagement}%</b><b>{group.reportReadiness}%</b>
                <em className={`early-performance-signal ${group.signal.toLowerCase().replaceAll(" ", "-")}`}>{group.signal}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headteacher-card early-performance-focus">
          <span className="headteacher-kicker">SELECTED GROUP</span>
          <h2>{selected.group}</h2>
          <p>{selected.signal === "Review" ? "This group has several connected review signals. Improve context and workflow before interpreting them as a learning or staff problem." : "Current indicators are broadly stable. Continue normal review and support cycles."}</p>
          <div className="early-performance-focus-grid">
            <div><span>Attendance</span><strong>{selected.attendance}%</strong></div>
            <div><span>Observations</span><strong>{selected.observations}%</strong></div>
            <div><span>Evidence quality</span><strong>{selected.evidenceQuality}%</strong></div>
            <div><span>Routine stability</span><strong>{selected.routines}%</strong></div>
          </div>
          <div className="early-performance-focus-links">
            <Link href="/headteacher/attendance">Attendance</Link>
            <Link href="/headteacher/observations">Observations</Link>
            <Link href="/headteacher/routines">Routines</Link>
            <Link href="/headteacher/guardians">Guardians</Link>
          </div>
        </aside>
      </section>

      <section className="early-performance-lower-grid">
        <article className="headteacher-card early-trend-card">
          <header className="headteacher-section-head"><div><h3>Term trend</h3><p>Section averages by week; use direction, not a single snapshot.</p></div></header>
          <div className="early-trend-legend"><span>Attendance</span><span>Observations</span><span>Routines</span><span>Planning</span></div>
          <div className="early-trend-chart">
            {termTrend.map((week) => <div key={week.week} className="early-trend-column"><div className="early-trend-bars"><i style={{height:`${week.attendance}%`}} title={`Attendance ${week.attendance}%`} /><i style={{height:`${week.observations}%`}} title={`Observations ${week.observations}%`} /><i style={{height:`${week.routines}%`}} title={`Routines ${week.routines}%`} /><i style={{height:`${week.planning}%`}} title={`Planning ${week.planning}%`} /></div><strong>{week.week}</strong></div>)}
          </div>
        </article>

        <article className="headteacher-card early-evidence-card">
          <header className="headteacher-section-head"><div><h3>Developmental evidence health</h3><p>Coverage and activity alignment by developmental area.</p></div></header>
          <div className="early-evidence-list">
            {developmentalEvidence.map((item) => <div key={item.area}><div><strong>{item.area}</strong><small>{item.note}</small></div><span>Coverage <b>{item.coverage}%</b></span><span>Alignment <b>{item.alignment}%</b></span></div>)}
          </div>
        </article>
      </section>

      <section className="early-performance-lower-grid second">
        <article className="headteacher-card early-priority-card">
          <header className="headteacher-section-head"><div><h3>Leadership priorities</h3><p>Concrete follow-up generated from the current prototype signals.</p></div></header>
          <div className="early-priority-list">
            {priorities.map((item, index) => <Link href={item.href} key={item.title}><b>{index + 1}</b><div><strong>{item.title}</strong><p>{item.detail}</p></div><span>Open →</span></Link>)}
          </div>
        </article>

        <article className="headteacher-card early-target-card">
          <header className="headteacher-section-head"><div><h3>Prototype leadership targets</h3><p>Editable local targets for discussion; not persisted.</p></div></header>
          <div className="early-target-list">
            {targetRows.map((item) => <label key={item.key}><div><strong>{item.label}</strong><small>Current {item.current}%</small></div><input type="number" min="0" max="100" value={targets[item.key]} onChange={(e) => { setSaved(false); setTargets((current) => ({ ...current, [item.key]: Math.max(0, Math.min(100, Number(e.target.value))) })); }} /><span>%</span></label>)}
          </div>
          <button onClick={() => setSaved(true)}>{saved ? "Targets saved locally" : "Save prototype targets"}</button>
          <small>UI prototype only. Targets do not determine child placement, staff appraisal or automatic intervention.</small>
        </article>
      </section>

      <section className="headteacher-card early-performance-ai">
        <div><span className="headteacher-kicker">HEAD TEACHER AI · PERFORMANCE BRIEF</span><h3>Improve Reception A evidence and routines before changing learning provision</h3><p>Reception A currently has the lowest attendance, observation coverage, routine stability and report readiness. The first leadership response should be to improve observation completion, stabilize transitions and close open guardian follow-ups. These signals do not establish a developmental problem or educator failure.</p></div>
        <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
      </section>

      <section className="headteacher-card early-performance-boundary">
        <span className="headteacher-kicker">PERFORMANCE RULE</span>
        <h3>Keep dimensions visible; do not collapse people into one score</h3>
        <p>Early Years performance should support leadership questions about provision, routines, evidence quality and family engagement. The system must not rank children, automate staff employment decisions, diagnose development or use one composite score as a substitute for professional judgement.</p>
      </section>
    </main>
  );
}
