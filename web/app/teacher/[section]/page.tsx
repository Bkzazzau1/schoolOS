import Link from "next/link";

const nav = [
  ["Dashboard", "/teacher"], ["My Timetable", "/teacher/timetable"], ["My Classes", "/teacher/classes"],
  ["Attendance", "/teacher/attendance"], ["Lesson Plans", "/teacher/lesson-plans"], ["Syllabus", "/teacher/syllabus"],
  ["Assignments", "/teacher/assignments"], ["Assessments", "/teacher/assessments"], ["Students", "/teacher/students"],
  ["Messages", "/teacher/messages"], ["Teacher AI", "/teacher/ai"], ["My Performance", "/teacher/performance"], ["Profile", "/teacher/profile"]
];

const modules: Record<string, { title: string; description: string; items: string[] }> = {
  classes: { title: "My Classes", description: "Assigned classes, rosters and class-level teaching operations.", items: ["Assigned class cards", "Student roster", "Class academic summary", "Quick attendance", "Lesson history", "Class announcements"] },
  attendance: { title: "Attendance", description: "Take and review attendance only for classes assigned to you.", items: ["Take attendance by scheduled lesson", "Present / absent / late / excused", "Attendance history", "Correction request workflow", "Repeated absence alerts", "Parent-notification handoff"] },
  "lesson-plans": { title: "Lesson Plans", description: "Plan, submit and track lessons with school approval and AI support.", items: ["Create lesson plan", "AI-assisted drafting", "Submit for approval", "Reuse previous plans", "Approval status", "Attachments and teaching resources"] },
  syllabus: { title: "Syllabus", description: "Track curriculum coverage by class, topic, week and target pace.", items: ["Curriculum topics", "Expected vs actual pace", "Mark topic completed", "Coverage evidence", "Behind-schedule alerts", "AI pacing suggestions"] },
  assignments: { title: "Assignments", description: "Create, distribute, mark and return class assignments.", items: ["Create assignment", "Due dates", "Student submissions", "Marking queue", "Feedback", "Late / missing work", "Class analytics"] },
  assessments: { title: "Assessments", description: "Manage tests, continuous assessment and score entry.", items: ["Create assessment", "CA score entry", "Bulk score entry", "Draft / submitted states", "Performance analysis", "Score correction workflow"] },
  students: { title: "Students", description: "View only students within your authorized teaching assignments.", items: ["Student directory", "Academic trend", "Attendance trend", "Assignments", "Teacher notes", "Interventions", "AI risk alerts"] },
  messages: { title: "Messages", description: "Controlled communication with leadership, colleagues and authorized parents.", items: ["Inbox", "School leadership", "Staff messages", "Parent conversations", "Announcements", "Read receipts", "Communication audit trail"] },
  ai: { title: "Teacher AI", description: "An AI assistant grounded only in the teacher's authorized school context.", items: ["Generate lesson plans", "Create quizzes", "Explain concepts", "Generate examples", "Revision activities", "Class-specific insights", "Student-support suggestions"] },
  performance: { title: "My Performance", description: "A private professional dashboard for the logged-in teacher.", items: ["Attendance completion", "Lesson-plan compliance", "Syllabus pace", "Assessment completion", "Student progress indicators", "Professional-development suggestions"] },
  profile: { title: "Profile", description: "Teacher identity, professional information and preferences.", items: ["Personal details", "Qualifications", "Subjects", "Assigned classes", "Availability", "Notification preferences", "Security settings"] },
};

export default async function TeacherModulePage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const module = modules[section] ?? { title: "Teacher Module", description: "This teacher feature is being prepared.", items: [] };
  const activeHref = `/teacher/${section}`;

  return <main className="teacher-shell">
    <aside className="teacher-sidebar">
      <div className="teacher-brand"><div className="teacher-logo">S</div><div><strong>SchoolOS</strong><span>Teacher Portal</span></div></div>
      <div className="teacher-school-card"><span className="school-kicker">ACTIVE WORKSPACE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Teacher</small></div>
      <nav className="teacher-nav">{nav.map(([label, href]) => <Link key={href} href={href} className={href === activeHref ? "active" : ""}><span className="nav-dot" />{label}{label === "Teacher AI" && <em>AI</em>}</Link>)}</nav>
      <div className="teacher-side-foot"><div className="teacher-compliance"><span>Weekly compliance</span><strong>92%</strong><div><i style={{ width: "92%" }} /></div><small>Lesson plans, attendance & scores</small></div></div>
    </aside>
    <section className="teacher-main">
      <header className="teacher-topbar"><div><span className="page-kicker">TEACHER WORKSPACE</span><h1>{module.title}</h1></div><div className="teacher-top-actions"><button className="round-action">🔔</button><div className="teacher-profile-pill"><span>AY</span><div><strong>Mrs. Amina Yusuf</strong><small>Mathematics Teacher</small></div></div></div></header>
      <div className="teacher-content">
        <section className="teacher-feature-placeholder">
          <span className="page-kicker">FEATURE WORKSPACE</span>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
          <div className="feature-placeholder-card"><strong>Clickable and queued for full implementation</strong><span>We are completing the teacher portal module by module. My Timetable is the first fully implemented module.</span></div>
          <div className="plan-summary" style={{ marginTop: 16 }}>{module.items.map((item) => <div key={item}><span>Planned capability</span><strong style={{ fontSize: 12 }}>{item}</strong></div>)}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 18 }}><Link className="panel-link" href="/teacher">← Dashboard</Link><Link className="panel-link" href="/teacher/timetable">Open My Timetable →</Link></div>
        </section>
      </div>
    </section>
  </main>;
}
