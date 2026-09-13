"use client";

import Link from "next/link";
import { useState } from "react";

type Permission = {
  label: string;
  level: "Manage" | "Review" | "View" | "Restricted";
  detail: string;
};

type SecurityPreference = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

const permissions: Permission[] = [
  { label: "Primary teachers", level: "Manage", detail: "Review teacher responsibility, support context and Primary teaching assignments." },
  { label: "Primary pupils", level: "Manage", detail: "View Primary pupil academic, attendance and support records." },
  { label: "Teaching assignments", level: "Manage", detail: "Assign class and subject teachers within Primary School only." },
  { label: "Academics & attendance", level: "Manage", detail: "Review class performance, curriculum progress and Primary attendance follow-up." },
  { label: "Assessments & reports", level: "Review", detail: "Review and approve Primary reports in the prototype workflow." },
  { label: "Timetable", level: "Manage", detail: "Resolve Primary timetable gaps, substitutions and conflicts." },
  { label: "Communication", level: "Manage", detail: "Coordinate Primary teacher and guardian communication." },
  { label: "Welfare & incidents", level: "Review", detail: "Coordinate routine Primary support and operational incidents." },
  { label: "Safeguarding detail", level: "Restricted", detail: "Sensitive case detail requires a separate safeguarding authorization." },
  { label: "School identity", level: "Restricted", detail: "School name, logo and official identity are controlled by the proprietor." },
  { label: "Finance & billing", level: "Restricted", detail: "Not part of the Primary academic leadership workspace." },
  { label: "Nursery / Secondary", level: "Restricted", detail: "Requires a separate valid membership or leadership appointment." },
];

const initialSecurity: SecurityPreference[] = [
  { id: "sec-1", label: "Login alerts", description: "Show a security notice when a new device signs in to this workspace.", enabled: true },
  { id: "sec-2", label: "Sensitive-action confirmation", description: "Require an extra confirmation before report approval or restricted-case requests.", enabled: true },
  { id: "sec-3", label: "Daily leadership digest", description: "Prepare a local prototype summary of Primary priorities for the day.", enabled: true },
  { id: "sec-4", label: "Quiet non-urgent notifications", description: "Reduce non-urgent notification noise outside the active school day.", enabled: false },
];

const workspaceChain = [
  { label: "School", value: "BrightGate Academy" },
  { label: "Campus", value: "Kaduna Campus" },
  { label: "Academic Section", value: "Primary School" },
  { label: "Leadership Role", value: "Headmistress" },
  { label: "User", value: "Mrs. Hauwa Sule" },
];

const delegatedRoles = [
  { role: "Headmistress", scope: "Primary School", state: "Active", description: "Primary academic and operational leadership." },
  { role: "Assistant Head", scope: "Primary School", state: "Available to appoint", description: "May receive delegated responsibilities from the proprietor/headmistress workflow." },
  { role: "Year Coordinator", scope: "Assigned year band", state: "Available to appoint", description: "Can be delegated a limited Primary year-group scope." },
];

export default function HeadmasterProfilePage() {
  const [security, setSecurity] = useState(initialSecurity);
  const [activeWorkspace, setActiveWorkspace] = useState("Primary School · Headmistress");
  const [notice, setNotice] = useState("");

  function toggleSecurity(id: string) {
    setSecurity((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
    setNotice("Preference updated locally in the UI prototype.");
  }

  function requestWorkspace(workspace: string) {
    if (workspace === "Primary School · Headmistress") {
      setActiveWorkspace(workspace);
      setNotice("Primary School is already the active workspace.");
      return;
    }
    setNotice(`${workspace} is not available in this prototype because no separate membership is assigned to this user.`);
  }

  return (
    <main className="headmaster-module-shell primary-profile-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Profile & Workspace</h1>
          <p>Review leadership identity, active scope, permissions, workspace boundaries and security preferences.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/performance">Performance</Link>
          <Link href="/headmaster/ai">Headmaster AI</Link>
        </div>
      </header>

      <section className="primary-profile-hero">
        <div className="primary-profile-avatar">HS</div>
        <div className="primary-profile-identity">
          <span>ACTIVE LEADERSHIP PROFILE</span>
          <h2>Mrs. Hauwa Sule</h2>
          <p>Headmistress · Primary School · Kaduna Campus</p>
          <div><b>Primary School</b><b>Academic Leadership</b><b>Operational Leadership</b></div>
        </div>
        <div className="primary-profile-session">
          <span>Current workspace</span>
          <strong>{activeWorkspace}</strong>
          <small>2026/2027 Academic Session · First Term</small>
        </div>
      </section>

      <section className="primary-profile-grid">
        <article className="headmaster-module-card primary-workspace-chain-card">
          <header><div><h2>Access context</h2><p>Authority is resolved from the active membership, not from editable profile text.</p></div></header>
          <div className="primary-workspace-chain">
            {workspaceChain.map((item, index) => <div key={item.label}><span>{index + 1}</span><div><small>{item.label}</small><strong>{item.value}</strong></div>{index < workspaceChain.length - 1 && <b>→</b>}</div>)}
          </div>
          <div className="primary-profile-rule"><span>ACCESS RULE</span><strong>User → School → Campus → Academic Section → Role + Permissions → Allowed Records</strong><p>Changing a name, title or browser state must never grant more access in the final system.</p></div>
        </article>

        <aside className="headmaster-module-card primary-workspace-switcher-card">
          <header><div><h2>Workspace switcher</h2><p>A person may hold multiple memberships, but each scope stays separate.</p></div></header>
          <button className="active" onClick={() => requestWorkspace("Primary School · Headmistress")}><span>P</span><div><strong>Primary School</strong><small>Headmistress · Kaduna Campus</small></div><em>Active</em></button>
          <button onClick={() => requestWorkspace("Nursery · Head Teacher")}><span>N</span><div><strong>Nursery / Early Years</strong><small>No membership assigned</small></div><em>Unavailable</em></button>
          <button onClick={() => requestWorkspace("Secondary School · Principal")}><span>S</span><div><strong>Secondary School</strong><small>No membership assigned</small></div><em>Unavailable</em></button>
          <p className="primary-workspace-switch-note">If the proprietor later appoints the same person to another section, that appears as a separate switchable membership rather than expanding the Primary role.</p>
        </aside>
      </section>

      <section className="headmaster-module-card primary-permission-card">
        <header><div><h2>Primary leadership permissions</h2><p>Prototype view of what this workspace may manage, review or cannot access.</p></div></header>
        <div className="primary-permission-table">
          <div className="primary-permission-row heading"><span>Area</span><span>Level</span><span>Boundary</span></div>
          {permissions.map((permission) => <div className="primary-permission-row" key={permission.label}><strong>{permission.label}</strong><em className={permission.level.toLowerCase()}>{permission.level}</em><p>{permission.detail}</p></div>)}
        </div>
      </section>

      <section className="primary-profile-lower-grid">
        <article className="headmaster-module-card primary-delegation-card">
          <header><div><h2>Leadership & delegation</h2><p>Primary authority may be delegated downward without crossing section boundaries.</p></div></header>
          <div>{delegatedRoles.map((item) => <div key={item.role}><div><strong>{item.role}</strong><small>{item.scope}</small></div><span>{item.description}</span><em className={item.state === "Active" ? "active" : "available"}>{item.state}</em></div>)}</div>
          <p>Proprietor appointment remains the source of section-head authority. The Headmistress may coordinate Primary work but cannot create a new school-wide executive role from this profile page.</p>
        </article>

        <article className="headmaster-module-card primary-security-card">
          <header><div><h2>Security & notification preferences</h2><p>Local prototype settings for this leadership workspace.</p></div></header>
          <div className="primary-security-list">
            {security.map((item) => <button key={item.id} onClick={() => toggleSecurity(item.id)}><div><strong>{item.label}</strong><small>{item.description}</small></div><span className={item.enabled ? "on" : "off"}><i />{item.enabled ? "On" : "Off"}</span></button>)}
          </div>
          <div className="primary-security-note"><span>PRODUCTION REQUIREMENT</span><p>Authentication, session expiry, authorization and sensitive actions must ultimately be enforced server-side. These switches currently change UI state only.</p></div>
        </article>
      </section>

      <section className="primary-profile-lower-grid">
        <article className="headmaster-module-card primary-profile-boundaries-card">
          <span className="page-kicker">WHAT THIS ROLE CANNOT DO</span>
          <h2>Primary leadership is not whole-school ownership</h2>
          <div><span>01</span><p><strong>Cannot manage Nursery or Secondary by default</strong><small>A separate membership is required for each additional academic section.</small></p></div>
          <div><span>02</span><p><strong>Cannot edit official school identity</strong><small>Logo, legal identity and proprietor-level configuration remain owner controlled.</small></p></div>
          <div><span>03</span><p><strong>Cannot access finance or subscription administration</strong><small>Those belong to finance/proprietor/platform roles, not Primary academic leadership.</small></p></div>
          <div><span>04</span><p><strong>Cannot bypass safeguarding restrictions</strong><small>Sensitive case detail needs explicit safeguarding authorization and audit.</small></p></div>
        </article>

        <article className="headmaster-module-card primary-profile-access-ai">
          <span className="page-kicker">HEADMASTER AI · ACCESS BOUNDARY</span>
          <h2>AI inherits the same workspace scope</h2>
          <p>Headmaster AI may summarize only the Primary data that this membership is permitted to access. It should never broaden access by searching across school sections or restricted records.</p>
          <div><span>Tenant</span><strong>BrightGate Academy</strong></div>
          <div><span>Campus</span><strong>Kaduna Campus</strong></div>
          <div><span>Section</span><strong>Primary School</strong></div>
          <div><span>Restricted data</span><strong>Excluded unless separately authorized</strong></div>
          <Link href="/headmaster/ai">Open Headmaster AI</Link>
        </article>
      </section>

      {notice && <div className="primary-profile-notice">{notice}</div>}
    </main>
  );
}
