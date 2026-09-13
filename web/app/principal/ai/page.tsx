"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Insight = {
  title: string;
  answer: string;
  evidence: string[];
  actions: { label: string; href: string }[];
  confidence: "High" | "Medium";
  scope: string;
};

const suggestedQuestions = [
  "What needs my attention today?",
  "Why is JSS 2B declining?",
  "Which teachers need support?",
  "Which students are at risk?",
  "Compare this term with the previous term",
  "Which classes are behind on syllabus coverage?",
];

const responses: Record<string, Insight> = {
  "What needs my attention today?": {
    title: "Today’s principal priorities",
    answer: "Three issues deserve attention first: JSS 2B is showing combined academic and attendance decline; one staff absence is affecting Science coverage; and the JSS 2B report-card batch is still awaiting approval. These issues are operationally connected, so the most useful sequence is attendance follow-up, teacher coverage confirmation, then report release review.",
    evidence: [
      "JSS 2B average: 61%, trend: -6.8%",
      "JSS 2B attendance: 85%, below other monitored classes",
      "Mr. Peter James: second absence this month",
      "JSS 2B report batch: awaiting principal approval",
    ],
    actions: [
      { label: "Open JSS 2B academics", href: "/principal/academics" },
      { label: "Review attendance", href: "/principal/attendance" },
      { label: "Open approvals", href: "/principal/approvals" },
    ],
    confidence: "High",
    scope: "Academics · Attendance · Teachers · Approvals",
  },
  "Why is JSS 2B declining?": {
    title: "JSS 2B decline analysis",
    answer: "The strongest prototype explanation is not a single subject issue. JSS 2B combines lower attendance, slower syllabus progress and incomplete assessment activity. Mathematics is specifically behind target, but the broader pattern suggests that attendance and instructional pace are reinforcing each other. A class-level intervention is more appropriate than treating Mathematics alone.",
    evidence: [
      "Class average: 61%, down 6.8%",
      "Attendance: 85%",
      "Syllabus coverage: 63%",
      "Assessment completion: 72%",
      "Mathematics identified as a pacing concern",
    ],
    actions: [
      { label: "Open Academics", href: "/principal/academics" },
      { label: "View Students", href: "/principal/students" },
      { label: "Message class team", href: "/principal/communication" },
    ],
    confidence: "High",
    scope: "Academics · Students · Attendance",
  },
  "Which teachers need support?": {
    title: "Teacher support priorities",
    answer: "Mr. Peter James is the clearest support priority in the current prototype data. His attendance, punctuality, lesson-plan completion, syllabus pace and assessment completion are all below the stronger teacher cohort. Mrs. Amina Yusuf and Mrs. Fatima Bello have high workloads, but their compliance indicators remain comparatively strong, so workload monitoring is more appropriate than performance escalation.",
    evidence: [
      "Mr. Peter James attendance: 89%",
      "Punctuality: 84%",
      "Lesson plans: 72%",
      "Syllabus: 62%",
      "Assessment completion: 69%",
      "Amina Yusuf and Fatima Bello both carry heavy workloads",
    ],
    actions: [
      { label: "Open Teachers", href: "/principal/teachers" },
      { label: "Review Timetable", href: "/principal/timetable" },
      { label: "Send support message", href: "/principal/communication" },
    ],
    confidence: "High",
    scope: "Teachers · Attendance · Timetable",
  },
  "Which students are at risk?": {
    title: "Student risk summary",
    answer: "Student Gamma is the highest combined prototype risk because academic decline and attendance weakness are occurring together, alongside two recorded incidents. Student Beta is on a watch list due to declining performance despite more acceptable attendance. Student Epsilon is currently stable but should be monitored in Physics and Further Mathematics.",
    evidence: [
      "Student Gamma: average 48%, attendance 79%, trend -8.4%",
      "Student Gamma: two incidents and two interventions",
      "Student Beta: average 61%, trend -3.1%",
      "Student Epsilon: stable overall with subject-specific weakness",
    ],
    actions: [
      { label: "Open Students", href: "/principal/students" },
      { label: "Review Incidents", href: "/principal/incidents" },
      { label: "Contact guardians", href: "/principal/communication" },
    ],
    confidence: "High",
    scope: "Students · Attendance · Incidents · Results",
  },
  "Compare this term with the previous term": {
    title: "Term-on-term comparison",
    answer: "The current prototype shows stronger performance in JSS 2A and JSS 3A, while JSS 2B and SS 1A are below their recent direction. Attendance is broadly stable school-wide, but the classes with declining academic results also show weaker syllabus or assessment completion. This means the school-wide average can look healthy while a small number of classes still need targeted intervention.",
    evidence: [
      "JSS 2A trend: +4.7%",
      "JSS 3A trend: +6.4%",
      "JSS 2B trend: -6.8%",
      "SS 1A trend: -1.9%",
      "School-wide monitored results remain mostly above 68%",
    ],
    actions: [
      { label: "Open Results", href: "/principal/results" },
      { label: "Open Academics", href: "/principal/academics" },
    ],
    confidence: "Medium",
    scope: "Results · Academics",
  },
  "Which classes are behind on syllabus coverage?": {
    title: "Syllabus coverage exceptions",
    answer: "JSS 2B is the clearest syllabus concern at 63% coverage, followed by SS 1A at 69%. JSS 2A is stronger at 74%, while JSS 3A is currently the healthiest monitored class at 84%. The priority should be to confirm whether the lag comes from missed lessons, teacher workload, attendance disruption or topic difficulty before changing the timetable.",
    evidence: [
      "JSS 2B syllabus: 63%",
      "SS 1A syllabus: 69%",
      "JSS 2A syllabus: 74%",
      "JSS 3A syllabus: 84%",
    ],
    actions: [
      { label: "Open Academics", href: "/principal/academics" },
      { label: "Review Teachers", href: "/principal/teachers" },
      { label: "Review Timetable", href: "/principal/timetable" },
    ],
    confidence: "High",
    scope: "Academics · Teachers · Timetable",
  },
};

const defaultInsight = responses["What needs my attention today?"];

export default function PrincipalAIPage() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("What needs my attention today?");
  const [history, setHistory] = useState<string[]>([
    "What needs my attention today?",
    "Why is JSS 2B declining?",
  ]);

  const insight = useMemo(() => {
    if (responses[lastQuestion]) return responses[lastQuestion];
    const normalized = lastQuestion.toLowerCase();
    if (normalized.includes("jss 2b") || normalized.includes("declin")) return responses["Why is JSS 2B declining?"];
    if (normalized.includes("teacher") || normalized.includes("staff")) return responses["Which teachers need support?"];
    if (normalized.includes("student") || normalized.includes("risk")) return responses["Which students are at risk?"];
    if (normalized.includes("syllabus") || normalized.includes("coverage")) return responses["Which classes are behind on syllabus coverage?"];
    if (normalized.includes("term") || normalized.includes("compare")) return responses["Compare this term with the previous term"];
    return {
      ...defaultInsight,
      title: "School-wide prototype analysis",
      answer: "This prototype AI workspace is not connected to the production data layer yet. I can currently demonstrate school-wide reasoning using the portal’s mock data. In production, the same question would be answered only from records the active principal is permitted to access, with tenant and role filters applied before any context is sent to the model.",
      confidence: "Medium" as const,
    };
  }, [lastQuestion]);

  function ask(q?: string) {
    const next = (q ?? question).trim();
    if (!next) return;
    setLastQuestion(next);
    setHistory((current) => [next, ...current.filter((item) => item !== next)].slice(0, 6));
    setQuestion("");
  }

  return (
    <main className="principal-module-shell principal-ai-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · AI INTELLIGENCE</span>
          <h1>Principal AI</h1>
          <p>Ask school-wide questions, understand the evidence, and move directly into the underlying workflow.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/academics">Academics</Link>
          <Link href="/principal/students">Students</Link>
          <Link href="/principal/teachers">Teachers</Link>
        </div>
      </header>

      <section className="principal-ai-guardrail">
        <div className="principal-ai-shield">AI</div>
        <div>
          <strong>Permission-bound school intelligence</strong>
          <p>Principal AI must resolve the active school, membership and principal permissions before retrieving data. It must never search another school, expose finance or staff-confidential records outside the principal’s permission set, or make automatic safeguarding/disciplinary decisions.</p>
        </div>
        <span>Prototype data</span>
      </section>

      <section className="principal-ai-grid">
        <article className="principal-module-card principal-ai-chat-card">
          <div className="principal-ai-chat-head">
            <div><h2>Ask Your School</h2><p>Ask in normal language. The answer should explain both the conclusion and the supporting school signals.</p></div>
            <span>Principal scope</span>
          </div>

          <div className="principal-ai-suggestions">
            {suggestedQuestions.map((item) => (
              <button key={item} onClick={() => ask(item)}>{item}</button>
            ))}
          </div>

          <div className="principal-ai-question-box">
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Example: Why is JSS 2B declining, and what should I review first?" />
            <div><small>Prototype answers use the current SchoolOS mock dataset.</small><button onClick={() => ask()}>Ask Principal AI</button></div>
          </div>

          <div className="principal-ai-answer">
            <div className="principal-ai-answer-top">
              <div><span>QUESTION</span><strong>{lastQuestion}</strong></div>
              <b className={`ai-confidence ${insight.confidence.toLowerCase()}`}>{insight.confidence} confidence</b>
            </div>
            <h2>{insight.title}</h2>
            <p>{insight.answer}</p>

            <div className="principal-ai-evidence">
              <span>Evidence used</span>
              {insight.evidence.map((item) => <div key={item}><i />{item}</div>)}
            </div>

            <div className="principal-ai-scope"><span>DATA SCOPE</span><strong>{insight.scope}</strong></div>

            <div className="principal-ai-answer-actions">
              {insight.actions.map((action) => <Link key={action.label} href={action.href}>{action.label}</Link>)}
            </div>
          </div>
        </article>

        <aside className="principal-ai-side">
          <article className="principal-module-card principal-ai-priorities">
            <div className="principal-ai-side-head"><h2>Priority signals</h2><span>Today</span></div>
            <div className="principal-ai-priority high"><span>1</span><div><strong>JSS 2B combined risk</strong><p>Academic decline + attendance weakness + syllabus lag.</p></div><Link href="/principal/academics">Open</Link></div>
            <div className="principal-ai-priority high"><span>2</span><div><strong>Science coverage</strong><p>Staff absence may affect lesson coverage and pace.</p></div><Link href="/principal/timetable">Open</Link></div>
            <div className="principal-ai-priority medium"><span>3</span><div><strong>Report approval</strong><p>JSS 2B report cards are still awaiting principal review.</p></div><Link href="/principal/approvals">Open</Link></div>
            <div className="principal-ai-priority medium"><span>4</span><div><strong>Student Gamma</strong><p>Highest combined student risk in the prototype dataset.</p></div><Link href="/principal/students">Open</Link></div>
          </article>

          <article className="principal-module-card principal-ai-history">
            <div className="principal-ai-side-head"><h2>Recent questions</h2><span>Prototype</span></div>
            {history.map((item) => <button key={item} onClick={() => ask(item)}>{item}</button>)}
          </article>

          <article className="principal-module-card principal-ai-boundaries">
            <h2>What Principal AI can do</h2>
            <div><span>✓</span><p>Summarize academics, attendance, teachers, students, timetable, results and incidents within principal permissions.</p></div>
            <div><span>✓</span><p>Explain why a risk was surfaced and link back to the source workflow.</p></div>
            <div><span>✓</span><p>Suggest review steps while leaving decisions to authorized school staff.</p></div>
            <div className="blocked"><span>×</span><p>No cross-school retrieval, hidden staff-confidential access, automatic punishment or autonomous safeguarding decisions.</p></div>
          </article>
        </aside>
      </section>

      <section className="principal-ai-bottom-grid">
        <article className="principal-module-card">
          <h2>AI data path</h2>
          <div className="principal-ai-flow">
            <span>Principal</span><i>→</i><span>Active school</span><i>→</i><span>Role & permissions</span><i>→</i><span>Allowed records</span><i>→</i><span>Context builder</span><i>→</i><span>AI answer</span>
          </div>
        </article>
        <article className="principal-module-card">
          <h2>Production principle</h2>
          <p className="principal-ai-production-copy">The model should never receive an unrestricted database dump. SchoolOS should retrieve the smallest authorized context first, then ask the model to reason over that context. That keeps tenant isolation and role permissions outside the model rather than trusting the model to enforce them.</p>
        </article>
      </section>
    </main>
  );
}
