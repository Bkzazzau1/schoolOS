"use client";

import Link from "next/link";
import { useState } from "react";
import { schoolProfile } from "../../../lib/school-profile";

type PreferenceKey = "approvals" | "attendance" | "incidents" | "reports" | "messages" | "aiBrief";

const recentActivity = [
  { time: "Today · 11:42 AM", action: "Approved JSS 2B report-card batch" },
  { time: "Today · 10:32 AM", action: "Opened restricted incident INC-2402" },
  { time: "Today · 9:18 AM", action: "Reviewed Mrs. Amina Yusuf lesson plan" },
  { time: "Yesterday · 3:12 PM", action: "Sent JSS 2B attendance follow-up" },
];

export default function PrincipalProfilePage() {
  const [fullName, setFullName] = useState("Mr. Ibrahim Danladi");
  const [displayName, setDisplayName] = useState("Ibrahim Danladi");
  const [email, setEmail] = useState("principal@brightgate.example");
  const [phone, setPhone] = useState("+234 800 000 0101");
  const [saved, setSaved] = useState(false);
  const [securityNotice, setSecurityNotice] = useState("");
  const [preferences, setPreferences] = useState<Record<PreferenceKey, boolean>>({
    approvals: true,
    attendance: true,
    incidents: true,
    reports: true,
    messages: true,
    aiBrief: true,
  });

  function togglePreference(key: PreferenceKey) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  }

  function saveProfile() {
    setSaved(true);
  }

  return (
    <main className="principal-module-shell principal-profile-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · PROFILE</span>
          <h1>Profile & Preferences</h1>
          <p>Manage your principal account, notifications, security and active school workspace.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/performance">School Performance</Link>
          <Link href="/principal/ai">Principal AI</Link>
        </div>
      </header>

      <section className="principal-profile-overview">
        <article className="principal-profile-card identity">
          <div className="principal-profile-avatar">ID</div>
          <div>
            <span>ACTIVE PRINCIPAL PROFILE</span>
            <h2>{displayName}</h2>
            <p>Principal · Kaduna Campus</p>
          </div>
          <b>Active</b>
        </article>

        <article className="principal-profile-card role-context">
          <span>ROLE CONTEXT</span>
          <strong>Principal</strong>
          <small>School-wide academic and operational leadership</small>
        </article>

        <article className="principal-profile-card role-context">
          <span>ACTIVE WORKSPACE</span>
          <strong>{schoolProfile.name}</strong>
          <small>Kaduna Campus · 1st Term 2026/27</small>
        </article>

        <article className="principal-profile-card role-context">
          <span>LAST SIGN-IN</span>
          <strong>Today · 7:18 AM</strong>
          <small>Prototype security activity</small>
        </article>
      </section>

      <section className="principal-profile-grid">
        <article className="principal-module-card principal-account-card">
          <div className="principal-profile-section-head">
            <div>
              <h2>Account information</h2>
              <p>Personal contact details for your SchoolOS account.</p>
            </div>
            {saved && <span className="profile-saved-state">Saved</span>}
          </div>

          <div className="principal-profile-form">
            <label>Full name<input value={fullName} onChange={(e) => { setFullName(e.target.value); setSaved(false); }} /></label>
            <label>Display name<input value={displayName} onChange={(e) => { setDisplayName(e.target.value); setSaved(false); }} /></label>
            <label>Email address<input value={email} onChange={(e) => { setEmail(e.target.value); setSaved(false); }} /></label>
            <label>Phone number<input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} /></label>
            <label>Role<input value="Principal" readOnly /></label>
            <label>Primary campus<input value="Kaduna Campus" readOnly /></label>
          </div>

          <button className="principal-profile-save" onClick={saveProfile}>Save profile</button>
        </article>

        <aside className="principal-module-card principal-workspace-card">
          <div className="principal-profile-section-head">
            <div><h2>Workspace & permissions</h2><p>Your access is derived from the active school membership.</p></div>
          </div>

          <div className="principal-permission-lines">
            <div><span>School</span><strong>{schoolProfile.name}</strong></div>
            <div><span>Campus</span><strong>Kaduna Campus</strong></div>
            <div><span>Membership</span><strong>Active</strong></div>
            <div><span>Role</span><strong>Principal</strong></div>
            <div><span>Academic scope</span><strong>School-wide</strong></div>
            <div><span>Finance scope</span><strong>Restricted</strong></div>
          </div>

          <div className="principal-workspace-boundary">
            <span>ROLE BOUNDARY</span>
            <p>You can oversee academics, teachers, students, attendance, approvals, results, communication and incidents. Official school identity, ownership data, branches, logo and letterhead configuration remain proprietor-controlled.</p>
          </div>

          <button onClick={() => setSecurityNotice("Workspace switching will recalculate tenant, membership, role and permissions before any data is shown.")}>Workspace access info</button>
          {securityNotice && <div className="principal-security-notice">{securityNotice}</div>}
        </aside>
      </section>

      <section className="principal-profile-grid preferences-grid">
        <article className="principal-module-card">
          <div className="principal-profile-section-head">
            <div><h2>Notification preferences</h2><p>Choose which principal events should demand your attention.</p></div>
          </div>

          <div className="principal-preference-list">
            {[
              ["approvals", "Approval requests", "Teacher submissions, report cards and score corrections"],
              ["attendance", "Attendance alerts", "Repeated student absence, staff absence and lateness"],
              ["incidents", "Incident alerts", "High-priority behaviour, safeguarding and safety cases"],
              ["reports", "Result release alerts", "Batches waiting for approval or release"],
              ["messages", "Priority messages", "Urgent staff or guardian communication"],
              ["aiBrief", "Principal AI daily brief", "Summary of issues, risks and recommended actions"],
            ].map(([key, title, description]) => {
              const prefKey = key as PreferenceKey;
              return (
                <button key={key} onClick={() => togglePreference(prefKey)} className={preferences[prefKey] ? "enabled" : ""}>
                  <div><strong>{title}</strong><small>{description}</small></div>
                  <span>{preferences[prefKey] ? "On" : "Off"}</span>
                </button>
              );
            })}
          </div>
        </article>

        <article className="principal-module-card principal-security-card">
          <div className="principal-profile-section-head">
            <div><h2>Security</h2><p>Account protection and access history.</p></div>
          </div>

          <div className="principal-security-options">
            <div><span>Password</span><strong>Last changed 42 days ago</strong><button onClick={() => setSecurityNotice("Password-change flow is UI-only in the current prototype.")}>Change password</button></div>
            <div><span>Two-step verification</span><strong>Recommended</strong><button onClick={() => setSecurityNotice("Two-step verification setup will be connected when authentication is wired.")}>Set up</button></div>
            <div><span>Active sessions</span><strong>1 current session</strong><button onClick={() => setSecurityNotice("Session-management controls are UI-only in the current prototype.")}>Review sessions</button></div>
          </div>
          {securityNotice && <div className="principal-security-notice">{securityNotice}</div>}
        </article>
      </section>

      <section className="principal-profile-grid">
        <article className="principal-module-card">
          <div className="principal-profile-section-head"><div><h2>Recent principal activity</h2><p>Prototype audit trail of leadership actions.</p></div></div>
          <div className="principal-profile-activity">
            {recentActivity.map((item) => <div key={`${item.time}-${item.action}`}><span>{item.time}</span><strong>{item.action}</strong></div>)}
          </div>
        </article>

        <article className="principal-module-card principal-school-identity-readonly">
          <div className="principal-profile-section-head"><div><h2>School identity</h2><p>Read-only in the principal portal.</p></div></div>
          <div className="principal-permission-lines">
            <div><span>School</span><strong>{schoolProfile.name}</strong></div>
            <div><span>Address</span><strong>{schoolProfile.address}</strong></div>
            <div><span>Phone</span><strong>{schoolProfile.phone}</strong></div>
            <div><span>Branches</span><strong>{schoolProfile.branches.join(" · ")}</strong></div>
          </div>
          <p className="principal-readonly-note">Only the proprietor or another explicitly authorized school owner can change official identity and letterhead information.</p>
        </article>
      </section>
    </main>
  );
}
