"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type AttendanceState = "Present" | "Absent" | "Late" | "Excused";
type FollowUpState = "None" | "Watch" | "Follow-up" | "Active";

type ChildAttendance = {
  id: string;
  name: string;
  group: string;
  today: AttendanceState;
  arrival: string;
  termRate: number;
  absent10: number;
  late10: number;
  followUp: FollowUpState;
  guardian: string;
  note: string;
};

type EducatorAttendance = {
  name: string;
  group: string;
  today: AttendanceState;
  arrival: string;
  termRate: number;
  note: string;
};

const groupRows = [
  { group: "Nursery 1", enrolled: 28, present: 27, absent: 1, late: 0, excused: 0, rate: 96, followUps: 1 },
  { group: "Nursery 2", enrolled: 30, present: 28, absent: 1, late: 1, excused: 0, rate: 93, followUps: 2 },
  { group: "Reception A", enrolled: 26, present: 23, absent: 2, late: 1, excused: 0, rate: 90, followUps: 3 },
];

const children: ChildAttendance[] = [
  { id: "EY-C001", name: "Child Amina", group: "Nursery 1", today: "Present", arrival: "7:42 AM", termRate: 98, absent10: 0, late10: 0, followUp: "None", guardian: "Guardian Amina", note: "Attendance is stable. No follow-up required." },
  { id: "EY-C002", name: "Child Ibrahim", group: "Nursery 1", today: "Present", arrival: "7:58 AM", termRate: 95, absent10: 1, late10: 1, followUp: "Watch", guardian: "Guardian Ibrahim", note: "One recent absence and one late arrival. Continue routine monitoring." },
  { id: "EY-C003", name: "Child Maryam", group: "Nursery 2", today: "Present", arrival: "7:39 AM", termRate: 97, absent10: 0, late10: 0, followUp: "None", guardian: "Guardian Maryam", note: "Attendance is stable." },
  { id: "EY-C004", name: "Child David", group: "Nursery 2", today: "Late", arrival: "8:21 AM", termRate: 91, absent10: 2, late10: 2, followUp: "Follow-up", guardian: "Guardian David", note: "Attendance pattern needs a supportive guardian conversation. Do not infer the reason from attendance data alone." },
  { id: "EY-C005", name: "Child Fatima", group: "Reception A", today: "Present", arrival: "7:46 AM", termRate: 96, absent10: 1, late10: 0, followUp: "None", guardian: "Guardian Fatima", note: "Current attendance is stable." },
  { id: "EY-C006", name: "Child Yusuf", group: "Reception A", today: "Absent", arrival: "—", termRate: 89, absent10: 3, late10: 1, followUp: "Active", guardian: "Guardian Yusuf", note: "Repeated absence is affecting the amount of classroom evidence available. Confirm context with the guardian before interpreting developmental records." },
  { id: "EY-C007", name: "Child Grace", group: "Reception A", today: "Late", arrival: "8:14 AM", termRate: 93, absent10: 1, late10: 3, followUp: "Follow-up", guardian: "Guardian Grace", note: "Repeated lateness needs a routine-focused guardian follow-up." },
];

const educators: EducatorAttendance[] = [
  { name: "Mrs. Aisha Musa", group: "Nursery 1", today: "Present", arrival: "7:19 AM", termRate: 98, note: "On time" },
  { name: "Mr. Samuel John", group: "Nursery 1", today: "Present", arrival: "7:25 AM", termRate: 96, note: "On time" },
  { name: "Mrs. Halima Yusuf", group: "Nursery 2", today: "Present", arrival: "7:17 AM", termRate: 97, note: "On time" },
  { name: "Miss Grace Peter", group: "Nursery 2", today: "Late", arrival: "7:48 AM", termRate: 94, note: "18 min late" },
  { name: "Mrs. Fatima Bello", group: "Reception A", today: "Present", arrival: "7:22 AM", termRate: 95, note: "On time" },
  { name: "Mr. Daniel Musa", group: "Reception A", today: "Absent", arrival: "—", termRate: 93, note: "Cover required" },
];

const weeklyTrend = [
  { day: "Mon", children: 95, educators: 100 },
  { day: "Tue", children: 94, educators: 92 },
  { day: "Wed", children: 96, educators: 100 },
  { day: "Thu", children: 93, educators: 100 },
  { day: "Fri", children: 95, educators: 92 },
];

const followUpQueue = [
  { id: "FU-01", child: "Child Yusuf", group: "Reception A", signal: "3 absences / 10 days", priority: "High", action: "Confirm guardian context and next attendance checkpoint." },
  { id: "FU-02", child: "Child Grace", group: "Reception A", signal: "3 late arrivals / 10 days", priority: "Medium", action: "Discuss arrival routine with guardian." },
  { id: "FU-03", child: "Child David", group: "Nursery 2", signal: "2 absences + 2 lates", priority: "Medium", action: "Review pattern with guardian and educator." },
];

export default function HeadTeacherAttendancePage() {
  const [tab, setTab] = useState<"Children" | "Educators">("Children");
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All groups");
  const [stateFilter, setStateFilter] = useState("All states");
  const [selectedId, setSelectedId] = useState("EY-C006");
  const [resolved, setResolved] = useState<string[]>([]);

  const visibleChildren = useMemo(() => children.filter((child) => {
    const matchesQuery = `${child.name} ${child.id} ${child.group} ${child.guardian}`.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = groupFilter === "All groups" || child.group === groupFilter;
    const matchesState = stateFilter === "All states" || child.today === stateFilter;
    return matchesQuery && matchesGroup && matchesState;
  }), [query, groupFilter, stateFilter]);

  const visibleEducators = useMemo(() => educators.filter((educator) => {
    const matchesQuery = `${educator.name} ${educator.group}`.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = groupFilter === "All groups" || educator.group === groupFilter;
    const matchesState = stateFilter === "All states" || educator.today === stateFilter;
    return matchesQuery && matchesGroup && matchesState;
  }), [query, groupFilter, stateFilter]);

  const selected = children.find((child) => child.id === selectedId) ?? children[0];
  const totalEnrolled = groupRows.reduce((sum, row) => sum + row.enrolled, 0);
  const presentToday = groupRows.reduce((sum, row) => sum + row.present, 0);
  const absentToday = groupRows.reduce((sum, row) => sum + row.absent, 0);
  const lateToday = groupRows.reduce((sum, row) => sum + row.late, 0);
  const attendanceTodayRate = Math.round((presentToday / totalEnrolled) * 100);
  const openFollowUps = followUpQueue.filter((item) => !resolved.includes(item.id)).length;

  function toggleResolved(id: string) {
    setResolved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="headteacher-main early-attendance-page" style={{ maxWidth: 1380, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Attendance</h1>
          <p>Track child and educator attendance, lateness, repeat patterns and guardian follow-up across Early Years.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/children">Children</Link>
          <Link href="/headteacher/guardians">Guardians</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Attendance is a support signal, not an explanation. The UI may identify patterns, but it must not invent reasons for absence or lateness.</p>
      </section>

      <section className="early-attendance-kpis">
        <article><span>Children present</span><strong>{presentToday} / {totalEnrolled}</strong><small>{attendanceTodayRate}% today</small></article>
        <article><span>Absent today</span><strong>{absentToday}</strong><small>Across Early Years</small></article>
        <article><span>Late today</span><strong>{lateToday}</strong><small>Child arrivals</small></article>
        <article><span>Educators present</span><strong>11 / 12</strong><small>1 cover arrangement</small></article>
        <article><span>Open follow-ups</span><strong>{openFollowUps}</strong><small>Guardian / leadership action</small></article>
        <article><span>Lowest group attendance</span><strong>90%</strong><small>Reception A · term rate</small></article>
      </section>

      <section className="early-attendance-group-grid">
        {groupRows.map((row) => <article className="headteacher-card" key={row.group}>
          <div className="early-attendance-group-head"><div><span>GROUP</span><h3>{row.group}</h3></div><em className={row.rate >= 95 ? "strong" : row.rate >= 92 ? "track" : "watch"}>{row.rate}%</em></div>
          <div className="early-attendance-group-stats"><div><span>Present</span><strong>{row.present}</strong></div><div><span>Absent</span><strong>{row.absent}</strong></div><div><span>Late</span><strong>{row.late}</strong></div><div><span>Follow-ups</span><strong>{row.followUps}</strong></div></div>
        </article>)}
      </section>

      <section className="headteacher-card early-attendance-register-card">
        <header className="headteacher-section-head">
          <div><h3>Attendance register</h3><p>Switch between child and educator attendance while keeping the same Early Years scope.</p></div>
          <div className="early-attendance-tabs"><button className={tab === "Children" ? "active" : ""} onClick={() => setTab("Children")}>Children</button><button className={tab === "Educators" ? "active" : ""} onClick={() => setTab("Educators")}>Educators</button></div>
        </header>

        <div className="early-attendance-filters">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search child, educator, group or guardian..." />
          <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select>
          <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}><option>All states</option><option>Present</option><option>Absent</option><option>Late</option><option>Excused</option></select>
        </div>

        {tab === "Children" ? <div className="early-attendance-table">
          <div className="early-attendance-row heading"><span>Child</span><span>Group</span><span>Today</span><span>Arrival</span><span>Term rate</span><span>10-day pattern</span><span>Follow-up</span></div>
          {visibleChildren.map((child) => <button key={child.id} className={`early-attendance-row ${selected.id === child.id ? "selected" : ""}`} onClick={() => setSelectedId(child.id)}>
            <div><strong>{child.name}</strong><small>{child.id}</small></div><span>{child.group}</span><em className={`early-attendance-state ${child.today.toLowerCase()}`}>{child.today}</em><span>{child.arrival}</span><b>{child.termRate}%</b><span>{child.absent10} absent · {child.late10} late</span><em className={`early-follow-state ${child.followUp.toLowerCase().replaceAll(" ", "-")}`}>{child.followUp}</em>
          </button>)}
        </div> : <div className="early-attendance-table educator">
          <div className="early-attendance-row heading"><span>Educator</span><span>Group</span><span>Today</span><span>Arrival</span><span>Term rate</span><span>Note</span></div>
          {visibleEducators.map((educator) => <div className="early-attendance-row" key={educator.name}><div><strong>{educator.name}</strong><small>Early Years staff</small></div><span>{educator.group}</span><em className={`early-attendance-state ${educator.today.toLowerCase()}`}>{educator.today}</em><span>{educator.arrival}</span><b>{educator.termRate}%</b><span>{educator.note}</span></div>)}
        </div>}
      </section>

      <section className="early-attendance-lower-grid">
        <article className="headteacher-card early-attendance-detail">
          <span className="headteacher-kicker">SELECTED CHILD CONTEXT</span>
          <h3>{selected.name}</h3>
          <p>{selected.group} · {selected.guardian}</p>
          <div className="early-attendance-detail-grid"><div><span>Today</span><strong>{selected.today}</strong></div><div><span>Arrival</span><strong>{selected.arrival}</strong></div><div><span>Term attendance</span><strong>{selected.termRate}%</strong></div><div><span>10-day pattern</span><strong>{selected.absent10} absent / {selected.late10} late</strong></div></div>
          <div className="early-attendance-context-note"><span>CONTEXT NOTE</span><p>{selected.note}</p></div>
          <div className="early-attendance-detail-actions"><Link href="/headteacher/children">Open child</Link><Link href="/headteacher/guardians">Guardian communication</Link><Link href="/headteacher/observations">Review observations</Link></div>
        </article>

        <article className="headteacher-card early-attendance-trend-card">
          <header className="headteacher-section-head"><div><h3>Weekly trend</h3><p>Section attendance across the school week.</p></div></header>
          <div className="early-attendance-trend-list">{weeklyTrend.map((item) => <div key={item.day}><span>{item.day}</span><div><i style={{ width: `${item.children}%` }} /></div><b>{item.children}% children</b><small>{item.educators}% educators</small></div>)}</div>
        </article>
      </section>

      <section className="early-attendance-lower-grid">
        <article className="headteacher-card early-attendance-followups">
          <header className="headteacher-section-head"><div><h3>Follow-up queue</h3><p>Patterns that need human context and guardian communication.</p></div></header>
          <div>{followUpQueue.map((item) => {
            const done = resolved.includes(item.id);
            return <div className={done ? "resolved" : ""} key={item.id}><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span><div><strong>{item.child} · {item.group}</strong><small>{item.signal}</small><p>{item.action}</p></div><div><Link href="/headteacher/guardians">Contact guardian</Link><button onClick={() => toggleResolved(item.id)}>{done ? "Reopen" : "Mark reviewed"}</button></div></div>;
          })}</div>
        </article>

        <article className="headteacher-card early-attendance-ai">
          <span className="headteacher-kicker">HEAD TEACHER AI · ATTENDANCE BRIEF</span>
          <h3>Reception A needs the clearest attendance review</h3>
          <p>Reception A has the lowest group attendance and the most open follow-ups in this prototype. The useful action is to coordinate educator and guardian context before interpreting any downstream developmental or observation patterns.</p>
          <div><span>Main signal</span><strong>90% group attendance</strong></div><div><span>Open follow-ups</span><strong>3</strong></div><div><span>Rule</span><strong>Context before conclusion</strong></div>
          <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
        </article>
      </section>

      <section className="headteacher-card early-attendance-boundary">
        <span className="headteacher-kicker">ATTENDANCE INTERPRETATION RULE</span>
        <h3>Attendance tells us when a child was present, not why they were absent</h3>
        <p>The system may surface repeated absence or lateness for supportive follow-up. It should not infer illness, neglect, family circumstances, motivation or developmental cause from attendance patterns alone.</p>
      </section>
    </main>
  );
}
