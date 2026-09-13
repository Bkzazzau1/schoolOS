"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const prompts = [
  "Create a 40-minute revision activity for JSS 2B linear equations",
  "Generate 10 mixed-difficulty questions on simultaneous equations",
  "Summarize students who may need intervention in my assigned classes",
  "Draft parent-friendly feedback for a learner who is improving but still below target",
];

const tools = [
  { title: "Lesson planner", copy: "Draft objectives, activities, assessment and resources from an approved syllabus topic.", href: "/teacher/lesson-plans" },
  { title: "Quiz generator", copy: "Create classwork, homework, revision questions and answer guides for assigned classes.", href: "/teacher/assignments" },
  { title: "Assessment analyst", copy: "Interpret class performance and identify concepts that may need reteaching.", href: "/teacher/assessments" },
  { title: "Student support", copy: "Surface patterns from attendance, assessment and teacher notes within your authorized classes.", href: "/teacher/students" },
];

export default function TeacherAIPage() {
  const [query, setQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("JSS 2B · Mathematics");
  const [response, setResponse] = useState("Your AI workspace is ready. Ask about your assigned classes, lesson preparation, assessments, interventions or communication.");
  const [history, setHistory] = useState<string[]>(["Why is JSS 2B behind the syllabus pace?", "Create a short revision activity for Week 6"]);

  const context = useMemo(() => selectedClass.split(" · ")[0], [selectedClass]);

  function ask(text?: string) {
    const prompt = (text ?? query).trim();
    if (!prompt) return;
    setResponse(`For ${context}, I would first use the teacher-authorized class context only. Suggested action: review the current syllabus position, recent attendance and assessment completion, then prepare a focused teaching activity for “${prompt}”. Any draft should be reviewed by you before it is saved, sent or submitted.`);
    setHistory((items) => [prompt, ...items].slice(0, 6));
    setQuery("");
  }

  return (
    <main className="module-shell">
      <header className="module-header">
        <div><span className="page-kicker">TEACHER AI</span><h1>Your teaching copilot</h1><p>AI assistance grounded only in classes and school records you are permitted to access.</p></div>
        <div className="module-header-actions"><Link className="ghost-link" href="/teacher">Dashboard</Link><Link className="ghost-link" href="/teacher/classes">My classes</Link></div>
      </header>

      <section className="ai-workspace-grid">
        <article className="module-card ai-chat-card">
          <div className="module-card-head"><div><h2>Ask Teacher AI</h2><p>Plan, explain, analyze and draft—without bypassing teacher review.</p></div><span className="soft-chip ai">School context on</span></div>

          <div className="ai-context-row">
            <label>Working context<select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}><option>JSS 2A · Mathematics</option><option>JSS 2B · Mathematics</option><option>JSS 3A · Mathematics</option><option>SS 1A · Further Mathematics</option></select></label>
            <div className="ai-permission-note"><strong>Permission boundary</strong><span>Teacher AI cannot retrieve unrelated classes, school finance, staff-confidential data or another school’s records.</span></div>
          </div>

          <div className="ai-response-card"><span>AI RESPONSE</span><p>{response}</p><div><button className="secondary-btn">Copy</button><button className="secondary-btn">Turn into lesson plan</button><button className="secondary-btn">Create assignment</button></div></div>

          <div className="prompt-chips">{prompts.map((p) => <button key={p} onClick={() => ask(p)}>{p}</button>)}</div>
          <div className="ai-composer"><textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about lesson planning, class performance, student support, teaching ideas..." /><button className="primary-btn" onClick={() => ask()}>Ask Teacher AI</button></div>
        </article>

        <aside className="module-card ai-history-card">
          <div className="module-card-head"><div><h2>Recent AI activity</h2><p>Your recent prompts in this workspace.</p></div></div>
          <div className="stack-list">{history.map((item, i) => <div key={`${item}-${i}`}><strong>{item}</strong><span>{i === 0 ? "Just now" : `${i + 1} hours ago`}</span></div>)}</div>
          <div className="insight-box"><strong>Human review is required</strong><p>AI-generated lesson plans, marks, messages, student interventions and school records must be reviewed before consequential actions are taken.</p></div>
        </aside>
      </section>

      <section className="ai-tool-grid">{tools.map((tool) => <article className="module-card ai-tool-card" key={tool.title}><span className="soft-chip ai">AI TOOL</span><h2>{tool.title}</h2><p>{tool.copy}</p><Link href={tool.href}>Open tool →</Link></article>)}</section>

      <section className="module-card">
        <div className="module-card-head"><div><h2>Today’s suggested actions</h2><p>Suggestions generated from fictional demo data and teacher-authorized context.</p></div></div>
        <div className="ai-action-list">
          <div><strong>JSS 2B · curriculum pace</strong><span>Class is slightly behind plan. Consider a focused recovery lesson before introducing the next topic.</span><Link href="/teacher/syllabus">Review syllabus</Link></div>
          <div><strong>JSS 3A · strong improvement</strong><span>Latest demo assessment average is improving. Consider reinforcing the topics students mastered well.</span><Link href="/teacher/assessments">Open analytics</Link></div>
          <div><strong>Pending marking</strong><span>One assignment still has unmarked submissions in the demo queue.</span><Link href="/teacher/assignments">Open assignments</Link></div>
        </div>
      </section>
    </main>
  );
}
