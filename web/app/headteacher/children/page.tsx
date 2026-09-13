"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DevelopmentState = "Emerging" | "Developing" | "Secure";
type SupportState = "Routine" | "Follow-up" | "Active support";
type Child = {
  id: string;
  name: string;
  group: string;
  age: string;
  attendance: number;
  routine: "Settled" | "Mostly settled" | "Needs support";
  observations: number;
  language: DevelopmentState;
  earlyMaths: DevelopmentState;
  physical: DevelopmentState;
  personalSocial: DevelopmentState;
  creative: DevelopmentState;
  support: SupportState;
  leadEducator: string;
  guardian: string;
  guardianStatus: string;
  note: string;
};

const children: Child[] = [
  { id: "EY-C001", name: "Child Amina", group: "Nursery 1", age: "3y 5m", attendance: 98, routine: "Settled", observations: 94, language: "Developing", earlyMaths: "Developing", physical: "Secure", personalSocial: "Secure", creative: "Secure", support: "Routine", leadEducator: "Mrs. Aisha Musa", guardian: "Guardian Amina", guardianStatus: "Up to date", note: "Enjoys storytelling and collaborative play. Continue normal observation cycle." },
  { id: "EY-C002", name: "Child Ibrahim", group: "Nursery 1", age: "3y 7m", attendance: 95, routine: "Mostly settled", observations: 90, language: "Emerging", earlyMaths: "Developing", physical: "Secure", personalSocial: "Developing", creative: "Secure", support: "Follow-up", leadEducator: "Mrs. Aisha Musa", guardian: "Guardian Ibrahim", guardianStatus: "Settling-in conversation open", note: "Language participation is increasing. Continue small-group storytelling and family conversation about familiar words." },
  { id: "EY-C003", name: "Child Maryam", group: "Nursery 2", age: "4y 2m", attendance: 97, routine: "Settled", observations: 92, language: "Secure", earlyMaths: "Developing", physical: "Secure", personalSocial: "Secure", creative: "Developing", support: "Routine", leadEducator: "Mrs. Halima Yusuf", guardian: "Guardian Maryam", guardianStatus: "Up to date", note: "Strong communication and social participation. Keep broad play-based experiences." },
  { id: "EY-C004", name: "Child David", group: "Nursery 2", age: "4y 4m", attendance: 91, routine: "Mostly settled", observations: 83, language: "Developing", earlyMaths: "Developing", physical: "Developing", personalSocial: "Developing", creative: "Secure", support: "Follow-up", leadEducator: "Mrs. Halima Yusuf", guardian: "Guardian David", guardianStatus: "Attendance follow-up due", note: "Observation coverage is incomplete this cycle. Review attendance context before drawing conclusions from missing evidence." },
  { id: "EY-C005", name: "Child Fatima", group: "Reception A", age: "5y 0m", attendance: 96, routine: "Settled", observations: 88, language: "Secure", earlyMaths: "Secure", physical: "Developing", personalSocial: "Secure", creative: "Developing", support: "Routine", leadEducator: "Mrs. Fatima Bello", guardian: "Guardian Fatima", guardianStatus: "Up to date", note: "Ready for continued phonics, number-pattern and transition activities at the current pace." },
  { id: "EY-C006", name: "Child Yusuf", group: "Reception A", age: "5y 1m", attendance: 89, routine: "Needs support", observations: 76, language: "Developing", earlyMaths: "Emerging", physical: "Secure", personalSocial: "Developing", creative: "Developing", support: "Active support", leadEducator: "Mrs. Fatima Bello", guardian: "Guardian Yusuf", guardianStatus: "Guardian meeting requested", note: "Current evidence is limited by lower attendance and observation completion. Keep the response supportive: stabilize routines, complete observations and work with the guardian." },
  { id: "EY-C007", name: "Child Grace", group: "Reception A", age: "4y 11m", attendance: 93, routine: "Mostly settled", observations: 81, language: "Developing", earlyMaths: "Secure", physical: "Secure", personalSocial: "Developing", creative: "Secure", support: "Follow-up", leadEducator: "Mrs. Fatima Bello", guardian: "Guardian Grace", guardianStatus: "Routine update planned", note: "Continue social-confidence opportunities and complete the current observation cycle." },
];

const observationTimeline = [
  { date: "Today", area: "Language & Communication", text: "Joined a small-group story retelling activity and used familiar phrases with educator prompts." },
  { date: "Yesterday", area: "Personal & Social", text: "Settled after arrival with a shorter support period than earlier in the week." },
  { date: "This week", area: "Early Numeracy", text: "Explored matching and quantity activities during guided play." },
];

const groupSummary = [
  { group: "Nursery 1", children: 28, attendance: 96, observations: 91, followUps: 2 },
  { group: "Nursery 2", children: 30, attendance: 93, observations: 84, followUps: 3 },
  { group: "Reception A", children: 26, attendance: 90, observations: 78, followUps: 4 },
];

export default function HeadTeacherChildrenPage() {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All groups");
  const [supportFilter, setSupportFilter] = useState("All support states");
  const [selectedId, setSelectedId] = useState("EY-C006");
  const [followedUp, setFollowedUp] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const filtered = useMemo(() => children.filter((child) => {
    const matchesQuery = `${child.name} ${child.id} ${child.group} ${child.leadEducator} ${child.guardian}`.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = groupFilter === "All groups" || child.group === groupFilter;
    const matchesSupport = supportFilter === "All support states" || child.support === supportFilter;
    return matchesQuery && matchesGroup && matchesSupport;
  }), [query, groupFilter, supportFilter]);

  const selected = children.find((child) => child.id === selectedId) ?? children[0];
  const openSupport = children.filter((child) => child.support !== "Routine").length;
  const avgAttendance = Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / children.length);
  const avgObservation = Math.round(children.reduce((sum, child) => sum + child.observations, 0) / children.length);

  function markGuardianFollowUp() {
    setFollowedUp((current) => current.includes(selected.id) ? current : [...current, selected.id]);
  }

  const development = [
    ["Language & Communication", selected.language],
    ["Early Numeracy", selected.earlyMaths],
    ["Physical Development", selected.physical],
    ["Personal & Social", selected.personalSocial],
    ["Creative Exploration", selected.creative],
  ] as const;

  return (
    <main className="headteacher-main early-children-page" style={{ maxWidth: 1380, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Children</h1>
          <p>Review each child in context: attendance, routines, observations, developmental learning, educator notes and guardian follow-up.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/observations">Observations</Link>
          <Link href="/headteacher/guardians">Guardians</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>This view is for Early Years children only. It uses developmental context and does not rank children against one another.</p>
      </section>

      <section className="early-children-kpis">
        <article><span>Children enrolled</span><strong>84</strong><small>Across Early Years groups</small></article>
        <article><span>Present today</span><strong>80</strong><small>95% section attendance</small></article>
        <article><span>Representative attendance</span><strong>{avgAttendance}%</strong><small>Shown child records</small></article>
        <article><span>Observation coverage</span><strong>{avgObservation}%</strong><small>Representative records</small></article>
        <article><span>Open support follow-ups</span><strong>{openSupport}</strong><small>Routine support / guardian context</small></article>
        <article><span>Restricted ranking</span><strong>Off</strong><small>No league table or ability score</small></article>
      </section>

      <section className="early-children-workspace">
        <article className="headteacher-card early-child-directory">
          <header className="headteacher-section-head">
            <div><h3>Child directory</h3><p>Search children and review their current Early Years context.</p></div>
            <div className="early-child-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search child, group, educator or guardian..." />
              <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select>
              <select value={supportFilter} onChange={(e) => setSupportFilter(e.target.value)}><option>All support states</option><option>Routine</option><option>Follow-up</option><option>Active support</option></select>
            </div>
          </header>

          <div className="early-child-table-wrap">
            <div className="early-child-row heading"><span>Child</span><span>Group</span><span>Attendance</span><span>Routine</span><span>Observations</span><span>Support</span></div>
            {filtered.map((child) => (
              <button key={child.id} className={`early-child-row ${selected.id === child.id ? "selected" : ""}`} onClick={() => { setSelectedId(child.id); setNote(""); }}>
                <div><strong>{child.name}</strong><small>{child.id} · {child.age}</small></div>
                <div><strong>{child.group}</strong><small>{child.leadEducator}</small></div>
                <b>{child.attendance}%</b>
                <span>{child.routine}</span>
                <b>{child.observations}%</b>
                <em className={`early-child-support ${child.support.toLowerCase().replaceAll(" ", "-")}`}>{child.support}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headteacher-card early-child-detail">
          <div className="early-child-detail-head">
            <span>{selected.name.split(" ").slice(-1)[0].slice(0, 2).toUpperCase()}</span>
            <div><small>{selected.id} · {selected.age}</small><h2>{selected.name}</h2><p>{selected.group} · {selected.leadEducator}</p></div>
          </div>

          <div className="early-child-context-grid">
            <div><span>Attendance</span><strong>{selected.attendance}%</strong></div>
            <div><span>Routine</span><strong>{selected.routine}</strong></div>
            <div><span>Observation coverage</span><strong>{selected.observations}%</strong></div>
            <div><span>Support</span><strong>{selected.support}</strong></div>
          </div>

          <div className="early-child-development">
            <span>DEVELOPMENTAL CONTEXT</span>
            {development.map(([label, state]) => <div key={label}><strong>{label}</strong><em className={state.toLowerCase()}>{state}</em></div>)}
          </div>

          <div className="early-child-head-note"><span>HEAD TEACHER CONTEXT NOTE</span><p>{selected.note}</p></div>

          <div className="early-child-guardian">
            <span>GUARDIAN CONTEXT</span>
            <strong>{selected.guardian}</strong>
            <p>{selected.guardianStatus}</p>
            <div><Link href="/headteacher/guardians">Open communication</Link><button onClick={markGuardianFollowUp}>{followedUp.includes(selected.id) ? "Follow-up noted" : "Mark follow-up"}</button></div>
          </div>

          <label className="early-child-note">Private leadership note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add factual Early Years follow-up or coordination note..." /></label>
          <small className="early-child-local-note">Prototype only: notes and follow-up state are not persisted.</small>
        </aside>
      </section>

      <section className="early-children-lower-grid">
        <article className="headteacher-card early-group-summary-card">
          <header className="headteacher-section-head"><div><h3>Group context</h3><p>Use group-level operational signals before interpreting individual records.</p></div><Link href="/headteacher/performance">Performance →</Link></header>
          <div className="early-group-summary-list">
            {groupSummary.map((item) => <div key={item.group}><div><strong>{item.group}</strong><small>{item.children} children</small></div><span>Attendance<strong>{item.attendance}%</strong></span><span>Observations<strong>{item.observations}%</strong></span><span>Follow-ups<strong>{item.followUps}</strong></span></div>)}
          </div>
        </article>

        <article className="headteacher-card early-child-observation-card">
          <header className="headteacher-section-head"><div><h3>Recent observation examples</h3><p>Qualitative evidence for the selected child.</p></div><Link href="/headteacher/observations">All observations →</Link></header>
          <div className="early-child-observation-list">
            {observationTimeline.map((item) => <div key={`${item.date}-${item.area}`}><span>{item.date}</span><strong>{item.area}</strong><p>{item.text}</p></div>)}
          </div>
        </article>
      </section>

      <section className="headteacher-card early-child-ai-card">
        <span className="headteacher-kicker">HEAD TEACHER AI · CHILD CONTEXT</span>
        <h3>For {selected.name}, review evidence quality before making any developmental judgement</h3>
        <p>{selected.observations < 80 || selected.attendance < 90 ? "The selected record has lower attendance or observation coverage, so the first action is to improve context: stabilize routines, complete observations and speak with the guardian where appropriate." : "The current record has enough routine and observation context for normal developmental review, but conclusions should still rely on educator observations over time rather than one snapshot."}</p>
        <div className="early-child-ai-actions"><Link href="/headteacher/observations">Review observations</Link><Link href="/headteacher/development">Development & Learning</Link><Link href="/headteacher/ai">Ask Head Teacher AI</Link></div>
      </section>

      <section className="headteacher-card early-child-boundary">
        <span className="headteacher-kicker">EARLY YEARS CHILD DATA RULE</span>
        <h3>Development is contextual, longitudinal and age-appropriate</h3>
        <p>The system may organize observations, routines, attendance and educator notes, but it should not create a permanent ability label, compare children in a public league table, diagnose developmental conditions or infer family circumstances from limited data.</p>
      </section>
    </main>
  );
}
