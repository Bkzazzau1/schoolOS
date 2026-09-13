"use client";

import { useMemo, useState } from "react";

const nav = [
  "Dashboard",
  "My Timetable",
  "My Classes",
  "Attendance",
  "Lesson Plans",
  "Syllabus",
  "Assignments",
  "Assessments",
  "Students",
  "Messages",
  "Teacher AI",
  "My Performance",
  "Profile",
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
  { name: "Amina Sani", className: "JSS 2A", avg: 86, attendance: 96, flag: "Strong" },
  { name: "David Peter", className: "JSS 2A", avg: 61, attendance: 88, flag: "Watch" },
  { name: "Musa Bello", className: "JSS 2B", avg: 48, attendance: 79, flag: "At risk" },
  { name: "Joy Samuel", className: "JSS 3A", avg: 91, attendance: 98, flag: "Strong" },
];

const tasks = [
  { title: "Mark JSS 2A assignment", meta: "38 submissions · due today", tone: "urgent" },
  { title: "Submit week 6 lesson plan", meta: "Mathematics · due tomorrow", tone: "warn" },
  { title: "Enter CA scores for JSS 3A", meta: "32 of 41 entered", tone: "normal" },
  { title: "Review 3 AI student alerts", meta: "Academic + attendance risk", tone: "normal" },
];

export default function TeacherPortalPage() {
  const [active, setActive] = useState("Dashboard");
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("BrightGate Academy · Kaduna Campus");

  const filteredStudents = useMemo(
    () => students.filter((s) => `${s.name} ${s.className} ${s.flag}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <main className="teacher-shell">
      <aside className="teacher-sidebar">
        <div className="teacher-brand">
          <div className="teacher-logo">S</div>
          <div><strong>SchoolOS</strong><span>Teacher Portal</span></div>
        </div>

        <div className="teacher-school-card">
          <span className="school-kicker">ACTIVE WORKSPACE</span>
          <strong>BrightGate Academy</strong>
          <small>Kaduna Campus · Teacher</small>
        </div>

        <nav className="teacher-nav">
          {nav.map((item) => (
            <button key={item} className={active === item ? "active" : ""} onClick={() => setActive(item)}>
              <span className="nav-dot" />
              {item}
              {item === "Teacher AI" && <em>AI</em>}
            </button>
          ))}
        </nav>

        <div className="teacher-side-foot">
          <div className="teacher-compliance">
            <span>Weekly compliance</span>
            <strong>92%</strong>
            <div><i style={{ width: "92%" }} /></div>
            <small>Lesson plans, attendance & scores</small>
          </div>
        </div>
      </aside>

      <section className="teacher-main">
        <header className="teacher-topbar">
          <div>
            <span className="page-kicker">TEACHER WORKSPACE</span>
            <h1>{active}</h1>
          </div>
          <div className="teacher-top-actions">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students, classes, tasks..." />
            <select value={campus} onChange={(e) => setCampus(e.target.value)}>
              <option>BrightGate Academy · Kaduna Campus</option>
            </select>
            <button className="round-action">🔔</button>
            <div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div>
          </div>
        </header>

        <div className="teacher-content">
          {active === "Dashboard" ? (
            <>
              <section className="teacher-welcome">
                <div>
                  <span className="page-kicker">SATURDAY · 12 SEPTEMBER</span>
                  <h2>Good morning, Mrs. Amina.</h2>
                  <p>You have 4 lessons today, 1 lesson plan due, and 3 students needing attention.</p>
                </div>
                <div className="teacher-quick-actions">
                  <button>+ Take attendance</button>
                  <button className="secondary">Create lesson plan</button>
                </div>
              </section>

              <section className="teacher-ai-brief">
                <div className="ai-orb">AI</div>
                <div>
                  <div className="ai-heading"><strong>Teacher AI Daily Brief</strong><span>Updated 7:45 AM</span></div>
                  <p>JSS 2B is slightly behind syllabus pace and three students show a combined attendance and assessment risk. Your JSS 3A class improved by 6.4% in the latest assessment. I recommend a short revision activity before the next JSS 2B topic.</p>
                  <div className="ai-buttons"><button>View recommendations</button><button>Ask Teacher AI</button></div>
                </div>
              </section>

              <section className="teacher-kpis">
                <Kpi label="Today's lessons" value="4" hint="1 completed · 3 upcoming" accent="blue" />
                <Kpi label="My students" value="150" hint="Across 4 assigned classes" accent="green" />
                <Kpi label="Pending marking" value="38" hint="JSS 2A assignment" accent="amber" />
                <Kpi label="Syllabus progress" value="71%" hint="+4% from last week" accent="purple" />
              </section>

              <section className="teacher-grid two-one">
                <Panel title="Today's timetable" subtitle="Your teaching schedule for today">
                  <div className="lesson-list">
                    {today.map((item) => <div className="lesson-row" key={`${item.time}${item.className}`}>
                      <time>{item.time}</time>
                      <div><strong>{item.className}</strong><span>{item.topic}</span></div>
                      <span className={`status-chip ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>)}
                  </div>
                </Panel>

                <Panel title="My action list" subtitle="What needs your attention">
                  <div className="teacher-task-list">
                    {tasks.map((task) => <div className={`teacher-task ${task.tone}`} key={task.title}>
                      <span className="task-dot" />
                      <div><strong>{task.title}</strong><small>{task.meta}</small></div>
                      <button>Open</button>
                    </div>)}
                  </div>
                </Panel>
              </section>

              <section className="teacher-grid equal">
                <Panel title="My classes" subtitle="Class size, next lesson and curriculum progress">
                  <div className="class-cards">
                    {classes.map((item) => <article key={item.name} className="class-card">
                      <div className="class-card-head"><div><span>{item.subject}</span><strong>{item.name}</strong></div><b>{item.progress}%</b></div>
                      <p>{item.students} students · Room {item.room}</p>
                      <div className="progress"><i style={{ width: `${item.progress}%` }} /></div>
                      <footer><span>Next: {item.next}</span><button>Open class</button></footer>
                    </article>)}
                  </div>
                </Panel>

                <Panel title="Students needing attention" subtitle="Generated from attendance and academic trends">
                  <div className="student-attention-list">
                    {filteredStudents.map((student) => <div className="student-attention" key={student.name}>
                      <div className="student-avatar">{student.name.split(" ").map((x) => x[0]).join("").slice(0,2)}</div>
                      <div><strong>{student.name}</strong><span>{student.className} · Avg {student.avg}% · Attendance {student.attendance}%</span></div>
                      <span className={`risk-chip ${student.flag.toLowerCase().replace(" ", "-")}`}>{student.flag}</span>
                    </div>)}
                  </div>
                </Panel>
              </section>

              <section className="teacher-grid equal">
                <Panel title="Lesson plan & syllabus" subtitle="Planning and curriculum progress">
                  <div className="plan-summary">
                    <div><span>Lesson plans submitted</span><strong>11 / 12</strong></div>
                    <div><span>Syllabus coverage</span><strong>71%</strong></div>
                    <div><span>Assignments created</span><strong>18</strong></div>
                    <div><span>CA entries complete</span><strong>84%</strong></div>
                  </div>
                  <div className="teacher-note"><strong>Upcoming deadline</strong><p>Week 6 Mathematics lesson plan is due tomorrow at 6:00 PM.</p><button>Continue lesson plan</button></div>
                </Panel>

                <Panel title="My performance" subtitle="Private professional dashboard">
                  <div className="performance-score"><div className="score-ring"><strong>88</strong><span>/100</span></div><div><strong>Very good</strong><p>Your strongest areas are attendance completion and lesson-plan quality. Syllabus pace needs attention in JSS 2B.</p></div></div>
                  <Metric label="Attendance completion" value={98} />
                  <Metric label="Lesson-plan compliance" value={92} />
                  <Metric label="Assessment completion" value={84} />
                  <Metric label="Syllabus progress" value={71} />
                </Panel>
              </section>
            </>
          ) : (
            <FeaturePlaceholder active={active} />
          )}
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, hint, accent }: { label: string; value: string; hint: string; accent: string }) {
  return <article className={`teacher-kpi ${accent}`}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <article className="teacher-panel"><header><div><h3>{title}</h3><p>{subtitle}</p></div><button>•••</button></header>{children}</article>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="teacher-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}

function FeaturePlaceholder({ active }: { active: string }) {
  const descriptions: Record<string, string> = {
    "My Timetable": "Daily and weekly teaching timetable, room assignments, substitutions and schedule changes.",
    "My Classes": "Assigned classes, subjects, class rosters, learning progress and quick class actions.",
    Attendance: "Take attendance, correct entries within policy, view trends and flag repeated absence.",
    "Lesson Plans": "Create, submit, reuse and manage lesson plans with AI assistance and approval status.",
    Syllabus: "Track curriculum coverage by class, topic, week and expected school pacing.",
    Assignments: "Create assignments, receive submissions, mark work, return feedback and track late work.",
    Assessments: "Create tests, enter CA scores, mark assessments, review analytics and submit scores.",
    Students: "View only students in assigned classes, their progress, attendance, interventions and notes.",
    Messages: "Communicate with school leadership, colleagues and authorized parents through controlled channels.",
    "Teacher AI": "Generate lesson plans, quizzes, examples, revision activities and class-specific recommendations.",
    "My Performance": "Private teacher metrics for attendance, lesson compliance, marking, syllabus pace and student improvement.",
    Profile: "Personal profile, qualifications, subjects, classes, availability and notification preferences.",
  };

  return <section className="teacher-feature-placeholder"><span className="page-kicker">TEACHER MODULE</span><h2>{active}</h2><p>{descriptions[active]}</p><div className="feature-placeholder-card"><strong>This is the next feature screen to build.</strong><span>We will implement this module fully and connect it to teacher permissions before moving to another teacher feature.</span></div></section>;
}
