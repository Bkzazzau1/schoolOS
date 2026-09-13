"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./timetable.css";

const nav = [
  ["Dashboard", "/teacher"], ["My Timetable", "/teacher/timetable"], ["My Classes", "/teacher/classes"],
  ["Attendance", "/teacher/attendance"], ["Lesson Plans", "/teacher/lesson-plans"], ["Syllabus", "/teacher/syllabus"],
  ["Assignments", "/teacher/assignments"], ["Assessments", "/teacher/assessments"], ["Students", "/teacher/students"],
  ["Messages", "/teacher/messages"], ["Teacher AI", "/teacher/ai"], ["My Performance", "/teacher/performance"], ["Profile", "/teacher/profile"]
];

const week = [
  { day: "Monday", date: "14 Sep", lessons: [
    { time: "8:00–8:40", cls: "JSS 2A", subject: "Mathematics", topic: "Linear equations", room: "B12", status: "scheduled" },
    { time: "9:20–10:00", cls: "JSS 2B", subject: "Mathematics", topic: "Linear equations", room: "B14", status: "scheduled" },
    { time: "11:00–11:40", cls: "JSS 3A", subject: "Mathematics", topic: "Simultaneous equations", room: "C04", status: "scheduled" },
    { time: "1:10–1:50", cls: "JSS 2A", subject: "Mathematics", topic: "Revision / classwork", room: "B12", status: "scheduled" },
  ]},
  { day: "Tuesday", date: "15 Sep", lessons: [
    { time: "8:40–9:20", cls: "SS 1A", subject: "Further Mathematics", topic: "Functions", room: "D06", status: "scheduled" },
    { time: "10:20–11:00", cls: "JSS 2A", subject: "Mathematics", topic: "Word problems", room: "B12", status: "scheduled" },
    { time: "12:30–1:10", cls: "JSS 2B", subject: "Mathematics", topic: "Word problems", room: "B14", status: "substitution", note: "Covering for Mr. David" },
  ]},
  { day: "Wednesday", date: "16 Sep", lessons: [
    { time: "8:00–8:40", cls: "JSS 3A", subject: "Mathematics", topic: "Simultaneous equations II", room: "C04", status: "scheduled" },
    { time: "10:20–11:00", cls: "SS 1A", subject: "Further Mathematics", topic: "Domain and range", room: "D06", status: "scheduled" },
  ]},
  { day: "Thursday", date: "17 Sep", lessons: [
    { time: "9:20–10:00", cls: "JSS 2A", subject: "Mathematics", topic: "Algebraic fractions", room: "B12", status: "scheduled" },
    { time: "11:40–12:20", cls: "JSS 2B", subject: "Mathematics", topic: "Algebraic fractions", room: "B14", status: "scheduled" },
    { time: "1:10–1:50", cls: "JSS 3A", subject: "Mathematics", topic: "Graphical solution", room: "C04", status: "scheduled" },
  ]},
  { day: "Friday", date: "18 Sep", lessons: [
    { time: "8:40–9:20", cls: "SS 1A", subject: "Further Mathematics", topic: "Composite functions", room: "D06", status: "scheduled" },
    { time: "10:20–11:00", cls: "JSS 2B", subject: "Mathematics", topic: "Weekly assessment", room: "B14", status: "scheduled" },
  ]},
];

export default function TeacherTimetablePage() {
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const visibleDays = useMemo(() => {
    const days = view === "day" ? week.filter((d) => d.day === selectedDay) : week;
    if (!query.trim()) return days;
    const q = query.toLowerCase();
    return days.map((d) => ({ ...d, lessons: d.lessons.filter((l) => `${l.cls} ${l.subject} ${l.topic} ${l.room}`.toLowerCase().includes(q)) }));
  }, [view, selectedDay, query]);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return <main className="teacher-shell timetable-shell">
    <aside className="teacher-sidebar">
      <div className="teacher-brand"><div className="teacher-logo">S</div><div><strong>SchoolOS</strong><span>Teacher Portal</span></div></div>
      <div className="teacher-school-card"><span className="school-kicker">ACTIVE WORKSPACE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Teacher</small></div>
      <nav className="teacher-nav">
        {nav.map(([label, href]) => <Link key={href} href={href} className={href === "/teacher/timetable" ? "active" : ""}><span className="nav-dot" />{label}{label === "Teacher AI" && <em>AI</em>}</Link>)}
      </nav>
      <div className="teacher-side-foot"><div className="teacher-compliance"><span>Weekly teaching load</span><strong>14 lessons</strong><div><i style={{ width: "86%" }} /></div><small>12 scheduled · 1 substitution · 1 free period block</small></div></div>
    </aside>

    <section className="teacher-main">
      <header className="teacher-topbar">
        <div><span className="page-kicker">TEACHER WORKSPACE</span><h1>My Timetable</h1></div>
        <div className="teacher-top-actions"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class, topic, room..." /><button className="round-action">🔔</button><div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div></div>
      </header>

      <div className="teacher-content timetable-content">
        {notice && <div className="timetable-toast">{notice}</div>}

        <section className="timetable-hero">
          <div><span className="page-kicker">WEEK 6 · FIRST TERM</span><h2>Your teaching schedule</h2><p>View lessons, rooms, topics, substitutions and attendance actions from one place.</p></div>
          <div className="tt-actions"><button onClick={() => flash("Timetable sync requested. This will connect to the live school timetable service.")}>↻ Sync timetable</button><button className="secondary" onClick={() => window.print()}>Print</button></div>
        </section>

        <section className="tt-summary-grid">
          <article><span>Lessons this week</span><strong>14</strong><small>Across 4 assigned classes</small></article>
          <article><span>Today's lessons</span><strong>4</strong><small>Monday teaching load</small></article>
          <article><span>Substitutions</span><strong>1</strong><small>Tuesday · JSS 2B</small></article>
          <article><span>Free periods</span><strong>9</strong><small>Available planning blocks</small></article>
        </section>

        <section className="tt-toolbar">
          <div className="segmented"><button className={view === "week" ? "active" : ""} onClick={() => setView("week")}>Week</button><button className={view === "day" ? "active" : ""} onClick={() => setView("day")}>Day</button></div>
          {view === "day" && <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>{week.map((d) => <option key={d.day}>{d.day}</option>)}</select>}
          <span className="tt-week-label">14–18 September 2026</span>
        </section>

        <section className="tt-days">
          {visibleDays.map((day) => <article className="tt-day" key={day.day}>
            <header><div><strong>{day.day}</strong><span>{day.date}</span></div><b>{day.lessons.length} lesson{day.lessons.length === 1 ? "" : "s"}</b></header>
            <div className="tt-lessons">
              {day.lessons.length === 0 ? <div className="tt-empty">No lessons match your search.</div> : day.lessons.map((lesson, i) => <div className={`tt-lesson ${lesson.status}`} key={`${day.day}${lesson.time}${lesson.cls}`}>
                <div className="tt-time"><strong>{lesson.time}</strong><span>Period {i + 1}</span></div>
                <div className="tt-class"><span>{lesson.subject}</span><strong>{lesson.cls}</strong><small>Room {lesson.room}</small></div>
                <div className="tt-topic"><span>Planned topic</span><strong>{lesson.topic}</strong>{lesson.note && <small>{lesson.note}</small>}</div>
                <div className="tt-status"><span className={`tt-chip ${lesson.status}`}>{lesson.status === "substitution" ? "Substitution" : "Scheduled"}</span></div>
                <div className="tt-row-actions">
                  <Link href="/teacher/attendance">Take attendance</Link>
                  <button onClick={() => flash(`${lesson.cls} opened for lesson reporting.`)}>Open</button>
                  <button className="ghost" onClick={() => flash(`Missed-lesson report started for ${lesson.cls}.`)}>Report issue</button>
                </div>
              </div>)}
            </div>
          </article>)}
        </section>

        <section className="tt-bottom-grid">
          <article className="tt-panel"><header><div><h3>Schedule notices</h3><p>Changes affecting your teaching week</p></div></header><div className="tt-notices"><div><span className="notice-dot warn"/><section><strong>Tuesday substitution</strong><p>You are covering JSS 2B from 12:30–1:10 PM for Mr. David.</p></section></div><div><span className="notice-dot info"/><section><strong>Room change</strong><p>SS 1A on Friday remains in D06. No room changes this week.</p></section></div></div></article>
          <article className="tt-panel"><header><div><h3>Quick actions</h3><p>Common actions from your schedule</p></div></header><div className="tt-quick"><Link href="/teacher/attendance">Take attendance</Link><Link href="/teacher/lesson-plans">Open lesson plans</Link><Link href="/teacher/classes">Open my classes</Link><button onClick={() => flash("Schedule-change request form opened.")}>Request timetable change</button></div></article>
        </section>
      </div>
    </section>
  </main>;
}
