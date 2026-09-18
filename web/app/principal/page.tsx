"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const nav = [
  ["Dashboard", "/principal"],
  ["Teachers", "/principal/teachers"],
  ["Teaching Assignments", "/principal/assignments"],
  ["Academics", "/principal/academics"],
  ["Students", "/principal/students"],
  ["Attendance", "/principal/attendance"],
  ["Approvals", "/principal/approvals"],
  ["Results & Reports", "/principal/results"],
  ["Timetable", "/principal/timetable"],
  ["Communication", "/principal/communication"],
  ["Incidents", "/principal/incidents"],
  ["Principal AI", "/principal/ai"],
  ["School Performance", "/principal/performance"],
  ["Profile", "/principal/profile"],
];

const approvals = [
  { type: "Lesson Plan", title: "JSS 2A · Linear Equations", teacher: "Mrs. Amina Yusuf", age: "18 min", priority: "Normal", href: "/principal/approvals" },
  { type: "Assessment", title: "JSS 3A · Topic Test", teacher: "Mr. Daniel John", age: "42 min", priority: "Normal", href: "/principal/approvals" },
  { type: "Report Card", title: "JSS 2B · First Term Reports", teacher: "Mrs. Fatima Bello", age: "1 hr", priority: "High", href: "/principal/approvals" },
  { type: "Score Correction", title: "SS 1A · CA 1", teacher: "Mr. Peter James", age: "2 hrs", priority: "High", href: "/principal/approvals" },
];

const teachers = [
  { name: "Mrs. Amina Yusuf", subject: "Mathematics", compliance: 92, syllabus: 71, status: "Good" },
  { name: "Mr. Daniel John", subject: "Basic Science", compliance: 96, syllabus: 78, status: "Strong" },
  { name: "Mrs. Fatima Bello", subject: "English", compliance: 84, syllabus: 66, status: "Watch" },
  { name: "Mr. Peter James", subject: "Further Mathematics", compliance: 89, syllabus: 73, status: "Good" },
];

const classes = [
  { name: "JSS 2A", avg: 76, attendance: 94, syllabus: 72, status: "On track" },
  { name: "JSS 2B", avg: 63, attendance: 88, syllabus: 61, status: "Needs attention" },
  { name: "JSS 3A", avg: 81, attendance: 96, syllabus: 79, status: "Strong" },
  { name: "SS 1A", avg: 69, attendance: 91, syllabus: 67, status: "On track" },
];

const activity = [
  "Mrs. Amina Yusuf submitted a lesson plan for JSS 2A.",
  "JSS 2B attendance fell below the weekly Secondary School target.",
  "34 JSS 3A assessment scores were submitted for review.",
  "A guardian communication was escalated to Secondary School leadership.",
  "SS 1A timetable substitution was accepted for Period 4.",
];

export default function PrincipalDashboard() {
  const [query, setQuery] = useState("");
  const filteredTeachers = useMemo(() => teachers.filter((t) => `${t.name} ${t.subject} ${t.status}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="principal-shell">
      <aside className="principal-sidebar">
        <div className="principal-brand"><div className="principal-logo">S</div><div><strong>SchoolOS</strong><span>Principal Portal</span></div></div>
        <div className="principal-school-card"><span>ACTIVE LEADERSHIP SCOPE</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Secondary School · Principal</small></div>
        <nav className="principal-nav">{nav.map(([label, href]) => <Link key={href} href={href} className={href === "/principal" ? "active" : ""}><span className="principal-nav-dot" />{label}{label === "Principal AI" && <em>AI</em>}</Link>)}</nav>
        <div className="principal-side-footer"><span>Secondary section health</span><strong>86%</strong><div><i style={{ width: "86%" }} /></div><small>Academics, attendance, staff & compliance</small></div>
      </aside>

      <section className="principal-main">
        <header className="principal-topbar">
          <div><span className="page-kicker">PRINCIPAL · SECONDARY SCHOOL</span><h1>Dashboard</h1></div>
          <div className="principal-top-actions"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Secondary teachers, classes, issues..." /><button className="principal-round">🔔</button><div className="principal-profile"><span>PD</span><div><strong>Mr. Ibrahim Danladi</strong><small>Principal · Secondary</small></div></div></div>
        </header>

        <div className="principal-content">
          <section className="principal-hero">
            <div><span className="page-kicker">SECONDARY SCHOOL DAY OVERVIEW</span><h2>Good afternoon, Principal.</h2><p>Your authority is scoped to the Secondary School section. There are 4 items awaiting your approval, 2 Secondary classes needing academic attention, 3 teacher follow-ups, and subject assignments requiring review.</p></div>
            <div className="principal-hero-actions"><Link href="/principal/assignments">Assign teachers</Link><Link href="/principal/approvals">Review approvals</Link><Link className="secondary" href="/principal/ai">Ask Principal AI</Link></div>
          </section>

          <section className="principal-ai-brief">
            <div className="principal-ai-orb">AI</div>
            <div><div className="principal-ai-heading"><strong>Principal AI Brief · Secondary only</strong><span>Updated this morning</span></div><p>JSS 2B remains the highest-priority class today: attendance is below target, Mathematics syllabus pace is behind, and recent assessment performance is weaker than parallel classes. The section also has unassigned or high-load teaching responsibilities that should be checked before timetable finalization.</p><div><Link href="/principal/ai">Open intelligence</Link><Link href="/principal/assignments">Review teaching assignments</Link></div></div>
          </section>

          <section className="principal-kpis">
            <Kpi label="Secondary students present" value="92%" hint="403 of 438" />
            <Kpi label="Secondary teachers present" value="96%" hint="23 of 24" />
            <Kpi label="Pending approvals" value="4" hint="2 high priority" />
            <Kpi label="Classes on track" value="87%" hint="Academics + syllabus" />
            <Kpi label="Student risk alerts" value="18" hint="6 require follow-up" />
            <Kpi label="Open incidents" value="3" hint="1 escalated" />
          </section>

          <section className="principal-grid two-one">
            <Panel title="Approval queue" subtitle="Secondary teacher work awaiting principal action" link="/principal/approvals">
              <div className="principal-approval-list">{approvals.map((item) => <Link href={item.href} key={`${item.type}${item.title}`} className="principal-approval-row"><span className={`approval-priority ${item.priority.toLowerCase()}`}>{item.priority}</span><div><strong>{item.type} · {item.title}</strong><small>{item.teacher} · {item.age} ago</small></div><b>Review →</b></Link>)}</div>
            </Panel>
            <Panel title="Today’s alerts" subtitle="Secondary issues that may need leadership action" link="/principal/ai">
              <div className="principal-alerts"><div className="warn"><strong>JSS 2B attendance</strong><span>88% · below 92% target</span></div><div className="warn"><strong>Syllabus delay</strong><span>2 classes behind expected pace</span></div><div><strong>Teaching assignments</strong><span>3 class-subjects still unassigned</span></div><div><strong>Report approval</strong><span>JSS 2B report cards waiting</span></div></div>
            </Panel>
          </section>

          <section className="principal-grid equal">
            <Panel title="Teacher oversight" subtitle="Support-oriented Secondary teaching indicators" link="/principal/teachers">
              <div className="principal-teacher-list">{filteredTeachers.map((t) => <div key={t.name}><div className="principal-avatar">{t.name.split(" ").map(x => x[0]).join("").slice(0,2)}</div><div><strong>{t.name}</strong><span>{t.subject}</span></div><div className="teacher-stat"><small>Compliance</small><b>{t.compliance}%</b></div><div className="teacher-stat"><small>Syllabus</small><b>{t.syllabus}%</b></div><span className={`principal-status ${t.status.toLowerCase()}`}>{t.status}</span></div>)}</div>
            </Panel>
            <Panel title="Class performance" subtitle="Secondary academic and attendance health" link="/principal/academics">
              <div className="principal-class-list">{classes.map((c) => <div key={c.name}><strong>{c.name}</strong><div><small>Average</small><b>{c.avg}%</b></div><div><small>Attendance</small><b>{c.attendance}%</b></div><div><small>Syllabus</small><b>{c.syllabus}%</b></div><span className={`principal-status ${c.status.toLowerCase().replaceAll(" ", "-")}`}>{c.status}</span></div>)}</div>
            </Panel>
          </section>

          <section className="principal-grid equal">
            <Panel title="Section activity" subtitle="Recent Secondary academic and operational events" link="/principal/communication">
              <div className="principal-activity">{activity.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p><small>{index === 0 ? "12 min" : `${(index + 1) * 18} min`} ago</small></div>)}</div>
            </Panel>
            <Panel title="Quick leadership actions" subtitle="Common Secondary principal workflows" link="/principal/assignments">
              <div className="principal-quick-grid"><Link href="/principal/assignments">Assign teachers to subjects</Link><Link href="/principal/approvals">Approve teacher work</Link><Link href="/principal/teachers">Review teachers</Link><Link href="/principal/students">Student interventions</Link><Link href="/principal/results">Review reports</Link><Link href="/principal/incidents">Open incidents</Link><Link href="/finance-office/scholarships">Request scholarship / discount</Link></div>
            </Panel>
          </section>
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <article className="principal-kpi"><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}

function Panel({ title, subtitle, link, children }: { title: string; subtitle: string; link: string; children: React.ReactNode }) {
  return <article className="principal-panel"><header><div><h3>{title}</h3><p>{subtitle}</p></div><Link href={link}>Open →</Link></header>{children}</article>;
}
