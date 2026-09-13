"use client";

import Link from "next/link";
import { academicSections } from "../../lib/academic-sections";

const leadership = [
  { title: "Head Teacher", person: "Mrs. Mary Daniel", scope: "Nursery / Early Years", level: "Section Head" },
  { title: "Headmistress", person: "Mrs. Hauwa Sule", scope: "Primary School", level: "Section Head" },
  { title: "Principal", person: "Mr. Ibrahim Danladi", scope: "Secondary School", level: "Section Head" },
  { title: "Vice Principal Academics", person: "Mrs. Grace Musa", scope: "Secondary School", level: "Deputy" },
];

export default function ProprietorDashboard() {
  return (
    <main className="proprietor-shell">
      <aside className="proprietor-sidebar">
        <div className="proprietor-brand"><div className="proprietor-logo">S</div><div><strong>SchoolOS</strong><span>Proprietor Portal</span></div></div>
        <div className="proprietor-school-card"><span>ACTIVE SCHOOL</span><strong>BrightGate Academy</strong><small>Kaduna Campus · Owner workspace</small></div>
        <nav className="proprietor-nav">
          <Link className="active" href="/proprietor">Dashboard</Link>
          <Link href="/proprietor/structure">School Structure & Leadership</Link>
          <Link href="/principal/performance">School Performance</Link>
          <Link href="/principal/communication">Communication</Link>
          <Link href="/principal/results">Reports</Link>
        </nav>
        <div className="proprietor-boundary"><span>OWNER AUTHORITY</span><p>School identity, campuses, sections, leadership appointments and delegated role scopes.</p></div>
      </aside>

      <section className="proprietor-main">
        <header className="proprietor-topbar"><div><span className="page-kicker">PROPRIETOR WORKSPACE</span><h1>School Governance</h1></div><div className="proprietor-profile"><span>PO</span><div><strong>School Owner</strong><small>Proprietor</small></div></div></header>

        <div className="proprietor-content">
          <section className="proprietor-hero">
            <div><span className="page-kicker">GOVERNANCE OVERVIEW</span><h2>One school. Separate leadership scopes.</h2><p>Define the school structure once, appoint the correct leaders, then let each leader manage only the teachers, classes and operations inside their authorized section.</p></div>
            <Link href="/proprietor/structure">Manage structure & leadership</Link>
          </section>

          <section className="proprietor-kpis">
            <article><span>Campuses</span><strong>1</strong><small>Current prototype</small></article>
            <article><span>Academic sections</span><strong>{academicSections.length}</strong><small>Nursery · Primary · Secondary</small></article>
            <article><span>Section heads</span><strong>3</strong><small>One per configured section</small></article>
            <article><span>Leadership roles</span><strong>{leadership.length}</strong><small>Active appointments</small></article>
          </section>

          <section className="proprietor-section-grid">
            {academicSections.map((section) => <article key={section.id} className="proprietor-section-card"><span>{section.stage.toUpperCase()}</span><h3>{section.name}</h3><p>{section.campus}</p><div><small>Section leader</small><strong>{section.leaderTitle}</strong><b>{section.leaderName}</b></div><footer>{section.classes.length} configured classes</footer></article>)}
          </section>

          <section className="proprietor-two-column">
            <article className="proprietor-panel">
              <header><div><h3>Leadership appointments</h3><p>Who currently leads each scope.</p></div><Link href="/proprietor/structure">Manage</Link></header>
              <div className="proprietor-leadership-list">{leadership.map((item) => <div key={`${item.title}-${item.scope}`}><div><strong>{item.title}</strong><span>{item.person}</span></div><div><small>{item.scope}</small><b>{item.level}</b></div></div>)}</div>
            </article>

            <article className="proprietor-panel">
              <header><div><h3>Governance rules</h3><p>Hard boundaries for delegated authority.</p></div></header>
              <div className="proprietor-rule-list"><div><b>01</b><p>A Principal manages Secondary School only unless separately appointed elsewhere.</p></div><div><b>02</b><p>A Headmaster/Headmistress manages Primary School only.</p></div><div><b>03</b><p>Vice Principals, HODs and Coordinators inherit only the section/department scope delegated to them.</p></div><div><b>04</b><p>Proprietor retains ownership controls and can change appointments and structure.</p></div></div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
