"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const nav = [
  ["Dashboard", "/headmaster"],
  ["Teachers", "/headmaster/teachers"],
  ["Pupils", "/headmaster/pupils"],
  ["Academics", "/headmaster/academics"],
  ["Attendance", "/headmaster/attendance"],
  ["Teaching Assignments", "/headmaster/assignments"],
  ["Assessments & Reports", "/headmaster/results"],
  ["Timetable", "/headmaster/timetable"],
  ["Communication", "/headmaster/communication"],
  ["Welfare & Incidents", "/headmaster/incidents"],
  ["Headmaster AI", "/headmaster/ai"],
  ["Primary Performance", "/headmaster/performance"],
  ["Profile", "/headmaster/profile"],
];

const teachers = [
  { name: "Mrs. Zainab Musa", role: "Primary 1 Class Teacher", attendance: 98, planning: 94, status: "Strong" },
  { name: "Mr. David Joseph", role: "Primary 4 Mathematics", attendance: 96, planning: 89, status: "On track" },
  { name: "Mrs. Ruth James", role: "Primary 3 English", attendance: 91, planning: 82, status: "Watch" },
  { name: "Mr. Kabiru Lawal", role: "Primary 5 Science", attendance: 95, planning: 90, status: "On track" },
];

const classes = [
  { name: "Primary 1", pupils: 38, attendance: 96, literacy: 78, numeracy: 75, status: "Strong" },
  { name: "Primary 2", pupils: 40, attendance: 94, literacy: 73, numeracy: 71, status: "On track" },
  { name: "Primary 3", pupils: 42, attendance: 89, literacy: 66, numeracy: 68, status: "Watch" },
  { name: "Primary 4", pupils: 39, attendance: 93, literacy: 74, numeracy: 76, status: "On track" },
  { name: "Primary 5", pupils: 36, attendance: 95, literacy: 80, numeracy: 79, status: "Strong" },
  { name: "Primary 6", pupils: 34, attendance: 92, literacy: 82, numeracy: 77, status: "On track" },
];

const activity = [
  "Primary 3 attendance fell below the section target.",
  "Primary 5 Science assessment scores were submitted.",
  "A class teacher requested support for two struggling readers.",
  "Primary 4 timetable adjustment was approved.",
  "Three guardian messages require follow-up today.",
];

export default function HeadmasterDashboard() {
  const [query, setQuery] = useState("");
  const filteredTeachers = useMemo(() => teachers.filter((teacher) => `${teacher.name} ${teacher.role} ${teacher.status}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="headmaster-shell">
      <aside className="headmaster-sidebar">
        <div className="headmaster-brand"><div className="headmaster-logo">S</div><div><strong>SchoolOS</strong><span>Primary Leadership</span></div></div>
        <div className="headmaster-scope-card"><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Kaduna Campus · Headmistress</small></div>
        <nav>{nav.map(([label, href]) => <Link key={href} href={href} className={href === "/headmaster" ? "active" : ""}><span />{label}{label === "Headmaster AI" && <em>AI</em>}</Link>)}</nav>
        <div className="headmaster-boundary"><span>SECTION BOUNDARY</span><p>Primary School only. Nursery and Secondary remain separate leadership workspaces.</p></div>
      </aside>

      <section className="headmaster-main">
        <header className="headmaster-topbar">
          <div><span className="page-kicker">PRIMARY SCHOOL WORKSPACE</span><h1>Headmistress Dashboard</h1></div>
          <div className="headmaster-top-actions"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Primary teachers, classes, issues..." /><div className="headmaster-profile"><span>HS</span><div><strong>Mrs. Hauwa Sule</strong><small>Headmistress · Primary</small></div></div></div>
        </header>

        <div className="headmaster-content">
          <section className="headmaster-hero">
            <div><span className="page-kicker">PRIMARY SCHOOL OVERVIEW</span><h2>Good afternoon, Headmistress.</h2><p>Primary 3 needs attention today, two teacher follow-ups are pending, and three guardian messages require response.</p></div>
            <div><Link href="/headmaster/assignments">Teaching assignments</Link><Link className="secondary" href="/headmaster/ai">Ask Headmaster AI</Link></div>
          </section>

          <section className="headmaster-ai-brief">
            <div className="headmaster-ai-orb">AI</div>
            <div><strong>Headmaster AI Brief</strong><p>Primary 3 shows the clearest combined concern: attendance is lower than the section average and literacy progress is behind parallel classes. Recommended focus: class-teacher support, pupil follow-up and guardian communication before making timetable changes.</p><div><Link href="/headmaster/ai">Open intelligence</Link><Link href="/headmaster/performance">Primary performance</Link></div></div>
          </section>

          <section className="headmaster-kpis">
            <Kpi label="Pupils present" value="94%" hint="Primary section today" />
            <Kpi label="Teachers present" value="96%" hint="24 of 25" />
            <Kpi label="Classes on track" value="5 / 6" hint="Academic + attendance health" />
            <Kpi label="Reading support" value="12" hint="Pupils requiring follow-up" />
            <Kpi label="Unassigned subjects" value="3" hint="Needs leadership action" />
            <Kpi label="Guardian follow-ups" value="3" hint="Due today" />
          </section>

          <section className="headmaster-grid two-one">
            <Panel title="Primary class health" subtitle="Attendance, literacy and numeracy" href="/headmaster/academics">
              <div className="headmaster-class-list">{classes.map((item) => <div key={item.name}><div><strong>{item.name}</strong><small>{item.pupils} pupils</small></div><span><small>Attendance</small><b>{item.attendance}%</b></span><span><small>Literacy</small><b>{item.literacy}%</b></span><span><small>Numeracy</small><b>{item.numeracy}%</b></span><em className={item.status.toLowerCase().replaceAll(" ", "-")}>{item.status}</em></div>)}</div>
            </Panel>
            <Panel title="Today’s priorities" subtitle="Primary leadership follow-up" href="/headmaster/ai">
              <div className="headmaster-priorities"><div className="warn"><strong>Primary 3 attendance</strong><span>89% · below target</span></div><div className="warn"><strong>Reading support</strong><span>2 pupils newly flagged</span></div><div><strong>Teacher assignment</strong><span>3 subject gaps remain</span></div><div><strong>Guardian contact</strong><span>3 messages due today</span></div></div>
            </Panel>
          </section>

          <section className="headmaster-grid equal">
            <Panel title="Teacher oversight" subtitle="Primary staff only" href="/headmaster/teachers">
              <div className="headmaster-teacher-list">{filteredTeachers.map((teacher) => <div key={teacher.name}><div className="headmaster-avatar">{teacher.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div><div><strong>{teacher.name}</strong><small>{teacher.role}</small></div><span><small>Attendance</small><b>{teacher.attendance}%</b></span><span><small>Planning</small><b>{teacher.planning}%</b></span><em className={teacher.status.toLowerCase().replaceAll(" ", "-")}>{teacher.status}</em></div>)}</div>
            </Panel>
            <Panel title="Quick leadership actions" subtitle="Common Primary School workflows" href="/headmaster/assignments">
              <div className="headmaster-quick-grid"><Link href="/headmaster/assignments">Assign teachers</Link><Link href="/headmaster/attendance">Review attendance</Link><Link href="/headmaster/pupils">Pupil support</Link><Link href="/headmaster/results">Review reports</Link><Link href="/headmaster/timetable">Timetable</Link><Link href="/headmaster/communication">Message guardians</Link><Link href="/finance-office/scholarships">Request scholarship / discount</Link></div>
            </Panel>
          </section>

          <section className="headmaster-grid equal">
            <Panel title="Primary activity" subtitle="Recent section events" href="/headmaster/communication">
              <div className="headmaster-activity">{activity.map((item, index) => <div key={item}><span>{index + 1}</span><p>{item}</p><small>{index === 0 ? "14 min" : `${(index + 1) * 17} min`} ago</small></div>)}</div>
            </Panel>
            <Panel title="Section authority" subtitle="What this workspace controls" href="/proprietor/structure">
              <div className="headmaster-authority"><div><span>Can manage</span><strong>Primary pupils, teachers, subjects, assignments, attendance, results, communication and scholarship/discount requests</strong></div><div><span>Cannot manage</span><strong>Nursery, Secondary, school ownership, official identity, proprietor settings, or approving a scholarship/discount</strong></div></div>
            </Panel>
          </section>
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <article className="headmaster-kpi"><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}

function Panel({ title, subtitle, href, children }: { title: string; subtitle: string; href: string; children: React.ReactNode }) {
  return <article className="headmaster-panel"><header><div><h3>{title}</h3><p>{subtitle}</p></div><Link href={href}>Open →</Link></header>{children}</article>;
}
