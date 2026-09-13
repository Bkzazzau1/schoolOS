"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const plans = [
  { id: "LP-206", className: "JSS 2A", week: "Week 6", topic: "Linear Equations", status: "Draft", updated: "Today, 9:10 AM" },
  { id: "LP-205", className: "JSS 2B", week: "Week 6", topic: "Linear Equations", status: "Submitted", updated: "Yesterday" },
  { id: "LP-201", className: "JSS 3A", week: "Week 5", topic: "Simultaneous Equations", status: "Approved", updated: "3 days ago" },
  { id: "LP-198", className: "SS 1A", week: "Week 5", topic: "Functions", status: "Needs changes", updated: "4 days ago" },
];

const aiDraft = {
  objectives: "By the end of the lesson, learners should be able to define a linear equation, identify variables and constants, and solve simple one-step linear equations.",
  starter: "Use two quick balance-scale examples to connect equality with keeping both sides balanced.",
  activities: "Teacher models two examples, class solves guided examples in pairs, then learners complete a five-question independent task.",
  assessment: "Exit ticket: solve 3x + 4 = 19 and explain the operation used at each step.",
  resources: "Whiteboard, marker, learner notebooks, printed practice sheet.",
};

export default function LessonPlansPage() {
  const [className, setClassName] = useState("JSS 2A");
  const [week, setWeek] = useState("Week 6");
  const [topic, setTopic] = useState("Linear Equations");
  const [objectives, setObjectives] = useState("");
  const [starter, setStarter] = useState("");
  const [activities, setActivities] = useState("");
  const [assessment, setAssessment] = useState("");
  const [resources, setResources] = useState("");
  const [status, setStatus] = useState("Draft");
  const [query, setQuery] = useState("");

  const filteredPlans = useMemo(() => plans.filter((p) => `${p.className} ${p.week} ${p.topic} ${p.status}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function generateWithAI() {
    setObjectives(aiDraft.objectives);
    setStarter(aiDraft.starter);
    setActivities(aiDraft.activities);
    setAssessment(aiDraft.assessment);
    setResources(aiDraft.resources);
    setStatus("AI draft ready");
  }

  function saveDraft() { setStatus("Draft saved"); }
  function submitPlan() { setStatus("Submitted for approval"); }

  return (
    <main className="teacher-module-shell">
      <header className="teacher-module-topbar">
        <div>
          <span className="page-kicker">TEACHER PORTAL · LESSON PLANS</span>
          <h1>Lesson Plans</h1>
          <p>Create, improve, submit and track lesson plans for your assigned classes.</p>
        </div>
        <div className="module-top-actions">
          <Link href="/teacher">Dashboard</Link>
          <Link href="/teacher/syllabus">Open syllabus</Link>
          <Link href="/teacher/share">Send / share work</Link>
        </div>
      </header>

      <section className="module-stats">
        <article><span>This term</span><strong>12</strong><small>lesson plans</small></article>
        <article><span>Approved</span><strong>9</strong><small>75% approved</small></article>
        <article><span>Pending</span><strong>2</strong><small>awaiting review</small></article>
        <article><span>Needs changes</span><strong>1</strong><small>action required</small></article>
      </section>

      <section className="lesson-plan-grid">
        <article className="module-panel lesson-editor">
          <header>
            <div><h2>Create lesson plan</h2><p>Build from the approved syllabus topic, then edit before submission.</p></div>
            <span className="status-badge">{status}</span>
          </header>

          <div className="form-grid three">
            <label>Class<select value={className} onChange={(e) => setClassName(e.target.value)}><option>JSS 2A</option><option>JSS 2B</option><option>JSS 3A</option><option>SS 1A</option></select></label>
            <label>Week<select value={week} onChange={(e) => setWeek(e.target.value)}><option>Week 6</option><option>Week 7</option><option>Week 8</option></select></label>
            <label>Syllabus topic<select value={topic} onChange={(e) => setTopic(e.target.value)}><option>Linear Equations</option><option>Word Problems</option><option>Graphs of Linear Equations</option></select></label>
          </div>

          <div className="ai-generator-card">
            <div><strong>Teacher AI</strong><p>Generate a structured first draft from {className}, {week} and the selected syllabus topic. You remain responsible for reviewing and editing it.</p></div>
            <button onClick={generateWithAI}>Generate AI draft</button>
          </div>

          <label>Learning objectives<textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} placeholder="What should learners be able to do by the end of this lesson?" /></label>
          <label>Starter / prior knowledge<textarea value={starter} onChange={(e) => setStarter(e.target.value)} placeholder="Opening activity and prior-knowledge check" /></label>
          <label>Teaching and learner activities<textarea className="large" value={activities} onChange={(e) => setActivities(e.target.value)} placeholder="Explain the lesson flow, modelling, guided practice and learner activity" /></label>
          <label>Assessment / evidence of learning<textarea value={assessment} onChange={(e) => setAssessment(e.target.value)} placeholder="How will you know whether learners understood?" /></label>
          <label>Resources<textarea value={resources} onChange={(e) => setResources(e.target.value)} placeholder="Books, worksheets, equipment, links or files" /></label>

          <div className="editor-actions">
            <Link className="secondary-action" href="/teacher/share">Share with principal / colleague</Link>
            <button className="secondary-action" onClick={saveDraft}>Save draft</button>
            <button className="primary-action" onClick={submitPlan}>Submit for approval</button>
          </div>
        </article>

        <aside className="module-panel lesson-side">
          <h2>Planning guide</h2>
          <div className="guide-item"><strong>1. Follow syllabus</strong><p>The class, week and topic should come from the school-approved scheme of work.</p></div>
          <div className="guide-item"><strong>2. Make outcomes measurable</strong><p>Use clear actions such as solve, compare, explain, construct or identify.</p></div>
          <div className="guide-item"><strong>3. Plan evidence</strong><p>Every lesson should include a way to check whether learning actually happened.</p></div>
          <div className="guide-item"><strong>4. AI assists, teacher decides</strong><p>AI suggestions are drafts. The teacher reviews content and keeps responsibility for the final plan.</p></div>
          <Link className="inline-link" href="/teacher/syllabus">Check curriculum position →</Link>
        </aside>
      </section>

      <section className="module-panel plan-history">
        <header><div><h2>My lesson plans</h2><p>Recent plans and approval status</p></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search plans..." /></header>
        <div className="data-table">
          <div className="data-row data-head"><span>Plan</span><span>Class</span><span>Week</span><span>Topic</span><span>Status</span><span>Updated</span></div>
          {filteredPlans.map((plan) => <div className="data-row" key={plan.id}><strong>{plan.id}</strong><span>{plan.className}</span><span>{plan.week}</span><span>{plan.topic}</span><span><b className={`table-status ${plan.status.toLowerCase().replaceAll(" ", "-")}`}>{plan.status}</b></span><span>{plan.updated}</span></div>)}
        </div>
      </section>
    </main>
  );
}
