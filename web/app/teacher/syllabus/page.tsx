"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const syllabusByClass = {
  "JSS 2A": [
    { week: 1, topic: "Whole Numbers Review", status: "Completed", lessons: 2 },
    { week: 2, topic: "Fractions and Decimals", status: "Completed", lessons: 3 },
    { week: 3, topic: "Ratio and Proportion", status: "Completed", lessons: 3 },
    { week: 4, topic: "Algebraic Expressions", status: "Completed", lessons: 3 },
    { week: 5, topic: "Linear Equations", status: "In progress", lessons: 3 },
    { week: 6, topic: "Linear Equations", status: "Current", lessons: 3 },
    { week: 7, topic: "Word Problems", status: "Upcoming", lessons: 3 },
    { week: 8, topic: "Graphs of Linear Equations", status: "Upcoming", lessons: 3 },
  ],
  "JSS 2B": [
    { week: 1, topic: "Whole Numbers Review", status: "Completed", lessons: 2 },
    { week: 2, topic: "Fractions and Decimals", status: "Completed", lessons: 3 },
    { week: 3, topic: "Ratio and Proportion", status: "Completed", lessons: 3 },
    { week: 4, topic: "Algebraic Expressions", status: "Completed", lessons: 3 },
    { week: 5, topic: "Linear Equations", status: "In progress", lessons: 3 },
    { week: 6, topic: "Linear Equations", status: "Behind", lessons: 3 },
    { week: 7, topic: "Word Problems", status: "Upcoming", lessons: 3 },
    { week: 8, topic: "Graphs of Linear Equations", status: "Upcoming", lessons: 3 },
  ],
  "JSS 3A": [
    { week: 1, topic: "Algebra Review", status: "Completed", lessons: 3 },
    { week: 2, topic: "Simultaneous Equations", status: "Completed", lessons: 3 },
    { week: 3, topic: "Simultaneous Equations", status: "Completed", lessons: 3 },
    { week: 4, topic: "Quadratic Expressions", status: "Completed", lessons: 3 },
    { week: 5, topic: "Quadratic Equations", status: "Completed", lessons: 3 },
    { week: 6, topic: "Quadratic Equations", status: "Current", lessons: 3 },
    { week: 7, topic: "Variation", status: "Upcoming", lessons: 3 },
    { week: 8, topic: "Statistics Review", status: "Upcoming", lessons: 2 },
  ],
  "SS 1A": [
    { week: 1, topic: "Sets", status: "Completed", lessons: 3 },
    { week: 2, topic: "Surds", status: "Completed", lessons: 3 },
    { week: 3, topic: "Indices", status: "Completed", lessons: 3 },
    { week: 4, topic: "Functions", status: "In progress", lessons: 3 },
    { week: 5, topic: "Functions", status: "Current", lessons: 3 },
    { week: 6, topic: "Graphs", status: "Upcoming", lessons: 3 },
    { week: 7, topic: "Sequences and Series", status: "Upcoming", lessons: 3 },
    { week: 8, topic: "Revision", status: "Upcoming", lessons: 2 },
  ],
};

const progressByClass: Record<string, number> = { "JSS 2A": 72, "JSS 2B": 68, "JSS 3A": 81, "SS 1A": 64 };

export default function SyllabusPage() {
  const [className, setClassName] = useState("JSS 2A");
  const [query, setQuery] = useState("");
  const [updatedRows, setUpdatedRows] = useState<Record<number, string>>({});

  const rows = useMemo(() => syllabusByClass[className as keyof typeof syllabusByClass].filter((row) => `${row.week} ${row.topic} ${updatedRows[row.week] || row.status}`.toLowerCase().includes(query.toLowerCase())), [className, query, updatedRows]);

  function markWeek(week: number, status: string) {
    setUpdatedRows((prev) => ({ ...prev, [week]: status }));
  }

  const currentProgress = progressByClass[className];

  return (
    <main className="teacher-module-shell">
      <header className="teacher-module-topbar">
        <div>
          <span className="page-kicker">TEACHER PORTAL · SYLLABUS</span>
          <h1>Syllabus Tracker</h1>
          <p>Track where each assigned class should be, what has been taught and what comes next.</p>
        </div>
        <div className="module-top-actions">
          <Link href="/teacher">Dashboard</Link>
          <Link href="/teacher/lesson-plans">Lesson plans</Link>
        </div>
      </header>

      <section className="syllabus-hero">
        <div>
          <span>Selected class</span>
          <select value={className} onChange={(e) => { setClassName(e.target.value); setUpdatedRows({}); }}>
            <option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option><option>SS 1A</option>
          </select>
        </div>
        <div className="syllabus-progress-card">
          <div><span>Curriculum coverage</span><strong>{currentProgress}%</strong></div>
          <section><i style={{ width: `${currentProgress}%` }} /></section>
          <small>{className === "JSS 2B" ? "2 lessons behind expected pace" : "On track with school pacing"}</small>
        </div>
        <div className="syllabus-next-card"><span>Next planned topic</span><strong>{className.startsWith("JSS 2") ? "Word Problems" : className === "JSS 3A" ? "Variation" : "Graphs"}</strong><small>Use this to prepare the next lesson plan</small></div>
      </section>

      <section className="module-stats">
        <article><span>Completed topics</span><strong>{rows.filter((r) => (updatedRows[r.week] || r.status) === "Completed").length}</strong><small>selected class</small></article>
        <article><span>Current week</span><strong>6</strong><small>term calendar</small></article>
        <article><span>Planned lessons</span><strong>{rows.reduce((sum, r) => sum + r.lessons, 0)}</strong><small>visible weeks</small></article>
        <article><span>Pacing status</span><strong>{className === "JSS 2B" ? "Behind" : "On track"}</strong><small>AI-assisted check</small></article>
      </section>

      {className === "JSS 2B" && <section className="syllabus-alert"><div><strong>Pacing alert</strong><p>This class is approximately two lessons behind the expected position. Consider revision consolidation and avoid skipping prerequisite material.</p></div><Link href="/teacher/lesson-plans">Plan recovery lesson</Link></section>}

      <section className="module-panel syllabus-table-panel">
        <header><div><h2>Scheme of work</h2><p>Update progress only for classes assigned to you.</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics or weeks..." /></header>
        <div className="syllabus-list">
          {rows.map((row) => {
            const status = updatedRows[row.week] || row.status;
            return <article className="syllabus-row" key={`${className}-${row.week}`}>
              <div className="week-number"><span>Week</span><strong>{row.week}</strong></div>
              <div className="syllabus-topic"><span>Topic</span><strong>{row.topic}</strong><small>{row.lessons} planned lessons</small></div>
              <div><span className={`table-status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span></div>
              <div className="syllabus-actions">
                <button onClick={() => markWeek(row.week, "Completed")}>Mark complete</button>
                <button onClick={() => markWeek(row.week, "In progress")}>In progress</button>
                <Link href="/teacher/lesson-plans">Create plan</Link>
              </div>
            </article>;
          })}
        </div>
      </section>

      <section className="syllabus-bottom-grid">
        <article className="module-panel">
          <h2>Teacher AI pacing insight</h2>
          <p className="module-copy">{className === "JSS 2B" ? "Recent timetable completion suggests the class may remain behind unless one lesson is recovered during the next two weeks. Prioritize core equation-solving skills before moving into word problems." : "Current lesson completion and topic updates indicate that this class is broadly aligned with the school scheme of work."}</p>
          <button className="primary-action">Ask AI for pacing plan</button>
        </article>
        <article className="module-panel">
          <h2>Curriculum controls</h2>
          <div className="guide-item"><strong>Teacher updates progress</strong><p>You can report what has been taught, but cannot silently change the school-approved scheme.</p></div>
          <div className="guide-item"><strong>Leadership approves changes</strong><p>Topic reordering, removal or curriculum replacement should require authorized academic approval.</p></div>
        </article>
      </section>
    </main>
  );
}
