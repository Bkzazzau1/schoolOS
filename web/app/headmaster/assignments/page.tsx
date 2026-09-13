"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Teacher = {
  id: string;
  name: string;
  specialties: string[];
  canBeClassTeacher: boolean;
  weeklyPeriods: number;
};

type SubjectAssignment = {
  id: string;
  className: string;
  subject: string;
  teacherId: string;
  periodsPerWeek: number;
};

type ClassTeacherAssignment = {
  className: string;
  teacherId: string;
};

const primaryClasses = ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"];
const primarySubjects = ["English", "Mathematics", "Basic Science", "Social Studies", "Computer Studies", "Civic Education", "Creative Arts", "Physical & Health Education"];

const teachers: Teacher[] = [
  { id: "PRI-T01", name: "Mrs. Zainab Musa", specialties: ["English", "Social Studies"], canBeClassTeacher: true, weeklyPeriods: 22 },
  { id: "PRI-T02", name: "Mr. David Joseph", specialties: ["Mathematics", "Computer Studies"], canBeClassTeacher: true, weeklyPeriods: 24 },
  { id: "PRI-T03", name: "Mrs. Ruth James", specialties: ["English", "Creative Arts"], canBeClassTeacher: true, weeklyPeriods: 21 },
  { id: "PRI-T04", name: "Mr. Kabiru Lawal", specialties: ["Basic Science", "Physical & Health Education"], canBeClassTeacher: true, weeklyPeriods: 23 },
  { id: "PRI-T05", name: "Mrs. Esther Daniel", specialties: ["Social Studies", "Civic Education"], canBeClassTeacher: true, weeklyPeriods: 18 },
  { id: "PRI-T06", name: "Mr. Musa Bello", specialties: ["Mathematics", "Basic Science"], canBeClassTeacher: false, weeklyPeriods: 20 },
  { id: "PRI-T07", name: "Mrs. Halima Sani", specialties: ["Computer Studies", "Creative Arts"], canBeClassTeacher: false, weeklyPeriods: 16 },
];

const initialClassTeachers: ClassTeacherAssignment[] = [
  { className: "Primary 1", teacherId: "PRI-T01" },
  { className: "Primary 2", teacherId: "PRI-T05" },
  { className: "Primary 3", teacherId: "PRI-T03" },
  { className: "Primary 4", teacherId: "PRI-T02" },
  { className: "Primary 5", teacherId: "PRI-T04" },
];

const initialSubjects: SubjectAssignment[] = [
  { id: "PRI-ASN-01", className: "Primary 1", subject: "Mathematics", teacherId: "PRI-T02", periodsPerWeek: 5 },
  { id: "PRI-ASN-02", className: "Primary 1", subject: "English", teacherId: "PRI-T01", periodsPerWeek: 5 },
  { id: "PRI-ASN-03", className: "Primary 2", subject: "Basic Science", teacherId: "PRI-T04", periodsPerWeek: 3 },
  { id: "PRI-ASN-04", className: "Primary 3", subject: "English", teacherId: "PRI-T03", periodsPerWeek: 5 },
  { id: "PRI-ASN-05", className: "Primary 4", subject: "Mathematics", teacherId: "PRI-T02", periodsPerWeek: 5 },
  { id: "PRI-ASN-06", className: "Primary 5", subject: "Basic Science", teacherId: "PRI-T04", periodsPerWeek: 4 },
  { id: "PRI-ASN-07", className: "Primary 6", subject: "Computer Studies", teacherId: "PRI-T07", periodsPerWeek: 3 },
];

const unassignedSeed = [
  { className: "Primary 2", subject: "Computer Studies", periods: 3 },
  { className: "Primary 3", subject: "Mathematics", periods: 5 },
  { className: "Primary 6", subject: "Civic Education", periods: 3 },
];

export default function HeadmasterAssignmentsPage() {
  const [classTeachers, setClassTeachers] = useState(initialClassTeachers);
  const [subjectAssignments, setSubjectAssignments] = useState(initialSubjects);
  const [activeTab, setActiveTab] = useState<"Class Teachers" | "Subject Teachers">("Class Teachers");
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Primary 3");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedTeacher, setSelectedTeacher] = useState("PRI-T02");
  const [periods, setPeriods] = useState(5);
  const [notice, setNotice] = useState("");

  const visibleSubjects = useMemo(() => subjectAssignments.filter((item) => {
    const teacher = teachers.find((candidate) => candidate.id === item.teacherId);
    return `${item.className} ${item.subject} ${teacher?.name ?? ""}`.toLowerCase().includes(query.toLowerCase());
  }), [subjectAssignments, query]);

  const qualifiedTeachers = teachers.filter((teacher) => teacher.specialties.includes(selectedSubject));
  const classTeacherCandidates = teachers.filter((teacher) => teacher.canBeClassTeacher);
  const unassignedClassTeachers = primaryClasses.filter((className) => !classTeachers.some((item) => item.className === className));
  const heavyTeachers = teachers.filter((teacher) => teacher.weeklyPeriods > 23).length;

  function assignClassTeacher(className: string, teacherId: string) {
    setClassTeachers((current) => {
      const exists = current.some((item) => item.className === className);
      return exists ? current.map((item) => item.className === className ? { ...item, teacherId } : item) : [...current, { className, teacherId }];
    });
    const teacher = teachers.find((item) => item.id === teacherId);
    setNotice(`${teacher?.name ?? "Teacher"} assigned as class teacher for ${className}. Prototype change saved locally.`);
  }

  function addSubjectAssignment() {
    const teacher = teachers.find((item) => item.id === selectedTeacher);
    if (!teacher) return;
    if (!teacher.specialties.includes(selectedSubject)) {
      setNotice(`${teacher.name} is not listed for ${selectedSubject}. Choose a teacher whose Primary specialty includes this subject.`);
      return;
    }
    const duplicate = subjectAssignments.some((item) => item.className === selectedClass && item.subject === selectedSubject);
    if (duplicate) {
      setNotice(`${selectedClass} already has a ${selectedSubject} teacher. Reassign the existing record instead.`);
      return;
    }
    const id = `PRI-ASN-${String(subjectAssignments.length + 1).padStart(2, "0")}`;
    setSubjectAssignments((current) => [...current, { id, className: selectedClass, subject: selectedSubject, teacherId: selectedTeacher, periodsPerWeek: periods }]);
    setNotice(`${teacher.name} assigned to ${selectedSubject} for ${selectedClass}. Prototype change saved locally.`);
  }

  function reassignSubject(id: string, teacherId: string) {
    const assignment = subjectAssignments.find((item) => item.id === id);
    const teacher = teachers.find((item) => item.id === teacherId);
    if (!assignment || !teacher) return;
    if (!teacher.specialties.includes(assignment.subject)) {
      setNotice(`${teacher.name} is not listed for ${assignment.subject}. Assignment was not changed.`);
      return;
    }
    setSubjectAssignments((current) => current.map((item) => item.id === id ? { ...item, teacherId } : item));
    setNotice(`${assignment.className} · ${assignment.subject} reassigned to ${teacher.name}.`);
  }

  function useGap(className: string, subject: string, periodsPerWeek: number) {
    setActiveTab("Subject Teachers");
    setSelectedClass(className);
    setSelectedSubject(subject);
    setPeriods(periodsPerWeek);
    const first = teachers.find((teacher) => teacher.specialties.includes(subject));
    if (first) setSelectedTeacher(first.id);
  }

  return (
    <main className="headmaster-module-shell primary-assignments-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Teaching Assignments</h1>
          <p>Assign class teachers and subject teachers across Primary 1–6 without affecting Nursery or Secondary.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/teachers">Teachers</Link>
          <Link href="/headmaster/timetable">Timetable</Link>
        </div>
      </header>

      <section className="primary-assignment-scope">
        <div><span>ACTIVE AUTHORITY</span><strong>Primary School</strong><small>Kaduna Campus · Headmistress: Mrs. Hauwa Sule</small></div>
        <p>This workspace controls Primary teaching assignments only. Nursery and Secondary staff are outside this UI scope.</p>
      </section>

      <section className="primary-assignment-kpis">
        <article><span>Primary classes</span><strong>6</strong><small>Primary 1–6</small></article>
        <article><span>Class teachers assigned</span><strong>{classTeachers.length}/6</strong><small>{unassignedClassTeachers.length} class gap</small></article>
        <article><span>Subject assignments</span><strong>{subjectAssignments.length}</strong><small>Prototype records</small></article>
        <article><span>Subject gaps</span><strong>{unassignedSeed.length}</strong><small>Needs leadership action</small></article>
        <article><span>Heavy workload</span><strong>{heavyTeachers}</strong><small>Above 23 periods/week</small></article>
      </section>

      <section className="primary-assignment-tabs">
        <button className={activeTab === "Class Teachers" ? "active" : ""} onClick={() => setActiveTab("Class Teachers")}>Class Teachers</button>
        <button className={activeTab === "Subject Teachers" ? "active" : ""} onClick={() => setActiveTab("Subject Teachers")}>Subject Teachers</button>
      </section>

      {activeTab === "Class Teachers" ? (
        <section className="headmaster-module-card primary-class-teacher-card">
          <header><div><h2>Class teacher assignments</h2><p>Each Primary class should have one accountable class teacher.</p></div></header>
          <div className="primary-class-teacher-grid">
            {primaryClasses.map((className) => {
              const assignment = classTeachers.find((item) => item.className === className);
              const teacher = teachers.find((item) => item.id === assignment?.teacherId);
              return (
                <article key={className} className={!assignment ? "missing" : ""}>
                  <div><span>{className}</span><strong>{teacher?.name ?? "No class teacher"}</strong><small>{teacher ? `${teacher.weeklyPeriods} current weekly periods` : "Assignment required"}</small></div>
                  <label>Class teacher<select value={assignment?.teacherId ?? ""} onChange={(e) => assignClassTeacher(className, e.target.value)}><option value="">Select teacher</option>{classTeacherCandidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}</select></label>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <>
          <section className="primary-assignment-two-column">
            <article className="headmaster-module-card primary-subject-create">
              <header><div><h2>Assign subject teacher</h2><p>Create a Primary class-subject teaching responsibility.</p></div></header>
              <div className="primary-assignment-form">
                <label>Class<select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>{primaryClasses.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Subject<select value={selectedSubject} onChange={(e) => { const value = e.target.value; setSelectedSubject(value); const first = teachers.find((teacher) => teacher.specialties.includes(value)); setSelectedTeacher(first?.id ?? ""); }}>{primarySubjects.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Qualified teacher<select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}><option value="">Select teacher</option>{qualifiedTeachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name} · {teacher.weeklyPeriods} periods</option>)}</select></label>
                <label>Periods / week<input type="number" min={1} max={10} value={periods} onChange={(e) => setPeriods(Number(e.target.value))} /></label>
              </div>
              <button className="primary-assignment-primary" onClick={addSubjectAssignment}>Assign subject teacher</button>
            </article>

            <aside className="headmaster-module-card primary-subject-gaps">
              <header><div><h2>Unassigned subjects</h2><p>Resolve these before timetable completion.</p></div></header>
              <div>{unassignedSeed.map((item) => <button key={`${item.className}-${item.subject}`} onClick={() => useGap(item.className, item.subject, item.periods)}><span><strong>{item.className} · {item.subject}</strong><small>{item.periods} periods/week</small></span><b>Assign →</b></button>)}</div>
            </aside>
          </section>

          <section className="headmaster-module-card primary-subject-table-card">
            <header className="primary-subject-table-head"><div><h2>Current subject assignments</h2><p>Reassign teachers while preserving Primary section boundaries.</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class, subject or teacher..." /></header>
            <div className="primary-subject-table">
              <div className="primary-subject-row heading"><span>Class</span><span>Subject</span><span>Teacher</span><span>Periods</span><span>Workload</span></div>
              {visibleSubjects.map((assignment) => {
                const teacher = teachers.find((item) => item.id === assignment.teacherId)!;
                const candidates = teachers.filter((item) => item.specialties.includes(assignment.subject));
                return <div className="primary-subject-row" key={assignment.id}><strong>{assignment.className}</strong><span>{assignment.subject}</span><select value={assignment.teacherId} onChange={(e) => reassignSubject(assignment.id, e.target.value)}>{candidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name}</option>)}</select><span>{assignment.periodsPerWeek}/week</span><b className={teacher.weeklyPeriods > 23 ? "heavy" : "balanced"}>{teacher.weeklyPeriods} periods</b></div>;
              })}
            </div>
          </section>
        </>
      )}

      {notice && <div className="primary-assignment-notice">{notice}</div>}

      <section className="headmaster-module-card primary-workload-card">
        <header><div><h2>Primary teacher workload</h2><p>Use workload as a planning signal before adding more periods.</p></div></header>
        <div className="primary-workload-grid">{teachers.map((teacher) => <div key={teacher.id}><div><strong>{teacher.name}</strong><small>{teacher.specialties.join(" · ")}</small></div><span>{teacher.weeklyPeriods} periods</span><b className={teacher.weeklyPeriods > 23 ? "heavy" : teacher.weeklyPeriods < 18 ? "light" : "balanced"}>{teacher.weeklyPeriods > 23 ? "Heavy" : teacher.weeklyPeriods < 18 ? "Light" : "Balanced"}</b></div>)}</div>
      </section>

      <section className="headmaster-module-card primary-assignment-rule">
        <span className="page-kicker">PRIMARY GOVERNANCE RULE</span>
        <h2>Class responsibility and subject expertise are separate</h2>
        <p>A class teacher remains responsible for the general Primary class, while specialist teachers can be assigned to Mathematics, Science, Computing, Arts and other subjects. The Headmaster/Headmistress controls both assignment types only inside Primary School.</p>
      </section>
    </main>
  );
}
