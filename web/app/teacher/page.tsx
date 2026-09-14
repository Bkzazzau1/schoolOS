"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const nav = [
  { label: "Dashboard", href: "/teacher" },
  { label: "My Timetable", href: "/teacher/timetable" },
  { label: "My Classes", href: "/teacher/classes" },
  { label: "Attendance", href: "/teacher/attendance" },
  { label: "Lesson Plans", href: "/teacher/lesson-plans" },
  { label: "Weekly Learning", href: "/teacher/weekly-progress" },
  { label: "Syllabus", href: "/teacher/syllabus" },
  { label: "Assignments", href: "/teacher/assignments" },
  { label: "Assessments", href: "/teacher/assessments" },
  { label: "CBT Practice", href: "/teacher/cbt" },
  { label: "Students", href: "/teacher/students" },
  { label: "Messages", href: "/teacher/messages" },
  { label: "Teacher AI", href: "/teacher/ai" },
  { label: "My Performance", href: "/teacher/performance" },
  { label: "Profile", href: "/teacher/profile" },
];

const classes = [
  { name: "JSS 2A", subject: "Mathematics", students: 42, next: "9:20 AM", room: "B12", progress: 72 },
  { name: "JSS 2B", subject: "Mathematics", students: 39, next: "11:00 AM", room: "B14", progress: 68 },
  { name: "JSS 3A", subject: "Mathematics", students: 41, next: "1:10 PM", room: "C04", progress: 81 },
  { name: "SS 1A", subject: "Further Mathematics", students: 28, next: "Tomorrow", room: "D06", progress: 64 },
];

const today = [
  { time: "8:00 AM", className: "JSS 2A", topic: "Linear equations", status: "Completed" },
  { time: "9:20 AM", className: "JSS 2B", topic: "Linear equations", status: "Next" },
  { time: "11:00 AM", className: "JSS 3A", topic: "Simultaneous equations", status: "Upcoming" },
  { time: "1:10 PM", className: "JSS 2A", topic: "Revision / classwork", status: "Upcoming" },
];

const students = [
  { name: "Maryam Abdullahi", className: "JSS 2A", avg: 86, attendance: 96, flag: "Strong" },
  { name: "Ibrahim Sani", className: "JSS 2A", avg: 61, attendance: 88, flag: "Watch" },
  { name: "Yusuf Bello", className: "JSS 2B", avg: 48, attendance: 79, flag: "At risk" },
  { name: "Fatima Musa", className: "JSS 3A", avg: 91, attendance: 98, flag: "Strong" },
];

const tasks = [
  { title: "Review JSS 2A CBT practice", meta: "38 attempts · fractions needs review", tone: "urgent", href: "/teacher/cbt" },
  { title: "Publish week 6 learning update", meta: "JSS 2A · parent summary draft ready", tone: "warn", href: "/teacher/weekly-progress" },
  { title: "Enter CA scores for JSS 3A", meta: "32 of 41 entered", tone: "normal", href: "/teacher/assessments" },
  { title: "Review 3 AI student alerts", meta: "Academic + attendance risk", tone: "normal", href: "/teacher/ai" },
];

export default function TeacherPortalPage() {
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("BrightGate Academy · Kaduna Campus");
  const filteredStudents = useMemo(() => students.filter((s) => `${s.name} ${s.className} ${s.flag}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return <main className="teacher-shell">
    <aside className="teacher-sidebar">
      <div className="teacher-brand"><div className="teacher-logo">S</div><div><strong>SchoolOS</strong><span>Teacher Portal</span></div></div>
      <div className="teacher-school-card"><span className="school-kicker">ACTIVE WORKSPACE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Teacher</small></div>
      <nav className="teacher-nav">{nav.map((item) => <Link key={item.href} href={item.href} className={item.label === "Dashboard" ? "active" : ""}><span className="nav-dot" />{item.label}{item.label === "Teacher AI" && <em>AI</em>}</Link>)}</nav>
      <div className="teacher-side-foot"><div className="teacher-compliance"><span>Weekly compliance</span><strong>92%</strong><div><i style={{ width: "92%" }} /></div><small>Lesson plans, attendance & scores</small></div></div>
    </aside>

    <section className="teacher-main">
      <header className="teacher-topbar"><div><span className="page-kicker">TEACHER WORKSPACE</span><h1>Dashboard</h1></div><div className="teacher-top-actions"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students, classes, tasks..." /><select value={campus} onChange={(e) => setCampus(e.target.value)}><option>BrightGate Academy · Kaduna Campus</option></select><button className="round-action">🔔</button><div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div></div></header>

      <div className="teacher-content">
        <section className="teacher-welcome"><div><span className="page-kicker">MONDAY · 14 SEPTEMBER</span><h2>Good morning, Mrs. Amina.</h2><p>You have 4 lessons today, a weekly learning update to publish, and CBT practice results ready for review.</p></div><div className="teacher-quick-actions"><Link href="/teacher/attendance">+ Take attendance</Link><Link href="/teacher/cbt" className="secondary">Open CBT practice</Link></div></section>

        <section className="teacher-ai-brief"><div className="ai-orb">AI</div><div><div className="ai-heading"><strong>Teacher AI Daily Brief</strong><span>Updated 7:45 AM</span></div><p>JSS 2B is slightly behind syllabus pace and three students show a combined attendance and assessment risk. JSS 2A CBT practice averaged 78%, with fractions appearing as the most common missed topic.</p><div className="ai-buttons"><Link href="/teacher/ai">View recommendations</Link><Link href="/teacher/cbt">Review CBT evidence</Link></div></div></section>

        <section className="teacher-kpis"><Kpi label="Today's lessons" value="4" hint="1 completed · 3 upcoming" accent="blue" /><Kpi label="My students" value="150" hint="Across 4 assigned classes" accent="green" /><Kpi label="CBT attempts" value="38" hint="JSS 2A practice" accent="amber" /><Kpi label="Syllabus progress" value="71%" hint="+4% from last week" accent="purple" /></section>

        <section className="teacher-grid two-one"><Panel title="Today's timetable" subtitle="Your teaching schedule for today"><div className="lesson-list">{today.map((item) => <div className="lesson-row" key={`${item.time}${item.className}`}><time>{item.time}</time><div><strong>{item.className}</strong><span>{item.topic}</span></div><span className={`status-chip ${item.status.toLowerCase()}`}>{item.status}</span></div>)}</div><Link className="panel-link" href="/teacher/timetable">Open full timetable →</Link></Panel><Panel title="My action list" subtitle="What needs your attention"><div className="teacher-task-list">{tasks.map((task) => <div className={`teacher-task ${task.tone}`} key={task.title}><span className="task-dot" /><div><strong>{task.title}</strong><small>{task.meta}</small></div><Link href={task.href}>Open</Link></div>)}</div></Panel></section>

        <section className="teacher-grid equal"><Panel title="My classes" subtitle="Class size, next lesson and curriculum progress"><div className="class-cards">{classes.map((item) => <article key={item.name} className="class-card"><div className="class-card-head"><div><span>{item.subject}</span><strong>{item.name}</strong></div><b>{item.progress}%</b></div><p>{item.students} students · Room {item.room}</p><div className="progress"><i style={{ width: `${item.progress}%` }} /></div><footer><span>Next: {item.next}</span><Link href="/teacher/classes">Open class</Link></footer></article>)}</div></Panel><Panel title="Students needing attention" subtitle="Generated from attendance and academic trends"><div className="student-attention-list">{filteredStudents.map((student) => <div className="student-attention" key={student.name}><div className="student-avatar">{student.name.split(" ").map((x) => x[0]).join("").slice(0,2)}</div><div><strong>{student.name}</strong><span>{student.className} · Avg {student.avg}% · Attendance {student.attendance}%</span></div><span className={`risk-chip ${student.flag.toLowerCase().replace(" ", "-")}`}>{student.flag}</span></div>)}</div><Link className="panel-link" href="/teacher/students">View my students →</Link></Panel></section>

        <section className="teacher-grid equal"><Panel title="Planning, weekly learning & CBT" subtitle="One connected teaching workflow"><div className="plan-summary"><div><span>Lesson plans submitted</span><strong>11 / 12</strong></div><div><span>Weekly update</span><strong>Draft ready</strong></div><div><span>CBT sets published</span><strong>8</strong></div><div><span>CBT average</span><strong>74%</strong></div></div><div className="teacher-note"><strong>Connected workflow</strong><p>Plan the lesson, record what was covered, publish the parent update, then use CBT practice where helpful to reinforce learning.</p><Link href="/teacher/weekly-progress">Open weekly learning</Link></div></Panel><Panel title="My performance" subtitle="Private professional dashboard"><div className="performance-score"><div className="score-ring"><strong>88</strong><span>/100</span></div><div><strong>Very good</strong><p>Your strongest areas are attendance completion and lesson-plan quality. Syllabus pace needs attention in JSS 2B.</p></div></div><Metric label="Attendance completion" value={98} /><Metric label="Lesson-plan compliance" value={92} /><Metric label="Assessment completion" value={84} /><Metric label="Syllabus progress" value={71} /><Link className="panel-link" href="/teacher/performance">Open my performance →</Link></Panel></section>
      </div>
    </section>
  </main>;
}

function Kpi({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {return <article className={`teacher-kpi ${accent}`}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>}
function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {return <article className="teacher-panel"><header><div><h3>{title}</h3><p>{subtitle}</p></div><button>•••</button></header>{children}</article>}
function Metric({ label, value }: { label: string; value: number }) {return <div className="teacher-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>}
