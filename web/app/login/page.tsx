"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

type DemoRole = {
  key: string;
  label: string;
  person: string;
  scope: string;
  email: string;
  password: string;
  href: string;
};

const demoRoles: DemoRole[] = [
  { key: "proprietor", label: "Proprietor", person: "Mr. Ibrahim Bello", scope: "Whole school", email: "proprietor@brightgate.edu.ng", password: "Demo@123", href: "/proprietor" },
  { key: "principal", label: "Principal", person: "Mr. Ibrahim Danladi", scope: "Secondary School", email: "principal@brightgate.edu.ng", password: "Demo@123", href: "/principal" },
  { key: "headmaster", label: "Headmistress", person: "Mrs. Hauwa Sule", scope: "Primary School", email: "headmistress@brightgate.edu.ng", password: "Demo@123", href: "/headmaster" },
  { key: "headteacher", label: "Head Teacher", person: "Mrs. Maryam Abdullahi", scope: "Nursery / Early Years", email: "headteacher@brightgate.edu.ng", password: "Demo@123", href: "/headteacher" },
  { key: "teacher", label: "Teacher", person: "Mrs. Amina Yusuf", scope: "Assigned classes", email: "teacher@brightgate.edu.ng", password: "Demo@123", href: "/teacher" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("proprietor");
  const selected = demoRoles.find((role) => role.key === selectedKey) ?? demoRoles[0];
  const [email, setEmail] = useState(selected.email);
  const [password, setPassword] = useState(selected.password);
  const [error, setError] = useState("");

  function chooseRole(role: DemoRole) {
    setSelectedKey(role.key);
    setEmail(role.email);
    setPassword(role.password);
    setError("");
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = demoRoles.find(
      (role) => role.email.toLowerCase() === email.trim().toLowerCase() && role.password === password,
    );

    if (!match) {
      setError("These demo credentials do not match a SchoolOS role. Select a demo account below or check the email and password.");
      return;
    }

    setSelectedKey(match.key);
    setError("");
    router.push(match.href);
  }

  return (
    <main className="mock-login-shell">
      <section className="mock-login-story">
        <Link className="mock-login-brand" href="/"><span>S</span><strong>SchoolOS <b>AI</b></strong></Link>
        <div className="mock-login-copy">
          <span>ONE SCHOOL · DIFFERENT WORKSPACES</span>
          <h1>A little clarity.<br />A brighter school day.</h1>
          <p>Your people, your classrooms, your whole school. One thoughtful workspace to keep everyone moving forward.</p>
          <div className="mock-role-summary">
            <div><strong>Leadership stays separated</strong><small>Proprietor, Secondary, Primary and Early Years open different workspaces.</small></div>
            <div><strong>Teachers stay assignment-scoped</strong><small>Teacher access is limited to assigned classes, activities and delegated duties.</small></div>
            <div><strong>Prototype authentication only</strong><small>No real session, password hashing or backend authorization is active yet.</small></div>
          </div>
        </div>
        <footer>BrightGate Academy · Kaduna Campus · SchoolOS UI Prototype</footer>
      </section>

      <section className="mock-login-main">
        <div className="mock-login-inner">
          <header className="mock-login-head"><span>DEMO ACCESS</span><h2>Choose a SchoolOS role</h2><p>Select a role to load its mock credentials, then sign in to the matching portal.</p></header>
          <div className="mock-role-grid">{demoRoles.map((role) => <button type="button" key={role.key} className={`mock-role-card ${selectedKey === role.key ? "active" : ""}`} onClick={() => chooseRole(role)}><strong>{role.label}</strong><span>{role.person}<br />{role.scope}</span><em>{role.href}</em></button>)}</div>
          <form className="mock-login-form" onSubmit={signIn}>
            <label>School workspace<select defaultValue="brightgate"><option value="brightgate">BrightGate Academy · Kaduna Campus</option></select></label>
            <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" /></label>
            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label>
            {error && <p className="mock-login-error">{error}</p>}
            <button className="mock-login-submit" type="submit">Sign in as {selected.label} →</button>
            <div className="mock-login-hint"><span>Selected: {selected.person} · {selected.scope}</span><Link href="/onboarding">Create school account</Link></div>
          </form>
          <section className="mock-credentials"><div className="mock-credentials-head"><h3>Demo credentials</h3><small>Click “Use account” to autofill</small></div>{demoRoles.map((role) => <div className="mock-credential-row" key={role.key}><strong>{role.label}</strong><code>{role.email}</code><code>{role.password}</code><button type="button" onClick={() => chooseRole(role)}>Use account</button></div>)}</section>
          <div className="mock-security-note"><strong>Prototype boundary:</strong> these credentials exist only in frontend mock code. They demonstrate role routing and do not create secure authentication, persistence or server-side permissions. Parent and Student demo accounts will be added when those dedicated portals are built.</div>
        </div>
      </section>
    </main>
  );
}
