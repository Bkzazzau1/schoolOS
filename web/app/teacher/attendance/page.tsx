"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./attendance.css";

const nav = [
  ["Dashboard", "/teacher"], ["My Timetable", "/teacher/timetable"], ["My Classes", "/teacher/classes"],
  ["Attendance", "/teacher/attendance"], ["Lesson Plans", "/teacher/lesson-plans"], ["Syllabus", "/teacher/syllabus"],
  ["Assignments", "/teacher/assignments"], ["Assessments", "/teacher/assessments"], ["Students", "/teacher/students"],
  ["Messages", "/teacher/messages"], ["Teacher AI", "/teacher/ai"], ["My Performance", "/teacher/performance"], ["Profile", "/teacher/profile"]
];

type Status = "present" | "absent" | "late" | "excused";
type Student = { id: number; code: string; status: Status; note: string; attendance: number };

const initialStudents: Student[] = [
  { id: 1, code: "Student 001", status: "present", note: "", attendance: 96 },
  { id: 2, code: "Student 002", status: "present", note: "", attendance: 88 },
  { id: 3, code: "Student 003", status: "absent", note: "Follow-up pending", attendance: 79 },
  { id: 4, code: "Student 004", status: "present", note: "", attendance: 98 },
  { id: 5, code: "Student 005", status: "late", note: "Arrived after lesson start", attendance: 92 },
  { id: 6, code: "Student 006", status: "present", note: "", attendance: 95 },
  { id: 7, code: "Student 007", status: "excused", note: "Approved absence", attendance: 90 },
  { id: 8, code: "Student 008", status: "present", note: "", attendance: 94 },
];

export default function TeacherAttendancePage() {
  const [students, setStudents] = useState(initialStudents);
  const [className, setClassName] = useState("JSS 2A · Mathematics · 8:00–8:40 AM");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState("");

  const counts = useMemo(() => ({
    present: students.filter(s => s.status === "present").length,
    absent: students.filter(s => s.status === "absent").length,
    late: students.filter(s => s.status === "late").length,
    excused: students.filter(s => s.status === "excused").length,
  }), [students]);

  const visible = students.filter(s => s.code.toLowerCase().includes(query.toLowerCase()));

  function setStatus(id: number, status: Status) {
    setSubmitted(false);
    setStudents(current => current.map(s => s.id === id ? { ...s, status } : s));
  }

  function markAllPresent() {
    setStudents(current => current.map(s => ({ ...s, status: "present" as Status })));
    setSubmitted(false);
    setNotice("All students marked present. Review before submitting.");
  }

  function submitAttendance() {
    setSubmitted(true);
    setNotice("Attendance submitted successfully for the selected lesson.");
  }

  return <main className="teacher-shell attendance-shell">
    <aside className="teacher-sidebar">
      <div className="teacher-brand"><div className="teacher-logo">S</div><div><strong>SchoolOS</strong><span>Teacher Portal</span></div></div>
      <div className="teacher-school-card"><span className="school-kicker">ACTIVE WORKSPACE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Teacher</small></div>
      <nav className="teacher-nav">{nav.map(([label, href]) => <Link key={href} href={href} className={href === "/teacher/attendance" ? "active" : ""}><span className="nav-dot" />{label}{label === "Teacher AI" && <em>AI</em>}</Link>)}</nav>
      <div className="teacher-side-foot"><div className="teacher-compliance"><span>Attendance completion</span><strong>98%</strong><div><i style={{ width: "98%" }} /></div><small>Scheduled class attendance completion</small></div></div>
    </aside>

    <section className="teacher-main">
      <header className="teacher-topbar"><div><span className="page-kicker">TEACHER WORKSPACE</span><h1>Attendance</h1></div><div className="teacher-top-actions"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search student ID..."/><button className="round-action">🔔</button><div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div></div></header>

      <div className="teacher-content attendance-content">
        {notice && <div className={`attendance-notice ${submitted ? "success" : ""}`}>{notice}</div>}

        <section className="attendance-hero">
          <div><span className="page-kicker">TODAY · MONDAY 14 SEPTEMBER</span><h2>Take class attendance</h2><p>Attendance is tied to the scheduled lesson and only applies to the teacher's assigned class.</p></div>
          <div className="attendance-actions"><button onClick={markAllPresent}>Mark all present</button><Link href="/teacher/timetable">Back to timetable</Link></div>
        </section>

        <section className="attendance-classbar">
          <label>Scheduled lesson<select value={className} onChange={e => setClassName(e.target.value)}><option>JSS 2A · Mathematics · 8:00–8:40 AM</option><option>JSS 2B · Mathematics · 9:20–10:00 AM</option><option>JSS 3A · Mathematics · 11:00–11:40 AM</option></select></label>
          <div><span>Room</span><strong>B12</strong></div><div><span>Topic</span><strong>Linear equations</strong></div><div><span>Students</span><strong>{students.length}</strong></div>
        </section>

        <section className="attendance-stats">
          <article className="present"><span>Present</span><strong>{counts.present}</strong><small>{Math.round(counts.present/students.length*100)}% of class</small></article>
          <article className="absent"><span>Absent</span><strong>{counts.absent}</strong><small>Requires review</small></article>
          <article className="late"><span>Late</span><strong>{counts.late}</strong><small>Arrival recorded</small></article>
          <article className="excused"><span>Excused</span><strong>{counts.excused}</strong><small>Approved reason</small></article>
        </section>

        <section className="attendance-panel">
          <header><div><h3>JSS 2A attendance register</h3><p>Select one status per student. Changes remain editable until submission.</p></div><span>{visible.length} shown</span></header>
          <div className="attendance-table-head"><span>Student</span><span>Attendance rate</span><span>Status</span><span>Note</span></div>
          <div className="attendance-list">
            {visible.map(student => <div className="attendance-row" key={student.id}>
              <div className="student-cell"><div>{String(student.id).padStart(2,"0")}</div><section><strong>{student.code}</strong><span>Demo record · STU-{String(student.id).padStart(4,"0")}</span></section></div>
              <div className="rate-cell"><strong>{student.attendance}%</strong><div><i style={{width:`${student.attendance}%`}}/></div></div>
              <div className="status-buttons">
                {(["present","absent","late","excused"] as Status[]).map(status => <button key={status} className={student.status === status ? `active ${status}` : ""} onClick={() => setStatus(student.id, status)}>{status[0].toUpperCase()}</button>)}
              </div>
              <input className="attendance-note" value={student.note} onChange={e => { setSubmitted(false); setStudents(current => current.map(s => s.id === student.id ? {...s, note:e.target.value}:s)); }} placeholder="Optional note"/>
            </div>)}
          </div>
          <footer><div><strong>{counts.absent + counts.late} entries need review</strong><span>Repeated absence and lateness can be surfaced to authorized school staff.</span></div><button className={submitted ? "submitted" : ""} onClick={submitAttendance}>{submitted ? "✓ Attendance submitted" : "Submit attendance"}</button></footer>
        </section>

        <section className="attendance-bottom">
          <article><h3>Recent attendance history</h3><div className="history-list"><div><strong>JSS 2B · Mathematics</strong><span>Friday · 37/39 present</span><b>94.9%</b></div><div><strong>JSS 3A · Mathematics</strong><span>Thursday · 40/41 present</span><b>97.6%</b></div><div><strong>SS 1A · Further Mathematics</strong><span>Wednesday · 27/28 present</span><b>96.4%</b></div></div></article>
          <article><h3>Attendance insights</h3><div className="alert-card"><span>!</span><div><strong>One attendance pattern needs review</strong><p>A demo record shows repeated absence across recent lessons.</p><Link href="/teacher/students">Open students</Link></div></div><div className="alert-card mild"><span>↗</span><div><strong>Class attendance improving</strong><p>The selected class is above its recent attendance average.</p></div></div></article>
        </section>
      </div>
    </section>
  </main>;
}
