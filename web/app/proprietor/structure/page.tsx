"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Section = {
  id: string;
  name: string;
  stage: "Nursery" | "Primary" | "Secondary" | "Custom";
  campus: string;
  leaderTitle: string;
  leaderName: string;
  classes: number;
};

type Leader = {
  id: string;
  person: string;
  title: string;
  level: "Section Head" | "Deputy" | "HOD" | "Coordinator";
  sectionId: string;
  department?: string;
  reportsTo?: string;
};

const initialSections: Section[] = [
  { id: "nursery", name: "Nursery / Early Years", stage: "Nursery", campus: "Kaduna Campus", leaderTitle: "Head Teacher", leaderName: "Mrs. Mary Daniel", classes: 2 },
  { id: "primary", name: "Primary School", stage: "Primary", campus: "Kaduna Campus", leaderTitle: "Headmistress", leaderName: "Mrs. Hauwa Sule", classes: 6 },
  { id: "secondary", name: "Secondary School", stage: "Secondary", campus: "Kaduna Campus", leaderTitle: "Principal", leaderName: "Mr. Ibrahim Danladi", classes: 6 },
];

const initialLeaders: Leader[] = [
  { id: "L-001", person: "Mrs. Mary Daniel", title: "Head Teacher", level: "Section Head", sectionId: "nursery" },
  { id: "L-002", person: "Mrs. Hauwa Sule", title: "Headmistress", level: "Section Head", sectionId: "primary" },
  { id: "L-003", person: "Mr. Ibrahim Danladi", title: "Principal", level: "Section Head", sectionId: "secondary" },
  { id: "L-004", person: "Mrs. Grace Musa", title: "Vice Principal Academics", level: "Deputy", sectionId: "secondary", reportsTo: "L-003" },
  { id: "L-005", person: "Mr. Daniel John", title: "HOD Mathematics", level: "HOD", sectionId: "secondary", department: "Mathematics", reportsTo: "L-004" },
];

const people = ["Mrs. Mary Daniel", "Mrs. Hauwa Sule", "Mr. Ibrahim Danladi", "Mrs. Grace Musa", "Mr. Daniel John", "Mrs. Amina Yusuf", "Mr. Peter James", "Mrs. Fatima Bello"];

export default function ProprietorStructurePage() {
  const [sections, setSections] = useState(initialSections);
  const [leaders, setLeaders] = useState(initialLeaders);
  const [selectedSectionId, setSelectedSectionId] = useState("secondary");
  const [person, setPerson] = useState("Mrs. Grace Musa");
  const [title, setTitle] = useState("Vice Principal Administration");
  const [level, setLevel] = useState<Leader["level"]>("Deputy");
  const [department, setDepartment] = useState("");
  const [reportsTo, setReportsTo] = useState("L-003");
  const [notice, setNotice] = useState("");

  const selectedSection = sections.find((section) => section.id === selectedSectionId) ?? sections[0];
  const sectionLeaders = useMemo(() => leaders.filter((leader) => leader.sectionId === selectedSection.id), [leaders, selectedSection.id]);
  const possibleManagers = sectionLeaders.filter((leader) => leader.level === "Section Head" || leader.level === "Deputy");

  function selectSection(sectionId: string) {
    const firstManager = leaders.find((leader) => leader.sectionId === sectionId && leader.level === "Section Head");
    setSelectedSectionId(sectionId);
    setReportsTo(firstManager?.id ?? "");
    setNotice("");
  }

  function appointLeader() {
    if (!person || !title.trim()) return;
    if (level !== "Section Head") {
      const manager = leaders.find((leader) => leader.id === reportsTo);
      if (!manager || manager.sectionId !== selectedSection.id) {
        setNotice("Choose a reporting manager from the same academic section.");
        return;
      }
    }
    if (level === "Section Head" && sectionLeaders.some((leader) => leader.level === "Section Head")) {
      setNotice(`${selectedSection.name} already has a Section Head. Replace the existing appointment instead of creating a second active Section Head.`);
      return;
    }
    const newLeader: Leader = {
      id: `L-${String(leaders.length + 1).padStart(3, "0")}`,
      person,
      title: title.trim(),
      level,
      sectionId: selectedSection.id,
      department: level === "HOD" ? department.trim() : undefined,
      reportsTo: level === "Section Head" ? undefined : reportsTo,
    };
    setLeaders((current) => [...current, newLeader]);
    setNotice(`${person} appointed as ${title} for ${selectedSection.name}. Prototype change saved locally.`);
  }

  function replaceSectionHead(sectionId: string, personName: string) {
    const section = sections.find((item) => item.id === sectionId);
    if (!section) return;
    const defaultTitle = section.stage === "Primary" ? "Headmaster / Headmistress" : section.stage === "Secondary" ? "Principal" : "Head Teacher";
    setLeaders((current) => current.map((leader) => leader.sectionId === sectionId && leader.level === "Section Head" ? { ...leader, person: personName, title: defaultTitle } : leader));
    setSections((current) => current.map((item) => item.id === sectionId ? { ...item, leaderName: personName, leaderTitle: defaultTitle } : item));
    setNotice(`${personName} is now the active ${defaultTitle} for ${section.name}.`);
  }

  return (
    <main className="proprietor-module-shell">
      <header className="proprietor-module-header">
        <div><span className="page-kicker">PROPRIETOR · SCHOOL GOVERNANCE</span><h1>School Structure & Leadership</h1><p>Create school sections, appoint leaders and define who controls each academic scope.</p></div>
        <div className="proprietor-module-actions"><Link href="/proprietor">Dashboard</Link><Link href="/principal/assignments">Secondary assignments</Link></div>
      </header>

      <section className="owner-governance-banner">
        <div><span>OWNER CONTROL</span><strong>Structure first, permissions second</strong><p>Every operational leader receives authority from a school membership scoped to campus + section + role. Leadership appointments never grant access outside that scope.</p></div>
        <b>BrightGate Academy · Kaduna Campus</b>
      </section>

      <section className="owner-section-grid">
        {sections.map((section) => (
          <button key={section.id} onClick={() => selectSection(section.id)} className={selectedSection.id === section.id ? "active" : ""}>
            <span>{section.stage.toUpperCase()}</span><h2>{section.name}</h2><p>{section.campus}</p><div><small>Leader</small><strong>{section.leaderTitle}</strong><b>{section.leaderName}</b></div><footer>{section.classes} configured classes</footer>
          </button>
        ))}
      </section>

      <section className="owner-structure-grid">
        <article className="proprietor-panel owner-section-control">
          <header><div><h3>{selectedSection.name}</h3><p>Section head and delegated leadership.</p></div><span>{selectedSection.stage}</span></header>

          <div className="owner-section-head-card">
            <div><span>SECTION HEAD</span><h4>{selectedSection.leaderTitle}</h4><p>{selectedSection.leaderName}</p></div>
            <label>Replace section head<select value={selectedSection.leaderName} onChange={(e) => replaceSectionHead(selectedSection.id, e.target.value)}>{people.map((name) => <option key={name}>{name}</option>)}</select></label>
          </div>

          <div className="owner-hierarchy-list">
            {sectionLeaders.map((leader) => {
              const manager = leaders.find((item) => item.id === leader.reportsTo);
              return <div key={leader.id} className={`owner-hierarchy-row ${leader.level.toLowerCase().replaceAll(" ", "-")}`}><div><span>{leader.level}</span><strong>{leader.title}</strong><p>{leader.person}</p></div><div><small>{leader.department ? `Department: ${leader.department}` : "Section leadership"}</small><b>{manager ? `Reports to ${manager.title}` : "Top of section"}</b></div></div>;
            })}
          </div>
        </article>

        <aside className="proprietor-panel owner-appointment-form">
          <header><div><h3>Appoint leader</h3><p>Add a deputy, HOD, coordinator or section head.</p></div></header>
          <label>Section<select value={selectedSectionId} onChange={(e) => selectSection(e.target.value)}>{sections.map((section) => <option value={section.id} key={section.id}>{section.name}</option>)}</select></label>
          <label>Staff member<select value={person} onChange={(e) => setPerson(e.target.value)}>{people.map((name) => <option key={name}>{name}</option>)}</select></label>
          <label>Leadership level<select value={level} onChange={(e) => setLevel(e.target.value as Leader["level"])}><option>Section Head</option><option>Deputy</option><option>HOD</option><option>Coordinator</option></select></label>
          <label>Official title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vice Principal Academics" /></label>
          {level === "HOD" && <label>Department<input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Science" /></label>}
          {level !== "Section Head" && <label>Reports to<select value={reportsTo} onChange={(e) => setReportsTo(e.target.value)}><option value="">Select manager</option>{possibleManagers.map((leader) => <option value={leader.id} key={leader.id}>{leader.title} · {leader.person}</option>)}</select></label>}
          <button onClick={appointLeader}>Create appointment</button>
          {notice && <div className="owner-appointment-notice">{notice}</div>}
        </aside>
      </section>

      <section className="proprietor-panel owner-governance-matrix">
        <header><div><h3>Who controls what?</h3><p>Default delegated authority by school section.</p></div></header>
        <div className="owner-matrix-head"><span>Leadership role</span><span>Students</span><span>Teachers</span><span>Subject assignments</span><span>Results</span><span>School identity</span></div>
        <div className="owner-matrix-row"><strong>Proprietor / Owner</strong><span>All</span><span>All</span><span>Can override</span><span>All</span><b>Manage</b></div>
        <div className="owner-matrix-row"><strong>Principal · Secondary</strong><span>Secondary</span><span>Secondary</span><span>Secondary</span><span>Secondary</span><b className="locked">No</b></div>
        <div className="owner-matrix-row"><strong>Headmaster / Headmistress · Primary</strong><span>Primary</span><span>Primary</span><span>Primary</span><span>Primary</span><b className="locked">No</b></div>
        <div className="owner-matrix-row"><strong>Head Teacher · Nursery</strong><span>Nursery</span><span>Nursery</span><span>Nursery</span><span>Nursery</span><b className="locked">No</b></div>
        <div className="owner-matrix-row"><strong>HOD / Coordinator</strong><span>Delegated</span><span>Delegated</span><span>Only if permitted</span><span>Delegated</span><b className="locked">No</b></div>
      </section>

      <section className="proprietor-panel owner-flow-card">
        <span className="page-kicker">ACCESS RESOLUTION</span><h3>How SchoolOS decides what a leader can see</h3>
        <div><span>User</span><b>→</b><span>School</span><b>→</b><span>Campus</span><b>→</b><span>Academic Section</span><b>→</b><span>Role + Permissions</span><b>→</b><span>Allowed records</span></div>
        <p>One person can hold multiple valid memberships. For example, a small school may appoint the same person as Primary Headmaster and Secondary Principal, but the two memberships remain distinct and can be revoked independently.</p>
      </section>
    </main>
  );
}
