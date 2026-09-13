"use client";

import Link from "next/link";
import { useState } from "react";

type PermissionLevel = "Manage" | "Review" | "View" | "Restricted";
type Permission = { label: string; level: PermissionLevel; detail: string };
type Preference = { id: string; label: string; description: string; enabled: boolean };

const permissions: Permission[] = [
  { label: "Educators", level: "Manage", detail: "Review Early Years educator responsibilities, workload, support context and group assignment." },
  { label: "Children", level: "Manage", detail: "Access Nursery / Early Years child records within the authorized campus and section." },
  { label: "Development & learning", level: "Manage", detail: "Review developmental evidence, activity alignment and section-wide learning context." },
  { label: "Attendance", level: "Manage", detail: "Review child and educator attendance and coordinate supportive follow-up." },
  { label: "Observations", level: "Manage", detail: "Review observation coverage, evidence quality and educator follow-up." },
  { label: "Planning & activities", level: "Manage", detail: "Coordinate weekly themes, learning centres, activities, resources and readiness." },
  { label: "Development reports", level: "Review", detail: "Review and approve Early Years developmental reports in the prototype workflow." },
  { label: "Guardians", level: "Manage", detail: "Coordinate Early Years guardian communication and follow-up." },
  { label: "Welfare & routine incidents", level: "Review", detail: "Coordinate ordinary care, safety and operational welfare cases within Early Years." },
  { label: "Safeguarding-sensitive detail", level: "Restricted", detail: "Requires a separate safeguarding authorization; ordinary Head Teacher access is not enough." },
  { label: "Primary / Secondary records", level: "Restricted", detail: "Requires a separate valid membership or leadership appointment for those sections." },
  { label: "School identity, finance & subscription", level: "Restricted", detail: "Controlled by proprietor, finance or platform roles rather than Early Years leadership." },
];

const initialPreferences: Preference[] = [
  { id: "pref-1", label: "Login alerts", description: "Show a security notice when a new device signs in to this leadership workspace.", enabled: true },
  { id: "pref-2", label: "Sensitive-action confirmation", description: "Require an extra confirmation before report approval or restricted-record requests.", enabled: true },
  { id: "pref-3", label: "Daily Early Years brief", description: "Prepare a local prototype summary of attendance, observation, routine and planning priorities.", enabled: true },
  { id: "pref-4", label: "Quiet non-urgent notifications", description: "Reduce non-urgent alerts outside the active Early Years school day.", enabled: false },
];

const accessChain = [
  { label: "School", value: "BrightGate Academy" },
  { label: "Campus", value: "Kaduna Campus" },
  { label: "Academic Section", value: "Nursery / Early Years" },
  { label: "Leadership Role", value: "Head Teacher" },
  { label: "User", value: "Mrs. Mary Daniel" },
];

const delegation = [
  { role: "Head Teacher", scope: "Nursery / Early Years", state: "Active", description: "Section-wide Early Years academic, care and operational leadership." },
  { role: "Nursery Coordinator", scope: "Assigned Early Years groups", state: "Available to appoint", description: "May receive delegated planning, routine and educator-coordination responsibilities." },
  { role: "Room / Group Lead", scope: "Assigned group only", state: "Available to appoint", description: "May coordinate one Nursery or Reception group without inheriting section-wide authority." },
];

export default function HeadTeacherProfilePage() {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [workspace, setWorkspace] = useState("Nursery / Early Years · Head Teacher");
  const [notice, setNotice] = useState("");

  function togglePreference(id: string) {
    setPreferences((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
    setNotice("Preference updated locally in this UI prototype.");
  }

  function requestWorkspace(next: string) {
    if (next === "Nursery / Early Years · Head Teacher") {
      setWorkspace(next);
      setNotice("Nursery / Early Years is already the active workspace.");
      return;
    }
    setNotice(`${next} is unavailable because this mock user has no separate membership for that workspace.`);
  }

  return (
    <main className="headteacher-main early-profile-page" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Profile & Workspace</h1>
          <p>Review leadership identity, active scope, permissions, workspace boundaries, delegation and security preferences.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/performance">Performance</Link>
          <Link href="/headteacher/ai">Head Teacher AI</Link>
        </div>
      </header>

      <section className="early-profile-hero">
        <div className="early-profile-avatar">MD</div>
        <div className="early-profile-identity">
          <span>ACTIVE LEADERSHIP PROFILE</span>
          <h2>Mrs. Mary Daniel</h2>
          <p>Head Teacher · Nursery / Early Years · Kaduna Campus</p>
          <div><b>Early Years</b><b>Academic Leadership</b><b>Care & Operations</b></div>
        </div>
        <div className="early-profile-session">
          <span>Current workspace</span>
          <strong>{workspace}</strong>
          <small>2026/2027 Academic Session · First Term</small>
        </div>
      </section>

      <section className="early-profile-grid">
        <article className="headteacher-card early-access-chain-card">
          <header className="headteacher-section-head"><div><h3>Access context</h3><p>Authority comes from the active membership, not editable profile text.</p></div></header>
          <div className="early-access-chain">
            {accessChain.map((item, index) => (
              <div key={item.label}>
                <span>{index + 1}</span>
                <div><small>{item.label}</small><strong>{item.value}</strong></div>
                {index < accessChain.length - 1 && <b>→</b>}
              </div>
            ))}
          </div>
          <div className="early-access-rule">
            <span>ACCESS RULE</span>
            <strong>User → School → Campus → Section → Role + Permissions → Allowed records</strong>
            <p>Changing a title, display name or browser state must never grant broader access in the production system.</p>
          </div>
        </article>

        <aside className="headteacher-card early-workspace-card">
          <header className="headteacher-section-head"><div><h3>Workspace switcher</h3><p>Multiple appointments remain separate memberships.</p></div></header>
          <button className="active" onClick={() => requestWorkspace("Nursery / Early Years · Head Teacher")}><span>E</span><div><strong>Nursery / Early Years</strong><small>Head Teacher · Kaduna Campus</small></div><em>Active</em></button>
          <button onClick={() => requestWorkspace("Primary School · Headmistress")}><span>P</span><div><strong>Primary School</strong><small>No membership assigned</small></div><em>Unavailable</em></button>
          <button onClick={() => requestWorkspace("Secondary School · Principal")}><span>S</span><div><strong>Secondary School</strong><small>No membership assigned</small></div><em>Unavailable</em></button>
          <p>If the proprietor later appoints this same person to another section, that appears as a separate switchable membership rather than expanding Early Years access.</p>
        </aside>
      </section>

      <section className="headteacher-card early-permission-card">
        <header className="headteacher-section-head"><div><h3>Early Years leadership permissions</h3><p>Prototype view of what this workspace may manage, review, view or cannot access.</p></div></header>
        <div className="early-permission-table">
          <div className="early-permission-row heading"><span>Area</span><span>Level</span><span>Boundary</span></div>
          {permissions.map((permission) => (
            <div className="early-permission-row" key={permission.label}>
              <strong>{permission.label}</strong>
              <em className={permission.level.toLowerCase()}>{permission.level}</em>
              <p>{permission.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="early-profile-lower-grid">
        <article className="headteacher-card early-delegation-card">
          <header className="headteacher-section-head"><div><h3>Leadership & delegation</h3><p>Authority may be delegated downward without crossing section boundaries.</p></div></header>
          <div className="early-delegation-list">
            {delegation.map((item) => <div key={item.role}><div><strong>{item.role}</strong><small>{item.scope}</small></div><span>{item.description}</span><em className={item.state === "Active" ? "active" : "available"}>{item.state}</em></div>)}
          </div>
          <p className="early-delegation-note">The proprietor remains the source of section-head appointment. The Head Teacher may coordinate Early Years work but cannot create whole-school authority from this profile page.</p>
        </article>

        <article className="headteacher-card early-security-card">
          <header className="headteacher-section-head"><div><h3>Security & notification preferences</h3><p>Local prototype settings for this leadership workspace.</p></div></header>
          <div className="early-security-list">
            {preferences.map((item) => (
              <button key={item.id} onClick={() => togglePreference(item.id)}>
                <div><strong>{item.label}</strong><small>{item.description}</small></div>
                <span className={item.enabled ? "on" : "off"}><i />{item.enabled ? "On" : "Off"}</span>
              </button>
            ))}
          </div>
          <div className="early-security-note"><span>PRODUCTION REQUIREMENT</span><p>Authentication, session expiry, authorization and sensitive actions must ultimately be enforced server-side. These switches currently change UI state only.</p></div>
        </article>
      </section>

      <section className="early-profile-lower-grid">
        <article className="headteacher-card early-boundaries-card">
          <span className="headteacher-kicker">WHAT THIS ROLE CANNOT DO</span>
          <h3>Early Years leadership is not whole-school ownership</h3>
          <div><span>01</span><p><strong>Cannot manage Primary or Secondary by default</strong><small>A separate membership is required for every additional academic section.</small></p></div>
          <div><span>02</span><p><strong>Cannot edit official school identity</strong><small>Logo, legal identity and proprietor-level configuration remain owner controlled.</small></p></div>
          <div><span>03</span><p><strong>Cannot access finance or subscription administration</strong><small>Those belong to finance, proprietor or platform roles.</small></p></div>
          <div><span>04</span><p><strong>Cannot bypass safeguarding restrictions</strong><small>Sensitive safeguarding detail requires explicit authorization and audit.</small></p></div>
        </article>

        <article className="headteacher-card early-profile-ai-card">
          <span className="headteacher-kicker">HEAD TEACHER AI · ACCESS BOUNDARY</span>
          <h3>AI inherits the same workspace scope</h3>
          <p>Head Teacher AI may summarize only the Early Years data that this membership is allowed to access. It must not broaden access by searching Primary, Secondary or restricted safeguarding records.</p>
          <div><span>School</span><strong>BrightGate Academy</strong></div>
          <div><span>Campus</span><strong>Kaduna Campus</strong></div>
          <div><span>Section</span><strong>Nursery / Early Years</strong></div>
          <div><span>Restricted data</span><strong>Excluded unless separately authorized</strong></div>
          <Link href="/headteacher/ai">Open Head Teacher AI</Link>
        </article>
      </section>

      {notice && <div className="early-profile-notice">{notice}</div>}
    </main>
  );
}
