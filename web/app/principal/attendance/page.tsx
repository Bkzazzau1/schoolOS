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
  trend: number;
  status: "Strong" | "Watch" | "Needs attention";
};

type FollowUp = {
  id: string;
  person: string;
  type: "Student" | "Staff";
  classOrRole: string;
  issue: string;
  count: string;
  severity: "High" | "Medium" | "Low";
};

const classRows: ClassAttendance[] = [
  { className: "JSS 1A", total: 44, present: 42, absent: 1, late: 1, excused: 0, rate: 95, trend: 1.4, status: "Strong" },
  { className: "JSS 2A", total: 42, present: 40, absent: 1, late: 1, excused: 0, rate: 95, trend: 0.8, status: "Strong" },
  { className: "JSS 2B", total: 39, present: 33, absent: 4, late: 2, excused: 0, rate: 85, trend: -5.7, status: "Needs attention" },
  { className: "JSS 3A", total: 41, present: 39, absent: 1, late: 0, excused: 1, rate: 95, trend: 2.0, status: "Strong" },
  { className: "SS 1A", total: 37, present: 34, absent: 1, late: 2, excused: 0, rate: 92, trend: -1.2, status: "Watch" },
  { className: "SS 2A", total: 35, present: 33, absent: 1, late: 1, excused: 0, rate: 94, trend: 0.4, status: "Strong" },
];

const staffRows = [
  { name: "Mrs. Amina Yusuf", role: "Teacher · Mathematics", status: "Present", checkIn: "7:31 AM", punctuality: "On time" },
  { name: "Mr. Daniel John", role: "Teacher · Mathematics", status: "Present", checkIn: "7:26 AM", punctuality: "On time" },
  { name: "Mrs. Fatima Bello", role: "Teacher · English", status: "Present", checkIn: "7:44 AM", punctuality: "Late" },
  { name: "Mr. Peter James", role: "Teacher · Science", status: "Absent", checkIn: "—", punctuality: "Follow-up" },
  { name: "Mrs. Grace Musa", role: "Teacher · Humanities", status: "Present", checkIn: "7:20 AM", punctuality: "On time" },
];

const followUps: FollowUp[] = [
  { id: "ATT-001", person: "Student Gamma", type: "Student", classOrRole: "JSS 2B", issue: "Repeated absence", count: "4 absences in 10 school days", severity: "High" },
  { id: "ATT-002", person: "Student Beta", type: "Student", classOrRole: "JSS 2A", issue: "Repeated lateness", count: "3 late arrivals this week", severity: "Medium" },
  { id: "ATT-003", person: "Mr. Peter James", type: "Staff", classOrRole: "Science Department", issue: "Staff absence", count: "Absent today · 2nd this month", severity: "High" },
  { id: "ATT-004", person: "Student Epsilon", type: "Student", classOrRole: "SS 1A", issue: "Attendance decline", count: "91% term attendance", severity: "Low" },
];

const weekTrend = [
  { day: "Mon", rate: 94 },
  { day: "Tue", rate: 93 },
  { day: "Wed", rate: 92 },
  { day: "Thu", rate: 91 },
  { day: "Fri", rate: 93 },
];

export default function PrincipalAttendancePage() {
  const [view, setView] = useState<"Students" | "Staff">("Students");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedClass, setSelectedClass] = useState("All classes");
  const [resolved, setResolved] = useState<string[]>([]);

  const filteredClasses = useMemo(() => classRows.filter((row) => {
    const matchClass = selectedClass === "All classes" || row.className === selectedClass;
    const matchStatus = statusFilter === "All statuses" || row.status === statusFilter;
    const matchQuery = row.className.toLowerCase().includes(query.toLowerCase());
    return matchClass && matchStatus && matchQuery;
  }), [query, selectedClass, statusFilter]);

  const filteredStaff = useMemo(() => staffRows.filter((row) => {
    const matchesQuery = `${row.name} ${row.role} ${row.status}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All statuses" || row.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [query, statusFilter]);

  const totalStudents = classRows.reduce((sum, row) => sum + row.total, 0);
  const presentStudents = classRows.reduce((sum, row) => sum + row.present, 0);
  const absentStudents = classRows.reduce((sum, row) => sum + row.absent, 0);
  const lateStudents = classRows.reduce((sum, row) => sum + row.late, 0);
  const overallRate = Math.round((presentStudents / totalStudents) * 100);
  const staffPresent = staffRows.filter((row) => row.status === "Present").length;
  const staffLate = staffRows.filter((row) => row.punctuality === "Late").length;

  function markResolved(id: string) {
    setResolved((current) => current.includes(id) ? current : [...current, id]);
  }

  return (
    <main className="principal-module-shell principal-attendance-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · ATTENDANCE</span>
          <h1>Attendance Oversight</h1>
          <p>Monitor daily student and staff attendance, lateness, repeated absence and follow-up actions.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/students">Students</Link>
          <Link href="/principal/teachers">Teachers</Link>
        </div>
      </header>

      <section className="attendance-overview-kpis">
        <article><span>Student attendance</span><strong>{overallRate}%</strong><small>{presentStudents} of {totalStudents} present</small></article>
        <article><span>Absent students</span><strong>{absentStudents}</strong><small>Across monitored classes</small></article>
        <article><span>Late students</span><strong>{lateStudents}</strong><small>Requires punctuality follow-up</small></article>
        <article><span>Staff present</span><strong>{staffPresent}/{staffRows.length}</strong><small>{staffLate} late today</small></article>
        <article><span>Open follow-ups</span><strong>{followUps.filter((item) => !resolved.includes(item.id)).length}</strong><small>Attendance actions</small></article>
      </section>

      <section className="attendance-command-grid">
        <article className="principal-module-card attendance-main-card">
          <header className="attendance-card-head">
            <div><h2>Daily attendance register</h2><p>Switch between student-class and staff attendance views.</p></div>
            <div className="attendance-view-toggle">
              <button className={view === "Students" ? "active" : ""} onClick={() => { setView("Students"); setStatusFilter("All statuses"); }}>Students</button>
              <button className={view === "Staff" ? "active" : ""} onClick={() => { setView("Staff"); setStatusFilter("All statuses"); }}>Staff</button>
            </div>
          </header>

          <div className="attendance-toolbar">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={view === "Students" ? "Search class..." : "Search staff..."} />
            {view === "Students" && <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}><option>All classes</option>{classRows.map((row) => <option key={row.className}>{row.className}</option>)}</select>}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>All statuses</option>
              {view === "Students" ? <><option>Strong</option><option>Watch</option><option>Needs attention</option></> : <><option>Present</option><option>Absent</option></>}
            </select>
            <input type="date" defaultValue="2026-09-13" />
          </div>

          {view === "Students" ? (
            <div className="attendance-class-table">
              <div className="attendance-table-head"><span>Class</span><span>Present</span><span>Absent</span><span>Late</span><span>Excused</span><span>Rate</span><span>Trend</span><span>Status</span></div>
              {filteredClasses.map((row) => (
                <div className="attendance-table-row" key={row.className}>
                  <strong>{row.className}<small>{row.total} students</small></strong>
                  <span>{row.present}</span><span>{row.absent}</span><span>{row.late}</span><span>{row.excused}</span>
                  <b>{row.rate}%</b>
                  <span className={row.trend < 0 ? "negative" : "positive"}>{row.trend > 0 ? "+" : ""}{row.trend}%</span>
                  <em className={`attendance-health ${row.status.toLowerCase().replaceAll(" ", "-")}`}>{row.status}</em>
                </div>
              ))}
            </div>
          ) : (
            <div className="staff-attendance-list">
              {filteredStaff.map((row) => (
                <div key={row.name}>
                  <div className="staff-attendance-avatar">{row.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}</div>
                  <div><strong>{row.name}</strong><small>{row.role}</small></div>
                  <span><small>Status</small><b className={row.status === "Absent" ? "danger" : ""}>{row.status}</b></span>
                  <span><small>Check-in</small><b>{row.checkIn}</b></span>
                  <em className={row.punctuality === "Late" || row.punctuality === "Follow-up" ? "attention" : ""}>{row.punctuality}</em>
                </div>
              ))}
            </div>
          )}
        </article>

        <aside className="principal-module-card attendance-trend-card">
          <h2>Weekly attendance trend</h2>
          <p>Whole-school student attendance across the current week.</p>
          <div className="attendance-trend-bars">
            {weekTrend.map((item) => <div key={item.day}><span>{item.day}</span><section><i style={{ height: `${item.rate}%` }} /></section><b>{item.rate}%</b></div>)}
          </div>
          <div className="attendance-trend-note"><span>Principal AI observation</span><strong>JSS 2B contributes the largest attendance decline this week. Review repeated-absence cases before the pattern continues into next week.</strong></div>
          <Link className="attendance-ai-link" href="/principal/ai">Ask Principal AI</Link>
        </aside>
      </section>

      <section className="attendance-bottom-grid">
        <article className="principal-module-card">
          <div className="attendance-card-head"><div><h2>Follow-up queue</h2><p>Repeated absence, lateness and staff attendance issues requiring action.</p></div><Link href="/principal/communication">Open communication</Link></div>
          <div className="attendance-followup-list">
            {followUps.map((item) => {
              const done = resolved.includes(item.id);
              return <div key={item.id} className={done ? "resolved" : ""}>
                <span className={`attendance-severity ${item.severity.toLowerCase()}`}>{item.severity}</span>
                <div><strong>{item.person}</strong><small>{item.type} · {item.classOrRole}</small><p>{item.issue} · {item.count}</p></div>
                <div className="attendance-followup-actions">
                  {item.type === "Student" ? <Link href="/principal/students">Open record</Link> : <Link href="/principal/teachers">Open staff</Link>}
                  <Link href="/principal/communication">Contact</Link>
                  <button onClick={() => markResolved(item.id)}>{done ? "Resolved" : "Mark resolved"}</button>
                </div>
              </div>;
            })}
          </div>
        </article>

        <article className="principal-module-card attendance-summary-card">
          <h2>Attendance rules & signals</h2>
          <div className="attendance-rule-list">
            <div><span>REPEATED ABSENCE</span><strong>Flag students or staff with recurring absence patterns.</strong></div>
            <div><span>LATENESS</span><strong>Surface repeated late arrival rather than treating each day in isolation.</strong></div>
            <div><span>CLASS COMPARISON</span><strong>Compare attendance rates to identify class-level operational problems.</strong></div>
            <div><span>FOLLOW-UP</span><strong>Principal can move directly from an attendance alert into student, teacher or communication workflows.</strong></div>
          </div>
        </article>
      </section>
    </main>
  );
}
