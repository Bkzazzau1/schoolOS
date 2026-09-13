"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { academicSections, activeLeadershipScope } from "../../../lib/academic-sections";

type Teacher = {
  id: string;
  name: string;
  department: string;
  qualifiedSubjects: string[];
  weeklyPeriods: number;
};

type Assignment = {
  id: string;
  className: string;
  subject: string;
  teacherId: string;
  periodsPerWeek: number;
};

const teachers: Teacher[] = [
  { id: "TCH-001", name: "Mrs. Amina Yusuf", department: "Mathematics", qualifiedSubjects: ["Mathematics", "Further Mathematics"], weeklyPeriods: 24 },
  { id: "TCH-002", name: "Mr. Daniel John", department: "Mathematics", qualifiedSubjects: ["Mathematics"], weeklyPeriods: 19 },
  { id: "TCH-003", name: "Mrs. Fatima Bello", department: "Languages", qualifiedSubjects: ["English Language", "Literature"], weeklyPeriods: 26 },
  { id: "TCH-004", name: "Mr. Peter James", department: "Science", qualifiedSubjects: ["Basic Science", "Physics"], weeklyPeriods: 21 },
  { id: "TCH-005", name: "Mrs. Grace Musa", department: "Humanities", qualifiedSubjects: ["Social Studies", "Civic Education"], weeklyPeriods: 17 },
  { id: "TCH-006", name: "Mr. Samuel Bello", department: "Computing", qualifiedSubjects: ["Computer Studies"], weeklyPeriods: 18 },
];

const subjects = [
  "Mathematics",
  "English Language",
  "Basic Science",
  "Social Studies",
  "Civic Education",
  "Computer Studies",
  "Physics",
  "Further Mathematics",
  "Literature",
];

const seedAssignments: Assignment[] = [
  { id: "ASN-001", className: "JSS 1A", subject: "Mathematics", teacherId: "TCH-002", periodsPerWeek: 5 },
  { id: "ASN-002", className: "JSS 1A", subject: "English Language", teacherId: "TCH-003", periodsPerWeek: 5 },
  { id: "ASN-003", className: "JSS 2A", subject: "Mathematics", teacherId: "TCH-001", periodsPerWeek: 5 },
  { id: "ASN-004", className: "JSS 2A", subject: "Basic Science", teacherId: "TCH-004", periodsPerWeek: 4 },
  { id: "ASN-005", className: "JSS 2B", subject: "English Language", teacherId: "TCH-003", periodsPerWeek: 5 },
  { id: "ASN-006", className: "JSS 3A", subject: "Civic Education", teacherId: "TCH-005", periodsPerWeek: 3 },
  { id: "ASN-007", className: "SS 1A", subject: "Physics", teacherId: "TCH-004", periodsPerWeek: 4 },
  { id: "ASN-008", className: "SS 2A", subject: "Computer Studies", teacherId: "TCH-006", periodsPerWeek: 3 },
];

const unassigned = [
  { className: "JSS 2B", subject: "Mathematics", periods: 5 },
  { className: "SS 1A", subject: "Further Mathematics", periods: 4 },
  { className: "SS 2A", subject: "Literature", periods: 3 },
];

export default function PrincipalAssignmentsPage() {
  const [assignments, setAssignments] = useState(seedAssignments);
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All classes");
  const [newClass, setNewClass] = useState("JSS 2B");
  const [newSubject, setNewSubject] = useState("Mathematics");
  const [newTeacher, setNewTeacher] = useState("TCH-001");
  const [periods, setPeriods] = useState(5);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => assignments.filter((assignment) => {
    const teacher = teachers.find((item) => item.id === assignment.teacherId);
    const matchesQuery = `${assignment.className} ${assignment.subject} ${teacher?.name ?? ""}`.toLowerCase().includes(query.toLowerCase());
    const matchesClass = classFilter === "All classes" || assignment.className === classFilter;
    return matchesQuery && matchesClass;
  }), [assignments, query, classFilter]);

  const qualifiedTeachers = teachers.filter((teacher) => teacher.qualifiedSubjects.includes(newSubject));
  const overloaded = teachers.filter((teacher) => teacher.weeklyPeriods > 24).length;

  function addAssignment() {
    const teacher = teachers.find((item) => item.id === newTeacher);
    if (!teacher) return;
    if (!teacher.qualifiedSubjects.includes(newSubject)) {
      setNotice(`${teacher.name} is not listed as qualified for ${newSubject}. Choose a qualified teacher or update staff qualification data first.`);
      return;
    }
    const duplicate = assignments.some((assignment) => assignment.className === newClass && assignment.subject === newSubject);
    if (duplicate) {
      setNotice(`${newClass} already has a ${newSubject} assignment. Edit the existing row instead of creating a duplicate.`);
      return;
    }
    setAssignments((current) => [
      ...current,
      { id: `ASN-${String(current.length + 1).padStart(3, "0")}`, className: newClass, subject: newSubject, teacherId: newTeacher, periodsPerWeek: periods },
    ]);
    setNotice(`${teacher.name} assigned to ${newSubject} for ${newClass}. Prototype change saved locally.`);
  }

  function updateTeacher(assignmentId: string, teacherId: string) {
    const assignment = assignments.find((item) => item.id === assignmentId);
    const teacher = teachers.find((item) => item.id === teacherId);
    if (!assignment || !teacher) return;
    if (!teacher.qualifiedSubjects.includes(assignment.subject)) {
      setNotice(`${teacher.name} is not listed as qualified for ${assignment.subject}. Assignment was not changed.`);
      return;
    }
    setAssignments((current) => current.map((item) => item.id === assignmentId ? { ...item, teacherId } : item));
    setNotice(`${assignment.className} · ${assignment.subject} reassigned to ${teacher.name}.`);
  }

  return (
    <main className="principal-module-shell principal-assignments-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · SECONDARY SCHOOL</span>
          <h1>Teaching Assignments</h1>
          <p>Assign teachers to subjects and classes inside your authorized academic section.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/teachers">Teachers</Link>
          <Link href="/principal/timetable">Timetable</Link>
        </div>
      </header>

      <section className="assignment-scope-banner">
        <div>
          <span>ACTIVE LEADERSHIP SCOPE</span>
          <strong>{activeLeadershipScope.name}</strong>
          <small>{activeLeadershipScope.campus} · {activeLeadershipScope.leaderTitle}: {activeLeadershipScope.leaderName}</small>
        </div>
        <p>You can create or change teaching assignments only for this section. Primary and Nursery leadership remain separate memberships with separate permissions.</p>
      </section>

      <section className="leadership-structure-grid">
        {academicSections.map((section) => (
          <article className={`leadership-section-card ${section.editableByActiveUser ? "active" : "locked"}`} key={section.id}>
            <span>{section.stage.toUpperCase()}</span>
            <h2>{section.name}</h2>
            <strong>{section.leaderTitle}</strong>
            <p>{section.leaderName}</p>
            <small>{section.classes.length} configured classes · {section.campus}</small>
            <b>{section.editableByActiveUser ? "Your active scope" : `Managed by ${section.leaderTitle}`}</b>
          </article>
        ))}
      </section>

      <section className="assignment-kpis">
        <article><span>Assigned class-subjects</span><strong>{assignments.length}</strong><small>Current prototype records</small></article>
        <article><span>Unassigned</span><strong>{unassigned.length}</strong><small>Requires section leader action</small></article>
        <article><span>Secondary teachers</span><strong>{teachers.length}</strong><small>Available in this scope</small></article>
        <article><span>Heavy workload</span><strong>{overloaded}</strong><small>Above 24 periods/week</small></article>
      </section>

      <section className="principal-assignments-grid">
        <article className="principal-module-card assignment-create-card">
          <div className="assignment-card-head">
            <div><h2>Assign teacher</h2><p>Create a class-subject teaching responsibility.</p></div>
          </div>
          <div className="assignment-form-grid">
            <label>Class<select value={newClass} onChange={(e) => setNewClass(e.target.value)}>{activeLeadershipScope.classes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Subject<select value={newSubject} onChange={(e) => { const subject = e.target.value; setNewSubject(subject); const first = teachers.find((teacher) => teacher.qualifiedSubjects.includes(subject)); if (first) setNewTeacher(first.id); }}>{subjects.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Qualified teacher<select value={newTeacher} onChange={(e) => setNewTeacher(e.target.value)}>{qualifiedTeachers.map((teacher) => <option value={teacher.id} key={teacher.id}>{teacher.name} · {teacher.weeklyPeriods} periods</option>)}</select></label>
            <label>Periods / week<input type="number" min={1} max={10} value={periods} onChange={(e) => setPeriods(Number(e.target.value))} /></label>
          </div>
          <button className="assignment-primary-button" onClick={addAssignment}>Assign teacher</button>
          {notice && <div className="assignment-notice">{notice}</div>}
        </article>

        <aside className="principal-module-card assignment-unassigned-card">
          <div className="assignment-card-head"><div><h2>Unassigned subjects</h2><p>These need a teacher before timetable completion.</p></div></div>
          <div className="unassigned-subject-list">
            {unassigned.map((item) => <button key={`${item.className}-${item.subject}`} onClick={() => { setNewClass(item.className); setNewSubject(item.subject); const first = teachers.find((teacher) => teacher.qualifiedSubjects.includes(item.subject)); if (first) setNewTeacher(first.id); }}><div><strong>{item.className} · {item.subject}</strong><small>{item.periods} periods/week</small></div><span>Assign →</span></button>)}
          </div>
        </aside>
      </section>

      <section className="principal-module-card assignment-table-card">
        <header className="assignment-table-head">
          <div><h2>Current teaching assignments</h2><p>The section leader can reassign a subject without changing another section.</p></div>
          <div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class, subject or teacher..." /><select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All classes</option>{activeLeadershipScope.classes.map((item) => <option key={item}>{item}</option>)}</select></div>
        </header>
        <div className="assignment-table">
          <div className="assignment-table-row heading"><span>Class</span><span>Subject</span><span>Teacher</span><span>Periods</span><span>Load</span></div>
          {filtered.map((assignment) => {
            const teacher = teachers.find((item) => item.id === assignment.teacherId)!;
            const candidates = teachers.filter((item) => item.qualifiedSubjects.includes(assignment.subject));
            return (
              <div className="assignment-table-row" key={assignment.id}>
                <strong>{assignment.className}</strong>
                <div><strong>{assignment.subject}</strong><small>{teacher.department}</small></div>
                <select value={assignment.teacherId} onChange={(e) => updateTeacher(assignment.id, e.target.value)}>{candidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}</select>
                <span>{assignment.periodsPerWeek}/week</span>
                <b className={teacher.weeklyPeriods > 24 ? "heavy" : "balanced"}>{teacher.weeklyPeriods} periods</b>
              </div>
            );
          })}
        </div>
      </section>

      <section className="principal-module-card assignment-governance-card">
        <div><span className="page-kicker">SECTION GOVERNANCE RULE</span><h2>Leadership is separated by academic section</h2></div>
        <div className="assignment-governance-flow"><span>Proprietor / Authorized Owner</span><b>→</b><span>Creates sections & appoints leaders</span><b>→</b><span>Principal / Headmaster / Headmistress</span><b>→</b><span>Assigns teachers inside own section</span></div>
        <p>A Secondary Principal cannot assign Primary teachers unless that person also has a valid Primary leadership membership. A Primary Headmaster/Headmistress cannot alter Secondary assignments. Permissions are recalculated from the active school, campus, section and role.</p>
      </section>
    </main>
  );
}
