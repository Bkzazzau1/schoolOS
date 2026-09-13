import Link from 'next/link';

export default function LoginPage() {
  return <main className="auth-shell">
    <section className="auth-story">
      <Link className="auth-brand" href="/"><span>S</span><strong>SchoolOS <b>AI</b></strong></Link>
      <div className="auth-copy"><small>ONE PLATFORM · EVERY SCHOOL · EVERY ROLE</small><h1>Run your school from one intelligent workspace.</h1><p>Management, teachers, parents and students use the same SchoolOS platform while permissions keep every role and school securely separated.</p>
        <div className="auth-points"><div><i>✓</i><span><strong>True multi-school SaaS</strong><small>One product serving isolated school workspaces.</small></span></div><div><i>✓</i><span><strong>AI-native operations</strong><small>Academic, teacher, finance and management intelligence.</small></span></div><div><i>✓</i><span><strong>Web + PWA</strong><small>Installable on phones, tablets and computers.</small></span></div></div>
      </div><p className="auth-foot">SchoolOS · Modern private-school operating system</p>
    </section>
    <section className="auth-form-zone"><form className="auth-form"><div className="auth-form-icon">↗</div><h2>Sign in to your school</h2><p>Use your SchoolOS account to continue.</p><label>School workspace<select defaultValue="brightgate"><option value="brightgate">BrightGate Academy</option><option value="future">Future Leaders School</option></select></label><label>Email or phone<input defaultValue="owner@brightgate.edu.ng"/></label><label>Password<input type="password" defaultValue="password123"/></label><Link className="auth-submit" href="/">Sign in →</Link><div className="auth-divider"><span/>or<span/></div><Link className="auth-create" href="/onboarding">＋ Create a school account</Link><small className="auth-security">Protected by tenant-scoped access and role-based permissions.</small></form></section>
  </main>;
}
