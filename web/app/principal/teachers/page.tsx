"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Teacher = {
  id: string;
  name: string;
  initials: string;
  department: string;
  subjects: string;
  classes: number;
  students: number;
  attendance: number;
  punctuality: number;
  lessonPlans: number;
  syllabus: number;
  assessments: number;
  workload: "Balanced" | "Heavy" | "Light";
  status: "Strong" | "On track" | "Needs support";
  pending: number;
  note: string;
};

const teachers: Teacher[] = [
  { id: "TCH-001", name: "Mrs. Amina Yusuf", initials: "AY", department: "Mathematics", subjects: "Mathematics · Further Mathematics", classes: 4, students: 150, attendance: 98, punctuality: 96, lessonPlans: 92, syllabus: 71, assessments: 84, workload: "Heavy", status: "On track", pending: 2, note: "Strong attendance and lesson planning. JSS 2B syllabus pace needs follow-up." },
  { id: "TCH-002", name: "Mr. Daniel John", initials: "DJ", department: "Mathematics", subjects: "Mathematics", classes: 3, students: 118, attendance: 97, punctuality: 94, lessonPlans: 96, syllabus: 83, assessments: 93, workload: "Balanced", status: "Strong", pending: 1, note: "Consistent assessment completion and good syllabus pace." },
  { id: "TCH-003", name: "Mrs. Fatima Bello", initials: "FB", department: "Languages", subjects: "English Language", classes: 5, students: 182, attendance: 95, punctuality: 91, lessonPlans: 88, syllabus: 76, assessments: 86, workload: "Heavy", status: "On track", pending: 3, note: "High workload. Monitor marking volume and report-card preparation." },
  { id: "TCH-004", name: "Mr. Peter James", initials: "PJ", department: "Science", subjects: "Basic Science · Physics", classes: 4, students: 143, attendance: 89, punctuality: 84, lessonPlans: 72, syllabus: 62, assessments: 69, workload: "Balanced", status: "Needs support", pending: 4, note: "Repeated lateness and low assessment completion. Schedule a support conversation." },
  { id: "TCH-005", name: "Mrs. Grace Musa", initials: "GM", department: "Humanities", subjects: "Social Studies · Civic Education", classes: 3, students: 105, attendance: 99, punctuality: 98, lessonPlans: 97, syllabus: 89, assessments: 95, workload: "Light", status: "Strong", pending: 0, note: "Very strong compliance and curriculum pace." },
];

export default function PrincipalTeachersPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [status, setStatus] = useState("All statuses");
  const [selectedId, setSelectedId] = useState(teachers[0].id);
  const [principalNote, setPrincipalNote] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => teachers.filter((teacher) => {
    const matchesQuery = `${teacher.name} ${teacher.department} ${teacher.subjects}`.toLowerCase().includes(query.toLowerCase());
    const matchesDepartment = department === "All departments" || teacher.department === department;
    const matchesStatus = status === "All statuses" || teacher.status === status;
    return matchesQuery && matchesDepartment && matchesStatus;
  }), [query, department, status]);

  const selected = teachers.find((teacher) => teacher.id === selectedId) ?? teachers[0];
  const averageAttendance = Math.round(teachers.reduce((sum, teacher) => sum + teacher.attendance, 0) / teachers.length);
  const supportCount = teachers.filter((teacher) => teacher.status === "Needs support").length;
  const pendingWork = teachers.reduce((sum, teacher) => sum + teacher.pending, 0);

  return (
    <main className="principal-module-shell principal-teachers-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · SECONDARY SCHOOL · TEACHER OVERSIGHT</span>
          <h1>Teachers</h1>
          <p>Monitor workload, attendance, teaching compliance and support needs inside the Secondary School section.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal/assignments">Teaching Assignments</Link>
          <Link href="/principal/approvals">Approvals</Link>
          <Link href="/principal/academics">Academics</Link>
          <Link href="/principal">Dashboard</Link>
        </div>
      </header>

      <section className="teacher-overview-kpis">
        <article><span>Secondary teaching staff</span><strong>24</strong><small>Current section</small></article>
        <article><span>Staff attendance</span><strong>{averageAttendance}%</strong><small>Current prototype average</small></article>
        <article><span>Needs support</span><strong>{supportCount}</strong><small>Flagged for follow-up</small></article>
        <article><span>Pending teacher work</span><strong>{pendingWork}</strong><small>Awaiting review/action</small></article>
        <article><span>Lesson-plan compliance</span><strong>89%</strong><small>Secondary section</small></article>
        <article><span>Assessment completion</span><strong>85%</strong><small>Secondary section</small></article>
      </section>

      <section className="principal-teacher-workspace">
        <article className="principal-teacher-directory">
          <header>
            <div><h2>Secondary teacher directory</h2><p>Select a teacher to review their teaching profile and current indicators.</p></div>
            <div className="principal-teacher-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teacher or subject..." />
              <select value={department} onChange={(e) => setDepartment(e.target.value)}><option>All departments</option><option>Mathematics</option><option>Languages</option><option>Science</option><option>Humanities</option></select>
              <select value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Needs support</option></select>
            </div>
          </header>

          <div className="principal-teacher-table-wrap">
            <div className="principal-teacher-table-head"><span>Teacher</span><span>Department</span><span>Attendance</span><span>Lesson plans</span><span>Syllabus</span><span>Assessments</span><span>Status</span></div>
            {filtered.map((teacher) => (
              <button key={teacher.id} className={`principal-teacher-row ${selected.id === teacher.id ? "selected" : ""}`} onClick={() => { setSelectedId(teacher.id); setPrincipalNote(""); setSaved(false); }}>
                <div className="principal-teacher-person"><span>{teacher.initials}</span><div><strong>{teacher.name}</strong><small>{teacher.subjects}</small></div></div>
                <span>{teacher.department}</span><b>{teacher.attendance}%</b><b>{teacher.lessonPlans}%</b><b>{teacher.syllabus}%</b><b>{teacher.assessments}%</b><em className={`principal-status ${teacher.status.toLowerCase().replaceAll(" ", "-")}`}>{teacher.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="principal-teacher-detail">
          <div className="principal-teacher-detail-head"><span className="principal-teacher-detail-avatar">{selected.initials}</span><div><span>{selected.id}</span><h2>{selected.name}</h2><p>{selected.department} · {selected.subjects}</p></div></div>
          <div className="principal-teacher-summary-grid"><div><span>Assigned classes</span><strong>{selected.classes}</strong></div><div><span>Students</span><strong>{selected.students}</strong></div><div><span>Workload</span><strong>{selected.workload}</strong></div><div><span>Pending work</span><strong>{selected.pending}</strong></div></div>
          <div className="principal-teacher-metrics"><Metric label="Attendance" value={selected.attendance} /><Metric label="Punctuality" value={selected.punctuality} /><Metric label="Lesson-plan compliance" value={selected.lessonPlans} /><Metric label="Syllabus pace" value={selected.syllabus} /><Metric label="Assessment completion" value={selected.assessments} /></div>
          <div className="principal-support-note"><span>Current principal insight</span><p>{selected.note}</p></div>
          <div className="principal-teacher-detail-actions"><Link href="/principal/assignments">Manage teaching assignments</Link><Link href="/principal/approvals">Review submitted work</Link><Link href="/principal/communication">Message teacher</Link><Link href="/principal/academics">View academic impact</Link></div>
          <label className="principal-note-field">Private principal note<textarea value={principalNote} onChange={(e) => { setPrincipalNote(e.target.value); setSaved(false); }} placeholder="Add support, observation or follow-up note..." /></label>
          <button className="principal-save-note" onClick={() => setSaved(true)}>{saved ? "Note saved" : "Save note"}</button>
        </aside>
      </section>

      <section className="principal-module-card principal-teacher-guidance">
        <h2>Principal guidance</h2>
        <div className="principal-capabilities">
          <div><span>SECTION SCOPE</span><strong>This Principal manages Secondary teachers only. Primary and Nursery have separate leaders and permissions.</strong></div>
          <div><span>ASSIGNMENT AUTHORITY</span><strong>Use Teaching Assignments to allocate qualified teachers to subjects and classes before timetable finalization.</strong></div>
          <div><span>SUPPORT FIRST</span><strong>Use indicators to identify where coaching, workload adjustment or follow-up may help rather than reducing quality to one score.</strong></div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="principal-teacher-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
