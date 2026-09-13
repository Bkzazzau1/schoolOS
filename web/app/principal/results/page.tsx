"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schoolProfile } from "../../../lib/school-profile";

type ReleaseState = "Draft" | "Awaiting approval" | "Approved" | "Released";

type ClassResult = {
  className: string;
  students: number;
  average: number;
  passRate: number;
  highest: number;
  lowest: number;
  complete: number;
  reportsReady: number;
  release: ReleaseState;
  trend: number;
};

type StudentResult = {
  id: string;
  name: string;
  className: string;
  average: number;
  position: string;
  attendance: number;
  reportStatus: ReleaseState;
  teacherComment: string;
};

const classes: ClassResult[] = [
  { className: "JSS 1A", students: 44, average: 72, passRate: 91, highest: 94, lowest: 46, complete: 100, reportsReady: 44, release: "Approved", trend: 3.2 },
  { className: "JSS 2A", students: 42, average: 76, passRate: 95, highest: 96, lowest: 52, complete: 100, reportsReady: 42, release: "Released", trend: 4.7 },
  { className: "JSS 2B", students: 39, average: 61, passRate: 74, highest: 89, lowest: 38, complete: 92, reportsReady: 35, release: "Awaiting approval", trend: -6.8 },
  { className: "JSS 3A", students: 41, average: 79, passRate: 97, highest: 98, lowest: 55, complete: 100, reportsReady: 41, release: "Approved", trend: 6.4 },
  { className: "SS 1A", students: 37, average: 68, passRate: 86, highest: 92, lowest: 44, complete: 94, reportsReady: 34, release: "Draft", trend: -1.9 },
  { className: "SS 2A", students: 35, average: 74, passRate: 93, highest: 95, lowest: 51, complete: 100, reportsReady: 35, release: "Approved", trend: 2.1 },
];

const students: StudentResult[] = [
  { id: "STU-001", name: "Student Alpha", className: "JSS 2A", average: 86, position: "4th of 42", attendance: 96, reportStatus: "Released", teacherComment: "Strong progress. Keep practising multi-step problems." },
  { id: "STU-002", name: "Student Beta", className: "JSS 2A", average: 61, position: "21st of 42", attendance: 88, reportStatus: "Released", teacherComment: "Improving steadily. Needs more revision in algebra." },
  { id: "STU-003", name: "Student Gamma", className: "JSS 2B", average: 48, position: "31st of 39", attendance: 79, reportStatus: "Awaiting approval", teacherComment: "Requires targeted revision and better attendance consistency." },
  { id: "STU-004", name: "Student Delta", className: "JSS 3A", average: 91, position: "2nd of 41", attendance: 98, reportStatus: "Approved", teacherComment: "Excellent academic performance and class participation." },
  { id: "STU-005", name: "Student Epsilon", className: "SS 1A", average: 68, position: "14th of 37", attendance: 91, reportStatus: "Draft", teacherComment: "Stable overall performance. More practice is needed in Physics." },
];

const subjects = [
  { subject: "Mathematics", ca: 18, exam: 64, total: 82, grade: "A", remark: "Excellent" },
  { subject: "English Language", ca: 16, exam: 58, total: 74, grade: "B", remark: "Very Good" },
  { subject: "Basic Science", ca: 17, exam: 61, total: 78, grade: "B", remark: "Very Good" },
  { subject: "Social Studies", ca: 15, exam: 55, total: 70, grade: "B", remark: "Good" },
  { subject: "Computer Studies", ca: 19, exam: 67, total: 86, grade: "A", remark: "Excellent" },
];

export default function PrincipalResultsPage() {
  const [classFilter, setClassFilter] = useState("All classes");
  const [releaseFilter, setReleaseFilter] = useState("All states");
  const [query, setQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("STU-003");
  const [principalComment, setPrincipalComment] = useState("Good effort. Improve consistency in attendance and revision.");
  const [approved, setApproved] = useState(false);

  const selectedStudent = students.find((student) => student.id === selectedStudentId) ?? students[0];

  const filteredClasses = useMemo(() => classes.filter((row) => {
    const matchesClass = classFilter === "All classes" || row.className === classFilter;
    const matchesRelease = releaseFilter === "All states" || row.release === releaseFilter;
    const matchesQuery = row.className.toLowerCase().includes(query.toLowerCase());
    return matchesClass && matchesRelease && matchesQuery;
  }), [classFilter, releaseFilter, query]);

  const selectedStudents = students.filter((student) => classFilter === "All classes" || student.className === classFilter);
  const schoolAverage = Math.round(classes.reduce((sum, row) => sum + row.average, 0) / classes.length);
  const passRate = Math.round(classes.reduce((sum, row) => sum + row.passRate, 0) / classes.length);
  const reportsReady = classes.reduce((sum, row) => sum + row.reportsReady, 0);
  const pendingApproval = classes.filter((row) => row.release === "Awaiting approval").length;

  function printReport() {
    window.print();
  }

  return (
    <main className="principal-module-shell principal-results-page">
      <header className="principal-module-header no-print">
        <div>
          <span className="page-kicker">PRINCIPAL · RESULTS & REPORTS</span>
          <h1>Results & Reports</h1>
          <p>Review school-wide results, approve report cards, monitor release status and print official reports.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/academics">Academics</Link>
          <Link href="/principal/approvals">Approvals</Link>
        </div>
      </header>

      <section className="results-kpis no-print">
        <article><span>School average</span><strong>{schoolAverage}%</strong><small>Current term prototype</small></article>
        <article><span>Pass rate</span><strong>{passRate}%</strong><small>Across tracked classes</small></article>
        <article><span>Reports ready</span><strong>{reportsReady}</strong><small>Prepared report cards</small></article>
        <article><span>Awaiting approval</span><strong>{pendingApproval}</strong><small>Principal action needed</small></article>
        <article><span>Released classes</span><strong>{classes.filter((row) => row.release === "Released").length}</strong><small>Parent/student visible</small></article>
      </section>

      <section className="principal-module-card class-results-card no-print">
        <header className="results-card-head">
          <div><h2>Class result summary</h2><p>Compare completion, performance and report-release state.</p></div>
          <div className="results-filters">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search class..." />
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All classes</option>{classes.map((row) => <option key={row.className}>{row.className}</option>)}</select>
            <select value={releaseFilter} onChange={(e) => setReleaseFilter(e.target.value)}><option>All states</option><option>Draft</option><option>Awaiting approval</option><option>Approved</option><option>Released</option></select>
          </div>
        </header>

        <div className="results-table-wrap">
          <div className="results-table-head"><span>Class</span><span>Students</span><span>Average</span><span>Pass rate</span><span>Highest</span><span>Lowest</span><span>Scores complete</span><span>Reports ready</span><span>Trend</span><span>Release</span></div>
          {filteredClasses.map((row) => <div className="results-table-row" key={row.className}><strong>{row.className}</strong><span>{row.students}</span><span>{row.average}%</span><span>{row.passRate}%</span><span>{row.highest}%</span><span>{row.lowest}%</span><span>{row.complete}%</span><span>{row.reportsReady}/{row.students}</span><span className={row.trend < 0 ? "negative" : "positive"}>{row.trend > 0 ? "+" : ""}{row.trend}%</span><b className={`release-chip ${row.release.toLowerCase().replaceAll(" ", "-")}`}>{row.release}</b></div>)}
        </div>
      </section>

      <section className="results-workspace no-print">
        <article className="principal-module-card student-report-list">
          <header><div><h2>Student report cards</h2><p>Select a student to review the official report preview.</p></div></header>
          <div className="student-report-items">
            {(selectedStudents.length ? selectedStudents : students).map((student) => <button key={student.id} className={selectedStudentId === student.id ? "selected" : ""} onClick={() => { setSelectedStudentId(student.id); setApproved(false); }}><span>{student.id}</span><div><strong>{student.name}</strong><small>{student.className} · Avg {student.average}% · Attendance {student.attendance}%</small></div><b className={`release-chip ${student.reportStatus.toLowerCase().replaceAll(" ", "-")}`}>{student.reportStatus}</b></button>)}
          </div>
        </article>

        <article className="principal-module-card report-review-controls">
          <div className="report-review-heading"><div><span>SELECTED REPORT</span><h2>{selectedStudent.name}</h2><p>{selectedStudent.className} · {selectedStudent.id}</p></div><b className={`release-chip ${approved ? "approved" : selectedStudent.reportStatus.toLowerCase().replaceAll(" ", "-")}`}>{approved ? "Approved" : selectedStudent.reportStatus}</b></div>
          <div className="report-review-metrics"><div><span>Average</span><strong>{selectedStudent.average}%</strong></div><div><span>Position</span><strong>{selectedStudent.position}</strong></div><div><span>Attendance</span><strong>{selectedStudent.attendance}%</strong></div></div>
          <label>Principal comment<textarea value={principalComment} onChange={(e) => setPrincipalComment(e.target.value)} /></label>
          <div className="report-review-actions"><button className="secondary-result-btn" onClick={() => setPrincipalComment("Please review the comments and score entries before resubmitting this report.")}>Return with comment</button><button className="approve-result-btn" onClick={() => setApproved(true)}>Approve report</button><button className="print-result-btn" onClick={printReport}>Print / Save as PDF</button></div>
          <p className="report-review-note">Approval here represents the principal's review step. School identity/letterhead remains centrally managed and read-only in this role.</p>
        </article>
      </section>

      <section className="official-report-paper" id="principal-report-card">
        <header className="official-report-letterhead">
          <div className="official-report-logo">{schoolProfile.logoText}</div>
          <div><h2>{schoolProfile.name}</h2><strong>{schoolProfile.motto}</strong><p>{schoolProfile.address}</p><p>{schoolProfile.phone} · {schoolProfile.email} · {schoolProfile.website}</p><p>Branches: {schoolProfile.branches.join(" · ")}</p></div>
          <span>{schoolProfile.registration}</span>
        </header>

        <div className="official-report-title"><span>OFFICIAL STUDENT REPORT CARD</span><h3>First Term · 2026/2027 Academic Session</h3></div>

        <section className="official-report-meta">
          <div><span>Student</span><strong>{selectedStudent.name}</strong></div>
          <div><span>Student ID</span><strong>{selectedStudent.id}</strong></div>
          <div><span>Class</span><strong>{selectedStudent.className}</strong></div>
          <div><span>Average</span><strong>{selectedStudent.average}%</strong></div>
          <div><span>Position</span><strong>{selectedStudent.position}</strong></div>
          <div><span>Attendance</span><strong>{selectedStudent.attendance}%</strong></div>
        </section>

        <table className="official-report-table"><thead><tr><th>Subject</th><th>CA</th><th>Exam</th><th>Total</th><th>Grade</th><th>Remark</th></tr></thead><tbody>{subjects.map((row) => <tr key={row.subject}><td>{row.subject}</td><td>{row.ca}</td><td>{row.exam}</td><td>{row.total}</td><td>{row.grade}</td><td>{row.remark}</td></tr>)}</tbody></table>

        <section className="official-report-comments"><div><span>Teacher's Comment</span><p>{selectedStudent.teacherComment}</p></div><div><span>Principal's Comment</span><p>{principalComment}</p></div><div><span>Conduct</span><p>Very Good</p></div><div><span>Punctuality</span><p>Good</p></div></section>

        <footer className="official-report-signatures"><div><span>Class / Subject Teacher</span><strong>Authorized Teacher</strong><i /></div><div><span>Principal</span><strong>Mr. Ibrahim Danladi</strong><i /></div><div><span>Date Issued</span><strong>13 September 2026</strong><i /></div></footer>
        <div className="official-report-footer">Generated from SchoolOS · Valid subject to school approval and authorized signature.</div>
      </section>

      <section className="results-bottom-grid no-print">
        <article className="principal-module-card"><h2>Principal AI result insight</h2><p>JSS 2B remains the clearest academic concern: average 61%, negative trend and incomplete result/report preparation. Before release, verify whether the decline is concentrated in specific subjects and whether attendance is materially contributing.</p><div className="results-ai-actions"><Link href="/principal/ai">Ask Principal AI</Link><Link href="/principal/academics">Open academic analysis</Link></div></article>
        <article className="principal-module-card"><h2>Report control</h2><div className="report-control-list"><div><span>1</span><p>Teachers prepare scores, comments and student reports.</p></div><div><span>2</span><p>Principal reviews exceptions, comments and release readiness.</p></div><div><span>3</span><p>Approved reports can be printed/saved as PDF on official letterhead.</p></div><div><span>4</span><p>Release to parents/students remains a controlled school action.</p></div></div></article>
      </section>
    </main>
  );
}
