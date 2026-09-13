"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type LessonStatus = "Scheduled" | "Substitution" | "Uncovered" | "Conflict";
type Lesson = {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  period: number;
  time: string;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  status: LessonStatus;
};

type TeacherLoad = {
  teacher: string;
  periods: number;
  target: number;
  classTeacher: string | null;
};

const lessons: Lesson[] = [
  { id: "PRI-TT-101", day: "Monday", period: 1, time: "8:00–8:40", className: "Primary 1", subject: "English", teacher: "Mrs. Zainab Musa", room: "P1", status: "Scheduled" },
  { id: "PRI-TT-102", day: "Monday", period: 1, time: "8:00–8:40", className: "Primary 3", subject: "Mathematics", teacher: "Mr. Musa Bello", room: "P3", status: "Scheduled" },
  { id: "PRI-TT-103", day: "Monday", period: 2, time: "8:40–9:20", className: "Primary 4", subject: "Mathematics", teacher: "Mr. David Joseph", room: "P4", status: "Scheduled" },
  { id: "PRI-TT-104", day: "Monday", period: 2, time: "8:40–9:20", className: "Primary 6", subject: "Civic Education", teacher: "Unassigned", room: "P6", status: "Uncovered" },
  { id: "PRI-TT-105", day: "Monday", period: 3, time: "9:20–10:00", className: "Primary 3", subject: "English", teacher: "Mrs. Ruth James", room: "P3", status: "Scheduled" },
  { id: "PRI-TT-106", day: "Monday", period: 4, time: "10:30–11:10", className: "Primary 5", subject: "Basic Science", teacher: "Mr. Kabiru Lawal", room: "Science Room", status: "Scheduled" },
  { id: "PRI-TT-107", day: "Monday", period: 5, time: "11:10–11:50", className: "Primary 2", subject: "Computer Studies", teacher: "Mrs. Halima Sani", room: "ICT Room", status: "Substitution" },
  { id: "PRI-TT-108", day: "Monday", period: 6, time: "11:50–12:30", className: "Primary 1", subject: "Mathematics", teacher: "Mr. David Joseph", room: "P1", status: "Conflict" },
  { id: "PRI-TT-109", day: "Tuesday", period: 1, time: "8:00–8:40", className: "Primary 2", subject: "English", teacher: "Mrs. Esther Daniel", room: "P2", status: "Scheduled" },
  { id: "PRI-TT-110", day: "Tuesday", period: 2, time: "8:40–9:20", className: "Primary 5", subject: "Mathematics", teacher: "Mr. Musa Bello", room: "P5", status: "Scheduled" },
  { id: "PRI-TT-111", day: "Wednesday", period: 3, time: "9:20–10:00", className: "Primary 6", subject: "Computer Studies", teacher: "Mrs. Halima Sani", room: "ICT Room", status: "Scheduled" },
  { id: "PRI-TT-112", day: "Thursday", period: 4, time: "10:30–11:10", className: "Primary 3", subject: "Creative Arts", teacher: "Mrs. Ruth James", room: "Arts Room", status: "Scheduled" },
  { id: "PRI-TT-113", day: "Friday", period: 5, time: "11:10–11:50", className: "Primary 4", subject: "Computer Studies", teacher: "Mr. David Joseph", room: "ICT Room", status: "Scheduled" },
];

const teacherLoads: TeacherLoad[] = [
  { teacher: "Mrs. Zainab Musa", periods: 22, target: 22, classTeacher: "Primary 1" },
  { teacher: "Mr. David Joseph", periods: 24, target: 22, classTeacher: "Primary 4" },
  { teacher: "Mrs. Ruth James", periods: 21, target: 22, classTeacher: "Primary 3" },
  { teacher: "Mr. Kabiru Lawal", periods: 23, target: 22, classTeacher: "Primary 5" },
  { teacher: "Mrs. Esther Daniel", periods: 18, target: 22, classTeacher: "Primary 2" },
  { teacher: "Mr. Musa Bello", periods: 20, target: 22, classTeacher: null },
  { teacher: "Mrs. Halima Sani", periods: 16, target: 22, classTeacher: null },
];

const roomUse = [
  { room: "ICT Room", use: 78, note: "High use" },
  { room: "Science Room", use: 62, note: "Balanced" },
  { room: "Arts Room", use: 44, note: "Available capacity" },
  { room: "Primary classrooms", use: 91, note: "Core lessons" },
];

const issues = [
  { id: "ISS-01", type: "Uncovered", title: "Primary 6 · Civic Education", detail: "Monday period 2 has no assigned teacher.", priority: "High" },
  { id: "ISS-02", type: "Conflict", title: "Mr. David Joseph overlap", detail: "Monday period 6 conflicts with another Mathematics responsibility.", priority: "High" },
  { id: "ISS-03", type: "Substitution", title: "Primary 2 · Computer Studies", detail: "Mrs. Halima Sani is covering Monday period 5.", priority: "Medium" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export default function HeadmasterTimetablePage() {
  const [day, setDay] = useState<(typeof days)[number]>("Monday");
  const [view, setView] = useState<"Day" | "Week">("Day");
  const [classFilter, setClassFilter] = useState("All classes");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [query, setQuery] = useState("");
  const [resolved, setResolved] = useState<string[]>([]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) => {
    const matchesDay = view === "Week" || lesson.day === day;
    const matchesClass = classFilter === "All classes" || lesson.className === classFilter;
    const matchesStatus = statusFilter === "All statuses" || lesson.status === statusFilter;
    const matchesQuery = `${lesson.className} ${lesson.subject} ${lesson.teacher} ${lesson.room}`.toLowerCase().includes(query.toLowerCase());
    return matchesDay && matchesClass && matchesStatus && matchesQuery;
  }), [day, view, classFilter, statusFilter, query]);

  const scheduledToday = lessons.filter((item) => item.day === day).length;
  const uncovered = lessons.filter((item) => item.status === "Uncovered").length;
  const conflicts = lessons.filter((item) => item.status === "Conflict").length;
  const substitutions = lessons.filter((item) => item.status === "Substitution").length;
  const heavyLoads = teacherLoads.filter((item) => item.periods > item.target).length;

  function toggleResolved(id: string) {
    setResolved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="headmaster-module-shell primary-timetable-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Timetable</h1>
          <p>Oversee Primary class schedules, teacher load, substitutions, uncovered lessons, rooms and timetable conflicts.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/assignments">Teaching Assignments</Link>
          <Link href="/headmaster/teachers">Teachers</Link>
        </div>
      </header>

      <section className="primary-timetable-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>This timetable workspace is restricted to Primary School. Nursery and Secondary schedules remain separate.</p>
      </section>

      <section className="primary-timetable-kpis">
        <article><span>{day} lessons</span><strong>{scheduledToday}</strong><small>Prototype timetable entries</small></article>
        <article><span>Uncovered lessons</span><strong>{uncovered}</strong><small>Teacher assignment needed</small></article>
        <article><span>Conflicts</span><strong>{conflicts}</strong><small>Schedule correction needed</small></article>
        <article><span>Substitutions</span><strong>{substitutions}</strong><small>Temporary cover</small></article>
        <article><span>Heavy teacher loads</span><strong>{heavyLoads}</strong><small>Above target periods</small></article>
      </section>

      <section className="primary-timetable-toolbar">
        <div className="primary-timetable-view-toggle">
          <button className={view === "Day" ? "active" : ""} onClick={() => setView("Day")}>Day view</button>
          <button className={view === "Week" ? "active" : ""} onClick={() => setView("Week")}>Week view</button>
        </div>
        {view === "Day" && <div className="primary-timetable-days">{days.map((item) => <button key={item} className={day === item ? "active" : ""} onClick={() => setDay(item)}>{item.slice(0, 3)}</button>)}</div>}
      </section>

      <section className="primary-timetable-grid">
        <article className="headmaster-module-card primary-timetable-table-card">
          <header>
            <div><h2>{view === "Day" ? `${day} schedule` : "Weekly schedule"}</h2><p>Filter by class, teacher, room or schedule status.</p></div>
            <div className="primary-timetable-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class, subject, teacher or room..." />
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All classes</option><option>Primary 1</option><option>Primary 2</option><option>Primary 3</option><option>Primary 4</option><option>Primary 5</option><option>Primary 6</option></select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Scheduled</option><option>Substitution</option><option>Uncovered</option><option>Conflict</option></select>
            </div>
          </header>

          <div className="primary-timetable-table">
            <div className="primary-timetable-row heading"><span>Day / Time</span><span>Class</span><span>Subject</span><span>Teacher</span><span>Room</span><span>Status</span></div>
            {visibleLessons.map((lesson) => <div className="primary-timetable-row" key={lesson.id}><div><strong>{lesson.day}</strong><small>P{lesson.period} · {lesson.time}</small></div><strong>{lesson.className}</strong><span>{lesson.subject}</span><span>{lesson.teacher}</span><span>{lesson.room}</span><em className={`primary-timetable-status ${lesson.status.toLowerCase()}`}>{lesson.status}</em></div>)}
          </div>
        </article>

        <aside className="headmaster-module-card primary-timetable-ai-card">
          <span className="page-kicker">HEADMASTER AI · TIMETABLE BRIEF</span>
          <h2>Resolve assignment gaps before balancing rooms</h2>
          <p>The most important timetable issue in this prototype is the uncovered Primary 6 Civic Education lesson. After that, resolve the teacher overlap before making room-level optimizations.</p>
          <div><span>First priority</span><strong>Primary 6 · Civic Education</strong></div>
          <div><span>Second priority</span><strong>Teacher conflict</strong></div>
          <div><span>Workload watch</span><strong>2 teachers above target</strong></div>
          <Link href="/headmaster/ai">Ask Headmaster AI</Link>
        </aside>
      </section>

      <section className="primary-timetable-lower-grid">
        <article className="headmaster-module-card primary-timetable-issues">
          <header><div><h2>Schedule exceptions</h2><p>Uncovered lessons, conflicts and substitutions requiring leadership review.</p></div></header>
          <div>{issues.map((issue) => {
            const done = resolved.includes(issue.id);
            return <div className={done ? "resolved" : ""} key={issue.id}><span className={`primary-timetable-priority ${issue.priority.toLowerCase()}`}>{issue.priority}</span><div><strong>{issue.title}</strong><small>{issue.type}</small><p>{issue.detail}</p></div><div><Link href="/headmaster/assignments">Assignments</Link><button onClick={() => toggleResolved(issue.id)}>{done ? "Reopen" : "Mark resolved"}</button></div></div>;
          })}</div>
        </article>

        <article className="headmaster-module-card primary-room-use">
          <header><div><h2>Room utilization</h2><p>Specialist and classroom usage.</p></div></header>
          <div>{roomUse.map((item) => <div key={item.room}><div><strong>{item.room}</strong><small>{item.note}</small></div><section><i style={{ width: `${item.use}%` }} /></section><b>{item.use}%</b></div>)}</div>
        </article>
      </section>

      <section className="headmaster-module-card primary-teacher-load-card">
        <header><div><h2>Teacher timetable load</h2><p>Compare weekly periods with the current Primary planning target.</p></div><Link href="/headmaster/teachers">Open teacher directory</Link></header>
        <div className="primary-teacher-load-grid">
          {teacherLoads.map((item) => {
            const delta = item.periods - item.target;
            const state = delta > 0 ? "Heavy" : delta < -4 ? "Light" : "Balanced";
            return <div key={item.teacher}><div><strong>{item.teacher}</strong><small>{item.classTeacher ? `Class Teacher · ${item.classTeacher}` : "Subject specialist"}</small></div><span><b>{item.periods}</b> / {item.target} periods</span><em className={state.toLowerCase()}>{state}</em></div>;
          })}
        </div>
      </section>

      <section className="headmaster-module-card primary-timetable-governance">
        <span className="page-kicker">PRIMARY SCHEDULING RULE</span>
        <h2>Assignments define who may appear on the timetable</h2>
        <p>The Headmaster/Headmistress should first assign teachers to Primary classes and subjects, then build or adjust the timetable from those responsibilities. A Primary timetable should never pull teachers from Nursery or Secondary unless the proprietor has explicitly created a separate valid responsibility for that person.</p>
        <div><Link href="/headmaster/assignments">Review teaching assignments</Link><Link href="/headmaster/attendance">Compare attendance</Link></div>
      </section>
    </main>
  );
}
