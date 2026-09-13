"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { schoolProfile } from "../../../lib/school-profile";

type ReleaseState = "Draft" | "Awaiting review" | "Approved" | "Released";

type ClassResult = {
  className: string;
  pupils: number;
  average: number;
  literacy: number;
  numeracy: number;
  scoreCompletion: number;
  reportReady: number;
  release: ReleaseState;
  trend: number;
};

type SubjectRow = {
  subject: string;
  ca: number;
  exam: number;
  total: number;
  grade: string;
  remark: string;
};

type PupilReport = {
  id: string;
  name: string;
  className: string;
  position: string;
  attendance: string;
  average: number;
  teacherComment: string;
  subjects: SubjectRow[];
};

const classResults: ClassResult[] = [
  { className: "Primary 1", pupils: 38, average: 77, literacy: 78, numeracy: 75, scoreCompletion: 100, reportReady: 100, release: "Approved", trend: 4.2 },
  { className: "Primary 2", pupils: 40, average: 72, literacy: 73, numeracy: 71, scoreCompletion: 96, reportReady: 92, release: "Awaiting review", trend: 2.1 },
  { className: "Primary 3", pupils: 42, average: 66, literacy: 66, numeracy: 68, scoreCompletion: 88, reportReady: 74, release: "Draft", trend: -5.8 },
  { className: "Primary 4", pupils: 39, average: 75, literacy: 74, numeracy: 76, scoreCompletion: 100, reportReady: 97, release: "Approved", trend: 3.4 },
  { className: "Primary 5", pupils: 36, average: 80, literacy: 80, numeracy: 79, scoreCompletion: 100, reportReady: 100, release: "Released", trend: 5.1 },
  { className: "Primary 6", pupils: 34, average: 79, literacy: 82, numeracy: 77, scoreCompletion: 94, reportReady: 88, release: "Awaiting review", trend: 1.8 },
];

const reports: PupilReport[] = [
  {
    id: "PRI-001",
    name: "Pupil Alpha",
    className: "Primary 1",
    position: "4th of 38",
    attendance: "58 / 60 days",
    average: 84,
    teacherComment: "Excellent participation and steady progress in reading and number work.",
    subjects: [
      { subject: "English", ca: 35, exam: 50, total: 85, grade: "A", remark: "Excellent" },
      { subject: "Mathematics", ca: 33, exam: 48, total: 81, grade: "A", remark: "Excellent" },
      { subject: "Basic Science", ca: 32, exam: 47, total: 79, grade: "B", remark: "Very Good" },
      { subject: "Social Studies", ca: 36, exam: 50, total: 86, grade: "A", remark: "Excellent" },
      { subject: "Computer Studies", ca: 34, exam: 49, total: 83, grade: "A", remark: "Excellent" },
    ],
  },
  {
    id: "PRI-003",
    name: "Pupil Gamma",
    className: "Primary 3",
    position: "31st of 42",
    attendance: "49 / 60 days",
    average: 61,
    teacherComment: "Shows potential but needs consistent reading practice and better attendance to support progress.",
    subjects: [
      { subject: "English", ca: 24, exam: 33, total: 57, grade: "C", remark: "Fair" },
      { subject: "Mathematics", ca: 27, exam: 36, total: 63, grade: "C", remark: "Good" },
      { subject: "Basic Science", ca: 29, exam: 37, total: 66, grade: "B", remark: "Good" },
      { subject: "Social Studies", ca: 28, exam: 38, total: 66, grade: "B", remark: "Good" },
      { subject: "Computer Studies", ca: 25, exam: 34, total: 59, grade: "C", remark: "Fair" },
    ],
  },
  {
    id: "PRI-005",
    name: "Pupil Epsilon",
    className: "Primary 5",
    position: "12th of 36",
    attendance: "54 / 60 days",
    average: 74,
    teacherComment: "Good overall progress. Continue focused reading-comprehension practice next term.",
    subjects: [
      { subject: "English", ca: 30, exam: 41, total: 71, grade: "B", remark: "Very Good" },
      { subject: "Mathematics", ca: 31, exam: 45, total: 76, grade: "B", remark: "Very Good" },
      { subject: "Basic Science", ca: 32, exam: 43, total: 75, grade: "B", remark: "Very Good" },
      { subject: "Social Studies", ca: 34, exam: 46, total: 80, grade: "A", remark: "Excellent" },
      { subject: "Computer Studies", ca: 29, exam: 40, total: 69, grade: "B", remark: "Good" },
    ],
  },
];

export default function HeadmasterResultsPage() {
  const [classFilter, setClassFilter] = useState("All classes");
  const [releaseFilter, setReleaseFilter] = useState("All states");
  const [selectedClass, setSelectedClass] = useState("Primary 3");
  const [selectedPupilId, setSelectedPupilId] = useState("PRI-003");
  const [headmistressComment, setHeadmistressComment] = useState("Continue targeted literacy support and maintain close attendance follow-up with the class teacher and guardian.");
  const [reviewState, setReviewState] = useState<"Pending" | "Approved" | "Returned">("Pending");
  const [notice, setNotice] = useState("");

  const visibleClasses = useMemo(() => classResults.filter((item) => {
    const matchesClass = classFilter === "All classes" || item.className === classFilter;
    const matchesRelease = releaseFilter === "All states" || item.release === releaseFilter;
    return matchesClass && matchesRelease;
  }), [classFilter, releaseFilter]);

  const selectedClassRow = classResults.find((item) => item.className === selectedClass) ?? classResults[0];
  const reportOptions = reports.filter((item) => item.className === selectedClass);
  const selectedReport = reports.find((item) => item.id === selectedPupilId) ?? reportOptions[0] ?? reports[0];
  const readyClasses = classResults.filter((item) => item.reportReady >= 95).length;
  const pendingReview = classResults.filter((item) => item.release === "Awaiting review").length;
  const sectionAverage = Math.round(classResults.reduce((sum, item) => sum + item.average, 0) / classResults.length);
  const scoreCompletion = Math.round(classResults.reduce((sum, item) => sum + item.scoreCompletion, 0) / classResults.length);

  function chooseClass(className: string) {
    setSelectedClass(className);
    const first = reports.find((item) => item.className === className);
    if (first) setSelectedPupilId(first.id);
    setReviewState("Pending");
    setNotice("");
  }

  function approveReport() {
    setReviewState("Approved");
    setNotice(`${selectedReport.name}'s report is approved in the UI prototype.`);
  }

  function returnReport() {
    setReviewState("Returned");
    setNotice(`${selectedReport.name}'s report was returned for teacher review in the UI prototype.`);
  }

  return (
    <main className="headmaster-module-shell primary-results-page">
      <header className="headmaster-module-header no-print">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Assessments & Reports</h1>
          <p>Review Primary results, score completion, report-card readiness and pupil reports before release.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/academics">Academics</Link>
          <Link href="/headmaster/pupils">Pupils</Link>
        </div>
      </header>

      <section className="primary-results-scope no-print">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>Only Primary assessment and report data is represented here. Official school identity is read-only and comes from the proprietor-managed school profile.</p>
      </section>

      <section className="primary-results-kpis no-print">
        <article><span>Section average</span><strong>{sectionAverage}%</strong><small>Primary 1–6</small></article>
        <article><span>Score completion</span><strong>{scoreCompletion}%</strong><small>Prototype result entry</small></article>
        <article><span>Report-ready classes</span><strong>{readyClasses}/6</strong><small>95%+ readiness</small></article>
        <article><span>Awaiting review</span><strong>{pendingReview}</strong><small>Headmistress action</small></article>
        <article><span>Released</span><strong>1</strong><small>Primary 5</small></article>
      </section>

      <section className="primary-results-overview no-print">
        <article className="headmaster-module-card primary-results-table-card">
          <header>
            <div><h2>Class result readiness</h2><p>Compare performance and reporting progress across Primary classes.</p></div>
            <div className="primary-results-filters">
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}><option>All classes</option>{classResults.map((item) => <option key={item.className}>{item.className}</option>)}</select>
              <select value={releaseFilter} onChange={(e) => setReleaseFilter(e.target.value)}><option>All states</option><option>Draft</option><option>Awaiting review</option><option>Approved</option><option>Released</option></select>
            </div>
          </header>

          <div className="primary-results-table">
            <div className="primary-results-row heading"><span>Class</span><span>Average</span><span>Literacy</span><span>Numeracy</span><span>Scores</span><span>Reports</span><span>State</span></div>
            {visibleClasses.map((item) => <button key={item.className} className={`primary-results-row ${selectedClass === item.className ? "selected" : ""}`} onClick={() => chooseClass(item.className)}><div><strong>{item.className}</strong><small>{item.pupils} pupils · <span className={item.trend >= 0 ? "positive" : "negative"}>{item.trend >= 0 ? "+" : ""}{item.trend}%</span></small></div><b>{item.average}%</b><b>{item.literacy}%</b><b>{item.numeracy}%</b><span>{item.scoreCompletion}%</span><span>{item.reportReady}%</span><em className={`primary-release-state ${item.release.toLowerCase().replaceAll(" ", "-")}`}>{item.release}</em></button>)}
          </div>
        </article>

        <aside className="headmaster-module-card primary-results-selected-class">
          <span className="page-kicker">SELECTED CLASS</span>
          <h2>{selectedClassRow.className}</h2>
          <p>{selectedClassRow.pupils} pupils · {selectedClassRow.release}</p>
          <div><span>Average</span><strong>{selectedClassRow.average}%</strong></div>
          <div><span>Score completion</span><strong>{selectedClassRow.scoreCompletion}%</strong></div>
          <div><span>Report readiness</span><strong>{selectedClassRow.reportReady}%</strong></div>
          <div><span>Term movement</span><strong className={selectedClassRow.trend >= 0 ? "positive" : "negative"}>{selectedClassRow.trend >= 0 ? "+" : ""}{selectedClassRow.trend}%</strong></div>
          <div className="primary-results-ai-note"><span>HEADMASTER AI</span><p>{selectedClassRow.className === "Primary 3" ? "This class needs review before report release because academic performance, attendance and report readiness are all weaker than the section pattern." : "Review score completeness and teacher comments before releasing this class report batch."}</p></div>
        </aside>
      </section>

      <section className="primary-report-review no-print">
        <div>
          <span className="page-kicker">PUPIL REPORT REVIEW</span>
          <h2>Report Card Preview</h2>
          <p>Review the complete pupil report, add the Headmistress comment, then approve or return it.</p>
        </div>
        <div className="primary-report-controls">
          <select value={selectedClass} onChange={(e) => chooseClass(e.target.value)}>{classResults.map((item) => <option key={item.className}>{item.className}</option>)}</select>
          <select value={selectedReport.id} onChange={(e) => { setSelectedPupilId(e.target.value); setReviewState("Pending"); setNotice(""); }} disabled={reportOptions.length === 0}>{reportOptions.length ? reportOptions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) : <option>No sample pupil</option>}</select>
          <button onClick={() => window.print()}>Print / Save as PDF</button>
        </div>
      </section>

      <section className="primary-report-layout">
        <article className="primary-report-paper">
          <header className="primary-report-letterhead">
            <div className="primary-report-logo">{schoolProfile.logoText}</div>
            <div><h2>{schoolProfile.name}</h2><p>{schoolProfile.motto}</p><span>{schoolProfile.address}</span><span>{schoolProfile.phone} · {schoolProfile.email}</span><small>{schoolProfile.registration}</small></div>
          </header>

          <div className="primary-report-title"><span>PRIMARY SCHOOL</span><h1>Pupil Report Card</h1><p>First Term · 2026/2027 Academic Session</p></div>

          <div className="primary-report-pupil-info">
            <div><span>Pupil</span><strong>{selectedReport.name}</strong></div>
            <div><span>Pupil ID</span><strong>{selectedReport.id}</strong></div>
            <div><span>Class</span><strong>{selectedReport.className}</strong></div>
            <div><span>Position</span><strong>{selectedReport.position}</strong></div>
            <div><span>Attendance</span><strong>{selectedReport.attendance}</strong></div>
            <div><span>Average</span><strong>{selectedReport.average}%</strong></div>
          </div>

          <table className="primary-report-subject-table">
            <thead><tr><th>Subject</th><th>CA / 40</th><th>Exam / 60</th><th>Total</th><th>Grade</th><th>Remark</th></tr></thead>
            <tbody>{selectedReport.subjects.map((row) => <tr key={row.subject}><td>{row.subject}</td><td>{row.ca}</td><td>{row.exam}</td><td><strong>{row.total}</strong></td><td>{row.grade}</td><td>{row.remark}</td></tr>)}</tbody>
          </table>

          <div className="primary-report-comments">
            <div><span>Class Teacher Comment</span><p>{selectedReport.teacherComment}</p></div>
            <div><span>Headmistress Comment</span><p>{headmistressComment || "No Headmistress comment added yet."}</p></div>
          </div>

          <div className="primary-report-signatures">
            <div><span>Class Teacher</span><b>________________________</b></div>
            <div><span>Headmistress</span><b>________________________</b></div>
            <div><span>Date Issued</span><b>________________________</b></div>
          </div>

          <footer className="primary-report-footer"><span>{schoolProfile.website}</span><strong>{schoolProfile.motto}</strong><span>System-generated prototype report</span></footer>
        </article>

        <aside className="headmaster-module-card primary-report-review-panel no-print">
          <span className="page-kicker">HEADMISTRESS REVIEW</span>
          <h2>{selectedReport.name}</h2>
          <p>{selectedReport.className} · Current review state: <strong>{reviewState}</strong></p>
          <label>Headmistress comment<textarea value={headmistressComment} onChange={(e) => setHeadmistressComment(e.target.value)} rows={6} /></label>
          <div className="primary-report-review-actions"><button className="return" onClick={returnReport}>Return to teacher</button><button className="approve" onClick={approveReport}>Approve report</button></div>
          {notice && <div className="primary-report-notice">{notice}</div>}
          <div className="primary-report-boundary"><span>UI PROTOTYPE</span><p>Approval and release actions are local UI state only. No report is persisted or sent to a guardian yet.</p></div>
        </aside>
      </section>
    </main>
  );
}
