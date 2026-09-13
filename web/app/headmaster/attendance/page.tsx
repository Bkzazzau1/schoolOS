"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ClassAttendance = {
  className: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  rate: number;
  status: "Strong" | "On track" | "Watch" | "Needs attention";
};

type StaffAttendance = {
  name: string;
  role: string;
  status: "Present" | "Late" | "Absent";
  arrival: string;
  note: string;
};

type FollowUp = {
  id: string;
  pupil: string;
  className: string;
  reason: string;
  count: string;
  priority: "Low" | "Medium" | "High";
  guardianStatus: string;
};

const classes: ClassAttendance[] = [
  { className: "Primary 1", total: 38, present: 37, absent: 1, late: 0, excused: 0, rate: 97, status: "Strong" },
  { className: "Primary 2", total: 40, present: 38, absent: 1, late: 1, excused: 0, rate: 95, status: "On track" },
  { className: "Primary 3", total: 42, present: 37, absent: 3, late: 2, excused: 0, rate: 88, status: "Needs attention" },
  { className: "Primary 4", total: 39, present: 37, absent: 1, late: 1, excused: 0, rate: 95, status: "On track" },
  { className: "Primary 5", total: 36, present: 35, absent: 1, late: 0, excused: 0, rate: 97, status: "Strong" },
  { className: "Primary 6", total: 34, present: 31, absent: 1, late: 1, excused: 1, rate: 91, status: "Watch" },
];

const staff: StaffAttendance[] = [
  { name: "Mrs. Zainab Musa", role: "Primary 1 Class Teacher", status: "Present", arrival: "7:27 AM", note: "On time" },
  { name: "Mr. David Joseph", role: "Primary 4 / Mathematics", status: "Present", arrival: "7:31 AM", note: "On time" },
  { name: "Mrs. Ruth James", role: "Primary 3 / English", status: "Late", arrival: "7:49 AM", note: "18 minutes late" },
  { name: "Mr. Kabiru Lawal", role: "Primary 5 / Science", status: "Present", arrival: "7:22 AM", note: "On time" },
  { name: "Mrs. Esther Daniel", role: "Primary 2 Class Teacher", status: "Present", arrival: "7:18 AM", note: "On time" },
  { name: "Mr. Musa Bello", role: "Mathematics / Science", status: "Absent", arrival: "—", note: "Follow-up required" },
];

const followUps: FollowUp[] = [
  { id: "ATT-101", pupil: "Pupil Gamma", className: "Primary 3", reason: "Repeated absence", count: "4 absences in 10 school days", priority: "High", guardianStatus: "Contact due today" },
  { id: "ATT-102", pupil: "Pupil Epsilon", className: "Primary 5", reason: "Attendance decline", count: "90% current attendance", priority: "Medium", guardianStatus: "Teacher note added" },
  { id: "ATT-103", pupil: "Pupil Beta", className: "Primary 2", reason: "Repeated lateness", count: "3 late arrivals this week", priority: "Medium", guardianStatus: "Guardian message pending" },
  { id: "ATT-104", pupil: "Pupil Zeta", className: "Primary 6", reason: "Pattern check", count: "2 recent late arrivals", priority: "Low", guardianStatus: "Monitor next week" },
];

const weekTrend = [
  { day: "Mon", pupil: 95, staff: 96 },
  { day: "Tue", pupil: 94, staff: 100 },
  { day: "Wed", pupil: 93, staff: 96 },
  { day: "Thu", pupil: 92, staff: 92 },
  { day: "Fri", pupil: 94, staff: 96 },
];

export default function HeadmasterAttendancePage() {
  const [mode, setMode] = useState<"Pupils" | "Staff">("Pupils");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [resolved, setResolved] = useState<string[]>([]);

  const visibleClasses = useMemo(() => classes.filter((item) => {
    const matchesQuery = item.className.toLowerCase().includes(query.toLowerCase());
    const matchesClass = classFilter === "All classes" || item.className === classFilter;
    const matchesStatus = statusFilter === "All statuses" || item.status === statusFilter;
    return matchesQuery && matchesClass && matchesStatus;
  }), [query, classFilter, statusFilter]);

  const visibleStaff = useMemo(() => staff.filter((item) => `${item.name} ${item.role} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [query]);

  const pupilRate = Math.round(classes.reduce((sum, item) => sum + item.rate, 0) / classes.length);
  const presentToday = classes.reduce((sum, item) => sum + item.present, 0);
  const absentToday = classes.reduce((sum, item) => sum + item.absent, 0);
  const lateToday = classes.reduce((sum, item) => sum + item.late, 0);
  const staffPresent = staff.filter((item) => item.status === "Present").length;
  const openFollowUps = followUps.filter((item) => !resolved.includes(item.id)).length;

  function markResolved(id: string) {
    setResolved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="headmaster-module-shell primary-attendance-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Attendance</h1>
          <p>Review Primary pupil and staff attendance, repeated absences, lateness and guardian follow-up.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/pupils">Pupils</Link>
          <Link href="/headmaster/communication">Communication</Link>
        </div>
      </header>

      <section className="primary-attendance-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>Attendance records shown here are limited to the Primary section. Nursery and Secondary remain separate leadership workspaces.</p>
      </section>

      <section className="primary-attendance-kpis">
        <article><span>Pupil attendance</span><strong>{pupilRate}%</strong><small>Primary section today</small></article>
        <article><span>Pupils present</span><strong>{presentToday}</strong><small>Across Primary 1–6</small></article>
        <article><span>Absent today</span><strong>{absentToday}</strong><small>Needs routine review</small></article>
        <article><span>Late today</span><strong>{lateToday}</strong><small>Across Primary classes</small></article>
        <article><span>Staff present</span><strong>{staffPresent}/{staff.length}</strong><small>Primary teaching staff sample</small></article>
        <article><span>Open follow-ups</span><strong>{openFollowUps}</strong><small>Attendance actions pending</small></article>
      </section>

      <section className="primary-attendance-tabs">
        <button className={mode === "Pupils" ? "active" : ""} onClick={() => setMode("Pupils")}>Pupil Attendance</button>
        <button className={mode === "Staff" ? "active" : ""} onClick={() => setMode("Staff")}>Staff Attendance</button>
      </section>

      <section className="primary-attendance-grid">
        <article className="headmaster-module-card primary-attendance-main-card">
          <header>
            <div><h2>{mode === "Pupils" ? "Class attendance overview" : "Primary staff attendance"}</h2><p>{mode === "Pupils" ? "Compare present, absent and late counts by class." : "Review staff arrival and attendance status for the Primary section."}</p></div>
            <div className="primary-attendance-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={mode === "Pupils" ? "Search class..." : "Search staff..."} />
              {mode === "Pupils" && <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All classes</option>{classes.map((item) => <option key={item.className}>{item.className}</option>)}</select>}
              {mode === "Pupils" && <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Watch</option><option>Needs attention</option></select>}
            </div>
          </header>

          {mode === "Pupils" ? (
            <div className="primary-attendance-table">
              <div className="primary-attendance-row heading"><span>Class</span><span>Present</span><span>Absent</span><span>Late</span><span>Excused</span><span>Rate</span><span>Status</span></div>
              {visibleClasses.map((item) => <div className="primary-attendance-row" key={item.className}><div><strong>{item.className}</strong><small>{item.total} pupils</small></div><b>{item.present}</b><b>{item.absent}</b><b>{item.late}</b><b>{item.excused}</b><strong>{item.rate}%</strong><em className={`primary-attendance-status ${item.status.toLowerCase().replaceAll(" ", "-")}`}>{item.status}</em></div>)}
            </div>
          ) : (
            <div className="primary-staff-attendance-list">
              {visibleStaff.map((item) => <div key={item.name}><div><strong>{item.name}</strong><small>{item.role}</small></div><span>{item.arrival}</span><em className={item.status.toLowerCase()}>{item.status}</em><p>{item.note}</p><Link href="/headmaster/teachers">Open teacher</Link></div>)}
            </div>
          )}
        </article>

        <aside className="headmaster-module-card primary-week-trend-card">
          <header><div><h2>Weekly trend</h2><p>Section attendance movement this week.</p></div></header>
          <div className="primary-week-trend-list">
            {weekTrend.map((item) => <div key={item.day}><span>{item.day}</span><div><small>Pupils</small><section><i style={{ width: `${item.pupil}%` }} /></section><b>{item.pupil}%</b></div><div><small>Staff</small><section><i style={{ width: `${item.staff}%` }} /></section><b>{item.staff}%</b></div></div>)}
          </div>
          <div className="primary-attendance-insight"><span>HEADMASTER AI SIGNAL</span><p>Primary 3 remains the class to review first because its attendance is the lowest and it is already under academic follow-up. This is a coordination signal, not a conclusion about cause.</p><Link href="/headmaster/ai">Ask Headmaster AI</Link></div>
        </aside>
      </section>

      <section className="primary-attendance-lower-grid">
        <article className="headmaster-module-card primary-followup-card">
          <header><div><h2>Attendance follow-up queue</h2><p>Repeated absence and lateness requiring teacher or guardian action.</p></div></header>
          <div className="primary-followup-list">
            {followUps.map((item) => {
              const done = resolved.includes(item.id);
              return <div className={done ? "resolved" : ""} key={item.id}><span className={`primary-attendance-priority ${item.priority.toLowerCase()}`}>{item.priority}</span><div><strong>{item.pupil} · {item.className}</strong><small>{item.reason} · {item.count}</small><p>{item.guardianStatus}</p></div><div><Link href="/headmaster/communication">Contact guardian</Link><button onClick={() => markResolved(item.id)}>{done ? "Reopen" : "Mark resolved"}</button></div></div>;
            })}
          </div>
        </article>

        <article className="headmaster-module-card primary-attendance-actions-card">
          <header><div><h2>Attendance actions</h2><p>Common Primary leadership workflows.</p></div></header>
          <div><Link href="/headmaster/pupils">Review pupil record</Link><Link href="/headmaster/teachers">Review class teacher</Link><Link href="/headmaster/communication">Message guardian</Link><Link href="/headmaster/academics">Compare academic context</Link></div>
          <p className="primary-attendance-note">Attendance should be interpreted alongside class context, teacher notes and guardian communication. The prototype does not infer the reason for an absence.</p>
        </article>
      </section>
    </main>
  );
}
