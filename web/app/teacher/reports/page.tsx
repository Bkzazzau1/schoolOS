"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schoolProfile } from "../../../lib/school-profile";

const students = [
  { id: "STU-J2A-001", name: "Student Alpha", className: "JSS 2A", attendance: 96, position: "4th of 42", teacherComment: "Strong progress. Keep practising multi-step problems." },
  { id: "STU-J2A-002", name: "Student Beta", className: "JSS 2A", attendance: 88, position: "21st of 42", teacherComment: "Improving steadily. Needs more revision in algebra." },
  { id: "STU-J2B-001", name: "Student Gamma", className: "JSS 2B", attendance: 79, position: "31st of 39", teacherComment: "Requires targeted revision and better attendance consistency." },
];

const resultRows = [
  { subject: "Mathematics", ca: 18, exam: 64, total: 82, grade: "A", remark: "Excellent" },
  { subject: "English Language", ca: 16, exam: 58, total: 74, grade: "B", remark: "Very Good" },
  { subject: "Basic Science", ca: 17, exam: 61, total: 78, grade: "B", remark: "Very Good" },
  { subject: "Social Studies", ca: 15, exam: 55, total: 70, grade: "B", remark: "Good" },
  { subject: "Computer Studies", ca: 19, exam: 67, total: 86, grade: "A", remark: "Excellent" },
];

export default function TeacherReportsPage() {
  const [studentId, setStudentId] = useState(students[0].id);
  const [reportType, setReportType] = useState("Full Report Card");
  const [term, setTerm] = useState("First Term");
  const [session, setSession] = useState("2026/2027");

  const student = useMemo(() => students.find((s) => s.id === studentId) ?? students[0], [studentId]);
  const average = Math.round(resultRows.reduce((sum, row) => sum + row.total, 0) / resultRows.length);

  function printReport() {
    window.print();
  }

  return (
    <main className="module-shell report-module-shell">
      <header className="module-header no-print">
        <div>
          <span className="page-kicker">TEACHER · REPORTS</span>
          <h1>Student Performance & Report Cards</h1>
          <p>Preview and print assigned students' performance reports using the school's official letterhead.</p>
        </div>
        <div className="module-header-actions">
          <Link className="ghost-link" href="/teacher/students">Students</Link>
          <Link className="ghost-link" href="/teacher/assessments">Assessments</Link>
          <Link className="ghost-link" href="/teacher">Dashboard</Link>
        </div>
      </header>

      <section className="report-controls module-card no-print">
        <div className="form-grid compact-grid">
          <label>Student<select value={studentId} onChange={(e) => setStudentId(e.target.value)}>{students.map((s) => <option value={s.id} key={s.id}>{s.name} · {s.className}</option>)}</select></label>
          <label>Report type<select value={reportType} onChange={(e) => setReportType(e.target.value)}><option>Full Report Card</option><option>Performance Summary</option></select></label>
          <label>Term<select value={term} onChange={(e) => setTerm(e.target.value)}><option>First Term</option><option>Second Term</option><option>Third Term</option></select></label>
          <label>Session<select value={session} onChange={(e) => setSession(e.target.value)}><option>2026/2027</option><option>2025/2026</option></select></label>
        </div>
        <div className="inline-actions report-actions">
          <button className="primary-btn" onClick={printReport}>Print / Save as PDF</button>
          <Link className="ghost-link" href="/teacher/share">Share report/work</Link>
        </div>
        <p className="report-permission-note">School name, logo, address, phone, branches and other letterhead details are read-only for teachers. They are maintained by the proprietor/authorized school owner.</p>
      </section>

      <section className="report-paper" id="student-report">
        <header className="report-letterhead">
          <div className="report-logo">{schoolProfile.logoText}</div>
          <div className="report-school-copy">
            <h2>{schoolProfile.name}</h2>
            <strong>{schoolProfile.motto}</strong>
            <p>{schoolProfile.address}</p>
            <p>{schoolProfile.phone} · {schoolProfile.email} · {schoolProfile.website}</p>
            <p>Branches: {schoolProfile.branches.join(" · ")}</p>
          </div>
          <div className="report-reg">{schoolProfile.registration}</div>
        </header>

        <div className="report-title-block">
          <span>{reportType}</span>
          <h3>{term} · {session} Academic Session</h3>
        </div>

        <section className="report-student-meta">
          <div><span>Student</span><strong>{student.name}</strong></div>
          <div><span>Student ID</span><strong>{student.id}</strong></div>
          <div><span>Class</span><strong>{student.className}</strong></div>
          <div><span>Attendance</span><strong>{student.attendance}%</strong></div>
          <div><span>Position</span><strong>{student.position}</strong></div>
          <div><span>Overall Average</span><strong>{average}%</strong></div>
        </section>

        <table className="report-score-table">
          <thead><tr><th>Subject</th><th>CA</th><th>Exam</th><th>Total</th><th>Grade</th><th>Remark</th></tr></thead>
          <tbody>{resultRows.map((row) => <tr key={row.subject}><td>{row.subject}</td><td>{row.ca}</td><td>{row.exam}</td><td>{row.total}</td><td>{row.grade}</td><td>{row.remark}</td></tr>)}</tbody>
        </table>

        <section className="report-summary-grid">
          <div><span>Teacher's Comment</span><p>{student.teacherComment}</p></div>
          <div><span>Principal's Comment</span><p>Good academic effort. Continue to improve consistency and class participation.</p></div>
          <div><span>Conduct</span><p>Very Good</p></div>
          <div><span>Punctuality</span><p>Good</p></div>
        </section>

        <footer className="report-signatures">
          <div><span>Class / Subject Teacher</span><strong>Mrs. Amina Yusuf</strong><i /></div>
          <div><span>Principal</span><strong>Authorized Signature</strong><i /></div>
          <div><span>Date Issued</span><strong>13 September 2026</strong><i /></div>
        </footer>

        <div className="report-footer-note">Generated from SchoolOS · This report is valid with the school's authorized approval/signature.</div>
      </section>
    </main>
  );
}
