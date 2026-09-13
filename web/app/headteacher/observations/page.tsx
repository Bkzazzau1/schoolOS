"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Domain = "Language & Communication" | "Early Numeracy" | "Physical Development" | "Personal & Social" | "Creative Exploration";
type ReviewState = "Draft" | "Ready for review" | "Reviewed" | "Follow-up";
type Observation = {
  id: string;
  child: string;
  childId: string;
  group: string;
  educator: string;
  domain: Domain;
  context: string;
  evidence: string;
  nextStep: string;
  date: string;
  reviewState: ReviewState;
  evidenceQuality: "Clear" | "Needs detail";
};

const initialObservations: Observation[] = [
  { id: "OBS-101", child: "Child Amina", childId: "EY-C001", group: "Nursery 1", educator: "Mrs. Aisha Musa", domain: "Language & Communication", context: "Story circle", evidence: "Retold two familiar events from the story and responded to another child's comment without prompting.", nextStep: "Continue story retelling and introduce new descriptive words during small-group talk.", date: "Today · 9:10 AM", reviewState: "Reviewed", evidenceQuality: "Clear" },
  { id: "OBS-102", child: "Child Ibrahim", childId: "EY-C002", group: "Nursery 1", educator: "Mr. Samuel John", domain: "Personal & Social", context: "Arrival and settling", evidence: "Moved from arrival support to independent play after a short educator check-in and joined two peers at the construction area.", nextStep: "Keep the same arrival routine and observe whether independent settling continues across the week.", date: "Today · 8:05 AM", reviewState: "Ready for review", evidenceQuality: "Clear" },
  { id: "OBS-103", child: "Child Maryam", childId: "EY-C003", group: "Nursery 2", educator: "Mrs. Halima Yusuf", domain: "Early Numeracy", context: "Sorting centre", evidence: "Grouped objects by colour and then changed to size after an educator prompt.", nextStep: "Add comparison language such as bigger, smaller, more and fewer during play.", date: "Yesterday", reviewState: "Reviewed", evidenceQuality: "Clear" },
  { id: "OBS-104", child: "Child David", childId: "EY-C004", group: "Nursery 2", educator: "Miss Grace Peter", domain: "Creative Exploration", context: "Painting activity", evidence: "Enjoyed painting and chose several colours.", nextStep: "Observe again with more detail about choices, persistence, language or technique.", date: "Yesterday", reviewState: "Follow-up", evidenceQuality: "Needs detail" },
  { id: "OBS-105", child: "Child Fatima", childId: "EY-C005", group: "Reception A", educator: "Mrs. Fatima Bello", domain: "Language & Communication", context: "Sound-play activity", evidence: "Identified the starting sound in three familiar words during a small-group phonics game and explained one example to a peer.", nextStep: "Continue with mixed sound-play activities and avoid turning one observation into a fixed attainment label.", date: "Today · 10:20 AM", reviewState: "Ready for review", evidenceQuality: "Clear" },
  { id: "OBS-106", child: "Child Yusuf", childId: "EY-C006", group: "Reception A", educator: "Mr. Daniel Musa", domain: "Early Numeracy", context: "Construction play", evidence: "Matched four blocks to a simple visual pattern after watching a peer demonstration.", nextStep: "Repeat the activity in a familiar routine and gather more evidence before interpreting the pattern.", date: "2 days ago", reviewState: "Follow-up", evidenceQuality: "Clear" },
  { id: "OBS-107", child: "Child Grace", childId: "EY-C007", group: "Reception A", educator: "Mrs. Fatima Bello", domain: "Personal & Social", context: "Outdoor play", evidence: "Waited for a turn on the balance equipment and invited another child to join the activity.", nextStep: "Continue normal opportunities for collaborative play and transition confidence.", date: "Today · 11:15 AM", reviewState: "Draft", evidenceQuality: "Clear" },
  { id: "OBS-108", child: "Child Amina", childId: "EY-C001", group: "Nursery 1", educator: "Mrs. Aisha Musa", domain: "Physical Development", context: "Fine-motor station", evidence: "Used both hands to thread large beads and adjusted grip after one unsuccessful attempt.", nextStep: "Keep varied threading, pinching and mark-making choices available.", date: "This week", reviewState: "Reviewed", evidenceQuality: "Clear" },
];

const coverage = [
  { group: "Nursery 1", children: 28, childrenObserved: 27, observations: 46, coverage: 96, overdue: 1 },
  { group: "Nursery 2", children: 30, childrenObserved: 27, observations: 43, coverage: 90, overdue: 3 },
  { group: "Reception A", children: 26, childrenObserved: 21, observations: 35, coverage: 81, overdue: 5 },
];

const reviewQueue = [
  { id: "RQ-01", title: "Reception A coverage", detail: "Five children have incomplete observation coverage in the current review cycle.", level: "High", href: "/headteacher/children" },
  { id: "RQ-02", title: "Creative observation quality", detail: "One Nursery 2 observation needs more factual detail before it can support a developmental interpretation.", level: "Medium", href: "/headteacher/educators" },
  { id: "RQ-03", title: "Ready for review", detail: "Two recent observations are complete and awaiting Head Teacher review.", level: "Routine", href: "/headteacher/observations" },
];

const domains: Domain[] = ["Language & Communication", "Early Numeracy", "Physical Development", "Personal & Social", "Creative Exploration"];

export default function HeadTeacherObservationsPage() {
  const [observations, setObservations] = useState(initialObservations);
  const [selectedId, setSelectedId] = useState(initialObservations[1].id);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All groups");
  const [domainFilter, setDomainFilter] = useState("All domains");
  const [reviewFilter, setReviewFilter] = useState("All states");
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");
  const [newChild, setNewChild] = useState("Child Amina");
  const [newGroup, setNewGroup] = useState("Nursery 1");
  const [newDomain, setNewDomain] = useState<Domain>("Language & Communication");
  const [newContext, setNewContext] = useState("");
  const [newEvidence, setNewEvidence] = useState("");
  const [newNextStep, setNewNextStep] = useState("");

  const filtered = useMemo(() => observations.filter((item) => {
    const haystack = `${item.child} ${item.childId} ${item.group} ${item.educator} ${item.domain} ${item.context} ${item.evidence}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesGroup = groupFilter === "All groups" || item.group === groupFilter;
    const matchesDomain = domainFilter === "All domains" || item.domain === domainFilter;
    const matchesReview = reviewFilter === "All states" || item.reviewState === reviewFilter;
    return matchesQuery && matchesGroup && matchesDomain && matchesReview;
  }), [observations, query, groupFilter, domainFilter, reviewFilter]);

  const selected = observations.find((item) => item.id === selectedId) ?? observations[0];
  const readyCount = observations.filter((item) => item.reviewState === "Ready for review").length;
  const followUpCount = observations.filter((item) => item.reviewState === "Follow-up").length;
  const needsDetailCount = observations.filter((item) => item.evidenceQuality === "Needs detail").length;
  const overallCoverage = Math.round(coverage.reduce((sum, item) => sum + item.coverage, 0) / coverage.length);

  function changeReviewState(reviewState: ReviewState) {
    setObservations((current) => current.map((item) => item.id === selected.id ? { ...item, reviewState } : item));
    setNotice(`${selected.id} moved to ${reviewState} in the UI prototype.`);
  }

  function saveReviewNote() {
    if (!note.trim()) return;
    setNotice(`Head Teacher review note saved locally for ${selected.id}.`);
    setNote("");
  }

  function createObservation() {
    if (!newContext.trim() || !newEvidence.trim()) return;
    const id = `OBS-${String(observations.length + 109).padStart(3, "0")}`;
    const educator = newGroup === "Nursery 1" ? "Mrs. Aisha Musa" : newGroup === "Nursery 2" ? "Mrs. Halima Yusuf" : "Mrs. Fatima Bello";
    const childId = newChild === "Child Amina" ? "EY-C001" : newChild === "Child Ibrahim" ? "EY-C002" : newChild === "Child Maryam" ? "EY-C003" : newChild === "Child David" ? "EY-C004" : newChild === "Child Fatima" ? "EY-C005" : newChild === "Child Yusuf" ? "EY-C006" : "EY-C007";
    const newObservation: Observation = {
      id,
      child: newChild,
      childId,
      group: newGroup,
      educator,
      domain: newDomain,
      context: newContext.trim(),
      evidence: newEvidence.trim(),
      nextStep: newNextStep.trim() || "Continue normal observation and review the evidence over time.",
      date: "Just now",
      reviewState: "Draft",
      evidenceQuality: newEvidence.trim().length >= 45 ? "Clear" : "Needs detail",
    };
    setObservations((current) => [newObservation, ...current]);
    setSelectedId(id);
    setNewContext("");
    setNewEvidence("");
    setNewNextStep("");
    setNotice("Observation added locally. Nothing was persisted to a backend.");
  }

  return (
    <main className="headteacher-main early-observations-page" style={{ maxWidth: 1380, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Observations</h1>
          <p>Capture factual developmental evidence, monitor coverage and review observation quality across Early Years.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/children">Children</Link>
          <Link href="/headteacher/development">Development & Learning</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Observation records describe what was seen in context. They should not be treated as diagnoses, permanent ability labels or one-off proof of development.</p>
      </section>

      <section className="early-observation-kpis">
        <article><span>Observation coverage</span><strong>{overallCoverage}%</strong><small>Current cycle across groups</small></article>
        <article><span>Ready for review</span><strong>{readyCount}</strong><small>Awaiting Head Teacher review</small></article>
        <article><span>Follow-up observations</span><strong>{followUpCount}</strong><small>More context needed</small></article>
        <article><span>Evidence needs detail</span><strong>{needsDetailCount}</strong><small>Improve factual specificity</small></article>
        <article><span>Groups below 90%</span><strong>{coverage.filter((item) => item.coverage < 90).length}</strong><small>Coverage review</small></article>
        <article><span>Child ranking</span><strong>Off</strong><small>Evidence is contextual</small></article>
      </section>

      <section className="early-observation-workspace">
        <article className="headteacher-card early-observation-list-card">
          <header className="headteacher-section-head">
            <div><h3>Observation register</h3><p>Search by child, educator, developmental area or activity context.</p></div>
            <div className="early-observation-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search child, educator or evidence..." />
              <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select>
              <select value={domainFilter} onChange={(e) => setDomainFilter(e.target.value)}><option>All domains</option>{domains.map((item) => <option key={item}>{item}</option>)}</select>
              <select value={reviewFilter} onChange={(e) => setReviewFilter(e.target.value)}><option>All states</option><option>Draft</option><option>Ready for review</option><option>Reviewed</option><option>Follow-up</option></select>
            </div>
          </header>

          <div className="early-observation-table-wrap">
            <div className="early-observation-row heading"><span>Child / Group</span><span>Domain</span><span>Context</span><span>Educator</span><span>Evidence</span><span>Review</span></div>
            {filtered.map((item) => <button key={item.id} className={`early-observation-row ${selected.id === item.id ? "selected" : ""}`} onClick={() => { setSelectedId(item.id); setNote(""); setNotice(""); }}>
              <div><strong>{item.child}</strong><small>{item.childId} · {item.group}</small></div>
              <span>{item.domain}</span>
              <div><strong>{item.context}</strong><small>{item.date}</small></div>
              <span>{item.educator}</span>
              <em className={`early-evidence-quality ${item.evidenceQuality === "Clear" ? "clear" : "detail"}`}>{item.evidenceQuality}</em>
              <em className={`early-observation-state ${item.reviewState.toLowerCase().replaceAll(" ", "-")}`}>{item.reviewState}</em>
            </button>)}
          </div>
        </article>

        <aside className="headteacher-card early-observation-detail">
          <div className="early-observation-detail-head"><span>O</span><div><small>{selected.id} · {selected.date}</small><h2>{selected.child}</h2><p>{selected.group} · {selected.domain}</p></div></div>

          <div className="early-observation-meta">
            <div><span>Educator</span><strong>{selected.educator}</strong></div>
            <div><span>Context</span><strong>{selected.context}</strong></div>
            <div><span>Evidence quality</span><strong>{selected.evidenceQuality}</strong></div>
            <div><span>Review state</span><strong>{selected.reviewState}</strong></div>
          </div>

          <div className="early-observation-evidence"><span>FACTUAL EVIDENCE</span><p>{selected.evidence}</p></div>
          <div className="early-observation-next"><span>NEXT OBSERVATION / PROVISION</span><p>{selected.nextStep}</p></div>

          <div className="early-observation-links">
            <Link href="/headteacher/children">Open child context</Link>
            <Link href="/headteacher/development">Development view</Link>
            <Link href="/headteacher/educators">Educator context</Link>
          </div>

          <div className="early-observation-review-actions">
            <span>Head Teacher review</span>
            <div><button onClick={() => changeReviewState("Draft")}>Draft</button><button onClick={() => changeReviewState("Ready for review")}>Ready</button><button onClick={() => changeReviewState("Reviewed")}>Reviewed</button><button onClick={() => changeReviewState("Follow-up")}>Follow-up</button></div>
          </div>

          <label className="early-observation-note">Private review note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add factual review, coaching or follow-up note..." /></label>
          <button className="early-observation-save" onClick={saveReviewNote}>Save review note locally</button>
          {notice && <p className="early-observation-notice">{notice}</p>}
        </aside>
      </section>

      <section className="early-observation-lower-grid">
        <article className="headteacher-card early-observation-coverage-card">
          <header className="headteacher-section-head"><div><h3>Observation coverage by group</h3><p>Coverage shows evidence completeness, not child performance.</p></div></header>
          <div className="early-observation-coverage-list">{coverage.map((item) => <div key={item.group}><div><strong>{item.group}</strong><small>{item.childrenObserved} of {item.children} children observed</small></div><section><i style={{ width: `${item.coverage}%` }} /></section><span><b>{item.coverage}%</b><small>{item.overdue} overdue</small></span></div>)}</div>
        </article>

        <article className="headteacher-card early-observation-review-queue">
          <header className="headteacher-section-head"><div><h3>Review queue</h3><p>Coverage, evidence quality and leadership follow-up.</p></div></header>
          <div>{reviewQueue.map((item) => <div key={item.id}><span className={`early-review-level ${item.level.toLowerCase()}`}>{item.level}</span><div><strong>{item.title}</strong><p>{item.detail}</p></div><Link href={item.href}>Open →</Link></div>)}</div>
        </article>
      </section>

      <section className="early-observation-lower-grid">
        <article className="headteacher-card early-observation-capture">
          <header className="headteacher-section-head"><div><h3>Quick observation capture</h3><p>Create a local prototype observation using factual, contextual evidence.</p></div></header>
          <div className="early-observation-form-grid">
            <label>Child<select value={newChild} onChange={(e) => setNewChild(e.target.value)}><option>Child Amina</option><option>Child Ibrahim</option><option>Child Maryam</option><option>Child David</option><option>Child Fatima</option><option>Child Yusuf</option><option>Child Grace</option></select></label>
            <label>Group<select value={newGroup} onChange={(e) => setNewGroup(e.target.value)}><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select></label>
            <label>Developmental domain<select value={newDomain} onChange={(e) => setNewDomain(e.target.value as Domain)}>{domains.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Context<input value={newContext} onChange={(e) => setNewContext(e.target.value)} placeholder="e.g. Story circle, outdoor play..." /></label>
          </div>
          <label className="early-observation-long-field">What was actually observed?<textarea value={newEvidence} onChange={(e) => setNewEvidence(e.target.value)} placeholder="Describe visible behaviour, language, action or interaction. Avoid labels such as lazy, clever, difficult or gifted." /></label>
          <label className="early-observation-long-field">Possible next observation / provision<textarea value={newNextStep} onChange={(e) => setNewNextStep(e.target.value)} placeholder="What should educators continue, offer or observe next?" /></label>
          <button className="early-observation-create" onClick={createObservation}>Add observation locally</button>
          <p>Prototype only: this creates local UI state and does not write to a database.</p>
        </article>

        <article className="headteacher-card early-observation-ai-card">
          <span className="headteacher-kicker">HEAD TEACHER AI · OBSERVATION QUALITY</span>
          <h3>Reception A needs better evidence coverage before stronger conclusions</h3>
          <p>The largest current gap is evidence completeness rather than a clear developmental problem. The useful response is to protect observation time, improve factual note quality and review multiple observations over time.</p>
          <div><span>Main gap</span><strong>Reception A coverage</strong></div>
          <div><span>Quality issue</span><strong>1 note needs more detail</strong></div>
          <div><span>AI boundary</span><strong>No diagnosis or child ranking</strong></div>
          <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
        </article>
      </section>

      <section className="headteacher-card early-observation-boundary">
        <span className="headteacher-kicker">OBSERVATION RULE</span>
        <h3>Record what happened before interpreting what it may mean</h3>
        <p>Good Early Years observations are factual, contextual and repeated over time. The system can organize evidence and highlight missing coverage, but it should not diagnose developmental conditions, infer family circumstances or convert one observation into a permanent ability label.</p>
      </section>
    </main>
  );
}
