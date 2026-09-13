"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Domain = "Language & Communication" | "Early Numeracy" | "Physical Development" | "Personal & Social" | "Creative Exploration";
type Signal = "Secure pattern" | "Developing pattern" | "Review context";

type DomainRecord = {
  group: string;
  domain: Domain;
  observationCoverage: number;
  activityAlignment: number;
  secure: number;
  developing: number;
  emerging: number;
  signal: Signal;
  note: string;
};

const records: DomainRecord[] = [
  { group: "Nursery 1", domain: "Language & Communication", observationCoverage: 94, activityAlignment: 96, secure: 10, developing: 14, emerging: 4, signal: "Secure pattern", note: "Storytelling, songs and small-group language activities are well represented in current observations." },
  { group: "Nursery 1", domain: "Early Numeracy", observationCoverage: 91, activityAlignment: 92, secure: 8, developing: 16, emerging: 4, signal: "Developing pattern", note: "Continue sorting, matching, counting and quantity language through play-based activities." },
  { group: "Nursery 1", domain: "Physical Development", observationCoverage: 93, activityAlignment: 95, secure: 17, developing: 9, emerging: 2, signal: "Secure pattern", note: "Outdoor movement and fine-motor opportunities are consistently represented." },
  { group: "Nursery 1", domain: "Personal & Social", observationCoverage: 90, activityAlignment: 94, secure: 16, developing: 10, emerging: 2, signal: "Secure pattern", note: "Settling, sharing and group participation are generally stable in current evidence." },
  { group: "Nursery 1", domain: "Creative Exploration", observationCoverage: 88, activityAlignment: 91, secure: 12, developing: 13, emerging: 3, signal: "Developing pattern", note: "Increase open-ended art and music observation examples across the week." },

  { group: "Nursery 2", domain: "Language & Communication", observationCoverage: 86, activityAlignment: 91, secure: 11, developing: 15, emerging: 4, signal: "Developing pattern", note: "Language activity planning is strong; observation completion needs a small catch-up." },
  { group: "Nursery 2", domain: "Early Numeracy", observationCoverage: 88, activityAlignment: 94, secure: 12, developing: 14, emerging: 4, signal: "Developing pattern", note: "Good activity alignment around number, shape and comparison language." },
  { group: "Nursery 2", domain: "Physical Development", observationCoverage: 90, activityAlignment: 93, secure: 19, developing: 9, emerging: 2, signal: "Secure pattern", note: "Movement and fine-motor evidence is broad and current." },
  { group: "Nursery 2", domain: "Personal & Social", observationCoverage: 85, activityAlignment: 90, secure: 15, developing: 12, emerging: 3, signal: "Developing pattern", note: "Continue observing peer interaction, independence and transitions across normal routines." },
  { group: "Nursery 2", domain: "Creative Exploration", observationCoverage: 82, activityAlignment: 89, secure: 10, developing: 16, emerging: 4, signal: "Review context", note: "Evidence is thinner than planned activity coverage; complete observations before changing provision." },

  { group: "Reception A", domain: "Language & Communication", observationCoverage: 79, activityAlignment: 90, secure: 9, developing: 13, emerging: 4, signal: "Review context", note: "Planned phonics and communication activities are present, but evidence coverage is incomplete." },
  { group: "Reception A", domain: "Early Numeracy", observationCoverage: 77, activityAlignment: 88, secure: 8, developing: 14, emerging: 4, signal: "Review context", note: "Complete current observation cycle before interpreting the emerging pattern as a learning problem." },
  { group: "Reception A", domain: "Physical Development", observationCoverage: 84, activityAlignment: 92, secure: 16, developing: 8, emerging: 2, signal: "Secure pattern", note: "Physical opportunities and evidence are comparatively stable." },
  { group: "Reception A", domain: "Personal & Social", observationCoverage: 80, activityAlignment: 87, secure: 11, developing: 12, emerging: 3, signal: "Developing pattern", note: "Review transition routines and settling context alongside observation notes." },
  { group: "Reception A", domain: "Creative Exploration", observationCoverage: 78, activityAlignment: 86, secure: 9, developing: 13, emerging: 4, signal: "Review context", note: "Activity provision exists, but current evidence coverage is too low for a strong section conclusion." },
];

const domains: Domain[] = ["Language & Communication", "Early Numeracy", "Physical Development", "Personal & Social", "Creative Exploration"];

const activityPlan = [
  { area: "Language & Communication", activity: "Story retelling + sound play", groups: "All groups", readiness: 96 },
  { area: "Early Numeracy", activity: "Sorting, quantity and pattern centres", groups: "Nursery 1–Reception", readiness: 92 },
  { area: "Physical Development", activity: "Outdoor movement + fine-motor stations", groups: "All groups", readiness: 95 },
  { area: "Personal & Social", activity: "Circle-time turn taking + routine independence", groups: "All groups", readiness: 91 },
  { area: "Creative Exploration", activity: "Music, texture and open-ended art", groups: "Nursery 2 + Reception A", readiness: 86 },
];

const priorities = [
  { title: "Reception A observation catch-up", detail: "Complete current evidence cycle before making changes to language, numeracy or creative provision.", href: "/headteacher/observations" },
  { title: "Nursery 2 creative evidence", detail: "Planning is stronger than documentation. Review whether observation time is protected during creative activities.", href: "/headteacher/educators" },
  { title: "Keep physical-development provision stable", detail: "Current evidence is comparatively consistent across all groups; no broad intervention is indicated.", href: "/headteacher/planning" },
];

export default function HeadTeacherDevelopmentPage() {
  const [group, setGroup] = useState("All groups");
  const [domain, setDomain] = useState<Domain>("Language & Communication");
  const [acknowledged, setAcknowledged] = useState<string[]>([]);

  const filtered = useMemo(() => records.filter((item) => {
    const groupMatch = group === "All groups" || item.group === group;
    return groupMatch && item.domain === domain;
  }), [group, domain]);

  const domainRecords = records.filter((item) => item.domain === domain);
  const avgCoverage = Math.round(domainRecords.reduce((sum, item) => sum + item.observationCoverage, 0) / domainRecords.length);
  const avgAlignment = Math.round(domainRecords.reduce((sum, item) => sum + item.activityAlignment, 0) / domainRecords.length);
  const reviewCount = records.filter((item) => item.signal === "Review context").length;

  return (
    <main className="headteacher-main early-development-page" style={{ maxWidth: 1380, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Development & Learning</h1>
          <p>Review developmental evidence, observation coverage and activity alignment across Early Years without reducing children to one score.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/children">Children</Link>
          <Link href="/headteacher/observations">Observations</Link>
          <Link href="/headteacher/planning">Planning</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Developmental information is interpreted over time using observations, routines and learning opportunities. It is not an exam score or child ranking.</p>
      </section>

      <section className="early-development-kpis">
        <article><span>Development domains</span><strong>5</strong><small>Tracked separately</small></article>
        <article><span>{domain} observation coverage</span><strong>{avgCoverage}%</strong><small>Across Early Years groups</small></article>
        <article><span>Activity alignment</span><strong>{avgAlignment}%</strong><small>Current planning cycle</small></article>
        <article><span>Context reviews</span><strong>{reviewCount}</strong><small>Evidence first, action second</small></article>
        <article><span>Children enrolled</span><strong>84</strong><small>No child league table</small></article>
      </section>

      <section className="headteacher-card early-development-domain-card">
        <header className="headteacher-section-head">
          <div><h3>Developmental domain view</h3><p>Switch domains and compare groups using observation and activity context.</p></div>
          <select value={group} onChange={(e) => setGroup(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select>
        </header>

        <div className="early-domain-tabs">
          {domains.map((item) => <button key={item} className={domain === item ? "active" : ""} onClick={() => setDomain(item)}>{item}</button>)}
        </div>

        <div className="early-development-table">
          <div className="early-development-row heading"><span>Group</span><span>Observation coverage</span><span>Activity alignment</span><span>Secure</span><span>Developing</span><span>Emerging</span><span>Signal</span></div>
          {filtered.map((item) => <div className="early-development-row" key={`${item.group}-${item.domain}`}>
            <div><strong>{item.group}</strong><small>{item.note}</small></div>
            <b>{item.observationCoverage}%</b>
            <b>{item.activityAlignment}%</b>
            <span>{item.secure}</span>
            <span>{item.developing}</span>
            <span>{item.emerging}</span>
            <em className={`early-development-signal ${item.signal.toLowerCase().replaceAll(" ", "-")}`}>{item.signal}</em>
          </div>)}
        </div>
      </section>

      <section className="early-development-grid">
        <article className="headteacher-card early-development-activity-card">
          <header className="headteacher-section-head"><div><h3>Activity alignment</h3><p>Check that developmental priorities are represented in actual Early Years provision.</p></div><Link href="/headteacher/planning">Open planning →</Link></header>
          <div className="early-activity-alignment-list">
            {activityPlan.map((item) => <div key={item.area}><div><strong>{item.area}</strong><small>{item.activity} · {item.groups}</small></div><section><i style={{ width: `${item.readiness}%` }} /></section><b>{item.readiness}%</b></div>)}
          </div>
        </article>

        <article className="headteacher-card early-development-ai-card">
          <span className="headteacher-kicker">HEAD TEACHER AI · DEVELOPMENT BRIEF</span>
          <h3>Do not confuse missing observations with missing development</h3>
          <p>Reception A shows the weakest observation coverage in several domains, while planned activities remain comparatively strong. The first leadership question is whether evidence capture is complete — not whether children are “behind.”</p>
          <div><span>Evidence gap</span><strong>Reception A</strong></div>
          <div><span>Stable area</span><strong>Physical development</strong></div>
          <div><span>Recommended action</span><strong>Complete evidence cycle</strong></div>
          <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
        </article>
      </section>

      <section className="headteacher-card early-development-priority-card">
        <header className="headteacher-section-head"><div><h3>Development follow-up priorities</h3><p>Supportive actions based on evidence quality and provision.</p></div></header>
        <div className="early-development-priorities">
          {priorities.map((item) => {
            const done = acknowledged.includes(item.title);
            return <div key={item.title} className={done ? "done" : ""}><div><strong>{item.title}</strong><p>{item.detail}</p></div><div><Link href={item.href}>Open source</Link><button onClick={() => setAcknowledged((current) => current.includes(item.title) ? current.filter((x) => x !== item.title) : [...current, item.title])}>{done ? "Reopen" : "Mark reviewed"}</button></div></div>;
          })}
        </div>
      </section>

      <section className="headteacher-card early-development-boundary">
        <span className="headteacher-kicker">EARLY YEARS DEVELOPMENT RULE</span>
        <h3>Use multiple observations over time — never one score or one snapshot</h3>
        <p>Emerging, Developing and Secure are contextual developmental descriptors in this prototype. They must not be used as diagnoses, permanent ability labels, admissions filters or public rankings. Human educators and families interpret progress using age, opportunity, routines and evidence over time.</p>
      </section>
    </main>
  );
}
