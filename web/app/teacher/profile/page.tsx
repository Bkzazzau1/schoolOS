"use client";

import Link from "next/link";
import { useState } from "react";

export default function TeacherProfilePage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "Mrs. Amina Yusuf",
    staffId: "TCH-2048",
    department: "Mathematics",
    qualification: "B.Ed Mathematics",
    phone: "+234 800 000 0000",
    email: "amina.yusuf@example.edu",
    bio: "Mathematics teacher focused on practical explanations, structured revision and learner support.",
    availability: "Monday–Friday · 7:30 AM–3:30 PM",
  });
  const [prefs, setPrefs] = useState({ messages: true, assignments: true, ai: true, guardian: true });

  function update(field: keyof typeof profile, value: string) {
    setProfile((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  return (
    <main className="module-shell">
      <header className="module-header">
        <div><span className="page-kicker">TEACHER ACCOUNT</span><h1>Profile</h1><p>Personal teaching profile, work details, assigned subjects and notification preferences.</p></div>
        <div className="module-header-actions"><Link className="ghost-link" href="/teacher">Dashboard</Link><button className="primary-btn" onClick={() => setSaved(true)}>Save changes</button></div>
      </header>

      {saved && <div className="success-banner">Profile changes saved in this demo interface.</div>}

      <section className="profile-layout">
        <article className="module-card profile-summary-card">
          <div className="profile-avatar-large">AY</div>
          <h2>{profile.displayName}</h2>
          <p>Mathematics Teacher</p>
          <span className="soft-chip good">Active staff</span>
          <div className="profile-summary-list">
            <div><span>Staff ID</span><strong>{profile.staffId}</strong></div>
            <div><span>Department</span><strong>{profile.department}</strong></div>
            <div><span>Campus</span><strong>Kaduna Campus</strong></div>
            <div><span>Role</span><strong>Teacher</strong></div>
          </div>
        </article>

        <div className="profile-main-column">
          <article className="module-card">
            <div className="module-card-head"><div><h2>Personal & professional details</h2><p>Editable profile information visible according to school policy.</p></div></div>
            <div className="form-grid">
              <label>Display name<input value={profile.displayName} onChange={(e) => update("displayName", e.target.value)} /></label>
              <label>Staff ID<input value={profile.staffId} onChange={(e) => update("staffId", e.target.value)} /></label>
              <label>Department<input value={profile.department} onChange={(e) => update("department", e.target.value)} /></label>
              <label>Qualification<input value={profile.qualification} onChange={(e) => update("qualification", e.target.value)} /></label>
              <label>Phone<input value={profile.phone} onChange={(e) => update("phone", e.target.value)} /></label>
              <label>Email<input value={profile.email} onChange={(e) => update("email", e.target.value)} /></label>
              <label className="wide">Availability<input value={profile.availability} onChange={(e) => update("availability", e.target.value)} /></label>
              <label className="wide">Professional bio<textarea rows={4} value={profile.bio} onChange={(e) => update("bio", e.target.value)} /></label>
            </div>
          </article>

          <article className="module-card">
            <div className="module-card-head"><div><h2>Teaching assignments</h2><p>Assigned subjects and classes. Changes should come from authorized school administration.</p></div><span className="soft-chip neutral">Read only</span></div>
            <div className="profile-assignment-grid">
              <div><strong>JSS 2A</strong><span>Mathematics · Room B12</span></div>
              <div><strong>JSS 2B</strong><span>Mathematics · Room B14</span></div>
              <div><strong>JSS 3A</strong><span>Mathematics · Room C04</span></div>
              <div><strong>SS 1A</strong><span>Further Mathematics · Room D06</span></div>
            </div>
          </article>

          <article className="module-card">
            <div className="module-card-head"><div><h2>Notification preferences</h2><p>Choose which teacher-workspace events should notify you.</p></div></div>
            <div className="preference-list">
              <Preference label="Direct messages" copy="Leadership, colleagues and authorized guardian-channel messages" checked={prefs.messages} onChange={(v) => setPrefs((p) => ({ ...p, messages: v }))} />
              <Preference label="Assignments & marking" copy="Submission deadlines and marking queues" checked={prefs.assignments} onChange={(v) => setPrefs((p) => ({ ...p, assignments: v }))} />
              <Preference label="Teacher AI recommendations" copy="Class pacing, intervention and planning suggestions" checked={prefs.ai} onChange={(v) => setPrefs((p) => ({ ...p, ai: v }))} />
              <Preference label="Guardian communication" copy="Replies through approved SchoolOS communication channels" checked={prefs.guardian} onChange={(v) => setPrefs((p) => ({ ...p, guardian: v }))} />
            </div>
          </article>

          <article className="module-card">
            <div className="module-card-head"><div><h2>Security & sessions</h2><p>Account-security controls for the teacher workspace.</p></div></div>
            <div className="security-list"><div><strong>Password</strong><span>Last changed 62 days ago</span><button className="secondary-btn">Change password</button></div><div><strong>Signed-in devices</strong><span>2 active sessions</span><button className="secondary-btn">Manage sessions</button></div><div><strong>Multi-factor authentication</strong><span>Recommended for staff accounts</span><button className="secondary-btn">Set up MFA</button></div></div>
          </article>
        </div>
      </section>
    </main>
  );
}

function Preference({ label, copy, checked, onChange }: { label: string; copy: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="preference-row"><div><strong>{label}</strong><span>{copy}</span></div><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} /></label>;
}
