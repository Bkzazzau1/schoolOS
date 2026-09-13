"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./classes.css";

const nav = [
  ["Dashboard", "/teacher"], ["My Timetable", "/teacher/timetable"], ["My Classes", "/teacher/classes"],
  ["Attendance", "/teacher/attendance"], ["Lesson Plans", "/teacher/lesson-plans"], ["Syllabus", "/teacher/syllabus"],
  ["Assignments", "/teacher/assignments"], ["Assessments", "/teacher/assessments"], ["Students", "/teacher/students"],
  ["Messages", "/teacher/messages"], ["Teacher AI", "/teacher/ai"], ["My Performance", "/teacher/performance"], ["Profile", "/teacher/profile"]
];

const classes = [
  { id:"jss2a", name:"JSS 2A", subject:"Mathematics", students:42, room:"B12", progress:72, attendance:94, avg:74, next:"Mon · 8:00 AM", topic:"Linear equations", pending:8 },
  { id:"jss2b", name:"JSS 2B", subject:"Mathematics", students:39, room:"B14", progress:68, attendance:91, avg:69, next:"Mon · 9:20 AM", topic:"Linear equations", pending:12 },
  { id:"jss3a", name:"JSS 3A", subject:"Mathematics", students:41, room:"C04", progress:81, attendance:96, avg:78, next:"Mon · 11:00 AM", topic:"Simultaneous equations", pending:5 },
  { id:"ss1a", name:"SS 1A", subject:"Further Mathematics", students:28, room:"D06", progress:64, attendance:93, avg:71, next:"Tue · 8:40 AM", topic:"Functions", pending:4 },
];

export default function TeacherClassesPage(){
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(classes[0].id);
  const current=classes.find(c=>c.id===selected)!;
  const filtered=useMemo(()=>classes.filter(c=>`${c.name} ${c.subject} ${c.topic}`.toLowerCase().includes(query.toLowerCase())),[query]);

  return <main className="teacher-shell classes-shell">
    <aside className="teacher-sidebar">
      <div className="teacher-brand"><div className="teacher-logo">S</div><div><strong>SchoolOS</strong><span>Teacher Portal</span></div></div>
      <div className="teacher-school-card"><span className="school-kicker">ACTIVE WORKSPACE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Teacher</small></div>
      <nav className="teacher-nav">{nav.map(([label,href])=><Link key={href} href={href} className={href==="/teacher/classes"?"active":""}><span className="nav-dot"/>{label}{label==="Teacher AI"&&<em>AI</em>}</Link>)}</nav>
      <div className="teacher-side-foot"><div className="teacher-compliance"><span>Assigned classes</span><strong>4 classes</strong><div><i style={{width:"100%"}}/></div><small>150 students across Mathematics subjects</small></div></div>
    </aside>

    <section className="teacher-main">
      <header className="teacher-topbar"><div><span className="page-kicker">TEACHER WORKSPACE</span><h1>My Classes</h1></div><div className="teacher-top-actions"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search class or topic..."/><button className="round-action">🔔</button><div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div></div></header>
      <div className="teacher-content classes-content">
        <section className="classes-hero"><div><span className="page-kicker">MY TEACHING ASSIGNMENTS</span><h2>Classes you are responsible for</h2><p>Each class connects directly to attendance, lesson plans, syllabus, assignments and assessment work.</p></div><Link href="/teacher/timetable">View timetable</Link></section>

        <section className="class-grid">
          {filtered.map(c=><button key={c.id} className={`class-overview-card ${selected===c.id?"active":""}`} onClick={()=>setSelected(c.id)}>
            <div className="class-overview-head"><div><span>{c.subject}</span><strong>{c.name}</strong></div><b>{c.progress}%</b></div>
            <p>{c.students} students · Room {c.room}</p><div className="class-progress"><i style={{width:`${c.progress}%`}}/></div>
            <footer><span>Next: {c.next}</span><strong>{c.topic}</strong></footer>
          </button>)}
        </section>

        <section className="class-detail">
          <header><div><span className="page-kicker">SELECTED CLASS</span><h3>{current.name} · {current.subject}</h3><p>{current.students} students · Room {current.room} · Next lesson {current.next}</p></div><span className="class-health">On track</span></header>
          <section className="class-detail-kpis"><article><span>Attendance</span><strong>{current.attendance}%</strong><small>Recent average</small></article><article><span>Class average</span><strong>{current.avg}%</strong><small>Latest assessments</small></article><article><span>Syllabus</span><strong>{current.progress}%</strong><small>Term coverage</small></article><article><span>Pending marking</span><strong>{current.pending}</strong><small>Submissions</small></article></section>
          <div className="class-action-grid">
            <Link href="/teacher/attendance"><strong>Take attendance</strong><span>Open the attendance register for this class.</span></Link>
            <Link href="/teacher/lesson-plans"><strong>Lesson plans</strong><span>Create or continue the next class lesson plan.</span></Link>
            <Link href="/teacher/syllabus"><strong>Syllabus progress</strong><span>Track completed and upcoming curriculum topics.</span></Link>
            <Link href="/teacher/assignments"><strong>Assignments</strong><span>Create work, mark submissions and review missing work.</span></Link>
            <Link href="/teacher/assessments"><strong>Assessments</strong><span>Enter CA scores and review class performance.</span></Link>
            <Link href="/teacher/students"><strong>Class students</strong><span>Open the authorized class roster and student profiles.</span></Link>
          </div>
        </section>

        <section className="classes-bottom">
          <article><header><h3>Current teaching focus</h3><span>{current.name}</span></header><div className="focus-row"><div><span>Current topic</span><strong>{current.topic}</strong></div><div><span>Next action</span><strong>Complete classwork and record coverage</strong></div><div><span>Suggested preparation</span><strong>5-question recap activity</strong></div></div><Link href="/teacher/ai">Ask Teacher AI for this class →</Link></article>
          <article><header><h3>Class activity</h3><span>This week</span></header><div className="activity-list"><div><i/>Attendance completed for 3 lessons</div><div><i/>2 lesson plans submitted</div><div><i/>1 assignment awaiting marking</div><div><i/>Syllabus updated after last lesson</div></div></article>
        </section>
      </div>
    </section>
  </main>;
}
