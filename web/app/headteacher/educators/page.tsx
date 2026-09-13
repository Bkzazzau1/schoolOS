"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EducatorStatus = "Strong" | "On track" | "Support";
type Educator = {
  id: string;
  name: string;
  responsibility: string;
  group: string;
  specialties: string[];
  attendance: number;
  planning: number;
  observations: number;
  routineQuality: number;
  activityBlocks: number;
  supportCases: number;
  status: EducatorStatus;
  note: string;
};

const educators: Educator[] = [
  { id: "EY-T01", name: "Mrs. Aisha Musa", responsibility: "Lead Educator", group: "Nursery 1", specialties: ["Language", "Storytelling", "Settling-in"], attendance: 98, planning: 96, observations: 94, routineQuality: 96, activityBlocks: 18, supportCases: 1, status: "Strong", note: "Strong routine consistency and complete observation records. Continue peer-sharing of arrival and circle-time practice." },
  { id: "EY-T02", name: "Mr. Samuel John", responsibility: "Early Years Educator", group: "Nursery 1", specialties: ["Outdoor Play", "Motor Skills", "Creative Play"], attendance: 96, planning: 91, observations: 89, routineQuality: 93, activityBlocks: 17, supportCases: 2, status: "On track", note: "Good activity delivery. Observation notes can be closed a little earlier in the weekly cycle." },
  { id: "EY-T03", name: "Mrs. Halima Yusuf", responsibility: "Lead Educator", group: "Nursery 2", specialties: ["Early Numeracy", "Sensory Play", "Care Routines"], attendance: 97, planning: 92, observations: 86, routineQuality: 94, activityBlocks: 19, supportCases: 2, status: "On track", note: "Strong care routines and planning. Observation completion needs a small catch-up before Friday review." },
  { id: "EY-T04", name: "Miss Grace Peter", responsibility: "Early Years Educator", group: "Nursery 2", specialties: ["Music", "Creative Arts", "Fine Motor"], attendance: 94, planning: 88, observations: 82, routineQuality: 90, activityBlocks: 16, supportCases: 3, status: "Support", note: "Support with observation documentation and weekly-plan preparation. This is a coaching priority, not a performance judgement." },
  { id: "EY-T05", name: "Mrs. Fatima Bello", responsibility: "Lead Educator", group: "Reception A", specialties: ["Early Literacy", "Phonics", "Transition"], attendance: 95, planning: 90, observations: 79, routineQuality: 87, activityBlocks: 20, supportCases: 4, status: "Support", note: "Reception A has the lowest observation coverage in the section. Review workload and documentation time before changing expectations." },
  { id: "EY-T06", name: "Mr. Daniel Musa", responsibility: "Early Years Educator", group: "Reception A", specialties: ["Early Numeracy", "Construction Play", "Outdoor Learning"], attendance: 93, planning: 89, observations: 81, routineQuality: 88, activityBlocks: 19, supportCases: 2, status: "On track", note: "Activity planning is steady. Support the Reception team with observation catch-up and end-of-day documentation." },
  { id: "EY-T07", name: "Mrs. Ruth Adams", responsibility: "Floating Support Educator", group: "Across Early Years", specialties: ["Cover", "Care Support", "Learning Centres"], attendance: 99, planning: 93, observations: 90, routineQuality: 95, activityBlocks: 15, supportCases: 1, status: "Strong", note: "Flexible cover is working well. Keep enough unallocated capacity for short-notice staffing gaps." },
  { id: "EY-T08", name: "Miss Zainab Lawal", responsibility: "Learning Support Educator", group: "Across Early Years", specialties: ["Small Group", "Language Support", "Transition"], attendance: 97, planning: 94, observations: 92, routineQuality: 94, activityBlocks: 14, supportCases: 5, status: "Strong", note: "Support caseload is higher by design. Protect focused small-group time rather than treating the count as overload by itself." },
];

const coachingPriorities = [
  { educator: "Miss Grace Peter", group: "Nursery 2", signal: "Observation completion", detail: "82% completion with weekly planning at 88%.", action: "Pair for documentation support and review Friday." },
  { educator: "Mrs. Fatima Bello", group: "Reception A", signal: "Team observation coverage", detail: "Reception A remains the lowest observation-coverage group.", action: "Review workload and protected documentation time." },
  { educator: "Reception A team", group: "Reception A", signal: "Routine consistency", detail: "Routine quality is stable but below Nursery 1 and Nursery 2.", action: "Observe transition points before changing the daily plan." },
];

export default function HeadTeacherEducatorsPage() {
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All groups");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedId, setSelectedId] = useState(educators[4].id);
  const [note, setNote] = useState("");
  const [scheduled, setScheduled] = useState<string[]>([]);

  const filtered = useMemo(() => educators.filter((educator) => {
    const matchesQuery = `${educator.name} ${educator.id} ${educator.group} ${educator.responsibility} ${educator.specialties.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesGroup = groupFilter === "All groups" || educator.group === groupFilter;
    const matchesStatus = statusFilter === "All statuses" || educator.status === statusFilter;
    return matchesQuery && matchesGroup && matchesStatus;
  }), [query, groupFilter, statusFilter]);

  const selected = educators.find((educator) => educator.id === selectedId) ?? educators[0];
  const supportCount = educators.filter((educator) => educator.status === "Support").length;
  const averagePlanning = Math.round(educators.reduce((sum, educator) => sum + educator.planning, 0) / educators.length);
  const averageObservations = Math.round(educators.reduce((sum, educator) => sum + educator.observations, 0) / educators.length);
  const averageAttendance = Math.round(educators.reduce((sum, educator) => sum + educator.attendance, 0) / educators.length);

  function scheduleCheckIn() {
    setScheduled((current) => current.includes(selected.id) ? current : [...current, selected.id]);
  }

  return (
    <main className="headteacher-main early-educators-page" style={{ maxWidth: 1380, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Educators</h1>
          <p>Support Early Years educators through group responsibility, planning, observations, attendance, routines and workload context.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/observations">Observations</Link>
          <Link href="/headteacher/planning">Planning & Activities</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Only Early Years educators are represented here. Primary and Secondary staff remain in separate leadership workspaces.</p>
      </section>

      <section className="early-educator-kpis">
        <article><span>Early Years educators</span><strong>12</strong><small>8 representative records shown</small></article>
        <article><span>Present today</span><strong>11 / 12</strong><small>1 cover arrangement</small></article>
        <article><span>Planning readiness</span><strong>{averagePlanning}%</strong><small>Representative team average</small></article>
        <article><span>Observation completion</span><strong>{averageObservations}%</strong><small>Current review cycle</small></article>
        <article><span>Attendance</span><strong>{averageAttendance}%</strong><small>Representative educators</small></article>
        <article><span>Support priorities</span><strong>{supportCount}</strong><small>Coaching / coordination</small></article>
      </section>

      <section className="early-educator-workspace">
        <article className="headteacher-card early-educator-directory">
          <header className="headteacher-section-head">
            <div><h3>Educator directory</h3><p>Review responsibility, readiness and current support context.</p></div>
            <div className="early-educator-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search educator, group or specialty..." />
              <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option><option>Across Early Years</option></select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All statuses</option><option>Strong</option><option>On track</option><option>Support</option></select>
            </div>
          </header>

          <div className="early-educator-table-wrap">
            <div className="early-educator-row heading"><span>Educator</span><span>Responsibility</span><span>Planning</span><span>Observations</span><span>Routine</span><span>Activity load</span><span>Status</span></div>
            {filtered.map((educator) => (
              <button key={educator.id} className={`early-educator-row ${selected.id === educator.id ? "selected" : ""}`} onClick={() => { setSelectedId(educator.id); setNote(""); }}>
                <div><strong>{educator.name}</strong><small>{educator.id} · {educator.group}</small></div>
                <div><strong>{educator.responsibility}</strong><small>{educator.specialties.join(" · ")}</small></div>
                <b>{educator.planning}%</b>
                <b>{educator.observations}%</b>
                <b>{educator.routineQuality}%</b>
                <span>{educator.activityBlocks} blocks/wk</span>
                <em className={`early-educator-status ${educator.status.toLowerCase().replaceAll(" ", "-")}`}>{educator.status}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="headteacher-card early-educator-detail">
          <div className="early-educator-detail-head">
            <span>{selected.name.split(" ").filter((part) => !part.endsWith(".")).map((part) => part[0]).join("").slice(0, 2)}</span>
            <div><small>{selected.id}</small><h2>{selected.name}</h2><p>{selected.responsibility} · {selected.group}</p></div>
          </div>

          <div className="early-educator-detail-grid">
            <div><span>Attendance</span><strong>{selected.attendance}%</strong></div>
            <div><span>Planning</span><strong>{selected.planning}%</strong></div>
            <div><span>Observations</span><strong>{selected.observations}%</strong></div>
            <div><span>Routine quality</span><strong>{selected.routineQuality}%</strong></div>
          </div>

          <div className="early-educator-specialties"><span>STRENGTHS / RESPONSIBILITIES</span><div>{selected.specialties.map((item) => <b key={item}>{item}</b>)}</div></div>

          <div className="early-educator-support-note"><span>HEAD TEACHER SUPPORT NOTE</span><p>{selected.note}</p></div>

          <div className="early-educator-context">
            <div><span>Activity load</span><strong>{selected.activityBlocks} blocks/week</strong></div>
            <div><span>Active support cases</span><strong>{selected.supportCases}</strong></div>
            <div><span>Current status</span><strong>{selected.status}</strong></div>
          </div>

          <div className="early-educator-links">
            <Link href="/headteacher/observations">Review observations</Link>
            <Link href="/headteacher/planning">Open planning</Link>
            <Link href="/headteacher/attendance">Attendance</Link>
          </div>

          <label className="early-educator-note">Private leadership note<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add coaching, planning or follow-up note..." /></label>
          <button className="early-educator-checkin" onClick={scheduleCheckIn}>{scheduled.includes(selected.id) ? "Check-in scheduled" : "Schedule support check-in"}</button>
          <small className="early-educator-local-note">Prototype only: this action is stored in local UI state.</small>
        </aside>
      </section>

      <section className="early-educator-lower-grid">
        <article className="headteacher-card early-coaching-card">
          <header className="headteacher-section-head"><div><h3>Coaching priorities</h3><p>Support signals that need context and conversation.</p></div></header>
          <div className="early-coaching-list">
            {coachingPriorities.map((item) => <div key={`${item.educator}-${item.signal}`}><span>SUPPORT</span><div><strong>{item.educator} · {item.group}</strong><small>{item.signal}</small><p>{item.detail}</p><b>{item.action}</b></div></div>)}
          </div>
        </article>

        <article className="headteacher-card early-educator-ai-card">
          <span className="headteacher-kicker">HEAD TEACHER AI · EDUCATOR SUPPORT</span>
          <h3>Reception A needs protected documentation time</h3>
          <p>The lowest observation coverage is concentrated in Reception A while activity load is comparatively high. The useful leadership response is to review workflow and protected documentation time before interpreting the numbers as educator performance.</p>
          <div><span>Main signal</span><strong>Observation completion</strong></div>
          <div><span>Context</span><strong>Higher activity load</strong></div>
          <div><span>Recommended posture</span><strong>Coach, rebalance, review</strong></div>
          <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
        </article>
      </section>

      <section className="headteacher-card early-educator-boundary">
        <span className="headteacher-kicker">EDUCATOR INTELLIGENCE RULE</span>
        <h3>Use indicators to support educators, not to automate employment decisions</h3>
        <p>Planning, observation completion, attendance and routine indicators help the Head Teacher know where to ask questions and provide support. They should not automatically determine discipline, pay, promotion, dismissal or professional competence.</p>
      </section>
    </main>
  );
}
