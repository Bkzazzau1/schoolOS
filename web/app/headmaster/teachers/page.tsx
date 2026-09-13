"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TeacherStatus = "Strong" | "On track" | "Needs support";
type Teacher = {
  id: string;
  name: string;
  initials: string;
  classTeacherOf: string | null;
  specialties: string[];
  weeklyPeriods: number;
  attendance: number;
  punctuality: number;
  planning: number;
  assessment: number;
  pupilSupport: number;
  workload: "Light" | "Balanced" | "Heavy";
  status: TeacherStatus;
  supportNote: string;
};

const teachers: Teacher[] = [
  { id: "PRI-T01", name: "Mrs. Zainab Musa", initials: "ZM", classTeacherOf: "Primary 1", specialties: ["English", "Social Studies"], weeklyPeriods: 22, attendance: 98, punctuality: 97, planning: 94, assessment: 91, pupilSupport: 93, workload: "Balanced", status: "Strong", supportNote: "Strong class routines and literacy follow-up. Continue current reading-support approach." },
  { id: "PRI-T02", name: "Mr. David Joseph", initials: "DJ", classTeacherOf: "Primary 4", specialties: ["Mathematics", "Computer Studies"], weeklyPeriods: 24, attendance: 96, punctuality: 94, planning: 89, assessment: 90, pupilSupport: 86, workload: "Heavy", status: "On track", supportNote: "Good numeracy delivery. Workload is near the section threshold, so avoid adding periods without review." },
  { id: "PRI-T03", name: "Mrs. Ruth James", initials: "RJ", classTeacherOf: "Primary 3", specialties: ["English", "Creative Arts"], weeklyPeriods: 21, attendance: 91, punctuality: 88, planning: 82, assessment: 79, pupilSupport: 84, workload: "Balanced", status: "Needs support", supportNote: "Primary 3 attendance and literacy are both under watch. Schedule a supportive review rather than treating one metric in isolation." },
  { id: "PRI-T04", name: "Mr. Kabiru Lawal", initials: "KL", classTeacherOf: "Primary 5", specialties: ["Basic Science", "Physical & Health Education"], weeklyPeriods: 23, attendance: 95, punctuality: 93, planning: 90, assessment: 88, pupilSupport: 89, workload: "Balanced", status: "On track", supportNote: "Steady teaching indicators with good science assessment completion." },
  { id: "PRI-T05", name: "Mrs. Esther Daniel", initials: "ED", classTeacherOf: "Primary 2", specialties: ["Social Studies", "Civic Education"], weeklyPeriods: 18, attendance: 99, punctuality: 98, planning: 96, assessment: 92, pupilSupport: 95, workload: "Balanced", status: "Strong", supportNote: "Strong attendance, planning and pupil follow-up. Suitable for mentoring support within the section." },
  { id: "PRI-T06", name: "Mr. Musa Bello", initials: "MB", classTeacherOf: null, specialties: ["Mathematics", "Basic Science"], weeklyPeriods: 20, attendance: 94, punctuality: 92, planning: 87, assessment: 85, pupilSupport: 82, workload: "Balanced", status: "On track", supportNote: "Specialist subject teacher with capacity for limited additional responsibility." },
  { id: "PRI-T07", name: "Mrs. Halima Sani", initials: "HS", classTeacherOf: null, specialties: ["Computer Studies", "Creative Arts"], weeklyPeriods: 16, attendance: 97, punctuality: 96, planning: 91, assessment: 86, pupilSupport: 90, workload: "Light", status: "Strong", supportNote: "Light current load. Could absorb additional specialist periods if needed." },
];

export default function HeadmasterTeachersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [responsibilityFilter, setResponsibilityFilter] = useState("All teachers");
  const [selectedId, setSelectedId] = useState(teachers[0].id);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => teachers.filter((teacher) => {
    const haystack = `${teacher.name} ${teacher.specialties.join(" ")} ${teacher.classTeacherOf ?? "subject teacher"}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesStatus = statusFilter === "All statuses" || teacher.status === statusFilter;
    const matchesResponsibility = responsibilityFilter === "All teachers" || (responsibilityFilter === "Class teachers" ? Boolean(teacher.classTeacherOf) : !teacher.classTeacherOf);
    return matchesQuery && matchesStatus && matchesResponsibility;
  }), [query, statusFilter, responsibilityFilter]);

  const selected = teachers.find((teacher) => teacher.id === selectedId) ?? teachers[0];
  const classTeacherCount = teachers.filter((teacher) => teacher.classTeacherOf).length;
  const supportCount = teachers.filter((teacher) => teacher.status === "Needs support").length;
  const averageAttendance = Math.round(teachers.reduce((sum, teacher) => sum + teacher.attendance, 0) / teachers.length);
  const heavyCount = teachers.filter((teacher) => teacher.workload === "Heavy").length;

  return (
    <main className="headmaster-module-shell primary-teachers-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Teachers</h1>
          <p>Review Primary teaching responsibility, specialties, workload, attendance, planning and pupil-support indicators.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/assignments">Teaching Assignments</Link>
          <Link href="/headmaster/academics">Academics</Link>
        </div>
      </header>

      <section className="primary-teacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Kaduna Campus · Headmistress workspace</small></div>
        <p>Only Primary teachers are shown here. Nursery and Secondary staffing remain outside this leadership view.</p>
      </section>

      <section className="primary-teacher-kpis">
        <article><span>Primary teachers</span><strong>{teachers.length}</strong><small>Prototype staff records</small></article>
        <article><span>Class teachers</span><strong>{classTeacherCount}/6</strong><small>Primary 6 still unassigned</small></article>
        <article><span>Staff attendance</span><strong>{averageAttendance}%</strong><small>Current section average</small></article>
        <article><span>Needs support</span><strong>{supportCount}</strong><small>Support-oriented follow-up</small></article>
        <article><span>Heavy workload</span><strong>{heavyCount}</strong><small>Review before adding periods</small></article>
      </section>

      <section className="primary-teacher-workspace">
        <article className="headmaster-module-card primary-teacher-directory">
          <header>
            <div><h2>Primary teacher directory</h2><p>Select a teacher to inspect responsibilities and current indicators.</p></div>
            <div className="primary-teacher-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search teacher, class or specialty..." />
              <select value={responsibilityFilter} onChange={(e) => setResponsibilityFilter(e.target.value)}><option>All teachers</option><option>Class teachers</option><option>Subject teachers</option></select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Needs support</option></select>
            </div>
          </header>

          <div className="primary-teacher-table-wrap">
            <div className="primary-teacher-table-head"><span>Teacher</span><span>Responsibility</span><span>Attendance</span><span>Planning</span><span>Workload</span><span>Status</span></div>
            {filtered.map((teacher) => (
              <button key={teacher.id} className={`primary-teacher-row ${teacher.id === selected.id ? "selected" : ""}`} onClick={() => { setSelectedId(teacher.id); setNote(""); setSaved(false); }}>
                <div className="primary-teacher-person"><span>{teacher.initials}</span><div><strong>{teacher.name}</strong><small>{teacher.specialties.join(" · ")}</small></div></div>
                <div><strong>{teacher.classTeacherOf ?? "Subject specialist"}</strong><small>{teacher.classTeacherOf ? "Class teacher" : "No class-teacher assignment"}</small></div>
                <b>{teacher.attendance}%</b>
                <b>{teacher.planning}%</b>
                <span className={`primary-workload ${teacher.workload.toLowerCase()}`}>{teacher.weeklyPeriods} periods · {teacher.workload}</span>
                <em className={`primary-teacher-status ${teacher.status.toLowerCase().replaceAll(" ", "-")}`}>{teacher.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headmaster-module-card primary-teacher-detail">
          <div className="primary-teacher-detail-head"><span>{selected.initials}</span><div><small>{selected.id}</small><h2>{selected.name}</h2><p>{selected.classTeacherOf ? `Class Teacher · ${selected.classTeacherOf}` : "Subject Specialist"}</p></div></div>

          <div className="primary-teacher-specialties"><span>Teaching specialties</span><div>{selected.specialties.map((subject) => <b key={subject}>{subject}</b>)}</div></div>

          <div className="primary-teacher-metric-list">
            <Metric label="Attendance" value={selected.attendance} />
            <Metric label="Punctuality" value={selected.punctuality} />
            <Metric label="Planning" value={selected.planning} />
            <Metric label="Assessment completion" value={selected.assessment} />
            <Metric label="Pupil-support follow-up" value={selected.pupilSupport} />
          </div>

          <div className="primary-teacher-load-card"><span>Current workload</span><strong>{selected.weeklyPeriods} periods/week</strong><b className={selected.workload.toLowerCase()}>{selected.workload}</b></div>

          <div className="primary-teacher-insight"><span>HEADMISTRESS SUPPORT NOTE</span><p>{selected.supportNote}</p></div>

          <div className="primary-teacher-actions">
            <Link href="/headmaster/assignments">Review assignments</Link>
            <Link href="/headmaster/timetable">View timetable</Link>
            <Link href="/headmaster/communication">Message teacher</Link>
          </div>

          <label className="primary-teacher-note">Private leadership note<textarea value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} placeholder="Add support, coaching or follow-up note..." /></label>
          <button className="primary-teacher-save" onClick={() => setSaved(true)}>{saved ? "Note saved" : "Save note"}</button>
        </aside>
      </section>

      <section className="headmaster-module-card primary-teacher-guidance">
        <div><span className="page-kicker">PRIMARY LEADERSHIP PRINCIPLE</span><h2>Support teachers with context, not a single ranking</h2></div>
        <div>
          <article><span>CLASS RESPONSIBILITY</span><strong>Class-teacher duties and subject-teacher workload should be visible together.</strong></article>
          <article><span>PUPIL SUPPORT</span><strong>Literacy, numeracy and welfare follow-up should inform coaching conversations.</strong></article>
          <article><span>WORKLOAD</span><strong>Check existing periods and class responsibility before adding another assignment.</strong></article>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="primary-teacher-metric"><div><span>{label}</span><b>{value}%</b></div><section><i style={{ width: `${value}%` }} /></section></div>;
}
