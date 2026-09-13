"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type InsightArea = "Academics" | "Attendance" | "Teachers" | "Timetable" | "Reports" | "Communication";
type Evidence = { label: string; value: string; note: string; href: string };
type Answer = {
  title: string;
  summary: string;
  evidence: Evidence[];
  actions: { label: string; detail: string; href: string }[];
  caution?: string;
};

const prompts = [
  "Which Primary class needs attention today?",
  "Why is Primary 3 behind the other classes?",
  "Which teacher workload should I review?",
  "What attendance follow-up is still open?",
  "Which report batch is least ready?",
  "What should I follow up before closing today?",
];

const answers: Record<string, Answer> = {
  "Which Primary class needs attention today?": {
    title: "Primary 3 needs the clearest coordinated follow-up",
    summary: "Primary 3 is weaker than the section pattern across three connected indicators: attendance, literacy and curriculum pace. The useful next step is a coordinated review with the class teacher and guardian follow-up, not a punitive response.",
    evidence: [
      { label: "Attendance", value: "89%", note: "Lowest class attendance in the Primary section prototype.", href: "/headmaster/attendance" },
      { label: "Literacy", value: "66%", note: "Below the current Primary section literacy pattern.", href: "/headmaster/academics" },
      { label: "Curriculum coverage", value: "64%", note: "Behind the expected pace for this point in term.", href: "/headmaster/academics" },
      { label: "Report readiness", value: "74%", note: "Current reporting work is also less complete than other classes.", href: "/headmaster/results" },
    ],
    actions: [
      { label: "Review the class teacher", detail: "Discuss attendance, lesson pace and reading-support activity together.", href: "/headmaster/teachers" },
      { label: "Check pupil support", detail: "Review pupils already on literacy or attendance follow-up.", href: "/headmaster/pupils" },
      { label: "Contact relevant guardians", detail: "Use targeted communication where attendance follow-up is already due.", href: "/headmaster/communication" },
    ],
  },
  "Why is Primary 3 behind the other classes?": {
    title: "The prototype points to a combined pattern, not one single cause",
    summary: "Primary 3 currently has lower attendance, slower curriculum coverage and weaker literacy outcomes at the same time. That association is useful for deciding what to review, but it does not prove that one factor caused another.",
    evidence: [
      { label: "Attendance", value: "89%", note: "Below the other Primary classes shown in the prototype.", href: "/headmaster/attendance" },
      { label: "Literacy", value: "66%", note: "Lower than the section average shown in Academics.", href: "/headmaster/academics" },
      { label: "Numeracy", value: "68%", note: "Also below stronger-performing classes, though less sharply than literacy.", href: "/headmaster/academics" },
      { label: "Curriculum coverage", value: "64%", note: "Suggests lesson pace should be reviewed with the teacher.", href: "/headmaster/academics" },
    ],
    actions: [
      { label: "Teacher support review", detail: "Review planning, workload and current class support with Mrs. Ruth James.", href: "/headmaster/teachers" },
      { label: "Attendance context", detail: "Check the repeat-absence follow-up queue before interpreting academic trends.", href: "/headmaster/attendance" },
      { label: "Two-week recovery plan", detail: "Track reading support and curriculum progress, then compare again.", href: "/headmaster/academics" },
    ],
    caution: "This AI view should not infer motivation, family circumstances, teacher competence or pupil ability from these metrics alone.",
  },
  "Which teacher workload should I review?": {
    title: "Review workload pressure before adding more teaching periods",
    summary: "Mr. David Joseph is currently above the prototype Primary target at 24 periods per week, while Mr. Kabiru Lawal is close at 23. This is a workload planning signal only; it should support a conversation, not an employment judgement.",
    evidence: [
      { label: "David Joseph", value: "24 / 22", note: "Above the current planning target and also carries Primary 4 class responsibility.", href: "/headmaster/teachers" },
      { label: "Kabiru Lawal", value: "23 / 22", note: "Slightly above target with Primary 5 class responsibility.", href: "/headmaster/teachers" },
      { label: "Halima Sani", value: "16 / 22", note: "Current specialist load leaves comparatively more scheduling capacity.", href: "/headmaster/teachers" },
    ],
    actions: [
      { label: "Open teaching assignments", detail: "Check whether new subject periods can be balanced differently.", href: "/headmaster/assignments" },
      { label: "Open timetable", detail: "Review conflicts and substitutions alongside workload.", href: "/headmaster/timetable" },
    ],
    caution: "Do not use this prototype scorecard to make hiring, firing, disciplinary, promotion or pay decisions.",
  },
  "What attendance follow-up is still open?": {
    title: "The most important open attendance follow-up is in Primary 3",
    summary: "Pupil Gamma has a repeated-absence case with guardian follow-up already underway. The current workflow is to confirm the guardian response, agree the next attendance checkpoint and continue monitoring.",
    evidence: [
      { label: "Primary 3", value: "88–89%", note: "Lowest daily/class attendance shown across the Primary prototype views.", href: "/headmaster/attendance" },
      { label: "Repeated absence", value: "4 / 10 days", note: "The attendance queue flags a repeated pattern for manual follow-up.", href: "/headmaster/attendance" },
      { label: "Guardian response", value: "Received", note: "A reply exists in the Primary communication centre.", href: "/headmaster/communication" },
    ],
    actions: [
      { label: "Review attendance case", detail: "Confirm the current attendance checkpoint and status.", href: "/headmaster/attendance" },
      { label: "Open communication", detail: "Continue the existing guardian conversation if needed.", href: "/headmaster/communication" },
    ],
    caution: "Attendance patterns do not reveal why a pupil is absent. The system should never invent a cause.",
  },
  "Which report batch is least ready?": {
    title: "Primary 3 is the least report-ready class in the prototype",
    summary: "Primary 3 has 88% score completion and 74% report readiness, which is lower than the other class batches shown. Review missing score entries and teacher comments before approval or release.",
    evidence: [
      { label: "Score completion", value: "88%", note: "Lowest current score-completion figure in the Primary result view.", href: "/headmaster/results" },
      { label: "Report readiness", value: "74%", note: "Still in Draft state in the prototype.", href: "/headmaster/results" },
      { label: "Class average", value: "66%", note: "Useful context, but readiness should be based on completion and review—not average score.", href: "/headmaster/results" },
    ],
    actions: [
      { label: "Open report review", detail: "Check score completion, teacher comments and report-card readiness.", href: "/headmaster/results" },
      { label: "Review academics", detail: "Use the academic context to guide supportive comments, not release eligibility.", href: "/headmaster/academics" },
    ],
  },
  "What should I follow up before closing today?": {
    title: "Four Primary leadership follow-ups remain important today",
    summary: "The current mock data points to a small set of concrete actions: Primary 3 attendance and literacy support, an uncovered Primary 6 Civic Education lesson, and a Monday Mathematics timetable conflict.",
    evidence: [
      { label: "Attendance", value: "Primary 3", note: "Guardian follow-up is already in progress.", href: "/headmaster/attendance" },
      { label: "Literacy", value: "Primary 3", note: "Two-week teacher support plan is the current academic focus.", href: "/headmaster/academics" },
      { label: "Uncovered lesson", value: "P6 Civic", note: "No teacher is assigned to the Monday period in the mock timetable.", href: "/headmaster/timetable" },
      { label: "Schedule conflict", value: "1", note: "Mr. David Joseph has a Monday overlap requiring correction.", href: "/headmaster/timetable" },
    ],
    actions: [
      { label: "Confirm Primary 3 follow-up", detail: "Check teacher plan plus guardian communication.", href: "/headmaster/communication" },
      { label: "Assign Primary 6 Civic", detail: "Resolve the uncovered subject responsibility first.", href: "/headmaster/assignments" },
      { label: "Resolve timetable overlap", detail: "Adjust the conflicting Monday Mathematics period.", href: "/headmaster/timetable" },
    ],
  },
};

const sourceAreas: { area: InsightArea; status: string; detail: string; href: string }[] = [
  { area: "Academics", status: "Available", detail: "Literacy, numeracy, curriculum and class health", href: "/headmaster/academics" },
  { area: "Attendance", status: "Available", detail: "Pupil/staff attendance and follow-up queues", href: "/headmaster/attendance" },
  { area: "Teachers", status: "Available", detail: "Workload, planning and support context", href: "/headmaster/teachers" },
  { area: "Timetable", status: "Available", detail: "Assignments, conflicts, substitutions and room use", href: "/headmaster/timetable" },
  { area: "Reports", status: "Available", detail: "Score completion and report readiness", href: "/headmaster/results" },
  { area: "Communication", status: "Available", detail: "Primary guardian and teacher follow-up context", href: "/headmaster/communication" },
];

export default function HeadmasterAIPage() {
  const [question, setQuestion] = useState(prompts[0]);
  const [activeQuestion, setActiveQuestion] = useState(prompts[0]);
  const [history, setHistory] = useState<string[]>([prompts[0]]);

  const answer = useMemo(() => answers[activeQuestion] ?? {
    title: "Primary School AI prototype response",
    summary: "This UI prototype only answers from the mocked Primary School context currently represented in the portal. Try one of the suggested questions to see an evidence-grounded response.",
    evidence: [],
    actions: [],
  }, [activeQuestion]);

  function ask(value?: string) {
    const q = (value ?? question).trim();
    if (!q) return;
    setQuestion(q);
    setActiveQuestion(q);
    setHistory((current) => [q, ...current.filter((item) => item !== q)].slice(0, 6));
  }

  return (
    <main className="headmaster-module-shell primary-ai-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Headmaster AI</h1>
          <p>Ask questions across the Primary workspace and receive evidence-linked summaries, follow-ups and recommended review actions.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/academics">Academics</Link>
          <Link href="/headmaster/performance">Performance</Link>
        </div>
      </header>

      <section className="primary-ai-scope">
        <div><span>ACTIVE AI SCOPE</span><strong>Primary School only</strong><small>Kaduna Campus · Headmistress workspace</small></div>
        <p>Prototype rule: AI context is limited to Primary records this role is allowed to see. Nursery, Secondary, proprietor settings and restricted safeguarding details are excluded.</p>
      </section>

      <section className="primary-ai-guardrails">
        <article><span>CAN DO</span><strong>Summarize patterns, compare classes, surface incomplete work and suggest follow-up questions.</strong></article>
        <article><span>HUMAN DECISION REQUIRED</span><strong>Academic interventions, teacher support, report approval and timetable changes remain leadership decisions.</strong></article>
        <article><span>WILL NOT DECIDE</span><strong>Discipline, safeguarding findings, medical conclusions, staff employment actions or punishment.</strong></article>
      </section>

      <section className="primary-ai-workspace">
        <article className="headmaster-module-card primary-ai-chat-card">
          <div className="primary-ai-chat-head">
            <div className="primary-ai-orb-large">AI</div>
            <div><span className="page-kicker">ASK YOUR PRIMARY SCHOOL</span><h2>What do you want to understand?</h2><p>Questions are answered from the mock Primary operational context shown in this prototype.</p></div>
          </div>

          <div className="primary-ai-prompt-grid">
            {prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<span>→</span></button>)}
          </div>

          <div className="primary-ai-input-row">
            <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask about Primary academics, attendance, teachers, reports or timetable..." />
            <button onClick={() => ask()}>Ask AI</button>
          </div>

          <div className="primary-ai-answer">
            <div className="primary-ai-answer-label"><span>AI</span><small>EVIDENCE-GROUNDED PROTOTYPE RESPONSE</small></div>
            <h2>{answer.title}</h2>
            <p>{answer.summary}</p>

            {answer.evidence.length > 0 && <div className="primary-ai-evidence-grid">
              {answer.evidence.map((item) => <Link href={item.href} key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><p>{item.note}</p><small>Open source →</small></Link>)}
            </div>}

            {answer.actions.length > 0 && <div className="primary-ai-actions-block"><span>RECOMMENDED REVIEW ACTIONS</span>{answer.actions.map((item, index) => <Link href={item.href} key={item.label}><b>{index + 1}</b><div><strong>{item.label}</strong><p>{item.detail}</p></div><em>Open →</em></Link>)}</div>}

            {answer.caution && <div className="primary-ai-caution"><strong>Important boundary</strong><p>{answer.caution}</p></div>}
          </div>
        </article>

        <aside className="primary-ai-side-column">
          <article className="headmaster-module-card primary-ai-today-card">
            <span className="page-kicker">TODAY'S PRIMARY BRIEF</span>
            <h2>Leadership attention</h2>
            <div><span>1</span><p><strong>Primary 3</strong><small>Attendance + literacy + curriculum pace</small></p></div>
            <div><span>2</span><p><strong>Primary 6 Civic</strong><small>Uncovered timetable responsibility</small></p></div>
            <div><span>3</span><p><strong>Teacher workload</strong><small>Two loads at or above target</small></p></div>
            <div><span>4</span><p><strong>Report readiness</strong><small>Primary 3 still in Draft</small></p></div>
          </article>

          <article className="headmaster-module-card primary-ai-history-card">
            <span className="page-kicker">RECENT QUESTIONS</span>
            <div>{history.map((item) => <button key={item} onClick={() => ask(item)}>{item}</button>)}</div>
          </article>
        </aside>
      </section>

      <section className="headmaster-module-card primary-ai-sources-card">
        <header><div><h2>AI context sources</h2><p>The prototype shows exactly which Primary modules the answer is allowed to draw from.</p></div><span>6 Primary sources</span></header>
        <div className="primary-ai-source-grid">
          {sourceAreas.map((source) => <Link href={source.href} key={source.area}><div><span>{source.area.slice(0, 1)}</span><div><strong>{source.area}</strong><small>{source.detail}</small></div></div><em>{source.status}</em></Link>)}
        </div>
      </section>

      <section className="headmaster-module-card primary-ai-security-card">
        <div><span className="page-kicker">AI ACCESS MODEL</span><h2>Permission filtering happens before AI context is built</h2></div>
        <div className="primary-ai-access-flow"><span>User</span><b>→</b><span>School</span><b>→</b><span>Campus</span><b>→</b><span>Primary Section</span><b>→</b><span>Role + permissions</span><b>→</b><span>Allowed records</span><b>→</b><span>AI context</span></div>
        <p>In production, the model should never receive records the active membership cannot access. Restricted safeguarding content must stay outside ordinary Headmaster AI context even when a general case count is visible.</p>
      </section>
    </main>
  );
}
