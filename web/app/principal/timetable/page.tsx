"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Lesson = {
  id: string;
  day: string;
  time: string;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  status: "Scheduled" | "Substitution" | "Uncovered" | "Clash";
};

const lessons: Lesson[] = [
  { id: "TT-101", day: "Monday", time: "8:00 - 8:40", className: "JSS 2A", subject: "Mathematics", teacher: "Mrs. Amina Yusuf", room: "B12", status: "Scheduled" },
  { id: "TT-102", day: "Monday", time: "8:00 - 8:40", className: "JSS 2B", subject: "English Language", teacher: "Mrs. Fatima Bello", room: "B14", status: "Scheduled" },
  { id: "TT-103", day: "Monday", time: "8:40 - 9:20", className: "JSS 3A", subject: "Basic Science", teacher: "Mr. Peter James", room: "C04", status: "Substitution" },
  { id: "TT-104", day: "Monday", time: "9:20 - 10:00", className: "SS 1A", subject: "Physics", teacher: "Unassigned", room: "Lab 2", status: "Uncovered" },
  { id: "TT-105", day: "Monday", time: "10:20 - 11:00", className: "JSS 2A", subject: "English Language", teacher: "Mrs. Fatima Bello", room: "B12", status: "Scheduled" },
  { id: "TT-106", day: "Monday", time: "10:20 - 11:00", className: "SS 1A", subject: "English Language", teacher: "Mrs. Fatima Bello", room: "D06", status: "Clash" },
  { id: "TT-107", day: "Tuesday", time: "8:00 - 8:40", className: "JSS 2A", subject: "Basic Science", teacher: "Mr. Peter James", room: "B12", status: "Scheduled" },
  { id: "TT-108", day: "Tuesday", time: "8:40 - 9:20", className: "JSS 2B", subject: "Mathematics", teacher: "Mrs. Amina Yusuf", room: "B14", status: "Scheduled" },
  { id: "TT-109", day: "Wednesday", time: "9:20 - 10:00", className: "JSS 3A", subject: "Mathematics", teacher: "Mr. Daniel John", room: "C04", status: "Scheduled" },
  { id: "TT-110", day: "Thursday", time: "11:00 - 11:40", className: "SS 2A", subject: "Civic Education", teacher: "Mrs. Grace Musa", room: "D08", status: "Scheduled" },
  { id: "TT-111", day: "Friday", time: "8:00 - 8:40", className: "SS 1A", subject: "Further Mathematics", teacher: "Mrs. Amina Yusuf", room: "D06", status: "Scheduled" },
];

const teacherLoads = [
  { name: "Mrs. Amina Yusuf", lessons: 24, target: 22, status: "Heavy" },
  { name: "Mr. Daniel John", lessons: 19, target: 22, status: "Balanced" },
  { name: "Mrs. Fatima Bello", lessons: 26, target: 22, status: "Heavy" },
  { name: "Mr. Peter James", lessons: 21, target: 22, status: "Balanced" },
  { name: "Mrs. Grace Musa", lessons: 17, target: 22, status: "Light" },
];

const roomUse = [
  { room: "B12", lessons: 31, utilization: 86 },
  { room: "B14", lessons: 29, utilization: 81 },
  { room: "C04", lessons: 27, utilization: 75 },
  { room: "D06", lessons: 24, utilization: 67 },
  { room: "Lab 2", lessons: 18, utilization: 50 },
];

export default function PrincipalTimetablePage() {
  const [day, setDay] = useState("Monday");
  const [view, setView] = useState<"Day" | "Week">("Day");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [resolved, setResolved] = useState<string[]>([]);

  const visibleLessons = useMemo(() => lessons.filter((lesson) => {
    const matchesDay = view === "Week" || lesson.day === day;
    const matchesStatus = statusFilter === "All statuses" || lesson.status === statusFilter;
    const matchesQuery = `${lesson.className} ${lesson.subject} ${lesson.teacher} ${lesson.room}`.toLowerCase().includes(query.toLowerCase());
    return matchesDay && matchesStatus && matchesQuery;
  }), [day, view, query, statusFilter]);

  const exceptions = lessons.filter((lesson) => lesson.status !== "Scheduled");
  const unresolved = exceptions.filter((lesson) => !resolved.includes(lesson.id));

  return (
    <main className="principal-module-shell principal-timetable-page">
      <header className="principal-module-header">
        <div><span className="page-kicker">PRINCIPAL · TIMETABLE</span><h1>School Timetable</h1><p>Monitor lessons, teacher load, rooms, substitutions and scheduling exceptions.</p></div>
        <div className="principal-module-actions"><Link href="/principal">Dashboard</Link><Link href="/principal/teachers">Teachers</Link><Link href="/principal/attendance">Attendance</Link></div>
      </header>

      <section className="timetable-kpis">
        <article><span>Lessons this week</span><strong>186</strong><small>Across current campus</small></article>
        <article><span>Today</span><strong>38</strong><small>Scheduled lessons</small></article>
        <article><span>Substitutions</span><strong>{lessons.filter((l) => l.status === "Substitution").length}</strong><small>Requires awareness</small></article>
        <article><span>Uncovered</span><strong>{unresolved.filter((l) => l.status === "Uncovered").length}</strong><small>Needs assignment</small></article>
        <article><span>Clashes</span><strong>{unresolved.filter((l) => l.status === "Clash").length}</strong><small>Needs correction</small></article>
      </section>

      <section className="principal-module-card timetable-main-card">
        <header className="timetable-toolbar-head"><div><h2>Timetable overview</h2><p>Filter the timetable by day, status, teacher, class or room.</p></div><div className="timetable-view-toggle"><button className={view === "Day" ? "active" : ""} onClick={() => setView("Day")}>Day</button><button className={view === "Week" ? "active" : ""} onClick={() => setView("Week")}>Week</button></div></header>
        <div className="timetable-toolbar">
          <select value={day} onChange={(e) => setDay(e.target.value)} disabled={view === "Week"}><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option></select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Scheduled</option><option>Substitution</option><option>Uncovered</option><option>Clash</option></select>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class, subject, teacher or room..." />
        </div>

        <div className="timetable-table">
          <div className="timetable-row timetable-head"><span>Day</span><span>Time</span><span>Class</span><span>Subject</span><span>Teacher</span><span>Room</span><span>Status</span></div>
          {visibleLessons.map((lesson) => <div className="timetable-row" key={lesson.id}><span>{lesson.day}</span><strong>{lesson.time}</strong><span>{lesson.className}</span><span>{lesson.subject}</span><span>{lesson.teacher}</span><span>{lesson.room}</span><b className={`timetable-status ${lesson.status.toLowerCase()}`}>{lesson.status}</b></div>)}
        </div>
      </section>

      <section className="timetable-split-grid">
        <article className="principal-module-card">
          <h2>Schedule exceptions</h2>
          <div className="schedule-exception-list">
            {exceptions.map((item) => {
              const isResolved = resolved.includes(item.id);
              return <div key={item.id} className={isResolved ? "resolved" : ""}><span className={`timetable-status ${item.status.toLowerCase()}`}>{item.status}</span><div><strong>{item.className} · {item.subject}</strong><p>{item.day} · {item.time} · {item.teacher} · {item.room}</p></div><button onClick={() => setResolved((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}>{isResolved ? "Reopen" : "Mark handled"}</button></div>;
            })}
          </div>
        </article>

        <article className="principal-module-card">
          <h2>Principal AI schedule insight</h2>
          <p className="timetable-ai-copy">The current prototype schedule has one uncovered Physics lesson and one teacher clash involving English Language. Mrs. Amina Yusuf and Mrs. Fatima Bello are also above the weekly teaching-load target, so substitutions should avoid adding more lessons to them where possible.</p>
          <div className="timetable-ai-actions"><Link href="/principal/ai">Ask Principal AI</Link><Link href="/principal/teachers">Review teacher load</Link></div>
        </article>
      </section>

      <section className="timetable-bottom-grid">
        <article className="principal-module-card"><h2>Teacher workload</h2><div className="teacher-load-list">{teacherLoads.map((teacher) => <div key={teacher.name}><div><strong>{teacher.name}</strong><span>{teacher.lessons} lessons · target {teacher.target}</span></div><b className={`load-status ${teacher.status.toLowerCase()}`}>{teacher.status}</b></div>)}</div></article>
        <article className="principal-module-card"><h2>Room utilization</h2><div className="room-use-list">{roomUse.map((room) => <div key={room.room}><div><strong>{room.room}</strong><span>{room.lessons} lessons this week</span></div><section><i style={{ width: `${room.utilization}%` }} /></section><b>{room.utilization}%</b></div>)}</div></article>
      </section>
    </main>
  );
}
