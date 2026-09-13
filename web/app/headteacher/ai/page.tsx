"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Evidence = { label: string; value: string; note: string; href: string };
type Answer = {
  title: string;
  summary: string;
  evidence: Evidence[];
  actions: { label: string; detail: string; href: string }[];
  caution?: string;
};

const prompts = [
  "Which Early Years group needs attention today?",
  "Why is Reception A showing more review signals?",
  "Which educator support should I review?",
  "What guardian follow-up is still open?",
  "Which development reports are least ready?",
  "What should I follow up before closing today?",
];

const answers: Record<string, Answer> = {
  "Which Early Years group needs attention today?": {
    title: "Reception A needs the clearest coordinated review today",
    summary: "Reception A has the lowest attendance, observation coverage and routine stability across the current Early Years prototype. That combination is useful for deciding what to review, but it does not prove a developmental or family problem.",
    evidence: [
      { label: "Attendance", value: "90%", note: "Lowest group attendance in the current Early Years view.", href: "/headteacher/attendance" },
      { label: "Observation coverage", value: "78–81%", note: "Lower than Nursery 1 and Nursery 2 across recent views.", href: "/headteacher/observations" },
      { label: "Routine stability", value: "88%", note: "Arrival, transitions and departure have active review items.", href: "/headteacher/routines" },
      { label: "Report readiness", value: "78%", note: "Lowest current group readiness for developmental reports.", href: "/headteacher/reports" },
    ],
    actions: [
      { label: "Review observations", detail: "Complete missing evidence before strengthening developmental conclusions.", href: "/headteacher/observations" },
      { label: "Review routines", detail: "Check arrival, transitions and departure before changing learning provision.", href: "/headteacher/routines" },
      { label: "Check guardian follow-ups", detail: "Continue the existing attendance and settling-in conversations where already open.", href: "/headteacher/guardians" },
    ],
    caution: "The pattern does not identify a cause. Do not infer neglect, developmental delay, educator failure or family circumstances from these signals alone.",
  },
  "Why is Reception A showing more review signals?": {
    title: "The prototype shows several connected operational signals, not one proven cause",
    summary: "Reception A combines lower attendance, thinner observation coverage and a few routine exceptions. Planned learning activities are still present, so the first leadership response should be to improve context and evidence quality before changing provision.",
    evidence: [
      { label: "Attendance", value: "90%", note: "Lower than Nursery 1 and Nursery 2 in the current prototype.", href: "/headteacher/attendance" },
      { label: "Observations", value: "21 / 26 children", note: "Five children remain overdue in the current observation cycle.", href: "/headteacher/observations" },
      { label: "Planning readiness", value: "82%", note: "The weekly plan exists, with a few material/readiness gaps.", href: "/headteacher/planning" },
      { label: "Routine exceptions", value: "2 open", note: "Settling and departure routines are under review.", href: "/headteacher/routines" },
    ],
    actions: [
      { label: "Protect observation time", detail: "Give the Reception team space to close evidence gaps without adding unnecessary workload.", href: "/headteacher/educators" },
      { label: "Resolve routine friction", detail: "Review settling and handoff flow before interpreting learning patterns.", href: "/headteacher/routines" },
      { label: "Recheck in one cycle", detail: "Compare again after attendance and observation coverage improve.", href: "/headteacher/development" },
    ],
    caution: "Association is not causation. The system should not claim attendance or routines caused a developmental pattern.",
  },
  "Which educator support should I review?": {
    title: "Review Reception A documentation capacity first",
    summary: "Mrs. Fatima Bello and the Reception A team are carrying comparatively high activity load while observation completion is lower. This is a coaching and workflow signal, not a judgement of professional competence.",
    evidence: [
      { label: "Mrs. Fatima Bello", value: "79% observations", note: "Lead educator for Reception A with 20 activity blocks/week.", href: "/headteacher/educators" },
      { label: "Mr. Daniel Musa", value: "81% observations", note: "Also supporting Reception A with 19 activity blocks/week.", href: "/headteacher/educators" },
      { label: "Reception A coverage", value: "78–81%", note: "The group remains the lowest observation-coverage area.", href: "/headteacher/observations" },
    ],
    actions: [
      { label: "Schedule support check-in", detail: "Discuss documentation time, workload and routine pressure with the Reception team.", href: "/headteacher/educators" },
      { label: "Review activity plan", detail: "Check whether planned activity load leaves enough evidence-capture time.", href: "/headteacher/planning" },
    ],
    caution: "Do not use these indicators for automatic discipline, pay, promotion, dismissal or competence scoring.",
  },
  "What guardian follow-up is still open?": {
    title: "Three guardian conversations currently need school follow-up",
    summary: "The current prototype shows open school responses around settling-in, development and attendance. The most time-sensitive is the Reception A attendance meeting request.",
    evidence: [
      { label: "Guardian Yusuf", value: "Awaiting school", note: "Attendance conversation includes a proposed meeting before class.", href: "/headteacher/guardians" },
      { label: "Guardian Ibrahim", value: "Awaiting school", note: "Settling-in context has a new guardian response.", href: "/headteacher/guardians" },
      { label: "Guardian Fatima", value: "Awaiting school", note: "Guardian asked for more context about sound-play activities.", href: "/headteacher/guardians" },
    ],
    actions: [
      { label: "Confirm attendance meeting", detail: "Reply to the existing Reception A attendance thread without inventing a cause for absence.", href: "/headteacher/guardians" },
      { label: "Continue settling-in conversation", detail: "Share observed routine facts and agree the next check-in point.", href: "/headteacher/guardians" },
    ],
    caution: "Guardian messages and attendance patterns do not justify assumptions about parenting, health or private family circumstances.",
  },
  "Which development reports are least ready?": {
    title: "Reception A is currently the least report-ready group",
    summary: "Reception A has the lowest group report readiness at 78%, and the weakest individual examples are also the records with lower attendance or observation coverage. Report review should focus on evidence completeness rather than developmental labels.",
    evidence: [
      { label: "Reception A", value: "78% ready", note: "19 of 26 reports are currently ready in the mock group summary.", href: "/headteacher/reports" },
      { label: "Child Yusuf", value: "76% observations", note: "Draft report should remain cautious until evidence improves.", href: "/headteacher/reports" },
      { label: "Child David", value: "83% observations", note: "Draft report explicitly requests completion of the current observation cycle.", href: "/headteacher/reports" },
    ],
    actions: [
      { label: "Complete observation gaps", detail: "Close missing evidence before approving family-facing developmental summaries.", href: "/headteacher/observations" },
      { label: "Review report language", detail: "Keep comments descriptive, contextual and free from fixed ability labels.", href: "/headteacher/reports" },
    ],
  },
  "What should I follow up before closing today?": {
    title: "Five Early Years follow-ups are worth closing or handing over today",
    summary: "The current mock workspace points to a small operational list: Reception A observation coverage, a pending guardian attendance meeting, two routine exceptions, one open welfare case and one planning-resource gap.",
    evidence: [
      { label: "Observations", value: "Reception A", note: "Five children remain overdue in the current observation cycle.", href: "/headteacher/observations" },
      { label: "Guardian follow-up", value: "1 priority", note: "Reception A attendance meeting request is awaiting school response.", href: "/headteacher/guardians" },
      { label: "Routine exceptions", value: "2", note: "Reception A settling/departure and Nursery 2 hygiene flow need review.", href: "/headteacher/routines" },
      { label: "Welfare", value: "1 open", note: "Operational health-support case is awaiting guardian contact.", href: "/headteacher/incidents" },
      { label: "Planning", value: "1 key gap", note: "Reception A creative activity still needs additional materials.", href: "/headteacher/planning" },
    ],
    actions: [
      { label: "Close or hand over today's follow-ups", detail: "Confirm owner and next checkpoint for each open item.", href: "/headteacher" },
      { label: "Review tomorrow's readiness", detail: "Check routines, staffing and planned activities for the next school day.", href: "/headteacher/planning" },
    ],
  },
};

const sources = [
  { label: "Development & Learning", detail: "Developmental domains and group patterns", href: "/headteacher/development" },
  { label: "Observations", detail: "Coverage, evidence notes and review states", href: "/headteacher/observations" },
  { label: "Attendance", detail: "Child/educator attendance and follow-up", href: "/headteacher/attendance" },
  { label: "Educators", detail: "Planning, workload and support context", href: "/headteacher/educators" },
  { label: "Planning & Activities", detail: "Weekly provision, resources and readiness", href: "/headteacher/planning" },
  { label: "Daily Routines", detail: "Settling, care, transitions and departure", href: "/headteacher/routines" },
  { label: "Guardians", detail: "Authorized family communication context", href: "/headteacher/guardians" },
  { label: "Reports", detail: "Development-summary readiness and review state", href: "/headteacher/reports" },
];

export default function HeadTeacherAIPage() {
  const [question, setQuestion] = useState(prompts[0]);
  const [activeQuestion, setActiveQuestion] = useState(prompts[0]);
  const [history, setHistory] = useState<string[]>([prompts[0]]);

  const answer = useMemo(() => answers[activeQuestion] ?? {
    title: "Early Years AI prototype response",
    summary: "This UI prototype only answers from the mocked Early Years context currently represented in the portal. Try one of the suggested questions to see an evidence-linked response.",
    evidence: [],
    actions: [],
  }, [activeQuestion]);

  function ask(value?: string) {
    const next = (value ?? question).trim();
    if (!next) return;
    setQuestion(next);
    setActiveQuestion(next);
    setHistory((current) => [next, ...current.filter((item) => item !== next)].slice(0, 6));
  }

  return (
    <main className="headteacher-main early-ai-page" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Head Teacher AI</h1>
          <p>Ask questions across authorized Early Years records and receive evidence-linked summaries and review actions.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/development">Development</Link>
          <Link href="/headteacher/performance">Performance</Link>
        </div>
      </header>

      <section className="early-ai-scope">
        <div><span>ACTIVE AI SCOPE</span><strong>Nursery / Early Years only</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Prototype context is limited to Early Years records this role can see. Primary, Secondary, proprietor settings and restricted safeguarding details are excluded.</p>
      </section>

      <section className="early-ai-guardrails">
        <article><span>CAN DO</span><strong>Summarize patterns, compare groups, find incomplete work and suggest questions or follow-ups.</strong></article>
        <article><span>HUMAN REVIEW</span><strong>Developmental interpretation, educator support, family communication and report approval remain human decisions.</strong></article>
        <article><span>WILL NOT DECIDE</span><strong>Diagnosis, safeguarding findings, guilt, punishment, staff employment actions or parenting quality.</strong></article>
      </section>

      <section className="early-ai-workspace">
        <article className="headteacher-card early-ai-chat-card">
          <div className="early-ai-chat-head"><div className="early-ai-orb">AI</div><div><span className="headteacher-kicker">ASK YOUR EARLY YEARS</span><h2>What do you want to understand?</h2><p>Answers are grounded only in the current Early Years prototype context.</p></div></div>

          <div className="early-ai-prompt-grid">
            {prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<span>→</span></button>)}
          </div>

          <div className="early-ai-input-row">
            <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask about observations, attendance, routines, educators, guardians or development..." />
            <button onClick={() => ask()}>Ask AI</button>
          </div>

          <div className="early-ai-answer">
            <div className="early-ai-answer-label"><span>AI</span><small>EVIDENCE-LINKED PROTOTYPE RESPONSE</small></div>
            <h2>{answer.title}</h2>
            <p>{answer.summary}</p>

            {answer.evidence.length > 0 && <div className="early-ai-evidence-grid">
              {answer.evidence.map((item) => <Link href={item.href} key={`${item.label}-${item.value}`}><span>{item.label}</span><strong>{item.value}</strong><p>{item.note}</p><small>Open source →</small></Link>)}
            </div>}

            {answer.actions.length > 0 && <div className="early-ai-actions-block">
              <span>RECOMMENDED REVIEW ACTIONS</span>
              {answer.actions.map((item, index) => <Link href={item.href} key={item.label}><b>{index + 1}</b><div><strong>{item.label}</strong><p>{item.detail}</p></div><em>Open →</em></Link>)}
            </div>}

            {answer.caution && <div className="early-ai-caution"><strong>Important boundary</strong><p>{answer.caution}</p></div>}
          </div>
        </article>

        <aside className="early-ai-side-column">
          <article className="headteacher-card early-ai-today-card">
            <span className="headteacher-kicker">TODAY'S EARLY YEARS BRIEF</span>
            <h2>Leadership attention</h2>
            <div><span>1</span><p><strong>Reception A</strong><small>Attendance + observations + routines</small></p></div>
            <div><span>2</span><p><strong>Guardian follow-up</strong><small>Attendance meeting request awaiting school</small></p></div>
            <div><span>3</span><p><strong>Observation completion</strong><small>Reception A remains the lowest coverage group</small></p></div>
            <div><span>4</span><p><strong>Routine exceptions</strong><small>Settling, hygiene and departure reviews</small></p></div>
          </article>

          <article className="headteacher-card early-ai-history-card">
            <span className="headteacher-kicker">RECENT QUESTIONS</span>
            <div>{history.map((item) => <button key={item} onClick={() => ask(item)}>{item}</button>)}</div>
          </article>

          <article className="headteacher-card early-ai-source-card">
            <span className="headteacher-kicker">AUTHORIZED SOURCE MODULES</span>
            <div>{sources.map((source) => <Link href={source.href} key={source.label}><strong>{source.label}</strong><small>{source.detail}</small><em>Available</em></Link>)}</div>
          </article>
        </aside>
      </section>

      <section className="headteacher-card early-ai-boundary-card">
        <span className="headteacher-kicker">AI ACCESS BOUNDARY</span>
        <h3>User → School → Campus → Early Years → Role + Permissions → Allowed Records → AI Context</h3>
        <p>The production system should filter records before AI context is created. Restricted safeguarding details, other academic sections and unauthorized records must never enter the ordinary Head Teacher AI context.</p>
        <div><Link href="/headteacher/incidents">Welfare boundary</Link><Link href="/headteacher/profile">Workspace permissions</Link></div>
      </section>
    </main>
  );
}
